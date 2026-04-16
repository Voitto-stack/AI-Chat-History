---
title: onlineStatusApi
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: onlineStatusApi.ts
---

# onlineStatusApi

```ts
import httpClient from "./httpClient";
import {
  ChangeUserOnlineStatusRequest,
  ChangeUserOnlineStatusResponse,
  pwaStatus,
  UserServiceCommonCode,
} from "@heyhru/business-pwa-proto/gen/archat_api/user_api";

/**
 * 上报 PWA 在线状态（protoId 4438）
 * online 字段由 pwaStatus 推导（原版逻辑）：
 *   BUSY / BACKEND_ACTIVE / BACKEND_INACTIVE / OFFLINE → false
 *   其余 → true
 */
export async function reportOnlineStatus(status: pwaStatus): Promise<boolean> {
  const online =
    status !== pwaStatus.PWA_STATUS_FRONTEND_ONLINE_BUSY &&
    status !== pwaStatus.PWA_STATUS_BACKEND_ONLINE_ACTIVE &&
    status !== pwaStatus.PWA_STATUS_BACKEND_ONLINE_INACTIVE &&
    status !== pwaStatus.PWA_STATUS_OFFLINE;

  try {
    const response = await httpClient.requestPost2(
      ChangeUserOnlineStatusRequest,
      { online, pwaStatus: status },
      ChangeUserOnlineStatusResponse,
    );
    return response.code === UserServiceCommonCode.Success;
  } catch {
    return false;
  }
}

```
