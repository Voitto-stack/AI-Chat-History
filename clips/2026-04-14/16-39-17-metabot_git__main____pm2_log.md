---
date: 2026-04-14T16:39:17+08:00
source: clipboard
chars: 2795
---

  metabot git:(main) ✗ pm2 logs metabot --lines 80 --nostream
[TAILING] Tailing last 80 lines for [metabot] process (change the value with --lines option)
/Users/presence79/.pm2/logs/metabot-error.log last 80 lines:
/Users/presence79/.pm2/logs/metabot-out.log last 80 lines:
5|metabot  | 
5|metabot  | > metabot@1.0.0 dev
5|metabot  | > tsx src/index.ts
5|metabot  | 
5|metabot  | [info]: [ 'client ready' ]
5|metabot  | [2026-04-14 16:37:14.436 +0800] INFO: Starting MetaBot bridge...
5|metabot  |     feishuBots: 1
5|metabot  |     telegramBots: 0
5|metabot  |     wechatBots: 1
5|metabot  |     memoryServerUrl: "http://localhost:8100"
5|metabot  | [2026-04-14 16:37:14.437 +0800] INFO: Starting Feishu bot...
5|metabot  |     bot: "AI"
5|metabot  | [info]: [ 'event-dispatch is ready' ]
5|metabot  | [info]: [
5|metabot  |   '[ws]',
5|metabot  |   'receive events or callbacks through persistent connection only available in self-build & Feishu app, Configured in:\n' +
5|metabot  |     '        Developer Console(开发者后台) \n' +
5|metabot  |     '          ->\n' +
5|metabot  |     '        Events and Callbacks(事件与回调)\n' +
5|metabot  |     '          -> \n' +
5|metabot  |     '        Mode of event/callback subscription(订阅方式)\n' +
5|metabot  |     '          -> \n' +
5|metabot  |     '        Receive events/callbacks through persistent connection(使用 长连接 接收事件/回调)'
5|metabot  | ]
5|metabot  | [2026-04-14 16:37:14.697 +0800] INFO: Bot info fetched
5|metabot  |     bot: "AI"
5|metabot  |     botOpenId: "ou_5067f7e307d6898248710d3ebf2aa8dc"
5|metabot  | [2026-04-14 16:37:14.700 +0800] INFO: Feishu bot is running
5|metabot  |     bot: "AI"
5|metabot  | [2026-04-14 16:37:14.700 +0800] INFO: Configuration
5|metabot  |     bot: "AI"
5|metabot  |     defaultWorkingDirectory: "/Users/presence79/metabot-workspace"
5|metabot  |     maxTurns: "unlimited"
5|metabot  |     maxBudgetUsd: "unlimited"
5|metabot  | [2026-04-14 16:37:14.700 +0800] INFO: Starting WeChat bot...
5|metabot  |     bot: "AI-wechat"
5|metabot  | [2026-04-14 16:37:14.701 +0800] INFO: Starting WeChat iLink QR login...
5|metabot  |     bot: "AI-wechat"
5|metabot  | 
5|metabot  | === WeChat QR Login ===
5|metabot  | Open this URL or scan the QR code: https://liteapp.weixin.qq.com/q/7GiQu1?qrcode=c6649ecb255a74e4735b4a30c41f6703&bot_type=3
5|metabot  | Waiting for scan...
5|metabot  | 
5|metabot  | [2026-04-14 16:37:14.851 +0800] INFO: QR code generated — scan with WeChat
5|metabot  |     bot: "AI-wechat"
5|metabot  |     qrUrl: "https://liteapp.weixin.qq.com/q/7GiQu1?qrcode=c6649ecb255a74e4735b4a30c41f6703&bot_type=3"
5|metabot  |     qrId: "c6649ecb255a74e4735b4a30c41f6703"
5|metabot  | [info]: [ '[ws]', 'ws client ready' ]

➜  metabot git:(main) ✗ 

