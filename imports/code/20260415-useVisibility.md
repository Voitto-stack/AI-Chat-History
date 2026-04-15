---
title: useVisibility
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useVisibility.ts
---

# useVisibility

```ts
import { useEffect, useState } from "react";

/**
 * 前后台切换检测 hook
 * 监听 document.visibilitychange 和触摸事件，返回当前是否在后台
 */
export function useVisibility() {
  const [isBackground, setIsBackground] = useState(document.visibilityState !== "visible");

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsBackground(document.visibilityState !== "visible");
    };
    const handleTouch = () => setIsBackground(false);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return { isBackground };
}

```
