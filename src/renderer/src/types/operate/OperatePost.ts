/**
 * Request
 *
 * ROperateReqVo，响应信息主体
 */
export interface OperatePost {
  code?: number
  data?: OperateReqVo
  msg?: string
  [property: string]: any
}

/**
 * OperateReqVo，操作返回实体
 */
export interface OperateReqVo {
  /**
   * 流水日志id
   */
  logId?: number
  [property: string]: any
}
