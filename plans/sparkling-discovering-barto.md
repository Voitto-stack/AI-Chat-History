# Context
The user wants code written directly in `/Users/presence79/Desktop/WORK/sitin-next` to explore whether the current DMS architecture can support a custom datasource backend that routes SQL through a custom DMS layer instead of direct MySQL/PostgreSQL pools. The project instructions in `sitin-next/CLAUDE.md:15-17` require explicit confirmation before edits and doc-first updates before code changes. The current codebase already has a clean datasource abstraction centered on a tiny `DbPool` interface and cached pool construction, but it hard-codes datasource types to `mysql` and `postgres` in both backend and frontend. The intended outcome is to add a new datasource type with minimal architectural churn while keeping the existing SQL execution, approval, audit, and UI flows usable.

# Recommended approach
Implement a first-class `custom-dms` datasource type by extending the existing `DbPool` abstraction rather than adding any ORM or Prisma-related layer. Keep the current DMS pattern: datasource CRUD stores connection config, datasource service returns a pool-like adapter, SQL/approval services execute raw SQL via that adapter, and the frontend treats the new datasource type as another selectable source.

## 1. Document the new datasource type before code changes
Update the relevant design/README docs first so the implementation follows project rules.

Critical docs to update:
- `/Users/presence79/Desktop/WORK/sitin-next/docs/dms-design.md`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/README.md`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-server/README.md`

Document:
- what `custom-dms` means
- that it is an adapter-backed SQL execution source
- what metadata operations it must support (`execute`, list databases, list tables)
- how its credentials/config are stored

## 2. Introduce a custom DMS adapter behind the existing pool abstraction
Add a new adapter implementation that matches the current pool surface used across the app.

Existing interface to reuse:
- `/Users/presence79/Desktop/WORK/sitin-next/packages/server-plugin-pg/src/index.ts:21`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/server-plugin-mysql/src/index.ts:12`

Required shape:
- `execute(sql: string): Promise<unknown[]>`
- `end(): Promise<void>`
- `stats(): { active: number; waiting: number } | null`

Recommended new files:
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/src/custom-dms.adapter.ts`
- optionally a small helper file like `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/src/custom-dms.client.ts`

The adapter should encapsulate:
- how SQL is sent to the custom backend
- how result rows are normalized to the row-array format expected by existing callers
- how metadata listing is performed if the custom backend exposes non-SQL endpoints

## 3. Extend datasource persistence and backend type unions
Broaden the system from two hard-coded engine types to three.

Critical backend files:
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-server/src/migrate/migrations.ts`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/src/datasources.service.ts`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/src/datasources.model.ts`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/src/datasources.sql.ts`

Backend changes:
- add a new migration to relax the `data_sources.type` constraint from `('mysql','postgres')` to include `custom-dms`
- expand TS unions from `"mysql" | "postgres"` to `"mysql" | "postgres" | "custom-dms"`
- update `getPool(...)` in `datasources.service.ts` so `custom-dms` constructs the adapter instead of direct pg/mysql pools
- preserve the existing cache key and pool lifecycle (`destroyPool`, `stats`, `end`)

## 4. Move metadata listing behind datasource abstraction
Today `/sql/databases` and `/sql/tables` are hard-coded to MySQL/Postgres SQL. That is the main architectural leak that blocks a true third backend.

Current leakage point:
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-server/src/sql/sql.service.ts:162`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-server/src/sql/sql.service.ts:193`

Recommended refactor:
- add datasource-level helpers such as `listDatabasesForDataSource(...)` and `listTablesForDataSource(...)` in `business-dms-datasource/src/datasources.service.ts`
- have `/sql/sql.service.ts` delegate to those helpers instead of branching on `ds.type`

This keeps the app server generic and makes the new adapter properly pluggable.

## 5. Ensure approval execution also supports the new datasource type
Approved DML/DDL execution currently resolves a datasource and pool through the same datasource service.

