---
date: 2026-04-16T19:38:59+08:00
source: clipboard
chars: 1163
---

curl 'https://dms-api.sitin.ai/sql/execute' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdjMzVmMzRmLWZlZDItNDllYy05YjVkLTlhMmNiNWU4ZGE0MyIsInVzZXJuYW1lIjoic2hhbmdiaW4iLCJyb2xlIjoiZGV2ZWxvcGVyIiwiaWF0IjoxNzc2MzI5OTM4LCJleHAiOjE3NzY0MTYzMzh9.3bCrtRwx2hjy6KYwqxRY9zhW8g-jx14yGTm4h5kHkME' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'origin: https://dms.sitin.ai' \
  -H 'pragma: no-cache' \
  -H 'priority: u=1, i' \
  -H 'referer: https://dms.sitin.ai/' \
  -H 'sec-ch-ua: "Google Chrome";v="147", "Not.A/Brand";v="8", "Chromium";v="147"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36' \
  --data-raw '{"dataSourceId":"338e555f-6031-49ac-ab35-d14eb769824f","database":"archat","sql":"select * from union_device_logs","page":1,"pageSize":50}'
