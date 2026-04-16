---
title: resultingClientExists.d
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: resultingClientExists.d.ts
---

# resultingClientExists.d

```ts
import '../_version.js';
/**
 * Returns a promise that resolves to a window client matching the passed
 * `resultingClientId`. For browsers that don't support `resultingClientId`
 * or if waiting for the resulting client to apper takes too long, resolve to
 * `undefined`.
 *
 * @param {string} [resultingClientId]
 * @return {Promise<Client|undefined>}
 * @private
 */
export declare function resultingClientExists(resultingClientId?: string): Promise<Client | undefined>;

```
