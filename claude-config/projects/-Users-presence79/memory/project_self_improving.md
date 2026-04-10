---
name: project_self_improving
description: Self-Improving Agent 系统配置和用户目标
type: project
---

# Self-Improving Agent 项目

## 安装信息
- **安装日期**: 2026-03-24
- **Skill 位置**: `~/.agents/skills/self-improving-agent/`
- **记忆位置**: `~/.claude/memory/self-improving/`

## 用户目标
用户希望 Claude 能够：
1. **自动优化工作流程** - 从每次交互中学习
2. **越来越符合工作习惯** - 适应用户的偏好和风格
3. **提升效率** - 减少重复性工作，提供更精准的帮助

**Why**: 用户希望建立一个能够持续进化的 AI 助手，随着使用时间增长而变得更加智能和贴合需求。

**How to apply**:
- 在每次任务完成后，主动提取可复用的模式
- 结合现有的 auto-memory 系统，形成双层学习机制
- 定期回顾和优化 skills，移除过时的、强化有效的

## 记忆架构
- **Semantic Memory** (`~/.claude/memory/self-improving/semantic/patterns.json`) - 抽象模式和规则
- **Episodic Memory** (`~/.claude/memory/self-improving/episodic/`) - 具体经验和教训
- **Working Memory** (`~/.claude/memory/self-improving/working/`) - 当前会话上下文
- **Auto Memory** (`~/.claude/projects/-Users-presence79/memory/`) - 长期用户偏好和项目信息

## 与现有系统的集成
Self-Improving Agent 与现有的 auto-memory 系统形成互补：
- **Auto Memory**: 存储用户偏好、项目背景、反馈意见
- **Self-Improving**: 从 skills 使用中学习，优化工作流程和技能

## 下一步
1. 在日常工作中使用各种 skills
2. 定期（每周）调用 self-improving-agent 进行经验总结
3. 根据用户反馈调整模式置信度
