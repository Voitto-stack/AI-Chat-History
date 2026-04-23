---
date: 2026-04-23T15:43:26+08:00
source: clipboard
chars: 155
---

startGuildScheduler();
  startGuildWorker();
  syncExistingUsersToQueue().catch((err) => console.error("[Guild] 同步已有用户到队列失败:", err));
