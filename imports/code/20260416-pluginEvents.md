---
title: pluginEvents
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: pluginEvents.ts
---

# pluginEvents

```ts
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import '../_version.js';

export const enum pluginEvents {
  CACHE_DID_UPDATE = 'cacheDidUpdate',
  CACHE_KEY_WILL_BE_USED = 'cacheKeyWillBeUsed',
  CACHE_WILL_UPDATE = 'cacheWillUpdate',
  CACHED_RESPONSE_WILL_BE_USED = 'cachedResponseWillBeUsed',
  FETCH_DID_FAIL = 'fetchDidFail',
  FETCH_DID_SUCCEED = 'fetchDidSucceed',
  REQUEST_WILL_FETCH = 'requestWillFetch',
}

```
