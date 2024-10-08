/**
 * Request
 *
 * RListLatticeResVo，响应信息主体
 */
export interface Request {
  code?: number
  data?: LatticeResVo[]
  msg?: string
  [property: string]: any
}

/**
 * LatticeResVo
 */
export interface LatticeResVo {
  /**
   * 柜子编码
   */
  cabinetNum?: string
  /**
   * 设备编码
   */
  deviceCode?: string
  /**
   * 设备id
   */
  deviceId?: string
  /**
   * 能否操作
   */
  enable?: boolean
  /**
   * 格子id
   */
  id?: number
  /**
   * 格子编码
   */
  latticeCode?: string
  /**
   * 门状态
   */
  status?: string
  [property: string]: any
}
