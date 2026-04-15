---
title: useDispatchDetection
date: 2026-04-15T17:04:51+08:00
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
  liveStateRef.current = liveState;

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    const tryTriggerDispatch = () => {
      // 已触发过则跳过
      if (hasTriggeredRef.current) return;
      // 未完成注册的用户不触发
      if (!userInfo?.userId) return;
      // 必须在非 live 状态下
      if (liveStateRef.current === LiveState.Action) return;
      // 第一二阶段不下发 dispatch mock，第三阶段起才下发
      const stages = Object.values(CashoutStage);
      if (stages.indexOf(willCashoutStage) < 2) return;

      hasTriggeredRef.current = true;
      clearTimer();

      const delay = Math.random() * (DISPATCH_DELAY_MAX - DISPATCH_DELAY_MIN) + DISPATCH_DELAY_MIN;
      console.log(TAG, `非 live 状态，${Math.round(delay / 1000)}s 后下发 Dispatch mock 来电`);

      timerRef.current = setTimeout(() => {
        // 再次检查：如果用户已主动开启 live，则不再下发
        if (getLiveStoreState().liveState === LiveState.Action) {
          console.log(TAG, "用户已开启 live，取消 Dispatch mock 来电");
          return;
        }
        mockCallManager.startMockCall(MockCallType.Dispatch, 0);
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

  // live 状态变为 Action 时，清除待触发的定时器
  useEffect(() => {
    if (liveState === LiveState.Action) {
      clearTimer();
    }
  }, [liveState]);
}

```
