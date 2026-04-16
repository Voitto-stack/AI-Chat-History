---
title: useStaggeredList
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useStaggeredList.ts
---

# useStaggeredList

```ts
import { useMemo } from "react";

/**
 * 为列表项生成交错入场动画的 style
 * @param count 列表项数量
 * @param baseDelay 基础延迟 (ms)
 * @param stagger 每项递增延迟 (ms)
 */
export function useStaggeredList(count: number, baseDelay = 0, stagger = 50) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        animationDelay: `${baseDelay + i * stagger}ms`,
      })),
    [count, baseDelay, stagger],
  );
}

```
