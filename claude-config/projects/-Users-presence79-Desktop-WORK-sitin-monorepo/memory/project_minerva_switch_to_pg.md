---
name: project_minerva_switch_to_pg
description: Minerva 迁移到 sitin-next 时数据库从 MySQL 切换到 PostgreSQL，复用 server-plugin-pg
type: project
originSessionId: 124ca926-8ad3-4ab1-958d-844733aea12d
---
Minerva 迁移到 sitin-next 时，数据库从 MySQL (Prisma) 切换到 PostgreSQL (raw SQL via server-plugin-pg)，与 DMS 统一数据库技术栈。

**Why:** 用户于 2026-04-16 明确拍板选择切 PG，目标是架构统一，减少驱动维护成本。

**How to apply:** Phase 2 重建后端骨架时，直接基于 `@heyhru/server-plugin-pg` 构建数据访问层，不需要新建 server-plugin-mysql。迁移过程中需要额外考虑 MySQL → PG 的数据迁移工作（数据类型映射、JSON 字段处理、分区表策略等）。
