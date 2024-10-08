import type { DeviceResVo } from '../types/device/deviceList'
import type { LatticeResVo } from '../types/device/latticeList'
import type { LabelVo } from '../types/device/labelList'
import { sendRequest } from './index'

async function getLatticeList(deviceId: string) {
  return sendRequest<LatticeResVo[]>({
    method: 'get',
    url: `/api/latticeList/${deviceId}`,
  })
}
async function getDeviceList(deviceCode: string) {
  return sendRequest<DeviceResVo[]>({
    method: 'get',
    url: `/api/deviceList/${deviceCode}`,
  })
}

async function getVirDeviceList(deviceCode: string) {
  return sendRequest<DeviceResVo[]>({
    method: 'get',
    url: `/api/virDeviceList/${deviceCode}`,
  })
}

async function getStockList(latticeId: string) {
  return sendRequest<LabelVo[]>({
    method: 'get',
    url: `/api/stockList/${latticeId}`,
  })
}

export {
  getLatticeList,
  getDeviceList,
  getVirDeviceList,
  getStockList,
}
