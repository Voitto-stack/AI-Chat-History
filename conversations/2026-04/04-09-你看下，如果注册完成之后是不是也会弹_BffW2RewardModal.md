---
title: 你看下，如果注册完成之后是不是也会弹<BffW2RewardModal
date: 2026-04-09T19:40:11+08:00
session_id: 82693e85-80be-4119-bb37-2a88c97821bd
project: /Users/presence79/Desktop/WORK/sitin-monorepo-dev
source: claude-code-capture
messages: 8
---

# 你看下，如果注册完成之后是不是也会弹<BffW2RewardModal

### User (19:40:11)

你看下，如果注册完成之后是不是也会弹<BffW2RewardModal

### Assistant (19:41:50)

我来帮你查看 BffW2RewardModal 在注册流程中的使用情况。

### Assistant (19:43:30)

让我搜索一下注册流程相关的代码：

### Assistant (19:44:36)

## 直接回答

**不会**。注册完成后不会弹出 `BffW2RewardModal`。

从代码来看：

### 注册完成后的流程
`apps/pwa/src/pages/Onboarding/index.tsx:151-175`

```typescript
const handleUploadUserInfo = useLockFn(async () => {
  // 1. 上传用户信息
  const response = await uploadUserInfo({...});
  
  // 2. 完成 Register 任务
  await finishTask(TaskId.Register);
  
  // 3. 直接跳转到首页
  navigate("/", { replace: true });
});
```

### BffW2RewardModal 的触发条件
`apps/pwa/src/components/showCashoutModal.tsx:274-284`

只在以下两个条件**同时满足**时才会弹出：
1. `currentStatus === CashOutStatus.SUCCESS`（提现成功状态）
2. `willCashoutStage === CashoutStage.StageTwo`（W2 阶段）

```typescript
case CashOutStatus.SUCCESS:
  if (willCashoutStage === CashoutStage.StageTwo) {
    return <BffW2RewardModal amount={Number(amount)} onClose={...} />
  }
```

---

## 深度交互

### 关键区别

| 场景 | 触发时机 | 弹窗类型 | 目的 |
|------|---------|---------|------|
| **注册完成** | 完成 Onboarding 4 步骤 | 无弹窗 | 直接进入首页开始任务 |
| **W2 提现成功** | 提现 API 成功返回 | BffW2RewardModal | 引导用户分享邀请链接 |

### 为什么这样设计？

1. **注册阶段**：用户刚完成注册，还没赚到钱，谈分享激励为时过早
2. **W2 提现阶段**：用户已经完成第一笔提现（$4.0），体验到真金白银，此时引导分享转化率更高

### 如果你想在注册完成后也弹出分享引导

可以在 `Onboarding/index.tsx:167` 的 `navigate("/", { replace: true })` 之前插入：

```typescript
// 完成注册任务
await finishTask(TaskId.Register);

// 可选：弹出 BFF 分享引导（需要自定义一个新的弹窗组件）
// showBffInviteModal(); // 例如："Invite friends to earn $60!"

navigate("/", { replace: true });
```

但**不建议直接复用 BffW2RewardModal**，因为：
- 它的文案是 "First $4 just landed!"，不适合注册场景
- 它依赖 `amount` 参数，注册时用户余额为 0

### User (21:11:40)

这部分内容内容后端会返回一个专门在earnings页面表示入口的字段，其中有表示标题和内容的两个字段，但是字段名目前还不知道，你先按照规范写一下基本的，后端给了字段之后再改： {/* 中间动态文案 */}
      <div className="flex-1 min-w-0">
        {/* 标题 */}
        <p className="text-[16px] font-semibold text-white">💸 Tap here to unlock</p>
        {/* 内容: */}
        <p className="text-white text-[15px] font-normal mt-1">$60 per friend.</p>
      </div>

### Assistant (21:12:08)

```typescript
{/* 中间动态文案 */}
<div className="flex-1 min-w-0">
  {/* 标题 */}
  <p className="text-[16px] font-semibold text-white">
    {bffEntryData?.title || "💸 Tap here to unlock"}
  </p>
  {/* 内容 */}
  <p className="text-white text-[15px] font-normal mt-1">
    {bffEntryData?.description || "$60 per friend."}
  </p>
</div>
```

**配套的 TypeScript 接口定义：**

