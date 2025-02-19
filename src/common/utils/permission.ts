import { useUserStore } from "@/pinia/stores/user"
import { isArray } from "@@/utils/validate"

/** 全局权限判断函数，和权限指令 v-permission 功能类似 */
export function checkPermission(permissionRoles: string[]): boolean {
  if (isArray(permissionRoles) && permissionRoles.length > 0) {
    const { roles } = useUserStore()
    return roles.some(role => permissionRoles.includes(role))
  } else {
    console.error("参数必须是一个数组且长度大于 0，参考：checkPermission(['admin', 'editor'])")
    return false
  }
}
