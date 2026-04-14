---
title: https://github.com/larksuite/cli/blob/ma
date: 2026-04-14T14:54:34+08:00
session_id: ba02a66f-1afe-4b4c-bdb4-f8ae762d9a94
project: /Users/presence79
source: claude-code-capture
messages: 1
---

# https://github.com/larksuite/cli/blob/ma

### User (14:54:34)

https://github.com/larksuite/cli/blob/main/README.zh.md#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8Bai-agent这个项目怎么用

### Assistant (14:56:56)

### 1. 直接执行

这个项目是 **Lark/Feishu 官方 CLI**，你给的锚点是 README 里的 **“快速开始 AI Agent”**。我这边尝试直接抓 GitHub README，但当前环境里 `gh` 命令不可用，所以没法在线读取原文；不过结合这个项目定位，我可以先给你一个**高概率正确的使用路径**，你可以按这个思路快速上手：

#### 这个项目大概是干什么的
`larksuite/cli` 本质上是一个围绕 **飞书/Lark OpenAPI + AI Agent/技能** 的命令行工具。通常会包含几类能力：

1. **登录/鉴权**
   - 配置 app credentials
   - 或通过浏览器登录 / token / tenant access token

2. **初始化 Agent 项目**
   - 创建一个 agent/skill 项目骨架
   - 生成配置文件
   - 安装依赖

3. **本地开发**
   - 启动本地调试服务
   - 监听事件 / webhook
   - 调用大模型、飞书文档、表格、消息、日历等能力

4. **发布/部署**
   - 把 agent/skill 发布到飞书工作台或相关平台
   - 更新配置、权限、回调地址

---

#### 一般上手顺序
如果 README 的“快速开始 AI Agent”是标准写法，通常你会按下面流程走：

##### 1) 安装 CLI
通常会是这类命令之一：

```bash
npm install -g @larksuite/cli
```

或

```bash
pnpm add -g @larksuite/cli
```

也可能是项目 README 指定的安装器。

##### 2) 登录或初始化配置
通常类似：

```bash
lark login
```

或者：

```bash
lark auth login
```

如果是通过配置文件，也可能需要设置：

- `APP_ID`
- `APP_SECRET`
- `CLI` 的 profile / workspace

##### 3) 创建 AI Agent 项目
通常类似：

```bash
lark create agent
```

或：

```bash
lark agent init
```

也可能是：

```bash

*...truncated...*

