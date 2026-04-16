---
title: useEarningUser
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useEarningUser.ts
---

# useEarningUser

```ts
import { useEarningUserStore } from "@/stores/earningUserStore";

/**
 * Earning 页面用户信息缓存 Hook
 * 用于避免重复请求同一用户的信息
 */
export function useEarningUser() {
  const userInfoMap = useEarningUserStore((state) => state.userInfoMap);
  const setUserInfo = useEarningUserStore((state) => state.setUserInfo);
  const setUserInfoBatch = useEarningUserStore((state) => state.setUserInfoBatch);
  const getUserInfo = useEarningUserStore((state) => state.getUserInfo);
  const clear = useEarningUserStore((state) => state.clear);

  return {
    userInfoMap,
    setUserInfo,
    setUserInfoBatch,
    getUserInfo,
    clear,
  };
}

```
