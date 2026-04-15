---
title: analytics.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: analytics.d.ts
---

# analytics.d

```ts
import { z } from 'zod';
export declare const unionDashboardQuerySchema: z.ZodObject<{
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export type UnionDashboardQuery = z.infer<typeof unionDashboardQuerySchema>;
export declare const unionDashboardResponseSchema: z.ZodObject<{
    today: z.ZodObject<{
        totalUsers: z.ZodNumber;
        contacted: z.ZodNumber;
        replied: z.ZodNumber;
        converted: z.ZodNumber;
        aiCalls: z.ZodNumber;
        activeConversations: z.ZodNumber;
        outboundMessages: z.ZodNumber;
        inboundMessages: z.ZodNumber;
        estimatedCost: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        converted: number;
        totalUsers: number;
        contacted: number;
        replied: number;
        aiCalls: number;
        activeConversations: number;
        outboundMessages: number;
        inboundMessages: number;
        estimatedCost: number;
    }, {
        converted: number;
        totalUsers: number;
        contacted: number;
        replied: number;
        aiCalls: number;
        activeConversations: number;
        outboundMessages: number;
        inboundMessages: number;
        estimatedCost: number;
    }>;
    statusDistribution: z.ZodArray<z.ZodObject<{
        status: z.ZodEnum<["pending_device", "pending_contact", "in_conversation", "paused", "silent", "converted", "opted_out", "invalid_number", "rejected", "dead"]>;
        count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        status: "pending_device" | "pending_contact" | "in_conversation" | "paused" | "silent" | "converted" | "opted_out" | "invalid_number" | "rejected" | "dead";
        count: number;
    }, {
        status: "pending_device" | "pending_contact" | "in_conversation" | "paused" | "silent" | "converted" | "opted_out" | "invalid_number" | "rejected" | "dead";
        count: number;
    }>, "many">;
    sourceDistribution: z.ZodArray<z.ZodObject<{
        source: z.ZodEnum<["tiktok", "facebook", "manual", "other"]>;
        count: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        count: number;
        source: "tiktok" | "facebook" | "manual" | "other";
    }, {
        count: number;
        source: "tiktok" | "facebook" | "manual" | "other";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    today: {
        converted: number;
        totalUsers: number;
        contacted: number;
        replied: number;
        aiCalls: number;
        activeConversations: number;
        outboundMessages: number;
        inboundMessages: number;
        estimatedCost: number;
    };
    statusDistribution: {
        status: "pending_device" | "pending_contact" | "in_conversation" | "paused" | "silent" | "converted" | "opted_out" | "invalid_number" | "rejected" | "dead";
        count: number;
    }[];
    sourceDistribution: {
        count: number;
        source: "tiktok" | "facebook" | "manual" | "other";
    }[];
}, {
    today: {
        converted: number;
        totalUsers: number;
        contacted: number;
        replied: number;
        aiCalls: number;
        activeConversations: number;
        outboundMessages: number;
        inboundMessages: number;
        estimatedCost: number;
    };
    statusDistribution: {
        status: "pending_device" | "pending_contact" | "in_conversation" | "paused" | "silent" | "converted" | "opted_out" | "invalid_number" | "rejected" | "dead";
        count: number;
    }[];
    sourceDistribution: {
        count: number;
        source: "tiktok" | "facebook" | "manual" | "other";
    }[];
}>;
export type UnionDashboardResponse = z.infer<typeof unionDashboardResponseSchema>;
export declare const unionFunnelQuerySchema: z.ZodObject<{
    startDate: z.ZodString;
    endDate: z.ZodString;
    source: z.ZodOptional<z.ZodEnum<["tiktok", "facebook", "manual", "other"]>>;
    abGroup: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    startDate: string;
    endDate: string;
    source?: "tiktok" | "facebook" | "manual" | "other" | undefined;
    abGroup?: string | undefined;
}, {
    startDate: string;
    endDate: string;
    source?: "tiktok" | "facebook" | "manual" | "other" | undefined;
    abGroup?: string | undefined;
}>;
export type UnionFunnelQuery = z.infer<typeof unionFunnelQuerySchema>;
export declare const unionFunnelResponseSchema: z.ZodObject<{
    stages: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        count: z.ZodNumber;
        rate: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        rate: number;
        count: number;
        name: string;
    }, {
        rate: number;
        count: number;
        name: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    stages: {
        rate: number;
        count: number;
        name: string;
    }[];
}, {
    stages: {
        rate: number;
        count: number;
        name: string;
    }[];
}>;
export type UnionFunnelResponse = z.infer<typeof unionFunnelResponseSchema>;
export declare const unionTrendQuerySchema: z.ZodObject<{
    startDate: z.ZodString;
    endDate: z.ZodString;
    granularity: z.ZodDefault<z.ZodEnum<["day", "week", "month"]>>;
    metrics: z.ZodDefault<z.ZodArray<z.ZodEnum<["new_users", "contacted", "replied", "converted", "opted_out"]>, "many">>;
}, "strip", z.ZodTypeAny, {
    startDate: string;
    endDate: string;
    granularity: "day" | "week" | "month";
    metrics: ("converted" | "opted_out" | "contacted" | "replied" | "new_users")[];
}, {
    startDate: string;
    endDate: string;
    granularity?: "day" | "week" | "month" | undefined;
    metrics?: ("converted" | "opted_out" | "contacted" | "replied" | "new_users")[] | undefined;
}>;
export type UnionTrendQuery = z.infer<typeof unionTrendQuerySchema>;
export declare const unionTrendResponseSchema: z.ZodObject<{
    series: z.ZodArray<z.ZodObject<{
        metric: z.ZodString;
        data: z.ZodArray<z.ZodObject<{
            date: z.ZodString;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            date: string;
        }, {
            value: number;
            date: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        metric: string;
        data: {
            value: number;
            date: string;
        }[];
    }, {
        metric: string;
        data: {
            value: number;
            date: string;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    series: {
        metric: string;
        data: {
            value: number;
            date: string;
        }[];
    }[];
}, {
    series: {
        metric: string;
        data: {
            value: number;
            date: string;
        }[];
    }[];
}>;
export type UnionTrendResponse = z.infer<typeof unionTrendResponseSchema>;
export declare const unionABTestResultQuerySchema: z.ZodObject<{
    experimentId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    experimentId: string;
}, {
    experimentId: string;
}>;
export type UnionABTestResultQuery = z.infer<typeof unionABTestResultQuerySchema>;
export declare const unionABTestResultResponseSchema: z.ZodObject<{
    experimentId: z.ZodString;
    variants: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        userCount: z.ZodNumber;
        replyRate: z.ZodNumber;
        conversionRate: z.ZodNumber;
        avgResponseTime: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        userCount: number;
        replyRate: number;
        conversionRate: number;
        avgResponseTime: number;
    }, {
        name: string;
        userCount: number;
        replyRate: number;
        conversionRate: number;
        avgResponseTime: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    variants: {
        name: string;
        userCount: number;
        replyRate: number;
        conversionRate: number;
        avgResponseTime: number;
    }[];
    experimentId: string;
}, {
    variants: {
        name: string;
        userCount: number;
        replyRate: number;
        conversionRate: number;
        avgResponseTime: number;
    }[];
    experimentId: string;
}>;
export type UnionABTestResultResponse = z.infer<typeof unionABTestResultResponseSchema>;
//# sourceMappingURL=analytics.d.ts.map
```
