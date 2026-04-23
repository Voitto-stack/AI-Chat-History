---
date: 2026-04-23T10:18:04+08:00
source: clipboard
chars: 1172
---

/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/utils/redis.ts:217
  if (!url) throw new Error("REDIS_WRITE_URL is not set");
                  ^

Error: REDIS_WRITE_URL is not set
    at createBullMQRedis (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/utils/redis.ts:217:19)
    at startGuildWorker (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/guild-worker.ts:50:19)
    at Router (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/guild/index.ts:32:1)
    at Object.<anonymous> (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/guild/index.ts:77:86)
    at Module._compile (node:internal/modules/cjs/loader:1831:14)
    at Object.transformer (/Users/presence79/Desktop/WORK/sitin-next/node_modules/tsx/dist/register-D46fvsV_.cjs:3:1104)
    at Module.load (node:internal/modules/cjs/loader:1552:32)
    at Module._load (node:internal/modules/cjs/loader:1354:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.require (node:internal/modules/cjs/loader:1575:12)

Node.js v25.8.0

