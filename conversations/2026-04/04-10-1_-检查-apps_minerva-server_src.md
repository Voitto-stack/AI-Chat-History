---
title: 1. 检查 apps/minerva-server/src
date: 2026-04-10T20:49:38+08:00
session_id: 3f5d6d7a-daa6-4088-a632-8619665df293
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 4
---

# 1. 检查 apps/minerva-server/src

### User (20:49:38)

 1. 检查 apps/minerva-server/src
  /routes/posts/posts.ts 中的
  POST /api/posts/:id/score 端点
  2. 确认 scoreType
  是否正确映射为 like_count_type
  数组
  3. 验证 proto 9032 调用参数

### Assistant (20:51:40)

先把这轮对话按你的规则存到 GitMemo。

### Assistant (20:53:57)

用 systematic debugging 的方式查这个端点。

### Assistant (20:54:24)

先看文件结构和实际路由写法。

### Assistant (20:54:55)

继续沿调用链找 schema 和旧的 proto 参数定义。

### Assistant (20:55:46)

我先确认旧实现里 9032 是怎么传的。

### Assistant (20:56:19)

再补两块证据：当前项目有没有走 proto，和 proto 定义里这个请求到底长什么样。

### Assistant (20:57:23)

补一眼测试脚本，确认这个端点当前就是 HTTP body 方案。

### Assistant (20:58:14)

再补一层老服务证据，避免把 9032 猜错。

### Assistant (21:00:02)

先把这轮新增内容继续追加到 GitMemo。

### Assistant (21:01:44)

把最终结论追加到 GitMemo。

### Assistant (21:03:40)

1. 直接执行

我查完了，结论是：

当前实现里真正的端点不是 `POST /api/posts/:id/score`，而是 `PATCH /api/post-console/:id/score`。挂载在 `apps/minerva-server/src/routes/index.ts:38`，具体路由在 `apps/minerva-server/src/routes/posts/posts.ts:204`。

`scoreType` 到 `likeCountType` 的映射现在不对。前端在 `apps/minerva/src/pages/PostConsole/components/PostFeed.tsx:109` 把：
- `female -> [1]`
- `male -> [0, 2]`
- `nonbinary -> [0, 2]`

后端在 `apps/minerva-server/src/routes/posts/posts.ts:212` 明确定义：
- `0 -> MALE_LIKE`
- `1 -> FEMALE_LIKE`
- `2 -> NON_BINARY_LIKE`

也就是说，当前 `male` 和 `nonbinary` 都会同时更新 `MALE_LIKE` 和 `NON_BINARY_LIKE`，这是错的。按现有后端语义，正确映射应该是：
- `male -> [0]`
- `female -> [1]`
- `nonbinary -> [2]`

Schema 也和这个一致，`packages/minerva-schemas/src/post.ts:185` 定义的是：
- `postId: string`
- `scoreToModify: number`
- `likeCountType: number[]`

不是 `scoreType`。

关于 proto 9032，我没找到当前这条链路有实际 proto 调用。现在这个端点在 `apps/minerva-server/src/routes/posts/posts.ts:235` 直接对 `post_interact_count` 做 SQL upsert，没有走 proto。

我还核对了 proto 生成代码：
- `packages/api-proto/src/gen/archat_api/post_api.ts:302` 的 `LikeCountType` 是 `MALE=0 / FEMALE=1 / NONBINARY=2`
- `packages/api-proto/src/gen/archat_api/post_api.ts:5131` 的 `AdminAdjustPostScoreRequest` 只有 `postId` 和 `score`，没有 `likeCountType`

另外老的 `dora-service` 虽然有 `/adminAdjustPostScore` 路由，位置在 `dora-service/src/main/java/com/pserver/grpc/routers/PostServiceRouter.java:107`，但处理函数 `PostAdminCreateService.adjustPostScore` 是空实现，直接 `endEmpty(ctx)`，在 `dora-service/src/main/java/com/pserver/grpc/services/post/admin/PostAdminCreateService.java:139`。

所以最终结论是：
- 当前端点是 `PATCH /api/post-console/:id/score`
- `scoreType -> likeCountType` 现在映射错了，male / nonbinary 混了
- 当前实现没有 proto 9032 调用
- 从现有 proto 定义看，请求参数也只有 `postId + score`，没有 `like_count_type`

2. 深度交互

