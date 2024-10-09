const { BrowserWindow } = require("electron");

module.exports = {
  // 工具菜单
  getToolbar: () => {
    return [];
  },
  // 任务菜单
  getTaskbar: () => {
    return [
      {
        label: "刷新",
        click: () => {
          BrowserWindow.getAllWindows().forEach((element) => {
            element.reload();
          });
        },
      },
      { label: "退出", role: "quit" },
    ];
  },
};
