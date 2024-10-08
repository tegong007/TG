/**
 * Request
 *
 * DeviceResVo，设备返回对象vo
 */
export interface DeviceResVo {
  /**
   * 柜子名称
   */
  cabinetName?: string
  /**
   * 柜子编码
   */
  cabinetNum?: string
  /**
   * 设备编码
   */
  deviceCode?: string
  /**
   * 设备状态 01-正常、02-停机、03-删除、04-未启用、05撤机、06离线、07关机
   */
  deviceStatus?: string
  /**
   * 设备id
   */
  id?: string
  /**
   * 设备类型 1 主柜 2 副柜
   */
  type?: string
  [property: string]: any
}
