# 多模型决策系统 (Multi-Model Debate System)

## Context（背景）

用户希望构建一个能够调用多个 AI 模型进行"辩论式决策"的系统��传统的单模型决策可能存在盲点和偏见，而多模型协作可以：

1. **多视角分析**：不同模型从战略、工程、反对者、发散思维等角色切入
2. **交叉质疑**：模型之间互相批判，找出逻辑漏洞
3. **综合最优解**：Claude 作为综合者，融合各方观点

**关键约束**：
- 用户已有 iFlow 平台的 API key 和 base URL（https://platform.iflow.cn/models）
- 支持多个模型：Qwen3-Max, DeepSeek-V3, Kimi-K2, Qwen3-Coder-Plus 等
- 需要角色化辩论机制（不是简单的并发调用）
- 最终由 Claude (我) 进行融合总结

## 设计方案

### 架构选择：渐进式实现

**Phase 1：轻量级脚本 + Skill**（推荐先实现）
- 独立 Node.js 脚本实现多模型调用
- Claude Skill 包装调用接口
- 快速迭代，易于调试

**Phase 2：MCP Server**（后续升级）
- 标准化工具接口
- 更好的 Claude Code 集成
- 可复用性更强

### 核心组件

```
┌─────────────────────────────────────────────────────────────┐
│                    Multi-Model Debate System                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User Prompt → Debate Orchestrator (Claude)                 │
│                        ↓                                    │
│         ┌──────────────┼──────────────┐                     │
│         ↓              ↓              ↓                     │
│    Strategist     Challenger    Engineer    Divergent       │
│   (Qwen3-Max)  (DeepSeek-V3)  (Kimi-K2) (Qwen3-Coder)       │
│         │              │              │         │           │
│         └──────────────┼──────────────┘         │           │
│                        ↓                        │           │
│              Cross-Critique Round                           │
│         (Each model attacks others' proposals)              │
│                        ↓                                    │
│              Defense & Refinement Round                     │
│         (Each model defends and improves)                   │
│                        ↓                                    │
│              Synthesis by Claude                            │
│         (Extract best ideas, flag tradeoffs)                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 实现细节

### 1. 目录结构

```
~/.claude/tools/
├── multi-model-debate/
│   ├── index.js                 # 主入口：辩论编排器
│   ├── models/
│   │   ├── unified-client.js    # 统一 API 客户端（Claude + iFlow）
│   │   └── role-prompts.js      # 角色系统提示词
│   ├── debate/
│   │   ├── orchestrator.js      # 辩论流程控制
│   │   └── synthesis.js         # 结果融合逻辑
│   └── utils/
│       ├── logger.js            # 日志工具
│       ├── markdown-formatter.js # 输出格式化
│       └── feishu-pusher.js     # 飞书文档推送（复用现有工具）
├── package.json
└── README.md

~/.claude/skills/
└── multi-model-debate/
    └── SKILL.md                 # Claude Skill 定义
