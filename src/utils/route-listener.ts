/** 单独监听路由会浪费渲染性能，使用发布订阅模式去进行分发管理 */

import mitt, { type Handler } from "mitt"
import { type RouteLocationNormalized } from "vue-router"

/** 回调函数的类型 */
type Callback = (route: RouteLocationNormalized) => void

const emitter = mitt()
const key = Symbol("ROUTE_CHANGE")
let latestRoute: RouteLocationNormalized

/** 设置最新的路由信息 */
export const setRouteEmitter = (to: RouteLocationNormalized) => {
  emitter.emit(key, to)
  latestRoute = to
}

/** 设置路由变化时的回调函数（可以选择立即执行一次回调函数） */
export const listenerRouteChange = (callback: Callback, immediate = false) => {
  emitter.on(key, callback as Handler)
  immediate && latestRoute && callback(latestRoute)
}

/** 移除路由变化事件监听器 */
export const removeRouteListener = (callback: Callback) => {
  emitter.off(key, callback as Handler)
}

/** 移除所有路由变化事件监听器 */
export const removeAllRouteListener = () => {
  emitter.off(key)
}
