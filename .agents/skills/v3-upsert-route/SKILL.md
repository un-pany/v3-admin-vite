---
name: v3-upsert-route
description: 创建或更新路由表（Router）。当用户提到以下任何场景时都应触发：新建页面路由、新增菜单项、修改路由权限、调整路由结构。即使用户没有明确说路由，只要意图是导航菜单和访问控制就应该使用此 Skill。使用时需提供路由路径、名称和类型等必要信息。
metadata:
  author: Defined & pany
  version: "2026.06.02"
---

# 创建或更新路由

根据用户提供的路由信息，在 `src/router/index.ts` 中生成或更新路由配置。

本 Skill 定义的是项目默认路由模式，当用户的实际需求与本 Skill 约定冲突时，以用户需求为准。

## 输入要求

用户需提供：
1. **路由路径**（如 `/school`、`/user`）
2. **路由标题**（中文，如 `学校管理`、`用户管理`）
3. **路由类型**：
   - **常驻路由**（constantRoutes）：所有登录用户可访问
   - **动态路由**（dynamicRoutes）：需要角色或权限控制
4. **权限配置**（仅动态路由）：角色如 `["admin"]`、`["admin", "editor"]`，权限标识字符如 `["permission:page-level"]`
5. **图标**：Element Plus 图标名（elIcon）或 SVG 图标名（svgIcon）
6. **子路由信息**：路径、标题、权限配置、图标等

如果用户信息不完整，主动询问补全后再生成。

## 路由文件结构

路由配置在 `src/router/index.ts` 中。

其他路由文件（通常无需修改）：
- `src/router/config.ts` — 路由模式、动态路由开关、三级路由缓存配置、路径常量（`DASHBOARD_PATH`、`REDIRECT_PATH`）
- `src/router/guard.ts` — 导航守卫（登录验证、权限加载）
- `src/router/helper.ts` — 路由降级（三级路由转二级）
- `src/router/whitelist.ts` — 免登录白名单

## 侧边栏显示规则

理解这套规则是正确配置路由的关键：

- **1 个非隐藏叶子子路由** → 子路由直接显示在侧边栏（扁平化，不显示父级折叠）
- **多个非隐藏子路由** → 自动嵌套显示（父级作为折叠组）
- **`alwaysShow: true`** → 强制始终显示父级折叠，即使只有 1 个子路由

因此：
- 单页面模块不需要设置 `alwaysShow`，侧边栏会直接显示子路由
- 多页面模块不需要设置 `alwaysShow`，自动嵌套
- 只有 "单子路由但仍想显示为折叠组" 的特殊需求才用 `alwaysShow: true`
- 动态路由的特殊情况：如果角色或权限过滤可能导致只剩 1 个可见子路由，建议加 `alwaysShow: true` 防止意外扁平化

## 图标放置规则

| 场景 | 图标位置 | 原因 |
|------|---------|------|
| 单子路由（扁平显示） | `children[0].meta` | 子路由直接作为菜单项展示 |
| 多子路由（嵌套显示） | 父级 `meta` | 父级作为折叠组的标题 |

## 路由配置示例

### 单页面模块

侧边栏中显示为一个菜单项（不显示父级折叠），图标放在子路由：

```typescript
{
  path: "/school",
  component: Layouts,
  redirect: "/school/list",
  children: [
    {
      path: "list",
      component: () => import("@/pages/school/index.vue"),
      name: "SchoolList",
      meta: {
        title: "学校管理",
        elIcon: "School"
      }
    }
  ]
}
```

### 多页面模块

侧边栏中显示为折叠组，图标放在父级：

```typescript
{
  path: "/school",
  component: Layouts,
  redirect: "/school/list",
  name: "School",
  meta: {
    title: "学校管理",
    elIcon: "School"
  },
  children: [
    {
      path: "list",
      component: () => import("@/pages/school/list/index.vue"),
      name: "SchoolList",
      meta: { title: "学校列表" }
    },
    {
      path: "grade",
      component: () => import("@/pages/school/grade/index.vue"),
      name: "SchoolGrade",
      meta: { title: "年级管理" }
    }
  ]
}
```

### 三级路由

支持嵌套子路由，中间层有两种写法：

**有自身页面的中间层**（渲染自身内容 + 子路由 `<router-view>`）：

```typescript
{
  path: "category",
  component: () => import("@/pages/school/category/index.vue"),
  redirect: "/school/category/primary",
  name: "SchoolCategory",
  meta: {
    title: "分类管理",
    alwaysShow: true
  },
  children: [
    {
      path: "primary",
      component: () => import("@/pages/school/category/primary/index.vue"),
      name: "SchoolCategoryPrimary",
      meta: { title: "小学" }
    }
  ]
}
```

**纯逻辑分组的中间层**（无自身页面，子路由直接渲染在上层 `Layouts` 中）：

```typescript
{
  path: "category",
  redirect: "/school/category/primary",
  name: "SchoolCategory",
  meta: {
    title: "分类管理"
  },
  children: [
    {
      path: "primary",
      component: () => import("@/pages/school/category/primary/index.vue"),
      name: "SchoolCategoryPrimary",
      meta: { title: "小学" }
    },
    {
      path: "secondary",
      component: () => import("@/pages/school/category/secondary/index.vue"),
      name: "SchoolCategorySecondary",
      meta: { title: "中学" }
    }
  ]
}
```

