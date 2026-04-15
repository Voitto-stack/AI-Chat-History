---
title: globalBridge
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: globalBridge.ts
---

# globalBridge

```ts
/**
 * APK → PWA WebView 登录态注入
 *
 * APK 在 onPageFinished 后执行:
 *   window.reloadUser(userId, timSig, token)
 * 将登录信息注入 PWA，触发正常的登录初始化流程。
 */

import { getUserStoreState } from "@/hooks/useUser";
import { fetchUserInfo } from "@/http/api";

declare global {
  interface Window {
    reloadUser?: (userId: number | string, timSig: string, token: string) => Promise<boolean>;
  }
}

window.reloadUser = async (userId: number | string, timSig: string, token: string): Promise<boolean> => {
  const store = getUserStoreState();

  // 如果已登录则跳过
  if (store.token && store.userInfo?.userId) {
    return true;
  }

  try {
    // 写入 token 和 timUsersig（会自动持久化到 localStorage）
    store.setToken(token);
    store.setTimUsersig(timSig);

    // 通过 token 从服务端获取用户信息
    const response = await fetchUserInfo();
    if (response?.uerInfo) {
      store.setUserInfo(response.uerInfo);
      // userState 会自动变为 FullRegister/SimpleRegister
      // App.tsx 中的 useEffect 监听到 userId 变化后会走 initUser 流程
    }

    return true;
  } catch (error) {
    console.error("[reloadUser] Failed:", error);
    return false;
  }
};

```
