import { RouteRecordRaw } from "vue-router"

/**
 * 1、开启动态获取路由
 * 2、修改用户角色判断路由，改为由后端判断路由
 * 3、用户获取信息
 * 4、获取路由
 * 5、递归路由组件路径，生成新的路由格式
 * 6、添加动态路由和重定向路由
 * 7、路由中添加动态路由
 */

import Layout from "@/layout/index.vue"
/** 获取views下面所有的组件 */
const modules = import.meta.glob("../views/**/*.vue")
/** 动态路由 */
/**
 * 组件路由示例：dashboard/workbench/index
 */
export const getDynamicRoute = (asyncRoute: any[]): RouteRecordRaw[] => {
  const newRoute = asyncRoute.map((item) => {
    if (item.component === "Layout") {
      item.component = Layout
    } else {
      item.component = modules[`../views/${item.component}.vue`]
    }
    if (item.children && item.children.length > 0) {
      item.children = getDynamicRoute(item.children)
    }
    return item
  })
  return newRoute
}

/**
 * 如果你的路由首页不一定在路由信息中，请根据实际情况在动态路由前面插入重定向
 *  或者返回的路由信息中含有重定向，则可以省略此步
 * @param roles ["admin","operation","common"]
 * 包含角色的数组，根据实际情况调整
 */
// 判断权限添加重定向路由
export const redirectRoutes = (roles: string[], routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  if (roles.includes("admin") || roles.includes("operation")) {
    return [
      // {
      //   path: "/",
      //   redirect: "/dashboard",
      //   meta: { hidden: true }
      // },
      ...routes
    ]
  } else {
    return [
      // {
      //   path: "/",
      //   redirect: "/schoolManage",
      //   meta: { hidden: true }
      // },
      ...routes
    ]
  }
}
