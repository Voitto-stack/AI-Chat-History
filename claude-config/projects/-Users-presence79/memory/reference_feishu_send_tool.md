---
name: 飞书推送工具
description: 通用飞书消息推送工具，支持快速发送卡片消息到飞书群
type: reference
---

## 工具位置
`~/.claude/tools/feishu-send`（已添加到 PATH）

## 使用方式

**基本推送**：
```bash
feishu-send "标题" "内容"
```

**管道输入**：
```bash
echo "内容" | feishu-send "标题"
cat file.md | feishu-send "标题"
```

**带颜色模板**：
```bash
feishu-send "标题" "内容" --template red
# 可选颜色：blue|turquoise|red|green|yellow|purple|grey
```

## Why: 使用场景
当用户要求"发送到飞书"、"推送飞书消息"时，直接使用此工具，而不是从头编写推送脚本。

## How to apply: 使用建议
- 环境变量 `FEISHU_WEBHOOK` 已在 `~/.claude/settings.json` 中配置
- 工具会自动读取环境变量，无需手动传递
- 红色模板用于告警，绿色用于成功，蓝色用于常规信息
- 工具支持 Markdown 格式内容

## 验证状态
- 创建日期：2026-03-25
- 测试状态：✅ 全部通过
- 独立性：不影响每日早报系统（`~/.morning-brief/morning-brief.js`）
