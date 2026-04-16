---
title: README
date: 2026-04-16T21:03:22+08:00
source: import
original: README.md
---

# @heyhru/app-dms-server

DMS (Database Management System) backend service. Provides user management, data source management, SQL execution, approval workflows, and audit logging.

## Tech Stack

- **Framework**: [Fastify](https://fastify.dev) (`@fastify/cors`, `@fastify/cookie`)
- **Internal DB**: PostgreSQL via `pg` (plain SQL migrations)
- **Target DBs**: `@heyhru/server-util-mysql`, `@heyhru/server-util-pg`
- **Auth**: JWT cookie (`@heyhru/server-util-jwt` + `@heyhru/server-util-crypto` scrypt)
- **Encryption**: AES-256-GCM via `@heyhru/server-util-crypto`
- **Logging**: `@heyhru/common-util-logger` (pino-based, auto dev/prod level)

## Getting Started

```bash
# Dev
pnpm dev

# Build
pnpm build

# Test
pnpm test
```

### Environment Variables

| Variable         | Default              | Description                                 |
| ---------------- | -------------------- | ------------------------------------------- |
| `PORT`           | `3001`               | Server port                                 |
| `JWT_SECRET`     | `dev-secret-...`     | JWT signing secret                          |
| `ENCRYPTION_KEY` | `dev-encryption-...` | 32-byte key for AES-256-GCM                 |
| `DATABASE_URL`   | _(required)_         | PostgreSQL connection string                |
| `NODE_ENV`       | `development`        | Set to `production` to enable Secure cookie |

> All defaults are for local development only. Always set real secrets in production.

## Project Structure

```
src/
├── auth/                       # Authentication & authorization
│   ├── auth.controller.ts      # Route registration: /auth/login, /auth/logout, /auth/me
│   ├── auth.service.ts         # Handlers: authLogin, authLogout, authMe
│   ├── auth.middleware.ts      # JWT verifyToken + AuthUser type declaration
│   ├── auth.permissions.ts     # Route-permission map + global preHandler hook
│   └── auth.cookie.ts          # Cookie parse / set / clear helpers
├── users/                      # User management
│   ├── users.controller.ts     # Route registration: /users CRUD
│   ├── users.service.ts        # Handlers: getUsers, getUserById, postUsers, putUserById, deleteUserById
│   ├── users.model.ts          # DB operations
│   └── users.sql.ts            # SQL query constants
├── datasources/                # Data source management
│   ├── datasources.controller.ts # Route registration: /datasources CRUD
│   ├── datasources.service.ts  # Handlers + internal: getDataSourceWithPassword, getPool
│   ├── datasources.model.ts    # DB operations
│   └── datasources.sql.ts      # SQL query constants
├── sql/                        # SQL execution
│   ├── sql.controller.ts       # Route registration: /sql/parse, /sql/execute
│   └── sql.service.ts          # Handlers: postSqlParse, postSqlExecute + internal sqlParse, sqlExecute
├── approvals/                  # DML approval workflow
│   ├── approvals.controller.ts # Route registration: /approvals CRUD + actions
│   ├── approvals.service.ts    # Handlers: getApprovals, postApprovals, approveApprovalById, etc.
│   ├── approvals.model.ts      # DB operations
│   └── approvals.sql.ts        # SQL query constants
├── audit/                      # Audit logging
│   ├── audit.controller.ts     # Route registration: /audit-logs
│   ├── audit.service.ts        # Handler: getAuditLogs + internal writeAuditLog
│   ├── audit.model.ts          # DB operations
│   └── audit.sql.ts            # SQL query constants
├── migrate/                    # Database migrations
│   ├── runner.ts               # Run SQL migrations on startup
│   └── sql/                    # Migration files (001_users, 002_data_sources, ...)
├── app.ts                      # Fastify app setup, global auth hook, route registration
├── config.ts                   # Env-based config
└── index.ts                    # Entry point (migrate → listen)
```

## API Reference

### Auth

| Method | Path           | Roles | Description                     |
| ------ | -------------- | ----- | ------------------------------- |
| POST   | `/auth/login`  | —     | Login, sets JWT cookie          |
| POST   | `/auth/logout` | —     | Clear JWT cookie                |
| GET    | `/auth/me`     | —     | Return current user from cookie |

### Users

| Method | Path         | Roles | Description         |
| ------ | ------------ | ----- | ------------------- |
| GET    | `/users`     | admin | List all users      |
| GET    | `/users/:id` | admin | Get user by ID      |
| POST   | `/users`     | admin | Create user         |
| PUT    | `/users/:id` | admin | Update email / role |
| DELETE | `/users/:id` | admin | Delete user         |

### Data Sources

| Method | Path               | Roles             | Description                        |
| ------ | ------------------ | ----------------- | ---------------------------------- |
| GET    | `/datasources`     | any               | List data sources (no credentials) |
| GET    | `/datasources/:id` | any               | Get data source by ID              |
| POST   | `/datasources`     | admin, maintainer | Create data source                 |
| DELETE | `/datasources/:id` | admin, maintainer | Delete data source                 |

### SQL

| Method | Path           | Roles                        | Description                        |
| ------ | -------------- | ---------------------------- | ---------------------------------- |
| POST   | `/sql/parse`   | any                          | Categorize SQL (`select` or `dml`) |
| POST   | `/sql/execute` | admin, maintainer, developer | Execute SELECT directly            |

DML statements must go through the approval workflow.

### Approvals

| Method | Path                     | Roles                        | Description                               |
| ------ | ------------------------ | ---------------------------- | ----------------------------------------- |
| GET    | `/approvals`             | any                          | List approvals (`?status=`, `?mine=true`) |
| GET    | `/approvals/:id`         | any                          | Get approval by ID                        |
| POST   | `/approvals`             | admin, maintainer, developer | Submit DML for approval                   |
| POST   | `/approvals/:id/approve` | admin, maintainer            | Approve (cannot self-approve)             |
| POST   | `/approvals/:id/reject`  | admin, maintainer            | Reject with optional reason               |
| POST   | `/approvals/:id/execute` | admin, maintainer            | Execute an approved statement             |

**Approval state machine:**

```
pending → approved → executing → executed
       ↘ rejected              ↘ execute_failed
```

### Audit Logs

| Method | Path          | Roles             | Description                                                      |
| ------ | ------------- | ----------------- | ---------------------------------------------------------------- |
| GET    | `/audit-logs` | admin, maintainer | Query logs (`?userId=`, `?dataSourceId=`, `?limit=`, `?offset=`) |

## Roles

| Role         | Permissions                                        |
| ------------ | -------------------------------------------------- |
| `admin`      | Full access                                        |
| `maintainer` | Manage datasources, approve/execute DML, view logs |
| `developer`  | Execute SELECT, submit DML for approval            |
| `viewer`     | Read-only access to approved resources             |

## Database Schema

Managed by plain SQL files in `src/migrate/sql/`. Applied automatically on startup via `runMigrations()`.

| Table          | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `users`        | Accounts with role                                             |
| `data_sources` | MySQL / PostgreSQL connection configs (password AES-encrypted) |
| `audit_logs`   | All SQL executions and actions                                 |
| `approvals`    | DML approval requests and execution results                    |
| `_migrations`  | Applied migration tracking                                     |

