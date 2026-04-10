---
title: 你再认真仔细不放过任何一点蛛丝马迹地对照一下新老项目的后端，看看callfeed
date: 2026-03-27T10:28:57+08:00
session_id: a9f897b0-09bc-47fd-86fa-fdf3b14fae44
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 6
---

# 你再认真仔细不放过任何一点蛛丝马迹地对照一下新老项目的后端，看看callfeed

### User (10:28:57)

你再认真仔细不放过任何一点蛛丝马迹地对照一下新老项目的后端，看看callfeed页面查询「仅在线」数据的逻辑，判断一下在新项目不接入redis的前提下能否做到查询仅在线数据和老项目查出的一模一样

### Assistant (10:29:38)

我来帮你仔细对比新老项目的 callfeed 后端逻辑。先从记忆中的参考文档开始：

### Assistant (10:30:01)

现在让我在老项目后端中搜索 callfeed 相关的接口实现：

### Assistant (10:34:51)

让我从老前端项目中找到 callfeed 的接口调用：

### Assistant (10:49:50)

现在我找到了关键信息！让我在老后端中搜索 protoId 4498 和 4620 的实现：

### Assistant (11:07:03)

找到了关键逻辑！让我继续搜索获取在线状态的接口：

### Assistant (11:09:46)

现在我已经找到了老项目的核心逻辑。让我查看新项目（minerva-server）中对应的实现：

### Assistant (11:17:13)

太好了！我已经找到了所有关键代码。现在让我详细对比新老项目的逻辑差异，并分析能否做到一模一样。

## 📊 核心逻辑对比

### 老项目（dora-service）— **依赖 Redis**

### Assistant (11:18:41)

让我查看老项目中 `user_online_status_record` 表是如何被更新的：

### Assistant (11:21:02)

现在让我整理一份详细的对比分析报告：

## 🔍 Callfeed「仅在线」查询逻辑深度对比

### 1️⃣ **老项目（dora-service）架构**

#### **获取用户列表** (protoId 4498: `getTodayLiveUser`)
```java
// 当 interval = 10 时：查询最近 10 秒内活跃的用户
long startOfDayTimestamp = nowPst.toInstant().toEpochMilli() - 10 * 1000L;

// 从 Redis sorted set 查询
var resRedis = await(
    RedisUtils.redisApi.zrevrangebyscore(
        List.of(USER_ONLINE_STATUS_LAST_TIME, "+inf", String.valueOf(startOfDayTimestamp))));
```

**核心依赖**：
- ✅ Redis sorted set `USER_ONLINE_STATUS_LAST_TIME`
- ✅ 这个 sorted set 需要**实时维护**用户最后活跃时间的时间戳

#### **获取在线状态** (protoId 4620: `adminGetUserOnlineStatus`)
```java
// 1. 从 Redis 判断是否在线
public static Response getServerOnlineStatus(List<Integer> userIds) {
  return RedisUtils.redisApi.mget(
      userIds.stream()
          .map(userId -> String.format("user:online:status:%d", userId))
          .toList());
}

// 2. 从数据库获取详细状态
String sql = "select * from user_online_status_record where user_id = ANY($1);";

// 3. 如果 Redis 中无记录 → 标记为 OFFLINE
if (!isOnline) {
  pwaStatus = PWA_STATUS.PWA_STATUS_OFFLINE;
}
```

**核心依赖**：
- ✅ Redis key `user:online:status:{userId}` 判断是否在线
- ✅ 数据库 `user_online_status_record` 获取具体 `pwa_status`

---

### 2️⃣ **新项目（minerva-server）架构**

#### **获取用户列表** (`/api/call-feed/live-streamers`)
```typescript
// 仅在线模式（interval = 10，即最近 10 分钟）
const threshold = new Date(Date.now() - 10 * 60 * 1000); // ⚠️ 注意：10 分钟，不是 10 秒！

const rows = await prisma.$queryRaw(Prisma.sql`
  SELECT d.pwa_user_id::int
  FROM pwa_distribution d
  JOIN user_online_status_record r ON r.user_id = d.pwa_user_id
  WHERE d.deleted_at IS NULL
    AND r.pwa_status LIKE '%ONLINE%'           -- ① 状态包含 ONLINE
    AND r.updated_at > ${threshold}            -- ② updated_at 在 10 分钟内
  ORDER BY r.updated_at DESC
