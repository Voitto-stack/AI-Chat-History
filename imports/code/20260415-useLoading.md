---
title: useLoading
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useLoading.ts
---

# useLoading

```ts
/**
 * Loading 状态管理 Hook
 * 直接导出 loadingStore，保留 Zustand 的所有功能（包括 selector）
 */

import { useLoadingStore } from "@/stores/loadingStore";

export const useLoading = useLoadingStore;

```
