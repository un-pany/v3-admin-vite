---
name: v3-use-composables
description: 项目内置组合式函数使用教程，涵盖设备检测、异步下拉、全屏加载、分页、路由监听、主题切换、动态标题、水印等组合式函数。当用户提到以下任何场景时都应触发：使用组合式函数、调用 Composables、判断设备类型、异步加载下拉选项、全屏 Loading、分页逻辑、监听路由变化、切换主题、设置页面标题、添加水印。即使用户没有明确说 Composables，只要意图是使用项目内置的组合式函数就应该使用此 Skill。
metadata:
  author: pany
  version: "2026.06.03"
---

# 内置组合式函数使用教程

项目在 `src/common/composables` 目录下提供了一组通用组合式函数，通过路径别名 `@@/composables/` 导入。

本 Skill 定义的是项目内置的组合式函数，当这些函数不存在时，以用户需求为准，新增对应函数。

## 设备检测 `useDevice`

判断当前设备类型（移动端 / 桌面端），基于 `appStore.device` 的响应式计算属性。

```ts
import { useDevice } from "@@/composables/useDevice"

const { isMobile, isDesktop } = useDevice()

// 在模板或逻辑中使用
if (isMobile.value) {
  // 移动端逻辑
}
```

## 异步下拉选择器 `useFetchSelect`

封装下拉选择器的异步数据加载逻辑，组件挂载时自动调用接口获取选项。

```ts
import { useFetchSelect } from "@@/composables/useFetchSelect"
import { getSelectDataApi } from "./apis/xxx"

const { loading, options, value } = useFetchSelect({
  api: getSelectDataApi // 直接传函数引用，返回 ApiResponseData<SelectOption[]>
})
```

在模板中配合 Element Plus 使用：

```vue
<el-card v-loading="loading">
  <el-select v-model="value" filterable>
    <el-option v-for="item in options" v-bind="item" :key="item.value" placeholder="请选择" />
  </el-select>
</el-card>
```

接口返回的数据格式：

```ts
interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}
```

## 全屏加载 `useFullscreenLoading`

包装一个函数，在其执行期间自动显示全屏 Loading，函数执行完毕后自动关闭。

```ts
import { useFullscreenLoading } from "@@/composables/useFullscreenLoading"

// 方式一：行内调用（推荐简单场景）
const res = await useFullscreenLoading(getSuccessApi)([1, 2, 3])

// 方式二：自定义 Loading 配置
try {
  await useFullscreenLoading(getErrorApi, { text: "删除中...", background: "#F56C6C20" })()
} catch (error) {
  ElMessage.error((error as Error).message)
}

// 方式三：先赋值再调用（适合多次复用）
const submitWithLoading = useFullscreenLoading(submitApi)
await submitWithLoading(formData)
```

## 分页 `usePagination`

封装分页状态与操作，适配 Element Plus 的 `el-pagination` 组件。

```ts
import { usePagination } from "@@/composables/usePagination"

// 使用默认配置
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// 或自定义初始值
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination({
  currentPage: 1,
  pageSize: 20,
  pageSizes: [10, 20, 50, 100]
})
```

在模板中使用：

```html
<el-pagination
  :total="paginationData.total"
  :current-page="paginationData.currentPage"
  :page-size="paginationData.pageSize"
  :page-sizes="paginationData.pageSizes"
  :layout="paginationData.layout"
  @current-change="handleCurrentChange"
  @size-change="handleSizeChange"
/>
```

默认分页参数：

| 参数 | 默认值 |
|------|--------|
| `total` | `0` |
| `currentPage` | `1` |
| `pageSizes` | `[10, 20, 50]` |
| `pageSize` | `10` |
| `layout` | `"total, sizes, prev, pager, next, jumper"` |

## 路由监听 `useRouteListener`

基于发布订阅模式监听路由变化，比直接 `watch` 路由性能更好，组件卸载时自动移除监听。

