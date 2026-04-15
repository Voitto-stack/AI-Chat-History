---
title: contracts
date: 2026-04-15T17:04:47+08:00
source: import
original: contracts.md
---

# 前后端契约

## Problem

前后端需要统一的 API 响应格式和错误处理机制，以便：
- 前端可以用统一的逻辑处理所有 API 响应
- 错误信息能够准确传达给用户
- TypeScript 类型可以在前后端共享

## Solution

### 响应格式契约

所有 API 响应遵循以下格式：

#### 成功响应

```typescript
// HTTP 状态码：2xx
{
  success: true,
  data: T  // 业务数据
}
```

#### 错误响应

```typescript
// HTTP 状态码：非 2xx（400/401/403/404/500 等）
{
  success: false,
  error: {
    code: string,      // 错误码，如 "UNAUTHORIZED"、"VALIDATION_ERROR"
    message: string,   // 人类可读的错误信息
    details?: unknown  // 可选的详细信息（如校验错误详情）
  }
}
```

### 类型定义

类型定义位于 `packages/minerva-schemas/src/response.ts`：

```typescript
// API 错误结构
export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;

// 成功响应
export type ApiSuccessResponse<T = unknown> = {
  success: true;
  data: T;
};

// 错误响应
export type ApiErrorResponse = {
  success: false;
  error: ApiError;
};

// 统一响应类型
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;
```

## 后端实现

### 成功响应

使用 `success()` 辅助函数（`apps/minerva-server/src/utils/response.ts`）：

```typescript
import { success } from '../utils/response.js';

router.get('/users', async (ctx) => {
  const users = await prisma.adminUser.findMany();
  success(ctx, users);  // 自动设置 HTTP 200 + { success: true, data: users }
});

// 自定义状态码
router.post('/users', async (ctx) => {
  const user = await prisma.adminUser.create({ data: ... });
  success(ctx, user, 201);  // HTTP 201
});
```

### 错误响应

**不要**手动构造错误响应，而是 **throw AppError**：

```typescript
import { AppError } from '../utils/AppError.js';

// 使用静态工厂方法
throw AppError.badRequest('用户名已存在', 'USERNAME_EXISTS');
throw AppError.unauthorized('登录已过期');
throw AppError.forbidden('没有权限');
throw AppError.notFound('用户不存在');
throw AppError.conflict('资源冲突');

// 或直接构造
throw new AppError('自定义错误', 400, 'CUSTOM_ERROR');
```

`errorHandler` 中间件会统一捕获并转换为标准响应格式。

### 错误码约定

| 错误码 | HTTP 状态码 | 说明 |
|--------|-------------|------|
| `BAD_REQUEST` | 400 | 请求参数错误 |
| `VALIDATION_ERROR` | 400 | Zod 校验失败 |
| `UNAUTHORIZED` | 401 | 未认证或 Token 无效/过期 |
| `FORBIDDEN` | 403 | 已认证但无权限 |
| `NOT_FOUND` | 404 | 资源不存在 |
| `CONFLICT` | 409 | 资源冲突（如重复创建） |
| `DATABASE_ERROR` | 400 | Prisma 操作失败 |
| `INTERNAL_ERROR` | 500 | 服务器内部错误 |

## 前端实现

### 全局错误处理

前端只需处理 **HTTP 非 2xx** 的情况（`apps/minerva/src/request/config.ts`）：

```typescript
errorHandler(error: any, opts?: any) {
  const { response } = error;
  const { status, data } = response;
  
  // 从后端响应提取错误信息
  const errorMessage = data?.error?.message || '请求失败';
  
  // 401 且有 token：自动登出
  if (status === 401 && !opts?.skipAuth && getSessionToken()) {
    message.error(errorMessage);
    removeSessionCookie();
    setTimeout(() => window.location.reload(), 800);
    return;
  }
  
  // 其他错误：显示提示
  message.error(`请求错误 ${status}: ${errorMessage}`);
  throw error;
}
```

### 请求封装

使用 `request()` 函数发起请求（`apps/minerva/src/request/client.ts`）：

```typescript
import { request } from '@/request';
import { userSchema } from '@sitin/minerva-schemas';

// 基础用法
const users = await request<User[]>('/api/rbac/users');

// 带 Schema 校验（可选）
const user = await request('/api/rbac/users/123', {}, userSchema);

// POST 请求
const newUser = await request<User>('/api/rbac/users', {
  method: 'POST',
  body: { username: 'test', password: '123456' }
});
```

## Example

### 完整的 API 调用链路

**1. Schema 定义**（`packages/minerva-schemas/src/rbac.ts`）：

```typescript
export const createUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
```

**2. 后端路由**（`apps/minerva-server/src/routes/rbac/users.ts`）：

```typescript
router.post('/', authMiddleware, requirePermission('rbac.user.write'), async (ctx) => {
  const input = createUserSchema.parse(ctx.request.body);  // 校验
  
  const existing = await prisma.adminUser.findUnique({ where: { sub: input.username } });
  if (existing) {
    throw AppError.conflict('用户名已存在', 'USERNAME_EXISTS');
  }
  
  const user = await prisma.adminUser.create({ ... });
  success(ctx, user, 201);
});
```

**3. 前端调用**（`apps/minerva/src/api/rbac.ts`）：

```typescript
import { request } from '@/request';
import type { CreateUserInput } from '@sitin/minerva-schemas';

export async function createUser(input: CreateUserInput) {
  return request<User>('/api/rbac/users', {
    method: 'POST',
    body: input,
  });
}
```

## Trade-offs

| 决策 | 优点 | 缺点 |
|------|------|------|
| 错误一律 HTTP 非 2xx | 前端错误处理逻辑统一简洁 | 需要后端严格遵守约定 |
| 共享 Schema 包 | 类型安全、单一数据源 | 需要维护额外的包 |
| 前端 Schema 校验可选 | 灵活、减少冗余校验 | 如果需要强校验需要手动传入 |

## 相关文档

- [错误处理模式](../03_design_patterns/error_handling.md)
- [Schema 驱动 API](../03_design_patterns/schema_driven_api.md)
- [请求链路](./request_flow.md)

