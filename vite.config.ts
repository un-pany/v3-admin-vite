/// <reference types="vitest/config" />

import { resolve } from "node:path"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import UnoCSS from "unocss/vite"
import UnpluginSvgComponent from "unplugin-svg-component/vite"
import { defineConfig, loadEnv } from "vite"
import svgLoader from "vite-svg-loader"

// Configuring Vite: https://cn.vite.dev/config
export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const { VITE_PUBLIC_PATH } = loadEnv(mode, root, "") as ImportMetaEnv
  return {
    // 开发或打包构建时用到的公共基础路径
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        // @ 符号指向 src 目录
        "@": resolve(__dirname, "src"),
        // @@ 符号指向 src/common 通用目录
        "@@": resolve(__dirname, "src/common")
      }
    },
    // 开发环境服务器配置
    server: {
      // 是否监听所有地址
      host: true,
      // 端口号
      port: 3333,
      // 端口被占用时，是否直接退出
      strictPort: false,
      // 是否自动打开浏览器
      open: false,
      // 反向代理
      proxy: {
        "/api/v1": {
          target: "https://mock.mengxuegu.com/mock/63218b5fb4c53348ed2bc212",
          // 是否为 WebSocket
          ws: false,
          // 是否允许跨域
          changeOrigin: true
        }
      },
      // 是否允许跨域
      cors: true,
      // 预热常用文件，提高初始页面加载速度
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"]
      }
    },
    // 构建配置
    build: {
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        output: {
          /**
           * @name 分块策略
           * @description 1. 注意这些包名必须存在，否则打包会报错
           * @description 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"],
            vxe: ["vxe-table", "vxe-table-plugin-element", "xe-utils"]
          }
        }
      },
      // 是否开启 gzip 压缩大小报告，禁用时能略微提高构建性能
      reportCompressedSize: false,
      // 单个 chunk 文件的大小超过 2048kB 时发出警告
      chunkSizeWarningLimit: 2048
    },
    // 混淆器
    esbuild:
      mode === "development"
        ? undefined
        : {
            // 打包构建时移除 console.log
            pure: ["console.log"],
            // 打包构建时移除 debugger
            drop: ["debugger"],
            // 打包构建时移除所有注释
            legalComments: "none"
          },
    // 插件配置
    plugins: [
      vue(),
      // 支持 JSX、TSX 语法
      vueJsx(),
      // 将 SVG 文件转化为 Vue 组件
      svgLoader({ defaultImport: "url" }),
      // 生成 SVG 雪碧图
      // github repo: https://github.com/Jevon617/unplugin-svg-component
      UnpluginSvgComponent({
        /** 图标所在的目录 */
        iconDir: [
          resolve(root, "src/common/assets/icons"),
          resolve(root, "src/common/assets/icons/preserve-color")
        ],
        /** 是否生成 d.ts 文件，开启 dev server 或更改 iconDir 目录中文件时自动生成对应文件 */
        dts: true,
        /** 保留原有颜色 SVG 目录（适用于存放多色图标） */
        preserveColor: resolve(root, "src/common/assets/icons/preserve-color"),
        /** 输出 d.ts 文件的目录 */
        dtsDir: resolve(root, "types"),
        /** 给每个 svg name 加上前缀 */
        prefix: "icon",
        /** 自定义生成的组件名，默认值为 "SvgIcon" */
        componentName: "SvgSpritesIcon",
        /** 控制注入 SVG 元素的方法 */
        domInsertionStrategy: "dynamic",
        treeShaking: false
      }),
      // 原子化 CSS
      UnoCSS()
    ],
    // Configuring Vitest: https://cn.vitest.dev/config
    test: {
      include: ["tests/**/*.test.{ts,js}"],
      environment: "jsdom"
    }
  }
})
