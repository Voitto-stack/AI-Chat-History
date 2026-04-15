---
title: reviewScore
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: reviewScore.js
---

# reviewScore

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewScoreDetailResponseSchema = exports.reviewScoreDetailItemSchema = exports.reviewScoreAggregateResponseSchema = exports.reviewScoreAggregateItemSchema = exports.scoreDistributionSchema = exports.pwaUserBriefSchema = exports.reviewScoreDetailQuerySchema = exports.reviewScoreAggregateQuerySchema = void 0;
const zod_1 = require("zod");
// === 请求 Schema ===
exports.reviewScoreAggregateQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    pageSize: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    userId: zod_1.z.coerce.number().int().positive().optional(),
    sortBy: zod_1.z
        .enum(["avgScore", "totalCount", "lowScoreCount"])
        .default("lowScoreCount"),
    sortOrder: zod_1.z.enum(["asc", "desc"]).default("desc"),
});
exports.reviewScoreDetailQuerySchema = zod_1.z.object({
    userId: zod_1.z.coerce.number().int().positive(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    pageSize: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    score: zod_1.z.coerce.number().int().min(1).max(5).optional(),
    direction: zod_1.z.enum(["received", "given"]).default("received"),
});
// === 响应 Schema ===
exports.pwaUserBriefSchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    username: zod_1.z.string().nullable(),
    nickname: zod_1.z.string().nullable().optional(),
    avatar: zod_1.z.string().nullable(),
    gender: zod_1.z.number().int(),
    caiUserType: zod_1.z.number().int(),
    regulationStatus: zod_1.z.number().int(),
    customAvatarUrl: zod_1.z.string().nullable().optional(),
});
exports.scoreDistributionSchema = zod_1.z.object({
    score1: zod_1.z.number().int(),
    score2: zod_1.z.number().int(),
    score3: zod_1.z.number().int(),
    score4: zod_1.z.number().int(),
    score5: zod_1.z.number().int(),
});
exports.reviewScoreAggregateItemSchema = zod_1.z.object({
    toUserId: zod_1.z.number().int(),
    userInfo: exports.pwaUserBriefSchema.nullable(),
    totalCount: zod_1.z.number().int(),
    avgScore: zod_1.z.number(),
    distribution: exports.scoreDistributionSchema,
});
exports.reviewScoreAggregateResponseSchema = zod_1.z.object({
    items: zod_1.z.array(exports.reviewScoreAggregateItemSchema),
    total: zod_1.z.number().int(),
    page: zod_1.z.number().int(),
    pageSize: zod_1.z.number().int(),
});
exports.reviewScoreDetailItemSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    srcUserId: zod_1.z.number().int(),
    toUserId: zod_1.z.number().int(),
    score: zod_1.z.number().int(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string().nullable(),
    isModified: zod_1.z.boolean(),
    peerUserInfo: exports.pwaUserBriefSchema.nullable(),
});
exports.reviewScoreDetailResponseSchema = zod_1.z.object({
    items: zod_1.z.array(exports.reviewScoreDetailItemSchema),
    total: zod_1.z.number().int(),
    page: zod_1.z.number().int(),
    pageSize: zod_1.z.number().int(),
});
//# sourceMappingURL=reviewScore.js.map
```
