import { useUserStoreHook } from "@/store/modules/user"
import { type RouteRecordRaw } from "vue-router"

interface IMeta {
  title: string
  roles: Array
  level: number
}
interface IRouterItem {
  path: string
  name: string
  meta?: IMeta
}

/**动态路由 */
export const getDynamicRoute: RouteRecordRaw = () => {
  const Layout = import("@/layout/index.vue")
  const userStore = useUserStoreHook()
  const asyncRoute = userStore.asyncRoute.map((item: IRouterItem) => {
    item.component = Layout
    if (item.children.length > 0) {
      item.children.map((childItem: IRouterItem) => {
        childItem.component = () => import(`@/views/${item.name.toLowerCase()}/${childItem.path}.vue`)
        return childItem
      })
    }
    return item
  })
  return asyncRoute
}