`);
```

**核心依赖**：
- ❌ 不依赖 Redis
- ✅ 仅依赖数据库表 `user_online_status_record`
- ✅ 判断条件：`pwa_status LIKE '%ONLINE%'` + `updated_at` 在时间窗口内

#### **获取在线状态** (`/api/call-feed/user-status`)
```typescript
const statusRecords = await prisma.user_online_status_record.findMany({
  where: { user_id: { in: userIds } },
  select: { user_id: true, pwa_status: true, updated_at: true },
});

// 过期守卫：超过 10 分钟未更新 → 视为离线
const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000);
const isStale = !record?.updatedAt || record.updatedAt < tenMinAgo;
const pwaStatus = isStale ? "PWA_STATUS_OFFLINE" : mapPwaStatus(record?.pwaStatus);

*...truncated...*

### Assistant (11:26:49)

完美！找到了所有关键信息。现在给你最终结论：

### Assistant (11:29:21)

## 🎯 最终结论

### ❌ **新项目在不接入 Redis 的前提下，无法做到和老项目查出的数据一模一样**

### 核心问题清单：

#### 1️⃣ **时间窗口单位错误** ⛔️ 致命

**代码位置**：`apps/minerva-server/src/routes/call-feed/call-feed.ts:65`

```typescript
// ❌ 错误：将 interval 解释为"分钟"
const threshold = new Date(Date.now() - interval * 60 * 1000);
```

**老项目**：
```java
// ✅ 正确：interval 单位是"秒"
startOfDayTimestamp = nowPst.toInstant().toEpochMilli() - request.getInterval() * 1000L;
```

**影响**：
- 前端传 `interval: 10`，期望查询"最近 10 秒活跃的用户"
- 新项目实际查询的是"最近 10 分钟活跃的用户"
- **数据量差异巨大**（10 分钟 vs 10 秒 = 60 倍时间窗口）

---

#### 2️⃣ **数据源差异** ⚠️ 架构差异

| 老项目 | 新项目 |
|--------|--------|
| Redis sorted set `USER_ONLINE_STATUS_LAST_TIME`<br/>（实时心跳数据，秒级精度） | 数据库 `user_online_status_record.updated_at`<br/>（仅在状态变化时更新） |

**关键区别**：
- **Redis sorted set**：每次用户心跳都会更新时间戳（高频写入，秒级精度）
- **数据库 `updated_at`**：仅在调用 `changeUserOnlineStatus` 接口时更新（低频写入，状态变化才更新）

**举例说明**：
- 用户 A 在 10:00:00 变为在线状态 → `updated_at` 更新为 10:00:00
- 用户 A 在 10:00:01 ~ 10:00:10 期间持续在线，但状态未变化 → `updated_at` 仍然是 10:00:00
- 如果查询"最近 5 秒活跃的用户"，Redis 可能包含用户 A（如果有心跳），但数据库不会包含

---

#### 3️⃣ **updated_at 更新时机不明确** ⚠️ 数据一致性风险

虽然表有 trigger：
```sql
CREATE TRIGGER set_updated_at
    BEFORE UPDATE
    ON public.user_online_status_record
