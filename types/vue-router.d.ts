import type * as ElementPlusIconsVue from "@element-plus/icons-vue"
import type { SvgName } from "~virtual/svg-component"
import "vue-router"

export {}

type ElementPlusIconsName = keyof typeof ElementPlusIconsVue

declare module "vue-router" {
  interface RouteMeta {
    /**
     * @description 设置该路由在侧边栏和面包屑中展示的名字
     */
    title?: string
    /**
     * @description 设置该路由的图标，记得将 svg 导入 src/common/assets/icons
     */
    svgIcon?: SvgName
    /**
     * @description 设置该路由的图标，直接使用 Element Plus 的 Icon（与 svgIcon 同时设置时，svgIcon 将优先生效）
     */
    elIcon?: ElementPlusIconsName
    /**
     * @description 默认 false，设置 true 的时候该路由不会在侧边栏出现
     */
    hidden?: boolean
    /**
     * @description 设置能进入该路由的角色，支持多个角色叠加
     */
    roles?: string[]
    /**
     * @description 默认 true，如果设置为 false，则不会在面包屑中显示
     */
    breadcrumb?: boolean
    /**
     * @description 默认 false，如果设置为 true，它则会固定在 tags-view 中
     */
    affix?: boolean
    /**
     * @description 当一个路由的 children 属性中声明的非隐藏子路由只有 1 个且该子路由为叶子节点时，会将这个子路由当做父路由显示在侧边栏
     * @description 当大于 1 个时，会恢复成嵌套模式
     * @description 如果想不管个数总是显示父路由，可以在父路由上设置 alwaysShow: true
     */
    alwaysShow?: boolean
    /**
     * @description 示例: activeMenu: "/xxx/xxx"，
     * @description 当设置了该属性进入路由时，则会高亮 activeMenu 属性对应的侧边栏
     * @description 该属性适合使用在有 hidden: true 属性的路由上
     */
    activeMenu?: string
    /**
     * @description 是否缓存该路由页面
     * @description 默认为 false，为 true 时代表需要缓存，此时该路由和该页面都需要设置一致的 Name
     */
    keepAlive?: boolean
  }
}
