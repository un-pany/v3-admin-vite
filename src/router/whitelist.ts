import type { RouteLocationNormalizedGeneric, RouteRecordNameGeneric } from "vue-router"

/** 免登录白名单（匹配路由 path） */
const whiteListByPath: string[] = ["/login"]

/** 免登录白名单（匹配路由 name） */
const whiteListByName: RouteRecordNameGeneric[] = []

/** 判断是否在白名单 */
export function isWhiteList(to: RouteLocationNormalizedGeneric) {
  // path 和 name 任意一个匹配上即可
  return whiteListByPath.includes(to.path) || whiteListByName.includes(to.name)
}
