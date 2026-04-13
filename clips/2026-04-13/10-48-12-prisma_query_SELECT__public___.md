---
date: 2026-04-13T10:48:12+08:00
source: clipboard
chars: 2162
---

prisma:query SELECT "public"."admin_permissions"."id", "public"."admin_permissions"."key", "public"."admin_permissions"."description", "public"."admin_permissions"."created_at", "public"."admin_permissions"."updated_at" FROM "public"."admin_permissions" WHERE "public"."admin_permissions"."id" IN ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36) OFFSET $37
GET /api/auth/me - 200 - 2059ms
Unexpected Error: ReferenceError: PERM_CACHE_PREFIX is not defined
    at buildCacheKey (/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/middlewares/auth.ts:57:3)
    at resolvePermissions (/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/middlewares/auth.ts:72:20)
    at <anonymous> (/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/middlewares/auth.ts:166:35)
    at dispatch (/Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/koa-compose@4.1.0/node_modules/koa-compose/index.js:42:32)
    at authMiddleware (/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/middlewares/auth.ts:41:11)
    at dispatch (/Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/koa-compose@4.1.0/node_modules/koa-compose/index.js:42:32)
    at /Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/@koa+router@13.1.1/node_modules/@koa/router/lib/router.js:260:18
    at dispatch (/Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/koa-compose@4.1.0/node_modules/koa-compose/index.js:42:32)
    at /Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/koa-compose@4.1.0/node_modules/koa-compose/index.js:34:12
    at dispatch (/Users/presence79/Desktop/WORK/sitin-monorepo/node_modules/.pnpm/@koa+router@13.1.1/node_modules/@koa/router/lib/router.js:265:33)
prisma:query SELECT "public"."union_batch_jobs"."id" FROM "public"."union_batch_jobs" WHERE ("public"."union_batch_jobs"."status" = CAST($1::text AS "public"."UnionBatchJobStatus") AND "public"."union_batch_jobs"."scheduled_at" <= $2) ORDER BY "public"."union_batch_jobs"."id" ASC LIMIT $3 OFFSET $4

