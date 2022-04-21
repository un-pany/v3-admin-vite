/** 布局配置 */
interface ILayoutSettings {
  /** 控制 settings panel 显示 */
  showSettings: boolean
  /** 控制 tagsview 显示 */
  showTagsView: boolean
  /** 控制 siderbar logo 显示 */
  showSidebarLogo: boolean
  /** 如果为真，将固定 header */
  fixedHeader: boolean
  /** 控制 换肤按钮 显示 */
  showThemeSwitch: boolean
  /** 控制 全屏按钮 显示 */
  showScreenfull: boolean
}

const layoutSettings: ILayoutSettings = {
  showSettings: true,
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: true,
  showThemeSwitch: true,
  showScreenfull: true
}

export default layoutSettings
