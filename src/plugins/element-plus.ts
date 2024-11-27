import type { App } from "vue"
import ElementPlus from "element-plus"

export function installElementPlus(app: App) {
  // Element Plus 组件完整引入
  app.use(ElementPlus)
}
