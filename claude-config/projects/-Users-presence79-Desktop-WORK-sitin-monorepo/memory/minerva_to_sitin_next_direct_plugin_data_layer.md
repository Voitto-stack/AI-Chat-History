---
name: minerva_to_sitin_next_direct_plugin_data_layer
description: Minerva 迁移到 sitin-next 时，后端数据访问层不保留 Prisma 过渡层，直接一步融入 sitin-next 的 plugin / business package 体系。
type: project
originSessionId: 8dbe6795-1efa-43eb-ba34-7da67f165350
---
Minerva 迁移到 `/Users/presence79/Desktop/WORK/sitin-next` 时，后端数据访问层选择直接一步融入 `sitin-next` 的 plugin / business package 体系，而不是先保留 Prisma 做过渡层。

**Why:** 用户明确选择 B，希望第一阶段就按 `sitin-next` 的后端标准形态落地，而不是采用 Prisma 过渡方案。

**How to apply:** 后续迁移方案应默认把查询、仓储、服务层边界、server plugin 接入和业务 package 拆分一起设计进去；同时要特别强调查询语义对齐、分页/count/NULL 处理和权限逻辑的回归验证，避免一步重构导致业务失真。