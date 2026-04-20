---
date: 2026-04-20T14:38:48+08:00
source: clipboard
chars: 244
---

~ git:(main) ✗ pg_dump -h 10.51.1.4 -U postgres -d archat -Fd -j 4 -f dump_dir
pg_dump: 错误: 连接到"10.51.1.4"上的服务器，端口5432失败：Operation timed out
	Is the server running on that host and accepting TCP/IP connections?
