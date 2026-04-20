---
date: 2026-04-20T18:17:59+08:00
source: clipboard
chars: 10880
---

app-minerva-server git:(feature/migrate-minerva-from-monorepo) ✗ pnpm run dev 

> @sitin/minerva-server@0.1.0 dev /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server
> NODE_ENV=local tsx watch src/index.ts

[主数据库诊断] 连接地址: postgresql://presence79@localhost:5432/archat_test?schema=public
[主数据库诊断]   协议: postgresql:
[主数据库诊断]   主机: localhost
[主数据库诊断]   端口: 5432
[主数据库诊断]   数据库: archat_test
[主数据库诊断]   用户名: presence79
[主数据库诊断]   参数: ?schema=public
[主数据库诊断] 正在初始化主库 PrismaClient...
[主数据库诊断] ✅ 主库 PrismaClient 实例已创建
[Redis 诊断] CA 证书来源: 文件 /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server/certs/redis-ca.pem，长度: 1424 字符
[Redis 诊断] TLS 配置: 已启用 (rejectUnauthorized=false)
[Monitor 数据库诊断] ❌ MONITOR_DATABASE_URL 环境变量未设置！
[Monitor 数据库诊断] 正在初始化 Monitor PrismaClient...
[Monitor 数据库诊断] 日志级别: query, error, warn
[Monitor 数据库诊断] ✅ Monitor PrismaClient 实例已创建（注意：尚未真正连接数据库，首次查询时连接）
──────────────────────────────────────
🔍 环境变量巡检
──────────────────────────────────────
   ✅ DATABASE_URL = postgresql://presence79@localhost:5432/archat_test?schema=public  (PostgreSQL 主库连接串)
   ✅ MONITOR_DATABASE_URL = postgresql://postgres:-Ai5PN.Ak6*8|6Yo@localhost:5433/monitor_test?schema=public  (Monitor 库连接串)
   ✅ JWT_SECRET = minerva-dev-secret  (JWT 签名密钥)
   ✅ JWT_EXPIRES_IN = 60m  (JWT 过期时间)
   ✅ PORT = 29003  (服务监听端口)
   ✅ NODE_ENV = local  (运行环境)
   ⬜ WS_PUBLIC_URL  — 未配置，使用默认值  (WebSocket 公开地址)
   ✅ OSS_ACCESS_KEY_ID = LTAI5tFZdGYUtim2votMpun6  (阿里云 AccessKey ID)
   ✅ OSS_ACCESS_KEY_SECRET = AxBJPzYJWPS6VTSPAIXaQZnlgh7bMH  (阿里云 AccessKey Secret)
   ✅ OSS_BUCKET = sitin-ai-web  (OSS 存储桶名称)
   ✅ OSS_ENDPOINT = oss-us-west-1.aliyuncs.com  (OSS 端点)
   ✅ OSS_REGION = oss-us-west-1  (OSS 区域)
   ✅ OSS_CDN_HOST = https://app.sitin.ai  (CDN 加速域名)
   ✅ FEISHU_CLIENT_ID = cli_a9f2cbc9aa795cc5  (飞书 App ID)
   ✅ FEISHU_CLIENT_SECRET = waSPzES2OEIOYMWJnW95e0QkuF5V0KSe  (飞书 App Secret)
   ✅ FEISHU_REDIRECT_URI = http://localhost:8000/auth/feishu/callback  (飞书 OAuth 回调地址)
   ✅ FEISHU_STATE_SECRET = your-feishu-state-secret-change-in-production  (飞书 State 签名密钥)
   ✅ FEISHU_DEFAULT_ROLE = Viewer  (飞书用户默认角色)
   ✅ FEISHU_ERROR_WEBHOOK = https://open.feishu.cn/open-apis/bot/v2/hook/4efd75ee-bfb2-4370-a52f-6039d4159cda  (飞书错误告警 Webhook)
   ✅ TIM_SDK_APP_ID = 1600002475  (腾讯云 IM SDKAppID)
   ✅ TIM_SECRET_KEY = e2a6d55b94d4aecd7a6be2e922c285158a30157a420eae995f869c408457c4c9  (腾讯云 IM SecretKey)
   ✅ PROTO_GATEWAY_URL = https://api-dev.memojiproperties.com/json  (Proto Gateway 地址)
   ✅ PROTO_GATEWAY_USERNAME = Matt  (Proto Gateway 用户名)
   ✅ PROTO_GATEWAY_PASSWORD = KyCttpaYixMRWY0HHQZA  (Proto Gateway 密码)
   ⬜ GCS_KEY_FILE  — 未配置，使用默认值  (GCS Service Account JSON 密钥文件路径)
   ⬜ GCS_CREDENTIALS_BASE64  — 未配置，使用默认值  (GCS Service Account (base64, GCS_KEY_FILE 优先))
   ⬜ GCS_BUCKET  — 未配置，使用默认值  (GCS 存储桶名称)
   ⬜ GCS_CDN_HOST  — 未配置，使用默认值  (GCS CDN 加速域名)
   ⬜ GCS_PROJECT_ID  — 未配置，使用默认值  (GCP 项目 ID)
   ⬜ GITHUB_TOKEN  — 未配置，使用默认值  (GitHub Personal Access Token (read-only))
   ✅ REDIS_URL = rediss://:c2332503-32bc-4cf3-a8a1-475c1d6ddf99@localhost:6378  (Redis 只读实例连接串 (rediss://))
   ✅ REDIS_WRITE_URL = rediss://:c2332503-32bc-4cf3-a8a1-475c1d6ddf99@localhost:6379  (Redis 写入实例连接串 (rediss://))
   ⬜ REDIS_CA  — 未配置，使用默认值  (Redis CA 证书 (PEM 内联，优先于 certs/redis-ca.pem 文件))
   ⬜ WEBHOOK_API_KEY  — 未配置，使用默认值  (Webhook 接口 API Key 校验)
