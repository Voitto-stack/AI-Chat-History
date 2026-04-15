---
title: problems
date: 2026-04-15T17:04:51+08:00
source: import
original: problems.md
---

从终端输出看，**`pnpm prisma db pull` 已经成功执行了**，但过程中伴随了大量的**警告和限制说明**。

以下是详细解读：

### 1. 核心结果：成功 (SUCCESS)
*   **关键信息**：`✔ Introspected 185 models and wrote them into prisma/schema.prisma in 11.88s`
*   **解读**：Prisma 成功连接到了 `archat` 数据库，读取了结构，并生成/更新了 `prisma/schema.prisma` 文件。你现在可以在代码中使用新拉取的模型了。

### 2. 警告内容解读 (你需要关注的地方)
虽然执行成功，但输出中包含了一些“不完美”的地方，这是由于数据库中有一些 Prisma 目前无法完全支持的特性：

*   **模型被忽略 (Ignored models)**：
    *   有 14 张表（如 `ai_call_record_old`, `comment` 等）因为**没有主键 (Primary Key) 或唯一索引**而被 Prisma 忽略了。
    *   **后果**：你无法通过 Prisma Client 对这些表进行增删改查。如果需要操作这些表，必须在数据库中为它们添加主键。

*   **不支持的数据类型 (Unsupported types)**：
    *   某些字段使用了 `tsvector`（全文检索）、`interval`（时间间隔）或 `vector`（向量数据，通常用于 AI 嵌入）。
    *   **后果**：这些字段在 Prisma 中会被标记为 `Unsupported`，你可能需要使用原始 SQL (`prisma.$queryRaw`) 来查询它们。

*   **分区表 (Partition tables)**：
    *   像 `post`, `tim_msg_record` 等核心表是分区表。
    *   **后果**：Prisma 对分区表的支持尚不完全，可能会在某些高级迁移操作中遇到限制。

*   **检查约束 (Check constraints) 与注释**：
    *   数据库中定义的字段校验逻辑（Check）和表/字段注释未被 Prisma 完全吸收。

*   **表达式索引 (Expression indexes)**：
    *   例如 `uniq_invite_code_lower` 是一个基于函数的索引（转小写后唯一），Prisma 目前无法在 schema 中完全表达这种索引。

### 3. 下一步建议
1.  **运行生成命令**：
    虽然 Schema 拉取成功了，但你还需要更新本地的查询客户端。请在终端运行：
    ```bash
    pnpm prisma generate
    ```
2.  **检查 Schema 文件**：
    打开 `apps/minerva-server/prisma/schema.prisma`，搜索 `Unsupported` 或查看末尾被注释掉的模型，确认你关心的表是否在其中。

**总结：** 数据库结构已经拿到了，代码连接已通。对于那 14 张被忽略的表，如果你需要用到，请务必联系 DBA 或自行在数据库中补充主键。
