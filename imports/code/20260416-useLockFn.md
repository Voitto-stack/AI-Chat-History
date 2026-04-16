---
title: useLockFn
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useLockFn.ts
---

# useLockFn

```ts
import { useCallback, useRef } from "react";

/**
 * 防连点 Hook：在异步函数执行期间锁定，防止重复触发。
 * 适用于按钮点击、表单提交等场景。
 *
 * @param fn 需要加锁的异步函数
 * @returns 加锁后的函数，执行期间再次调用会被忽略
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useLockFn<T extends (...args: any[]) => Promise<any>>(fn: T): T {
  const lockRef = useRef(false);

  return useCallback(
    (async (...args: Parameters<T>) => {
      if (lockRef.current) return;
      lockRef.current = true;
      try {
        return await fn(...args);
      } finally {
        lockRef.current = false;
      }
    }) as T,
    [fn],
  );
}

```
