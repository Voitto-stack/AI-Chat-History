---
title: removeIgnoredSearchParams.d
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: removeIgnoredSearchParams.d.ts
---

# removeIgnoredSearchParams.d

```ts
import '../_version.js';
/**
 * Removes any URL search parameters that should be ignored.
 *
 * @param {URL} urlObject The original URL.
 * @param {Array<RegExp>} ignoreURLParametersMatching RegExps to test against
 * each search parameter name. Matches mean that the search parameter should be
 * ignored.
 * @return {URL} The URL with any ignored search parameters removed.
 *
 * @private
 * @memberof workbox-precaching
 */
export declare function removeIgnoredSearchParams(urlObject: URL, ignoreURLParametersMatching?: RegExp[]): URL;

```
