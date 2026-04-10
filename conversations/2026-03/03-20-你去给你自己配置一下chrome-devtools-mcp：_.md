---
title: 你去给你自己配置一下chrome-devtools-mcp：{
date: 2026-03-20T17:32:11+08:00
session_id: ed8b6efe-f105-4abf-8ce5-295535ec080b
project: /Users/presence79/Desktop
source: claude-code-capture
messages: 1
---

# 你去给你自己配置一下chrome-devtools-mcp：{

### User (17:32:11)

你去给你自己配置一下chrome-devtools-mcp：{
  "mcpServers": {
    "chrome": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    }
  }
}

### Assistant (17:32:36)

我来先读取现有的全局设置文件，然后合并新的 MCP 服务器配置。

### Assistant (17:33:15)

现有配置很简洁。MCP 服务器配置需要写入 `~/.claude/settings.json`。不过，Claude Code 的 MCP 服务器配置实际上是通过 **`.mcp.json`** 文件或 **`mcpServers`** 字段来管理的。让我检查一下正确的配置位置：

### Assistant (17:33:45)

找到了！MCP 服务器配置在 `~/.mcp.json` 中，里面已经有一个 `feishu` 服务器。我来把 `chrome-devtools-mcp` 合并进去：

### Assistant (17:34:14)

配置已成功写入！✅

**变更内容：** 在 `~/.mcp.json` 中新增了 `chrome` MCP 服务器，与已有的 `feishu` 服务器并列：

```json
{
  "mcpServers": {
    "chrome": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    },
    "feishu": { ... }  // 原有配置保持不变
  }
}
```

**生效方式：** 重启 Claude Code 后，`chrome-devtools-mcp` 会自动通过 `npx chrome-devtools-mcp@latest` 启动。它会让 Claude 能够连接 Chrome DevTools，进行页面调试、DOM 检查、网络请求分析等操作。

