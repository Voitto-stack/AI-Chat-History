---
title: useMockCall
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: useMockCall.tsx
---

# useMockCall

```tsx
/**
 * Mock 通话管理 Hook
 * Mock Call Management Hook
 */

import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { eventBus, EventNames } from "@/utils/eventBus";
import { useFaceDetect } from "@/hooks/useFaceDetect";
import { VideoOrCanvasElement } from "@/hooks/useFaceDetect/FaceDetectService";
import { useSpeechDetect } from "@/hooks/useSpeechDetect";
import useCheckFreeCallDuration from "@/hooks/useCheckFreeCallDuration";
import { closeCallRecordModal, showCallRecordModalAsync } from "@/components/CallRecordModal";
import { showReceiveCallModal, closeReceiveCallModal } from "@/components/receiveCallModalHelpers";
import { useUser } from "@/hooks/useUser";
import { getAvatarUrl } from "@/utils/userUtil";
import { formatInTimeZone, processCallRecord } from "@/utils/callUtils";
import { finishCallOrder, queryUserBalance, reportMockVideo, updatePwaType } from "@/http/api";
import mockCallManager from "@/utils/mockCallManager";
import { MockConnectSession, MockCallState, MockCallType } from "@/types/call";
import { useCall } from "@/hooks/useCall";
import { showVideoGuide } from "@/components/VideoGuide";
import { toast } from "@/utils/toast";
import { showRewardModalAsync } from "../components/showRewardModal";
import { showEarningFailedModalAsync } from "../components/EarningFailedModal";
import { showGoLiveModal } from "@/components/GoLiveModal";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";
import { CashoutStage } from "@/types/cashout";
import { useLive, LiveState } from "@/hooks/useLive";
import { useVibration } from "@/hooks/useVibration";
import { useCashout } from "./useCashout";
import { changeDispatchStatus } from "@/http/liveApi";
import mockVideoRecord from "@/utils/mockVideoRecord";
import { uploadUserVideo } from "@/http/api";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { saveReturnPath, getReturnPath } from "@/utils/callReturnPath";

const TAG = "useMockCall";

/**
 * 获取当前 mock 通话序号（1 或 2），用于 conv_call 漏斗埋点
 * call1 = 第二阶段的第一个 mock（count=0），call2 = 第二阶段的第二个 mock（count=1）
 */
function getMockCallIndex(): 1 | 2 {
  const count = Number(localStorage.getItem(STORAGE_KEYS.STAGE_TWO_MOCK_COUNT) || "0");
  return count === 0 ? 1 : 2;
}

/** CallRecordModal 自动关闭延迟（毫秒） */
const CALL_RECORD_AUTO_CLOSE_DELAY = 20000;

/** Mock 响铃超时时间（毫秒） */
const MOCK_RING_TIMEOUT = 30000;

/**
 * Mock 通话管理业务 Hook
 * 管理 mock 通话的事件监听、检测启停和 UI 调度
 */
export function useMockCall() {
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const isEndedRef = useRef(false);
  const { liveState, setLiveState } = useLive();
  const ringTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // 通话前余额，用于计算收益
  const originBalanceRef = useRef(0);
  const { willCashoutStage } = useCashout();
  const { hideNoFace, showNoFace } = useCall();
  const { start: startVibration, stop: stopVibration } = useVibration();

  // 基础检测 hooks
  const { start: startFaceDetect, stop: stopFaceDetect, getHasFaceRate, hasFace } = useFaceDetect();
  const { start: startSpeechDetect, stop: stopSpeechDetect, getHasSpoken } = useSpeechDetect();
  const { start: startCheckFreeCallDuration, stop: stopCheckFreeCallDuration } = useCheckFreeCallDuration();

  // 监听人脸检测状态变化，更新 callStore（mock 通话只有 NoFace，没有 NoVoice）
  useEffect(() => {
    if (hasFace === null) return;
    if (hasFace) {
      hideNoFace();
    } else {
      showNoFace();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFace]);

  const clearTimeoutTimer = () => {
    if (ringTimeoutRef.current) {
      clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = null;
    }
  };

  /**
   * 显示响铃弹窗（Normal / Guide 共用）
   */
  const showRingModal = useCallback(() => {
    // 埋点：来电页面展示
    const callIdx = getMockCallIndex();
    if (callIdx === 1) {
      bpTrack(EventName.pwa_conv_call1_invited_page_show);
    } else {
      bpTrack(EventName.pwa_conv_call2_invited_page_show);
    }

    showReceiveCallModal({
      callType: "video",
      price: mockCallManager.connectSession?.price,
      onAccept: () => {
        clearTimeoutTimer();
        stopVibration();
        // 埋点：接听点击
        if (callIdx === 1) {
          bpTrack(EventName.pwa_conv_call1_video_click);
        } else {
          bpTrack(EventName.pwa_conv_call2_video_click);
        }
        navigate("/mock-call");
      },
      onDecline: () => {
        clearTimeoutTimer();
        stopVibration();
        // 埋点：拒接点击
        if (callIdx === 1) {
          bpTrack(EventName.pwa_conv_call1_cancel_click);
        } else {
          bpTrack(EventName.pwa_conv_call2_cancel_click);
        }
        mockCallManager.cancelMockCall();
        // 场景：mock 通话主动拒接，记录违规
        processCallRecord({
          rejected: true,
          duration: 0,
          hasFaceRate: 0,
          source: "mock_user_reject",
        });
      },
    });
    startVibration();

    // 设置 30 秒超时自动挂断
    ringTimeoutRef.current = setTimeout(() => {
      console.log(TAG, "Mock 响铃超时 30 秒，自动挂断");
      closeReceiveCallModal();
      stopVibration();
      mockCallManager.cancelMockCall();
      // 场景：mock 响铃超时未接，记录违规
      processCallRecord({
        rejected: true,
        duration: 0,
        hasFaceRate: 0,
        source: "mock_call_timeout",
      });
    }, MOCK_RING_TIMEOUT);
  }, [navigate, startVibration, stopVibration]);

  /**
   * 处理 Mock 通话邀请 → 根据 mockCallType 分流处理
   */
  const handleMockCallInvited = useCallback(
    (session: MockConnectSession) => {
      const { mockCallType } = session;
      console.log(TAG, "Mock 通话邀请，类型:", mockCallType);
      isEndedRef.current = false;
      saveReturnPath();

      // 清除之前的超时定时器
      clearTimeoutTimer();

      // 直播 Action 状态下，跳过响铃直接进入 mock 通话
      const isLiveAction = liveState === LiveState.Action;
      if (isLiveAction) {
        console.log(TAG, "User is in live action, auto entering mock call");
        navigate("/mock-call");
        return;
      }

      if (mockCallType === MockCallType.Guide) {
        // Guide 模式：先展示视频规则引导，引导完成后再显示响铃弹窗
        showVideoGuide(() => {
          showRingModal();
        });
        return;
      }

      if (mockCallType === MockCallType.Dispatch) {
        // Dispatch 模式：只弹出响铃界面，接听后提示连接失败，进入 live 状态并开始分发
        showReceiveCallModal({
          callType: "video",
          onAccept: () => {
            clearTimeoutTimer();
            stopVibration();
            closeReceiveCallModal();
            toast.info("Connection failed, the other party has canceled the call.");
            mockCallManager.cancelMockCall();
            // 进入 live 状态并开始正常分发
            setLiveState(LiveState.Action);
            changeDispatchStatus(true);
          },
          onDecline: () => {
            clearTimeoutTimer();
            stopVibration();
            mockCallManager.cancelMockCall();
            // 场景：Dispatch 模式主动拒接，记录违规
            processCallRecord({
              rejected: true,
              duration: 0,
              hasFaceRate: 0,
              source: "mock_user_reject",
            });
          },
        });

        // 设置 30 秒超时自动挂断
        ringTimeoutRef.current = setTimeout(() => {
          console.log(TAG, "Dispatch 响铃超时 30 秒，自动挂断");
          closeReceiveCallModal();
          stopVibration();
          mockCallManager.cancelMockCall();
          // 场景：Dispatch 响铃超时未接，记录违规
          processCallRecord({
            rejected: true,
            duration: 0,
            hasFaceRate: 0,
            source: "mock_call_timeout",
          });
        }, MOCK_RING_TIMEOUT);
        startVibration();
        return;
      }

      // Normal 模式：标准流程
      showRingModal();
    },
    [showRingModal, navigate, startVibration, stopVibration, liveState, setLiveState],
  );

  /**
   * 处理 Mock 通话已连接 → 启动基础检测
   */
  const handleMockCallBegin = useCallback(
    async (session: MockConnectSession) => {
      console.log(TAG, "Mock 通话已连接，启动基础检测");

      // 埋点：视频播放成功
      const callIdx = getMockCallIndex();
      if (callIdx === 1) {
        bpTrack(EventName.pwa_conv_call1_play_success);
      } else {
        bpTrack(EventName.pwa_conv_call2_play_success);
      }

      // 记录通话开始时的余额
      try {
        const balanceRes = await queryUserBalance();
        originBalanceRef.current = Number(balanceRes.balance || "0");
      } catch (e) {
        console.error(TAG, "获取通话前余额失败:", e);
      }

      const remoteUserId = session.remoteUserInfo?.userId;

      // 启动人脸检测
      const localVideoEl = document.getElementById("mock-local-video") as VideoOrCanvasElement;
      console.log(localVideoEl);
      if (localVideoEl) {
        startFaceDetect({ element: localVideoEl });
      }

      // 启动语音检测
      startSpeechDetect();

      // 启动免费通话时长检查
      if (remoteUserId) {
        startCheckFreeCallDuration(Number(remoteUserId));
      }
    },
    [startFaceDetect, startSpeechDetect, startCheckFreeCallDuration],
  );

  const getCallRecordPrams = useCallback(
    (isPassed) => {
      const { callBeginTime, callEndTime, remoteUserInfo, price } = mockCallManager.connectSession || {};

      // 获取收益并显示 CallRecordModal
      const earned = isPassed ? price || 0 : 0;

      const currentUserAvatar = getAvatarUrl(userInfo);
      const remoteUserAvatar = getAvatarUrl(remoteUserInfo);

      const caller = {
        username: remoteUserInfo?.username,
        userId: remoteUserInfo?.userId,
        avatarUrl: remoteUserAvatar,
      };
      const callee = {
        username: userInfo?.username,
        userId: userInfo?.userId,
        avatarUrl: currentUserAvatar,
      };

      const startTime = formatInTimeZone(callBeginTime);
      const endTime = formatInTimeZone(callEndTime);

      const callDuration = callBeginTime > 0 && callEndTime > 0 ? Math.round((callEndTime - callBeginTime) / 1000) : 0;
      return {
        earned,
        totalDuration: callDuration,
        qualifiedMinutes: Math.round(callDuration / 60),
        caller,
        callee,
        startTime,
        endTime,
        timezone: "UTC-8",
      };
    },
    [userInfo],
  );

  /**
   * 处理 Mock 通话结束 → 停止检测，显示 CallRecordModal
   */
  const handleMockCallEnded = useCallback(async () => {
    // js-early-exit: 防止重复触发
    if (isEndedRef.current) return;
    isEndedRef.current = true;

    console.log(TAG, "Mock 通话结束");

    try {
      // 获取人脸检测比率（在 stop 之前）
      const faceRate = getHasFaceRate();
      const hasSpoken = getHasSpoken();
      console.log(TAG, "人脸检测比率:", faceRate, "是否说过话:", hasSpoken);

      // 停止所有检测
      stopFaceDetect();
      stopSpeechDetect();
      stopCheckFreeCallDuration();

      // 停止视频录制
      const recordedBlob = await mockVideoRecord.stop();

      // 重置 NoFace 遮盖状态
      hideNoFace();

      // 计算通话时长（秒）
      const { callBeginTime, callEndTime, orderId, price, mockVideoId, source } = mockCallManager.connectSession || {};
      const callDuration = callBeginTime > 0 ? Math.round((callEndTime - callBeginTime) / 1000) : 0;

      // 判断是否为有效完成的 mock 通话
      const isPassed = callDuration >= 30 && faceRate >= 0.75 && hasSpoken;
      console.log(TAG, "Mock 通话完成判定:", { callDuration, faceRate, hasSpoken, isPassed });

      // 埋点：违规类型
      if (!isPassed) {
        if (faceRate < 0.75) {
          bpTrack(EventName.pwa_conv_settle_fail_no_face_show);
        } else if (!hasSpoken) {
          bpTrack(EventName.pwa_conv_settle_fail_no_voice_show);
        }
      }

      // 结束通话订单
      if (orderId) {
        // 埋点：通话结算
        bpTrack(EventName.pwa_call_settle, {
          order_id: orderId,
          duration: callDuration,
          is_passed: isPassed,
        });
        try {
          await finishCallOrder(orderId, callDuration, isPassed ? price || 0 : 0);
          // 埋点：通话结算成功
          bpTrack(EventName.pwa_call_settle_success, {
            order_id: orderId,
            duration: callDuration,
            price: isPassed ? price || 0 : 0,
          });
          console.log(
            TAG,
            "结束订单成功, orderId:",
            orderId,
            "duration:",
            callDuration,
            "price:",
            isPassed ? price : 0,
          );
        } catch (orderError) {
          // 埋点：通话结算失败
          bpTrack(EventName.pwa_call_settle_failed, {
            order_id: orderId,
            duration: callDuration,
            error: String(orderError),
          });
          console.error(TAG, "结束订单失败:", orderError);
        }
      }

      // 上报 Mock 视频数据
      reportMockVideo({
        videoId: mockVideoId || 0,
        orderId: orderId || 0,
        source,
        pass: isPassed,
      });

      // 埋点：测试视频结果
      bpTrack(EventName.pwa_test_video_result, {
        video_id: mockVideoId,
        order_id: orderId,
        result: isPassed ? "pass" : "fail",
        duration: callDuration,
        face_rate: faceRate,
        has_spoken: hasSpoken,
        source: source,
      });

      // 后台上传录制视频（不阻塞主流程）
      if (recordedBlob.size > 0) {
        uploadUserVideo({
          videoBlob: recordedBlob,
          verifyPass: isPassed,
          failReason: isPassed ? undefined : `duration:${callDuration},face:${faceRate},spoken:${hasSpoken}`,
          orderId,
        }).catch((err) => console.error(TAG, "上传录制视频失败:", err));
      }

      // 结束后如果通过 立即执行的方法
      if (isPassed) {
        eventBus.emit(EventNames.MOCK_CALL_PASSED);
        updatePwaType(true);
        // 广告埋点：Mock 订单完成
        bpTrack(EventName.ad_MockOrderComplete, {
          order_id: orderId,
          duration: callDuration,
          price: price || 0,
        });
      }

      eventBus.emit(EventNames.MOCK_CALL_PROCESSED);

      // 跳转回 /live
      navigate(getReturnPath(), { replace: true });

      const callRecordParams = getCallRecordPrams(isPassed);

      // 埋点：通話結算頁展示
      const callIdx = getMockCallIndex();
      if (callIdx === 1) {
        bpTrack(EventName.pwa_conv_call1_settle_page_show);
      } else {
        bpTrack(EventName.pwa_conv_call2_settle_page_show);
      }

      // 显示通话记录弹窗
      await showCallRecordModalAsync({
        ...callRecordParams,
        onContinue: () => {
          // 埋点：结算页按钮点击
          if (callIdx === 1) {
            bpTrack(EventName.pwa_conv_call1_settle_clickButton);
          } else {
            bpTrack(EventName.pwa_conv_call2_settle_clickButton);
          }
          closeCallRecordModal();
        },
      });

      // 自动关闭 CallRecordModal
      setTimeout(() => {
        closeCallRecordModal();
      }, CALL_RECORD_AUTO_CLOSE_DELAY);

      // 没有收益弹窗
      if (callDuration < 30) {
        await showEarningFailedModalAsync(
          'You violated the rule of "hanging up the video call too quickly" this time and won\'t receive video earnings.',
        );
      } else if (faceRate < 0.75) {
        await showEarningFailedModalAsync(
          'You violated the rule of "face time too short" in this video and won\'t receive earnings.',
        );
      } else if (!hasSpoken) {
        await showEarningFailedModalAsync(
          'You violated the rule of "no talking" in this video and won\'t receive earnings.',
        );
      } else if (isPassed) {
        // 埋点：恭喜弹窗展示
        if (callIdx === 1) {
          bpTrack(EventName.pwa_conv_call1_congrats_pop_show);
        } else {
          bpTrack(EventName.pwa_conv_call2_congrats_pop_show);
        }
        await showRewardModalAsync(originBalanceRef.current, callRecordParams.earned, {
          target_user_id: mockCallManager.connectSession?.remoteUserInfo?.userId?.toString(),
          target_user_type: "dh",
          source: "mock_call",
        });
        // 埋点：恭喜弹窗按钮点击
        if (callIdx === 1) {
          bpTrack(EventName.pwa_conv_call1_congrats_pop_clickButton);
        } else {
          bpTrack(EventName.pwa_conv_call2_congrats_pop_clickButton);
        }
      }

      // 第二阶段第一个 mock 视频完成后，所有弹窗关闭后弹出 GoLiveModal
      const stageTwoCount = Number(localStorage.getItem(STORAGE_KEYS.STAGE_TWO_MOCK_COUNT) || "0");
      if (isPassed && willCashoutStage === CashoutStage.StageTwo && stageTwoCount === 1) {
        showGoLiveModal({
          onEnable: () => {
            setLiveState(LiveState.Action);
          },
        });
      }

      // 场景：mock 通话正常结束，处理违规记录与降级
      await processCallRecord({
        rejected: false,
        duration: callDuration,
        hasFaceRate: faceRate,
        source: "mock_hangup",
      });
    } catch (error) {
      console.error(TAG, "处理 mock 通话结束失败:", error);
      navigate(getReturnPath(), { replace: true });
    }
  }, [
    getHasFaceRate,
    getHasSpoken,
    stopFaceDetect,
    stopSpeechDetect,
    stopCheckFreeCallDuration,
    hideNoFace,
    navigate,
    getCallRecordPrams,
    willCashoutStage,
    setLiveState,
  ]);

  /**
   * 处理 Mock 通话被取消（真实通话抢占或用户拒绝）
   */
  const handleMockCallCanceled = useCallback(
    async ({ prevState }: { prevState: MockCallState }) => {
      console.log(TAG, "Mock 通话被取消，之前状态:", prevState);
      const { callBeginTime, callEndTime, orderId } = mockCallManager.connectSession || {};
      const callDuration = callBeginTime > 0 ? Math.round((callEndTime - callBeginTime) / 1000) : 0;

      // 关闭响铃弹窗（如果正在显示）
      closeReceiveCallModal();

      // 停止所有检测
      stopFaceDetect();
      stopSpeechDetect();
      stopCheckFreeCallDuration();

      // 重置 NoFace 遮盖状态
      hideNoFace();

      // 结束订单（如果之前已创建）
      if (orderId) {
        try {
          await finishCallOrder(orderId, callDuration, 0);
        } catch (orderError) {
          console.error(TAG, "结束订单失败:", orderError);
        }
      }

      // 跳转回 /live
      navigate(getReturnPath(), { replace: true });
    },
    [stopFaceDetect, stopSpeechDetect, stopCheckFreeCallDuration, hideNoFace, navigate],
  );

  /**
   * 注册事件监听器
   * ✅ client-event-listeners: 在 useEffect 中注册，返回清理函数
   */
  useEffect(() => {
    if (!userInfo?.userId) return;

    console.log(TAG, "注册 mock 通话事件监听器");

    eventBus.on(EventNames.MOCK_CALL_INVITED, handleMockCallInvited);
    eventBus.on(EventNames.MOCK_CALL_BEGIN, handleMockCallBegin);
    eventBus.on(EventNames.MOCK_CALL_ENDED, handleMockCallEnded);
    eventBus.on(EventNames.MOCK_CALL_CANCELED, handleMockCallCanceled);

    return () => {
      console.log(TAG, "移除 mock 通话事件监听器");
      eventBus.off(EventNames.MOCK_CALL_INVITED, handleMockCallInvited);
      eventBus.off(EventNames.MOCK_CALL_BEGIN, handleMockCallBegin);
      eventBus.off(EventNames.MOCK_CALL_ENDED, handleMockCallEnded);
      eventBus.off(EventNames.MOCK_CALL_CANCELED, handleMockCallCanceled);
    };
  }, [userInfo?.userId, handleMockCallInvited, handleMockCallBegin, handleMockCallEnded, handleMockCallCanceled]);
}

export default useMockCall;

```
