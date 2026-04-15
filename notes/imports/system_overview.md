---
title: system_overview
date: 2026-04-15T17:04:47+08:00
source: import
original: system_overview.md
---

# 系统概览

## 系统边界

Minerva 是一个后台管理系统，由三个包组成：

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              apps/minerva (前端)                      │   │
│  │           Umi Max + Ant Design + React               │   │
│  └──────────────────────┬──────────────────────────────┘   │
└─────────────────────────┼───────────────────────────────────┘
                          │ HTTP API
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              apps/minerva-server (后端)                      │
│           Koa + Prisma + JWT + Zod                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   PostgreSQL                         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│           packages/minerva-schemas (共享契约)                │
│                   Zod Schema + Types                        │
└─────────────────────────────────────────────────────────────┘
```

## 技术栈

### 前端：`apps/minerva`

| 类别 | 技术 |
|------|------|
| 框架 | [Umi Max 4.x](https://umijs.org/docs/max/introduce) |
| UI 组件 | [Ant Design 5.x](https://ant.design/) + [Pro Components](https://procomponents.ant.design/) |
| 语言 | TypeScript 5.x |
| 状态管理 | Umi Model（基于 hooks） |
| 权限控制 | Umi Access |
| 请求封装 | Umi Request（基于 axios） |
| 代码质量 | ESLint + Prettier + Stylelint + Husky |

**关键目录**：

```
apps/minerva/
├── src/
│   ├── access.ts          # 权限计算逻辑
│   ├── app.tsx            # 运行时配置（getInitialState、layout、request）
│   ├── request/           # 请求封装
│   │   ├── config.ts      # 全局请求配置（拦截器、错误处理）
│   │   └── client.ts      # Minerva Server 请求客户端
│   ├── pages/             # 页面组件
│   ├── api/               # API 调用层
│   └── utils/             # 工具函数
├── .umirc.ts              # Umi 配置
└── .husky/                # Git Hooks
```

### 后端：`apps/minerva-server`

| 类别 | 技术 |
|------|------|
| 框架 | [Koa 3.x](https://koajs.com/) |
| ORM | [Prisma 6.x](https://www.prisma.io/) |
| 数据库 | PostgreSQL 16 |
| 认证 | JWT (jsonwebtoken) |
| 校验 | [Zod](https://zod.dev/) |
| 语言 | TypeScript 5.x |

**关键目录**：

```
apps/minerva-server/
├── src/
│   ├── index.ts           # 应用入口
│   ├── routes/            # 路由定义
│   ├── middlewares/       # 中间件
│   │   ├── auth.ts        # JWT 认证 + 权限校验
│   │   └── errorHandler.ts# 统一错误处理
│   ├── utils/
│   │   ├── AppError.ts    # 自定义错误类
│   │   └── response.ts    # 统一响应辅助函数
│   └── lib/               # 库封装（Prisma、飞书等）
├── prisma/
│   ├── schema.prisma      # 数据模型定义
│   ├── migrations/        # 数据库迁移
│   └── seed.ts            # 初始数据填充
└── .env.example           # 环境变量示例
```

### 共享契约：`packages/minerva-schemas`

| 类别 | 技术 |
|------|------|
| Schema 定义 | Zod 3.x |
| 类型导出 | TypeScript |

**关键目录**：

```
packages/minerva-schemas/
└── src/
    ├── index.ts           # 统一导出
    ├── response.ts        # API 响应类型（ApiSuccessResponse、ApiErrorResponse）
    ├── auth.ts            # 认证相关 Schema
    ├── rbac.ts            # RBAC 相关 Schema
    ├── common.ts          # 通用 Schema
    └── feishu.ts          # 飞书集成 Schema
```

## 职责划分

| 层 | 职责 |
|----|------|
| **前端** | UI 渲染、用户交互、本地状态、路由、权限控制（基于后端返回的 permissions） |
| **后端** | 业务逻辑、数据持久化、认证鉴权、API 响应 |
| **共享契约** | 类型定义、请求/响应 Schema、校验逻辑 |

### 契约驱动开发流程

1. 在 `packages/minerva-schemas` 定义 Zod Schema 和类型
2. 后端使用 Schema 校验请求参数，返回符合契约的响应
3. 前端使用相同的类型，可选地使用 Schema 校验响应

详见 [API 变更流程](../05_dev_process/api_change_protocol.md)

