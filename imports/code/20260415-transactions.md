---
title: transactions
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: transactions.js
---

# transactions

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoCallDetailsResponseSchema = exports.callOrderItemSchema = exports.getVideoCallDetailsRequestSchema = exports.withdrawActionResponseSchema = exports.getWithdrawalsResponseSchema = exports.withdrawalItemSchema = exports.withdrawalRetentionSchema = exports.getWithdrawalsRequestSchema = void 0;
const zod_1 = require("zod");
// ==================== 提现审批 ====================
exports.getWithdrawalsRequestSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    pageSize: zod_1.z.coerce.number().int().min(1).max(100).default(10),
});
exports.withdrawalRetentionSchema = zod_1.z.object({
    secondaryDay: zod_1.z.string(),
    secondaryDayDiff: zod_1.z.string(),
    threeDay: zod_1.z.string(),
    threeDayDiff: zod_1.z.string(),
    sevenDay: zod_1.z.string(),
    sevenDayDiff: zod_1.z.string(),
});
exports.withdrawalItemSchema = zod_1.z.object({
    id: zod_1.z.number(),
    createAt: zod_1.z.string(),
    updateAt: zod_1.z.string(),
    userId: zod_1.z.number(),
    amount: zod_1.z.string(),
    status: zod_1.z.string(),
    platform: zod_1.z.string(),
    username: zod_1.z.string().nullable(),
    avatarUrl: zod_1.z.string().nullable(),
    customAvatarUrl: zod_1.z.string().nullable(),
    retention: exports.withdrawalRetentionSchema.nullable(),
});
exports.getWithdrawalsResponseSchema = zod_1.z.object({
    items: zod_1.z.array(exports.withdrawalItemSchema),
    total: zod_1.z.number(),
    page: zod_1.z.number(),
    pageSize: zod_1.z.number(),
});
exports.withdrawActionResponseSchema = zod_1.z.object({
    isSuccessful: zod_1.z.boolean(),
});
// ==================== 视频通话详情 ====================
exports.getVideoCallDetailsRequestSchema = zod_1.z.object({
    femaleUserId: zod_1.z.coerce.number().int(),
    pageToken: zod_1.z.coerce.number().int().default(0),
    pageSize: zod_1.z.coerce.number().int().min(1).max(100).default(10),
});
exports.callOrderItemSchema = zod_1.z.object({
    id: zod_1.z.number(),
    createAt: zod_1.z.number(), // Unix timestamp 秒
    updateAt: zod_1.z.number(), // Unix timestamp 秒
    maleUserId: zod_1.z.number(),
    femaleUserId: zod_1.z.number(),
    orderType: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]),
    status: zod_1.z.string(),
    callDuration: zod_1.z.number(),
    amount: zod_1.z.string(),
    reasonType: zod_1.z.string().nullable(),
    freeCallDuration: zod_1.z.number(),
    freeAmount: zod_1.z.string().nullable(),
    price: zod_1.z.string().nullable(),
    videoUrl: zod_1.z.string().nullable(),
});
exports.getVideoCallDetailsResponseSchema = zod_1.z.object({
    orders: zod_1.z.array(exports.callOrderItemSchema),
    pageToken: zod_1.z.number(),
    hasMore: zod_1.z.boolean(),
    total: zod_1.z.number(),
    sumVideoCallAmount: zod_1.z.string(),
    sumMockVideoCallAmount: zod_1.z.string(),
    sumInsExchangeAmount: zod_1.z.string(),
});
//# sourceMappingURL=transactions.js.map
```
