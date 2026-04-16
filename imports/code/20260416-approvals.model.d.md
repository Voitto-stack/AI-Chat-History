---
title: approvals.model.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: approvals.model.d.ts
---

# approvals.model.d

```ts
export declare function listApprovals(filters?: {
    status?: string;
    submittedBy?: string;
}): Promise<Record<string, unknown>[]>;
export declare function getApprovalById(id: string): Promise<Record<string, unknown> | undefined>;
export declare function insertApproval(dataSourceId: string, sqlText: string, submittedBy: string): Promise<Record<string, unknown> | undefined>;
export declare function updateReview(id: string, status: string, reviewedBy: string, rejectReason: string | null): Promise<Record<string, unknown> | undefined>;
export declare function setExecuting(id: string): Promise<{
    changes: number;
}>;
export declare function setExecuteResult(id: string, status: string, result: string): Promise<{
    changes: number;
}>;
//# sourceMappingURL=approvals.model.d.ts.map
```
