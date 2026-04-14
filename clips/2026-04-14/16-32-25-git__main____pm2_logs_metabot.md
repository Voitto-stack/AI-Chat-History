---
date: 2026-04-14T16:32:25+08:00
source: clipboard
chars: 18903
---

git:(main) ✗ pm2 logs metabot --lines 120 --nostream    
[TAILING] Tailing last 120 lines for [metabot] process (change the value with --lines option)
/Users/presence79/metabot/logs/error.log last 120 lines:
4|metabot  | 2026-04-14 16:18:38: node:events:486
4|metabot  | 2026-04-14 16:18:38:       throw er; // Unhandled 'error' event
4|metabot  | 2026-04-14 16:18:38:       ^
4|metabot  | 2026-04-14 16:18:38: 
4|metabot  | 2026-04-14 16:18:38: Error: listen EADDRINUSE: address already in use 0.0.0.0:9100
4|metabot  | 2026-04-14 16:18:38:     at Server.setupListenHandle [as _listen2] (node:net:2008:16)
4|metabot  | 2026-04-14 16:18:38:     at listenInCluster (node:net:2065:12)
4|metabot  | 2026-04-14 16:18:38:     at node:net:2274:7
4|metabot  | 2026-04-14 16:18:38:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
4|metabot  | 2026-04-14 16:18:38: Emitted 'error' event on Server instance at:
4|metabot  | 2026-04-14 16:18:38:     at emitErrorNT (node:net:2044:8)
4|metabot  | 2026-04-14 16:18:38:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
4|metabot  | 2026-04-14 16:18:38:   code: 'EADDRINUSE',
4|metabot  | 2026-04-14 16:18:38:   errno: -48,
4|metabot  | 2026-04-14 16:18:38:   syscall: 'listen',
4|metabot  | 2026-04-14 16:18:38:   address: '0.0.0.0',
4|metabot  | 2026-04-14 16:18:38:   port: 9100
4|metabot  | 2026-04-14 16:18:38: }
4|metabot  | 2026-04-14 16:18:38: 
4|metabot  | 2026-04-14 16:18:38: Node.js v25.8.0
4|metabot  | 2026-04-14 16:20:48: node:events:486
4|metabot  | 2026-04-14 16:20:48:       throw er; // Unhandled 'error' event
4|metabot  | 2026-04-14 16:20:48:       ^
4|metabot  | 2026-04-14 16:20:48: 
4|metabot  | 2026-04-14 16:20:48: Error: listen EADDRINUSE: address already in use 0.0.0.0:9100
4|metabot  | 2026-04-14 16:20:48:     at Server.setupListenHandle [as _listen2] (node:net:2008:16)
4|metabot  | 2026-04-14 16:20:48:     at listenInCluster (node:net:2065:12)
4|metabot  | 2026-04-14 16:20:48:     at node:net:2274:7
4|metabot  | 2026-04-14 16:20:48:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
4|metabot  | 2026-04-14 16:20:48: Emitted 'error' event on Server instance at:
4|metabot  | 2026-04-14 16:20:48:     at emitErrorNT (node:net:2044:8)
4|metabot  | 2026-04-14 16:20:48:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
4|metabot  | 2026-04-14 16:20:48:   code: 'EADDRINUSE',
4|metabot  | 2026-04-14 16:20:48:   errno: -48,
4|metabot  | 2026-04-14 16:20:48:   syscall: 'listen',
4|metabot  | 2026-04-14 16:20:48:   address: '0.0.0.0',
4|metabot  | 2026-04-14 16:20:48:   port: 9100
4|metabot  | 2026-04-14 16:20:48: }
4|metabot  | 2026-04-14 16:20:48: 
4|metabot  | 2026-04-14 16:20:48: Node.js v25.8.0
4|metabot  | 2026-04-14 16:22:58: node:events:486
4|metabot  | 2026-04-14 16:22:58:       throw er; // Unhandled 'error' event
4|metabot  | 2026-04-14 16:22:58:       ^
4|metabot  | 2026-04-14 16:22:58: 
4|metabot  | 2026-04-14 16:22:58: Error: listen EADDRINUSE: address already in use 0.0.0.0:9100
4|metabot  | 2026-04-14 16:22:58:     at Server.setupListenHandle [as _listen2] (node:net:2008:16)
4|metabot  | 2026-04-14 16:22:58:     at listenInCluster (node:net:2065:12)
4|metabot  | 2026-04-14 16:22:58:     at node:net:2274:7
4|metabot  | 2026-04-14 16:22:58:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
4|metabot  | 2026-04-14 16:22:58: Emitted 'error' event on Server instance at:
4|metabot  | 2026-04-14 16:22:58:     at emitErrorNT (node:net:2044:8)
4|metabot  | 2026-04-14 16:22:58:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
4|metabot  | 2026-04-14 16:22:58:   code: 'EADDRINUSE',
4|metabot  | 2026-04-14 16:22:58:   errno: -48,
4|metabot  | 2026-04-14 16:22:58:   syscall: 'listen',
4|metabot  | 2026-04-14 16:22:58:   address: '0.0.0.0',
4|metabot  | 2026-04-14 16:22:58:   port: 9100
4|metabot  | 2026-04-14 16:22:58: }
4|metabot  | 2026-04-14 16:22:58: 
4|metabot  | 2026-04-14 16:22:58: Node.js v25.8.0
4|metabot  | 2026-04-14 16:25:08: node:events:486
4|metabot  | 2026-04-14 16:25:08:       throw er; // Unhandled 'error' event
4|metabot  | 2026-04-14 16:25:08:       ^
4|metabot  | 2026-04-14 16:25:08: 
4|metabot  | 2026-04-14 16:25:08: Error: listen EADDRINUSE: address already in use 0.0.0.0:9100
4|metabot  | 2026-04-14 16:25:08:     at Server.setupListenHandle [as _listen2] (node:net:2008:16)
4|metabot  | 2026-04-14 16:25:08:     at listenInCluster (node:net:2065:12)
4|metabot  | 2026-04-14 16:25:08:     at node:net:2274:7
4|metabot  | 2026-04-14 16:25:08:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
4|metabot  | 2026-04-14 16:25:08: Emitted 'error' event on Server instance at:
4|metabot  | 2026-04-14 16:25:08:     at emitErrorNT (node:net:2044:8)
4|metabot  | 2026-04-14 16:25:08:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
4|metabot  | 2026-04-14 16:25:08:   code: 'EADDRINUSE',
4|metabot  | 2026-04-14 16:25:08:   errno: -48,
4|metabot  | 2026-04-14 16:25:08:   syscall: 'listen',
4|metabot  | 2026-04-14 16:25:08:   address: '0.0.0.0',
4|metabot  | 2026-04-14 16:25:08:   port: 9100
4|metabot  | 2026-04-14 16:25:08: }
4|metabot  | 2026-04-14 16:25:08: 
4|metabot  | 2026-04-14 16:25:08: Node.js v25.8.0
4|metabot  | 2026-04-14 16:27:18: node:events:486
4|metabot  | 2026-04-14 16:27:18:       throw er; // Unhandled 'error' event
4|metabot  | 2026-04-14 16:27:18:       ^
4|metabot  | 2026-04-14 16:27:18: 
4|metabot  | 2026-04-14 16:27:18: Error: listen EADDRINUSE: address already in use 0.0.0.0:9100
4|metabot  | 2026-04-14 16:27:18:     at Server.setupListenHandle [as _listen2] (node:net:2008:16)
4|metabot  | 2026-04-14 16:27:18:     at listenInCluster (node:net:2065:12)
4|metabot  | 2026-04-14 16:27:18:     at node:net:2274:7
4|metabot  | 2026-04-14 16:27:18:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
4|metabot  | 2026-04-14 16:27:18: Emitted 'error' event on Server instance at:
4|metabot  | 2026-04-14 16:27:18:     at emitErrorNT (node:net:2044:8)
4|metabot  | 2026-04-14 16:27:18:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
4|metabot  | 2026-04-14 16:27:18:   code: 'EADDRINUSE',
4|metabot  | 2026-04-14 16:27:18:   errno: -48,
4|metabot  | 2026-04-14 16:27:18:   syscall: 'listen',
4|metabot  | 2026-04-14 16:27:18:   address: '0.0.0.0',
4|metabot  | 2026-04-14 16:27:18:   port: 9100
4|metabot  | 2026-04-14 16:27:18: }
4|metabot  | 2026-04-14 16:27:18: 
4|metabot  | 2026-04-14 16:27:18: Node.js v25.8.0
4|metabot  | 2026-04-14 16:29:29: node:events:486
4|metabot  | 2026-04-14 16:29:29:       throw er; // Unhandled 'error' event
4|metabot  | 2026-04-14 16:29:29:       ^
4|metabot  | 2026-04-14 16:29:29: 
4|metabot  | 2026-04-14 16:29:29: Error: listen EADDRINUSE: address already in use 0.0.0.0:9100
4|metabot  | 2026-04-14 16:29:29:     at Server.setupListenHandle [as _listen2] (node:net:2008:16)
4|metabot  | 2026-04-14 16:29:29:     at listenInCluster (node:net:2065:12)
4|metabot  | 2026-04-14 16:29:29:     at node:net:2274:7
4|metabot  | 2026-04-14 16:29:29:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
4|metabot  | 2026-04-14 16:29:29: Emitted 'error' event on Server instance at:
4|metabot  | 2026-04-14 16:29:29:     at emitErrorNT (node:net:2044:8)
4|metabot  | 2026-04-14 16:29:29:     at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
4|metabot  | 2026-04-14 16:29:29:   code: 'EADDRINUSE',
4|metabot  | 2026-04-14 16:29:29:   errno: -48,
4|metabot  | 2026-04-14 16:29:29:   syscall: 'listen',
4|metabot  | 2026-04-14 16:29:29:   address: '0.0.0.0',
4|metabot  | 2026-04-14 16:29:29:   port: 9100
4|metabot  | 2026-04-14 16:29:29: }
4|metabot  | 2026-04-14 16:29:29: 
4|metabot  | 2026-04-14 16:29:29: Node.js v25.8.0

