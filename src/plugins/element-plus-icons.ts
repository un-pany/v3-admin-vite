import type { App } from "vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

export function installElementPlusIcons(app: App) {
  // 注册所有 Element Plus Icons
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
