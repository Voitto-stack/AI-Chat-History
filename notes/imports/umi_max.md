---
title: umi_max
date: 2026-04-15T17:04:47+08:00
source: import
original: umi_max.md
---

# Umi Max

## What/Why

[Umi Max](https://umijs.org/docs/max/introduce) 是 Umi 的企业级最佳实践集成，Minerva 前端使用它作为开发框架。

主要能力：
- 开箱即用的 Ant Design 集成
- 内置权限管理（Access）
- 内置数据流（Model）
- 内置请求封装（Request）
- 约定式路由

## Commands

在 `apps/minerva` 目录下执行：

```bash
# 启动开发服务器（默认 development 环境）
pnpm dev
# 或
pnpm start

# 指定环境启动
UMI_ENV=local pnpm dev
UMI_ENV=production pnpm dev:prod

# 构建
pnpm build              # 默认 production
pnpm build:prod         # 生产环境
pnpm build:cai          # CAI 生产环境
pnpm build:haven        # Haven 生产环境

# 预览构建产物
pnpm preview

# 部署
pnpm deploy:prod        # 部署到生产环境
pnpm deploy:cai         # 部署到 CAI 环境
pnpm deploy:haven       # 部署到 Haven 环境

# 代码格式化
pnpm format
```

在 monorepo 根目录执行：

```bash
# 启动 minerva
pnpm start minerva
```

## Config Entrypoints

### `.umirc.ts`

主配置文件，位于 `apps/minerva/.umirc.ts`：

```typescript
import { defineConfig } from '@umijs/max';

export default defineConfig({
  // Ant Design 配置
  antd: {},
  
  // 权限插件
  access: {},
  
  // 数据流插件
  model: {},
  
  // 初始状态
  initialState: {},
  
  // 请求配置
  request: {},
  
  // 布局配置
  layout: {
    title: 'Minerva',
  },
  
  // 输出目录
  outputPath: 'build',
  
  // 路由配置
  routes: [
    {
      path: '/',
      redirect: '/pwa-databoard',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
      layout: false,  // 不使用布局
    },
    {
      name: 'RBAC 管理',
      path: '/rbac',
      component: './RBAC',
      icon: 'SafetyCertificateOutlined',
      access: 'canManageRbac',  // 权限控制
    },
  ],
  
  // 环境变量
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV || 'development',
  },
  
  // 包管理器
  npmClient: 'pnpm',
});
```

### `src/app.tsx`

运行时配置，提供初始化和全局配置：

```typescript
// 获取初始状态（登录用户信息）
export async function getInitialState() {
  const token = getSessionToken();
  if (!token) return { token: undefined, currentUser: undefined };

  try {
    const currentUser = await request<CurrentUser>('/api/auth/me');
    return { token, currentUser };
  } catch {
    removeSessionCookie();
    return { token: undefined, currentUser: undefined };
  }
}

// 布局配置
export const layout = ({ initialState }) => ({
  logo: 'https://...',
  menu: { locale: false },
  // 右上角用户信息
  rightContentRender: () => <UserInfo />,
  // 未登录重定向
  onPageChange: () => {
    if (!initialState?.token && location.pathname !== '/login') {
      history.push('/login');
    }
  },
});
```

### `src/access.ts`

权限配置，基于 `initialState` 计算权限函数：

```typescript
export default (initialState: InitialState) => {
  const permissions = initialState?.currentUser?.permissions || [];
  
  return {
    can: (permission: string) => permissions.includes(permission),
    canManageRbac: permissions.some(p => p.startsWith('rbac.')),
    // ...
  };
};
```

### `src/request/config.ts`

请求配置，导出给 Umi Request：

```typescript
const requestConfig: RequestConfig = {
  timeout: 30000,
  baseURL: getMinervaServerUrl(),
  
  errorConfig: {
    errorHandler(error, opts) { /* ... */ },
  },
  
  requestInterceptors: [
    (config) => {
      // 注入 Authorization
      const token = getSessionToken();
      if (!config?.skipAuth && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  ],
};

export default requestConfig;
```

## 环境配置

| 环境 | UMI_ENV | API Base URL |
|------|---------|--------------|
| 本地 | `local` | http://localhost:29001 |
| 开发 | `development` | https://api-dev.archat.us/json |
| 生产 | `production` | https://cai-prod.archat.us/json |
| CAI 生产 | `cai_production` | https://api-prod.memojiproperties.com/json |
| Haven 生产 | `haven_production` | https://haven.archat.us/json |

环境变量通过 `process.env.UMI_ENV` 获取，在 `src/utils/getUrl.ts` 中根据环境返回不同的 API 地址。

## 常见操作

### 添加新页面

1. 在 `src/pages/` 下创建目录和组件：
   ```
   src/pages/NewPage/
   ├── index.tsx
   └── index.less (可选)
   ```

2. 在 `.umirc.ts` 添加路由：
   ```typescript
   routes: [
     {
       name: '新页面',
       path: '/new-page',
       component: './NewPage',
       icon: 'StarOutlined',
       access: 'canAccessNewPage',  // 可选
     },
   ]
   ```

3. 如需权限控制，在 `src/access.ts` 添加：
   ```typescript
   canAccessNewPage: permissions.includes('module.feature.read'),
   ```

### 添加新的 API 调用

1. 在 `src/api/` 下创建或编辑文件：
   ```typescript
   // src/api/feature.ts
   import { request } from '@/request';
   import type { FeatureData } from '@sitin/minerva-schemas';
   
   export async function getFeatureData(): Promise<FeatureData> {
     return request<FeatureData>('/api/feature/data');
   }
   ```

2. 在组件中使用：
   ```typescript
   import { getFeatureData } from '@/api/feature';
   
   const data = await getFeatureData();
   ```

### 使用权限控制

```typescript
import { useAccess, Access } from '@umijs/max';

function MyComponent() {
  const access = useAccess();
  
  // 方式 1：条件渲染
  return (
    <>
      {access.can('rbac.user.write') && <CreateButton />}
    </>
  );
  
  // 方式 2：Access 组件
  return (
    <Access accessible={access.can('rbac.user.write')} fallback={<NoPermission />}>
      <CreateButton />
    </Access>
  );
}
```

## 相关文档

- [Umi Max 官方文档](https://umijs.org/docs/max/introduce)
- [Ant Design 文档](https://ant.design/)
- [请求链路](../02_architecture/request_flow.md)
- [RBAC 架构](../02_architecture/rbac_architecture.md)

