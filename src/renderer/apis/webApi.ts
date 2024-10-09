import store from "@/renderer/store/index";
import request from "@/renderer/plugins/request";
// 后端服务-权
// const v1 = "http://192.168.88.17:6101/";

// 主机-麒麟：
// 192.168.10.101

// 主机-windows：
// 192.168.10.102

// 从机-windows：
// 192.168.10.103

const v1 = "http://localhost:6101/";

// 查询打印机状态接口
export const queryPrinterStatus = () => {
  const api = "http://" + store.state.configInfo.Film_IP + ":" + store.state.configInfo.Film_Port + "/query-printer-status";
  return request.get(api);
};
//任务管理服务HTTP接口
export const startOrStopPrintTask = (data: any) => {
  const api = v1 + "tms/print-task";
  return request.post(api, data);
};
//任务管理服务HTTP接口
export const getDocStatus = () => {
  const api = v1 + "tms/doc-status";
  return request.get(api);
};
