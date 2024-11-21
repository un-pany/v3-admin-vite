import { useUserStore } from "@/pinia/stores/user"
import { isArray } from "@/utils/validate"

/** 全局权限判断函数，和权限指令 v-permission 功能类似 */
export function checkPermission(permissionRoles: string[]): boolean {
  if (isArray(permissionRoles) && permissionRoles.length > 0) {
    const { roles } = useUserStore()
    return roles.some(role => permissionRoles.includes(role))
  } else {
    console.error("need roles! Like checkPermission(['admin','editor'])")
    return false
  }
}