──────────────────────────────────────
✅ 环境变量巡检通过

[启动诊断] ════════════════════════════════════════
[启动诊断] 启动时间: 2026-04-20T10:17:41.866Z
[启动诊断] Node 版本: v25.8.0
[启动诊断] 工作目录: /Users/presence79/Desktop/WORK/sitin-next/packages/app-minerva-server
[启动诊断] NODE_ENV: local
[启动诊断] PID: 33575
[启动诊断] 平台: darwin / x64
[启动诊断] ════════════════════════════════════════
[启动诊断] [主数据库] 开始连接检测...
[Monitor 数据库诊断] ❌ Monitor 数据库连接失败: Can't reach database server at `localhost:5433`

Please make sure your database server is running at `localhost:5433`.
[Monitor 数据库诊断]    🔌 无法到达数据库服务器，请检查:
[Monitor 数据库诊断]       - 主机地址和端口是否正确
[Monitor 数据库诊断]       - K8s Pod 到数据库的网络是否通畅
[Monitor 数据库诊断]       - 数据库服务是否在运行
[启动诊断] [主数据库] $connect() 成功，耗时 46ms
prisma:query SELECT NOW()
[启动诊断] [主数据库] ✅ 连接成功
[启动诊断] [主数据库]    服务器时间: 2026-04-20T10:17:41.915Z
[启动诊断] [主数据库]    查询耗时: 4ms
[启动诊断] [主数据库]    总耗时: 50ms
[启动诊断] [Redis 只读] 开始连接检测...
[Redis 诊断] 首次获取 Redis 只读实例，开始初始化...
[Redis 诊断] [REDIS_URL] 开始创建客户端
[Redis 诊断] [REDIS_URL] 连接地址: rediss://:***@localhost:6378
[Redis 诊断] [REDIS_URL] 协议类型: rediss (TLS)
[Redis 诊断] [REDIS_URL] 连接超时: 3000ms, 命令超时: 2000ms, 最大重试: 3 次
[启动诊断] [Redis 只读] 当前状态: wait
[Redis 诊断] [REDIS_URL] ❌ 连接错误: 
[Redis 诊断] [REDIS_URL]    错误码: ECONNREFUSED
[Redis 诊断] [REDIS_URL] 第 1 次重试，500ms 后重连...
[Redis 诊断] [REDIS_URL] 🔌 连接已关闭
[Redis 诊断] [REDIS_URL] 🔄 正在重连... (延迟 500ms)
[启动诊断] [Redis 只读] ❌ 连接失败（耗时 12ms）
[启动诊断] [Redis 只读]    错误信息: Connection is closed.
[启动诊断] [Redis 只读]    错误全文: Error: Connection is closed.
    at EventEmitter.connectionCloseHandler (/Users/presence79/Desktop/WORK/sitin-next/node_modules/ioredis/built/Redis.js:208:28)
    at Object.onceWrapper (node:events:623:12)
    at EventEmitter.emit (node:events:520:22)
    at process.processTicksAndRejections (node:internal/process/task_queues:85:11)
