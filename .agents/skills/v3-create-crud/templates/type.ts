export interface CreateOrUpdateEntityRequestData {
  id?: number
  name: string
  description: string
}

export interface EntityRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  /** 查询参数：名称 */
  name?: string
  /** 查询参数：状态 */
  status?: string
}

export interface EntityData {
  createTime: string
  description: string
  id: number
  name: string
  status: string
}

export type EntityResponseData = ApiResponseData<{
  list: EntityData[]
  total: number
}>
