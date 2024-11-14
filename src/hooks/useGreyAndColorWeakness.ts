import { watchEffect } from "vue"
import { useSettingsStore } from "@/store/modules/settings"

const GREY_MODE = "grey-mode"
const COLOR_WEAKNESS = "color-weakness"
const classList = document.documentElement.classList

/** 初始化 */
const initGreyAndColorWeakness = () => {
  const settingsStore = useSettingsStore()
  watchEffect(() => {
    settingsStore.showGreyMode ? classList.add(GREY_MODE) : classList.remove(GREY_MODE)
    settingsStore.showColorWeakness ? classList.add(COLOR_WEAKNESS) : classList.remove(COLOR_WEAKNESS)
  })
}

/** 灰色模式和色弱模式 hook */
export function useGreyAndColorWeakness() {
  return { initGreyAndColorWeakness }
}
