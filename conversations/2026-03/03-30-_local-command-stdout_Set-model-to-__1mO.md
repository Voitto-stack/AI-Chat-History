---
title: <local-command-stdout>Set model to [1mO
date: 2026-03-30T20:54:59+08:00
session_id: 7033c195-9bc1-49d0-99b3-eab7fcfad909
project: /Users/presence79/Desktop/WORK/sitin-monorepo-dev
source: claude-code-capture
messages: 7
---

# <local-command-stdout>Set model to [1mO

### User (20:55:01)

<local-command-stdout>Set model to [1mOpus 4.6 (1M context)[22m</local-command-stdout>

### User (20:55:04)

继续

### User (20:55:14)

那你扫一下整个项目看看有哪里是发送端外的push的推送的呢，要是上下文不够你就新开一个会话吧

### Assistant (20:59:16)

有一个 `minerva-server`，这可能是后端。让我全面搜索推送通知相关代码。

### Assistant (21:00:25)

好的，不看 minerva-server。那我聚焦在 PWA 端以及其他前端应用中搜索推送相关的代码。

### Assistant (21:00:43)

cashier 和 minerva (admin) 中的匹配基本是无关的（脚本、button push 等）。推送逻辑集中在 PWA。让我深入看关键文件。

### Assistant (21:01:00)

好的，只看 PWA 项目。让我再看几个关键文件，把推送链路完整梳理出来。

### Assistant (21:02:19)

现在我有了完整的画面。以下是 PWA 项目中所有与推送通知相关的代码汇总：

---

## PWA 推送通知完整链路

### 1. 接收端（客户端注册 + 接收推送）

| 文件 | 作用 |
|------|------|
| `src/services/firebase.ts` | Firebase 初始化、获取 FCM Token、**上传 Token 到服务器**、前台消息监听（`onMessage`） |
| `src/hooks/useFirebaseMessaging.ts` | 封装初始化流程：请求通知权限 → 获取 FCM Token → 上传（带 3 次重试） |
| `src/hooks/useUserInit.ts:110` | 在用户登录后调用 `setupFirebaseMessaging()` 启动推送注册 |
| `src/utils/permissions.ts:141` | `checkNotificationPermission()` — 请求浏览器/APK 通知权限 |
| `src/service-worker.ts` | Service Worker：处理 `notificationclick` 点击跳转、`MOCK_FCM_PUSH` mock 推送、`showNotificationFromPayload()` 展示系统通知 |

### 2. 前台推送事件处理

| 文件 | 作用 |
|------|------|
| `src/services/firebase.ts:58-63` | 前台 `onMessage` 监听：收到 `type: "bff_stage_change"` 时通过 `eventBus.emit(EventNames.BFF_STAGE_CHANGE)` 触发刷新 |
| `src/utils/eventBus.ts:76` | 定义 `BFF_STAGE_CHANGE` 事件常量 |
| `src/hooks/useBffGlobalNotification.ts` | BFF 全局通知 hook：轮询 + 监听 Push 事件 → 获取通知 → 触发弹窗/Toast |

### 3. 测试/Mock 推送（DEV only）

| 文件 | 作用 |
|------|------|
| `src/App.tsx:22-120` | **DEV 环境测试代码**：8s/16s 后通过 `registration.showNotification()` 发本地系统推送，或降级用 `eventBus.emit` mock |

### 4. API Proto 定义（发送端接口）

| 文件 | 作用 |
|------|------|
| `packages/api-proto/.../messaging_api.proto` | 定义 `FcmPushType` 枚举（USER_MATCH, LIKE_ME, WITHDRAWAL_COMPLETE 等 10 种推送类型） |
| `packages/api-proto/.../user_api.proto:2716` | `UploadFcmTokenRequest` — 客户端上传 FCM Token |
| `packages/api-proto/.../user_api.proto:2724` | `CreateDelayMessageWithPushRequest` — 创建延迟推送任务 |
| `packages/api-proto/.../user_api.proto:2744` | `CancelDelayMessageWithPushRequest` — 取消延迟推送任务 |
| `packages/api-proto/.../user_api.proto:830` | `SendMessageFromBotRequest` — Bot 发消息，含 `push_flag` 和 `OfflinePushInfo` |

---

**结论：这个 monorepo 的 PWA 端只有推送的「接收端」代码** — 注册 FCM Token、接收并展示通知、处理点击跳转。**真正的推送发送端（服务端调用 FCM API 发推送）不在这个仓库里**，而是在后端服务中（通过 proto 中定义的 `FcmPushType`、`CreateDelayMessageWithPushRequest` 等接口调用）。

App.tsx 里有一段 DEV 测试代码用 `registration.showNotification()` 本地发通知，这是纯测试 mock，不是真正的推送发送。

### User (23:37:07)

前端从哪里获取了FCM的token，又上传到哪里，分别是什么接口？

### Assistant (23:39:30)

API Error: 400 {"error":{"type":"<nil>","message":"b'{\"type\":\"error\",\"error\":{\"type\":\"invalid_request_error\",\"message\":\"***.***.content.0: Invalid `signature` in `thinking` block\"},\"request_id\":\"req_011CZZWt1r5AgZVFba3n457D\"}'    (request id: 20260330233901892843982ggTLDL7V) (request id: 20260330153901700547196CRW3HUh9)"},"type":"error"}

### User (23:49:16)

前端从哪里获取了FCM的token，又上传到哪里，分别是什么接口？

### Assistant (23:49:39)

API Error: 400 {"error":{"type":"<nil>","message":"b'{\"type\":\"error\",\"error\":{\"type\":\"invalid_request_error\",\"message\":\"***.***.content.0: Invalid `signature` in `thinking` block\"},\"request_id\":\"req_011CZZXeuoSTUmfKy2ioXCTZ\"}'    (request id: 20260330234919214011171Ws0IDHKy) (request id: 20260330154918736725114NZBoOmJ2)"},"type":"error"}

### User (23:53:48)

前端从哪里获取了FCM的token，又上传到哪里，分别是什么接口？

### Assistant (23:55:00)

Please run /login · API Error: 403 {"error":{"type":"<nil>","message":"预扣费额度失败, 用户剩余额度: ＄0.009900, 需要预扣费额度: ＄0.374566   (request id: 20260330235438109928820RXVqQOqV) (request id: 20260330155437729378265Pm2CROyQ)"},"type":"error"}

### User (00:00:24)

前端从哪里获取了FCM的token，又上传到哪里，分别是什么接口？

### Assistant (00:00:49)

根据之前已读的代码，链路很清晰：

## FCM Token 获取

**文件：** `src/services/firebase.ts:90-114`

```ts
export async function fetchFcmToken(): Promise<string | null> {
  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
  const token = await getToken(messaging, { vapidKey });
  // ...
}
```

通过 Firebase SDK 的 `getToken(messaging, { vapidKey })` 从 Firebase 服务器获取 FCM Token。需要 `VITE_FIREBASE_VAPID_KEY` 环境变量。

## FCM Token 上传

**文件：** `src/services/firebase.ts:76-84`

```ts
async function uploadFcmToken(token: string): Promise<void> {
  const request: UploadFcmTokenRequest = { fcmToken: token };
  await httpClient.requestPost2(UploadFcmTokenRequest, request, UploadFcmTokenResponse);
}
```

**接口：** 通过 protobuf 定义的 `UploadFcmTokenRequest` 上传，对应的 HTTP 路由定义在 proto 配置中。

让我确认一下具体的 URL。

### Assistant (00:01:13)

完整链路如下：

## FCM Token 完整链路

### 1. 获取 Token
- **来源：** Firebase SDK — `getToken(messaging, { vapidKey })`
- **文件：** `src/services/firebase.ts:103`
- **依赖：** 环境变量 `VITE_FIREBASE_VAPID_KEY`（VAPID 公钥）
- **前置条件：** 浏览器通知权限 `granted` + Firebase 初始化成功

### 2. 上传 Token
- **接口：** `POST /userApi/uploadFcmToken`
- **请求体：** `UploadFcmTokenRequest { fcm_token: string }` (proto id: 4300)
- **响应体：** `UploadFcmTokenResponse { code: UserServiceCommonCode }` (proto id: 4301)
- **后端服务：** `user_service`
- **文件：** `src/services/firebase.ts:76-84`

### 3. 调用时机
- **入口：** `src/hooks/useUserInit.ts:110` → 用户登录后调用 `setupFirebaseMessaging()`
- **流程：** `setupFirebaseMessaging()` (`src/hooks/useFirebaseMessaging.ts:20`)
  1. `initFirebase()` — 初始化 Firebase SDK + 注册前台消息监听
  2. `checkNotificationPermission()` — 请求通知权限
  3. `fetchFcmToken()` — 获取 Token 并上传，**失败重试 3 次**，间隔 5 秒

### 4. 数据库存储
- 后端收到后存入 `user_fcm_token` 表（见 `prisma/schema.prisma:1956`），按 `userid` 唯一索引存储，包含 `fcm_token`、`platform`、`package_name` 等字段。

