---
title: datasources.sql.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: datasources.sql.d.ts
---

# datasources.sql.d

```ts
export declare const LIST = "\nSELECT id, name, type, host, port, database, username, ssl, pool_min, pool_max, created_by, created_at\nFROM data_sources\nORDER BY created_at DESC";
export declare const LIST_TEST_ONLY = "\nSELECT id, name, type, host, port, database, username, ssl, pool_min, pool_max, created_by, created_at\nFROM data_sources\nWHERE name LIKE '%-test%'\nORDER BY created_at DESC";
export declare const FIND_BY_ID = "\nSELECT id, name, type, host, port, database, username, ssl, pool_min, pool_max, created_by, created_at\nFROM data_sources\nWHERE id = ?";
export declare const FIND_WITH_PASSWORD = "\nSELECT *\nFROM data_sources\nWHERE id = ?";
export declare const CREATE = "\nINSERT INTO data_sources (name, type, host, port, database, username, password_encrypted, ssl, pool_min, pool_max, created_by)\nVALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\nRETURNING id, name, type, host, port, database, username, ssl, pool_min, pool_max, created_by, created_at";
export declare const UPDATE_FIELDS: string[];
export declare const DELETE = "\nDELETE FROM data_sources\nWHERE id = ?";
//# sourceMappingURL=datasources.sql.d.ts.map
```
