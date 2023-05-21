import { watch, onBeforeMount, onMounted, onBeforeUnmount } from "vue"
import { useRoute } from "vue-router"
import { useAppStore, DeviceEnum } from "@/store/modules/app"

/** 参考 Bootstrap 的响应式设计 WIDTH = 992 */
const WIDTH = 992

/** 根据大小变化重新布局 */
export default () => {
  const route = useRoute()
  const appStore = useAppStore()

  const _isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const _resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = _isMobile()
      appStore.toggleDevice(isMobile ? DeviceEnum.Mobile : DeviceEnum.Desktop)
      if (isMobile) {
        appStore.closeSidebar(true)
      }
    }
  }

  watch(
    () => route.name,
    () => {
      if (appStore.device === DeviceEnum.Mobile && appStore.sidebar.opened) {
        appStore.closeSidebar(false)
      }
    }
  )

  onBeforeMount(() => {
    window.addEventListener("resize", _resizeHandler)
  })

  onMounted(() => {
    if (_isMobile()) {
      appStore.toggleDevice(DeviceEnum.Mobile)
      appStore.closeSidebar(true)
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", _resizeHandler)
  })
}
