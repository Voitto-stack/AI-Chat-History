---
title: approvals.model
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: approvals.model.ts
---

# approvals.model

```ts
import { getPgDb } from "@heyhru/server-plugin-pg";
import * as Q from "./approvals.sql.js";

export async function listApprovals(filters?: { status?: string; submittedBy?: string }) {
  let query = "SELECT * FROM approvals WHERE 1=1";
  const params: unknown[] = [];
  if (filters?.status) {
    query += " AND status = ?";
    params.push(filters.status);
  }
  if (filters?.submittedBy) {
    query += " AND submitted_by = ?";
    params.push(filters.submittedBy);
  }
  query += " ORDER BY created_at DESC";
  return getPgDb().query(query, params);
}

export function getApprovalById(id: string) {
  return getPgDb().queryOne(Q.FIND_BY_ID, [id]);
}

export function insertApproval(dataSourceId: string, sqlText: string, submittedBy: string) {
  return getPgDb().queryOne(Q.CREATE, [dataSourceId, sqlText, submittedBy]);
}

export function updateReview(
  id: string,
  status: string,
  reviewedBy: string,
  rejectReason: string | null
) {
  return getPgDb().queryOne(Q.UPDATE_REVIEW(), [status, reviewedBy, rejectReason, id]);
}

export function setExecuting(id: string) {
  return getPgDb().run(Q.UPDATE_EXECUTING(), [id]);
}

export function setExecuteResult(id: string, status: string, result: string) {
  return getPgDb().run(Q.UPDATE_RESULT(), [status, result, id]);
}

```
