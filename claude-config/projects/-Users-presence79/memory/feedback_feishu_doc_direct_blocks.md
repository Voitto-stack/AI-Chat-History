---
name: feedback_feishu_doc_direct_blocks
description: 创建飞书文档必须直接构建原生块，禁止先写markdown再转换（铁规）
type: feedback
created: 2026-03-25
confidence: 1.0
---

创建飞书文档时，禁止先写 markdown 文件再用 feishu-create-doc.js 转换。必须直接用飞书 API 构建原生块。

**Why:** feishu-create-doc.js 的 markdown 转换器极其简陋，只识别 `#` 标题，其他格式（加粗、列表、表格、分割线等）全部丢失，原样输出 markdown 语法符号，导致文档很丑。

**How to apply:**
1. 每次写飞书文档，直接写 Node.js 脚本调用飞书 API，用原生 block_type 构建内容
2. 可用的块类型：heading1-9 (3-11), text (2), bullet (12), ordered (13), code (14), quote (15), divider (22)
3. text_run 支持 bold/italic/underline 等样式混排
4. 参考模板：本次 BFF v2 文档的 /tmp/create-bff-doc.js 脚本中的 helper 函数写法
5. feishu-create-doc.js 工具只适合纯文本/简单标题场景，复杂文档一律手写块
