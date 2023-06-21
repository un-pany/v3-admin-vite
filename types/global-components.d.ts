import SvgIcon from "@/components/SvgIcon/index.vue"

/** 由 app.component 全局注册的组件需要在这里声明 TS 类型才能获得 Volar 插件提供的类型提示） */
declare module "vue" {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon
  }
}

export {}
