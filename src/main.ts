// core
import App from "@/App.vue"
import { pinia } from "@/pinia"
import { router } from "@/router"
import { createApp } from "vue"
// load
import { loadDirectives } from "@/directives"
import { loadPlugins } from "@/plugins"
// css
import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "vxe-table/lib/style.css"
import "vxe-table-plugin-element/dist/style.css"
import "@/assets/styles/index.scss"

const app = createApp(App)

// 加载插件
loadPlugins(app)

// 加载自定义指令
loadDirectives(app)

app.use(pinia).use(router)

router.isReady().then(() => {
  app.mount("#app")
})
