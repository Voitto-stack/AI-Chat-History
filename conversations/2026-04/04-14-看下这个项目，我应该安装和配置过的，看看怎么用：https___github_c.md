---
title: 看下这个项目，我应该安装和配置过的，看看怎么用：https://github.c
date: 2026-04-14T14:47:44+08:00
session_id: c34c32ab-c2a8-4f88-94bc-435264276ab6
project: /Users/presence79
source: claude-code-capture
messages: 6
---

# 看下这个项目，我应该安装和配置过的，看看怎么用：https://github.c

### User (14:47:44)

看下这个项目，我应该安装和配置过的，看看怎么用：https://github.com/xvirobotics/metabot/blob/main/README.md

### Assistant (14:48:20)

我先检查本机里这个项目/配置是否存在，再对照 README 看实际怎么用。

### Assistant (14:48:48)

我先看本机里这个项目和配置痕迹，再对照 README。

### Assistant (14:50:06)

我先看本机里 `metabot` 相关目录和 README。

### Assistant (14:55:13)

## 1. 直接执行

我帮你看了，本地**确实已经安装并配置过 MetaBot**，而且配置还挺完整。

### 我确认到的现状

- 项目目录在：`/Users/presence79/metabot`
- 工作区在：`/Users/presence79/metabot-workspace`
- CLI 已安装到：`/Users/presence79/.local/bin`
  - `metabot`
  - `mb`
  - `mm`
  - `fd`
- 当前是 **multi-bot 模式**：`/Users/presence79/metabot/.env:5`
- 你配置了两个 bot：`/Users/presence79/metabot/bots.json:2`
  - 飞书：`AI`
  - 微信：`AI-wechat`
- 它们默认工作目录都是：`/Users/presence79/metabot-workspace`
- workspace 里的技能也已经装好了：`/Users/presence79/metabot-workspace/CLAUDE.md:7`，`/Users/presence79/metabot-workspace/.claude/skills`

### 但现在服务**没在运行**

我检查到：

- `pm2` 里没有 `metabot` 进程
- 本地 `9100`（MetaBot API）没响应
- `mb health` 也打不通本地服务

所以当前状态是：

**安装和配置都在，但服务现在没启动。**

### 你现在怎么用

先进入项目：

```bash
cd /Users/presence79/metabot
```

#### 方式 1：开发模式启动

```bash
npm run dev
```

适合先验证是否能跑起来。脚本定义在 `/Users/presence79/metabot/package.json:10`。

#### 方式 2：PM2 常驻启动

```bash
metabot start
```

这个命令来自 `/Users/presence79/metabot/bin/metabot:111`。

启动后常用命令：

```bash
metabot status
metabot logs
metabot restart
metabot stop
metabot update
```

### 启动后怎么验证

#### 1) 看 API 是否活着

```bash
mb health
```

会请求本地 `http://localhost:9100/api/health`，见 `/Users/presence79/metabot/bin/mb:140`。

#### 2) 看 bot 列表

```bash
mb bots

*...truncated...*

### User (14:59:54)

是想恢复“手机上能直接用”的状态

### Assistant (15:01:19)

我先按系统化排查走：复现启动状态、看报错、确认依赖链，再给你最短恢复路径。

### Assistant (15:03:25)

我先复现启动状态并检查依赖端口。

### Assistant (15:05:18)

## 1. 直接执行

我已经按“先复现、再判断根因”的方式查过了。

### 当前结论

**根因不是“没装好”或“配置坏了”，而是服务当时没启动。**  
我刚刚实际启动了它，现在看到的状态是：

- MetaBot 进程已跑起来：`tsx src/index.ts`
- 飞书 bot `AI` 已成功启动
- 微信 bot `AI-wechat` 也已进入登录流程，但**正在等扫码绑定**

关键证据在启动日志里：

- `Starting MetaBot bridge...`
- `Feishu bot is running`
- `Starting WeChat iLink QR login...`
- `QR code generated — scan with WeChat`

### 这意味着你现在离“手机直接可用”只差两步

#### A. 飞书：现在就可以试
你可以直接去飞书里找你的 bot **`AI`** 发一条消息测试。

如果飞书开发者后台的长连接事件订阅还有效，它现在应该能回复。

#### B. 微信：还需要你扫码绑定
当前日志给出的微信登录地址是：

```text
https://liteapp.weixin.qq.com/q/7GiQu1?qrcode=0b84f0cf03a5a5a6cfc422e0d8119616&bot_type=3
```

你现在可以直接用手机微信去完成这一步。  
扫完之后，`AI-wechat` 才会恢复“手机直接用”。

### 你现在最该做的顺序

1. **先去飞书给 `AI` 发一条消息**
   - 比如：`/help`
   - 或：`你好，测试一下`

2. **再处理微信扫码**
   - 打开上面的链接
   - 或在当前终端对应的 QR 提示里扫码绑定

3. 如果你想让它**不是临时跑着，而是稳定常驻**
   后面再切到：

```bash
cd /Users/presence79/metabot
metabot start
```

这个会走 PM2 常驻，不用每次 `npm run dev`。

### 目前我不建议你先做的事

先别回头读 README，也先别改配置。  
因为从证据看：

- 配置文件在
- bot 定义在
- Claude CLI 在
- 飞书 bot 能启动
- 微信 bot 也能走到二维码登录

所以问题不在“配置错”，而在**服务没运行 + 微信还没完成绑定**。

---

## 2. 深度交互

你现在真正要恢复的，不是“项目会不会跑”，而是：

**“我的手机是不是随时都能把这个 Agent 当作入口来用。”**

这和“开发模式能启动”是两件事。


*...truncated...*

### User (15:07:46)

飞书机器人不回消息

### Assistant (15:22:47)

API Error: 503 {"error":{"code":"model_not_found","message":"No available channel for model gpt-5.4 under group ClaudeCode-coding (distributor) (request id: 202604140722473691118138268d9d6usGFmU1D)","type":"new_api_error"}}

### User (15:28:04)

继续

### User (15:28:34)

<local-command-stdout>Set model to [1mgpt-5.4[1m][22m with [1mmax[22m effort</local-command-stdout>

### User (15:28:35)

继续

