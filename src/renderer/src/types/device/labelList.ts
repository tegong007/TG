/**
 * Label，标签对象 ds_label
 */
export interface LabelVo {
  /**
   * 凭证/代保管品/其他重要物品类型
   */
  businessType?: string
  /**
   * 电子标签码
   */
  code?: string
  /**
   * 创建者
   */
  createBy?: number
  /**
   * 创建机构
   */
  createOrg?: number
  /**
   * 创建时间
   */
  createTime?: Date
  /**
   * 记账依据
   */
  custodyAccording?: string
  /**
   * 代保管品票据号码
   */
  custodyBillNum?: string
  /**
   * 代保管品编号
   */
  custodyCode?: string
  /**
   * 币种
   */
  custodyCurrency?: string
  /**
   * 托管人
   */
  custodyCustodian?: string
  /**
   * 投管人电话
   */
  custodyCustodianPhone?: string
  /**
   * 记账数量
   */
  custodyNum?: string
  /**
   * 中文说明
   */
  custodyRemark?: string
  /**
   * 总价
   */
  custodyTotalPrice?: string
  /**
   * 代保管品单位
   */
  custodyUnit?: string
  /**
   * 单位金额
   */
  custodyUnitMoney?: string
  /**
   * 删除标志（0代表存在 2代表删除）
   */
  delFlag?: string
  /**
   * 入库的设备id
   */
  deviceId?: number
  /**
   * 主键
   */
  id?: number
  /**
   * 终止物品号
   */
  importantEndNo?: string
  /**
   * 重要物品数量
   */
  importantNum?: string
  /**
   * 一级重要物品名称
   */
  importantOneId?: string
  /**
   * 起始物品号
   */
  importantStartNo?: string
  /**
   * 三级重要物品名称
   */
  importantThirdId?: string
  /**
   * 二级重要物品名称
   */
  importantTwoId?: string
  /**
   * 具体用途说明
   */
  importantUseDesc?: string
  /**
   * 电子标签状态 0启用 1作废
   */
  labelStatus?: string
  /**
   * 入库的柜格id
   */
  latticeId?: number
  /**
   * 重要实物状态1-在柜 2-临时离柜 3-离柜
   */
  objectStatus?: string
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } }
  /**
   * 申请理由
   */
  reason?: string
  /**
   * 流程状态
   */
  status?: string
  /**
   * 保管方式 1-单一 2-按盒 3-单一/按盒
   */
  storageMethod?: string
  /**
   * 保管柜员
   */
  storageUserId?: number
  /**
   * 重要实物种类：1-凭证2-重要物品3-代保管品4-其他类型
   */
  type?: string
  /**
   * 更新者
   */
  updateBy?: number
  /**
   * 更新机构
   */
  updateOrg?: number
  /**
   * 更新时间
   */
  updateTime?: Date
  /**
   * 凭证批号
   */
  voucherBatchNum?: string
  /**
   * 终止凭证序号
   */
  voucherEndNo?: string
  /**
   * 凭证数量
   */
  voucherNum?: string
  /**
   * 凭证面值
   */
  voucherParValue?: string
  /**
   * 起始凭证序号
   */
  voucherStartNo?: string
  /**
   * 凭证张数
   */
  voucherSum?: number
  /**
   * 凭证单位
   */
  voucherUnit?: string
  [property: string]: any
}
