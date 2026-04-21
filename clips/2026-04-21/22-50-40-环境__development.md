---
date: 2026-04-21T22:50:40+08:00
source: clipboard
chars: 1184
---

环境: development
接口: Prisma | POST /api/auth/login
错误: PrismaClientKnownRequestError —
Invalid `prisma_js_1.prisma.adminUser.findUnique()` invocation in
/app/routes/auth.js:28:53

  25 exports.authRouter.post('/login', async (ctx) => {
  26     const body = minerva_schemas_1.loginRequestSchema.parse(ctx.request.body);
  27     // Find user by sub (only need roles for JWT payload)
→ 28     const user = await prisma_js_1.prisma.adminUser.findUnique(
Timed out fetching a new connection from the connection pool. More info: http://pris.ly/d/connection-pool (Current connection pool timeout: 10, connection limit: 17)
堆栈:
```
PrismaClientKnownRequestError:
Invalid `prisma_js_1.prisma.adminUser.findUnique()` invocation in
/app/routes/auth.js:28:53

  25 exports.authRouter.post('/login', async (ctx) => {
  26     const body = minerva_schemas_1.loginRequestSchema.parse(ctx.request.body);
  27     // Find user by sub (only need roles for JWT payload)
→ 28     const user = await prisma_js_1.prisma.adminUser.findUnique(
Timed out fetching a new connection from the connection pool. More info: http://pris.ly/d/connection-po
```
时间: 2026-04-21T14:01:29.718Z

