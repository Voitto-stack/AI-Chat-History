---
title: getFriendlyURL
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: getFriendlyURL.ts
---

# getFriendlyURL

```ts
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import '../_version.js';

const getFriendlyURL = (url: URL | string): string => {
  const urlObj = new URL(String(url), location.href);
  // See https://github.com/GoogleChrome/workbox/issues/2323
  // We want to include everything, except for the origin if it's same-origin.
  return urlObj.href.replace(new RegExp(`^${location.origin}`), '');
};

export {getFriendlyURL};

```
