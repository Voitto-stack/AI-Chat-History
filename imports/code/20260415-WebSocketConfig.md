---
title: WebSocketConfig
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: WebSocketConfig.ts
---

# WebSocketConfig

```ts
/**
 * WebSocket 配置常量
 */
export const WebSocketConfig = {
  HEARTBEAT_INTERVAL: 100, // 心跳发送间隔（毫秒）
  HEARTBEAT_RETRY_INTERVAL: 1000, // userId 无效时的重试间隔（毫秒）
  HEARTBEAT_TIMEOUT_THRESHOLD: 200, // 心跳延迟阈值，超过此值触发重连
  HEARTBEAT_CYCLE: 65536, // 心跳计数器最大值（到达后归零），防止无限增长
  RECONNECT_DELAY: 1000, // WebSocket 重连延迟（毫秒）
  MAX_RECONNECT_ATTEMPTS: 5, // 最大重连次数
  RECONNECT_BACKOFF_BASE: 2, // 重连延迟倍数（每次失败等待时间翻倍：1s→2s→4s→8s→16s）
  MAX_RECONNECT_DELAY: 30000, // 重连延迟上限（防止RECONNECT_BACKOFF_BASE指数增长过大，最多等待30秒）
} as const;

// WebSocket 状态
export enum WsState {
  OPEN = "OPEN", // 已连接
  CONNECTING = "CONNECTING", // 连接中
  CLOSING = "CLOSING", // 关闭中
  CLOSED = "CLOSED", // 已关闭
  ERROR = "ERROR", // 错误状态
}

// WebSocket 连接状态监听器
export type WsStateListener = (state: WsState) => void;

// 消息监听器
export interface OnWsMessageListener<T> {
  onMessage(data: T): void;
  resType(): any; // 使用 any 以兼容 MessageFns 的完整类型定义
}

```
