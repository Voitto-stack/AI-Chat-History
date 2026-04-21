---
date: 2026-04-21T09:45:56+08:00
source: clipboard
chars: 708
---

 Tasks:    40 successful, 40 total
Cached:    20 cached, 40 total
  Time:    5.5s 


> sitin-next@0.0.0 circular /Users/presence79/Desktop/WORK/sitin-next
> madge --circular --extensions ts --exclude 'app-pwa/|business-pwa-proto/' packages/

Processed 504 files (37.6s) (173 warnings)

✖ Found 2 circular dependencies!

1) app-minerva-server/src/services/guild/decision-executor.ts > app-minerva-server/src/services/guild/gateway-service.ts
2) app-minerva-server/src/services/guild/gateway-service.ts > app-minerva-server/src/services/guild/device-allocator.ts > app-minerva-server/src/services/guild/device-ws.ts

 ELIFECYCLE  Command failed with exit code 1.
husky - pre-commit script failed (code 1)
