import { defineStore } from "pinia"
import { getSidebarStatus, getActiveThemeName, setSidebarStatus, setActiveThemeName } from "@/utils/cookies"
import themeList from "@/config/theme"

export enum DeviceType {
  Mobile,
  Desktop
}

interface IAppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  /** 主题列表 */
  themeList: { title: string; name: string }[]
  /** 正在应用的主题的名字 */
  activeThemeName: string
}

export const useAppStore = defineStore({
  id: "app",
  state: (): IAppState => {
    return {
      device: DeviceType.Desktop,
      sidebar: {
        opened: getSidebarStatus() !== "closed",
        withoutAnimation: false
      },
      themeList: themeList,
      activeThemeName: getActiveThemeName() || "normal"
    }
  },
  actions: {
    toggleSidebar(withoutAnimation: boolean) {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = withoutAnimation
      if (this.sidebar.opened) {
        setSidebarStatus("opened")
      } else {
        setSidebarStatus("closed")
      }
    },
    closeSidebar(withoutAnimation: boolean) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
      setSidebarStatus("closed")
    },
    toggleDevice(device: DeviceType) {
      this.device = device
    },
    setTheme(activeThemeName: string) {
      // 检查这个主题在主题列表里是否存在
      this.activeThemeName = this.themeList.find((theme) => theme.name === activeThemeName)
        ? activeThemeName
        : this.themeList[0].name
      // 应用到 dom
      document.body.className = `theme-${this.activeThemeName}`
      // 持久化
      setActiveThemeName(this.activeThemeName)
    },
    initTheme() {
      // 初始化
      document.body.className = `theme-${this.activeThemeName}`
    }
  }
})
