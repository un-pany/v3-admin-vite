import { useSettingsStore } from "@/pinia/stores/settings"

const GREY_MODE = "grey-mode"
const COLOR_WEAKNESS = "color-weakness"

const classList = document.documentElement.classList

/** 初始化 */
function initGreyAndColorWeakness() {
  const settingsStore = useSettingsStore()
  watchEffect(() => {
    classList.toggle(GREY_MODE, settingsStore.showGreyMode)
    classList.toggle(COLOR_WEAKNESS, settingsStore.showColorWeakness)
  })
}

/** 灰色模式和色弱模式 Composable */
export function useGreyAndColorWeakness() {
  return { initGreyAndColorWeakness }
}
