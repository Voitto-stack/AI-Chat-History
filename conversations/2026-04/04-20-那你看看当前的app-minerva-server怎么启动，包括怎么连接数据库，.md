---
title: 那你看看当前的app-minerva-server怎么启动，包括怎么连接数据库，
date: 2026-04-20T11:11:08+08:00
session_id: 8452594c-afe0-4baf-9ebc-d91355322eeb
project: /Users/presence79/Desktop/WORK/sitin-next
source: claude-code-capture
messages: 7
---

# 那你看看当前的app-minerva-server怎么启动，包括怎么连接数据库，

### User (11:11:08)

那你看看当前的app-minerva-server怎么启动，包括怎么连接数据库，怎么连接redis，告诉我方案

### Assistant (11:11:23)

我先查一下 `app-minerva-server` 的启动入口和数据库、Redis 配置链路。

### Assistant (11:11:54)

我找到启动脚本了，继续往下看入口文件、环境变量和 Redis/Prisma 初始化。

### Assistant (11:12:18)

我再补一下环境变量校验和 Redis 实现，这样方案会更完整。

### Assistant (11:12:35)

我补看一下 `.env` 文件命名和 `MONITOR_DATABASE_URL` 的实际用途。

### Assistant (11:13:48)

我看完了，当前 `app-minerva-server` 的启动方案其实已经很明确，核心是：

开发时用 `tsx watch` 直接跑 `src/index.ts`，生产时先 `tsc + prisma generate`，再跑 `build/index.js`。入口在 `packages/app-minerva-server/src/index.ts:1`，脚本在 `packages/app-minerva-server/package.json:6`。

启动链路是这样的：

`pnpm dev`  
→ `NODE_ENV=local tsx watch src/index.ts`  
→ 先按 `NODE_ENV` 加载 `.env.local`，再兜底加载 `.env`  
→ 执行 `validateEnv()` 做环境变量巡检  
→ 初始化 Koa / 路由 / 中间件  
→ 启动前主动探测主库、Redis 读实例、Redis 写实例  
→ 最后监听端口，默认 `29001`

对应代码：
- 启动脚本：`packages/app-minerva-server/package.json:7`
- env 加载：`packages/app-minerva-server/src/index.ts:4`
- 启动预检：`packages/app-minerva-server/src/index.ts:66`

数据库这边现在是 Prisma，至少有两套库连接：

主库：
- 变量：`DATABASE_URL`
- Prisma 实例：`packages/app-minerva-server/src/utils/prisma.ts:32`

监控库：
- 变量：`MONITOR_DATABASE_URL`
- Prisma 实例：`packages/app-minerva-server/src/utils/monitorPrisma.ts:33`

环境变量校验里把这两个都标成了必填，见 `packages/app-minerva-server/src/config/env.ts:20`。  
不过我顺手搜了当前代码，`monitorPrisma` 没看到被业务代码实际引用，所以现状更像是：

- `DATABASE_URL` 必须真的能连
- `MONITOR_DATABASE_URL` 目前大概率是“启动时要求有，但实际业务可能没在用“

Redis 这边不是单实例，而是读写分离：

- `REDIS_URL`：只读 Redis
- `REDIS_WRITE_URL`：写入 Redis

代码在 `packages/app-minerva-server/src/utils/redis.ts:160` 和 `packages/app-minerva-server/src/utils/redis.ts:170`。

Redis 的连接特点：
- 用 `ioredis`
- `lazyConnect: true`
- 默认要求你提供 URL
- 支持 TLS
- CA 优先从 `REDIS_CA` 读，没有的话回退到本地文件 `certs/redis-ca.pem`
- 启动时会主动 `connect()` + `ping()`

对应代码：
- Redis 客户端创建：`packages/app-minerva-server/src/utils/redis.ts:74`
- CA 读取：`packages/app-minerva-server/src/utils/redis.ts:6`
- 启动时连 Redis：`packages/app-minerva-server/src/index.ts:98`

所以我建议你现在按下面这个方案启动。

本地开发方案：

1. 先准备环境文件  
优先用 `.env.local`，因为 `NODE_ENV=local` 时默认读这个文件。文件位置：
- `packages/app-minerva-server/.env.local`

最少要配这些：
- `DATABASE_URL`
- `MONITOR_DATABASE_URL`
- `JWT_SECRET`
- `REDIS_URL`
- `REDIS_WRITE_URL`

另外 `validateEnv()` 还要求一堆第三方变量也存在，比如 OSS、飞书、TIM、Proto Gateway，见 `packages/app-minerva-server/src/config/env.ts:20`。这意味着你就算只想本地起服务，也不能只填 DB/Redis，还得把这些必填项补齐，否则启动会直接 `process.exit(1)`。

2. 数据库连接方式  
代码预期是 PostgreSQL 连接串，比如：
```env
DATABASE_URL=postgresql://user:password@127.0.0.1:5433/minerva
MONITOR_DATABASE_URL=postgresql://user:password@127.0.0.1:5433/minerva_monitor
```

我在仓库里还看到一个现成的 SSH 隧道脚本 `packages/app-minerva-server/tunnel.js:4`，它会把：

