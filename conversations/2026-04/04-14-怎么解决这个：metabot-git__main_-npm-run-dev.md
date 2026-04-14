---
title: 怎么解决这个：metabot git:(main) npm run dev
date: 2026-04-14T14:34:50+08:00
session_id: 74d20caa-846b-4fff-abb0-439e81d0bdff
project: /Users/presence79/Desktop/WORK/metabot
source: claude-code-capture
messages: 1
---

# 怎么解决这个：metabot git:(main) npm run dev

### User (14:34:50)

怎么解决这个：metabot git:(main) npm run dev         

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

*...truncated...*

### Assistant (14:35:43)

我先按系统化调试来排根因，先读配置和启动相关代码。

### Assistant (14:35:55)

我先读启动与配置相关代码，确认报错发生在哪一层。

### Assistant (14:39:20)

我先核对本地配置状态，确认是不是示例配置没替换导致的。

### Assistant (14:42:13)

### 1. 直接执行

根因已经比较明确了：**不是 metabot 代码本身先坏了，而是你当前本地 `bots.json` 还在用 README 里的占位示例值**，所以 Feishu 鉴权失败，进而触发后续 WebSocket 连接异常。

证据：

- `src/index.ts:47` 启动时会直接请求 `GET /open-apis/bot/v3/info` 来拿 bot 信息。
- 你的报错正是这个接口返回 400。
- 我检查了当前本地 `bots.json`，里面 Feishu 配置仍然是示例值：
  - `project-alpha` → `feishuAppId: "cli_xxx"`, `feishuAppSecret: "secret1"`
  - `project-beta` → `feishuAppId: "cli_yyy"`, `feishuAppSecret: "secret2"`
- 这和 `bots.example.json` 完全一致，说明**你现在跑的是示例配置，不是真实机器人配置**。

对应代码位置：

- `src/config.ts:341`：如果设置了 `BOTS_CONFIG`，程序会优先读取这个 JSON。
- `src/index.ts:47`：读取配置后立刻调用 `/open-apis/bot/v3/info`。
- `src/index.ts:55`：失败时打印你看到的 warning。

所以错误链路是：

1. `.env` 里设置了 `BOTS_CONFIG`
2. 程序加载 `bots.json`
3. `bots.json` 里的 `cli_xxx/secret1` 是假值
4. Feishu token 获取失败 → `/bot/v3/info` 返回 400
5. WS 长连接也跟着报 `1000040346 system busy` 和 `PingInterval` 相关错误

你现在应该这样改：

1. 打开你的 `bots.json`
2. 把每个 Feishu bot 的这几个字段换成**飞书开放平台里真实创建的应用信息**：

```json
{
  "feishuBots": [
    {
      "name": "project-alpha",
      "feishuAppId": "cli_real_xxx",
      "feishuAppSecret": "real_secret_xxx",
      "defaultWorkingDirectory": "/你的真实项目目录"
    },
    {
      "name": "project-beta",
      "feishuAppId": "cli_real_yyy",
      "feishuAppSecret": "real_secret_yyy",
      "defaultWorkingDirectory": "/你的真实项目目录"
    }
  ]
}
```

3. 然后去 Feishu 开发者后台逐项确认：
   - 已添加 **Bot capability**
   - 已开启权限：`im:message`, `im:message:readonly`, `im:resource`, `im:chat:readonly`
   - 已开启 **persistent connection**
   - 已订阅 `im.message.receive_v1`
   - **应用版本已发布**

4. 重新启动：

```bash
npm run dev
```

如果你只想先验证一只 Feishu bot，建议先把 `bots.json` 里只保留一个 bot，排除多 bot 干扰。

另外，`defaultWorkingDirectory` 现在也是 README 里的示例路径 `/home/user/project-alpha`、`/home/user/project-beta`，在你这台 mac 上大概率也不对。虽然这不是这次 400 的直接原因，但后面 Claude 执行任务时会出问题，也一并改掉。

---

### 2. 深度交互

你这里更本质的问题不是“怎么修 400”，而是**把 example config 当成 live config 跑起来了**。

这类问题如果继续靠肉眼排查，后面还会反复踩：

- bot credential 是假值
- 工作目录是 Linux 示例路径
- 可能 Telegram / WeChat 也是示例配置


*...truncated...*

