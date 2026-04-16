---
title: canConstructReadableStream.d
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: canConstructReadableStream.d.ts
---

# canConstructReadableStream.d

```ts
import '../_version.js';
/**
 * A utility function that determines whether the current browser supports
 * constructing a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/ReadableStream)
 * object.
 *
 * @return {boolean} `true`, if the current browser can successfully
 *     construct a `ReadableStream`, `false` otherwise.
 *
 * @private
 */
declare function canConstructReadableStream(): boolean;
export { canConstructReadableStream };

```
