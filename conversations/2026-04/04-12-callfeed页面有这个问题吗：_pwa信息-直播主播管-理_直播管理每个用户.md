---
title: callfeed页面有这个问题吗：【pwa信息-直播主播管 理】直播管理每个用户
date: 2026-04-12T23:51:24+08:00
session_id: cc477b0f-41b2-4891-8957-3e1d53a01902
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 7
---

# callfeed页面有这个问题吗：【pwa信息-直播主播管 理】直播管理每个用户

### User (23:51:24)

callfeed页面有这个问题吗：【pwa信息-直播主播管 理】直播管理每个用户的已经提现金额都是0

### Assistant (23:51:37)

我需要先查看 callfeed 页面的代码，了解"已提现金额"的数据来源和计算逻辑。

### Assistant (23:52:15)

我需要先对比一下老项目的实现，然后检查数据库数据。

### Assistant (23:53:50)

我发现关键区别了：

**老项目**使用 iframe 嵌入 Athena 视图页面（`https://app.gracechat.com/athena-view`），财务数据由那个页面负责渲染。

**新项目**通过后端 API `/athena-stats` 直接查询数据库。

后端查询逻辑（`call-feed.ts:206-220`）：

```typescript
// 已完成的提现总额
prisma.user_withdraw_task.findMany({
  where: {
    user_id: userId,
    status: "FINISHED",
  },
  select: { amount: true },
}),

// 计算 paidOut
const paidOut = withdraws.reduce(
  (sum, w) => sum + (parseFloat(w.amount) || 0),
  0,
);
```

让我检查一下数据库中 `user_withdraw_task` 表的数据情况和字段定义：

### Assistant (23:54:06)

## 当前情况

CallFeed（直播主播管理）页面显示的"已提现金额"来自后端 `/athena-stats` 接口，查询逻辑是：

```typescript
// apps/minerva-server/src/routes/call-feed/call-feed.ts:206-220
prisma.user_withdraw_task.findMany({
  where: {
    user_id: userId,
    status: "FINISHED",  // ⚠️ 查询条件
  },
  select: { amount: true },
})
```

**关键差异**：
- **老项目**：通过 iframe 嵌入 `https://app.gracechat.com/athena-view` 页面显示数据
- **新项目**：通过 Minerva-Server 直接查询数据库 `user_withdraw_task` 表

## 需要验证的问题

可能导致"已提现金额都是0"的原因：

1. **数据库中没有符合条件的记录** — `status='FINISHED'` 的提现记录为空
2. **status 值不匹配** — 数据库中实际值可能是 `'FINISH'`、`'COMPLETED'` 或其他值
3. **amount 字段解析失败** — `parseFloat(w.amount)` 返回 NaN

**我需要访问数据库确认实际数据**。能否允许我运行数据库查询检查 `user_withdraw_task` 表的实际数据？

```sql
-- 查看 status 字段的所有取值
SELECT DISTINCT status, COUNT(*) FROM user_withdraw_task GROUP BY status;

-- 查看一条示例记录
SELECT * FROM user_withdraw_task LIMIT 5;
```

### User (23:54:23)

允许你执行

### User (23:55:32)

允许你执行

### Assistant (23:58:25)

完美！数据库检查结果：

## ✅ 数据库数据正常

```
📊 Status 分布：
- APPROVED: 1304 条（已批准待发放）
- FINISHED: 491 条（已完成提现）⭐
- PENDING: 204 条
- UNKNOWN: 71 条
- REJECTED: 47 条
- SENDING: 22 条
- FAILED: 11 条

💰 FINISHED 状态统计：
   记录数: 491
   总金额: $7,579.25
```

后端查询逻辑 `status: "FINISHED"` **是正确的**。

现在我需要测试一个有提现记录的用户，验证 API 是否正确返回：

### User (00:02:39)

[Request interrupted by user]

### User (00:02:39)

继续

### User (00:04:07)

继续

### User (00:04:32)

继续

### Assistant (00:04:52)

Please run /login · API Error: 403 {"error":{"code":"","message":"用户已被封禁 (request id: 202604121604446555376308268d9d6ScGCf6DQ)","type":"new_api_error"}}

