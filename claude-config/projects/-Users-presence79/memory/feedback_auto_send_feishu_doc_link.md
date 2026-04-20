---
name: feedback_auto_send_feishu_doc_link
description: 创建飞书文档后要自动把文档链接发到用户默认飞书 webhook
type: feedback
originSessionId: c0e71683-7240-4957-b508-2536bfdc3082
---
创建飞书文档后，必须自动把文档链接发到用户默认飞书 webhook，不要停在“文档已创建”。

**Why:** 用户默认预期是“创建文档并发到飞书”是一整套动作，只建文档不发送会被认为没做完。

**How to apply:** 以后凡是我创建了飞书文档，如果用户没有另行指定接收位置，就直接用默认 FEISHU_WEBHOOK 发送文档链接；除非用户明确说这次不要发。