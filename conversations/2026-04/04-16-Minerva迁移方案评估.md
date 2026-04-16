---
title: Minerva 迁移方案评估
date: 2026-04-16 11:08:00
model: Claude Opus 4.6
messages: 4
---

# Minerva 迁移方案评估

### User (11:08:00)
你看下如果要把minerva和minerva-server迁移到/Users/presence79/Desktop/WORK/sitin-next这个代码库中，应该怎么做呢

### Assistant (11:08:00)
1. 这不是“复制两个目录“就完事的迁移，核心冲突在于两边 monorepo 形态完全不同：  
   - `sitin-monorepo` 是 `apps/* + packages/*`
   - `sitin-next` 现在只有 `packages/*`
   - `minerva-server` 是 Koa + Prisma
   - `sitin-next` 现有服务端主体系是 Fastify + package 化业务模块  
   所以它更像一次“架构落位 + 代码迁移“，不是纯文件搬运。

2. 从我刚看的结果，最稳的方向不是一步把 Minerva 前后端硬塞进去，而是先决定你要的是哪一种迁移目标：
   - 只搬业务能力，逐步适配 `sitin-next` 现有架构
   - 还是连 Minerva 的运行形态一起保留，先在 `sitin-next` 里“寄居“

你这次迁移的目标，更接近下面哪一种？

A. **整套保留**：`minerva` 和 `minerva-server` 基本保持现状，只是搬进 `sitin-next` 统一管理  
B. **前端保留，后端重构**：`minerva` 尽量保留，但 `minerva-server` 要融入 `sitin-next` 现有 Fastify/package 架构  
C. **都要重构融合**：前后端都按 `sitin-next` 的规范重新落位，只迁业务逻辑和契约，不保留原结构

### User (11:09:00)
C

### Assistant (11:09:00)
在这条路线下，**要保留的不是 Minerva 的工程结构，而是业务契约、权限语义、页面行为和数据语义**。  
也就是说，`apps/minerva`、`apps/minerva-server` 这两个壳本身都可以消失，但下面这些东西不能漂：

- API 输入输出契约
- RBAC 权限 key 和判定语义
- 页面默认值、筛选逻辑、状态枚举
- 数据库字段语义和查询结果

接下来最关键的是先定 **后端数据层怎么落**，因为这会决定整个迁移拆分方式。

你更想要哪种？

A. **继续 Prisma 主导**：在 `sitin-next` 里也保留 Prisma 作为 Minerva 业务的数据访问核心  
B. **融入 sitin-next server plugins**：把数据访问逐步改造成它现有的 mysql/pg plugin 风格  
C. **双阶段**：第一阶段保留 Prisma 保真迁移，第二阶段再逐步抽到 `sitin-next` 的 plugin / business package 体系里
