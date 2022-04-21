import { defineStore } from 'pinia'
import layoutSettings from '@/config/layout'

interface ISettingsState {
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  showThemeSwitch: boolean
  showScreenfull: boolean
}

export const useSettingsStore = defineStore({
  id: 'settings',
  state: (): ISettingsState => {
    return {
      fixedHeader: layoutSettings.fixedHeader,
      showSettings: layoutSettings.showSettings,
      showTagsView: layoutSettings.showTagsView,
      showSidebarLogo: layoutSettings.showSidebarLogo,
      showThemeSwitch: layoutSettings.showThemeSwitch,
      showScreenfull: layoutSettings.showScreenfull
    }
  },
  actions: {
    changeSetting(payload: { key: string, value: any }) {
      const { key, value } = payload
      switch (key) {
        case 'fixedHeader':
          this.fixedHeader = value
          break
        case 'showSettings':
          this.showSettings = value
          break
        case 'showSidebarLogo':
          this.showSidebarLogo = value
          break
        case 'showTagsView':
          this.showTagsView = value
          break
        case 'showThemeSwitch':
          this.showThemeSwitch = value
          break
        case 'showScreenfull':
          this.showScreenfull = value
          break
        default:
          break
      }
    }
  }
})
