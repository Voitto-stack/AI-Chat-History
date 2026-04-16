---
title: appsflyer
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: appsflyer.ts
---

# appsflyer

```ts
// AppsFlyer Web SDK 追踪
// https://dev.appsflyer.com/hc/docs/web-sdk

/**
 * AppsFlyer 上报
 * @param eventName 事件名称
 * @param params 事件参数
 */
export async function afTrack(eventName: string, params: Record<string, unknown> = {}): Promise<void> {
  try {
    if (typeof window.AF === "function") {
      window.AF("pba", "event", {
        eventType: "EVENT",
        eventName: eventName,
        eventValue: params,
      });
      console.log(`[AppsFlyer] Event: ${eventName}`, params);
    } else {
      console.warn("[AppsFlyer] SDK not loaded, event dropped:", eventName);
    }
  } catch (e) {
    console.error("[AppsFlyer] Track error:", e);
  }
}

/**
 * 检查 AppsFlyer 是否已加载
 */
export function isAppsFlyerLoaded(): boolean {
  return typeof window.AF === "function";
}

```
