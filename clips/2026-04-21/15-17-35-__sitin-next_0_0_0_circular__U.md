---
date: 2026-04-21T15:17:35+08:00
source: clipboard
chars: 1108
---

> sitin-next@0.0.0 circular /Users/presence79/Desktop/WORK/sitin-next
> madge --circular --extensions ts --exclude 'app-pwa/|business-pwa-proto/|app-minerva-server/' packages/

Processed 487 files (38.3s) (176 warnings)

✖ Found 4 circular dependencies!

1) app-social-proxy-server/src/action/action.module.ts > app-social-proxy-server/src/gateway/gateway.module.ts > app-social-proxy-server/src/execution/execution.module.ts
2) app-social-proxy-server/src/gateway/gateway.module.ts > app-social-proxy-server/src/execution/execution.module.ts
3) app-social-proxy-server/src/action/action.module.ts > app-social-proxy-server/src/gateway/gateway.module.ts > app-social-proxy-server/src/execution/execution.module.ts > app-social-proxy-server/src/strategy-v2/strategy-v2.module.ts > app-social-proxy-server/src/strategy/strategy.module.ts
4) app-social-proxy-server/src/scheduler/scheduler.module.ts > app-social-proxy-server/src/kafka/kafka.module.ts

 ELIFECYCLE  Command failed with exit code 1.
husky - pre-commit script failed (code 1)
➜  sitin-next git:(feature/migrate-minerva-from-monorepo) ✗ 
