export interface ApiResponse<T> {
  isSuccess: boolean
  data?: T
  errMsg: string
}
