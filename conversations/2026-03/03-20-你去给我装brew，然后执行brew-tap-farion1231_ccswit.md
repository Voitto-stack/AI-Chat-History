---
title: 你去给我装brew，然后执行brew tap farion1231/ccswit
date: 2026-03-20T13:50:01+08:00
session_id: b0c38d32-a57d-40ca-a455-e49e8a5524df
project: /Users/presence79
source: claude-code-capture
messages: 1
---

# 你去给我装brew，然后执行brew tap farion1231/ccswit

### User (13:50:01)

你去给我装brew，然后执行brew tap farion1231/ccswitch

### Assistant (13:50:22)

brew 未安装，开始安装。

### Assistant (13:50:35)

安装需要 sudo 权限，非交互模式下无法自动输入密码。请在终端中手动运行以下命令：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装完成后，再运行：

```bash
brew tap farion1231/ccswitch
```

如果你用的是 Apple Silicon Mac（M1/M2/M3），安装完后可能还需要执行：

```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
```

才能让 `brew` 命令在当前终端生效。

