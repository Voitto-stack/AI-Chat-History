---
title: security
date: 2026-04-15T17:04:47+08:00
source: import
original: security.md
---

# 安全规范

## JWT Secret

### 风险

JWT Secret 泄露会导致：
- 任何人可以伪造有效的 Token
- 用户身份可被冒充
- 系统权限控制完全失效

### 规范

1. **绝不使用默认值**
   ```typescript
   // ❌ 危险
   const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
   
   // ✅ 安全（生产环境）
   const JWT_SECRET = process.env.JWT_SECRET;
   if (!JWT_SECRET) {
     throw new Error('JWT_SECRET is required');
   }
   ```

2. **Secret 强度要求**
   - 至少 32 字符
   - 包含随机字符
   - 可使用 `openssl rand -base64 32` 生成

3. **环境隔离**
   - 开发、测试、生产使用不同的 Secret
   - Secret 存放在环境变量中，不提交到代码仓库

## 敏感信息处理

### 不要提交到代码仓库

- `.env` 文件（使用 `.env.example` 作为模板）
- API Keys
- 数据库密码
- 第三方服务凭证

### .gitignore 配置

```gitignore
# 环境变量
.env
.env.local
.env.*.local

# 密钥文件
*.pem
*.key
credentials.json
```

### 配置文件模板

```bash
# .env.example
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-secret-here-change-me"
FEISHU_APP_ID=""
FEISHU_APP_SECRET=""
```

## 密码安全

### 存储

```typescript
import bcrypt from 'bcryptjs';

// 存储时加密
const hashedPassword = await bcrypt.hash(password, 10);
await prisma.adminUser.create({
  data: { password: hashedPassword },
});

// 验证时比对
const isValid = await bcrypt.compare(inputPassword, user.password);
```

### 规则

- 密码最小长度：6 字符（建议 8+）
- 使用 bcrypt 哈希，成本因子至少 10
- 不存储明文密码
- 不在日志中打印密码

## 权限最小化

### 原则

用户只应获得完成任务所需的最小权限集。

### 实践

1. **默认无权限**
   ```typescript
   // 新用户默认无角色
   await prisma.adminUser.create({
     data: { sub, password, userType: 'SYSTEM' },
     // 不自动分配角色
   });
   ```

2. **按需分配**
   ```typescript
   // 只分配必要的权限
   const operatorRole = await prisma.role.create({
     data: {
       name: 'data_viewer',
       rolePermissions: {
         create: [
           { permissionId: readPermission.id },
           // 不给 write/delete 权限
         ],
       },
     },
   });
   ```

3. **定期审计**
   - 检查用户权限是否过大
   - 清理不再使用的权限

## 输入校验

### 服务端校验

```typescript
import { z } from 'zod';

// 严格定义输入 schema
const createUserSchema = z.object({
  username: z.string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/, '只允许字母、数字、下划线'),
  password: z.string().min(6),
});

// 路由中校验
router.post('/users', async (ctx) => {
  const input = createUserSchema.parse(ctx.request.body);  // 校验失败会抛出
  // ...
});
```

### 防止注入

```typescript
// ❌ 危险：SQL 注入风险
const query = `SELECT * FROM users WHERE name = '${name}'`;

// ✅ 安全：使用 Prisma 参数化查询
const user = await prisma.adminUser.findFirst({
  where: { sub: name },
});
```

## 错误信息

### 生产环境隐藏详情

```typescript
// errorHandler.ts
ctx.body = {
  success: false,
  error: {
    code: 'INTERNAL_ERROR',
    message: process.env.NODE_ENV === 'development'
      ? error.message  // 开发环境显示详情
      : 'Internal server error',  // 生产环境隐藏
  },
};
```

### 不暴露敏感信息

```typescript
// ❌ 不要暴露
throw new Error(`User ${userId} has invalid password hash: ${user.password}`);

// ✅ 通用错误
throw AppError.unauthorized('Invalid credentials');
```

## Token 处理

### 前端存储

```typescript
// localStorage 而非 cookie（避免 CSRF）
localStorage.setItem('sessionToken', token);

// 不在 URL 中传递 token
// ❌ /api/users?token=xxx
// ✅ Authorization: Bearer xxx
```

### Token 过期

```typescript
// 设置合理的过期时间
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

// 前端处理过期
if (status === 401) {
  removeSessionCookie();
  window.location.reload();
}
```

### 刷新机制（如需要）

```typescript
// 使用 refresh token 模式
// 1. 短期 access token (15分钟)
// 2. 长期 refresh token (7天)
// 3. access token 过期时用 refresh token 获取新的
```

## CORS 配置

```typescript
// apps/minerva-server/src/index.ts
app.use(cors({
  origin: (ctx) => {
    const allowedOrigins = [
      'http://localhost:8000',
      'https://cai-admin-console.archat.us',
    ];
    const origin = ctx.request.header.origin;
    
    // 生产环境严格限制
    if (process.env.NODE_ENV !== 'development') {
      return allowedOrigins.includes(origin) ? origin : '';
    }
    
    return origin || '*';
  },
  credentials: true,
}));
```

## 日志安全

### 不记录敏感信息

```typescript
// ❌ 不要记录
console.log('User login:', { username, password });

// ✅ 脱敏处理
console.log('User login:', { username, password: '***' });
```

### 日志级别

```typescript
// 开发环境：详细日志
// 生产环境：只记录必要信息
if (process.env.NODE_ENV === 'development') {
  console.log('Request body:', ctx.request.body);
}
```

## 相关文档

- [错误处理模式](../03_design_patterns/error_handling.md)
- [RBAC 架构](../02_architecture/rbac_architecture.md)
- [权限命名规范](../03_design_patterns/permission_naming.md)

