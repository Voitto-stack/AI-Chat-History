---
title: useDispatchDetection
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useDispatchDetection.ts
---

# useDispatchDetection

```ts
/**
 * Dispatch 检测 Hook
 * PWA（非主播）启动或反屏时，首次进入非 live 状态，5-10s 内下发 Dispatch mock 来电
 */

import { useEffect, useRef } from "react";
import { useLive, LiveState, getLiveStoreState } from "@/hooks/useLive";
import { useUser } from "@/hooks/useUser";
import mockCallManager from "@/utils/mockCallManager";
import { MockCallType } from "@/types/call";
import { useCashout } from "@/hooks/useCashout";
import { CashoutStage } from "@/types/cashout";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";
import { eventBus, EventNames } from "@/utils/eventBus";

const TAG = "useDispatchDetection";

/** Dispatch mock 来电延迟范围（毫秒） */
const DISPATCH_DELAY_MIN = 5000;
const DISPATCH_DELAY_MAX = 10000;

export function useDispatchDetection() {
  const { liveState } = useLive();
  const { userInfo, userState } = useUser();
  const { willCashoutStage } = useCashout();

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // 标记本次前台周期是否已触发过检测
  const hasTriggeredRef = useRef(false);
  // 用 ref 保持最新的 liveState，供异步回调读取
  const liveStateRef = useRef(liveState);
  const prevLiveStateRef = useRef(liveState);
  liveStateRef.current = liveState;

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const canTriggerDispatch = () => {
    if (!userInfo?.userId) return false;
    if (liveStateRef.current === LiveState.Action) return false;
    const stages = Object.values(CashoutStage);
    if (stages.indexOf(willCashoutStage) < 2) return false;
    return true;
  };

  const scheduleDispatch = () => {
    clearTimer();
    const delay = Math.random() * (DISPATCH_DELAY_MAX - DISPATCH_DELAY_MIN) + DISPATCH_DELAY_MIN;
    console.log(TAG, `非 live 状态，${Math.round(delay / 1000)}s 后下发 Dispatch mock 来电`);

    timerRef.current = setTimeout(() => {
      if (getLiveStoreState().liveState === LiveState.Action) {
        console.log(TAG, "用户已开启 live，取消 Dispatch mock 来电");
        return;
      }
      mockCallManager.startMockCall(MockCallType.Dispatch, 0);
    }, delay);
  };

  useEffect(() => {
    const tryTriggerDispatch = () => {
      if (hasTriggeredRef.current) return;
      if (!canTriggerDispatch()) return;

      hasTriggeredRef.current = true;
      scheduleDispatch();

      clearTimer();

      const delay = Math.random() * (DISPATCH_DELAY_MAX - DISPATCH_DELAY_MIN) + DISPATCH_DELAY_MIN;
      console.log(TAG, `非 live 状态，${Math.round(delay / 1000)}s 后下发 Dispatch mock 来电`);

      timerRef.current = setTimeout(async () => {
        // 再次检查：如果用户已主动开启 live，则不再下发
        if (getLiveStoreState().liveState === LiveState.Action) {
          console.log(TAG, "用户已开启 live，取消 Dispatch mock 来电");
          return;
        }
        bpTrack(EventName.pwa_waiting_detection_enter);
        const sent = await mockCallManager.startMockCall(MockCallType.Dispatch, 0);
        if (sent) {
          bpTrack(EventName.pwa_waiting_detection_mock_sent);

          // 监听用户是否接听了 dispatch mock 来电
          // 使用 on + 手动 off（不用 once，因为 once 包装了 callback 导致 off 无法正确移除）
          let mockCallTracked = false;
          const cleanup = () => {
            eventBus.off(EventNames.MOCK_CALL_BEGIN, handleAnswered);
            eventBus.off(EventNames.MOCK_CALL_CANCELED, handleNotAnswered);
            eventBus.off(EventNames.MOCK_CALL_ENDED, handleNotAnswered);
          };
          const handleAnswered = () => {
            if (mockCallTracked) return;
            mockCallTracked = true;
            bpTrack(EventName.pwa_waiting_detection_mock_state, { is_answered: true });
            cleanup();
          };
          const handleNotAnswered = () => {
            if (mockCallTracked) return;
            mockCallTracked = true;
            bpTrack(EventName.pwa_waiting_detection_mock_state, { is_answered: false });
            cleanup();
          };
          eventBus.on(EventNames.MOCK_CALL_BEGIN, handleAnswered);
          eventBus.on(EventNames.MOCK_CALL_CANCELED, handleNotAnswered);
          eventBus.on(EventNames.MOCK_CALL_ENDED, handleNotAnswered);
        }
      }, delay);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // 每次从后台回到前台，重置触发标记
        hasTriggeredRef.current = false;
        tryTriggerDispatch();
      } else {
        // 进入后台时清除定时器
        clearTimer();
      }
    };

    // 首次挂载（冷启动）时触发
    if (document.visibilityState === "visible") {
      tryTriggerDispatch();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.isClubUser, userState]);

  // live 状态变化处理
  useEffect(() => {
    // 进入 Action 时，清除待触发的定时器
    if (liveState === LiveState.Action) {
      clearTimer();
    }

    // 从 Action 变为非 Action（关播），重置标记并触发 dispatch
    if (prevLiveStateRef.current === LiveState.Action && liveState !== LiveState.Action) {
      hasTriggeredRef.current = false;
      if (canTriggerDispatch()) {
        hasTriggeredRef.current = true;
        scheduleDispatch();
      }
    }

    prevLiveStateRef.current = liveState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveState]);
}

```
