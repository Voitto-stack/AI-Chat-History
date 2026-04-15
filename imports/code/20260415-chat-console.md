---
title: chat-console
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: chat-console.js
---

# chat-console

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchUserInfoResponseSchema = exports.chatUserInfoSchema = exports.batchUserInfoRequestSchema = exports.conversationSourcesResponseSchema = exports.conversationSourceSchema = exports.conversationSourcesRequestSchema = exports.userSigResponseSchema = void 0;
const zod_1 = require("zod");
// ─── UserSig 生成 ───
exports.userSigResponseSchema = zod_1.z.object({
    sdkAppId: zod_1.z.number(),
    userSig: zod_1.z.string(),
});
// ─── 会话来源查询 ───
exports.conversationSourcesRequestSchema = zod_1.z.object({
    userId: zod_1.z.number().int().positive(),
    peerUserIds: zod_1.z.array(zod_1.z.number().int().positive()),
});
exports.conversationSourceSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    sourceType: zod_1.z.string().nullable(),
});
exports.conversationSourcesResponseSchema = zod_1.z.object({
    sources: zod_1.z.array(exports.conversationSourceSchema),
});
// ─── 批量用户基本信息 ───
exports.batchUserInfoRequestSchema = zod_1.z.object({
    userIds: zod_1.z.array(zod_1.z.number().int().positive()),
});
exports.chatUserInfoSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().nullable(),
    gender: zod_1.z.string().nullable(),
    userType: zod_1.z.string().nullable(),
    userStatus: zod_1.z.string().nullable(),
    avatarUrl: zod_1.z.string().nullable(),
    customAvatar: zod_1.z.any().nullable(),
});
exports.batchUserInfoResponseSchema = zod_1.z.object({
    userInfos: zod_1.z.array(exports.chatUserInfoSchema),
});
//# sourceMappingURL=chat-console.js.map
```
