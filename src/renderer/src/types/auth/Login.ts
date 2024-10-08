/**
 * Request
 *
 * RLoginVo，响应信息主体
 */
export interface LoginResponse {
  code?: number
  data?: LoginVo
  msg?: string
  [property: string]: any
}

/**
 * LoginVo，登录验证信息
 */
export interface LoginVo {
  /**
   * 授权令牌
   */
  access_token?: string
  /**
   * 应用id
   */
  client_id?: string
  /**
   * 授权令牌 access_token 的有效期
   */
  expire_in?: number
  /**
   * 用户名称
   */
  nickName?: string
  /**
   * 用户 openid
   */
  openid?: string
  /**
   * 机构id
   */
  orgId?: number
  /**
   * 机构名称
   */
  orgName?: string
  /**
   * 刷新令牌 refresh_token 的有效期
   */
  refresh_expire_in?: number
  /**
   * 刷新令牌
   */
  refresh_token?: string
  /**
   * 令牌权限
   */
  scope?: string
  /**
   * 用户id
   */
  userId?: number
  [property: string]: any
}
