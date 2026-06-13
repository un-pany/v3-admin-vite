---
name: v3-create-crud
description: 创建增删改查（CRUD）页面，基于 Element Plus 组件库，包含表格、搜索、分页、新增/编辑弹窗、删除确认等功能。当用户提到以下任何场景时都应触发：创建管理页面、创建列表页、创建表格页。即使用户没有明确说 CRUD，只要意图是创建带表格和表单操作的后台页面就应该使用此 Skill。使用时需提供模块名称和字段信息。
metadata:
  author: Glittering Ma & pany
  version: "2026.06.13"
---

# 创建 CRUD 页面

根据用户提供的模块名称和字段信息，生成增删改查页面。

本 Skill 定义的是默认 CRUD 模式，当用户的实际需求与本 Skill 约定冲突时，以用户需求为准，灵活调整。

## 输入要求

用户需提供：
1. **模块名称**（如 `product`、`order`）— 用于目录名和命名
2. **字段列表** — 每个字段需明确：
   - 字段名（英文，camelCase）
   - 中文标签
   - 类型（string / number / boolean / enum / date 等）
   - 是否必填
   - 是否作为搜索条件
   - 是否需要自定义渲染（如 tag 状态展示）

如果用户信息不完整，主动询问补全后再生成。

## 生成文件

在 `src/pages/<模块路径>/` 下生成：

1. `index.vue` — 页面主文件
2. `apis/index.ts` — 接口文件
3. `apis/type.ts` — 类型定义

## 设计决策指引

生成代码时需要做出的判断（不要机械套用，根据具体场景决定）：

**弹窗宽度** — 默认用 `30%`，有复杂布局用 `50%` 或更大的比例。

**工具栏按钮** — 按需组合，不必全部包含：
- "新增" 几乎总是需要的
- "批量删除" 仅在有批量操作需求时添加（对应表格 selection 列）
- "下载/导出" 仅在有导出需求时添加
- "刷新当前页" 推荐保留，方便调试和手动刷新

**删除确认文案** — 选择对用户最有辨识度的字段作为确认提示（如用户名、订单编号、商品名称），而不是 id。

**搜索参数传递** — 保持简单，避免类型体操：
- 字段少（2-3 个）时可以逐个列出
- 字段多时用 `...searchData` 展开更简洁
- 核心原则：不要出现 `as any`，除非明确要求

**表单字段 vs 表格列** — 不是所有字段都同时出现在两处：
- 仅创建时需要的字段（如密码）：表单中有，表格中无
- 系统生成的字段（如创建时间）：表格中有，表单中无
- 用 `v-if="formData.id === undefined"` 控制仅新增时显示的字段

## 页面结构规范

页面整体包裹在 `<div class="app-container">` 中，由搜索区域、表格区域、弹窗三部分组成。

### 1. 搜索区域

- `el-card`：`v-loading="loading"` + `shadow="never"` + `class="search-wrapper"`
- 内含 `el-form`：`ref="searchFormRef"` + `:inline="true"` + `:model="searchData"`
- 每个搜索字段设置 `prop`（`resetFields` 依赖它）和 `label`
- 末尾放查询按钮（`:icon="Search"` + `type="primary"`）和重置按钮（`:icon="Refresh"`）

### 2. 表格区域

- `el-card`：`v-loading="loading"` + `shadow="never"`
- 工具栏（`div.toolbar-wrapper`）分左右两侧：
  - 左侧：文字按钮（新增、批量删除等）
  - 右侧：圆形图标按钮 + `el-tooltip`（下载、刷新当前页等）
- 表格（`div.table-wrapper` > `el-table :data="tableData"`）：
  - 需要批量操作时加 `type="selection"` 首列
  - 数据列：`prop` + `label` + `align="center"`
  - 操作列：`fixed="right"` + 适当 `width` + `align="center"`，内含修改/删除按钮（`text bg size="small"`）
- 分页（`div.pager-wrapper` > `el-pagination`）

### 3. 弹窗

- `el-dialog`：`v-model="dialogVisible"` + 通过 `formData.id === undefined` 判断新增/修改标题 + `@closed="resetForm"`
- 使用 `@closed` 而非 `@close`（确保关闭动画结束后再重置，避免用户看到表单内容闪烁）
- 表单：`ref="formRef"` + `:model="formData"` + `:rules="formRules"` + `label-width="auto"`
- footer：取消按钮 + 确认按钮（`type="primary"` + `:loading="loading"`）

