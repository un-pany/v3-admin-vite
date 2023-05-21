import { reactive, ref } from "vue"
import { defineStore } from "pinia"
import { getSidebarStatus, setSidebarStatus } from "@/utils/cache/localStorage"

export enum DeviceEnum {
  Mobile,
  Desktop
}

interface Sidebar {
  opened: boolean
  withoutAnimation: boolean
}

export const useAppStore = defineStore("app", () => {
  const sidebar: Sidebar = reactive({
    opened: getSidebarStatus() !== "closed",
    withoutAnimation: false
  })
  const device = ref<DeviceEnum>(DeviceEnum.Desktop)

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
  const toggleDevice = (value: DeviceEnum) => {
    device.value = value
  }

  return { device, sidebar, toggleSidebar, closeSidebar, toggleDevice }
})
