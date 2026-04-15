---
title: mockCallManager
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: mockCallManager.ts
---

# mockCallManager

```ts
/**
 * MockCallManager - Mock 通话管理器单例
 *
 * 管理 mock 视频通话的完整生命周期，与真实通话互斥：
 * - 真实通话进行中 → 不允许发起 mock 通话
 * - Mock 通话进行中 → 真实来电自动取消 mock 通话
 */

import { eventBus, EventNames } from "@/utils/eventBus";
import { getTestVideo, createCallOrder } from "@/http/api";
import webCallManager from "@/utils/webCallManager";
import { CallState, MockCallType, MockCallState, type MockConnectSession } from "@/types/call";
import { getCallStoreState } from "@/hooks/useCall";
import { getUserStoreState } from "@/hooks/useUser";
import { MockVideoSource } from "@sitin/api-proto/gen/archat_api/user_api";
import { checkCameraAndMicPermission } from "@/utils/callUtils";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import nativeCallManager from "@/utils/nativeCallManager";

const TAG = "MockCallManager";

/**
 * MockCallManager 单例类
 */
class MockCallManagerClass {
  // ==================== 单例模式 ====================
  private static instance: MockCallManagerClass | null = null;

  static getInstance(): MockCallManagerClass {
    if (!MockCallManagerClass.instance) {
      MockCallManagerClass.instance = new MockCallManagerClass();
    }
    return MockCallManagerClass.instance;
  }

  /** 当前 mock 通话会话 */
  public connectSession: MockConnectSession | null = null;

  // ✅ client-event-listeners: 防止重复注册事件监听器
  private isListenerRegistered = false;

  private constructor() {
    console.log(TAG, "MockCallManager instance created");
    this.registerRealCallListener();
  }

  // ==================== 公共方法 ====================

  /**
   * 发起 mock 通话（全局入口）
   * js-early-exit: 多重前置检查，早期返回
   * @param type Mock 通话类型，默认 Normal
   * @param price 订单价格，默认为 0
   * @returns {Promise<boolean>} true: 成功发起, false: 被阻止
   */
  async startMockCall(type: MockCallType = MockCallType.Normal, price = 0, manual = false): Promise<boolean> {
    console.log(TAG, "startMockCall requested, type:", type, "manual:", manual);

    // js-early-exit: Debug 开关关闭了自动 mock，手动调用不受影响
    if (!manual && localStorage.getItem(STORAGE_KEYS.DEBUG_DISABLE_AUTO_MOCK) === "1") {
      console.log(TAG, "Auto mock disabled by debug toggle, skip");
      return false;
    }

    // js-early-exit: 如果已有 mock 通话进行中，不重复发起
    if (
      this.connectSession?.callState === MockCallState.Connecting ||
      this.connectSession?.callState === MockCallState.Connected
    ) {
      console.warn(TAG, "Mock 通话已在进行中，忽略重复请求");
      return false;
    }

    // js-early-exit: 真实通话优先级检查
    const realCallState = webCallManager.connectSession?.callState || nativeCallManager.connectSession?.callState;
    if (realCallState && realCallState !== CallState.Idle) {
      console.warn(TAG, "真实通话进行中，无法发起 mock 通话, state:", realCallState);
      return false;
    }

    const getSource = () => {
      if (type === MockCallType.Dispatch) {
        return MockVideoSource.check_dispatch_status;
      } else {
        if (!getUserStoreState().userInfo?.isVideoTest) {
          return MockVideoSource.word_to_video;
        }
      }
      return MockVideoSource.other;
    };

    try {
      // 更新状态为连接中
      this.connectSession = {
        mockVideoUrl: "",
        mockVideoId: 0,
        remoteUserInfo: {},
        callState: MockCallState.Connecting,
        callBeginTime: 0,
        callEndTime: 0,
        remainingCount: 0,
        orderId: 0,
        mockCallType: type,
        source: getSource(),
        price,
      };

      // 🚀 async-parallel: 并行执行权限检查和视频获取
      const [permissionResult, videoResponse] = await Promise.all([
        checkCameraAndMicPermission({ checkCamera: true, checkMicrophone: true }),
        getTestVideo(),
      ]);

      // js-early-exit: 权限检查失败
      if (!permissionResult) {
        console.warn(TAG, "权限检查失败，取消 mock 通��");
        this.resetSession();
        return false;
      }

      // js-early-exit: 在异步操作期间被取消（真实来电抢占）
      if (this.connectSession?.callState !== MockCallState.Connecting) {
        console.warn(TAG, "Mock 通话在准备期间被取消");
        return false;
      }

      // js-early-exit: 视频资源无效
      if (!videoResponse.url) {
        console.warn(TAG, "获取测试视频失败，无有效 URL");
        this.resetSession();
        return false;
      }

      // 更新会话信息
      this.connectSession = {
        ...this.connectSession,
        mockVideoUrl: videoResponse.url,
        mockVideoId: videoResponse.id || 0,
        remoteUserInfo: videoResponse.userInfo || {},
        remainingCount: videoResponse.count || 0,
      };

      // 创建通话订单
      const currentUserId = getUserStoreState().userInfo?.userId;
      const remoteUserId = videoResponse.userInfo?.userId;
      if (currentUserId && remoteUserId) {
        try {
          const orderResponse = await createCallOrder(Number(remoteUserId), Number(currentUserId));
          this.connectSession = {
            ...this.connectSession,
            orderId: orderResponse.orderId || 0,
          };
          console.log(TAG, "创建订单成功, orderId:", orderResponse.orderId);
        } catch (orderError) {
          console.error(TAG, "创建订单失败:", orderError);
        }
      }

      // 同步远端用户信息到 CallStore
      const { setRemoteUserInfo } = getCallStoreState();
      setRemoteUserInfo(videoResponse.userInfo || {});

      // 发出 MOCK_CALL_INVITED 事件，由 useMockCall 处理 navigate
      eventBus.emit(EventNames.MOCK_CALL_INVITED, this.connectSession);

      console.log(TAG, "Mock 通话发起成功", this.connectSession);
      return true;
    } catch (error) {
      console.error(TAG, "发起 mock 通话失败:", error);
      this.resetSession();
      return false;
    }
  }

  /**
   * Mock 通话已连接（页面进入后调用）
   */
  beginMockCall(): void {
    if (!this.connectSession || this.connectSession.callState !== MockCallState.Connecting) {
      console.warn(TAG, "无法开始 mock 通话：无效状态");
      return;
    }

    const _now = Date.now();
    this.connectSession = {
      ...this.connectSession,
      callState: MockCallState.Connected,
      callBeginTime: _now,
    };

    eventBus.emit(EventNames.MOCK_CALL_BEGIN, this.connectSession);
    console.log(TAG, "Mock 通话已连接");
  }

  /**
   * 结束 mock 通话（用户主动挂断）
   */
  endMockCall(): void {
    if (!this.connectSession || this.connectSession.callState === MockCallState.Idle) {
      console.warn(TAG, "无 mock 通话可结束");
      return;
    }

    const _now = Date.now();
    this.connectSession = {
      ...this.connectSession,
      callState: MockCallState.Ended,
      callEndTime: _now,
    };

    eventBus.emit(EventNames.MOCK_CALL_ENDED, this.connectSession);
    console.log(TAG, "Mock 通话已结束");
  }

  /**
   * 取消 mock 通话（被真实通话抢占）
   */
  cancelMockCall(): void {
    if (!this.connectSession || this.connectSession.callState === MockCallState.Idle) {
      return;
    }

    console.log(TAG, "Mock 通话被真实通话取消");

    const prevState = this.connectSession.callState;
    this.connectSession = {
      ...this.connectSession,
      callState: MockCallState.Ended,
      callEndTime: Date.now(),
    };

    eventBus.emit(EventNames.MOCK_CALL_CANCELED, { prevState });

    // 注意：此处不再调用 resetCall()
    // cancelMockCall 可能由真实来电触发（CALL_INVITED 事件），
    // 此时 CallStore 的 callState 已被 webCallManager 设置为 Incoming，
    // 调用 resetCall() 会将其覆盖为 Idle，导致 VideoCall 页面状态异常
  }

  /**
   * 重置会话
   */
  private resetSession(): void {
    this.connectSession = null;
  }

  // ==================== 事件监听 ====================

  /**
   * 注册事件监听器
   * ✅ client-event-listeners: 单例中只注册一次
   */
  private registerRealCallListener(): void {
    if (this.isListenerRegistered) return;

    // 监听全局 mock 通话请求 → 任意位置通过 eventBus.emit(MOCK_CALL_START, type) 调起
    eventBus.on(EventNames.MOCK_CALL_START, (type?: MockCallType) => {
      console.log(TAG, "收到 MOCK_CALL_START 事件，发起 mock 通话, type:", type);
      this.startMockCall(type);
    });

    // 监听真实来电事件（Web + Native）→ 自动取消 mock 通话
    const handleRealCallInvited = () => {
      if (
        this.connectSession &&
        (this.connectSession.callState === MockCallState.Connecting ||
          this.connectSession.callState === MockCallState.Connected)
      ) {
        console.log(TAG, "检测到真实来电，取消 mock 通话");
        this.cancelMockCall();
      }
    };
    eventBus.on(EventNames.CALL_INVITED, handleRealCallInvited);
    eventBus.on(EventNames.NATIVE_CALL_INVITED, handleRealCallInvited);

    this.isListenerRegistered = true;
    console.log(TAG, "真实通话优先级监听已注册");
  }
}

// ✅ 导出单例实例
const mockCallManager = MockCallManagerClass.getInstance();
export default mockCallManager;

// 暴露到全局，方便控制台手动调起
if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__startMockCall = (price, type = MockCallType.Normal) =>
    mockCallManager.startMockCall(type, price, true);
}

```
