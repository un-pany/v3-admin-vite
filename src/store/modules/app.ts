import { reactive, ref } from "vue"
import { defineStore } from "pinia"
import { getSidebarStatus, getActiveThemeName, setSidebarStatus, setActiveThemeName } from "@/utils/cache/localStorage"
import type { ThemeName } from "@/config/theme"

export enum DeviceType {
  Mobile,
  Desktop
}

interface ISidebar {
  opened: boolean
  withoutAnimation: boolean
}

const setClassName = (value: ThemeName) => {
  document.documentElement.className = value
}

export const useAppStore = defineStore("app", () => {
  const sidebar: ISidebar = reactive({
    opened: getSidebarStatus() !== "closed",
    withoutAnimation: false
  })
  const device = ref<DeviceType>(DeviceType.Desktop)
  /** 正在应用的主题的名字 */
  const activeThemeName = ref<ThemeName>(getActiveThemeName() || "normal")

  const toggleSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
    if (sidebar.opened) {
      setSidebarStatus("opened")
    } else {
      setSidebarStatus("closed")
    }
  }
  const closeSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus("closed")
  }
  const toggleDevice = (value: DeviceType) => {
    device.value = value
  }
  const setTheme = (value: ThemeName) => {
    activeThemeName.value = value
    // 应用到 Dom
    setClassName(activeThemeName.value)
    // 持久化
    setActiveThemeName(activeThemeName.value)
  }
  const initTheme = () => {
    // 初始化
    setClassName(activeThemeName.value)
  }

  return { device, sidebar, activeThemeName, toggleSidebar, closeSidebar, toggleDevice, setTheme, initTheme }
})
