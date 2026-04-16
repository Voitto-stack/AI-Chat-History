---
title: Minerva-Server数据表依赖梳理
date: 2026-04-16 09:56:29
model: claude-sonnet-4-5-20250929
messages: 2
---

# Minerva-Server数据表依赖梳理

### User (09:52:00)
你检查一下minerva-server的后端服务依赖哪些数据表

### Assistant (09:56:29)
### 1. 直接执行

我查过了，`minerva-server` 依赖的数据表主要分两类：

#### 一、主库（Main DB）

这批是当前服务真正挂载路由会用到的表。

**1）RBAC / 登录认证**
- `admin_users`
- `admin_roles`
- `admin_permissions`
- `admin_user_roles`
- `admin_role_permissions`
- `admin_audit_logs`

主要位置：
- `apps/minerva-server/src/routes/auth.ts`
- `apps/minerva-server/src/routes/auth/feishu.ts`
- `apps/minerva-server/src/routes/rbac/users.ts`
- `apps/minerva-server/src/routes/rbac/roles.ts`
- `apps/minerva-server/src/routes/rbac/permissions.ts`

**2）用户 / 通话 / 提现 / PWA 业务**
- `userinfo`
- `user_geo_location`
- `user_online_status_record`
- `user_call_order`
- `user_room_record`
- `user_transaction`
- `user_transaction_android`
- `user_withdraw_task`
- `user_balance`
- `user_paypal_id`
- `user_ins_exchange_order`
- `user_interest`
- `user_device_info`
- `userinfo_pwa_club_mapping`
- `pwa_club`
- `pwa_anchor_video`
- `pwa_user_video`
- `pwa_data_operation_log`
- `pwa_user_balance_change_history`
- `unified_payment_orders`
- `unified_payment_transactions`
- `tim_conversation_info`
- `video_test_history`

主要位置：
- `apps/minerva-server/src/routes/call-feed/call-feed.ts`
- `apps/minerva-server/src/routes/users/management.ts`
- `apps/minerva-server/src/routes/users/user-data.ts`
- `apps/minerva-server/src/routes/digital-human/management.ts`
- `apps/minerva-server/src/routes/data-analysis/data-analysis.ts`
- `apps/minerva-server/src/routes/transactions/transactions.ts`
- `apps/minerva-server/src/routes/transactions/video-call-details.ts`
- `apps/minerva-server/src/routes/union-streamer/union-streamer.ts`
- `apps/minerva-server/src/routes/chat-console/index.ts`
- `apps/minerva-server/src/routes/pwa-databoard/pwa-databoard.ts`
- `apps/minerva-server/src/utils/fetchUserMap.ts`

**3）内容 / 风控 / 审核**
- `story`
- `post`
- `post_interact_count`
- `post_comment`
- `post_report`
- `user_mutual_evaluation`
- `user_reports`
- `user_activity`
- `user_block`
- `user_report_history`
- `screenshot_detect`

主要位置：
- `apps/minerva-server/src/routes/lovia/stories.ts`
- `apps/minerva-server/src/routes/posts/posts.ts`
- `apps/minerva-server/src/routes/posts/comments.ts`
- `apps/minerva-server/src/routes/review-score/evaluations.ts`
- `apps/minerva-server/src/routes/risk/reports.ts`
- `apps/minerva-server/src/routes/risk/suspicious.ts`
- `apps/minerva-server/src/routes/screenshot-review/screenshot-review.ts`

**4）Webhook / Union 已挂载业务**
- `lead`
- `unionUser`
- `unionConversation`
- `unionBatchJob`
- `unionMessageTrace`
- `unionStatusLog`

主要位置：
- `apps/minerva-server/src/routes/webhook/index.ts`
- `apps/minerva-server/src/services/webhook-lead.ts`

#### 二、Monitor 库（MONITOR_DATABASE_URL）

当前实际运行里，明确被业务查询用到的主要是：
- `pwa_daily_data`

主要位置：
- `apps/minerva-server/src/routes/pwa-databoard/pwa-databoard.ts`

另外 monitor client 还会在这些文件里做连通性检查，但不一定代表业务查询所有 monitor 表：
- `apps/minerva-server/src/utils/monitorPrisma.ts`
- `apps/minerva-server/src/routes/health.ts`

#### 三、代码里还有一批“定义了但线上主路由没挂载”的表

`src/routes/index.ts:10-12,33,47` 明确写了 guild / social-proxy 线上暂不启用，所以这批表虽然代码引用了，但**当前线上主服务不一定实际依赖**：

- `unionAlertRule`
- `unionAlertLog`
- `unionModelConfig`
- `unionPromptVersion`
- `unionTemplate`
- `unionMessageTemplate`
- `unionDecisionLog`
- `unionDevice`
- `unionDeviceLog`
- `unionExperiment`
- `unionGlobalConfig`
- `unionAiCallLog`
- `unionImportLog`
- `unionUserTag`
- 以及更多 guild 相关 `union*` 表

主要位置：
- `apps/minerva-server/src/routes/guild/*.ts`
- `apps/minerva-server/src/services/guild/*.ts`

#### 四、不是数据表的外部依赖

这些也被后端依赖，但不是表：
- Redis
- Proto Gateway
- TIM / UserSig
- GCS
- Feishu / GitHub / Zapier 等外部服务

---

### 2. 深度交互

你这个问题如果只是想知道“有哪些表”，上面的清单够用了。

但如果你的真实目标是下面这几种之一：

- 想迁库
- 想做最小权限账号
- 想补测试数据
- 想确认线上缺哪张表会炸

那还不能只看 Prisma schema，因为 `minerva-server` 很多地方用了 **raw SQL**，而且还有一部分表根本不是通过 Prisma model 名直接调用的，比如：
- `video_test_history`
- `pwa_user_balance_change_history`
- `post_report`
- 各种 `JOIN` 出来的老业务表

所以真正靠谱的结论应该分三层：

1. **当前已挂载路由实际会访问的表**
2. **代码里引用但当前未挂载的表**
3. **schema 里定义但运行期没用到的表**

你现在最值得做的不是再看一遍 schema，而是把这三层整理成一份可执行清单。这样之后无论你是本地起库、做只读账号、还是排查缺表报错，都会直接很多。