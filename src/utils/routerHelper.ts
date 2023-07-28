import { cloneDeep, omit } from "lodash-es"
import {
  RouteRecordNormalized,
  RouteRecordRaw,
  Router,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from "vue-router"

/** 路由降级，把三级以上的路由转化为二级路由 */
export const flatMultiLevelRoutes = (routes: RouteRecordRaw[]) => {
  const routesMirror = cloneDeep(routes)
  routesMirror.forEach((route) => {
    // 如果路由是三级以上路由，对其进行降级处理
    isMultipleRoute(route) && promoteRouteLevel(route)
  })
  return routesMirror
}

/** 判断路由层级是否大于 2 */
const isMultipleRoute = (route: RouteRecordRaw) => {
  if (!route || !Reflect.has(route, "children") || !route.children?.length) return false
  // 只要有一个子路由的 children 长度大于 0，就说明是三级以上路由
  return route.children.some((child) => child.children?.length)
}

/** 生成二级路由 */
const promoteRouteLevel = (route: RouteRecordRaw) => {
  // 创建 router 实例是为了获取到当前传入的 route 的所有路由信息
  let router: Router | null = createRouter({
    routes: [route],
    history:
      import.meta.env.VITE_ROUTER_HISTORY === "hash"
        ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
        : createWebHistory(import.meta.env.VITE_PUBLIC_PATH)
  })
  const routes = router.getRoutes()
  // 在 addToChildren 函数中使用上面获取到的路由信息来更新 route 的 children
  addToChildren(routes, route.children || [], route)
  router = null
  // 转为二级路由后，去除所有子路由中的 children
  route.children = route.children?.map((item) => omit(item, "children") as RouteRecordRaw)
}

/** 将给定的子路由添加到指定的路由模块中 */
const addToChildren = (routes: RouteRecordNormalized[], children: RouteRecordRaw[], routeModule: RouteRecordRaw) => {
  children
    // 过滤出在 routes 数组中有匹配名称的子路由
    .filter((child) => routes.some((item) => item.name === child.name))
    .forEach((child) => {
      const route = routes.find((item) => item.name === child.name)
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