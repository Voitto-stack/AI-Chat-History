---
title: simulator
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: simulator.js
---

# simulator

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulatorResetRequestSchema = exports.simulatorFastForwardRequestSchema = exports.simulatorSendResponseSchema = exports.simulatorSendRequestSchema = exports.simulatorSessionSchema = exports.createSimulatorSessionRequestSchema = void 0;
const zod_1 = require("zod");
const user_1 = require("./user");
// ── Session ────────────────────────────────────────────────
exports.createSimulatorSessionRequestSchema = zod_1.z.object({
    phone: zod_1.z.string().default('+1555000TEST'),
    userId: zod_1.z.string().optional(),
    phase: user_1.unionPhaseSchema.default('activation'),
    abGroup: zod_1.z.string().optional(),
    modelName: zod_1.z.string().optional(),
    liveMode: zod_1.z.boolean().optional(),
});
exports.simulatorSessionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    userId: zod_1.z.string(),
    userStatus: user_1.unionUserStatusSchema,
    phase: user_1.unionPhaseSchema,
    messages: zod_1.z.array(zod_1.z.object({
        direction: zod_1.z.enum(['inbound', 'outbound']),
        content: zod_1.z.string(),
        createdAt: zod_1.z.string(),
        decisionDetail: zod_1.z.any().optional(),
    })),
    createdAt: zod_1.z.string(),
});
// ── Send Message ───────────────────────────────────────────
exports.simulatorSendRequestSchema = zod_1.z.object({
    sessionId: zod_1.z.string(),
    message: zod_1.z.string().min(1),
    modelName: zod_1.z.string().optional(),
    liveMode: zod_1.z.boolean().optional(),
});
exports.simulatorSendResponseSchema = zod_1.z.object({
    userMessage: zod_1.z.object({
        content: zod_1.z.string(),
        createdAt: zod_1.z.string(),
    }),
    aiResponse: zod_1.z.object({
        content: zod_1.z.string(),
        createdAt: zod_1.z.string(),
        decision: zod_1.z.object({
            action: zod_1.z.string(),
            confidence: zod_1.z.number(),
            reasoning: zod_1.z.string().optional(),
            modelUsed: zod_1.z.string(),
            tokenUsage: zod_1.z.object({ input: zod_1.z.number(), output: zod_1.z.number() }).optional(),
            latencyMs: zod_1.z.number().optional(),
            assembledPrompt: zod_1.z.string().optional(),
            rawOutput: zod_1.z.string().optional(),
        }),
    }),
    newStatus: user_1.unionUserStatusSchema,
});
// ── Fast Forward ───────────────────────────────────────────
exports.simulatorFastForwardRequestSchema = zod_1.z.object({
    sessionId: zod_1.z.string(),
    hours: zod_1.z.number().min(1).max(168).default(24),
});
// ── Reset ──────────────────────────────────────────────────
exports.simulatorResetRequestSchema = zod_1.z.object({
    sessionId: zod_1.z.string(),
});
//# sourceMappingURL=simulator.js.map
```
