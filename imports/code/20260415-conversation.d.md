---
title: conversation.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: conversation.d.ts
---

# conversation.d

```ts
import { z } from 'zod';
export declare const unionMsgDirectionSchema: z.ZodEnum<["inbound", "outbound"]>;
export type UnionMsgDirection = z.infer<typeof unionMsgDirectionSchema>;
export declare const unionMsgStatusSchema: z.ZodEnum<["pending", "sent", "delivered", "failed"]>;
export type UnionMsgStatus = z.infer<typeof unionMsgStatusSchema>;
export declare const unionConversationSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    direction: z.ZodEnum<["inbound", "outbound"]>;
    content: z.ZodString;
    deviceId: z.ZodNullable<z.ZodString>;
    decisionId: z.ZodNullable<z.ZodString>;
    sendStatus: z.ZodEnum<["pending", "sent", "delivered", "failed"]>;
    metadata: z.ZodNullable<z.ZodAny>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string;
    createdAt: string;
    content: string;
    direction: "inbound" | "outbound";
    deviceId: string | null;
    decisionId: string | null;
    sendStatus: "pending" | "failed" | "sent" | "delivered";
    metadata?: any;
}, {
    id: string;
    userId: string;
    createdAt: string;
    content: string;
    direction: "inbound" | "outbound";
    deviceId: string | null;
    decisionId: string | null;
    sendStatus: "pending" | "failed" | "sent" | "delivered";
    metadata?: any;
}>;
export type UnionConversation = z.infer<typeof unionConversationSchema>;
export declare const unionConversationListQuerySchema: z.ZodObject<{
    userId: z.ZodString;
    page: z.ZodDefault<z.ZodNumber>;
    pageSize: z.ZodDefault<z.ZodNumber>;
    direction: z.ZodOptional<z.ZodEnum<["inbound", "outbound"]>>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    page: number;
    pageSize: number;
    direction?: "inbound" | "outbound" | undefined;
}, {
    userId: string;
    page?: number | undefined;
    pageSize?: number | undefined;
    direction?: "inbound" | "outbound" | undefined;
}>;
export type UnionConversationListQuery = z.infer<typeof unionConversationListQuerySchema>;
export declare const unionConversationListResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        direction: z.ZodEnum<["inbound", "outbound"]>;
        content: z.ZodString;
        deviceId: z.ZodNullable<z.ZodString>;
        decisionId: z.ZodNullable<z.ZodString>;
        sendStatus: z.ZodEnum<["pending", "sent", "delivered", "failed"]>;
        metadata: z.ZodNullable<z.ZodAny>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        userId: string;
        createdAt: string;
        content: string;
        direction: "inbound" | "outbound";
        deviceId: string | null;
        decisionId: string | null;
        sendStatus: "pending" | "failed" | "sent" | "delivered";
        metadata?: any;
    }, {
        id: string;
        userId: string;
        createdAt: string;
        content: string;
        direction: "inbound" | "outbound";
        deviceId: string | null;
        decisionId: string | null;
        sendStatus: "pending" | "failed" | "sent" | "delivered";
        metadata?: any;
    }>, "many">;
    total: z.ZodNumber;
    page: z.ZodNumber;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    total: number;
    page: number;
    pageSize: number;
    items: {
        id: string;
        userId: string;
        createdAt: string;
        content: string;
        direction: "inbound" | "outbound";
        deviceId: string | null;
        decisionId: string | null;
        sendStatus: "pending" | "failed" | "sent" | "delivered";
        metadata?: any;
    }[];
}, {
    total: number;
    page: number;
    pageSize: number;
    items: {
        id: string;
        userId: string;
        createdAt: string;
        content: string;
        direction: "inbound" | "outbound";
        deviceId: string | null;
        decisionId: string | null;
        sendStatus: "pending" | "failed" | "sent" | "delivered";
        metadata?: any;
    }[];
}>;
export type UnionConversationListResponse = z.infer<typeof unionConversationListResponseSchema>;
//# sourceMappingURL=conversation.d.ts.map
```
