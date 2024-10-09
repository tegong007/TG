const { BrowserWindow, Menu, Tray } = require("electron");
const { getToolbar, getTaskbar } = require("../config/menu");
const { pathTool } = require("../utils/toolkit");

module.exports = class Window {
  // 创建窗体
  createWindow(config) {
    const win = new BrowserWindow({
      width: config.App_Width,
      height: config.App_Height,
      center: true, // 窗口居中
      fullscreen: !config.App_Window, // 全屏
      icon: pathTool("resources/icon/logo.ico"), // 图标
      frame: true, // 边框显示
      disableAutoHideCursor: false, // 隐藏鼠标
      autoHideMenuBar: true, // 隐藏工具栏
      webPreferences: {
        sandbox: false,
        preload: pathTool("src/preload/preload.js"),
        contextIsolation: true, // 隔离上下文
        webSecurity: false, // 跨域
        nodeIntegration: true,
        images: true, // 支持图片
        textAreasAreResizable: false, // 文本域可拉伸
        webgl: false, // 支持webgl/canvas
        backgroundThrottling: true, // 页面隐藏时节能
      },
    });
    this.createToolbar(getToolbar(win));
    this.createTaskbar(getTaskbar(win));
    return win;
  }

  // 创建工具菜单
  createToolbar(menu) {
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
  }

  // 创建任务菜单
  createTaskbar(menu) {
    const tray = new Tray(pathTool("resources/icon/logo.ico"));
    tray.setContextMenu(Menu.buildFromTemplate(menu));
  }
};
