/** 菜单类型 */
export enum MenuType {
  Menu = "menu",
  Page = "page",
  Button = "button",
  Link = "link"
}

/** 菜单元数据 */
export interface MenuMeta {
  /** 菜单标题 */
  title: string
  /** 菜单图标 */
  icon?: string
  /** 菜单总是可见 */
  alwaysShow?: boolean
  /** 菜单是否可用 */
  roles?: string[]
}

/** 菜单详情 */
export interface MenuItem {
  /** 菜单名称 */
  name: string
  /** 菜单类型 */
  type: MenuType
  /** 菜单路径 */
  path: string
  /** 菜单元数据 */
  meta: MenuMeta
  /** 子菜单 */
  children?: MenuItem[]
}

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
const dynamicRoutes: MenuItem[] = [
  {
    path: "/permission",
    name: "Permission",
    type: MenuType.Menu,
    meta: {
      title: "权限",
      icon: "lock",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        name: "PagePermission",
        type: MenuType.Page,
        meta: {
          title: "页面级",
          roles: ["admin"] // 或者在子导航中设置角色
        }
      },
      {
        path: "directive",
        name: "DirectivePermission",
        type: MenuType.Page,
        meta: {
          title: "按钮级" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  }
]

/** 模拟加载菜单接口 */
export function getMenuDataApi() {
  return new Promise<typeof dynamicRoutes>((resolve, reject) => {
    // 模拟接口响应时间 1s
    setTimeout(() => {
      // 模拟接口调用成功
      if (Math.random() < 0.8) {
        resolve(dynamicRoutes)
      } else {
        // 模拟接口调用出错
        reject(new Error("接口发生错误"))
      }
    }, 1000)
  })
}
