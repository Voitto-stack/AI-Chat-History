---
date: 2026-04-14T14:33:30+08:00
source: clipboard
chars: 10763
---

metabot git:(main) npm run dev         

> metabot@1.0.0 dev
> tsx src/index.ts

[info]: [ 'client ready' ]
[info]: [ 'client ready' ]
[warn]: [ 'failed to obtain token' ]
[warn]: [ 'failed to obtain token' ]
[error]: [
  AxiosError: Request failed with status code 400
      at settle (/Users/presence79/Desktop/WORK/metabot/node_modules/axios/lib/core/settle.js:19:12)
      at IncomingMessage.handleStreamEnd (/Users/presence79/Desktop/WORK/metabot/node_modules/axios/lib/adapters/http.js:798:11)
      at IncomingMessage.emit (node:events:520:22)
      at endReadableNT (node:internal/streams/readable:1729:12)
      at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
      at Axios.request (/Users/presence79/Desktop/WORK/metabot/node_modules/axios/lib/core/Axios.js:46:41)
      at process.processTicksAndRejections (node:internal/process/task_queues:104:5) {
    isAxiosError: true,
    code: 'ERR_BAD_REQUEST',
    config: {
      transitional: [Object],
      adapter: [Array],
      transformRequest: [Array],
      transformResponse: [Array],
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      env: [Object],
      validateStatus: [Function: validateStatus],
      headers: [Object [AxiosHeaders]],
      method: 'get',
      url: 'https://open.feishu.cn/open-apis/bot/v3/info',
      params: {},
      allowAbsoluteUrls: true,
      data: undefined
    },
    request: ClientRequest {
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      destroyed: true,
      _last: true,
      chunkedEncoding: false,
      shouldKeepAlive: true,
      maxRequestsOnConnectionReached: false,
      _defaultKeepAlive: true,
      useChunkedEncodingByDefault: false,
      sendDate: false,
      _removedConnection: false,
      _removedContLen: false,
      _removedTE: false,
      strictContentLength: false,
      _contentLength: 0,
      _hasBody: true,
      _trailer: '',
      finished: true,
      _headerSent: true,
      _closed: true,
      _header: 'GET /open-apis/bot/v3/info HTTP/1.1\r\n' +
        'Accept: application/json, text/plain, */*\r\n' +
        'User-Agent: oapi-node-sdk/1.0.0\r\n' +
        'Accept-Encoding: gzip, compress, deflate, br\r\n' +
        'Host: open.feishu.cn\r\n' +
        'Connection: keep-alive\r\n' +
        '\r\n',
      _keepAliveTimeout: 0,
      _onPendingData: [Function: nop],
      agent: [Agent],
      socketPath: undefined,
      method: 'GET',
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      joinDuplicateHeaders: undefined,
      _ended: true,
      res: [IncomingMessage],
      aborted: false,
      timeoutCb: null,
      upgradeOrConnect: false,
      parser: null,
      maxHeadersCount: null,
      reusedSocket: true,
      host: 'open.feishu.cn',
      protocol: 'https:',
      _redirectable: [Writable],
      Symbol(shapeMode): false,
      Symbol(kCapture): false,
      Symbol(kBytesWritten): 0,
      Symbol(kNeedDrain): false,
      Symbol(corked): 0,
      Symbol(kChunkedBuffer): [],
      Symbol(kChunkedLength): 0,
      Symbol(kSocket): [TLSSocket],
      Symbol(kOutHeaders): [Object: null prototype],
      Symbol(errored): null,
      Symbol(kHighWaterMark): 65536,
      Symbol(kRejectNonStandardBodyWrites): false,
      Symbol(kPath): '/open-apis/bot/v3/info',
      Symbol(kUniqueHeaders): null
    },
    response: {
      status: 400,
      statusText: 'Bad Request',
      headers: [Object [AxiosHeaders]],
      config: [Object],
      request: [ClientRequest],
      data: [Object]
    },
    status: 400
  }
]
[info]: [ 'event-dispatch is ready' ]
[info]: [
  '[ws]',
  'receive events or callbacks through persistent connection only available in self-build & Feishu app, Configured in:\n' +
    '        Developer Console(开发者后台) \n' +
    '          ->\n' +
    '        Events and Callbacks(事件与回调)\n' +
    '          -> \n' +
    '        Mode of event/callback subscription(订阅方式)\n' +
    '          -> \n' +
    '        Receive events/callbacks through persistent connection(使用 长连接 接收事件/回调)'
]
[2026-04-14 14:32:28.424 +0800] INFO: Starting MetaBot bridge...
    feishuBots: 2
    telegramBots: 1
    wechatBots: 1
    memoryServerUrl: "http://localhost:8100"
