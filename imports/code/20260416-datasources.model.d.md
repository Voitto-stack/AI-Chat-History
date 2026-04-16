---
title: datasources.model.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: datasources.model.d.ts
---

# datasources.model.d

```ts
export declare function listDataSources(testOnly?: boolean): Promise<Record<string, unknown>[]>;
export declare function getDataSourceById(id: string): Promise<Record<string, unknown> | undefined>;
export declare function getDataSourceRow(id: string): Promise<Record<string, unknown> | undefined>;
export declare function insertDataSource(data: {
    name: string;
    type: string;
    host: string;
    port: number;
    database: string;
    username: string;
    ssl: boolean;
    pool_min: number;
    pool_max: number;
}, encryptedPassword: string, createdBy: string): Promise<Record<string, unknown> | undefined>;
export declare function updateDataSource(id: string, data: Record<string, unknown>, encryptedPassword?: string): Promise<Record<string, unknown> | undefined>;
export declare function removeDataSource(id: string): Promise<{
    changes: number;
}>;
//# sourceMappingURL=datasources.model.d.ts.map
```
