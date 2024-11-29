import { getActiveThemeName, setActiveThemeName } from "@@/utils/cache/local-storage"

const DEFAULT_THEME_NAME = "normal"

type DefaultThemeName = typeof DEFAULT_THEME_NAME

/** 注册的主题名称, 其中 DefaultThemeName 是必填的 */
export type ThemeName = DefaultThemeName | "dark" | "dark-blue"

interface ThemeList {
  title: string
  name: ThemeName
}

/** 主题列表 */
const themeList: ThemeList[] = [
  {
    title: "默认",
    name: DEFAULT_THEME_NAME
  },
  {
    title: "黑暗",
    name: "dark"
  },
  {
    title: "深蓝",
    name: "dark-blue"
  }
]

/** 正在应用的主题名称 */
const activeThemeName = ref<ThemeName>(getActiveThemeName() || DEFAULT_THEME_NAME)

/** 设置主题 */
function setTheme(value: ThemeName) {
  activeThemeName.value = value
}

/** 在 html 根元素上挂载 class */
function addHtmlClass(value: ThemeName) {
  document.documentElement.classList.add(value)
}

/** 在 html 根元素上移除其他主题 class */
function removeHtmlClass(value: ThemeName) {
  const otherThemeNameList = themeList.map(item => item.name).filter(name => name !== value)
  document.documentElement.classList.remove(...otherThemeNameList)
}

/** 初始化 */
function initTheme() {
  // watchEffect 来收集副作用
  watchEffect(() => {
    const value = activeThemeName.value
    removeHtmlClass(value)
    addHtmlClass(value)
    setActiveThemeName(value)
  })
}

/** 主题 Composable */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme }
}
