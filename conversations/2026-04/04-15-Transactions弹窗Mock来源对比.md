---
title: Transactions弹窗Mock来源对比
date: 2026-04-15 15:49:00
model: claude-sonnet-4-5-20250929
messages: 2
---

# Transactions弹窗Mock来源对比

### User (15:44:00)
你去看下新老项目的transactions页面，看看弹窗中的mock适配的数据来源是否一致：[Image #1]

### Assistant (15:49:00)
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