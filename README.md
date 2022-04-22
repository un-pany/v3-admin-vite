## ⚡️ 简介

一个中后台管理系统基础解决方案，基于 Vue3、TypeScript、Element-Plus、Pinia 和 Vite.

模板代码是从 [v3-admin v3.1.3](https://github.com/un-pany/v3-admin) 迁移而来，只是脚手架从 vue-cli 5.x 切换到了 vite，并作了一些繁琐的适配.

文档暂无，可以先用到 v3-admin 的文档，基本上是适用的.

## 开发

- 编辑器 vscode
- 安装 .vscode 中推荐的插件
- node 版本 16+
- pnpm 版本 6.x
- 安装依赖: pnpm i
- 运行项目: pnpm dev
- 预览测试环境: pnpm preview:stage
- 预览正式环境: pnpm preview:prod
- 打包测试环境: pnpm build:stage
- 打包正式环境: pnpm build:prod
- 代码检测: pnpm lint

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