```typescript
/**
 * BFF 入口配置数据
 * TODO: 等待后端确认字段名，当前使用 title/description 作为占位
 */
interface BffEntryConfig {
  /** 入口标题（例如："💸 Tap here to unlock"） */
  title?: string;
  /** 入口描述文案（例如："$60 per friend."） */
  description?: string;
  // TODO: 后端可能还会返回其他字段，如：
  // iconUrl?: string;  // 自定义图标
  // enabled?: boolean; // 是否显示入口
}
```

**在组件顶部添加 state 或从 API 获取数据：**

```typescript
// 方式 1：从 props 接收（如果父组件已经获取了数据）
interface EarningsPageProps {
  bffEntryData?: BffEntryConfig;
}

// 方式 2：从 API 获取（如果需要在当前组件请求）
const [bffEntryData, setBffEntryData] = useState<BffEntryConfig | undefined>();

useEffect(() => {
  // TODO: 调用后端 API 获取 BFF 入口配置
  // fetchBffEntryConfig().then(setBffEntryData);
}, []);
```

**完整的代码片段示例：**

```typescript
// 假设在 Earnings 页面组件中
const [bffEntryData, setBffEntryData] = useState<BffEntryConfig | undefined>();

// TODO: 等后端 API 就绪后，取消注释并填入正确的接口
// useEffect(() => {
//   api.getBffEntryConfig().then(data => {
//     setBffEntryData({
//       title: data.xxx,        // TODO: 替换为后端实际字段名
//       description: data.yyy,  // TODO: 替换为后端实际字段名
//     });
//   });
// }, []);

return (
  <div className="flex items-center gap-3">
    {/* 左侧图标 */}
    <div>...</div>
    
    {/* 中间动态文案 */}
    <div className="flex-1 min-w-0">
      {/* 标题 */}
      <p className="text-[16px] font-semibold text-white">
        {bffEntryData?.title || "💸 Tap here to unlock"}
      </p>
      {/* 内容 */}
      <p className="text-white text-[15px] font-normal mt-1">
        {bffEntryData?.description || "$60 per friend."}
      </p>

*...truncated...*

### User (21:12:58)

你改了吗

### Assistant (21:13:11)

抱歉，我只给了建议但没有实际修改。让我现在修改：

### Assistant (21:13:55)

现在开始修改：

### Assistant (21:14:33)

好的，现在修改 BffEntryCard 组件：

### Assistant (21:14:50)

已完成修改！让我验证一下：

### Assistant (21:15:06)

✅ 修改完成！

## 改动总结

### 1. 类型定义 (`apps/pwa/src/types/bff.ts:64-66`)
```typescript
/** Earnings 入口卡片标题（TODO: 等待后端确认字段名） */
entryTitle?: string;
/** Earnings 入口卡片描述（TODO: 等待后端确认字段名） */
entryDescription?: string;
```

### 2. 组件使用 (`apps/pwa/src/components/BffEntryCard/index.tsx:88-93`)
```typescript
{/* 标题 */}
<p className="text-[16px] font-semibold text-white">
  {overview.entryTitle || "💸 Tap here to unlock"}
</p>
{/* 内容 */}
<p className="text-white text-[15px] font-normal mt-1">
  {overview.entryDescription || `$${overview.inviterSignupReward ?? 60} per friend.`}
