/** 统一处理 Cookie */

import CacheKeys from "@/constant/cacheKeys"
import Cookies from "js-cookie"

export const getToken = () => Cookies.get(CacheKeys.TOKEN)
export const setToken = (token: string) => Cookies.set(CacheKeys.TOKEN, token)
export const removeToken = () => Cookies.remove(CacheKeys.TOKEN)
