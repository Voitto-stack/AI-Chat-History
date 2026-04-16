---
date: 2026-04-16T20:10:06+08:00
source: clipboard
chars: 1167
---

curl 'https://dms-api.sitin.ai/sql/execute' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVhY2YyODBiLWE2NjAtNDA1Yi1hMTM5LTNjYTU3MGQ2MDdlMyIsInVzZXJuYW1lIjoieHV6YWl4aW5nIiwicm9sZSI6ImRldmVsb3BlciIsImlhdCI6MTc3NjM0MDQ1NCwiZXhwIjoxNzc2NDI2ODU0fQ.P1wW_bWLyi5chBmuyCtKvU36hK7NtgS1sNEneJY1W0o' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'origin: https://dms.sitin.ai' \
  -H 'pragma: no-cache' \
  -H 'priority: u=1, i' \
  -H 'referer: https://dms.sitin.ai/' \
  -H 'sec-ch-ua: "Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36' \
  --data-raw '{"dataSourceId":"338e555f-6031-49ac-ab35-d14eb769824f","database":"archat","sql":"SELECT * FROM admin_permissions LIMIT 100","page":1,"pageSize":50}'
