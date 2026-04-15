---
title: liveStore
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: liveStore.ts
---

# liveStore

```ts
import { create } from "zustand";

export enum LiveState {
  None = "None",
  Preview = "Preview",
  Action = "Action",
}

interface LiveStoreState {
  liveState: LiveState;
  isExitPopupVisible: boolean;
  isFloatingVisible: boolean;
  /** 是否已调用过关闭分发接口 */
  hasDispatchClosed: boolean;

  setLiveState: (state: LiveState) => void;
  setExitPopupVisible: (visible: boolean) => void;
  setFloatingVisible: (visible: boolean) => void;
  setHasDispatchClosed: (value: boolean) => void;
}

export const useLiveStore = create<LiveStoreState>()((set) => ({
  liveState: LiveState.None,
  isExitPopupVisible: false,
  isFloatingVisible: false,
  hasDispatchClosed: false,

  setLiveState: (liveState) => set({ liveState }),
  setExitPopupVisible: (isExitPopupVisible) => set({ isExitPopupVisible }),
  setFloatingVisible: (isFloatingVisible) => set({ isFloatingVisible }),
  setHasDispatchClosed: (hasDispatchClosed) => set({ hasDispatchClosed }),
}));

```
