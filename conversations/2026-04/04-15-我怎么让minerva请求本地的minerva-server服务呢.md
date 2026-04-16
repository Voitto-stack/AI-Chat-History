---
title: 我怎么让minerva请求本地的minerva-server服务呢
date: 2026-04-15T11:25:24+08:00
session_id: 98336076-242f-4b1b-9eac-e8d8a5e4c616
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 8
---

# 我怎么让minerva请求本地的minerva-server服务呢

### User (11:25:24)

我怎么让minerva请求本地的minerva-server服务呢

### User (11:25:56)

我怎么让minerva请求本地的minerva-server服务呢

### Assistant (11:30:05)

### 1. 直接执行

你现在前后端的 `local` 端口没对齐，所以 Minerva 没在请求本地 Minerva Server。

前端 `local` 固定走 `http://localhost:29003`（`apps/minerva/src/utils/getUrl.ts:14-16`），但后端 `.env.local` 里是 `PORT=29001`（`apps/minerva-server/.env.local:20`）。

直接改一边就通了，推荐改后端端口跟前端对齐：

1) 把 `apps/minerva-server/.env.local` 里的  
`PORT=29001` 改成 `PORT=29003`  
2) 启动后端：`pnpm -C apps/minerva-server dev`  
3) 启动前端（必须 local 模式）：`pnpm -C apps/minerva dev:local`

这样前端所有 `/api/*` 就会打到你本地的 minerva-server。

---

### 2. 深度交互

你这个问题本质是"环境切换里有双端口源"，以后会反复踩。更稳的做法是把本地联调端口统一成一个约定（比如都用 `29001` 或都用 `29003`），并且只保留一个配置源，不要前端硬编码一个端口、后端 `.env` 再配另一个。这样切环境时不会再出现"服务明明起了但前端请求错地方"的隐性故障。

### User (15:09:24)

解决一下问题：minerva-server git:(fix/minerva-bugs) ✗ node tunnel.js
node:internal/modules/cjs/loader:1478
  throw err;
  ^

Error: Cannot find module '/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/apps/minerva-server/tunnel.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1475:15)
    at wrapResolveFilename (node:internal/modules/cjs/loader:1048:27)
    at defaultResolveImplForCJSLoading (node:internal/modules/cjs/loader:1072:10)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1093:12)
    at Module._load (node:internal/modules/cjs/loader:1261:25)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v25.8.0
➜  minerva-server git:(fix/minerva-bugs) ✗ 

### Assistant (15:13:21)

### 1. 直接执行

问题已经定位了：不是 `tunnel.js` 文件不存在，而是你运行命令时的当前目录不对，导致 Node 去找了这个路径：

`/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/apps/minerva-server/tunnel.js`

也就是把 `apps/minerva-server` 拼了两次。

我这边实际验证过，在正确目录下运行是通的，而且隧道已经成功建立了，日志里 DB / Redis / Redis 写入都正常。

你直接这样跑就行：

```bash
cd /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server
node ./tunnel.js
```

或者如果你当前已经在 `apps/minerva-server` 目录里，就直接：

```bash
node ./tunnel.js
```

不要再带一层 `apps/minerva-server/` 前缀。

另外，我这边已经起了一个 tunnel 进程，现在是正常工作的，映射是：

- DB: `127.0.0.1:5433 -> 10.51.1.3:5432`
- Redis 只读: `127.0.0.1:6378 -> 10.226.1.5:6378`
- Redis 写入: `127.0.0.1:6379 -> 10.226.1.4:6378`

如果你想自己重新起一个，先把我这边这个进程停掉，不然可能端口占用。

---

### 2. 深度交互

这个问题本质不是 `tunnel.js` 本身坏了，而是这个脚本的使用方式太容易踩坑：它依赖"当前工作目录正确"，但没有做任何保护。

更稳的做法有两个：

1. 给 `apps/minerva-server/package.json` 加一个脚本，比如：
   ```json
   "tunnel": "node ./tunnel.js"
   ```
   之后统一用：
   ```bash
   pnpm tunnel
   ```

