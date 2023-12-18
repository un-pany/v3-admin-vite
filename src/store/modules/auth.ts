import { defineStore } from "pinia"
import { useUserStore } from "./user"
import { loginApi, getUserInfoApi } from "@/api/login"
import { setToken } from "@/utils/cache/cookies"
import { type LoginRequestData } from "@/api/login/types/login"

/**
 * 用户认证状态管理
 */
export const useAuthStore = defineStore("auth", () => {
  const userStore = useUserStore()

  /**
   * 用户登录
   * @param {LoginRequestData} loginData - 登录请求数据
   */
  const login = async (loginData: LoginRequestData) => {
    const { data } = await loginApi(loginData)
    userStore.token = data.token
    setToken(data.token)
    await getInfo()
  }

  /**
   * 获取用户信息
   */
  const getInfo = async () => {
    const { data } = await getUserInfoApi()
    userStore.username = data.username
    userStore.roles = data.roles
  }

  return { login, getInfo }
})

export function useAuthStoreHook() {
  return useAuthStore()
}
