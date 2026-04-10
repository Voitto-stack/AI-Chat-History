# 全球宏观日报系统 (macro-daily) — 实施方案

## Context

用户需要每天自动分析国际局势并推送到飞书，涵盖地缘政治、经济金融、外交动态及对普通人的影响。现有 morning-brief 系统只覆盖股市行情+科技新闻，缺少宏观分析能力。本项目作为独立系统补充这个缺口。

## 架构决策

| 决策 | 选择 | 原因 |
|------|------|------|
| 语言 | Plain JS | 与 morning-brief 一致，无需编译 |
| 输出 | 飞书卡片(purple) | 与早报(blue)视觉区分 |
| 新闻源 | GDELT + 财联社 | 英文国际 + 中文视角双语合成 |
| AI | callapi.top / claude-opus-4-6 | 用户已有key，anthropic-messages格式 |
| 调度 | PM2 cron 8:30 | 早报8:03之后27分钟，不冲突 |
| 项目位置 | ~/macro-daily/ | 独立于 morning-brief |

## 项目结构

```
~/macro-daily/
├── macro-daily.js          # 主脚本（唯一代码文件，~400行）
├── ecosystem.config.js     # PM2 调度配置
├── package.json            # 依赖：axios, rss-parser
├── sent_news.json          # 去重历史（运行时自动创建）
└── .last-sent              # 每日发送标记（运行时自动创建）
```

## 数据流

```
GDELT API (5个主题查询, 每个50条) ──┐
                                     ├─ 去重合并 → Claude 分析 → 飞书卡片推送
财联社 API (30条快讯, 过滤地缘相关) ──┘
```

## 实施步骤

### Step 1: 项目初始化
- `mkdir ~/macro-daily && cd ~/macro-daily`
- 创建 `package.json`，安装 `axios` + `rss-parser`

### Step 2: 创建 macro-daily.js（单文件，6个模块）

**模块A: 配置与工具函数**
- 复用 morning-brief 的 httpGet/httpPost 模式（httpPost 增加 extraHeaders 参数支持 anthropic API）
- 复用去重逻辑：loadHistory/saveHistory/filterDuplicates（3天滚动窗口）
- 复用每日防重：checkAlreadySentToday/markSentToday
- 参考文件：`~/.morning-brief/morning-brief.js`

**模块B: GDELT 新闻采集**
- 5个聚焦查询（china, trade/tariff, geopolitics, economy/inflation, military/conflict）
- 每个查询间隔6秒（尊重速率限制），每个取50条
- 按标题归一化去重（lowercase + 去标点）
- 预期产出：100-150条去重后的英文标题

**模块C: 中文新闻采集**
- 财联社 telegraph API：`https://www.cls.cn/nodeapi/updateTelegraphList`
- 返回字段：title, content, ctime, level(A/B/C), subjects
- 关键词过滤地缘相关：中东/贸易/关税/外交/军事/制裁/经济/通胀/央行等
- 优先 level A/B 条目
- 注：观察者网RSS返回反爬JS、界面新闻RSS 404，均不可用，仅用财联社

**模块D: Claude AI 分析**
- 通过 callapi.top anthropic-messages API 调用 claude-opus-4-6
- Headers: `x-api-key` + `anthropic-version: 2023-06-01`
- Prompt 要求输出：
  1. 今日核心事件 TOP 5（类型/市场冲击/因果链/受益受损方/普通人影响/风险指数）
  2. 整体风险状态（Risk-On / Risk-Off / 中性）
  3. 中国视角（官方立场、对中国影响、普通人关注点）
  4. 一句话总结
- max_tokens: 4000，输入约1000 tokens（标题为主），总成本极低

**模块E: 飞书卡片**
- 直接构建 webhook 卡片（参考 `~/.claude/tools/feishu-send.js` buildMessage 模式）
- Header: purple 模板，标题含日期
- Body: Claude 分析文本作为 markdown element
- 卡片内容约 6-10KB，远低于飞书 30KB 限制

**模块F: 主流程编排**
```
main():
  1. checkAlreadySentToday() → 防重
  2. Promise.all([fetchGDELT(), fetchChineseNews()]) → 并行采集
  3. analyzeWithClaude(gdelt, cls) → AI 分析（失败则降级为纯标题列表）
  4. formatFeishuCard() + sendToFeishu() → 推送
  5. saveHistory() + markSentToday() → 标记完成
```

### Step 3: 创建 ecosystem.config.js
- PM2 cron: `30 8 * * *`（每天8:30）
- 环境变量：FEISHU_WEBHOOK, ANTHROPIC_BASE_URL, ANTHROPIC_AUTH_TOKEN
- 日志：pm2-out.log, pm2-error.log

### Step 4: 测试与部署
1. `node macro-daily.js` 手动跑一次验证全链路
2. `pm2 start ecosystem.config.js && pm2 save` 注册定时任务

## 容错设计

| 故障场景 | 处理 |
|----------|------|
| GDELT 全部失败 | 仅用财联社数据继续 |
| 财联社 API 失败 | 仅用 GDELT 继续 |
| Claude API 失败 | 降级为纯标题列表卡片（无分析） |
| 飞书推送失败 | 不标记已发送，PM2 下次重试 |

## 关键复用

| 复用来源 | 复用内容 |
|----------|----------|
| `~/.morning-brief/morning-brief.js` | httpGet/httpPost、去重逻辑、每日防重、飞书卡片结构 |
| `~/.claude/tools/feishu-send.js` | buildMessage 卡片格式参考 |
| `~/.claude/settings.json` | 所有环境变量（FEISHU_WEBHOOK, ANTHROPIC_*） |
| `~/.morning-brief/ecosystem.config.js` | PM2 配置模式 |

## 验证方法

1. 单独测试 GDELT 采集：确认返回文章数 > 0
2. 单独测试财联社采集：确认返回快讯且过滤有效
3. 测试 Claude API：用固定新闻集调用，确认返回结构化分析
4. 测试飞书推送：确认 purple 卡片出现在群里
5. 端到端：`node macro-daily.js` 完整跑通
6. 防重测试：同一天跑两次，第二次应跳过
7. PM2：注册后次日检查 `pm2 logs macro-daily`
