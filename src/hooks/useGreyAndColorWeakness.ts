import { watchEffect } from "vue"
import { useSettingsStore } from "@/store/modules/settings"

const GREY_MODE = "grey-mode"
const COLOR_WEAKNESS = "color-weakness"
const classList = document.documentElement.classList

/** 初始化 */
const initGreyAndColorWeakness = () => {
  const settingsStore = useSettingsStore()
  watchEffect(() => {
    classList.toggle(GREY_MODE, settingsStore.showGreyMode)
    classList.toggle(COLOR_WEAKNESS, settingsStore.showColorWeakness)
  })
}

/** 灰色模式和色弱模式 hook */
export function useGreyAndColorWeakness() {
  return { initGreyAndColorWeakness }
}
