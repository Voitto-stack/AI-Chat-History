---
title: error_handling
date: 2026-04-15T17:04:47+08:00
source: import
original: error_handling.md
---

# 错误处理模式

## Problem

前后端需要统一的错误处理机制：
- 后端各处抛出的错误需要统一格式化输出
- 前端需要统一处理各类错误并给用户反馈
- 避免重复的错误处理代码

## Context

- 后端使用 Koa 框架，支持中间件机制
- 前端使用 Umi Request（基于 axios），支持拦截器
- 错误类型包括：业务错误、校验错误、数据库错误、网络错误

## Solution

### 后端：AppError + errorHandler

#### AppError 类

`apps/minerva-server/src/utils/AppError.ts` 定义了统一的错误类：

```typescript
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;  // 标记为可操作错误（vs 程序错误）
  }

  // 静态工厂方法
  static badRequest(message: string, code: string = 'BAD_REQUEST') {
    return new AppError(message, 400, code);
  }

  static unauthorized(message: string = 'Unauthorized') {
    return new AppError(message, 401, 'UNAUTHORIZED');
  }

  static forbidden(message: string = 'Forbidden') {
    return new AppError(message, 403, 'FORBIDDEN');
  }

  static notFound(message: string = 'Not found') {
    return new AppError(message, 404, 'NOT_FOUND');
  }

  static conflict(message: string, code: string = 'CONFLICT') {
    return new AppError(message, 409, code);
  }
}
```

#### errorHandler 中间件

`apps/minerva-server/src/middlewares/errorHandler.ts` 统一处理所有错误：

```typescript
export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    const error = err as Error;

    // 1. 处理 AppError（业务错误）
    if (error instanceof AppError) {
      ctx.status = error.statusCode;
      ctx.body = {
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      };
      return;
    }

    // 2. 处理 Prisma 错误
    if (error.name === 'PrismaClientKnownRequestError') {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'Database operation failed',
        },
      };
      console.error('Prisma Error:', error);
      return;
    }

    // 3. 处理 Zod 校验错误
    if (error.name === 'ZodError') {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: JSON.parse(error.message),
        },
      };
      return;
    }

    // 4. 处理未知错误
    console.error('Unexpected Error:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: process.env.NODE_ENV === 'development' 
          ? error.message 
          : 'Internal server error',
      },
    };
  }
}
```

#### 使用方式

```typescript
// ❌ 错误做法：手动设置响应
ctx.status = 400;
ctx.body = { success: false, error: { code: 'ERROR', message: '...' } };

// ✅ 正确做法：抛出 AppError
throw AppError.badRequest('用户名已存在', 'USERNAME_EXISTS');
throw AppError.unauthorized('Token 已过期');
throw AppError.forbidden('没有权限访问此资源');
throw AppError.notFound('用户不存在');
```

### 前端：统一错误拦截

`apps/minerva/src/request/config.ts` 配置全局错误处理：

```typescript
errorConfig: {
  errorHandler(error: any, opts?: any) {
    // 1. 支持跳过
    if (opts?.skipErrorHandler) throw error;

    const { response } = error;
    
    // 2. HTTP 响应错误
    if (response) {
      const { status, data } = response;
      const errorMessage = data?.error?.message || '请求失败';

      // 401：自动登出（仅当有 token 且非 skipAuth）
      if (status === 401 && !opts?.skipAuth && getSessionToken()) {
        message.error(errorMessage || '登录已过期，请重新登录');
        removeSessionCookie();
        setTimeout(() => window.location.reload(), 800);
        return;
      }

      message.error(`请求错误 ${status}: ${errorMessage}`);
      throw error;
    }

    // 3. 网络错误
    const msg = error?.message || '';
    if (msg.includes('timeout')) {
      message.error('请求超时，请稍后重试');
    } else if (msg.includes('Network Error')) {
      message.error('网络错误，请检查网络连接');
    } else {
      message.error('请求失败');
    }
    throw error;
  },
},
```

## Example

### 完整错误处理链路

**场景**：用户尝试创建已存在的用户名

**1. 后端抛出错误**：

```typescript
// routes/rbac/users.ts
router.post('/', async (ctx) => {
  const input = createUserSchema.parse(ctx.request.body);
  
  const existing = await prisma.adminUser.findUnique({
    where: { sub: input.username }
  });
  
  if (existing) {
    throw AppError.conflict('用户名已存在', 'USERNAME_EXISTS');
  }
  // ...
});
```

**2. errorHandler 捕获并格式化**：

```
HTTP 409 Conflict
{
  "success": false,
  "error": {
    "code": "USERNAME_EXISTS",
    "message": "用户名已存在"
  }
}
```

**3. 前端错误处理器显示提示**：

```
antd message: "请求错误 409: 用户名已存在"
```

**4. 调用方可选择特殊处理**：

```typescript
try {
  await createUser(input);
} catch (error) {
  // errorHandler 已经显示了全局提示
  // 这里可以做额外处理，如清空表单
}
```

### 跳过全局错误处理

某些场景需要自己处理错误：

```typescript
try {
  const result = await request('/api/some-endpoint', {
    skipErrorHandler: true,  // 跳过全局 errorHandler
  });
} catch (error) {
  // 自己处理错误
  if (error.response?.status === 409) {
    // 特殊处理冲突
  }
}
```

## Trade-offs

| 决策 | 优点 | 缺点 |
|------|------|------|
| 后端统一 throw | 代码简洁，错误格式一致 | 需要团队遵守约定 |
| 前端全局处理 | 减少重复代码，用户体验一致 | 特殊场景需要额外配置 |
| 生产环境隐藏错误详情 | 安全，不暴露内部信息 | 排查问题需要看日志 |

## 相关文档

- [前后端契约](../02_architecture/contracts.md)
- [请求链路](../02_architecture/request_flow.md)

