---
title: MetaBot使用排查
date: 2026-04-14 14:53:25
model: gpt-5.4
messages: 2
---

# MetaBot使用排查

### User (14:49:00)
看下这个项目，我应该安装和配置过的，看看怎么用：https://github.com/xvirobotics/metabot/blob/main/README.md

### Assistant (14:53:25)
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
- workspace 里的技能也已经装好了：`metabot-workspace/CLAUDE.md:7`, `metabot-workspace/.claude/skills`

### 但现在服务**没在运行**

我检查了：
- `pm2` 里没有 `metabot` 进程
- 本地 `9100`（MetaBot API）现在也没响应

也就是说：
**安装和配置是有的，但当前没有启动。**

### 你现在怎么用

先进入项目：

```bash
cd /Users/presence79/metabot
```

#### 方式 1：开发模式启动

```bash
npm run dev
```

适合你现在先验证是否能跑起来。

#### 方式 2：PM2 常驻启动

```bash
metabot start
```

这个命令来自：`/Users/presence79/metabot/bin/metabot:111`

启动后常用命令：

```bash
metabot status     # 看进程状态
metabot logs       # 看实时日志
metabot restart    # 重启
metabot stop       # 停止
metabot update     # 拉代码 + build + 重启
```

### 启动后怎么验证

#### 1) 看 API 是否活着

```bash
mb health
```

这个会请求本地：
- `http://localhost:9100/api/health`

相关逻辑在：`/Users/presence79/metabot/bin/mb:140`

#### 2) 看 bot 列表

```bash
mb bots
```

#### 3) 看定时任务

```bash
mb schedule list
```

#### 4) 看 MetaMemory

```bash
mm list
mm search "关键词"
```

### 你这个项目最核心的使用方式

不是直接在终端里“操作 metabot UI”，而是：

#### A. 通过飞书 / 微信跟 bot 聊天

你现在配置的 bot 在：`/Users/presence79/metabot/bots.json:2`

- 飞书 bot：`AI`
- 微信 bot：`AI-wechat`

启动服务后，你应该就可以在对应 IM 里直接发消息给 bot。

支持的典型命令包括：

```text
/reset
/stop
/status
/help
/memory list
/memory search 关键词
/sync
/sync status
/metaskill ...
/metabot
```

这些在 README 的命令表里有：`/Users/presence79/metabot/README.md:305`

#### B. 通过 CLI 直接调用 Agent Bus

如果你不想走 IM，也可以直接本机命令行调用：

```bash
mb talk AI test-chat "帮我看看这个项目接下来怎么拆任务"
```

格式定义在：`/Users/presence79/metabot/bin/mb:33`

也可以设定时任务：

```bash
mb schedule cron AI test-chat '0 8 * * 1-5' '生成每日简报'
```

### 配置上我还看到两点

#### 1) Claude 可执行文件已指定

在：`/Users/presence79/metabot/.env:20`

说明 MetaBot 会直接调用你本机的 Claude CLI。

#### 2) MetaMemory 地址已配置

在：`/Users/presence79/metabot/.env:23`

默认是：

```text
http://localhost:8100
```

如果服务启动正常，MetaMemory UI 也会一起可用。

---

### 我建议你下一步直接这样做

```bash
cd /Users/presence79/metabot
npm run dev
```

然后另开一个终端验证：

```bash
mb health
mb bots
mb schedule list
```

如果你主要是想“恢复到手机上能用”的状态，那下一步就去：
- 飞书里给 `AI` 发消息
- 或微信里找 `AI-wechat`

## 2. 深度交互

你现在表面上问的是“怎么用”，但底层其实更可能是这三个问题之一：

### 路径 1：你是想确认“它有没有装好”
这个答案已经比较明确：
**装好了，配置也在，只是服务现在没跑。**

### 路径 2：你是想恢复“日常可用状态”
那关键不是再读 README，而是把它变成稳定常驻：
- 用 `metabot start` 跑起来
- 用 `metabot status` / `metabot logs` 观察
- 在飞书/微信里做一次真实收发测试

### 路径 3：你其实是想搞清楚“这个系统的最佳使用姿势”
如果是这个，那最优路径不是手动敲很多 `mb` 命令，而是把它分三层理解：

- **层 1：IM 入口**：飞书/微信里和 bot 对话
- **层 2：Agent Bus**：`mb talk`、`mb schedule` 做调度
- **层 3：共享记忆/能力工厂**：`mm`、`/metaskill`、`/metabot`

也就是说，MetaBot 本质不是一个“单 bot 聊天工具”，而是一个：
**把 Claude Code、调度、共享记忆、跨 bot 协作，统一接到 IM 上的操作系统。**

如果你愿意，我下一步可以直接帮你做两件更有价值的事之一：

1. **帮你检查为什么它现在没启动起来**，直接定位启动问题
2. **按你的实际用途，给你整理一份“你的 MetaBot 最佳实践清单”**，比如：飞书日常用法 / 定时任务 / 多 bot 协作 / MetaMemory 用法
