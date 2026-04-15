---
title: permission_naming
date: 2026-04-15T17:04:47+08:00
source: import
original: permission_naming.md
---

# 权限命名规范

## Problem

权限 Key 需要统一的命名规范，以便：
- 语义清晰，一看就知道控制什么
- 便于分组和查询
- 前后端一致使用

## Solution

### 命名格式

```
{domain}.{resource}.{action}
```

| 部分 | 说明 | 示例 |
|------|------|------|
| `domain` | 业务域 | `rbac`、`pwa`、`system` |
| `resource` | 资源类型 | `user`、`role`、`permission`、`dashboard` |
| `action` | 操作类型 | `read`、`write`、`delete`、`export` |

### 标准 Action

| Action | 说明 | 对应操作 |
|--------|------|----------|
| `read` | 读取 | GET、列表查询、详情查看 |
| `write` | 写入 | POST（创建）、PUT/PATCH（更新） |
| `delete` | 删除 | DELETE |
| `export` | 导出 | 导出数据、下载报表 |
| `admin` | 管理 | 完整管理权限（包含所有操作） |

### 当前权限清单

#### RBAC 域

| 权限 Key | 说明 |
|----------|------|
| `rbac.user.read` | 查看用户列表/详情 |
| `rbac.user.write` | 创建/更新用户、分配角色、重置密码 |
| `rbac.user.delete` | 删除用户 |
| `rbac.role.read` | 查看角色列表/详情 |
| `rbac.role.write` | 创建/更新角色、分配权限 |
| `rbac.role.delete` | 删除角色 |
| `rbac.permission.read` | 查看权限列表/详情 |
| `rbac.permission.write` | 创建/更新权限 |
| `rbac.permission.delete` | 删除权限 |

#### PWA 域（示例）

| 权限 Key | 说明 |
|----------|------|
| `pwa.dashboard.read` | 查看 PWA 数据看板 |
| `pwa.dashboard.export` | 导出看板数据 |

## 使用示例

### 后端

```typescript
import { requirePermission, requireAnyPermission } from '../middlewares/auth.js';

// 需要单个权限
router.get('/users', authMiddleware, requirePermission('rbac.user.read'), ...);

// 需要多个权限（AND）
router.put('/users/:id/roles', 
  authMiddleware, 
  requirePermission('rbac.user.write', 'rbac.role.read'),
  ...
);

// 需要任一权限（OR）
router.get('/dashboard', 
  authMiddleware, 
  requireAnyPermission('pwa.dashboard.read', 'rbac.user.read'),
  ...
);
```

### 前端

```typescript
import { useAccess } from '@umijs/max';

function UserManagement() {
  const access = useAccess();
  
  return (
    <>
      {access.can('rbac.user.read') && <UserList />}
      {access.can('rbac.user.write') && <CreateUserButton />}
      {access.can('rbac.user.delete') && <DeleteUserButton />}
    </>
  );
}
```

### 路由配置

```typescript
// .umirc.ts
routes: [
  {
    path: '/rbac',
    access: 'canManageRbac',  // access.ts 中定义的复合权限
  },
]
```

## 新增权限流程

1. **确定命名**：按 `{domain}.{resource}.{action}` 格式命名
2. **数据库添加**：
   ```sql
   INSERT INTO permissions (id, key, description) 
   VALUES (cuid(), 'pwa.report.export', '导出 PWA 报表');
   ```
   或通过 Prisma seed：
   ```typescript
   await prisma.permission.create({
     data: { key: 'pwa.report.export', description: '导出 PWA 报表' }
   });
   ```
3. **后端使用**：在路由中添加 `requirePermission('pwa.report.export')`
4. **前端使用**：`access.can('pwa.report.export')`
5. **分配权限**：通过 RBAC 管理页面将权限分配给角色

## Trade-offs

| 决策 | 优点 | 缺点 |
|------|------|------|
| 三段式命名 | 语义清晰，易于分组 | 命名较长 |
| 细粒度权限 | 灵活控制 | 权限数量可能较多 |
| 前后端使用相同 Key | 一致性好 | 需要同步维护 |

## 相关文档

- [RBAC 架构](../02_architecture/rbac_architecture.md)
- [API 文档](/apps/minerva-server/README.md)