```

### 2. 角色定义（混合 Claude + iFlow 模型）

**最小可用版本（MVP）配置**：

| 角色 | 模型 | API | 系统提示 | 选择理由 |
|------|------|-----|---------|---------|
| **Strategist（战略家）** | `claude-opus-4-6` | Anthropic | "你是战略决策专家，关注长期影响、商业价值、风险管控" | 最强推理能力，适合高层决策 |
| **Challenger（质疑者）** | `deepseek-v3` | iFlow | "你是批判性思维专家，专门找漏洞、质疑假设、识别风险" | 逻辑分析强，成本低 |
| **Engineer（工程师）** | `claude-sonnet-4-5` | Anthropic | "你是工程实践专家，评估可行性、成本、技术债务" | 平衡性能和成本，工具调用强 |
| **Divergent（发散者）** | `qwen3-coder-plus` | iFlow | "你是创新思维专家，提出非常规方案、探索边界可能性" | 1M 上下文，代码生成强 |

**扩展配置**（后续可选）：
- 替换 Divergent 为 `qwen3-max`（中文场景）
- 替换 Engineer 为 `kimi-k2-instruct-0905`（前端专项）
- 添加第 5 个角色：`claude-haiku-4-5`（快速验证角色）

**混合架构优势**：
1. **质��保障**：Claude 模型负责关键推理（战略 + 工程）
2. **成本优化**：iFlow 模型负责批判和发散（频次高但要求相对低）
3. **能力互补**：Claude 工具调用 + Qwen 长上下文 + DeepSeek 推理
4. **灵活替换**：可根据任务类型动态调整模型组合

### 3. 辩论流程（3 轮）

#### Round 1: Initial Proposals（初始提案）
```javascript
const proposals = await Promise.all([
  callModel('qwen3-max', strategistPrompt(userTask)),
  callModel('deepseek-v3', challengerPrompt(userTask)),
  callModel('kimi-k2-instruct-0905', engineerPrompt(userTask)),
  callModel('qwen3-coder-plus', divergentPrompt(userTask))
]);
```

每个模型输出格式：
```markdown
## 我的方案

<核心建议>

## 支持论据

1. ...
2. ...

## 潜在风险

1. ...
2. ...
```

#### Round 2: Cross-Critique（交叉批判）
```javascript
// 每个模型批判其他 3 个模型的方案
for (const model of models) {
  const critique = await callModel(model, {
    role: roles[model],
    context: allProposals,
    task: '批判性分析其他方案的漏洞和风险'
  });
  critiques[model] = critique;
}
```

#### Round 3: Defense & Refinement（防御与改进）
```javascript
// 每个模型根据批判改进自己的方案
for (const model of models) {
  const refined = await callModel(model, {
    role: roles[model],
    context: { myProposal: proposals[model], critiques: critiques },
    task: '回应批评并改进方案'
  });
  refinedProposals[model] = refined;
}
```

#### Final: Claude Synthesis（Claude 综合）
```javascript
// 我（Claude）阅读所有辩论记录并综合
const debateLog = formatDebateLog(proposals, critiques, refinedProposals);
// 返回给用户，包含：
// 1. 各方案的核心洞察
// 2. 共识点
// 3. 关键分歧
// 4. 推荐方案（可能是融合版）
// 5. 需要用户决策的点
```

### 4. 统一 API 客户端实现（支持 Anthropic + iFlow）

基于现有的 `feishu-block-builder.js` 模式，实现**多 API 统一接口**：

```javascript
// models/unified-client.js
const https = require('https');

class UnifiedModelClient {
  constructor(config) {
    this.anthropicKey = config.anthropicKey || process.env.ANTHROPIC_API_KEY;
    this.iflowKey = config.iflowKey || process.env.IFLOW_API_KEY;
    this.anthropicBaseURL = config.anthropicBaseURL || process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com';
    this.iflowBaseURL = config.iflowBaseURL || 'https://platform.iflow.cn/v1';
  }

  async chat(model, messages, options = {}) {
    // 路由到正确的 API
    if (model.startsWith('claude-')) {
      return this._callAnthropic(model, messages, options);
    } else {
      return this._callIFlow(model, messages, options);
    }
  }

  async _callAnthropic(model, messages, options) {
    const url = new URL('/v1/messages', this.anthropicBaseURL);

    const requestBody = {
      model,
      messages,
      max_tokens: options.maxTokens || 2000,
      temperature: options.temperature || 0.7
    };

    return new Promise((resolve, reject) => {
      const req = https.request({
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
          'x-api-key': this.anthropicKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result.error) {
              reject(new Error(result.error.message));
            } else {
              // 提取文本内容
              const content = result.content.find(c => c.type === 'text');
              resolve(content ? content.text : '');
            }
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}`));
          }
        });
      });

      req.on('error', reject);
      req.write(JSON.stringify(requestBody));
      req.end();
    });
  }

  async _callIFlow(model, messages, options) {
    const url = new URL('/chat/completions', this.iflowBaseURL);

    const requestBody = {
      model,
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 2000
    };

    return new Promise((resolve, reject) => {
      const req = https.request({
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.iflowKey}`,
          'Content-Type': 'application/json'
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result.error) {
              reject(new Error(result.error.message));
            } else {
              resolve(result.choices[0].message.content);
            }
          } catch (e) {
            reject(new Error(`Parse error: ${e.message}`));
          }
        });
      });

      req.on('error', reject);
      req.write(JSON.stringify(requestBody));
      req.end();
    });
  }
}

