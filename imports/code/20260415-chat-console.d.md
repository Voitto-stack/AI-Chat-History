---
title: chat-console.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: chat-console.d.ts
---

# chat-console.d

```ts
import { z } from "zod";
export declare const userSigResponseSchema: z.ZodObject<{
    sdkAppId: z.ZodNumber;
    userSig: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sdkAppId: number;
    userSig: string;
}, {
    sdkAppId: number;
    userSig: string;
}>;
export type UserSigResponse = z.infer<typeof userSigResponseSchema>;
export declare const conversationSourcesRequestSchema: z.ZodObject<{
    userId: z.ZodNumber;
    peerUserIds: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    userId: number;
    peerUserIds: number[];
}, {
    userId: number;
    peerUserIds: number[];
}>;
export type ConversationSourcesRequest = z.infer<typeof conversationSourcesRequestSchema>;
export declare const conversationSourceSchema: z.ZodObject<{
    userId: z.ZodNumber;
    sourceType: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userId: number;
    sourceType: string | null;
}, {
    userId: number;
    sourceType: string | null;
}>;
export declare const conversationSourcesResponseSchema: z.ZodObject<{
    sources: z.ZodArray<z.ZodObject<{
        userId: z.ZodNumber;
        sourceType: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        userId: number;
        sourceType: string | null;
    }, {
        userId: number;
        sourceType: string | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    sources: {
        userId: number;
        sourceType: string | null;
    }[];
}, {
    sources: {
        userId: number;
        sourceType: string | null;
    }[];
}>;
export type ConversationSourcesResponse = z.infer<typeof conversationSourcesResponseSchema>;
export declare const batchUserInfoRequestSchema: z.ZodObject<{
    userIds: z.ZodArray<z.ZodNumber, "many">;
}, "strip", z.ZodTypeAny, {
    userIds: number[];
}, {
    userIds: number[];
}>;
export type BatchUserInfoRequest = z.infer<typeof batchUserInfoRequestSchema>;
export declare const chatUserInfoSchema: z.ZodObject<{
    userId: z.ZodNumber;
    username: z.ZodNullable<z.ZodString>;
    gender: z.ZodNullable<z.ZodString>;
    userType: z.ZodNullable<z.ZodString>;
    userStatus: z.ZodNullable<z.ZodString>;
    avatarUrl: z.ZodNullable<z.ZodString>;
    customAvatar: z.ZodNullable<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    username: string | null;
    avatarUrl: string | null;
    userType: string | null;
    userId: number;
    gender: string | null;
    userStatus: string | null;
    customAvatar?: any;
}, {
    username: string | null;
    avatarUrl: string | null;
    userType: string | null;
    userId: number;
    gender: string | null;
    userStatus: string | null;
    customAvatar?: any;
}>;
export type ChatUserInfo = z.infer<typeof chatUserInfoSchema>;
export declare const batchUserInfoResponseSchema: z.ZodObject<{
    userInfos: z.ZodArray<z.ZodObject<{
        userId: z.ZodNumber;
        username: z.ZodNullable<z.ZodString>;
        gender: z.ZodNullable<z.ZodString>;
        userType: z.ZodNullable<z.ZodString>;
        userStatus: z.ZodNullable<z.ZodString>;
        avatarUrl: z.ZodNullable<z.ZodString>;
        customAvatar: z.ZodNullable<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        username: string | null;
        avatarUrl: string | null;
        userType: string | null;
        userId: number;
        gender: string | null;
        userStatus: string | null;
        customAvatar?: any;
    }, {
        username: string | null;
        avatarUrl: string | null;
        userType: string | null;
        userId: number;
        gender: string | null;
        userStatus: string | null;
        customAvatar?: any;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    userInfos: {
        username: string | null;
        avatarUrl: string | null;
        userType: string | null;
        userId: number;
        gender: string | null;
        userStatus: string | null;
        customAvatar?: any;
    }[];
}, {
    userInfos: {
        username: string | null;
        avatarUrl: string | null;
        userType: string | null;
        userId: number;
        gender: string | null;
        userStatus: string | null;
        customAvatar?: any;
    }[];
}>;
export type BatchUserInfoResponse = z.infer<typeof batchUserInfoResponseSchema>;
//# sourceMappingURL=chat-console.d.ts.map
```
