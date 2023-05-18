import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { type RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import asyncRouteSettings from "@/config/async-route"
import { getDynamicRoute, redirectRoutes } from "@/utils/asyncRoute"

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role)
      } else {
        return false
      }
    })
  } else {
    return true
  }
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  const setRoutes = (roles: string[]) => {
    let accessedRoutes
    if (!asyncRouteSettings.open) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    routes.value = constantRoutes.concat(accessedRoutes)
    dynamicRoutes.value = accessedRoutes
  }

  // 后端返回路由
  const setDynamicRoutes = (asyncRoutes: any[], roles: string[]) => {
    const cloneRoutes = JSON.parse(JSON.stringify(asyncRoutes))
    const resRoutes = getDynamicRoute(cloneRoutes)

    // 添加额外的路由重定向
    // 如果你的'/'并不是关联的组件，则需要添加额外的路由重定向
    const rRoutes = redirectRoutes(roles, resRoutes)
    routes.value = constantRoutes.concat(resRoutes)
    dynamicRoutes.value = rRoutes
  }

  return { routes, dynamicRoutes, setRoutes, setDynamicRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
