---
title: simulator.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: simulator.d.ts
---

# simulator.d

```ts
import { z } from 'zod';
export declare const createSimulatorSessionRequestSchema: z.ZodObject<{
    phone: z.ZodDefault<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    phase: z.ZodDefault<z.ZodEnum<["activation", "retention", "conversion", "recall"]>>;
    abGroup: z.ZodOptional<z.ZodString>;
    modelName: z.ZodOptional<z.ZodString>;
    liveMode: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    phone: string;
    phase: "retention" | "activation" | "conversion" | "recall";
    userId?: string | undefined;
    abGroup?: string | undefined;
    modelName?: string | undefined;
    liveMode?: boolean | undefined;
}, {
    userId?: string | undefined;
    phone?: string | undefined;
    phase?: "retention" | "activation" | "conversion" | "recall" | undefined;
    abGroup?: string | undefined;
    modelName?: string | undefined;
    liveMode?: boolean | undefined;
}>;
export type CreateSimulatorSessionRequest = z.infer<typeof createSimulatorSessionRequestSchema>;
export declare const simulatorSessionSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    userStatus: z.ZodEnum<["pending_device", "pending_contact", "in_conversation", "paused", "silent", "converted", "opted_out", "invalid_number", "rejected", "dead"]>;
    phase: z.ZodEnum<["activation", "retention", "conversion", "recall"]>;
    messages: z.ZodArray<z.ZodObject<{
        direction: z.ZodEnum<["inbound", "outbound"]>;
        content: z.ZodString;
        createdAt: z.ZodString;
        decisionDetail: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        content: string;
        direction: "inbound" | "outbound";
        decisionDetail?: any;
    }, {
        createdAt: string;
        content: string;
        direction: "inbound" | "outbound";
        decisionDetail?: any;
    }>, "many">;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string;
    userStatus: "pending_device" | "pending_contact" | "in_conversation" | "paused" | "silent" | "converted" | "opted_out" | "invalid_number" | "rejected" | "dead";
    createdAt: string;
    phase: "retention" | "activation" | "conversion" | "recall";
    messages: {
        createdAt: string;
        content: string;
        direction: "inbound" | "outbound";
        decisionDetail?: any;
    }[];
}, {
    id: string;
    userId: string;
    userStatus: "pending_device" | "pending_contact" | "in_conversation" | "paused" | "silent" | "converted" | "opted_out" | "invalid_number" | "rejected" | "dead";
    createdAt: string;
    phase: "retention" | "activation" | "conversion" | "recall";
    messages: {
        createdAt: string;
        content: string;
        direction: "inbound" | "outbound";
        decisionDetail?: any;
    }[];
}>;
export type SimulatorSession = z.infer<typeof simulatorSessionSchema>;
export declare const simulatorSendRequestSchema: z.ZodObject<{
    sessionId: z.ZodString;
    message: z.ZodString;
    modelName: z.ZodOptional<z.ZodString>;
    liveMode: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    message: string;
    sessionId: string;
    modelName?: string | undefined;
    liveMode?: boolean | undefined;
}, {
    message: string;
    sessionId: string;
    modelName?: string | undefined;
    liveMode?: boolean | undefined;
}>;
export type SimulatorSendRequest = z.infer<typeof simulatorSendRequestSchema>;
export declare const simulatorSendResponseSchema: z.ZodObject<{
    userMessage: z.ZodObject<{
        content: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        content: string;
    }, {
        createdAt: string;
        content: string;
    }>;
    aiResponse: z.ZodObject<{
        content: z.ZodString;
        createdAt: z.ZodString;
        decision: z.ZodObject<{
            action: z.ZodString;
            confidence: z.ZodNumber;
            reasoning: z.ZodOptional<z.ZodString>;
            modelUsed: z.ZodString;
            tokenUsage: z.ZodOptional<z.ZodObject<{
                input: z.ZodNumber;
                output: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                input: number;
                output: number;
            }, {
                input: number;
                output: number;
            }>>;
            latencyMs: z.ZodOptional<z.ZodNumber>;
            assembledPrompt: z.ZodOptional<z.ZodString>;
            rawOutput: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            action: string;
            confidence: number;
            modelUsed: string;
            reasoning?: string | undefined;
            tokenUsage?: {
                input: number;
                output: number;
            } | undefined;
            latencyMs?: number | undefined;
            assembledPrompt?: string | undefined;
            rawOutput?: string | undefined;
        }, {
            action: string;
            confidence: number;
            modelUsed: string;
            reasoning?: string | undefined;
            tokenUsage?: {
                input: number;
                output: number;
            } | undefined;
            latencyMs?: number | undefined;
            assembledPrompt?: string | undefined;
            rawOutput?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        createdAt: string;
        content: string;
        decision: {
            action: string;
            confidence: number;
            modelUsed: string;
            reasoning?: string | undefined;
            tokenUsage?: {
                input: number;
                output: number;
            } | undefined;
            latencyMs?: number | undefined;
            assembledPrompt?: string | undefined;
            rawOutput?: string | undefined;
        };
    }, {
        createdAt: string;
        content: string;
        decision: {
            action: string;
            confidence: number;
            modelUsed: string;
            reasoning?: string | undefined;
            tokenUsage?: {
                input: number;
                output: number;
            } | undefined;
            latencyMs?: number | undefined;
            assembledPrompt?: string | undefined;
            rawOutput?: string | undefined;
        };
    }>;
    newStatus: z.ZodEnum<["pending_device", "pending_contact", "in_conversation", "paused", "silent", "converted", "opted_out", "invalid_number", "rejected", "dead"]>;
}, "strip", z.ZodTypeAny, {
    userMessage: {
        createdAt: string;
        content: string;
    };
    aiResponse: {
        createdAt: string;
        content: string;
        decision: {
            action: string;
            confidence: number;
            modelUsed: string;
            reasoning?: string | undefined;
            tokenUsage?: {
                input: number;
                output: number;
            } | undefined;
            latencyMs?: number | undefined;
            assembledPrompt?: string | undefined;
            rawOutput?: string | undefined;
        };
    };
    newStatus: "pending_device" | "pending_contact" | "in_conversation" | "paused" | "silent" | "converted" | "opted_out" | "invalid_number" | "rejected" | "dead";
}, {
    userMessage: {
        createdAt: string;
        content: string;
    };
    aiResponse: {
        createdAt: string;
        content: string;
        decision: {
            action: string;
            confidence: number;
            modelUsed: string;
            reasoning?: string | undefined;
            tokenUsage?: {
                input: number;
                output: number;
            } | undefined;
            latencyMs?: number | undefined;
            assembledPrompt?: string | undefined;
            rawOutput?: string | undefined;
        };
    };
    newStatus: "pending_device" | "pending_contact" | "in_conversation" | "paused" | "silent" | "converted" | "opted_out" | "invalid_number" | "rejected" | "dead";
}>;
export type SimulatorSendResponse = z.infer<typeof simulatorSendResponseSchema>;
export declare const simulatorFastForwardRequestSchema: z.ZodObject<{
    sessionId: z.ZodString;
    hours: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    hours: number;
}, {
    sessionId: string;
    hours?: number | undefined;
}>;
export type SimulatorFastForwardRequest = z.infer<typeof simulatorFastForwardRequestSchema>;
export declare const simulatorResetRequestSchema: z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>;
export type SimulatorResetRequest = z.infer<typeof simulatorResetRequestSchema>;
//# sourceMappingURL=simulator.d.ts.map
```
