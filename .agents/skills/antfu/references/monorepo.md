---
name: monorepo
description: Monorepo setup with pnpm workspaces, centralized aliases, and Turborepo. Use when creating or managing multi-package repositories.
---

# Monorepo Setup

## pnpm Workspaces

Use pnpm workspaces for monorepo management:

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

## Scripts Convention

Have scripts in each package, and use `-r` (recursive) flag at root,
Enable ESLint cache for faster linting in monorepos.

```json
// root package.json
{
  "scripts": {
    "build": "pnpm run -r build",
    "test": "vitest",
    "lint": "eslint . --cache --concurrency=auto"
  }
}
```

In each package's `package.json`, add the scripts.

```json
// packages/*/package.json
{
  "scripts": {
    "build": "tsdown",
    "prepack": "pnpm build"
  }
}
```

## ESLint Cache


```json
{
  "scripts": {
    "lint": "eslint . --cache --concurrency=auto"
  }
}
```

## Turborepo (Optional)

For monorepos with many packages or long build times, use Turborepo for task orchestration and caching.

See the dedicated Turborepo skill for detailed configuration.

## Centralized Alias

For better DX across Vite, Nuxt, Vitest configs, create a centralized `alias.ts` at project root:

```ts
// alias.ts
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, relative } from 'pathe'

const root = fileURLToPath(new URL('.', import.meta.url))
const r = (path: string) => fileURLToPath(new URL(`./packages/${path}`, import.meta.url))

export const alias = {
  '@myorg/core': r('core/src/index.ts'),
  '@myorg/utils': r('utils/src/index.ts'),
  '@myorg/ui': r('ui/src/index.ts'),
  // Add more aliases as needed
}

// Auto-update tsconfig.alias.json paths
const raw = fs.readFileSync(join(root, 'tsconfig.alias.json'), 'utf-8').trim()
const tsconfig = JSON.parse(raw)
tsconfig.compilerOptions.paths = Object.fromEntries(
  Object.entries(alias).map(([key, value]) => [key, [`./${relative(root, value)}`]]),
)
const newRaw = JSON.stringify(tsconfig, null, 2)
if (newRaw !== raw)
  fs.writeFileSync(join(root, 'tsconfig.alias.json'), `${newRaw}\n`, 'utf-8')
```

Then update the `tsconfig.json` to use the alias file:

```json
{
  "extends": [
    "./tsconfig.alias.json"
  ]
}
```

### Using Alias in Configs

Reference the centralized alias in all config files:

```ts
// vite.config.ts
import { alias } from './alias'

export default defineConfig({
  resolve: { alias },
})
```

```ts
// nuxt.config.ts
import { alias } from './alias'

export default defineNuxtConfig({
  alias,
})
```
