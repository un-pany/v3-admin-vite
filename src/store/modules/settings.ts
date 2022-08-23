import { defineStore } from "pinia"
import layoutSettings from "@/config/layout"

interface ISettingsState {
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  showThemeSwitch: boolean
  showScreenfull: boolean
}

export const useSettingsStore = defineStore({
  id: "settings",
  state: (): ISettingsState => {
    return {
      fixedHeader: layoutSettings.fixedHeader,
      showSettings: layoutSettings.showSettings,
      showTagsView: layoutSettings.showTagsView,
      showSidebarLogo: layoutSettings.showSidebarLogo,
      showThemeSwitch: layoutSettings.showThemeSwitch,
      showScreenfull: layoutSettings.showScreenfull
    }
  }
})
