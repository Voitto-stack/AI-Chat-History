---
title: Proto 4776 R-Score 字段名格式分析
date: 2026-04-15 00:00:00
model: claude-opus-4-6
messages: 1
---

# Proto 4776 R-Score 字段名格式分析

### User (00:00:00)
Search in presence-server-gateway and dora-service for proto ID 4776 or any reference to "userRetention", "user_retention", "withdraw_id", "withdrawId" related to R-Score or retention data. Need to understand:
1. What are the actual response field names from proto 4776 - are they snake_case or camelCase?
2. How does the old project parse and map the retention response?

### Assistant (00:00:00)

**Proto 定义** (snake_case): `user_id`, `secondary_day`, `secondary_day_diff`, `three_day`, `three_day_diff`, `seven_day`, `seven_day_diff`, `withdraw_id`

**Gateway JSON 响应** (camelCase): Google `JsonFormat.printer()` 自动将 snake_case 转为 lowerCamelCase。实际 HTTP 响应字段：`userId`, `secondaryDay`, `secondaryDayDiff`, `threeDay`, `threeDayDiff`, `sevenDay`, `sevenDayDiff`, `withdrawId`

**老前端解析流程**:
1. 请求发 `withdraw_id`（snake_case，gateway parser 两种都接受）
2. 响应从 `data.body.userRetention` 取数组（camelCase）
3. 用 `retention.withdrawId` 建 Map，与 withdraw task 的 `id` 匹配
4. 渲染用 `retentionInfo.secondaryDay` 等 camelCase 字段

**新 minerva-server** 也正确使用 camelCase 读取响应。

关键：Gateway 的 `JsonFormat.printer().print()` 做了 snake→camelCase 转换。请求端 `JsonFormat.parser().merge()` 两种格式都接受。
