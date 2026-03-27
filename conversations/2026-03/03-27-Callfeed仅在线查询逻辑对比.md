---
title: Callfeed仅在线查询逻辑深度对比分析
date: 2026-03-27 14:32:00
model: claude-sonnet-4-5-20250929
messages: 8
---

# Callfeed仅在线查询逻辑深度对比分析

### User (14:32:15)
你再认真仔细不放过任何一点蛛丝马迹地对照一下新老项目的后端，看看callfeed页面查询「仅在线」数据的逻辑，判断一下在新项目不接入redis的前提下能否做到查询仅在线数据和老项目查出的一模一样

### Assistant (14:32:20)
[深度分析新老项目的 callfeed 查询逻辑 - 省略详细内容，见前文]

### User (14:45:30)
/save

### User (14:45:35)
现在直接修复这个时间单位的 bug

### Assistant (14:45:40)
[修复时间单位 bug]

已修改文件，用户拒绝了 git commit 和 push 操作。

### User (14:48:00)
那你对比一下新老项目的那种更新时机的差异，updated_at 更新时机到底怎么回事

### Assistant (14:48:30)
## 🔬 updated_at 更新时机深度对比

找到了完整的更新链路！

### 老项目的心跳机制

#### 1️⃣ 客户端心跳调用
```java
public static void changeUserOnlineStatus(RoutingContext ctx) {
    int userId = SessionUtils.getUserId(ctx);

    // ① 更新用户在线时长
    VideoDistributionCache.updateUserOnlineTime(userId);

    // ② 心跳 - 更新 Redis sorted set
    VideoDistributionCache.heartbeat(userId);

    // ③ 更新数据库 user_online_status_record
    String sql = """
        INSERT INTO user_online_status_record (user_id, self_status, pwa_status)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id)
        DO UPDATE SET self_status = $2, pwa_status = $3;
        """;
}
```

#### 2️⃣ 心跳更新 Redis sorted set
```java
public static void heartbeat(int userId) {
    try {
      RedisUtils.zadd(
          PWA_ONLINE_STATUS_LAST_TIME,              // key = "pwa:online:rank"
          Long.toString(System.currentTimeMillis()), // score = 当前时间戳（毫秒）
          Integer.toString(userId));                 // member = userId
    } catch (Exception e) {
      log.error("[Heartbeat] Failed to sync heartbeat for userId={}", userId, e);
    }
}
```

#### 3️⃣ 数据库 trigger 自动更新
```sql
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON user_online_status_record
EXECUTE FUNCTION update_updated_at_column();
```

### ⚠️ 重大发现：新项目缺少心跳机制！

经过全面搜索，**新项目没有实现用户在线状态的心跳更新接口**！

### 完整流程对比

| 步骤 | 老项目 | 新项目 |
|------|--------|--------|
| **1. 心跳触发** | 客户端定期调用 changeUserOnlineStatus | ❌ 不存在 |
| **2. Redis 更新** | ✅ zadd pwa:online:rank {timestamp} {userId} | ❌ 无 |
| **3. 数据库更新** | ✅ INSERT ... ON CONFLICT ... DO UPDATE | ❌ 无 |
| **4. updated_at** | ✅ Trigger 自动更新（每次心跳） | ⚠️ Trigger 存在但无人触发 |

### 🔴 问题严重性

#### 1️⃣ 数据永不更新
```typescript
// 新项目查询逻辑
WHERE r.updated_at > ${threshold}  // ← 但 updated_at 从不更新！
```

**后果**：
- 如果表中有历史数据，返回过时数据
- 如果表为空，永远查不到任何在线用户
- **无法反映实时在线状态**

#### 2️⃣ 老项目的双重保障

1. **Redis sorted set**（主查询）
   - Key: `pwa:online:rank`
   - 用途：快速查询最近 N 秒内活跃用户
   - 性能：O(log(N) + M)

2. **数据库 updated_at**（辅助/备份）
   - 用途：FCM 推送、非实时查询
   - 性能：全表扫描或索引扫描

### 完整流程图

#### 老项目（每 ~10 秒）
```
客户端
  ↓ changeUserOnlineStatus
dora-service
  ├─ heartbeat(userId)
  │   └─> Redis ZADD pwa:online:rank {timestamp} {userId}  ← ✅ 实时
  │
  └─ INSERT ... ON CONFLICT ... DO UPDATE
      └─> PostgreSQL: user_online_status_record
          └─> Trigger: updated_at = CURRENT_TIMESTAMP  ← ✅ 自动

查询
  ↓
Redis ZREVRANGEBYSCORE pwa:online:rank +inf {now-10000}  ← ✅ 秒级
  ↓
返回最近 10 秒内活跃用户
```

#### 新项目（无心跳）
```
客户端
  ↓ ❌ 无对应接口
minerva-server
  ❌ 不更新 Redis
  ❌ 不更新 user_online_status_record
  ❌ updated_at 永不刷新

查询
  ↓
PostgreSQL JOIN WHERE r.updated_at > {threshold}
  ↓
❌ 返回过时数据或空列表
```

### 🎯 最终结论

#### ❌ 新项目当前状态：完全无法工作

1. **缺少心跳接口** → updated_at 永不更新
2. **查询依赖 updated_at** → 查询结果无意义
3. **即使修复时间单位 bug** → 仍然无法正常工作

#### ✅ 修复方案

**方案 A：完全对齐老项目（推荐）**
1. 实现心跳接口（对标 changeUserOnlineStatus）
2. 接入 Redis，维护 pwa:online:rank sorted set
3. 查询改为从 Redis 读取
4. 数据库 updated_at 作为备份

**方案 B：纯数据库方案（次优）**
1. 实现心跳接口，定期更新 user_online_status_record
2. 心跳频率：建议 5-10 秒
3. 添加索引：CREATE INDEX idx_user_online_status_record_updated_at
4. 接受性能损失

**方案 C：改用 pwa_distribution.updated_at**
1. 检查 pwa_distribution 表的 updated_at 是否有心跳更新
2. 如果有，直接查询该表即可
3. 不需要 JOIN user_online_status_record

### User (15:10:00)
/save