```ts
import { useRouteListener } from "@@/composables/useRouteListener"

const { listenerRouteChange, removeRouteListener } = useRouteListener()

// 监听路由变化
listenerRouteChange((route) => {
  console.log("路由变化了:", route.path)
})

// 立即执行一次（获取当前路由信息）
listenerRouteChange((route) => {
  activeMenu.value = route.path
}, true) // 第二个参数 immediate = true
```

## 主题切换 `useTheme`

管理主题切换，支持 View Transition 动画效果。

```ts
import { useTheme } from "@@/composables/useTheme"

const { themeList, activeThemeName, initTheme, setTheme } = useTheme()

// 初始化主题（应用启动时调用一次）
initTheme()

// 切换主题（需要传入鼠标事件以实现过渡动画）
function handleThemeChange(event: MouseEvent, themeName: ThemeName) {
  setTheme(event, themeName)
}
```

可用主题：

| name | title |
|------|-------|
| `"normal"` | 默认 |
| `"dark"` | 黑暗 |
| `"dark-blue"` | 深蓝 |

## 动态标题 `useTitle`

动态设置浏览器标签页标题，格式为 `项目名 | 页面名`。

```ts
import { useTitle } from "@@/composables/useTitle"

const { setTitle } = useTitle()

// 设置标题为 "V3 Admin Vite | 用户管理"
setTitle("用户管理")

// 重置为项目默认标题
setTitle()
```

## 水印 `useWatermark`

为页面或指定容器添加水印，支持防御（防止用户通过控制台删除或隐藏水印），组件卸载时自动清除。

```ts
import { useWatermark } from "@@/composables/useWatermark"

// 默认挂载到 body
const { setWatermark, clearWatermark } = useWatermark()

// 设置水印
setWatermark("机密文件")

// 自定义配置
setWatermark("内部使用", {
  defense: true,    // 开启防御（默认 true）
  color: "#c0c4cc", // 文本颜色
  opacity: 0.5,     // 透明度
  size: 16,         // 字体大小
  angle: -20,       // 倾斜角度
  width: 300,       // 单个水印宽度（越大密度越低）
  height: 200       // 单个水印高度（越大密度越低）
})

// 清除水印
clearWatermark()
```

挂载到指定容器：

```vue
<script setup lang="ts">
import { useWatermark } from "@@/composables/useWatermark"

const localRef = useTemplateRef("localRef")
const { setWatermark, clearWatermark } = useWatermark(localRef)

onMounted(() => {
  setWatermark("仅限内部")
})
</script>

<template>
  <div ref="localRef">
    <!-- 内容 -->
  </div>
</template>
```

## 灰色模式与色弱模式 `useGreyAndColorWeakness`

初始化灰色模式和色弱模式，基于 `settingsStore` 的配置自动切换 HTML 根元素的 CSS 类名。

```ts
import { useGreyAndColorWeakness } from "@@/composables/useGreyAndColorWeakness"

const { initGreyAndColorWeakness } = useGreyAndColorWeakness()

// 应用启动时调用一次即可，后续会自动响应 Store 变化
initGreyAndColorWeakness()
```

## 布局模式 `useLayoutMode`

管理系统布局模式（左侧菜单 / 顶部菜单 / 左侧 + 顶部混合菜单）。

```ts
import { useLayoutMode } from "@@/composables/useLayoutMode"
import { LayoutModeEnum } from "@@/constants/app-key"

const { isLeft, isTop, isLeftTop, setLayoutMode } = useLayoutMode()

// 判断当前布局
if (isLeft.value) {
  // 左侧菜单布局
}

// 切换布局
setLayoutMode(LayoutModeEnum.Top)
```

## 使用原则

1. 优先使用这些内置组合式函数，不要重复造轮子
2. 组合式函数内部已处理生命周期（如 `onBeforeUnmount` 自动清理），无需手动管理
3. 需要新增通用组合式函数时，在 `src/common/composables` 目录下创建，命名以 `use` 开头
4. 页面私有的组合式函数应放在对应页面目录的 `composables` 子目录下，而非 `src/common/composables`
