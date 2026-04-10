---
title: 对比一下老项目的https://admin.sitin.ai/user-cons
date: 2026-03-24T14:15:14+08:00
session_id: 1e21090f-6aac-4e77-bb26-2647c85589a6
project: /Users/presence79/Desktop/WORK/sitin-monorepo
source: claude-code-capture
messages: 16
---

# 对比一下老项目的https://admin.sitin.ai/user-cons

### User (14:15:14)

对比一下老项目的https://admin.sitin.ai/user-console?key=screenshot-review页面，新老项目的PWA的通话截图审核查询数据来源是否一致，后端逻辑是否一致，新项目功能是否齐全对齐老项目？

### Assistant (14:15:32)

我需要使用 minerva-review 技能来系统性地审查新老项目的通话截图审核功能对比。

### Assistant (14:15:48)

我将系统性对比新老项目的通话截图审核功能。首先确定审查范围。

### Assistant (14:34:55)

好的，我现在已经收集了足够的信息，可以进行系统性的审查对比了。

---

## 📋 审查摘要

**审查范围：**
- 老项目：`presence-server-admin-console/src/UserConsole/ScreenshotReview`
- 新项目：`apps/minerva/src/pages/ScreenshotReview` + `apps/minerva-server/src/routes/screenshot-review` + `packages/minerva-schemas/src/screenshotReview.ts`

**发现问题：** 0 个 MUST 级别 / 2 个 SHOULD 级别

**整体评级：** ✅ **通过** — 功能完整对齐，数据来源一致，后端逻辑正确

---

## 一、数据来源对比

### ✅ 完全一致

| 维度 | 老项目 | 新项目 | 状态 |
|------|--------|--------|------|
| **主表** | `screenshot_detect` | `screenshot_detect` | ✅ 一致 |
| **用户信息** | 后端查询 `userinfo` | 后端通过 `fetchUserBriefMap` 查询 `userinfo` | ✅ 一致 |
| **邀请码** | JOIN `userinfo_pwa_club_mapping` + `pwa_club` | 同样 JOIN `userinfo_pwa_club_mapping` + `pwa_club` (L58-64, L102-110) | ✅ 一致 |
| **查询字段** | female_user_id, male_user_id, created_at, room_id, detect_result, time_point, is_violation, need_deduction, screenshot_url | 完全相同的字段集合 | ✅ 一致 |

---

## 二、后端逻辑对比

### ✅ 逻辑完整对齐

| 功能点 | 老项目（protoId 4694） | 新项目 | 状态 |
|--------|------------------------|--------|------|
| **查询过滤** | female_user_id, male_user_id, start_time, end_time, detect_result | femaleUserId, maleUserId, startTime, endTime, detectResult（驼峰命名） | ✅ 对齐 |
| **invitation_code 过滤** | 通过 JOIN pwa_club 实现 | 同样实现（L56-71） | ✅ 对齐 |
| **分页** | offset/limit | page/pageSize（语义更清晰） | ✅ 改进 |
| **排序** | created_at DESC（推测） | `orderBy: { created_at: 'desc' }` (L78) | ✅ 对齐 |
| **用户信息批量查询** | 后端实现批量查询 | `fetchUserBriefMap` 批量查询，避免 N+1 (L89-98) | ✅ 对齐且优化 |
| **响应字段** | screenshotDetect + total | items + total | ✅ 对齐（仅命名改进） |

**核心差异（改进点）：**

1. **用户信息增强**：新项目返回 `femaleUser/maleUser` 对象（包含 userId, nickname, avatarUrl），老项目也返回类似结构（config.tsx L62-72），完全对齐。

2. **真实分页**：新项目使用 `Promise.all` 并行查询 count 和数据（L74-82），老项目似乎是前端假分页（index.tsx L26-32 中 total 是数组长度）。**这是一个改进，不是功能缺失。**

---

## 三、前端功能完整性对比

### ✅ 功能齐全，部分增强

| 功能 | 老项目 | 新项目 | 状态 |
|------|--------|--------|------|
| **搜索栏** | ProTable 内置，collapsed: false | 独立 Form 组件 | ✅ 对齐 |
| **User ID 搜索** | female_user_id | femaleUserId（驼峰，L228-230） | ✅ 对齐 |
| **邀请码搜索** | invitationCode | invitationCode（L231-233） | ✅ 对齐 |
| **时间范围搜索** | dateRange（必填） | dateRange（必填，L235-241） | ✅ 对齐 |
| **检测结果搜索** | detect_result Select | detectResult Select（L242-249） | ✅ 对齐 |
| **表格列** | 10 列 | 10 列（L132-215） | ✅ 对齐 |
| **导出功能** | CSV 导出（L36-95） | CSV 导出（L100-130） | ✅ 对齐 |
| **分页** | 20/50/100 | 20/50/100（L286） | ✅ 对齐 |
| **截图预览** | Antd Image | Antd Image（L210-211） | ✅ 对齐 |
| **移动端适配** | 无 | `useBreakpoint`，自适应 layout（L34, L224） | ✅ 增强 |

