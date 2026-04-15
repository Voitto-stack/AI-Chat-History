---
title: user-management
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: user-management.js
---

# user-management

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppNameLabel = exports.ReportReasonLabel = exports.PlatformLabel = exports.UserTypeLabel = exports.GenderLabel = exports.RegulationStatusLabel = exports.RegulationStatus = exports.userPostsResponseSchema = exports.userPostItemSchema = exports.userInterestsResponseSchema = exports.userInterestTagSchema = exports.userViolationsResponseSchema = exports.userViolationBlockSchema = exports.userViolationReportSchema = exports.userCallOrdersResponseSchema = exports.userCallOrderItemSchema = exports.OpsTypeLabel = exports.userSubscriptionsResponseSchema = exports.userSubscriptionItemSchema = exports.userProfileUpdateSchema = exports.regulationStatusUpdateSchema = exports.userSearchResultSchema = exports.userSearchQuerySchema = exports.userFullInfoSchema = void 0;
const zod_1 = require("zod");
// ─── 用户完整信息 ───
exports.userFullInfoSchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    username: zod_1.z.string().nullable(),
    nickname: zod_1.z.string().nullable(),
    bio: zod_1.z.string().nullable(),
    age: zod_1.z.number().int().nullable(),
    gender: zod_1.z.number().int().nullable(),
    genderLabel: zod_1.z.string().nullable(),
    caiUserType: zod_1.z.number().int().nullable(),
    userTypeLabel: zod_1.z.string().nullable(),
    regulationStatus: zod_1.z.number().int(),
    regulationStatusLabel: zod_1.z.string(),
    appName: zod_1.z.number().int().nullable(),
    appNameLabel: zod_1.z.string().nullable(),
    platform: zod_1.z.number().int().nullable(),
    platformLabel: zod_1.z.string().nullable(),
    avatarUrl: zod_1.z.string().nullable(),
    customAvatar: zod_1.z.any().nullable(),
    beautifiedAvatar: zod_1.z.string().nullable(),
    profession: zod_1.z.string().nullable(),
    education: zod_1.z.string().nullable(),
    race: zod_1.z.number().int().nullable(),
    phoneNumber: zod_1.z.string().nullable(),
    isOnline: zod_1.z.boolean(),
    lastActiveAt: zod_1.z.string().nullable(),
    isFaceVerified: zod_1.z.boolean(),
    isPaid: zod_1.z.boolean().nullable(),
    faceScore: zod_1.z.number().int().nullable(),
    susBot: zod_1.z.number().int(),
    isPwaVideoVerify: zod_1.z.boolean(),
    sortScore: zod_1.z.number().nullable(),
    callOrderRank: zod_1.z.number().int().nullable(),
    invitationCode: zod_1.z.string().nullable(),
    thirdPartyLoginPlatform: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string().nullable(),
    updatedAt: zod_1.z.string().nullable(),
    deletedAt: zod_1.z.string().nullable(),
    deviceIds: zod_1.z.array(zod_1.z.string()),
    geoLocation: zod_1.z.any().nullable(),
});
// ─── 搜索 ───
exports.userSearchQuerySchema = zod_1.z.object({
    mode: zod_1.z.enum(["userId", "username", "phone"]),
    q: zod_1.z.string().min(1),
});
exports.userSearchResultSchema = zod_1.z.object({
    userIds: zod_1.z.array(zod_1.z.number().int()),
    usernames: zod_1.z.array(zod_1.z.string()).optional(),
});
// ─── 状态管理 ───
exports.regulationStatusUpdateSchema = zod_1.z.object({
    status: zod_1.z.number().int(),
    releaseTime: zod_1.z.number().optional(),
});
// ─── 用户资料编辑 ───
exports.userProfileUpdateSchema = zod_1.z.object({
    username: zod_1.z.string().min(1).optional(),
    age: zod_1.z.number().int().min(1).max(150).optional(),
    gender: zod_1.z.number().int().min(0).max(3).optional(),
    bio: zod_1.z.string().optional(),
    profession: zod_1.z.string().optional(),
    education: zod_1.z.string().optional(),
    region: zod_1.z.string().optional(),
    isPwaVideoVerify: zod_1.z.boolean().optional(),
    avatarUrl: zod_1.z.string().optional(),
});
// ─── 订阅/付费记录 ───
exports.userSubscriptionItemSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    purchaseDate: zod_1.z.string(),
    platform: zod_1.z.enum(["ios", "android"]),
    productId: zod_1.z.string().nullable(),
    amount: zod_1.z.number().nullable(),
    transactionId: zod_1.z.string().nullable(),
    expiresDate: zod_1.z.string().nullable(),
    opsType: zod_1.z.number().int(),
    opsTypeLabel: zod_1.z.string(),
    appNameLabel: zod_1.z.string().nullable(),
});
exports.userSubscriptionsResponseSchema = zod_1.z.object({
    items: zod_1.z.array(exports.userSubscriptionItemSchema),
    total: zod_1.z.number().int(),
});
exports.OpsTypeLabel = {
    0: "Purchase",
    1: "Renew",
    2: "Refund",
    3: "Expire",
    4: "Cancel",
};
// ─── 通话交易记录 ───
exports.userCallOrderItemSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    maleUserId: zod_1.z.number().int(),
    femaleUserId: zod_1.z.number().int(),
    orderType: zod_1.z.string(),
    status: zod_1.z.string(),
    callDuration: zod_1.z.number().int().nullable(),
    amount: zod_1.z.string().nullable(),
    reasonType: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
