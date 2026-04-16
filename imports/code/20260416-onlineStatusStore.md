---
title: onlineStatusStore
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: onlineStatusStore.ts
---

# onlineStatusStore

```ts
import { create } from "zustand";
import { pwaStatus } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";

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
