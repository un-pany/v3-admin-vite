import { createApp } from "vue"
import SvgIcon from "@/components/SvgIcon/index.vue" // Svg Component
import "virtual:svg-icons-register"

export default (app: ReturnType<typeof createApp>) => {
  app.component("SvgIcon", SvgIcon)
}
