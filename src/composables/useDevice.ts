import { DeviceEnum } from "@/constants/app-key"
import { useAppStore } from "@/store/modules/app"
import { computed } from "vue"

const appStore = useAppStore()
const isMobile = computed(() => appStore.device === DeviceEnum.Mobile)
const isDesktop = computed(() => appStore.device === DeviceEnum.Desktop)

export function useDevice() {
  return { isMobile, isDesktop }
}
