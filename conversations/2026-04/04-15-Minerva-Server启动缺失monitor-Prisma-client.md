---
title: Minerva Server 启动缺失 monitor Prisma client
date: 2026-04-15 15:22:30
model: claude-sonnet-4-5-20250929
messages: 2
---

# Minerva Server 启动缺失 monitor Prisma client

### User (15:20:00)
这个怎么解决： minerva-server git:(fix/minerva-bugs) ✗ pnpm run dev

> @sitin/minerva-server@0.1.0 dev /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server
> NODE_ENV=local tsx watch src/index.ts

[主数据库诊断] ❌ DATABASE_URL 环境变量未设置！
[主数据库诊断] 正在初始化主库 PrismaClient...
[主数据库诊断] ✅ 主库 PrismaClient 实例已创建
[Redis 诊断] CA 证书来源: 文件 /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/certs/redis-ca.pem，长度: 1424 字符
[Redis 诊断] TLS 配置: 已启用 (rejectUnauthorized=false)
node:internal/modules/cjs/loader:1475
  const err = new Error(message);
              ^

Error: Cannot find module '../generated/monitor-prisma'
Require stack:
- /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/utils/monitorPrisma.ts
- /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/routes/health.ts
- /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/routes/index.ts
- /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/index.ts
    at node:internal/modules/cjs/loader:1475:15
    at nextResolveSimple (/Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/tsx@4.21.0/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1004)
    at /Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/tsx@4.21.0/node_modules/tsx/dist/register-D46fvsV_.cjs:3:2630
    at /Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/tsx@4.21.0/node_modules/tsx/dist/register-D46fvsV_.cjs:3:1542
    at resolveTsPaths (/Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/tsx@4.21.0/node_modules/tsx/dist/register-D46fvsV_.cjs:4:760)
    at /Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/tsx@4.21.0/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1102
    at m._resolveFilename (file:///Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/tsx@4.21.0/node_modules/tsx/dist/register-B7jrtLTO.mjs:1:789)
    at wrapResolveFilename (node:internal/modules/cjs/loader:1048:27)
    at defaultResolveImplForCJSLoading (node:internal/modules/cjs/loader:1072:10)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1093:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/utils/monitorPrisma.ts',
    '/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/routes/health.ts',
    '/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/routes/index.ts',
    '/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/index.ts'
  ]
}

Node.js v25.8.0

### Assistant (15:22:30)
原因已经确认了：不是 tsx 或 Node 版本问题，而是 `apps/minerva-server/src/generated/monitor-prisma` 根本没生成，所以 `src/utils/monitorPrisma.ts` 里的 `import { PrismaClient } from "../generated/monitor-prisma";` 直接报 `MODULE_NOT_FOUND`。

我已经执行过这条命令，问题本身解决了：

```bash
cd /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server
pnpm prisma generate --schema=prisma/monitor/schema.prisma
```

生成成功后，再跑 `pnpm run dev`，服务已经能起来了。

你现在还剩一个独立问题：主库连不上。

从日志看：
- `MONITOR_DATABASE_URL` 正常，monitor 库已连通
- Redis 读写都正常
- Minerva Server 已启动在 `29001`
- 只有主库 `DATABASE_URL=postgresql://presence62@localhost:5432/archat_local?schema=public` 连不上，因为本地 `5432` 没有 PostgreSQL 在监听

所以你现在分两步：

```bash
cd /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server
pnpm prisma generate --schema=prisma/monitor/schema.prisma
pnpm run dev
```

如果要让主库也正常：
- 要么先启动你本地的 PostgreSQL，让 `localhost:5432` 可用
- 要么把 `.env.local` 里的 `DATABASE_URL` 改成你实际能连通的库

### 2. 深度交互

这个坑的根因是项目把 monitor prisma client 的生成放进了 `build:dev/build:prod` 和 `db:generate`，但没放进 `dev`。所以第一次本地启动时，只要你还没手动 generate，就会直接炸。

更合理的是把 `dev` 改成先执行一次 prisma generate，或者至少补一个一键脚本，不然这个问题以后还会反复出现。
