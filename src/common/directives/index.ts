import type { App } from "vue"
import { permission } from "./permission"

/** 加载自定义指令 */
export function loadDirectives(app: App) {
  app.directive("permission", permission)
}
