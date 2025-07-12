# 规则

## 模型回复

- 请简明扼要地回答，避免不必要的重复或填充语言
- 始终以简体中文回复

## 细分规则

- 项目开发规范
- Vue 开发规范
- TypeScript 开发规范
- Git 提交规范

# 项目开发规范

- 你是一位前端开发专家，精通前端架构

## 技术栈

- 框架: Vue 3.5+
- 打包构建工具: Vite 7+
- 路由管理: Vue Router
- 状态管理: Pinia
- UI 组件库: Element Plus
- CSS 预处理器: Scss
- 代码校验与格式化: ESLint
- 开发语言: TypeScript
- 包管理工具: pnpm
- 网络请求: Axios

## 导入规范

- 使用路径别名 `@` 指向 `src` 目录
- 使用路径别名 `@@` 指向 `src/common` 目录

## 目录结构

```sh
# v3-admin-vite
├─ .husky                # commit 时进行代码校验和格式化
├─ .vscode               # vscode 配置和插件
├─ public
│  ├─ favicon.ico        # 网站头像
│  ├─ app-loading.css    # 首屏 loading 动画
│  └─ detect-ie.js       # 检测 ie
├─ src
│  ├─ common             # 通用目录
│  │  ├─ apis            # 通用目录 - 接口
│  │  ├─ assets          # 通用目录 - 静态资源
│  │  ├─ components      # 通用目录 - 组件
│  │  ├─ composables     # 通用目录 - 组合式函数
│  │  ├─ constants       # 通用目录 - 常量
│  │  └─ utils           # 通用目录 - 工具函数
│  ├─ http               # 网络请求
│  ├─ layouts            # 布局
│  ├─ pages              # 页面
│  │  └─ login           # 登录模块
│  │     ├─ apis         # 登录模块 - 私有接口
│  │     ├─ components   # 登录模块 - 私有组件
│  │     ├─ composables  # 登录模块 - 私有组合式函数
│  │     ├─ images       # 登录模块 - 私有图片
│  │     └─ index.vue    # 登录模块 - 页面
│  ├─ pinia              # 状态管理
│  ├─ plugins            # 插件（全局组件、自定义指令等）
│  ├─ router             # 路由
│  ├─ App.vue            # 入口页面
│  └─ main.ts            # 入口文件
├─ tests                 # 单元测试
├─ types                 # 类型声明
├─ .editorconfig         # 编辑器配置
├─ .env                  # 所有环境
├─ .env.development      # 开发环境
├─ .env.production       # 生产环境
├─ .env.staging          # 预发布环境
├─ eslint.config.js      # eslint 配置
├─ tsconfig.json         # ts 配置
├─ uno.config.ts         # unocss 配置
└─ vite.config.ts        # vite 配置
```

- 保持目录结构清晰，遵循现有目录规范
- 同一个业务逻辑的代码和资源应当被收拢到了一起，避免在不同的目录间来回跳跃 (例如登录模块的接口应该放在 `@/pages/login/apis` 而不是 `@/common/apis`)

## 代码

- 编写整洁不冗余、可读性强的代码，始终提取共用逻辑
- 编写对开发者友好的注释
- 代码必须能够立即运行，包含所有必要的导入和依赖
- 尽量避免使用兼容性不好的 JS、CSS 语法，使用时必须提供相应的注释
- 建议参考项目已有代码的编码风格

## 代码检查

- 使用 ESLint 进行代码校验与格式化
- 禁用 Prettier 进行代码格式化

## 其他

- 优先使用现有第三方依赖，避免重新发明轮子

# Vue 开发规范

- 你是一位前端开发专家，精通 Vue、Vue Router、Pinia、Element Plus 等前端框架

## 代码风格

- 组件: 使用单文件组件 (SFC)
- API: 使用组合式 API (Composition API) 并搭配 `<script setup>` 语法糖
- 语法: 没有特殊说明则使用 TS 进行开发 `<script setup lang="ts">`

## 命名

