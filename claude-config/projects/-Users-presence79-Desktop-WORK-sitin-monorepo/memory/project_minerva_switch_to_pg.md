---
name: project_minerva_already_on_pg
description: Minerva 当前数据库已经是 PostgreSQL（不是 MySQL），迁移只需 Prisma → raw SQL
type: project
originSessionId: 124ca926-8ad3-4ab1-958d-844733aea12d
---
Minerva-server 的 Prisma schema 里 `datasource.provider = "postgresql"`，数据库本来就是 PG，不是 MySQL。

**Why:** 2026-04-16 通过实际读取 schema.prisma 确认，之前所有讨论中提到的 "MySQL → PG 迁移" 都是基于错误假设。

**How to apply:** 迁移范围从 "MySQL → PG + Prisma → raw SQL" 缩小为仅 "Prisma → raw SQL"（同一个 PG 库）。不需要做数据迁移、类型映射或停机切库。直接用 `server-plugin-pg` 连接现有 PG 数据库即可。
