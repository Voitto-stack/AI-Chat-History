# 计划：从 monorepo release/migrate 同步 Minerva 代码

## 背景
以 sitin-monorepo 的 release/migrate 分支为准，覆盖 sitin-next 的 minerva 代码，同时保留 sitin-next 独有的文件。

## 包映射
| monorepo | sitin-next |
|----------|-----------|
| `apps/minerva-server/` | `packages/app-minerva-server/` |
| `apps/minerva/` | `packages/app-minerva-web/` |
| `packages/minerva-schemas/` | `packages/contract-minerva/` |

## 执行步骤

### 第 1 步：同步 app-minerva-server
- rsync 覆盖 `src/`（不删除 sitin-next 独有文件）
- rsync 覆盖 `prisma/`（补上新 migration）
- 复制 `openapi.yaml`
- 合并 package.json（补回 `@ai-sdk/*`、`ai`、`nanoid` 依赖）
- 保留：`eslint.config.js`、`.env*`、`tunnel.js`、`certs/`

### 第 2 步：同步 app-minerva-web
- rsync 覆盖 `src/`（排除 `.umi*`，保留 Templates 页面）
- 合并 `.umirc.ts`（加回 monorepo 的路由，保留 sitin-next 独有路由）
- rsync 覆盖 `public/`
- 合并 package.json（去掉 husky/lint-staged，保留 lint 脚本）
- 保留：`eslint.config.js`

### 第 3 步：同步 contract-minerva
- rsync 覆盖 `src/`（加入 `guild/`、`short-link.ts`，保留 `template.ts`、`message-template.ts`）
- 合并 `src/index.ts` 导出（加回 monorepo 的导出，保留 sitin-next 的导出）
- 保留：`package.json`、`eslint.config.js`、`tsup.config.ts`

### 第 4 步：安装依赖 + 验证
- `pnpm install`
- `pnpm lint`（针对 3 个包）
- 启动验证

## 每步执行前会让用户确认
