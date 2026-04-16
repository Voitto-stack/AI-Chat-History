---
title: useAutoFocus
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useAutoFocus.ts
---

# useAutoFocus

```ts
import { useEffect } from "react";
import type { RefObject } from "react";

type FocusableElement = HTMLElement & { focus: () => void };

interface UseAutoFocusOptions {
  enabled?: boolean;
  defer?: "none" | "raf";
}

export function useAutoFocus<T extends FocusableElement>(ref: RefObject<T | null>, options: UseAutoFocusOptions = {}) {
  const { enabled = true, defer = "none" } = options;

  useEffect(() => {
    if (!enabled) return;

    if (defer === "raf") {
      // rAF 延迟聚焦
      const frameId = requestAnimationFrame(() => {
        ref.current?.focus();
      });

      return () => {
        cancelAnimationFrame(frameId);
      };
    }

    ref.current?.focus();
  }, [defer, enabled, ref]);
}

```
