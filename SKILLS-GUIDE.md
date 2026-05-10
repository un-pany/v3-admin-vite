# Skills 实操手册

本项目使用 [vercel-labs/skills](https://github.com/vercel-labs/skills) CLI（`npx skills`）管理 AI 技能包。`skills-lock.json` 锁定每个技能的来源与哈希，`.agents/skills/` 存放真实文件，`.claude/skills` 是软链接复用层。

## 1. 心智模型

把 `.agents/skills/` 当作 `node_modules` 的同类物：

| 像 npm | 这里对应 |
|---|---|
| `package.json` 声明依赖 | （无）—— 直接由 `skills-lock.json` 充当声明 |
| `package-lock.json` 锁版本 | `skills-lock.json`（**提交到 Git**） |
| `node_modules/`（不提交） | `.agents/skills/`（**提交到 Git**——这是和 npm 不一样的地方） |

**关键判断：** `.agents/skills/<name>/` 里的内容**不是手写的，是 CLI 同步下来的**。手动修改会在下次 `update` 被覆盖。

## 2. 日常命令清单

所有命令在项目根目录执行，**不要加 `-g`**（`-g` 是装到 `~/.agents/`，本项目需要的是项目级）。

### 看当前状态

```bash
npx skills list           # 列出已安装的技能（可简写为 npx skills ls）
```

### 升级到最新（最常用）

```bash
npx skills update         # 把所有 outdated 的技能升到上游最新
```

升级后会变更：

- `skills-lock.json` 里对应条目的 `computedHash`
- `.agents/skills/<name>/` 下的文件内容

### 新增一个技能

```bash
# 跨 repo 模糊搜（推荐起点）—— 走 skills.sh 注册中心，无需 clone
npx skills find vue              # 按关键词搜，返回 owner/repo@skill 列表
npx skills find                  # 不带 query 进入交互式选择

# 已经知道 repo，列出该 repo 里所有技能（会先 git clone 临时目录）
npx skills add antfu/skills --list

# 安装一个具体技能
npx skills add antfu/skills --skill nuxt

# 或者从其它 repo 拉
npx skills add vercel-labs/agent-skills --skill pr-review
```

### 移除一个技能

```bash
npx skills remove <name>
```

### 新机器 / CI 上还原

```bash
pnpm i
npx skills experimental_install   # 按 skills-lock.json 把 .agents/skills/ 还原出来
```

> ⚠️ 截至当前（[Issue #283](https://github.com/vercel-labs/skills/issues/283)），项目级还原命令仍然带 `experimental_` 前缀；CLI 里**没有** `install` 或 `i` 这两个简写，必须写完整名字。后续 CLI 稳定后可能改名，到时再更新这份文档。

## 3. 完整工作流

### 场景 A：每周/每月维护一次升级

```bash
git switch -c chore/bump-skills
npx skills update                # 一键全升
git diff skills-lock.json        # 核对变更（哪些 computedHash 改了 = 哪些技能被更新）
git add skills-lock.json .agents/skills
git commit -m "chore: bump skills"
# 走 PR 流程（按 .cursor/rules/git.mdc 的规范）
```

### 场景 B：项目需要一项新最佳实践（例如要加 Nuxt 支持）

第一反应**不是**去 `.cursor/rules/` 写 `nuxt.mdc`，而是：

```bash
npx skills find nuxt                   # 跨 repo 搜，看哪个最合适（也可换成 add antfu/skills --list 列单个 repo）
npx skills add antfu/skills --skill nuxt
git add skills-lock.json .agents/skills/nuxt
git commit -m "feat: add nuxt skill"
```

两种情况才需要在 `.cursor/rules/` 下手写规则：

- **上游 repo 里找不到** —— 比如只跟当前项目相关的私有约定（公司命名规范、内部 API 用法等）
- **上游有但跟本项目约定冲突** —— 上游说"用 X"，本项目偏要"用 Y"，需要本地覆盖

其它情况一律优先走 CLI（这样能持续 `update` 跟上上游迭代，自己写的规则没法享受这个）。

### 场景 C：新成员 clone 仓库

```bash
git clone ...
pnpm i
npx skills experimental_install # 建议跑一次，确保各 agent 目录（.claude/、.cursor/ 等）正确联通到 .agents/skills/
pnpm dev
```

## 4. 不要做的事

| ❌ 反模式 | ✅ 正确做法 |
|---|---|
| 手改 `.agents/skills/vue-best-practices/SKILL.md` | 改不动——`update` 会覆盖。要本地化覆写就在 `.cursor/rules/` 写一条更高优先级的规则 |
| 把 `.agents/skills/` 加到 `.gitignore` | 必须提交。`skills-lock.json` 只锁 hash，不存内容 |
| 跑 `npx skills add ... -g` | `-g` 是装到 `~/.agents/`（用户全局），项目里不要用 |
| 直接编辑 `skills-lock.json` 的 `computedHash` | 让 CLI 来写，手改会下次校验失败 |
