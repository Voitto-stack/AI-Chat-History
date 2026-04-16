---
title: ins-migration
date: 2026-04-16T11:07:55+08:00
source: import
original: ins-migration.md
---

# INS 功能迁移文档

> **最后更新**：2026-03-25
>
> **最新更新内容**：
>
> - 新增 `useSendMessage` Hook 统一处理 IM 消息发送（自定义消息 + 礼物消息）
> - 简化 `useChatDetail` 逻辑，使用 `useSendMessage` 处理消息发送
> - 新增 `firstExchangeInsContact` API，INS 绑定任务完成后给一单交换请求
> - INS 绑定任务奖励弹窗关闭后自动触发交换请求

## 设计决策

- **状态管理**：Zustand
- **弹窗控制**：async/await + 现有 modalStore Promise 模式
- **样式**：Tailwind CSS
- **API**：httpClient + @sitin/api-proto
- **并发控制**：串行队列（SerialQueue），防止交换请求竞态
- **埋点**：暂不处理

## 功能清单

### 1. 应用启动初始化

- TIM 登录成功后调用 `useInsTaskInit.init()`
- 获取已关注 INS 用户列表同步给 APK（`getPwaFollowedUser`）
- 拉取未处理的交换订单，有则延迟 3s 弹窗（等待挂机收益弹窗关闭后再弹出，避免弹窗叠加）
- 检测 INS 页面异常（见第 7 条）
- 用户切换/登出时调用 `cleanup()` 注销监听

### 2. 全局 IM 消息监听

- 在 `useInsTaskInit.init()` 内注册全局监听器
- 追踪 peerChatRound（对方发 → 我回 → round++）自动发起交换
- 拦截 `InsExchangeRequestMessage` → 弹交换弹窗
- 拦截 `InsExchangeSendMessage`（对方接受）→ 自动关注

### 3. 自动发起 INS 交换请求（流程 A）

- 触发：peerChatRound 变化
- 检查交换条件 → 获取远端配置 → **发送礼物（如果 ins_exchange_gift 配置 count > 0）** → 创建订单 → 发送 InsExchangeRequestMessage 到 IM
- 礼物发送失败不阻断主流程

### 4. 收到 INS 交换请求弹窗（流程 B）

- 触发：①启动时拉取未处理订单 ②实时收到 InsExchangeRequestMessage
- InsExchangeModal：用户列表 + Accept / Accept All
- Accept → （首次）悬浮窗权限弹窗 → finishOrder API → Robot WebView → 收益弹窗
- 通话/直播中不弹

### 5. 对方接受后全自动关注（流程 C）

- 收到 InsExchangeSendMessage → finishOrder API → Robot WebView 自动关注 → **静默完成（不弹收益弹窗）**

### 6. 悬浮窗权限弹窗

- 首次使用 Robot 时弹出，24h 节流

### 7. INS 页面异常检测

- TIM 登录后触发，通过访问测试账号 `leohalm` 检测 Instagram 是否可用
- type: 0=正常, 1=未登录, 2=被封, 3=被禁言
- type > 0 则弹 INS 授权弹窗，24h 节流（UserCloudKey.InsModalLastShown）

### 8. INS 授权成功后给一单交换请求

- 用户完成 BindInsAccount 任务（Instagram 授权）
- 显示奖励弹窗（3元）
- 弹窗关闭后自动调用 `firstExchangeInsContact()` API
- 给该用户一单 INS 交换请求（流程 B 的接收方）

### 9. 头像性能优化

- 登录后预加载 `emojiAvatar` / `emojiAvatarWork` 到 localStorage（7天缓存）
- 弹窗弹出时从 `getCachedAvatar()` 直接读取，避免每次请求远程图片

## 核心流程

### 流程 A：自动发起交换

```
peerChatRound++
  → 检查交换条件 (API)
  → 获取远端配置 (API)
  → 发送礼物 (API, 如果配置有)
  → 创建订单 (API)
  → 发送 InsExchangeRequestMessage 到 IM
```

### 流程 B：收到交换请求

```
收到 InsExchangeRequestMessage
  → 加入 pendingMessages
  → 弹 InsExchangeModal
  → Accept → finishOrder API
  → (首次) 悬浮窗权限弹窗
  → Robot WebView 自动关注
  → 全部完成 → 收益弹窗
```

### 流程 C：对方接受后自动完成

```
收到 InsExchangeSendMessage
  → finishOrder API
  → Robot WebView 自动关注
  → 静默完成（不显示收益弹窗）
```

### INS 异常检测

