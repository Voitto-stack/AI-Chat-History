---
title: loadingStore
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: loadingStore.ts
---

# loadingStore

```ts
import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  count: number;
  showLoading: () => void;
  hideLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  count: 0,
  showLoading: () =>
    set((state) => ({
      count: state.count + 1,
      isLoading: true,
    })),
  hideLoading: () =>
    set((state) => {
      const newCount = Math.max(0, state.count - 1);
      return {
        count: newCount,
        isLoading: newCount > 0,
      };
    }),
}));

```
