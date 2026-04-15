---
title: code_style
date: 2026-04-15T17:04:47+08:00
source: import
original: code_style.md
---

# 代码风格

## 命名规范

### 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| React 组件 | PascalCase | `UserList.tsx`, `PermissionSelector.tsx` |
| 工具函数 | camelCase | `formatDate.ts`, `getUrl.ts` |
| 常量文件 | camelCase | `config.ts`, `constants.ts` |
| 样式文件 | 与组件同名 | `index.less`, `UserList.less` |
| 测试文件 | `*.test.ts` 或 `*.spec.ts` | `utils.test.ts` |

### 变量命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 变量 | camelCase | `userName`, `isLoading` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| 函数 | camelCase | `getUserById`, `handleSubmit` |
| 类/接口/类型 | PascalCase | `UserService`, `CreateUserInput` |
| 枚举值 | UPPER_SNAKE_CASE | `UserType.SYSTEM`, `Status.ACTIVE` |
| 布尔变量 | is/has/can 前缀 | `isLoading`, `hasPermission`, `canEdit` |

### 组件命名

```typescript
// 组件文件：PascalCase
// src/pages/UserManagement/index.tsx

// 组件函数：PascalCase
function UserManagement() {
  // ...
}

// 或使用箭头函数
const UserManagement: React.FC = () => {
  // ...
};

export default UserManagement;
```

## 目录结构

### 前端（apps/minerva）

```
src/
├── api/              # API 调用函数
│   ├── auth.ts
│   └── rbac.ts
├── components/       # 公共组件
│   └── UserInfo/
│       ├── index.tsx
│       └── index.less
├── pages/            # 页面组件
│   └── RBAC/
│       ├── index.tsx
│       ├── components/     # 页面级组件
│       │   └── PermissionSelector.tsx
│       ├── UsersTab.tsx    # 页面子模块
│       └── RolesTab.tsx
├── utils/            # 工具函数
│   ├── format.ts
│   └── session.ts
├── types/            # 类型定义
│   └── access.ts
├── request/          # 请求封装
│   ├── config.ts
│   └── client.ts
├── access.ts         # 权限配置
└── app.tsx           # 运行时配置
```

### 后端（apps/minerva-server）

```
src/
├── routes/           # 路由定义
│   ├── index.ts      # 路由入口
│   ├── auth.ts       # 认证路由
│   └── rbac/         # RBAC 模块
│       ├── index.ts
│       ├── users.ts
│       └── roles.ts
├── middlewares/      # 中间件
│   ├── auth.ts
│   └── errorHandler.ts
├── utils/            # 工具函数
│   ├── AppError.ts
│   └── response.ts
├── lib/              # 库封装
│   ├── prisma.ts
│   └── feishu.ts
└── index.ts          # 应用入口
```

## TypeScript 规范

### 类型定义

```typescript
// 优先使用 interface 定义对象类型
interface User {
  id: string;
  name: string;
  email?: string;  // 可选属性
}

// type 用于联合类型、交叉类型
type Status = 'active' | 'inactive';
type UserWithRoles = User & { roles: string[] };

// 避免使用 any，使用 unknown 代替
function parse(data: unknown): User {
  // 需要类型守卫
}

// 明确函数返回类型
function getUser(id: string): Promise<User> {
  // ...
}
```

### 类型导入

```typescript
// 使用 type 导入纯类型
import type { User, CreateUserInput } from '@sitin/minerva-schemas';

// 混合导入
import { userSchema, type User } from '@sitin/minerva-schemas';
```

## React 规范

### 组件结构

```typescript
// 1. 导入
import { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import type { User } from '@sitin/minerva-schemas';
import { getUsers } from '@/api/rbac';
import styles from './index.less';

// 2. 类型定义
interface UserListProps {
  onSelect?: (user: User) => void;
}

// 3. 组件实现
function UserList({ onSelect }: UserListProps) {
  // 3.1 Hooks
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 3.2 Effects
  useEffect(() => {
    loadUsers();
  }, []);
  
  // 3.3 事件处理
  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };
  
  // 3.4 渲染
  return (
    <Table
      loading={loading}
      dataSource={users}
      rowKey="id"
      onRow={(record) => ({
        onClick: () => onSelect?.(record),
      })}
    />
  );
}

export default UserList;
```

### Hooks 使用

```typescript
// 自定义 Hook 以 use 开头
function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    refresh();
  }, [refresh]);
  
  return { users, loading, refresh };
}
```

## 后端规范

### 路由处理

```typescript
// 使用 async/await
router.get('/users', async (ctx) => {
  const users = await prisma.adminUser.findMany();
  success(ctx, users);
});

// 错误抛出而不是返回
router.post('/users', async (ctx) => {
  const input = createUserSchema.parse(ctx.request.body);
  
  // ❌ 不要这样
  if (!input.username) {
    ctx.status = 400;
    ctx.body = { error: 'Missing username' };
    return;
  }
  
  // ✅ 应该这样
  if (!input.username) {
    throw AppError.badRequest('Missing username');
  }
});
```

### 数据库查询

```typescript
// 使用 select 限制返回字段
const users = await prisma.adminUser.findMany({
  select: {
    id: true,
    sub: true,
    displayName: true,
    // 不返回 password
  },
});

// 复杂查询使用 include
const userWithRoles = await prisma.adminUser.findUnique({
  where: { id },
  include: {
    userRoles: {
      include: {
        role: true,
      },
    },
  },
});
```

## 注释规范

### 文件头注释

```typescript
/**
 * 请求配置
 * 更多信息见文档：https://umijs.org/docs/max/request
 *
 * 设计原则：
 * - 后端错误一律 throw AppError
 * - 前端只需处理 HTTP 非 2xx 的情况
 */
```

### 函数注释

```typescript
/**
 * 发送请求到 Minerva Server
 *
 * @param endpoint - API 路径
 * @param options - 请求选项
 * @param schema - 可选的 Zod schema
 * @returns 解包后的 data
 */
export async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
  schema?: SchemaParser<T>,
): Promise<T> {
  // ...
}
```

### 行内注释

```typescript
// 优先从 localStorage 获取
const token = localStorage.getItem(SESSION_TOKEN_KEY);

// 401 且有 token 且非 skipAuth：自动登出
if (status === 401 && !opts?.skipAuth && getSessionToken()) {
  // ...
}
```

## 相关文档

- [Git Hooks](../04_tooling/git_hooks.md)
- [PR Checklist](./pr_checklist.md)

