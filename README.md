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

> [!NOTE]
> Powered by love! All source code is free and open-source. If you find it helpful, feel free to give a star to support!

> [!IMPORTANT]
> Welcome to experience the brand-new version 5.0, currently in the beta stage. It will be a masterpiece!

> [!WARNING]
> Version 4.x will no longer be maintained unless there are critical bugs! [Click to switch to the 4.x branch](https://github.com/un-pany/v3-admin-vite/tree/4.x)

> [!TIP]
> Paid services are officially launched! If you don’t want to do it yourself but want to remove TS or other modules, try the lazy package! [Click to check it out](https://github.com/un-pany/v3-admin-vite/issues/225)

> [!TIP]
> If you have mobile web app needs, try the new open-source template. [MobVue](https://github.com/un-pany/mobvue)

## Usage

<details>
<summary>Recommended Environment</summary>

<br>

- Latest version of `Visual Studio Code`
- Install the recommended plugins in the `.vscode/extensions.json` file
- `node` 20.x or 22+
- `pnpm` 9.x or 10+

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

## License

[MIT](./LICENSE) License © 2022-PRESENT [pany](https://github.com/pany-ang)
