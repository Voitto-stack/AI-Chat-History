---
title: earningUserStore
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: earningUserStore.ts
---

# earningUserStore

```ts
import { create } from "zustand";
import type { UserInfo } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";

interface EarningUserState {
  userInfoMap: Record<number, UserInfo>;
  setUserInfo: (userId: number, userInfo: UserInfo) => void;
  setUserInfoBatch: (infos: UserInfo[]) => void;
  getUserInfo: (userId: number) => UserInfo | null;
  clear: () => void;
}

/**
 * Earning 页面用户信息缓存
 * 用于避免重复请求同一用户的信息
 */
export const useEarningUserStore = create<EarningUserState>((set, get) => ({
  userInfoMap: {},

  setUserInfo: (userId, userInfo) =>
    set((state) => ({
      userInfoMap: {
        ...state.userInfoMap,
        [userId]: userInfo,
      },
    })),

  setUserInfoBatch: (infos) =>
    set((state) => ({
      userInfoMap: {
        ...state.userInfoMap,
        ...Object.fromEntries(infos.filter((info) => info.userId !== undefined).map((info) => [info.userId!, info])),
      },
    })),

  getUserInfo: (userId) => get().userInfoMap[userId] ?? null,

  clear: () => set({ userInfoMap: {} }),
}));

```
