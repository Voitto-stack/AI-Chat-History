---
name: feedback_feishu_doc_collaborator
description: 创建飞书文档后必须设为任何人可编辑（铁规）
type: feedback
created: 2026-03-25
confidence: 1.0
---

创建任何飞书文档后，权限必须设为 `anyone_editable`（任何人可编辑），而不是 `anyone_readable`。

**Why:** 用户铁规——所有文档都必须可以修改。通讯录 API 无法查到用户 open_id（权限不足），所以无法按用户添加协作者，改用链接级别的可编辑权限。

**How to apply:** `feishu-create-doc.js` 工具已永久修改，`setPermission` 中 `link_share_entity` 从 `anyone_readable` 改为 `anyone_editable`。以后所有新建文档自动生效，无需额外操作。
