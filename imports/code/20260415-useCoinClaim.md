---
title: useCoinClaim
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: useCoinClaim.ts
---

# useCoinClaim

```ts
import { useCallback, useEffect, useRef, useState } from "react";
import { UserServiceCommonCode } from "@sitin/api-proto/gen/archat_api/user_api";
import { claimWaitingCoin } from "@/http/userApi";
import { toast } from "@/utils/toast";
import { useUser } from "@/hooks/useUser";
import { useCoinClaimStore } from "@/stores/coinClaimStore";

/** 按钮的 6 种显示类型：1-倒计时 2-展开收益 3-可领取 4-领取中 5-奖励展示 6-完成 */
export type CoinClaimType = 1 | 2 | 3 | 4 | 5 | 6;

// type 流转映射：1↔2 互切，3→4→5→6→1 主流程
const NEXT_TYPE: Record<CoinClaimType, CoinClaimType> = { 1: 2, 2: 1, 3: 4, 4: 5, 5: 6, 6: 1 };

/** 封装金币领取的纯业务逻辑，不涉及任何 UI/动画控制 */
export function useCoinClaim() {
  const { setCash } = useUser();
  const { getProgress, resetTimer } = useCoinClaimStore();

  const [progress, setProgress] = useState<number>(() => getProgress());
  const [type, setType] = useState<CoinClaimType>(() => (getProgress() >= 100 ? 3 : 1));

  const isRequestingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextType = useCallback(() => {
    setType((prev) => NEXT_TYPE[prev]);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      const p = getProgress();
      setProgress(p);
      if (p >= 100) {
        stopTimer();
        setType(3);
      }
    }, 1000);
  }, [getProgress, stopTimer]);

  // 初始化进度轮询
  useEffect(() => {
    if (progress < 100) startTimer();
    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 挂载后 2s 展开，5.5s 收起
  useEffect(() => {
    const t1 = setTimeout(() => setType((p) => (p === 1 ? 2 : p)), 2000);
    const t2 = setTimeout(() => setType((p) => (p === 2 ? 1 : p)), 5500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // 5-奖励展示：2s 后流转到 6
  useEffect(() => {
    if (type !== 5) return;
    const timeout = setTimeout(nextType, 2000);
    return () => clearTimeout(timeout);
  }, [type, nextType]);

  // 6-过渡帧：立即流转到 1
  useEffect(() => {
    if (type !== 6) return;
    nextType();
  }, [type, nextType]);

  // 领取点击：3→4
  const handleClick = useCallback(async () => {
    if (type !== 3 || isRequestingRef.current) return;

    isRequestingRef.current = true;
    resetTimer();
    setProgress(0);
    nextType(); // 3→4
    startTimer();

    try {
      const response = await claimWaitingCoin(false);
      if (response.code === UserServiceCommonCode.Success) {
        if (response.balance) setCash(parseFloat(response.balance));
      } else {
        toast.error(response.message || "Failed to claim coin");
      }
    } catch {
      toast.error("Failed to claim coin");
    } finally {
      isRequestingRef.current = false;
    }
  }, [type, setCash, startTimer, resetTimer, nextType]);

  return { type, progress, handleClick, nextType };
}

```
