---
title: request_flow
date: 2026-04-15T17:04:47+08:00
source: import
original: request_flow.md
---

# 请求链路

## Problem

前端需要统一的请求处理机制，包括：
- 自动注入认证 Token
- 统一的错误处理和用户提示
- 支持多个后端（Minerva Server、旧版网关）
- 可选的响应 Schema 校验

## Solution

请求链路分为两层：

```
┌──────────────────────────────────────────────────────────────┐
│                         调用层                                │
│   pages/components → api/*.ts → request/client.ts            │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                         基础层                                │
│   request/config.ts (Umi Request 配置)                       │
│   - requestInterceptors: Token 注入                          │
│   - errorHandler: 统一错误处理                                │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                     Minerva Server                            │
└──────────────────────────────────────────────────────────────┘
```

## 代码落点

| 文件 | 职责 |
|------|------|
| `apps/minerva/src/request/config.ts` | Umi Max 全局请求配置（拦截器、错误处理） |
| `apps/minerva/src/request/client.ts` | Minerva Server 请求封装（解包、Schema 校验） |
| `apps/minerva/src/request/index.ts` | 模块入口，统一导出 |
| `apps/minerva/src/utils/session.ts` | Token 存取工具 |

## 请求拦截器

自动注入 `Authorization` Header（`request/config.ts`）：

```typescript
requestInterceptors: [
  (config: any) => {
    const sessionToken = getSessionToken();
    // skipAuth 为 true 时不注入（登录、飞书回调等场景）
    if (!config?.skipAuth && sessionToken) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  },
],
```

## 错误处理

### 处理逻辑

```typescript
errorHandler(error: any, opts?: any) {
  // 1. 支持跳过错误处理
  if (opts?.skipErrorHandler) throw error;

  const { response } = error;
  const baseURL = getRequestBaseURL(error, opts);
  const isMinervaServer = isMinervaServerBaseURL(baseURL);

  // 2. Minerva Server 错误处理
  if (isMinervaServer && response) {
    const { status, data } = response;
    const errorMessage = data?.error?.message || '请求失败';

    // 401 + 有 token + 非 skipAuth：自动登出
    if (status === 401 && !opts?.skipAuth && getSessionToken()) {
      message.error(errorMessage || '登录已过期，请重新登录');
      removeSessionCookie();
      setTimeout(() => window.location.reload(), 800);
      return;
    }

    message.error(`请求错误 ${status}: ${errorMessage}`);
    throw error;
  }

  // 3. 网络/超时错误
  const msg = error?.message || '';
  if (msg.includes('timeout')) {
    message.error('请求超时，请稍后重试');
  } else if (msg.includes('Network Error')) {
    message.error('网络错误，请检查网络连接');
  } else {
    message.error('请求失败');
  }
  throw error;
}
```

### 特殊场景

| 场景 | 处理方式 |
|------|---------|
| 登录接口 401 | 使用 `skipAuth: true`，不触发自动登出 |
| 跳过全局错误处理 | 使用 `skipErrorHandler: true` |
| 旧版网关 403 | 提示 Token 缺失或无权限 |

## 请求客户端

`request/client.ts` 封装了 Minerva Server 请求：

```typescript
export async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
  schema?: SchemaParser<T>,
): Promise<T> {
  const { method = 'GET', body, headers = {}, skipAuth = false } = options;
  
  // 发起请求，response 格式为 { success: true, data: T }
  const response = await umiRequest<ApiSuccessResponse<T>>(endpoint, {
    method,
    data: body,
    headers: { 'Content-Type': 'application/json', ...headers },
    skipAuth,
  });

  // 可选：Schema 校验
  if (schema) {
    return schema.parse(response.data);
  }

  return response.data;  // 自动解包
}
```

### 使用示例

```typescript
import { request } from '@/request';
import { userListSchema } from '@sitin/minerva-schemas';

// 基础用法 - 自动解包 data
const users = await request<User[]>('/api/rbac/users');

// 带 Schema 校验
const users = await request('/api/rbac/users', {}, userListSchema);

// POST 请求
const user = await request<User>('/api/rbac/users', {
  method: 'POST',
  body: { username: 'test', password: '123456' },
});

// 跳过认证
const result = await request('/api/auth/login', {
  method: 'POST',
  body: { username, password },
  skipAuth: true,
});
```

## Token 管理

`utils/session.ts` 提供 Token 存取工具：

```typescript
// 获取 Token（优先 localStorage，备选 cookie）
export const getSessionToken = (): string | null

// 设置 Token
export const setSessionToken = (token: string): void

// 清除 Token 和登录状态
export const removeSessionCookie = (): void
```

### 登录流程

```
1. 用户提交登录表单
2. 调用 /api/auth/login (skipAuth: true)
3. 后端验证成功，返回 JWT Token
4. 前端 setSessionToken(token) 保存
5. 后续请求自动注入 Authorization Header
```

### 登出流程

```
1. 用户点击登出 或 401 自动触发
2. removeSessionCookie() 清除 Token
3. 刷新页面或跳转登录页
```

## 相关文档

- [前后端契约](./contracts.md)
- [错误处理模式](../03_design_patterns/error_handling.md)

