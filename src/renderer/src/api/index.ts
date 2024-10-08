import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { ApiResponse } from '../types/ApiResponse'

// axios.defaults.baseURL = 'http://192.168.88.207:18080'
axios.defaults.baseURL = 'http://192.168.88.36:8080'
axios.defaults.timeout = 5000
axios.defaults.headers.common.Clientid = '428a8310cd442757ae699df5d894f051'

console.log('Axios默认配置:', axios.defaults)

// 定义后端通用响应格式
interface ServerResponse<T> {
  code: number
  data: T
  msg: string
}

// 通用请求处理器
export async function sendRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const response = await axios(config)
    const responseBody: ServerResponse<T> = response.data

    if (responseBody.code !== 200) {
      return {
        isSuccess: false,
        errMsg: responseBody.msg || '请求失败，服务内部错误。',
      }
    }

    // console.log(responseBody.data)
    return {
      isSuccess: true,
      data: responseBody.data,
      errMsg: '',
    }
  }
  catch (error: any) {
    console.error(error)
    return {
      isSuccess: false,
      errMsg: error.response?.data?.msg || error.message || '请求失败，请检查网络连接是否正常。',
    }
  }
}

export * as AuthApi from './auth'
export * as OperateApi from './operate'
export * as DeviceApi from './device'
