---
date: 2026-04-20T14:21:34+08:00
source: clipboard
chars: 103
---

pg_dump -h prod-host \
        -U readonly \
        -d prod_db \
        -Fc \
        -f prod_db.dump