## 代码组织规范

使用 `<script lang="ts" setup>` + `defineOptions({ name: "PascalCase 模块名" })`。

顶部声明共享的 `loading` `ref` 和 `usePagination` 解构，分页请求统一通过 `callback`、`resetCurrentPage`、`watchPagination` 组织。

逻辑按增删改查分区，用 `// #region` 和 `// #endregion` 标记：

### 增（Create）

```ts
const DEFAULT_FORM_DATA: CreateOrUpdateXxxRequestData = {
  id: undefined,
  // ... 所有表单字段的初始值
}
const dialogVisible = ref<boolean>(false)
const formRef = useTemplateRef("formRef")
const formData = ref<CreateOrUpdateXxxRequestData>(cloneDeep(DEFAULT_FORM_DATA))
const formRules: FormRules<CreateOrUpdateXxxRequestData> = { /* 验证规则 */ }

function handleCreateOrUpdate() {
  formRef.value?.validate((valid) => {
    if (!valid) { ElMessage.error("表单校验不通过"); return }
    loading.value = true
    const api = formData.value.id === undefined ? createXxxApi : updateXxxApi
    api(formData.value).then(() => {
      ElMessage.success("操作成功")
      dialogVisible.value = false
      getTableData()
    }).finally(() => { loading.value = false })
  })
}

function resetForm() {
  formRef.value?.clearValidate()
  formData.value = cloneDeep(DEFAULT_FORM_DATA)
}
```

**为什么新增和编辑共用一个弹窗**：减少重复代码，通过 `id` 是否存在区分状态，共享验证规则和提交逻辑。

### 删（Delete）

```ts
function handleDelete(row: XxxData) {
  ElMessageBox.confirm(`正在删除${模块中文名}：${row.辨识字段}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteXxxApi(row.id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
```

### 改（Update）

```ts
function handleUpdate(row: XxxData) {
  dialogVisible.value = true
  formData.value = cloneDeep(row)
}
```

**为什么用 `cloneDeep`**：避免编辑时直接修改表格行数据（引用类型），用户取消编辑时表格数据不会被污染。

### 查（Read）

```ts
const tableData = ref<XxxData[]>([])
const searchFormRef = useTemplateRef("searchFormRef")
const searchData = reactive({ /* 搜索字段，初始值为空字符串 */ })

function getTableData() {
  loading.value = true
  getXxxApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    username: searchData.username,
    phone: searchData.phone
  }).then(({ data }) => {
    paginationData.total = data.total
    tableData.value = data.list
  }).catch(() => {
    tableData.value = []
  }).finally(() => { loading.value = false })
}

function handleSearch() {
  resetCurrentPage()
}

function resetSearch() {
  searchFormRef.value?.resetFields()
  handleSearch()
}
```

**`handleSearch` 的逻辑**：直接调用 `resetCurrentPage`。`resetCurrentPage` 会在当前已是第 1 页时直接请求，否则重置页码并由分页监听触发请求，避免重复调用。

### 分页监听

```ts
watchPagination()
```

**为什么用 `watchPagination` 而不是 `onMounted`**：让分页变化和初始加载共享同一个入口，数据获取逻辑只写一处。

## usePagination 用法

```ts
import { usePagination } from "@@/composables/usePagination"

const { paginationData, resetCurrentPage, watchPagination } = usePagination({
  callback: getTableData
})
```

`paginationData` 是 `reactive` 对象，包含：`total`、`currentPage`、`pageSizes`、`pageSize`、`layout`。模板中使用 `v-model` 双向绑定页码和每页条数：

```html
<el-pagination
  v-model:current-page="paginationData.currentPage"
  v-model:page-size="paginationData.pageSize"
  :page-sizes="paginationData.pageSizes"
  :total="paginationData.total"
  :layout="paginationData.layout"
  background
/>
```

## 表格列的自定义渲染

对于需要视觉区分的字段（状态、角色、类型等），使用 `el-tag` 渲染。思路是：突出重要/异常值，其余用温和颜色兜底。

```html
<!-- boolean：二元对立，可以用 success / danger 对比 -->
<el-table-column prop="status" label="状态" align="center">
  <template #default="scope">
    <el-tag v-if="scope.row.status" type="success" effect="plain" disable-transitions>启用</el-tag>
    <el-tag v-else type="danger" effect="plain" disable-transitions>禁用</el-tag>
  </template>