Critical file:
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-approval/src/approvals.service.ts`

Changes:
- make sure approval execution can resolve a `custom-dms` datasource through the updated `getPool(...)` / `getPoolForDatabase(...)`
- verify that mutation execution semantics from the adapter match current expectations (`await pool.execute(sql)` and success/failure handling)

## 6. Update frontend datasource types and datasource form
The frontend is currently hard-coded to only `mysql` and `postgres`.

Critical frontend files:
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/api/datasources.ts`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/pages/DataSources/index.tsx`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/pages/Login/features.tsx`

Frontend changes:
- widen datasource type unions to include `custom-dms`
- add `custom-dms` to the datasource type select options
- replace current port auto-switch logic (`mysql -> 3306`, else `5432`) with an explicit mapping that includes the new type
- add/adjust fields if the custom backend requires different config than host/port/database/username/password/ssl/pool values
- update any user-facing copy that currently claims only MySQL/PostgreSQL support

## 7. Only change SQL editor UI if the new datasource breaks the current metadata model
The SQL editor is mostly generic, but it assumes the hierarchy:
- datasource
- database
- tables

Critical files:
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/api/sql.ts`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/pages/SqlEditor/index.tsx`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/pages/SqlEditor/TableBrowser.tsx`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/components/Layout/index.tsx`

If the custom DMS can still provide:
- a database list
- a table list per database
- SQL execution with `{ dataSourceId, database?, sql }`

then the editor can remain almost unchanged.

If not, we should explicitly decide one of two approaches before implementation:
- normalize the custom backend to this existing model in the adapter layer, or
- redesign the editor metadata flow for non-database-shaped backends

Given the current codebase, the recommended path is to normalize in the adapter and avoid UI churn.

# Critical files to modify
Backend:
- `/Users/presence79/Desktop/WORK/sitin-next/docs/dms-design.md`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/README.md`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-server/README.md`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-server/src/migrate/migrations.ts`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/src/datasources.service.ts`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/src/datasources.model.ts` (if config shape changes)
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/src/datasources.sql.ts` (if config shape changes)
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/src/custom-dms.adapter.ts` (new)
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-server/src/sql/sql.service.ts`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-approval/src/approvals.service.ts`

Frontend:
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/api/datasources.ts`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/pages/DataSources/index.tsx`
- `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/pages/Login/features.tsx`
- possibly `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/api/sql.ts`
- possibly `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/pages/SqlEditor/index.tsx`
- possibly `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/pages/SqlEditor/TableBrowser.tsx`
- possibly `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/components/Layout/index.tsx`

# Reuse existing patterns
Reuse these exact existing patterns instead of inventing a new architecture:
- datasource pool cache and lifecycle in `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-datasource/src/datasources.service.ts`
- tiny `DbPool` surface from `/Users/presence79/Desktop/WORK/sitin-next/packages/server-plugin-pg/src/index.ts:21`
- SQL execution orchestration in `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-server/src/sql/sql.service.ts`
- approval execution pool resolution in `/Users/presence79/Desktop/WORK/sitin-next/packages/business-dms-approval/src/approvals.service.ts`
- datasource CRUD UI form in `/Users/presence79/Desktop/WORK/sitin-next/packages/app-dms-web/src/pages/DataSources/index.tsx`

# Verification
1. Backend type/config verification
- run the app server migration flow and confirm `data_sources.type` accepts `custom-dms`
- create a datasource of the new type through the UI or API

2. SQL execution verification
- execute a simple `SELECT 1` (or equivalent) through `/sql/execute` using the custom datasource
- verify row normalization matches existing result table expectations

3. Metadata verification
- verify `/sql/databases` returns database list for the custom datasource
- verify `/sql/tables` returns table names for a selected database

4. Approval verification
- submit approval for a DML statement against the custom datasource
- approve and execute it
- confirm audit logging still records execution

5. Frontend verification
- open the datasource management page and create/edit a `custom-dms` datasource
- open SQL editor, select the new datasource, pick a database, browse tables, run a query

6. Standard repo checks
- run package-specific lint/tests for touched packages
- if UI changed, run the DMS web app and test the golden path end-to-end in browser
