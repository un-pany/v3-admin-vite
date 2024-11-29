import type { App } from "vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

export type TElementPlusIconName = keyof typeof ElementPlusIconsVue

export function installElementPlusIcons(app: App) {
  // 注册所有 Element Plus Icon
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
