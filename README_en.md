## ⚡ Introduction

<p align="center">
  <span><a href="./README.md">中文</a> | English</span>
</p>
v3-admin-vite is a free and open source middle and background management system basic solution, based on mainstream framework such as Vue3, TypeScript, Element-Plus, Pinia and Vite.

The template code was migrated from [v3-admin ](https://github.com/un-pany/v3-admin), the scaffolding was switched from Vue-Cli 5.x to Vite 3.x, and some tedious adaptations were made.

We recommend everyone to use this Vite version! The focus of the future will be shifted from [v3-admin ](https://github.com/un-pany/v3-admin) to this repository.

- Electron desktop edition: [v3-electron-vite](https://github.com/un-pany/v3-electron-vite)

## 🚀 Characteristics

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
- **Axios**: Promise based HTTP client（encapsulated）
- **UnoCSS**: Real-time atomized CSS engine with high performance and flexibility
- **Annotation**：Each configuration item is written with as detailed comments as possible

## 🔧 Functions

- **User management**: log in, log out of the demo
- **Authority management**: Built-in page permissions (dynamic routing), instruction permissions, permission functions
- **Multiple Environments**: Development、staging、production
- **Multiple themes**: normal and dark theme modes
- **Error page**: 403、404
- **Dashboard**: Display different Dashboard pages according to different users
- **Other functions**：SVG、Dynamic Sidebar、Dynamic Breadcrumb Navigation、Tabbed Navigation、Screenfull、Adaptive Shrink Sidebar (Mobile Compatible)

## 📚 Document

[掘金 Juijin](https://juejin.cn/post/7089377403717287972)

## Gitee repository

[Gitee](https://gitee.com/un-pany/v3-admin-vite)

## preview

| Location     | account             | Link                                            |
| ------------ | ------------------- | ----------------------------------------------- |
| github-pages | `admin` or `editor` | [Link](https://un-pany.github.io/v3-admin-vite) |

## 🚀 Development

```bash
# configure
1. installation of the recommended plugins in the .vscode directory
3. node version 16+
4. pnpm version 7.x

# clone
git clone https://github.com/un-pany/v3-admin-vite.git

# enter the project directory
cd v3-admin-vite

# install dependencies
pnpm i

# initialize husky
pnpm prepare

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

## 🔧 Code formatting check

```bash
pnpm lint
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

## group

QQ group：1014374415（left）&& add me on WeChat，Invite you to join WeChat group（right）

![qq.png](https://github.com/un-pany/v3-admin-vite/blob/main/src/assets/docs/qq.png)
![wechat.png](https://github.com/un-pany/v3-admin-vite/blob/main/src/assets/docs/wechat.png)

## 📄 License

[MIT](https://github.com/un-pany/v3-admin-vite/blob/main/LICENSE)

Copyright (c) 2022 pany
