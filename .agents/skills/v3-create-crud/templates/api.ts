import type * as Entity from "./type"
import { request } from "@/http/axios"

/** 增 */
export function createEntityApi(data: Entity.CreateOrUpdateEntityRequestData) {
  return request({
    url: "entities",
    method: "post",
    data
  })
}

/** 删 */
export function deleteEntityApi(id: number) {
  return request({
    url: `entities/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateEntityApi(data: Entity.CreateOrUpdateEntityRequestData) {
  return request({
    url: "entities",
    method: "put",
    data
  })
}

/** 查 */
export function getEntityApi(params: Entity.EntityRequestData) {
  return request<Entity.EntityResponseData>({
    url: "entities",
    method: "get",
    params
  })
}
