import type { App } from "vue"
import SvgIcon from "~virtual/svg-component"

export function installSvgIcon(app: App) {
  // 注册 SvgIcon 组件
  app.component("SvgIcon", SvgIcon)
}
