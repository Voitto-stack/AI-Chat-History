---
title: 生成 transactions 视频修复计划
date: 2026-04-10 19:33:48
model: Claude Opus 4.6 (1M context)
messages: 6
---

# 生成 transactions 视频修复计划

### User (19:33:48)
那你就修transactions/video-call-details 这个后端接口。

### Assistant (19:33:48)
## 1. 直接执行
先确认一个约束：你要我修成完全对齐老项目返回的视频来源逻辑，还是只要把现在这个页面里的视频恢复为可播放就行？

我现在看到两条路：

1. 完全对齐老项目  
   优先复用老接口 `4754` 的语义，把 `transactions/video-call-details` 返回的 `videoUrl` 行为尽量做成和旧系统一致。

2. 按新仓库现有数据源修复  
   直接复用新仓库里已经存在的查询方式：
   - `MOCK_VIDEO` 查 `pwa_user_video.url`
   - `VIDEO_CALL` 查 `user_room_record.media_url`

我更推荐第 2 条，因为当前仓库里已经有现成实现，范围更小，也更容易验证。

## 2. 深度交互
这一步其实是在定“修复目标”，不是技术细节。因为“能播放”不等于“和老系统完全等价”：

- 如果老 proto `4754` 还做了额外过滤、去脏数据、特殊映射，那“直接可播”只是部分恢复。
- 但如果你的目标是尽快消除迁移回归，第 2 条通常更稳，因为它基于当前数据库结构，不依赖继续猜老网关黑盒行为。

### User (19:33:48)
用1

### Assistant (19:33:48)
## 1. 直接执行
我先把方案收敛成 3 个，你选了“完全对齐老项目”，那我推荐的是下面这个实现方式：

### 方案 A（推荐）
继续保留现在 `transactions/video-call-details` 这条本地 SQL 路由，但把 videoUrl 的补全逻辑按老项目语义补回来：

- 主列表查询逻辑继续维持现在的 `user_call_order + user_ins_exchange_order` 合并方式
- 在拿到当前页订单后，再按订单类型补查视频地址：
  - `MOCK_VIDEO` → `pwa_user_video.url`
  - `VIDEO_CALL` → `user_room_record.media_url`
  - `INS_ORDER` → 没视频，保持空
- 最终返回结构保持现在前端契约不变，只把 `videoUrl` 从 `null` 改成与老项目一致的真实值

为什么我推荐这个：
- 对前端零改动
- 统计、分页、金额逻辑不需要再动
- 你要的“对齐老项目行为”里，当前真正缺的是 `videoUrl`
- 仓库里已经有现成查询来源，风险最小

### 方案 B
后端不自己查库，直接重新代理旧 proto `4754`，把返回值转成当前 schema。

问题：
- 这会把 Transactions 重新绑回旧网关
- 现在这条接口已经本地化了一半，回退成代理会让维护模型变混乱
- 还要重新处理认证、依赖、故障路径

### 方案 C
前端收到列表后，再额外调一个“按订单 id 查视频 URL”的接口。

问题：
- 这是补丁，不是对齐
- 页面会多一次请求，还要处理逐行/批量补全
- 老项目不是这么干的

所以我的推荐是方案 A。

### 设计内容
这次修复我准备限定在 `apps/minerva-server/src/routes/transactions/transactions.ts` 这一条接口里，范围如下：

1. 保留现有分页和统计逻辑不变  
   因为我对了老后端 `dora-service/src/main/java/com/pserver/grpc/services/user/callorder/CallOrder.java:395` 开始那段，老项目的主查询本质也是：
   - `user_call_order`
   - `UNION ALL`
   - `user_ins_exchange_order`
   - `ORDER BY create_at DESC`
   - `LIMIT/OFFSET`

2. 补齐当前页订单的视频地址映射  
   只对当前页的 `pageRows` 做二次查询：
   - 收集 `MOCK_VIDEO` 的订单 id
   - 收集 `VIDEO_CALL` 的订单 id
   - 并行查：
     - `prisma.pwa_user_video.findMany({ select: { order_id, url } })`
     - `prisma.user_room_record.findMany({ select: { order_id, media_url } })`
   - 构造两个 map，回填到 `orders[].videoUrl`

3. 对齐返回语义
   - `VIDEO_CALL` 有录像时返回 `media_url`
   - `MOCK_VIDEO` 有录像时返回 `url`
   - `INS_ORDER` 返回 `null`
   - 没查到记录时返回 `null`

4. 回归验证
   - 先补一个后端测试，证明：
     - `VIDEO_CALL` 会带出 `user_room_record.media_url`
     - `MOCK_VIDEO` 会带出 `pwa_user_video.url`
     - `INS_ORDER` 仍然没有 `videoUrl`
   - 再跑对应测试确认红绿过程

## 2. 深度交互
这里我刻意没选“直接回退成 proto 代理”，因为你说的是“用 1”，我理解的是行为上对齐老项目，不是架构上退回老项目。这两个是两回事。

更稳的方式是：保留当前已经迁过来的本地接口，只把缺失的老行为补齐。这样既满足“和老项目一致”，又不把这次迁移重新拉回半代理半本地的状态。

这套设计我就按它往下做。你确认一句“按这个设计修”，我再进入测试先行和代码修改。

### User (19:33:48)
按这个设计修

### Assistant (19:33:48)
计划已写到 `docs/superpowers/plans/2026-04-10-transactions-video-url-alignment.md`。

两种执行方式：

1. Subagent-Driven（推荐）— 我按任务逐个派子代理执行并在中间做 review
2. Inline Execution — 我在当前会话里直接按计划实现
