---
name: minerva_to_sitin_next_full_rebuild_target
description: Minerva 迁移到 sitin-next 的目标是前后端都按 sitin-next 规范重构融合，只迁业务逻辑和共享契约，不保留原结构。
type: project
originSessionId: 8dbe6795-1efa-43eb-ba34-7da67f165350
---
Minerva 迁移到 `/Users/presence79/Desktop/WORK/sitin-next` 的目标是前后端都按 `sitin-next` 的规范重构融合，只迁业务逻辑和共享契约，不保留原有 `apps/minerva` 与 `apps/minerva-server` 结构。

**Why:** 用户明确选择 C 路线，希望迁移结果是统一到 `sitin-next` 的架构体系，而不是把旧结构整体搬过去。

**How to apply:** 后续所有迁移建议都应以“业务保真 + 架构重落位”为前提，优先讨论契约保留、模块拆分、运行时落点和分阶段替换，不建议把 Koa/Umi 旧形态直接嵌入 `sitin-next`。