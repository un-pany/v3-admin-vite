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
      hasPermission || el.parentNode?.removeChild(el)
    } else {
      throw new Error(`参数必须是一个数组且长度大于 0，参考：v-permission="['admin', 'editor']"`)
    }
  }
}

export function installPermissionDirective(app: App) {
  app.directive("permission", permission)
}
