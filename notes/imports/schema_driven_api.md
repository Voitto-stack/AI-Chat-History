---
title: schema_driven_api
date: 2026-04-15T17:04:47+08:00
source: import
original: schema_driven_api.md
---

# Schema 驱动 API

## Problem

前后端需要共享类型定义和校验逻辑：
- 避免前后端类型不一致
- 减少重复的校验代码
- 提供清晰的 API 契约

## Context

- TypeScript 提供静态类型检查
- Zod 提供运行时校验和类型推导
- Monorepo 结构支持共享包

## Solution

使用 `packages/minerva-schemas` 作为前后端共享的 Schema 层：

```
┌─────────────────────────────────────────────────────────────┐
│                  packages/minerva-schemas                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  auth.ts    │  │  rbac.ts    │  │ response.ts │  ...    │
│  │  (Schema)   │  │  (Schema)   │  │  (Types)    │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          │                                  │
│                    index.ts (统一导出)                       │
└──────────────────────────┼──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
┌─────────────────┐  ┌─────────────────┐  (其他消费者)
│ apps/minerva    │  │ minerva-server  │
│ (前端)          │  │ (后端)          │
└─────────────────┘  └─────────────────┘
```

### Schema 组织结构

```
packages/minerva-schemas/src/
├── index.ts       # 统一导出
├── response.ts    # API 响应类型（ApiSuccessResponse、ApiErrorResponse）
├── auth.ts        # 认证相关（登录请求/响应）
├── rbac.ts        # RBAC 相关（用户/角色/权限 CRUD）
├── common.ts      # 通用 Schema（分页、ID 等）
└── feishu.ts      # 飞书集成 Schema
```

### Schema 编写规范

#### 1. 请求 Schema

```typescript
// rbac.ts
import { z } from 'zod';

// 创建用户请求
export const createUserSchema = z.object({
  username: z.string().min(3, '用户名至少 3 个字符'),
  password: z.string().min(6, '密码至少 6 个字符'),
  displayName: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

// 更新用户请求（部分字段可选）
export const updateUserSchema = createUserSchema.partial();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
```

#### 2. 响应 Schema

```typescript
// rbac.ts
export const userSchema = z.object({
  id: z.string(),
  sub: z.string(),
  displayName: z.string().nullable(),
  userType: z.enum(['SYSTEM', 'FEISHU']),
  roles: z.array(z.string()),
  permissions: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;

// 列表响应
export const userListSchema = z.array(userSchema);
```

#### 3. 通用 Schema

```typescript
// common.ts
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
});

export const idParamSchema = z.object({
  id: z.string().cuid(),
});
```

### 后端使用

#### 请求校验

```typescript
import { createUserSchema } from '@sitin/minerva-schemas';

router.post('/users', async (ctx) => {
  // Zod 校验，失败自动抛出 ZodError（由 errorHandler 处理）
  const input = createUserSchema.parse(ctx.request.body);
  
  // input 类型为 CreateUserInput
  const user = await prisma.adminUser.create({
    data: {
      sub: input.username,
      password: await hash(input.password),
      displayName: input.displayName,
    },
  });
  
  success(ctx, user, 201);
});
```

#### 安全校验（.safeParse）

```typescript
import { updateUserSchema } from '@sitin/minerva-schemas';

router.patch('/users/:id', async (ctx) => {
  const result = updateUserSchema.safeParse(ctx.request.body);
  
  if (!result.success) {
    throw AppError.badRequest('参数校验失败', 'VALIDATION_ERROR');
  }
  
  const input = result.data;
  // ...
});
```

### 前端使用

#### 类型导入

```typescript
import type { User, CreateUserInput } from '@sitin/minerva-schemas';

// 用于组件 props
interface UserCardProps {
  user: User;
}

// 用于表单
const [formData, setFormData] = useState<CreateUserInput>({
  username: '',
  password: '',
});
```

#### 响应校验（可选）

```typescript
import { request } from '@/request';
import { userListSchema } from '@sitin/minerva-schemas';

// 方式 1：仅类型提示，不做运行时校验
const users = await request<User[]>('/api/rbac/users');

// 方式 2：运行时校验（更严格）
const users = await request('/api/rbac/users', {}, userListSchema);
```

## Example

### 新增 API 的完整流程

**场景**：新增"创建角色"API

**1. 在 minerva-schemas 定义 Schema**：

```typescript
// packages/minerva-schemas/src/rbac.ts
export const createRoleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  permissionIds: z.array(z.string()).optional(),
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  permissions: z.array(z.object({
    id: z.string(),
    key: z.string(),
  })),
});

export type Role = z.infer<typeof roleSchema>;
```

**2. 更新 index.ts 导出**：

```typescript
// packages/minerva-schemas/src/index.ts
export * from './rbac';
```

**3. 后端实现**：

```typescript
// apps/minerva-server/src/routes/rbac/roles.ts
import { createRoleSchema } from '@sitin/minerva-schemas';

router.post('/', authMiddleware, requirePermission('rbac.role.write'), async (ctx) => {
  const input = createRoleSchema.parse(ctx.request.body);
  
  const role = await prisma.role.create({
    data: {
      name: input.name,
      description: input.description,
      rolePermissions: input.permissionIds ? {
        create: input.permissionIds.map(id => ({ permissionId: id })),
      } : undefined,
    },
    include: { rolePermissions: { include: { permission: true } } },
  });
  
  success(ctx, role, 201);
});
```

**4. 前端调用**：

```typescript
// apps/minerva/src/api/rbac.ts
import { request } from '@/request';
import type { CreateRoleInput, Role } from '@sitin/minerva-schemas';

export async function createRole(input: CreateRoleInput): Promise<Role> {
  return request<Role>('/api/rbac/roles', {
    method: 'POST',
    body: input,
  });
}
```

## Trade-offs

| 决策 | 优点 | 缺点 |
|------|------|------|
| 共享 Schema 包 | 类型一致，单一数据源 | 需要维护额外的包 |
| 后端强制校验 | 数据安全，错误信息详细 | 少量性能开销 |
| 前端可选校验 | 灵活，减少冗余 | 可能遗漏问题 |
| Zod 推导类型 | 类型和校验同步 | 学习成本 |

## 相关文档

- [前后端契约](../02_architecture/contracts.md)
- [Zod 使用指南](../04_tooling/zod_guidelines.md)
- [API 变更流程](../05_dev_process/api_change_protocol.md)

