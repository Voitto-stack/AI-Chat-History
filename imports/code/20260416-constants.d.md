---
title: constants.d
date: 2026-04-16T11:07:54+08:00
source: import
language: ts
original: constants.d.ts
---

# constants.d

```ts
import '../_version.js';
export type HTTPMethod = 'DELETE' | 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT';
/**
 * The default HTTP method, 'GET', used when there's no specific method
 * configured for a route.
 *
 * @type {string}
 *
 * @private
 */
export declare const defaultMethod: HTTPMethod;
/**
 * The list of valid HTTP methods associated with requests that could be routed.
 *
 * @type {Array<string>}
 *
 * @private
 */
export declare const validMethods: HTTPMethod[];

```