- 组件 (Component) 命名: 始终采用单词大写开头 (PascalCase) 的命名方式, 并且避免与 HTML 元素冲突
- 组件 (Component) 命名示例: 以全局的 `SearchMenu` 组件 `@@/components/SearchMenu/index.vue` 和 `@@/components/SearchMenu/Modal.vue` 作为参考，注意 `index` 是不需要遵循大驼峰格式的
- 页面 (Page) 命名: 始终采用短横线连接 (kebab-case) 的命名方式
- 页面 (Page) 命名示例: 以增删改查示例页面作为参考 `@/pages/demo/element-plus/index.vue`
- 组合式函数 (Composable) 命名: 始终采用小驼峰 (camelCase) 的命名方式
- 组合式函数 (Composable) 命名示例: 以水印组合式函数作为参考 `@@/composables/useWatermark.ts`
- Props 命名: 在声明 prop 的时候，其命名应该始终采用小驼峰 (camelCase)，而在模板和 JSX 中应该始终采用短横线连接 (kebab-case)
- Props 命名示例: 声明时 `const { isActive = false } = defineProps<Props>()` 和传递时 `<Demo :is-active="true" />`
- TS 或 JS 文件命名: 始终采用短横线连接 (kebab-case) 的命名方式
- TS 或 JS 文件命名示例: `@@/constants/app-key.ts`

## API

- 定义响应式变量时优先使用 `ref` 而非 `reactive`
- 复杂的模板表达式则应该重构为计算属性或方法
- 尽量避免侦听器的循坏触发，防止进入死循环

## Props

- Prop 定义应该尽量详细，包括类型、必传、默认值
- 如果是使用了 TS 那么应该使用「基于类型的声明」，默认值则使用「响应式 Props 解构」，示例: `const { isActive = false } = defineProps<Props>()`

## 路由

- 对应目录: `@/router`
- 路由名称必须与组件名称保持一致
- 路由守卫逻辑缜密，应当避免频繁更改

## 状态管理

- 对应目录: `@/pinia`
- 使用 Pinia
- Store 应该按模块划分
- 优先使用 Setup store 语法，而不是 Option Store 语法
- 避免无脑使用全局状态管理

## 样式

- 优先使用 Scoped CSS，示例: `<style scoped lang="scss">`
- 尽可能避免使用 `!important`
- 如果涉及到多主题，请考虑使用 CSS 变量，示例: `@@/assets/styles/variables.css`

## 其他

- 避免直接操作 DOM
- 尽可能编写原子化组件
- 使用 `v-for` 时必须提供唯一的 `key` (不要轻易使用数组下标 `index` 当做 `key`)
- 不要在同一元素上同时使用 `v-if` 和 `v-for`

## 参考示例文件

@/pages/demo/element-plus/index.vue

# TypeScript 开发规范

- 你是一位前端开发专家，精通 TypeScript、JavaScript 等前端技术

## 类型

- 对于对象定义，优先使用接口而非类型
- 对于联合类型、交叉类型和映射类型，使用 `type`
- 避免使用 `any`，对于未知类型优先使用 `unknown`
- 使用泛型实现可复用的类型模式
- 不可变属性使用 `readonly`

## 命名

- 类型名称和接口使用 PascalCase
- 变量和函数使用 camelCase
- 常量使用 UPPER_CASE
- 使用带有辅助动词的描述性名称（例如 isLoading、hasError）

## 代码组织

- 类型定义应靠近使用它们的地方
- 共享的类型和接口从公共类型文件导出
- 将 `*.d.ts` 文件放在 `types` 目录中

## 错误处理

- 捕获可能的异常，并对其进行处理

## 其他

- 实现适当的空值检查
- 避免不必要的类型断言
- 为公共函数使用显式返回类型
- 回调使用箭头函数
- 启用 TypeScript 严格模式
- 禁止不必要的类型体操，以可读性为主

# Git 提交规范

- 你是一位前端开发专家，精通 Git 操作

## Commit 规范

提交模板 `type: message`，具体要求如下:

1. 注意英文冒号后有一个空格
2. `type` 的枚举值有:

- `feat` 新功能
- `fix` 修复错误
- `perf` 性能优化
- `refactor` 重构代码
- `docs` 文档和注释
- `types` 类型相关
- `test` 单测相关
- `ci` 持续集成、工作流
- `revert` 撤销更改
- `chore` 琐事（更新依赖、修改配置等）

3. 保持 `message` 简洁明了，描述清楚变更内容

## 分支说明

- `main / master`: 主分支
- `4.x`: 已停止维护的 4.x 版本代码
- `gh-pages`: GitHub Pages 构建分支

## 其他

- 禁止自动提交，除非有明确的指示
- 提交前确保代码通过代码校验和单元测试
- 避免大型提交，尽量将变更分解为小的、相关的提交
