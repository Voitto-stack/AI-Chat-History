# Minerva 迁移到 sitin-next 完整方案

## Context

Minerva（运营后台）当前在 `/Users/presence79/Desktop/WORK/sitin-monorepo`，技术栈为 Koa + Prisma + Umi + MySQL。目标是迁入 `/Users/presence79/Desktop/WORK/sitin-next`，全面融入 DMS 已验证的架构体系（Fastify + raw SQL + Vite + React Router + PG），数据库全切 PostgreSQL。

**已确认决策：**
- 完全融合重构，不保留旧工程壳
- 数据层直接融入 sitin-next plugin/business package 体系，不走 Prisma 过渡
- 数据库全切 PG，不保留 MySQL

---

## 一、目标包结构

遵循 sitin-next 命名规范（`@heyhru/*` scope）：

```
sitin-next/packages/
│
│ ─── 基础设施（已有，直接复用）────────────────────
├── server-plugin-pg/              ✅ 数据库连接
├── server-plugin-jwt/             ✅ JWT 认证
├── server-plugin-redis/           ✅ 缓存
├── server-plugin-metrics/         ✅ 指标
├── server-plugin-otel/            ✅ 可观测性
├── server-util-crypto/            ✅ 加密/哈希
├── common-util-fetch/             ✅ HTTP 客户端
├── common-util-logger/            ✅ 日志
│
│ ─── Minerva 后端（新建）──────────────────────────
├── app-minerva-server/            # Fastify HTTP 入口壳
├── business-minerva-auth/         # 登录、JWT、飞书 OAuth
├── business-minerva-rbac/         # 角色、权限、用户管理、审计日志
├── business-minerva-user/         # 用户池（userinfo 读写）
├── business-minerva-post/         # 帖子管理（post_console + comments）
├── business-minerva-call/         # 视频通话（call_feed + call_order）
├── business-minerva-chat/         # 聊天控制台
├── business-minerva-finance/      # 交易/提现（transactions + balance）
├── business-minerva-analytics/    # 数据看板（data-analysis + pwa-databoard）
├── business-minerva-content/      # 内容审核（review-score + screenshot-review + risk）
├── business-minerva-streamer/     # 主播管理（union-streamer）
├── business-minerva-digital/      # 数字人（digital-human + lovia）
├── business-minerva-upload/       # 文件上传（OSS/GCS）
├── contract-minerva/              # Zod 共享契约（从 minerva-schemas 演进）
│
│ ─── Minerva 前端（新建）──────────────────────────
├── app-minerva-web/               # Vite + React Router + Zustand + Antd 5
```

### 包职责边界

| 包 | 职责 | 不做什么 |
|---|---|---|
| `app-minerva-server` | Fastify 入口、路由注册、全局 hook、错误映射、健康检查 | 不含业务逻辑 |
| `business-minerva-*` | service → model → sql 三层、纯业务 | 不依赖 Fastify，不引 req/reply |
| `contract-minerva` | Zod schema、TS 类型、枚举、权限 key 定义 | 不含运行时逻辑 |
| `app-minerva-web` | 路由、页面、组件、状态管理、API 调用 | 不含后端逻辑 |

---

## 二、领域拆分映射

从现有 Minerva 50+ 个 API 端点，按业务域归入 business package：

| 业务域 | 新包名 | 原路由 | 核心表 |
|---|---|---|---|
| 认证 | business-minerva-auth | `/api/auth`, `/api/feishu` | AdminUser |
| RBAC | business-minerva-rbac | `/api/rbac/*` | Role, Permission, UserRole, RolePermission, AuditLog |
| 用户池 | business-minerva-user | `/api/users/*` | userinfo, user_regulation |
| 帖子 | business-minerva-post | `/api/post-console/*` | post, post_comment, post_like, post_interact |
| 通话 | business-minerva-call | `/api/call-feed` | user_call_order |
| 聊天 | business-minerva-chat | `/api/chat-console` | tim_msg_record (via TIM SDK) |
| 财务 | business-minerva-finance | `/api/transactions` | user_balance, user_coins, withdrawal |
| 数据 | business-minerva-analytics | `/api/data-analysis`, `/api/pwa-databoard` | 聚合查询，无独立表 |
| 内容审核 | business-minerva-content | `/api/review-score`, `/api/screenshot-review`, `/api/risk` | screenshot_detect, review_score |
| 主播 | business-minerva-streamer | `/api/union-streamer` | union_user, union_device |
| 数字人 | business-minerva-digital | `/api/digital-human`, `/api/lovia` | dh_*, lovia_story |
| 上传 | business-minerva-upload | `/api/upload` | - (OSS/GCS) |

**不迁移（已标记 PROD-DISABLED）：**
- `/api/union`（公会路由）
- `/api/social-proxy`（社交代理）

---

## 三、技术映射对照

### 后端

