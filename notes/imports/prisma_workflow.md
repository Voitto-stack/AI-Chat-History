---
title: prisma_workflow
date: 2026-04-15T17:04:47+08:00
source: import
original: prisma_workflow.md
---

# Prisma 工作流

## What/Why

[Prisma](https://www.prisma.io/) 是 Minerva Server 使用的 ORM，提供：
- 类型安全的数据库访问
- 声明式数据模型定义
- 自动生成迁移
- 可视化数据管理工具

## Commands

在 `apps/minerva-server` 目录下执行：

```bash
# 生成 Prisma Client（修改 schema 后必须执行）
pnpm db:generate

# 创建并应用迁移（开发环境）
pnpm db:migrate

# 直接推送 schema 到数据库（跳过迁移，仅开发用）
pnpm db:push

# 填充初始数据
pnpm db:seed

# 打开 Prisma Studio（可视化数据管理）
pnpm db:studio
```

## Config Entrypoints

### `prisma/schema.prisma`

数据模型定义：

```prisma
// Prisma Client 生成配置
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

// 数据库连接
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 数据模型
model AdminUser {
  id          String   @id @default(cuid())
  sub         String   @unique @db.VarChar(100)
  displayName String?  @map("display_name")
  password    String   @db.VarChar(255)
  userType    UserType @default(FEISHU)
  
  userRoles   UserRole[]
  
  @@map("admin_users")  // 数据库表名
}
```

### `prisma/migrations/`

迁移文件目录，每次 `pnpm db:migrate` 会在此创建新的迁移：

```
prisma/migrations/
├── 20260123111647_admin/
│   └── migration.sql
├── 20260127085822_feishu/
│   └── migration.sql
└── migration_lock.toml
```

### `prisma/seed.ts`

初始数据填充脚本：

```typescript
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // 创建初始权限
  await prisma.permission.createMany({
    data: [
      { key: 'rbac.user.read', description: '查看用户' },
      { key: 'rbac.user.write', description: '编辑用户' },
      // ...
    ],
    skipDuplicates: true,
  });
  
  // 创建 super_admin 角色
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'super_admin' },
    create: { name: 'super_admin', description: '超级管理员' },
    update: {},
  });
  
  // 创建初始用户
  await prisma.adminUser.upsert({
    where: { sub: 'super_admin' },
    create: {
      sub: 'super_admin',
      password: await hash('admin123'),
      userType: 'SYSTEM',
      userRoles: {
        create: { roleId: superAdminRole.id },
      },
    },
    update: {},
  });
}

main();
```

### `.env` / `.env.example`

环境变量配置：

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/minerva?schema=public"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=29001
```

## 常见操作

### 1. 修改数据模型

1. 编辑 `prisma/schema.prisma`
2. 创建迁移：
   ```bash
   pnpm db:migrate
   # 输入迁移名称，如：add_user_avatar
   ```
3. 重新生成 Client：
   ```bash
   pnpm db:generate
   ```

### 2. 添加新表

```prisma
model NewFeature {
  id        String   @id @default(cuid())
  name      String   @db.VarChar(100)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  // 关联
  userId    String   @map("user_id")
  user      AdminUser @relation(fields: [userId], references: [id])
  
  @@map("new_features")
}
```

### 3. 添加字段

```prisma
model AdminUser {
  // 新增字段
  email     String?  @db.VarChar(255)
  phone     String?  @db.VarChar(50)
}
```

### 4. 重置开发数据库

```bash
# 删除所有数据并重新应用迁移
npx prisma migrate reset

# 这会：
# 1. 删除数据库
# 2. 重新创建数据库
# 3. 应用所有迁移
# 4. 运行 seed
```

### 5. 查看数据库状态

```bash
# 检查迁移状态
npx prisma migrate status

# 打开可视化界面
pnpm db:studio
```

## 迁移策略

### 开发环境

- 使用 `pnpm db:migrate` 创建迁移
- 可以使用 `pnpm db:push` 快速测试 schema 变更（不创建迁移）
- 需要重置时使用 `npx prisma migrate reset`

### 生产环境

- 只使用 `npx prisma migrate deploy` 应用迁移
- 不要在生产环境使用 `db:push` 或 `migrate reset`
- 迁移文件必须提交到代码仓库

### 迁移注意事项

| 操作 | 风险 | 建议 |
|------|------|------|
| 添加字段 | 低 | 新字段设置默认值或允许 null |
| 删除字段 | 高 | 确保无代码依赖后再删除 |
| 重命名字段 | 高 | 分两步：添加新字段 → 数据迁移 → 删除旧字段 |
| 添加唯一约束 | 中 | 确保现有数据无重复 |
| 修改字段类型 | 高 | 可能需要数据转换 |

## 代码使用示例

### 基础 CRUD

```typescript
import { prisma } from '../utils/prisma.js';

// 查询
const users = await prisma.adminUser.findMany({
  include: { userRoles: true },
});

const user = await prisma.adminUser.findUnique({
  where: { id: userId },
});

// 创建
const newUser = await prisma.adminUser.create({
  data: {
    sub: 'username',
    password: hashedPassword,
    userType: 'SYSTEM',
  },
});

// 更新
const updated = await prisma.adminUser.update({
  where: { id: userId },
  data: { displayName: 'New Name' },
});

// 删除
await prisma.adminUser.delete({
  where: { id: userId },
});
```

### 关联查询

```typescript
// 查询用户及其角色和权限
const userWithPermissions = await prisma.adminUser.findUnique({
  where: { id: userId },
  include: {
    userRoles: {
      include: {
        role: {
          include: {
            rolePermissions: {
              include: { permission: true },
            },
          },
        },
      },
    },
  },
});
```

### 事务

```typescript
await prisma.$transaction(async (tx) => {
  const user = await tx.adminUser.create({ data: { ... } });
  await tx.userRole.create({ data: { userId: user.id, roleId } });
});
```

## 相关文档

- [Prisma 官方文档](https://www.prisma.io/docs)
- [RBAC 架构](../02_architecture/rbac_architecture.md)
- [本地开发指南](../05_dev_process/local_dev.md)

