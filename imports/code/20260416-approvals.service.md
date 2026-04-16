---
title: approvals.service
date: 2026-04-16T21:03:22+08:00
source: import
language: ts
original: approvals.service.ts
---

# approvals.service

```ts
import {
  approvalList,
  approvalGet,
  approvalCreate,
  approvalApprove,
  approvalReject,
  approvalExecute as _approvalExecute,
} from "@heyhru/business-dms-approval";
import { config } from "../config.js";

export { approvalList, approvalGet, approvalCreate, approvalApprove, approvalReject };
export const approvalExecute = _approvalExecute(config.encryptionKey);

```
