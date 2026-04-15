---
title: local_dev
date: 2026-04-15T17:04:47+08:00
source: import
original: local_dev.md
---

# 本地开发指南

## Goal

在本地启动 Minerva 前端和后端，进行开发和调试。

## Preconditions

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker（用于 PostgreSQL）
- Git

## Steps

### 1. 克隆仓库并安装依赖

```bash
git clone <repo-url>
cd sitin-monorepo

# 安装所有依赖
pnpm install
```

### 2. 启动数据库

```bash
cd apps/minerva-server

# 使用 Docker Compose 启动 PostgreSQL
docker-compose up -d
```

如果没有 `docker-compose.yml`，可以直接运行：

```bash
docker run -d \
  --name minerva-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=minerva \
  -p 5432:5432 \
  postgres:16
```

### 3. 配置后端环境变量

```bash
cd apps/minerva-server

# 复制环境变量模板
cp .env.example .env

# 编辑 .env，确认数据库连接
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/minerva?schema=public"
# JWT_SECRET="your-dev-secret"
```

### 4. 初始化数据库

```bash
cd apps/minerva-server

# 生成 Prisma Client
pnpm db:generate

# 应用数据库迁移
pnpm db:migrate

# 填充初始数据（创建 super_admin 用户和基础权限）
pnpm db:seed
```

### 5. 启动后端

```bash
# 方式 1：在 minerva-server 目录
cd apps/minerva-server
pnpm dev

# 方式 2：在 monorepo 根目录
pnpm start minerva-server
```

后端启动在 http://localhost:29001

### 6. 启动前端

```bash
# 方式 1：在 minerva 目录
cd apps/minerva
pnpm dev

# 方式 2：在 monorepo 根目录
pnpm start minerva
```

前端启动在 http://localhost:8000

### 7. 登录测试

访问 http://localhost:8000/login

默认账号：
- 用户名：`super_admin`
- 密码：`数据库中查看`

## Checklist

- [ ] Docker 已安装并运行
- [ ] PostgreSQL 容器已启动
- [ ] `.env` 文件已配置
- [ ] 数据库迁移已执行
- [ ] 初始数据已填充
- [ ] 后端启动在 29001 端口
- [ ] 前端启动在 8000 端口
- [ ] 能够使用 super_admin 登录

## Troubleshooting

### 数据库连接失败

**错误**：`Can't reach database server at localhost:5432`

**解决**：
1. 确认 Docker 容器在运行：
   ```bash
   docker ps | grep postgres
   ```
2. 检查端口是否被占用：
   ```bash
   lsof -i :5432
   ```
3. 确认 `.env` 中的 `DATABASE_URL` 正确

### Prisma 迁移失败

**错误**：`Migration failed to apply cleanly`

**解决**：
```bash
# 重置数据库（会删除所有数据）
npx prisma migrate reset

# 或手动删除数据库重建
docker exec -it minerva-postgres psql -U postgres -c "DROP DATABASE minerva"
docker exec -it minerva-postgres psql -U postgres -c "CREATE DATABASE minerva"
pnpm db:migrate
pnpm db:seed
```

### 前端请求后端失败

**错误**：CORS 错误或网络错误

**解决**：
1. 确认后端已启动在 29001 端口
2. 确认前端 `UMI_ENV=local` 或 `development`
3. 检查 `src/utils/getUrl.ts` 中的 API 地址配置

### Husky 未生效

**问题**：提交时没有执行 lint

**解决**：
```bash
cd apps/minerva
pnpm prepare
```

### 端口被占用

**错误**：`Port 8000 is already in use`

**解决**：
```bash
# 找到占用端口的进程
lsof -i :8000

# 杀死进程
kill -9 <PID>

# 或使用其他端口
PORT=8001 pnpm dev
```

### 登录后立即被登出

**问题**：登录成功后刷新页面被登出

**原因**：Token 保存失败或 `/api/auth/me` 返回错误

**排查**：
1. 检查浏览器 localStorage 是否有 `sessionToken`
2. 检查 Network 面板 `/api/auth/me` 请求
3. 确认后端 `JWT_SECRET` 配置正确

## 相关文档

- [Prisma 工作流](../04_tooling/prisma_workflow.md)
- [Umi Max](../04_tooling/umi_max.md)
- [请求链路](../02_architecture/request_flow.md)

