---
date: 2026-04-21T00:56:29+08:00
source: clipboard
chars: 3825
---

 app-minerva-server git:(feature/migrate-minerva-from-monorepo) ✗ pnpm run dev 

> @sitin/minerva-server@0.1.0 dev /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server
> NODE_ENV=local tsx watch src/index.ts

[主数据库诊断] 连接地址: postgresql://presence79@localhost:5432/archat_test?schema=public
[主数据库诊断]   协议: postgresql:
[主数据库诊断]   主机: localhost
[主数据库诊断]   端口: 5432
[主数据库诊断]   数据库: archat_test
[主数据库诊断]   用户名: presence79
[主数据库诊断]   参数: ?schema=public
[主数据库诊断] 正在初始化主库 PrismaClient...
[主数据库诊断] ✅ 主库 PrismaClient 实例已创建
[Redis 诊断] CA 证书来源: 文件 /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/certs/redis-ca.pem，长度: 1424 字符
[Redis 诊断] TLS 配置: 已启用 (rejectUnauthorized=false)
[Monitor 数据库诊断] ❌ MONITOR_DATABASE_URL 环境变量未设置！
[Monitor 数据库诊断] 正在初始化 Monitor PrismaClient...
[Monitor 数据库诊断] 日志级别: query, error, warn
[Monitor 数据库诊断] ✅ Monitor PrismaClient 实例已创建（注意：尚未真正连接数据库，首次查询时连接）
node:internal/modules/cjs/loader:1475
  const err = new Error(message);
              ^

Error: Cannot find module 'ai'
Require stack:
- /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/ai-client.ts
- /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/brain-engine.ts
- /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/batch-job-processor.ts
- /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/guild/users.ts
- /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/guild/index.ts
- /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/index.ts
- /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/index.ts
    at node:internal/modules/cjs/loader:1475:15
    at nextResolveSimple (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1004)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:3:2630
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:3:1542
    at resolveTsPaths (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:4:760)
    at /Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:4:1102
    at m._resolveFilename (file:///Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-B7jrtLTO.mjs:1:789)
    at wrapResolveFilename (node:internal/modules/cjs/loader:1048:27)
    at defaultResolveImplForCJSLoading (node:internal/modules/cjs/loader:1072:10)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1093:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/ai-client.ts',
    '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/brain-engine.ts',
    '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/batch-job-processor.ts',
    '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/guild/users.ts',
    '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/guild/index.ts',
    '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/index.ts',
    '/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/index.ts'
  ]
}

Node.js v25.8.0

