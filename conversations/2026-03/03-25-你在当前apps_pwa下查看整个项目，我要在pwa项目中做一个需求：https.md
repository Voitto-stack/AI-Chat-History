---
title: 你在当前apps/pwa下查看整个项目，我要在pwa项目中做一个需求：https
date: 2026-03-25T23:19:52+08:00
session_id: a83a2980-8e87-479b-9cc1-e1fc7cdfa2d1
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 3
---

# 你在当前apps/pwa下查看整个项目，我要在pwa项目中做一个需求：https

### User (23:19:52)

你在当前apps/pwa下查看整个项目，我要在pwa项目中做一个需求：https://presence.feishu.cn/wiki/KnHPwm4eai3rDrkmvaucR77nnKb，我要求你划分一下邀请端和被邀请端两个角度划分一下对应的工作，然后设计前端技术方案，要详细到在哪个文件中改什么东西新增什么东西，然后实现功能是否需要新增接口，如果要，要什么字段，还是从老接口中新增接口，新增什么字段，然后预估一下可能的开发成本，完成之后，发到我的飞书里面，记得文档要美观，别再用那种对不齐线的表格，画图可以的话看看飞书里面有没有内置的工具美化一下图片

### User (23:20:00)

<local-command-stdout>Set model to [1mOpus 4.6 (1M context)[22m with [1mmax[22m effort</local-command-stdout>

### User (23:20:01)

你在当前apps/pwa下查看整个项目，我要在pwa项目中做一个需求：https://presence.feishu.cn/wiki/KnHPwm4eai3rDrkmvaucR77nnKb，我要求你划分一下邀请端和被邀请端两个角度划分一下对应的工作，然后设计前端技术方案，要详细到在哪个文件中改什么东西新增什么东西，然后实现功能是否需要新增接口，如果要，要什么字段，还是从老接口中新增接口，新增什么字段，然后预估一下可能的开发成本，完成之后，发到我的飞书里面，记得文档要美观，别再用那种对不齐线的表格，画图可以的话看看飞书里面有没有内置的工具美化一下图片

### Assistant (23:20:11)

Let me start by fetching the requirement document and exploring the PWA project structure in parallel.

### Assistant (23:26:03)

飞书文档是认证链接，我无法直接访问。请把文档内容粘贴给我，或者截图发给我，我看完需求后会结合已探索的 PWA 项目结构来设计技术方案。

PWA 项目结构我已经探索完毕，核心信息：
- **技术栈**: React 19 + Zustand + Vite + Tailwind CSS + TRTC/TUICall
- **API 层**: Proto-based HTTP client (`src/http/`)
- **路由**: React Router v6，ProtectedRoute 保护
- **Modal 系统**: Zustand store 驱动，支持 fullscreen/bottom-sheet/center 三种变体
- **现有邀请相关**: 仅有 activity landing pages（installToClaim/getallmylinks），无完整邀请功能
- **工具函数**: 已有 `copyToClipboard`、deep linking 基础设施、APK bridge 等

请提供需求文档内容，我来做详细的技术方案设计。

