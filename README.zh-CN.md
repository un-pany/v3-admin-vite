<div align="center">
  <img alt="logo" width="120" height="120" src="./src/common/assets/images/layouts/logo.png">
  <h1>V3 Admin Vite</h1>
</div>

[![github release](https://img.shields.io/github/v/release/un-pany/v3-admin-vite?style=flat)](https://github.com/un-pany/v3-admin-vite/releases)
[![github stars](https://img.shields.io/github/stars/un-pany/v3-admin-vite?style=flat)](https://github.com/un-pany/v3-admin-vite/stargazers)
[![gitee stars](https://gitee.com/un-pany/v3-admin-vite/badge/star.svg)](https://gitee.com/un-pany/v3-admin-vite/stargazers)

<b><a href="./README.md">English</a> | 中文</b>

## 简介

V3 Admin Vite 是一个精心制作的后台管理系统模板，基于 Vue3、Vite、TypeScript、Element Plus 等主流技术

## 通知

> [!NOTE]
> 为爱发电！所有源码均免费开源，如果对你有帮助，欢迎点个 Star 支持一下！

> [!IMPORTANT]
> 欢迎体验全新的 5.0 版本，目前正在 beta 阶段，它将是一次匠心之作！

> [!WARNING]
> 4.x 版本如果没有严重的 BUG 将不再维护！[点击切换到 4.x 分支](https://github.com/un-pany/v3-admin-vite/tree/4.x)

> [!TIP]
> 正式推出付费服务，如果不想自己动手，但想移除 TS 或其他模块？试试懒人套餐！[点击看看](https://github.com/un-pany/v3-admin-vite/issues/225)

> [!TIP]
> 如果你有移动端 H5 需求，试试新的开源模板。[MobVue](https://github.com/un-pany/mobvue)

## 使用

<details>
<summary>推荐环境</summary>

<br>

- 新版 `Visual Studio Code`
- 安装 `.vscode/extensions.json` 文件中推荐的插件
- `node` 20.x 或 22+
- `pnpm` 9.x 或 10+

</details>

<details>
<summary>本地开发</summary>

<br>

```bash
# 克隆项目
git clone https://github.com/un-pany/v3-admin-vite.git

# 进入项目目录
cd v3-admin-vite

# 安装依赖
pnpm i

# 启动服务
pnpm dev
```

</details>

<details>
<summary>打包构建</summary>

<br>

```bash
# 打包构建预发布环境
pnpm build:staging

# 打包构建生产环境
pnpm build
```

</details>

<details>
<summary>本地预览</summary>

<br>

```bash
# 先执行打包构建命令生成 dist 目录后再执行以下预览命令
pnpm preview
```

</details>

<details>
<summary>代码检查</summary>

<br>

```bash
# 代码校验与格式化
pnpm lint

# 单元测试
pnpm test
```

</details>

<details>
<summary>代码提交规范</summary>

<br>

`feat` 新功能

`fix` 修复错误

`perf` 性能优化

`refactor` 重构代码

`docs` 文档和注释

`types` 类型相关

`test` 单测相关

`ci` 持续集成、工作流

`revert` 撤销更改

`chore` 琐事（更新依赖、修改配置等）

</details>

## 链接

**在线预览**：[github-pages](https://un-pany.github.io/v3-admin-vite)

**中文文档**：[链接](https://juejin.cn/post/7445151895121543209)

**零基础教程**：[链接](https://juejin.cn/column/7207659644487139387)

**移动端 H5**：[mobvue](https://github.com/un-pany/mobvue)

**Electron 桌面版**：[v3-electron-vite](https://github.com/un-pany/v3-electron-vite)

**国内仓库**：[gitee](https://gitee.com/un-pany/v3-admin-vite)

**可有可无的群**：[查看进群方式](https://github.com/un-pany/v3-admin-vite/issues/191)

**捐赠**：[请作者喝咖啡](https://github.com/un-pany/v3-admin-vite/issues/69)

**发行版 & 更新日志**：[releases](https://github.com/un-pany/v3-admin-vite/releases)

## 特性

**结构精简**：没有复杂的封装，没有复杂的类型体操，刚好够用

**详细的注释**：各个配置项都写有尽可能详细的注释

**最新的依赖**：及时更新所有三方依赖至最新版

**有一点规范**：代码风格统一、命名风格统一、注释风格统一

## 内置功能

**用户管理**：登录、登出演示

**权限管理**：页面级权限（动态路由）、按钮级权限（权限指令、权限函数）、路由守卫

**多环境**：开发环境（development）、预发布环境（staging）、生产环境（production）

**多主题**：普通、黑暗、深蓝, 三种主题模式

**多布局**：左侧、顶部、混合, 三种布局模式

**首页**：根据不同用户显示不同的 Dashboard 页面

**错误页**：403、404

**兼容移动端**：布局兼容移动端页面分辨率

**其他**：SVG 雪碧图、动态侧边栏、动态面包屑、标签页快捷导航、内容区放大与全屏、组合式函数

## 技术栈

**Vue3**：采用 Vue3 + script setup 最新的 Vue3 组合式 API

**Element Plus**：Element UI 的 Vue3 版本

**Pinia**：传说中的 Vuex5

**Vite**：真的很快

**Vue Router**：路由路由

**TypeScript**：JavaScript 语言的超集

**pnpm**：更快速的，节省磁盘空间的包管理工具

**Scss**：和 Element Plus 保持一致

**CSS 变量**：主要控制项目的布局和颜色

**ESLint**：代码校验与格式化

**Axios**：发送网络请求（已封装好）

**UnoCSS**：具有高性能且极具灵活性的即时原子化 CSS 引擎

## 项目预览图

![preview](./src/common/assets/images/docs/preview.png)

## 贡献者

在此感谢所有的贡献者！

<a href="https://github.com/un-pany/v3-admin-vite/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=un-pany/v3-admin-vite">
</a>

## License

[MIT](./LICENSE) License © 2022-PRESENT [pany](https://github.com/pany-ang)
