---
title: faceIdApi
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: faceIdApi.ts
---

# faceIdApi

```ts
/**
 * FaceID 相关 API — 通过后端代理调用旷视接口
 */

import {
  GetFaceIdTokenRequest,
  GetFaceIdTokenResponse,
  CheckFaceIdResultRequest,
  CheckFaceIdResultResponse,
} from "@heyhru/business-pwa-proto/gen/archat_api/user_api";

import httpClient from "./httpClient";
import { buildReturnUrl } from "@/utils/faceId";

/** Token 请求已知的错误类型 */
export type FaceIdTokenErrorType = "NO_FACE_FOUND" | "MULTIPLE_FACES" | "UNKNOWN";

/**
 * 获取 FaceID Token（通过后端代理）
 *
 * @param imageBase64 图片的 base64 编码（data:image/jpeg;base64,...）
 */
export async function requestFaceIdToken(imageBase64: string): Promise<GetFaceIdTokenResponse> {
  const request: GetFaceIdTokenRequest = {
    imageFile: imageBase64,
    returnUrl: buildReturnUrl(),
  };

  return await httpClient.requestPost2(GetFaceIdTokenRequest, request, GetFaceIdTokenResponse);
}

/**
 * 校验人脸验证结果（通过后端代理）
 *
 * @param bizId 从旷视回跳 URL 中解析的 biz_id
 */
export async function verifyFaceIdResult(bizId: string): Promise<CheckFaceIdResultResponse> {
  const request: CheckFaceIdResultRequest = {
    bizId,
  };

  return await httpClient.requestPost2(CheckFaceIdResultRequest, request, CheckFaceIdResultResponse);
}

```
