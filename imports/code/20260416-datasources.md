---
title: datasources
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: datasources.ts
---

# datasources

```ts
import { client } from "./client";

export interface DataSource {
  id: string;
  name: string;
  type: "mysql" | "postgres";
  host: string;
  port: number;
  database: string;
  username: string;
  ssl: boolean;
  pool_min: number;
  pool_max: number;
  created_by: string;
  created_at: string;
}

export interface DataSourcePayload {
  name: string;
  type: "mysql" | "postgres";
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  pool_min?: number;
  pool_max?: number;
}

export const listDataSources = () => client.post<DataSource[]>("/datasources/list");

export const getDataSource = (id: string) => client.post<DataSource>("/datasources/get", { id });

export const createDataSource = (payload: DataSourcePayload) =>
  client.post<DataSource>("/datasources/create", payload);

export interface UpdateDataSourcePayload {
  id: string;
  name?: string;
  type?: "mysql" | "postgres";
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  ssl?: boolean;
  pool_min?: number;
  pool_max?: number;
}

export const updateDataSource = (payload: UpdateDataSourcePayload) =>
  client.post<DataSource>("/datasources/update", payload);

export const deleteDataSource = (id: string) => client.post("/datasources/delete", { id });

```
