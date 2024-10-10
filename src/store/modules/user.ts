import { ref, reactive } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { useTagsViewStore } from "./tags-view"
import { useSettingsStore } from "./settings"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import { resetRouter } from "@/router"
import { loginApi, getUserInfoApi } from "@/api/login"
import { type LoginRequestData } from "@/api/login/types/login"
import { MenuItem, getMenuDataApi } from "@/api/hook-demo/use-dynamic-route"
import routeSettings from "@/config/route"

/**
 * 从菜单生成权限资源
 *
 * @param menus 授予用户的菜单列表
 * @returns Map<string, string[]> 权限资源
 */
function buildMenuPermission(menus: MenuItem[]) {
  const ret = new Map<string, string[]>()

  menus.forEach((item) => {
    if (item.type === "menu" && item.children && item.children.length > 0) {
      const tmp = buildMenuPermission(item.children)
      if (tmp.size > 0) {
        tmp.forEach((value, key) => {
          if (ret.has(key)) {
            ret.set(key, [...new Set([...(ret.get(key) as string[]), ...value])])
          } else {
            ret.set(key, value)
          }
        })
      }
    } else if (item.type === "page" && item.children && item.children.length > 0) {
      const res: string[] = []

      item.children?.forEach((child) => {
        if (child.name != "") {
          res.push(child.name)
        }
      })

      if (res.length > 0) {
        ret.set(item.name, res)
      }
    }
  })

  return ret
}

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>([])
  const menus = reactive<MenuItem[]>([])
  const permission = reactive<Map<string, string[]>>(new Map())
  const username = ref<string>("")

  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  /** 登录 */
  const login = async ({ username, password, code }: LoginRequestData) => {
    const { data } = await loginApi({ username, password, code })
    setToken(data.token)
    token.value = data.token
  }
  /** 获取用户详情 */
  const getInfo = async () => {
    const { data } = await getUserInfoApi()
    username.value = data.username
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = data.roles?.length > 0 ? data.roles : routeSettings.defaultRoles
  }
  /** 获取菜单 */
  const getMenu = async () => {
    const data = await getMenuDataApi()
    if (data && data.length > 0) {
      menus.push(...data)

      const permissionMap = buildMenuPermission(data)
      permissionMap.forEach((value, key) => {
        permission.set(key, value)
      })
    }
  }
  /** 模拟角色变化 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    // 用刷新页面代替重新登录
    window.location.reload()
  }
  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return { token, roles, menus, permission, username, login, getInfo, getMenu, changeRoles, logout, resetToken }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
