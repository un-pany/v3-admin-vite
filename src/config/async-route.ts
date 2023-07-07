/** 动态路由配置 */
interface AsyncRouteSettings {
  /**
   * 是否开启动态路由功能？
   * 1. 开启后需要后端配合，在查询用户详情接口返回当前用户可以用来判断并加载动态路由的字段（该项目用的是角色 roles 字段）
   * 2. 假如项目不需要根据不同的用户来显示不同的页面，则应该将 open: false
   */
  open: boolean
  /** 当动态路由功能关闭时：
   * 1. 应该将所有路由都写到常驻路由里面（表明所有登陆的用户能访问的页面都是一样的）
   * 2. 系统自动给当前登录用户赋值一个没有任何作用的默认角色
   */
  defaultRoles: Array<string>
}

const asyncRouteSettings: AsyncRouteSettings = {
  open: true,
  defaultRoles: ["DEFAULT_ROLE"]
}

export default asyncRouteSettings
