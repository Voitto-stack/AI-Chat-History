---
title: userCloudStorage
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: userCloudStorage.ts
---

# userCloudStorage

```ts
/**
 * 用户云存储服务
 * 用于跨设备同步用户数据
 * 重要：存储键必须与老项目保持一致，确保老用户数据不丢失
 */

import {
  QueryUserMiscRequest,
  QueryUserMiscResponse,
  StoreUserMiscRequest,
  StoreUserMiscResponse,
  UserServiceCommonCode,
} from "@sitin/api-proto/gen/archat_api/user_api";
import httpClient from "@/http/httpClient";

/** 用户云存储键枚举 */
export enum UserCloudKey {
  CashoutStage = "CashoutStage", // 当前提现阶段
  CashoutSuccessStage = "CashoutSuccessStage", // 已成功提现的阶段
  VideoCallTime = "video_call_time", // 视频通话累计时长（秒）
  CustomTasksState = "CustomTasksState", // 自定义任务状态（跨设备同步）
  PayPalOAuthStatus = "PayPalOAuthStatus", // PayPal OAuth 验证状态（跨设备同步）
  InsModalLastShown = "InsModalLastShown", // INS 授权弹窗上次展示时间
  InsExchangedUsers = "InsExchangedUsers", // 已发过INS交换请求的用户ID列表
}

/** 用户云存储管理类 */
export class UserCloudStorage {
  /**
   * 获取单个值
   * @param key 存储键
   */
  static async getValue(key: UserCloudKey): Promise<string | undefined> {
    const req: QueryUserMiscRequest = {
      keys: [key.toString()],
    };

    try {
      const response: QueryUserMiscResponse = await httpClient.requestPost2(
        QueryUserMiscRequest,
        req,
        QueryUserMiscResponse,
      );

      if (response?.code === UserServiceCommonCode.Success) {
        const parsed = JSON.parse(response.misc ?? "{}");
        return Object.entries(parsed)[0]?.[1] as string | undefined;
      }
      return undefined;
    } catch (e) {
      console.error(`[UserCloudStorage] Error fetching value for key ${key}:`, e);
      return undefined;
    }
  }

  /**
   * 设置单个值
   * @param key 存储键
   * @param value 存储值
   */
  static async setValue(key: UserCloudKey, value: string): Promise<boolean> {
    const req: StoreUserMiscRequest = {
      keys: [key.toString()],
      values: [value],
    };

    try {
      const response: StoreUserMiscResponse = await httpClient.requestPost2(
        StoreUserMiscRequest,
        req,
        StoreUserMiscResponse,
      );
      return response?.code === UserServiceCommonCode.Success;
    } catch (e) {
      console.error(`[UserCloudStorage] Error storing value for key ${key}:`, e);
      return false;
    }
  }

  /**
   * 批量获取值
   * @param keys 存储键数组
   */
  static async getValues(keys: UserCloudKey[]): Promise<Record<UserCloudKey, string> | undefined> {
    if (keys.length === 0) return undefined;

    const req: QueryUserMiscRequest = {
      keys: keys.map((k) => k.toString()),
    };

    try {
      const response: QueryUserMiscResponse = await httpClient.requestPost2(
        QueryUserMiscRequest,
        req,
        QueryUserMiscResponse,
      );

      if (response?.code === UserServiceCommonCode.Success) {
        return JSON.parse(response.misc ?? "{}");
      }
      return undefined;
    } catch (e) {
      console.error("[UserCloudStorage] Error fetching multiple values:", e);
      return undefined;
    }
  }
}

```
