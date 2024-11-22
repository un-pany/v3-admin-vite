import type { App } from "vue"
import SvgIcon from "@/components/SvgIcon/index.vue" // Svg Component
import "virtual:svg-icons-register"

export function loadSvgIcons(app: App) {
  app.component("SvgIcon", SvgIcon)
}