你现在更该怀疑的不是“9032 参数传没传对“，而是“这条业务是不是已经从 proto 迁到本地 SQL 了，但前端还保留了旧语义的映射残留“。

真正会造成错误行为的点，不是 proto 编号，而是这个前端映射层把 `male` 和 `nonbinary` 合并了。这个问题会直接导致运营调分时改错计数。

### User (21:04:52)

我都看不懂你在说什么，不要再写一堆没用的文档什么的，你就说现在什么情况，要怎么改，几句话说清楚

### Assistant (21:05:20)

先把这次明确反馈记下来，并把这轮对话追加到 GitMemo。

### Assistant (21:06:22)

先把这轮追加到 GitMemo。

### Assistant (21:07:08)

现在的情况很简单：

前端传参映射写错了。  
`apps/minerva/src/pages/PostConsole/components/PostFeed.tsx` 现在把：
- male 映射成 `[0, 2]`
- nonbinary 也映射成 `[0, 2]`

所以你点 male 或 nonbinary，后端都会同时改两种计数。

要改的也很简单，只改这里：
- male -> `[0]`
- female -> `[1]`
- nonbinary -> `[2]`

后端本身没问题，它就是按这个规则收：
- `0 = MALE_LIKE`
- `1 = FEMALE_LIKE`
- `2 = NON_BINARY_LIKE`

另外，这条接口现在没走 proto 9032，是直接写数据库。  
所以不用纠结 9032 参数，先把前端这个映射改对就行。

### User (21:07:43)

那你改，别整太复杂

### Assistant (21:08:22)

先补一个最小失败测试，再改映射。

### User (21:10:53)

This session is being continued from a previous conversation that ran out of context. The summary below covers the earlier portion of the conversation.

Summary:
1. Primary Request and Intent:

The user’s original request was to investigate the post score endpoint in the Minerva monorepo, specifically:

- check `apps/minerva-server/src/routes/posts/posts.ts`
- inspect the endpoint the user described as `POST /api/posts/:id/score`
- confirm whether `scoreType` is correctly mapped to the `like_count_type` array
- verify proto 9032 call parameters

Later, after I gave an overly long explanation, the user gave direct feedback that changed the expected response style:

- “我都看不懂你在说什么，不要再写一堆没用的文档什么的，你就说现在什么情况，要怎么改，几句话说清楚“

This means the user wanted:
- very short, direct conclusions
- no long explanations or documentation-style writeups
- just “what’s wrong“ and “how to fix it“

Then the user gave the implementation instruction:

- “那你改，别整太复杂“

So the final active task became:
- make the code change
- keep it simple
- do not over-engineer
- the intended fix was the frontend `scoreType -> likeCountType` mapping

2. Key Technical Concepts:

- Minerva monorepo architecture
  - `apps/minerva` = frontend
  - `apps/minerva-server` = Koa BFF
  - `packages/minerva-schemas` = shared Zod schemas/types

- Koa router pattern
- Zod schema validation
- frontend API wrapper pattern
- BFF route mounting with `/api/post-console`
- direct SQL upsert via Prisma raw SQL
- Redis cache invalidation after score updates
- protobuf generated types
- old backend compatibility check against `dora-service`
- root-cause-first debugging
- TDD workflow was started but not completed

Important behavioral/architectural finding:
- current score update path does not use proto 9032
- current implementation directly updates `post_interact_count` in the database
- the actual bug is in frontend mapping logic, not backend mapping

3. Files and Code Sections:

- `apps/minerva-server/src/routes/posts/posts.ts`
  - This was the core backend file investigated.
  - Important because it contains the actual score update endpoint.
  - Key discovery: the route is not POST; it is PATCH.
  - Relevant code:

```ts
router.patch("/:id/score", authMiddleware, requirePermission("app.write"), async (ctx) => {
  const { id } = ctx.params;
  const rawBody = (ctx.request.body ?? {}) as Record<string, unknown>;
  const body = modifyPostScoreRequestSchema.parse({
    ...rawBody,
    postId: id,
  });

  const typeMap: Record<number, string> = {
    0: "MALE_LIKE",
    1: "FEMALE_LIKE",
    2: "NON_BINARY_LIKE",
  };

  const postId = BigInt(body.postId);

  for (const type of body.likeCountType) {

*...truncated...*

### Assistant (21:12:46)

先补失败测试，再改一行映射。

