---
title: conversation
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: conversation.js
---

# conversation

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionConversationListResponseSchema = exports.unionConversationListQuerySchema = exports.unionConversationSchema = exports.unionMsgStatusSchema = exports.unionMsgDirectionSchema = void 0;
const zod_1 = require("zod");
exports.unionMsgDirectionSchema = zod_1.z.enum(['inbound', 'outbound']);
exports.unionMsgStatusSchema = zod_1.z.enum(['pending', 'sent', 'delivered', 'failed']);
// ── Conversation Entity ────────────────────────────────────
exports.unionConversationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    direction: exports.unionMsgDirectionSchema,
    content: zod_1.z.string(),
    deviceId: zod_1.z.string().nullable(),
    decisionId: zod_1.z.string().nullable(),
    sendStatus: exports.unionMsgStatusSchema,
    metadata: zod_1.z.any().nullable(),
    createdAt: zod_1.z.string(),
});
// ── List Query ─────────────────────────────────────────────
exports.unionConversationListQuerySchema = zod_1.z.object({
    userId: zod_1.z.string(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    pageSize: zod_1.z.coerce.number().int().min(1).max(100).default(50),
    direction: exports.unionMsgDirectionSchema.optional(),
});
exports.unionConversationListResponseSchema = zod_1.z.object({
    items: zod_1.z.array(exports.unionConversationSchema),
    total: zod_1.z.number(),
    page: zod_1.z.number(),
    pageSize: zod_1.z.number(),
});
//# sourceMappingURL=conversation.js.map
```
