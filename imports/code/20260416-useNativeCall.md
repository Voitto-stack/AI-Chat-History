---
title: useNativeCall
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: useNativeCall.tsx
---

# useNativeCall

```tsx
/**
 * Native 通话管理 Hook
 * Native Call Management Hook
 *
 * 管理 Native APK 通话的业务逻辑：来电通知、接通、结束、取消
 *
 * 应用的 Vercel React Best Practices:
 * - rerender-functional-setstate: 使用 useCallback 创建稳定的函数引用
 * - js-early-exit: 早期返回优化
 * - rerender-use-ref-transient-values: 使用 ref 存储瞬态值
 */

import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NativeCallManager from "@/utils/nativeCallManager";
import { registerBridgeHandler } from "@/utils/bridge";
import { CallType, MockCallType, type ConnectSession } from "@/types/call";
import { eventBus, EventNames } from "@/utils/eventBus";
import mockCallManager from "@/utils/mockCallManager";
import { changeDispatchStatus } from "@/http/liveApi";
import { closeCallRecordModal, showCallRecordModalAsync } from "@/components/CallRecordModal";
import { formatInTimeZone } from "@/utils/callUtils";
import { showViolationToast } from "@/utils/bridge";
import useCheckFreeCallDuration from "./useCheckFreeCallDuration";
import { useAITranscription } from "./useAITranscription";
import { queryUserBalance, reportCallInvite } from "@/http/api";
import { useCash } from "./useCash";
import { useCall } from "./useCall";
import { useUser } from "./useUser";
import { getAvatarUrl } from "@/utils/userUtil";
import useTupu from "./useTupu";
import { showRewardModalAsync } from "../components/showRewardModal";
import { processCallRecord } from "@/utils/callUtils";
import { useCashout } from "@/hooks/useCashout";
import { ReportType } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { saveReturnPath, getReturnPath } from "@/utils/callReturnPath";

const TAG = "useNativeCall";
const FACE_RATE_THRESHOLD = 0.5; // 露脸率阈值

/**
 * Native 通话管理业务 Hook
 * 监听 NativeCallManager 发射的事件，处理业务逻辑
 */
export function useNativeCall() {
  // rerender-use-ref-transient-values: 瞬态值
  const sharedViolationCountRef = useRef(0); // 违规次数
  const totalDeductedMinutesRef = useRef(0); // 需要扣除的分钟数
  const isEnded = useRef(false); // 防止重复触发结束逻辑
  const isHoldingRef = useRef(false); // 陀螺仪保持状态（来自 Native on_holding_state_changed）

  // 初始余额
  const { cash } = useCash();
  const originCashRef = useRef(cash);

  const navigate = useNavigate();
  const { remoteUserInfo } = useCall();
  const { userInfo } = useUser();

  // ==================== 业务 Hooks ====================
  const { start: startCheckFreeCallDuration, stop: stopCheckFreeCallDuration } = useCheckFreeCallDuration();
  const { updateVideoCallTime } = useCashout();

  const { start: startAITranscription, stop: stopAITranscription } = useAITranscription();
  const { start: startTupuDetection, stop: stopTupuDetection } = useTupu({
    sharedViolationCountRef,
    onTupuViolationToast: (params) => {
      showViolationToast({ ...params });
    },
  });
  // ==================== 工具方法 ====================

  /**
   * 获取当前订单收益
   */
  const getCurrentOrderEarned = async () => {
    const response = await queryUserBalance();
    const curCash = Number(response.balance || "0");
    const originCash = originCashRef.current;
    console.log(TAG, "通话前余额:", originCash, "当前余额:", curCash);
    // 计算奖励金额，如果为负数则设为0（可能因为违规扣费导致余额减少）
    const reward = curCash - originCash;
    const earned = reward < 0 ? 0 : reward;
    console.log(TAG, "当前通话奖励:", earned);
    return earned;
  };

  /**
   * 获取通话记录弹窗参数
   */
  const getCallRecordParams = useCallback(
    async (duration: number, sessionToUse?: ConnectSession) => {
      const session = sessionToUse || NativeCallManager.connectSession;
      // js-early-exit: 无会话信息直接返回
      if (!session) return;

      const { callType, callBeginTime, callEndTime } = session;

      // js-early-exit: 音频通话不显示记录弹窗
      if (callType === CallType.AUDIO_CALL) return;

      try {
        const callDurationSeconds = duration || 0;
        const callDurationMinutes = Math.round(callDurationSeconds / 60);

        // 使用累计的扣除分钟数
        const deductedMinutes = totalDeductedMinutesRef.current;
        const qualifiedMinutes = Math.max(0, callDurationMinutes - deductedMinutes);

        const earned = await getCurrentOrderEarned();

        const currentUserAvatar = getAvatarUrl(userInfo);
        const remoteUserAvatar = getAvatarUrl(remoteUserInfo);

        const caller = {
          username: remoteUserInfo.username,
          userId: remoteUserInfo.userId,
          avatarUrl: remoteUserAvatar,
        };
        const callee = {
          username: userInfo.username,
          userId: userInfo.userId,
          avatarUrl: currentUserAvatar,
        };

        // Native 端的时间戳是真实的 Date.now() 值，无需 performance.now() 转换
        const startTime = formatInTimeZone(callBeginTime || undefined);
        const endTime = formatInTimeZone(callEndTime || undefined);

        return {
          earned,
          totalDuration: duration,
          qualifiedMinutes,
          caller,
          callee,
          startTime,
          endTime,
          timezone: "UTC-8",
          onContinue: () => {
            closeCallRecordModal();
          },
        };
      } catch (err) {
        console.error(TAG, err);
      }
    },
    [remoteUserInfo, userInfo],
  );

  /**
   * 处理来电通知
   * 来源: NativeCallManager → EventNames.NATIVE_CALL_INVITED
   */
  const handleNativeCallInvited = useCallback((session: ConnectSession) => {
    try {
      console.log(TAG, "Received native call:", session);
      saveReturnPath();
      reportCallInvite(ReportType.RECEIVE_VIDEO, session.remoteUserId);
    } catch (error) {
      console.error(TAG, "Error handling native call receive:", error);
    }
  }, []);

  /**
   * 处理通话接通
   * 来源: NativeCallManager → EventNames.NATIVE_CALL_BEGIN
   */
  const handleNativeCallBegin = useCallback(() => {
    console.log(TAG, "Native call began");
    const session = NativeCallManager.connectSession;
    // js-early-exit
    if (!session) return;

    const { roomId, remoteUserId, callType } = session;

    // 记录通话开始时的余额
    originCashRef.current = cash;

    // 重置计数器
    sharedViolationCountRef.current = 0;
    totalDeductedMinutesRef.current = 0;

    // 启动业务监控
    startTupuDetection({ roomId, remoteUserId: Number(remoteUserId), callType }, null);
    startCheckFreeCallDuration(Number(remoteUserId));
    startAITranscription(roomId);

    // TODO: 启动语音审核 VoiceModerationManager
    // TODO: 标记未接来电订单 markMissCallOrder
  }, [cash, startTupuDetection, startCheckFreeCallDuration, startAITranscription]);

  /**
   * 处理通话结束
   * 来源: NativeCallManager → EventNames.NATIVE_CALL_END
   */
  const handleNativeCallEnd = useCallback(
    async (params: ConnectSession & { duration: number; faceRate: number; callType: CallType }) => {
      // 防止重复触发（Native SDK 可能会发送两次 end）
      if (isEnded.current) return;
      isEnded.current = true;

      try {
        const { duration, faceRate, callType } = params;

        const isVideoCall = callType === CallType.VIDEO_CALL;

        // 停止所有监控
        stopCheckFreeCallDuration();
        stopAITranscription();
        stopTupuDetection();
        console.log(TAG, "handleNativeCallEnd==>", NativeCallManager.connectSession);

        // 跳转回直播页面
        navigate(getReturnPath(), { replace: true });

        const callRecordParams = await getCallRecordParams(duration, params as ConnectSession);

        if (callRecordParams) {
          const callRecordTimer = setTimeout(() => {
            closeCallRecordModal();
          }, 20000);
          await showCallRecordModalAsync(callRecordParams);
          clearTimeout(callRecordTimer);
        }
        if (duration > 30) {
          //奖励弹窗
          await showRewardModalAsync(originCashRef.current, callRecordParams.earned, {
            target_user_id: remoteUserInfo?.userId?.toString(),
            target_user_type: "real",
            source: "call",
          });
        }
        //Native 端视频通话结束，处理违规记录与降级
        if (isVideoCall) {
          // 累加视频通话时长（同步到云端）
          if (duration > 0) {
            updateVideoCallTime(duration);
          }

          await processCallRecord({
            rejected: false,
            duration,
            hasFaceRate: faceRate,
            source: "native_call_end",
          });

          // 陀螺仪未启用 + 露脸率低 → 关闭分发并延迟发起 mock 检测通话
          if (!isHoldingRef.current && faceRate < FACE_RATE_THRESHOLD) {
            changeDispatchStatus(false);
            const delay = Math.random() * 5000 + 5000;
            setTimeout(() => {
              console.log(TAG, "Low face rate detected, starting dispatch mock call");
              mockCallManager.startMockCall(MockCallType.Dispatch, 0);
            }, delay);
          }
        }
      } catch (error) {
        console.error(TAG, "Error handling native call end:", error);
        // 即使出错也尝试跳转回直播页面
        navigate(getReturnPath(), { replace: true });
      }
    },
    [
      stopCheckFreeCallDuration,
      stopTupuDetection,
      stopAITranscription,
      navigate,
      getCallRecordParams,
      updateVideoCallTime,
      remoteUserInfo?.userId,
    ],
  );

  /**
   * 处理通话取消/拒接
   * 来源: NativeCallManager → EventNames.NATIVE_CALL_CANCEL
   */
  const handleNativeCallCancel = useCallback(() => {
    console.log(TAG, "Native call canceled");
    const session = NativeCallManager.connectSession;

    // 场景 1.4：Native 端视频通话取消/拒接，记录违规
    if (session?.callType === CallType.VIDEO_CALL) {
      processCallRecord({
        rejected: true,
        duration: 0,
        hasFaceRate: 0,
        source: "native_cancel",
      });
    }
  }, []);

  /**
   * 处理 10 秒不接听超时
   * 来源: NativeCallManager → EventNames.NATIVE_CALL_NO_ANSWER_TIMEOUT
   */
  const handleNoAnswerTimeout = useCallback(() => {
    console.log(TAG, "No answer timeout");

    // 场景 1.1：10秒未接听，记录违规
    processCallRecord({
      rejected: true,
      duration: 0,
      hasFaceRate: 0,
      source: "native_no_answer_timeout",
    });
  }, []);

  /**
   * 处理通话保持状态变化
   * 直接注册 Bridge Handler（非生命周期事件，不走 eventBus）
   */
  useEffect(() => {
    // 监听 Native 端陀螺仪保持状态变化，更新 isHoldingRef
    registerBridgeHandler("on_holding_state_changed", (data) => {
      const isHolding = data as boolean;
      console.log(TAG, "Holding state changed:", isHolding);
      isHoldingRef.current = isHolding;
    });

    // Native 端获取违规次数请求
    registerBridgeHandler("get_violation_count", (data: { callback: (count: number) => void }) => {
      const rejectedCount =
        JSON.parse(localStorage.getItem(STORAGE_KEYS.CALL_HISTORY) || "[]")?.filter((item) => item.rejected)?.length ??
        0;
      // 通过 callback 返回结果给 Bridge
      if (data?.callback) {
        data.callback(rejectedCount);
      }
      return rejectedCount;
    });
  }, []);

  // ==================== 事件监听注册 ====================

  /**
   * ✅ client-event-listeners: 注册事件监听器
   */
  useEffect(() => {
    console.log(TAG, "Registering native call event listeners");

    eventBus.on(EventNames.NATIVE_CALL_INVITED, handleNativeCallInvited);
    eventBus.on(EventNames.NATIVE_CALL_BEGIN, handleNativeCallBegin);
    eventBus.on(EventNames.NATIVE_CALL_END, handleNativeCallEnd);
    eventBus.on(EventNames.NATIVE_CALL_CANCEL, handleNativeCallCancel);
    eventBus.on(EventNames.NATIVE_CALL_NO_ANSWER_TIMEOUT, handleNoAnswerTimeout);

    // 清理函数：移除事件监听
    return () => {
      console.log(TAG, "Removing native call event listeners");
      eventBus.off(EventNames.NATIVE_CALL_INVITED, handleNativeCallInvited);
      eventBus.off(EventNames.NATIVE_CALL_BEGIN, handleNativeCallBegin);
      eventBus.off(EventNames.NATIVE_CALL_END, handleNativeCallEnd);
      eventBus.off(EventNames.NATIVE_CALL_CANCEL, handleNativeCallCancel);
      eventBus.off(EventNames.NATIVE_CALL_NO_ANSWER_TIMEOUT, handleNoAnswerTimeout);
    };
  }, [
    handleNativeCallInvited,
    handleNativeCallBegin,
    handleNativeCallEnd,
    handleNativeCallCancel,
    handleNoAnswerTimeout,
  ]);
}

export default useNativeCall;

```
