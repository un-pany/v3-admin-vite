import { computed, watch } from "vue"
import { useRoute } from "vue-router"
import { useAppStore, DeviceType } from "@/store/modules/app"

/** 参考 Bootstrap 的响应式设计 width = 992 */
const WIDTH = 992

/** 根据大小变化重新布局 */
export default () => {
  const route = useRoute()
  const appStore = useAppStore()

  const device = computed(() => {
    return appStore.device
  })

  const sidebar = computed(() => {
    return appStore.sidebar
  })

  const watchRouter = watch(
    () => route.name,
    () => {
      if (appStore.device === DeviceType.Mobile && appStore.sidebar.opened) {
        appStore.closeSidebar(false)
      }
    }
  )

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const resizeMounted = () => {
    if (isMobile()) {
      appStore.toggleDevice(DeviceType.Mobile)
      appStore.closeSidebar(true)
    }
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      appStore.toggleDevice(isMobile() ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile()) {
        appStore.closeSidebar(true)
      }
    }
  }

  const addEventListenerOnResize = () => {
    window.addEventListener("resize", resizeHandler)
  }

  const removeEventListenerResize = () => {
    window.removeEventListener("resize", resizeHandler)
  }

  return {
    device,
    sidebar,
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize,
    watchRouter
  }
}
