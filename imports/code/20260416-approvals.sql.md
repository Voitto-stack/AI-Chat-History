---
title: approvals.sql
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: approvals.sql.ts
---

# approvals.sql

```ts
export const FIND_BY_ID = `
SELECT *
FROM approvals
WHERE id = ?`;

export const CREATE = `
INSERT INTO approvals (data_source_id, sql_text, submitted_by)
VALUES (?, ?, ?)
RETURNING *`;

export const UPDATE_REVIEW = () => `
UPDATE approvals
SET status = ?, reviewed_by = ?, reject_reason = ?, updated_at = NOW()
WHERE id = ?
RETURNING *`;

export const UPDATE_EXECUTING = () => `
UPDATE approvals
SET status = 'executing', updated_at = NOW()
WHERE id = ?`;

export const UPDATE_RESULT = () => `
UPDATE approvals
SET status = ?, execute_result = ?, updated_at = NOW()
WHERE id = ?`;

```
