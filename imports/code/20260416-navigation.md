---
title: navigation
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: navigation.ts
---

# navigation

```ts
type NavigateFn = (to: string | number, options?: { replace?: boolean; state?: unknown }) => void;

/**
 * 安全返回上一页
 * 如果没有上一级，则导航到自定义 fallback 路径
 */
export function goBack(navigate: NavigateFn, fallback: string = "/"): void {
  if (window.history.length > 2) {
    navigate(-1);
  } else {
    navigate(fallback, { replace: true });
  }
}

```
