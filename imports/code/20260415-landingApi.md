---
title: landingApi
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: landingApi.ts
---

# landingApi

```ts
/** Landing page API - 获取邀请落地页数据 */

import {
  BffGetLandingInfoRequest,
  BffGetLandingInfoResponse,
  UserServiceCommonCode,
} from "@sitin/api-proto/gen/archat_api/user_api";
import httpClient from "./httpClient";

/**
 * 通过邀请码获取落地页信息
 * @param inviteCode - URL 参数中的邀请码
 * @returns 包含邀请者信息的响应，错误时返回 null
 */
export async function getBffLandingInfo(inviteCode: string): Promise<BffGetLandingInfoResponse | null> {
  try {
    const request: BffGetLandingInfoRequest = {
      inviteCode,
    };

    const response = await httpClient.requestPost2(BffGetLandingInfoRequest, request, BffGetLandingInfoResponse);

    return response?.code === UserServiceCommonCode.Success ? response : null;
  } catch (error) {
    console.warn("[Landing API] 获取落地页信息失败:", error);
    return null;
  }
}

```
