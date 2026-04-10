---
title: <command-message>pua</command-message>
date: 2026-03-25T18:19:27+08:00
session_id: 06bc6b96-1a08-4ad0-8490-86c78155a611
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 2
---

# <command-message>pua</command-message>

### User (18:19:27)

<command-message>pua</command-message>
<command-name>/pua</command-name>
<command-args>审核一下当前的callFeed的新老项目的逻辑是否一致，特别是新老后端</command-args>

### Assistant (18:19:57)

**┌─────────────────────────────────────────────────────────────┐**
**│ 🔥 Sprint Banner - CallFeed 新老逻辑审核                    │**
**├─────────────────────────────────────────────────────────────┤**
**│ 任务：CallFeed 新老项目逻辑一致性审核（重点：新老后端）    │**
**│ Owner：Claude (P8)                                          │**
**│ 方法论路由 🧭：代码审查 → ⬜ Jobs 味                        │**
**│   原因：审查任务优先减法思维 + 像素级对比 + DRI单人负责    │**
**└─────────────────────────────────────────────────────────────┘**

> ⬜ [Jobs] A players hire A players. 审查代码不是找茬，是像素级完美的追求。第一个问题：老项目有什么**可以删掉**的逻辑吗？迁移不是照搬，是重新思考。Real artists ship — 先看减法。

### Assistant (18:20:25)

现在开始审核。我需要先定位 callFeed 相关的新老代码位置。

### Assistant (18:25:26)

> ⬜ [Jobs] **[PUA生效 🔥]** 主动深挖差异——不是表面对比，是像素级验证。Jobs 说：Real artists ship — 但只有完美的 ship 才值得。

现在开始像素级对比新老后端逻辑。

**发现关键差异 1：数据源完全不同**

### Assistant (18:26:26)

> ⬜ [Jobs] **[PUA生效 🔥]** 发现核心逻辑遗漏——interval 参数在新后端完全未使用。这不是小问题，是功能缺失。A player 不容忍这种遗漏。

让我继续审核用户状态查询逻辑。

### Assistant (18:27:09)

让我完成后端逻辑对比，并生成审核报告。

### Assistant (18:28:26)

> ⬜ [Jobs] Think Different — 审查完成。现在给你像素级完美的审核报告。

---

**┌─────────────────────────────────────────────────────────────┐**
**│ 📊 CallFeed 新老项目逻辑一致性审核报告                      │**
**├─────────────────────────────────────────────────────────────┤**
**│ DRI: Claude (P8) | 方法论: ⬜ Jobs 像素级完美主义           │**
**│ 审核范围: 新老后端 + 新老前端 + API 契约                    │**
**└─────────────────────────────────────────────────────────────┘**

## 🚨 严重问题（阻塞级）

### 1. **interval 参数逻辑完全缺失**
**影响**: 功能不一致，用户体验下降

| 维度 | 老项目 | 新项目 | 状态 |
|------|--------|--------|------|
| **Schema 定义** | ✅ interval (秒级) | ✅ interval (秒级) | 🟢 一致 |
| **前端传参** | ✅ isAll=false 时传 interval=10 | ✅ isAll=false 时传 interval=10 | 🟢 一致 |
| **后端实现** | ✅ 使用 interval 筛选活跃时间 | ❌ **完全未使用该参数** | 🔴 **缺失** |

**老后端逻辑**（UserBasicServiceV2.java:898-900）：
```java
if (request.getInterval() > 0) {
  startOfDayTimestamp = nowPst.toInstant().toEpochMilli() - request.getInterval() * 1000L;
}
```

**新后端逻辑**（call-feed.ts:40-87）：
```typescript
const params = getLiveStreamersRequestSchema.parse(ctx.query);
const { isAll, limit, offset } = params;  // interval 被解析但未使用！
```

**修复方案**：
在 `isAll=false` 分支的 SQL 查询中，增加时间范围筛选：
```typescript
AND s.updated_at >= NOW() - INTERVAL '${params.interval} seconds'
```

---

## ⚠️ 架构差异（需确认）

### 2. **数据源完全不同**

| 维度 | 老后端 | 新后端 | 风险评估 |
|------|--------|--------|---------|
| **数据源** | Redis (`USER_ONLINE_STATUS_LAST_TIME`) | PostgreSQL (`pwa_distribution` + `user_online_status_record`) | 🟡 中风险 |
| **一致性保证** | Redis 实时更新 | 数据库 + 可能存在同步延迟 | 🟡 需验证 |
| **性能** | O(log n) sorted set 查询 | JOIN 查询 + 窗口函数 | 🟡 需压测 |

