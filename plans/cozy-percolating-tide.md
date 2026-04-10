# 多模型辩论系统 - 事实库增强

## Context
当前事实库只从用户输入中被动提取含数字/冒号的行。开放性问题（如小说角色对比）时事实库为空，但模型仍伪造 `[F编号]` 引用，导致幻觉无法识别。需要在辩论前主动研究收集事实，并在无事实库时正确兜底。

## 修改方案

### 1. `index.js` - 增加 `--facts-file` 参数
- 解析 `--facts-file <path>` CLI 参数
- 读取文件内容，传入 config.externalFacts
- 文件格式：每行一条事实，纯文本

### 2. `battle-prompts.js` - 三处修改
- `buildFactBank()`: 接受第二个参数 `externalFacts`（字符串数组），合并到提取结果中，外部事实优先
- `formatFactBank()`: 当事实库为空时，返回明确的"无事实库"提示，要求所有数据标注 `[推断]`
- `getProposalPrompt()` / `getAttackPrompt()` / `getRefinementPrompt()`: 传递 externalFacts

### 3. `role-prompts.js` - 同步修改
- 与 battle-prompts.js 相同的逻辑：buildFactBank 接受外部事实，空库兜底

### 4. `debate/battle.js` - 传递 externalFacts
- 从 config.externalFacts 取出，传给各 prompt 生成函数

### 5. `debate/orchestrator.js` - 传递 externalFacts
- 同上

### 6. `utils/research.js` - 新建骨架模块
- 导出 `async research(topic)` 函数
- 当前实现：返回空数组 + console.log 提示"搜索API未配置"
- 预留接口：后续接入搜索 API 时只需修改此文件

### 7. `SKILL.md` - 更新工作流程
- 辩论前增加"研究阶段"：Claude 用 WebSearch 搜索 3-5 次，提取关键事实
- 写入临时文件，通过 --facts-file 传入
- 说明何时跳过研究（用户已提供充分数据时）

## 关键文件
- `~/.claude/tools/multi-model-debate/index.js`
- `~/.claude/tools/multi-model-debate/models/battle-prompts.js`
- `~/.claude/tools/multi-model-debate/models/role-prompts.js`
- `~/.claude/tools/multi-model-debate/debate/battle.js`
- `~/.claude/tools/multi-model-debate/debate/orchestrator.js`
- `~/.claude/tools/multi-model-debate/utils/research.js`（新建）
- `~/.claude/skills/multi-model-debate/SKILL.md`

## 验证
1. 无 --facts-file 运行：确认 prompt 中出现"无事实库"提示
2. 有 --facts-file 运行：确认事实被正确编号为 [F1][F2]...
3. 混合场景：用户输入含数据 + 外部文件，确认合并且无重复
