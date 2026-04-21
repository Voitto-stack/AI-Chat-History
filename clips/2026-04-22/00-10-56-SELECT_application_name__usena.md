---
date: 2026-04-22T00:10:56+08:00
source: clipboard
chars: 491
---

SELECT application_name, usename, client_addr, state, count(*)                                                                                  
  FROM pg_stat_activity                                                                                                                           
  WHERE datname = 'archat'
  GROUP BY application_name, usename, client_addr, state                                                                                          
  ORDER BY count(*) DESC;
