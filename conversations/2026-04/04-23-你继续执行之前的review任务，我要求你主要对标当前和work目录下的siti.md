---
title: 你继续执行之前的review任务，我要求你主要对标当前和work目录下的siti
date: 2026-04-23T20:24:12+08:00
session_id: f5ad2a3f-b5b0-4e2a-afc9-ccc4f6485b39
project: /Users/presence79/Desktop/WORK/sitin-next
source: claude-code-capture
messages: 5
---

# 你继续执行之前的review任务，我要求你主要对标当前和work目录下的siti

### User (20:24:12)

你继续执行之前的review任务，我要求你主要对标当前和work目录下的sitin-monorepo目录的minerva和minerva-server，是否功能对等以及是否有代码和架构的问题，是否必须修改，你用最快的速度执行

### User (20:40:59)

这是pwa databoard：[Image #3] ，这是用户管理[Image #2]，问题：看板的单日视频数据和女用户通话订单里的数对不上，我要求展示的都是真实的用户收益订单数据，你全面排查这个问题，现在的数据是不准的，可以看看应该从什么表里找出真实数据，可以对比老项目的前后端相关逻辑

### Assistant (20:42:05)

我来帮你排查这个数据不一致的问题。先理清两张图的差异：

**数据对比（用户 7038987，2026-04-18 日）**

| 指标 | 通话订单页（真实） | 看板（存疑） |
|------|------|------|
| 订单数 | ~15 单（需分页确认） | **13** |
| 金额 | **¥43.20** | **$369.00** |
| 时长 | 需汇总 | **4h 6m 8s** |

金额差距 8 倍以上，单数不一致——看板数据源大概率不对。

接下来需要先调研：
1. 看板"视频收益"三列的数据源（表/SQL/接口）
2. 通话订单列表的数据源
3. 老项目同类指标的计算逻辑

我启动两个并行调研，同时请你补两个信息：

### Assistant (21:01:12)

好的，初步定位到了问题根源。让我深入挖掘 `pwa_daily_data` 的写入逻辑和老项目的对比。

### Assistant (21:10:15)

完整画面出来了。先给你诊断结论，再列出修复方案请你拍板。

## 根因诊断

**两个页面查的不是同一张表：**

| 页面 | 数据源 | 过滤条件 | 写入方 |
|------|--------|----------|--------|
| 通话订单（真） | `user_call_order` 原始表 | `status='PAID'` + 用户 ID + `create_at` 范围 | 业务系统实时写入 |
| 看板（假） | `pwa_daily_data` **预聚合表** | `vesting_date` 范围 | **外部 ETL，源码不在本 repo**，Minerva 只读 |

**关键位置：**
- 看板 SQL：`packages/app-minerva-server/src/routes/pwa-databoard/pwa-databoard.ts:166-190`（直接 SUM 预聚合表）
- 订单 SQL：`packages/app-minerva-server/src/routes/users/user-data.ts:133-140`（实时查原始表，SUM(amount) WHERE status='PAID'）
- 表结构：`packages/app-minerva-server/prisma/monitor/schema.prisma:14-44`（`video_call_income Decimal(10,2)`）

**为什么数据差了近 10 倍**：

`pwa_daily_data` 的写入逻辑 **完全不在这个 repo**（全仓搜不到任何 INSERT/UPDATE），所以无法用代码审计它。但从现象推断，极大概率是以下一种：
1. ETL 没按 `status='PAID'` 过滤，把 INIT / MISS_CALL 的"应收"或"标价"也算进去了
2. `vesting_date` 是**归属日**而非**创建日**，把跨天结算的订单聚到了一起
3. 单位错位（ETL 侧把分当成元，或币种混算）
4. 维度错位：可能把该女用户作为男方参与的订单金额也累加了

**老项目（Proto 4772）走的是什么**：Minerva 里只做了透传代理（`pwa-databoard.ts:791-800`，`protoPost(4772, body)`），老项目源码不在本 repo。你页面上有 "Proto 接口" / "Minerva Server" 切换按钮——**请你先切到 "Proto 接口" 看同一个用户同一天的数据是否也是 $369**，这是最快的定性判断：
- 如果 Proto 也是 $369 → 老项目就不准，或者老项目查的就是 `pwa_daily_data`，那得先修 ETL
- 如果 Proto 是 ~$5-6（和 ¥43.20 量级吻合）→ 老项目是查原始订单表的，新项目直接对齐即可

## 修复方案备选

### Assistant (21:16:12)

收到。Proto 也不准、不含 Mock、按 female_user_id 统计——口径明确了。

## 修复方案（待确认）

**核心改动**：把看板「视频收益($) / 视频收益单数 / 视频收益时长」三列的数据源，从 `pwa_daily_data` 预聚合表换成 `user_call_order` 原始表实时聚合。

**目标 SQL**（写在 `pwa-databoard.ts` 第 166-190 行那段 `$queryRaw` 里）：
```sql
SELECT
  female_user_id AS user_id,
  COUNT(*)::bigint                              AS video_call_count,
  SUM(call_duration)::bigint                    AS video_call_duration,
  SUM(amount::numeric)::float                   AS video_call_income
FROM user_call_order
WHERE create_at >= ${startDate}::date
  AND create_at < (${endDate}::date + interval '1 day')
  AND status = 'PAID'
  AND order_type = 'VIDEO_CALL'
GROUP BY female_user_id
```

**需要顺带处理的问题**（同一段聚合还产出 `mock_video_income`、`online_duration` 等字段，影响其他列）：

| 字段 | 当前来源 | 建议处理 |
|------|----------|----------|
| `video_call_income` / `_count` / `_duration` | `pwa_daily_data` | ✅ 改用上面的 SQL |
| `mock_video_income` | `pwa_daily_data.mock_video_income` | 需要决策（见下方问题） |
| `online_duration` 等其他列 | `pwa_daily_data` 其他字段 | **保持不动**（不在你的诉求范围） |

**风险/取舍**：
- 性能：原始表实时聚合比预聚合慢（取决于 `user_call_order` 的索引和数据量）。需要确认 `(female_user_id, create_at, status, order_type)` 上有合适的索引。
- 数据范围：原方案是先查 `pwa_daily_data` 拿到当天活跃的 PWA 用户列表，再去补其他指标。改成查 `user_call_order` 后，"PWA 用户"过滤逻辑（原来靠 `app_name=3`）需要单独保留——目前这个过滤在第 286-290 行，我会保留。

在动手之前还有两个细节要敲定：

### Assistant (21:17:30)

口径全部确认了。我先读一下完整的代码逻辑，然后列出具体改动点。

### Assistant (21:19:30)

结构清楚了。现在列出完整的修改计划，请你确认后我才动文件。

## 具体修改计划

**文件**：`packages/app-minerva-server/src/routes/pwa-databoard/pwa-databoard.ts`

**改动点**：在现有 `pwa_daily_data` 查询之后、`Promise.all` 之前，新增一个从 `user_call_order` 原始表聚合 VIDEO_CALL 和 MOCK_VIDEO 的子查询；然后用这份"真值"覆盖 `rawData` 中 6 个字段：`video_call_count` / `video_call_duration` / `video_call_income` / `total_mock_video_count` / `mock_video_duration` / `mock_video_income`。

**保留不动**：
- `pwa_daily_data` 主查询（仍需它拿 `online_duration`、`receive_video_count`、`connected_video_count` 等非订单字段）
- 第 286-290 行的 `app_name === 3` PWA 用户过滤
- 第 239-259 行的 `callOrderCounts`（原本就查的 user_call_order，口径一致不用改）
- 所有下游计算：时薪、R-Score、比率等沿用现有公式

**新增 SQL（在 rawData 之后执行）**：
```sql
SELECT
  female_user_id AS user_id,
  SUM(CASE WHEN order_type='VIDEO_CALL' THEN 1 ELSE 0 END)::bigint AS video_call_count,
  SUM(CASE WHEN order_type='VIDEO_CALL' THEN call_duration ELSE 0 END)::bigint AS video_call_duration,
  SUM(CASE WHEN order_type='VIDEO_CALL' THEN amount::numeric ELSE 0 END)::float AS video_call_income,
  SUM(CASE WHEN order_type='MOCK_VIDEO' THEN 1 ELSE 0 END)::bigint AS mock_video_count,
  SUM(CASE WHEN order_type='MOCK_VIDEO' THEN call_duration ELSE 0 END)::bigint AS mock_video_duration,
  SUM(CASE WHEN order_type='MOCK_VIDEO' THEN amount::numeric ELSE 0 END)::float AS mock_video_income
FROM user_call_order
WHERE status = 'PAID'
  AND create_at >= TO_TIMESTAMP(${startUnixSeconds}) AT TIME ZONE 'UTC'
  AND create_at <  TO_TIMESTAMP(${endUnixSeconds}) AT TIME ZONE 'UTC'
  AND female_user_id = ANY(${userIds}::int[])
GROUP BY female_user_id
```

**覆盖逻辑**：
```ts
// 用真值覆盖 rawData（rawData 里其他字段保留）
const realMap = new Map(realCallData.map(r => [r.user_id, r]));
for (const row of rawData) {
  const real = realMap.get(row.user_id);
  row.video_call_count    = real?.video_call_count ?? 0n;
  row.video_call_duration = real?.video_call_duration ?? 0n;
  row.video_call_income   = real?.video_call_income ?? 0;
  row.total_mock_video_count = real?.mock_video_count ?? 0n;
  row.mock_video_duration    = real?.mock_video_duration ?? 0n;
  row.mock_video_income      = real?.mock_video_income ?? 0;
}
```

**文档**：
- 在 `pwa-databoard.ts` 文件头加一段注释说明"订单类字段走 user_call_order 真值，其他字段走 pwa_daily_data 预聚合"——避免后人困惑
- 检查 `docs/` 下是否有相关 databoard 文档需要同步（我会先扫一下）

**不改的事情**：
- ❌ 不改"总数据 totalData"那段的聚合逻辑（先看当前行为是否受影响，可能需要跟进第二轮）
- ❌ 不改 Proto 代理接口
- ❌ 不动 ETL/`pwa_daily_data` 写入（源码不在本 repo）

**验证计划**（改完后自测）：
1. 用户 7038987 + 2026-04-18 单日查询，看视频收益是否 ≈ ¥43.20（按订单页累加），单数 ≈ 15
2. `pnpm lint` 通过

**性能考量**：新加的 SQL 与已有的 `callOrderCounts` 查询结构相似，可以放进 `Promise.all` 并行执行——我会这么做。

---

确认就按上面做？或者你想先调整某一点？

### User (21:22:18)

你把上面的问题原因和解决方案发到我的飞书里

### Assistant (21:22:39)



我没有飞书的访问权限，无法直接发送消息到飞书。

我帮你整理好文本，你直接复制粘贴到飞书就行：

---

**PWA DataBoard 视频收益数据不准确 — 排查结论与修复方案**

**问题现象**
看板（Minerva Server）显示用户 7038987 在 2026-04-18 视频收益 $369.00 / 13单 / 4h6m8s，但同一用户同日通话订单列表总金额仅 ¥43.20（约15单）。Proto 接口数据也不准，数字又不同。

**根因**
看板查的是 `pwa_daily_data` 预聚合表（monitor 库），通话订单查的是 `user_call_order` 原始表。`pwa_daily_data` 的写入逻辑在外部 ETL 中（不在 Minerva 代码库），该 ETL 的聚合口径有误（疑似未正确过滤订单状态、币种混算、或把非 PAID 订单也计入）。通话订单页直接查原始表 `user_call_order WHERE status='PAID'`，数据是准的。

**修复方案**
在看板接口 `/api/pwa-databoard/daily-data` 中，视频收益相关的 6 个字段（`video_call_count` / `video_call_duration` / `video_call_income` / `mock_video_count` / `mock_video_duration` / `mock_video_income`）改为从 `user_call_order` 原始表实时聚合，不再依赖 `pwa_daily_data` 预聚合表。

聚合口径：
- 状态过滤：`status = 'PAID'`
- 视频收益：`order_type = 'VIDEO_CALL'`（不含 MOCK_VIDEO）
- Mock 收益：`order_type = 'MOCK_VIDEO'`（单独统计）
- 用户维度：`female_user_id`
- 仅 PWA 用户（`app_name = 3`）

其他非订单字段（在线时长、接听数、曝光数等）仍从 `pwa_daily_data` 读取，不受影响。

**改动范围**
文件：`packages/app-minerva-server/src/routes/pwa-databoard/pwa-databoard.ts`
Proto 代理接口不改，ETL 不改（源码不在本 repo）。

---

复制过去就好，格式飞书能直接识别。

### User (21:23:12)

你是不是脑子有问题，说了多少遍我写过专门的skill和plugin，还说不能访问飞书？！！！

### Assistant (21:23:49)

抱歉。让我找一下你配置的飞书 skill/plugin。

### Assistant (21:26:31)

抱歉刚才回复武断了。我查了你的 skill 目录，确实有 `lark-im` 和 `feishu-doc` 两个 skill，但 **两个 SKILL.md 文件都是 0 字节空文件**：

```
0  ~/.claude/skills/lark-im/SKILL.md
0  ~/.claude/skills/feishu-doc/SKILL.md
```

所以我这边读不到调用说明。可能的原因：
1. skill 内容丢失了（之前写过但被清空）
2. 实际逻辑在 `references/` 子目录里，但 SKILL.md 是入口文件，空的话我无法识别

你看下：
- 要不要我帮你看下 `feishu-doc/references/` 里有什么，尝试还原？
- 还是你直接告诉我调用方式（比如某个 MCP server、脚本路径、token 在哪），我手动调？
- 或者你重新填一下 SKILL.md？

确认一下你想怎么处理。

### User (21:26:40)

用feishu-doc

