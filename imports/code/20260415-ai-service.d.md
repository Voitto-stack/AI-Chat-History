---
title: ai-service.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: ai-service.d.ts
---

# ai-service.d

```ts
import { z } from 'zod';
export declare const unionModelConfigSchema: z.ZodObject<{
    id: z.ZodString;
    displayName: z.ZodString;
    modelName: z.ZodString;
    provider: z.ZodString;
    priority: z.ZodNumber;
    apiKey: z.ZodString;
    endpoint: z.ZodString;
    enabled: z.ZodBoolean;
    maxTokens: z.ZodNumber;
    temperature: z.ZodNumber;
    timeoutMs: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    displayName: string;
    createdAt: string;
    enabled: boolean;
    updatedAt: string;
    priority: number;
    modelName: string;
    provider: string;
    apiKey: string;
    endpoint: string;
    maxTokens: number;
    temperature: number;
    timeoutMs: number;
}, {
    id: string;
    displayName: string;
    createdAt: string;
    enabled: boolean;
    updatedAt: string;
    priority: number;
    modelName: string;
    provider: string;
    apiKey: string;
    endpoint: string;
    maxTokens: number;
    temperature: number;
    timeoutMs: number;
}>;
export type UnionModelConfig = z.infer<typeof unionModelConfigSchema>;
export declare const createUnionModelConfigRequestSchema: z.ZodObject<{
    displayName: z.ZodString;
    modelName: z.ZodString;
    provider: z.ZodString;
    priority: z.ZodDefault<z.ZodNumber>;
    apiKey: z.ZodString;
    endpoint: z.ZodString;
    maxTokens: z.ZodDefault<z.ZodNumber>;
    temperature: z.ZodDefault<z.ZodNumber>;
    timeoutMs: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    displayName: string;
    priority: number;
    modelName: string;
    provider: string;
    apiKey: string;
    endpoint: string;
    maxTokens: number;
    temperature: number;
    timeoutMs: number;
}, {
    displayName: string;
    modelName: string;
    provider: string;
    apiKey: string;
    endpoint: string;
    priority?: number | undefined;
    maxTokens?: number | undefined;
    temperature?: number | undefined;
    timeoutMs?: number | undefined;
}>;
export type CreateUnionModelConfigRequest = z.infer<typeof createUnionModelConfigRequestSchema>;
export declare const updateUnionModelConfigRequestSchema: z.ZodObject<{
    displayName: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodNumber>;
    apiKey: z.ZodOptional<z.ZodString>;
    endpoint: z.ZodOptional<z.ZodString>;
    enabled: z.ZodOptional<z.ZodBoolean>;
    maxTokens: z.ZodOptional<z.ZodNumber>;
    temperature: z.ZodOptional<z.ZodNumber>;
    timeoutMs: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    displayName?: string | undefined;
    enabled?: boolean | undefined;
    priority?: number | undefined;
    apiKey?: string | undefined;
    endpoint?: string | undefined;
    maxTokens?: number | undefined;
    temperature?: number | undefined;
    timeoutMs?: number | undefined;
}, {
    displayName?: string | undefined;
    enabled?: boolean | undefined;
    priority?: number | undefined;
    apiKey?: string | undefined;
    endpoint?: string | undefined;
    maxTokens?: number | undefined;
    temperature?: number | undefined;
    timeoutMs?: number | undefined;
}>;
export type UpdateUnionModelConfigRequest = z.infer<typeof updateUnionModelConfigRequestSchema>;
export declare const unionPromptVersionSchema: z.ZodObject<{
    id: z.ZodString;
    layer: z.ZodString;
    phase: z.ZodNullable<z.ZodEnum<["activation", "retention", "conversion", "recall"]>>;
    scene: z.ZodNullable<z.ZodString>;
    content: z.ZodString;
    version: z.ZodNumber;
    status: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    id: string;
    createdAt: string;
    content: string;
    updatedAt: string;
    phase: "retention" | "activation" | "conversion" | "recall" | null;
    scene: string | null;
    layer: string;
    version: number;
}, {
    status: string;
    id: string;
    createdAt: string;
    content: string;
    updatedAt: string;
    phase: "retention" | "activation" | "conversion" | "recall" | null;
    scene: string | null;
    layer: string;
    version: number;
}>;
export type UnionPromptVersion = z.infer<typeof unionPromptVersionSchema>;
export declare const createUnionPromptRequestSchema: z.ZodObject<{
    layer: z.ZodEnum<["base_persona", "phase_strategy", "scene_script", "user_context"]>;
    phase: z.ZodOptional<z.ZodEnum<["activation", "retention", "conversion", "recall"]>>;
    scene: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    layer: "base_persona" | "phase_strategy" | "scene_script" | "user_context";
    phase?: "retention" | "activation" | "conversion" | "recall" | undefined;
    scene?: string | undefined;
}, {
    content: string;
    layer: "base_persona" | "phase_strategy" | "scene_script" | "user_context";
    phase?: "retention" | "activation" | "conversion" | "recall" | undefined;
    scene?: string | undefined;
}>;
export type CreateUnionPromptRequest = z.infer<typeof createUnionPromptRequestSchema>;
export declare const updateUnionPromptRequestSchema: z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
}, {
    content: string;
}>;
export type UpdateUnionPromptRequest = z.infer<typeof updateUnionPromptRequestSchema>;
export declare const unionPromptListQuerySchema: z.ZodObject<{
    layer: z.ZodOptional<z.ZodString>;
    phase: z.ZodOptional<z.ZodEnum<["activation", "retention", "conversion", "recall"]>>;
    status: z.ZodOptional<z.ZodEnum<["draft", "active", "archived"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "draft" | "archived" | undefined;
    phase?: "retention" | "activation" | "conversion" | "recall" | undefined;
    layer?: string | undefined;
}, {
    status?: "active" | "draft" | "archived" | undefined;
    phase?: "retention" | "activation" | "conversion" | "recall" | undefined;
    layer?: string | undefined;
}>;
export type UnionPromptListQuery = z.infer<typeof unionPromptListQuerySchema>;
export declare const unionInferenceRequestSchema: z.ZodObject<{
    prompt: z.ZodString;
    modelConfigId: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodNumber>;
    temperature: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    prompt: string;
    maxTokens?: number | undefined;
    temperature?: number | undefined;
    modelConfigId?: string | undefined;
}, {
    prompt: string;
    maxTokens?: number | undefined;
    temperature?: number | undefined;
    modelConfigId?: string | undefined;
}>;
export type UnionInferenceRequest = z.infer<typeof unionInferenceRequestSchema>;
export declare const unionInferenceResponseSchema: z.ZodObject<{
    text: z.ZodString;
    modelUsed: z.ZodString;
    tokenUsage: z.ZodObject<{
        input: z.ZodNumber;
        output: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        input: number;
        output: number;
    }, {
        input: number;
        output: number;
    }>;
    latencyMs: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    text: string;
    modelUsed: string;
    tokenUsage: {
        input: number;
        output: number;
    };
    latencyMs: number;
}, {
    text: string;
    modelUsed: string;
    tokenUsage: {
        input: number;
        output: number;
    };
    latencyMs: number;
}>;
export type UnionInferenceResponse = z.infer<typeof unionInferenceResponseSchema>;
export declare const unionPlaygroundRequestSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodString>;
    triggerType: z.ZodDefault<z.ZodEnum<["user_reply", "scheduled_followup", "manual"]>>;
    userMessage: z.ZodDefault<z.ZodString>;
    modelConfigId: z.ZodOptional<z.ZodString>;
    temperature: z.ZodOptional<z.ZodNumber>;
    maxTokens: z.ZodOptional<z.ZodNumber>;
    promptOverride: z.ZodOptional<z.ZodString>;
    phase: z.ZodOptional<z.ZodEnum<["activation", "retention", "conversion", "recall"]>>;
    scene: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    triggerType: "manual" | "user_reply" | "scheduled_followup";
    userMessage: string;
    userId?: string | undefined;
    phase?: "retention" | "activation" | "conversion" | "recall" | undefined;
    scene?: string | undefined;
    maxTokens?: number | undefined;
    temperature?: number | undefined;
    modelConfigId?: string | undefined;
    promptOverride?: string | undefined;
}, {
    userId?: string | undefined;
    phase?: "retention" | "activation" | "conversion" | "recall" | undefined;
    scene?: string | undefined;
    triggerType?: "manual" | "user_reply" | "scheduled_followup" | undefined;
    userMessage?: string | undefined;
    maxTokens?: number | undefined;
    temperature?: number | undefined;
    modelConfigId?: string | undefined;
    promptOverride?: string | undefined;
}>;
export type UnionPlaygroundRequest = z.infer<typeof unionPlaygroundRequestSchema>;
export declare const unionPlaygroundResponseSchema: z.ZodObject<{
    decision: z.ZodObject<{
        action: z.ZodString;
        replyText: z.ZodOptional<z.ZodString>;
        confidence: z.ZodNumber;
        reasoning: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        action: string;
        confidence: number;
        replyText?: string | undefined;
        reasoning?: string | undefined;
    }, {
        action: string;
        confidence: number;
        replyText?: string | undefined;
        reasoning?: string | undefined;
    }>;
    debug: z.ZodObject<{
        assembledPrompt: z.ZodString;
        modelUsed: z.ZodString;
        tokenUsage: z.ZodObject<{
            input: z.ZodNumber;
            output: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            input: number;
            output: number;
        }, {
            input: number;
            output: number;
        }>;
        latencyMs: z.ZodNumber;
        rawOutput: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        modelUsed: string;
        tokenUsage: {
            input: number;
            output: number;
        };
        latencyMs: number;
        assembledPrompt: string;
        rawOutput: string;
    }, {
        modelUsed: string;
        tokenUsage: {
            input: number;
            output: number;
        };
        latencyMs: number;
        assembledPrompt: string;
        rawOutput: string;
    }>;
}, "strip", z.ZodTypeAny, {
    decision: {
        action: string;
        confidence: number;
        replyText?: string | undefined;
        reasoning?: string | undefined;
    };
    debug: {
        modelUsed: string;
        tokenUsage: {
            input: number;
            output: number;
        };
        latencyMs: number;
        assembledPrompt: string;
        rawOutput: string;
    };
}, {
    decision: {
        action: string;
        confidence: number;
        replyText?: string | undefined;
        reasoning?: string | undefined;
    };
    debug: {
        modelUsed: string;
        tokenUsage: {
            input: number;
            output: number;
        };
        latencyMs: number;
        assembledPrompt: string;
        rawOutput: string;
    };
}>;
export type UnionPlaygroundResponse = z.infer<typeof unionPlaygroundResponseSchema>;
//# sourceMappingURL=ai-service.d.ts.map
```
