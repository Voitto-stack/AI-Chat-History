---
title: datasources.sql
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: datasources.sql.ts
---

# datasources.sql

```ts
export const LIST = `
SELECT id, name, type, host, port, database, username, ssl, pool_min, pool_max, created_by, created_at
FROM data_sources
ORDER BY created_at DESC`;

export const LIST_TEST_ONLY = `
SELECT id, name, type, host, port, database, username, ssl, pool_min, pool_max, created_by, created_at
FROM data_sources
WHERE name LIKE '%-test%'
ORDER BY created_at DESC`;

export const FIND_BY_ID = `
SELECT id, name, type, host, port, database, username, ssl, pool_min, pool_max, created_by, created_at
FROM data_sources
WHERE id = ?`;

export const FIND_WITH_PASSWORD = `
SELECT *
FROM data_sources
WHERE id = ?`;

export const CREATE = `
INSERT INTO data_sources (name, type, host, port, database, username, password_encrypted, ssl, pool_min, pool_max, created_by)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
RETURNING id, name, type, host, port, database, username, ssl, pool_min, pool_max, created_by, created_at`;

export const UPDATE_FIELDS = ["name", "type", "host", "port", "database", "username", "ssl", "pool_min", "pool_max"];

export const DELETE = `
DELETE FROM data_sources
WHERE id = ?`;

```
