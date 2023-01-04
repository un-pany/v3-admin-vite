import { ref } from "vue"
import { defineStore } from "pinia"
import layoutSettings from "@/config/layout"

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

  return {
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
