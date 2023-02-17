export interface ICreateTableRequestData {
  username: string
  password: string
}

export interface IUpdateTableRequestData {
  id: string
  username: string
  password?: string
}

export interface IGetTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  /** 查询参数 */
  username?: string
  phone?: string
}

export type GetTableResponseData = IApiResponseData<{
  list: {
    createTime: string
    email: string
    id: string
    phone: string
    roles: string
    status: boolean
    username: string
  }[]
  total: number
}>
