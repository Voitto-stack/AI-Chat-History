---
title: saved-sqls
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: saved-sqls.ts
---

# saved-sqls

```ts
import { client } from "./client";

export interface SavedSql {
  id: string;
  name: string;
  sql_text: string;
  data_source_id: string | null;
  database: string | null;
  created_at: string;
  updated_at: string;
}

export const listSavedSqls = () => client.post<SavedSql[]>("/saved-sqls/list", {});

export const createSavedSql = (payload: {
  name: string;
  sqlText: string;
  dataSourceId?: string;
  database?: string;
}) => client.post<SavedSql>("/saved-sqls/create", payload);

export const updateSavedSql = (payload: { id: string; name?: string; sqlText?: string }) =>
  client.post<SavedSql>("/saved-sqls/update", payload);

export const deleteSavedSql = (id: string) => client.post("/saved-sqls/delete", { id });

```