[启动诊断] [Redis 写入] 开始连接检测...
[Redis 诊断] 首次获取 Redis 写入实例，开始初始化...
[Redis 诊断] [REDIS_WRITE_URL] 开始创建客户端
[Redis 诊断] [REDIS_WRITE_URL] 连接地址: rediss://:***@localhost:6379
[Redis 诊断] [REDIS_WRITE_URL] 协议类型: rediss (TLS)
[Redis 诊断] [REDIS_WRITE_URL] 连接超时: 3000ms, 命令超时: 2000ms, 最大重试: 3 次
[启动诊断] [Redis 写入] 当前状态: wait
[Redis 诊断] [REDIS_WRITE_URL] ❌ 连接错误: 
[Redis 诊断] [REDIS_WRITE_URL]    错误码: ECONNREFUSED
[Redis 诊断] [REDIS_WRITE_URL] 第 1 次重试，500ms 后重连...
[Redis 诊断] [REDIS_WRITE_URL] 🔌 连接已关闭
[Redis 诊断] [REDIS_WRITE_URL] 🔄 正在重连... (延迟 500ms)
[启动诊断] [Redis 写入] ❌ 连接失败（耗时 2ms）
[启动诊断] [Redis 写入]    错误信息: Connection is closed.
[启动诊断] [Redis 写入]    错误全文: Error: Connection is closed.
    at EventEmitter.connectionCloseHandler (/Users/presence79/Desktop/WORK/sitin-next/node_modules/ioredis/built/Redis.js:208:28)
    at Object.onceWrapper (node:events:623:12)
    at EventEmitter.emit (node:events:520:22)
    at process.processTicksAndRejections (node:internal/process/task_queues:85:11)
[启动诊断] ════════════════════════════════════════
[启动诊断] 启动预检完成，总耗时: 66ms
[启动诊断] ════════════════════════════════════════
──────────────────────────────────────
🚀 Minerva Server 已启动
   环境      : local
   端口      : 29003
   PID       : 33575
   Node      : v25.8.0
──────────────────────────────────────
[Redis 诊断] [REDIS_URL] ❌ 连接错误: 
[Redis 诊断] [REDIS_URL]    错误码: ECONNREFUSED
[Redis 诊断] [REDIS_URL] 第 2 次重试，1000ms 后重连...
[Redis 诊断] [REDIS_URL] 🔌 连接已关闭
[Redis 诊断] [REDIS_URL] 🔄 正在重连... (延迟 1000ms)
[Redis 诊断] [REDIS_WRITE_URL] ❌ 连接错误: 
[Redis 诊断] [REDIS_WRITE_URL]    错误码: ECONNREFUSED
[Redis 诊断] [REDIS_WRITE_URL] 第 2 次重试，1000ms 后重连...
[Redis 诊断] [REDIS_WRITE_URL] 🔌 连接已关闭
[Redis 诊断] [REDIS_WRITE_URL] 🔄 正在重连... (延迟 1000ms)
[Redis 诊断] [REDIS_URL] ❌ 连接错误: 
[Redis 诊断] [REDIS_URL]    错误码: ECONNREFUSED
[Redis 诊断] [REDIS_URL] 第 3 次重试，1500ms 后重连...
[Redis 诊断] [REDIS_URL] 🔌 连接已关闭
[Redis 诊断] [REDIS_URL] 🔄 正在重连... (延迟 1500ms)
[Redis 诊断] [REDIS_WRITE_URL] ❌ 连接错误: 
[Redis 诊断] [REDIS_WRITE_URL]    错误码: ECONNREFUSED
[Redis 诊断] [REDIS_WRITE_URL] 第 3 次重试，1500ms 后重连...
[Redis 诊断] [REDIS_WRITE_URL] 🔌 连接已关闭
[Redis 诊断] [REDIS_WRITE_URL] 🔄 正在重连... (延迟 1500ms)
[Redis 诊断] [REDIS_URL] ❌ 连接错误: 
[Redis 诊断] [REDIS_URL]    错误码: ECONNREFUSED
[Redis 诊断] [REDIS_URL] 重试次数已达上限 (4)，放弃连接
[Redis 诊断] [REDIS_URL] 🔌 连接已关闭
[Redis 诊断] [REDIS_URL] 🛑 连接已终止（不会再自动重连）
[Redis 诊断] [REDIS_WRITE_URL] ❌ 连接错误: 
[Redis 诊断] [REDIS_WRITE_URL]    错误码: ECONNREFUSED
[Redis 诊断] [REDIS_WRITE_URL] 重试次数已达上限 (4)，放弃连接
[Redis 诊断] [REDIS_WRITE_URL] 🔌 连接已关闭
[Redis 诊断] [REDIS_WRITE_URL] 🛑 连接已终止（不会再自动重连）

