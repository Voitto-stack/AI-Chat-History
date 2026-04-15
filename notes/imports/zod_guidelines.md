---
title: zod_guidelines
date: 2026-04-15T17:04:47+08:00
source: import
original: zod_guidelines.md
---

# Zod 使用指南

## What/Why

[Zod](https://zod.dev/) 是 TypeScript-first 的 schema 声明和验证库，Minerva 使用它：
- 定义 API 请求/响应的数据结构
- 运行时校验数据
- 自动推导 TypeScript 类型

## 代码位置

所有共享 Schema 定义在 `packages/minerva-schemas/src/`：

```
packages/minerva-schemas/src/
├── index.ts       # 统一导出
├── response.ts    # API 响应类型
├── auth.ts        # 认证相关
├── rbac.ts        # RBAC 相关
├── common.ts      # 通用 Schema
└── feishu.ts      # 飞书集成
```

## 基础用法

### 定义 Schema

```typescript
import { z } from 'zod';

// 基础类型
const stringSchema = z.string();
const numberSchema = z.number();
const booleanSchema = z.boolean();

// 对象
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().optional(),
});

// 数组
const usersSchema = z.array(userSchema);

// 枚举
const userTypeSchema = z.enum(['SYSTEM', 'FEISHU']);

// 联合类型
const idSchema = z.union([z.string(), z.number()]);
// 或简写
const idSchema2 = z.string().or(z.number());
```

### 类型推导

```typescript
// 从 Schema 推导类型
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

type User = z.infer<typeof userSchema>;
// 等同于: { id: string; name: string }

// 导出类型供前后端使用
export type User = z.infer<typeof userSchema>;
```

### 校验数据

```typescript
// 方式 1：parse - 失败抛出 ZodError
const user = userSchema.parse(data);  // 返回校验后的数据

// 方式 2：safeParse - 失败返回错误对象
const result = userSchema.safeParse(data);
if (result.success) {
  const user = result.data;
} else {
  console.error(result.error);
}
```

## 常用 Schema 模式

### 请求 Schema

```typescript
// 创建请求
export const createUserSchema = z.object({
  username: z.string().min(3, '用户名至少 3 个字符'),
  password: z.string().min(6, '密码至少 6 个字符'),
  displayName: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

// 更新请求（所有字段可选）
export const updateUserSchema = createUserSchema.partial();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// 部分字段可选
export const updateUserSchema2 = createUserSchema.partial({
  password: true,  // 只有 password 可选
});
```

### 响应 Schema

```typescript
// 单个资源
export const userSchema = z.object({
  id: z.string(),
  sub: z.string(),
  displayName: z.string().nullable(),  // 可能为 null
  userType: z.enum(['SYSTEM', 'FEISHU']),
  roles: z.array(z.string()),
  permissions: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;

// 列表响应
export const userListSchema = z.array(userSchema);
```

### 通用 Schema

```typescript
// 分页参数
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
});

// ID 参数
export const idParamSchema = z.object({
  id: z.string().cuid(),
});

// 分页响应
export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
  });
```

### API 响应包装

```typescript
// response.ts
export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;

// 类型定义（非 Schema，因为 success 是字面量）
export type ApiSuccessResponse<T = unknown> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: ApiError;
};
```

## 校验技巧

### 自定义错误消息

```typescript
const schema = z.object({
  username: z.string({
    required_error: '用户名不能为空',
    invalid_type_error: '用户名必须是字符串',
  }).min(3, { message: '用户名至少 3 个字符' }),
});
```

### 自定义校验

```typescript
const passwordSchema = z.string()
  .min(6, '密码至少 6 个字符')
  .refine(
    (val) => /[A-Z]/.test(val),
    { message: '密码必须包含大写字母' }
  )
  .refine(
    (val) => /[0-9]/.test(val),
    { message: '密码必须包含数字' }
  );
```

### 条件校验

```typescript
const schema = z.object({
  type: z.enum(['email', 'phone']),
  value: z.string(),
}).refine(
  (data) => {
    if (data.type === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.value);
    }
    return /^\d{11}$/.test(data.value);
  },
  { message: '格式不正确' }
);
```

### 数据转换

```typescript
// 字符串转数字
const schema = z.string().transform((val) => parseInt(val, 10));

// 日期字符串转 Date
const dateSchema = z.string().transform((val) => new Date(val));

// 带默认值
const withDefault = z.string().default('default value');
```

## 后端使用

```typescript
import { createUserSchema } from '@sitin/minerva-schemas';

router.post('/users', async (ctx) => {
  // 校验失败会抛出 ZodError，由 errorHandler 统一处理
  const input = createUserSchema.parse(ctx.request.body);
  
  // input 类型已推导为 CreateUserInput
  const user = await prisma.adminUser.create({
    data: { sub: input.username, ... },
  });
  
  success(ctx, user, 201);
});
```

## 前端使用

```typescript
import { request } from '@/request';
import { userListSchema } from '@sitin/minerva-schemas';
import type { User } from '@sitin/minerva-schemas';

// 方式 1：仅类型提示
const users = await request<User[]>('/api/rbac/users');

// 方式 2：运行时校验
const users = await request('/api/rbac/users', {}, userListSchema);
```

## 相关文档

- [Zod 官方文档](https://zod.dev/)
- [Schema 驱动 API](../03_design_patterns/schema_driven_api.md)
- [前后端契约](../02_architecture/contracts.md)

