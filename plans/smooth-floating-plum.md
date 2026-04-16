# DMS SQL 拦截层实现计划

## Context
用户要的不是文档，而是直接在 Minerva 里加一层“执行 SQL 前先校验”的后端拦截。当前仓库里没有现成的 DMS 代理，但已经有成熟模式：Koa 路由 + `authMiddleware` / `requirePermission` + `AppError` + `success()` + `@sitin/minerva-schemas` 做 schema-first 校验。目标是先落一版可用的最小实现：支持现有读写场景，但拦掉明显危险 SQL，并把所有走 DMS 的 SQL 收口到一个统一服务里。

## 推荐方案
新增一个受控入口 `POST /api/dms/sql/execute`：
- 路由层做登录、权限、请求体校验
- 服务层做 SQL 拦截：单语句检查、操作类型识别、危险关键字拦截、写操作白名单校验
- 校验通过后才转发到外部 DMS `POST /sql/execute`

## 关键文件
- 新增：`packages/minerva-schemas/src/dms.ts`
- 修改：`packages/minerva-schemas/src/index.ts`
- 新增：`apps/minerva-server/src/services/dms.ts`
- 新增：`apps/minerva-server/src/routes/dms.ts`
- 修改：`apps/minerva-server/src/routes/index.ts`
- 修改：`apps/minerva-server/src/config/env.ts`
- 可选后续接入点：当前已有直接 SQL 执行逻辑，如 `apps/minerva-server/src/routes/posts/posts.ts:237`，后续可逐步迁入统一 guard

## 复用现有模式
- 权限与登录：`apps/minerva-server/src/middlewares/auth.ts`
- 错误抛出：`apps/minerva-server/src/utils/AppError.ts`
- 成功响应：`apps/minerva-server/src/utils/response.ts`
- 外部服务封装参考：`apps/minerva-server/src/services/external-service.ts`
- 路由挂载参考：`apps/minerva-server/src/routes/index.ts`

## 实施步骤

### 1. 共享 Schema
在 `packages/minerva-schemas/src/dms.ts` 定义：
- `dmsSqlExecuteRequestSchema`
  - `action: string`（业务动作名，用来区分允许的写操作）
  - `dataSourceId: string`
  - `database: string`
  - `sql: string`
  - `page?: number`
  - `pageSize?: number`
- `dmsSqlExecuteResponseSchema`
- `DmsSqlExecuteRequest` / `DmsSqlExecuteResponse` 类型导出

然后在 `packages/minerva-schemas/src/index.ts` 里导出。

### 2. 服务端 DMS service
新增 `apps/minerva-server/src/services/dms.ts`，包含：
- `executeGuardedDmsSql(input, actor)`
- `classifySql(sql)`：识别 `select / insert / update / delete / other`
- `assertSqlAllowed(input)`：做拦截
- `postToDms(payload)`：真正请求外部 DMS

第一版规则：
- 拦截多语句：禁止中间出现多个 `;`
- 拦截危险语句：`drop` / `truncate` / `alter` / `create` / `grant` / `revoke` / `begin` / `commit` / `rollback`
- `update` / `delete` 必须带 `where`
- 只允许指定 `dataSourceId` 和 `database`
- `insert/update/delete` 不按“全部禁止”处理，而是要求 `action` 命中服务端白名单

白名单先写在服务端常量里，例如：
- `ACTION_POLICY['post.score.modify'] = { operation: 'update', tables: ['post_interact_count'] }`
- 之后再按真实业务慢慢补

### 3. 新增路由
新增 `apps/minerva-server/src/routes/dms.ts`：
- `const dmsRouter = new Router()`
- `dmsRouter.post('/sql/execute', authMiddleware, requirePermission('dms.sql.execute'), async (ctx) => { ... })`
- `const input = dmsSqlExecuteRequestSchema.parse(ctx.request.body)`
- `const data = await executeGuardedDmsSql(input, ctx.state.user)`
- `success(ctx, data)`

注意：不要用 `union.*` 权限名，因为 `apps/minerva-server/src/middlewares/auth.ts:164` 当前会绕过 `union.*` 校验。这里直接用新权限名：`dms.sql.execute`。

### 4. 挂载总路由
在 `apps/minerva-server/src/routes/index.ts`：
- 引入 `dmsRouter`
- 挂到 `router.use('/api/dms', dmsRouter.routes(), dmsRouter.allowedMethods())`

### 5. 环境变量
在 `apps/minerva-server/src/config/env.ts` 增加：
- `DMS_BASE_URL`（必需）
- `DMS_API_TOKEN`（必需）
- `DMS_ALLOWED_DATA_SOURCE_IDS`（必需，逗号分隔）
- `DMS_ALLOWED_DATABASES`（必需，逗号分隔）
- `DMS_TIMEOUT_MS`（可选）

### 6. 逐步迁移现有写 SQL
第一版先把新入口建好，不强行重构所有老代码。
之后逐步把真正需要“经 DMS 执行”的地方迁过去。
如果要先挑一个现有写操作试点，可参考：
- `apps/minerva-server/src/routes/posts/posts.ts:237`

## 验证方式

### 静态验证
- `pnpm --filter @sitin/minerva-schemas build`
- `pnpm --filter @sitin/minerva-server lint`
- `pnpm --filter @sitin/minerva-server build:dev`

### 手工接口验证
启动 `apps/minerva-server` 后验证：
1. 合法 `select` 请求应放行
2. `drop table ...` 应返回 4xx
3. `update xxx set ...` 但没有 `where` 应返回 4xx
4. 合法白名单写操作应放行
5. 非白名单写操作应返回 403/400
6. 非允许 `dataSourceId` / `database` 应被拦截

### UI / 调用链验证
如果前端接这个新接口，需要实际从页面触发一次读操作和一次合法写操作，确认：
- 请求先到 Minerva Server
- 再由 Minerva Server 转发 DMS
- 拦截错误能正常显示

## 风险与控制
- 当前仓库没有完整 DMS 调用链，第一版只能先建统一入口，不会自动覆盖所有历史 SQL 执行点
- 字符串级 SQL 拦截不是完美解析器，但足够做第一版防误操作
- 真正敏感的写操作必须继续走服务端 action 白名单，不能只靠 SQL 文本前缀判断
