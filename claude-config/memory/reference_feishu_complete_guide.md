---
name: reference_feishu_complete_guide
description: 完整的飞书文档创建和推送指南（原生块构建、API、环境变量）
type: reference
created: 2026-03-25
updated: 2026-03-25
confidence: 1.0
critical: true
user_requirement: "任何新会话都必须知道如何创建飞书文档、写入内容、发送到飞书群"
---

# 飞书文档创建和推送完整指南

**用户要求**：以后随便开一个新会话，必须知道怎么创建飞书文档、怎么写入内容、怎么发到飞书群。

## ⚠️ 铁规（违反即死）

1. **禁止 markdown 转飞书**：不要先写 .md 文件再用 feishu-create-doc.js 转换。那个转换器只认标题，其他格式全丢，输出丑到爆。
2. **必须直接构建原生块**：用 `feishu-block-builder.js` 库直接构建 heading、bullet、code、divider 等原生块。
3. **权限必须 `anyone_editable`**：所有文档必须可编辑，不是 `anyone_readable`。

## 快速开始

```javascript
// 1. 引入块构建库
const fb = require(process.env.HOME + '/.claude/tools/feishu-block-builder.js');

// 2. 创建文档
const token = await fb.getToken();
const docId = await fb.createDoc(token, "文档标题");
await fb.setPermission(token, docId);  // 自动设为 anyone_editable

// 3. 构建内容（原生块）
const blocks = [
  fb.h1("第一章"),
  fb.txt("正文内容"),
  fb.bullet("列表项"),
  fb.code("等宽字体内容（表格/流程图用这个）"),
  fb.divider(),
];
await fb.addBlocks(token, docId, blocks);

// 4. 获取链接
const url = `https://presence.feishu.cn/docx/${docId}`;

// 5. 发送到飞书群
// ~/.claude/tools/feishu-send.js "标题" "内容\n链接: ${url}" green
```

## 工具位置

| 工具 | 路径 | 用途 |
|------|------|------|
| 块构建库 | `~/.claude/tools/feishu-block-builder.js` | **主力工具**：创建文档 + 原生块构建 |
| 飞书推送 | `~/.claude/tools/feishu-send.js` | 发送卡片消息到飞书群 |
| MD转飞书 | `~/.claude/tools/feishu-create-doc.js` | ⚠️ 仅限纯文本场景，复杂文档禁用 |
| 环境变量 | `~/.claude/settings.json` | FEISHU_APP_ID, FEISHU_APP_SECRET, FEISHU_WEBHOOK |

## 块构建库 API (feishu-block-builder.js)

### 文档操作

```javascript
fb.getToken()                    // 获取 tenant_access_token
fb.createDoc(token, title)       // 创建文档，返回 docId
fb.setPermission(token, docId)   // 设权限（anyone_editable）
fb.addBlocks(token, docId, [...])// 分批添加块（自动每批50个）
fb.readDoc(token, docId)         // 读取文档纯文本内容
```

### 块构建器

```javascript
fb.h1("一级标题")              // block_type: 3
fb.h2("二级标题")              // block_type: 4
fb.h3("三级标题")              // block_type: 5
fb.h4("四级标题")              // block_type: 6
fb.txt("普通文本")             // block_type: 2
fb.txtBold("加粗文本")         // block_type: 2, bold
fb.txtMixed(                   // 混排
  {text:"加粗", bold:true},
  {text:"普通"}
)
fb.bullet("无序列表")          // block_type: 12
fb.bulletBold("粗:", "普通")   // 无序列表混排
fb.ordered("有序列表")         // block_type: 13
fb.orderedBold("粗:", "普通")  // 有序列表混排
fb.code("代码/表格/流程图")    // block_type: 14（等宽字体！）
fb.quote("引用/提示")          // block_type: 15
fb.quoteBold("粗:", "普通")    // 引用混排
fb.divider()                   // block_type: 22（分割线）
```

### 关键：表格和流程图用 code block

飞书 API 不直接支持创建表格块，用 code block（等宽字体）+ Unicode 框线字符完美替代：

```javascript
fb.code(
`┌────────┬────────┬────────┐
│  列1   │  列2   │  列3   │
├────────┼────────┼────────┤
│  数据  │  数据  │  数据  │
└────────┴────────┴────────┘`
)
```

## 飞书推送 (feishu-send.js)

```bash
~/.claude/tools/feishu-send.js "标题" "内容" [color]
# Colors: blue|turquoise|red|green|yellow|purple|grey
```

## 环境变量

```json
{
  "env": {
    "FEISHU_APP_ID": "cli_a93d6c1791b81cd2",
    "FEISHU_APP_SECRET": "aKzWKQVJO8wYybeN6tziRgr6qRp0ZLxf",
    "FEISHU_WEBHOOK": "https://open.feishu.cn/open-apis/bot/v2/hook/6f7175b3-..."
  }
}
```

## 关键注意事项

- **分批上传**：每批不超过 50 个块，否则 API 静默失败
- **text_element_style**：必须包含 bold, italic, underline, strikethrough, inline_code 五个字段
- **style.folded**：必须存在（即使为 false）
- **document_revision_id=-1**：必须在 URL 参数中
- **API code:0 ≠ 成功**：必须双重验证，用户说有问题 > API 说成功

## 威胁等级：CRITICAL
用户声明："否则直接卸载你用 openclaw！！！"
这是生死要求，必须 100% 可靠。
