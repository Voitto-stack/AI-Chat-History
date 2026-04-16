---
title: useHaptic
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useHaptic.ts
---

# useHaptic

```ts
/**
 * 轻量级触觉反馈 hook
 * 适用于移动端 webview / PWA
 */
export function useHaptic() {
  const vibrate = (pattern: number | number[]) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  return {
    /** 轻触反馈 (按钮点击) */
    light: () => vibrate(10),
    /** 中等反馈 (操作确认) */
    medium: () => vibrate(30),
    /** 重度反馈 (错误/警告) */
    heavy: () => vibrate(50),
    /** 成功反馈 (完成操作) */
    success: () => vibrate([10, 50, 20]),
  };
}

```
