---
title: openclaw飞书不回消息排查
date: 2026-03-28 17:50:08
model: claude-opus-4-6
messages: 14
---

# openclaw飞书不回消息排查

### User (17:50:08)
我的openclaw启动了，接入的飞书机器人现在不能回消息了，你看下怎么回事

### Assistant (17:50:08)
初步排查发现：DNS解析失败(ENOTFOUND open.feishu.cn)、WebSocket send data failed、session中大量空回复content:[]。给出三层分治排查方向。

### User (17:54:02)
不管群里还是私聊都不回复，贴出日志：dispatching to agent → low context window ctx=16000 → compaction-safeguard → dispatch complete replies=0

### Assistant (17:55:00)
定位到根因：custom-callapi-top 的 api 字段从 anthropic-messages 被改成 openai-completions，导致空响应。建议改回 anthropic-messages 或切 provider。

### User (18:10:00)
用户自行改了配置，要求 review。

### Assistant (18:15:00)
Review 发现：api 字段已改回，requireMention 改成 false，但 contextWindow 仍为 16000，且 router/writer 都切到了 iflow/qwen3-max。

### User (18:38:00)
改完重启后还是 replies=0，贴出新日志。

### Assistant (18:40:00)
发现连 [agent/embedded] 日志都没有了，模型根本没被调用。从 /tmp/openclaw 详细日志中定位到 skills 路径警告。验证 iflow API 本身可用。

### User (18:50:00)
又试了还是不行。

### Assistant (19:00:00)
从 sessions.json 发现 outputTokens:2 → 模型返回 NO_REPLY。两个叠加问题：1) 旧 session 中毒（大量 content:[] 历史）2) ROUTER.md 写死"NEVER solve tasks yourself"，一般对话无出口。删掉 session 并改了 ROUTER.md。

### User (19:20:00)
还是 replies=0。

### Assistant (19:25:00)
发现 sessions.json 元数据残留导致 gateway 重建旧 session。彻底清理 sessions.json 条目 + .jsonl 文件。

### User (19:30:00)
第三次重启后仍然 replies=0。

### Assistant (19:35:00)
读取新 session 文件 51fed124.jsonl，确认 qwen3-max 仍返回 NO_REPLY。最终定位到 AGENTS.md:85 "Stay silent (HEARTBEAT_OK) when" 规则未限定群聊，qwen3-max 对复杂系统提示理解不足直接走静默路径。根本问题：iflow/qwen3-max 不适合做 OpenClaw router。

### User (19:40:00)
要求换成 custom-callapi 并改 AGENTS.md。

### Assistant (19:42:00)
执行最终修复：
1. router/writer 模型改为 custom-callapi-top/claude-opus-4-6
2. contextWindow 16000→200000, maxTokens 4096→8192
3. AGENTS.md 静默规则限定 GROUP CHATS ONLY，DM 强制回复
4. 清理 session

### User (19:50:00)
要求自我总结，整理排障过程并发飞书文档。

### Assistant (19:55:00)
完成自我总结：
- 写入 episodic memory（2026-03-28-openclaw-feishu-repair.json）
- 提取 semantic pattern（三层分治排障法）
- 创建飞书文档并推送：6层根因分析 + 修复步骤 + 方法论 + 经验教训