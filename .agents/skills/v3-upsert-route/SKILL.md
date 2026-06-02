---
name: v3-upsert-route
description: 创建或更新路由配置。当用户提到以下任何场景时都应触发：新建页面路由、新增菜单项、修改路由权限、更新路由图标、调整路由结构。即使用户没有明确说路由，只要意图是管理后台页面的导航和访问控制就应该使用此 Skill。使用时需提供路由路径、页面标题和路由类型。
metadata:
  author: Defined
  version: "2026.06.01"
---

# 创建或更新路由

根据用户提供的路由信息，生成或更新路由配置和页面组件。

本 Skill 定义的是项目默认路由模式，当用户的实际需求与本 Skill 约定冲突时，以用户需求为准。

## 输入要求

用户需提供：
1. **路由路径**（如 `/school/list`、`/user`）— 用于 path 配置
2. **页面标题**（中文，如 `学校管理`、`用户管理`）— 用于菜单显示
3. **路由类型**：
   - **公共路由**（constantRoutes）：所有登录用户可访问
   - **权限路由**（dynamicRoutes）⭐ 推荐：需要角色权限控制
4. **权限角色**（仅权限路由）：如 `["admin"]`、`["admin", "editor"]`
5. **子页面数量**：
   - 单页面：图标放在 `children[0].meta`
   - 多页面：图标放在父级 `meta`，需设置 `alwaysShow: true`
6. **图标**：Element Plus 图标名或 SVG 图标名

如果用户信息不完整，主动询问补全后再生成。

## 操作模式

### 创建新路由

当路由路径在 `src/router/index.ts` 中不存在时，生成完整的路由配置和页面组件。

### 更新已有路由

当路由已存在时，根据用户需求修改对应的 meta 配置（如 title、icon、roles 等），保留原有结构不动。

## 生成文件

### 页面组件

路径：`src/pages/{module}/{page}/index.vue`

单页面结构：
```
src/pages/{module}/index.vue
```

多页面结构：
```
src/pages/{module}/{page1}/index.vue
src/pages/{module}/{page2}/index.vue
```

### 路由配置

在 `src/router/index.ts` 中添加或修改路由：
- 公共路由添加到 `constantRoutes`
- 权限路由添加到 `dynamicRoutes`

## 代码规范

### 页面组件结构

```vue
<script setup lang="ts">
defineOptions({
  name: "PageName"
})
</script>

<template>
  <div class="page-name">
    <!-- 页面内容 -->
  </div>
</template>

<style scoped lang="scss">
.page-name {
  padding: 20px;
}
</style>
```

### 路由配置结构

**单页面 + 公共路由：**

```typescript
{
  path: "/example",
  component: Layouts,
  name: "Example",
  meta: { title: "示例" },
  children: [
    {
      path: "",
      component: () => import("@/pages/example/index.vue"),
      name: "ExampleIndex",
      meta: {
        title: "示例",
        elIcon: "Document"
      }
    }
  ]
}
```

**多页面 + 权限路由：**

```typescript
{
  path: "/example",
  component: Layouts,
  redirect: "/example/page1",
  name: "Example",
  meta: {
    title: "示例",
    elIcon: "Document",
    roles: ["admin"],
    alwaysShow: true
  },
  children: [
    {
      path: "page1",
      component: () => import("@/pages/example/page1/index.vue"),
      name: "ExamplePage1",
      meta: { title: "页面1" }
    },
    {
      path: "page2",
      component: () => import("@/pages/example/page2/index.vue"),
      name: "ExamplePage2",
      meta: { title: "页面2" }
    }
  ]
}
```

### 关键规则

1. **路由名称唯一性**：每个路由必须有唯一的 `name` 属性，动态路由尤其重要
2. **懒加载**：使用 `() => import()` 实现路由懒加载
3. **路径格式**：children 的 path 使用相对路径（不带 `/`）
4. **组件命名**：使用 PascalCase，与路由 name 保持一致
5. **权限继承**：子路由会继承父路由的 roles，也可单独设置
6. **Layouts 组件**：嵌套路由的父级必须使用 `component: Layouts`

### 图标放置规则

| 子路由数量 | 图标位置 | 额外配置 |
|-----------|---------|---------|
| 单个 | `children[0].meta` | 无 |
| 多个 | 父级 `meta` | `alwaysShow: true` |

### Meta 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 菜单标题（中文） |
| `hidden` | boolean | 是否在侧边栏隐藏 |
| `elIcon` | string | Element Plus 图标名 |
| `svgIcon` | string | SVG 图标名（`src/common/assets/icons/`） |
| `roles` | string[] | 访问权限（仅动态路由） |
| `keepAlive` | boolean | 是否启用组件缓存 |
| `affix` | boolean | 是否固定在标签页 |
| `alwaysShow` | boolean | 多子路由时必需 |

## 文件结构顺序

路由配置在 `src/router/index.ts` 中的位置：

```
1. import 语句
2. const Layouts = () => import("@/layouts/index.vue")
3. export const constantRoutes: RouteRecordRaw[] = [...]
4. export const dynamicRoutes: RouteRecordRaw[] = [...]
5. export const router = createRouter(...)
6. export function resetRouter()
7. registerNavigationGuard(router)
```

## 命名约定

模块名为 `school` 时：

| 位置 | 命名 |
|------|------|
| 目录 | `src/pages/school/` |
| 组件 name | `SchoolList`、`SchoolGrade` 等 |
| 路由 name | `School`（父级）、`SchoolList`（子级） |
| 路由 path | `/school`（父级）、`list`（子级，相对路径） |

## 设计决策指引

**公共路由 vs 权限路由** — 大多数业务页面应使用权限路由（dynamicRoutes），只有登录、404、首页等基础页面使用公共路由（constantRoutes）。

**单页面 vs 多页面** — 功能简单、独立的页面用单页面结构；有关联的多个子功能用多页面结构（如学校管理下的学校列表、年级管理、班级管理）。

**图标选择** — 优先使用 Element Plus 图标（elIcon），项目自定义图标使用 svgIcon。

**redirect 设置** — 多页面路由必须设置 redirect，指向默认显示的子页面。

## 验证清单

完成路由配置后，执行以下验证：

```bash
# TypeScript 类型检查
npx vue-tsc --noEmit

# ESLint 检查
npx eslint src/router/index.ts
```

检查项：
- [ ] 路由 `name` 唯一
- [ ] `roles` 是数组格式（不是字符串）
- [ ] children 路径是相对路径
- [ ] 图标放置位置正确
- [ ] 多子路由有 `alwaysShow: true`
- [ ] 权限路由有正确的 `roles` 配置

## 路由提示

生成代码后，如果是权限路由，提醒用户：
- 验证 roles 数组格式正确
- 检查父子路由权限设置一致
- 建议用不同角色测试访问权限
