---
title: quotaErrorCallbacks
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: quotaErrorCallbacks.ts
---

# quotaErrorCallbacks

```ts
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import '../_version.js';

// Callbacks to be executed whenever there's a quota error.
// Can't change Function type right now.
// eslint-disable-next-line @typescript-eslint/ban-types
const quotaErrorCallbacks: Set<Function> = new Set();

export {quotaErrorCallbacks};

```
