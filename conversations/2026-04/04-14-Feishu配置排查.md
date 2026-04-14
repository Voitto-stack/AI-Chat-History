---
title: Feishu配置排查
date: 2026-04-14 14:39:42
model: gpt-5.4
messages: 4
---

# Feishu配置排查

### User (14:32:28)
怎么解决这个：metabot git:(main) npm run dev

> metabot@1.0.0 dev
> tsx src/index.ts

[info]: [ 'client ready' ]
[info]: [ 'client ready' ]
[warn]: [ 'failed to obtain token' ]
[warn]: [ 'failed to obtain token' ]
[error]: [AxiosError: Request failed with status code 400 ...]
...
，你看下这个项目目前应该是安装和配置过的https://github.com/xvirobotics/metabot/blob/main/README.md

### Assistant (14:39:42)
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

### 2. 深度交互
你这里更本质的问题不是“怎么修 400”，而是**把 example config 当成 live config 跑起来了**。

这类问题如果继续靠肉眼排查，后面还会反复踩：
- bot credential 是假值
- 工作目录是 Linux 示例路径
- 可能 Telegram / WeChat 也是示例配置

更稳的做法其实是二选一：

- **方案 A：先缩成最小可运行配置**
  只保留 1 个 Feishu bot，先跑通，再加 Telegram / WeChat / 第二个 Feishu bot。
- **方案 B：给启动时加配置校验**
  在加载 `bots.json` 后，启动前直接拒绝明显的示例值，比如：`cli_xxx`、`secret1`、`/home/user/...`，这样问题会在启动第一秒暴露，而不是等到 API 400 才看到。

如果你愿意，我下一步可以直接帮你做两件事之一：
1. **帮你把当前 `bots.json` 改成可用结构**（你填真实密钥）
2. **直接在代码里加“示例配置拦截校验”**，以后启动时就不会再被这种假配置坑到
