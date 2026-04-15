---
title: useFirebaseMessaging
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useFirebaseMessaging.ts
---

# useFirebaseMessaging

```ts
/**
 * Firebase 消息推送初始化
 * 在 initUser 中调用，切换用户时自动重新上传 Token
 * 仅在 H5 环境下生效，APK 环境跳过
 */

import { initFirebase, fetchFcmToken } from "@/services/firebase";
import { checkNotificationPermission } from "@/utils/permissions";
import { isApp } from "@/utils/bridge";

const TAG = "FirebaseMessaging";

const MAX_RETRIES = 3; // 最大重试次数
const RETRY_DELAY = 5000; // 重试间隔（毫秒）

/**
 * 初始化 Firebase 推送并上传 FCM Token
 * 可直接在 initUser 中调用
 */
export async function setupFirebaseMessaging(): Promise<void> {
  if (isApp()) return;

  // 1. 初始化 Firebase（内部有防重复）
  const ok = await initFirebase();
  if (!ok) return;

  // 2. 请求通知权限
  const permission = await checkNotificationPermission();
  if (permission !== "granted") {
    console.log(TAG, "通知权限未授予:", permission);
    return;
  }

  // 3. 获取 FCM Token 并上传（带重试）
  for (let i = 0; i < MAX_RETRIES; i++) {
    const token = await fetchFcmToken();
    if (token) {
      console.log(TAG, "FCM Token 获取成功");
      return;
    }
    console.warn(TAG, `FCM Token 获取失败，第 ${i + 1} 次重试...`);
    await new Promise((r) => setTimeout(r, RETRY_DELAY));
  }
  console.error(TAG, "FCM Token 获取失败，已达最大重试次数");
}

```
