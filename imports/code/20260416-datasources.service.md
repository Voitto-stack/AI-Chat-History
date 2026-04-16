---
title: datasources.service
date: 2026-04-16T21:03:22+08:00
source: import
language: ts
original: datasources.service.ts
---

# datasources.service

```ts
import {
  datasourceList,
  datasourceGet,
  datasourceCreate as _datasourceCreate,
  datasourceUpdate as _datasourceUpdate,
  datasourceDelete,
} from "@heyhru/business-dms-datasource";
import { config } from "../config.js";

export { datasourceList, datasourceGet, datasourceDelete };
export const datasourceCreate = _datasourceCreate(config.encryptionKey);
export const datasourceUpdate = _datasourceUpdate(config.encryptionKey);

```
