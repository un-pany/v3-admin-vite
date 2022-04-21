import { createApp } from "vue"
import SvgIcon from "@/components/SvgIcon/index.vue" // svg component
import "virtual:svg-icons-register"

export default (app: ReturnType<typeof createApp>) => {
  app.component("SvgIcon", SvgIcon)
}
