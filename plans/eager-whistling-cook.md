# Call-Feed Live Streamers: 改用 Redis 数据源

## Context

新项目的 `/live-streamers` 端点从 PostgreSQL (`pwa_distribution` + `user_online_status_record`) 读数据，而老项目从 Redis ZSET `user:online:rank` 读。这导致两边展示的在线主播列表不一致。用户要求对齐老项目逻辑，改为从 Redis 读取。

"在线"定义：用户在前台活跃即算在线，不需要正在开播。

## 改动方案

### 修改文件

**`apps/minerva-server/src/routes/call-feed/call-feed.ts`** — `/live-streamers` 端点

#### 逻辑对齐老项目 `UserBasicServiceV2.getTodayLiveUser()`：

1. **isAll=true（今天所有上线过的主播）**:
   - Redis: `ZREVRANGEBYSCORE user:online:rank +inf <PST午夜时间戳>`
   - 用 `America/Los_Angeles` 时区计算当天 0 点（对齐老项目）
   - 过滤 `app_name = 3`（HAVEN_PWA）
   - 排除已删除用户（`deleted_at IS NOT NULL`）

2. **isAll=false（当前在线主播，interval 秒内活跃）**:
   - Redis: `ZREVRANGEBYSCORE user:online:rank +inf <当前时间-interval*1000>`
   - 同样过滤 `app_name = 3` + 排除已删除用户

3. **降级策略**: 用 `safeRedis` 包裹，Redis 不可用时返回空列表

#### 实现步骤：

```
1. 从 Redis ZSET 获取用户 ID 列表（带分页）
2. 批量查 userinfo 获取 app_name，过滤出 app_name=3
3. 排除 deleted_at 不为空的用户
4. 用 fetchUserMap 获取用户详情
5. 返回结果
```

#### 已有工具复用：
- `getRedisRead()` — `src/utils/redis.ts:152`
- `safeRedis()` — `src/utils/redis.ts:177`
- `fetchUserMap()` — `src/utils/fetchUserMap.ts`

#### 分页注意：
老项目不分页（一次返回所有 ID），前端做客户端分页。新项目目前用服务端分页。改为：先从 Redis 拿全量 ID → 过滤 → 在内存中分页。因为 HAVEN_PWA 在线用户量有限（通常 < 500），内存分页可接受。

### 不���的部分
- `/user-status` 端点保持不变（从 `user_online_status_record` 读在线状态详情）
- 前端代码不需要改（API 接口不变）

## 验证

1. 重启 minerva-server，访问 `/api/call-feed/live-streamers?isAll=true`
2. 对比老项目 protoId 4498 返回的用户列表
3. 切换 `isAll=false&interval=10` 验证在线过滤
4. Redis 断开时确认降级为空列表不报错
