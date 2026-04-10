---
name: multi-model-debate
description: "Run multi-model debate on complex decisions. Models debate from different angles (strategy/challenge/engineering/divergent), then Claude synthesizes the best approach. Use when user wants AI models to debate and find optimal solution."
allowed-tools: Bash, Read, WebSearch, WebFetch
---

# Multi-Model Debate（多模型辩论）

通过多个 AI 模型的对抗性协作，为复杂决策找到最优方案。

**🆕 新功能**：模型现已支持主动搜索全网内容！每个模型可以在辩论过程中自主调用搜索工具验证事实、获取最新信息。

## 触发条件

当用户提出以下请求时使用：
- "用多个模型辩论这个问题"
- "多模型决策：<问题>"
- "让 AI 们互相批判"
- "辩论一下"
- "Battle：<问题>"

## 工作流程（两种模式）

### 模式 A：搜索增强模式（默认，推荐）

模型在辩论过程中可以主动搜索验证事实，质量更高但耗时稍长。

```bash
node ~/.claude/tools/multi-model-debate/index.js "<决策问题>"
```

**你的职责**：
1. 直接启动辩论（无需预研究）
2. 辩论完成后，读取日志并综合分析

### 模式 B：快速模式（无搜索）

传统模式，模型只能基于训练数据和你提供的事实库辩论。适合简单问题或时间紧急场景。

```bash
node ~/.claude/tools/multi-model-debate/index.js "<决策问题>" --no-search
```

**你的职责**：
1. **研究阶段**（30-60秒）：
   - 广度搜索（5-8 次 WebSearch）
   - 深度抓取（2-3 次 WebFetch）
   - 交叉验证，写入事实库 `/tmp/debate_facts_<timestamp>.txt`
2. **启动辩论**：
   ```bash
   node index.js "<问题>" --facts-file /tmp/debate_facts_xxx.txt --no-search
   ```
3. **综合分析**：读取辩论记录，给出最终方案

## 可选参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--no-search` | 禁用模型搜索（快速模式） | 否（默认启用搜索）|
| `--enable-search` | 显式启用搜索 | 是 |
| `--facts-file <path>` | 外部事实库文件（每行一条事实） | 无 |
| `--feishu` | 推送到飞书文档 | 否 |
| `--role` | 切换为角色模式 | Battle 模式 |
| `--rounds <n>` | 辩论轮数 | 3 |
| `--temperature <t>` | 模型温度 | 0.7 |
| `--max-tokens <n>` | 最大 tokens | 2000 |

## 参与模型（8 个：6 中国 + 2 外国）

| Key | 模型 | 支持搜索 | 备用模型链 |
|-----|------|----------|-----------|
| strategist | Qwen3-Max | ✅ | Qwen3-Max-Preview → Qwen3-235B |
| challenger | DeepSeek-V3 | ✅ | DeepSeek-V3.2 → Kimi-K2 |
| engineer | Qwen3-Coder-Plus | ✅ | Kimi-K2 → DeepSeek-V3.2 |
| divergent | Kimi-K2 | ✅ | DeepSeek-V3.2 → Qwen3-Max-Preview |
| hawk | DeepSeek-R1 | ✅ | DeepSeek-V3 → DeepSeek-V3.2 |
| mediator | Qwen3-235B | ✅ | Qwen3-Max-Preview → Kimi-K2 |
| claude | Claude Sonnet 4.6 | ✅ | Claude Opus 4.6 |
| claudeOpus | Claude Opus 4.6 | ✅ | Claude Sonnet 4.6 |

**搜索能力说明**：
- 所有 8 个模型均支持工具调用（Tool Use / Function Calling）
- 每个模型最多进行 3 轮搜索（每轮可调用 1 次搜索工具）
- 搜索结果会自动注入后续对话，供模型参考

## 辩论流程（4 轮）

```
Round 1: 独立分析（并行）🔍 可搜索
  ↓
Round 2: 互相攻击（点名开炮，直接批判）🔍 可搜索
  ↓
Round 3: 防御改进（回应批评，反驳+改进）🔍 可搜索
  ↓
Round 4: 共识提取（提取共识区/分歧区/被击溃的观点）
  ↓
Claude 综合（你阅读辩论记录，给出最终方案）
```

