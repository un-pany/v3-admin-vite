import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import layoutSettings from "@/config/layout"
import { getControlSize, setControlSize } from "@/utils/cache/localStorage"

export const useSettingsStore = defineStore("settings", () => {
  const fixedHeader = ref<boolean>(layoutSettings.fixedHeader)
  const showSettings = ref<boolean>(layoutSettings.showSettings)
  const showTagsView = ref<boolean>(layoutSettings.showTagsView)
  const showSidebarLogo = ref<boolean>(layoutSettings.showSidebarLogo)
  const showNotify = ref<boolean>(layoutSettings.showNotify)
  const showThemeSwitch = ref<boolean>(layoutSettings.showThemeSwitch)
  const showScreenfull = ref<boolean>(layoutSettings.showScreenfull)
  const showGreyMode = ref<boolean>(layoutSettings.showGreyMode)
  const showColorWeakness = ref<boolean>(layoutSettings.showColorWeakness)
  const showSearchRoute = ref<boolean>(layoutSettings.showSearchRoute)
  const showControlSize = ref<boolean>(layoutSettings.showControlSize)
  const controlSize = ref<string>(getControlSize() || layoutSettings.controlSize)

  // 更新控件尺寸
  const updateControlSize = (value: string) => {
    controlSize.value = value
    setControlSize(value)
  }

  return {
    controlSize,
    showControlSize,
    updateControlSize,
    showSearchRoute,
    fixedHeader,
    showSettings,
    showTagsView,
    showSidebarLogo,
    showNotify,
    showThemeSwitch,
    showScreenfull,
    showGreyMode,
    showColorWeakness
  }
})

/** 在 setup 外使用 */
export function useSettingsStoreHook() {
  return useSettingsStore(store)
}
