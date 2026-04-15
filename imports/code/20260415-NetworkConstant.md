---
title: NetworkConstant
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: NetworkConstant.ts
---

# NetworkConstant

```ts
/**
 * 网络常量
 */
export const NetworkConstants = {
  REQUEST_TIMEOUT: 45000,
  MAX_RETRIES: 3,

  WS_HOST: `${import.meta.env.VITE_WS_HOST || ""}`,
} as const;

```
