---
title: approvals.controller
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: approvals.controller.ts
---

# approvals.controller

```ts
import { type FastifyInstance } from "fastify";
import {
  approvalList,
  approvalGet,
  approvalCreate,
  approvalApprove,
  approvalReject,
  approvalExecute,
} from "./approvals.service.js";

export function approvalController(app: FastifyInstance) {
  app.post("/approvals/list", approvalList);
  app.post("/approvals/get", approvalGet);
  app.post("/approvals/create", approvalCreate);
  app.post("/approvals/approve", approvalApprove);
  app.post("/approvals/reject", approvalReject);
  app.post("/approvals/execute", approvalExecute);
}

```
