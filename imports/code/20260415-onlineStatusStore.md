---
title: onlineStatusStore
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: onlineStatusStore.ts
---

# onlineStatusStore

```ts
import { create } from "zustand";
import { pwaStatus } from "@sitin/api-proto/gen/archat_api/user_api";

interface OnlineStatusState {
  pwaStatus: pwaStatus;
  setPwaStatus: (status: pwaStatus) => void;
  reset: () => void;
}

export const useOnlineStatusStore = create<OnlineStatusState>()((set) => ({
  pwaStatus: pwaStatus.PWA_STATUS_UNKNOWN,
  setPwaStatus: (status) => set({ pwaStatus: status }),
  reset: () => set({ pwaStatus: pwaStatus.PWA_STATUS_UNKNOWN }),
}));

```
