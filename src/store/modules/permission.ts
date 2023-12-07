import { ref } from "vue"
import { defineStore } from "pinia"
import { RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import { flatMultiLevelRoutes } from "@/router/helper"
import routeSettings from "@/config/route"
import { IPermissionService } from "../types"
import store from ".."

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  const routeRoles = route.meta?.roles
  return routeRoles ? roles.some((role) => routeRoles.includes(role)) : true
}

export class PermissionService implements IPermissionService {
  filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] {
    const res: RouteRecordRaw[] = []
    routes.forEach((route) => {
      const tempRoute = { ...route }
      if (hasPermission(roles, tempRoute)) {
        if (tempRoute.children) {
          tempRoute.children = this.filterAsyncRoutes(tempRoute.children, roles)
        }
        res.push(tempRoute)
      }
    })
    return res
  }

  setRoutes(roles: string[]): RouteRecordRaw[] {
    const accessedRoutes = routeSettings.async ? this.filterAsyncRoutes(asyncRoutes, roles) : asyncRoutes
    const finalRoutes = constantRoutes.concat(accessedRoutes)
    return routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(finalRoutes) : finalRoutes
  }
}

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])
  const permissionService: IPermissionService = new PermissionService()

  const setRoutes = (roles: string[]) => {
    const accessedRoutes = permissionService.setRoutes(roles)
    routes.value = accessedRoutes
    dynamicRoutes.value = flatMultiLevelRoutes(accessedRoutes)
  }

  return { routes, dynamicRoutes, setRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
