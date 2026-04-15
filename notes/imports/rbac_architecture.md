---
title: rbac_architecture
date: 2026-04-15T17:04:47+08:00
source: import
original: rbac_architecture.md
---

# RBAC 架构

## Problem

后台管理系统需要细粒度的权限控制：
- 不同用户有不同的功能访问权限
- 权限可以灵活组合成角色
- 前端需要根据权限控制 UI 展示

## Solution

采用 RBAC（Role-Based Access Control）模型：

```
User ──N:M──▶ Role ──N:M──▶ Permission
```

- 用户可以拥有多个角色
- 角色可以包含多个权限
- 权限定义具体的操作能力

## 数据模型

数据模型定义在 `apps/minerva-server/prisma/schema.prisma`：

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  AdminUser  │     │    Role     │     │ Permission  │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │     │ id          │     │ id          │
│ sub         │     │ name        │     │ key         │
│ displayName │     │ description │     │ description │
│ userType    │     └──────┬──────┘     └──────┬──────┘
└──────┬──────┘            │                   │
       │                   │                   │
       │            ┌──────┴──────┐     ┌──────┴──────┐
       │            │  UserRole   │     │RolePermission│
       │            ├─────────────┤     ├─────────────┤
       └───────────▶│ userId      │     │ roleId      │
                    │ roleId      │◀────│ permissionId│
                    └─────────────┘     └─────────────┘
```

### 核心模型

**AdminUser**（管理员用户）：
- `sub`: 唯一标识（用户名或飞书 ID）
- `userType`: `SYSTEM`（密码登录）或 `FEISHU`（飞书 OAuth）
- `password`: 密码哈希（FEISHU 类型此字段无效）

**Role**（角色）：
- `name`: 角色名称，如 `super_admin`、`operator`
- 通过 `rolePermissions` 关联权限

**Permission**（权限）：
- `key`: 权限标识，如 `rbac.user.read`
- 格式：`{domain}.{resource}.{action}`

## 后端鉴权

### JWT 认证

`apps/minerva-server/src/middlewares/auth.ts` 提供认证中间件：

```typescript
// 验证 JWT Token，解码用户信息到 ctx.state.user
export async function authMiddleware(ctx: Context, next: Next) {
  const authHeader = ctx.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    throw AppError.unauthorized('Missing authorization header');
  }

  const token = authHeader.substring(7);
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  ctx.state.user = decoded;  // { userId, sub, iat, exp }
  
  await next();
}
```

### 权限校验

```typescript
// 要求拥有所有指定权限
export function requirePermission(...requiredPermissions: string[]) {
  return async (ctx: Context, next: Next) => {
    const userId = ctx.state.user?.userId;
    
    // 查询用户的所有权限
    const user = await prisma.adminUser.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: { permission: true }
                }
              }
            }
          }
        }
      }
    });

    // 收集权限
    const userPermissions = new Set<string>();
    user.userRoles.forEach(ur => {
      ur.role.rolePermissions.forEach(rp => {
        userPermissions.add(rp.permission.key);
      });
    });

    // 检查是否拥有所有权限
    const hasAll = requiredPermissions.every(p => userPermissions.has(p));
    if (!hasAll) {
      throw AppError.forbidden(`Missing permissions: ${requiredPermissions.filter(p => !userPermissions.has(p)).join(', ')}`);
    }

    await next();
  };
}

// 要求拥有任一指定权限
export function requireAnyPermission(...requiredPermissions: string[])
```

### 路由使用示例

```typescript
import { authMiddleware, requirePermission } from '../middlewares/auth.js';

// 需要认证 + rbac.user.read 权限
router.get('/users', authMiddleware, requirePermission('rbac.user.read'), async (ctx) => {
  // ...
});

// 需要认证 + rbac.user.write 权限
router.post('/users', authMiddleware, requirePermission('rbac.user.write'), async (ctx) => {
  // ...
});

// 需要认证 + 任一读权限
router.get('/dashboard', authMiddleware, requireAnyPermission('rbac.user.read', 'rbac.role.read'), async (ctx) => {
  // ...
});
```

## 前端权限控制

### 获取用户权限

登录后通过 `/api/auth/me` 获取用户信息（包含角色和权限）：

```typescript
// apps/minerva/src/app.tsx - getInitialState
export async function getInitialState() {
  const token = getSessionToken();
  if (!token) return { token: undefined, currentUser: undefined };

  const currentUser = await request<CurrentUser>('/api/auth/me');
  return { token, currentUser };
}
```

返回的 `currentUser` 包含：
- `permissions`: 权限 key 数组
- `roles`: 角色名称数组

### Access 配置

`apps/minerva/src/access.ts` 定义权限函数：

```typescript
export default (initialState: InitialState): AccessFunctions => {
  const { currentUser } = initialState || {};
  const permissions = currentUser?.permissions || [];
  const roles = currentUser?.roles || [];
  const isLoggedIn = !!initialState?.token && !!currentUser;

  return {
    // 检查单个权限
    can: (permission: string) => permissions.includes(permission),
    
    // 检查任一权限
    canAny: (requiredPermissions: string[]) => 
      requiredPermissions.some(p => permissions.includes(p)),
    
    // 检查所有权限
    canAll: (requiredPermissions: string[]) => 
      requiredPermissions.every(p => permissions.includes(p)),
    
    // 检查角色
    hasRole: (role: string) => roles.includes(role),
    
    // 是否已登录
    isLoggedIn,
    
    // 是否可访问 RBAC 管理页面
    canManageRbac: isLoggedIn && (
      permissions.includes('rbac.user.read') ||
      permissions.includes('rbac.role.read') ||
      permissions.includes('rbac.permission.read')
    ),
  };
};
```

### 路由权限控制

在 `.umirc.ts` 中配置路由 access：

```typescript
routes: [
  {
    name: 'RBAC 管理',
    path: '/rbac',
    component: './RBAC',
    access: 'canManageRbac',  // 只有 canManageRbac 返回 true 才能访问
  },
]
```

### 组件内权限控制

```typescript
import { useAccess } from '@umijs/max';

function UserManagement() {
  const access = useAccess();
  
  return (
    <div>
      {access.can('rbac.user.read') && <UserList />}
      {access.can('rbac.user.write') && <Button>创建用户</Button>}
      {access.can('rbac.user.delete') && <Button danger>删除用户</Button>}
    </div>
  );
}
```

## 权限数据流

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. 登录成功后获取用户信息                                          │
│    POST /api/auth/login → GET /api/auth/me                      │
│    返回: { permissions: ['rbac.user.read', ...], roles: [...] } │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. 存入 initialState                                            │
│    getInitialState() → { token, currentUser }                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Access 计算                                                   │
│    access.ts 根据 permissions 计算各权限函数返回值                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. UI 渲染                                                       │
│    - 路由: access 属性控制页面可见性                               │
│    - 组件: useAccess() 控制按钮/区块显隐                          │
└─────────────────────────────────────────────────────────────────┘
```

## 相关文档

- [权限命名规范](../03_design_patterns/permission_naming.md)
- [前后端契约](./contracts.md)
- [API 文档](../../apps/minerva-server/README.md)

