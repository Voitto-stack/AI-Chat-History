---
date: 2026-04-23T16:00:11+08:00
source: clipboard
chars: 1777
---

diff --git a/packages/app-minerva-server/src/index.ts b/packages/app-minerva-server/src/index.ts
index ebcf54a6..a2853601 100644
--- a/packages/app-minerva-server/src/index.ts
+++ b/packages/app-minerva-server/src/index.ts
@@ -21,7 +21,6 @@ import { getRedisRead, getRedisWrite } from "./utils/redis.js";
 import { initDeviceWs } from "./services/guild/device-ws.js";
 // import { initAdminWs } from "./services/social-proxy/admin-ws.js";
 import { stopGuildWorker } from "./services/guild/guild-worker.js";
-import { initGuild } from "./routes/guild/index.js";
 import { alertGuild } from "./utils/feishu-alert.js";
 
 const app = new Koa();
@@ -159,11 +158,7 @@ async function bootstrap() {
     console.log("──────────────────────────────────────");
   });
 
-  // initDeviceWs(server);
-  initGuild();
-
-  // [PROD-DISABLED] Guild & Social Proxy WebSocket 线上暂不启用
-  // initDeviceWs(server);
+  initDeviceWs(server);
   // initAdminWs(server);
 }
 
diff --git a/packages/app-minerva-server/src/routes/guild/index.ts b/packages/app-minerva-server/src/routes/guild/index.ts
index 84957f7a..73a13469 100644
--- a/packages/app-minerva-server/src/routes/guild/index.ts
+++ b/packages/app-minerva-server/src/routes/guild/index.ts
@@ -28,11 +28,9 @@ import { syncExistingUsersToQueue } from "../../services/guild/guild-queue.js";
 export const guildRouter = new Router();
 
 // 启动 Guild 定时任务 + 队列消费者（延迟到 dotenv 加载完毕后执行）
-export function initGuild(): void {
-  startGuildScheduler();
-  startGuildWorker();
-  syncExistingUsersToQueue().catch((err) => console.error("[Guild] 同步已有用户到队列失败:", err));
-}
+startGuildScheduler();
:
