/** 统一处理 localStorage */

import CacheKeys from "@/constant/cacheKeys"

export const getSidebarStatus = () => localStorage.getItem(CacheKeys.SIDEBAR_STATUS)
export const setSidebarStatus = (sidebarStatus: string) => localStorage.setItem(CacheKeys.SIDEBAR_STATUS, sidebarStatus)

export const getActiveThemeName = () => localStorage.getItem(CacheKeys.ACTIVE_THEME_NAME)
export const setActiveThemeName = (themeName: string) => localStorage.setItem(CacheKeys.ACTIVE_THEME_NAME, themeName)
