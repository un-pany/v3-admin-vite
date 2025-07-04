<div align="center">
  <img alt="logo" width="120" height="120" src="./src/common/assets/images/layouts/logo.png">
  <h1>V3 Admin Vite</h1>
</div>

[![github release](https://img.shields.io/github/v/release/un-pany/v3-admin-vite?style=flat)](https://github.com/un-pany/v3-admin-vite/releases)
[![github stars](https://img.shields.io/github/stars/un-pany/v3-admin-vite?style=flat)](https://github.com/un-pany/v3-admin-vite/stargazers)
[![gitee stars](https://gitee.com/un-pany/v3-admin-vite/badge/star.svg)](https://gitee.com/un-pany/v3-admin-vite/stargazers)

<b>English | <a href="./README.zh-CN.md">中文</a></b>

## Introduction

V3 Admin Vite is a well-crafted backend management system template, built with popular technologies such as Vue3, Vite, TypeScript, and Element Plus

## Notifications

> [!IMPORTANT]
> Welcome to experience the brand-new version 5.0, a masterpiece crafted with great care! If it helps you, feel free to give a Star to show your support.

> [!WARNING]
> Version 4.x will no longer be maintained unless there are critical bugs! [Click to switch to the 4.x branch](https://github.com/un-pany/v3-admin-vite/tree/4.x)

> [!TIP]
> Paid services are officially launched! If you don't want to do it yourself but want to remove TS or other modules, try the lazy package! [Click to check it out](https://github.com/un-pany/v3-admin-vite/issues/225)

> [!NOTE]
> If you have mobile web app requirements, give the new open-source template [MobVue](https://github.com/un-pany/mobvue) a try.

## Usage

<details>
<summary>Recommended Environment</summary>

<br>

- Latest version of `Visual Studio Code`
- Install the recommended plugins in the `.vscode/extensions.json` file
- `node` 20.19+ or 22.12+
- `pnpm` 10+

</details>

<details>
<summary>Local Development</summary>

<br>

```bash
# Clone the project
git clone https://github.com/un-pany/v3-admin-vite.git

# Enter the project directory
cd v3-admin-vite

# Install dependencies
pnpm i

# Start the development server
pnpm dev
```

</details>

<details>
<summary>Build</summary>

<br>

```bash
# Build for the staging environment
pnpm build:staging

# Build for the production environment
pnpm build
```

</details>

<details>
<summary>Local Preview</summary>

<br>

```bash
# Execute the build command first to generate the dist directory, then run the preview command
pnpm preview
```

</details>

<details>
<summary>Code Check</summary>

<br>

```bash
# Code linting and formatting
pnpm lint

# Unit tests
pnpm test
```

</details>

<details>
<summary>Commit Guidelines</summary>

<br>

`feat` New feature

`fix` Bug fix

`perf` Performance improvement

`refactor` Code refactoring

`docs` Documentation and comments

`types` Type-related changes

`test` Unit tests related

`ci` Continuous integration, workflows

`revert` Revert changes

`chore` Chores (update dependencies, modify configurations, etc)

</details>

## Links

**Online Preview**: [github-pages](https://un-pany.github.io/v3-admin-vite)

**Chinese Documentation**: [link](https://juejin.cn/post/7089377403717287972)

**Zero to Hero Tutorial**: [link](https://juejin.cn/column/7207659644487139387)

**Mobile Web App**: [mobvue](https://github.com/un-pany/mobvue)

**Electron Desktop Version**: [v3-electron-vite](https://github.com/un-pany/v3-electron-vite)

**Chinese Repository**: [gitee](https://gitee.com/un-pany/v3-admin-vite)

**Optional Group**: [check how to join](https://github.com/un-pany/v3-admin-vite/issues/191)

**Donations**: [buy a coffee for the author](https://github.com/un-pany/v3-admin-vite/issues/69)

**Releases & Changelog**: [releases](https://github.com/un-pany/v3-admin-vite/releases)

## Features

**Simplified structure**: No complex encapsulation, no complicated type gymnastics, just enough to meet the needs

**Detailed comments**: Every configuration item comes with as detailed comments as possible

**Latest dependencies**: Keeps all third-party dependencies up to date

**Consistency**: Unified code style, naming conventions, and comment style

## Built-in Features

**User Management**: Login, logout demonstration

**Permission Management**: Page-level permissions (dynamic routing), button-level permissions (permission directives, permission functions), route guards

**Multiple Environments**: Development, staging, and production environments

**Multiple Themes**: Normal, dark, and deep blue themes

**Multiple Layouts**: Left-side, top, and hybrid layouts

**Homepage**: Different dashboard pages for different users

**Error Pages**: 403, 404

**Mobile Compatibility**: Layouts compatible with mobile screen resolutions

**Others**: SVG sprite sheet, dynamic sidebar, dynamic breadcrumbs, tab navigation, content zoom and fullscreen, composable functions

## Tech Stack

**Vue3**: Vue3 + script setup with the latest Vue3 Composition API

**Element Plus**: The Vue3 version of Element UI

**Pinia**: The legendary Vuex5

**Vite**: Really fast

**Vue Router**: The routing system

**TypeScript**: A superset of JavaScript

**pnpm**: A faster, disk-space-saving package manager

**Scss**: Consistent with Element Plus

**CSS Variables**: Primarily controls layout and color in the project

**ESLint**: Code linting and formatting

**Axios**: Sends network requests

**UnoCSS**: A high-performance, flexible atomic CSS engine

## Project Preview Image

![preview](./src/common/assets/images/docs/preview.png)

## Contributors

A big thank you to all the contributors!

<a href="https://github.com/un-pany/v3-admin-vite/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=un-pany/v3-admin-vite">
</a>

## ‌WeChat Official Account‌

New attempts, welcome to follow.

<a href="https://mp.weixin.qq.com/s/artNHKubYNRBlsrxD7eXXA">
  <img src="https://github.com/user-attachments/assets/2bfdaf70-e7f5-4e1b-b43b-8e848925d7cb">
</a>

## License

[MIT](./LICENSE) License © 2022-PRESENT [pany](https://github.com/pany-ang)

## 简介

一个免费开源的中后台管理系统基础解决方案，基于 Vue3、TypeScript、Element Plus、Pinia 和 Vite 等主流技术.

## 特性

- **Vue3**：采用 Vue3 + script setup 最新的 Vue3 组合式 API
- **Element Plus**：Element UI 的 Vue3 版本
- **Pinia**: 传说中的 Vuex5
- **Vite**：真的很快
- **Vue Router**：路由路由
- **TypeScript**：JavaScript 语言的超集
- **PNPM**：更快速的，节省磁盘空间的包管理工具
- **Scss**：和 Element Plus 保持一致
- **CSS 变量**：主要控制项目的布局和颜色
- **ESlint**：代码校验
- **Prettier**：代码格式化
- **Axios**：发送网络请求（已封装好）
- **UnoCSS**：具有高性能且极具灵活性的即时原子化 CSS 引擎
- **注释**：各个配置项都写有尽可能详细的注释
- **兼容移动端**: 布局兼容移动端页面分辨率

## 功能

- **用户管理**：登录、登出演示
- **权限管理**：内置页面权限（动态路由）、指令权限、权限函数、路由守卫
- **多环境**：开发环境（development）、预发布环境（staging）、正式环境（production）
- **多主题**：内置普通、黑暗、深蓝三种主题模式
- **错误页面**: 403、404
- **Dashboard**：根据不同用户显示不同的 Dashboard 页面
- **其他内置功能**：SVG、动态侧边栏、动态面包屑、标签页快捷导航、Screenfull 全屏、自适应收缩侧边栏、Hook（Composables）

## 📝 配置

### TinyMCE 富文本编辑器

本项目集成了 TinyMCE 富文本编辑器，使用前需要：

1. 前往 [TinyMCE 官网](https://www.tiny.cloud/) 注册账号并获取 API Key
2. 在项目根目录创建 `.env.development` 文件（如果不存在），添加以下配置：

```bash
# TinyMCE API Key
VITE_TINYMCE_API_KEY='qakh29dtwy4honhyvvcu3xi4l1zw3l0w7f55z8fcru52nidw'
```

将 `your-api-key` 替换为你的实际 API Key。

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/un-pany/v3-admin-vite.git
```

- 安装依赖

```bash
cd v3-admin-vite

pnpm install

```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build:prod
```

## 更新日志

[CHANGELOG](./CHANGELOG.md)
