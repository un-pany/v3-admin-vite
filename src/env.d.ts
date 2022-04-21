/// <reference types="vite/client" />

/** 声明自动引入的 vue 组件 */
declare module "*.vue" {
  import type { DefineComponent } from "vue"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

/** 声明 vite 环境变量的类型（如果未声明则默认是 any） */
declare interface ImportMetaEnv {
  readonly VITE_BASE_API: string
}
