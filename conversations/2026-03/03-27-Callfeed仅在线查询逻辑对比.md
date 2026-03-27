---
title: Callfeed仅在线查询逻辑深度对比分析
date: 2026-03-27 14:32:00
model: claude-sonnet-4-5-20250929
messages: 4
---

# Callfeed仅在线查询逻辑深度对比分析

### User (14:32:15)
你再认真仔细不放过任何一点蛛丝马迹地对照一下新老项目的后端，看看callfeed页面查询「仅在线」数据的逻辑，判断一下在新项目不接入redis的前提下能否做到查询仅在线数据和老项目查出的一模一样

### Assistant (14:32:20)
[深度分析新老项目的 callfeed 查询逻辑]

经过详细对比，发现了关键差异：

## 老项目（dora-service）架构

### 获取用户列表 (protoId 4498: getTodayLiveUser)
```java
// 当 interval = 10 时：查询最近 10 秒内活跃的用户
long startOfDayTimestamp = nowPst.toInstant().toEpochMilli() - 10 * 1000L;

// 从 Redis sorted set 查询
var resRedis = await(
    RedisUtils.redisApi.zrevrangebyscore(
        List.of(USER_ONLINE_STATUS_LAST_TIME, "+inf", String.valueOf(startOfDayTimestamp))));
```

**核心依赖**：
- Redis sorted set `USER_ONLINE_STATUS_LAST_TIME`
- 实时维护用户最后活跃时间的时间戳

### 获取在线状态 (protoId 4620: adminGetUserOnlineStatus)
```java
// 从 Redis 判断是否在线
public static Response getServerOnlineStatus(List<Integer> userIds) {
  return RedisUtils.redisApi.mget(
      userIds.stream()
          .map(userId -> String.format("user:online:status:%d", userId))
          .toList());
}

// 从数据库获取详细状态
String sql = "select * from user_online_status_record where user_id = ANY($1);";
```

## 新项目（minerva-server）架构

### 获取用户列表
```typescript
// ⚠️ BUG: 将 interval 解释为"分钟"而非"秒"
const threshold = new Date(Date.now() - interval * 60 * 1000);

const rows = await prisma.$queryRaw(Prisma.sql`
  SELECT d.pwa_user_id::int
  FROM pwa_distribution d
  JOIN user_online_status_record r ON r.user_id = d.pwa_user_id
  WHERE d.deleted_at IS NULL
    AND r.pwa_status LIKE '%ONLINE%'
    AND r.updated_at > ${threshold}
  ORDER BY r.updated_at DESC
`);
```

## 核心差异总结

| 维度 | 老项目 | 新项目 | 是否一致？ |
|------|--------|--------|-----------|
| **Redis 依赖** | ✅ 严重依赖（sorted set + key） | ❌ 完全不依赖 | ❌ 不一致 |
| **数据源** | Redis（实时） + 数据库（详情） | 仅数据库 | ❌ 不一致 |
| **时间窗口** | **10 秒** | **10 分钟** | ❌ **致命错误** |
| **在线判断** | Redis key 存在性 | pwa_status LIKE '%ONLINE%' | ❌ 不一致 |

## 关键问题

### 1. 时间窗口单位错误 ⛔️
```typescript
// 老项目：interval 单位是"秒"
startOfDayTimestamp = now - interval * 1000L;  // 10 秒

// 新项目：错误地解释为"分钟"
const threshold = new Date(Date.now() - interval * 60 * 1000);  // 10 分钟
```

**影响**：数据量差异 60 倍！

### 2. 数据源差异
- **老项目**：Redis sorted set（实时心跳数据，秒级精度）
- **新项目**：数据库 updated_at（仅在状态变化时更新）

### 3. updated_at 更新时机
```sql
-- 表有 trigger 自动更新 updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON user_online_status_record
EXECUTE FUNCTION update_updated_at_column();
```

但问题是：
- 仅在调用 changeUserOnlineStatus 接口时触发 UPDATE
- 不是每次用户心跳都更新
- 缺少心跳机制

## 最终结论

❌ **新项目在不接入 Redis 的前提下，无法做到和老项目查出的数据一模一样**

## 修复方案

### 方案 1：修复时间单位 bug（最低要求）
```typescript
// 将"分钟"改为"秒"
-const threshold = new Date(Date.now() - interval * 60 * 1000);
+const threshold = new Date(Date.now() - interval * 1000);
```

### 方案 2：接受架构差异，明确语义
明确告知前端：新项目的"仅在线" = 最近 N 分钟内状态有变化的用户

### 方案 3：接入 Redis（完全对齐老项目）
维护 Redis sorted set，记录用户最后活跃时间戳

## 推荐行动
1. **立即修复 bug**：将 interval * 60 * 1000 改为 interval * 1000
2. **明确告知前端团队**：新项目的"仅在线"语义和老项目不同
3. **验证数据库 updated_at 的更新频率**

### User (14:45:30)
/save

### User (14:45:35)
现在直接修复这个时间单位的 bug
