---
title: HEARTBEAT_AND_ONLINE_STATUS
date: 2026-04-15T17:05:30+08:00
source: import
original: HEARTBEAT_AND_ONLINE_STATUS.md
---

# 心跳机制 & 在线状态上报

## 一、WS 心跳（WebSocket Heartbeat）

### 相关文件

- `src/network/ws/WebsocketManager.ts` — WS 连接管理、心跳逻辑
- `src/network/ws/WebSocketConfig.ts` — 心跳配置常量
- `src/hooks/useUserInit.ts` — WS 初始化入口

### 作用

1. **保活 WS 连接**：通过高频发包防止服务端因空闲超时主动断开连接。
2. **检测连接健康状态**：客户端维护发送序号（`clientHeartbeatIndex`）和服务端回包序号（`serverHeartbeatIndex`），若差值超过阈值说明连接已异常，触发重连。
3. **接收服务端推送**：WS 连接是服务端推送消息（来电、余额变更、用户信息等）的通道，心跳保活是前提。

### 关键配置（WebSocketConfig.ts）

| 配置项                        | 值      | 说明                                 |
| ----------------------------- | ------- | ------------------------------------ |
| `HEARTBEAT_INTERVAL`          | 100ms   | 心跳发送间隔（前台）                 |
| `HEARTBEAT_TIMEOUT_THRESHOLD` | 200     | 客户端与服务端序号差超过此值触发重连 |
| `HEARTBEAT_CYCLE`             | 65536   | 序号最大值，超出后归零防止溢出       |
| `RECONNECT_DELAY`             | 1000ms  | 初始重连等待时间                     |
| `RECONNECT_BACKOFF_BASE`      | 2       | 指数退避倍数（1s→2s→4s→8s→16s）      |
| `MAX_RECONNECT_ATTEMPTS`      | 5       | 最大重连次数，超出后进入 ERROR 状态  |
| `MAX_RECONNECT_DELAY`         | 30000ms | 重连等待上限                         |

### 调用时机

| 时机                                                         | 动作                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------- |
| 用户登录完成（`UserState.FullRegister` 或 `SimpleRegister`） | `wsManager.open()` → WS 连接成功后自动 `startHeartbeat()`     |
| WS `onopen` 回调触发                                         | 注册心跳 S2C 监听器，启动心跳 `setInterval`                   |
| 用户登出 / 切换账号                                          | `wsManager.close()` → `stopHeartbeat()` 清理 interval         |
| 心跳 delta 超过阈值                                          | `reconnect()` 指数退避重连                                    |
| WS 被服务端关闭（非主动关闭）                                | `handleClose` 自动触发重连                                    |
| 页面从后台切回前台（`visibilitychange`）                     | 若 WS 处于 `ERROR`/`CLOSED` 状态，重置重连计数并重新 `open()` |

### 后台行为

- **浏览器节流**：页面进入后台（`visibilityState === 'hidden'`）时，浏览器强制将 `setInterval` 最小间隔提升为 **1000ms**，心跳从 100ms/次 降为 1s/次，这是浏览器规范，代码层面无法控制。
- **连接存活时长**：在后台约 **1 分钟左右**，浏览器/Android 系统会主动断开 WS 的 TCP 连接。
- **重连耗尽**：WS 断开后进行 5 次指数退避重连，全部失败后进入 `WsState.ERROR`，心跳停止。
- **回到前台恢复**：`visibilitychange` 监听器检测到页面恢复可见时，自动重置重连计数并重新建立连接，心跳随之恢复。
- **APK WebView 行为一致**：Android WebView 同样支持 `visibilitychange` 事件，且当前 APK 没有调用 `pauseTimers()`，行为与 H5 浏览器相同。

### 流程图

```
用户登录
  └─▶ wsManager.open()
        └─▶ onopen 回调
              ├─▶ registerHeartbeatListener()  监听 S2C_HeartBeat
              └─▶ startHeartbeat()
                    └─▶ setInterval(sendHeartbeat, 100ms)
                          ├─▶ 发送 C2S_HeartBeat { index: clientIndex++ }
                          └─▶ 收到 S2C_HeartBeat { index: serverIndex }
                                └─▶ delta = clientIndex - serverIndex
                                      ├─ delta ≤ 200 → 正常
                                      └─ delta > 200 → reconnect()

切后台
  ├─▶ 心跳节流到 1s/次
  └─▶ ~1min 后 WS 被系统断开
        └─▶ 指数退避重连（最多 5 次）
              ├─ 成功 → 恢复心跳
              └─ 全失败 → WsState.ERROR

切回前台
  └─▶ visibilitychange 触发
        └─▶ 若 WsState.ERROR 或 CLOSED → 重置计数，重新 open()
```