注意：如果 `src/router/config.ts` 中 `thirdLevelRouteCache: true`，三级路由会被降级为二级，内嵌子路由结构将失效。

### 外链路由

```typescript
{
  path: "/link",
  meta: {
    title: "外部链接",
    elIcon: "Link"
  },
  children: [
    {
      path: "https://example.com",
      component: () => {},
      name: "ExternalLink",
      meta: { title: "示例网站" }
    }
  ]
}
```

### 系统路由（通常无需修改）

以下是项目已内置的基础设施路由，日常开发不需要创建，仅供参考：

**独立页面**（无 `Layouts`、无 `children`，用于脱离后台布局的页面）：

```typescript
// 错误页面、登录页面等
{
  path: "/403",
  component: () => import("@/pages/error/403.vue"),
  meta: { hidden: true }
}

// 404 使用 alias 实现全局未匹配路由兜底
{
  path: "/404",
  component: () => import("@/pages/error/404.vue"),
  meta: { hidden: true },
  alias: "/:pathMatch(.*)*"
}

// 登录页
{
  path: "/login",
  component: () => import("@/pages/login/index.vue"),
  meta: { hidden: true }
}
```

**重定向中转路由**（使用动态路径参数）：

```typescript
{
  path: "/redirect",
  component: Layouts,
  meta: { hidden: true },
  children: [
    {
      path: ":path(.*)",
      component: () => import("@/pages/redirect/index.vue")
    }
  ]
}
```

## Meta 字段完整说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | `string` | 菜单标题（中文） |
| `hidden` | `boolean` | 默认 false，设为 true 时不在侧边栏显示 |
| `elIcon` | `ElementPlusIconsName` | Element Plus 图标名 |
| `svgIcon` | `SvgName` | SVG 图标名（`src/common/assets/icons/` 下） |
| `roles` | `string[]` | 可访问的角色列表（仅动态路由） |
| `permissions` | `string[]` | 可访问的权限标识字符列表（仅动态路由） |
| `keepAlive` | `boolean` | 是否缓存页面（需页面 `name` 与路由 `name` 一致） |
| `affix` | `boolean` | 默认 false，设为 true 时固定在标签页不可关闭 |
| `alwaysShow` | `boolean` | 强制显示父级折叠（仅在单子路由时有实际效果） |
| `breadcrumb` | `boolean` | 默认 true，设为 false 时不在面包屑中显示 |
| `activeMenu` | `string` | 如 `/xxx/xxx`，进入该路由时高亮指定的侧边栏菜单项，适合 `hidden` 路由 |

`svgIcon` 和 `elIcon` 同时设置时，`svgIcon` 优先生效。

## 关键规则

1. **`name` 唯一性**：动态路由（`dynamicRoutes`）必须有唯一 `name`（`resetRouter` 依赖 `name` 移除路由）；常驻路由建议设置 `name`（隐藏页面如 redirect/403/404 可省略）
2. **懒加载**：使用 `() => import()` 实现路由懒加载
3. **子路由相对路径**：`children` 的 `path` 不带 `/`
4. **`Layouts` 组件**：顶级页面路由的父级使用 `component: Layouts`（外链路由除外，外链不需要 `Layouts`）
5. **权限继承**：子路由未设置 `roles` / `permissions` 时，会受父路由权限过滤结果影响
6. **权限关系**：同一路由同时设置 `roles` 和 `permissions` 时，满足其一即可访问（OR 关系）
7. **`redirect`**：有子路由的页面模块应设置 `redirect` 指向默认子页面

## 命名约定

模块名为 `school` 时：

| 位置 | 命名 |
|------|------|
| 目录 | `src/pages/school/` |
| 页面 name | `SchoolList`、`SchoolGrade`（PascalCase） |
| 父路由 name | `School` |
| 子路由 name | `SchoolList`、`SchoolGrade` |
| 父路由 path | `/school` |
| 子路由 path | `list`、`grade`（相对路径） |

## 设计决策指引

**常驻路由 vs 动态路由** — 大多数业务页面应使用动态路由（dynamicRoutes）。只有登录、404、首页等基础页面使用常驻路由（constantRoutes）。

**单页面模块 vs 多页面模块** — 功能独立的页面用单页面结构；有关联的多个子功能用多页面结构。

**图标选择** — 优先使用 Element Plus 图标（elIcon），项目自定义图标使用 svgIcon。

## 验证清单

完成路由配置后检查：
- [ ] 路由 `name` 全局唯一
- [ ] `roles` / `permissions` 是数组格式或 `undefined`
- [ ] `children` 的 `path` 是相对路径（不带 `/`）
- [ ] 有子路由时父路由设置了 `redirect`，且 `redirect` 指向的子路由路径实际存在
- [ ] 对应页面已存在时，页面 `name` 与路由 `name` 一致
- [ ] 顶级业务路由使用了 `component: Layouts`
- [ ] 动态路由中角色或权限过滤可能只剩 1 个可见子路由时，父路由加了 `alwaysShow: true`
