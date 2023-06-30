import { getConfigLayout } from "@/utils/cache/local-storage"

/** 布局配置 */
export interface LayoutSettings {
  /** 是否显示 Settings Panel */
  showSettings: boolean
  /** 是否显示标签栏 */
  showTagsView: boolean
  /** 是否显示侧边栏 Logo */
  showSidebarLogo: boolean
  /** 是否固定 Header */
  fixedHeader: boolean
  /** 是否显示消息通知 */
  showNotify: boolean
  /** 是否显示切换主题按钮 */
  showThemeSwitch: boolean
  /** 是否显示全屏按钮 */
  showScreenfull: boolean
  /** 是否缓存标签栏 */
  cacheTagsView: boolean
  /** 是否显示灰色模式 */
  showGreyMode: boolean
  /** 是否显示色弱模式 */
  showColorWeakness: boolean
}

export const layoutSettings: LayoutSettings = getConfigLayout() ?? {
  showSettings: true,
  showTagsView: true,
  fixedHeader: true,
  showSidebarLogo: true,
  showNotify: true,
  showThemeSwitch: true,
  showScreenfull: true,
  cacheTagsView: false,
  showGreyMode: false,
  showColorWeakness: false
}
