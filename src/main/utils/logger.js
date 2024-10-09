const logger = require("electron-log");
const { pathTool, exitTool, readTool, deleteTool } = require("./toolkit");

module.exports = {
  // 创建日志
  createdLogger: (date, level = "info") => {
    exitTool("logs/", true);
    // 清除过期日志
    const files = readTool("logs", "path");
    files.forEach((file) => {
      if (readTool("logs/" + file, "file").mtimeMs < date.getTime() - 30 * 24 * 60 * 60 * 1000) {
        deleteTool("logs/" + file); // 保留7天
        return;
      }
    });
    logger.transports.file.fileName = "electron_" + date.getFullYear() + "_" + String(date.getMonth() + 1).padStart(2, "0") + "_" + String(date.getDate()).padStart(2, "0") + ".log";
    logger.transports.file.resolvePathFn = () => pathTool("logs/" + logger.transports.file.fileName, "exe");
    logger.transports.file.level = level;
    logger.transports.console.level = false;
    logger.transports.file.maxSize = 50 * 1024 * 1024; // 文件最大50M
    logger.transports.file.format = "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}";
    logger.info("################################################################");
    logger.info("#                          START                               #");
    logger.info("################################################################");
    return logger;
  },

  // 关闭日志
  quitLogger: (logger) => {
    logger.info("################################################################");
    logger.info("#                          STOP                                #");
    logger.info("################################################################");
  },

  // 崩溃日志
  crashLogger: (logger) => {
    logger.info("################################################################");
    logger.info("#                         Destroy                              #");
    logger.info("################################################################");
  },
};