EXECUTE FUNCTION update_updated_at_column();
```

但问题是：
1. **何时会触发 UPDATE？**
   - 仅在调用 `changeUserOnlineStatus` 接口时
   - 不是每次用户心跳都更新
   
2. **缺少心跳机制**：
   - 老项目：Redis sorted set 通过心跳维护实时性
   - 新项目：依赖状态变化，而非定期心跳

---

### ✅ 修复方案（如果要对齐老项目）

#### 方案 1：修复时间单位 bug（最低要求）

```typescript
// apps/minerva-server/src/routes/call-feed/call-feed.ts:65
// 将"分钟"改为"秒"
-const threshold = new Date(Date.now() - interval * 60 * 1000);
+const threshold = new Date(Date.now() - interval * 1000);
```

#### 方案 2：接受架构差异，但明确语义

如果不接入 Redis，明确告知前端：

*...truncated...*

### User (11:29:21)

<command-message>save</command-message>
<command-name>/save</command-name>

### User (11:36:46)

<command-message>save</command-message>
<command-name>/save</command-name>
<command-args>现在直接修复这个时间单位的 bug</command-args>

### User (12:39:31)

[Request interrupted by user for tool use]

### User (13:52:18)

<command-message>save</command-message>
<command-name>/save</command-name>
<command-args>那你对比一下新老项目的那种更新时机的差异，updated_at 更新时机到底怎么回事</command-args>

### Assistant (14:08:28)

## 🔬 updated_at 更新时机深度对比

我找到了完整的更新链路！让我详细解析：

### 老项目的心跳机制

#### 1️⃣ **客户端心跳调用**
```java
// UserRewardService.java:1399
public static void changeUserOnlineStatus(RoutingContext ctx) {
    int userId = SessionUtils.getUserId(ctx);
    
    // ① 更新用户在线时长（可能写 Redis）
    VideoDistributionCache.updateUserOnlineTime(userId);
    
    // ② 心跳 - 更新 Redis sorted set
    VideoDistributionCache.heartbeat(userId);  // ← 关键！
    
    addTimePoint(userId, ctx.vertx());
    
    // ③ 更新数据库 user_online_status_record
    String sql = """
        INSERT INTO user_online_status_record (user_id, self_status, pwa_status)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id)
        DO UPDATE SET self_status = $2, pwa_status = $3;
        """;
    // ... 执行 SQL ...
}
```

#### 2️⃣ **心跳更新 Redis sorted set**
```java
// VideoDistributionCache.java:151
public static void heartbeat(int userId) {
    try {
      // 更新 Redis sorted set "pwa:online:rank"
      RedisUtils.zadd(
          PWA_ONLINE_STATUS_LAST_TIME,              // key = "pwa:online:rank"
          Long.toString(System.currentTimeMillis()), // score = 当前时间戳（毫秒）
          Integer.toString(userId));                 // member = userId
          
      log.debug("[Heartbeat] Updated PWA_ONLINE_STATUS_LAST_TIME Redis heartbeat for userId={}", userId);
    } catch (Exception e) {
      log.error("[Heartbeat] Failed to sync PWA_ONLINE_STATUS_LAST_TIME heartbeat for userId={}", userId, e);
    }
}
```

#### 3️⃣ **数据库 trigger 自动更新 updated_at**
```sql
-- 建表语句（tables-20250109.sql）
CREATE TABLE user_online_status_record (
    id            serial primary key,
    user_id       integer not null unique,
    self_status   integer not null default -1,
    server_status integer not null default 0,
    updated_at    timestamp default CURRENT_TIMESTAMP,
    created_at    timestamp default CURRENT_TIMESTAMP
);

-- Trigger: 每次 UPDATE 时自动更新 updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE
    ON user_online_status_record
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

### 完整的更新流程对比

| 步骤 | 老项目 | 新项目 |
|------|--------|--------|
| **1. 心跳触发** | 客户端定期调用 `changeUserOnlineStatus` 接口 | ❓ 未知（需确认新项目是否有对应接口） |
| **2. Redis 更新** | ✅ `zadd pwa:online:rank {timestamp} {userId}` | ❌ 无 |
| **3. 数据库更新** | ✅ `INSERT ... ON CONFLICT ... DO UPDATE` | ❓ 未知 |
| **4. updated_at 更新** | ✅ Trigger 自动更新（每次 UPDATE） | ✅ Trigger 自动更新（**如果有 UPDATE**） |


*...truncated...*

*...conversation truncated for brevity...*