</p>
```

## 后端对接 Checklist

等后端提供字段后修改：
- [ ] 更新 `apps/pwa/src/types/bff.ts:64-66` 的字段名（如果后端不是用 `entryTitle`/`entryDescription`）
- [ ] 更新 `apps/pwa/src/components/BffEntryCard/index.tsx:89,93` 的字段引用
- [ ] 测试后端返回空值时的 fallback 显示

### User (10:04:02)

对一下getDashboard接口的后端字段部分，看看有哪些没对上：[Image #1] ，除了squad_list的下划线不用盐

### Assistant (10:04:30)

让我查看当前的类型定义和 API 映射：

### Assistant (10:04:40)

我还需要看 proto 生成类型和你发的图。先读一下接口实现和截图。

### Assistant (10:04:49)

我重读一下，不带 pages 参数。

### Assistant (10:06:19)

让我查看 Proto 生成的类型定义：

### Assistant (10:06:34)

我直接读关键区段。

### Assistant (10:07:21)

根据后端返回的 JSON 对比 Proto 定义，发现以下字段不匹配问题：

### Assistant (10:07:31)

还要看 dashboard 类型在哪里用到了哪些字段。

### Assistant (10:07:39)

我再直接读一下截图内容，确认和代码的差异。

### Assistant (10:08:38)

根据后端返回的 JSON 对比 Proto 定义和前端类型，发现以下字段缺失/不匹配：

## 📋 字段对比分析

### 1. **BffGetDashboardResponse 顶层字段缺失**

| 前端使用的字段 | Proto 是否有 | 后端应返回（推测） | 说明 |
|--------------|------------|----------------|------|
| `lockedAmount` | ❌ 缺失 | `locked_amount_cents` | 锁定金额（美分），前端需除以100 |
| `availableAmount` | ❌ 缺失 | `available_amount_cents` | 可用金额（美分），前端需除以100 |
| `shareText` | ❌ 缺失 | `share_text` | 分享文案 |
| `animationRewardDelta` | ❌ 缺失 | `animation_reward_delta_cents` | 动画转移金额（美分） |
| `inviteCode` | ✅ 有 | `invite_code` | 邀请码（已有） |
| `hasPendingCoinAnimation` | ✅ 有 | `has_pending_coin_animation` | 是否有待播放动画（已有） |
| `squadList` | ✅ 有 | `squad_list` | Squad 列表（已有，你说不用改下划线） |
| `totalCount` | ✅ 有 | `total_count` | 总数（已有） |

**前端当前使用位置**：
- `lockedAmount`: `BffDashboard/index.tsx:323-324`
- `availableAmount`: `BffDashboard/index.tsx:185, 329-330`
- `shareText`: `BffDashboard/index.tsx:81`
- `animationRewardDelta`: `BffDashboard/index.tsx:182`

---

### 2. **BffSquadMember 字段严重缺失**

后端当前只返回了基础字段，但前端 `SquadMember` 类型需要更多业务字段：

| 前端字段 | Proto 是否有 | 后端字段（推测） | 类型/说明 |
|---------|------------|---------------|----------|
| `relationId` | ⚠️ 有但不匹配 | `relationship_id` | Proto 是 number，前端期望 string |
| `nickname` | ✅ 有 | `nickname` | string |
| `avatar` | ✅ 有 | `avatar` | string |
| `currentStage` | ⚠️ 有但类型不匹配 | `current_stage` | Proto 是 number (1,2,3...)，前端期望 BffStage ("W1","W2"...) |
| `stageProgress` | ❌ 缺失 | `stage_progress` | 阶段进度数组 StageProgressItem[] |
| `inactiveHours` | ❌ 缺失 | `inactive_hours` | 不活跃小时数 |
| `pokeAvailable` | ❌ 缺失 | `poke_available` | 催单按钮是否可用（24h 冷却） |
| `riskFlag` | ⚠️ 字段名不匹配 | `risk_status` | Proto 有 `riskStatus`，前端期望 `riskFlag` |
| `taskText` | ❌ 缺失 | `task_text` | 当前阶段任务文案（后端动态生成） |
| `mainBtnText` | ❌ 缺失 | `main_btn_text` | 催单按钮文案 |
| `shareText` | ❌ 缺失 | `share_text` | 分享话术（后端动态生成） |

**Proto 有但前端不需要的字段**：
- `inviteeUserId` - 前端未使用
- `maxStageReached` - 前端未使用
- `withdrawSuccessCount` - 前端未使用  
- `rewardStatus` - 前端未使用
- `createdAt` - 前端未使用

---

### 3. **字段命名/类型不一致**

| Proto 字段 | 前端期望 | 问题 |
|-----------|---------|------|
| `defaultCopy` | `defaultReward.taskName` | 字段名不一致 |
| `defaultRewardCents` | `defaultReward.rewardAmount` | 需要嵌套对象 + 美分转美元 |
| `relationshipId` (number) | `relationId` (string) | 字段名 + 类型不一致 |
| `currentStage` (number) | `currentStage` (BffStage) | 类型不一致，需要映射 1→"W1", 2→"W2" |
| `riskStatus` | `riskFlag` | 字段名不一致 |

---

## ✅ 建议 Proto 修改清单

### **BffGetDashboardResponse 新增字段**：
```protobuf
message BffGetDashboardResponse {
  // ... 现有字段
  
  // 新增字段
  int64 locked_amount_cents = X;           // 锁定金额（美分）
  int64 available_amount_cents = Y;        // 可用金额（美分）
  string share_text = Z;                   // 分享文案
  int64 animation_reward_delta_cents = W;  // 动画转移金额（美分）
}
```

### **BffSquadMember 新增字段**：

*...truncated...*

*...conversation truncated for brevity...*
