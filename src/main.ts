import { createApp } from "vue"
import type { Directive } from "vue"
import store from "./store"
import router from "./router"
import "@/router/permission"
import App from "./App.vue"
import ElementPlus from "element-plus"
import loadSvg from "@/icons"
import * as directives from "@/directives"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/styles/index.scss"

const app = createApp(App)
/** Element-Plus 组件完整引入 */
app.use(ElementPlus)
/** 注册所有 Element-Plus Icon */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
/** 加载全局 SVG */
loadSvg(app)
/** 自定义指令 */
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(store).use(router).mount("#app")
