---
title: requestLogger
date: 2026-04-15T17:04:52+08:00
source: import
language: ts
original: requestLogger.ts
---

# requestLogger

```ts
import type { Context, Next } from 'koa';

export async function requestLogger(ctx: Context, next: Next) {
  const start = Date.now();

  await next();

  const ms = Date.now() - start;
  const status = ctx.status;

  // Color based on status code
  let statusColor = '\x1b[32m'; // green
  if (status >= 400) statusColor = '\x1b[33m'; // yellow
  if (status >= 500) statusColor = '\x1b[31m'; // red

  console.log(
    `${statusColor}${ctx.method}\x1b[0m ${ctx.url} - ${status} - ${ms}ms`
  );
}

```
