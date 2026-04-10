---
title: <local-command-stdout>Set model to [1mO
date: 2026-03-27T12:32:47+08:00
session_id: 03f4cd2c-1cb2-41c7-b451-a7d122d67f54
project: /Users/presence79/Desktop/WORK/sitin-monorepo-dev
source: claude-code-capture
messages: 41
---

# <local-command-stdout>Set model to [1mO

### User (12:32:49)

<local-command-stdout>Set model to [1mOpus 4.6 (1M context)[22m</local-command-stdout>

### User (12:33:13)

<command-message>save</command-message>
<command-name>/save</command-name>
<command-args>你根据当前的pwa项目，不包括当前工作区里新增修改的代码，你来review一下当前的技术方案：https://presence.feishu.cn/docx/MDbPdCHJSoCAaWxKJ5FciMEInHf，这是需求文档：https://presence.feishu.cn/wiki/KnHPwm4eai3rDrkmvaucR77nnKb，都是飞书文档，不存在你读取不到的问题,然后提出一些修改的建议</command-args>

### Assistant (12:33:33)

我来帮你 review 技术方案。先读取飞书文档和了解 PWA 项目现状。

### Assistant (12:33:49)

让我先读取两份飞书文档，同时探索 PWA 项目现有代码。

### Assistant (13:14:34)

现在来读取两份飞书文档。

### Assistant (13:35:27)

文档都读到了。让我再看几个关键现有文件来对比技术方案。

### Assistant (13:36:01)

Please run /login · API Error: 403 {"error":{"type":"<nil>","message":"Forbidden     (request id: 20260327133531104691445B8Kw9Zxf) (request id: 20260327053530380832374EHreCxkS)"},"type":"error"}

### User (13:37:44)

继续啊

### Assistant (13:37:57)

让我再看几个关键文件完成 review。

### Assistant (13:41:15)

好的，现在我已经完整读取了两份文档和项目现有代码。下面是我的 Review。

---

## 技术方案 Review

### 一、关键架构问题

#### 1. BffLanding 路由缺失 + 权限设计错误（P0）

技术方案提到 `/bff/:inviteCode` 落地页，但**当前 router 里没有这个路由**。更关键的是：**落地页是给未注册用户看的**，不能包在 `ProtectedRoute` 里，否则未登录用户会被直接重定向到 `/onboarding`，永远看不到邀请者信息。

```tsx
// 技术方案写的（有问题）：
<Route path="/bff/:inviteCode" element={
  <ProtectedRoute><BffLanding /></ProtectedRoute>  // ❌ 未登录用户看不到
} />

// 应该是：
<Route path="/bff/:inviteCode" element={<BffLanding />} />  // ✅ 公开路由
```

同时，落地页需要在注册完成后把 `inviteCode` 传给后端建立邀请关系。当前只在 `storageKeys.ts` 存了 `BFF_INVITE_CODE`，但没有写入/读取的消费逻辑。

#### 2. 提现成功触发弹窗的切入点不对（P0）

技术方案写：
> 修改 `src/pages/Cashout/index.tsx`，提现成功后判断当前阶段

但看了 Cashout 页面代码（`Cashout/index.tsx`），它只是一个展示页面——展示余额、支付方式、阶段任务。**真正的提现成功回调不在这里**。提现流程涉及 PayPal OAuth 跳转，成功回调很可能在 `PayPalResult` 页面或 `useCashout` hook 的某个方法里。

**建议**：明确提现成功的事件源在哪里，在那个位置触发 BFF 弹窗。需要 trace 完整的提现 flow：用户点击 Cash Out → PayPal OAuth → 回调 → 提现请求 → 成功，在最后一步插入弹窗逻辑。

#### 3. W1-W5 与 CashoutStage 的映射关系未定义（P0）

需求文档定义了 W1-W5 阶段，但项目里已有 `CashoutStage.StageOne` ~ `StageSeven`（7个阶段）。技术方案完全没有说明两套体系的映射关系：

| BFF W阶段 | 对应 CashoutStage？ | 触发条件 |
|-----------|---------------------|----------|
| W1 | 注册完成 | 注册 |
| W2 | StageTwo? | B完成$4提现 |
| W3 | StageThree? | B赚$7+提现$10 |
| W4 | StageFour? | B赚$10+提现$12 |
| W5 | StageFive? | B赚$20+5min+$25 |

对比 `stageAmountMap`，W2 提现 $4 对应的是 `StageTwo`（$4.0），W3 提现 $10 对应 `StageThree`（$10.0），但 W4 提现 $12 对应 `StageFour`（$12.0），W5 提现 $25 对应 `StageFive`（$25.0）。**这个映射需要显式定义为常量，不能靠隐式推断。**

---

### 二、API 设计问题

#### 4. API 接口不符合项目现有模式（P1）

现有项目所有 API 都用 protobuf：
```typescript
httpClient.requestPost2(RequestType, request, ResponseType)
```

但技术方案里 `bffApi.ts` 的接口虽然形式上用了 `requestPost2`，proto 类型（`GetBffDashboardRequest`、`PokeSquadMemberRequest` 等）**并不存在于 `@sitin/api-proto`**。技术方案需要明确：
- 这些 proto 定义谁来写？什么时候就绪？
- 如果后端先用 JSON API，前端是用 `httpClient.post()` 还是等 proto？

#### 5. `searchStage` 命名不规范

```typescript
export async function searchStage(): Promise<currentStage> { ... }
```

- 函数名 `searchStage` 语义模糊，应该是 `getBffCurrentStage` 或 `fetchBffProgress`
- 返回类型 `currentStage` 小写开头不符合 TypeScript 接口命名规范
- 现有 API 都用 `get*` / `fetch*` 前缀

#### 6. 后端字段设计冗余、命名不一致

技术方案里给了多个场景的字段需求（Banner、全屏弹窗、Earnings入口、裂变主页、落地页），问题是：

- **命名不一致**：`invitedUrl`（主页）vs `inviteLink`（store），同一个字段两个名字
- **字段分散在多个接口中**：`availableAmount` 在 Banner、Earnings入口、裂变主页三个地方都要，但没说是同一个接口还是三个不同接口
- **建议**：统一成 1-2 个接口。一个 `getBffOverview` 返回所有摘要数据（用于 Banner/Earnings入口），一个 `getBffDashboard` 返回完整数据（用于主页）。避免进入一个页面打 3-4 个接口。


*...truncated...*

### User (13:46:15)

<command-message>superpowers:using-superpowers</command-message>
<command-name>/superpowers:using-superpowers</command-name>
<command-args>你用我发给你的需求文档，话一个A/B两端完整状态流转图</command-args>

### Assistant (13:47:39)

基于需求文档，直接画出 A/B 两端完整状态流转图。

---

## BFF 裂变 A/B 两端状态流转图

### 全局状态机（Mermaid 语法）

```mermaid
stateDiagram-v2
    direction TB

    state "A 端（邀请者）" as A {
        [*] --> A_Idle: 完成第二笔提现(StageTwo)
        A_Idle --> A_Shared: 点击 Share / 复制链接
        A_Shared --> A_W1_Locked: B 通过链接注册
        
        A_W1_Locked --> A_W2_Boosted: B 完成 $4 提现
        A_W2_Boosted --> A_W3_Earned: B 赚$7 + 提现$10
        A_W3_Earned --> A_W4_Earned: B 赚$10 + 提现$12
        A_W4_Earned --> A_W5_Complete: B 赚$20 + 5min + 提现$25
        
        note right of A_W1_Locked
            UI: $60 Locked 🔒
            奖励: $0
            接口: fetchBffDashboard
        end note
        
        note right of A_W2_Boosted
            UI: 底部弹窗 "First $4 just landed!"
            奖励: 1h 优先派单
            接口: 后端 Push → 前端轮询感知
        end note
        
        note right of A_W3_Earned
            UI: 全屏弹窗 "You just got paid! $5"
            奖励: $5 可提现
            接口: claimBffReward
        end note
        
        note right of A_W4_Earned
            UI: 全屏弹窗 "You just got paid! $15"
            奖励: $15 可提现 (累计$20)
            接口: claimBffReward
        end note
        
        note right of A_W5_Complete
            UI: 全屏弹窗 "You just got paid! $30"
            奖励: $30 可提现 (累计$50)
            接口: claimBffReward
        end note
    }

    state "B 端（被邀请者）" as B {
        [*] --> B_Landing: 点击 A 的邀请链接
        B_Landing --> B_W1_Registered: 注册完成
        B_W1_Registered --> B_W2_Boarded: 完成 $4 提现
        B_W2_Boarded --> B_W3_Distributing: 赚$7 + 提现$10
        B_W3_Distributing --> B_W4_Growing: 赚$10 + 提现$12
        B_W4_Growing --> B_W5_Graduated: 赚$20 + 5min + 提现$25
        
        note right of B_Landing
            页面: /bff/:inviteCode (公开路由!)
            UI: "[A的名字] gifted you $20"
            动作: 存 inviteCode → localStorage
        end note
        
        note right of B_W1_Registered
            动作: 注册时上报 inviteCode
            → 后端建立 A-B 邀请关系
            → 触发 A 端 W1 状态变更
        end note
        
        note right of B_W3_Distributing
            额外奖励: +$5, 合并拔出 $10
            UI: Cashout 页显示 "Claim $5 gift from [A]"
            接口: claimBffGift
        end note
        
        note right of B_W5_Graduated

*...truncated...*

### User (15:13:25)

<command-message>save</command-message>
<command-name>/save</command-name>
<command-args>你根据当前的pwa项目,基于现在的代码，不包括当前工作区里新增修改的代码，你来review一下当前的技术方案：https://presence.feishu.cn/docx/MDbPdCHJSoCAaWxKJ5FciMEInHf，这是需求文档：https://presence.feishu.cn/wiki/KnHPwm4eai3rDrkmvaucR77nnKb，都是飞书文档，不存在你读取不到的问题,然后提出一些修改的建议</command-args>

### Assistant (15:16:15)

还需要我做什么？比如把这份 review 和状态流转图写到飞书文档里，或者基于这些建议直接修改技术方案文档？

### User (15:18:28)

  你根据当前的pwa项目,基于现在的代码，不包括当前工作区里新增修改的代码，你来review一下当前的技术方案：https://presence.feishu.cn/docx/MDbPdCHJSoCAaWxKJ5FciMEInHf，这是需求文档：https://presence.feishu.cn/wiki/KnHPwm4eai3rDrkmvaucR77nnKb，都是飞书文档，不存在你读取不到的问题,然后提出一些修改的建议

### Assistant (15:18:53)

让我重新读取技术方案文档，看看是否有更新。

### Assistant (15:22:51)

文档已有更新，我看到加入了状态图和修正了落地页路由。让我基于**已提交代码**重新对比 review。

### Assistant (15:40:50)

现在我完全理解了提现流程。下面基于**已提交代码基线**对更新后的技术方案做完整 Review。

---

## 技术方案 Review（V2 — 基于已提交代码）

### 已修复的问题

对比上次 review，文档已修复 2 项：
- 新增了 1.4 节状态流转图
- `/bff/:inviteCode` 路由改为了公开路由（不包在 ProtectedRoute 里）

---

### 一、仍然存在的关键问题

#### 1. 提现成功弹窗切入点设计不精确（P0）

技术方案写：
> `src/pages/Cashout/index.tsx`（或提现成功回调处）

实际提现流程（已追踪完整链路）：

```
StageTaskContainer 点击 Cash Out
  → showCashoutModal() (src/components/showCashoutModal.tsx:278)
    → CashOutAnimModal 状态机
      → PROCESSING → CashoutProcessingModal 调用 normalMediumWithdraw API
        → 成功 → goToNextStatus() → SUCCESS
          → CashoutSuccessModal 用户点击 "Keep Earning"
            → handleClose() (line 65-71)
              → 仅 StageTwo 时 emit CASHOUT_SUCCESS 事件
            → onConfirm?.()
```

**关键发现**：
- `handleClose()` 里只在 `willCashoutStage === StageTwo` 时才 emit `CASHOUT_SUCCESS` 事件（`showCashoutModal.tsx:68-69`）
- 技术方案说"修改 Cashout/index.tsx"，但 **Cashout/index.tsx 根本不参与提现成功回调**，它只是页面容器

**建议的切入点**是 `showCashoutModal.tsx:243-247`，即 SUCCESS 状态的 `onClose` 回调：

```tsx
case CashOutStatus.SUCCESS:
  return (
    <CashoutSuccessModal
      amount={Number(amount)}
      onClose={() => {
        handleClose();
        onConfirm?.();
        // ← 在这里判断阶段，触发 BFF 弹窗
      }}
    />
  );
```

或者更好的方案：**在 `showCashoutModal` 的 `onConfirm` 回调中注入 BFF 逻辑**，调用方（`StageTaskContainer`）传入 `onConfirm` 时加入 BFF 判断，这样不需要修改 showCashoutModal 的内部逻辑。

#### 2. B 端提现时的额外奖励 UI 仍未设计（P0）

需求文档明确要求：
- **B 的 W3 提现**：Cashout 页额外显示 "Claim your $5 gift from [A]"
- **B 的 W5 提现**：Cashout 页额外显示 "Claim your $15 gift from [A]"

技术方案完全没涉及。这需要：
1. B 端判断自己是否是被邀请者（有 BFF 关系）
2. 在 `StageTaskContainer` 或 `CashoutProcessingModal` 中追加额外奖励展示
3. 新增 `claimBffGift` 接口（B 端领取额外奖励）

**这不是小改动**——需要修改 Cashout 流程核心组件。

#### 3. `eventBus.emit(CASHOUT_SUCCESS)` 仅限 StageTwo（P1）

当前代码 `showCashoutModal.tsx:68-69`：
```tsx
if (willCashoutStage === CashoutStage.StageTwo) {
  eventBus.emit(EventNames.CASHOUT_SUCCESS);
}
```

如果 BFF W2 弹窗想复用这个事件，需要注意它**只在 StageTwo 时触发**。W3/W4/W5 的弹窗不能依赖此事件，需要用其他机制（如 `onConfirm` 回调）。

*...truncated...*

*...conversation truncated for brevity...*
