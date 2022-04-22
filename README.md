## ⚡️ 简介

一个中后台管理系统基础解决方案，基于 Vue3、TypeScript、Element-Plus、Pinia 和 Vite.

模板代码是从 [v3-admin v3.1.3](https://github.com/un-pany/v3-admin) 迁移而来，只是脚手架从 vue-cli 5.x 切换到了 vite，并作了一些繁琐的适配.

更推荐大家使用该 vite 版本！以后的重心也会从 [v3-admin](https://github.com/un-pany/v3-admin) 偏向本仓库.

## 📚 文档

[简体中文](https://juejin.cn/post/7089377403717287972)

## 国内仓库

[Gitee](https://gitee.com/un-pany/v3-admin-vite)

## 预览

| 位置 | 账号 | 链接 |
| --- | --- | --- |
| github-pages | admin或editor | [链接](https://un-pany.github.io/v3-admin-vite) |

## 🚀 开发

```bash
# 配置
1. 安装 .vscode 中推荐的插件
3. node 版本 16+
4. pnpm 版本 6.x

# 克隆项目
git clone https://github.com/un-pany/v3-admin-vite.git

# 进入项目目录
cd v3-admin-vite

# 安装依赖
pnpm i

# 启动服务
pnpm dev
```

## ✔️ 预览

```bash
# 预览预发布环境
pnpm preview:stage

# 预览正式环境
pnpm preview:prod
```

## 📦️ 多环境打包

```bash
# 构建预发布环境
pnpm build:stage

# 构建正式环境
pnpm build:prod
```

## 🔧 代码格式检查

```bash
pnpm lint
```

## Git 提交规范

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中
- `mod` 不确定分类的修改

## 交流（吹水）群

QQ群：1014374415

![v3-admin-vite.png](https://github.com/un-pany/v3-admin-vite/blob/main/src/assets/docs/qq.png)

## 📄 License

[MIT](https://github.com/un-pany/v3-admin-vite/blob/main/LICENSE)

Copyright (c) 2022 pany
