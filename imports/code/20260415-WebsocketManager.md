---
title: WebsocketManager
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: WebsocketManager.ts
---

# WebsocketManager

```ts
import { MessageFns } from "@sitin/api-proto/baseType";
import protoMap from "@sitin/api-proto/gen/protoIdMapping.json";
import { C2SHeartBeat, S2CHeartBeat } from "@sitin/api-proto/gen/ai_tcp/chat_match";
import { NetworkConstants } from "../NetworkConstant";
import { useUserStore } from "@/stores/userStore";
import { WebSocketConfig, WsState, WsStateListener, OnWsMessageListener } from "./WebSocketConfig";

const TAG = "WebsocketManager";

/**
 * WebSocket 管理器
 * 1. 心跳逻辑内置，使用 setInterval
 * 2. 支持外部监听
 * 3. 智能重连策略（指数退避）
 * 4. 消息监听器使用 Map 管理
 * 5. 统一的错误处理和日志
 */
export default class WebsocketManager {
  private static instance: WebsocketManager;

  private constructor() {}

  public static getInstance(): WebsocketManager {
    if (!WebsocketManager.instance) {
      WebsocketManager.instance = new WebsocketManager();
    }
    return WebsocketManager.instance;
  }

  // ========== 连接管理 ==========
  private _wsState = WsState.CLOSED;
  private ws: WebSocket | null = null;
  private initPromise: Promise<boolean> | null = null;
  private initResolve: ((value: boolean) => void) | null = null;
  private initReject: ((reason?: unknown) => void) | null = null;

  // ========== 状态监听 ==========
  private stateListeners = new Set<WsStateListener>();

  // ========== 消息监听 ==========
  private messageListeners = new Map<number, OnWsMessageListener<unknown>>();

  // ========== 心跳管理 ==========
  private heartbeatTimer: number | null = null;
  private clientHeartbeatIndex = 0;
  private serverHeartbeatIndex = 0;
  private isHeartbeatEnabled = false;

  // ========== 重连管理 ==========
  private reconnectAttempts = 0;

  /**
   * 获取当前 WebSocket 状态
   */
  public get wsState(): WsState {
    return this._wsState;
  }

  /**
   * 更新 WebSocket 状态并通知监听器
   */
  private setWsState(state: WsState): void {
    if (this._wsState !== state) {
      this._wsState = state;
      console.log(TAG, `State changed to: ${state}`);
      this.notifyStateListeners(state);
    }
  }

  // ========== 状态监听管理 ==========

  /**
   * 添加状态监听器
   */
  public addStateListener(listener: WsStateListener): void {
    this.stateListeners.add(listener);
    // 立即通知当前状态
    listener(this._wsState);
  }

  /**
   * 移除状态监听器
   */
  public removeStateListener(listener: WsStateListener): void {
    this.stateListeners.delete(listener);
  }

  /**
   * 通知所有状态监听器
   */
  private notifyStateListeners(state: WsState): void {
    this.stateListeners.forEach((listener) => listener(state));
  }

  // ========== 连接管理 ==========

  // 打开 WebSocket 连接
  public async open(): Promise<boolean> {
    // 已连接，直接返回
    if (this._wsState === WsState.OPEN) {
      return Promise.resolve(true);
    }

    // 正在连接，返回现有 Promise
    if (this._wsState === WsState.CONNECTING && this.initPromise) {
      return this.initPromise;
    }

    // 清理旧连接
    if (this.ws && (this.ws.readyState === WebSocket.CLOSING || this.ws.readyState === WebSocket.CLOSED)) {
      this.ws = null;
    }

    // 创建新连接
    this.initPromise = new Promise<boolean>((resolve, reject) => {
      console.log(TAG, "Opening WebSocket connection...");
      this.initResolve = resolve;
      this.initReject = reject;

      try {
        this.setWsState(WsState.CONNECTING);
        this.ws = new WebSocket(NetworkConstants.WS_HOST);
        this.ws.binaryType = "arraybuffer";

        this.ws.onopen = this.handleOpen.bind(this);
        this.ws.onmessage = this.handleMessage.bind(this);
        this.ws.onerror = this.handleError.bind(this);
        this.ws.onclose = this.handleClose.bind(this);
      } catch (error) {
        console.error(TAG, "Failed to create WebSocket:", error);
        this.setWsState(WsState.ERROR);
        reject(error);
      }
    });

    return this.initPromise;
  }

  // 关闭 WebSocket 连接
  public close(): void {
    console.log(TAG, "Closing WebSocket connection...");
    this.setWsState(WsState.CLOSING);
    this.stopHeartbeat();

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.setWsState(WsState.CLOSED);
  }

  // 重连 WebSocket
  public reconnect(): void {
    console.log(TAG, `Reconnecting... (attempt ${this.reconnectAttempts + 1})`);

    this.close();

    // 指数退避延迟
    const delay = Math.min(
      WebSocketConfig.RECONNECT_DELAY * Math.pow(WebSocketConfig.RECONNECT_BACKOFF_BASE, this.reconnectAttempts),
      WebSocketConfig.MAX_RECONNECT_DELAY,
    );

    setTimeout(() => {
      this.reconnectAttempts++;

      if (this.reconnectAttempts > WebSocketConfig.MAX_RECONNECT_ATTEMPTS) {
        console.error(TAG, "Max reconnect attempts reached");
        this.setWsState(WsState.ERROR);
        return;
      }

      this.open().catch((error) => {
        console.error(TAG, "Reconnect failed:", error);
      });
    }, delay);
  }

  // ========== WebSocket 事件处理 ==========

  private handleOpen(): void {
    console.log(TAG, "✅ WebSocket connected successfully");
    this.setWsState(WsState.OPEN);
    this.reconnectAttempts = 0; // 重置重连计数

    // 注册心跳监听
    this.registerHeartbeatListener();

    // 初始化余额处理
    void import("./cash")
      .then(({ cashHandler }) => cashHandler.init())
      .catch((error) => {
        console.error(TAG, "Failed to init cash handler:", error);
      });

    // 初始化用户信息处理
    void import("./userInfo")
      .then(({ userInfoHandler }) => userInfoHandler.init())
      .catch((error) => {
        console.error(TAG, "Failed to init user info handler:", error);
      });

    // 启动心跳
    this.startHeartbeat();

    if (this.initResolve) {
      this.initResolve(true);
      this.initResolve = null;
      this.initReject = null;
      this.initPromise = null;
    }
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const view = new DataView(event.data);
      const protoID = view.getInt32(8);
      const callback = this.messageListeners.get(protoID);

      if (callback) {
        const message = this.decodeMessage(event.data, callback.resType());
        callback.onMessage(message);
      } else {
        console.warn(TAG, `No listener for protocol ID: ${protoID}`);
      }
    } catch (error) {
      console.error(TAG, "Failed to handle message:", error);
    }
  }

  private handleError(error: Event): void {
    console.error(TAG, "WebSocket error:", error);
    this.setWsState(WsState.ERROR);

    if (this.initReject) {
      this.initReject(error);
      this.initResolve = null;
      this.initReject = null;
      this.initPromise = null;
    }

    // 错误后也尝试重连
    if (this.reconnectAttempts < WebSocketConfig.MAX_RECONNECT_ATTEMPTS) {
      this.reconnect();
    }
  }

  private handleClose(closeEvent: CloseEvent): void {
    console.log(TAG, "WebSocket closed:", {
      code: closeEvent.code,
      reason: closeEvent.reason,
      wasClean: closeEvent.wasClean,
    });

    this.setWsState(WsState.CLOSED);
    this.stopHeartbeat();

    // 判断是否需要重连
    const shouldReconnect =
      this.reconnectAttempts < WebSocketConfig.MAX_RECONNECT_ATTEMPTS && // 未超过最大重试次数
      (!closeEvent.wasClean || // 非正常关闭
        closeEvent.code === 1006); // 异常断开（没有收到关闭帧）

    if (shouldReconnect) {
      console.log(TAG, "Connection closed, will reconnect...");
      this.reconnect();
    } else {
      console.log(TAG, "Connection closed, will not reconnect");
      this.reconnectAttempts = 0; // 重置重连计数
    }
  }

  // ========== 消息发送与接收 ==========

  // 发送消息
  public async sendMessage<T>(message: MessageFns<T>, data: T, requestName: string): Promise<boolean> {
    try {
      const isOpen = await this.open();

      if (!isOpen || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
        console.warn(TAG, "WebSocket not ready, message not sent");
        return false;
      }

      const protoId = protoMap[requestName];
      if (protoId === undefined) {
        console.error(TAG, `Unknown request name: ${requestName}`);
        return false;
      }

      const msgBuffer = this.encodeMessage(protoId, message, data);
      this.ws.send(msgBuffer);
      return true;
    } catch (error) {
      console.error(TAG, "Failed to send message:", error);
      return false;
    }
  }

  // 编码消息
  private encodeMessage<T>(protocolID: number, messageFns: MessageFns<T>, data: T): DataView {
    const userInfo = useUserStore.getState().userInfo;
    const userId = userInfo?.userId || 0;

    if (!userId) {
      throw new Error(`Invalid userId when sending message (protocolID: ${protocolID})`);
    }

    const msgBuffer = messageFns.encode(data).finish();
    const len = 16 + msgBuffer.length;
    const buffer = new ArrayBuffer(len);
    const view = new DataView(buffer);

    view.setInt32(0, len, false); // all_len
    view.setInt32(4, Number(userId), false); // userId
    view.setInt32(8, protocolID, false); // protoId
    // sn (4 bytes) = 0

    for (let i = 0; i < msgBuffer.length; i++) {
      view.setUint8(16 + i, msgBuffer[i]);
    }

    return view;
  }

  // 解码消息
  private decodeMessage<T>(buffer: ArrayBuffer, messageFns: MessageFns<T>): T {
    const msgBuffer = buffer.slice(16);
    const uint8Array = new Uint8Array(msgBuffer);
    return messageFns.decode(uint8Array);
  }

  // ========== 消息监听管理 ==========

  // 添加消息监听器
  public addMessageListener<T>(requestName: string, callback: OnWsMessageListener<T>): void {
    const protoId = protoMap[requestName];
    if (protoId === undefined) {
      console.error(TAG, `Unknown request name: ${requestName}`);
      return;
    }
    this.messageListeners.set(protoId, callback);
  }

  // 移除消息监听器
  public removeMessageListener(requestName: string): void {
    const protoId = protoMap[requestName];
    if (protoId !== undefined) {
      this.messageListeners.delete(protoId);
    }
  }

  // ========== 心跳管理 ==========
  // 注册心跳消息监听
  private registerHeartbeatListener(): void {
    const onMessage: OnWsMessageListener<S2CHeartBeat> = {
      onMessage: (heartBeat) => {
        if (heartBeat.index !== undefined) {
          this.serverHeartbeatIndex = heartBeat.index;

          // 检查心跳延迟
          let delta = this.clientHeartbeatIndex - this.serverHeartbeatIndex;
          // 处理环绕
          if (delta < 0) delta += WebSocketConfig.HEARTBEAT_CYCLE;

          // 超过阈值，触发重连
          if (delta > WebSocketConfig.HEARTBEAT_TIMEOUT_THRESHOLD) {
            console.warn(TAG, `Heartbeat timeout detected (delta: ${delta}), reconnecting...`);
            this.reconnect();
          }
        }
      },
      resType: () => S2CHeartBeat,
    };

    this.addMessageListener("S2C_HeartBeat", onMessage);
  }

  // 启动心跳
  private startHeartbeat(): void {
    if (this.isHeartbeatEnabled) {
      console.log(TAG, "Heartbeat already running");
      return;
    }

    console.log(TAG, "Starting heartbeat");
    this.isHeartbeatEnabled = true;
    this.clientHeartbeatIndex = 0;
    this.serverHeartbeatIndex = 0;

    // 使用 setInterval
    this.heartbeatTimer = window.setInterval(() => {
      this.sendHeartbeat();
    }, WebSocketConfig.HEARTBEAT_INTERVAL);

    // 立即发送第一次心跳
    this.sendHeartbeat();
  }
  // 停止心跳
  private stopHeartbeat(): void {
    if (!this.isHeartbeatEnabled) {
      return;
    }

    console.log(TAG, "Stopping heartbeat");
    this.isHeartbeatEnabled = false;

    if (this.heartbeatTimer !== null) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }

    this.removeMessageListener("S2C_HeartBeat");
  }
  // 发送心跳消息
  private sendHeartbeat(): void {
    const userInfo = useUserStore.getState().userInfo;
    const userId = userInfo?.userId || 0;

    if (!userId) {
      // userId 无效时暂停心跳，等待下次 interval
      return;
    }

    this.clientHeartbeatIndex++;
    this.sendMessage(C2SHeartBeat, { index: this.clientHeartbeatIndex }, "C2S_HeartBeat");
  }
}

```
