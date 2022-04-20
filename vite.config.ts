import { ConfigEnv, UserConfigExport } from "vite"
import { resolve } from "path"
import vue from "@vitejs/plugin-vue"

/** 配置项文档：https://vitejs.dev/config */
export default (env: ConfigEnv): UserConfigExport => {
  return {
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__dirname, "./src"),
      },
    },
    plugins: [vue()],
  }
}
