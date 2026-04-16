---
title: Minerva 迁移方案评估
date: 2026-04-16 11:08:00
model: Claude Opus 4.6
messages: 8
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

### User (11:12:00)
B

### Assistant (11:12:00)
现在路线已经很明确了：

- 总体目标：**C，完全融合重构**
- 数据层原则：**B，第一阶段就直接融入 sitin-next 的 plugin / business package 体系**

这意味着迁移方案不能再按“旧系统搬家”来设计了，而要按“目标仓重建 Minerva 领域能力”来设计。

如果按你现在的选择，我会把迁移拆成 5 个层次，而且顺序不能乱：

**第一层：契约层先落**  
先把 `packages/minerva-schemas` 的内容重新安置为 `sitin-next` 里的共享 contract package。  
这层最先做，因为它定义了：
- API request/response
- 枚举
- RBAC 权限 key
- 前后端共享类型

不先定契约，后端 business package 和前端页面都会边迁边漂。

**第二层：后端领域拆包**  
不要在 `sitin-next` 里再造一个 `minerva-server` 大包。  
应该按业务域拆成多个 package，比如：
- `business-minerva-auth`
- `business-minerva-rbac`
- `business-minerva-user`
- `business-minerva-dashboard`
- `business-minerva-content`  
名字不一定这样，但思路要是“领域包”，不是“一个新后端 app”。

然后这些 business package 通过 `app-dms-server` 类似的服务壳，或者一个新的 minerva server app/package 暴露 HTTP。

**第三层：数据访问直接按 plugin 体系落**  
既然你选了 B，就不要再把 Prisma 当正式过渡层。  
要直接设计：
- db plugin 怎么注入
- repository/query service 怎么组织
- 哪些查询属于通用 mysql/pg plugin，哪些属于 Minerva 专属 domain repository
- 原来 Prisma 的查询逻辑怎么映射成 SQL / repository 方法

这里最危险，必须做“查询语义对照表”，逐个确认：
- where 条件
- NULL 语义
- 排序
- 分页
- count
- 聚合
- JSON 字段解析
- 分区表查询策略

**第四层：前端重建承载**  
`apps/minerva` 的 Umi 壳不保留，但“页面行为”要保留。  
所以前端不是“重写一个新后台”，而是：
- 先做路由信息架构映射
- 再迁页面状态和筛选模型
- 再迁 API 调用
- 最后迁权限显示逻辑

尤其你之前已经多次强调的这些点，迁移时必须锁死：
- useState 默认值要跟老系统一致
- SQL NULL 对应的前端筛选语义不能变
- 不要顺手加老系统没有的功能

**第五层：回归验证层**  
这次你选的是高风险路线，所以验证不能只靠 lint/test。  
必须有三类对照：
- **接口对照**：老接口 vs 新接口，输入输出是否一致
- **查询对照**：同一筛选条件下，结果集和计数是否一致
- **页面对照**：同一用户、同一筛选、同一权限下，页面表现是否一致

你这次选 B，其实本质上是在选一种更激进的迁移哲学：  
**不接受“为了平稳过渡而保留旧技术边界”，要从第一天开始就让新仓长成目标形状。**

这个方向不是不行，但代价是：  
你后面一定要接受“迁移前先做模型抽象和语义清点”，否则代码一开搬就会失控。  
也就是说，接下来最该做的不是直接列文件复制清单，而是先定 **Minerva 在 sitin-next 里的领域拆分蓝图**。

所以我只问下一个最关键的问题：

你希望我下一步先给你哪一种？

A. **先给最终目录蓝图**  
我直接给出 Minerva 在 `sitin-next` 里的推荐 package / app 结构

B. **先给迁移分期方案**  
我先按 Phase 1 / 2 / 3 拆出完整迁移路径和每阶段目标

C. **先给领域拆分图**  
我先把 Minerva 现有能力拆成 auth / rbac / user / dashboard / content 这类领域边界，再决定目录怎么放
