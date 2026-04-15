---
date: 2026-04-15T15:18:13+08:00
source: clipboard
chars: 2687
---

 minerva-server git:(fix/minerva-bugs) ✗ pnpm run dev

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

