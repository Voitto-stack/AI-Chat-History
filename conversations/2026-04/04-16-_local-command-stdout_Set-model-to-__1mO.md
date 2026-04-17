---
title: 你找下这个项目，看看那里是操作数据表的
date: 2026-04-16T22:12:57+08:00
session_id: 92aa3158-54ae-43d6-97de-3230a51cb3e8
project: /Users/presence79/Desktop/WORK/sitin-next
source: claude-code-capture
messages: 8
---

# 你找下这个项目，看看那里是操作数据表的

### User (22:13:02)

你找下这个项目，看看那里是操作数据表的

### Assistant (22:15:06)

### 1. 直接执行

有，**操作数据表** 的主入口就在 DMS 的 SQL 模块里，前后端各有一层。

你如果问“哪里在拿表名 / 浏览表 / 点表后操作表”，最直接看这几个地方：

#### 后端：列出数据表
核心在：

- `packages/app-dms-server/src/sql/sql.service.ts:194`

这里的 `postSqlTables` 就是“查询某个数据库下面有哪些表”。

关键逻辑是：

- 先拿 `dataSourceId` 和 `database`：`packages/app-dms-server/src/sql/sql.service.ts:195`
- 通过 `getPoolForDatabase(...)` 连到对应数据库：`packages/app-dms-server/src/sql/sql.service.ts:200`
- 根据数据库类型拼查询表名的 SQL：`packages/app-dms-server/src/sql/sql.service.ts:204`

具体 SQL 是：

- MySQL:
  `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = '${database}' ORDER BY TABLE_NAME`
  `packages/app-dms-server/src/sql/sql.service.ts:206`

- PostgreSQL:
  `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`
  `packages/app-dms-server/src/sql/sql.service.ts:207`

所以如果你找“项目里哪里真正查数据表列表”，答案就是这里。

#### 后端：暴露成接口
这个能力是通过 controller 挂出来的：

- `packages/app-dms-server/src/sql/sql.controller.ts:15`

对应接口就是：

- `POST /sql/tables`：`packages/app-dms-server/src/sql/sql.controller.ts:16`

而且这个接口受统一权限控制：

- `packages/app-dms-server/src/auth/auth.permissions.ts:34`

也就是登录后才能访问。

---

#### 前端：请求表列表
前端 API 包装在：

- `packages/app-dms-web/src/api/sql.ts:30`

这里的 `listTables(dataSourceId, database)` 会请求：

- `POST /sql/tables`：`packages/app-dms-web/src/api/sql.ts:31`

---

#### 前端：什么时候拉表
真正触发表列表加载的是 SQL 编辑器页：

- `packages/app-dms-web/src/pages/SqlEditor/index.tsx:41`

这段逻辑是：

- 当 `selectedSource` 和 `selectedDatabase` 都存在时
- 调 `listTables(selectedSource, selectedDatabase)`
- 把返回结果塞进 `tables` 状态

关键代码：

- 拉表：`packages/app-dms-web/src/pages/SqlEditor/index.tsx:44`
- 保存到状态：`packages/app-dms-web/src/pages/SqlEditor/index.tsx:45`

---

#### 前端：表列表 UI
显示表名的组件是：


*...truncated...*

### User (22:18:37)

你看看这里有没有操作DMS的自定义的dms接管数 据库

### Assistant (22:23:48)

### 1. 直接执行

有，但要说准确一点：

**这个项目没有自己实现一个数据库内核或 SQL 引擎；它做的是一层“DMS 接管层”——把外部 MySQL / PostgreSQL 的连接、权限、审批、审计、连接池和执行入口统一接管起来。**

也就是说，它不是自己存表、自己做数据库，而是**托管外部数据库访问**。

最能证明这一点的是 `business-dms-datasource`。

核心代码在：

- `packages/business-dms-datasource/src/datasources.service.ts:47`
- `packages/business-dms-datasource/src/datasources.service.ts:108`

这里有两个关键函数。

#### 1) `getPool(ds)`
位置：

- `packages/business-dms-datasource/src/datasources.service.ts:47`

它做的事情是：

- 按 `dataSourceId + database` 生成 pool key：`packages/business-dms-datasource/src/datasources.service.ts:43`
- 如果这个池已经存在，就直接复用：`packages/business-dms-datasource/src/datasources.service.ts:60`
- 如果没有，就根据数据源类型创建 MySQL 或 PostgreSQL 连接池：`packages/business-dms-datasource/src/datasources.service.ts:62`
- 然后缓存到内部 `pools` map：`packages/business-dms-datasource/src/datasources.service.ts:83`

