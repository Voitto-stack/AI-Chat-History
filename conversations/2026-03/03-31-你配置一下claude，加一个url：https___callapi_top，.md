---
title: 你配置一下claude，加一个url：https://callapi.top，
date: 2026-03-31T19:50:20+08:00
session_id: 373f965f-b607-4b6c-a7c3-1559c5c6c8a8
project: /Users/presence79/Desktop/WORK/sitin-monorepo-dev
source: claude-code-capture
messages: 5
---

# 你配置一下claude，加一个url：https://callapi.top，

### User (19:50:20)

你配置一下claude，加一个url：https://callapi.top， key：sk-tjQKdiVSufM9w1Odnnng8hhiiJqsSgMU5e8h6VqcSsnmM7L6，应该能用GPT模型，你试试

### User (19:51:21)

[Request interrupted by user]

### User (19:51:23)

<local-command-stdout>Set model to [1mOpus 4.6 (1M context)[22m</local-command-stdout>

### User (19:51:25)

你配置一下claude，加一个url：https://callapi.top， key：sk-tjQKdiVSufM9w1Odnnng8hhiiJqsSgMU5e8h6VqcSsnmM7L6，应该能用GPT模型，你试试

### Assistant (19:51:54)

Claude Code 只支持 Claude 模型，**不支持 GPT 模型**。它是 Anthropic 官方的 CLI 工具，只能调用 Claude API。

如果这个代理地址同时也转发 Anthropic/Claude API，可以通过环境变量来配置：

```bash
export ANTHROPIC_BASE_URL=https://callapi.top
export ANTHROPIC_API_KEY=sk-tjQK...M7L6
```

但有几个问题需要注意：

1. **GPT 模型不可用** — Claude Code 的所有提示词、工具调用格式都是为 Claude 设计的，即使代理能转发到 OpenAI，Claude Code 也无法使用
2. **安全风险** — 第三方代理会看到你所有的对话内容和代码，包括整个仓库的上下文
3. **你的 API Key 已经暴露在对话中了** — 建议你在代理平台上轮换（重置）这个 key

如果你想用 GPT 模型做开发辅助，建议直接使用 OpenAI 的官方工具（如 ChatGPT、Codex CLI），或者支持多模型的工具（如 Cursor、Continue 等）。

需要我帮你做其他配置吗？

### User (10:00:04)

你分析一下这个项目，如果有图片资源的话，这个图片资源放在哪，还是从cdn上拿？

### Assistant (10:00:25)

API Error: 400 {"error":{"code":"E005","message":"InvokeModelWithResponseStream: operation error Bedrock Runtime: InvokeModelWithResponseStream, https response error StatusCode: 400, RequestID: f3890d50-6d55-4037-8727-b686e15b6050, ValidationException: ***.***.content.0: Invalid `signature` in `thinking` block   (request id: 20260401100018352249870vRrrp3es) (request id: 20260401020017667392075PPj7Lsb0) (request id: 20260401100007385993104Pvv9lA1P)"},"status":400}

