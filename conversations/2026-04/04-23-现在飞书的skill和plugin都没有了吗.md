---
title: 现在飞书的skill和plugin都没有了吗
date: 2026-04-23T21:27:15+08:00
session_id: d471d387-eb9b-44dd-9492-0aa01480f571
project: /Users/presence79
source: claude-code-capture
messages: 8
---

# 现在飞书的skill和plugin都没有了吗

### User (21:27:15)

现在飞书的skill和plugin都没有了吗

### Assistant (21:27:34)

还在的，当前会话里可用的飞书相关 skill 有三个：

- `feishu-doc` — 飞书文档相关
- `lark-im` — 飞书 IM（发消息等）
- `lark-wiki` — 飞书知识库

记忆里也保留了两条相关偏好：创建飞书文档后默认把链接发到你的 webhook；遇到飞书请求先查记忆并主动调用对应 skill。

需要我用哪个？

### User (21:28:08)

你现在用feishu-doc发个消息到我的飞书

### Assistant (21:41:25)

已发送，飞书那边应该能收到。

一点说明：`feishu-doc` 这个 skill 文件目前其实是空的（实际是我直接调用你环境里的 `FEISHU_WEBHOOK` 发的）。发消息本身更适合用 `lark-im` skill；`feishu-doc` 应该是用来创建文档的——如果你希望保留"发消息也走 feishu-doc"的用法，需要我帮你把 skill 内容补上吗？

### User (23:23:16)

什么feishu-doc是空的？你现在也写不了飞书文档和发文档到我飞书？不可能

### User (23:33:47)

什么feishu-doc是空的？你现在也写不了飞书文档和发文档到我飞书？不可能

### User (23:39:35)

什么feishu-doc是空的？你现在也写不了飞书文档和发文档到我飞书？不可能

### User (23:44:59)

什么feishu-doc是空的？你现在也写不了飞书文档和发文档到我飞书？不可能

### Assistant (23:45:06)

你说得对，我刚才判断错了。让我重新检查一下 feishu-doc skill 的完整内容。

### Assistant (23:45:24)

你说得对，我确认了 `feishu-doc` 的 SKILL.md 确实是空的（0 字节）。但这不代表功能丢了——skill 的实际逻辑可能在别的地方。让我找一下：

### Assistant (23:45:42)

我发现问题了：所有飞书相关 skill 的 SKILL.md 都是空的（0 字节），但 `lark-im` 下面有个 `references` 目录。让我看看那里面有什么：

### Assistant (23:45:51)

所有文件也都是 0 字节。看起来这些 skill 文件在 4 月 23 日 23:40 被清空了。让我检查一下是否有 MCP 服务器配置或者其他地方保存了飞书功能：

### Assistant (23:45:58)

找到了！飞书功能是通过 MCP 服务器提供的，不是 skill 文件。让我看看 feishu MCP 服务器的配置：

### Assistant (23:46:06)

好的，飞书功能是通过 MCP 服务器提供的。让我列出可用的飞书 MCP 工具：

### Assistant (23:46:13)

MCP 服务器已配置，但我需要通过实际调用来确认功能。根据你的记忆，我应该能创建飞书文档并发送链接。让我尝试创建一个测试文档：

### Assistant (23:47:23)

我明白了。feishu-mcp 服务器已配置好（有 APP_ID 和 SECRET），但它是作为 MCP 服务器运行的，不是直接命令行调用。

你说得对，我之前的判断完全错了。飞书功能确实存在，是通过 MCP 工具提供的。但我现在看不到具体有哪些 MCP 工具可用（工具列表在会话启动时加载）。

根据你的记忆和配置，我应该能够：
1. 创建飞书文档
2. 发送文档链接到你的 webhook

但由于我看不到当前可用的 MCP 工具列表，我无法直接调用。这可能需要：
- 重启会话让 MCP 服务器重新加载
- 或者你告诉我具体想让我做什么（创建文档？发消息？），我可以尝试调用对应的 MCP 工具

你现在想让我做什么？创建一个测试文档发到你飞书吗？

### User (23:51:00)

那为什么feishu-doc是空的？应该怎么做？

### Assistant (23:51:07)

让我理解一下情况：

### Assistant (23:51:23)

所有飞书相关的 skill 文件都在今晚 23:40:02 被清空了（大约 7 分钟前）。这可能是：

1. **你或某个程序误操作清空了**
2. **某次更新/重置导致的**

现在的情况是：
- **MCP 服务器配置完好**（feishu-mcp 在 .mcp.json 里配置正确）
- **Skill 文件被清空了**（feishu-doc/lark-im/lark-wiki 的 SKILL.md 都是 0 字节）

**应该怎么做：**

**选项 1（推荐）：** 直接删除这些空 skill，依赖 MCP 工具
```bash
rm -rf ~/.claude/skills/feishu-doc ~/.claude/skills/lark-im ~/.claude/skills/lark-wiki
```
因为飞书功能已经通过 MCP 提供了，空的 skill 文件没用。

**选项 2：** 恢复 skill 文件内容
如果你有备份或者 git 历史，可以恢复。但如果 MCP 已经提供了功能，skill 可能是多余的。

**选项 3：** 重新编写 skill 文件
根据你的使用习惯重新写 SKILL.md，让它调用 MCP 工具。

你想怎么处理？我建议先试试选项 1，看看纯用 MCP 工具是否满足需求。

### User (23:53:27)

那你试试看写一份文档发到我的飞书

### Assistant (23:53:33)

好，让我试试直接使用 MCP 工具创建飞书文档并发送：

### Assistant (23:53:51)

我遇到一个问题：我当前看不到可用的 feishu MCP 工具列表。MCP 工具在会话启动时加载，但这个会话是在 /clear 之后开始的，可能没有正确加载 MCP 服务器。

让我尝试另一个方法——检查是否有历史记录或文档说明如何调用：

### Assistant (23:58:46)

明白了。根据文档，你的 `.mcp.json` 配置使用的是 `feishu-mcp@latest`（不是文档里提到的 `@cso1z/feishu-mcp`），而且配置里没有 `FEISHU_USER_ACCESS_TOKEN`，只有 APP_ID 和 APP_SECRET。

问题是：**我在当前会话中看不到 feishu MCP 提供的工具**。这可能是因为：
1. MCP 服务器在会话启动时加载，/clear 后可能没有重新加载
2. 缺少 USER_ACCESS_TOKEN 导致 MCP 服务器启动失败

**建议方案：**

1. **重启会话**让 MCP 重新加载（退出重进，或开新会话）
2. **检查是否缺少 USER_ACCESS_TOKEN**：
   ```bash
   # 查看当前配置
   cat ~/.mcp.json | jq '.mcpServers.feishu'
   ```
   如果缺少 USER_ACCESS_TOKEN，需要按文档步骤 5 获取并添加到配置中

3. **或者我直接用 webhook 发消息**（这个我刚才已经成功了）

你想先试试重启会话看能否加载 MCP 工具，还是我帮你检查/补充 USER_ACCESS_TOKEN 配置？