module.exports = UnifiedModelClient;
```

**关键特性**：
1. **自动路由**：根据 model 名称前缀自动选择 API
2. **统一接口**：调用方无需关心底层 API 差异
3. **可扩展**：后续可添加 OpenAI、Gemini 等
4. **环境变量优先**：支持从 settings.json 或环境变量读取配置

### 5. 主脚本结构（MVP 版本）

```javascript
// index.js
const UnifiedModelClient = require('./models/unified-client');
const { rolePrompts } = require('./models/role-prompts');
const { runDebate } = require('./debate/orchestrator');
const fs = require('fs');

async function main(userTask, options = {}) {
  // 初始化客户端
  const client = new UnifiedModelClient({
    anthropicKey: process.env.ANTHROPIC_API_KEY,
    iflowKey: process.env.IFLOW_API_KEY,
    anthropicBaseURL: process.env.ANTHROPIC_BASE_URL,
    iflowBaseURL: process.env.IFLOW_BASE_URL
  });

  // MVP 配置：混合 Claude + iFlow
  const config = {
    rounds: options.rounds || 3,
    models: {
      strategist: 'claude-opus-4-6',          // Claude: 战略推理
      challenger: 'deepseek-v3',              // iFlow: 批判质疑
      engineer: 'claude-sonnet-4-5-20250929', // Claude: 工程实践
      divergent: 'qwen3-coder-plus'           // iFlow: 发散创新
    },
    temperature: options.temperature || 0.7,
    maxTokens: options.maxTokens || 2000
  };

  console.log('🚀 启动多模型辩论...');
  console.log(`任务: ${userTask}`);
  console.log(`配置: ${config.rounds} 轮辩论，4 个模型`);

  // 运行辩论
  const debateLog = await runDebate(client, userTask, config);

  // 保存日志
  const logPath = `/tmp/debate_${Date.now()}.md`;
  fs.writeFileSync(logPath, debateLog, 'utf8');

  console.log(`\n✅ 辩论完成！`);
  console.log(`📄 辩论记录: ${logPath}`);

  // 如果启用飞书推送
  if (options.feishu) {
    const { pushToFeishu } = require('./utils/feishu-pusher');
    const docUrl = await pushToFeishu(debateLog, userTask);
    console.log(`📱 飞书文档: ${docUrl}`);
    return { logPath, docUrl };
  }

  return { logPath };
}

// CLI 入口
if (require.main === module) {
  const task = process.argv.slice(2).join(' ');
  if (!task) {
    console.error('用法: node index.js "<决策问题>"');
    process.exit(1);
  }

  main(task, {
    feishu: process.env.PUSH_TO_FEISHU === 'true'
  }).catch(error => {
    console.error('❌ 辩论失败:', error.message);
    process.exit(1);
  });
}

module.exports = { main };
```

**关键特性**：
1. **自动 API 路由**：UnifiedModelClient 自动处理 Claude/iFlow 切换
2. **可选飞书推送**：通过环境变量 `PUSH_TO_FEISHU=true` 启用
3. **清晰日志**：进度和结果可见
4. **错误处理**：捕获并友好展示错误

### 6. Claude Skill 定义

```markdown
---
name: multi-model-debate
description: "Run multi-model debate on complex decisions. Models debate from different angles (strategy, challenge, engineering, divergent), then Claude synthesizes the best approach."
allowed-tools: Bash, Read
---

# Multi-Model Debate

Orchestrate a debate between multiple AI models to find optimal decisions through adversarial collaboration.

