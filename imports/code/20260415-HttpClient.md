---
title: httpClient
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: httpClient.ts
---

# httpClient

```ts
import * as Sentry from "@sentry/react";
import { HttpClient, MonitorAdapter } from "@sitin/http-client";
import protoMap from "@sitin/api-proto/gen/protoIdMapping.json";
import { STORAGE_KEYS, clearUserLocalStorage } from "@/constants/storageKeys";
// eslint-disable-next-line no-restricted-imports -- 非 React 组件，需要用 getState() 静态访问
import { useUserStore } from "@/stores/userStore";

// Get API host from environment variable
const API_HOST = import.meta.env.VITE_API_BASE_URL || "/api";

// Sentry 监控适配器
const sentryMonitor: MonitorAdapter = {
  getUserInfo() {
    const userInfo = useUserStore.getState().userInfo;
    return {
      userId: userInfo?.userId || "not_logged_in",
      username: userInfo?.username,
    };
  },

  reportSlowApi(params) {
    Sentry.captureMessage("Slow API Request Detected", {
      level: "warning",
      tags: {
        error_type: "slow_api",
        request_name: params.requestName,
        proto_id: String(params.protoId),
        user_id: String(params.userId),
        duration_ms: params.duration,
      },
      contexts: {
        slow_api: {
          request_name: params.requestName,
          proto_id: params.protoId,
          request_time: params.requestTime,
          request_timestamp: params.requestTimestamp,
          duration_ms: params.duration,
          duration_seconds: (params.duration / 1000).toFixed(2),
          user_id: params.userId,
          username: params.username,
          request_params: params.requestParams,
        },
      },
    });
  },

  reportApiError(params) {
    Sentry.captureException(params.error, {
      tags: {
        error_type: "api_error",
        api_error: true,
        request_url: params.requestUrl,
        request_method: params.requestMethod,
        status_code: params.statusCode,
        proto_id: String(params.protoId),
        request_name: params.requestName,
        user_id: String(params.userId),
      },
      contexts: {
        api_request: {
          url: params.requestUrl,
          method: params.requestMethod,
          status_code: params.statusCode,
          error_message: params.error.message,
          proto_id: params.protoId,
          request_name: params.requestName,
          request_time: params.requestTime,
          request_timestamp: params.requestTimestamp,
          duration_ms: params.duration,
          user_id: params.userId,
          username: params.username,
          request_params: params.requestParams,
          response_data: params.responseData,
        },
      },
      fingerprint: ["api-error", params.requestName || params.requestUrl, String(params.statusCode)],
    });
  },

  reportBusinessError(params) {
    Sentry.captureMessage("Business Code Failure", {
      level: "warning",
      tags: {
        error_type: "business_error",
        business_code: params.businessCode,
        request_name: params.requestName,
        proto_id: String(params.protoId),
        user_id: String(params.userId),
      },
      contexts: {
        business_error: {
          business_code: params.businessCode,
          request_name: params.requestName,
          proto_id: params.protoId,
          user_id: params.userId,
          username: params.username,
          request_params: params.requestParams,
          error_message: params.errorMessage,
          response_data: params.responseData,
        },
      },
    });
  },
};

// Initialize HTTP client
export const httpClient = new HttpClient({
  apiHost: API_HOST,
  protoMap,
  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.HAVEN_TOKEN) || "";
  },
  getOs: () => "web",
  getAppName: () => "haven_pwa",
  getLocale: () => navigator.language || "en-US",
  getAppVersion: () => import.meta.env.VITE_APP_VERSION || "1.0.0",
  on401Error: async () => {
    clearUserLocalStorage();
    window.location.href = "/onboarding";
  },
  noLoginPaths: ["/onboarding"],
  timeout: 45000,
  slowApiThreshold: 5000,
  monitorAdapter: sentryMonitor,
});

export default httpClient;

```
