import { computed } from "vue"
import { useAppStore } from "@/store/modules/app"
import { DeviceEnum } from "@/constants/app-key"

const appStore = useAppStore()
const isMobile = computed(() => appStore.device === DeviceEnum.Mobile)
const isDesktop = computed(() => appStore.device === DeviceEnum.Desktop)

export function useDevice() {
  return { isMobile, isDesktop }
}
