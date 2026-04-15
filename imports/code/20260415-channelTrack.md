---
title: channelTrack
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: channelTrack.ts
---

# channelTrack

```ts
// 统一广告追踪 API
import { BytePlusManager } from "../managers/BytePlusManager";
import { getAdChannel } from "../utils/channel";
import type { AdTrackOptions } from "../types";
import { fbTrack } from "./facebook";
import { ttTrack } from "./tiktok";
import { afTrack } from "./appsflyer";

/**
 * BytePlus 广告事件上报（自动添加渠道信息）
 * @param eventName 事件名称
 * @param trackConfig 追踪配置
 */
export async function adBytePlusTrack(eventName: string, trackConfig: Record<string, unknown> = {}): Promise<void> {
  const channel = getAdChannel() || "None";
  const finalEventName = `ad_${eventName}`;
  const params = { channel, ...trackConfig };

  BytePlusManager.getInstance().trackEvent(finalEventName, params);
}

/**
 * 统一广告追踪（根据渠道自动选择平台）
 * @param eventName 事件名称
 * @param options 追踪选项
 */
export async function adTrack(eventName: string, options: AdTrackOptions = {}): Promise<void> {
  const channel = getAdChannel();

  try {
    // 根据渠道选择追踪平台
    if (channel === "tt") {
      await ttTrack(eventName, options.trackConfig);
    } else if (channel === "fb") {
      await fbTrack(eventName, options.trackConfig);
    } else if (channel === "af") {
      await afTrack(eventName, options.trackConfig);
    }

    // BytePlus 总是追踪
    await adBytePlusTrack(eventName, options.trackConfig);

    console.log(`[AdTrack] Event: ${eventName}, Channel: ${channel || "None"}`);
  } catch (e) {
    console.error("[AdTrack] Error:", e);
  }
}

// 重新导出各平台追踪函数
export { fbTrack } from "./facebook";
export { ttTrack } from "./tiktok";
export { afTrack } from "./appsflyer";
export { gtagTrack } from "./gtag";

```
