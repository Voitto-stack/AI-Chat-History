---
title: 裂变功能技术方案Review
date: 2026-03-27 15:30:00
model: Claude Opus 4.6 (1M context)
messages: 11
---

# 裂变功能技术方案Review

### User (15:25:00)
Review 技术方案和需求文档，提出修改建议

### Assistant (15:30:00)
V1 Review：14 个问题，P0 3 个、P1 5 个、P2 4 个

### User (15:40:00)
画 A/B 两端完整状态流转图

### Assistant (15:42:00)
绘制了完整时序图 + W阶段映射表 + 接口调用时序 + 风控拦截点

### User (16:10:00)
重新 review 更新后的文档

### Assistant (16:15:00)
V2 Review：确认修复 2 项，仍存 P0 2 个、P1 5 个、P2 3 个。关键发现提现成功切入点在 showCashoutModal.tsx 而非 Cashout/index.tsx

### User (16:30:00)
W1 阶段双方状态如何同步？

### Assistant (16:32:00)
Push 通知 + 进入页面时 fetchOverview 刷新。B 端注册时带 inviteCode，后端建关系后发 Push 给 A

### User (16:40:00)
如何获得被邀请用户的活跃时间？

### Assistant (16:42:00)
后端计算返回 inactiveHours，前端 getPokeButtonState() 判断 UI。24h 冷却和活跃状态是独立维度

### User (16:50:00)
Push 就是系统推送对吧？

### Assistant (16:51:00)
APK 走原生推送，PWA 走 FCM + Service Worker。后端 payload 带 data.url 即可跳转

### User (17:00:00)
W2-W5 弹窗全局生效，是否要全局轮询？

### Assistant (17:02:00)
不要全局轮询重接口。拆三层：Notification（全局轮询60s，极轻）/ Overview（进入页面时）/ Dashboard（进入页面时）

### User (17:10:00)
Dashboard 的重查询怎么处理？

### Assistant (17:12:00)
Dashboard 进入时 fetchDashboard + eventBus 事件驱动刷新 + visibilitychange 切回前台刷新，不需要自己轮询

### User (17:20:00)
Earnings 页用轻量轮询还是重查询？

### Assistant (17:21:00)
用 getBffOverview 中量接口，进入页面调一次，不轮询。事件驱动刷新兜底

### User (17:30:00)
根据飞书文档的完整流程，优化技术设计部分，写 MD

### Assistant (17:35:00)
生成 apps/pwa/docs/bff-technical-design-v2.md，核心变更：
- 接口 2→8 个，三层查询架构
- Push 驱动 + 轮询兜底弹窗机制
- 补全 B 端 W3/W5 额外奖励
- 分享降级链
- 催单按钮状态计算函数
- 字段命名标准化
