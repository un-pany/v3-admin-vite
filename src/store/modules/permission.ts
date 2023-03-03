import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { type RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import asyncRouteSettings from "@/config/async-route"
import { getDynamicRoute } from "@/utils/dynamicRoute"

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  const setRoutes = () => {
    let accessedRoutes
    if (!asyncRouteSettings.open) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = getDynamicRoute()
      // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    routes.value = constantRoutes.concat(accessedRoutes)
    dynamicRoutes.value = accessedRoutes
  }

  return { routes, dynamicRoutes, setRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
