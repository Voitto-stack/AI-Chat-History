---
title: 部署到测试环境除了这个：{success: false, error: {cod
date: 2026-04-21T22:05:50+08:00
session_id: b2fc9966-7dae-49fb-9737-33a77ed47e7f
project: /Users/presence79/Desktop/WORK/sitin-next
source: claude-code-capture
messages: 18
---

# 部署到测试环境除了这个：{success: false, error: {cod

### User (22:05:50)

部署到测试环境除了这个：{success: false, error: {code: "DATABASE_ERROR", message: "A database error occurred"}}
error
: 
{code: "DATABASE_ERROR", message: "A database error occurred"}
code
: 
"DATABASE_ERROR"
message
: 
"A database error occurred"
success
: 
false，是什么问题

### User (22:07:26)

<local-command-stdout>Set model to [1mOpus 4.7 (1M context)[22m with [1mmax[22m effort</local-command-stdout>

### User (22:07:41)

{success: false, error: {code: "DATABASE_ERROR", message: "A database error occurred"}}
error
: 
{code: "DATABASE_ERROR", message: "A database error occurred"}
code
: 
"DATABASE_ERROR"
message
: 
"A database error occurred"
success
: 
false，部署到测试环境出现的，是什么问题

### Assistant (22:08:01)

我来查找 `DATABASE_ERROR` 错误码的来源，看看是什么情况导致的。

### Assistant (22:09:07)

错误来自 `app-minerva-server` 的错误处理中间件。这是 Prisma 抛出的 `PrismaClientKnownRequestError`。让我查看完整的错误处理代码和数据库配置。

### Assistant (22:10:18)

这个错误来自 `app-minerva-server` 的错误处理中间件（`errorHandler.ts:29-41`）。服务端捕获了 Prisma 的 `PrismaClientKnownRequestError`，但返回给前端的是一个**通用错误信息**，隐藏了具体细节。

**实际的错误详情被记录在了两个地方：**
1. 服务器控制台日志：`console.error('Prisma Error:', error)` — 包含完整的 Prisma 错误码和堆栈
2. 飞书告警：`alertToFeishu(error, ...)` — 也发送了完整错误

**你需要去测试环境查看服务器日志**，找到具体的 Prisma 错误码（如 `P2002`、`P2003`、`P2025` 等）。

常见原因包括：

| Prisma 错误码 | 含义 | 常见场景 |
|---|---|---|
| `P2002` | 唯一约束冲突 | 插入了重复的唯一字段值 |
| `P2003` | 外键约束失败 | 引用了不存在的关联记录 |
| `P2025` | 记录未找到 | `update`/`delete` 的目标不存在 |
| `P2010` | 原始查询失败 | SQL 语法错误或表/列不存在 |
| `P2021` | 表不存在 | 数据库 schema 未同步（未执行 migration） |

**鉴于你在 `feature/migrate-minerva-from-monorepo` 分支上**，最可能的原因是：
- 测试环境的数据库 schema 没有同步最新的 migration（比如新增的表或字段还不存在）
- 或者 `DATABASE_URL` 环境变量配置有误

建议你检查：
1. 测试环境的服务器日志，找到完整的 Prisma 错误信息
2. 确认是否执行了 `prisma migrate deploy` 或 `prisma db push` 同步 schema
3. 确认 `.env` 中 `DATABASE_URL` 指向正确的测试数据库

### User (22:11:02)

那这个数据库配置没有问题吧

### Assistant (22:11:36)

让我检查一下数据库配置文件。

### Assistant (22:12:16)

数据库配置格式上**没有问题**，三个环境的配置都是标准的 PostgreSQL 连接字符串。

而且，`PrismaClientKnownRequestError` 这个错误本身就**证明数据库连接是成功的** —— 如果连接有问题（密码错误、地址不通等），抛出的会是 `PrismaClientInitializationError` 或连接超时错误，不会走到 `errorHandler.ts:29` 的那个分支。

所以问题不在连接配置，而是**某个具体的数据库查询失败了**（比如唯一约束冲突、外键约束失败、表/字段不存在等）。

你需要做的是：
1. 去测试环境看服务器日志（`console.error('Prisma Error:', error)` 打出的完整错误），确认是哪个接口、哪个 Prisma 错误码
2. 或者检查飞书告警机器人是否收到了具体错误信息

知道具体的错误码和调用路径后，才能定位根本原因。

### User (22:13:49)

那你从work的sitin-monoerpo和当前的飞书扫码登录对比一下看看有什么不对的吗

### Assistant (22:14:40)

我来对比两个项目中飞书扫码登录的代码。

### Assistant (22:20:12)

子代理暂时不可用，我直接搜索两个项目的代码。

### Assistant (22:21:37)

找到了关键文件，让我对比两边的飞书登录核心实现。

### Assistant (22:24:09)

两个 `feishu.ts` 文件**完全一致**。让我对比路由挂载和数据库模型。

### Assistant (22:24:41)

路由文件也完全一致。让我对比 Prisma schema 中 AdminUser 等相关模型。

### Assistant (22:25:02)

Prisma schema 也完全一致。让我对比 `minerva-schemas` 包中的 schema 定义和 seed 数据。

### Assistant (22:25:58)

schema 定义也一致。让我检查一下包名映射和 seed 数据 —— 看看 `@sitin/minerva-schemas` 在 sitin-next 中的对应包。

### Assistant (22:26:39)

包名一致。让我对比 Prisma 迁移文件和 seed 数据，看看测试数据库是否有 RBAC 表。

### Assistant (22:28:09)

**对比结论：代码层面完全一致，没有差异。**

我逐一对比了以下文件：

| 文件 | 结果 |
|---|---|
| `routes/auth/feishu.ts` | 完全一致 |
| `routes/auth.ts` | 完全一致 |
| `minerva-schemas` (`feishuLoginRequestSchema`) | 完全一致 |
| Prisma schema (`AdminUser`, `Role`, `UserRole`, `AuditLog`) | 完全一致 |
| 包名 `@sitin/minerva-schemas` | 一致 |

所以**问题不在代码，而在测试环境的数据库状态**。注意到一个关键差异：

- **sitin-monorepo** — `prisma/migrations/` 目录是**空的**（可能使用 `prisma db push` 同步）
- **sitin-next** — 有 **16 个 migration 文件**

飞书登录流程中会触发 `PrismaClientKnownRequestError` 的场景：
1. `admin_users` / `admin_roles` / `admin_audit_logs` 表不存在（未执行 migration）
2. 新用户首次登录时创建记录失败（缺少 `Viewer` 角色 —— 未执行 seed）
3. 表结构不匹配（比如缺少 `user_type` 列等）

**你需要在测试环境执行：**
```bash
# 1. 同步数据库 schema
npx prisma migrate deploy

# 2. 初始化种子数据（创建 Viewer/Admin/Super Admin 角色）
npx prisma db seed
```

如果不确定，可以先看一下测试环境的服务器日志，确认具体的 Prisma 错误码是什么。

### User (22:29:18)

 sitin-next — 有 16 个 migration 文件 这些哪来的，为什么有这些

### Assistant (22:29:51)

让我查一下这些 migration 文件的来源和 git 历史。

### Assistant (22:42:23)

所有 16 个 migration 文件都是在一个 commit 中一次性添加的。让我看看 monorepo 那边的情况，以及这些 migration 的内容。

### Assistant (22:43:17)

搞清楚了。这些 migration 文件是**从 monorepo 复制过来的**，完全正常。

来源链路：

1. **monorepo** (`apps/minerva-server/prisma/migrations/`) 里原本就有这些 migration 文件，是开发过程中逐步积累的（有 20+ 个 commit 参与创建）
2. 迁移到 sitin-next 时，commit `7527bba4 refactor(admin): migrate admin` 把整个 `app-minerva-server` 包连带 migration 文件一起复制到了 `packages/app-minerva-server/`

所以这 16 个 migration 文件是 **monorepo 的合法历史迁移记录**，不是凭空出现的。

回到你的 `DATABASE_ERROR` 问题 —— 既然代码完全一致，问题大概率是测试环境部署时没有执行 `prisma migrate deploy` 或 `prisma db seed`。你能看一下测试环境的服务器日志吗？那里会有具体的 Prisma 错误码。

### User (22:44:11)

执行 prisma migrate deploy 或 prisma db                         
  seed是干什么？

### Assistant (22:44:36)

简单说：

**`prisma migrate deploy`** — 把 migration 文件中的 SQL 执行到数据库上，创建/修改表结构。

比如你的 16 个 migration 文件里包含了：
- `20260123111647_admin` → 创建 `admin_users`、`admin_roles`、`admin_permissions` 等 RBAC 表
- `20260127085822_feishu` → 添加飞书登录相关字段
- `20260320000000_add_device_log` → 添加设备日志表
- ... 以此类推

如果测试环境没执行这个命令，数据库里就**没有这些表**，Prisma 查询时就会报 `PrismaClientKnownRequestError`。

**`prisma db seed`** — 往表里插入初始数据。

你的 `seed.ts` 会创建：
- 3 个角色：`Super Admin`、`Admin`、`Viewer`
- 30+ 个权限（`app.read`、`app.write`、`rbac.manage` 等）
- 1 个系统管理员账号 `super_admin`

飞书登录时，新用户会被分配 `Viewer` 角色（`feishu.ts:332`）。如果没执行 seed，`Viewer` 角色不存在，创建用户就会失败。

**总结**：monorepo 那边的测试数据库之前应该是用 `prisma db push` 同步过的，表和数据都在。但如果 sitin-next 部署到测试环境后指向了一个**新的或不同的数据库**，就需要手动执行这两步来初始化。

### User (22:45:22)

在哪执行，怎么执行

### Assistant (22:45:36)

让我先看一下 minerva-server 的 package.json 里有没有现成的脚本。

### Assistant (22:46:01)

看到了，你的 package.json 里已经有现成的脚本。

**需要在测试环境的服务器上执行**（或者本地连接测试数据库也行）：

```bash
# 进入 minerva-server 目录
cd packages/app-minerva-server

# 第一步：同步表结构到数据库（你项目用的是 db:push）
pnpm db:push

# 第二步：插入初始数据（角色、权限、管理员账号）
pnpm db:seed
```

注意你的项目配置的是 `db:push`（`prisma db push`），不是 `prisma migrate deploy`。两者的区别：

| | `prisma db push` | `prisma migrate deploy` |
|---|---|---|
| 作用 | 直接按 schema.prisma 同步表结构 | 按顺序执行 migration SQL 文件 |
| 适用场景 | 开发/原型阶段 | 生产环境 |
| 你项目用的 | **这个** | 没配这个脚本 |

**如果是在本地连测试数据库执行**，需要先切换到 development 环境变量：

```bash
# 用测试环境的 DATABASE_URL
NODE_ENV=development pnpm db:push
NODE_ENV=development pnpm db:seed
```

或者 **SSH 到测试服务器上**，在项目目录里直接执行，因为服务器上的 `.env.development` 已经配置了正确的数据库地址（`10.51.1.3`）。

你平时是怎么部署到测试环境的？Docker 还是直接跑？

### User (22:48:13)

你是说我push代码之前要执行这些命令？

### Assistant (22:48:50)

不是，这些命令跟 push 代码没关系。

**`db:push` 和 `db:seed` 是数据库初始化命令**，只需要在以下情况执行一次：

- 第一次部署到一个新环境
- 数据库是空的或被重建了
- schema 发生了变化（新增了表/字段）

执行位置是**部署后在服务器上执行**，不是在本地 push 之前。

不过让我确认一个关键问题 —— sitin-next 测试环境和 monorepo 测试环境用的是**同一个数据库**吗？

*...conversation truncated for brevity...*
