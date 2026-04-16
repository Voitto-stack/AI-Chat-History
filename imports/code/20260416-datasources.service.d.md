---
title: datasources.service.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: datasources.service.d.ts
---

# datasources.service.d

```ts
import { type FastifyRequest, type FastifyReply } from "fastify";
interface AuthenticatedRequest extends FastifyRequest {
    user: {
        id: string;
        role: string;
    };
}
import type { DbPool } from "@heyhru/server-plugin-mysql";
export type { DbPool };
export interface PoolStatEntry {
    dataSourceId: string;
    database: string | null;
    active: number | null;
    waiting: number | null;
}
export declare function getPoolStats(): PoolStatEntry[];
export declare function getPool(ds: {
    id: string;
    type: "mysql" | "postgres";
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    ssl: boolean;
    pool_min: number;
    pool_max: number;
}): DbPool;
export declare function getDataSourceWithPassword(id: string, encryptionKey: string): Promise<DataSourceWithPassword | null>;
export declare function getPoolForDatabase(dataSourceId: string, database: string, encryptionKey: string): Promise<DbPool | null>;
export interface DataSourceWithPassword {
    id: string;
    type: "mysql" | "postgres";
    host: string;
    port: number;
    database: string | null;
    username: string;
    password: string;
    ssl: boolean;
    pool_min: number;
    pool_max: number;
}
export declare function datasourceList(req: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function getDataSourceName(id: string): Promise<string | null>;
export declare function datasourceGet(req: FastifyRequest, reply: FastifyReply): Promise<never>;
export declare function datasourceCreate(encryptionKey: string): (req: AuthenticatedRequest, reply: FastifyReply) => Promise<never>;
export declare function datasourceUpdate(encryptionKey: string): (req: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare function datasourceDelete(req: FastifyRequest, reply: FastifyReply): Promise<never>;
//# sourceMappingURL=datasources.service.d.ts.map
```
