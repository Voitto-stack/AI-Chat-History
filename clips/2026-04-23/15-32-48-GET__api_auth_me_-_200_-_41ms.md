---
date: 2026-04-23T15:32:48+08:00
source: clipboard
chars: 1589
---

GET /api/auth/me - 200 - 41ms
[auth] permission cache HIT: minerva:perms:Super Admin (36 permissions)
[GET /withdrawals] Proto 4776 (R-Score) failed, degrading to null: AppError: Proto Gateway login error: fetch failed
    at AppError.badGateway (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/utils/AppError.ts:52:12)
    at login (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/proto-gateway.ts:72:20)
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    at async protoPost (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/proto-gateway.ts:111:17)
    at async <anonymous> (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/routes/transactions/transactions.ts:94:28)
    at async <anonymous> (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/middlewares/auth.ts:187:5)
    at async authMiddleware (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/middlewares/auth.ts:49:5)
    at async requestLogger (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/middlewares/requestLogger.ts:6:3)
    at async errorHandler (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/middlewares/errorHandler.ts:7:5)
    at async cors (/Users/presence79/Desktop/WORK/sitin-next/node_modules/@koa/cors/index.js:109:16) {
  statusCode: 502,
  code: 'BAD_GATEWAY',
  isOperational: true
}
GET /api/transactions/withdrawals?page=1&pageSize=12 - 200 - 10825ms

