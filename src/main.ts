import { createApp, Directive } from "vue"
import router from "./router"
import "@/router/permission"
import store from "./store"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import loadSvg from "@/icons"
import * as directives from "@/directives"
import "@/styles/index.scss"
import "normalize.css"

const app = createApp(App)
/** element-plus 组件完整引入 */
app.use(ElementPlus)
/** 加载全局 svg */
loadSvg(app)
/** 自定义指令 */
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(store).use(router).mount("#app")
