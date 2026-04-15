---
title: screenshotReview
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: screenshotReview.js
---

# screenshotReview

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScreenshotListResponseSchema = exports.screenshotDetectItemSchema = exports.screenshotUserSchema = exports.getScreenshotListRequestSchema = void 0;
const zod_1 = require("zod");
// ─── Request ──────────────────────────────────────
exports.getScreenshotListRequestSchema = zod_1.z.object({
    femaleUserId: zod_1.z.coerce.number().optional(),
    maleUserId: zod_1.z.coerce.number().optional(),
    invitationCode: zod_1.z.string().optional(),
    startTime: zod_1.z.coerce.number().optional(),
    endTime: zod_1.z.coerce.number().optional(),
    detectResult: zod_1.z.string().optional(),
    // 移除 page/pageSize，对齐老项目（无后端分页）
});
// ─── Response ─────────────────────────────────────
exports.screenshotUserSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    nickname: zod_1.z.string(),
    avatarUrl: zod_1.z.string().nullable(),
});
exports.screenshotDetectItemSchema = zod_1.z.object({
    femaleUserId: zod_1.z.number(),
    femaleUser: exports.screenshotUserSchema.nullable(),
    maleUserId: zod_1.z.number(),
    maleUser: exports.screenshotUserSchema.nullable(),
    invitationCode: zod_1.z.string().nullable(),
    createdAt: zod_1.z.number(), // Unix 毫秒时间戳（对齐老项目 proto: int64）
    roomId: zod_1.z.string().nullable(),
    detectResult: zod_1.z.string().nullable(),
    timePoint: zod_1.z.string().nullable(),
    isViolation: zod_1.z.boolean(),
    needDeduction: zod_1.z.boolean(),
    screenshotUrl: zod_1.z.string().nullable(),
});
exports.getScreenshotListResponseSchema = zod_1.z.object({
    items: zod_1.z.array(exports.screenshotDetectItemSchema),
    total: zod_1.z.number(),
});
//# sourceMappingURL=screenshotReview.js.map
```
