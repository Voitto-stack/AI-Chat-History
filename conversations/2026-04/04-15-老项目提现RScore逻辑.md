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

### User (14:49:20)
Inspect the old project /Users/presence79/Desktop/WORK/presence-server-admin-console and trace exactly how Transactions page gets and renders R-Score. I need a concise comparison-ready report with: 1) which API/proto it calls, 2) request payload shape, 3) response field names, 4) how missing retention data is handled in rendering, 5) whether the old UI always shows the R-Score row even when data is missing. Include exact file paths and line ranges where possible. Research only, no code changes.

### Assistant (14:49:20)
### 1. 直接执行
1. 调用的 API/proto
- Transactions 页通过 `loadRScoreList()` 发起 R-Score 请求，代码在 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/UserConsole/Transactions/api.ts:138-142`。
- 这是 `api.post(..., { protoId: 4776, body: params })`，目标路径是 `"/"`，axios baseURL 来自 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/utils/apiUtils.ts:7-9`，再由 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/utils/getUrl.ts:1-30` 按环境解析到 `.../json` 或本地 `http://localhost:29001`。
- 我还搜了旧项目里的 `*.proto`，没找到 4776 的 proto 定义；仓库里能确认的是前端用数值 `protoId: 4776` 调这个接口。

2. 请求 payload shape
- 类型声明写在 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/UserConsole/Transactions/api.ts:26-31`，声明的是:
  `{"requests": [{"userId": number, "createTime"?: string}]}`
- 但 Transactions 页实际发送的 payload 在 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/UserConsole/Transactions/Transactions.tsx:136-145`，真实 runtime shape 是:
  `{"requests": [{"withdraw_id": number}, ...]}`
- 这些 `withdraw_id` 来自当前页提现列表的 `id`，提取逻辑在 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/UserConsole/Transactions/Transactions.tsx:41-43`。

3. 响应字段名
- TS 响应声明在 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/UserConsole/Transactions/api.ts:90-100`:
  `data.body.userRetention[]` 里的字段声明为
  `userId, secondaryDay, secondaryDayDiff, threeDay, threeDayDiff, sevenDay, sevenDayDiff`
- 但实际消费代码还依赖 `withdrawId`，因为它在 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/UserConsole/Transactions/Transactions.tsx:75-79` 用 `retention.withdrawId` 建索引，再在 `:85` 用 `withdrawInfo.id` 去匹配。
- 所以从真实页面行为看，响应项至少被当成包含这些字段:
  `withdrawId, secondaryDay, secondaryDayDiff, threeDay, threeDayDiff, sevenDay, sevenDayDiff`
- 这里存在一个很明显的旧代码不一致：接口类型写的是 `userId`，但运行时代码按 `withdrawId` 用。

4. 缺失 retention 数据时怎么渲染
- 合并数据时，如果某条提现没匹配到 retention，前端直接塞空对象，见 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/UserConsole/Transactions/Transactions.tsx:83-94`，关键行是 `retentionInfo: retentionInfo || {}`。
- 页面渲染时读的是 `retentionInfo?.secondaryDay`、`retentionInfo?.secondaryDayDiff` 等，见 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/UserConsole/Transactions/Transactions.tsx:296-316`。
- 真正的兜底显示逻辑在 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/UserConsole/Transactions/config.tsx:61-77`，`renderRetentionValue(value = "", diff = "0")` 会把缺失值渲染成：
  - value: 空字符串
  - diff: `0`，并显示成 `(0)`
- 所以缺数据时不是整块隐藏，而是 Day1/Day3/Day7 还在，只是数值为空，diff 显示 `(0)`。

5. 旧 UI 在数据缺失时是否仍然显示 R-Score 行
- 是，会显示。
- R-Score 这整行是硬编码在 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/UserConsole/Transactions/Transactions.tsx:286-319` 里的，没有根据 `retentionInfo` 是否存在做条件判断。
- 即使 R-Score 请求失败，代码也只是记 warning，不阻塞渲染，见 `/Users/presence79/Desktop/WORK/presence-server-admin-console/src/UserConsole/Transactions/Transactions.tsx:64-68`；同时 `userRetentionList` 会回退成空数组，见 `:55-58`。
- 最终效果就是：无论接口缺部分数据，还是整次 R-Score 请求失败，这个 R-Score 区块都会继续显示，只是内容退化为空值 + `(0)`。

一句话结论：老项目的 Transactions 页是“总是渲染 R-Score UI，再按 withdraw_id 尝试填充数据”，不是“有数据才显示这一行”。

### 2. 深度交互
这段旧逻辑里最容易迁移错的不是样式，而是契约不一致：类型声明写 `userId`，实际请求发 `withdraw_id`，实际响应消费也依赖 `withdrawId`。你做新旧对比时，应该把“页面真实运行时依赖的字段”放在更高优先级，而不是只看 TS interface。