/Users/presence79/metabot/logs/out.log last 120 lines:
4|metabot  | 2026-04-14 16:27:22:     feishuBots: 1
4|metabot  | 2026-04-14 16:27:22:     telegramBots: 0
4|metabot  | 2026-04-14 16:27:22:     wechatBots: 1
4|metabot  | 2026-04-14 16:27:22:     memoryServerUrl: "http://localhost:8100"
4|metabot  | 2026-04-14 16:27:22: [2026-04-14 16:27:22.387 +0800] INFO: Starting Feishu bot...
4|metabot  | 2026-04-14 16:27:22:     bot: "AI"
4|metabot  | 2026-04-14 16:27:22: [info]: [ 'event-dispatch is ready' ]
4|metabot  | 2026-04-14 16:27:22: [info]: [
4|metabot  | 2026-04-14 16:27:22:   '[ws]',
4|metabot  | 2026-04-14 16:27:22:   'receive events or callbacks through persistent connection only available in self-build & Feishu app, Configured in:\n' +
4|metabot  | 2026-04-14 16:27:22:     '        Developer Console(开发者后台) \n' +
4|metabot  | 2026-04-14 16:27:22:     '          ->\n' +
4|metabot  | 2026-04-14 16:27:22:     '        Events and Callbacks(事件与回调)\n' +
4|metabot  | 2026-04-14 16:27:22:     '          -> \n' +
4|metabot  | 2026-04-14 16:27:22:     '        Mode of event/callback subscription(订阅方式)\n' +
4|metabot  | 2026-04-14 16:27:22:     '          -> \n' +
4|metabot  | 2026-04-14 16:27:22:     '        Receive events/callbacks through persistent connection(使用 长连接 接收事件/回调)'
4|metabot  | 2026-04-14 16:27:22: ]
4|metabot  | 2026-04-14 16:27:22: [2026-04-14 16:27:22.687 +0800] INFO: Bot info fetched
4|metabot  | 2026-04-14 16:27:22:     bot: "AI"
4|metabot  | 2026-04-14 16:27:22:     botOpenId: "ou_5067f7e307d6898248710d3ebf2aa8dc"
4|metabot  | 2026-04-14 16:27:22: [2026-04-14 16:27:22.691 +0800] INFO: Feishu bot is running
4|metabot  | 2026-04-14 16:27:22:     bot: "AI"
4|metabot  | 2026-04-14 16:27:22: [2026-04-14 16:27:22.691 +0800] INFO: Configuration
4|metabot  | 2026-04-14 16:27:22:     bot: "AI"
4|metabot  | 2026-04-14 16:27:22:     defaultWorkingDirectory: "/Users/presence79/metabot-workspace"
4|metabot  | 2026-04-14 16:27:22:     maxTurns: "unlimited"
4|metabot  | 2026-04-14 16:27:22:     maxBudgetUsd: "unlimited"
4|metabot  | 2026-04-14 16:27:22: [2026-04-14 16:27:22.692 +0800] INFO: Starting WeChat bot...
4|metabot  | 2026-04-14 16:27:22:     bot: "AI-wechat"
4|metabot  | 2026-04-14 16:27:22: [2026-04-14 16:27:22.692 +0800] INFO: Starting WeChat iLink QR login...
4|metabot  | 2026-04-14 16:27:22:     bot: "AI-wechat"
4|metabot  | 2026-04-14 16:27:22: 
4|metabot  | 2026-04-14 16:27:22: === WeChat QR Login ===
4|metabot  | 2026-04-14 16:27:22: Open this URL or scan the QR code: https://liteapp.weixin.qq.com/q/7GiQu1?qrcode=0346032feef4b5a86778ea482c79d9cd&bot_type=3
4|metabot  | 2026-04-14 16:27:22: Waiting for scan...
4|metabot  | 2026-04-14 16:27:22: 
4|metabot  | 2026-04-14 16:27:22: [2026-04-14 16:27:22.843 +0800] INFO: QR code generated — scan with WeChat
4|metabot  | 2026-04-14 16:27:22:     bot: "AI-wechat"
4|metabot  | 2026-04-14 16:27:22:     qrUrl: "https://liteapp.weixin.qq.com/q/7GiQu1?qrcode=0346032feef4b5a86778ea482c79d9cd&bot_type=3"
4|metabot  | 2026-04-14 16:27:22:     qrId: "0346032feef4b5a86778ea482c79d9cd"
4|metabot  | 2026-04-14 16:28:37: [error]: [ '[ws]', 'ws connect failed' ]
4|metabot  | 2026-04-14 16:28:37: [error]: [ '[ws]', 'connect failed' ]
4|metabot  | 2026-04-14 16:28:37: [info]: [ '[ws]', 'reconnect' ]
4|metabot  | 2026-04-14 16:28:37: [info]: [ '[ws]', 'ws client ready' ]
4|metabot  | 2026-04-14 16:29:28: [info]: [ 'client ready' ]
4|metabot  | 2026-04-14 16:29:28: [info]: [ 'client ready' ]
4|metabot  | 2026-04-14 16:29:29: [2026-04-14 16:29:28.641 +0800] ERROR: Failed to start bot; continuing with remaining bots
4|metabot  | 2026-04-14 16:29:29:     botName: "AI-wechat"
4|metabot  | 2026-04-14 16:29:29:     platform: "wechat"
4|metabot  | 2026-04-14 16:29:29:     err: {
4|metabot  | 2026-04-14 16:29:29:       "type": "Error",
4|metabot  | 2026-04-14 16:29:29:       "message": "WeChat QR code expired. Please restart to try again.",
4|metabot  | 2026-04-14 16:29:29:       "stack":
4|metabot  | 2026-04-14 16:29:29:           Error: WeChat QR code expired. Please restart to try again.
4|metabot  | 2026-04-14 16:29:29:               at WechatClient.login (/Users/presence79/metabot/src/wechat/wechat-client.ts:156:15)
4|metabot  | 2026-04-14 16:29:29:               at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
4|metabot  | 2026-04-14 16:29:29:               at async startWechatBot (/Users/presence79/metabot/src/wechat/wechat-bot.ts:48:23)
4|metabot  | 2026-04-14 16:29:29:               at async Promise.allSettled (index 0)
4|metabot  | 2026-04-14 16:29:29:               at async startBotsSafely (/Users/presence79/metabot/src/index.ts:293:19)
4|metabot  | 2026-04-14 16:29:29:               at async main (/Users/presence79/metabot/src/index.ts:126:7)
4|metabot  | 2026-04-14 16:29:29:     }
4|metabot  | 2026-04-14 16:29:29: [2026-04-14 16:29:28.646 +0800] INFO: All bots started
4|metabot  | 2026-04-14 16:29:29:     bots: [
4|metabot  | 2026-04-14 16:29:29:       "AI"
4|metabot  | 2026-04-14 16:29:29:     ]
4|metabot  | 2026-04-14 16:29:29: [2026-04-14 16:29:28.662 +0800] INFO: MetaMemory storage initialized
4|metabot  | 2026-04-14 16:29:29:     dbPath: "data/metamemory.db"
4|metabot  | 2026-04-14 16:29:29: [2026-04-14 16:29:28.668 +0800] INFO: Feishu service client initialized (for wiki sync & doc reader)
4|metabot  | 2026-04-14 16:29:29: [2026-04-14 16:29:28.673 +0800] INFO: Sync store initialized
4|metabot  | 2026-04-14 16:29:29:     dbPath: "data/sync-mapping.db"
4|metabot  | 2026-04-14 16:29:29: [2026-04-14 16:29:28.673 +0800] INFO: Auto wiki sync enabled
4|metabot  | 2026-04-14 16:29:29:     debounceMs: 5000
4|metabot  | 2026-04-14 16:29:29: [2026-04-14 16:29:28.673 +0800] INFO: Wiki sync service initialized (auto-sync enabled, /sync for manual trigger)
4|metabot  | 2026-04-14 16:29:29: [2026-04-14 16:29:28.676 +0800] WARN: MetaMemory port already in use, retrying in 3s (old process may still be running)
4|metabot  | 2026-04-14 16:29:29:     port: 8100
4|metabot  | 2026-04-14 16:29:33: [info]: [ 'client ready' ]
4|metabot  | 2026-04-14 16:29:33: [2026-04-14 16:29:33.483 +0800] INFO: Starting MetaBot bridge...
4|metabot  | 2026-04-14 16:29:33:     feishuBots: 1
4|metabot  | 2026-04-14 16:29:33:     telegramBots: 0
4|metabot  | 2026-04-14 16:29:33:     wechatBots: 1
4|metabot  | 2026-04-14 16:29:33:     memoryServerUrl: "http://localhost:8100"
4|metabot  | 2026-04-14 16:29:33: [2026-04-14 16:29:33.484 +0800] INFO: Starting Feishu bot...
4|metabot  | 2026-04-14 16:29:33:     bot: "AI"
4|metabot  | 2026-04-14 16:29:33: [info]: [ 'event-dispatch is ready' ]
4|metabot  | 2026-04-14 16:29:33: [info]: [
4|metabot  | 2026-04-14 16:29:33:   '[ws]',
4|metabot  | 2026-04-14 16:29:33:   'receive events or callbacks through persistent connection only available in self-build & Feishu app, Configured in:\n' +
4|metabot  | 2026-04-14 16:29:33:     '        Developer Console(开发者后台) \n' +
4|metabot  | 2026-04-14 16:29:33:     '          ->\n' +
4|metabot  | 2026-04-14 16:29:33:     '        Events and Callbacks(事件与回调)\n' +
4|metabot  | 2026-04-14 16:29:33:     '          -> \n' +
4|metabot  | 2026-04-14 16:29:33:     '        Mode of event/callback subscription(订阅方式)\n' +
4|metabot  | 2026-04-14 16:29:33:     '          -> \n' +
4|metabot  | 2026-04-14 16:29:33:     '        Receive events/callbacks through persistent connection(使用 长连接 接收事件/回调)'
4|metabot  | 2026-04-14 16:29:33: ]
4|metabot  | 2026-04-14 16:29:33: [2026-04-14 16:29:33.775 +0800] INFO: Bot info fetched
4|metabot  | 2026-04-14 16:29:33:     bot: "AI"
4|metabot  | 2026-04-14 16:29:33:     botOpenId: "ou_5067f7e307d6898248710d3ebf2aa8dc"
4|metabot  | 2026-04-14 16:29:33: [2026-04-14 16:29:33.779 +0800] INFO: Feishu bot is running
4|metabot  | 2026-04-14 16:29:33:     bot: "AI"
4|metabot  | 2026-04-14 16:29:33: [2026-04-14 16:29:33.779 +0800] INFO: Configuration
4|metabot  | 2026-04-14 16:29:33:     bot: "AI"
4|metabot  | 2026-04-14 16:29:33:     defaultWorkingDirectory: "/Users/presence79/metabot-workspace"
4|metabot  | 2026-04-14 16:29:33:     maxTurns: "unlimited"
4|metabot  | 2026-04-14 16:29:33:     maxBudgetUsd: "unlimited"
4|metabot  | 2026-04-14 16:29:33: [2026-04-14 16:29:33.779 +0800] INFO: Starting WeChat bot...
4|metabot  | 2026-04-14 16:29:33:     bot: "AI-wechat"
4|metabot  | 2026-04-14 16:29:33: [2026-04-14 16:29:33.779 +0800] INFO: Starting WeChat iLink QR login...
4|metabot  | 2026-04-14 16:29:33:     bot: "AI-wechat"
4|metabot  | 2026-04-14 16:29:33: [info]: [ '[ws]', 'ws client ready' ]
4|metabot  | 2026-04-14 16:29:33: 
4|metabot  | 2026-04-14 16:29:33: === WeChat QR Login ===
4|metabot  | 2026-04-14 16:29:33: Open this URL or scan the QR code: https://liteapp.weixin.qq.com/q/7GiQu1?qrcode=035ffdda79763ea3fbfa68fcf520d311&bot_type=3
4|metabot  | 2026-04-14 16:29:33: Waiting for scan...
4|metabot  | 2026-04-14 16:29:33: 
4|metabot  | 2026-04-14 16:29:33: [2026-04-14 16:29:33.942 +0800] INFO: QR code generated — scan with WeChat
4|metabot  | 2026-04-14 16:29:33:     bot: "AI-wechat"
4|metabot  | 2026-04-14 16:29:33:     qrUrl: "https://liteapp.weixin.qq.com/q/7GiQu1?qrcode=035ffdda79763ea3fbfa68fcf520d311&bot_type=3"
4|metabot  | 2026-04-14 16:29:33:     qrId: "035ffdda79763ea3fbfa68fcf520d311"

➜  ~ git:(main) ✗  lark-cli im +chat-search --as user --query "AI" --format pretty
chat_id                              chat_mode  chat_status  create_time           external  name                   owner_id                             description                                                              
───────────────────────────────────  ─────────  ───────────  ────────────────────  ────────  ─────────────────────  ───────────────────────────────────  ─────────────────────────────────────────────────────────────────────────
oc_146cc3910aedf40e243516f0e7b1c3cf  DEFAULT    normal       2025-12-11T02:07:35Z  true      AI Router-Claude Code  ou_8b733dd3307d23974682b776ccd1cabf                                                                           
oc_8e4ca17a35f42accdd0880357d31fe38  THREAD     normal       2020-12-03T12:13:23Z  false     爱可甜爱用户           ou_7115ccba43c4bee685788ee010fe1cfd  看到什么有意思的用户和内容都可以发 这里有什么关于内容的反馈也都可以发这里

0 chat(s) found
