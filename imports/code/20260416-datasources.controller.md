---
title: datasources.controller
date: 2026-04-16T21:03:22+08:00
source: import
language: ts
original: datasources.controller.ts
---

# datasources.controller

```ts
import { type FastifyInstance } from "fastify";
import {
  datasourceList,
  datasourceGet,
  datasourceCreate,
  datasourceUpdate,
  datasourceDelete,
} from "./datasources.service.js";

export function datasourceController(app: FastifyInstance) {
  app.post("/datasources/list", datasourceList);
  app.post("/datasources/get", datasourceGet);
  app.post("/datasources/create", datasourceCreate);
  app.post("/datasources/update", datasourceUpdate);
  app.post("/datasources/delete", datasourceDelete);
}

```
