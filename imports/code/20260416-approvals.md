---
title: approvals
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: approvals.ts
---

# approvals

```ts
import { client } from "./client";

export type ApprovalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "executing"
  | "executed"
  | "execute_failed";

export interface Approval {
  id: string;
  data_source_id: string;
  submitted_by: string;
  reviewed_by: string | null;
  sql_text: string;
  status: ApprovalStatus;
  reject_reason: string | null;
  execute_result: string | null;
  created_at: string;
  updated_at: string;
}

export const listApprovals = (filters?: { status?: string; mine?: boolean }) =>
  client.post<Approval[]>("/approvals/list", filters);

export const getApproval = (id: string) => client.post<Approval>("/approvals/get", { id });

export const createApproval = (payload: { dataSourceId: string; database?: string; sql: string }) =>
  client.post<Approval>("/approvals/create", payload);

export const approveApproval = (id: string) => client.post<Approval>("/approvals/approve", { id });

export const rejectApproval = (id: string, reason?: string) =>
  client.post<Approval>("/approvals/reject", { id, reason });

export const executeApproval = (id: string) => client.post<Approval>("/approvals/execute", { id });

```
