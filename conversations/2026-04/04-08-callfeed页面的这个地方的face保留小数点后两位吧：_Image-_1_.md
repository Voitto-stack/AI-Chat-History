---
title: callfeed页面的这个地方的face保留小数点后两位吧：[Image #1]
date: 2026-04-08T17:19:13+08:00
session_id: 0c4696d0-7ac4-424d-bb0f-d3afa7c1451f
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 1
---

# callfeed页面的这个地方的face保留小数点后两位吧：[Image #1]

### User (17:19:13)

callfeed页面的这个地方的face保留小数点后两位吧：[Image #1]

### Assistant (17:19:37)

我来查看并修改 face 值的显示格式。

### Assistant (17:19:59)

我需要查看这个文件中显示 face 值的地方。从截图来看，face 值显示在通话记录中。让我查找相关的显示逻辑：

### Assistant (17:20:27)

没有找到 "face" 字段。让我查看测试视频页面相关的代码：

### Assistant (17:20:53)

让我查看 TestVideoList 组件：

### Assistant (17:21:15)

从截图看，face 值显示在视频卡片下方的信息区域。但我在 TestVideoCard 组件中没有看到 face 字段的显示。让我检查 TestVideo 类型定义和 API：

### Assistant (17:21:46)

让我检查 minerva-schemas 中的 TestVideo 类型定义：

### Assistant (17:22:30)

我看到 TestVideo schema 中没有 face 字段。从截图来看，face 值显示的格式类似 `duration:35,face:0.5901639344262295,spoken:true`。这看起来像是某种调试信息或视频元数据。让我搜索一下可能存在这个字段的地方：

### Assistant (17:23:06)

让我查看后端的测试视频接口，看看实际返回的数据结构：

### Assistant (17:24:36)

现在我看到了问题。从后端代码来看，`pwa_user_video` 表中的数据直接返回了 url、verify_pass 和 fail_reason，但没有返回 face、duration、spoken 等字段。

从截图中我看到的 `duration:35,face:0.5901639344262295,spoken:true` 更像是某种元数据字符串。让我检查数据库 schema：

### Assistant (17:26:51)

我看到 `fail_reason` 字段。让我再检查一下前端代码中是否有其他地方显示了这些值。从截图看，这些值显示在用户名下方，让我重新搜索：

### Assistant (17:27:38)

现在我明白了！failReason 字段存储的是一个字符串，其中包含了 `duration:35,face:0.5901639344262295,spoken:true` 这样的值。我需要：

1. 解析 failReason 字符串，提取 face 值
2. 格式化为保留两位小数

让我修改 TestVideoList 组件：

### Assistant (17:28:27)

现在添加格式化函数：

### Assistant (17:32:10)

完成！现在 face 值会显示为保留两位小数的格式（例如 0.59 而不是 0.5901639344262295）。

总结：
- TestVideoList.tsx:130 - 使用 formatFailReason 函数格式化 failReason
- TestVideoList.tsx:137 - 添加 formatFailReason 函数，用正则表达式匹配 face 值并保留两位小数