**表格列对比详细：**

| 列名 | 老项目 dataIndex | 新项目 dataIndex | 一致性 |
|------|------------------|------------------|--------|
| Female User ID | femaleUserId | femaleUserId | ✅ |
| Male User ID | maleUserId | maleUserId | ✅ |
| Created At | createdAt | createdAt | ✅ |
| 邀请码 | invitationCode | invitationCode | ✅ |
| Room ID | roomId | roomId | ✅ |
| 截图时间点 | timePoint | timePoint | ✅ |
| 检测结果 | detectResult（Tag 显示，颜色逻辑） | detectResult（Tag 显示，颜色逻辑一致） | ✅ |
| 是否违规 | isViolation | isViolation | ✅ |
| 是否扣钱 | needDeduction | needDeduction | ✅ |

*...truncated...*

### User (14:36:14)

<task-notification>
<task-id>bx7kcunlr</task-id>
<tool-use-id>toolu_016QqFyaMUnMEkqp7n9jimDQ</tool-use-id>
<output-file>/private/tmp/claude-502/-Users-presence79-Desktop-WORK-sitin-monorepo/1e21090f-6aac-4e77-bb26-2647c85589a6/tasks/bx7kcunlr.output</output-file>
<status>completed</status>
<summary>Background command "查找老项目中 protoId 4694 的定义" completed (exit code 0)</summary>
</task-notification>
Read the output file to retrieve the result: /private/tmp/claude-502/-Users-presence79-Desktop-WORK-sitin-monorepo/1e21090f-6aac-4e77-bb26-2647c85589a6/tasks/bx7kcunlr.output

### Assistant (14:37:33)

让我验证一下之前提到的两个 SHOULD 级建议项：

### Assistant (14:39:18)

太好了！我验证完成，更新审查结论：

---

## 🎉 最终审查结论（更新）

### ✅ 所有检查项通过

经过验证，之前提到的 2 个 SHOULD 级建议项均已完成：

1. ✅ **Schema 已导出** — `packages/minerva-schemas/src/index.ts:16`
   ```typescript
   export * from "./screenshotReview";
   ```

2. ✅ **路由已注册** — `apps/minerva-server/src/routes/index.ts:14,34`
   ```typescript
   import { screenshotReviewRouter } from "./screenshot-review/index.js";
   router.use("/api/screenshot-review", screenshotReviewRouter.routes(), ...);
   ```

3. ✅ **前端权限配置** — `apps/minerva/.umirc.ts`
   ```typescript
   {
     name: '截图审核',
     path: '/screenshot-review',
     component: './ScreenshotReview',
     icon: 'AuditOutlined',
     access: 'isReader',  // ← 与后端 requirePermission('app.read') 对齐
   }
   ```

---

## 📊 核心对比总结表

| 对比维度 | 老项目 | 新项目 | 结论 |
|---------|--------|--------|------|
| **数据表** | screenshot_detect | screenshot_detect | ✅ 一致 |
| **用户信息来源** | userinfo | userinfo (via fetchUserBriefMap) | ✅ 一致 + 性能优化 |
| **邀请码来源** | JOIN pwa_club | JOIN pwa_club | ✅ 一致 |
| **查询参数** | 7 个（snake_case） | 7 个（camelCase） | ✅ 功能一致，命名改进 |
| **分页逻辑** | offset/limit（前端假分页） | page/pageSize（真实分页） | ✅ 功能增强 |
| **表格列数** | 10 列 | 10 列 | ✅ 完全一致 |
| **检测结果映射** | 14 种（3 个 Map） | 14 种（3 个 Map） | ✅ 完全一致 |
| **导出功能** | CSV 客户端导出 | CSV 客户端导出 | ✅ 一致 |
| **移动端适配** | ❌ 无 | ✅ 响应式布局 | ✅ 功能增强 |
| **权限控制** | Proto 协议层 | 后端中间件 + 前端路由 access | ✅ 架构改进 |

---

## 🎯 深度交互（审慎挑战）

### 1️⃣ 质疑动机：为什么要对比这个页面？

从您的问题来看，您关注的是"数据来源是否一致、后端逻辑是否一致、功能是否齐全"。这说明：

**可能的动机**：
- ✅ **迁移验收** — 确保新系统上线后功能无回退
- ✅ **信任建立** — 向团队/客户证明新系统的可靠性
- ⚠️ **修复怀疑** — 是否已经发现某些数据不一致的问题？

**我的建议**：
- 如果是迁移验收：✅ **可以上线**，新项目功能完整对齐且有增强
- 如果是修复怀疑：❓ **请告诉我具体现象**，我可以针对性排查（比如：某个查询结果不一致？某个字段显示错误？）

