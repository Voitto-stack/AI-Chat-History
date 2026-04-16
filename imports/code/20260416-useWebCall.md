---
title: useWebCall
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: useWebCall.tsx
---

# useWebCall

```tsx
/**
 * Web 通话管理 Hook
 * Web Call Management Hook
 */

import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import WebCallManager from "@/utils/webCallManager";
import { CallType } from "@/types/call";
import { eventBus, EventNames } from "@/utils/eventBus";
import { showReceiveCallModal, closeReceiveCallModal } from "@/components/receiveCallModalHelpers";
import { closeCallRecordModal, showCallRecordModalAsync } from "@/components/CallRecordModal";
import { showViolationLimitModal } from "@/components/ViolationLimitModal";
import { checkCameraAndMicPermission, formatInTimeZone } from "@/utils/callUtils";
import useTupu from "@/hooks/useTupu";
import useCheckFreeCallDuration from "./useCheckFreeCallDuration";
import useCheckGCCoin from "./useCheckGCCoin";
import useVoiceModeration from "./useVoiceModeration";
import webCallManager from "@/utils/webCallManager";
import { useAITranscription } from "./useAITranscription";
import { useFaceDetect } from "./useFaceDetect";
import { VideoOrCanvasElement } from "./useFaceDetect/FaceDetectService";
import useVideoRecordTask from "./useVideoRecordTask";
import { queryUserBalance, reportCallInvite } from "@/http/api";
import { useCash } from "./useCash";
import { useCall } from "./useCall";
import { useUser } from "./useUser";
import { getAvatarUrl } from "@/utils/userUtil";
import { isApp, showViolationToast } from "@/utils/bridge";
import { getCallStoreState } from "@/hooks/useCall";
import { showRewardModalAsync } from "@/components/showRewardModal";
import { showCallTooShortModalAsync } from "../components/CallTooShortModal";
import { showEarningFailedModalAsync } from "../components/EarningFailedModal";
import { processCallRecord } from "@/utils/callUtils";
import { useLive, LiveState } from "@/hooks/useLive";
import { useVibration } from "@/hooks/useVibration";
import { useCashout } from "@/hooks/useCashout";
import { ReportType } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import { useMissCall } from "@/hooks/useMissCall";
import { saveReturnPath, getReturnPath } from "@/utils/callReturnPath";

const TAG = "useWebCall";

/**
 * Web 通话管理业务 Hook
 * 管理通话邀请、接受、拒绝、开始、结束等事件
 */
export function useWebCall() {
  const { liveState } = useLive();
  //违规次数
  const sharedViolationCountRef = useRef(0);
  //需要扣除的分钟数
  const totalDeductedMinutesRef = useRef(0);
  //初始钱
  const { cash } = useCash();
  const originCashRef = useRef(cash);

  const isEnded = useRef(false);

  const isUserHangup = useRef(false);

  const navigate = useNavigate();

  const { remoteUserInfo, releasePrice } = useCall();

  const { updateMissCall } = useMissCall();

  const { userInfo } = useUser();

  const { start: startTupuDetection, stop: stopTupuDetection } = useTupu({
    sharedViolationCountRef,
    onTupuViolationToast: (params) => {
      const { roomId, remoteUserId, callBeginTime } = WebCallManager.connectSession;
      showViolationLimitModal(params, undefined, undefined, {
        target_user_id: remoteUserId,
        roomid: roomId,
        current_call_duration: callBeginTime ? Math.round((Date.now() - callBeginTime) / 1000) : undefined,
        violation_type: "face",
      });
    },
  });
  const { start: starCheckFreeCallDuration, stop: stopCheckFreeCallDuration } = useCheckFreeCallDuration();

  const { start: startCheckGCCoin, stop: stopCheckGCCoin } = useCheckGCCoin();

  const { start: startVoiceDetection, stopModeration: stopVoiceDetection } = useVoiceModeration({
    sharedViolationCountRef,
    onVoiceViolationToast: (params) => {
      if (isApp()) {
        // 通过 bridge 调用原生弹窗
        showViolationToast(params as unknown as Record<string, unknown>);
      } else {
        const { roomId, remoteUserId, callBeginTime } = WebCallManager.connectSession;
        showViolationLimitModal(params, undefined, undefined, {
          target_user_id: remoteUserId,
          roomid: roomId,
          current_call_duration: callBeginTime ? Math.round((Date.now() - callBeginTime) / 1000) : undefined,
          violation_type: "voice",
        });
      }
    },
    onVoiceSilent: (isSilent) => {
      if (isSilent) {
        getCallStoreState().showNoVoice();
      } else {
        getCallStoreState().hideNoVoice();
      }
    },
  });

  const { start: startFaceDetect, stop: stopFaceDetect, getHasFaceRate, hasFace } = useFaceDetect();
  const { start: startVideoRecordTask, stop: stopVideoRecordTask } = useVideoRecordTask();
  const { start: startAITranscription, stop: stopAITranscription } = useAITranscription();
  const { start: startVibration, stop: stopVibration } = useVibration();
  const { updateVideoCallTime } = useCashout();

  // 监听人脸检测状态变化，更新 callStore（仅视频通话）
  useEffect(() => {
    if (hasFace === null) return;
    if (hasFace) {
      getCallStoreState().hideNoFace();
    } else {
      getCallStoreState().showNoFace();
    }
  }, [hasFace]);
  /**
   * rerender-functional-setstate: 使用 useCallback 创建稳定的函数引用
   * 处理接受通话
   *
   * @param callType - 通话类型
   */
  const handleAccept = useCallback(
    async (callType: CallType): Promise<void> => {
      // 关闭接收通话弹窗
      closeReceiveCallModal();
      stopVibration();

      // js-early-exit: 早期返回优化
      try {
        // 视频通话
        if (callType === CallType.VIDEO_CALL) {
          const permissionResult = await checkCameraAndMicPermission({
            checkCamera: true,
            checkMicrophone: true,
          });
          // js-early-exit: 如果权限检查失败，直接返回
          if (!permissionResult) return;

          navigate("/video-call");
          return;
        }

        // 语音通话
        if (callType === CallType.AUDIO_CALL) {
          const permissionResult = await checkCameraAndMicPermission({
            checkCamera: false,
            checkMicrophone: true,
          });
          // js-early-exit: 如果权限检查失败，直接返回
          if (!permissionResult) return;

          navigate("/audio-call");
          return;
        }

        // Mock 通话
        if (callType === CallType.MOCK_CALL) {
          const permissionResult = await checkCameraAndMicPermission({
            checkCamera: true,
            checkMicrophone: true,
          });
          // js-early-exit: 如果权限检查失败，直接返回
          if (!permissionResult) return;

          navigate("/mock-call");
          return;
        }

        console.warn(TAG, "Unknown call type:", callType);
      } catch (error) {
        console.error(TAG, "Error handling accept:", error);
      }
    },
    [navigate, stopVibration],
  );

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

  const getCallRecordParams = useCallback(
    async (duration) => {
      const { callType, callBeginTime, callEndTime } = webCallManager.connectSession;

      if (callType === CallType.AUDIO_CALL) {
        return;
      }

      try {
        // 获取通话时长（秒）
        const callDurationSeconds = duration || 0;
        const callDurationMinutes = Math.round(callDurationSeconds / 60);

        // 使用累计的扣除分钟数，而不是当前分钟的违规次数
        const deductedMinutes = totalDeductedMinutesRef.current;
        // 计算可计费分钟数
        const qualifiedMinutes = Math.max(0, callDurationMinutes - deductedMinutes);

        const earned = await getCurrentOrderEarned();

        // 获取当前用户信息
        const currentUserAvatar = getAvatarUrl(userInfo);

        // 获取对方用户信息
        const remoteUserAvatar = getAvatarUrl(remoteUserInfo);

        // 判断当前用户是呼叫方还是接听方
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

        // callBeginTime / callEndTime 已经是 Date.now() 值，直接格式化
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
   * 处理拒绝通话
   */
  const handleDecline = useCallback(() => {
    console.log(TAG, "Call declined by user");

    try {
      const { callType } = WebCallManager.connectSession;
      WebCallManager.reject();
      closeReceiveCallModal();
      stopVibration();
      // 场景 1.2：视频通话主动拒接，记录违规
      if (callType === CallType.VIDEO_CALL) {
        processCallRecord({
          rejected: true,
          duration: 0,
          hasFaceRate: 0,
          source: "web_user_reject",
        });
      }
    } catch (error) {
      console.error(TAG, "Error handling decline:", error);
    }
  }, [stopVibration]);

  /**
   * 处理用户挂断（对方挂断或自己挂断）
   */
  const handleCallUserHangup = useCallback(() => {
    console.log(TAG, "User hangup event received");
    try {
      isUserHangup.current = true;
    } catch (error) {
      console.error(TAG, "Error handling user hangup:", error);
    }
  }, []);

  /**
   * 处理通话邀请
   *
   * @param params - 通话参数 { remoteUserId, callType }
   */
  const handleCallInvited = useCallback(
    (params: { remoteUserId: string; callType: CallType }) => {
      try {
        isEnded.current = false;
        const { callType, remoteUserId } = params;
        saveReturnPath();

        reportCallInvite(ReportType.RECEIVE_VIDEO, remoteUserId);

        // 直播 Action 状态下，跳过响铃直接接通
        const isLiveAction = liveState === LiveState.Action;
        if (isLiveAction) {
          console.log(TAG, "User is in live action, auto accepting call");
          handleAccept(callType);
          return;
        }

        // 显示接收通话弹窗
        showReceiveCallModal({
          callType: callType === CallType.VIDEO_CALL ? "video" : "audio",
          price: releasePrice,
          onAccept: () => handleAccept(callType),
          onDecline: handleDecline,
        });
        startVibration();
      } catch (error) {
        console.error(TAG, "Error handling call invited:", error);
      }
    },
    [handleAccept, handleDecline, liveState, startVibration, releasePrice],
  );

  /**
   * 处理通话开始
   */
  const handleCallBegin = useCallback(() => {
    console.log(TAG, "Call began");
    const { roomId, remoteUserId, callType, userId } = WebCallManager.connectSession;

    if (callType === CallType.VIDEO_CALL) {
      startTupuDetection(
        { roomId, remoteUserId: Number(remoteUserId), callType },
        document.getElementById("local-video") as HTMLElement,
      );
      startFaceDetect({ element: document.querySelector("#local-video") as VideoOrCanvasElement });
      startVideoRecordTask(remoteUserId, userId, roomId);
    }

    //=======违规检测=======//
    starCheckFreeCallDuration(Number(remoteUserId));
    startCheckGCCoin({ roomId, remoteUserId });
    //======录制相关=======//
    startAITranscription(roomId);

    // TODO: 添加通话开始的处理逻辑
  }, [
    startTupuDetection,
    starCheckFreeCallDuration,
    startCheckGCCoin,
    startFaceDetect,
    startAITranscription,
    startVideoRecordTask,
  ]);

  /**
   * 处理通话结束
   */
  const handleCallEnded = useCallback(
    async (params) => {
      console.log(params, "Call ended event received");
      //tuisdk 可能会出现 两次end的情况
      if (isEnded.current) return;
      isEnded.current = true;

      try {
        // 在 stop 之前获取人脸检测比率，避免计数器被重置导致 NaN
        const faceRate = getHasFaceRate();
        console.log("getHasFaceRate==>", faceRate);
        const { callBeginTime, callEndTime, callType } = WebCallManager.connectSession;

        if (callType === CallType.VIDEO_CALL) {
          stopTupuDetection();
          stopFaceDetect();
          stopVideoRecordTask();
        }

        stopCheckFreeCallDuration();
        stopCheckGCCoin();
        stopVoiceDetection();
        stopAITranscription();

        // 重置 NoFace/NoVoice 遮盖状态
        getCallStoreState().hideNoFace();
        getCallStoreState().hideNoVoice();

        console.log(TAG, "handleCallEnded==>", WebCallManager.connectSession);

        // 计算通话时长（秒）并四舍五入
        const callDuration = Math.round((callEndTime - callBeginTime) / 1000) ?? 0;
        console.log(TAG, "callDuration==>", callDuration);

        // 跳转回直播页面
        navigate(getReturnPath(), { replace: true });

        const callRecordParams = await getCallRecordParams(callDuration);
        //结算弹窗（20s 自动关闭）
        const callRecordTimer = setTimeout(() => {
          closeCallRecordModal();
        }, 20000);
        await showCallRecordModalAsync(callRecordParams);
        clearTimeout(callRecordTimer);
        console.log(isUserHangup.current, "isUserHangup");
        // 如果不是用户主动挂断&&话时长小于等于30秒，显示通话过短和收益失败弹窗（如果通）
        if (!isUserHangup.current && callDuration <= 30) {
          await showCallTooShortModalAsync();
          await showEarningFailedModalAsync();
        }

        if (callDuration > 30) {
          //奖励弹窗
          await showRewardModalAsync(originCashRef.current, callRecordParams.earned, {
            target_user_id: remoteUserInfo?.userId?.toString(),
            target_user_type: remoteUserInfo ? "real" : undefined,
            source: "call",
          });
        }

        // 场景 2.1：视频通话结束，处理违规记录与降级
        if (callType === CallType.VIDEO_CALL) {
          // 累加视频通话时长（同步到云端）
          if (callDuration > 0) {
            updateVideoCallTime(callDuration);
          }

          await processCallRecord({
            rejected: false,
            duration: callDuration,
            hasFaceRate: faceRate,
            source: "web_hangup",
          });
        }

        // 通话结束后触发回拨弹窗
        updateMissCall();
      } catch (error) {
        console.error(TAG, "Error handling call ended:", error);
        // 即使出错也尝试跳转回直播页面
        navigate(getReturnPath(), { replace: true });
      }
    },
    [
      getHasFaceRate,
      stopCheckFreeCallDuration,
      stopCheckGCCoin,
      stopVoiceDetection,
      stopAITranscription,
      navigate,
      getCallRecordParams,
      updateMissCall,
      stopTupuDetection,
      stopFaceDetect,
      stopVideoRecordTask,
      updateVideoCallTime,
      remoteUserInfo,
    ],
  );

  const handleCallTRTRCustomMessage = useCallback(
    ({ fromUserId, text, isEnd }) => {
      const { remoteUserId, roomId, userId } = webCallManager.connectSession;
      startVoiceDetection({
        fromUserId,
        text,
        isEnd,
        remoteUserId,
        roomId: Number(roomId),
        userId,
      });
    },
    [startVoiceDetection],
  );

  const handleCallTimeout = useCallback(() => {
    console.log(TAG, "Call timeout");
    stopVibration();
    processCallRecord({
      rejected: true,
      duration: 0,
      hasFaceRate: 0,
      source: "web_call_timeout",
    });
  }, [stopVibration]);

  /**
   * 场景 ：Web 端对方取消 & PWA 超时未接 & 拒接挂断
   * 来源: WebCallManager → handleOnCallCanceled → EventNames.CALL_CANCELED
   */
  const handleCallCanceled = useCallback(() => {
    console.log(TAG, "Call canceled");
    stopVibration();
    closeReceiveCallModal();
  }, [stopVibration]);

  /**
   * 注册事件监听器
   */
  useEffect(() => {
    if (!userInfo?.userId) return;

    console.log(TAG, "Registering call event listeners");

    // 注册事件监听
    eventBus.on(EventNames.CALL_INVITED, handleCallInvited);
    eventBus.on(EventNames.CALL_ENDED, handleCallEnded);
    eventBus.on(EventNames.CALL_BEGIN, handleCallBegin);
    eventBus.on(EventNames.CALL_USER_HANGUP, handleCallUserHangup);
    eventBus.on(EventNames.CALL_TRTC_CUSTOM_MESSAGE, handleCallTRTRCustomMessage);
    eventBus.on(EventNames.CALL_CANCELED, handleCallCanceled);
    eventBus.on(EventNames.CALL_TIMEOUT, handleCallTimeout);

    // 清理函数：移除事件监听
    return () => {
      console.log(TAG, "Removing call event listeners");
      eventBus.off(EventNames.CALL_INVITED, handleCallInvited);
      eventBus.off(EventNames.CALL_ENDED, handleCallEnded);
      eventBus.off(EventNames.CALL_BEGIN, handleCallBegin);
      eventBus.off(EventNames.CALL_TRTC_CUSTOM_MESSAGE, handleCallTRTRCustomMessage);
      eventBus.off(EventNames.CALL_CANCELED, handleCallCanceled);
      eventBus.off(EventNames.CALL_TIMEOUT, handleCallTimeout);
    };
  }, [
    userInfo?.userId,
    handleCallInvited,
    handleCallEnded,
    handleCallBegin,
    handleCallTRTRCustomMessage,
    handleCallUserHangup,
    handleCallCanceled,
    handleCallTimeout,
  ]);
}

export default useWebCall;

```
