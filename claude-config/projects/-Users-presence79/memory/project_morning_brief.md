---
name: 每日早报自动推送系统
description: 用户配置了完整的早报系统，每天8:03自动推送股市行情和新闻到飞书
type: project
---

用户在 2026-03-22 配置了一个完整的每日早报自动推送系统。
在 2026-03-24 从 crontab 迁移到 PM2 管理。

## 系统位置
- **主程序**：`~/.morning-brief/morning-brief.js`
- **PM2 配置**：`~/.morning-brief/ecosystem.config.js`
- **文档**：`~/.morning-brief/README.md`
- **日志**：`~/.morning-brief/pm2-out.log` 和 `pm2-error.log`
- **定时任务**：PM2 cron 模式 (每天早上 8:03 执行)
- **Webhook 配置**：PM2 配置文件中的环境变量

## 功能描述
系统每天早上 8:03 自动执行，获取以下数据并推送到飞书：
1. 美股行情（道琼斯、纳斯达克、标普500）- 新浪财经接口
2. A股行情（上证、深证、创业板）- 新浪财经接口
3. 国际新闻（虎嗅商业、少数派）- RSS
4. 国内新闻（IT之家、虎嗅）- RSS
5. AI科技新闻（InfoQ、开源中国）- RSS

## 技术架构
- **Node.js** 脚本，使用 `rss-parser` 和 `cheerio` 库
- **双层获取策略**：RSS 优先，失败后自动切换到网页抓取备用方案
- **飞书推送**：使用 Webhook + 交互式卡片消息格式
- **进程管理**：PM2（cron 模式，不依赖 Claude Code）
- **为什么用 PM2**：解决了 macOS crontab 在休眠时不执行的问题，统一日志管理

## 数据源配置
所有数据源完全免费，国内可访问，不需要 API key：
- IT之家：`https://www.ithome.com/rss/`
- 少数派：`https://sspai.com/feed`
- 虎嗅：`https://www.huxiu.com/rss/0.xml`
- InfoQ：`https://www.infoq.cn/feed`
- 开源中国：`https://www.oschina.net/news/rss`

## Why: 动机
用户最初想用 Claude 的 CronCreate，但发现 WebSearch 不可用。改为独立系统后：
- 永久稳定（不会 7 天失效）
- 完全免费（不依赖付费 API）
- 可自定义（可随时修改代码）

## How to apply: 维护指南
- **查看执行日志**：`pm2 logs morning-brief` 或 `tail -f ~/.morning-brief/pm2-out.log`
- **查看运行状态**：`pm2 list` 或 `pm2 info morning-brief`
- **手动触发测试**：`pm2 restart morning-brief`
- **修改推送时间**：编辑 `~/.morning-brief/ecosystem.config.js` 中的 `cron_restart`，然后 `pm2 restart morning-brief`
- **更新数据源**：编辑 `morning-brief.js` 中的 `RSS_SOURCES` 配置
- **调试问题**：检查 PM2 状态、Webhook 是否有效、RSS 源是否可访问

## 测试结果
2026-03-24 迁移到 PM2 后测试：100% 成功率
- 美股：3条 ✅
- A股：3条 ✅
- 新闻去重：正常 ✅
- 飞书推送：成功 ✅

## 迁移历史
- 2026-03-22：使用 crontab 定时任务
- 2026-03-24：迁移到 PM2（解决 macOS 休眠时不执行的问题）
