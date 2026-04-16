---
title: migrations
date: 2026-04-16T21:03:22+08:00
source: import
language: ts
original: migrations.ts
---

# migrations

```ts
interface Migration {
  name: string;
  sql: () => string;
}

export const migrations: Migration[] = [
  {
    name: "001_users.sql",
    sql: () => `
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'maintainer', 'developer', 'viewer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO users (id, username, email, password_hash, role)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin',
  'admin@example.com',
  '178c20236d9629bffcb301f57d1b8383:40c49d6500a8f322754ac0cd2d5c9dea019a4c14feef60e436d767cc2dd44bc1eeee7ef16f1bd768260aeec4025e06c479c4c367537899002ec89962382a3104',
  'admin'
) ON CONFLICT (id) DO NOTHING;`,
  },
  {
    name: "002_data_sources.sql",
    sql: () => `
CREATE TABLE IF NOT EXISTS data_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('mysql', 'postgres')),
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  database TEXT,
  username TEXT NOT NULL,
  password_encrypted TEXT NOT NULL,
  ssl BOOLEAN NOT NULL DEFAULT FALSE,
  pool_min INTEGER NOT NULL DEFAULT 1,
  pool_max INTEGER NOT NULL DEFAULT 10,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
  },
  {
    name: "003_audit_logs.sql",
    sql: () => `
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  data_source_id UUID REFERENCES data_sources(id),
  action TEXT NOT NULL,
  sql_text TEXT,
  result_summary TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_data_source_id ON audit_logs(data_source_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);`,
  },
  {
    name: "004_approvals.sql",
    sql: () => `
CREATE TABLE IF NOT EXISTS approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_source_id UUID NOT NULL REFERENCES data_sources(id),
  submitted_by UUID NOT NULL REFERENCES users(id),
  reviewed_by UUID REFERENCES users(id),
  sql_text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected', 'executing', 'executed', 'execute_failed')),
  reject_reason TEXT,
  execute_result TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_approvals_status ON approvals(status);
CREATE INDEX IF NOT EXISTS idx_approvals_submitted_by ON approvals(submitted_by);`,
  },
  {
    name: "005_data_sources_add_ssl.sql",
    sql: () => `ALTER TABLE data_sources ADD COLUMN IF NOT EXISTS ssl BOOLEAN NOT NULL DEFAULT FALSE;`,
  },
  {
    name: "006_saved_sqls.sql",
    sql: () => `
CREATE TABLE IF NOT EXISTS saved_sqls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sql_text TEXT NOT NULL,
  data_source_id UUID REFERENCES data_sources(id) ON DELETE SET NULL,
  database TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_sqls_user_id ON saved_sqls(user_id);`,
  },
  {
    name: "007_approvals_add_db_name.sql",
    sql: () => `ALTER TABLE approvals ADD COLUMN IF NOT EXISTS db_name TEXT;`,
  },
];

```
