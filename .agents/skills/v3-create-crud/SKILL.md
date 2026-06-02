---
title: "v3-create-crud"
description: "在 v3-admin-vite 项目中生成 CRUD 页面及相关代码模板"
applyTo:
  - "**/*.md"
  - "**/.agents/skills/**"
tags:
  - "skill"
  - "crud"
  - "vue3"
recommendations:
  - "提供实体名称、字段列表、路由路径和菜单标题"
---

# v3-create-crud

用于在当前 `v3-admin-vite` 项目中创建标准的增删改查（CRUD）页面和相关支持文件。

## 目标

- 根据项目现有结构生成一个完整的 CRUD 页面
- 包括列表页、表单页、详情页、路由、Pinia 状态、接口调用、菜单和权限配置
- 兼容当前项目的 `Vue 3 + Vite + TypeScript + Pinia + Element Plus` 结构

## 适用场景

- 新建数据表管理页面
- 快速生成后台管理系统中的增删改查功能
- 需要统一页面风格和项目规范时

## 使用前提

- 项目已安装并配置好 `Vue 3`、`TypeScript`、`Element Plus`、`Pinia` 等依赖
- 后端 API 接口已准备好，支持标准的 RESTful CRUD 操作
- 熟悉项目目录结构和命名约定

## 输入参数

在使用该技能时，请提供以下信息：

- **实体名称**：如 `User`、`Product`、`Order` 等，用于生成文件名和组件名
- **字段列表**：实体包含的字段，如 `id`、`name`、`description`、`status`、`createTime` 等
- **路由路径**：如 `/users`、`/products`，用于生成路由配置
- **菜单标题**：如 `用户管理`、`产品管理`，用于菜单显示
- **权限要求**：如 `admin`、`editor`，用于路由权限控制（可选）

## 工作内容

- 在 `src/pages/` 下创建 CRUD 页面目录
- 在 `src/router/config.ts` 或路由模块中新增路由
- 在 `src/common/apis/` 下创建对应接口调用文件
- 在 `src/pinia/stores/` 下创建或扩展状态管理
- 在 `src/layouts/components/` 或页面组件中生成列表、搜索、弹窗/表单
- 生成参考页面样式、查询条件、分页、数据表格、新增/编辑/删除逻辑

## 生成文件清单

该技能会生成以下文件（以实体名为 `Entity` 为例）：

- `src/pages/entity/index.vue` - 主页面组件（列表 + 表单）
- `src/common/apis/entity/index.ts` - API 接口调用
- `src/common/apis/entity/type.ts` - 类型定义
- `src/router/index.ts` - 路由配置更新

## 参考实现

生成的代码与项目现有示例 `src/pages/demo/element-plus/index.vue` 风格一致，包括：

- 使用 `usePagination` composable 管理分页
- 使用 `el-table`、`el-form`、`el-dialog` 等 Element Plus 组件
- 使用 `ElMessage`、`ElMessageBox` 处理用户交互
- 使用 `watch` 监听分页变化自动刷新数据

## 模板文件

完整模板代码位于 `templates/` 目录下，可直接复制使用：

- [page.vue](templates/page.vue) - 页面组件模板
- [api.ts](templates/api.ts) - API 接口模板
- [type.ts](templates/type.ts) - 类型定义模板
- [route-example.json](templates/route-example.json) - 路由配置示例

## 调用示例

"使用 v3-create-crud 技能为 'Product' 实体创建 CRUD 页面，字段包括 id、name、description、price、status，路由路径为 '/products'，菜单标题为 '产品管理'，权限为 'admin'"

## 操作准则

- 优先遵循项目现有命名和目录规范
- 保留组件复用性、可维护性和可扩展性
- 保证生成代码在当前项目环境下可直接使用
- 若需要，提示用户补充实体名称、字段、接口路径和权限名称
