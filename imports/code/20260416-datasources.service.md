---
title: datasources.service
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: datasources.service.ts
---

# datasources.service

```ts
import { type FastifyRequest, type FastifyReply } from "fastify";

interface AuthenticatedRequest extends FastifyRequest {
  user: { id: string; role: string };
}
import { encrypt, decrypt } from "@heyhru/server-util-crypto";
import { createPool as createMysqlPool } from "@heyhru/server-plugin-mysql";
import { createPool as createPgPool } from "@heyhru/server-plugin-pg";
import type { DbPool } from "@heyhru/server-plugin-mysql";
import { createLogger } from "@heyhru/common-util-logger";
import {
  listDataSources as listDataSourceRows,
  getDataSourceById as getDataSourceRowById,
  getDataSourceRow,
  insertDataSource,
  updateDataSource as updateDataSourceRow,
  removeDataSource,
} from "./datasources.model.js";

export type { DbPool };

const logger = createLogger({ name: "@heyhru/business-dms-datasource" });

const pools = new Map<string, DbPool>();

export interface PoolStatEntry {
  dataSourceId: string;
  database: string | null;
  active: number | null;
  waiting: number | null;
}

export function getPoolStats(): PoolStatEntry[] {
  return Array.from(pools.entries()).map(([key, pool]) => {
    const colonIdx = key.indexOf(":");
    const dataSourceId = colonIdx >= 0 ? key.slice(0, colonIdx) : key;
    const database = colonIdx >= 0 ? key.slice(colonIdx + 1) : null;
    const s = pool.stats();
    return { dataSourceId, database, active: s?.active ?? null, waiting: s?.waiting ?? null };
  });
}

function poolKey(id: string, database?: string): string {
  return database ? `${id}:${database}` : id;
}

export function getPool(ds: {
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
}): DbPool {
  const key = poolKey(ds.id, ds.database);
  if (pools.has(key)) return pools.get(key)!;

  const pool =
    ds.type === "mysql"
      ? createMysqlPool({
          host: ds.host,
          port: ds.port,
          database: ds.database,
          username: ds.username,
          password: ds.password,
          poolMax: ds.pool_max,
        })
      : createPgPool({
          host: ds.host,
          port: ds.port,
          database: ds.database,
          username: ds.username,
          password: ds.password,
          poolMin: ds.pool_min,
          poolMax: ds.pool_max,
          ssl: ds.ssl,
        });

  pools.set(key, pool);
  logger.info("Connection pool created (ds=%s, db=%s, type=%s)", ds.id, ds.database, ds.type);
  return pool;
}

export async function getDataSourceWithPassword(
  id: string,
  encryptionKey: string
): Promise<DataSourceWithPassword | null> {
  const row = await getDataSourceRow(id);
  if (!row) return null;
  return {
    id: row.id as string,
    type: row.type as "mysql" | "postgres",
    host: row.host as string,
    port: row.port as number,
    database: (row.database as string) ?? null,
    username: row.username as string,
    password: decrypt(row.password_encrypted as string, encryptionKey),
    ssl: row.ssl as boolean,
    pool_min: row.pool_min as number,
    pool_max: row.pool_max as number,
  };
}

export async function getPoolForDatabase(
  dataSourceId: string,
  database: string,
  encryptionKey: string
): Promise<DbPool | null> {
  const ds = await getDataSourceWithPassword(dataSourceId, encryptionKey);
  if (!ds) return null;
  return getPool({ ...ds, database });
}

async function destroyPool(id: string) {
  const prefix = `${id}:`;
  for (const [key, pool] of pools) {
    if (key === id || key.startsWith(prefix)) {
      await pool.end();
      pools.delete(key);
      logger.info("Connection pool destroyed (key=%s)", key);
    }
  }
}

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

const RESTRICTED_DS_ROLES = new Set(["developer", "viewer"]);

export async function datasourceList(req: FastifyRequest, reply: FastifyReply) {
  const role = (req as AuthenticatedRequest).user.role;
  const testOnly = RESTRICTED_DS_ROLES.has(role);
  return reply.send(await listDataSourceRows(testOnly));
}

export async function getDataSourceName(id: string): Promise<string | null> {
  const row = await getDataSourceRowById(id);
  return row ? (row.name as string) : null;
}

export async function datasourceGet(req: FastifyRequest, reply: FastifyReply) {
  const { id } = (req.body ?? {}) as Record<string, string>;
  const ds = await getDataSourceRowById(id);
  if (!ds) return reply.code(404).send({ error: "Not found" });
  return reply.send(ds);
}

export function datasourceCreate(encryptionKey: string) {
  return async (req: AuthenticatedRequest, reply: FastifyReply) => {
    const body = (req.body ?? {}) as {
      name: string;
      type: "mysql" | "postgres";
      host: string;
      port: number;
      database: string;
      username: string;
      password: string;
      ssl?: boolean;
      pool_min?: number;
      pool_max?: number;
    };
    const ds = await insertDataSource(
      { ...body, ssl: body.ssl ?? false, pool_min: body.pool_min ?? 1, pool_max: body.pool_max ?? 10 },
      encrypt(body.password, encryptionKey),
      req.user.id
    );
    return reply.code(201).send(ds);
  };
}

export function datasourceUpdate(encryptionKey: string) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const { id, password, ...rest } = (req.body ?? {}) as {
      id: string;
      password?: string;
      [key: string]: unknown;
    };
    const existing = await getDataSourceRowById(id);
    if (!existing) return reply.code(404).send({ error: "Not found" });
    const encryptedPassword = password ? encrypt(password, encryptionKey) : undefined;
    await destroyPool(id);
    const ds = await updateDataSourceRow(id, rest, encryptedPassword);
    return reply.send(ds);
  };
}

export async function datasourceDelete(req: FastifyRequest, reply: FastifyReply) {
  const { id } = (req.body ?? {}) as Record<string, string>;
  await destroyPool(id);
  await removeDataSource(id);
  return reply.code(204).send();
}

```
