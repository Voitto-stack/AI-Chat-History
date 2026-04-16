---
title: Minerva 迁移方案评估
date: 2026-04-16 11:08:00
model: Claude Opus 4.6
messages: 6
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

### Assistant (11:10:00)
在你已经选了 **C：完全融合重构** 的前提下，**我推荐后端数据层也走 C：双阶段**。  
也就是先保留 Prisma 做“语义保真迁移”，等业务跑稳后，再逐步抽成 `sitin-next` 现有的 plugin / business package 体系。  
原因很简单：你现在已经同时在做“架构重建”，如果数据层再一步到位重写，风险会叠加，最容易把查询语义、权限边界和返回结构搞漂。

真正要防的不是“技术不够统一”，而是“过早统一导致业务失真”。  
尤其 Minerva 这类后台，危险点不在页面能不能渲染，而在：
- 筛选条件有没有偷偷变语义
- RBAC 判定有没有细微漂移
- Prisma 查询映射到 plugin 层后，字段/NULL/分页/count 有没有变化
- 老数据表的脏语义有没有被“顺手优化”掉

所以我建议你把迁移拆成这条主线：

1. **先保留共享契约语义**  
   把 `minerva-schemas` 先变成 `sitin-next` 里的共享 contract package，作为唯一真相源。

2. **后端先做语义等价层**  
   在 `sitin-next` 里新建 Minerva 领域的 Fastify/biz 模块，但底层第一阶段仍可通过 Prisma 访问数据库，先保证接口行为和查询结果一致。

3. **前端再重落位**  
   不保留 Umi 工程壳，只迁页面、状态、权限判断和 API 调用语义，落到 `sitin-next` 的前端体系里。

4. **最后才抽数据访问层**  
   等接口和页面都稳定，再把 Prisma 查询逐步下沉/替换成 `sitin-next` 的 plugin 风格实现。

我现在只问一个关键确认：

你要不要把 **“第一阶段保留 Prisma，第二阶段再抽象到 sitin-next plugin 体系”** 定为迁移原则？  
A. 定为原则  
B. 不要，直接一步改成 plugin 体系

### Assistant (11:11:00)
我建议选 A。  
也就是把“第一阶段保留 Prisma，第二阶段再抽到 `sitin-next` plugin 体系”定成迁移原则。

你现在选的是“完全融合重构”，不是“完全同步重写”。这两者差别很大。  
前者的核心是 **最后长得像 sitin-next**；后者的核心是 **从第一天起每一层都像 sitin-next**。后者听起来更纯，但迁移里最容易死在这里。

所以我建议把“最终统一”和“迁移过程保真”拆开处理。否则你会同时重写：
- 服务框架
- 数据访问层
- 权限中间件
- 页面承载方式
- shared contract 落点

这不是优雅，是把变量一次性拉满。

你直接回我一个字就行：

**A** = 第一阶段保留 Prisma  
**B** = 直接一步改成 plugin 体系
