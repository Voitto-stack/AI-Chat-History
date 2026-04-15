---
title: unionStreamer.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: unionStreamer.d.ts
---

# unionStreamer.d

```ts
/**
 * Union Streamer Schemas
 * PWA 工会主播管理的请求/响应 Schema
 */
import { z } from 'zod';
export declare const streamerStatusSchema: z.ZodEnum<["all", "active", "banned", "unknown"]>;
export type StreamerStatus = z.infer<typeof streamerStatusSchema>;
export declare const auditStatusSchema: z.ZodEnum<["Auditing", "Approved", "Rejected"]>;
export type AuditStatus = z.infer<typeof auditStatusSchema>;
export declare const getStreamersRequestSchema: z.ZodObject<{
    code: z.ZodOptional<z.ZodString>;
    startTime: z.ZodOptional<z.ZodNumber>;
    endTime: z.ZodOptional<z.ZodNumber>;
    status: z.ZodDefault<z.ZodOptional<z.ZodEnum<["all", "active", "banned", "unknown"]>>>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    status: "unknown" | "all" | "banned" | "active";
    limit: number;
    offset: number;
    code?: string | undefined;
    startTime?: number | undefined;
    endTime?: number | undefined;
}, {
    code?: string | undefined;
    status?: "unknown" | "all" | "banned" | "active" | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    startTime?: number | undefined;
    endTime?: number | undefined;
}>;
export type GetStreamersRequest = z.infer<typeof getStreamersRequestSchema>;
export declare const streamerItemSchema: z.ZodObject<{
    userId: z.ZodNumber;
    username: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    code: z.ZodNullable<z.ZodString>;
    regulationStatus: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string | null;
    username: string | null;
    userId: number;
    createdAt: string;
    regulationStatus: string;
}, {
    code: string | null;
    username: string | null;
    userId: number;
    createdAt: string;
    regulationStatus: string;
}>;
export type StreamerItem = z.infer<typeof streamerItemSchema>;
export declare const getStreamersResponseSchema: z.ZodObject<{
    streamers: z.ZodArray<z.ZodObject<{
        userId: z.ZodNumber;
        username: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        code: z.ZodNullable<z.ZodString>;
        regulationStatus: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string | null;
        username: string | null;
        userId: number;
        createdAt: string;
        regulationStatus: string;
    }, {
        code: string | null;
        username: string | null;
        userId: number;
        createdAt: string;
        regulationStatus: string;
    }>, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    streamers: {
        code: string | null;
        username: string | null;
        userId: number;
        createdAt: string;
        regulationStatus: string;
    }[];
}, {
    total: number;
    streamers: {
        code: string | null;
        username: string | null;
        userId: number;
        createdAt: string;
        regulationStatus: string;
    }[];
}>;
export type GetStreamersResponse = z.infer<typeof getStreamersResponseSchema>;
export declare const getReviewsRequestSchema: z.ZodObject<{
    auditStatus: z.ZodEnum<["Auditing", "Approved", "Rejected"]>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    auditStatus: "Auditing" | "Approved" | "Rejected";
}, {
    auditStatus: "Auditing" | "Approved" | "Rejected";
    limit?: number | undefined;
    offset?: number | undefined;
}>;
export type GetReviewsRequest = z.infer<typeof getReviewsRequestSchema>;
export declare const reviewItemSchema: z.ZodObject<{
    userId: z.ZodNumber;
    username: z.ZodNullable<z.ZodString>;
    customAvatar: z.ZodNullable<z.ZodObject<{
        url: z.ZodString;
        minUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        minUrl?: string | undefined;
    }, {
        url: string;
        minUrl?: string | undefined;
    }>>;
    clubName: z.ZodNullable<z.ZodString>;
    url: z.ZodNullable<z.ZodString>;
    auditStatus: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string | null;
    userId: number;
    url: string | null;
    customAvatar: {
        url: string;
        minUrl?: string | undefined;
    } | null;
    auditStatus: string;
    clubName: string | null;
}, {
    username: string | null;
    userId: number;
    url: string | null;
    customAvatar: {
        url: string;
        minUrl?: string | undefined;
    } | null;
    auditStatus: string;
    clubName: string | null;
}>;
export type ReviewItem = z.infer<typeof reviewItemSchema>;
export declare const getReviewsResponseSchema: z.ZodObject<{
    reviews: z.ZodArray<z.ZodObject<{
        userId: z.ZodNumber;
        username: z.ZodNullable<z.ZodString>;
        customAvatar: z.ZodNullable<z.ZodObject<{
            url: z.ZodString;
            minUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            minUrl?: string | undefined;
        }, {
            url: string;
            minUrl?: string | undefined;
        }>>;
        clubName: z.ZodNullable<z.ZodString>;
        url: z.ZodNullable<z.ZodString>;
        auditStatus: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        username: string | null;
        userId: number;
        url: string | null;
        customAvatar: {
            url: string;
            minUrl?: string | undefined;
        } | null;
        auditStatus: string;
        clubName: string | null;
    }, {
        username: string | null;
        userId: number;
        url: string | null;
        customAvatar: {
            url: string;
            minUrl?: string | undefined;
        } | null;
        auditStatus: string;
        clubName: string | null;
    }>, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    reviews: {
        username: string | null;
        userId: number;
        url: string | null;
        customAvatar: {
            url: string;
            minUrl?: string | undefined;
        } | null;
        auditStatus: string;
        clubName: string | null;
    }[];
}, {
    total: number;
    reviews: {
        username: string | null;
        userId: number;
        url: string | null;
        customAvatar: {
            url: string;
            minUrl?: string | undefined;
        } | null;
        auditStatus: string;
        clubName: string | null;
    }[];
}>;
export type GetReviewsResponse = z.infer<typeof getReviewsResponseSchema>;
export declare const auditReviewRequestSchema: z.ZodObject<{
    userId: z.ZodNumber;
    auditStatus: z.ZodEnum<["Approved", "Rejected"]>;
}, "strip", z.ZodTypeAny, {
    userId: number;
    auditStatus: "Approved" | "Rejected";
}, {
    userId: number;
    auditStatus: "Approved" | "Rejected";
}>;
export type AuditReviewRequest = z.infer<typeof auditReviewRequestSchema>;
export declare const getGuildsRequestSchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
}>;
export type GetGuildsRequest = z.infer<typeof getGuildsRequestSchema>;
export declare const guildItemSchema: z.ZodObject<{
    id: z.ZodNumber;
    clubName: z.ZodString;
    clubEmail: z.ZodNullable<z.ZodString>;
    country: z.ZodNullable<z.ZodString>;
    clubMasterPhone: z.ZodNullable<z.ZodString>;
    clubMasterName: z.ZodNullable<z.ZodString>;
    invitationCode: z.ZodString;
    createdBy: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: number;
    invitationCode: string;
    country: string | null;
    clubName: string;
    clubEmail: string | null;
    clubMasterPhone: string | null;
    clubMasterName: string | null;
    createdBy: number | null;
}, {
    id: number;
    invitationCode: string;
    country: string | null;
    clubName: string;
    clubEmail: string | null;
    clubMasterPhone: string | null;
    clubMasterName: string | null;
    createdBy: number | null;
}>;
export type GuildItem = z.infer<typeof guildItemSchema>;
export declare const getGuildsResponseSchema: z.ZodObject<{
    guilds: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        clubName: z.ZodString;
        clubEmail: z.ZodNullable<z.ZodString>;
        country: z.ZodNullable<z.ZodString>;
        clubMasterPhone: z.ZodNullable<z.ZodString>;
        clubMasterName: z.ZodNullable<z.ZodString>;
        invitationCode: z.ZodString;
        createdBy: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        invitationCode: string;
        country: string | null;
        clubName: string;
        clubEmail: string | null;
        clubMasterPhone: string | null;
        clubMasterName: string | null;
        createdBy: number | null;
    }, {
        id: number;
        invitationCode: string;
        country: string | null;
        clubName: string;
        clubEmail: string | null;
        clubMasterPhone: string | null;
        clubMasterName: string | null;
        createdBy: number | null;
    }>, "many">;
    total: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    guilds: {
        id: number;
        invitationCode: string;
        country: string | null;
        clubName: string;
        clubEmail: string | null;
        clubMasterPhone: string | null;
        clubMasterName: string | null;
        createdBy: number | null;
    }[];
}, {
    total: number;
    guilds: {
        id: number;
        invitationCode: string;
        country: string | null;
        clubName: string;
        clubEmail: string | null;
        clubMasterPhone: string | null;
        clubMasterName: string | null;
        createdBy: number | null;
    }[];
}>;
export type GetGuildsResponse = z.infer<typeof getGuildsResponseSchema>;
export declare const createGuildRequestSchema: z.ZodObject<{
    clubName: z.ZodString;
    clubEmail: z.ZodString;
    country: z.ZodString;
    clubMasterPhone: z.ZodOptional<z.ZodString>;
    clubMasterName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    country: string;
    clubName: string;
    clubEmail: string;
    clubMasterPhone?: string | undefined;
    clubMasterName?: string | undefined;
}, {
    country: string;
    clubName: string;
    clubEmail: string;
    clubMasterPhone?: string | undefined;
    clubMasterName?: string | undefined;
}>;
export type CreateGuildRequest = z.infer<typeof createGuildRequestSchema>;
//# sourceMappingURL=unionStreamer.d.ts.map
```
