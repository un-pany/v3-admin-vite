import type { Router, RouteRecordNormalized, RouteRecordRaw } from "vue-router"
import { cloneDeep, omit } from "lodash-es"
import { createRouter } from "vue-router"
import { routerConfig } from "./config"

/** 路由降级（把三级及其以上的路由转化为二级路由） */
export function flatMultiLevelRoutes(routes: RouteRecordRaw[]) {
  const routesMirror = cloneDeep(routes)
  routesMirror.forEach((route) => {
    // 如果路由是三级及其以上路由，对其进行降级处理
    isMultipleRoute(route) && promoteRouteLevel(route)
  })
  return routesMirror
}

/** 判断路由层级是否大于 2 */
function isMultipleRoute(route: RouteRecordRaw) {
  const children = route.children
  // 只要有一个子路由的 children 长度大于 0，就说明是三级及其以上路由
  if (children?.length) return children.some(child => child.children?.length)
  return false
}

/** 生成二级路由 */
function promoteRouteLevel(route: RouteRecordRaw) {
  // 创建 router 实例是为了获取到当前传入的 route 的所有路由信息
  let router: Router | null = createRouter({
    history: routerConfig.history,
    routes: [route]
  })
  const routes = router.getRoutes()
  // 在 addToChildren 函数中使用上面获取到的路由信息来更新 route 的 children
  addToChildren(routes, route.children || [], route)
  router = null
  // 转为二级路由后，去除所有子路由中的 children
  route.children = route.children?.map(item => omit(item, "children") as RouteRecordRaw)
}

/** 将给定的子路由添加到指定的路由模块中 */
function addToChildren(routes: RouteRecordNormalized[], children: RouteRecordRaw[], routeModule: RouteRecordRaw) {
  children.forEach((child) => {
    const route = routes.find(item => item.name === child.name)
    if (route) {
      // 初始化 routeModule 的 children
      routeModule.children = routeModule.children || []
      // 如果 routeModule 的 children 属性中不包含该路由，则将其添加进去
      if (!routeModule.children.includes(route)) {
        routeModule.children.push(route)
      }
      // 如果该子路由还有自己的子路由，则递归调用此函数将它们也添加进去
      if (child.children?.length) {
        addToChildren(routes, child.children, routeModule)
      }
    }
  })
}
