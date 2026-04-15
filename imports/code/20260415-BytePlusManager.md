---
title: BytePlusManager
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: BytePlusManager.ts
---

# BytePlusManager

```ts
// BytePlus (火山引擎) 管理类
import type { BytePlusConfig, UserProfile } from "../types";
import { BytePlusConfig as DefaultConfig, GeneralConfig } from "../config";
import { getChannelParams } from "../utils/channel";

export class BytePlusManager {
  private static instance: BytePlusManager;
  private isInit = false;
  private headerInfo: UserProfile = {};
  private initRetryCount = 0;
  private readonly MAX_INIT_RETRIES = 50; // 最大重试 50 次（5 秒）

  private constructor() {}

  static getInstance(): BytePlusManager {
    if (!BytePlusManager.instance) {
      BytePlusManager.instance = new BytePlusManager();
    }
    return BytePlusManager.instance;
  }

  init(appId?: number, channel?: string, config?: Partial<BytePlusConfig>): void {
    if (this.isInit) {
      if (GeneralConfig.enableConsoleLog) {
        console.log("[BytePlus] Already initialized");
      }
      return;
    }

    if (typeof window.collectEvent !== "function") {
      if (this.initRetryCount >= this.MAX_INIT_RETRIES) {
        console.error("[BytePlus] SDK not loaded after maximum retries, giving up");
        return;
      }

      this.initRetryCount++;
      if (GeneralConfig.enableConsoleLog) {
        console.warn(
          `[BytePlus] SDK not loaded yet, delaying init (retry ${this.initRetryCount}/${this.MAX_INIT_RETRIES})`,
        );
      }
      setTimeout(() => this.init(appId, channel, config), 100);
      return;
    }

    // 使用配置文件中的默认值
    const finalAppId = appId ?? DefaultConfig.appId;
    const finalChannel = channel ?? DefaultConfig.channel;

    try {
      window.collectEvent("init", {
        app_id: finalAppId,
        channel: finalChannel,
        log: config?.log ?? DefaultConfig.log,
        spa: true,
        autotrack: config?.autotrack ?? DefaultConfig.autotrack,
        enable_stay_duration: config?.enableStayDuration ?? DefaultConfig.enableStayDuration,
        enable_ab_test: config?.enableAbTest ?? DefaultConfig.enableAbTest,
        enable_multilink: config?.enableMultilink ?? DefaultConfig.enableMultilink,
      });

      window.collectEvent("start", {});
      this.isInit = true;

      if (GeneralConfig.enableConsoleLog) {
        console.log(`[BytePlus] Initialized with app_id: ${finalAppId}, channel: ${finalChannel}`);
      }
    } catch (e) {
      console.error("[BytePlus] Init failed:", e);
    }
  }

  setUserId(userId: string): void {
    if (typeof window.collectEvent === "function") {
      window.collectEvent("config", { user_unique_id: userId });
      if (GeneralConfig.enableConsoleLog) {
        console.log("[BytePlus] User ID set:", userId);
      }
    } else {
      console.warn("[BytePlus] SDK not ready, cannot set user ID");
    }
  }

  trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
    // 自动附加渠道参数和用户画像
    const finalParams = {
      ...getChannelParams(),
      ...this.headerInfo,
      ...params,
    };

    if (typeof window.collectEvent === "function") {
      window.collectEvent(eventName, finalParams);
      if (GeneralConfig.enableConsoleLog) {
        console.log(`[BytePlus] Event: ${eventName}`, finalParams);
      }
    } else {
      console.warn("[BytePlus] SDK not ready, event dropped:", eventName);
    }
  }

  updateProfile(profile: Partial<UserProfile>): void {
    this.headerInfo = { ...this.headerInfo, ...profile };

    if (typeof window.collectEvent === "function") {
      window.collectEvent("profileSet", this.headerInfo);
      if (GeneralConfig.enableConsoleLog) {
        console.log("[BytePlus] Profile updated:", this.headerInfo);
      }
    } else {
      console.warn("[BytePlus] SDK not ready, profile update queued");
    }
  }

  getProfile(): UserProfile {
    return { ...this.headerInfo };
  }

  isInitialized(): boolean {
    return this.isInit;
  }
}

```
