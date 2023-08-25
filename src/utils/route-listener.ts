/** 单独监听路由会浪费渲染性能，使用发布订阅模式去进行分发管理 */

import mitt, { type Handler } from "mitt"
import { type RouteLocationNormalized } from "vue-router"

type HandlerParam = (route: RouteLocationNormalized) => void

const emitter = mitt()
const key = Symbol("ROUTE_CHANGE")
let latestRoute: RouteLocationNormalized

export const setRouteEmitter = (to: RouteLocationNormalized) => {
  emitter.emit(key, to)
  latestRoute = to
}

export const listenerRouteChange = (handler: HandlerParam, immediate = true) => {
  emitter.on(key, handler as Handler)
  immediate && latestRoute && handler(latestRoute)
}

export const removeRouteListener = () => {
  emitter.off(key)
}
