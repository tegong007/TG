const { ipcRenderer, contextBridge } = require("electron");

// 系统操作
const handleSystem = (param) => {
  return ipcRenderer.invoke("Main_System", param);
};

// 调用C++库
const handleLibrary = async (param) => {
  return await ipcRenderer.invoke("Main_Library", param);
};

// 查询数据库
const handleDatebase = (param) => {
  return ipcRenderer.invoke("Main_Datebase", param);
};

// 播放语音
const handleVoice = (msg) => {
  return ipcRenderer.invoke("Main_Voice", msg);
};

contextBridge.exposeInMainWorld("electronAPI", { handleSystem, handleLibrary, handleDatebase, handleVoice });
