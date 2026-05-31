---
name: v3-create-crud
description: 创建增删改查（CRUD）页面，基于 Element Plus 组件库，包含表格、搜索、分页、新增/编辑弹窗、删除确认等功能。使用时需提供模块名称和字段信息。
metadata:
  author: pany
  version: "1.0.0"
---

# 创建 CRUD 页面

根据用户提供的模块名称和字段信息，生成增删改查页面。

## 输入要求

用户需提供：
1. **模块名称**（如 `product`、`order`）
2. **字段列表**（字段名、类型、中文标签、是否必填、是否作为搜索条件）

## 生成文件

在 `src/pages/<模块路径>/` 下生成：

1. `index.vue` — 页面主文件
2. `apis/index.ts` — 接口文件
3. `apis/type.ts` — 类型定义

## 页面结构规范

页面由三个区域组成：

1. **搜索区域** — `el-card`（`v-loading="loading"` + `shadow="never"` + `class="search-wrapper"`），内含行内表单 + 查询/重置按钮
2. **表格区域** — `el-card`（`v-loading="loading"` + `shadow="never"`），内含工具栏（新增/批量删除/下载/刷新）+ 表格 + 分页
3. **弹窗** — 新增和编辑共用同一个 `el-dialog`，通过 `formData.id` 是否为 `undefined` 区分标题

## 代码组织规范

使用 `<script lang="ts" setup>` + `defineOptions({ name })` 命名组件。

逻辑按增删改查分区，用 `// #region` 和 `// #endregion` 标记：

- **增**：DEFAULT_FORM_DATA 常量、dialogVisible、formRef（`useTemplateRef`）、formData、formRules、handleCreateOrUpdate、resetForm
- **删**：handleDelete（带 ElMessageBox.confirm 确认）
- **改**：handleUpdate（打开弹窗并用 `cloneDeep(row)` 填充数据）
- **查**：tableData、searchFormRef（`useTemplateRef`）、searchData（reactive）、getTableData、handleSearch、resetSearch

分页使用 `usePagination` composable（来自 `@@/composables/usePagination`），通过 `watch` 监听分页参数变化自动请求数据。

`handleSearch` 逻辑：若 `currentPage` 已经是 1 则直接调用 `getTableData()`，否则将 `currentPage` 设为 1（由 watch 自动触发请求）。

## 接口规范

接口文件使用命名空间导入类型：`import type * as __Name__ from "./type"`

导出四个函数：

- `create__Name__Api` — POST，参数为表单数据
- `delete__Name__Api` — DELETE，参数一般为 id
- `update__Name__Api` — PUT，参数为表单数据
- `get__Name__Api` — GET，参数为分页和搜索条件

使用 `import { request } from "@/http/axios"` 发起请求。

## 类型规范

页面中使用具名导入：`import type { CreateOrUpdate__Name__RequestData, __Name__Data } from "./apis/type"`

类型文件导出：

- `CreateOrUpdate__Name__RequestData` — 表单提交数据（id 可选）
- `__Name__RequestData` — 列表查询参数（含 currentPage、size 和搜索字段）
- `__Name__Data` — 表格行数据
- `__Name__ResponseData` — 使用 `ApiResponseData<{ list: __Name__Data[]; total: number }>`

## 样式规范

使用 `<style lang="scss" scoped>`，仅需以下通用样式类：

- `.search-wrapper` — 搜索卡片底部 padding 调整
- `.toolbar-wrapper` — flex 两端对齐
- `.table-wrapper` — 底部 margin
- `.pager-wrapper` — flex 右对齐

## 关键细节

- 表单数据用 `cloneDeep`（来自 `lodash-es`）处理，DEFAULT_FORM_DATA 定义为 `const` 常量
- 弹窗关闭时通过 `@closed` 事件调用 resetForm（内部执行 `clearValidate` + 重置 formData）
- 搜索重置使用 `resetFields()` 后调用 `handleSearch()`
- 图标从 `@element-plus/icons-vue` 按需导入
- `ElMessage`、`ElMessageBox`、`ref`、`reactive`、`watch`、`useTemplateRef` 均为自动导入
- `FormRules` 类型从 `element-plus` 导入

## 路由提示

生成代码后，提醒用户在路由配置中添加对应路由。
