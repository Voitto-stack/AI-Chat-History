---
title: addPlugins.d
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: addPlugins.d.ts
---

# addPlugins.d

```ts
import { WorkboxPlugin } from 'workbox-core/types.js';
import './_version.js';
/**
 * Adds plugins to the precaching strategy.
 *
 * @param {Array<Object>} plugins
 *
 * @memberof workbox-precaching
 */
declare function addPlugins(plugins: WorkboxPlugin[]): void;
export { addPlugins };

```
