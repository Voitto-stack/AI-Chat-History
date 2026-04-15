---
title: ai-service
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: ai-service.js
---

# ai-service

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionPlaygroundResponseSchema = exports.unionPlaygroundRequestSchema = exports.unionInferenceResponseSchema = exports.unionInferenceRequestSchema = exports.unionPromptListQuerySchema = exports.updateUnionPromptRequestSchema = exports.createUnionPromptRequestSchema = exports.unionPromptVersionSchema = exports.updateUnionModelConfigRequestSchema = exports.createUnionModelConfigRequestSchema = exports.unionModelConfigSchema = void 0;
const zod_1 = require("zod");
const user_1 = require("./user");
// ── Model Config ──────────────────────────────���────────────
exports.unionModelConfigSchema = zod_1.z.object({
    id: zod_1.z.string(),
    displayName: zod_1.z.string(),
    modelName: zod_1.z.string(),
    provider: zod_1.z.string(),
    priority: zod_1.z.number(),
    apiKey: zod_1.z.string(),
    endpoint: zod_1.z.string(),
    enabled: zod_1.z.boolean(),
    maxTokens: zod_1.z.number(),
    temperature: zod_1.z.number(),
    timeoutMs: zod_1.z.number(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
exports.createUnionModelConfigRequestSchema = zod_1.z.object({
    displayName: zod_1.z.string().min(1).max(100),
    modelName: zod_1.z.string().min(1).max(50),
    provider: zod_1.z.string().min(1).max(50),
    priority: zod_1.z.number().int().min(0).default(0),
    apiKey: zod_1.z.string().min(1),
    endpoint: zod_1.z.string().url(),
    maxTokens: zod_1.z.number().int().min(1).default(4096),
    temperature: zod_1.z.number().min(0).max(2).default(0.7),
    timeoutMs: zod_1.z.number().int().min(1000).default(10000),
});
exports.updateUnionModelConfigRequestSchema = zod_1.z.object({
    displayName: zod_1.z.string().min(1).max(100).optional(),
    priority: zod_1.z.number().int().min(0).optional(),
    apiKey: zod_1.z.string().min(1).optional(),
    endpoint: zod_1.z.string().url().optional(),
    enabled: zod_1.z.boolean().optional(),
    maxTokens: zod_1.z.number().int().min(1).optional(),
    temperature: zod_1.z.number().min(0).max(2).optional(),
    timeoutMs: zod_1.z.number().int().min(1000).optional(),
});
// ── Prompt Version ─────────────────────────────────────────
exports.unionPromptVersionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    layer: zod_1.z.string(),
    phase: user_1.unionPhaseSchema.nullable(),
    scene: zod_1.z.string().nullable(),
    content: zod_1.z.string(),
    version: zod_1.z.number(),
    status: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
exports.createUnionPromptRequestSchema = zod_1.z.object({
    layer: zod_1.z.enum(['base_persona', 'phase_strategy', 'scene_script', 'user_context']),
    phase: user_1.unionPhaseSchema.optional(),
    scene: zod_1.z.string().max(50).optional(),
    content: zod_1.z.string().min(1),
});
exports.updateUnionPromptRequestSchema = zod_1.z.object({
    content: zod_1.z.string().min(1),
});
exports.unionPromptListQuerySchema = zod_1.z.object({
    layer: zod_1.z.string().optional(),
    phase: user_1.unionPhaseSchema.optional(),
    status: zod_1.z.enum(['draft', 'active', 'archived']).optional(),
});
// ── Inference ──────────────────────────────────────────────
exports.unionInferenceRequestSchema = zod_1.z.object({
    prompt: zod_1.z.string().min(1),
    modelConfigId: zod_1.z.string().optional(),
    maxTokens: zod_1.z.number().int().optional(),
    temperature: zod_1.z.number().optional(),
});
exports.unionInferenceResponseSchema = zod_1.z.object({
    text: zod_1.z.string(),
    modelUsed: zod_1.z.string(),
    tokenUsage: zod_1.z.object({
        input: zod_1.z.number(),
        output: zod_1.z.number(),
    }),
    latencyMs: zod_1.z.number(),
});
// ── Playground ─────────────────────────────────────────────
exports.unionPlaygroundRequestSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    triggerType: zod_1.z.enum(['user_reply', 'scheduled_followup', 'manual']).default('user_reply'),
    userMessage: zod_1.z.string().default(''),
    modelConfigId: zod_1.z.string().optional(),
    temperature: zod_1.z.number().optional(),
    maxTokens: zod_1.z.number().int().optional(),
    promptOverride: zod_1.z.string().optional(),
    phase: user_1.unionPhaseSchema.optional(),
    scene: zod_1.z.string().optional(),
});
exports.unionPlaygroundResponseSchema = zod_1.z.object({
    decision: zod_1.z.object({
        action: zod_1.z.string(),
        replyText: zod_1.z.string().optional(),
        confidence: zod_1.z.number(),
        reasoning: zod_1.z.string().optional(),
    }),
    debug: zod_1.z.object({
        assembledPrompt: zod_1.z.string(),
        modelUsed: zod_1.z.string(),
        tokenUsage: zod_1.z.object({ input: zod_1.z.number(), output: zod_1.z.number() }),
        latencyMs: zod_1.z.number(),
        rawOutput: zod_1.z.string(),
    }),
});
//# sourceMappingURL=ai-service.js.map
```
