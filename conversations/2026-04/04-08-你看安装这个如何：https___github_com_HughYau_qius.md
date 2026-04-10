---
title: 你看安装这个如何：https://github.com/HughYau/qius
date: 2026-04-08T22:50:38+08:00
session_id: f82bc219-48c4-47c8-92a1-25c2779d50b5
project: /Users/presence79
source: claude-code-capture
messages: 1
---

# 你看安装这个如何：https://github.com/HughYau/qius

### User (22:50:38)

你看安装这个如何：https://github.com/HughYau/qiushi-skill

### Assistant (22:50:49)

让我先��看这个仓库的内容。

### Assistant (22:51:51)

## 1. 直接评估

这是一个「求是 Skill」项目，核心是用毛泽东思想中的方法论（矛盾分析、实践认识、调查研究等）武装 AI Agent 的决策框架。

**主要特点：**
- ✅ 系统化：9 大方法论工具 + 跨 skill 编排层（workflows）
- ✅ 有据可依：每个方法都引用毛选原文，附 `original-texts.md`
- ✅ 多平台支持：Claude Code、Cursor、Codex、OpenCode
- ✅ 自动注入：通过 SessionStart hook 在每次会话开始时加载总原则「实事求是」
- ✅ 验证脚本完善：提供 macOS/Linux/Windows 验证

**安装路径（Claude Code）：**
```bash
git clone https://github.com/HughYau/qiushi-skill
cd qiushi-skill
claude --plugin-dir .
```

**或设为永久加载：**
```bash
# 加入 ~/.zshrc
alias claude='claude --plugin-dir /path/to/qiushi-skill'
```

**技术上可以安装，质量较高。**

---

## 2. 深度交互

### 🔍 审慎挑战

**这个项目适合你吗？核心问题：**

1. **你的真实需求是什么？**
   - 你觉得当前 AI 在哪方面表现不足？（抓不住重点、没调查就给答案、遇难放弃...）
   - 你希望 AI 在什么场景下更"会想问题"？（复杂决策、长期规划、反馈整合...）

2. **与现有 CLAUDE.md 的关系**
   - 你的全局指令已经包含「第一性原理」「双层回答结构」「审慎挑战」
   - 这个 skill 的「实事求是」「矛盾分析法」「批评与自我批评」是否和你现有逻辑重叠或冲突？
   - **会不会造成指令过载**：9 个 skill + 现有 memory 系统 + GSD 系列 + 飞书系列 + 自我进化...

3. **实际使用频率**
   - SessionStart 自动注入意味着每次会话都有「实事求是」总原则，你真的需要每次都加载吗？
   - 你更倾向于**按需调用**（手动 `/contradiction-analysis`）还是**全局武装**（自动注入）？

### 💡 替代方案

**如果核心目标是"让 AI 更会想问题"：**

1. **轻量化**：只提取你最需要的 1-2 个方法（比如「矛盾分析法」「批评与自我批评」），加入你的 CLAUDE.md，避免 skill 过载
2. **验证式加载**：先手动测试几个 skill（`/contradiction-analysis`），看实际效果再决定是否全局注入
3. **内化到现有框架**：用这 9 个方法论优化你现有的「深度交互」部分，而不是叠加一套新系统

---

**先回答：你期望通过这个 skill 解决什么具体问题？** 这样我才能判断是直接装，还是部分提取，还是有更轻量的办法达成你的目标。