## Usage

When the user asks to:
- "用多个模型辩论这个问题"
- "多模型决策：<问题>"
- "让 AI 们互相批判"

Call the debate system:

```bash
node ~/.claude/tools/multi-model-debate/index.js "<user_task>"
```

Then read the debate log and synthesize the results for the user.

## Parameters

- `--rounds <n>`: Number of debate rounds (default: 3)
- `--temperature <t>`: Model temperature (default: 0.7)
- `--models <json>`: Custom model selection

## Output

Returns a markdown file path containing:
1. Initial proposals from each role
2. Cross-critique exchanges
3. Refined proposals after defense
4. (You will synthesize the final recommendation)

## Your Role

After the debate completes:
1. Read the full debate log
2. Extract key insights from each model
3. Identify consensus vs. conflicts
4. Synthesize a recommended approach
5. Flag decisions that need user input
6. Present tradeoffs clearly
```

### 8. 飞书文档推送实现

复用现有的 `feishu-block-builder.js` 工具：

```javascript
// utils/feishu-pusher.js
const { createDocument, getToken, addBlocks } = require('../../feishu-block-builder');

async function pushToFeishu(debateLog, title) {
  try {
    // 1. 解析 Markdown 为飞书 Block
    const blocks = parseMarkdownToBlocks(debateLog);

    // 2. 创建文档
    const token = await getToken();
    const docId = await createDocument(token, `多模型辩论：${title}`);

    // 3. 添加内容
    await addBlocks(token, docId, blocks);

    // 4. 设置权限为任何人可编辑
    await setDocumentPermission(token, docId, 'anyone_can_edit');

    // 5. 生成分享链接
    const shareUrl = `https://feishu.cn/docx/${docId}`;

    console.log(`✅ 飞书文档创建成功: ${shareUrl}`);
    return shareUrl;
  } catch (error) {
    console.error('❌ 飞书推送失败:', error.message);
    throw error;
  }
}

function parseMarkdownToBlocks(markdown) {
  // 基础实现：按行解析
  const lines = markdown.split('\n');
  const blocks = [];

  lines.forEach(line => {
    if (line.startsWith('# ')) {
      blocks.push({ block_type: 1, heading1: { elements: [{ text_run: { content: line.slice(2) } }] } });
    } else if (line.startsWith('## ')) {
      blocks.push({ block_type: 2, heading2: { elements: [{ text_run: { content: line.slice(3) } }] } });
    } else if (line.trim()) {
      blocks.push({ block_type: 3, text: { elements: [{ text_run: { content: line } }] } });
    }
  });

  return blocks;
}

async function setDocumentPermission(token, docId, level) {
  // 调用飞书权限 API
  const https = require('https');
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'open.feishu.cn',
      path: `/open-apis/drive/v2/permissions/${docId}/public`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const result = JSON.parse(data);
        if (result.code === 0) resolve(result);
        else reject(new Error(result.msg));
      });
    });
    req.write(JSON.stringify({
      external_access: true,
      security_entity: 'anyone_can_edit',
      comment_entity: 'anyone_can_view'
    }));
    req.end();
  });
}

