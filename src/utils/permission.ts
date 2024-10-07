import { useUserStoreHook } from "@/store/modules/user"

/** 全局权限判断函数，和权限指令 v-permission 功能类似 */
export const checkPermission = (permissionRoles: string[]): boolean => {
  if (Array.isArray(permissionRoles) && permissionRoles.length > 0) {
    const { permission } = useUserStoreHook()
    let hasPermission = false
    permissionRoles.forEach((item) => {
      const res = (item as string).split(":")
      if (permission.has(res[0])) {
        if (permission.get(res[0])?.includes(res[1])) {
          hasPermission = true
        }
      }
    })

    return hasPermission
  } else {
    console.error("need roles! Like checkPermission(['admin','editor'])")
    return false
  }
}
