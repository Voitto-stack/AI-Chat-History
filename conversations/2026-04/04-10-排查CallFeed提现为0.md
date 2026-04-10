---
title: 排查CallFeed提现为0
date: 2026-04-10 19:45:00
model: claude-sonnet-4-5-20250929
messages: 7
---

# 排查CallFeed提现为0

### User (19:34:00)
你对比一下当前分支和fix/minerva-bugs分支中提交者为presence79的差异

### User (19:35:00)
这里为什么都是0：[Image #1] ，你查一下能不能找到数据

### Assistant (19:35:30)
先沿着页面链路和接口链路排查，确认这些 0 是前端展示问题还是后端/数据库口径问题。

### User (19:36:00)
只读查库（推荐）

### Assistant (19:36:20)
改成只读核对数据库和接口实现，先确认目标用户是否真的没有数据。

### User (19:38:00)
那怎么改

### Assistant (19:38:30)
先不要直接改，先把字段来源和数据库真实数据对上，避免修错口径。

### User (19:39:00)
这里表示的是用户提现的金额

### Assistant (19:39:20)
收到，重点改为只盯 paidOut，对照 user_withdraw_task 和当前 /athena-stats 的提现状态过滤。

### User (19:40:00)
1

### Assistant (19:44:30)
继续只盯 paidOut，把这个用户到底有没有提现记录、各状态分别是什么查清。结论是：目标用户确实有 1 条提现记录，金额 0.5，状态为 APPROVED；但 CallFeed 的 /athena-stats 只统计 SUCCESS、SENDING、COMPLETED，所以页面错误地显示为 0。进一步看全局状态分布，APPROVED 和 FINISHED 才是主要真实状态，说明当前白名单和实际状态体系不一致。


### User (19:47:00)
已实际打款完成的提现金额

### Assistant (19:47:30)
### 1. 直接执行
按“已实际打款完成的提现金额”这个口径看，`APPROVED` 不该算进 `paidOut`，更像只是审核通过；真正完成态更接近 `FINISHED`。

证据链很清楚：`apps/minerva-server/src/routes/transactions/transactions.ts:101` 明确写了审批接口只是把状态从 `PENDING → APPROVED`，这说明 `APPROVED` 是审批通过，不是最终打款完成。PWA 端共享提现状态只保留了 `PROCESSING / FINISHED / FAILED`，其中终态就是 `FINISHED`，定义在 `apps/pwa/src/types/cashout.ts:83`。另外，提现处理弹窗里展示的是“processing payment”，对应的是发起申请和处理中流程，不是完成入账，见 `apps/pwa/src/components/CashoutProcessingModal.tsx:69`。

所以你这个用户那条 `0.5` 的 `APPROVED`，按你刚定义的口径，不应该计入“已实际打款完成”。如果这个用户没有 `FINISHED` 记录，那页面这里显示 0，我认为是对的。

但实现本身还是有问题。`apps/minerva-server/src/routes/call-feed/call-feed.ts:206` 现在统计的是 `SUCCESS / SENDING / COMPLETED`，既没有 `FINISHED`，又混进了 `SENDING` 这种明显不是“已完成”的中间态。这说明它不是按你要的口径写的，而是沿用了旧的一套、而且已经过时的状态集合。

结论收敛成两句：
- 对这个目标用户：当前显示 0，大概率是正确的，因为她只有 `APPROVED 0.5`，不是实际打款完成。
- 对这段实现：当前 `paidOut` 状态过滤仍然是错的；如果页面字段定义为“已实际打款完成的提现金额”，更合理的统计口径应该是只认 `FINISHED`，至少不能把 `APPROVED` 和 `SENDING` 算进去。

### 2. 深度交互
这里真正的问题不是“这个 0 对不对”，而是你们项目里“提现状态”和“展示文案”长期混用了两套语义：

- 运营审批语义：approve 之后前台/后台可能显示 Paid
- 真实资金语义：只有最终打款完成才算 paid out

旧后台把 approved 直接渲染成 Paid，只能说明当时运营界面偷懒把“审批通过”当“已支付”展示了，不能反推财务字段也该这么算。你这次把字段定义明确成“已实际打款完成的提现金额”以后，口径其实已经变了，应该反过来约束实现，而不是让实现绑架文案。
