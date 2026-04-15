---
title: insExchangeStore
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: insExchangeStore.ts
---

# insExchangeStore

```ts
/** INS 交换状态管理 */

import { create } from "zustand";
import type { PwaFollowedUserinfo } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";

/** INS 交换请求消息 */
export interface InsExchangePendingMessage {
  orderId: number;
  peerUserId: number;
  insAccount: string;
  insAvatar: string;
  peerNickname?: string;
  peerAvatar?: string;
  expireTimestamp: number;
  pwafollowReward: string;
  messageId?: string; // IM 消息 ID，用于更新状态
}

interface InsExchangeState {
  pendingMessages: InsExchangePendingMessage[];
  earnings: number; // 批量完成后累计收益
  processedCount: number;
  followedUsers: PwaFollowedUserinfo[];
  addMessage: (msg: InsExchangePendingMessage) => void;
  addMessages: (msgs: InsExchangePendingMessage[]) => void;
  removeMessage: (orderId: number) => void;
  clearMessages: () => void;
  addEarnings: (amount: number) => void;
  resetEarnings: () => void;
  incrementProcessed: () => void;
  resetProcessed: () => void;
  setFollowedUsers: (users: PwaFollowedUserinfo[]) => void;
}

export const useInsExchangeStore = create<InsExchangeState>((set) => ({
  pendingMessages: [],
  earnings: 0,
  processedCount: 0,
  followedUsers: [],

  addMessage: (msg) =>
    set((state) => {
      if (state.pendingMessages.some((m) => m.orderId === msg.orderId)) return state; // 去重
      return { pendingMessages: [...state.pendingMessages, msg] };
    }),

  addMessages: (msgs) =>
    set((state) => {
      const existingIds = new Set(state.pendingMessages.map((m) => m.orderId));
      const newMsgs = msgs.filter((m) => !existingIds.has(m.orderId));
      if (newMsgs.length === 0) return state;
      return { pendingMessages: [...state.pendingMessages, ...newMsgs] };
    }),

  removeMessage: (orderId) =>
    set((state) => ({ pendingMessages: state.pendingMessages.filter((m) => m.orderId !== orderId) })),

  clearMessages: () => set({ pendingMessages: [] }),
  addEarnings: (amount) => set((state) => ({ earnings: state.earnings + amount })),
  resetEarnings: () => set({ earnings: 0 }),
  incrementProcessed: () => set((state) => ({ processedCount: state.processedCount + 1 })),
  resetProcessed: () => set({ processedCount: 0 }),
  setFollowedUsers: (users) => set({ followedUsers: users }),
}));

```
