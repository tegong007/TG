const fs = require("fs");
const { pathTool } = require("./toolkit");

// 获取配置文件
const getConfig = () => {
  const url = pathTool("common/config.json", "exe");
  return new Promise((resolve) => {
    fs.readFile(url, "utf-8", (err, data) => {
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        resolve({});
      }
    });
  });
};

// 获取页面路径
const getHomepage = (path) => {
  if (path.indexOf(".html") > 0) return pathTool(path, "exe");
  else return false;
};

// 获取子进程路径
const getWorker = (path) => {
  return pathTool("src/main/worker/" + path + ".js");
};

// 处理库路径
const disposeDll = (param) => {
  param.path = pathTool("library/" + param.lib + ".dll", "exe");
  return param;
};

module.exports = { getConfig, getHomepage, getWorker, disposeDll };