exports.userCallOrdersResponseSchema = zod_1.z.object({
    items: zod_1.z.array(exports.userCallOrderItemSchema),
    total: zod_1.z.number().int(),
    totalAmount: zod_1.z.number(),
});
// ─── 违规记录 ───
exports.userViolationReportSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    reporterUserId: zod_1.z.number().int(),
    reason: zod_1.z.number().int(),
    reasonLabel: zod_1.z.string(),
    content: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
});
exports.userViolationBlockSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    blockerUserId: zod_1.z.number().int(),
    createdAt: zod_1.z.string(),
});
exports.userViolationsResponseSchema = zod_1.z.object({
    reports: zod_1.z.array(exports.userViolationReportSchema),
    blocks: zod_1.z.array(exports.userViolationBlockSchema),
    samePhoneUserIds: zod_1.z.array(zod_1.z.number().int()),
});
// ─── 兴趣标签 ───
exports.userInterestTagSchema = zod_1.z.object({
    tabKey: zod_1.z.string(),
    tagKey: zod_1.z.string(),
    picUrl: zod_1.z.string().nullable(),
});
exports.userInterestsResponseSchema = zod_1.z.object({
    interests: zod_1.z.array(exports.userInterestTagSchema),
});
// ─── 用户帖子 ───
exports.userPostItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.number().int(),
    authorName: zod_1.z.string().nullable(),
    content: zod_1.z.string().nullable(),
    pictures: zod_1.z.array(zod_1.z.object({ url: zod_1.z.string() })),
    likeCount: zod_1.z.number().int(),
    createdAt: zod_1.z.string().nullable(),
    deletedAt: zod_1.z.string().nullable(),
    bannedAt: zod_1.z.string().nullable(),
});
exports.userPostsResponseSchema = zod_1.z.object({
    posts: zod_1.z.array(exports.userPostItemSchema),
    total: zod_1.z.number().int(),
    hasMore: zod_1.z.boolean(),
});
// ─── 枚举常量 ───
exports.RegulationStatus = {
    Active: 0,
    KGroup: 1,
    Banned: 2,
    Admin: 3,
    Collaborator: 4,
    Suspended: 5,
    Deleted: 6,
};
exports.RegulationStatusLabel = {
    0: "Active",
    1: "KGroup",
    2: "Banned",
    3: "Admin",
    4: "Collaborator",
    5: "Suspended",
    6: "Deleted",
};
exports.GenderLabel = {
    0: "Unspecified",
    1: "Male",
    2: "Female",
    3: "Non-Binary",
};
exports.UserTypeLabel = {
    0: "Unknown",
    1: "User",
    2: "CaiBot",
    3: "DigitalHuman",
    4: "FakeUser",
};
exports.PlatformLabel = {
    0: "Unknown",
    1: "iOS",
    2: "Android",
    3: "Web",
};
exports.ReportReasonLabel = {
    0: "Inappropriate speech or content",
    1: "Inappropriate profile",
    2: "User under 16 years old",
    3: "Intellectual property infringement",
    4: "Spam or ads",
    5: "Pedophile",
};
exports.AppNameLabel = {
    0: "UNKNOWN",
    1: "AF",
    2: "HAVEN",
    3: "HAVEN_PWA",
    4: "GRACECHAT",
    5: "WAVE",
    6: "BALAFRIENDS",
    7: "LOVIA",
    8: "DORA",
    9: "ETERNA",
    10: "POKA",
    11: "DONI",
    12: "KVIO",
    13: "LUMA",
    14: "ROMI",
    15: "ELARA",
    16: "DONI_IOS",
    17: "YULA",
    18: "ROMI_ANDROID",
    19: "AURA",
};
//# sourceMappingURL=user-management.js.map
```
