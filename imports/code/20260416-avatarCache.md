---
title: avatarCache
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: avatarCache.ts
---

# avatarCache

```ts
// AI 头像本地缓存，避免弹窗每次都请求远程图片

import type { UserInfo } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";

const CACHE_KEY_PREFIX = "avatar_cache_";
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 天

interface CachedAvatar {
  dataUrl: string;
  timestamp: number;
  originalUrl: string;
}

/** 从缓存获取头像，未命中返回原始 URL */
export function getCachedAvatar(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const cached = localStorage.getItem(CACHE_KEY_PREFIX + hashCode(url));
    if (!cached) return url;
    const data: CachedAvatar = JSON.parse(cached);
    if (Date.now() - data.timestamp > CACHE_EXPIRY || data.originalUrl !== url) return url; // 过期或 URL 变了
    return data.dataUrl;
  } catch {
    return url;
  }
}

/** 登录后预加载 AI 头像到 localStorage */
export function preloadAvatarToCache(userInfo: UserInfo | undefined | null) {
  if (!userInfo) return;
  [userInfo.emojiAvatar, userInfo.emojiAvatarWork].forEach((url) => {
    if (!url) return;
    const key = CACHE_KEY_PREFIX + hashCode(url);
    const existing = localStorage.getItem(key);
    if (existing) {
      // 已缓存且 URL 未变，跳过
      try {
        if (JSON.parse(existing).originalUrl === url) return;
      } catch {
        /* continue */
      }
    }
    fetchAndCache(url, key);
  });
}

async function fetchAndCache(url: string, key: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    if (blob.size > 500 * 1024) return; // 超过 500KB 不缓存
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const data: CachedAvatar = { dataUrl: reader.result as string, timestamp: Date.now(), originalUrl: url };
        localStorage.setItem(key, JSON.stringify(data));
      } catch {
        /* localStorage 满了，忽略 */
      }
    };
    reader.readAsDataURL(blob);
  } catch {
    /* 网络失败，忽略 */
  }
}

function hashCode(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return String(Math.abs(hash));
}

```