module.exports = { pushToFeishu };
```

**关键点**：
1. **复用现有工具**：`feishu-block-builder.js` 已实现文档创建
2. **Markdown 解析**：将辩论日志转为飞书原生 Block
3. **权限设置**：自动设为"任何人可编辑"（用户记忆中的铁规）
4. **错误处理**：失败时降级为本地文件

添加到 `~/.claude/settings.json`:

```json
{
  "env": {
    "IFLOW_API_KEY": "用户的 iFlow API key",
    "IFLOW_BASE_URL": "https://platform.iflow.cn/v1",
    "ANTHROPIC_API_KEY": "用户的 Claude API key（如果未设置，从现有配置读取）",
    "ANTHROPIC_BASE_URL": "http://38.92.214.244:3000/api（当前配置中的代理地址）"
  }
}
```

**注意**：
- `ANTHROPIC_API_KEY` 和 `ANTHROPIC_BASE_URL` 已在当前 `settings.json` 中配置
- 仅需添加 `IFLOW_API_KEY` 和 `IFLOW_BASE_URL`
- 代码会自动从环境变量或 settings.json 读取

## 关键文件路径

| 文件 | 路径 | 说明 |
|------|------|------|
| 主脚本 | `~/.claude/tools/multi-model-debate/index.js` | 辩论编排器入口 |
| 统一客户端 | `~/.claude/tools/multi-model-debate/models/unified-client.js` | Claude + iFlow API 封装 |
| 角色定义 | `~/.claude/tools/multi-model-debate/models/role-prompts.js` | 各角色系统提示 |
| 辩论逻辑 | `~/.claude/tools/multi-model-debate/debate/orchestrator.js` | 辩论流程控制 |
| 飞书推送 | `~/.claude/tools/multi-model-debate/utils/feishu-pusher.js` | 飞书文档推送 |
| Claude Skill | `~/.claude/skills/multi-model-debate/SKILL.md` | Skill 定义 |
| 配置文件 | `~/.claude/settings.json` | API keys 存储 |
| 现有飞书工具 | `~/.claude/tools/feishu-block-builder.js` | 复用的飞书核心库 |

## 验证方案

### 测试用例 1：简单决策
```bash
node ~/.claude/tools/multi-model-debate/index.js "我们应该用微服务还是单体架构？"
```

**预期输出**：
- 4 个模型的初始方案
- 每个模型对其他模型的批判
- 改进后的方案
- 日志文件路径

### 测试用例 2：通过 Skill 调用
```
用户: "用多模型辩论：Next.js 还是 Remix？"
Claude: [调用 /multi-model-debate skill]
       [读取辩论日志]
       [综合分析并呈现]
```

### 测试用例 3：API 连通性测试
```bash
# 先测试单模型调用
curl -X POST https://platform.iflow.cn/v1/chat/completions \
  -H "Authorization: Bearer $IFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3-max",
    "messages": [{"role": "user", "content": "你好"}],
    "max_tokens": 100
  }'
