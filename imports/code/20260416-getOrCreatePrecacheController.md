---
title: getOrCreatePrecacheController
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: getOrCreatePrecacheController.ts
---

# getOrCreatePrecacheController

```ts
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {PrecacheController} from '../PrecacheController.js';
import '../_version.js';

let precacheController: PrecacheController | undefined;

/**
 * @return {PrecacheController}
 * @private
 */
export const getOrCreatePrecacheController = (): PrecacheController => {
  if (!precacheController) {
    precacheController = new PrecacheController();
  }
  return precacheController;
};

```
