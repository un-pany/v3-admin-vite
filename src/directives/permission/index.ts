import { useUserStoreHook } from '@/store/modules/user'
import { Directive } from 'vue'

/** 权限指令 */
export const permission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    const roles = useUserStoreHook().roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some((role: any) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error("need roles! Like v-permission=\"['admin','editor']\"")
    }
  }
}
