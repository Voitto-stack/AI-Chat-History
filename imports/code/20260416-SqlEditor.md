---
title: sqlEditor
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: sqlEditor.ts
---

# sqlEditor

```ts
import { create } from "zustand";
import { DataSource } from "../api/datasources";

interface SqlEditorState {
  dataSources: DataSource[];
  databases: string[];
  selectedSource?: string;
  selectedDatabase?: string;
  setDataSources: (ds: DataSource[]) => void;
  setDatabases: (dbs: string[]) => void;
  setSelectedSource: (id?: string) => void;
  setSelectedDatabase: (db?: string) => void;
}

export const useSqlEditorStore = create<SqlEditorState>((set) => ({
  dataSources: [],
  databases: [],
  selectedSource: undefined,
  selectedDatabase: undefined,
  setDataSources: (dataSources) => set({ dataSources }),
  setDatabases: (databases) => set({ databases }),
  setSelectedSource: (selectedSource) => set({ selectedSource }),
  setSelectedDatabase: (selectedDatabase) => set({ selectedDatabase }),
}));

```
