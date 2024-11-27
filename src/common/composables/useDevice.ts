import { useAppStore } from "@/pinia/stores/app"
import { DeviceEnum } from "@@/constants/app-key"
import { computed } from "vue"

const appStore = useAppStore()

const isMobile = computed(() => appStore.device === DeviceEnum.Mobile)
const isDesktop = computed(() => appStore.device === DeviceEnum.Desktop)

/** 设备类型 Composable */
export function useDevice() {
  return { isMobile, isDesktop }
}
