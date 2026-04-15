---
title: missCallStore
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: missCallStore.ts
---

# missCallStore

```ts
/**
 * MissCallStore - 未接来电状态管理
 *
 * 存储未接来电列表，提供数据更新和追加方法
 */

import { create } from "zustand";
import { UserInfo, UserServiceCommonCode } from "@sitin/api-proto/gen/archat_api/user_api";
// eslint-disable-next-line no-restricted-imports -- store 不能使用 hooks，需要直接访问 store
import { useUserStore } from "@/stores/userStore";
import { loadMissedCalls } from "@/http/api";

interface MissCallStoreState {
  /** 未接来电总数 */
  userTotal: number;
  /** 未接来电用户列表 */
  userInfos: UserInfo[];

  /** 从服务端拉取最新未接来电数据 */
  updateMissCall: () => Promise<{ userTotal: number; userInfos: UserInfo[] }>;
  /** 追加单个用户到列表 */
  appendMissCall: (user: UserInfo) => void;
  /** 重置状态 */
  reset: () => void;
}

export const useMissCallStore = create<MissCallStoreState>()((set, get) => ({
  userTotal: 0,
  userInfos: [],

  updateMissCall: async () => {
    const userId = useUserStore.getState().userInfo?.userId;
    if (!userId) {
      console.warn("[MissCallStore] userId not available");
      return get();
    }

    try {
      const response = await loadMissedCalls(userId);
      if (response.code !== UserServiceCommonCode.Success) {
        console.warn("[MissCallStore] loadMissedCalls failed:", response.code);
        return get();
      }

      const result = {
        userTotal: response.userTotal ?? 0,
        userInfos: response.userInfos ?? [],
      };
      set(result);
      return result;
    } catch (error) {
      console.error("[MissCallStore] updateMissCall error:", error);
      return get();
    }
  },

  appendMissCall: (user) => {
    const current = get();
    set({
      userTotal: current.userTotal + 1,
      userInfos: [...current.userInfos, user],
    });
  },

  reset: () => {
    set({ userTotal: 0, userInfos: [] });
  },
}));

```
