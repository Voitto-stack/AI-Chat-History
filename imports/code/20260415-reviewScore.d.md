---
title: reviewScore.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: reviewScore.d.ts
---

# reviewScore.d

```ts
import { z } from "zod";
export declare const reviewScoreAggregateQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
    userId: z.ZodOptional<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["avgScore", "totalCount", "lowScoreCount"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    pageSize: number;
    sortBy: "totalCount" | "avgScore" | "lowScoreCount";
    sortOrder: "asc" | "desc";
    userId?: number | undefined;
}, {
    userId?: number | undefined;
    page?: number | undefined;
    pageSize?: number | undefined;
    sortBy?: "totalCount" | "avgScore" | "lowScoreCount" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>;
export type ReviewScoreAggregateQuery = z.infer<typeof reviewScoreAggregateQuerySchema>;
export declare const reviewScoreDetailQuerySchema: z.ZodObject<{
    userId: z.ZodNumber;
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
    score: z.ZodOptional<z.ZodNumber>;
    direction: z.ZodDefault<z.ZodEnum<["received", "given"]>>;
}, "strip", z.ZodTypeAny, {
    userId: number;
    page: number;
    pageSize: number;
    direction: "received" | "given";
    score?: number | undefined;
}, {
    userId: number;
    page?: number | undefined;
    pageSize?: number | undefined;
    score?: number | undefined;
    direction?: "received" | "given" | undefined;
}>;
export type ReviewScoreDetailQuery = z.infer<typeof reviewScoreDetailQuerySchema>;
export declare const pwaUserBriefSchema: z.ZodObject<{
    userId: z.ZodNumber;
    username: z.ZodNullable<z.ZodString>;
    nickname: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    avatar: z.ZodNullable<z.ZodString>;
    gender: z.ZodNumber;
    caiUserType: z.ZodNumber;
    regulationStatus: z.ZodNumber;
    customAvatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    username: string | null;
    userId: number;
    gender: number;
    avatar: string | null;
    regulationStatus: number;
    caiUserType: number;
    nickname?: string | null | undefined;
    customAvatarUrl?: string | null | undefined;
}, {
    username: string | null;
    userId: number;
    gender: number;
    avatar: string | null;
    regulationStatus: number;
    caiUserType: number;
    nickname?: string | null | undefined;
    customAvatarUrl?: string | null | undefined;
}>;
export type PwaUserBrief = z.infer<typeof pwaUserBriefSchema>;
export declare const scoreDistributionSchema: z.ZodObject<{
    score1: z.ZodNumber;
    score2: z.ZodNumber;
    score3: z.ZodNumber;
    score4: z.ZodNumber;
    score5: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    score1: number;
    score2: number;
    score3: number;
    score4: number;
    score5: number;
}, {
    score1: number;
    score2: number;
    score3: number;
    score4: number;
    score5: number;
}>;
export type ScoreDistribution = z.infer<typeof scoreDistributionSchema>;
export declare const reviewScoreAggregateItemSchema: z.ZodObject<{
    toUserId: z.ZodNumber;
    userInfo: z.ZodNullable<z.ZodObject<{
        userId: z.ZodNumber;
        username: z.ZodNullable<z.ZodString>;
        nickname: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        avatar: z.ZodNullable<z.ZodString>;
        gender: z.ZodNumber;
        caiUserType: z.ZodNumber;
        regulationStatus: z.ZodNumber;
        customAvatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        username: string | null;
        userId: number;
        gender: number;
        avatar: string | null;
        regulationStatus: number;
        caiUserType: number;
        nickname?: string | null | undefined;
        customAvatarUrl?: string | null | undefined;
    }, {
        username: string | null;
        userId: number;
        gender: number;
        avatar: string | null;
        regulationStatus: number;
        caiUserType: number;
        nickname?: string | null | undefined;
        customAvatarUrl?: string | null | undefined;
    }>>;
    totalCount: z.ZodNumber;
    avgScore: z.ZodNumber;
    distribution: z.ZodObject<{
        score1: z.ZodNumber;
        score2: z.ZodNumber;
        score3: z.ZodNumber;
        score4: z.ZodNumber;
        score5: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        score1: number;
        score2: number;
        score3: number;
        score4: number;
        score5: number;
    }, {
        score1: number;
        score2: number;
        score3: number;
        score4: number;
        score5: number;
    }>;
}, "strip", z.ZodTypeAny, {
    totalCount: number;
    toUserId: number;
    avgScore: number;
    userInfo: {
        username: string | null;
        userId: number;
        gender: number;
        avatar: string | null;
        regulationStatus: number;
        caiUserType: number;
        nickname?: string | null | undefined;
        customAvatarUrl?: string | null | undefined;
    } | null;
    distribution: {
        score1: number;
        score2: number;
        score3: number;
        score4: number;
        score5: number;
    };
}, {
    totalCount: number;
    toUserId: number;
    avgScore: number;
    userInfo: {
        username: string | null;
        userId: number;
        gender: number;
        avatar: string | null;
        regulationStatus: number;
        caiUserType: number;
        nickname?: string | null | undefined;
        customAvatarUrl?: string | null | undefined;
    } | null;
    distribution: {
        score1: number;
        score2: number;
        score3: number;
        score4: number;
        score5: number;
    };
}>;
export type ReviewScoreAggregateItem = z.infer<typeof reviewScoreAggregateItemSchema>;
export declare const reviewScoreAggregateResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        toUserId: z.ZodNumber;
        userInfo: z.ZodNullable<z.ZodObject<{
            userId: z.ZodNumber;
            username: z.ZodNullable<z.ZodString>;
            nickname: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            avatar: z.ZodNullable<z.ZodString>;
            gender: z.ZodNumber;
            caiUserType: z.ZodNumber;
            regulationStatus: z.ZodNumber;
            customAvatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
        }, {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
        }>>;
        totalCount: z.ZodNumber;
        avgScore: z.ZodNumber;
        distribution: z.ZodObject<{
            score1: z.ZodNumber;
            score2: z.ZodNumber;
            score3: z.ZodNumber;
            score4: z.ZodNumber;
            score5: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            score1: number;
            score2: number;
            score3: number;
            score4: number;
            score5: number;
        }, {
            score1: number;
            score2: number;
            score3: number;
            score4: number;
            score5: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        totalCount: number;
        toUserId: number;
        avgScore: number;
        userInfo: {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
        } | null;
        distribution: {
            score1: number;
            score2: number;
            score3: number;
            score4: number;
            score5: number;
        };
    }, {
        totalCount: number;
        toUserId: number;
        avgScore: number;
        userInfo: {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
        } | null;
        distribution: {
            score1: number;
            score2: number;
            score3: number;
            score4: number;
            score5: number;
        };
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    page: number;
    pageSize: number;
    items: {
        totalCount: number;
        toUserId: number;
        avgScore: number;
        userInfo: {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
        } | null;
        distribution: {
            score1: number;
            score2: number;
            score3: number;
            score4: number;
            score5: number;
        };
    }[];
}, {
    total: number;
    page: number;
    pageSize: number;
    items: {
        totalCount: number;
        toUserId: number;
        avgScore: number;
        userInfo: {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
        } | null;
        distribution: {
            score1: number;
            score2: number;
            score3: number;
            score4: number;
            score5: number;
        };
    }[];
}>;
export type ReviewScoreAggregateResponse = z.infer<typeof reviewScoreAggregateResponseSchema>;
export declare const reviewScoreDetailItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    srcUserId: z.ZodNumber;
    toUserId: z.ZodNumber;
    score: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodNullable<z.ZodString>;
    isModified: z.ZodBoolean;
    peerUserInfo: z.ZodNullable<z.ZodObject<{
        userId: z.ZodNumber;
        username: z.ZodNullable<z.ZodString>;
        nickname: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        avatar: z.ZodNullable<z.ZodString>;
        gender: z.ZodNumber;
        caiUserType: z.ZodNumber;
        regulationStatus: z.ZodNumber;
        customAvatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        username: string | null;
        userId: number;
        gender: number;
        avatar: string | null;
        regulationStatus: number;
        caiUserType: number;
        nickname?: string | null | undefined;
        customAvatarUrl?: string | null | undefined;
    }, {
        username: string | null;
        userId: number;
        gender: number;
        avatar: string | null;
        regulationStatus: number;
        caiUserType: number;
        nickname?: string | null | undefined;
        customAvatarUrl?: string | null | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    createdAt: string;
    toUserId: number;
    score: number;
    updatedAt: string | null;
    srcUserId: number;
    isModified: boolean;
    peerUserInfo: {
        username: string | null;
        userId: number;
        gender: number;
        avatar: string | null;
        regulationStatus: number;
        caiUserType: number;
        nickname?: string | null | undefined;
        customAvatarUrl?: string | null | undefined;
    } | null;
}, {
    id: number;
    createdAt: string;
    toUserId: number;
    score: number;
    updatedAt: string | null;
    srcUserId: number;
    isModified: boolean;
    peerUserInfo: {
        username: string | null;
        userId: number;
        gender: number;
        avatar: string | null;
        regulationStatus: number;
        caiUserType: number;
        nickname?: string | null | undefined;
        customAvatarUrl?: string | null | undefined;
    } | null;
}>;
export type ReviewScoreDetailItem = z.infer<typeof reviewScoreDetailItemSchema>;
export declare const reviewScoreDetailResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        srcUserId: z.ZodNumber;
        toUserId: z.ZodNumber;
        score: z.ZodNumber;
        createdAt: z.ZodString;
        updatedAt: z.ZodNullable<z.ZodString>;
        isModified: z.ZodBoolean;
        peerUserInfo: z.ZodNullable<z.ZodObject<{
            userId: z.ZodNumber;
            username: z.ZodNullable<z.ZodString>;
            nickname: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            avatar: z.ZodNullable<z.ZodString>;
            gender: z.ZodNumber;
            caiUserType: z.ZodNumber;
            regulationStatus: z.ZodNumber;
            customAvatarUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
        }, {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        createdAt: string;
        toUserId: number;
        score: number;
        updatedAt: string | null;
        srcUserId: number;
        isModified: boolean;
        peerUserInfo: {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
        } | null;
    }, {
        id: number;
        createdAt: string;
        toUserId: number;
        score: number;
        updatedAt: string | null;
        srcUserId: number;
        isModified: boolean;
        peerUserInfo: {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
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
        id: number;
        createdAt: string;
        toUserId: number;
        score: number;
        updatedAt: string | null;
        srcUserId: number;
        isModified: boolean;
        peerUserInfo: {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
        } | null;
    }[];
}, {
    total: number;
    page: number;
    pageSize: number;
    items: {
        id: number;
        createdAt: string;
        toUserId: number;
        score: number;
        updatedAt: string | null;
        srcUserId: number;
        isModified: boolean;
        peerUserInfo: {
            username: string | null;
            userId: number;
            gender: number;
            avatar: string | null;
            regulationStatus: number;
            caiUserType: number;
            nickname?: string | null | undefined;
            customAvatarUrl?: string | null | undefined;
        } | null;
    }[];
}>;
export type ReviewScoreDetailResponse = z.infer<typeof reviewScoreDetailResponseSchema>;
//# sourceMappingURL=reviewScore.d.ts.map
```
