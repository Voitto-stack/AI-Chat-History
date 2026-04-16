---
title: regionGuard
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: regionGuard.ts
---

# regionGuard

```ts
/**
 * 地区守卫 — 中文语言或中国时区用户跳转官网
 * 仅生产环境生效，测试/开发环境不跳转
 */

import { isApp } from "@/utils/bridge";

const OFFICIAL_WEBSITE_URL = "https://gracechat.com";

/**
 * 检测是否应跳转到官网
 * 条件：生产环境 + 非 APK + (浏览器语言为中文 或 时区为中国)
 */
function shouldRedirectToOfficialSite(): boolean {
  if (import.meta.env.MODE !== "production") return false;
  if (isApp()) return false;

  // 检测浏览器语言
  const lang = (navigator.language || "").toLowerCase();
  const isChinese = lang.startsWith("zh");

  // 检测时区
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const isChinaTz = tz === "Asia/Shanghai" || tz === "Asia/Chongqing";

  return isChinese || isChinaTz;
}

/**
 * 中国地区用户跳转官网，命中则跳转并阻止后续渲染
 */
export function redirectIfChina(): boolean {
  if (shouldRedirectToOfficialSite()) {
    window.location.replace(OFFICIAL_WEBSITE_URL);
    return true;
  }
  return false;
}

```
