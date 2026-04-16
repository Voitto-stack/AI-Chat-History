---
title: README
date: 2026-04-16T11:07:55+08:00
source: import
original: README.md
---

# @heyhru/common-util-logger

Shared logger based on [pino](https://github.com/pinojs/pino), usable on both server and browser.

## Usage

```ts
import { createLogger } from "@heyhru/common-util-logger";

const logger = createLogger({ name: "my-service" });

logger.info("server started");
logger.error({ err }, "request failed");
logger.debug({ userId }, "user login");

// Child logger with bound context
const reqLogger = logger.child({ requestId: "abc-123" });
reqLogger.info("handling request");
```

## Options

| Option | Type   | Default                             | Description       |
| ------ | ------ | ----------------------------------- | ----------------- |
| name   | string | —                                   | Logger name       |
| level  | string | `debug` (dev) / `info` (production) | Minimum log level |

## Log Levels

| Level | Value | Usage                  |
| ----- | ----- | ---------------------- |
| fatal | 60    | Process about to crash |
| error | 50    | Runtime errors         |
| warn  | 40    | Warnings               |
| info  | 30    | General information    |
| debug | 20    | Debug details          |
| trace | 10    | Fine-grained tracing   |

## Environment Behavior

- **Development** (`NODE_ENV !== 'production'`): defaults to `debug` level, uses `pino-pretty` for colorized output (server only)
- **Production**: defaults to `info` level, outputs JSON to stdout
- **Browser**: uses `console` methods, no `pino-pretty`

