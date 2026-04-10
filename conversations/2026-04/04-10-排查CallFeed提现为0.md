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