</el-table-column>

<!-- enum：值高亮 -->
<el-table-column prop="roles" label="角色" align="center">
  <template #default="scope">
    <el-tag v-if="scope.row.roles === 'admin'" type="primary" effect="plain" disable-transitions>admin</el-tag>
    <el-tag v-else type="warning" effect="plain" disable-transitions>{{ scope.row.roles }}</el-tag>
  </template>
</el-table-column>
```

当 enum 值需要明确区分时，逐个用 `v-if / v-else-if` 列出，最后用 `v-else` 兜底。

## 表单字段组件选择

根据字段语义选择组件：

| 字段类型 | 组件 | 备注 |
|---------|------|------|
| string（短文本）| `el-input` | |
| string（长文本）| `el-input type="textarea"` | 描述、备注等 |
| string（密码）| `el-input type="password"` | |
| number | `el-input-number` | `:min` / `:max` 根据业务约束设定 |
| boolean | `el-switch` | |
| enum | `el-select` + `el-option` | 搜索区域加 `clearable` |
| date | `el-date-picker type="date" value-format="YYYY-MM-DD"` | |
| datetime | `el-date-picker type="datetime" value-format="YYYY-MM-DD HH:mm:ss"` | |

验证规则的 `trigger`：输入型组件（input、textarea）用 `"blur"`，选择型组件（select、date-picker、switch）用 `"change"`。

## 接口规范

接口文件使用命名空间导入类型：`import type * as Xxx from "./type"`

导出四个函数（注释用"增删改查"标记）：

- `createXxxApi` — POST
- `deleteXxxApi` — DELETE，参数为 id
- `updateXxxApi` — PUT
- `getXxxApi` — GET，参数为分页 + 搜索条件

使用 `import { request } from "@/http/axios"` 发起请求。查询接口需指定泛型：`request<Xxx.XxxResponseData>({ ... })`。

## 类型规范

类型文件导出（`ApiResponseData` 是全局类型，无需导入）：

- `CreateOrUpdateXxxRequestData` — 表单提交数据（`id?: number` + 各表单字段）
- `XxxRequestData` — 列表查询参数（`currentPage: number` + `size: number` + 搜索字段用 `?:` 可选标记）
- `XxxData` — 表格行数据（`id: number` + 各展示字段）
- `XxxResponseData` — `ApiResponseData<{ list: XxxData[]; total: number }>`

搜索字段在 `XxxRequestData` 中默认用 `string` 类型（除非明确指定类型），因为搜索框传递的默认是字符串值（除非明确指定类型），需直接保持类型正常，不要随意使用类型断言。

页面中使用具名导入：`import type { CreateOrUpdateXxxRequestData, XxxData } from "./apis/type"`

## 导入规范

```ts
// 类型导入
import type { CreateOrUpdateXxxRequestData, XxxData } from "./apis/type"
import type { FormRules } from "element-plus"

// API 导入
import { createXxxApi, deleteXxxApi, getXxxApi, updateXxxApi } from "./apis"

// Composable 导入
import { usePagination } from "@@/composables/usePagination"

// 图标导入（按需，只导入实际使用的）
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"

// 工具导入
import { cloneDeep } from "lodash-es"
```

以下为自动导入，无需手动引入：`ElMessage`、`ElMessageBox`、`ref`、`reactive`、`useTemplateRef`。

## 样式规范

使用 `<style lang="scss" scoped>`，以下为推荐的基础样式：

```scss
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
```

## 命名约定

模块名为 `product` 时：

| 位置 | 命名 |
|------|------|
| 目录 | `src/pages/.../product/` |
| 组件 name | `Product` |
| API 函数 | `createProductApi` / `deleteProductApi` / `updateProductApi` / `getProductApi` |
| 类型 | `CreateOrUpdateProductRequestData` / `ProductRequestData` / `ProductData` / `ProductResponseData` |
| 命名空间 | `import type * as Product from "./type"` |

## 路由提示

生成代码后，提醒用户在路由配置中添加对应路由。
