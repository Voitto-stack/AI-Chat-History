---
name: SQL NULL 处理必须对齐老项目
description: 迁移 SQL 查询时，NULL 的处理逻辑必须严格对齐老项目，不能自作主张"改进"
type: feedback
---

迁移 SQL 查询时，NULL 处理必须严格对齐老项目，不要自行"修正"。

**Why:** union-streamer 的 unknown 状态筛选，老项目用 `<> 0 AND <> 2`（SQL 中 NULL 不会匹配，被排除），新项目"改进"成 `IS NULL OR NOT IN (0,2)`（包含 NULL）。用户要求对齐老项目行为。

**How to apply:** 迁移 SQL 时原样复制 WHERE 条件逻辑。如果想改进 NULL 处理，必须先跟用户确认。SQL 中 `<> value` 会排除 NULL 行，`NOT IN (...)` 也排除 NULL，但 `IS NULL OR NOT IN` 包含 NULL——这三者有本质区别。
