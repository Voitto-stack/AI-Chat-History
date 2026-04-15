---
title: global-config.d
date: 2026-04-15T17:04:47+08:00
source: import
language: ts
original: global-config.d.ts
---

# global-config.d

```ts
import { z } from 'zod';
export declare const unionGlobalConfigSchema: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodString;
    label: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    key: string;
    updatedAt: string;
    label: string | null;
}, {
    value: string;
    key: string;
    updatedAt: string;
    label: string | null;
}>;
export type UnionGlobalConfig = z.infer<typeof unionGlobalConfigSchema>;
export declare const updateUnionGlobalConfigRequestSchema: z.ZodObject<{
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
}, {
    value: string;
}>;
export type UpdateUnionGlobalConfigRequest = z.infer<typeof updateUnionGlobalConfigRequestSchema>;
//# sourceMappingURL=global-config.d.ts.map
```
