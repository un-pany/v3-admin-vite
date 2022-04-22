import { createApp, Directive } from "vue"
import router from "./router"
import "@/router/permission"
import store from "./store"
import App from "./App.vue"
import * as directives from "@/directives"
import loadSvg from "@/icons"
import "@/styles/index.scss"
import "normalize.css"

const app = createApp(App)
// 加载全局 svg
loadSvg(app)
// 自定义指令
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key])
})

app.use(store).use(router).mount("#app")
