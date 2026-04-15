---
title: transactions.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: transactions.d.ts
---

# transactions.d

```ts
import { z } from 'zod';
export declare const getWithdrawalsRequestSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
}, {
    page?: number | undefined;
    pageSize?: number | undefined;
}>;
export type GetWithdrawalsRequest = z.infer<typeof getWithdrawalsRequestSchema>;
export declare const withdrawalRetentionSchema: z.ZodObject<{
    secondaryDay: z.ZodString;
    secondaryDayDiff: z.ZodString;
    threeDay: z.ZodString;
    threeDayDiff: z.ZodString;
    sevenDay: z.ZodString;
    sevenDayDiff: z.ZodString;
}, "strip", z.ZodTypeAny, {
    secondaryDay: string;
    secondaryDayDiff: string;
    threeDay: string;
    threeDayDiff: string;
    sevenDay: string;
    sevenDayDiff: string;
}, {
    secondaryDay: string;
    secondaryDayDiff: string;
    threeDay: string;
    threeDayDiff: string;
    sevenDay: string;
    sevenDayDiff: string;
}>;
export type WithdrawalRetention = z.infer<typeof withdrawalRetentionSchema>;
export declare const withdrawalItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    createAt: z.ZodString;
    updateAt: z.ZodString;
    userId: z.ZodNumber;
    amount: z.ZodString;
    status: z.ZodString;
    platform: z.ZodString;
    username: z.ZodNullable<z.ZodString>;
    avatarUrl: z.ZodNullable<z.ZodString>;
    customAvatarUrl: z.ZodNullable<z.ZodString>;
    retention: z.ZodNullable<z.ZodObject<{
        secondaryDay: z.ZodString;
        secondaryDayDiff: z.ZodString;
        threeDay: z.ZodString;
        threeDayDiff: z.ZodString;
        sevenDay: z.ZodString;
        sevenDayDiff: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        secondaryDay: string;
        secondaryDayDiff: string;
        threeDay: string;
        threeDayDiff: string;
        sevenDay: string;
        sevenDayDiff: string;
    }, {
        secondaryDay: string;
        secondaryDayDiff: string;
        threeDay: string;
        threeDayDiff: string;
        sevenDay: string;
        sevenDayDiff: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: string;
    username: string | null;
    id: number;
    avatarUrl: string | null;
    userId: number;
    amount: string;
    customAvatarUrl: string | null;
    platform: string;
    createAt: string;
    updateAt: string;
    retention: {
        secondaryDay: string;
        secondaryDayDiff: string;
        threeDay: string;
        threeDayDiff: string;
        sevenDay: string;
        sevenDayDiff: string;
    } | null;
}, {
    status: string;
    username: string | null;
    id: number;
    avatarUrl: string | null;
    userId: number;
    amount: string;
    customAvatarUrl: string | null;
    platform: string;
    createAt: string;
    updateAt: string;
    retention: {
        secondaryDay: string;
        secondaryDayDiff: string;
        threeDay: string;
        threeDayDiff: string;
        sevenDay: string;
        sevenDayDiff: string;
    } | null;
}>;
export type WithdrawalItem = z.infer<typeof withdrawalItemSchema>;
export declare const getWithdrawalsResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        createAt: z.ZodString;
        updateAt: z.ZodString;
        userId: z.ZodNumber;
        amount: z.ZodString;
        status: z.ZodString;
        platform: z.ZodString;
        username: z.ZodNullable<z.ZodString>;
        avatarUrl: z.ZodNullable<z.ZodString>;
        customAvatarUrl: z.ZodNullable<z.ZodString>;
        retention: z.ZodNullable<z.ZodObject<{
            secondaryDay: z.ZodString;
            secondaryDayDiff: z.ZodString;
            threeDay: z.ZodString;
            threeDayDiff: z.ZodString;
            sevenDay: z.ZodString;
            sevenDayDiff: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            secondaryDay: string;
            secondaryDayDiff: string;
            threeDay: string;
            threeDayDiff: string;
            sevenDay: string;
            sevenDayDiff: string;
        }, {
            secondaryDay: string;
            secondaryDayDiff: string;
            threeDay: string;
            threeDayDiff: string;
            sevenDay: string;
            sevenDayDiff: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        status: string;
        username: string | null;
        id: number;
        avatarUrl: string | null;
        userId: number;
        amount: string;
        customAvatarUrl: string | null;
        platform: string;
        createAt: string;
        updateAt: string;
        retention: {
            secondaryDay: string;
            secondaryDayDiff: string;
            threeDay: string;
            threeDayDiff: string;
            sevenDay: string;
            sevenDayDiff: string;
        } | null;
    }, {
        status: string;
        username: string | null;
        id: number;
        avatarUrl: string | null;
        userId: number;
        amount: string;
        customAvatarUrl: string | null;
        platform: string;
        createAt: string;
        updateAt: string;
        retention: {
            secondaryDay: string;
            secondaryDayDiff: string;
            threeDay: string;
            threeDayDiff: string;
            sevenDay: string;
            sevenDayDiff: string;
        } | null;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    page: number;
    pageSize: number;
    items: {
        status: string;
        username: string | null;
        id: number;
        avatarUrl: string | null;
        userId: number;
        amount: string;
        customAvatarUrl: string | null;
        platform: string;
        createAt: string;
        updateAt: string;
        retention: {
            secondaryDay: string;
            secondaryDayDiff: string;
            threeDay: string;
            threeDayDiff: string;
            sevenDay: string;
            sevenDayDiff: string;
        } | null;
    }[];
}, {
    total: number;
    page: number;
    pageSize: number;
    items: {
        status: string;
        username: string | null;
        id: number;
        avatarUrl: string | null;
        userId: number;
        amount: string;
        customAvatarUrl: string | null;
        platform: string;
        createAt: string;
        updateAt: string;
        retention: {
            secondaryDay: string;
            secondaryDayDiff: string;
            threeDay: string;
            threeDayDiff: string;
            sevenDay: string;
            sevenDayDiff: string;
        } | null;
    }[];
}>;
export type GetWithdrawalsResponse = z.infer<typeof getWithdrawalsResponseSchema>;
export declare const withdrawActionResponseSchema: z.ZodObject<{
    isSuccessful: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    isSuccessful: boolean;
}, {
    isSuccessful: boolean;
}>;
export type WithdrawActionResponse = z.infer<typeof withdrawActionResponseSchema>;
export declare const getVideoCallDetailsRequestSchema: z.ZodObject<{
    femaleUserId: z.ZodNumber;
    pageToken: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    femaleUserId: number;
    pageSize: number;
    pageToken: number;
}, {
    femaleUserId: number;
    pageSize?: number | undefined;
    pageToken?: number | undefined;
}>;
export type GetVideoCallDetailsRequest = z.infer<typeof getVideoCallDetailsRequestSchema>;
export declare const callOrderItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    createAt: z.ZodNumber;
    updateAt: z.ZodNumber;
    maleUserId: z.ZodNumber;
    femaleUserId: z.ZodNumber;
    orderType: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
    status: z.ZodString;
    callDuration: z.ZodNumber;
    amount: z.ZodString;
    reasonType: z.ZodNullable<z.ZodString>;
    freeCallDuration: z.ZodNumber;
    freeAmount: z.ZodNullable<z.ZodString>;
    price: z.ZodNullable<z.ZodString>;
    videoUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: string;
    id: number;
    amount: string;
    orderType: string | number;
    maleUserId: number;
    femaleUserId: number;
    callDuration: number;
    freeCallDuration: number;
    reasonType: string | null;
    createAt: number;
    updateAt: number;
    freeAmount: string | null;
    price: string | null;
    videoUrl: string | null;
}, {
    status: string;
    id: number;
    amount: string;
    orderType: string | number;
    maleUserId: number;
    femaleUserId: number;
    callDuration: number;
    freeCallDuration: number;
    reasonType: string | null;
    createAt: number;
    updateAt: number;
    freeAmount: string | null;
    price: string | null;
    videoUrl: string | null;
}>;
export type CallOrderItem = z.infer<typeof callOrderItemSchema>;
export declare const getVideoCallDetailsResponseSchema: z.ZodObject<{
    orders: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        createAt: z.ZodNumber;
        updateAt: z.ZodNumber;
        maleUserId: z.ZodNumber;
        femaleUserId: z.ZodNumber;
        orderType: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
        status: z.ZodString;
        callDuration: z.ZodNumber;
        amount: z.ZodString;
        reasonType: z.ZodNullable<z.ZodString>;
        freeCallDuration: z.ZodNumber;
        freeAmount: z.ZodNullable<z.ZodString>;
        price: z.ZodNullable<z.ZodString>;
        videoUrl: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: string;
        id: number;
        amount: string;
        orderType: string | number;
        maleUserId: number;
        femaleUserId: number;
        callDuration: number;
        freeCallDuration: number;
        reasonType: string | null;
        createAt: number;
        updateAt: number;
        freeAmount: string | null;
        price: string | null;
        videoUrl: string | null;
    }, {
        status: string;
        id: number;
        amount: string;
        orderType: string | number;
        maleUserId: number;
        femaleUserId: number;
        callDuration: number;
        freeCallDuration: number;
        reasonType: string | null;
        createAt: number;
        updateAt: number;
        freeAmount: string | null;
        price: string | null;
        videoUrl: string | null;
    }>, "many">;
    pageToken: z.ZodNumber;
    hasMore: z.ZodBoolean;
    total: z.ZodNumber;
    sumVideoCallAmount: z.ZodString;
    sumMockVideoCallAmount: z.ZodString;
    sumInsExchangeAmount: z.ZodString;
}, "strip", z.ZodTypeAny, {
    total: number;
    hasMore: boolean;
    pageToken: number;
    orders: {
        status: string;
        id: number;
        amount: string;
        orderType: string | number;
        maleUserId: number;
        femaleUserId: number;
        callDuration: number;
        freeCallDuration: number;
        reasonType: string | null;
        createAt: number;
        updateAt: number;
        freeAmount: string | null;
        price: string | null;
        videoUrl: string | null;
    }[];
    sumVideoCallAmount: string;
    sumMockVideoCallAmount: string;
    sumInsExchangeAmount: string;
}, {
    total: number;
    hasMore: boolean;
    pageToken: number;
    orders: {
        status: string;
        id: number;
        amount: string;
        orderType: string | number;
        maleUserId: number;
        femaleUserId: number;
        callDuration: number;
        freeCallDuration: number;
        reasonType: string | null;
        createAt: number;
        updateAt: number;
        freeAmount: string | null;
        price: string | null;
        videoUrl: string | null;
    }[];
    sumVideoCallAmount: string;
    sumMockVideoCallAmount: string;
    sumInsExchangeAmount: string;
}>;
export type GetVideoCallDetailsResponse = z.infer<typeof getVideoCallDetailsResponseSchema>;
//# sourceMappingURL=transactions.d.ts.map
```
