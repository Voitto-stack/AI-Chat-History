---
title: coinClaimStore
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: coinClaimStore.ts
---

# coinClaimStore

```ts
import { create } from "zustand";

const COUNTDOWN_SECONDS = 60; // 倒计时总秒数

interface CoinClaimState {
  startTime: number | null; // 开始计时的时间戳
  startTimer: () => void; // 开始计时
  resetTimer: () => void; // 重置计时（领取后调用）
  getProgress: () => number; // 获取当前进度 0-100
}

export const useCoinClaimStore = create<CoinClaimState>((set, get) => ({
  startTime: Date.now(),

  startTimer: () => {
    if (!get().startTime) {
      set({ startTime: Date.now() });
    }
  },

  resetTimer: () => {
    set({ startTime: Date.now() });
  },

  getProgress: () => {
    const { startTime } = get();
    if (!startTime) return 0;
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    if (elapsed >= COUNTDOWN_SECONDS) return 100;
    return (elapsed / COUNTDOWN_SECONDS) * 100;
  },
}));

```
