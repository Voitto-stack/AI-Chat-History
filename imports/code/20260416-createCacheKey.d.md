---
title: createCacheKey.d
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: createCacheKey.d.ts
---

# createCacheKey.d

```ts
import { PrecacheEntry } from '../_types.js';
import '../_version.js';
interface CacheKey {
    cacheKey: string;
    url: string;
}
/**
 * Converts a manifest entry into a versioned URL suitable for precaching.
 *
 * @param {Object|string} entry
 * @return {string} A URL with versioning info.
 *
 * @private
 * @memberof workbox-precaching
 */
export declare function createCacheKey(entry: PrecacheEntry | string): CacheKey;
export {};

```
