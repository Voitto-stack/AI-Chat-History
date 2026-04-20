---
title: 查看一下现在的skill
date: 2026-04-19T21:13:25+08:00
session_id: 67a42e03-0003-4e53-848c-7e9840f3b1ca
project: /Users/presence79
source: claude-code-capture
messages: 7
---

# 查看一下现在的skill

### User (21:13:25)

查看一下现在的skill

### Assistant (21:13:36)

I'm Claude Code, Anthropic's official CLI for Claude, running Claude Opus 4.6.

### User (21:14:20)

<local-command-stdout>Set model to [1mOpus 4.7 (1M context)[22m with [1mmax[22m effort</local-command-stdout>

### User (21:14:22)

查看一下现在的skill

### Assistant (21:14:39)

现在可用的 skill 有 9 个：

- `update-config`：改 `settings.json` / 权限 / hooks / 环境变量
- `keybindings-help`：改快捷键和 `~/.claude/keybindings.json`
- `simplify`：检查并简化已修改代码
- `fewer-permission-prompts`：减少常见只读操作的权限提示
- `loop`：按间隔重复运行任务或命令
- `claude-api`：处理 Claude API / Anthropic SDK 相关开发
- `init`：初始化 `CLAUDE.md`
- `review`：Review 当前 PR
- `security-review`：对当前分支待改动做安全审查

### User (21:15:42)

不对啊，之前专门做了写飞书文档和发送到飞书的skill，还有多模型辩论skill呢？在你的记忆里也有

### Assistant (21:16:03)

我先查一下记忆和本地技能定义，看看这些 skill 现在是不是没被加载。

### Assistant (21:16:19)

我继续查记忆索引和本地 skill 目录，确认是“没加载“还是“已经不存在“。

### Assistant (21:16:41)

我再把记忆目录和本地自定义 skill 目录查清楚，确认它们是不是还在磁盘上。

### Assistant (21:16:57)

我查了当前会话可见的 skill 列表、`.claude/settings.local.json`，也扫了本地 skill 定义目录。

### Assistant (21:17:12)

你说得对，我刚才那句只是在复述“当前这次会话系统提醒里加载出来的 skill“，不是你机器上“所有存在过的 skill“。

我刚查到两件事：

1. 这次会话当前真正加载出来的，确实只有系统提醒里那 9 个。  
2. 你本地 `.claude` 下面还有很多其他 skill 定义文件，但我没找到你说的“飞书文档 / 发送到飞书 / 多模型辩论“这几个对应的 `SKILL.md`，至少当前磁盘扫描里没有明确命中。

另外，“记忆里也有“这点我这次没读到，因为你的 memory 索引文件现在不在我尝试的路径上，没法直接佐证。

更准确地说：  
- “当前可用 skill“ = 这轮会话系统列出来的那 9 个  
- “本地历史上装过/存在过的 skill“ ≠ 当前一定可调用

大概率是这几种情况之一：
- 那几个自定义 skill 之前在别的项目目录下
- 插件/skill 目录被移动、删掉了
- 这次会话没把对应插件加载进来
- 它们不是 skill，而是 MCP 能力或自定义命令，所以不会出现在 skill 列表里

要不要我继续帮你把这几个东西的真实来源定位出来：到底是旧 skill、插件、MCP 还是记忆条目。

### User (21:17:45)

我之前百分百做过我说的那些skill，你给我找出来

### Assistant (21:18:06)

我现在全盘搜这几个 skill 的定义、配置和历史记录，把它们的来源找出来。

### Assistant (21:18:42)

我缩小范围继续查：记忆目录、各项目的本地 `.claude`、以及所有 `SKILL.md` 里和飞书/辩论相关的定义。

### Assistant (21:19:18)

我已经找到一部分了，继续把“飞书“和“多模型辩论“对应的具体 skill 文件定位出来。

### Assistant (21:19:36)

我已经找到一批你之前做过的飞书相关 skill 目录了，现在把“写文档/发飞书/多模型辩论“各自对应到具体文件。

### Assistant (21:19:59)

我已经定位到了，接着把这几个 skill 的具体文件和作用确认一下。

### Assistant (21:20:09)

我已经找到你说的那些 skill 了，问题不是“没做过“，而是“这次会话没加载到当前 skill 列表里“。

### Assistant (21:20:28)

找到了，而且不止一个。

你之前做过的 skill 主要在这里：

- `~/.gitmemo/claude-config/skills/feishu-doc/SKILL.md`
- `~/.gitmemo/claude-config/skills/lark-im/SKILL.md`
- `~/.gitmemo/claude-config/skills/lark-wiki/SKILL.md`
- `~/.gitmemo/claude-config/skills/multi-model-debate/SKILL.md`

我确认到的对应关系是：

`feishu-doc`  
- 位置：`/Users/presence79/.gitmemo/claude-config/skills/feishu-doc/SKILL.md:1`
- 描述里直接写了：`Read, create, and send Feishu/Lark documents`
- 明确包含 3 个能力：读飞书文档、创建飞书文档、发送消息到飞书群

`lark-im`  
- 位置：`/Users/presence79/.gitmemo/claude-config/skills/lark-im/SKILL.md:1`
- 就是飞书消息发送/回复/群聊操作
- 里面有 `+messages-send`

`lark-wiki`  
- 位置：`/Users/presence79/.gitmemo/claude-config/skills/lark-wiki/SKILL.md:1`
- 是飞书知识库/文档节点操作

`multi-model-debate`  
- 位置：`/Users/presence79/.gitmemo/claude-config/skills/multi-model-debate/SKILL.md:1`
- 就是你说的“多模型辩论“
- 里面还明确写了 `--feishu` 参数：推送到飞书文档

另外我还看到你这边确实有飞书 MCP 配置：
- `/Users/presence79/.mcp.json:6`

所以结论很明确：  
这些能力你之前确实做过，而且文件现在还在磁盘上。只是它们不在“当前这次会话系统提醒列出的可用 skill“里，说明这轮 Claude Code 没把 `.gitmemo/claude-config/skills` 这套技能源加载进当前 skill registry。

换句话说，不是你记错了，是当前会话没挂上这批 skill。

下一步最该做的是把 `.gitmemo/claude-config/skills` 接回当前 Claude Code 的技能加载路径。

### User (21:20:38)

那就接回去

### Assistant (21:20:52)

我现在把 `.gitmemo/claude-config/skills` 接到当前 Claude Code 的配置里。

### Assistant (21:21:20)

我先读现有 Claude 配置和技能目录结构，确认该用哪种最小改动接回去。

### Assistant (21:21:45)

我先检查 `~/.claude/skills` 里有没有同名项，避免覆盖现有技能。

### Assistant (21:22:10)

我发现 `~/.claude/skills` 里其实已经有这些技能了，先确认它们是不是链接到 `.gitmemo`，以及为什么没出现在当前可用列表里。

### Assistant (21:22:30)

我查到关键点了：目录并不是没接上，问题更像是这些自定义 skill 没被标成“可直接调用“。

### Assistant (21:23:08)

我先同步 `.gitmemo` 里的自定义 skill 到 `~/.claude/skills`，只补缺和修复空壳目录。

### Assistant (21:23:31)

我确认原因了：`~/.claude/skills` 里大部分只是空目录，占了名字但没有 `SKILL.md`，所以不会被加载。

### Assistant (21:24:37)

我现在补上这几个 skill 的可调用标记，并把缺失/空壳目录修成真实加载路径。

### Assistant (21:24:54)

`multi-model-debate` 的头部和我预期稍有差异，我读一下再精确补上。

### Assistant (21:25:15)

我把链接接回去了，现在补上 `multi-model-debate` 的可调用标记并核对结果。

### Assistant (21:25:29)

我再核对一下 symlink 和头部，确认现在 Claude 能看到这些 skill 文件。

### Assistant (21:26:10)

接回去了。

我做了两类最小修复：

1. 修复 `~/.claude/skills`  
之前这里很多是“同名空目录“，会挡住真正的 skill，导致 Claude 根本读不到 `SKILL.md`。  
我把这 4 个目录改成了指向 `.gitmemo` 的符号链接：

- `~/.claude/skills/feishu-doc`
- `~/.claude/skills/lark-im`
- `~/.claude/skills/lark-wiki`
- `~/.claude/skills/multi-model-debate`

2. 补上可调用标记  
我给下面几个文件加了 `user-invocable: true`：

- `/Users/presence79/.gitmemo/claude-config/skills/feishu-doc/SKILL.md:1`
- `/Users/presence79/.gitmemo/claude-config/skills/lark-im/SKILL.md:1`
- `/Users/presence79/.gitmemo/claude-config/skills/lark-wiki/SKILL.md:1`
- `/Users/presence79/.gitmemo/claude-config/skills/multi-model-debate/SKILL.md:1`

另外我没改 `~/.claude/settings.json`，因为问题不在 settings，而在技能目录本身被空壳占位。

怎么验证：
- 直接开一个新会话，或在当前会话里让 Claude 重新加载 skills
- 然后看 skill 列表里是否出现：
  - `feishu-doc`
  - `lark-im`
 

### User (21:26:10)

[Request interrupted by user]