| 维度 | Minerva 当前 | sitin-next 目标 | 迁移要点 |
|---|---|---|---|
| 框架 | Koa 3 | Fastify | 路由注册方式不同，中间件 → hook/plugin |
| ORM | Prisma (MySQL) | raw SQL via `server-plugin-pg` | 所有 Prisma 查询改写为 SQL |
| 数据库 | MySQL | PostgreSQL | 数据类型映射 + 数据迁移 |
| 认证 | 自写 JWT | `server-plugin-jwt` | 直接替换 |
| 缓存 | Redis (ioredis) | `server-plugin-redis` | 直接替换 |
| 错误 | AppError 类 | reply.code().send() | 适配 Fastify 错误模式 |
| 日志 | console/自定义 | `common-util-logger` (pino) | 统一结构化日志 |
| 校验 | Zod (.parse) | Zod (.parse) | **直接复用** |
| 响应格式 | `{ success, data/error }` | 直接返回 data 或 error | 需要统一，建议保留 Minerva 格式或用 Fastify plugin 包装 |
| 文件上传 | Aliyun OSS + GCS | 同上 | 保持不变 |
| 消息 | Tencent TIM SDK | 同上 | 保持不变 |

### 前端

| 维度 | Minerva 当前 | sitin-next 目标 | 迁移要点 |
|---|---|---|---|
| 框架 | Umi 4 | Vite + React | 配置式路由 → 代码式路由 |
| 路由 | .umirc.ts 声明式 | React Router v6 | 全部重写路由树 |
| 状态 | Umi model (dva-like) | Zustand | 重写为 Zustand store |
| 请求 | 自定义 request 函数 | `common-util-fetch` | 替换 HTTP 客户端 |
| 布局 | @ant-design/pro-layout | 自建 Layout（参考 DMS） | 重建 sidebar + header |
| 权限 | Umi access plugin | 自建 ProtectedRoute + store | 重写权限门控 |
| UI 库 | Ant Design 5 | Ant Design 5 | **直接复用**，页面组件迁移成本低 |

### 数据库 MySQL → PG 类型映射

| MySQL | PostgreSQL | 注意 |
|---|---|---|
| `TINYINT` | `SMALLINT` | regulation_status 枚举 |
| `INT AUTO_INCREMENT` | `SERIAL` / `GENERATED ALWAYS AS IDENTITY` | |
| `DATETIME` | `TIMESTAMP` | 时区处理 |
| `JSON`（字符串存储） | `JSONB`（原生二进制） | 嵌套 JSON.parse 可以去掉 |
| `TEXT` | `TEXT` | 无变化 |
| `DECIMAL` | `NUMERIC` | 财务金额 |
| 分区表（`post_comment`） | PG 原生分区 | 比 MySQL 更成熟 |

---

## 四、迁移阶段

### Phase 0：语义盘点（不写代码）
**目标：** 产出 3 份基础资产，确保迁移不丢失语义

- [ ] **接口清单** — 逐个端点记录：method、path、请求体、响应体、权限要求
- [ ] **查询语义对照** — 每个 Prisma 查询翻译为 PG SQL，标注 WHERE/NULL/排序/分页差异
- [ ] **枚举/默认值清单** — 前端 useState 默认值、筛选条件默认值、状态枚举映射

### Phase 1：contract-minerva + 脚手架
**目标：** 共享契约到位 + 后端能跑起来

1. 创建 `contract-minerva` 包，从 `minerva-schemas` 迁入所有 Zod schema
2. 创建 `app-minerva-server` 包（Fastify 骨架）：
   - 参考 `app-dms-server/src/index.ts` 和 `src/app.ts`
   - 注册 CORS、logger、metrics、health check
   - 配置 `server-plugin-pg` 连接（新建 Minerva PG 数据库）
   - 配置 `server-plugin-redis`
   - 配置 `server-plugin-jwt`
3. 创建迁移系统 `src/migrate/migrations.ts`：
   - 编写 AdminUser、Role、Permission、UserRole、RolePermission、AuditLog 建表 SQL
4. 验证：`pnpm dev` 能启动，`GET /health` 返回 ok

### Phase 2：认证 + RBAC
**目标：** 能登录、鉴权、管理角色权限

1. 创建 `business-minerva-auth`：
   - `auth.service.ts` — login（密码验证 via server-util-crypto）、me、change-password
   - `auth.sql.ts` + `auth.model.ts` — AdminUser 查询
   - 飞书 OAuth 集成（保持原有逻辑）
2. 创建 `business-minerva-rbac`：
   - `roles.service/model/sql.ts` — 角色 CRUD
   - `permissions.service/model/sql.ts` — 权限 CRUD
   - `users.service/model/sql.ts` — 管理员用户 CRUD + 角色分配
   - `audit.service/model/sql.ts` — 审计日志
3. 在 `app-minerva-server` 注册 auth hook（参考 DMS 的 `auth.middleware.ts` + `auth.permissions.ts`）：
   - preHandler: Bearer token 验证 → req.user
   - 权限校验：保留 `requirePermission()` / `requireAnyPermission()` 语义
4. 验证：登录、查看角色列表、分配权限全流程

### Phase 3：高价值业务域
**目标：** 迁移核心功能

