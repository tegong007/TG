const { app, ipcMain, globalShortcut } = require("electron");
const { exec, spawn } = require("child_process");
const { Worker } = require("worker_threads");
const getWindow = require("./config/window");
const { useDatebase } = require("./utils/handler");
const { createdLogger, quitLogger, crashLogger } = require("./utils/logger");
const { getConfig, getHomepage, getWorker, disposeDll } = require("./utils/reader");

let win;
let config = {}; // 配置参数
let logger; // 日志类
let libProcess;
let vProcess;
let libPromise = [];

process.env.NODE_OPTIONS = "--no-warnings --max-old-space-size=512"; // 设置运行内存为500MB
app.commandLine.appendSwitch("charset", "UTF-8"); // 设置全局字符编码为UTF-8
app.disableHardwareAcceleration(); // 禁用硬件加速

app.whenReady().then(async () => {
  config = await getConfig();
  logger = createdLogger(new Date(), config.Logger_Level); // 开启日志

  try {
    win = new getWindow().createWindow(config); // 主窗体
    if (config.App_Devtool) win.webContents.openDevTools(); // 调试工具

    globalShortcut.register("Alt+CommandOrControl+Shift+D", () => {
      win.webContents.openDevTools({ mode: "detach" }); //开启开发者工具
    });

    // 加载页面
    const App_Url = getHomepage(config.App_Url);
    App_Url ? win.loadFile(App_Url) : win.loadURL(config.App_Url);
    logger.info("APP-Version:" + app.getVersion() + " | App_Url:" + App_Url || config.App_Url);
    win.setAspectRatio(config.App_Width / config.App_Height); // 固定页面比例
  } catch (err) {
    logger.info("APP-Version:" + app.getVersion());
    logger.error("App_Ready: " + (err.message || "加载页面错误"));
  }

  // 禁止软件多开
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock && process.platform !== "darwin") app.quit();

  win.on("closed", () => {
    win = null;
  });
});

app.on("window-all-closed", () => {
  quitLogger(logger);
  if (process.platform !== "darwin") app.quit();
});

// 监听崩溃事件
app.on("crash", () => {
  crashLogger(logger);
  app.exit(1);
});

// Main进程-系统操作
ipcMain.handle("Main_System", async (event, param) => {
  let result, temp;
  switch (param.key) {
    case "config":
      try {
        result = await getConfig(); // 获取配置文件
        temp = await useDatebase({ db: "coffer", sql: "select * from config limit 0, 1" });
        // if (temp.length) result = { ...result, Printer_Name: temp[0].pName, Film_IP: temp[0].pIP, Report_Name: temp[0].pR };
        if (temp.length) result = { ...result, Printer_Name: temp[0].pName, Film_IP: temp[0].pIP, Report_Name: "" };
        result = { ...result, Version: app.getVersion() };
      } catch (err) {
        logger.error("Main_System: " + (err.message || "获取配置文件错误"));
        result = {};
      }
      return result;
    case "close":
      exec(`taskkill /IM DS_Monitor.exe /F`); // 关闭守护进程
      win.close(); // 关闭主程序
      return;
  }
});

// Main进程-调用C++库
ipcMain.handle("Main_Library", async (event, param) => {
  return new Promise((resolve, reject) => {
    const ignore = ["TestDicomEcho", "CheckSeverDatabaseConntect"];
    if (!ignore.includes(param.fName)) logger.debug("Lib-Request(" + param.fName + "): " + JSON.stringify(param));
    if (!libProcess) {
      libProcess = new Worker(getWorker("library"));
      libProcess.on("message", (result) => {
        if (!ignore.includes(result.fName)) logger.debug("Lib-Response(" + result.fName + "): " + JSON.stringify(result.data));
        const { resolve } = libPromise.shift();
        resolve(result.data);
      });
      libProcess.on("error", (error) => {
        logger.error("Main_Library: " + error.message || "调用C++库错误");
        const { reject } = libPromise.shift();
        reject(error.data);
      });
    }
    libPromise.push({ resolve, reject });
    libProcess.postMessage(disposeDll(param));
  });
});

// Main进程-查询数据库
ipcMain.handle("Main_Datebase", async (event, param) => {
  const ignore = ["dict", "desc"];
  try {
    if (!ignore.includes(param.db)) logger.debug("DB-Request(" + param.db + "): " + JSON.stringify(param));
    const result = await useDatebase(param);
    if (!ignore.includes(param.db)) logger.debug("DB-Response(" + param.db + "): " + JSON.stringify(result));
    return result;
  } catch (err) {
    logger.error("Main_Datebase(" + param.db + "): " + (err.data || "查询数据库错误"));
    return false;
  }
});

// Main进程-生成语音
ipcMain.handle("Main_Voice", (event, msg) => {
  if (vProcess) {
    vProcess.kill(); // 停止语音
    vProcess = null;
  }
  switch (msg) {
    case "click":
    case "success":
    case "error":
      break;
    default:
      vProcess = spawn("powershell.exe", ["-command", `Add-Type -AssemblyName System.speech;$synth = New-Object -TypeName System.Speech.Synthesis.SpeechSynthesizer;$synth.Rate = 20;$synth.Volume = 100;$synth.Speak("${msg}");`]);
      break;
  }
  return true;
});
