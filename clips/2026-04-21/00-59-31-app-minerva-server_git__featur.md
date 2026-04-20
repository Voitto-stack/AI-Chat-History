---
date: 2026-04-21T00:59:31+08:00
source: clipboard
chars: 2403
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
/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/guild/internal.ts:11
const PROGRESS_ORDER = pwaProgressSchema.options;
                                         ^

TypeError: Cannot read properties of undefined (reading 'options')
    at Router (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/guild/internal.ts:11:42)
    at Object.<anonymous> (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/guild/internal.ts:72:2)
    at Module._compile (node:internal/modules/cjs/loader:1831:14)
    at Object.transformer (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:3:1104)
    at Module.load (node:internal/modules/cjs/loader:1552:32)
    at Module._load (node:internal/modules/cjs/loader:1354:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.require (node:internal/modules/cjs/loader:1575:12)
    at require (node:internal/modules/helpers:191:16)
    at <anonymous> (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/guild/index.ts:21:32)

Node.js v25.8.0