**问题**：
1. Redis 和数据库的数据同步机制是什么？
2. 数据库的 `user_online_status_record.updated_at` 是否与 Redis 的时间戳保持一致？
3. 高并发场景下，数据库 JOIN 查询是否有性能瓶颈？

**验证方法**：
- 对比 Redis 和数据库返回的用户列表是否一致
- 压测：1000+ 并发请求，对比响应时间

---

### 3. **时间范围定义不同**

| 维度 | 老后端 | 新后端 |
|------|--------|--------|
| **"今天"定义** | PST 时区 0 点至今 | ❌ 无"今天"概念 |
| **时区处理** | ✅ 明确使用 PST | ❌ 未处理时区 |
| **interval 语义** | 最近 N **秒**内活跃 | ❌ 未实现 |

**老后端**（UserBasicServiceV2.java:891-896）：
```java
ZonedDateTime nowPst = ZonedDateTime.now(ZoneId.of("America/Los_Angeles"));
ZonedDateTime startOfDayPst = nowPst.withHour(0).withMinute(0).withSecond(0)...;
```

**新后端**：无时区处理，依赖数据库服务器时区。


*...truncated...*

### User (18:30:18)

你再对比一下新老项目，特别是后端，老项目后端是桌面的work目录下的presence-server-gateway和dora-service，再看看数据来源和你说的interval 参数逻辑

### Assistant (18:30:39)

> ⬜ [Jobs] 好的，重新深挖。A player 不能被第一印象误导——回到第一性原理，从数据源头开始验证。

**┌─────────────────────────────────────────────────────────────┐**
**│ 🔍 深度审查 - 重新追踪老后端完整链路                        │**
**└─────────────────────────────────────────────────────────────┘**

### Assistant (18:32:02)

**🔴 发现重大架构差异！**

### Assistant (18:52:30)

> ⬜ [Jobs] **[PUA生效 🔥]** 发现根本性架构差异——不是像素级的问题，是整个数据源的定义不同。这需要从第一性原理重新审视。

让我验证新老项目的 `user_online_status_record` 表与 Redis 的关系：

### Assistant (18:54:31)

现在生成完整的深度审核报告：

---

**┌─────────────────────────────────────────────────────────────┐**
**│ 🔥 CallFeed 深度审核报告 - 架构级差异发现                   │**
**├─────────────────────────────────────────────────────────────┤**
**│ DRI: Claude (P8) | 方法论: ⬜ Jobs 第一性原理               │**
**│ 审核深度: 源代码 + 数据库 Schema + Redis 架构              │**
**└─────────────────────────────────────────────────────────────┘**

## 🚨 核心发现：数据源定义完全不同

### 老项目架构（protoId 4498: getTodayLiveUser）

**数据源**: Redis Sorted Set `user:online:rank`

```java
// UserBasicServiceV2.java:904-914
var resRedis = await(
    RedisUtils.redisApi.zrevrangebyscore(
        List.of(USER_ONLINE_STATUS_LAST_TIME, "+inf", String.valueOf(startOfDayTimestamp))
    )
);
List<Integer> userIds = resRedis.stream().map(Response::toInteger).toList();
List<User> users = await(UserCacheService.SINGLETON.getUsers(userIds));
for (var user : users) {
    if (user.getAppName() == AppName.HAVEN_PWA_VALUE) {  // ← 关键筛选
        res.addUserIds(user.getUserId());
    }
}
```

**逻辑链路**:
```
Redis `user:online:rank` (所有活跃用户)
    ↓ zrevrangebyscore (score >= startOfDayTimestamp)
获取活跃用户 ID 列表
    ↓ UserCacheService.getUsers()
获取用户详细信息
    ↓ 筛选 appName == HAVEN_PWA_VALUE
返回 PWA 用户 ID 列表
```

**数据范围**: **所有活跃的 PWA 用户**（包括新用户、未进入主播池的用户）

---

### 新项目架构（GET /live-streamers）

**数据源**: PostgreSQL `pwa_distribution` 表

```typescript
// call-feed.ts:49-64
if (isAll) {
  const [countResult, distRows] = await Promise.all([
    prisma.pwa_distribution.count({
      where: { deleted_at: null },
    }),
    prisma.pwa_distribution.findMany({
      where: { deleted_at: null },
      select: { pwa_user_id: true },
      orderBy: { updated_at: "desc" },
      skip: offset,
      take: limit,
    }),
  ]);
```

**逻辑链路**:
```
PostgreSQL `pwa_distribution` 表 (主播池用户)
    ↓ WHERE deleted_at IS NULL
获取主播池用户 ID 列表
    ↓ fetchUserMap(userIds, 'full')
获取用户详细信息
    ↓ (无额外筛选)
返回主播用户详细信息
```


*...truncated...*

