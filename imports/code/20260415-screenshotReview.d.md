---
title: screenshotReview.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: screenshotReview.d.ts
---

# screenshotReview.d

```ts
import { z } from 'zod';
export declare const getScreenshotListRequestSchema: z.ZodObject<{
    femaleUserId: z.ZodOptional<z.ZodNumber>;
    maleUserId: z.ZodOptional<z.ZodNumber>;
    invitationCode: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodNumber>;
    endTime: z.ZodOptional<z.ZodNumber>;
    detectResult: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    invitationCode?: string | undefined;
    startTime?: number | undefined;
    endTime?: number | undefined;
    maleUserId?: number | undefined;
    femaleUserId?: number | undefined;
    detectResult?: string | undefined;
}, {
    invitationCode?: string | undefined;
    startTime?: number | undefined;
    endTime?: number | undefined;
    maleUserId?: number | undefined;
    femaleUserId?: number | undefined;
    detectResult?: string | undefined;
}>;
export type GetScreenshotListRequest = z.infer<typeof getScreenshotListRequestSchema>;
export declare const screenshotUserSchema: z.ZodObject<{
    userId: z.ZodNumber;
    nickname: z.ZodString;
    avatarUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    avatarUrl: string | null;
    userId: number;
    nickname: string;
}, {
    avatarUrl: string | null;
    userId: number;
    nickname: string;
}>;
export type ScreenshotUser = z.infer<typeof screenshotUserSchema>;
export declare const screenshotDetectItemSchema: z.ZodObject<{
    femaleUserId: z.ZodNumber;
    femaleUser: z.ZodNullable<z.ZodObject<{
        userId: z.ZodNumber;
        nickname: z.ZodString;
        avatarUrl: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        avatarUrl: string | null;
        userId: number;
        nickname: string;
    }, {
        avatarUrl: string | null;
        userId: number;
        nickname: string;
    }>>;
    maleUserId: z.ZodNumber;
    maleUser: z.ZodNullable<z.ZodObject<{
        userId: z.ZodNumber;
        nickname: z.ZodString;
        avatarUrl: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        avatarUrl: string | null;
        userId: number;
        nickname: string;
    }, {
        avatarUrl: string | null;
        userId: number;
        nickname: string;
    }>>;
    invitationCode: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodNumber;
    roomId: z.ZodNullable<z.ZodString>;
    detectResult: z.ZodNullable<z.ZodString>;
    timePoint: z.ZodNullable<z.ZodString>;
    isViolation: z.ZodBoolean;
    needDeduction: z.ZodBoolean;
    screenshotUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    invitationCode: string | null;
    maleUserId: number;
    femaleUserId: number;
    createdAt: number;
    detectResult: string | null;
    femaleUser: {
        avatarUrl: string | null;
        userId: number;
        nickname: string;
    } | null;
    maleUser: {
        avatarUrl: string | null;
        userId: number;
        nickname: string;
    } | null;
    roomId: string | null;
    timePoint: string | null;
    isViolation: boolean;
    needDeduction: boolean;
    screenshotUrl: string | null;
}, {
    invitationCode: string | null;
    maleUserId: number;
    femaleUserId: number;
    createdAt: number;
    detectResult: string | null;
    femaleUser: {
        avatarUrl: string | null;
        userId: number;
        nickname: string;
    } | null;
    maleUser: {
        avatarUrl: string | null;
        userId: number;
        nickname: string;
    } | null;
    roomId: string | null;
    timePoint: string | null;
    isViolation: boolean;
    needDeduction: boolean;
    screenshotUrl: string | null;
}>;
export type ScreenshotDetectItem = z.infer<typeof screenshotDetectItemSchema>;
export declare const getScreenshotListResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        femaleUserId: z.ZodNumber;
        femaleUser: z.ZodNullable<z.ZodObject<{
            userId: z.ZodNumber;
            nickname: z.ZodString;
            avatarUrl: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        }, {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        }>>;
        maleUserId: z.ZodNumber;
        maleUser: z.ZodNullable<z.ZodObject<{
            userId: z.ZodNumber;
            nickname: z.ZodString;
            avatarUrl: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        }, {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        }>>;
        invitationCode: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodNumber;
        roomId: z.ZodNullable<z.ZodString>;
        detectResult: z.ZodNullable<z.ZodString>;
        timePoint: z.ZodNullable<z.ZodString>;
        isViolation: z.ZodBoolean;
        needDeduction: z.ZodBoolean;
        screenshotUrl: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        invitationCode: string | null;
        maleUserId: number;
        femaleUserId: number;
        createdAt: number;
        detectResult: string | null;
        femaleUser: {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        } | null;
        maleUser: {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        } | null;
        roomId: string | null;
        timePoint: string | null;
        isViolation: boolean;
        needDeduction: boolean;
        screenshotUrl: string | null;
    }, {
        invitationCode: string | null;
        maleUserId: number;
        femaleUserId: number;
        createdAt: number;
        detectResult: string | null;
        femaleUser: {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        } | null;
        maleUser: {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        } | null;
        roomId: string | null;
        timePoint: string | null;
        isViolation: boolean;
        needDeduction: boolean;
        screenshotUrl: string | null;
    }>, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    items: {
        invitationCode: string | null;
        maleUserId: number;
        femaleUserId: number;
        createdAt: number;
        detectResult: string | null;
        femaleUser: {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        } | null;
        maleUser: {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        } | null;
        roomId: string | null;
        timePoint: string | null;
        isViolation: boolean;
        needDeduction: boolean;
        screenshotUrl: string | null;
    }[];
}, {
    total: number;
    items: {
        invitationCode: string | null;
        maleUserId: number;
        femaleUserId: number;
        createdAt: number;
        detectResult: string | null;
        femaleUser: {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        } | null;
        maleUser: {
            avatarUrl: string | null;
            userId: number;
            nickname: string;
        } | null;
        roomId: string | null;
        timePoint: string | null;
        isViolation: boolean;
        needDeduction: boolean;
        screenshotUrl: string | null;
    }[];
}>;
export type GetScreenshotListResponse = z.infer<typeof getScreenshotListResponseSchema>;
//# sourceMappingURL=screenshotReview.d.ts.map
```
