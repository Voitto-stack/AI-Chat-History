---
title: global-macro-daily-system
date: 2026-03-28T17:43:45+08:00
session_id: 6bc2bc3f-7dcf-43da-87fa-acbc1e5f5c14
project: /Users/presence79
source: claude-code-capture
messages: 36
---

# global-macro-daily-system

### User (17:43:45)

我的openclaw接入的飞书机器人现在不能回复消息了，你看下怎么回事

### User (17:44:17)

<local-command-stdout>Set model to [1mOpus 4.6 (1M context)[22m</local-command-stdout>

### User (17:44:39)

我的openclaw启动了，接入的飞书机器人现在不能回消息了，你看下怎么回事

### User (17:45:02)

我的openclaw启动了，接入的飞书机器人现在不能回消息了，你看下怎么回事

### Assistant (17:51:06)

先说结论：你这次“启动了但不回消息”不是单点问题，是**连接层 + 路由/模型层叠加**。

### 1) 直接执行（我已查到的关键证据）

- **飞书连接不稳定**  
  在 `~/.openclaw/logs/gateway.log:59597` 有 `getaddrinfo ENOTFOUND open.feishu.cn`（DNS 解析失败）。  
  同时 `~/.openclaw/logs/gateway.log:59642`、`59644` 出现 `[ws] send data failed`，后面一直 `reconnect`。
- **进程层面是活的**  
  端口 18789/18791 都在监听，gateway 进程在跑，不是“服务没起”。
- **路由/回复层也异常**  
  `~/.openclaw/agents/router/sessions/e517...jsonl:6` 出现 `NO_REPLY`；多条 assistant message `content: []`（空输出），即使收到消息也可能回不出来。
- **当前配置只绑定一个群，且默认要@**  
  `~/.openclaw/openclaw.json:185-197` 只绑定 `oc_dd635...` 这个群；  
  `~/.openclaw/openclaw.json:234` 是 `"requireMention": true`，不@不会触发。
- **你在 12:03 收到 SIGTERM 停过一次**  
  `~/.openclaw/logs/gateway.log:59668-59670`，说明中间有重启/停止行为。

---

### 2) 你现在就可以按这个顺序修（最小闭环）

请你在终端执行（用 `!` 前缀）：

1. 停并重启 gateway（清理可能的僵状态）
   - `! openclaw gateway stop`
   - `! openclaw gateway start`

2. 立刻看实时日志（重点看 feishu/ws）
   - `! tail -f ~/.openclaw/logs/gateway.log`

3. 在飞书里做“最小触发测试”
   - 在**绑定的那个群**里，明确 `@机器人` 发一句“测试回复”
   - 观察日志是否还出现 `send data failed` / `ENOTFOUND`

4. 如果你希望“不@也回”，把 `requireMention` 改成 `false`（你确认我再帮你改）

5. 如果还是不回，下一步就是把 router 当前模型先切到稳定提供商（你现在会话里出现过 `iflow qwen3-max -> NO_REPLY` 轨迹），避免空回复链路。

---

### 深度交互（审慎挑战）

你现在的默认排障路径可能是“盯着飞书 token/权限”，但从证据看，**更底层是链路可靠性（DNS/WebSocket）+ 路由输出质量**。  
只修 AppId/AppSecret 往往不够，甚至会误判“配置都对了为什么还是不回”。

更稳的策略是三层分治：

1. **传输层**：先确保 `open.feishu.cn` 可解析、ws 不再 `send data failed`  
2. **触发层**：确认群 ID 命中 + mention 策略符合使用习惯  
3. **生成层**：确认 router 不再产出 `NO_REPLY/[]`

如果你同意，我下一步可以直接给你一套**30 秒判因脚本**（一条命令同时判网络、绑定、模型空回复），以后你自己一跑就知道卡在哪层。

### User (17:54:42)

不是，我现在不管是不是群里的还是私聊机器人都不回复，17:54:02 [feishu] feishu[default]: dispatching to agent (session=agent:router:feishu:direct:ou_06f9111ba7a24ea6e108c2f5a3d3e6c0)
17:54:02 [skills] Skipping skill path that resolves outside its configured root.
17:54:02 [agent/embedded] low context window: custom-callapi-top/claude-opus-4-6 ctx=16000 (warn<32000) source=modelsConfig
17:54:02 [tools] tools.profile (coding) allowlist contains unknown entries (apply_patch, cron). These entries won't match any tool unless the plugin is enabled.
17:54:02 [compaction-safeguard] Compaction safeguard: cancelling compaction with no real conversation messages to summarize.
17:54:04 [compaction-safeguard] Compaction safeguard: cancelling compaction with no real conversation messages to summarize.
17:54:04 [feishu] feishu[default]: dispatch complete (queuedFinal=false, replies=0)


### Assistant (17:54:52)

Please run /login · API Error: 403 {"error":{"type":"new_api_error","message":"预扣费额度失败, 用户剩余额度: ＄1.833678, 需要预扣费额度: ＄2.381240 (request id: 20260328095452724378732wOf2Misu)"},"type":"error"}

### User (18:33:30)

继续？

### Assistant (18:34:29)

根因已经很清楚了。从你贴的日志逐行看：

**核心问题：模型返回空内容 → replies=0**

证据链：
1. `dispatching to agent` — 飞书消息**已成功接收并转发**给 router agent，飞书通道没问题
2. `low context window: custom-callapi-top/claude-opus-4-6 ctx=16000` — 上下文只有 16K
3. `compaction-safeguard: cancelling compaction with no real conversation messages` — 系统认为没有真正的对话消息
4. `dispatch complete (replies=0)` — 模型没产出任何回复

再结合我从 session 日志里看到的：**所有 `callapi`/`custom-callapi-top` 的 assistant 回复都是 `content:[]`，`usage: {input:0, output:0}`** — 输入 token 都是 0，说明请求根本没被正确处理。

**根因**：你当前配置里 `custom-callapi-top` 用的是 `"api": "openai-completions"`，但 `.bak`（3月21日之前）用的是 `"api": "anthropic-messages"`。今天凌晨 04:29 的 `configure` 操作把 API 格式改了，callapi.top 代理 Claude 模型走 openai-completions 格式解析不正确，返回空响应。

**修复方案**：把 router 默认模型切到你配好的 `custom-api-aicodewith-com/claude-opus-4-6`（anthropic-messages 格式、200K 上下文），或者把 `custom-callapi-top` 的 api 改回 `anthropic-messages`。

你要我直接改哪个？
- **方案 A**：改 `agents.defaults.model.primary` 为 `custom-api-aicodewith-com/claude-opus-4-6`（最快，不动 provider）
- **方案 B**：把 `custom-callapi-top` 的 `api` 从 `openai-completions` 改回 `anthropic-messages`，同时把 `contextWindow` 调大

### User (18:36:36)

我改了配置，你再重新reiview一下

### Assistant (18:37:08)

你改的几个关键点我确认下：

**已修好的：**
- `callapi` 和 `custom-callapi-top` 的 `api` 都改回 `anthropic-messages` 了 — 这是之前空回复的根因，对了
- `requireMention` 改成 `false` — 私聊/群聊都不需要@了
- `tools.allow` 改成 `["*"]` — 不会再报 unknown entries 了
- router 和 writer 的 model 都切到了 `iflow/qwen3-max`

**还有问题的：**

1. **`custom-callapi-top` 的 `contextWindow: 16000` 仍然很小**（第102行）。如果后面切回这个 provider，同样的 `low context window` 警告还会出现。建议改到至少 `200000`。

2. **`callapi/claude-opus-4-6` 没设 `contextWindow` 和 `maxTokens`**（第35-43行）。openclaw 可能会用默认值，不一定合理。建议补上。

3. **router 现在走 `iflow/qwen3-max`**（第157行）。iflow 用的是 `openai-completions` API，qwen3-max 本身支持这个格式没问题。但你之前 session 日志里 qwen3-max 回过 `NO_REPLY`（路由判断不需要回复），要确认 iflow 的 key 额度和连通性。

4. **`callapi` 和 `custom-callapi-top` 指向同一个地址和 key**，但配置不同（一个没设 contextWindow，一个设了 16K）。这是冗余，容易混淆。建议统一成一个 provider。

现在你重启 gateway 试了吗？如果还没回消息，贴一下最新的日志我看。

### User (18:38:28)

18:38:17 [feishu] feishu[default]: received message from ou_06f9111ba7a24ea6e108c2f5a3d3e6c0 in oc_329847038435dad6aa5e002dd84e557f (p2p)
18:38:17 [feishu] feishu[default]: dispatching to agent (session=agent:router:feishu:direct:ou_06f9111ba7a24ea6e108c2f5a3d3e6c0)
18:38:17 [skills] Skipping skill path that resolves outside its configured root.
18:38:17 [tools] tools.profile (coding) allowlist contains unknown entries (apply_patch, cron). These entries won't match any tool unless the plugin is enabled.
18:38:18 [feishu] feishu[default]: dispatch complete (queuedFinal=false, replies=0)



### Assistant (18:38:46)

还是 `replies=0`，而且这次连 model 调用的日志都没有（没有 `[agent/embedded]` 行）。agent 根本没走到模型调用就结束了。

关键线索是 `Skipping skill path that resolves outside its configured root` — agent 在加载阶段就被拦住了。

### Assistant (18:47:13)

iflow API 是通的，qwen3-max 正常返回。问题不在 API。

让我看下最新的 router session，确认模型到底返回了什么：

### Assistant (18:47:46)

找到根因了。从 sessions.json 看：

```
session: agent:router:feishu:direct:ou_06f9...
inputTokens: 16396, outputTokens: 2
modelProvider: iflow, model: qwen3-max
```

**两个问题叠加：**

**问题 1：旧 session 已中毒**。session `e5170426` 从之前 callapi 返回空响应时代就一直在用。里面积累了十几条 `content:[]` 的空 assistant 消息。新消息进来时，模型看到的上下文全是"问→空→问→空"的垃圾历史。

**问题 2：ROUTER.md 只会分发，不会直接回**。你的 ROUTER.md 写死了"You NEVER solve tasks yourself"，只能路由到 coder 或 writer。用户发个"你好"之类的消息，router 判定不是 coding 也不是 writing，直接返回 `NO_REPLY`（2 tokens），gateway 就当 replies=0。

**修复步骤**：

1. **清掉旧 session**（最关键）— 在 openclaw 终端执行：
   ```
   openclaw sessions reset
   ```
   或者直接删掉 session 文件：
   ```
   rm ~/.openclaw/agents/router/sessions/e5170426-e0ba-4742-99bd-abfc49702915.jsonl
   ```

2. **改 ROUTER.md**，加一条兜底规则让 router 能直接回复一般对话，而不是只有 coder/writer 两个出口。比如加一段：
   ```
   ### General conversation
   If the task does not fit coding or writing, respond directly to the user.
   ```

你要我直接帮你改 ROUTER.md 吗？

### User (18:48:25)

那你改吧

### Assistant (18:50:09)

已完成两件事：

1. **删掉了中毒的 session 文件** `e5170426...jsonl`
2. **改了 ROUTER.md** — 去掉"NEVER solve tasks yourself"，加了 General conversation 兜底规则

现在重启 gateway 再试一下私聊：

```
openclaw gateway stop && openclaw gateway start
```

然后飞书发消息看日志里 `replies` 是否 > 0。

### User (18:50:46)

还是0

### Assistant (19:28:08)

API Error: 402 {"error":{"type":"insufficient_quota","message":"已达到每日费用限制 ($60)","code":"daily_cost_limit_exceeded"},"currentCost":60.0980291,"costLimit":60,"resetAt":"2026-03-29T07:00:00.000Z"}

### User (19:28:21)

还是0

### Assistant (19:28:39)

sessions.json 里还残留着旧 session 的元数据，gateway 加载时可能出错。我需要把那条也清掉。

### Assistant (19:29:15)

gateway 重建了 session 但用的还是旧的系统提示（`systemSent: true` 导致不会重新发送更新后的 ROUTER.md）。需要彻底清掉这条 session 元数据。

先停 gateway，你在终端执行：
```
openclaw gateway stop
```

然后我来清理 sessions.json。

### Assistant (19:30:01)

好了，sessions.json 里的 `feishu:direct` 入口和对应 `.jsonl` 文件都删干净了。

现在重启 gateway 再测：

```
openclaw gateway start
```

这次 gateway 会为你的私聊创建一个全新 session，加载更新后的 ROUTER.md（有 general conversation 兜底），系统提示会重新生成。飞书发条消息试试。

### User (19:30:50)

还是不行啊，你看看openclaw配置有没有问题

### Assistant (19:32:18)

找到了。新 session 里 qwen3-max 还是返回 `NO_REPLY`。这不是 ROUTER.md 的问题了 — 是 OpenClaw 内置系统提示里有 `NO_REPLY` 指令，qwen3-max 对复杂系统提示理解不好，直接输出了最短的安全回复。

让我查下系统提示里 `NO_REPLY` 的来源：

### Assistant (19:32:45)

`NO_REPLY` 是 OpenClaw 内置的"静默回复"标记。qwen3-max 每次都选择输出 `NO_REPLY`。让我看看系统提示里哪里教了它这个：

### Assistant (19:32:59)

找到了！`AGENTS.md:85` 明确写了 **"Stay silent (HEARTBEAT_OK) when: It's just casual banter..."**。qwen3-max 把这条规则过度泛化了，对所有简单消息都输出静默。

而且这是**私聊**，不是群聊。AGENTS.md 里的静默规则是给群聊设计的。问题出在 qwen3-max 分不清上下文。

**根本问题：iflow/qwen3-max 对 OpenClaw 的复杂系统提示理解能力不够，总是走 NO_REPLY 路径。**

两个修复方向：

1. **换模型**（推荐）— router 改用 `custom-api-aicodewith-com/claude-opus-4-6` 或 `callapi/claude-opus-4-6`，Claude 对这种复杂系统提示的理解好得多。
2. **改 AGENTS.md** — 在私聊场景下禁用静默规则。

你要哪个方案？还是两个都改？

*...conversation truncated for brevity...*
