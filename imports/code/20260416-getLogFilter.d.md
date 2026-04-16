---
title: getLogFilter.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: getLogFilter.d.ts
---

# getLogFilter.d

```ts
import type { RollupLog } from './rollup';

export type GetLogFilter = typeof getLogFilter;

export function getLogFilter(filters: string[]): (log: RollupLog) => boolean;

```
