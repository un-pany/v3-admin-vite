/** 角色配置 */
interface IRolesSettings {
  /** 是否开启角色功能（开启后需要后端配合，在查询用户详情接口返回当前用户的所属角色） */
  openRoles: boolean
  /** 当角色功能关闭时，当前登录用户的默认角色将生效（默认为admin，拥有所有权限） */
  defaultRoles: Array<string>
}

const rolesSettings: IRolesSettings = {
  openRoles: true,
  defaultRoles: ['admin']
}

export default rolesSettings
