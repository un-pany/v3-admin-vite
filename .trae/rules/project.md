---
alwaysApply: true
---

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
