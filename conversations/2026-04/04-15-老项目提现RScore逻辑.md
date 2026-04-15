---
title: 老项目提现RScore逻辑
date: 2026-04-15 11:44:05
model: claude-sonnet-4-5-20250929
messages: 1
---

# 老项目提现RScore逻辑

### User (11:31:00)
查一下老项目，transactions页面的r-score数据的逻辑是什么，是否是每一条提现数据都有这个

### Assistant (11:44:05)

### 1. 直接执行
老项目 transactions 页的 R-Score 逻辑在 `src/UserConsole/Transactions/Transactions.tsx`。

流程是：
- 先拉提现列表 `loadWithdrawInfos`（`Transactions.tsx:28-35`，API 是 `api.ts:117-122`，proto 4382）。
- 从当前页提现数据里抽出 `id` 列表（`Transactions.tsx:40-43`）。
- 把每个提现 `id` 组装成 `{ withdraw_id }` 去请求 `loadRScoreList`（`Transactions.tsx:136-143`；`api.ts:137-142`，proto 4776）。
- 响应从 `data.body.userRetention` 读取，按 `retention.withdrawId` 建 Map（`Transactions.tsx:55-57`、`75-78`）。
- 合并到每条提现上：`retentionInfo = retentionInfoMap.get(withdrawInfo.id) || {}`（`Transactions.tsx:82-93`）。
- 页面展示 Day1/Day3/Day7（`Transactions.tsx:295-316`）。

结论：不是每一条提现都一定有 R-Score。
前端会“尝试”为当前页每条提现请求 R-Score，但后端返回可能是子集；没返回的那条会落成空对象 `{}`，展示时对应值为空。

### 2. 深度交互
你这个点很关键，因为很多人会误以为“列表有几条提现就一定有几条 R-Score”。老项目实际上是“按提现 ID 关联 + 允许缺失”的口径。迁移或对齐时要把 `retentionInfo` 当可选数据处理，不能当必有字段。