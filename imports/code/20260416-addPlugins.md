---
title: addPlugins
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: addPlugins.ts
---

# addPlugins

```ts
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {WorkboxPlugin} from 'workbox-core/types.js';
import {getOrCreatePrecacheController} from './utils/getOrCreatePrecacheController.js';
import './_version.js';

/**
 * Adds plugins to the precaching strategy.
 *
 * @param {Array<Object>} plugins
 *
 * @memberof workbox-precaching
 */
function addPlugins(plugins: WorkboxPlugin[]): void {
  const precacheController = getOrCreatePrecacheController();
  precacheController.strategy.plugins.push(...plugins);
}

export {addPlugins};

```
