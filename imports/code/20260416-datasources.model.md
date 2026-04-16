---
title: datasources.model
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: datasources.model.ts
---

# datasources.model

```ts
import { getPgDb } from "@heyhru/server-plugin-pg";
import * as Q from "./datasources.sql.js";

export function listDataSources(testOnly = false) {
  return getPgDb().query(testOnly ? Q.LIST_TEST_ONLY : Q.LIST);
}

export function getDataSourceById(id: string) {
  return getPgDb().queryOne(Q.FIND_BY_ID, [id]);
}

export function getDataSourceRow(id: string) {
  return getPgDb().queryOne(Q.FIND_WITH_PASSWORD, [id]);
}

export function insertDataSource(
  data: {
    name: string;
    type: string;
    host: string;
    port: number;
    database: string;
    username: string;
    ssl: boolean;
    pool_min: number;
    pool_max: number;
  },
  encryptedPassword: string,
  createdBy: string
) {
  return getPgDb().queryOne(Q.CREATE, [
    data.name,
    data.type,
    data.host,
    data.port,
    data.database,
    data.username,
    encryptedPassword,
    data.ssl,
    data.pool_min,
    data.pool_max,
    createdBy,
  ]);
}

export async function updateDataSource(
  id: string,
  data: Record<string, unknown>,
  encryptedPassword?: string
) {
  const fields: string[] = [];
  const values: unknown[] = [];
  for (const key of Q.UPDATE_FIELDS) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  }
  if (encryptedPassword) {
    fields.push("password_encrypted = ?");
    values.push(encryptedPassword);
  }
  if (!fields.length) return getDataSourceById(id);
  values.push(id);
  return getPgDb().queryOne(
    `UPDATE data_sources SET ${fields.join(", ")} WHERE id = ? RETURNING id, name, type, host, port, database, username, ssl, pool_min, pool_max, created_by, created_at`,
    values
  );
}

export function removeDataSource(id: string) {
  return getPgDb().run(Q.DELETE, [id]);
}

```
