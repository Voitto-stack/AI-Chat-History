---
title: useGoogleAuth
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useGoogleAuth.ts
---

# useGoogleAuth

```ts
/**
 * Google OAuth 登录处理 Hook
 *
 * 功能概述：
 * - 自动检测并处理 OAuth 回调（通过 URL hash 中的 id_token）
 * - 统一的错误处理（通过 console.error 记录）
 * - 自动清理 URL hash 参数
 *
 * 注意事项：
 * - 使用 hasProcessed 防止重复处理同一个 OAuth 回调
 * - 使用 localStorage 标识防止页面重新加载后重复处理
 * - 只在成功时调用 onSuccess 回调
 */

import { useCallback, useEffect, useRef } from "react";
import { clearGoogleOAuthHash, getGoogleToken } from "@/utils/googleAuth";
import { login } from "@/http/api";
import { useUserStore } from "@/stores/userStore";
import { useLoading } from "@/hooks/useLoading";
import { FastLoginResponse } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { toast } from "@/utils/toast";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

const OAUTH_PROCESSING_TIMEOUT = 30000; // 30秒超时

interface UseGoogleAuthOptions {
  onSuccess?: () => void; // 成功回调
}

/**
 * Google OAuth 登录处理 hook
 * 处理 OAuth 回调和登录逻辑
 */
export const useGoogleAuth = (options?: UseGoogleAuthOptions) => {
  const onSuccess = options?.onSuccess;
  const hasProcessed = useRef(false);
  const { setToken, setUserInfo, setTimUsersig } = useUserStore();
  const { hideLoading } = useLoading();

  const handleOAuthCallback = useCallback(async () => {
    // 如果已处理，则跳过
    if (hasProcessed.current) return;

    // 检查是否有OAuth回调参数
    if (!window.location.hash || !window.location.hash.includes("id_token")) return;

    // 立即清除 hash，避免 React Router 警告
    const hashContent = window.location.hash;
    clearGoogleOAuthHash();

    // 检查 localStorage 中的处理标识
    const processingData = localStorage.getItem(STORAGE_KEYS.OAUTH_PROCESSING);
    if (processingData) {
      const { timestamp, hash } = JSON.parse(processingData);
      // 如果是同一个 hash 且在超时时间内，说明正在处理或已处理过
      if (hash === hashContent) {
        const now = Date.now();
        if (now - timestamp < OAUTH_PROCESSING_TIMEOUT) return;
      }
    }

    // 标记开始处理
    hasProcessed.current = true;
    localStorage.setItem(
      STORAGE_KEYS.OAUTH_PROCESSING,
      JSON.stringify({
        timestamp: Date.now(),
        hash: hashContent,
      }),
    );

    try {
      // 从保存的 hash 中提取参数并解析
      const params = new URLSearchParams(hashContent.substring(1));
      const idToken = params.get("id_token");
      const error = params.get("error");

      if (error) {
        console.error("Google OAuth error:", error);
        toast.error("Unable to sign in with Google. Please try again.");
        bpTrack(EventName.pwa_conv_google_login_fail, { error: error, success: false });
        return;
      }

      if (!idToken) {
        console.error("No id_token in OAuth callback");
        toast.error("Unable to sign in with Google. Please try again.");
        return;
      }

      // 解析 token 获取第三方用户ID和邮箱
      let thirdPartyUserId: string;
      let googleEmail: string | undefined;
      try {
        const user = getGoogleToken(idToken);
        thirdPartyUserId = user.id;
        googleEmail = user.email;
      } catch (error) {
        console.error("Failed to parse token:", error);
        toast.error("Unable to sign in with Google. Please try again.");
        bpTrack(EventName.pwa_login_failed, { error_reason: "parse_token_failed" });
        bpTrack(EventName.web_login_page_google_failed, { error_reason: "parse_token_failed" });
        return;
      }

      if (!thirdPartyUserId) {
        console.error("No thirdPartyUserId in parsed token");
        toast.error("Unable to sign in with Google. Please try again.");
        return;
      }

      // 登录
      const response: FastLoginResponse = await login(thirdPartyUserId, undefined, googleEmail);

      if (response.userInfo) {
        // 保存 token 和 userInfo
        const token = response.token || "";
        setToken(token);
        setUserInfo(response.userInfo);
        setTimUsersig(response.timUsersig);

        // 埋点：登录成功
        const mode = "login";
        bpTrack(EventName.pwa_login_success, {
          mode,
          user_id: response.userInfo.userId,
        });
        bpTrack(EventName.web_login_page_google_success, {
          mode,
          user_id: response.userInfo.userId,
        });
        bpTrack(EventName.pwa_conv_google_login_success, {
          mode,
          userId: response.userInfo.userId,
          success: true,
        }); // 转化埋点

        // 成功回调
        onSuccess?.();
      } else {
        console.error("No userInfo in response");
        toast.error("Login failed, please try again.");
        bpTrack(EventName.pwa_login_failed, { error_reason: "no_userinfo" });
        bpTrack(EventName.web_login_page_google_failed, { error_reason: "no_userinfo" });
      }
    } catch (error) {
      console.error("Google OAuth error:", error);
      toast.error("Login failed, please try again.");
      bpTrack(EventName.pwa_login_failed, {
        error_reason: error instanceof Error ? error.message : "unknown_error",
      });
      bpTrack(EventName.web_login_page_google_failed, {
        error_reason: error instanceof Error ? error.message : "unknown_error",
      });
    } finally {
      hideLoading();
      hasProcessed.current = false;
      // 清除 localStorage 标识
      localStorage.removeItem(STORAGE_KEYS.OAUTH_PROCESSING);
    }
  }, [setToken, setUserInfo, setTimUsersig, onSuccess, hideLoading]);

  // 自动处理OAuth回调
  useEffect(() => {
    handleOAuthCallback();
  }, [handleOAuthCallback]);
};

```
