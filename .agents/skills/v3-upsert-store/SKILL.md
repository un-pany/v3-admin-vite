---
name: v3-upsert-store
description: 创建或更新全局状态（Store）。当用户提到以下任何场景时都应触发：新建状态管理、新增 Pinia Store、给 Store 加字段。即使用户没有明确说 Store，只要意图是和状态管理器有关就应该使用此 Skill。使用时需提供 Store 名称、State 字段和 Actions 描述。
metadata:
  author: pany
  version: "2026.06.01"
---

# 创建或更新 Pinia Store

根据用户提供的 Store 名称、State 字段和 Actions 描述，生成或更新 Pinia Store 文件。

本 Skill 定义的是项目默认 Store 模式，当用户的实际需求与本 Skill 约定冲突时，以用户需求为准。

## 输入要求

用户需提供：
1. **Store 名称**（如 `counter`、`notification`）— 用于文件名和命名
2. **State 字段列表** — 每个字段需明确：
   - 字段名（英文，camelCase）
   - 类型（string / number / boolean / array / object / 自定义类型等）
   - 初始值
   - 是否需要持久化到 localStorage
3. **Actions 描述** — 需要哪些操作（如 reset、toggle、increment、fetch 等）

如果用户信息不完整，主动询问补全后再生成。

## 操作模式

### 创建新 Store

当 `src/pinia/stores/<store名>.ts` 不存在时，生成完整的 Store 文件。

### 更新已有 Store

当文件已存在时，在已有代码中追加新的 State 字段和 Actions，保留原有代码不动。追加时：
- 新 State 声明插入到已有 State 声明之后
- 新 Actions 插入到已有 Actions 之后（如有 `// #region` 分组则放在对应区域）
- 更新 `return` 语句，追加新导出的字段和方法

## 生成文件

### Store 文件

路径：`src/pinia/stores/<store名>.ts`

### 持久化相关（仅在用户指定持久化字段时生成）

- 在 `src/common/constants/cache-key.ts` 的 `CacheKey` 类中追加新的 Key
- 在 `src/common/utils/local-storage.ts` 中追加对应的 get/set 函数

## 代码规范

### Store 结构

完整的 Store 文件结构如下（以一个带持久化和辅助函数的 Store 为例）：

```ts
import type { XxxType } from "@@/types/xxx"
import { getXxx, setXxx } from "@@/utils/local-storage"
import { pinia } from "@/pinia"

interface Sidebar {
  opened: boolean
  withoutAnimation: boolean
}

/** 辅助函数的用途描述 */
function helperFunction(param: string) {
  // ...
}

export const useXxxStore = defineStore("xxx", () => {
  // Token
  const token = ref<string>(getToken() || "")

  // 侧边栏状态
  const sidebar: Sidebar = reactive({
    opened: true,
    withoutAnimation: false
  })

  // 设置 Token
  const setToken = (value: string) => {
    token.value = value
  }

  // 切换侧边栏
  const toggleSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
  }

  return { token, sidebar, setToken, toggleSidebar }
})

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useXxxStoreOutside() {
  return useXxxStore(pinia)
}
```

### 关键规则

1. **必须使用 Setup Store 语法**（`defineStore("id", () => { ... })`），不使用 Options API
2. **必须导出 `useXxxStoreOutside`** 函数，且 JSDoc 注释原样保留（见上方模板）
3. **`defineStore` 第一个参数**（Store ID）：单词用小写（如 `"user"`），多词用 kebab-case（如 `"tags-view"`）
4. **State 类型标注**：
   - `ref` 用泛型：`ref<string>("")`、`ref<number>(0)`、`ref<string[]>([])`
   - `reactive` 在变量上标注类型：`const sidebar: Sidebar = reactive({...})`
5. **Actions 统一使用箭头函数**：`const xxx = (param: Type) => { ... }`
6. **注释风格**：
   - Store 内部的 State 和 Actions 用 `//` 单行注释，描述具体用途（如 `// 切换侧边栏`、`// 设置 Token`）
   - 不要使用 `/** */` JSDoc 注释 Store 内部成员
   - 不要使用泛化的分区标题（如 `// state`、`// actions`），每条注释直接描述对应内容
   - 模块级辅助函数（Store 外部）使用 `/** */` JSDoc 注释
7. **`// #region` / `// #endregion`** 仅在同一类操作有多组变体时使用（如 tags-view 的 add/del/delOthers/delAll），普通 Store 不需要
8. **自动导入**：`defineStore`、`ref`、`reactive`、`watch`、`watchEffect`、`computed` 无需手动 import
9. **Vue 类型导入是允许的**：如 `import type { Ref } from "vue"`

