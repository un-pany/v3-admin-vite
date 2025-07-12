---
globs: *.ts,*.tsx,*.d.ts
alwaysApply: false
---

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
