---
name: feishu_doc_formatting
description: 飞书文档必须用原生表格和代码块，不能用 Markdown 纯文本渲染
type: feedback
---

飞书文档中涉及表格的内容必须使用飞书文档原生的 table block（不是 Markdown 管道符表格），涉及代码的内容必须使用飞书文档原生的 code block（不是普通文本）。

**Why:** 用户发现当前 feishu-create-doc.js 工具把 Markdown 表格渲染成了纯文本管道符，代码也是普通文本，在飞书中阅读体验很差。

**How to apply:** 每次创建飞书文档前，检查 feishu-create-doc.js 是否支持原生 table/code block。如果不支持，需要先升级工具再创建文档，或者用飞书 API 直接构造 table block 和 code block。
