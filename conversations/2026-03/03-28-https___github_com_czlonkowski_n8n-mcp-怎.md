---
title: https://github.com/czlonkowski/n8n-mcp 怎
date: 2026-03-28T09:06:42+08:00
session_id: 2eeffecd-eb43-4212-9345-f3346547ec44
project: /Users/presence79
source: claude-code-capture
messages: 14
---

# https://github.com/czlonkowski/n8n-mcp 怎

### User (09:06:42)

https://github.com/czlonkowski/n8n-mcp 怎么给你装上这个

### User (09:07:42)

[Request interrupted by user]

### User (09:07:45)

<local-command-stdout>Set model to [1mOpus 4.6 (1M context)[22m with [1mmax[22m effort</local-command-stdout>

### User (09:07:47)

https://github.com/czlonkowski/n8n-mcp 怎么给你装上这个

### Assistant (09:11:47)

### 1) 直接执行

最简单就是把它加到你的 `~/.mcp.json` 里（你现在已经有 `chrome` 和 `feishu` 了，直接**合并新增** `n8n-mcp`）：

```json
{
  "mcpServers": {
    "chrome": { "...": "..." },
    "feishu": { "...": "..." },
    "n8n-mcp": {
      "command": "npx",
      "args": ["-y", "n8n-mcp"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true"
      }
    }
  }
}
```

如果你还要让我直接管理你的 n8n 实例（不仅是查文档），再加这两个环境变量：

```json
"N8N_API_URL": "https://your-n8n-instance.com",
"N8N_API_KEY": "your-api-key"
```

然后重启 Claude Code 会话（或刷新 MCP 配置）即可。

你要的话我可以**现在直接帮你改好 `~/.mcp.json`**。

---

### 2) 深度交互（审慎挑战）

你表面是在问“怎么安装”，但底层目标通常是两种之一：

- **A. 只想让我懂 n8n 节点/模板** → 不配 API Key 更安全  
- **B. 想让我创建/改动工作流** → 才需要 `N8N_API_URL + N8N_API_KEY`

建议先走 A（最小权限），确认流程稳定后再升到 B，避免一上来给写权限。

Sources:
- [czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp)
- [README Quick Start (npx + Claude config)](https://github.com/czlonkowski/n8n-mcp/blob/main/README.md)

### User (09:12:47)

A

### Assistant (09:13:16)

### 1) 直接执行

已按 **A 方案（仅文档/无 n8n 管理权限）** 给你加好了：`/Users/presence79/.mcp.json`

新增了 `n8n-mcp`（`stdio + error log + 禁用控制台输出`）。

你现在只需要：
1. 重启 Claude Code 会话（或刷新 MCP）
2. 让我试一个 n8n-mcp 工具（比如查某个 n8n 节点）

---

### 2) 深度交互（审慎挑战）

你选 A 很对：  
先用“最小权限”把链路跑通，再决定是否升级到 B（加 `N8N_API_URL/N8N_API_KEY`）。这样能把风险和调试成本都降到最低。

### User (09:13:46)

那接下来我可以用n8n干什么

### Assistant (09:14:16)

### 1. 直接执行

你现在（A 方案）可以把我当成 **n8n 智能顾问**，主要能做这 5 类事：

1. **选节点**：我告诉你某个需求该用哪些 n8n 节点组合  
2. **配参数**：我帮你把节点参数填好（含表达式）  
3. **查文档**：快速解释某个节点/字段/operation 的含义和坑  
4. **给模板**：按你的业务场景给出可落地 workflow 结构  
5. **做排错**：根据报错信息定位是哪个节点配置错了

你可以直接这样问我：

- “做一个 Telegram 每日汇总机器人，用 n8n 怎么搭？”  
- “HTTP Request 节点里 OAuth2 和 Header Auth 怎么选？”  
- “给我一个：Webhook -> 解析 JSON -> 写 Notion 的流程草图”  
- “这个 n8n 错误 `xxx` 是什么意思，怎么修？”

> 你当前没配 `N8N_API_URL/N8N_API_KEY`，所以我现在是**设计/指导模式**，还不能直接远程改你 n8n 实例。

---

### 2. 深度交互（审慎挑战）

你真正目标大概率不是“学 n8n”，而是“稳定自动化某个业务流程”。  
最优路径不是先学全量节点，而是先选一个高价值场景做 MVP（比如：线索收集、日报汇总、告警通知），我直接给你产出第一版流程蓝图，你再迭代。  

如果你愿意，我下一步就按你业务给你出一个 **可直接照着搭的 n8n 流程（节点级）**。

### User (09:15:32)

给我一个：Webhook -> 解析 JSON -> 写 Notion 的流程草图

### Assistant (09:15:54)

### 1) 直接执行

下面是你要的 **Webhook -> 解析 JSON -> 写 Notion** 流程草图（n8n）：

```text
[Webhook]
  POST /lead-intake
  ↓
[Set]  // 规范化字段
  title      = {{$json.body.title}}
  source     = {{$json.body.source}}
  email      = {{$json.body.email}}
  createdAt  = {{$now}}
  rawPayload = {{JSON.stringify($json.body)}}
  ↓
[IF]  // 基本校验
  条件: title is not empty AND email contains "@"
  ├─ true  → [Notion: Create Database Page]
  │           Database: 你的目标库
  │           Mapping:
  │             Name (title)      <- {{$json.title}}
  │             Source (rich text)<- {{$json.source}}
  │             Email (email)     <- {{$json.email}}
  │             Created At (date) <- {{$json.createdAt}}
  │             Raw (rich text)   <- {{$json.rawPayload}}
  │         ↓
  │       [Respond to Webhook]
  │         200 { "ok": true, "notionPageId": "..." }
  │
  └─ false → [Respond to Webhook]
              400 { "ok": false, "error": "invalid payload" }
```

**最小可用 JSON 示例（调用 Webhook 时发这个）：**
```json
{
  "title": "ACME 潜在客户",
  "source": "landing-page",
  "email": "sales@acme.com"
}
```

---

### 2) 深度交互（审慎挑战）

你现在这条链路可跑，但生产里最容易翻车的是：  
- 重复请求导致 Notion 重复写入  
- 字段变动导致映射失败（尤其是 title/date 类型）

更稳妥的下一步是加一个“幂等键”（比如 `externalId`），写入前先查是否已存在再决定 create/update。

**一个关键问题（先问一个）**：  
你这条 Webhook 的入参是固定结构吗，还是会有多个来源（字段不完全一致）？

### User (09:16:31)

怎么用n8n

### Assistant (09:16:45)

### 1) 直接执行

你可以把 n8n 理解成：**用节点拖拽实现自动化流程**。  
最快上手按这 6 步：

1. **启动 n8n**
   - 本地最省事：Docker 跑一个实例（你如果要我，我可以给你一条可直接跑的命令）。

2. **新建 Workflow**
   - 点 `New Workflow`，先做一条最小链路：  
   `Webhook -> Set -> Notion -> Respond to Webhook`

3. **配置触发器（Webhook）**
   - 选 `POST`
   - 复制测试 URL

4. **配置数据处理（Set）**
   - 把 `$json.body` 里的字段映射成规范字段（title/email/source）

5. **配置 Notion 节点**
   - 先在 Notion 创建 Integration + Token
   - 把目标 Database 分享给这个 Integration
   - 在 n8n 里建凭证并映射字段

6. **测试与发布**
   - 用 Postman/curl 发一条 JSON 到 Webhook
   - 看执行日志成功后，点 `Activate` 上线

---

### 2) 深度交互（审慎挑战）

你现在问“怎么用 n8n”，本质上更像“怎么尽快做出第一个有价值自动化”。  
最优不是先学全功能，而是先做 **一个闭环 MVP**（例如“表单线索进 Notion”），跑通后再加重试、去重、告警。

如果你同意，我下一条直接给你：  
**从 0 到可运行的本地 n8n + Notion 凭证配置清单（逐点击路径版）**。

### User (09:24:25)

可以，你给吧

### Assistant (09:25:42)

### 1) 直接执行

好，给你一套**从 0 到跑通**的最短路径（本地 Docker + Notion）：

#### Step 1: 启动 n8n（本地）
在终端运行：

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e N8N_SECURE_COOKIE=false \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

然后打开：`http://localhost:5678`  
首次会引导你创建 owner 账号。

---

#### Step 2: 在 Notion 准备数据库 + 集成
1. 在 Notion 新建一个 Database（例如 `Leads`）  
2. 新建 Notion Integration，拿到 Internal Token（像 `secret_...`）  
3. 在数据库页面右上角 `Share`，把这个 Integration 邀请进来（必须）

---

#### Step 3: n8n 新建 workflow
创建这四个节点并连接：

`Webhook -> Set -> Notion (Create Database Page) -> Respond to Webhook`

---

#### Step 4: 配置 Webhook 节点
- Method: `POST`
- Path: `lead-intake`
- Response: 先用 `Respond to Webhook` 节点处理

---

#### Step 5: 配置 Set 节点（统一字段）
新增字段（Expression）：

- `title` = `{{$json.body.title}}`
- `email` = `{{$json.body.email}}`
- `source` = `{{$json.body.source}}`
- `createdAt` = `{{$now}}`

---

#### Step 6: 配置 Notion 节点
- Resource: `Database Page`
- Operation: `Create`
- Credential: 选你刚建的 Notion Token
- Database: 选 `Leads`
- 字段映射：
  - Name(title) ← `{{$json.title}}`
  - Email ← `{{$json.email}}`
  - Source ← `{{$json.source}}`
  - Created At(date) ← `{{$json.createdAt}}`

---

#### Step 7: 配置 Respond to Webhook
返回 JSON：

```json
{
  "ok": true,
  "title": "{{$json.title}}"
}
```

---

#### Step 8: 测试
在 Webhook 的 Test URL 上发请求：


*...truncated...*

*...conversation truncated for brevity...*
