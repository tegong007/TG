import store from "../store";

// 扫描仪交互API
const ScanningLib = async function (fName: string, pValue = "", open = false, close = false) {
  const temp: any = await window.electronAPI.handleLibrary({ lib: "ScannerLib/QRCodeScanner_DS", fName, pValue, open, close });
  return new Promise((resolve, reject) => {
    if (temp.code === 0) resolve(temp);
    else reject(temp.brief || temp);
  });
};

// 蛟片机交互API
const PrintingLib = async function (fName: string, pValue = "", open = false, close = false) {
  const temp: any = await window.electronAPI.handleLibrary({ lib: "PrintingLib/JingJiuClient", fName, pValue, open, close });
  return new Promise((resolve, reject) => {
    if (temp.code === 0) resolve(temp);
    else reject(temp.brief || temp);
  });
};

// 报告机交互API
const ReportLib = async function (fName: string, pValue = "", open = true, close = true) {
  const temp: any = await window.electronAPI.handleLibrary({ lib: "ReportLib/LaserPrinter_DS", fName, pValue, open, close });
  return new Promise((resolve, reject) => {
    if (temp.code === 0) resolve(temp);
    else reject(temp.brief || temp);
  });
};

export { PrintingLib, ScanningLib, ReportLib };
