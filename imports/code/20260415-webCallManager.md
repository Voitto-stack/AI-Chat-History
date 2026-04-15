---
title: webCallManager
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: webCallManager.tsx
---

# webCallManager

```tsx
/**
 * CallManager - 通话管理器单例
 * 优化：TRTC 和 TUICallEngine SDK 改为动态加载，减少首屏 3.4MB
 */

import { eventBus, EventNames } from "@/utils/eventBus";
import { toast } from "@/utils/toast";
import type TRTC from "trtc-sdk-v5";
import type { TUICallEngine, TUICallEvent } from "tuicall-engine-webrtc";
import { unicodeToChinese, delay } from "./callUtils";
import { getCallStoreState } from "@/hooks/useCall";
import { getRemoteUserInfo } from "@/http/api";
import { CallState, CallType, type ConnectSession } from "@/types/call";

// SDK 动态加载（仅在实际使用时加载）
let _TRTC: typeof TRTC | null = null;
let _TUICallEngine: typeof TUICallEngine | null = null;
let _TUICallEvent: typeof TUICallEvent | null = null;
let _sdkLoadPromise: Promise<void> | null = null;

/**
 * 延迟加载通话 SDK（仅在首次调用时加载）
 * 预期加载时间: 强网 <500ms, 弱网 <2s
 */
async function ensureSDKLoaded(): Promise<void> {
  if (_TRTC && _TUICallEngine && _TUICallEvent) return;

  if (!_sdkLoadPromise) {
    _sdkLoadPromise = Promise.all([import("trtc-sdk-v5"), import("tuicall-engine-webrtc")])
      .then(([trtcModule, tuicallModule]) => {
        _TRTC = trtcModule.default;
        _TUICallEngine = tuicallModule.TUICallEngine;
        _TUICallEvent = tuicallModule.TUICallEvent;
        console.log("[CallManager] SDK loaded successfully");
      })
      .catch((error) => {
        console.error("[CallManager] Failed to load SDK:", error);
        _sdkLoadPromise = null; // 重置以便重试
        throw error;
      });
  }

  await _sdkLoadPromise;
}

/**
 * 🔥 风险缓解：登录后空闲时预加载通话 SDK
 * 用途：避免来电时 SDK 未加载导致接听延迟（500ms-2s）
 * 调用时机：登录完成后通过 requestIdleCallback 在浏览器空闲时加载
 */
// eslint-disable-next-line react-refresh/only-export-components
export function preloadCallSDK(): void {
  if (_sdkLoadPromise) return; // 已经在加载或已加载，跳过

  console.log("[CallManager] Preloading call SDK in idle time...");
  ensureSDKLoaded().catch((error) => {
    console.warn("[CallManager] Preload failed (will retry on actual call):", error);
  });
}

const TAG = "CallManager";

/**
 * 获取 CallStore 的 actions（在 React 组件外部使用）
 */
const getCallStoreActions = () => {
  const { setCallState, resetCall, setRemoteUserInfo } = getCallStoreState();
  return { setCallState, resetCall, setRemoteUserInfo };
};

/**
 * CallManager 单例类
 * 管理所有通话相关的业务逻辑
 */
class CallManagerClass {
  // ==================== 单例模式 ====================
  private static instance: CallManagerClass | null = null;

  static getInstance(): CallManagerClass {
    if (!CallManagerClass.instance) {
      CallManagerClass.instance = new CallManagerClass();
    }
    return CallManagerClass.instance;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private engine: any = null; // 动态类型，SDK 加载后赋值

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private trtc: any = null; // 动态类型，SDK 加载后赋值

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

  // ✅ client-event-listeners: 防止重复注册事件监听器
  private isEngineInitialized = false;

  // 私有构造函数，防止外部实例化
  private constructor() {
    console.log(TAG, "CallManager instance created");
  }

  // ==================== 初始化方法 ====================

  /**
   * 初始化 CallEngine
   * ✅ advanced-init-once: 确保只初始化一次
   * ✅ 优化：首次调用时动态加载 SDK
   */
  async initialize(userId: string, userSig: string): Promise<void> {
    if (this.isEngineInitialized) {
      console.warn(TAG, "CallEngine already initialized");
      return;
    }

    try {
      // 🔥 动态加载 SDK（首次调用时才下载）
      await ensureSDKLoaded();

      this.userId = userId;
      // 创建 TUICallEngine 实例
      this.engine = _TUICallEngine!.createInstance({
        SDKAppID: 1600002475,
      });

      // 登录
      await this.engine.login({
        userID: userId,
        userSig: userSig,
      });

      // 注册事件监听器
      this.registerEventListeners();

      // 获取 TRTC 实例
      this.trtc = this.engine?.getTRTCCloudInstance()?._trtc;

      // 注册 TRTC 自定义消息监听
      this.registerTRTCListeners();

      this.isEngineInitialized = true;
      console.log(TAG, "CallEngine initialized successfully");
    } catch (error) {
      console.error(TAG, "Failed to initialize CallEngine:", error);
      throw error;
    }
  }

  setCallStateToStore = (state) => {
    const { setCallState } = getCallStoreActions();
    setCallState(state);
  };

  setRemoteUserInfoToStore = (remoteUserInfo) => {
    const { setRemoteUserInfo } = getCallStoreActions();
    setRemoteUserInfo(remoteUserInfo);
  };

  accept = async () => {
    console.log(TAG, "accept");
    if (!this.engine) {
      console.error(TAG, "Cannot accept call: engine not initialized");
      return false;
    }

    if (!this.connectSession) {
      console.error(TAG, "Cannot accept call: no active session");
      return false;
    }

    try {
      // 检查 engine 状态
      const engineStatus = await this.engine?.getCallStatus();
      if (engineStatus !== "idle") {
        this.connectSession = {
          ...this.connectSession,
          callState: CallState.Accept,
        };

        this.setCallStateToStore(CallState.Accept);

        await this.engine.accept();

        //只有视频通话才startLocalVideo
        if (this.connectSession.callType === CallType.VIDEO_CALL) {
          await this.startLocalVideo("local-video");
        }
        console.log(TAG, "startLocalVideo==>");
      } else {
        throw new Error("Cannot accept call: engine is in idle state");
      }

      console.log(TAG, "Call accepted successfully");

      return true;
    } catch (error) {
      console.error(TAG, "Failed to accept call:", error);
      return false;
    }
  };

  reject = async () => {
    const engineStatus = this.engine.getCallStatus();
    if (engineStatus !== "idle") {
      this.connectSession = {
        ...this.connectSession,
        callState: CallState.Rejected,
      };

      this.setCallStateToStore(CallState.Rejected);

      await this.engine.reject();
    } else {
      console.warn(TAG, `Skipping reject() call, engine status is: ${engineStatus}`);
    }
  };

  hangup = async () => {
    const engineStatus = this.engine.getCallStatus();
    if (engineStatus === "calling" || engineStatus === "connected") {
      await this.engine?.hangup();
    } else {
      console.warn(TAG, `Skipping hangup() call, engine status is: ${engineStatus}`);
    }
  };

  handleInvited = async (params) => {
    const { inviteData, callerId, callMediaType } = params;
    const _now = Date.now();

    console.log(TAG, "Call invited", params);

    this.connectSession = {
      ...this.connectSession,
      roomId: inviteData.roomID ?? "",
      remoteUserId: callerId ?? "",
      userId: this.userId,
      callType: callMediaType,
      callState: CallState.Incoming, // CallState.Incoming
      callInvitedTime: _now,
    };

    //获取 remoteUserInfo 并同步 store
    const remoteUserInfoRes = await getRemoteUserInfo({ remoteUserId: Number(callerId) });
    this.setRemoteUserInfoToStore(remoteUserInfoRes.userBasicInfos[0]);
    //更新CallState store
    this.setCallStateToStore(CallState.Incoming);

    eventBus.emit(EventNames.CALL_INVITED, this.connectSession);
  };

  openSpeaker = async () => {
    try {
      const deviceList = await this.engine?.getDeviceList("speaker");
      if (deviceList && deviceList.length > 0) {
        this.engine?.switchDevice({ deviceType: "speaker", deviceId: deviceList[0].deviceId });
      }
    } catch (e) {
      console.error(TAG, "setSpeaker failed", e);
    }
  };

  startRemoteVideo = async (userId: string, retryCnt = 0) => {
    if (!this.engine) {
      console.error(TAG, "Cannot start remote video: engine not initialized");
      return;
    }

    if (!userId) {
      console.error(TAG, "Cannot start remote video: invalid userId");
      return;
    }

    try {
      await this.engine?.startRemoteView({ userID: userId, videoViewDomID: "remote-video" });
      // this.destroyConnect();
      this.openSpeaker();
    } catch (e) {
      console.error(TAG, "start remote video failed", e);
      if (retryCnt > 2) {
        return;
      }
      //延迟500ms重试 最多重试2次
      await delay(500);
      this.startRemoteVideo(userId, retryCnt + 1);
    }
  };

  startLocalVideo = async (viewId: string) => {
    if (!this.engine) {
      console.error(TAG, "Cannot start local video: engine not initialized");
      return;
    }

    if (!viewId) {
      console.error(TAG, "Cannot start local video: invalid viewId");
      return;
    }

    if (
      !this.connectSession ||
      (this.connectSession.callState !== CallState.Accept && this.connectSession.callState !== CallState.Connected)
    ) {
      console.warn(TAG, "Cannot start local video: invalid call state", this.connectSession?.callState);
      return;
    }

    try {
      await this.engine?.openCamera(viewId);
    } catch (e) {
      console.error(TAG, "start local video failed", e);
      throw e;
    }
  };

  handleUserVideoAvailable = (params) => {
    const { userID, isVideoAvailable } = params;
    console.log(TAG, "User video available:", userID, isVideoAvailable);
    if (isVideoAvailable === true) {
      //开启
      this.startRemoteVideo(userID);
    }
    eventBus.emit(EventNames.CALL_USER_VIDEO_AVAILABLE, { userID, isVideoAvailable });
  };

  handleCallBegin = (params) => {
    console.log(TAG, "Call begin:", params);
    const _now = Date.now();

    if (this.connectSession) {
      this.connectSession = {
        ...this.connectSession,
        callState: CallState.Connected,
        callBeginTime: _now,
      };

      this.setCallStateToStore(CallState.Connected);
    }
    eventBus.emit(EventNames.CALL_BEGIN, params);
  };

  handleCallEnd = (params) => {
    console.log(TAG, "Call ended:", params);
    const _now = Date.now();
    if (this.connectSession) {
      this.connectSession = {
        ...this.connectSession,
        callState: CallState.Idle,
        callEndTime: _now,
      };

      this.setCallStateToStore(CallState.Idle);
    }

    if (params.reason === "timeout") {
      eventBus.emit(EventNames.CALL_TIMEOUT, params);
    }

    eventBus.emit(EventNames.CALL_ENDED, params);
  };

  handleOnCallCanceled = (params) => {
    console.log(TAG, "Call canceled:", params);

    if (this.connectSession) {
      this.hangup();
      this.connectSession = {
        ...this.connectSession,
        callState: CallState.Idle,
      };

      this.setCallStateToStore(CallState.Idle);
    }

    eventBus.emit(EventNames.CALL_CANCELED, params);
  };

  handleUserLeave = (params) => {
    console.log(TAG, "User left room:", params);

    const roomId = this.connectSession?.roomId;
    // 1v1收到离开房间的消息后，如果5s都没有收到callEnd/callCancel回调，就主动挂断
    setTimeout(() => {
      // 确定是同一笔通话
      if (this.connectSession && this.connectSession.roomId === roomId) {
        this.hangup();
      }
    }, 5000);
  };

  handleCallError = (error) => {
    this.cloesConnect();
    if (error.code === -1101) {
      toast.error(
        "You have disabled camera/microphone access, please allow the current application getMediaDevicesAuth to use the camera/microphone.",
      );
    } else if (error.code === 5000) {
      // 忽略忙线时的报错
    } else if (error.code === 5500) {
      // 这个报错需要主动触发一下底层的退出逻辑，不然摄像头会卡住
    } else if (error.message?.includes("inviteID") || error.message?.includes("邀请")) {
      // Handle invalid/expired invitation error from TUICall SDK
      console.warn(TAG, "Call invitation expired or already processed:", error);
      toast.error("Call invitation expired or already processed");
    } else {
      toast.error("Some error occurred");
    }
    console.error(TAG, "call error: ", error);
  };

  cloesConnect = () => {
    this.connectSession = null;

    // ✅ 同步重置 CallStore
    const { resetCall } = getCallStoreActions();
    resetCall();
  };

  /**
   * ✅ client-event-listeners: 集中管理事件监听器
   */
  private registerEventListeners(): void {
    if (!this.engine || !_TUICallEvent) return;
    console.log(TAG, "Event listeners registered");

    // 核心事件
    this.engine.on(_TUICallEvent.INVITED, this.handleInvited);
    this.engine.on(_TUICallEvent.USER_VIDEO_AVAILABLE, this.handleUserVideoAvailable);
    this.engine.on(_TUICallEvent.ON_CALL_BEGIN, this.handleCallBegin);
    this.engine.on(_TUICallEvent.CALLING_END, this.handleCallEnd);
    this.engine.on(_TUICallEvent.USER_LEAVE, this.handleUserLeave);
    this.engine.on(_TUICallEvent.ERROR, this.handleCallError);
    this.engine.on(_TUICallEvent.ON_CALL_CANCELED, this.handleOnCallCanceled);
  }

  /**
   * 注册 TRTC 自定义消息监听
   */
  private registerTRTCListeners(): void {
    if (!this.trtc || !_TRTC) return;

    // 监听自定义消息（语音转文字等）
    this.trtc.on(_TRTC.EVENT.CUSTOM_MESSAGE, (event) => {
      try {
        const data = JSON.parse(new TextDecoder().decode(event.data));
        const fromUserId = data.sender;
        const isEnd = data?.payload?.end;
        const text = unicodeToChinese(data?.payload?.text || "");
        eventBus.emit(EventNames.CALL_TRTC_CUSTOM_MESSAGE, {
          fromUserId,
          text,
          isEnd,
        });
      } catch (error) {
        console.error(TAG, "Failed to parse custom message:", error);
      }
    });

    console.log(TAG, "TRTC listeners registered");
  }
}

// ✅ 导出单例实例

const WebCallManager = CallManagerClass.getInstance();

export default WebCallManager;

```