这已经说明：**数据库连接不是页面直接乱连，而是由 DMS 自己统一托管和复用。**

#### 2) `getPoolForDatabase(dataSourceId, database, encryptionKey)`
位置：

- `packages/business-dms-datasource/src/datasources.service.ts:108`

它做的是：

- 根据数据源 ID 查 DMS 自己保存的连接配置
- 解密数据库密码：`packages/business-dms-datasource/src/datasources.service.ts:88`
- 再切到目标 database，返回对应连接池：`packages/business-dms-datasource/src/datasources.service.ts:113`

这说明系统不仅记住了“有哪些数据库”，还掌握了“怎么安全连上它们”。

---

再往下看底层实现，它不是自研数据库协议，而是对现成驱动做了一层统一抽象：

- PostgreSQL 用 `pg.Pool`：`packages/server-plugin-pg/src/index.ts:27`
- MySQL 用 `mysql2/promise.createPool`：`packages/server-plugin-mysql/src/index.ts:17`

所以更准确地说，这里的“自定义 DMS”本质是：

**自定义控制层 + 现成数据库驱动**

---

更关键的是，它不只接管“连接”，还接管“执行流程”。

审批执行逻辑在：

- `packages/business-dms-approval/src/approvals.service.ts:84`

这里的 `approvalExecute(encryptionKey)` 不是直接让前端随便改库，而是：

- 先取 approval 记录：`packages/business-dms-approval/src/approvals.service.ts:107`
- 只有 `approved` 或 `execute_failed` 状态才允许执行：`packages/business-dms-approval/src/approvals.service.ts:108`
- 再根据 `dataSourceId / dbName` 取连接池：`packages/business-dms-approval/src/approvals.service.ts:118`
- 用连接池执行审批单里的 SQL：`packages/business-dms-approval/src/approvals.service.ts:127`
- 更新执行结果状态：`packages/business-dms-approval/src/approvals.service.ts:130`
- 写审计日志：`packages/business-dms-approval/src/approvals.service.ts:132`

所以它不是单纯“帮你连个数据库”，而是把 **改库动作包成了一套受控工作流**。

应用层这边只是把它挂出来：

- `packages/app-dms-server/src/approvals/approvals.service.ts:11`

这里用 `config.encryptionKey` 把 `business-dms-approval` 里的执行逻辑绑定成真正可用的接口处理器。


*...truncated...*

### User (22:42:28)

那一层自己的数据库代理 / 调度层，统一接管外部数据库访问怎么实现的，告诉我代码怎么实现的怎么看，然后你怎么证明他就是我说的那一套

### Assistant (23:00:26)

### 1. 直接执行

我直接用“代码证明链”回答你，不靠概念。

你说的那一套，如果成立，代码里必须同时满足这 5 个条件：

1. **外部数据库连接信息不是散落在业务代码里，而是被 DMS 集中登记**
2. **真正连库前，必须先经过 DMS 自己的数据源解析 / 解密**
3. **真正执行 SQL 时，不是每个模块自己 new connection，而是统一走同一个池获取入口**
4. **直执行和审批执行都复用这套入口**
5. **业务模块不直接依赖 mysql2 / pg，而是依赖 DMS 抽象层**

这个项目 5 条全中，所以我才说它就是你讲的“自己的数据库代理 / 调度层”。

---

## 一、代码到底怎么实现的

### 第 1 层：外部数据库先被 DMS 自己登记管理

看：

- `packages/business-dms-datasource/src/datasources.model.ts:3`

这里所有数据源都不是写死在代码里，而是落在 **DMS 自己的 app DB** 里，通过 `getPgDb()` 读写。

关键函数：

- `listDataSources()`：`packages/business-dms-datasource/src/datasources.model.ts:3`
- `getDataSourceById()`：`packages/business-dms-datasource/src/datasources.model.ts:7`
- `getDataSourceRow()`：`packages/business-dms-datasource/src/datasources.model.ts:11`
- `insertDataSource()`：`packages/business-dms-datasource/src/datasources.model.ts:15`
- `updateDataSource()`：`packages/business-dms-datasource/src/datasources.model.ts:45`

这说明什么？

说明“外部数据库是谁、host 是什么、port 是什么、用户名是什么、pool 多大”这套信息，不是每个业务模块自己知道，而是**先被 DMS 自己托管**。

这就是“接管”的第一个证据。

---

