---
title: callReturnPath
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: callReturnPath.ts
---

# callReturnPath

```ts
/**
 * 通话前页面路径记录
 * 通话开始前保存当前路径，通话结束后返回该路径
 */

let returnPath = "/live";

export function saveReturnPath() {
  const path = window.location.pathname + window.location.search;
  // 不保存通话页面自身作为返回路径
  if (!["/mock-call", "/video-call", "/audio-call"].includes(window.location.pathname)) {
    returnPath = path;
  }
}

export function getReturnPath(): string {
  return returnPath;
}

```
