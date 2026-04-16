---
title: clientsClaim.d
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: clientsClaim.d.ts
---

# clientsClaim.d

```ts
import './_version.js';
/**
 * Claim any currently available clients once the service worker
 * becomes active. This is normally used in conjunction with `skipWaiting()`.
 *
 * @memberof workbox-core
 */
declare function clientsClaim(): void;
export { clientsClaim };

```