按优先级顺序：
1. `business-minerva-user` — 用户池管理（userinfo 表操作）
2. `business-minerva-finance` — 交易/提现
3. `business-minerva-analytics` — 数据看板
4. `business-minerva-post` — 帖子管理
5. `business-minerva-call` — 通话管理
6. `business-minerva-content` — 内容审核（review-score + screenshot-review + risk）

每个 business 包遵循 DMS 三层模式：
```
{domain}.controller.ts  ← 在 app-minerva-server 中注册
{domain}.service.ts     ← 纯业务逻辑
{domain}.model.ts       ← DB 操作（getPgDb().query/queryOne/run）
{domain}.sql.ts         ← SQL 常量
```

### Phase 4：次要业务域
1. `business-minerva-chat` — 聊天控制台
2. `business-minerva-streamer` — 主播管理
3. `business-minerva-digital` — 数字人 + Lovia
4. `business-minerva-upload` — 文件上传

### Phase 5：前端迁移
**目标：** 新建 `app-minerva-web`，替代 Umi

1. Vite + React + React Router v6 骨架：
   - 参考 `app-dms-web` 的 main.tsx / App.tsx
   - 配置 Ant Design 5 主题
2. Auth 层：
   - Zustand auth store（参考 DMS `store/auth.ts`）
   - ProtectedRoute 组件（参考 DMS）
   - API client（common-util-fetch）
3. Layout 重建：
   - 侧边栏菜单 + header + 权限门控
   - 保持与旧版一致的菜单结构和权限控制
4. 逐页迁移（30+ 页面）：
   - 页面级组件基本可以平移（都是 Antd 5）
   - 重点改：路由跳转、API 调用、状态管理
   - **必须对照原版验证**：默认值、筛选行为、分页参数

### Phase 6：数据迁移 + 收口
1. MySQL → PG 数据迁移脚本
2. 清理 sitin-monorepo 中的 Minerva 相关代码
3. 更新 CI/CD：Jenkins 构建脚本适配新结构
4. 文档更新：README、dms-design.md 同级新增 minerva-design.md

---

## 五、关键风险 & 缓解

| 风险 | 影响 | 缓解措施 |
|---|---|---|
| MySQL → PG 数据迁移 | 百万级数据表迁移需要停机或双写 | Phase 0 先做查询语义对照，Phase 6 写迁移脚本，分批迁移 |
| App 生产数据也在同一个 MySQL | 其他服务（dora-service, app 端）也读写这个库 | 这是跨团队决策：要么其他服务也切 PG，要么 Minerva 先用只读副本 |
| Prisma → raw SQL 查询语义漂移 | WHERE 条件、NULL 处理、排序可能不一致 | 每个查询必须有对照测试（同参数两边跑，比较结果集） |
| 前端 105 个 TSX 文件 | 工作量大，容易遗漏 | 逐页迁移 + 逐页验证，不批量搬 |
| 前端默认值漂移 | useState 初始值不一致导致首屏数据不同 | 从旧代码精确复制默认值 |

---

## 六、验证策略

每个 Phase 完成后必须验证：

1. **接口对照** — 同一请求，新旧后端返回结果 diff
2. **查询对照** — 同一筛选条件，PG vs MySQL 结果集比对
3. **页面对照** — 同一用户 + 同一筛选 + 同一权限，前端页面截图比对
4. **权限对照** — 各角色能看到的菜单、按钮、数据范围必须一致

---

## 七、关键文件参考

### sitin-next 中要参考的文件
| 文件 | 参考什么 |
|---|---|
| `app-dms-server/src/index.ts` | Fastify 启动流程 |
| `app-dms-server/src/app.ts` | 插件注册、全局 hook、路由挂载 |
| `app-dms-server/src/auth/auth.middleware.ts` | JWT 验证 + 权限 hook |
| `app-dms-server/src/auth/auth.permissions.ts` | 路由级权限映射 |
| `app-dms-server/src/migrate/runner.ts` | 迁移系统 |
| `business-dms-user/src/` | service/model/sql 三层模式 |
| `app-dms-web/src/App.tsx` | React Router 路由结构 |
| `app-dms-web/src/store/auth.ts` | Zustand auth store |
| `app-dms-web/src/components/ProtectedRoute.tsx` | 前端鉴权 |
| `app-dms-web/src/api/client.ts` | HTTP 客户端配置 |
| `docs/coding-conventions.md` | 编码规范 |

### Minerva 中要迁移的文件
| 文件 | 迁到哪 |
|---|---|
| `packages/minerva-schemas/src/*` | `contract-minerva/src/` |
| `apps/minerva-server/src/routes/*` | 拆入对应 `business-minerva-*/` |
| `apps/minerva-server/src/middlewares/auth.ts` | `app-minerva-server/src/auth/` |
| `apps/minerva-server/prisma/schema.prisma` | 拆为各 business 包的 `*.sql.ts` 建表语句 |
| `apps/minerva/src/pages/*` | `app-minerva-web/src/pages/` |
| `apps/minerva/src/api/*` | `app-minerva-web/src/api/` |
| `apps/minerva/src/access.ts` | `app-minerva-web/src/store/auth.ts` + ProtectedRoute |
