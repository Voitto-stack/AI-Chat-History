---
title: precacheAndRoute.d
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: precacheAndRoute.d.ts
---

# precacheAndRoute.d

```ts
import { PrecacheRouteOptions, PrecacheEntry } from './_types.js';
import './_version.js';
/**
 * This method will add entries to the precache list and add a route to
 * respond to fetch events.
 *
 * This is a convenience method that will call
 * {@link workbox-precaching.precache} and
 * {@link workbox-precaching.addRoute} in a single call.
 *
 * @param {Array<Object|string>} entries Array of entries to precache.
 * @param {Object} [options] See the
 * {@link workbox-precaching.PrecacheRoute} options.
 *
 * @memberof workbox-precaching
 */
declare function precacheAndRoute(entries: Array<PrecacheEntry | string>, options?: PrecacheRouteOptions): void;
export { precacheAndRoute };

```
