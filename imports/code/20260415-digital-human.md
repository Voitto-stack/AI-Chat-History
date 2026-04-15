---
title: digital-human
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: digital-human.js
---

# digital-human

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotVisibility = exports.DigitalHumanGender = exports.digitalHumanListResponseSchema = exports.digitalHumanItemSchema = exports.botConfigSchema = exports.botConfigUpsertRequestSchema = exports.digitalHumanUpdateRequestSchema = exports.digitalHumanCreateRequestSchema = exports.digitalHumanListRequestSchema = exports.dhInterestTabSchema = exports.dhInterestTagSchema = void 0;
const zod_1 = require("zod");
// === 数字人兴趣标签（字段 required，区别于 user.ts 中的 optional 版本）===
exports.dhInterestTagSchema = zod_1.z.object({
    key: zod_1.z.string(),
    sortKey: zod_1.z.number().int(),
});
exports.dhInterestTabSchema = zod_1.z.object({
    key: zod_1.z.string(),
    sortKey: zod_1.z.number().int(),
    tags: zod_1.z.array(exports.dhInterestTagSchema),
});
// === 请求 Schema ===
exports.digitalHumanListRequestSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    pageSize: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    gender: zod_1.z.coerce.number().int().optional(),
});
exports.digitalHumanCreateRequestSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    age: zod_1.z.number().int().min(1).max(150),
    gender: zod_1.z.number().int().min(0).max(3),
    bio: zod_1.z.string().optional(),
    interests: zod_1.z.array(exports.dhInterestTabSchema).optional(),
    profession: zod_1.z.string().optional(),
    region: zod_1.z.string().optional(),
    education: zod_1.z.string().optional(),
    isPwaVideoVerify: zod_1.z.boolean().default(false),
    avatarUrl: zod_1.z.string().optional(),
});
exports.digitalHumanUpdateRequestSchema = exports.digitalHumanCreateRequestSchema.partial();
exports.botConfigUpsertRequestSchema = zod_1.z.object({
    botId: zod_1.z.string().min(1).max(43),
    participantName: zod_1.z.string().min(1),
    shortDescription: zod_1.z.string().min(1),
    longDescription: zod_1.z.string().min(1),
    greeting: zod_1.z.string().min(1),
});
// === 响应 Schema ===
exports.botConfigSchema = zod_1.z.object({
    externalId: zod_1.z.string(),
    participantName: zod_1.z.string().nullable(),
    shortDescription: zod_1.z.string(),
    longDescription: zod_1.z.string(),
    greeting: zod_1.z.string(),
    avatarUrl: zod_1.z.string().nullable(),
    chatUserId: zod_1.z.number().int(),
});
exports.digitalHumanItemSchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    username: zod_1.z.string(),
    nickname: zod_1.z.string().nullable(),
    age: zod_1.z.number().int().nullable(),
    gender: zod_1.z.number().int().nullable(),
    genderLabel: zod_1.z.string().nullable(),
    bio: zod_1.z.string().nullable(),
    avatarUrl: zod_1.z.string().nullable(),
    customAvatar: zod_1.z.any().nullable(),
    profession: zod_1.z.string().nullable(),
    education: zod_1.z.string().nullable(),
    region: zod_1.z.string().nullable(),
    isPwaVideoVerify: zod_1.z.boolean(),
    createdAt: zod_1.z.string().nullable(),
    interests: zod_1.z.array(exports.dhInterestTabSchema),
    bot: exports.botConfigSchema.nullable(),
});
exports.digitalHumanListResponseSchema = zod_1.z.object({
    items: zod_1.z.array(exports.digitalHumanItemSchema),
    total: zod_1.z.number().int(),
    page: zod_1.z.number().int(),
    pageSize: zod_1.z.number().int(),
});
// === 枚举 ===
exports.DigitalHumanGender = {
    UNSPECIFIED: 0,
    MALE: 1,
    FEMALE: 2,
    NON_BINARY: 3,
};
exports.BotVisibility = {
    UNKNOWN: 0,
    PUBLIC: 1,
    PRIVATE: 2,
    DELETED: 3,
};
//# sourceMappingURL=digital-human.js.map
```
