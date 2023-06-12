<div align="center">
  <img alt="V3 Admin Vite Logo" width="120" height="120" src="./src/assets/layout/logo.png">
  <h1>V3 Admin Vite</h1>
  <span>English | <a href="./README.zh-CN.md">中文</a></span>
</div>

## ⚡ Introduction

v3-admin-vite is a free and open source middle and background management system basic solution, based on mainstream framework such as Vue3, TypeScript, Element Plus, Pinia and Vite.

- Vue-Cli 5.x: [v3-admin](https://github.com/un-pany/v3-admin)
- Electron desktop: [v3-electron-vite](https://github.com/un-pany/v3-electron-vite)

## Feature

- **Vue3**：The latest Vue3 composition API using Vue3 + script setup
- **Element Plus**：Vue3 version of Element UI
- **Pinia**: An alternative to Vuex in Vue3
- **Vite**：Really fast
- **Vue Router**：router
- **TypeScript**：JavaScript With Syntax For Types
- **PNPM**：Faster, disk space saving package management tool
- **Scss**：Consistent with Element Plus
- **CSS variable**：Mainly controls the layout and color of the item
- **ESlint**：Code verification
- **Prettier**： Code formatting
- **Axios**: Promise based HTTP client (encapsulated)
- **UnoCSS**: Real-time atomized CSS engine with high performance and flexibility
- **Annotation**：Each configuration item is written with as detailed comments as possible
- **Mobile Compatible**: The layout is compatible with mobile page resolution

## Functions

- **User management**: log in, log out of the demo
- **Authority management**: Built-in page permissions (dynamic routing), instruction permissions, permission functions
- **Multiple Environments**: Development, Staging, Production
- **Multiple themes**: Normal, Dark, Dark Blue, theme modes
- **Error page**: 403, 404
- **Dashboard**: Display different Dashboard pages according to different users
- **Other functions**：SVG, Dynamic Sidebar, Dynamic Breadcrumb Navigation, Tabbed Navigation, Screenfull, Adaptive Shrink Sidebar

## 📚 Document

[Chinese documentation](https://juejin.cn/post/7089377403717287972)

[Chinese getting started tutorial](https://juejin.cn/column/7207659644487139387)

## Gitee repository

[Gitee](https://gitee.com/un-pany/v3-admin-vite)

## Online preview

| Location     | account             | Link                                            |
| ------------ | ------------------- | ----------------------------------------------- |
| github-pages | `admin` or `editor` | [Link](https://un-pany.github.io/v3-admin-vite) |

## 🚀 Development

```bash
# configure
1. installation of the recommended plugins in the .vscode directory
2. node version 16+
3. pnpm version 8.x

# clone
git clone https://github.com/un-pany/v3-admin-vite.git

# enter the project directory
cd v3-admin-vite

# install dependencies
pnpm i

# start the service
pnpm dev
```

## ✔️ Preview

```bash
# stage environment
pnpm preview:stage

# prod environment
pnpm preview:prod
```

## 📦️ Multi-environment packaging

```bash
# build the stage environment
pnpm build:stage

# build the prod environment
pnpm build:prod
```

## 🔧 Code inspection

```bash
# code formatting
pnpm lint

# unit test
pnpm test
```

## Git commit specification reference

- `feat` add new functions
- `fix` Fix issues/bugs
- `perf` Optimize performance
- `style` Change the code style without affecting the running result
- `refactor` Re-factor code
- `revert` Undo changes
- `test` Test related, does not involve changes to business code
- `docs` Documentation and Annotation
- `chore` Updating dependencies/modifying scaffolding configuration, etc.
- `workflow` Work flow Improvements
- `ci` CICD
- `types` Type definition
- `wip` In development

## Project preview

![preview1.png](./src/assets/docs/preview1.png)
![preview2.png](./src/assets/docs/preview2.png)
![preview3.png](./src/assets/docs/preview3.png)

## 💕 Contributors

Thanks to all the contributors!

<a href="https://github.com/un-pany/v3-admin-vite/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=un-pany/v3-admin-vite" />
</a>

## 💕 Thanks star

Small projects are not easy to get a star, if you like this project, welcome to support a star! This is the only motivation for the author to maintain it on an ongoing basis (whisper: it's free after all)

## ☕ Donate

[See how to donate](https://github.com/un-pany/v3-admin-vite/issues/69)

## Group

QQ group：1014374415 (left) && add me on WeChat，Invite you to join WeChat group (right)

![qq.png](./src/assets/docs/qq.png)
![wechat.png](./src/assets/docs/wechat.png)

## 📄 License

[MIT](./LICENSE)

Copyright (c) 2022-present [pany](https://github.com/pany-ang)
