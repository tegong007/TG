const { parentPort } = require("worker_threads");
const { useLibrary } = require("../utils/handler");

parentPort.on("message", async (workerData) => {
  try {
    const result = await useLibrary(workerData);
    parentPort.postMessage({ fName: workerData.fName || "--", data: result });
  } catch (err) {
    parentPort.postMessage({ fName: workerData.fName || "--", data: err.message || err });
  }
});
