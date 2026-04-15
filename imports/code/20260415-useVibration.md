---
title: useVibration
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: useVibration.ts
---

# useVibration

```ts
import { useCallback, useRef } from "react";

const VIBRATION_DURATION = 200;
const VIBRATION_INTERVAL = 300;
const AUTO_STOP_TIMEOUT = 60000;

/**
 * 震动控制 Hook
 * 震动模式：震动200ms，暂停100ms，循环
 * 1分钟后自动停止
 */
export function useVibration() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if ("vibrate" in navigator) {
      navigator.vibrate(0);
    }
  }, []);

  const start = useCallback(() => {
    if (document.visibilityState !== "visible") return;
    if (!("vibrate" in navigator)) return;

    stop();

    intervalRef.current = setInterval(() => {
      navigator.vibrate(VIBRATION_DURATION);
    }, VIBRATION_INTERVAL);

    timeoutRef.current = setTimeout(() => {
      stop();
    }, AUTO_STOP_TIMEOUT);
  }, [stop]);

  return { start, stop };
}

```
