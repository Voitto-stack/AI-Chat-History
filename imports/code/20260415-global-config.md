---
title: global-config
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: global-config.js
---

# global-config

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUnionGlobalConfigRequestSchema = exports.unionGlobalConfigSchema = void 0;
const zod_1 = require("zod");
// ── Global Config Entity ──────────────────────────────────
exports.unionGlobalConfigSchema = zod_1.z.object({
    key: zod_1.z.string(),
    value: zod_1.z.string(),
    label: zod_1.z.string().nullable(),
    updatedAt: zod_1.z.string(),
});
// ── Update ────────────────────────────────────────────────
exports.updateUnionGlobalConfigRequestSchema = zod_1.z.object({
    value: zod_1.z.string().min(1),
});
//# sourceMappingURL=global-config.js.map
```
