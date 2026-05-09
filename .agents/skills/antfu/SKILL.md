---
name: antfu
description: Anthony Fu's opinionated tooling and conventions for JavaScript/TypeScript projects. Use when setting up new projects, configuring ESLint/Prettier alternatives, monorepos, library publishing, or when the user mentions Anthony Fu's preferences.
metadata:
  author: Anthony Fu
  version: "2026.05.01"
---

## Coding Practices

### Code Organization

- **Single responsibility**: Each source file should have a clear, focused scope/purpose
- **Split large files**: Break files when they become large or handle too many concerns
- **Type separation**: Always separate types and interfaces into `types.ts` or `types/*.ts`
- **Constants extraction**: Move constants to a dedicated `constants.ts` file

### Runtime Environment

- **Prefer isomorphic code**: Write runtime-agnostic code that works in Node, browser, and workers whenever possible
- **Clear runtime indicators**: When code is environment-specific, add a comment at the top of the file:

```ts
// @env node
// @env browser
```

### TypeScript

- **Explicit return types**: Declare return types explicitly when possible
- **Avoid complex inline types**: Extract complex types into dedicated `type` or `interface` declarations

### Comments

- **Avoid unnecessary comments**: Code should be self-explanatory
- **Explain "why" not "how"**: Comments should describe the reasoning or intent, not what the code does

### Testing (Vitest)

- Test files: `foo.ts` → `foo.test.ts` (same directory)
- Use `describe`/`it` API (not `test`)
- Use `toMatchSnapshot` for complex outputs
- Use `toMatchFileSnapshot` with explicit path for language-specific snapshots

---

## Tooling Choices

### @antfu/ni Commands

| Command | Description |
|---------|-------------|
| `ni` | Install dependencies |
| `ni <pkg>` / `ni -D <pkg>` | Add dependency / dev dependency |
| `nr <script>` | Run script |
| `nu` | Upgrade dependencies |
| `nun <pkg>` | Uninstall dependency |
| `nci` | Clean install (`pnpm i --frozen-lockfile`) |
| `nlx <pkg>` | Execute package (`npx`) |

### Checking npm Package Versions

Use [`fast-npm-meta`](https://github.com/antfu/fast-npm-meta) to look up the latest version of a package — it queries a small metadata endpoint instead of downloading the full registry payload (which can be megabytes per package).

```bash
nlx fast-npm-meta version vite              # 7.3.1
nlx fast-npm-meta version "nuxt@^3.5"       # 3.5.22 — range-aware
nlx fast-npm-meta version vite nuxt vue     # multiple at once
nlx fast-npm-meta version vite --json       # JSON for scripting
nlx fast-npm-meta full vite                 # full version list + dist-tags
```

Prefer this over `npm view <pkg> version` when you only need the latest version, and over reading `package.json` from the registry directly.

### TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  }
}
```

### ESLint Setup

```js
// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu()
```


When completing tasks, run `pnpm run lint --fix` to format the code and fix coding style.

For detailed configuration options: [antfu-eslint-config](references/antfu-eslint-config.md)

### Git Hooks

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm i --frozen-lockfile --ignore-scripts --offline && npx lint-staged"
  },
  "lint-staged": { "*": "eslint --fix" },
  "scripts": {
    "prepare": "npx simple-git-hooks"
  }
}
```

### pnpm Catalogs

Use named catalogs in `pnpm-workspace.yaml` for version management:

| Catalog | Purpose |
|---------|---------|
| `prod` | Production dependencies |
| `inlined` | Bundler-inlined dependencies |
| `dev` | Dev tools (linter, bundler, testing) |
| `frontend` | Frontend libraries |

Avoid the default catalog. Catalog names can be adjusted per project needs.

---

## References

| Topic | Description | Reference |
|-------|-------------|-----------|
| ESLint Config | Framework support, formatters, rule overrides, VS Code settings | [antfu-eslint-config](references/antfu-eslint-config.md) |
| Project Setup | .gitignore, GitHub Actions, VS Code extensions | [setting-up](references/setting-up.md) |
| App Development | Vue/Nuxt/UnoCSS conventions and patterns | [app-development](references/app-development.md) |
| Library Development | tsdown bundling, pure ESM publishing | [library-development](references/library-development.md) |
| Monorepo | pnpm workspaces, centralized alias, Turborepo | [monorepo](references/monorepo.md) |
