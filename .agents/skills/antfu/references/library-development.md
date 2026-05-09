---
name: library-development
description: Building and publishing TypeScript libraries with tsdown. Use when creating npm packages, configuring library bundling, or setting up package.json exports.
---

# Library Development

| Aspect | Choice |
|--------|--------|
| Bundler | tsdown |
| Output | Pure ESM only (no CJS) |
| DTS | Generated via tsdown |
| Exports | Auto-generated via tsdown |

## tsdown Configuration

Use tsdown with these options enabled:

```ts
// tsdown.config.ts
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  exports: true,
})
```

| Option | Value | Purpose |
|--------|-------|---------|
| `format` | `['esm']` | Pure ESM, no CommonJS |
| `dts` | `true` | Generate `.d.ts` files |
| `exports` | `true` | Auto-update `exports` field in `package.json` |

### Multiple Entry Points

```ts
export default defineConfig({
  entry: [
    'src/index.ts',
    'src/utils.ts',
  ],
  format: ['esm'],
  dts: true,
  exports: true,
})
```

The `exports: true` option auto-generates the `exports` field in `package.json` when running `tsdown`.

---

## API Stability

For published libraries, lock the public API surface so accidental breaking changes appear as a diff in code review.

| Tool | Purpose |
|------|---------|
| [`tsnapi`](https://github.com/antfu/tsnapi) | Snapshots runtime exports + type declarations into committed `.snapshot.js` / `.snapshot.d.ts` files via Vitest |
| [`tsdown-stale-guard`](https://github.com/antfu-collective/tsdown-stale-guard) | Records build input/output hashes so tests fail fast when run against a stale build |

Install both as dev dependencies. Wire `tsdown-stale-guard` as a tsdown plugin so every build records its hash:

```ts
// tsdown.config.ts
import { defineConfig } from 'tsdown'
import { StaleGuardRecorder } from 'tsdown-stale-guard'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  exports: true,
  plugins: [
    StaleGuardRecorder(),
  ],
})
```

Snapshot the public API from a Vitest test — prefer the Vitest helpers over the tsdown/Rolldown plugin so build config stays focused on building. Each file gates itself on a fresh build via a per-file `beforeAll(guardStaleBuild)` so the committed `dist/` can never drift from source:

```ts
// test/api.test.ts (single package)
import { beforeAll } from 'vitest'
import { snapshotApiPerEntry } from 'tsnapi/vitest'
import { guardStaleBuild } from 'tsdown-stale-guard'

beforeAll(async () => {
  await guardStaleBuild()
})

await snapshotApiPerEntry(new URL('..', import.meta.url).pathname)
```

For monorepos, wrap `describePackagesApiSnapshots()` in a `describe` so the per-package suites share a single stale-build gate:

```ts
// test/api.test.ts (monorepo, run from root)
import { beforeAll, describe } from 'vitest'
import { describePackagesApiSnapshots } from 'tsnapi/vitest'
import { guardStaleBuild } from 'tsdown-stale-guard'

describe('packages api', async () => {
  beforeAll(async () => {
    await guardStaleBuild()
  })

  await describePackagesApiSnapshots()
})
```

### Updating snapshots

After an intentional API change, rebuild and update both snapshots in one go:

```bash
nr build           # regenerates dist/ and the stale-guard hash
nr test -u         # updates the .snapshot.js / .snapshot.d.ts files
```

---

## package.json

Required fields for pure ESM library:

```json
{
  "type": "module",
  "main": "./dist/index.mjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.mts",
  "files": ["dist"],
  "scripts": {
    "build": "tsdown",
    "prepack": "pnpm build",
    "test": "vitest",
    "release": "bumpp -r"
  }
}
```

The `exports` field is managed by tsdown when `exports: true`.

### prepack Script

For each public package, add `"prepack": "pnpm build"` to `scripts`. This ensures the package is automatically built before publishing (e.g., when running `npm publish` or `pnpm publish`). This prevents accidentally publishing stale or missing build artifacts.
