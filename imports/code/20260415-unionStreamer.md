---
title: unionStreamer
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: unionStreamer.js
---

# unionStreamer

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGuildRequestSchema = exports.getGuildsResponseSchema = exports.guildItemSchema = exports.getGuildsRequestSchema = exports.auditReviewRequestSchema = exports.getReviewsResponseSchema = exports.reviewItemSchema = exports.getReviewsRequestSchema = exports.getStreamersResponseSchema = exports.streamerItemSchema = exports.getStreamersRequestSchema = exports.auditStatusSchema = exports.streamerStatusSchema = void 0;
/**
 * Union Streamer Schemas
 * PWA 工会主播管理的请求/响应 Schema
 */
const zod_1 = require("zod");
// ─── Enums ───────────────────────────────────────
exports.streamerStatusSchema = zod_1.z.enum(['all', 'active', 'banned', 'unknown']);
exports.auditStatusSchema = zod_1.z.enum(['Auditing', 'Approved', 'Rejected']);
// ─── Streamers (Tab1: 主播查询) ─────────────────
exports.getStreamersRequestSchema = zod_1.z.object({
    code: zod_1.z.string().optional(),
    startTime: zod_1.z.coerce.number().optional(),
    endTime: zod_1.z.coerce.number().optional(),
    status: exports.streamerStatusSchema.optional().default('all'),
    limit: zod_1.z.coerce.number().min(1).max(10000).default(10),
    offset: zod_1.z.coerce.number().min(0).default(0),
});
exports.streamerItemSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    code: zod_1.z.string().nullable(),
    regulationStatus: zod_1.z.string(),
});
exports.getStreamersResponseSchema = zod_1.z.object({
    streamers: zod_1.z.array(exports.streamerItemSchema),
    total: zod_1.z.number(),
});
// ─── Reviews (Tab2: 主播审核) ───────────────────
exports.getReviewsRequestSchema = zod_1.z.object({
    auditStatus: exports.auditStatusSchema,
    limit: zod_1.z.coerce.number().min(1).max(100).default(10),
    offset: zod_1.z.coerce.number().min(0).default(0),
});
exports.reviewItemSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().nullable(),
    customAvatar: zod_1.z.object({ url: zod_1.z.string(), minUrl: zod_1.z.string().optional() }).nullable(),
    clubName: zod_1.z.string().nullable(),
    url: zod_1.z.string().nullable(),
    auditStatus: zod_1.z.string(),
});
exports.getReviewsResponseSchema = zod_1.z.object({
    reviews: zod_1.z.array(exports.reviewItemSchema),
    total: zod_1.z.number(),
});
// ─── Audit (审核操作) ───────────────────────────
exports.auditReviewRequestSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    auditStatus: zod_1.z.enum(['Approved', 'Rejected']),
});
// ─── Guilds (Tab3: 公会列表) ────────────────────
exports.getGuildsRequestSchema = zod_1.z.object({
    limit: zod_1.z.coerce.number().min(1).max(100).default(10),
    offset: zod_1.z.coerce.number().min(0).default(0),
});
exports.guildItemSchema = zod_1.z.object({
    id: zod_1.z.number(),
    clubName: zod_1.z.string(),
    clubEmail: zod_1.z.string().nullable(),
    country: zod_1.z.string().nullable(),
    clubMasterPhone: zod_1.z.string().nullable(),
    clubMasterName: zod_1.z.string().nullable(),
    invitationCode: zod_1.z.string(),
    createdBy: zod_1.z.number().nullable(),
});
exports.getGuildsResponseSchema = zod_1.z.object({
    guilds: zod_1.z.array(exports.guildItemSchema),
    total: zod_1.z.number(),
});
exports.createGuildRequestSchema = zod_1.z.object({
    clubName: zod_1.z.string().min(1).max(60).regex(/^[^\u4e00-\u9fa5]+$/, '公会名不能包含中文'),
    clubEmail: zod_1.z.string().email().max(60),
    country: zod_1.z.string().min(1),
    clubMasterPhone: zod_1.z.string().max(60).optional(),
    clubMasterName: zod_1.z.string().max(60).optional(),
});
//# sourceMappingURL=unionStreamer.js.map
```
