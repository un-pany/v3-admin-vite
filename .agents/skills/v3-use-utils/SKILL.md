---
name: v3-use-utils
description: 项目内置工具函数使用教程，涵盖验证、日期格式化、CSS 变量、权限判断、本地存储等工具。当用户提到以下任何场景时都应触发：使用工具函数、调用 utils、格式化日期、判断权限、操作 localStorage、获取/设置 CSS 变量、验证数据类型、判断外链、获取/存储 Token。即使用户没有明确说 Utils，只要意图是使用项目内置的通用工具函数就应该使用此 Skill。
metadata:
  author: pany
  version: "2026.06.03"
---

# 内置工具函数使用教程

项目在 `src/common/utils` 目录下提供了一组通用工具函数，通过路径别名 `@@/utils/` 导入。

## 验证工具 `@@/utils/validate`

```ts
import { isArray, isString, isExternal } from "@@/utils/validate"

// 判断是否为数组
isArray([1, 2, 3]) // true

// 判断是否为字符串
isString("hello") // true

// 判断是否为外链（以 http(s)://、mailto:、tel: 开头）
isExternal("https://example.com") // true
isExternal("/dashboard") // false
```

## 日期格式化 `@@/utils/datetime`

基于 dayjs 封装，无效日期返回 `"N/A"`。

```ts
import { formatDateTime } from "@@/utils/datetime"

// 默认格式 YYYY-MM-DD HH:mm:ss
formatDateTime("2026-01-15T10:30:00") // "2026-01-15 10:30:00"

// 自定义格式
formatDateTime("2026-01-15", "YYYY/MM/DD") // "2026/01/15"

// 支持时间戳
formatDateTime(1737000000000) // 格式化后的日期时间

// 无效输入
formatDateTime("invalid") // "N/A"
```

## CSS 变量 `@@/utils/css`

读取和设置 CSS 变量（变量名必须以 `--` 开头）。`getCssVar` 未找到变量时返回空串 `""`，不是 `undefined`。

```ts
import { getCssVar, setCssVar } from "@@/utils/css"

// 获取全局 CSS 变量
const color = getCssVar("--el-color-primary")

// 设置全局 CSS 变量
setCssVar("--el-color-primary", "#409eff")

// 操作指定元素上的 CSS 变量
const el = document.querySelector(".container") as HTMLElement
setCssVar("--bg-color", "#fff", el)
```

## 权限判断 `@@/utils/permission`

基于当前用户角色判断是否拥有指定权限，内部读取 `useUserStore().roles`。

```ts
import { checkPermission } from "@@/utils/permission"

// 判断当前用户是否拥有 admin 或 editor 角色
if (checkPermission(["admin", "editor"])) {
  // 有权限
}
```

适用于模板中 `v-permission` 指令无法覆盖的场景（如在 TS 逻辑中做条件判断）。

## 本地存储 `@@/utils/local-storage`

对 localStorage 的类型安全封装，所有 key 统一由 `@@/constants/cache-key` 中的 `CacheKey` 管理。

```ts
import { getToken, setToken, removeToken } from "@@/utils/local-storage"

// Token 操作
setToken("eyJhbGciOiJIUzI1NiJ9...")
const token = getToken()
removeToken()
```

可用函数一览：

| 分组 | 函数 | 说明 |
|------|------|------|
| Token | `getToken` / `setToken` / `removeToken` | 用户认证令牌 |
| 布局配置 | `getLayoutsConfig` / `setLayoutsConfig` / `removeLayoutsConfig` | 系统布局设置 |
| 侧边栏 | `getSidebarStatus` / `setSidebarStatus` | 侧边栏展开/收起状态 |
| 主题 | `getActiveThemeName` / `setActiveThemeName` | 当前主题名称 |
| 标签栏 | `getVisitedViews` / `setVisitedViews` / `getCachedViews` / `setCachedViews` | 标签页缓存 |

## 使用原则

1. 优先使用这些内置工具，不要重复造轮子
2. 需要新增 localStorage 存储项时，先在 `CacheKey` 中定义 key，再在 `local-storage.ts` 中添加对应的 get / set 函数
3. 需要新增通用工具时，根据功能归类到对应文件，或创建新的工具文件
4. 工具文件之间可以互相引用（如 `permission.ts` 引用了 `@@/utils/validate`），新建工具时也可复用已有工具
