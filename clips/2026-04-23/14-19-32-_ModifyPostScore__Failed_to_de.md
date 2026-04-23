---
date: 2026-04-23T14:19:32+08:00
source: clipboard
chars: 400
---

[ModifyPostScore] Failed to delete Redis cache: ReplyError: READONLY You can't write against a read only replica.
    at parseError (/Users/presence79/Desktop/WORK/sitin-next/node_modules/redis-parser/lib/parser.js:179:12)
    at parseType (/Users/presence79/Desktop/WORK/sitin-next/node_modules/redis-parser/lib/parser.js:302:14) {
  command: { name: 'del', args: [ 'post:like:count:v2:280403' ] }
}
