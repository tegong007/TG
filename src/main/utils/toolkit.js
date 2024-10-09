const fs = require("fs");
const path = require("path");
const { app } = require("electron");

// 获取目标路径
const pathTool = (url, type = "code") => {
  switch (type) {
    case "code":
      url = path.resolve(__dirname, "../../../" + url);
      break;
    case "exe":
      url = app.isPackaged ? path.resolve(path.dirname(app.getPath("exe")), url) : path.resolve(__dirname, "../../../resources/" + url);
      break;
  }
  return url;
};

// 判断目标存在
const exitTool = (url, create = false) => {
  const exit = fs.existsSync(pathTool(url, "exe"));
  if (create) {
    if (!exit) fs.mkdirSync(pathTool(url, "exe"));
    return true;
  } else {
    return exit;
  }
};

// 获取目标内容
const readTool = (url, type) => {
  if (type == "path") return fs.readdirSync(pathTool(url, "exe"));
  else if (type == "file") return fs.statSync(pathTool(url, "exe"));
};

// 删除目标文件
const deleteTool = (url) => {
  return fs.unlinkSync(pathTool(url, "exe"));
};

module.exports = { pathTool, exitTool, readTool, deleteTool };
