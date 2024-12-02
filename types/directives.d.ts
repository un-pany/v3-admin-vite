import type { Directive } from "vue"

export {}

// 由 app.directive 全局注册的自定义指令需要在这里声明 TS 类型才能获得类型提示
declare module "vue" {
  export interface ComponentCustomProperties {
    vPermission: Directive<Element, string[]>
  }
}
