---
date: 2026-04-15T11:15:18+08:00
source: clipboard
chars: 11834
---

环境: production
接口: Prisma | GET /api/call-feed/live-streamers
错误: PrismaClientKnownRequestError —
Invalid `prisma.userinfo.findMany()` invocation:


Assertion violation on the database: `too many bind variables in prepared statement, expected maximum of 32767, received 32768`
堆栈:
```
PrismaClientKnownRequestError:
Invalid `prisma.userinfo.findMany()` invocation:


Assertion violation on the database: `too many bind variables in prepared statement, expected maximum of 32767, received 32768`
    at ei.handleRequestError (/app/generated/prisma/runtime/library.js:125:7268)
    at ei.handleAndLogRequestError (/app/generated/prisma/runtime/library.js:125:6593)
    at ei.request (/app/generated/prisma/runtime/library.js:125:6300)
    at async a (/app/generated/prisma/runtime/libra
```
分析这个只存在于线上生产环境的报错
我来分析这个生产环境的 Prisma 错误。问题很明确：SQL prepared statement 的绑定变量超过了 PostgreSQL 的上限（32767）。

让我找到相关代码。

Agent:Find live-streamers route code
IN
在 apps/minerva-server 中找到 call-feed/live-streamers 相关的路由和 service 代码。我需要找到：
1. 路由定义文件
2. 实际调用 prisma.userinfo.findMany() 的 service 代码
3. 任何涉及 IN 查询或大量 where 条件的代码

请给出完整的文件路径和关键代码行号。搜索要彻底，包括 controller、service、router 各层。
Bash
IN
find /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server -type f -name "*.ts" -o -name "*.js" | head -20

OUT
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/tunnel.js
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/prisma/verify-models.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/prisma/fix-gemini.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/prisma/seed-message-templates.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/prisma/seed.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/prisma/seed-prompts.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/prisma/verify-prompts.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/prisma/seed-models.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/prisma/check-keys.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/prisma/query-example.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/scripts/post-build.dev.js
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/scripts/test-simulator.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/scripts/post-build.prod.js
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/scripts/seed-models.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/test-model-selection.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/build/generated/prisma/client.js
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/build/generated/prisma/edge.d.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/build/generated/prisma/wasm.d.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/build/generated/prisma/runtime/wasm-engine-edge.js
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/build/generated/prisma/runtime/wasm-compiler-edge.js
Bash
IN
find /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src -type d | grep -E "(route|controller|service)" | head -20

OUT
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/webhook
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/rbac
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/screenshot-review
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/posts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/digital-human
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/changelog
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/auth
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/call-feed
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/chat-console
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/pwa-databoard
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/transactions
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/lovia
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/users
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/data-analysis
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/social-proxy
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/review-score
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/risk
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/union-streamer
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/upload
Bash
IN
ls -la /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/call-feed/

OUT
total 64
drwxr-xr-x@  4 presence62  staff    128 Apr 14 18:11 .
drwxr-xr-x@ 25 presence62  staff    800 Apr 14 18:11 ..
-rw-r--r--@  1 presence62  staff  27788 Apr 14 21:03 call-feed.ts
-rw-r--r--@  1 presence62  staff     49 Apr 14 18:11 index.ts
Read call-feed.ts
Read fetchUserMap.ts
Read fetchUserMap.ts
Read index.ts
Bash
IN
find /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src -type f \( -name "*service*" -o -name "*Service*" \) | head -20

OUT
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/guild/ai-service.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/services/external-service.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/services/guild/analytics-service.ts
/Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/services/guild/gateway-service.ts
Grep "\.in\(|findMany\(|{ in:" (in /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/call-feed)
1 line of output
Grep "prisma\.(userinfo|user_online_status_record|pwa_user_video|user_call_order|user_balance|user_withdraw_task|user_paypal_id|user_geo_location|user_ins_exchange_order)\.findMany" (in /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/call-feed/call-feed.ts)
68 lines of output
Grep "prisma\.(userinfo|user_online_status_record)\.findMany|\.in\(" (in /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/utils/fetchUserMap.ts)
39 lines of output
Bash
IN
grep -n "queryCallOrders\|queryInsOrders" /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/call-feed/call-feed.ts | head -10

