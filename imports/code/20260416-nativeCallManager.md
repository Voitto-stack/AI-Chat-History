---
title: nativeCallManager
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: nativeCallManager.tsx
---

# nativeCallManager

```tsx
/**
 * NativeCallManager - Native 通话管理器单例
 * 管理 Native APK 通话的 Bridge 事件和会话状态
 *
 * 架构:
 *   Native (APK)
 *     ──bridge.registerHandler──> NativeCallManager (解析数据 + 管理会话)
 *       ──eventBus.emit──> useNativeCall (业务处理)
 */

import { eventBus, EventNames } from "@/utils/eventBus";
import { registerBridgeHandler } from "@/utils/bridge";
import { getCallStoreState } from "@/hooks/useCall";
import { getRemoteUserInfo } from "@/http/api";
import { CallState, CallType, type ConnectSession } from "@/types/call";

const TAG = "NativeCallManager";

// 10 秒不接听超时时间（毫秒）
const NO_ANSWER_TIMEOUT_MS = 10000;

/**
 * 获取 CallStore 的 actions（在 React 组件外部使用）
 */
const getCallStoreActions = () => {
  const { setCallState, resetCall, setRemoteUserInfo } = getCallStoreState();
  return { setCallState, resetCall, setRemoteUserInfo };
};

/**
 * Native 通话来电参数
 */
interface NativeCallReceiveParams {
  peerUserId: string; // 对方用户 ID
  roomID: string; // 房间 ID
}

/**
 * Native 通话接通参数
 */
interface NativeCallBeginParams {
  peerUserId: string; // 对方用户 ID
  roomID: string; // 房间 ID
  callType: number; // 通话类型 (TUICallType 值)
}

/**
 * Native 通话结束参数
 */
interface NativeCallFinishedParams {
  peerUserId: string; // 对方用户 ID
  duration: number; // 通话时长（秒）
  userId: string; // 当前用户 ID
  callType: number; // 通话类型
  faceRate?: number; // 露脸率 (0-1)，由 Native 端传入
}

/**
 * Native 通话取消参数
 */
interface NativeCallCancelParams {
  callType: number; // 通话类型
}

/**
 * NativeCallManager 单例类
 * 管理 Native 端通话的 Bridge 事件监听和会话状态
 */
class NativeCallManagerClass {
  // ==================== 单例模式 ====================
  private static instance: NativeCallManagerClass | null = null;

  static getInstance(): NativeCallManagerClass {
    if (!NativeCallManagerClass.instance) {
      NativeCallManagerClass.instance = new NativeCallManagerClass();
    }
    return NativeCallManagerClass.instance;
  }

  public connectSession: ConnectSession | null = {
    roomId: "",
    remoteUserId: "",
    userId: "",
    callType: CallType.VIDEO_CALL,
    callState: CallState.Idle,
    callInvitedTime: 0,
    callBeginTime: 0,
    callEndTime: 0,
    uplinkNetQuality: 0,
    downlinkNetQuality: 0,
  };

  private userId = "";

  // ✅ advanced-init-once: 防止重复初始化
  private isInitialized = false;

  // 10 秒不接听定时器
  private noAnswerTimer: ReturnType<typeof setTimeout> | null = null;

  // 私有构造函数，防止外部实例化
  private constructor() {
    console.log(TAG, "NativeCallManager instance created");
  }

  // ==================== 初始化方法 ====================

  /**
   * 初始化 NativeCallManager
   * 注册 Native Bridge Handler，开始监听来自 APK 的通话事件
   * ✅ advanced-init-once: 确保只初始化一次
   */
  initialize(userId: string): void {
    if (this.isInitialized) {
      console.warn(TAG, "NativeCallManager already initialized");
      return;
    }

    this.userId = userId;
    this.registerBridgeHandlers();
    this.isInitialized = true;
    console.log(TAG, "NativeCallManager initialized successfully");
  }

  // ==================== Store 同步 ====================

  setCallStateToStore = (state: CallState) => {
    const { setCallState } = getCallStoreActions();
    setCallState(state);
  };

  setRemoteUserInfoToStore = (remoteUserInfo) => {
    const { setRemoteUserInfo } = getCallStoreActions();
    setRemoteUserInfo(remoteUserInfo);
  };

  // ==================== 定时器管理 ====================

  /**
   * 启动 10 秒不接听定时器
   * 超时后发射 NATIVE_CALL_NO_ANSWER_TIMEOUT 事件
   */
  private startNoAnswerTimer = () => {
    this.clearNoAnswerTimer();
    this.noAnswerTimer = setTimeout(() => {
      console.log(TAG, "No answer timeout reached (10s)");
      eventBus.emit(EventNames.NATIVE_CALL_NO_ANSWER_TIMEOUT);
    }, NO_ANSWER_TIMEOUT_MS);
  };

  /**
   * 清除不接听定时器
   */
  private clearNoAnswerTimer = () => {
    if (this.noAnswerTimer) {
      clearTimeout(this.noAnswerTimer);
      this.noAnswerTimer = null;
    }
  };

  // ==================== Bridge 事件处理 ====================

  /**
   * 处理来电通知
   * Bridge 注册名: notifyCallReceive
   * 触发时机: Native 端收到来电邀请时
   */
  handleNotifyCallReceive = async (params: NativeCallReceiveParams) => {
    const { peerUserId, roomID } = params;
    const _now = Date.now();

    console.log(TAG, "Native call receive:", params);

    this.connectSession = {
      ...this.connectSession!,
      roomId: roomID ?? "",
      remoteUserId: peerUserId ?? "",
      userId: this.userId,
      callType: CallType.VIDEO_CALL, // 来电时默认视频，接通时更新为实际类型
      callState: CallState.Incoming,
      callInvitedTime: _now,
    };

    // 获取 remoteUserInfo 并同步 store
    const remoteUserInfoRes = await getRemoteUserInfo({ remoteUserId: Number(peerUserId) });
    this.setRemoteUserInfoToStore(remoteUserInfoRes.userBasicInfos[0]);

    // 更新 CallState store
    this.setCallStateToStore(CallState.Incoming);

    // 启动 10 秒不接听定时器
    this.startNoAnswerTimer();

    eventBus.emit(EventNames.NATIVE_CALL_INVITED, this.connectSession);
  };

  /**
   * 处理通话接通
   * Bridge 注册名: callBeginFromNative
   * 触发时机: Native 端通话成功接通时
   */
  handleCallBeginFromNative = (params: NativeCallBeginParams) => {
    const { peerUserId, roomID, callType } = params;
    const _now = Date.now();

    console.log(TAG, "Native call begin:", params);

    // 清除 10 秒不接听定时器
    this.clearNoAnswerTimer();

    this.connectSession = {
      ...this.connectSession!,
      roomId: roomID ?? "",
      remoteUserId: peerUserId ?? "",
      userId: this.userId,
      callType: callType as CallType,
      callState: CallState.Connected,
      callBeginTime: _now,
    };

    this.setCallStateToStore(CallState.Connected);

    eventBus.emit(EventNames.NATIVE_CALL_BEGIN, this.connectSession);
  };

  /**
   * 处理通话结束
   * Bridge 注册名: notifyCallFinished
   * 触发时机: Native 端通话结束（任一方挂断）时
   */
  handleNotifyCallFinished = (params: NativeCallFinishedParams, responseCallback?: (response: string) => void) => {
    const { duration, callType } = params;
    const _now = Date.now();

    console.log(TAG, "Native call finished:", params);

    if (this.connectSession) {
      this.connectSession = {
        ...this.connectSession,
        callType: callType as CallType,
        callState: CallState.Idle,
        callEndTime: _now,
      };

      this.setCallStateToStore(CallState.Idle);
    }

    eventBus.emit(EventNames.NATIVE_CALL_END, {
      ...this.connectSession,
      duration,
      faceRate: params.faceRate ?? 0,
    });

    // 回调 Native 端
    responseCallback?.("success");
  };

  /**
   * 处理通话取消/拒接
   * Bridge 注册名: callCancelFromNative
   * 触发时机: Native 端通话被超时未接听或用户主动拒接时
   */
  handleCallCancelFromNative = (params: NativeCallCancelParams) => {
    const { callType } = params;

    console.log(TAG, "Native call cancel:", params);

    // 清除 10 秒不接听定时器
    this.clearNoAnswerTimer();

    if (this.connectSession) {
      this.connectSession = {
        ...this.connectSession,
        callType: callType as CallType,
        callState: CallState.Idle,
      };

      this.setCallStateToStore(CallState.Idle);
    }

    eventBus.emit(EventNames.NATIVE_CALL_CANCEL, {
      ...this.connectSession,
      callType,
    });
  };

  // ==================== 会话管理 ====================

  /**
   * 关闭连接并重置会话
   */
  closeConnect = () => {
    this.connectSession = null;

    // ✅ 同步重置 CallStore
    const { resetCall } = getCallStoreActions();
    resetCall();
  };

  // ==================== Bridge 注册 ====================

  /**
   * ✅ client-event-listeners: 集中管理 Bridge Handler 注册
   */
  private registerBridgeHandlers(): void {
    console.log(TAG, "Registering bridge handlers");

    // 来电通知
    registerBridgeHandler("notifyCallReceive", (data) => {
      this.handleNotifyCallReceive(data as NativeCallReceiveParams);
    });

    // 通话接通
    registerBridgeHandler("callBeginFromNative", (data) => {
      this.handleCallBeginFromNative(data as NativeCallBeginParams);
    });

    // 通话结束
    registerBridgeHandler("notifyCallFinished", (data, responseCallback) => {
      this.handleNotifyCallFinished(data as NativeCallFinishedParams, responseCallback);
    });

    // 通话取消/拒接
    registerBridgeHandler("callCancelFromNative", (data) => {
      this.handleCallCancelFromNative(data as NativeCallCancelParams);
    });
  }
}

// ✅ 导出单例实例
const NativeCallManager = NativeCallManagerClass.getInstance();

export default NativeCallManager;

```
