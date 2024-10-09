import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const service = axios.create({ timeout: 3000 });

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = "bearer ";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status == 200) {
      if (res.data.code == 0) return res.data.respData;
      else return Promise.reject(res.data.msg);
    } else {
      return Promise.reject(res.data.statusText);
    }
  },
  (err) => {
    return Promise.reject(err.message);
  }
);

export default service;
