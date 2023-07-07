import { type Directive } from "vue"
import { useUserStoreHook } from "@/store/modules/user"

/** 权限指令，和权限判断函数 checkPermission 功能类似 */
export const permission: Directive = {
  mounted(el, binding) {
    const { value: permissionRoles } = binding
    const { roles } = useUserStoreHook()
    if (Array.isArray(permissionRoles) && permissionRoles.length > 0) {
      const hasPermission = roles.some((role) => permissionRoles.includes(role))
      // hasPermission || (el.style.display = "none") // 隐藏
      hasPermission || el.parentNode?.removeChild(el) // 销毁
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
