import type { App, Directive } from "vue"
import { useUserStore } from "@/pinia/stores/user"
import { isArray } from "@@/utils/validate"

/**
 * @name 权限指令
 * @description 和权限判断函数 checkPermission 功能类似
 */
const permission: Directive = {
  mounted(el, binding) {
    const { value: permissionRoles } = binding
    const { roles } = useUserStore()
    if (isArray(permissionRoles) && permissionRoles.length > 0) {
      const hasPermission = roles.some(role => permissionRoles.includes(role))
      // hasPermission || (el.style.display = "none") // 隐藏
      hasPermission || el.parentNode?.removeChild(el) // 销毁
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}

export function loadPermissionDirective(app: App) {
  app.directive("permission", permission)
}