[2026-04-14 14:32:28.424 +0800] INFO: Starting Feishu bot...
    bot: "project-alpha"
[2026-04-14 14:32:28.443 +0800] INFO: Starting Feishu bot...
    bot: "project-beta"
[2026-04-14 14:32:28.572 +0800] WARN: Failed to fetch bot info. Check: 1) Bot capability is enabled in Feishu app 2) App is published 3) App credentials are correct
    bot: "project-beta"
    err: "Request failed with status code 400"
[2026-04-14 14:32:28.575 +0800] INFO: Feishu bot is running
    bot: "project-beta"
[2026-04-14 14:32:28.575 +0800] INFO: Configuration
    bot: "project-beta"
    defaultWorkingDirectory: "/home/user/project-beta"
    maxTurns: 30
    maxBudgetUsd: 0.5
[error]: [
  AxiosError: Request failed with status code 400
      at settle (/Users/presence79/Desktop/WORK/metabot/node_modules/axios/lib/core/settle.js:19:12)
      at IncomingMessage.handleStreamEnd (/Users/presence79/Desktop/WORK/metabot/node_modules/axios/lib/adapters/http.js:798:11)
      at IncomingMessage.emit (node:events:520:22)
      at endReadableNT (node:internal/streams/readable:1729:12)
      at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
      at Axios.request (/Users/presence79/Desktop/WORK/metabot/node_modules/axios/lib/core/Axios.js:46:41)
      at process.processTicksAndRejections (node:internal/process/task_queues:104:5) {
    isAxiosError: true,
    code: 'ERR_BAD_REQUEST',
    config: {
      transitional: [Object],
      adapter: [Array],
      transformRequest: [Array],
      transformResponse: [Array],
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      env: [Object],
      validateStatus: [Function: validateStatus],
      headers: [Object [AxiosHeaders]],
      method: 'get',
      url: 'https://open.feishu.cn/open-apis/bot/v3/info',
      params: {},
      allowAbsoluteUrls: true,
      data: undefined
    },
    request: ClientRequest {
      _events: [Object: null prototype],
      _eventsCount: 7,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      destroyed: true,
      _last: true,
      chunkedEncoding: false,
      shouldKeepAlive: true,
      maxRequestsOnConnectionReached: false,
      _defaultKeepAlive: true,
      useChunkedEncodingByDefault: false,
      sendDate: false,
      _removedConnection: false,
      _removedContLen: false,
      _removedTE: false,
      strictContentLength: false,
      _contentLength: 0,
      _hasBody: true,
      _trailer: '',
      finished: true,
      _headerSent: true,
      _closed: true,
      _header: 'GET /open-apis/bot/v3/info HTTP/1.1\r\n' +
        'Accept: application/json, text/plain, */*\r\n' +
        'User-Agent: oapi-node-sdk/1.0.0\r\n' +
        'Accept-Encoding: gzip, compress, deflate, br\r\n' +
        'Host: open.feishu.cn\r\n' +
        'Connection: keep-alive\r\n' +
        '\r\n',
      _keepAliveTimeout: 0,
      _onPendingData: [Function: nop],
      agent: [Agent],
      socketPath: undefined,
      method: 'GET',
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      joinDuplicateHeaders: undefined,
      _ended: true,
      res: [IncomingMessage],
      aborted: false,
      timeoutCb: null,
      upgradeOrConnect: false,
      parser: null,
      maxHeadersCount: null,
      reusedSocket: true,
      host: 'open.feishu.cn',
      protocol: 'https:',
      _redirectable: [Writable],
      Symbol(shapeMode): false,
      Symbol(kCapture): false,
      Symbol(kBytesWritten): 0,
      Symbol(kNeedDrain): false,
      Symbol(corked): 0,
      Symbol(kChunkedBuffer): [],
      Symbol(kChunkedLength): 0,
      Symbol(kSocket): [TLSSocket],
      Symbol(kOutHeaders): [Object: null prototype],
      Symbol(errored): null,
      Symbol(kHighWaterMark): 65536,
      Symbol(kRejectNonStandardBodyWrites): false,
      Symbol(kPath): '/open-apis/bot/v3/info',
      Symbol(kUniqueHeaders): null
    },
    response: {
      status: 400,
      statusText: 'Bad Request',
      headers: [Object [AxiosHeaders]],
      config: [Object],
      request: [ClientRequest],
      data: [Object]
    },
    status: 400
  }
]
[info]: [ 'event-dispatch is ready' ]
[info]: [
  '[ws]',
  'receive events or callbacks through persistent connection only available in self-build & Feishu app, Configured in:\n' +
    '        Developer Console(开发者后台) \n' +
    '          ->\n' +
    '        Events and Callbacks(事件与回调)\n' +
    '          -> \n' +
    '        Mode of event/callback subscription(订阅方式)\n' +
    '          -> \n' +
    '        Receive events/callbacks through persistent connection(使用 长连接 接收事件/回调)'
]
[error]: [ '[ws]', 'code: 1000040346, system busy' ]
[2026-04-14 14:32:28.594 +0800] WARN: Failed to fetch bot info. Check: 1) Bot capability is enabled in Feishu app 2) App is published 3) App credentials are correct
    bot: "project-alpha"
    err: "Request failed with status code 400"
