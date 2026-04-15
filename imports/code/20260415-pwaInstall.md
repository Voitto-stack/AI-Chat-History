---
title: pwaInstall
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: pwaInstall.ts
---

# pwaInstall

```ts
/**
 * PWA 安装到桌面服务
 * 管理 beforeinstallprompt 事件和安装状态
 * APK 环境下不触发安装提示
 */

import { isApp } from "@/utils/bridge";

const TAG = "PwaInstall";

/** 安装状态枚举 */
export enum InstallState {
  Default = "default", // 初始状态
  Ready = "ready", // 可以安装
  Installing = "installing", // 安装中
  Installed = "installed", // 已安装
  UserCancel = "user_cancel", // 用户取消
  Timeout = "timeout", // 安装超时
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let currentState: InstallState = InstallState.Default;
let timeoutId: ReturnType<typeof setTimeout>;

const listeners = new Set<(state: InstallState) => void>();

// BeforeInstallPromptEvent 类型定义
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** 通知所有监听器状态变化 */
function setState(state: InstallState) {
  currentState = state;
  for (const listener of listeners) {
    listener(state);
  }
}

/**
 * 检测当前环境是否支持 PWA 安装
 */
export function isPwaSupported(): boolean {
  return "BeforeInstallPromptEvent" in window && localStorage.getItem("isSupportPWA") !== "0";
}

/**
 * 初始化 PWA 安装监听（APK 环境下跳过）
 */
export function initPwaInstall() {
  if (isApp()) return;

  // 监听安装提示事件
  window.addEventListener("beforeinstallprompt", (event: Event) => {
    event.preventDefault();
    deferredPrompt = event as BeforeInstallPromptEvent;
    setState(InstallState.Ready);
    console.log(TAG, "安装提示已就绪");
  });

  // 监听安装完成事件
  window.addEventListener("appinstalled", () => {
    console.log(TAG, "应用已安装");
    setState(InstallState.Installed);
    clearTimeout(timeoutId);
    deferredPrompt = null;
  });
}

/**
 * 触发安装提示
 * @returns {Promise<string>} 用户选择结果
 */
export async function triggerInstall(): Promise<string> {
  if (!deferredPrompt) {
    console.warn(TAG, "没有可用的安装提示");
    setState(InstallState.Default);
    return "";
  }

  try {
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;

    if (outcome === "accepted") {
      setState(InstallState.Installing);
      // 30 秒超时检测
      timeoutId = setTimeout(() => {
        setState(InstallState.Timeout);
      }, 30_000);
    } else {
      setState(InstallState.UserCancel);
    }

    return outcome;
  } catch (error) {
    if (error instanceof DOMException && error.name === "NotAllowedError") {
      console.warn(TAG, "安装提示需要用户手势触发");
      setState(InstallState.Default);
      return "error_no_gesture";
    }
    console.error(TAG, "触发安装失败:", error);
    setState(InstallState.Default);
    return "";
  }
}

/** 获取当前安装状态 */
export function getInstallState(): InstallState {
  return currentState;
}

/** 添加安装状态监听器 */
export function addInstallListener(callback: (state: InstallState) => void) {
  listeners.add(callback);
}

/** 移除安装状态监听器 */
export function removeInstallListener(callback: (state: InstallState) => void) {
  listeners.delete(callback);
}

```
