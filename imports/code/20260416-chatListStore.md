---
title: chatListStore
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: chatListStore.ts
---

# chatListStore

```ts
import { create } from "zustand";
import type { ChatListItem } from "@/hooks/chatList";
import type { UserInfo, GetHumanChatFriendMatchCardInfoResponse } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";

// 扩展 UserInfo，添加 matchCardInfo 缓存
export interface UserInfoWithCache extends UserInfo {
  matchCardInfo?: GetHumanChatFriendMatchCardInfoResponse;
}

interface ChatListState {
  chatList: ChatListItem[]; // 会话列表
  userInfoMap: Record<number, UserInfoWithCache>; // 用户信息（keyed by userId）
  setChatList: (list: ChatListItem[]) => void;
  setUserInfo: (info: UserInfoWithCache) => void; // 更新单个用户信息（WS 推送场景）
  setUserInfoBatch: (infos: UserInfoWithCache[]) => void; // 批量更新用户信息（列表加载场景）
  setMatchCardInfo: (userId: number, matchCardInfo: GetHumanChatFriendMatchCardInfoResponse) => void; // 更新匹配卡片信息
  clearAll: () => void; // 清空所有缓存（用户登出/切换时调用）
}

/**
 * 聊天列表全局 Store
 */
export const useChatListStore = create<ChatListState>((set) => ({
  chatList: [],
  userInfoMap: {},
  setChatList: (list) => set({ chatList: list }),
  setUserInfo: (info) => {
    const { userId } = info;
    if (userId === undefined) return;
    set((state) => {
      const existingInfo = state.userInfoMap[userId];
      return {
        userInfoMap: {
          ...state.userInfoMap,
          [userId]: {
            ...info,
            // 保留原有的 matchCardInfo，只有新数据有 matchCardInfo 时才覆盖
            matchCardInfo: info.matchCardInfo ?? existingInfo?.matchCardInfo,
          },
        },
      };
    });
  },
  setUserInfoBatch: (infos) =>
    set((state) => ({
      userInfoMap: {
        ...state.userInfoMap,
        ...Object.fromEntries(
          infos
            .filter((info) => info.userId !== undefined)
            .map((info) => [
              info.userId,
              { ...info, matchCardInfo: info.matchCardInfo ?? state.userInfoMap[info.userId!]?.matchCardInfo },
            ]),
        ),
      },
    })),
  setMatchCardInfo: (userId, matchCardInfo) =>
    set((state) => {
      const existingInfo = state.userInfoMap[userId];
      if (!existingInfo) return state;
      return {
        userInfoMap: {
          ...state.userInfoMap,
          [userId]: { ...existingInfo, matchCardInfo },
        },
      };
    }),
  clearAll: () => set({ chatList: [], userInfoMap: {} }),
}));

```
