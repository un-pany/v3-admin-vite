import { UserConfigExport } from "vite"
import path, { resolve } from "path"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

/** 配置项文档：https://vitejs.dev/config */
export default (): UserConfigExport => {
  return {
    /** build 打包时根据实际情况修改 base */
    base: "./",
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      /** 是否开启 https */
      https: false,
      /** host 设置为 true 才可以使用 network 的形式，以 ip 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 9999,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 如果端口已占用，直接退出 */
      strictPort: true
      /** 接口代理 */
      // proxy: {
      //   "/mock-api": {
      //     target: "https://vue-typescript-admin-mock-server-armour.vercel.app/mock-api",
      //     ws: true,
      //     /** 是否允许跨域 */
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace("/mock-api", "")
      //   }
      // }
    },
    build: {
      brotliSize: false,
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** vite 2.6.x 以上需要配置 minify: terser，terserOptions 才能生效 */
      minify: "terser",
      /** 在 build 代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ["console.log"]
        },
        output: {
          /** 删除注释 */
          comments: false
        }
      },
      assetsDir: "static/assets",
      /** 静态资源打包到 dist 下的不同目录 */
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    /** vite 插件 */
    plugins: [
      vue(),
      /** 自动按需导入 */
      AutoImport({
        dts: "./types/auto-imports.d.ts",
        resolvers: [ElementPlusResolver()]
      }),
      /** 自动按需导入 */
      Components({
        dts: "./types/components.d.ts",
        resolvers: [ElementPlusResolver()]
      }),
      /** svg */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      })
    ]
  }
}
