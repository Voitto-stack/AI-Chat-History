---
date: 2026-04-21T01:28:26+08:00
source: clipboard
chars: 3729
---

prisma:error 
Invalid `prisma.unionUser.findMany()` invocation in
/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/scheduler.ts:91:47

  88 const process = async () => {
  89   try {
  90     const now = new Date();
→ 91     const dueUsers = await prisma.unionUser.findMany(
The column `union_users.next_action_at` does not exist in the current database.
[Guild Scheduler] Failed to process due users: PrismaClientKnownRequestError: 
Invalid `prisma.unionUser.findMany()` invocation in
/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/scheduler.ts:91:47

  88 const process = async () => {
  89   try {
  90     const now = new Date();
→ 91     const dueUsers = await prisma.unionUser.findMany(
The column `union_users.next_action_at` does not exist in the current database.
    at ei.handleRequestError (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/generated/prisma/runtime/library.js:125:7268)
    at ei.handleAndLogRequestError (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/generated/prisma/runtime/library.js:125:6593)
    at ei.request (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/generated/prisma/runtime/library.js:125:6300)
    at async a (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/generated/prisma/runtime/library.js:134:9551)
    at async Timeout.process (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/scheduler.ts:91:24) {
  code: 'P2022',
  meta: { modelName: 'UnionUser', column: 'union_users.next_action_at' },
  clientVersion: '6.19.3'
}
GET /api/auth/me - 200 - 81ms
GET /api/auth/me - 200 - 56ms
GET /api/data-analysis/new-user-counts-overview?startDate=2026-04-20&endDate=2026-04-21 - 200 - 587ms
GET /api/post-console?gender=0&appName=0&limit=20&offset=0 - 200 - 603ms
GET /api/data-analysis/revenue-overview?startDate=2026-04-20&endDate=2026-04-21 - 200 - 604ms
prisma:error 
Invalid `prisma.unionUser.findMany()` invocation in
/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/scheduler.ts:91:47

  88 const process = async () => {
  89   try {
  90     const now = new Date();
→ 91     const dueUsers = await prisma.unionUser.findMany(
The column `union_users.next_action_at` does not exist in the current database.
[Guild Scheduler] Failed to process due users: PrismaClientKnownRequestError: 
Invalid `prisma.unionUser.findMany()` invocation in
/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/scheduler.ts:91:47

  88 const process = async () => {
  89   try {
  90     const now = new Date();
→ 91     const dueUsers = await prisma.unionUser.findMany(
The column `union_users.next_action_at` does not exist in the current database.
    at ei.handleRequestError (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/generated/prisma/runtime/library.js:125:7268)
    at ei.handleAndLogRequestError (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/generated/prisma/runtime/library.js:125:6593)
    at ei.request (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/generated/prisma/runtime/library.js:125:6300)
    at async a (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/generated/prisma/runtime/library.js:134:9551)
    at async Timeout.process (/Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/src/services/guild/scheduler.ts:91:24) {
  code: 'P2022',
  meta: { modelName: 'UnionUser', column: 'union_users.next_action_at' },
  clientVersion: '6.19.3'
}

