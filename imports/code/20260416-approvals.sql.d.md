---
title: approvals.sql.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: approvals.sql.d.ts
---

# approvals.sql.d

```ts
export declare const FIND_BY_ID = "\nSELECT *\nFROM approvals\nWHERE id = ?";
export declare const CREATE = "\nINSERT INTO approvals (data_source_id, sql_text, submitted_by)\nVALUES (?, ?, ?)\nRETURNING *";
export declare const UPDATE_REVIEW: () => string;
export declare const UPDATE_EXECUTING: () => string;
export declare const UPDATE_RESULT: () => string;
//# sourceMappingURL=approvals.sql.d.ts.map
```
