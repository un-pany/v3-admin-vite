// core
import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"
import "@/router/permission"
// load
import { loadSvg } from "@/icons"
import { loadPlugins } from "@/plugins"
import { loadDirectives } from "@/directives"
// css
import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "vxe-table/lib/style.css"
import "vxe-table-plugin-element/dist/style.css"
import "@/styles/index.scss"
import { Watermark } from '@pansy/watermark';

/*****************************************水印区域，开发者自行决定是否添加水印****************************************** */

const addWaterMark = () => {
  const watermark = new Watermark({
    text: 'v3-admin-vite'
  });

  // 如果需要修改水印参数，请调用

  // watermark.update({

  // });

  // 隐藏水印
  // watermark.hide();

  // 显示水印
  watermark.show();

  // 销毁水印
  // watermark.destroy();
}

addWaterMark()

/*****************************************水印区域，开发者自行决定是否添加水印****************************************** */
const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
/** 加载全局 SVG */
loadSvg(app)
/** 加载自定义指令 */
loadDirectives(app)

app.use(store).use(router).mount("#app")
