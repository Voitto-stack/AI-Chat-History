---
title: analytics
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: analytics.js
---

# analytics

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionABTestResultResponseSchema = exports.unionABTestResultQuerySchema = exports.unionTrendResponseSchema = exports.unionTrendQuerySchema = exports.unionFunnelResponseSchema = exports.unionFunnelQuerySchema = exports.unionDashboardResponseSchema = exports.unionDashboardQuerySchema = void 0;
const zod_1 = require("zod");
const user_1 = require("./user");
// ── Dashboard Overview ─────────────────────────────────────
exports.unionDashboardQuerySchema = zod_1.z.object({
    startDate: zod_1.z.string().optional(),
    endDate: zod_1.z.string().optional(),
});
exports.unionDashboardResponseSchema = zod_1.z.object({
    today: zod_1.z.object({
        totalUsers: zod_1.z.number(),
        contacted: zod_1.z.number(),
        replied: zod_1.z.number(),
        converted: zod_1.z.number(),
        aiCalls: zod_1.z.number(),
        activeConversations: zod_1.z.number(),
        outboundMessages: zod_1.z.number(),
        inboundMessages: zod_1.z.number(),
        estimatedCost: zod_1.z.number(),
    }),
    statusDistribution: zod_1.z.array(zod_1.z.object({
        status: user_1.unionUserStatusSchema,
        count: zod_1.z.number(),
    })),
    sourceDistribution: zod_1.z.array(zod_1.z.object({
        source: user_1.unionUserSourceSchema,
        count: zod_1.z.number(),
    })),
});
// ── Funnel ─────────────────────────────────────────────────
exports.unionFunnelQuerySchema = zod_1.z.object({
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    source: user_1.unionUserSourceSchema.optional(),
    abGroup: zod_1.z.string().optional(),
});
exports.unionFunnelResponseSchema = zod_1.z.object({
    stages: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        count: zod_1.z.number(),
        rate: zod_1.z.number(),
    })),
});
// ── Trend ──────────────────────────────────────────────────
exports.unionTrendQuerySchema = zod_1.z.object({
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    granularity: zod_1.z.enum(['day', 'week', 'month']).default('day'),
    metrics: zod_1.z.array(zod_1.z.enum([
        'new_users', 'contacted', 'replied', 'converted', 'opted_out',
    ])).default(['new_users', 'contacted', 'replied', 'converted']),
});
exports.unionTrendResponseSchema = zod_1.z.object({
    series: zod_1.z.array(zod_1.z.object({
        metric: zod_1.z.string(),
        data: zod_1.z.array(zod_1.z.object({
            date: zod_1.z.string(),
            value: zod_1.z.number(),
        })),
    })),
});
// ── AB Test Results ────────────────────────────────────────
exports.unionABTestResultQuerySchema = zod_1.z.object({
    experimentId: zod_1.z.string(),
});
exports.unionABTestResultResponseSchema = zod_1.z.object({
    experimentId: zod_1.z.string(),
    variants: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string(),
        userCount: zod_1.z.number(),
        replyRate: zod_1.z.number(),
        conversionRate: zod_1.z.number(),
        avgResponseTime: zod_1.z.number(),
    })),
});
//# sourceMappingURL=analytics.js.map
```
