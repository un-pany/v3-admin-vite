import type { App } from "vue"
import SvgIcon from "@@/components/SvgIcon/index.vue" // Svg Component

export function installSvgIcons(app: App) {
  app.component("SvgIcon", SvgIcon)
}