```

## 成本估算（混合模型）

### 单次辩论成本

**模型使用**（3 轮辩论）：
- **Claude Opus 4.6** (Strategist): 3 轮 × ~1000 tokens ≈ 3K tokens
- **DeepSeek-V3** (Challenger): 3 轮 × ~1000 tokens ≈ 3K tokens
- **Claude Sonnet 4.5** (Engineer): 3 轮 × ~1000 tokens ≈ 3K tokens
- **Qwen3-Coder-Plus** (Divergent): 3 轮 × ~1000 tokens ≈ 3K tokens

**价格估算**（假设）：
- Claude Opus 4.6: $15/M input, $75/M output → 3K tokens ≈ $0.09
- Claude Sonnet 4.5: $3/M input, $15/M output → 3K tokens ≈ $0.018
- iFlow 模型: $0.5/M tokens → 6K tokens ≈ $0.003

**单次辩论总成本**: ~$0.111 (主要成本来自 Claude Opus)

**成本优化策略**：
1. **按需使用 Opus**：简单决策可用 Sonnet 替代 Strategist
2. **调整轮数**：2 轮辩论可降低 33% 成本
3. **纯 iFlow 模式**：全部使用 iFlow 模型 → ~$0.006/次
4. **缓存优化**：使用 Anthropic 的 prompt caching（后续）

**月度成本**（按 50 次决策）：
- 混合模式: ~$5.5/月
- 纯 iFlow: ~$0.30/月
- 纯 Claude: ~$15/月

## 扩展路径

### Phase 1 完成后可扩展：
1. **结果持久化**：保存到 MetaMemory 供未来参考
2. **自我进化**：通过 Self-Improving Agent 学习最佳辩论模式
3. **MCP Server 化**：标准化为 MCP 工具集成到 Claude Code
4. **可视化**：生成辩论流程图（Mermaid）
5. **飞书推送**：将辩论结果推送到飞书群

### 与现有系统集成：
- **MetaBot**：可以作为 bot 调用辩论系统
- **Self-Improving**：从辩论结果中学习模式
- **Morning Brief**：用于决策性新闻分析
- **Feishu**：推送辩论结果卡片

## 风险和缓解

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| iFlow API 不稳定 | 辩论中断 | 实现重试机制 + 保存中间结果 |
| 模型幻觉/矛盾 | 无效建议 | Claude 最终审查 + 标注不确定性 |
| 成本超预期 | 预算问题 | 设置 token 上限 + 使用计数器 |
| 辩论陷入循环 | 浪费时间 | 限制轮数 + 超时控制 |
| 平台停服（2026-04-17）| 系统失效 | 设计为可插拔架构，便于切换 API |

## 开发顺序（MVP：最小可用版本）

### Phase 1: 核心基础（2 小时）

1. **统一 API 客户端**（1 小时）
   - 实现 `unified-client.js`
   - 支持 Claude (Anthropic API) + iFlow API
   - 测试单模型调用（claude-opus-4-6, deepseek-v3）

2. **角色系统提示**（1 小时）
   - 定义 4 个角色的提示词（战略/批判/工程/发散）
   - 针对混合模型优化提示词

### Phase 2: 辩论引擎（2 小时）

3. **辩论编排器**（1.5 小时）
   - 实现 3 轮辩论流程（提案 → 批判 → 改进）
   - Promise.all 并发调用
   - Markdown 日志格式化

4. **主脚本集成**（30 分钟）
   - CLI 入口
   - 环境变量读取
   - 错误处理

### Phase 3: 飞书集成（1.5 小时）

5. **飞书推送实现**（1 小时）
   - 实现 `feishu-pusher.js`
   - 复用 `feishu-block-builder.js`
   - Markdown → 飞书 Block 转换
   - 权限设置（任何人可编辑）

6. **集成测试**（30 分钟）
   - 端到端测试：辩论 → 本地保存 → 飞书推送
   - 验证文档链接可访问

### Phase 4: Claude Skill（30 分钟）

7. **Skill 定义与测试**
   - 编写 `SKILL.md`
   - 测试技能调用
   - 验证 Claude 综合能力

**总计**：约 6 小时（含测试）

---

## 配置步骤（实施前）

### 步骤 1：配置 iFlow API
```bash
# 编辑 settings.json
claude edit ~/.claude/settings.json

# 添加：
{
  "env": {
    "IFLOW_API_KEY": "<用户提供的 key>",
    "IFLOW_BASE_URL": "https://platform.iflow.cn/v1"
  }
}
```

### 步骤 2：验证 Anthropic API
```bash
# 检查现有配置
cat ~/.claude/settings.json | grep ANTHROPIC

# 应该已有：
# ANTHROPIC_API_KEY: "cr_0568..."
# ANTHROPIC_BASE_URL: "http://38.92.214.244:3000/api"
```

### 步骤 3：测试 API 连通性
```bash
# 测试 iFlow（用户提供 key 后执行）
curl -X POST https://platform.iflow.cn/v1/chat/completions \
  -H "Authorization: Bearer $IFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen3-max","messages":[{"role":"user","content":"你好"}],"max_tokens":50}'

# 测试 Anthropic（应该已可用）
curl -X POST http://38.92.214.244:3000/api/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"model":"claude-sonnet-4-5-20250929","messages":[{"role":"user","content":"你好"}],"max_tokens":50}'
```

## 依赖

```json
{
  "dependencies": {
    // 无外部依赖，仅使用 Node.js 原生模块
  }
}
```

## 许可权限需求

执行此计划需要：
- **Bash 工具**：运行 Node.js 脚本
- **Write 工具**：创建脚本和配置文件
- **Edit 工具**：更新 settings.json
- **Read 工具**：读取辩论日志

无需权限：
- Git 操作（仅本地文件创建）
- 网络请求（通过 Node.js HTTPS 模块）
