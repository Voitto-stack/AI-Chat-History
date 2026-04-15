---
title: cashoutPaypal
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: cashoutPaypal.ts
---

# cashoutPaypal

```ts
/**
 * PayPal OAuth 登录工具
 */

import { getPaypalUserInfo } from "@/http/userApi";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { UserCloudStorage, UserCloudKey } from "@/services/userCloudStorage";

const isProd = import.meta.env.MODE === "production";

const prodClientId = "ATdvsNyAfsaHbFYCDzD7wx0ScX7ViaLG2Pgysn8LxZf2llt6USzuJgUFCOwF6nX-eEYjaARF4DPTgEHL";
const sandboxClientId = "Af3VKoOJrxv9LLvHlOfumjUSXOGxJXegWEJlD4m2X0GkiTwbu7uUt5MSij7vzV1BE4iRNGFigZSAZW90";

const clientId = isProd ? prodClientId : sandboxClientId;
const loginUrl = isProd ? "www.paypal.com" : "www.sandbox.paypal.com";

function getRedirectUri(): string {
  const { protocol, host } = window.location;
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return "http://127.0.0.1:3000/paypalresult";
  }
  return `${protocol}//${host}/paypalresult`;
}

const paypalReturnUrl = getRedirectUri();

export interface PayPalUserInfo {
  email: string;
  rawJsonData: string;
  address: {
    country?: string;
  };
}

/**
 * 跳转到 PayPal OAuth 登录
 * 会自动标记为待继续的提现流程，OAuth 完成后将自动恢复
 */
export function redirectToPayPalLogin(): void {
  localStorage.setItem(STORAGE_KEYS.PAYPAL_OAUTH_HISTORY_LENGTH, window.history.length.toString());

  // 设置标记，表示有待继续的提现流程
  localStorage.setItem(STORAGE_KEYS.CASHOUT_FLOW_PENDING, "true");

  const encodedClientId = encodeURIComponent(clientId);
  const redirectUri = encodeURIComponent(paypalReturnUrl);
  const scope = "openid profile email address";

  window.location.href = `https://${loginUrl}/signin/authorize?flowEntry=static&client_id=${encodedClientId}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}`;
}

export async function fetchPayPalUserInfo(): Promise<PayPalUserInfo | null> {
  const authorizationCode = new URLSearchParams(window.location.search).get("code");

  if (!authorizationCode) {
    return null;
  }

  try {
    const response = await getPaypalUserInfo({
      authorizationCode,
      redirectUri: paypalReturnUrl,
    });

    if (!response.paypalUserInfo?.email) {
      console.error("PayPal: No user info returned");
      return null;
    }

    return {
      email: response.paypalUserInfo.email,
      rawJsonData: response.paypalUserInfo.rawJsonData || "",
      address: {
        country: response.paypalUserInfo.address?.country || "",
      },
    };
  } catch (error) {
    console.error("PayPal: Error fetching user info:", error);
    return null;
  }
}

export enum PayPalAuthStatus {
  None = 0,
  Success = 1,
  Confirmed = 2,
  Failed = -1,
  Error = -2,
}

/**
 * 获取 PayPal OAuth 验证状态（从云端）
 */
export async function getPayPalAuthStatus(): Promise<PayPalAuthStatus> {
  try {
    const status = await UserCloudStorage.getValue(UserCloudKey.PayPalOAuthStatus);
    return status ? Number(status) : PayPalAuthStatus.None;
  } catch (error) {
    console.error("[PayPal] Error fetching OAuth status:", error);
    return PayPalAuthStatus.None;
  }
}

/**
 * 设置 PayPal OAuth 验证状态（保存到云端）
 */
export async function setPayPalAuthStatus(status: PayPalAuthStatus): Promise<void> {
  try {
    await UserCloudStorage.setValue(UserCloudKey.PayPalOAuthStatus, status.toString());
  } catch (error) {
    console.error("[PayPal] Error saving OAuth status:", error);
  }
}

/**
 * 清除 PayPal OAuth 验证状态
 */
export async function clearPayPalAuthStatus(): Promise<void> {
  try {
    await UserCloudStorage.setValue(UserCloudKey.PayPalOAuthStatus, PayPalAuthStatus.None.toString());
    localStorage.removeItem(STORAGE_KEYS.PAYPAL_OAUTH_HISTORY_LENGTH);
    localStorage.removeItem(STORAGE_KEYS.CASHOUT_FLOW_PENDING);
  } catch (error) {
    console.error("[PayPal] Error clearing OAuth status:", error);
  }
}

```
