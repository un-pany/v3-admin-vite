import { RouteRecordRaw } from "vue-router"

/** 抽象的权限服务接口 */
export interface IPermissionService {
  setRoutes(roles: string[]): RouteRecordRaw[]
  filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[]
}