### 第 2 层：真正连外部库前，必须先经过 DMS 的凭据层

看：

- `packages/business-dms-datasource/src/datasources.service.ts:88`

这里的 `getDataSourceWithPassword(id, encryptionKey)` 会：

1. 先从 DMS 的 `data_sources` 记录取原始行：`packages/business-dms-datasource/src/datasources.service.ts:92`
2. 再解密 `password_encrypted`：`packages/business-dms-datasource/src/datasources.service.ts:101`
3. 返回一个真正可连接的配置对象

这一步非常关键。

因为它证明：

**真正连外部数据库之前，必须先穿过 DMS 自己的“数据源 + 密码解密”这一层。**

如果没有这层，你会看到业务代码自己拿 env、自己拿密码、自己组装连接参数。
这里没有。

---

### 第 3 层：统一连接入口被收口到 `getPool()`

看：

- `packages/business-dms-datasource/src/datasources.service.ts:46`

这个 `getPool(ds)` 就是统一的外部数据库访问入口。

它的逻辑非常清楚：

- 用 `dataSourceId + database` 计算池 key：`packages/business-dms-datasource/src/datasources.service.ts:42`
- 如果池已存在，直接复用：`packages/business-dms-datasource/src/datasources.service.ts:59`
- 如果没有，根据类型创建 MySQL 或 PostgreSQL 连接池：`packages/business-dms-datasource/src/datasources.service.ts:62`
- 然后塞进 `pools` map：`packages/business-dms-datasource/src/datasources.service.ts:83`


*...truncated...*

### User (23:12:01)

操作数据表之前会有那种校验和拦截什么的在里面吗

### Assistant (23:15:03)

### 1. 直接执行

有，而且不止一层。

如果你问“在真正碰到数据表之前，会不会先被拦几次”，答案是：

**会，至少 4 到 6 层。**

---

## 第一层：统一登录鉴权拦截

所有请求先过 `authHook`：

- `packages/app-dms-server/src/app.ts:24`
- `packages/app-dms-server/src/auth/auth.permissions.ts:54`

这里会做：

- 看当前路由是否要求登录：`packages/app-dms-server/src/auth/auth.permissions.ts:56`
- 从 `Authorization: Bearer ...` 取 token：`packages/app-dms-server/src/auth/auth.permissions.ts:58`
- 没 token 直接 401：`packages/app-dms-server/src/auth/auth.permissions.ts:60`
- token 非法直接 401：`packages/app-dms-server/src/auth/auth.permissions.ts:63`
- 角色不匹配直接 403：`packages/app-dms-server/src/auth/auth.permissions.ts:68`

所以第一道闸门是：

**你是不是合法用户，你这个角色能不能碰这个接口。**

---

## 第二层：接口级权限拦截

就算通过登录校验，接口本身还有权限表控制。

跟表操作最相关的是：

- `POST /sql/execute`：`packages/app-dms-server/src/auth/auth.permissions.ts:32`
- `POST /sql/tables`：`packages/app-dms-server/src/auth/auth.permissions.ts:34`
- `POST /approvals/create`：`packages/app-dms-server/src/auth/auth.permissions.ts:38`
- `POST /approvals/execute`：`packages/app-dms-server/src/auth/auth.permissions.ts:42`

这层的意思是：

- 浏览表列表，必须先登录
- 执行 SQL，虽然四种角色都能进接口，但这只是“允许进入执行逻辑”
- 审批执行只有 admin / maintainer 才能做

所以路由层只是第一波放行，不代表你后面一定能改表。

---

## 第三层：SQL 业务级校验和拦截

这个才是和“碰表”最直接相关的一层。

核心在：

- `packages/app-dms-server/src/sql/sql.service.ts:50`
- `packages/app-dms-server/src/sql/sql.service.ts:108`

这里会做几类前置校验。

### 1) 参数校验
没有 `dataSourceId` 或 `sql`，直接 400：

- `packages/app-dms-server/src/sql/sql.service.ts:53`

### 2) 数据源存在性校验
找不到 data source，直接 404：

- `packages/app-dms-server/src/sql/sql.service.ts:62`
- `packages/app-dms-server/src/sql/sql.service.ts:123`

### 3) 按角色限制能碰哪些库
`developer` / `viewer` 只能碰名字带 `-test` 的数据源：

- `packages/app-dms-server/src/sql/sql.service.ts:63`

这意味着即使你已登录、接口也能进，**你也不一定能碰生产库**。

*...truncated...*

*...conversation truncated for brevity...*