```
TIM 登录完成
  → 检查 insId 已绑定
  → 24h 节流检查
  → checkInsPageAbnormal("leohalm")
  → type > 0 → 弹 INS 授权弹窗
```

> **注意**：INS 相关弹窗仅在 APK 环境下触发（`isApp()` 守卫），非 APK 环境不会出现。
> 启动时 INS 交换请求弹窗通过 `waitForModalClose("offline-earnings")` 等待挂机收益弹窗关闭后再弹出，避免弹窗叠加。

## 文件清单

### 新增

| 文件                                     | 说明                                  |
| ---------------------------------------- | ------------------------------------- |
| `http/insApi.ts`                         | INS 交换 API（9 个接口）              |
| `stores/insExchangeStore.ts`             | 交换状态 Store                        |
| `hooks/useInsExchange.ts`                | insExchangeStore 对应 Hook            |
| `hooks/useInsTaskInit.ts`                | INS 交换核心逻辑（暴露 init/cleanup） |
| `hooks/useInsAuthCallback.ts`            | APK 授权回调处理                      |
| `hooks/useSendMessage.ts`                | 通用 IM 消息发送 Hook                 |
| `components/InsExchangeModal.tsx`        | 交换请求弹窗                          |
| `components/InsAuthPermissionModal.tsx`  | 悬浮窗权限弹窗                        |
| `pages/ChatDetail/InsExchangeBubble.tsx` | InsRequestBubble + InsFollowBubble    |
| `utils/insExchangeQueue.ts`              | 串行队列                              |
| `utils/avatarCache.ts`                   | AI 头像本地缓存                       |

### 修改

| 文件                               | 改动                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| `utils/bridge.ts`                  | +`startInsRobotWebView`、`requestFloatingPermission`、`syncFollowedUsers`、`checkInsPageAbnormal` |
| `components/Avatar.tsx`            | +`gradientBorder` 渐变边框支持                                                                    |
| `hooks/useUserInit.ts`             | TIM 登录后调 `initInsTask()`，cleanUser 调 `cleanupInsTask()`                                     |
| `hooks/useChatDetail.ts`           | 简化 `sendGiftMessage`，统一使用 `useSendMessage` 处理 IM 消息发送                                |
| `hooks/useTask.ts`                 | 优化奖励弹窗处理，INS 绑定任务完成后弹窗关闭自动给一单交换请求                                    |
| `pages/ChatDetail/MessageItem.tsx` | INS 消息渲染接入 InsRequestBubble / InsFollowBubble                                               |
| `services/userCloudStorage.ts`     | +`InsModalLastShown` key                                                                          |

### 新增图片资源

| 文件                                              | 说明          |
| ------------------------------------------------- | ------------- |
| `assets/images/ins/bg_ins_border_circle.svg`      | INS 渐变边框  |
| `assets/images/ins/ins_auth_permission.webp`      | 权限弹窗截图  |
| `assets/images/common/ai_avatar_placeholder.webp` | AI 头像占位图 |

## API 接口清单

| 接口                                | 说明                         | 用途           |
| ----------------------------------- | ---------------------------- | -------------- |
| `getInsExchangeConditionInfo()`     | 检查交换条件                 | Flow A         |
| `getClientConfig()`                 | 获取远端配置（包含礼物设置） | Flow A         |
| `initInsExchangeOrder()`            | 创建交换订单                 | Flow A         |
| `finishAndFollowInsExchangeOrder()` | 完成订单 + 关注 + 获得收益   | Flow B, C      |
| `listUserInsExchangeOrder()`        | 获取待处理订单列表           | 启动初始化     |
| `rejectInsExchangeOrder()`          | 拒绝订单                     | Flow B         |
| `getPwaFollowedUser()`              | 获取已关注用户列表           | 启动初始化     |
| `firstExchangeInsContact()`         | **给一单 INS 交换请求**      | INS 授权奖励后 |
| `sendGift()`                        | 发送礼物消息                 | Flow A         |

## IM 消息发送

### 通用消息发送 Hook: `useSendMessage`

- `sendCustomMessage(toUserId, description, data)` - 发送自定义消息
- `sendGiftMessage(giftId, toUserId, imageUrl, price)` - 发送礼物（扣钱 + 发 IM）
- 用于在任何地方发送 IM 消息（不依赖特定对话）

### 聊天页面消息发送: `useChatDetail`

- `sendText(text)` - 发送文本消息（带 UI 更新）
- `sendGiftMessage(...)` - 发送礼物（调用 `useSendMessage` + 等待 IM 消息回调触发 UI 更新）

