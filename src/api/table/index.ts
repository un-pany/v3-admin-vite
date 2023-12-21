import { request } from "@/utils/service"
import type * as Table from "./types/table"
import { handleApiError } from "@/utils/error-handler"

/** 增 */
export function createTableDataApi(data: Table.CreateTableRequestData) {
  return request({
    url: "table",
    method: "post",
    data
  }).catch(handleApiError)
}

/** 删 */
export function deleteTableDataApi(id: string) {
  return request({
    url: `table/${id}`,
    method: "delete"
  }).catch(handleApiError)
}

/** 改 */
export function updateTableDataApi(data: Table.UpdateTableRequestData) {
  return request({
    url: "table",
    method: "put",
    data
  }).catch(handleApiError)
}

/** 查 */
export function getTableDataApi(params: Table.GetTableRequestData) {
  return request<Table.GetTableResponseData>({
    url: "table",
    method: "get",
    params
  }).catch(handleApiError)
}
