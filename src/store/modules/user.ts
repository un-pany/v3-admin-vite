import { ref } from "vue"
import { defineStore } from "pinia"
import { getToken, removeToken } from "@/utils/cache/cookies"
import { resetRouter } from "@/router"

/**
 * 用户状态管理
 */
export const useUserStore = defineStore("user", () => {
  /** 用户的 token */
  const token = ref<string>(getToken() || "")

  /** 用户的角色 */
  const roles = ref<string[]>([])

  /** 用户名 */
  const username = ref<string>("")

  /**
   * 设置用户角色
   * @param {string[]} value - 角色列表
   */
  const setRoles = (value: string[]) => {
    roles.value = value
  }

  /**
   * 用户登出
   */
  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
  }

  /**
   * 重置 token
   */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  return { token, roles, username, setRoles, logout, resetToken }
})

export function useUserStoreHook() {
  return useUserStore()
}
