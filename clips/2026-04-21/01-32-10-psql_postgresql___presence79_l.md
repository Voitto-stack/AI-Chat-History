---
date: 2026-04-21T01:32:10+08:00
source: clipboard
chars: 305
---

psql postgresql://presence79@localhos
   t:5432/archat_test -c "ALTER TABLE
   union_users ADD COLUMN IF NOT EXISTS
   next_action_at TIMESTAMPTZ; CREATE      
   INDEX IF NOT EXISTS
   idx_union_users_next_action_at ON       
   union_users(next_action_at);" 2>&1
   Add next_action_at column to local DB
