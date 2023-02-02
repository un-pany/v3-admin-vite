import { request } from "@/utils/service"

interface ICreateTableRequestData {
  username: string
  password: string
}

interface IUpdateTableRequestData {
  id: string
  username: string
  password?: string
}

interface IGetTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  /** 查询参数 */
  username?: string
  phone?: string
}

type GetTableResponseData = IApiResponseData<{
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

/** 增 */
export function createTableDataApi(data: ICreateTableRequestData) {
  return request({
    url: "table",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `table/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateTableDataApi(data: IUpdateTableRequestData) {
  return request({
    url: "table",
    method: "put",
    data
  })
}

/** 查 */
export function getTableDataApi(params: IGetTableRequestData) {
  return request<GetTableResponseData>({
    url: "table",
    method: "get",
    params
  })
}