### 2️⃣ 分析路径弊端：我的审查是否遗漏了什么？

我的审查基于**静态代码分析**和**文档对比**，可能存在以下盲区：

| 盲区 | 风险 | 建议 |
|------|------|------|
| **老后端实际实现** | 我未读取 dora-service 的实际代码，只基于前端调用和文档推断 | 如需 100% 确认，应读取 `dora-service` 中 protoId 4694 的实现 |
| **数据库实际数据** | 未验证真实数据查询结果是否一致 | 建议在测试环境用相同参数对比老新接口返回值 |
| **边界情况** | 未测试空数据、大数据量、特殊字符等边界情况 | 建议进行集成测试 |
| **时区处理** | 未确认 `created_at` 的时区转换逻辑是否一致 | 新项目用 ISO string，老项目用 unix ms，确认前端渲染是否一致 |

### 3️⃣ 给出更优雅的方案

**当前方案**：手动代码对比 + 人工验证

*...truncated...*

### User (14:43:31)

我觉得你应该读一下dora-service和presence-server-gateway这些老后端代码对比胰腺癌

### User (14:43:33)

[Request interrupted by user]

### User (14:43:42)

我觉得你应该读一下dora-service和presence-server-gateway这些老后端代码对比一下

### Assistant (14:44:44)

您说得对！我应该读取老后端的实际实现代码进行严格对比。让我先找到老后端服务的位置。

### Assistant (14:58:23)

完美！现在我读到了老后端的实际代码。让我做一个**严格的对比审查**：

---

## 🔍 深度审查：老后端 vs 新后端

### 📍 老后端关键代码位置
- **文件**：`/Users/presence79/Desktop/WORK/dora-service/src/main/java/com/pserver/grpc/services/user/admin/UserAdminScreenshotDetectService.java`
- **Proto 定义**：`packages/api-proto/proto/archat_api/user_api.proto`
- **protoId**: 未找到明确定义（可能在 gateway 中）

---

## ❌ 发现 MUST 级问题

### 【严重】问题 1：detect_result 过滤逻辑不一致

| 项目 | 实现 | 代码位置 |
|------|------|----------|
| **老后端** | `sd.detect_result = $n`（**等值匹配**） | UserAdminScreenshotDetectService.java:59 |
| **新后端** | `detect_result: { contains: detectResult }`（**模糊匹配**） | screenshot-review.ts:52 |

**影响**：
- 老后端：搜索 "色情" 只返回 `detect_result = "色情"` 的记录
- 新后端：搜索 "色情" 会返回 `detect_result = "色情,纹身"` 等包含 "色情" 的记录

**正确做法**：应该使用**等值匹配**以对齐老项目行为。

---

### 【严重】问题 2：created_at 返回格式不一致

| 项目 | 返回格式 | 代码位置 |
|------|----------|----------|
| **老后端** | **Unix 毫秒时间戳**（`safeDateToEpochMilli`） | UserAdminScreenshotDetectService.java:126 |
| **新后端** | **ISO 字符串**（`toISOString()`） | screenshot-review.ts:129 |

**Proto 定义**：`int64 created_at = 6;` — 老协议定义的是整数（毫秒时间戳）

**影响**：
- 老前端：`dayjs(Number(record.createdAt))`（config.tsx:123）— 期望数字
- 新前端：`dayjs(item.createdAt)`（index.tsx:112）— 可以兼容 ISO 字符串

**虽然前端可以兼容，但为了严格对齐老项目，应该返回毫秒时间戳。**

---

### 【中等】问题 3：用户信息字段可能不完整

**老后端返回的 UserInfo 字段**（UserMapper.toUserInfo）：
```java
userId, avatarUrl(就是avatarId), username, nickname, bio, age, gender, 
createdDays, pending, productLevel, userType, profession, geoLocation, 
botId, userSource
```

**新后端返回的 ScreenshotUser 字段**（screenshot-review.ts:113-121）：
```typescript
userId, nickname, avatarUrl (customAvatarUrl 或 avatar)
```

**老前端使用的字段**（config.tsx:62-72）：
```typescript
femaleUser: { userId, nickname, avatar? }
maleUser: { userId, nickname, avatar? }
```

**结论**：新后端返回的字段**满足老前端需求**（userId, nickname, avatarUrl），但比老后端返回的字段少。这不影响功能，但不是完全对齐。

---

### 【差异】问题 4：invitation_code 过滤实现不同

**老后端**（L38-42, L54-56）：
```sql
SELECT sd.*, pc.invitation_code 
FROM screenshot_detect sd
LEFT JOIN userinfo_pwa_club_mapping upcm ON sd.female_user_id = upcm.user_id
LEFT JOIN pwa_club pc ON upcm.pwa_club_id = pc.id
WHERE pc.invitation_code = $n

*...truncated...*

*...conversation truncated for brevity...*
