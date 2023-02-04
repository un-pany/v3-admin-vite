/** 统一处理 localStorage */

import CacheKey from "@/constants/cacheKey"
import { type ThemeName } from "@/hooks/useTheme"

export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}
export const setSidebarStatus = (sidebarStatus: "opened" | "closed") => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}

export const getActiveThemeName = () => {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName
}
export const setActiveThemeName = (themeName: ThemeName) => {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
}

/// 控件尺寸
export const getControlSize = () => {
  return localStorage.getItem(CacheKey.CONTROL_SIZE) as string
}

/// 控件尺寸
export const setControlSize = (size: string) => {
  localStorage.setItem(CacheKey.CONTROL_SIZE, size)
}
