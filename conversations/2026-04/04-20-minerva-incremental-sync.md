---
title: minerva-incremental-sync
date: 2026-04-20T22:24:48+08:00
session_id: aa8647c5-45a4-48ee-ae55-2f8fa267fa01
project: /Users/presence79/Desktop/WORK/sitin-next
source: claude-code-capture
messages: 14
---

# minerva-incremental-sync

### User (22:24:50)

<local-command-stdout>Set model to [1mOpus 4.7 (1M context)[22m with [1mmax[22m effort</local-command-stdout>

### User (22:26:40)

你现在把桌面的work目录下的sitin-monorepo（release/migrate分支）代码库的minerva和minerva-server项目复制到这个sitin-next代码库合适的目录下   
  ，然后按照这个代码库的规范给这两个大项目命名，然后你复制成功之后先跑起来看看，然后看下相关的代码是否要调整为符合sitin-next的eslint规范

### Assistant (22:26:56)

我先进入规划模式，梳理两个仓库的目录、命名映射、迁移位置和验证步骤，再给你一个明确的改动清单确认。

### User (23:46:46)

[Request interrupted by user for tool use]

### User (23:49:17)

你现在和sitin-monorepo的release/migrate分支对比一下两边的minerva和minerva-server，看看哪些地方有差异，然后把release/migrate最新的minerva和minerva-server改动挪到这里来，不要丢失代码

### User (23:49:31)

继续任务：你现在和sitin-monorepo的release/migrate分支对比一下两边的minerva和minerva-server，看看哪些地方有差异，然后把release/migrate最新的minerva和minerva-server改动挪到这里来，不要丢失代码

### Assistant (23:49:55)

我先补做两边 Minerva 现状和差异梳理，再给你一份只迁移增量、不丢代码的执行方案。

### Assistant (00:02:41)

我已经确认这里不是空迁移目标，而是已经迁过一版；接下来我补一份“以 sitin-next 为基准做增量合并“的执行方案。

### Assistant (00:06:35)

我先确认一个关键范围，避免把“同步增量“和“整体重命名“混在一轮里导致风险变大。

### Assistant (00:07:37)

我再核对几处关键文件，把计划收紧到可直接执行的粒度。

### Assistant (00:07:49)

刚才读文件参数带错了，我重读这几处关键文件后就整理最终执行方案。

### Assistant (00:08:15)

我把最终方案写进计划文件，然后提交给你确认。

### Assistant (00:09:03)

我先做精确差异盘点并建立任务清单，然后按“先文档、后增量同步“的顺序动手。

### Assistant (00:10:29)

我已经拿到精确盘点：这轮最明确该补的是 server prompts，web 只有配置差异，contract 需要语义合并不能硬覆盖。

### Assistant (00:11:11)

我先把精确差异里涉及的关键文件再读一遍，确认只同步真正缺失的功能文件。

### Assistant (00:11:50)

我再确认 contract 和 server 里这些 source-only 文件是不是已经被引用，避免只复制文件但没接上出口。

### Assistant (00:52:55)

我发现 contract 里还有两个 source-only 出口很关键：`short-link` 和 `guild/message-template`，先核对它们和 target 现有 union 类型的关系。

### User (00:52:55)

[Request interrupted by user]

### User (00:52:58)

继续

### Assistant (00:53:16)

继续盘点 contract 里 source-only 的三个文件和 server 的差异文件。

### Assistant (00:55:54)

盘点清楚了。现在确认 server 和 contract 里有意义的差异文件。

### Assistant (00:56:36)

盘点基本完成，我现在汇总一下结论，然后开始执行合并。

### Assistant (00:57:17)

Source 的 web 有一个 Observatory 页面是 target 里没有的，我确认一下。

### Assistant (00:57:37)

Observatory 页面文件已经存在，但路由没接上。让我确认文件是否一致。

### Assistant (00:59:22)

盘点完成，以下是精确变更清单，请确认后我开始执行：

---

### contract-minerva
1. **新增** `src/short-link.ts` — 从 source 复制，server 的 `short-links.ts` 路由已在引用这些类型
2. **修改** `src/index.ts` — 加 `export * from "./short-link"`
3. **合并 source 新增字段到已有文件**（保留 target 独有的改动）:
   - `src/script.ts` — 加 `SEND_DM`, `VIEW_PROFILE`, `BROWSE_FEED`, `CHECK_INBOX`, `CHECK_NOTIFICATIONS`, `UTILITY` 动作类型 + `platform` 字段
   - `src/union/ai-service.ts` — 加 `modelName`, `provider`（update schema）; 加 `personaKey`（entity + prompt schemas）
   - `src/union/brain.ts` — 加 `pwa_progress_change` trigger、`no_action` action、`brainAllowedActionSchema`、扩展 context 结构
   - `src/union/simulator.ts` — 加 `modelConfigId`, `initialDecision`
   - `src/user-management.ts` — 加 appId 20-26

### app-minerva-server
4. **新增** `prompts/**` — 10 个 prompt 资产文件（prompt-assembler.ts 运行时依赖）
5. **新增** `scripts/migrate-guild-short-links.ts` — 一次性迁移脚本

### app-minerva-web
6. **修改** `.umirc.ts` — 补上 `/guild/observatory` 路由（组件文件已存在，只差路由定义）

---

不涉及的：source 旧配置（`.eslintrc.js` / `.prettierrc` 等已被 target 清理）、Prisma generated 代码（运行 `prisma generate` 可重建）、target-only 的 Templates 页面和路由（完整保留）。

确认可以开始？

### Assistant (01:00:04)

开始执行。先做 server 端的文件复制（prompts + scripts），再做 contract 合并，最后改 web 路由。

### Assistant (01:00:28)

Server 文件复制完成。现在做 contract-minerva 的合并。

### Assistant (01:00:51)

现在合并 `script.ts` — 加入 source 独有的 action 类型和 `platform` 字段。

### Assistant (01:01:50)

现在合并 `ai-service.ts`。

### Assistant (01:03:45)

合并 `ai-service.ts` — 加入 source 独有的 `personaKey`、`modelName`、`provider` 字段，保留 target 的 `maxTokens`/`temperature`/`timeoutMs`/`confidence`。

### Assistant (01:05:20)

现在合并 `brain.ts`。

### Assistant (01:06:17)

现在合并 `simulator.ts`。

### Assistant (01:07:14)

现在合并 `user-management.ts` — 加 appId 20-26。

### Assistant (01:08:21)

现在合并 `device.ts` — source 有 `scheduledAt` 吗？让我再确认一下差异方向。

### Assistant (01:09:16)

device.ts 只有引号风格差异和 target 独有的 `scheduledAt` — target 已经是超集，不需要改。

最后修改 web 路由 — 补上 Observatory 路由。

### Assistant (01:11:15)

所有 6 项改动执行完毕。现在检查 user.ts 的 source diff 是否有功能差异需要合并。

### Assistant (01:11:51)

user.ts 只有引号风格差异，无功能差异，不需要动。

### Assistant (01:12:06)

所有改动已执行，开始验证。先跑 lint。

### Assistant (01:12:40)

Server lint 有 1 个 error。让我看具体是什么 error。

### Assistant (01:14:54)

这是一个预存的 lint error（空 catch 块），不是我们改动引起的，但缓存失效后暴露了。快速修复。

### Assistant (01:18:17)

Lint 通过（0 errors, 278 warnings, EXIT_CODE=0）。现在验证一下最终差异是否干净。

### Assistant (01:19:17)

合并后残差清单符合预期：

- **web**: src_only=5 全是已清理的旧配置，diff=2 是 `.umirc.ts`（我们加了 observatory 路由，target 还多了 Templates 路由）和 `package.json`（lint 脚本差异 — 已有意调整）
- **server**: src_only=0（全部补完），diff 主要是 `src/generated/**`（Prisma 生成）+ `.env.local`/`Dockerfile`/`package.json`（已有意保持 target 版本）+ `ai-playground.ts`（我们修了 empty catch）
- **contract**: src_only=2 是 `guild/` 目录（target 已用 `union/message-template.ts` 覆盖），diff 是引号风格 + 我们合并的功能字段

接下来检查 `git status` 确认改动范围。

### Assistant (01:19:47)

`pnpm lint` 全部通过，0 errors。我们的改动文件标记正确（`AM` = 已暂存+本次修改，`??` = 新增未跟踪）。

### Assistant (01:20:08)

---

**增量同步完成，以下是本轮所有变更汇总：**

### 新增文件
| 文件 | 来源 |
|---|---|
| `packages/app-minerva-server/prompts/**` (10 个 md) | source 复制 — prompt-assembler.ts 运行时依赖 |
| `packages/app-minerva-server/scripts/migrate-guild-short-links.ts` | source 复制 — 一次性数据迁移脚本 |
| `packages/contract-minerva/src/short-link.ts` | source 复制 — server 的 short-links 路由已在引用 |

### 修改文件
| 文件 | 改动 |
|---|---|
| `docs/minerva-lint-alignment.md` | 加入同步策略说明 |
| `packages/contract-minerva/src/index.ts` | 加 `short-link` 导出 |
| `packages/contract-minerva/src/script.ts` | 加 6 个 action 类型 + `platform` 字段 |
| `packages/contract-minerva/src/union/ai-service.ts` | 加 `personaKey`、`modelName`、`provider` |
| `packages/contract-minerva/src/union/brain.ts` | 加 `pwa_progress_change`、`no_action`、`brainAllowedActionSchema` |
| `packages/contract-minerva/src/union/simulator.ts` | 加 `modelConfigId`、`initialDecision` |
| `packages/contract-minerva/src/user-management.ts` | 加 appId 20-26 |
| `packages/app-minerva-web/.umirc.ts` | 补 `/guild/observatory` 路由 |
| `packages/app-minerva-server/src/routes/guild/ai-playground.ts` | 修复预存的 empty-catch lint error |

### 验证结果
- `pnpm lint`: 27 packages, **0 errors**, 278 warnings（与之前持平）
- target-only 代码（Guild Templates 页面/路由/合约）**全部保留**
- source-only 旧配置（`.eslintrc.js`、`.prettierrc` 等）**不复制**——target 已按 flat config 对齐

需要我提交 commit 吗？

### User (01:22:29)

先别提交，看看现在和sitin-monorepo项目当前的release/migrate分支的minerva和minerva-server是否还有差异

### Assistant (01:23:21)

现在逐项看看 divergent 里还有没有漏掉的功能性差异。先看非 generated 的关键文件。

### Assistant (01:23:59)

差异盘点完毕，以下是完整对比结果：

---

## app-minerva-web（2 divergent）

| 文件 | 差异 | 性质 |
|---|---|---|
| `.umirc.ts` | 仅一处缩进差异（L296，`{` 缩进不同） | 纯格式 |
| `package.json` | target 加了 `lint` 脚本，移除了 `husky`/`lint-staged`/`eslint` devDeps | **有意改动** |

**5 个 source-only** 全是旧配置（`.eslintrc.js` / `.prettierrc` / `.stylelintrc.js` / `.lintstagedrc` / `pnpm-lock.yaml`）—— target 已清理，无需补。

## app-minerva-server（30 divergent, 0 source-only）

| 文件 | 差异 | 性质 |
|---|---|---|
| `.env.local` | 用户名/端口/额外配置不同 | **本地环境差异，正常** |
| `Dockerfile` | source 多一段 `COPY prompts/`（3 行） | source 有但 target 漏了 |
| `package.json` | lint 脚本 `--ext .ts` vs 无 | **有意改动** |
| `tunnel.js` | 跳板机 IP 不同 | **本地环境差异** |
| `ai-playground.ts` | 空 catch 修复 | **有意改动** |
| `src/generated/**`（25 个） | Prisma 版本不同导致生成产物不同 | **可重建，不需要同步** |

**Dockerfile 里缺 prompts COPY 行** — 这个需要补上，否则容器跑不起 prompt-assembler。

## contract-minerva（8 divergent, 2 source-only）

| 文件 | 差异 | 性质 |
|---|---|---|
| `package.json` | target 加了 `lint` 脚本 | **有意改动** |
| `src/index.ts` | source 多 `export * from "./guild"` | **不需要**，target 的 `union/message-template.ts` 已覆盖 |
| `src/union/index.ts` | target 多 `./template` + `./message-template`；引号风格 | **target 超集** |
| `src/union/device.ts` | target 多 `scheduledAt`；引号风格 | **target 超集** |
| `src/union/user.ts` | 纯引号风格（`"` → `'`） | 纯格式 |
| `src/union/ai-service.ts` | target 多 `maxTokens`/`temperature`/`timeoutMs`/`confidence`；引号风格 | **target 超集** |
| `src/union/brain.ts` | target 多 `confidence`/`minConfidence`/`maxConfidence`；格式差异 | **target 超集** |
| `src/union/simulator.ts` | target 多 `confidence`/`FastForward`；格式差异 | **target 超集** |

**2 个 source-only**（`guild/index.ts` + `guild/message-template.ts`）—— target 已用 `union/message-template.ts` 替代，不需要。

---

## 结论

**只剩 1 处需要补**：server `Dockerfile` 缺少 `COPY prompts/` 行。要现在补上吗？其余差异全是有意改动、本地环境、格式风格、或 target 超集，无功能代码遗漏。

*...conversation truncated for brevity...*
