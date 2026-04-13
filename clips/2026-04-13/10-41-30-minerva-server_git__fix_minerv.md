---
date: 2026-04-13T10:41:30+08:00
source: clipboard
chars: 3179
---

minerva-server git:(fix/minerva-bugs) ✗ pnpm run dev

> @sitin/minerva-server@0.1.0 dev /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server
> NODE_ENV=local tsx watch src/index.ts

[主数据库诊断] ❌ DATABASE_URL 环境变量未设置！
[主数据库诊断] 正在初始化主库 PrismaClient...
[主数据库诊断] ✅ 主库 PrismaClient 实例已创建
[Redis 诊断] CA 证书路径: /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/certs/redis-ca.pem
[Redis 诊断] CA 证书文件存在
[Redis 诊断] CA 证书已加载，长度: 1424 字符
[Monitor 数据库诊断] ❌ MONITOR_DATABASE_URL 环境变量未设置！
[Monitor 数据库诊断] 正在初始化 Monitor PrismaClient...
[Monitor 数据库诊断] 日志级别: query, error, warn
[Monitor 数据库诊断] ✅ Monitor PrismaClient 实例已创建（注意：尚未真正连接数据库，首次查询时连接）
[Guild Scheduler] Daily reset scheduled in 1279 min
[Guild Scheduler] Batch job scheduler started (30s interval)
node:internal/modules/cjs/loader:1475
  const err = new Error(message);
              ^

Error: Cannot find module './video-call-details.js'
Require stack:
- /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/routes/transactions/transactions.ts
- /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/routes/transactions/index.ts
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
    '/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/routes/transactions/transactions.ts',
    '/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/routes/transactions/index.ts',
    '/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/routes/index.ts',
    '/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/index.ts'
  ]
}

Node.js v25.8.0

