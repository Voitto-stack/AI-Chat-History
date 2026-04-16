---
title: downloadUtils
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: downloadUtils.ts
---

# downloadUtils

```ts
/**
 * 下载 APK 文件（简单方式）
 */
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

export function downloadApk(url: string, fileName = "app.apk"): void {
  // 埋点：APK 下载完成
  bpTrack(EventName.ad_ApkDownloadComplete, {
    file_name: fileName,
    download_url: url,
  });

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

```
