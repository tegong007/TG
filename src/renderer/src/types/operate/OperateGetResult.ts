/**
 * Request
 *
 * ROperateResVo，响应信息主体
 */
export interface OperateGetResult {
  code?: number
  data?: OperateResVo
  msg?: string
  [property: string]: any
}

/**
 * OperateResVo，操作返回实体
 */
export interface OperateResVo {
  /**
   * 返回的状态
   */
  result?: string
  /**
   * 返回状态
   */
  status?: string
  [property: string]: any
}
