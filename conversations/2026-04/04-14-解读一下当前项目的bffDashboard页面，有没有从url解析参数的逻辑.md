---
title: 解读一下当前项目的bffDashboard页面，有没有从url解析参数的逻辑
date: 2026-04-14T17:52:03+08:00
session_id: 33be6969-d321-46f0-8d28-f330759a7918
project: /Users/presence79/Desktop/WORK/sitin-monorepo-dev
source: claude-code-capture
messages: 12
---

# 解读一下当前项目的bffDashboard页面，有没有从url解析参数的逻辑

### User (17:52:03)

解读一下当前项目的bffDashboard页面，有没有从url解析参数的逻辑

### Assistant (17:52:49)

**BffDashboard 没有从 URL 解析参数的逻辑。**

具体来看：

**用到的路由相关 API：**
- `useNavigate` — 仅用于 `navigate(-1)` 返回上一页
- 没有 `useSearchParams`、`useLocation`、`useParams` 等解析 URL 的 hook

**邀请链接是构造出去的，不是读进来的：**
```tsx
// 第 56 行 - 构建对外分享的 URL
const inviteUrl = `${window.location.origin}${BFF_LANDING_PATH}?c=${dashboard?.inviteCode || ""}`;
```
这里的 `inviteCode` 来自 `getBffDashboard()` API 响应，不是从当前页面 URL 读取的。

**数据流向：**
```
/bff-dashboard 进入 → 调 API 拿 inviteCode → 构造 ?c=xxx 链接分享出去
                                                         ↓
                                                落地页 /bff-landing 解析 ?c= 参数
```

如果你想在 BffDashboard 上加 URL 参数解析（比如从分享链接回来时携带某个状态），目前是空白的，可以直接用 `useSearchParams` 加。

### User (17:54:13)

你看下现在bffdashboard页面的飞钱动画是怎么处罚的

### User (17:54:48)

你看下现在bffdashboard页面的飞钱动画是怎么处罚的

### User (17:56:11)

你看下现在bffdashboard页面的飞钱动画是怎么触发的

### Assistant (18:03:38)

已有完整代码，直接分析触发链路：

---

## 飞钱动画触发流程

### 第一步：API 返回触发信号（第 65-81 行）

```tsx
const fetchDashboard = useCallback(async () => {
  const data = await getBffDashboard();
  setDashboard(data);

  if (data.hasPendingCoinAnimation) {        // ← 后端返回这个字段为 true
    bpTrack(EventName.bff_coin_animation_play);
    setShowCoinAnimation(true);              // ← 开关打开
  }
}, [...]);
```

触发条件：**后端 `getBffDashboard()` 返回 `hasPendingCoinAnimation: true`**，同时还需要 `animationRewardDelta`（第 197 行）表示这次动画要转移多少金额。

---

### 第二步：Props 传入 LockedBonusCard（第 194-202 行）

```tsx
<LockedBonusCard
  playAnimation={showCoinAnimation}                    // ← 动画开关
  rewardDelta={dashboard.animationRewardDelta ?? 0}   // ← 转移金额
  onAnimationEnd={() => setShowCoinAnimation(false)}  // ← 动画结束回调
  ...
/>
```

---

### 第三步：LockedBonusCard 内部编排（第 353-387 行）

三条时间线同时启动：

```
t=0ms    ┌─ Locked 数字从 (lockedAmount + delta) 滚动到 lockedAmount（1000ms）
         ├─ 飞钱 Lottie 从 Locked 位置飞向 Available 位置（flyStyle 设置）
         │
t=700ms  └─ Available 数字开始从 (availableAmount - delta) 滚到 availableAmount（600ms）
                                  ↑ 飞到一半时 Available 才开始增加，视觉上"钱飞过去"
t=1800ms     清除 flyStyle，调 onAnimationEnd → showCoinAnimation = false
```

坐标计算靠 `getBoundingClientRect()`（第 358-368 行），把 Locked 区域和 Available 区域的屏幕坐标转成相对 card 的 CSS 变量 `--start-x/y` 和 `--end-x/y`，供 keyframe 动画使用。

---

### 总结

```
后端 hasPendingCoinAnimation=true
        ↓
setShowCoinAnimation(true)
        ↓
LockedBonusCard.playAnimation=true → 三件事同时发生：
  1. Locked 数字滚动减少（-delta）
  2. Lottie 飞钱从 Locked 飞到 Available
  3. 700ms 后 Available 数字滚动增加（+delta）
        ↓
1800ms 后动画结束，showCoinAnimation 重置为 false
```

这个动画**只在页面首次加载、API 返回时触发一次**，没有其他触发入口。

### User (18:10:19)

