---
title: project-doc 这个skill是不是还没加载
date: 2026-04-19T21:38:16+08:00
session_id: 03d108f3-9275-4ce3-a771-921b22e89aa2
project: /Users/presence79
source: claude-code-capture
messages: 4
---

# project-doc 这个skill是不是还没加载

### User (21:38:16)

project-doc 这个skill是不是还没加载

### Assistant (21:38:22)

I'm Claude Code, Anthropic's official CLI for Claude, running Claude Opus 4.6.

### User (21:38:50)

<local-command-stdout>Set model to [1mOpus 4.7 (1M context)[22m with [1mmax[22m effort</local-command-stdout>

### User (21:38:52)

project-doc 这个skill是不是还没加载

### Assistant (21:39:00)

检查了可用的技能列表，确实没有看到 `project-doc` 这个 skill。

当前可用的技能包括：
- update-config
- keybindings-help
- simplify
- fewer-permission-prompts
- loop
- claude-api
- lark-wiki
- multi-model-debate
- lark-im
- feishu-doc
- init
- review
- security-review

如果你需要 `project-doc` 功能，可能需要：
1. 检查是否需要安装或启用该 skill
2. 查看 `~/.claude/skills/` 目录确认是否存在
3. 或者使用其他相关的 skill（比如 `init` 用于初始化项目文档）

需要我帮你检查 skills 配置吗？

### User (21:39:22)

 我不是刚刚才让你创建这个skill的吗

### Assistant (21:39:29)

你说得对，我需要检查一下我们之前的对话历史。让我查看一下是否有创建 `project-doc` skill 的记录。

### Assistant (21:39:37)

你说得对！我看到 `project-doc.md` 文件确实存在（4月19日 21:35 创建的）。但它现在还没有在系统中被识别为可用的 skill。

这可能需要：
1. 重启 Claude Code 会话让新 skill 生效
2. 或者检查 skill 文件格式是否正确

让我查看一下这个 skill 文件的内容：

### Assistant (21:39:44)

文件格式看起来是正确的，有正确的 frontmatter（`skill_type: user-invocable`）。但它还没有被系统加载。

通常新 skill 需要重启 Claude Code 会话才能生效。你可以：

1. **退出并重新启动 Claude Code**，新 skill 就会被识别
2. 或者我可以帮你测试一下直接调用：

### Assistant (21:39:52)

确认了，系统还没有加载这个 skill。需要重启 Claude Code 会话才能识别新添加的 skill。

你可以：
1. 退出当前会话（Ctrl+C 或 Cmd+Q）
2. 重新启动 Claude Code
3. 然后就可以使用 `/project-doc` 命令了

或者，如果你现在就想使用这个功能，我可以直接按照 skill 文件中定义的步骤来分析项目并生成上手文档。需要我现在就开始分析当前目录吗？