## 搜索机制

### 工具定义

```javascript
{
  name: 'web_search',
  description: '搜索全网内容以验证事实、获取最新信息或补充论据',
  parameters: {
    query: '搜索查询关键词',
    max_results: '返回结果数量（默认5，最多10）'
  }
}
```

### 搜索执行流程

1. **模型发起搜索**：在辩论过程中主动调用 `web_search` 工具
2. **后端执行**：通过 Tavily API 搜索全网内容
3. **结果注入**：搜索结果（标题、摘要、链接）返回给模型
4. **继续辩论**：模型基于搜索结果继续生成回复

### 搜索日志

辩论记录末尾会自动附加搜索调用日志：
- 各模型的搜索次数
- 搜索查询关键词
- 关键来源链接

### 环境变量要求

搜索功能需要配置 Tavily API：
```bash
export TAVILY_API_KEY=tvly-xxxxx
```

如果未配置，搜索调用会失败但不影响辩论继续（模型会收到"搜索失败"的错误信息）。

## 综合分析输出格式

```markdown
## 辩论综合分析

### 1. 核心洞察
- 各模型的关键观点和最有价值的发现
- 🔍 标注哪些洞察来自搜索验证

### 2. 共识点
✅ 多数模型认同的结论

### 3. 关键分歧
⚠️ 模型之间的重要差异和原因

### 4. 推荐方案
基于辩论的综合方案（必须明确，不能让用户选）

### 5. 关键风险与应对
🔴 风险点及建议措施
```

**关键要求**：
- 必须给出一个明确的、可执行的最终方案
- 不要列举多个选项让用户选择
- 说明方案融合了哪些模型的哪些具体观点
- 指出关键风险和应对措施

## 使用示例

### 示例 1：技术选型（搜索增强模式）

```
用户: "辩论一下：微服务还是单体架构？"

你的操作：
1. 直接启动辩论（模型会自动搜索最新数据）
   node index.js "微服务还是单体架构？"
2. 等待辩论完成（约 90-150 秒，含搜索时间）
3. 读取辩论记录，查看搜索日志
4. 综合分析，给出最终方案
```

### 示例 2：快速辩论（无搜索）

```
用户: "辩论一下：萧炎和林动谁更强？不用搜索，直接辩"

你的操作：
1. node index.js "萧炎和林动谁更强？" --no-search
2. 等待辩论完成（约 60-90 秒）
3. 读取辩论记录，综合分析
```

### 示例 3：混合模式（预研究 + 搜索增强）

```
用户: "辩论一下：2026年最佳前端框架"

你的操作：
1. 预研究（可选，快速建立基础事实）：
   - WebSearch "2026 前端框架对比 趋势"
   - WebSearch "React Vue Svelte 性能对比 2026"
   - 写入 /tmp/debate_facts_xxx.txt
2. 启动辩论（模型可进一步深挖）：
   node index.js "2026年最佳前端框架" --facts-file /tmp/debate_facts_xxx.txt
3. 综合分析
```

## 注意事项

1. **简单问题不适用**：差异明显的问题直接回答
2. **时间**：
   - 搜索增强模式：90-180 秒（含模型搜索时间）
   - 快速模式：60-120 秒
3. **成本**：
   - 搜索增强模式：基础成本 + 每次搜索约 ¥0.02-0.05
   - 快速模式：仅基础成本
4. **部分失败**：即使部分模型失败，也综合其余模型的输出
5. **环境变量**：需要 `IFLOW_API_KEY`、`IFLOW_BASE_URL` 和 `TAVILY_API_KEY`（搜索功能）

## 故障排查

1. 检查环境变量：`echo $IFLOW_API_KEY $TAVILY_API_KEY`
2. 查看详细错误：辩论记录中会标注失败的模型
3. 搜索失败不影响辩论继续，但会降低质量
4. 开启调试：`DEBUG=1 node index.js "问题"`