现在有一个逻辑：用户如果从push推送中点击了，然后进入到bffdashboard页面，要从url上解读被邀请的用户和可领奖的阶段是哪个，注意该被邀请用户一阶段只能展示一次飞钱动画，每一次push的链接上被邀请人或者阶段都不相同，确保某用户某阶段动画只执行一次，并且设计链接上的参数，你看下这个怎么实现？

### Assistant (18:11:15)

先看一下 stageRewardMap 和相关常量，确认 delta 数值。

### Assistant (18:12:34)

现在有足够信息来设计完整方案了。

---

## 设计方案

### 1. URL 参数设计

```
/bff-dashboard?rid=123456&stage=W4
```

| 参数 | 含义 | 示例 |
|------|------|------|
| `rid` | 被邀请人的 `relationId` | `rid=123456` |
| `stage` | 她刚完成的阶段 | `stage=W3` / `stage=W4` / `stage=W5` |

`delta` 不放 URL —— 客户端已有 `stageRewardMap`，放 URL 可被篡改。

---

### 2. 去重机制

用 `localStorage` 记录已播放的 `(rid, stage)` 组合：

```
Key:   bff_anim_seen:{rid}:{stage}
Value: "1"
```

例：`bff_anim_seen:123456:W4 = "1"`

---

### 3. 执行流程

```
进入 /bff-dashboard?rid=xxx&stage=W4
           ↓
   读取 URL 参数 rid + stage
           ↓
   立即清除 URL 参数（replace history，不留痕迹）
   并将 {rid, stage} 存入 ref（因为 URL 清了之后 state 无法再读）
           ↓
   fetchDashboard()（照常）
           ↓
   检查 localStorage.getItem("bff_anim_seen:xxx:W4")
        ├─ 有 → 不播动画（已看过）
        └─ 没有 → 从 stageRewardMap 取 delta
                  setShowCoinAnimation(true)
                  setPendingAnimDelta(delta)
           ↓
   动画结束时 onAnimationEnd
        → localStorage.setItem("bff_anim_seen:xxx:W4", "1")
        → 清空 pendingAnimRef
```

---

### 4. 代码改动

**`constants/bff.ts` — 新增 stage→delta 映射（提出来共用）：**

```ts
/** Push 动画触发时各阶段对应的奖励金额 */
export const STAGE_ANIMATION_DELTA: Partial<Record<BffStage, number>> = {
  W3: 5,
  W4: 15,
  W5: 30,
};
```

**`BffDashboard/index.tsx` — 核心改动：**

```tsx
import { useNavigate, useSearchParams } from "react-router-dom";
import { STAGE_ANIMATION_DELTA } from "@/constants/bff";

// 去重 key 生成
const getAnimSeenKey = (rid: string, stage: string) =>

*...truncated...*

### User (18:17:15)

那你按照这个逻辑先实现，注意写好注释

### Assistant (18:18:00)

**Step 1：** 先在 `constants/bff.ts` 里添加 stage→delta 映射。

### Assistant (18:18:33)

编辑已成功。继续 **Step 2**：改造 `BffDashboard/index.tsx`，分几个小步做。

### Assistant (18:18:46)

**2-a：** 更新 import

### Assistant (18:19:35)

编辑已成功，继续后续改动。

### Assistant (18:20:03)

ESLint 警告是预期的，后续用到就消除了。继续添加 helper 函数和组件内逻辑。

**2-b：** 在组件前添加去重 key 生成函数

### Assistant (18:21:52)

ESLint 警告是中间态，接下来全部接上就消除了。先读取文件当前状态再继续编辑。

### Assistant (18:22:21)

**2-c：** 添加 URL 参数解析的 `useEffect`，插在动画加载 effect 之后

### Assistant (18:23:59)

**2-d：** 更新 `fetchDashboard` 内的动画触发逻辑，Push 优先

### Assistant (18:24:41)

**2-e：** 添加 `handleAnimationEnd`，写 localStorage 去重标记

### Assistant (18:25:15)

**2-f：** 更新 `LockedBonusCard` 的 `rewardDelta` 和 `onAnimationEnd`

### Assistant (18:26:02)

验证最终结果，读取关键区域确认无误。

### Assistant (18:26:31)

所有改动已就位，代码逻辑正确。

### Assistant (18:26:40)

完成。验证一下 IDE 诊断是否清零。

### Assistant (18:26:55)

有个 TS 错误，`setSearchParams` 第二个参数被拒绝了，说明项目的 React Router 版本类型不支持 navigate options。让我查一下版本和用法。

### Assistant (18:27:17)

React Router 6.28 应该支持两个参数，但本地 types 可能有偏差。最简单的修法是改用 `navigate` 清除参数，它在组件里已经有了。

### Assistant (18:27:56)

`setSearchParams` 不再需要了，从解构里移除。

*...conversation truncated for brevity...*