---

## 二、在线状态上报（Online Status Report）

### 相关文件

- `src/hooks/useOnlineStatusReport.ts` — 上报主逻辑
- `src/hooks/useVisibility.ts` — 前后台状态检测
- `src/stores/onlineStatusStore.ts` — pwaStatus 状态存储
- `src/http/onlineStatusApi.ts` — HTTP 上报接口

### 作用

1. **实时告知服务端用户当前状态**（前台在线/后台在线/通话中/离线），用于派单、匹配等业务逻辑判断。
2. **统计在线时长**：后端通过「收到的上报次数 × 5秒」计算在线时长（当前设计局限，待优化）。
3. **网络降级感知**：IM 网络断开时自动将状态降级为 `FRONTEND_OFFLINE` 或 `OFFLINE`。

### pwaStatus 枚举及含义

| 状态值                                | 含义                           |
| ------------------------------------- | ------------------------------ |
| `PWA_STATUS_FRONTEND_ONLINE_INACTIVE` | 前台在线，未开播               |
| `PWA_STATUS_FRONTEND_ONLINE_ACTIVE`   | 前台在线，开播中               |
| `PWA_STATUS_FRONTEND_ONLINE_BUSY`     | 通话中（最高优先级）           |
| `PWA_STATUS_BACKEND_ONLINE_INACTIVE`  | 后台在线，未开播               |
| `PWA_STATUS_BACKEND_ONLINE_ACTIVE`    | 后台在线，开播中               |
| `PWA_STATUS_FRONTEND_OFFLINE`         | 前台但 IM 网络断开             |
| `PWA_STATUS_OFFLINE`                  | 后台且 IM 网络断开（完全离线） |

### 状态优先级

```
通话中(BUSY) > 开播(ACTIVE) > 默认(INACTIVE)
                    ↓ 叠加网络状态
            IM 断网 → 降级为 OFFLINE 系列
```

### 调用时机

| 时机                             | 动作                                 | 方式      |
| -------------------------------- | ------------------------------------ | --------- |
| `isBackground` 变化（切前/后台） | 立即重算 `pwaStatus` 并上报          | 即时 HTTP |
| `liveState` 变化（开播/关播）    | 立即重算 `pwaStatus` 并上报          | 即时 HTTP |
| `callState` 变化（接通/挂断）    | 立即重算 `pwaStatus` 并上报          | 即时 HTTP |
| IM 网络状态变化                  | 立即重算 `pwaStatus` 并上报          | 即时 HTTP |
| 每 5 秒轮询                      | 上报当前 `pwaStatus`（保持心跳频率） | 轮询 HTTP |

### 离线感知链路（重要）

> 切后台后服务端能**立即**感知，不依赖 WS 心跳超时。

```
切后台（按 Home 键）
  └─▶ visibilitychange → isBackground = true
        └─▶ derivePwaStatus() 返回 BACKEND_ONLINE_INACTIVE
              └─▶ pwaStatus 状态变更
                    └─▶ 立即 HTTP 上报（不等 5s 轮询）
                          └─▶ 服务端立即感知用户切后台 ✅
```

### 与 WS 心跳的分工

| 维度           | WS 心跳                         | HTTP 在线状态上报              |
| -------------- | ------------------------------- | ------------------------------ |
| **协议**       | WebSocket（二进制 protobuf）    | HTTP（protobuf）               |
| **频率**       | 前台 100ms，后台 1s             | 状态变化时立即 + 每 5s 轮询    |
| **主要作用**   | 保活 WS 连接、检测连接异常      | 告知服务端用户在线状态         |
| **离线感知**   | 不依赖（心跳超时感知慢，~1min） | **主要手段**（切后台立即上报） |
| **后台稳定性** | ~1min 后 WS 被系统断开          | 5s 轮询持续运行，更稳定        |
| **服务端推送** | ✅ 依赖 WS 通道                 | ❌ 仅单向上报                  |