### 文件结构顺序

```
1. import type 语句（类型导入）
2. import 语句（运行时导入，Pinia 实例必须导入）
3. interface / type 声明（Store 需要的本地类型）
4. 模块级辅助函数（不需要响应式访问的纯函数，用 /** */ 注释）
5. export const useXxxStore = defineStore(...)
6. export function useXxxStoreOutside()
```

### 持久化模式

当字段需要持久化时，遵循项目已有模式：

**1. CacheKey 常量**（`src/common/constants/cache-key.ts`）：

```ts
static readonly XXX_DATA = `${SYSTEM_NAME}-xxx-data-key`
```

命名规则：大写下划线 + `-key` 后缀。

**2. localStorage 工具函数**（`src/common/utils/local-storage.ts`）：

简单字符串值：
```ts
// #region Xxx 描述
export function getXxx() {
  return localStorage.getItem(CacheKey.XXX_DATA)
}

export function setXxx(value: string) {
  localStorage.setItem(CacheKey.XXX_DATA, value)
}
// #endregion
```

对象/数组值：
```ts
// #region Xxx 描述
export function getXxx() {
  const json = localStorage.getItem(CacheKey.XXX_DATA)
  return json ? (JSON.parse(json) as XxxType) : null
}

export function setXxx(data: XxxType) {
  localStorage.setItem(CacheKey.XXX_DATA, JSON.stringify(data))
}
// #endregion
```

**3. Store 中使用**：

```ts
import { getXxx, setXxx } from "@@/utils/local-storage"

// Xxx 数据
const data = ref<XxxType>(getXxx() ?? defaultValue)

// 监听变化并持久化
watch(data, (newVal) => {
  setXxx(newVal)
})
```

当需要同时监听多个持久化字段时，用 `watchEffect` 代替多个 `watch`：

```ts
watchEffect(() => {
  setVisitedViews(visitedViews.value)
  setCachedViews(cachedViews.value)
})
```

### 类型定义

- 简单类型直接在 Store 文件中用 `interface` 或 `type` 声明（定义在 Store 函数之前）
- 需要被外部引用的类型加 `export`（如 `export type TagView = Partial<RouteLocationNormalizedGeneric>`）
- 复杂、共享类型抽离到 `types` 目录或就近放置

## 命名约定

Store 名为 `notification` 时：

| 位置 | 命名 |
|------|------|
| 文件 | `src/pinia/stores/notification.ts` |
| Store ID | `"notification"` |
| Composable | `useNotificationStore` |
| Outside | `useNotificationStoreOutside` |
| CacheKey（如需） | `NOTIFICATION_DATA` |
| localStorage 函数（如需） | `getNotificationData` / `setNotificationData` |

多词 Store 名使用 kebab-case 文件名和 Store ID（如 `user-preference` → `"user-preference"` → `useUserPreferenceStore`）。

## 导入规范

```ts
// 类型导入
import type { Ref } from "vue"
import type { RouteRecordRaw } from "vue-router"

// 运行时导入：常量和工具函数
import { SIDEBAR_CLOSED, SIDEBAR_OPENED } from "@@/constants/app-key"
import { getSidebarStatus, setSidebarStatus } from "@@/utils/local-storage"

// 运行时导入：Pinia 实例（必需）
import { pinia } from "@/pinia"

// 运行时导入：其他 Store（当需要跨 Store 交互时）
import { useSettingsStore } from "./settings"
```

注意导入顺序：类型导入在前，运行时导入在后；`@@` 路径在前，`@` 路径在后。

## 设计决策指引

**ref vs reactive** — 当 State 是一个有结构的对象且字段间关联紧密时用 `reactive`（如 sidebar 的 opened + withoutAnimation），否则每个独立状态用 `ref`。大多数情况下用 `ref`。

**watch vs watchEffect** — 监听单个字段变化时用 `watch`；监听多个字段且都需要持久化时用 `watchEffect`（自动追踪依赖，代码更简洁）。

**辅助函数放在 Store 内还是外** — 不依赖响应式状态的纯逻辑函数放在 Store 外部（如权限过滤、格式化），需要访问 Store 内 `ref` / `reactive` 的函数放在内部作为 Action。

**是否需要 Reset Action** — 如果 Store 管理的是临时状态（如表单数据、UI 状态），通常需要一个 Reset 方法恢复初始值。如果是用户身份等持久数据，通常不需要通用 Reset。

**是否需要 Outside 函数** — 始终生成。这是项目约定，确保在路由守卫、Axios 拦截器等 setup 外场景可用。
