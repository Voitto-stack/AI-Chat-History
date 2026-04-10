# Union Streamer 模块 Code Review & 优化方案

## Context

US 模块已完成迁移并联调通过，现对照 Minerva 架构规范和 PostConsole/CallFeed 的 review 经验，对前后端代码做一轮 review 和优化。

---

## 一、后端问题 — `union-streamer.ts`

### 1.1 注释过时：仍引用 `user_regulation_status` 表
- 文件头注释 line 10 提到 `user_regulation_status`，line 34 提到 `JOIN user_regulation_status`
- 实际已改为从 `userinfo.regulation_status` 读取
- **修复**: 更新注释

### 1.2 Magic Number — regulation_status 硬编码
- `statusMap` 里 `active: 0, banned: 2` 是裸数字
- SQL CASE 里也是 `= 0`, `= 2`
- **修复**: 提取为顶部常量 `REGULATION_STATUS`，与老项目 `UserRegulationStatus` 枚举对齐

### 1.3 `created_by` 类型不匹配
- line 284: `created_by: (ctx.state.user as any)?.id ?? null`
- `ctx.state.user` 是 `JwtPayload`，`id` 不存在，应该是 `userId`（string 类型）
- 但 `pwa_club.created_by` 是 `Int`，老项目传的是 `-1`
- **修复**: 改为 `created_by: -1`（与老项目保持一致，admin console 创建的公会统一标记为 -1）

### 1.4 `createGuildRequestSchema` 后端缺少中文校验
- 前端 Form 有 `pattern: /^[^\u4e00-\u9fa5]+$/` 校验公会名不能含中文
- 但后端 schema 只有 `z.string().min(1).max(60)`，没有 regex
- **修复**: 在 schema 加 `.regex(/^[^\u4e00-\u9fa5]+$/, '公会名不能包含中文')`

### 1.5 `AppError` import 未使用（streamers/reviews 路由）
- `AppError` 只在 `POST /guilds` 用到，但 import 在顶部是合理的，保留即可

---

## 二、Schema 问题 — `unionStreamer.ts`

### 2.1 `streamerItemSchema.regulationStatus` 应该考虑 nullable
- SQL CASE 兜底了 `ELSE 'unknown'`，所以实际不会返回 null
- 当前 `z.string()` 是正确的，无需改

### 2.2 `getStreamersRequestSchema.status` 默认值
- Schema 默认 `'all'`，���前端 StreamerInquiry 默认 `'active'`
- 两边不一致但不影响功能（前端总是显式传 status）
- **不改**，保持现状

---

## 三、前端问题

### 3.1 `StreamerInquiry.tsx` — `status as any` 类型绕过
- line 48: `status: status as any`
- **修复**: 改为 `status: status as 'all' | 'active' | 'banned' | 'unknown'`，或直接用 `StreamerStatus` 类型

### 3.2 `StreamerInquiry.tsx` — `loadData` 依赖问题
- `useCallback` 依赖了 `[code, startTime, endTime, status, page, pageSize]`
- 但 `useEffect` 只监听 `[page, pageSize]`
- 这是正确的设计（搜索按钮触发 `handleSearch`，不是自动搜索）
- **不改**

### 3.3 `StreamerReview.tsx` — 缺少 `key` prop
- `List` 的 `renderItem` 没有给 `List.Item` 传 key
- Antd List 内部会处理，但显式传 `key={item.userId}` 更好
- **修复**: 加 key

### 3.4 `GuildList.tsx` — `scroll={{ x: 900 }}` 已加但表头仍换行
- 已加了每列 width，应该生效了
- **��认**: 检查是否需要调整

### 3.5 `styles.less` — 残留的无效 CSS 选择器
- 之前多次尝试用 `:global(.ant-table-pagination)` 居中分页，最终用 `pagination.style` 解决
- less 文件里残留了多个无效的 pagination 居中选择器
- **修复**: 清理 `.table-wrapper` 内和全局兜底的 pagination 居中样式（已通过 inline style 解决）

---

## 四、优化项

### 4.1 后端 — `GET /streamers` 空结果时 total 处理
- 当 `rows` 为空数组时，`rows[0]?.total ?? 0` 正确返回 0
- **无需改**

### 4.2 后端 — `GET /reviews` 的 count + data 并行查询
- 当前用 `Promise.all([count, queryRaw])` 并行，性能好
- **无需改**

### 4.3 后端 — `POST /guilds` 事务
- 已用 `$transaction` 保证邀请码分配的原子性
- **无需改**

---

## 五、修改文件清单

| 文件 | 改动 |
|------|------|
| `apps/minerva-server/src/routes/union-streamer/union-streamer.ts` | 更新注释、提取 regulation 常量、修复 created_by |
| `packages/minerva-schemas/src/unionStreamer.ts` | clubName 加中文 regex 校验 |
| `apps/minerva/src/pages/UnionStreamer/components/StreamerInquiry.tsx` | 修复 `status as any` 类型 |
| `apps/minerva/src/pages/UnionStreamer/components/StreamerReview.tsx` | 加 key prop |
| `apps/minerva/src/pages/UnionStreamer/styles.less` | 清理无效 pagination CSS |

---

## 六、验证

1. `cd packages/minerva-schemas && pnpm build` — schema 编译通过
2. `cd apps/minerva-server && npx tsc --noEmit | grep union` — 后端零 TS 错误
3. 重启后端，curl 测试 5 个接口返回正常
4. 前端页面 3 个 Tab 功能正常
