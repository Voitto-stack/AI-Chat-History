---
date: 2026-04-13T10:52:24+08:00
source: clipboard
chars: 8880
---

minerva-server git:(fix/minerva-bugs) ✗ pnpm run dev

> @sitin/minerva-server@0.1.0 dev /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server
> NODE_ENV=local tsx watch src/index.ts

[主数据库诊断] ❌ DATABASE_URL 环境变量未设置！
[主数据库诊断] 正在初始化主库 PrismaClient...
[主数据库诊断] ✅ 主库 PrismaClient 实例已创建
[Redis 诊断] CA 证书路径: /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/certs/redis-ca.pem
[Redis 诊断] CA 证书文件存在
[Redis 诊断] CA 证书已加载，长度: 1424 字符
[Monitor 数据库诊断] ❌ MONITOR_DATABASE_URL 环境变量未设置！
[Monitor 数据库诊断] 正在初始化 Monitor PrismaClient...
[Monitor 数据库诊断] 日志级别: query, error, warn
[Monitor 数据库诊断] ✅ Monitor PrismaClient 实例已创建（注意：尚未真正连接数据库，首次查询时连接）
[Guild Scheduler] Daily reset scheduled in 1268 min
[Guild Scheduler] Batch job scheduler started (30s interval)
──────────────────────────────────────
🔍 环境变量巡检
──────────────────────────────────────
   ✅ DATABASE_URL = pos***lic  (PostgreSQL 主库连接串)
   ✅ MONITOR_DATABASE_URL = pos***lic  (Monitor 库连接串)
   ✅ JWT_SECRET = dev***T2O  (JWT 签名密钥)
   ✅ JWT_EXPIRES_IN = 60m  (JWT 过期时间)
   ✅ PORT = 29001  (服务监听端口)
   ✅ NODE_ENV = local  (运行环境)
   ⬜ WS_PUBLIC_URL  — 未配置，使用默认值  (WebSocket 公开地址)
   ✅ OSS_ACCESS_KEY_ID = LTA***un6  (阿里云 AccessKey ID)
   ✅ OSS_ACCESS_KEY_SECRET = AxB***bMH  (阿里云 AccessKey Secret)
   ✅ OSS_BUCKET = sitin-ai-web  (OSS 存储桶名称)
   ✅ OSS_ENDPOINT = oss-us-west-1.aliyuncs.com  (OSS 端点)
   ✅ OSS_REGION = oss-us-west-1  (OSS 区域)
   ✅ OSS_CDN_HOST = https://app.sitin.ai  (CDN 加速域名)
   ✅ FEISHU_CLIENT_ID = cli_a9f2cbc9aa795cc5  (飞书 App ID)
   ✅ FEISHU_CLIENT_SECRET = waS***KSe  (飞书 App Secret)
   ✅ FEISHU_REDIRECT_URI = http://localhost:8000/auth/feishu/callback  (飞书 OAuth 回调地址)
   ✅ FEISHU_STATE_SECRET = you***ion  (飞书 State 签名密钥)
   ✅ FEISHU_DEFAULT_ROLE = Viewer  (飞书用户默认角色)
   ✅ FEISHU_ERROR_WEBHOOK = https://open.feishu.cn/open-apis/bot/v2/hook/4efd75ee-bfb2-4370-a52f-6039d4159cda  (飞书错误告警 Webhook)
   ✅ TIM_SDK_APP_ID = 1600002475  (腾讯云 IM SDKAppID)
   ✅ TIM_SECRET_KEY = e2a***4c9  (腾讯云 IM SecretKey)
   ✅ PROTO_GATEWAY_URL = https://api-dev.memojiproperties.com/json  (Proto Gateway 地址)
   ✅ PROTO_GATEWAY_USERNAME = Matt  (Proto Gateway 用户名)
   ✅ PROTO_GATEWAY_PASSWORD = KyC***QZA  (Proto Gateway 密码)
   ⬜ GCS_KEY_FILE  — 未配置，使用默认值  (GCS Service Account JSON 密钥文件路径)
   ⬜ GCS_CREDENTIALS_BASE64  — 未配置，使用默认值  (GCS Service Account (base64, GCS_KEY_FILE 优先))
   ⬜ GCS_BUCKET  — 未配置，使用默认值  (GCS 存储桶名称)
   ⬜ GCS_CDN_HOST  — 未配置，使用默认值  (GCS CDN 加速域名)
   ⬜ GCS_PROJECT_ID  — 未配置，使用默认值  (GCP 项目 ID)
   ⬜ GITHUB_TOKEN  — 未配置，使用默认值  (GitHub Personal Access Token (read-only))
   ✅ REDIS_URL = red***378  (Redis 只读实例连接串 (rediss://))
   ✅ REDIS_WRITE_URL = red***379  (Redis 写入实例连接串 (rediss://))
   ⬜ WEBHOOK_API_KEY  — 未配置，使用默认值  (Webhook 接口 API Key 校验)
──────────────────────────────────────
✅ 环境变量巡检通过

[启动诊断] ════════════════════════════════════════
[启动诊断] 启动时间: 2026-04-13T02:52:04.253Z
[启动诊断] Node 版本: v25.8.0
[启动诊断] 工作目录: /Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server
[启动诊断] NODE_ENV: local
[启动诊断] PID: 95977
[启动诊断] 平台: darwin / x64
[启动诊断] ════════════════════════════════════════
[启动诊断] [主数据库] 开始连接检测...
[启动诊断] [主数据库] $connect() 成功，耗时 1840ms
[Monitor 数据库诊断] ✅ Monitor 数据库连接成功
prisma:query SELECT NOW()
[启动诊断] [主数据库] ✅ 连接成功
[启动诊断] [主数据库]    服务器时间: 2026-04-13T02:52:06.913Z
[启动诊断] [主数据库]    查询耗时: 757ms
[启动诊断] [主数据库]    总耗时: 2597ms
[启动诊断] [Redis 只读] 开始连接检测...
[Redis 诊断] 首次获取 Redis 只读实例，开始初始化...
[启动诊断] [Redis 只读] ❌ 连接失败（耗时 0ms）
[启动诊断] [Redis 只读]    错误信息: maskUrl is not defined
[启动诊断] [Redis 只读]    错误全文: ReferenceError: maskUrl is not defined
    at createRedisClient (/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/utils/redis.ts:27:18)
    at getRedisRead (/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/utils/redis.ts:108:33)
    at bootstrap (/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/index.ts:114:19)
[启动诊断] [Redis 写入] 开始连接检测...
[Redis 诊断] 首次获取 Redis 写入实例，开始初始化...
[启动诊断] [Redis 写入] ❌ 连接失败（耗时 0ms）
[启动诊断] [Redis 写入]    错误信息: maskUrl is not defined
[启动诊断] [Redis 写入]    错误全文: ReferenceError: maskUrl is not defined
    at createRedisClient (/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/utils/redis.ts:27:18)
    at getRedisWrite (/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/utils/redis.ts:117:34)
    at bootstrap (/Users/presence79/Desktop/WORK/sitin-monorepo/apps/minerva-server/src/index.ts:142:24)
[启动诊断] [自动建表] 检查 union_batch_jobs 表...
prisma:query SELECT NOW() as now, current_database() as db, current_schema() as schema
[Monitor 数据库诊断] ✅ Monitor 数据库可查询: [{"now":"2026-04-13T02:52:07.266Z","db":"monitor_test","schema":"public"}]
prisma:query DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'UnionBatchJobStatus') THEN CREATE TYPE "UnionBatchJobStatus" AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled'); END IF; END $$
prisma:query CREATE TABLE IF NOT EXISTS "union_batch_jobs" ("id" TEXT NOT NULL, "action" VARCHAR(50) NOT NULL, "status" "UnionBatchJobStatus" NOT NULL DEFAULT 'pending', "total_count" INTEGER NOT NULL DEFAULT 0, "success_count" INTEGER NOT NULL DEFAULT 0, "failed_count" INTEGER NOT NULL DEFAULT 0, "user_ids" JSONB NOT NULL, "params" JSONB, "results" JSONB, "operator_id" TEXT, "scheduled_at" TIMESTAMP(3), "started_at" TIMESTAMP(3), "completed_at" TIMESTAMP(3), "error" TEXT, "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "union_batch_jobs_pkey" PRIMARY KEY ("id"))
prisma:query CREATE INDEX IF NOT EXISTS "union_batch_jobs_status_idx" ON "union_batch_jobs"("status")
prisma:query CREATE INDEX IF NOT EXISTS "union_batch_jobs_scheduled_at_idx" ON "union_batch_jobs"("scheduled_at")
prisma:query CREATE INDEX IF NOT EXISTS "union_batch_jobs_created_at_idx" ON "union_batch_jobs"("created_at")
prisma:query ALTER TABLE "union_users" ADD COLUMN IF NOT EXISTS "is_taken_over" BOOLEAN NOT NULL DEFAULT false
prisma:query ALTER TABLE "union_users" ADD COLUMN IF NOT EXISTS "taken_over_at" TIMESTAMP(3)
prisma:query ALTER TABLE "union_conversations" ADD COLUMN IF NOT EXISTS "is_manual" BOOLEAN NOT NULL DEFAULT false
✅ Database schema verified (union_batch_jobs, operator_takeover)
[启动诊断] [自动建表] ✅ union_batch_jobs 表已就绪
[启动诊断] ════════════════════════════════════════
[启动诊断] 启动预检完成，总耗时: 7694ms
[启动诊断] ════════════════════════════════════════
📡 Device WebSocket server initialized at /ws/device
📡 Admin WebSocket initialized at /ws/admin & /ws/social-proxy-upstream
──────────────────────────────────────
🚀 Minerva Server 已启动
   环境      : local
   端口      : 29001
   PID       : 95977
   Node      : v25.8.0
──────────────────────────────────────

