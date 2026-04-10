---
name: feishu-doc
description: Read, create, and send Feishu/Lark documents. Use when the user shares a Feishu document URL, asks to read content, create new documents, or send messages to Feishu groups.
---

## Feishu Document Operations

**CRITICAL**: Tools are already installed in `~/.claude/tools/`. Check there first before building anything.

### Available Capabilities

1. **Read** Feishu documents and wiki pages
2. **Create** Feishu documents with native block formatting
3. **Send** messages to Feishu groups

---

## Reading Feishu Documents

Use the Feishu API directly to read document content:

```javascript
// Get raw content
GET https://open.feishu.cn/open-apis/docx/v1/documents/{document_id}/raw_content
Authorization: Bearer {tenant_access_token}
```

Extract document_id from URL:
- `https://xxx.feishu.cn/docx/ABC123` → document_id = `ABC123`
- `https://xxx.feishu.cn/wiki/ABC123` → need to resolve wiki node first

### Guidelines

- If the user provides a URL, always read it first
- For wiki pages, the bot needs `wiki:wiki:readonly` permission
- For standalone docs, the bot needs `docx:document:readonly` permission

---

## Creating Feishu Documents

### ⚠️ IRON RULES (铁规)

1. **禁止 markdown 转换**：不要先写 markdown 再转换。`feishu-create-doc.js` 的转换器只认标题，其他格式全丢。
2. **必须直接构建原生块**：用 Node.js 脚本直接调用飞书 API，使用原生 block_type 构建内容。
3. **权限必须设为 `anyone_editable`**：所有文档都必须可编辑，不是 `anyone_readable`。

### Block Builder Tool

**位置**: `~/.claude/tools/feishu-block-builder.js`

这是一个可复用的飞书原生块构建库，提供以下 helper 函数：

```javascript
const fb = require(process.env.HOME + '/.claude/tools/feishu-block-builder.js');

// 基础操作
const token = await fb.getToken();
const docId = await fb.createDoc(token, "文档标题");
await fb.setPermission(token, docId);  // 自动设为 anyone_editable
await fb.addBlocks(token, docId, blocks);  // 分批上传，每批50个

// 构建块
fb.h1("一级标题")           // block_type: 3
fb.h2("二级标题")           // block_type: 4
fb.h3("三级标题")           // block_type: 5
fb.h4("四级标题")           // block_type: 6
fb.txt("普通文本")          // block_type: 2
fb.txtBold("加粗文本")      // block_type: 2, bold
fb.txtMixed(               // 混排：加粗+普通
  {text: "加粗部分", bold: true},
  {text: "普通部分"}
)
fb.bullet("无序列表项")     // block_type: 12
fb.bulletBold("粗体:", "内容")  // 无序列表，前半粗体
fb.ordered("有序列表项")    // block_type: 13
fb.code("代码内容")         // block_type: 14（等宽字体，适合表格/流程图）
fb.quote("引用文本")        // block_type: 15
fb.divider()               // block_type: 22（分割线）
```

### 创建文档的标准流程

```javascript
const fb = require(process.env.HOME + '/.claude/tools/feishu-block-builder.js');

async function main() {
  const token = await fb.getToken();
  const docId = await fb.createDoc(token, "文档标题");
  await fb.setPermission(token, docId);

  const blocks = [
    fb.h1("第一章"),
    fb.txt("这是正文内容"),
    fb.bullet("列表项 1"),
    fb.bullet("列表项 2"),
    fb.divider(),
    fb.h1("第二章"),
    fb.code("┌────────┬────────┐\n│ 表头1  │ 表头2  │\n├────────┼────────┤\n│ 内容1  │ 内容2  │\n└────────┴────────┘"),
  ];

  await fb.addBlocks(token, docId, blocks);
  const url = `https://presence.feishu.cn/docx/${docId}`;
  console.log(url);
}
main();
```

### 可用的块类型速查

| block_type | 字段名   | 用途                          |
|------------|----------|-------------------------------|
| 2          | text     | 普通文本                      |
| 3          | heading1 | 一级标题                      |
| 4          | heading2 | 二级标题                      |
| 5          | heading3 | 三级标题                      |
| 6          | heading4 | 四级标题                      |
| 12         | bullet   | 无序列表                      |
| 13         | ordered  | 有序列表                      |
| 14         | code     | 代码块（等宽字体，用于表格/流程图）|
| 15         | quote    | 引用块（用于提示/警告）        |
| 22         | divider  | 分割线                        |

### 关键注意事项

- **分批上传**：每批不超过 50 个块，否则 API 可能静默失败
- **text_element_style**：必须包含 bold, italic, underline, strikethrough, inline_code 五个字段
- **style.folded**：必须存在（即使为 false）
- **document_revision_id=-1**：必须在 URL 参数中
- **表格/流程图**：用 code block (block_type 14) + Unicode 框线字符，等宽字体保证对齐

---

## Sending to Feishu Groups

**Tool**: `~/.claude/tools/feishu-send.js` (already installed)

```bash
feishu-send.js "Title" "Content"              # 默认蓝色
feishu-send.js "Title" "Content" green        # 指定颜色
# Colors: blue|turquoise|red|green|yellow|purple|grey
```

---

## Environment Variables

Required in `~/.claude/settings.json`:

```json
{
  "env": {
    "FEISHU_APP_ID": "cli_...",
    "FEISHU_APP_SECRET": "...",
    "FEISHU_WEBHOOK": "https://open.feishu.cn/..."
  }
}
```

---

## Typical Workflow

```javascript
// 1. 创建文档（直接构建原生块）
const fb = require(process.env.HOME + '/.claude/tools/feishu-block-builder.js');
const token = await fb.getToken();
const docId = await fb.createDoc(token, "标题");
await fb.setPermission(token, docId);
await fb.addBlocks(token, docId, [fb.h1("Hello"), fb.txt("World")]);
const url = `https://presence.feishu.cn/docx/${docId}`;

// 2. 发送到飞书群
// ~/.claude/tools/feishu-send.js "📄 New Doc" "View: ${url}" green
```

**IMPORTANT**: Tools already exist in `~/.claude/tools/`. Don't build from scratch.
