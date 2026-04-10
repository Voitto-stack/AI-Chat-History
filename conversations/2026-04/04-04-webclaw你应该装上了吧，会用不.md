---
title: webclaw你应该装上了吧，会用不
date: 2026-04-04T20:07:15+08:00
session_id: b7ea9a7b-d91f-48da-9c6b-0874ae4047cb
project: /Users/presence79
source: claude-code-capture
messages: 2
---

# webclaw你应该装上了吧，会用不

### User (20:07:15)

webclaw你应该装上了吧，会用不

### Assistant (20:09:36)

让我检查一下当前可用的 MCP 工具：

### Assistant (20:10:06)

## 1. 直接回答

**没装**。你的 `.mcp.json` 里只有这四个服务器：
- chrome（浏览器自动化）
- feishu（飞书集成）
- n8n-mcp（工作流）
- replicate（AI 模型）

## 2. 深度交互

**你想用 webclaw 做什么？**

从名字看，webclaw 应该是网页抓取/爬虫工具。但你已经有了：
- **Chrome MCP**（可控浏览器，能处理 JS 渲染、登录、交互）
- **WebFetch/WebSearch**（内置的静态抓取和搜索）

如果是：
- **需要处理复杂 SPA/动态内容** → Chrome MCP 更强
- **简单静态抓取** → WebFetch 够用
- **批量爬虫/反检测** → webclaw 可能才有优势

**先说你的实际需求，我判断是否真需要装 webclaw**，还是现有工具就能解决。

### User (20:10:52)

我要你装上这个mcp：https://github.com/kuroko1t/webclaw

### Assistant (20:12:47)

## 1. 直接执行

好的，马上安装 webclaw。这是一个基于 Chrome 扩展的浏览器自动化 MCP，相比你现有的 chrome MCP（基于 CDP），它的优势是：
- 运行在真实 Chrome 扩展里，能用你已登录的会话和 cookies
- 抗机器人检测
- token 使用减少 51%-79%

### Assistant (20:13:58)

✅ **已添加 webclaw 配置到 `.mcp.json`**

**需要重启 Claude Code 才能生效**（关闭并重新打开）。

重启后，webclaw 会在第一次调用工具时自动启动 Chrome，并扫描端口 18080-18089。

---

## 2. 深度交互

**你现在有两个浏览器 MCP 了**：
- **chrome**（CDP 方式，无状态，每次新会话）
- **webclaw**（扩展方式，复用你的登录状态，抗检测）

**使用场景区分**：
- 需要**登录状态**（Gmail、Twitter、LinkedIn 等）→ webclaw
- 需要**隐私隔离**或**并发多实例** → chrome（CDP）
- 需要**绕过机器人检测** → webclaw
- **token 成本敏感**的长会话 → webclaw（省 50%-80% token）

**潜在问题**：两个工具功能重叠，我该怎么选？需要我在特定场景下自动选择，还是你会明确指定用哪个？

---

**Sources:**
- [GitHub - kuroko1t/webclaw](https://github.com/kuroko1t/webclaw)
- [WebClaw | MCP Servers](https://lobehub.com/mcp/kuroko1t-webclaw)