[error]: [
  '[ws]',
  "Cannot read properties of undefined (reading 'PingInterval')"
]
[error]: [ '[ws]', 'connect failed' ]
[info]: [ '[ws]', 'reconnect' ]
[info]: [ '[ws]', 'ws client ready' ]
[2026-04-14 14:32:28.596 +0800] INFO: Feishu bot is running
    bot: "project-alpha"
[2026-04-14 14:32:28.596 +0800] INFO: Configuration
    bot: "project-alpha"
    defaultWorkingDirectory: "/home/user/project-alpha"
    maxTurns: "unlimited"
    maxBudgetUsd: "unlimited"
[2026-04-14 14:32:28.597 +0800] INFO: Starting Telegram bot...
    bot: "tg-project"
[error]: [ '[ws]', 'code: 1000040346, system busy' ]
[error]: [
  '[ws]',
  "Cannot read properties of undefined (reading 'PingInterval')"
]
[error]: [ '[ws]', 'connect failed' ]
[info]: [ '[ws]', 'reconnect' ]
[info]: [ '[ws]', 'ws client ready' ]
[error]: [ '[ws]', 'code: 1000040346, system busy' ]
[error]: [
  '[ws]',
  "Cannot read properties of undefined (reading 'PingInterval')"
]
[info]: [ 'ws', 'unable to connect to the server after trying 1 times")' ]
[error]: [ '[ws]', 'code: 1000040346, system busy' ]
[error]: [
  '[ws]',
  "Cannot read properties of undefined (reading 'PingInterval')"
]
[info]: [ 'ws', 'unable to connect to the server after trying 1 times")' ]