OUT
339:      ? queryCallOrders(startTime, endTime, userId, orderStatus, orderType, guildInviteCode, anchorStatus)
342:      ? queryInsOrders(startTime, endTime, userId, orderStatus, guildInviteCode, anchorStatus)
523:async function queryCallOrders(
612:async function queryInsOrders(
695:      console.warn(`[queryInsOrders] INS order ${r.order_id} has no amount in balance_change_history`);
Bash
IN
sed -n '522,610p' /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src/routes/call-feed/call-feed.ts | grep -E "IN|in\(|{ in:"

OUT
    JOIN userinfo u ON uco.female_user_id = u.user_id
    LEFT JOIN userinfo_pwa_club_mapping ucm ON u.user_id = ucm.user_id
    LEFT JOIN pwa_club pc ON ucm.pwa_club_id = pc.id
        OR (${anchorStatus} = '2' AND (u.deleted_at IS NOT NULL OR u.regulation_status IN (2, 5, 6)))
Read call-feed.ts (lines 56-155)
关键代码已找到。问题出在第 97-104 行。让我确认 allUserIds 的规模。

Read fetchUserMap.ts
现在我完全理解了问题。以下是分析：

根因分析
错误本质
PostgreSQL prepared statement 的绑定变量上限是 32,767（Int16 最大值）。当 Prisma 生成 WHERE user_id IN ($1, $2, ..., $N) 时，每个 ID 占一个绑定变量。

触发路径
call-feed.ts:97-104 是直接触发点：


const userInfoRows = await prisma.userinfo.findMany({
  where: {
    user_id: { in: allUserIds },  // ← allUserIds 来自 Redis 全量返回
    app_name: APP_NAME_HAVEN_PWA,
    deleted_at: null,
  },
  select: { user_id: true },
});
allUserIds 来源（第 84-93 行）：Redis ZREVRANGEBYSCORE 返回的全量在线用户 ID，没有任何数量限制。

为什么只在生产环境出现
生产环境 Redis 中 user:online:rank ZSET 积累了 32,768+ 个用户 ID
当 isAll=true 时（查当天全量活跃用户），minScore 只追溯到 PST 当天零点，意味着一整天的活跃用户全部返回
本地/dev 环境用户量远不到这个级别
绑定变量计算
这条查询有 3 个 WHERE 条件：

user_id IN (...) → N 个绑定变量
app_name = $X → 1 个绑定变量
deleted_at IS NULL → 0 个（IS NULL 不需要绑定变量）
所以当 N = 32,767 时刚好 32,768 = 32,767 + 1，触发上限。

潜在的其他爆点
fetchUserMap.ts:134-141 虽然也有 { in: userIds } 的查询，但它接收的是 分页后 的 pagedIds（第 112 行 filteredIds.slice(offset, offset + limit)），所以不会触发这个问题。真正的问题只出在分页前的那次全量过滤查询。

修复方案
最直接有效的方案是 分批查询（chunked query）：将 allUserIds 按安全大小分批执行 findMany，合并结果。

安全的 chunk 大小建议设为 30,000（留余量给其他绑定变量）。

需要修复吗？我可以直接改代码。

改代码吧
Read call-feed.ts (lines 1-10)
Grep "chunk|CHUNK|batch|BATCH" (in /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src)
33 lines of output
项目中已有 chunk/batch 的使用。让我看看是否有现成的 chunk 工具函数。

Grep "function chunk|chunkedQuery|findManyChunked" (in /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server/src)
1 line of output
没有现成的工具函数。我来在两个文件中做修改：

call-feed.ts — 分批查询 allUserIds
fetchUserMap.ts — 同样加保护，防止其他调用方传入超大数组
Edit call-feed.ts
Added 7 lines
现在给 fetchUserMap 也加同样的保护。

Edit fetchUserMap.ts
Added 21 lines
现在验证一下 FullRow 类型引用是否仍然正确——它在原文件的 buildFull 前面定义。

Read fetchUserMap.ts (lines 226-245)
FullRow 类型在第 233 行定义，而 allRows: FullRow[] 在 fetchUserMap 函数体内使用——因为 JavaScript/TypeScript 中函数体内可以引用函数定义之后声明的类型（类型在编译期解析），所以没问题。

让我跑一下 TypeScript 检查确认无误。

Bash TypeScript type check on minerva-server
IN
cd /Users/presence62/Desktop/Minerva-sitin-monorepo/apps/minerva-server && npx tsc --noEmit --pretty 2>&1 | head -40

OUT
(Bash completed with no output)
TypeScript 编译零错误。两处修改完成：

call-feed.ts:97-110 — Redis 返回的全量 allUserIds 分批查询 userinfo
fetchUserMap.ts:117-185 — fetchUserMap 内部同样分批，防止其他调用方传入超大数组
两处都以 30,000 为 chunk 大小，给其他绑定变量留足余量。

推荐 commit：fix: 分批查询 userinfo 避免 PostgreSQL prepared statement 绑定变量超过 32767 上限