2. 或者把 `tunnel.js` 挪到 `scripts/` 里，避免和当前目录语义混淆。

现在先不用改代码，你先按上面的正确路径跑就能用了。

### User (15:18:23)

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


### Assistant (15:24:16)

### 1. 直接执行

这个报错我已经帮你定位并实际验证过了，分成两个问题：

#### 第一个问题：`Cannot find module '../generated/monitor-prisma'`
原因不是 `tsx` 或 Node 版本，而是 monitor 的 Prisma client 没生成。

`src/utils/monitorPrisma.ts:1` 直接在引：
`../generated/monitor-prisma`

但目录一开始确实不存在。  
我已经执行过下面这条，生成成功了：

```bash
cd /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server
pnpm prisma generate --schema=prisma/monitor/schema.prisma
```

生成后再跑 `pnpm run dev`，这个 `MODULE_NOT_FOUND` 已经没了。

#### 第二个问题：主库连不上
现在服务其实已经能启动了，卡的不是 monitor 库，而是主库：

- `MONITOR_DATABASE_URL` 正常
- Redis 读写都正常
- 服务已经启动在 `29001`
- 只有 `DATABASE_URL` 对应的主库连不上

你 `.env.local` 里现在是：

`DATABASE_URL="postgresql://presence62@localhost:5432/archat_local?schema=public"`

日志里也明确说了：

`Can't reach database server at localhost:5432`

也就是说你本机 `5432` 没有 PostgreSQL 在监听。

你现在直接这样处理：

```bash
cd /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server
pnpm prisma generate --schema=prisma/monitor/schema.prisma
pnpm run dev
```

如果想让主库也正常可用，再做二选一：

1. 启动你本地 PostgreSQL，让 `localhost:5432` 可连
2. 或者把 `.env.local` 里的 `DATABASE_URL` 改成你实际可连的数据库地址

---

### 2. 深度交互

这个问题的根因其实是项目脚本设计有坑，不是你操作错了。

`package.json` 里 monitor Prisma 的生成被放在了：
- `build:dev`
- `build:prod`
- `db:generate`

但没放进 `dev`，所以第一次本地跑开发环境时，天然会炸一次。

更合理的做法是把 `dev` 改成启动前先生成 client，不然这个问题以后换机器、删缓存、切分支时还会重复出现。

### User (15:32:29)

为什么出现这个问题：GET https://admin-prod.sitin.ai/pwa/call-feed 404 (Not Found)，但是线上环境正常

### Assistant (15:33:35)

### 1. 直接执行

因为你访问错域名了。

`/pwa/call-feed` 这个路由在前端配置里是存在的，`apps/minerva/.umirc.ts:163-168` 明确有：

- `path: '/pwa/call-feed'`
- `component: './CallFeed'`

但你访问的是：

`https://admin-prod.sitin.ai/pwa/call-feed`

而这个项目里生产环境主站代码返回的是：

- 构建部署文档：`admin-prod.sitin.ai` 对应 prod bucket（`docs/BUILD_FLOW.md:159-162`）
- 但前端代码里真正的 production admin console URL 是 `https://admin.sitin.ai`（`apps/minerva/src/utils/getUrl.ts:46-53`）

也就是说：

- `admin-prod.sitin.ai` 更像是构建产物桶绑定域名 / 部署域名
- `admin.sitin.ai` 才是线上正式访问入口
- 你直接敲 `admin-prod.sitin.ai/pwa/call-feed`，这个域名大概率没有做 SPA fallback，刷新或直达子路由时就会 404
- 但线上"正常"是因为你平时实际走的是正式入口，或者是先进入首页后前端路由接管了

这个现象非常典型：  
**单页应用前端路由正常，但静态站点/网关没有把任意子路径 rewrite 到 `index.html`，所以直开子路由 404。**

---

### 2. 深度交互

本质不是 `call-feed` 页面有问题，而是"你验证的不是同一条访问链路"。

你现在比较的是：

