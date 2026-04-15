---
title: user-management.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: user-management.d.ts
---

# user-management.d

```ts
import { z } from "zod";
export declare const userFullInfoSchema: z.ZodObject<{
    userId: z.ZodNumber;
    username: z.ZodNullable<z.ZodString>;
    nickname: z.ZodNullable<z.ZodString>;
    bio: z.ZodNullable<z.ZodString>;
    age: z.ZodNullable<z.ZodNumber>;
    gender: z.ZodNullable<z.ZodNumber>;
    genderLabel: z.ZodNullable<z.ZodString>;
    caiUserType: z.ZodNullable<z.ZodNumber>;
    userTypeLabel: z.ZodNullable<z.ZodString>;
    regulationStatus: z.ZodNumber;
    regulationStatusLabel: z.ZodString;
    appName: z.ZodNullable<z.ZodNumber>;
    appNameLabel: z.ZodNullable<z.ZodString>;
    platform: z.ZodNullable<z.ZodNumber>;
    platformLabel: z.ZodNullable<z.ZodString>;
    avatarUrl: z.ZodNullable<z.ZodString>;
    customAvatar: z.ZodNullable<z.ZodAny>;
    beautifiedAvatar: z.ZodNullable<z.ZodString>;
    profession: z.ZodNullable<z.ZodString>;
    education: z.ZodNullable<z.ZodString>;
    race: z.ZodNullable<z.ZodNumber>;
    phoneNumber: z.ZodNullable<z.ZodString>;
    isOnline: z.ZodBoolean;
    lastActiveAt: z.ZodNullable<z.ZodString>;
    isFaceVerified: z.ZodBoolean;
    isPaid: z.ZodNullable<z.ZodBoolean>;
    faceScore: z.ZodNullable<z.ZodNumber>;
    susBot: z.ZodNumber;
    isPwaVideoVerify: z.ZodBoolean;
    sortScore: z.ZodNullable<z.ZodNumber>;
    callOrderRank: z.ZodNullable<z.ZodNumber>;
    invitationCode: z.ZodNullable<z.ZodString>;
    thirdPartyLoginPlatform: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodNullable<z.ZodString>;
    deletedAt: z.ZodNullable<z.ZodString>;
    deviceIds: z.ZodArray<z.ZodString, "many">;
    geoLocation: z.ZodNullable<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    username: string | null;
    avatarUrl: string | null;
    userId: number;
    nickname: string | null;
    age: number | null;
    invitationCode: string | null;
    bio: string | null;
    isPaid: boolean | null;
    callOrderRank: number | null;
    gender: number | null;
    createdAt: string | null;
    profession: string | null;
    education: string | null;
    isPwaVideoVerify: boolean;
    genderLabel: string | null;
    deletedAt: string | null;
    updatedAt: string | null;
    appName: number | null;
    regulationStatus: number;
    susBot: number;
    caiUserType: number | null;
    isOnline: boolean;
    phoneNumber: string | null;
    race: number | null;
    beautifiedAvatar: string | null;
    isFaceVerified: boolean;
    faceScore: number | null;
    userTypeLabel: string | null;
    regulationStatusLabel: string;
    appNameLabel: string | null;
    platform: number | null;
    platformLabel: string | null;
    lastActiveAt: string | null;
    sortScore: number | null;
    thirdPartyLoginPlatform: string | null;
    deviceIds: string[];
    customAvatar?: any;
    geoLocation?: any;
}, {
    username: string | null;
    avatarUrl: string | null;
    userId: number;
    nickname: string | null;
    age: number | null;
    invitationCode: string | null;
    bio: string | null;
    isPaid: boolean | null;
    callOrderRank: number | null;
    gender: number | null;
    createdAt: string | null;
    profession: string | null;
    education: string | null;
    isPwaVideoVerify: boolean;
    genderLabel: string | null;
    deletedAt: string | null;
    updatedAt: string | null;
    appName: number | null;
    regulationStatus: number;
    susBot: number;
    caiUserType: number | null;
    isOnline: boolean;
    phoneNumber: string | null;
    race: number | null;
    beautifiedAvatar: string | null;
    isFaceVerified: boolean;
    faceScore: number | null;
    userTypeLabel: string | null;
    regulationStatusLabel: string;
    appNameLabel: string | null;
    platform: number | null;
    platformLabel: string | null;
    lastActiveAt: string | null;
    sortScore: number | null;
    thirdPartyLoginPlatform: string | null;
    deviceIds: string[];
    customAvatar?: any;
    geoLocation?: any;
}>;
export type UserFullInfo = z.infer<typeof userFullInfoSchema>;
export declare const userSearchQuerySchema: z.ZodObject<{
    mode: z.ZodEnum<["userId", "username", "phone"]>;
    q: z.ZodString;
}, "strip", z.ZodTypeAny, {
    mode: "username" | "userId" | "phone";
    q: string;
}, {
    mode: "username" | "userId" | "phone";
    q: string;
}>;
export type UserSearchQuery = z.infer<typeof userSearchQuerySchema>;
export declare const userSearchResultSchema: z.ZodObject<{
    userIds: z.ZodArray<z.ZodNumber, "many">;
    usernames: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    userIds: number[];
    usernames?: string[] | undefined;
}, {
    userIds: number[];
    usernames?: string[] | undefined;
}>;
export type UserSearchResult = z.infer<typeof userSearchResultSchema>;
export declare const regulationStatusUpdateSchema: z.ZodObject<{
    status: z.ZodNumber;
    releaseTime: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    status: number;
    releaseTime?: number | undefined;
}, {
    status: number;
    releaseTime?: number | undefined;
}>;
export type RegulationStatusUpdate = z.infer<typeof regulationStatusUpdateSchema>;
export declare const userProfileUpdateSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    age: z.ZodOptional<z.ZodNumber>;
    gender: z.ZodOptional<z.ZodNumber>;
    bio: z.ZodOptional<z.ZodString>;
    profession: z.ZodOptional<z.ZodString>;
    education: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    isPwaVideoVerify: z.ZodOptional<z.ZodBoolean>;
    avatarUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username?: string | undefined;
    avatarUrl?: string | undefined;
    age?: number | undefined;
    region?: string | undefined;
    bio?: string | undefined;
    gender?: number | undefined;
    profession?: string | undefined;
    education?: string | undefined;
    isPwaVideoVerify?: boolean | undefined;
}, {
    username?: string | undefined;
    avatarUrl?: string | undefined;
    age?: number | undefined;
    region?: string | undefined;
    bio?: string | undefined;
    gender?: number | undefined;
    profession?: string | undefined;
    education?: string | undefined;
    isPwaVideoVerify?: boolean | undefined;
}>;
export type UserProfileUpdate = z.infer<typeof userProfileUpdateSchema>;
export declare const userSubscriptionItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    purchaseDate: z.ZodString;
    platform: z.ZodEnum<["ios", "android"]>;
    productId: z.ZodNullable<z.ZodString>;
    amount: z.ZodNullable<z.ZodNumber>;
    transactionId: z.ZodNullable<z.ZodString>;
    expiresDate: z.ZodNullable<z.ZodString>;
    opsType: z.ZodNumber;
    opsTypeLabel: z.ZodString;
    appNameLabel: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: number;
    amount: number | null;
    productId: string | null;
    purchaseDate: string;
    appNameLabel: string | null;
    platform: "ios" | "android";
    transactionId: string | null;
    expiresDate: string | null;
    opsType: number;
    opsTypeLabel: string;
}, {
    id: number;
    amount: number | null;
    productId: string | null;
    purchaseDate: string;
    appNameLabel: string | null;
    platform: "ios" | "android";
    transactionId: string | null;
    expiresDate: string | null;
    opsType: number;
    opsTypeLabel: string;
}>;
export type UserSubscriptionItem = z.infer<typeof userSubscriptionItemSchema>;
export declare const userSubscriptionsResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        purchaseDate: z.ZodString;
        platform: z.ZodEnum<["ios", "android"]>;
        productId: z.ZodNullable<z.ZodString>;
        amount: z.ZodNullable<z.ZodNumber>;
        transactionId: z.ZodNullable<z.ZodString>;
        expiresDate: z.ZodNullable<z.ZodString>;
        opsType: z.ZodNumber;
        opsTypeLabel: z.ZodString;
        appNameLabel: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        amount: number | null;
        productId: string | null;
        purchaseDate: string;
        appNameLabel: string | null;
        platform: "ios" | "android";
        transactionId: string | null;
        expiresDate: string | null;
        opsType: number;
        opsTypeLabel: string;
    }, {
        id: number;
        amount: number | null;
        productId: string | null;
        purchaseDate: string;
        appNameLabel: string | null;
        platform: "ios" | "android";
        transactionId: string | null;
        expiresDate: string | null;
        opsType: number;
        opsTypeLabel: string;
    }>, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    items: {
        id: number;
        amount: number | null;
        productId: string | null;
        purchaseDate: string;
        appNameLabel: string | null;
        platform: "ios" | "android";
        transactionId: string | null;
        expiresDate: string | null;
        opsType: number;
        opsTypeLabel: string;
    }[];
}, {
    total: number;
    items: {
        id: number;
        amount: number | null;
        productId: string | null;
        purchaseDate: string;
        appNameLabel: string | null;
        platform: "ios" | "android";
        transactionId: string | null;
        expiresDate: string | null;
        opsType: number;
        opsTypeLabel: string;
    }[];
}>;
export type UserSubscriptionsResponse = z.infer<typeof userSubscriptionsResponseSchema>;
export declare const OpsTypeLabel: Record<number, string>;
export declare const userCallOrderItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    maleUserId: z.ZodNumber;
    femaleUserId: z.ZodNumber;
    orderType: z.ZodString;
    status: z.ZodString;
    callDuration: z.ZodNullable<z.ZodNumber>;
    amount: z.ZodNullable<z.ZodString>;
    reasonType: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    id: number;
    amount: string | null;
    orderType: string;
    maleUserId: number;
    femaleUserId: number;
    callDuration: number | null;
    reasonType: string | null;
    createdAt: string;
    updatedAt: string;
}, {
    status: string;
    id: number;
    amount: string | null;
    orderType: string;
    maleUserId: number;
    femaleUserId: number;
    callDuration: number | null;
    reasonType: string | null;
    createdAt: string;
    updatedAt: string;
}>;
export type UserCallOrderItem = z.infer<typeof userCallOrderItemSchema>;
export declare const userCallOrdersResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        maleUserId: z.ZodNumber;
        femaleUserId: z.ZodNumber;
        orderType: z.ZodString;
        status: z.ZodString;
        callDuration: z.ZodNullable<z.ZodNumber>;
        amount: z.ZodNullable<z.ZodString>;
        reasonType: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: string;
        id: number;
        amount: string | null;
        orderType: string;
        maleUserId: number;
        femaleUserId: number;
        callDuration: number | null;
        reasonType: string | null;
        createdAt: string;
        updatedAt: string;
    }, {
        status: string;
        id: number;
        amount: string | null;
        orderType: string;
        maleUserId: number;
        femaleUserId: number;
        callDuration: number | null;
        reasonType: string | null;
        createdAt: string;
        updatedAt: string;
    }>, "many">;
    total: z.ZodNumber;
    totalAmount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    items: {
        status: string;
        id: number;
        amount: string | null;
        orderType: string;
        maleUserId: number;
        femaleUserId: number;
        callDuration: number | null;
        reasonType: string | null;
        createdAt: string;
        updatedAt: string;
    }[];
    totalAmount: number;
}, {
    total: number;
    items: {
        status: string;
        id: number;
        amount: string | null;
        orderType: string;
        maleUserId: number;
        femaleUserId: number;
        callDuration: number | null;
        reasonType: string | null;
        createdAt: string;
        updatedAt: string;
    }[];
    totalAmount: number;
}>;
export type UserCallOrdersResponse = z.infer<typeof userCallOrdersResponseSchema>;
export declare const userViolationReportSchema: z.ZodObject<{
    id: z.ZodNumber;
    reporterUserId: z.ZodNumber;
    reason: z.ZodNumber;
    reasonLabel: z.ZodString;
    content: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: string;
    content: string | null;
    reporterUserId: number;
    reason: number;
    reasonLabel: string;
}, {
    id: number;
    createdAt: string;
    content: string | null;
    reporterUserId: number;
    reason: number;
    reasonLabel: string;
}>;
export type UserViolationReport = z.infer<typeof userViolationReportSchema>;
export declare const userViolationBlockSchema: z.ZodObject<{
    id: z.ZodNumber;
    blockerUserId: z.ZodNumber;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: string;
    blockerUserId: number;
}, {
    id: number;
    createdAt: string;
    blockerUserId: number;
}>;
export type UserViolationBlock = z.infer<typeof userViolationBlockSchema>;
export declare const userViolationsResponseSchema: z.ZodObject<{
    reports: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        reporterUserId: z.ZodNumber;
        reason: z.ZodNumber;
        reasonLabel: z.ZodString;
        content: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        createdAt: string;
        content: string | null;
        reporterUserId: number;
        reason: number;
        reasonLabel: string;
    }, {
        id: number;
        createdAt: string;
        content: string | null;
        reporterUserId: number;
        reason: number;
        reasonLabel: string;
    }>, "many">;
    blocks: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        blockerUserId: z.ZodNumber;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        createdAt: string;
        blockerUserId: number;
    }, {
        id: number;
        createdAt: string;
        blockerUserId: number;
    }>, "many">;
    samePhoneUserIds: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    reports: {
        id: number;
        createdAt: string;
        content: string | null;
        reporterUserId: number;
        reason: number;
        reasonLabel: string;
    }[];
    blocks: {
        id: number;
        createdAt: string;
        blockerUserId: number;
    }[];
    samePhoneUserIds: number[];
}, {
    reports: {
        id: number;
        createdAt: string;
        content: string | null;
        reporterUserId: number;
        reason: number;
        reasonLabel: string;
    }[];
    blocks: {
        id: number;
        createdAt: string;
        blockerUserId: number;
    }[];
    samePhoneUserIds: number[];
}>;
export type UserViolationsResponse = z.infer<typeof userViolationsResponseSchema>;
export declare const userInterestTagSchema: z.ZodObject<{
    tabKey: z.ZodString;
    tagKey: z.ZodString;
    picUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tabKey: string;
    tagKey: string;
    picUrl: string | null;
}, {
    tabKey: string;
    tagKey: string;
    picUrl: string | null;
}>;
export type UserInterestTag = z.infer<typeof userInterestTagSchema>;
export declare const userInterestsResponseSchema: z.ZodObject<{
    interests: z.ZodArray<z.ZodObject<{
        tabKey: z.ZodString;
        tagKey: z.ZodString;
        picUrl: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tabKey: string;
        tagKey: string;
        picUrl: string | null;
    }, {
        tabKey: string;
        tagKey: string;
        picUrl: string | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    interests: {
        tabKey: string;
        tagKey: string;
        picUrl: string | null;
    }[];
}, {
    interests: {
        tabKey: string;
        tagKey: string;
        picUrl: string | null;
    }[];
}>;
export type UserInterestsResponse = z.infer<typeof userInterestsResponseSchema>;
export declare const userPostItemSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodNumber;
    authorName: z.ZodNullable<z.ZodString>;
    content: z.ZodNullable<z.ZodString>;
    pictures: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
    }, {
        url: string;
    }>, "many">;
    likeCount: z.ZodNumber;
    createdAt: z.ZodNullable<z.ZodString>;
    deletedAt: z.ZodNullable<z.ZodString>;
    bannedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: number;
    createdAt: string | null;
    content: string | null;
    pictures: {
        url: string;
    }[];
    deletedAt: string | null;
    bannedAt: string | null;
    likeCount: number;
    authorName: string | null;
}, {
    id: string;
    userId: number;
    createdAt: string | null;
    content: string | null;
    pictures: {
        url: string;
    }[];
    deletedAt: string | null;
    bannedAt: string | null;
    likeCount: number;
    authorName: string | null;
}>;
export type UserPostItem = z.infer<typeof userPostItemSchema>;
export declare const userPostsResponseSchema: z.ZodObject<{
    posts: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodNumber;
        authorName: z.ZodNullable<z.ZodString>;
        content: z.ZodNullable<z.ZodString>;
        pictures: z.ZodArray<z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>, "many">;
        likeCount: z.ZodNumber;
        createdAt: z.ZodNullable<z.ZodString>;
        deletedAt: z.ZodNullable<z.ZodString>;
        bannedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        userId: number;
        createdAt: string | null;
        content: string | null;
        pictures: {
            url: string;
        }[];
        deletedAt: string | null;
        bannedAt: string | null;
        likeCount: number;
        authorName: string | null;
    }, {
        id: string;
        userId: number;
        createdAt: string | null;
        content: string | null;
        pictures: {
            url: string;
        }[];
        deletedAt: string | null;
        bannedAt: string | null;
        likeCount: number;
        authorName: string | null;
    }>, "many">;
    total: z.ZodNumber;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    total: number;
    posts: {
        id: string;
        userId: number;
        createdAt: string | null;
        content: string | null;
        pictures: {
            url: string;
        }[];
        deletedAt: string | null;
        bannedAt: string | null;
        likeCount: number;
        authorName: string | null;
    }[];
    hasMore: boolean;
}, {
    total: number;
    posts: {
        id: string;
        userId: number;
        createdAt: string | null;
        content: string | null;
        pictures: {
            url: string;
        }[];
        deletedAt: string | null;
        bannedAt: string | null;
        likeCount: number;
        authorName: string | null;
    }[];
    hasMore: boolean;
}>;
export type UserPostsResponse = z.infer<typeof userPostsResponseSchema>;
export declare const RegulationStatus: {
    readonly Active: 0;
    readonly KGroup: 1;
    readonly Banned: 2;
    readonly Admin: 3;
    readonly Collaborator: 4;
    readonly Suspended: 5;
    readonly Deleted: 6;
};
export declare const RegulationStatusLabel: Record<number, string>;
export declare const GenderLabel: Record<number, string>;
export declare const UserTypeLabel: Record<number, string>;
export declare const PlatformLabel: Record<number, string>;
export declare const ReportReasonLabel: Record<number, string>;
export declare const AppNameLabel: Record<number, string>;
//# sourceMappingURL=user-management.d.ts.map
```
