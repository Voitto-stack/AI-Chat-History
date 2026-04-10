---
name: 飞书配置信息
description: 用户的飞书 Webhook 和应用配置位置
type: reference
---

用户已配置飞书（Feishu/Lark）作为主要的消息推送渠道。

## Webhook 配置
- **环境变量位置**：`~/.zshrc` 中的 `FEISHU_WEBHOOK`
- **用途**：每日早报系统使用此 Webhook 推送消息到飞书群
- **消息格式**：交互式卡片（interactive card）

## 飞书 MCP 配置
- **配置文件**：`~/.mcp.json`
- **服务器名称**：`feishu`
- **App ID**：在 `~/.claude/settings.json` 的 env 中配置
- **App Secret**：在 `~/.claude/settings.json` 的 env 中配置
- **注意**：settings.json 中也配置了 FEISHU_APP_ID 和 FEISHU_APP_SECRET

## 相关系统
- 早报推送系统使用 Webhook 方式（更简单）
- 飞书 MCP 可用于更复杂的飞书操作（如发送私聊、创建文档等）
