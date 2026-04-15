---
title: api_change_protocol
date: 2026-04-15T17:04:47+08:00
source: import
original: api_change_protocol.md
---

# API 变更流程

## Goal

确保 API 变更时前后端保持同步，类型安全，文档及时更新。

## Preconditions

- 理解 [Schema 驱动 API](../03_design_patterns/schema_driven_api.md) 模式
- 了解 [前后端契约](../02_architecture/contracts.md)

## Steps

### 变更顺序

```
1. minerva-schemas  →  2. minerva-server  →  3. minerva  →  4. 文档
    (Schema)             (后端实现)           (前端接入)      (更新)
```

**原则**：Schema 先行，确保类型定义是单一数据源。

### Step 1: 定义/更新 Schema

在 `packages/minerva-schemas/src/` 中定义或修改 Schema：

```typescript
// packages/minerva-schemas/src/rbac.ts

// 新增请求 Schema
export const createFeatureSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export type CreateFeatureInput = z.infer<typeof createFeatureSchema>;

// 新增响应 Schema
export const featureSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(),
});

export type Feature = z.infer<typeof featureSchema>;
```

更新 `index.ts` 确保导出：

```typescript
// packages/minerva-schemas/src/index.ts
export * from './rbac';  // 确保包含新增的导出
```

### Step 2: 实现后端 API

在 `apps/minerva-server/` 实现 API：

```typescript
// apps/minerva-server/src/routes/feature.ts
import Router from '@koa/router';
import { createFeatureSchema } from '@sitin/minerva-schemas';
import { authMiddleware, requirePermission } from '../middlewares/auth.js';
import { success } from '../utils/response.js';
import { prisma } from '../utils/prisma.js';

const router = new Router();

// GET /api/features - 列表
router.get('/', authMiddleware, requirePermission('feature.read'), async (ctx) => {
  const features = await prisma.feature.findMany();
  success(ctx, features);
});

// POST /api/features - 创建
router.post('/', authMiddleware, requirePermission('feature.write'), async (ctx) => {
  const input = createFeatureSchema.parse(ctx.request.body);
  
  const feature = await prisma.feature.create({
    data: input,
  });
  
  success(ctx, feature, 201);
});

export { router as featureRouter };
```

注册路由：

```typescript
// apps/minerva-server/src/routes/index.ts
import { featureRouter } from './feature.js';

router.use('/api/features', featureRouter.routes(), featureRouter.allowedMethods());
```

### Step 3: 前端接入

在 `apps/minerva/src/api/` 创建 API 调用：

```typescript
// apps/minerva/src/api/feature.ts
import { request } from '@/request';
import type { Feature, CreateFeatureInput } from '@sitin/minerva-schemas';

export async function getFeatures(): Promise<Feature[]> {
  return request<Feature[]>('/api/features');
}

export async function createFeature(input: CreateFeatureInput): Promise<Feature> {
  return request<Feature>('/api/features', {
    method: 'POST',
    body: input,
  });
}
```

在页面中使用：

```typescript
// apps/minerva/src/pages/Feature/index.tsx
import { getFeatures, createFeature } from '@/api/feature';
import type { Feature, CreateFeatureInput } from '@sitin/minerva-schemas';

function FeaturePage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  
  useEffect(() => {
    getFeatures().then(setFeatures);
  }, []);
  
  const handleCreate = async (input: CreateFeatureInput) => {
    const newFeature = await createFeature(input);
    setFeatures([...features, newFeature]);
  };
  
  // ...
}
```

### Step 4: 更新文档

如果是重要的 API 变更，更新相关文档：

1. **后端 README**：更新 API 列表（如果需要）
2. **权限文档**：如果新增了权限 Key，更新 [权限命名规范](../03_design_patterns/permission_naming.md)
3. **架构文档**：如果涉及新的设计模式，更新对应文档

## Checklist

### 新增 API

- [ ] Schema 已在 `minerva-schemas` 中定义
- [ ] Schema 已正确导出
- [ ] 后端路由已实现并注册
- [ ] 后端使用 Schema 校验请求
- [ ] 后端使用 `success()` 返回响应
- [ ] 后端添加了适当的权限检查
- [ ] 前端 API 函数已创建
- [ ] 前端使用正确的类型
- [ ] 权限文档已更新（如需要）

### 修改 API

- [ ] Schema 已更新
- [ ] 后端实现已更新
- [ ] 前端调用已更新
- [ ] 确认没有破坏现有功能
- [ ] 考虑是否需要版本兼容

### 删除 API

- [ ] 确认没有前端代码依赖
- [ ] Schema 已删除/标记废弃
- [ ] 后端路由已删除
- [ ] 前端 API 函数已删除
- [ ] 相关权限已清理

## 常见场景

### 场景 1：给现有接口添加字段

```typescript
// 1. Schema 添加字段（可选字段不破坏兼容性）
const userSchema = z.object({
  // ... existing fields
  email: z.string().email().optional(),  // 新增可选字段
});

// 2. 后端添加字段处理
// 3. 前端可选择性使用新字段
```

### 场景 2：修改字段类型

```typescript
// 危险操作！需要考虑兼容性

// 方案 1：新增字段，废弃旧字段
const schema = z.object({
  status: z.number(),  // 旧字段，保持兼容
  statusV2: z.enum(['active', 'inactive']),  // 新字段
});

// 方案 2：后端同时支持两种类型
const input = z.union([oldSchema, newSchema]);
```

### 场景 3：新增权限保护的接口

```typescript
// 1. 定义权限 Key
const permissionKey = 'module.resource.action';

// 2. 数据库添加权限
await prisma.permission.create({
  data: { key: 'module.resource.action', description: '...' }
});

// 3. 后端添加权限检查
router.get('/', authMiddleware, requirePermission('module.resource.action'), ...);

// 4. 前端添加权限控制
{access.can('module.resource.action') && <Component />}

// 5. 更新权限文档
```

## 相关文档

- [前后端契约](../02_architecture/contracts.md)
- [Schema 驱动 API](../03_design_patterns/schema_driven_api.md)
- [Zod 使用指南](../04_tooling/zod_guidelines.md)
- [权限命名规范](../03_design_patterns/permission_naming.md)

