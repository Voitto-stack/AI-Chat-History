---
title: saved-sqls.controller
date: 2026-04-16T21:03:22+08:00
source: import
language: ts
original: saved-sqls.controller.ts
---

# saved-sqls.controller

```ts
import { type FastifyInstance } from "fastify";
import {
  savedSqlList,
  savedSqlCreate,
  savedSqlUpdate,
  savedSqlDelete,
} from "@heyhru/business-dms-saved-sql";

export function savedSqlController(app: FastifyInstance) {
  app.post("/saved-sqls/list", savedSqlList);
  app.post("/saved-sqls/create", savedSqlCreate);
  app.post("/saved-sqls/update", savedSqlUpdate);
  app.post("/saved-sqls/delete", savedSqlDelete);
}

```
