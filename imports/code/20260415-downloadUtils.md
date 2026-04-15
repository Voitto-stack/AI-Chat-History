---
title: downloadUtils
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: downloadUtils.ts
---

# downloadUtils

```ts
/**
 * 下载 APK 文件（简单方式）
 */
export function downloadApk(url: string, fileName = "app.apk"): void {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

```
