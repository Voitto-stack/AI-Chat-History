---
name: 飞书文档创建工具
description: 快速创建飞书文档（自动设置组织内可见权限）
type: reference
---

## 工具位置
`~/.claude/tools/feishu-create-doc`（已添加到 PATH）

## 使用方式

**创建带内容的文档**：
```bash
feishu-create-doc "标题" "内容"
```

**管道输入**：
```bash
echo "内容" | feishu-create-doc "标题"
cat file.md | feishu-create-doc "标题"
```

**创建空文档**：
```bash
feishu-create-doc "新文档标题"
```

## 工作流程
1. 创建飞书文档
2. 自动设置权限为"组织内可见"
3. 返回文档链接
4. 输出 Markdown 内容（用户复制粘贴到文档）

## Why: 使用场景
- 用户要求"创建飞书文档"、"发到我的飞书"时使用
- 比手动创建快速，自动设置权限
- 支持 Markdown 格式内容

## How to apply: 使用建议
- 内容会以格式化形式输出，用户需复制粘贴到文档
- 文档自动设置为组织内可见，无需手动分享
- 环境变量已配置（FEISHU_APP_ID、FEISHU_APP_SECRET）

## 技术限制
- **当前版本**：飞书 API 的块格式调试遇到困难，暂时采用"创建文档 + 输出内容"方案
- **未来改进**：待飞书 API 块格式调通后，可实现自动填充内容

## 验证状态
- 创建日期：2026-03-25
- 测试状态：✅ 文档创建、权限设置、管道输入全部通过
- 用户确认：✅ 可正常访问创建的文档
