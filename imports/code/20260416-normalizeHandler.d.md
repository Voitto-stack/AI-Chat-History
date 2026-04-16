---
title: normalizeHandler.d
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: normalizeHandler.d.ts
---

# normalizeHandler.d

```ts
import { RouteHandler, RouteHandlerObject } from 'workbox-core/types.js';
import '../_version.js';
/**
 * @param {function()|Object} handler Either a function, or an object with a
 * 'handle' method.
 * @return {Object} An object with a handle method.
 *
 * @private
 */
export declare const normalizeHandler: (handler: RouteHandler) => RouteHandlerObject;

```