- 直开：`https://admin-prod.sitin.ai/pwa/call-feed` → 服务器先处理 → 404
- 线上正常：通常是先进入站点，再由 React/Umi 前端路由跳转到 `/pwa/call-feed`

这两种路径对 SPA 来说不是一回事。

所以结论很直接：

1. 如果你要验证正式线上页面，优先看 `https://admin.sitin.ai/pwa/call-feed`
2. 如果你坚持用 `admin-prod.sitin.ai` 直开子路由，那要检查这个域名对应的 GCS / CDN / LB 是否配置了 `index.html` fallback
3. 如果首页能开、子路由直开 404，那几乎可以直接判定是静态托管 rewrite 问题，不是前端页面代码问题

### User (15:44:32)

你去看下新老项目的transactions页面，看看弹窗中的mock适配的数据来源是否一致：[Image #1]

### Assistant (15:51:14)

### 1. 直接执行

我看过了，**一致**。

Transactions 弹窗里 `Mock Amount` 和 `MOCK_VIDEO` 行的数据来源，新老项目走的是同一套后端语义，都是老接口 `protoId: 4754` 对应的那套逻辑，只是新项目把它改成了自己查库实现。

先说结论：

- `Mock Amount`：新老项目都表示 `user_call_order` 里 `order_type = 'MOCK_VIDEO'` 且 `status = 'PAID'` 的金额汇总
- 弹窗表格里 `MOCK_VIDEO` 那一行：新老项目都来自同一批订单数据
- `View` 对应的视频地址：新老项目都取 `video_test_history.video_url`

对应证据：

老项目前端只是透传 proto 4754 的返回值，没有自己加工 mock 逻辑：
- `presence-server-admin-console/src/UserConsole/Transactions/VideoCallDetails/api.ts:51-57` 直接请求 `protoId: 4754`
- `presence-server-admin-console/src/UserConsole/Transactions/VideoCallDetails/index.tsx:83-99` 直接把返回的 `sumMockVideoCallAmount` 塞进弹窗统计
- `presence-server-admin-console/src/UserConsole/Transactions/VideoCallDetails/config.tsx:82-95` 表格直接使用返回的 `videoUrl`

新项目是后端自己对齐实现：
- `apps/minerva-server/src/routes/transactions/transactions.ts:254-264` 明确从 `user_call_order` 统计 `order_type IN ('VIDEO_CALL', 'MOCK_VIDEO')`
- `apps/minerva-server/src/routes/transactions/transactions.ts:316` 把 `MOCK_VIDEO` 汇总映射到 `sumMockVideoCallAmount`
- `apps/minerva-server/src/routes/transactions/video-call-details.ts:35-37` 注释明确写了 `MOCK_VIDEO -> video_test_history.video_url`
- `apps/minerva-server/src/routes/transactions/video-call-details.ts:65-67` 实际也是这么取的
- `apps/minerva/src/pages/Transactions/components/VideoCallModal.tsx:63-67,139-142` 前端只是展示后端返回的 `sumMockVideoCallAmount`

所以从"数据来源"这件事上看，**新项目没有把 mock 统计接错地方，也没有把 mock 金额错接到别的表**。

---

### 2. 深度交互

你这次怀疑的方向是对的，但更值得怀疑的不是"来源表是否一致"，而是"筛选条件和金额口径是否完全对齐"。

因为现在我确认的是：
- 来源表一致
- 字段语义一致
- mock 视频 URL 来源一致

但如果你线上看到数值不对，更可能出在这几种地方：

1. `status='PAID'` 的过滤是否和老 proto 完全一致
2. `amount` 字段是否存在空串 / null / 字符串数值转换差异
3. 列表分页顺序一致，但某些边界单是否被纳入汇总
4. 线上 prod 访问的其实还是旧部署产物，不是你当前分支代码

所以这块下一步最有价值的验证，不是再看前端，而是拿一个具体 `femaleUserId`，把新后端 SQL 汇总值和老线上弹窗值逐项对账。

*...conversation truncated for brevity...*
