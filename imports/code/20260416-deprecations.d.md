---
title: deprecations.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: deprecations.d.ts
---

# deprecations.d

```ts
import type { FutureConfig as RouterFutureConfig } from "@remix-run/router";
import type { FutureConfig as RenderFutureConfig } from "./components";
export declare function warnOnce(key: string, message: string): void;
export declare function logV6DeprecationWarnings(renderFuture: Partial<RenderFutureConfig> | undefined, routerFuture?: Omit<RouterFutureConfig, "v7_prependBasename">): void;

```
