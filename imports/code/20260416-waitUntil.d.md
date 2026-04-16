---
title: waitUntil.d
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: waitUntil.d.ts
---

# waitUntil.d

```ts
import '../_version.js';
/**
 * A utility method that makes it easier to use `event.waitUntil` with
 * async functions and return the result.
 *
 * @param {ExtendableEvent} event
 * @param {Function} asyncFn
 * @return {Function}
 * @private
 */
declare function waitUntil(event: ExtendableEvent, asyncFn: () => Promise<any>): Promise<any>;
export { waitUntil };

```