*...truncated...*

### User (11:14:01)

把结论发我

### Assistant (11:14:20)

结论可以直接发这段：

当前 `app-minerva-server` 的启动方案是“本地 Node 进程 + `.env.local` + SSH 隧道连远端 DB/Redis“，不是本地 Docker 一键起全套依赖。

- 启动命令：`pnpm --filter @sitin/minerva-server dev`，或进入包目录后执行 `pnpm dev`
- 启动入口：`packages/app-minerva-server/src/index.ts`
- 环境加载：默认按 `NODE_ENV=local` 读取 `.env.local`，再兜底 `.env`
- 数据库：用 Prisma 连接 `DATABASE_URL`；`MONITOR_DATABASE_URL` 也被启动校验要求存在
- Redis：用 ioredis 连接 `REDIS_URL`（读）和 `REDIS_WRITE_URL`（写），支持 TLS/CA
- 本地联调预期端口：DB `5433`，Redis 读 `6378`，Redis 写 `6379`（来自 `tunnel.js`）
- 注意：启动前会先做 `validateEnv()`，所以不只是 DB/Redis，要把必填 env 全配齐，否则服务直接退出
- 另外 README 里的 `pnpm db:migrate` 已经过时，`package.json` 里没有这个脚本

### User (15:44:51)

假如我dump了数据库，这个minerva-server要怎么连接

### Assistant (15:45:40)

如果你已经把库 dump 到本地了，最直接的做法就是把 `.env.local` 里的数据库连接串改到你本地的 PostgreSQL。

这个服务启动时会先按 `NODE_ENV=local` 读取 `.env.local`，见 `packages/app-minerva-server/src/index.ts:4`。它真正用到的主库是 `DATABASE_URL`，见 `packages/app-minerva-server/src/utils/prisma.ts:5`；另外 `MONITOR_DATABASE_URL` 也被启动校验要求存在，见 `packages/app-minerva-server/src/config/env.ts:23` 和 `packages/app-minerva-server/src/config/env.ts:29`。

如果你的 dump 已经恢复到本地 PostgreSQL，比如本地是 `127.0.0.1:5432`，库名叫 `minerva`，那就这样配：

```env
DATABASE_URL=postgresql://postgres:你的密码@127.0.0.1:5432/minerva
MONITOR_DATABASE_URL=postgresql://postgres:你的密码@127.0.0.1:5432/minerva_monitor
```

如果你只有一份主库 dump，没有 monitor 库，那至少也要给 `MONITOR_DATABASE_URL` 一个能连的库，不然 `validateEnv()` 过不去，服务会直接退出，见 `packages/app-minerva-server/src/config/env.ts:169`。

Redis 不需要跟着 dump。你有两种接法：

1. 继续用原来的 Redis  
只改 `DATABASE_URL` / `MONITOR_DATABASE_URL`，`REDIS_URL` 和 `REDIS_WRITE_URL` 保持原值。

2. 改成本地 Redis  
如果你本地也起了 Redis，就改成：
```env
REDIS_URL=redis://127.0.0.1:6379
REDIS_WRITE_URL=redis://127.0.0.1:6379
```

Redis 代码在 `packages/app-minerva-server/src/utils/redis.ts:74`。它要求这两个 env 存在，但 Redis 连不上通常只会在启动日志里报错，不会像缺 env 一样直接退出，启动探测逻辑在 `packages/app-minerva-server/src/index.ts:98`。

实际落地就是这几步：

先把 dump 恢复到本地 PostgreSQL。  
然后改 `packages/app-minerva-server/.env.local` 里的：
- `DATABASE_URL`
- `MONITOR_DATABASE_URL`
- 视情况改 `REDIS_URL`
- 视情况改 `REDIS_WRITE_URL`

最后启动：
```bash
pnpm --filter @sitin/minerva-server dev
```

如果你是“只想连本地 dump 的主库，别的先不动“，那最小改动就是：只把两个 PostgreSQL URL 改成本地，Redis 先沿用原来的配置。

### User (16:16:10)

我现在接收了一个dump的测试数据库文件，以.dump为后缀，怎么用在这个minerva-server里面2

### Assistant (16:16:12)

Please run /login · API Error: 403 {"error":{"code":"","message":"This channel has been disabled (request id: 202604200816124217281238268d9d6ppwO0eAQ)","type":"new_api_error"}}

### User (16:17:07)

<local-command-stdout>Set model to [1mOpus 4.7 (1M context)[22m</local-command-stdout>

### User (16:17:08)

我现在接收了一个dump的测试数据库文件，以.dump为后缀，怎么用在这个minerva-server里面2

### Assistant (16:17:09)

Please run /login · API Error: 403 {"error":{"code":"","message":"This channel has been disabled (request id: 202604200817097138699148268d9d6PXXG2pD6)","type":"new_api_error"}}

### User (16:17:19)

我现在接收了一个dump的测试数据库文件，以.dump为后缀，怎么用在这个minerva-server里面2

### Assistant (16:20:23)

Please run /login · API Error: 401 Invalid API key format

