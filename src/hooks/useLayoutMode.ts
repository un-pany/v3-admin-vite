import { LayoutModeEnum } from "@/constants/app-key"
import { useSettingsStore } from "@/store/modules/settings"
import { computed } from "vue"

const settingsStore = useSettingsStore()
const isLeft = computed(() => settingsStore.layoutMode === LayoutModeEnum.Left)
const isTop = computed(() => settingsStore.layoutMode === LayoutModeEnum.Top)
const isLeftTop = computed(() => settingsStore.layoutMode === LayoutModeEnum.LeftTop)

function setLayoutMode(mode: LayoutModeEnum) {
  settingsStore.layoutMode = mode
}

export function useLayoutMode() {
  return { isLeft, isTop, isLeftTop, setLayoutMode }
}
