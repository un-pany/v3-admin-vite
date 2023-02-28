import { useUserStoreHook } from "@/store/modules/user"
const modules = import.meta.glob('@/views/*/*.vue');
/** 全局权限判断函数，和指令 v-permission 功能类似 */
export const checkPermission = (value: string[]): boolean => {
  if (value && value instanceof Array && value.length > 0) {
    const roles = useUserStoreHook().roles
    const permissionRoles = value
    return roles.some((role) => {
      return permissionRoles.includes(role)
    })
  } else {
    console.error("need roles! Like v-permission=\"['admin','editor']\"")
    return false
  }
}

// 递归处理菜单 后台返回的组件字符串形式改为变量引入  这里用到了Glob导入
export const menuHandle = (apiMenu : any[]): any[] =>{
  apiMenu.forEach(((item :any, index)=>{
    if(item.component === 'Layout'){
      item.component = () => import("@/layout/index.vue")
    }else if(item.component){
      item.component = modules['/src'+item.component]
    }
    if(item.children){
      menuHandle(item.children)
    }
  }))
  return apiMenu;
}


