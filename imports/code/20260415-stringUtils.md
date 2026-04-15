---
title: stringUtils
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: stringUtils.ts
---

# stringUtils

```ts
/**
 * 从 URL 中提取文件名（去掉路径和扩展名）
 * @param url 文件 URL
 * @returns 文件名（不含扩展名）
 */
export function extractFileName(url?: string): string {
  if (!url) return "";
  const cleanUrl = url.split(/[?#]/)[0];
  const filename = cleanUrl.split("/").pop() ?? "";
  return filename.split(".").slice(0, -1).join(".");
}

```
