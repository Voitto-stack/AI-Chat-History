---
title: postStore
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: postStore.ts
---

# postStore

```ts
/**
 * 帖子状态管理
 */

import { create } from "zustand";
import { Post } from "@heyhru/business-pwa-proto/gen/archat_api/post_api";

interface PostState {
  myPosts: Post[];
  cursor: number;
  hasMore: boolean;
  isLoading: boolean;

  setPosts: (posts: Post[], options?: { cursor?: number; hasMore?: boolean }) => void;
  appendPosts: (posts: Post[], options?: { cursor?: number; hasMore?: boolean }) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const INITIAL_STATE = {
  myPosts: [] as Post[],
  cursor: 0,
  hasMore: true,
  isLoading: false,
};

export const usePostStore = create<PostState>((set) => ({
  ...INITIAL_STATE,

  setPosts: (posts, options) => {
    set({
      myPosts: posts,
      cursor: options?.cursor ?? 0,
      hasMore: options?.hasMore ?? posts.length > 0,
    });
  },

  appendPosts: (posts, options) => {
    set((state) => ({
      myPosts: [...state.myPosts, ...posts],
      cursor: options?.cursor ?? state.cursor,
      hasMore: options?.hasMore ?? posts.length > 0,
    }));
  },

  setLoading: (isLoading) => set({ isLoading }),
  reset: () => set(INITIAL_STATE),
}));

```
