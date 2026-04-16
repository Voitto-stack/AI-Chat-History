---
title: clientsClaim
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: clientsClaim.ts
---

# clientsClaim

```ts
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import './_version.js';

// Give TypeScript the correct global.
declare let self: ServiceWorkerGlobalScope;

/**
 * Claim any currently available clients once the service worker
 * becomes active. This is normally used in conjunction with `skipWaiting()`.
 *
 * @memberof workbox-core
 */
function clientsClaim(): void {
  self.addEventListener('activate', () => self.clients.claim());
}

export {clientsClaim};

```
