export const getRouters = (): Promise<any[]> => {
  return new Promise((resolve) => {
    resolve(routes)
  })
}

const routes = [
  {
    path: "/unocss",
    component: "Layout",
    redirect: "/unocss/index",
    children: [
      {
        path: "index",
        component: "unocss/index",
        name: "UnoCSS",
        meta: {
          title: "unocss",
          svgIcon: "unocss"
        }
      }
    ]
  },
  {
    path: "/link",
    component: "Layout",
    children: [
      {
        path: "https://juejin.cn/post/7089377403717287972",
        name: "Link",
        meta: {
          title: "外链",
          svgIcon: "link"
        }
      }
    ]
  },
  {
    path: "/table",
    component: "Layout",
    redirect: "/table/element-plus",
    name: "Table",
    meta: {
      title: "表格",
      elIcon: "Grid"
    },
    children: [
      {
        path: "element-plus",
        component: "table/element-plus/index",
        name: "ElementPlus",
        meta: {
          title: "Element Plus",
          keepAlive: true
        }
      },
      {
        path: "vxe-table",
        component: "table/vxe-table/index",
        name: "VxeTable",
        meta: {
          title: "Vxe Table",
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/menu",
    component: "Layout",
    redirect: "/menu/menu1",
    name: "Menu",
    meta: {
      title: "多级菜单",
      svgIcon: "menu"
    },
    children: [
      {
        path: "menu1",
        component: "menu/menu1/index",
        redirect: "/menu/menu1/menu1-1",
        name: "Menu1",
        meta: {
          title: "menu1"
        },
        children: [
          {
            path: "menu1-1",
            component: "menu/menu1/menu1-1/index",
            name: "Menu1-1",
            meta: {
              title: "menu1-1"
            }
          },
          {
            path: "menu1-2",
            component: "menu/menu1/menu1-2/index",
            redirect: "/menu/menu1/menu1-2/menu1-2-1",
            name: "Menu1-2",
            meta: {
              title: "menu1-2"
            },
            children: [
              {
                path: "menu1-2-1",
                component: "menu/menu1/menu1-2/menu1-2-1/index",
                name: "Menu1-2-1",
                meta: {
                  title: "menu1-2-1"
                }
              },
              {
                path: "menu1-2-2",
                component: "menu/menu1/menu1-2/menu1-2-2/index",
                name: "Menu1-2-2",
                meta: {
                  title: "menu1-2-2"
                }
              }
            ]
          },
          {
            path: "menu1-3",
            component: "menu/menu1/menu1-3/index",
            name: "Menu1-3",
            meta: {
              title: "menu1-3"
            }
          }
        ]
      },
      {
        path: "menu2",
        component: "menu/menu2/index",
        name: "Menu2",
        meta: {
          title: "menu2"
        }
      }
    ]
  },
  {
    path: "/hook-demo",
    component: "Layout",
    redirect: "/hook-demo/use-fetch-select",
    name: "HookDemo",
    meta: {
      title: "hook 示例",
      elIcon: "Menu",
      alwaysShow: true
    },
    children: [
      {
        path: "use-fetch-select",
        component: "hook-demo/use-fetch-select",
        name: "UseFetchSelect",
        meta: {
          title: "useFetchSelect"
        }
      },
      {
        path: "use-fullscreen-loading",
        component: "hook-demo/use-fullscreen-loading",
        name: "UseFullscreenLoading",
        meta: {
          title: "useFullscreenLoading"
        }
      }
    ]
  },
  {
    path: "/permission",
    component: "Layout",
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "权限管理",
      svgIcon: "lock",
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: "permission/page",
        name: "PagePermission",
        meta: {
          title: "页面权限"
        }
      },
      {
        path: "directive",
        component: "permission/directive",
        name: "DirectivePermission",
        meta: {
          title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  }
]
