---
title: 你去把Home页面的Banner的背景图改[Image #2]
date: 2026-04-02T16:22:32+08:00
session_id: 5635dfcb-10f3-4928-93f0-8a53df6cec4d
project: /Users/presence79/Desktop/WORK/sitin-monorepo-dev
source: claude-code-capture
messages: 17
---

# 你去把Home页面的Banner的背景图改[Image #2]

### User (16:23:14)

你去把Home页面的Banner的背景图改[Image #2]   
，然后shrink-0 w-[52px] h-[52px]                   
object-contain部分的图片改成 [Image #1]

### Assistant (16:23:33)

我来帮你修改Home页面的Banner。首先让我看一下当前的代码结构。

### Assistant (16:23:47)

好的，我看到了代码结构。现在我需要：
1. 将两张图片复制到 assets/images/bff/ 目录
2. 修改 BffBanner 组件的背景和图标

让我先复制图片：

### Assistant (16:24:36)

现在修改 BffBanner 组件：

### Assistant (16:25:23)

完成！我已经完成了以下修改：

**直接执行：**

1. ✅ 将钱袋图标复制到项目并重命名为 `money-bag-icon.png`
2. ✅ 将背景图复制到项目并重命名为 `banner-bg.png`
3. ✅ 更新了 `BffBanner/index.tsx` 中的图片引用
4. ✅ 将背景从纯色 `#55C8F2` 改为使用新的背景图片

**修改位置：**
- apps/pwa/src/components/BffBanner/index.tsx:13-14 (图片导入)
- apps/pwa/src/components/BffBanner/index.tsx:54-61 (背景样式)

---

**深度交互：**

需要注意的是，我使用了 `backgroundSize: 'cover'` 来确保背景图片能够完整覆盖整个 Banner 区域。如果背景图的比例和 Banner 不匹配，可能会出现裁剪。如果你希望：
- 完整显示背景不裁剪：改用 `backgroundSize: 'contain'`
- 拉伸适应容器：改用 `backgroundSize: '100% 100%'`

现在可以在浏览器中查看效果了。

### User (16:38:25)

shrink-0 flex items-center justify-center gap-[4px] px-[9px] py-[2px] rounded-[999px] bg-white/85部分的样式和文案和icon要能够根据后端给的状态来进行匹配：默认状态下：Active ，#3EB828，🟢，大于48小时对方未活跃过：Inactive 48h,#FB881C，⚠️，超过96小时未活跃：Urgent，#DF2727，🚨，超过7天未活跃：Lost > 7d,#DF2727，❌

### Assistant (16:38:37)

我来修改BffBanner组件，让状态标签能够根据后端数据动态显示。首先让我看一下后端API返回的数据结构：

### Assistant (16:38:48)

我看到了数据结构。目前 `BffOverview` 接口中没有 `squadActiveCount` 对应的活跃状态字段。我需要先更新类型定义，然后在 Banner 组件中实现状态逻辑。让我先修改类型定义：

### Assistant (16:39:35)

现在修改 BffBanner 组件，添加状态标签逻辑：

### Assistant (16:45:16)

现在让我更新 Mock 数据，添加不同的活跃状态用于测试：

### Assistant (16:46:23)

完成！我已经完成了状态标签的实现。

**直接执行：**

✅ **类型定义更新** (apps/pwa/src/types/bff.ts):
- 添加了 `SquadActivityStatus` 类型：`"ACTIVE" | "INACTIVE_48H" | "URGENT" | "LOST_7D"`
- 在 `BffOverview` 接口中添加了 `squadActivityStatus` 字段

✅ **BffBanner 组件更新** (apps/pwa/src/components/BffBanner/index.tsx):
- 添加了状态配置映射 `STATUS_CONFIG`，包含每种状态的文字、图标、颜色
- 将右侧 View 按钮替换为状态标签
- 状态标签样式：`shrink-0 flex items-center justify-center gap-[4px] px-[9px] py-[2px] rounded-[999px] bg-white/85`
- 根据后端状态动态显示：
  - **Active**: 🟢 绿色 #3EB828
  - **Inactive 48h**: ⚠️ 橙色 #FB881C  
  - **Urgent**: 🚨 红色 #DF2727
  - **Lost > 7d**: ❌ 红色 #DF2727

✅ **Mock 数据更新** (apps/pwa/src/api/bff.ts):
- 添加了 `squadActivityStatus` 字段，随机返回不同状态用于测试

**修改位置：**
- apps/pwa/src/types/bff.ts:22-24, 35-48
- apps/pwa/src/components/BffBanner/index.tsx:1-41, 90-105
- apps/pwa/src/api/bff.ts:26, 161-163

---

**深度交互：**

**关于状态判断逻辑：**

目前的实现是依赖后端返回 `squadActivityStatus` 字段。如果后端没有返回这个字段，会默认显示为 "Active"。

如果你希望前端根据 `inactiveHours` 自己计算状态（作为后端字段缺失时的降级方案），可以添加这样的逻辑：

```typescript
// 如果后端没返回状态，前端根据 inactiveHours 计算
const getActivityStatus = (hours: number): SquadActivityStatus => {
  if (hours > 168) return "LOST_7D";      // > 7天
  if (hours > 96) return "URGENT";         // > 96小时
  if (hours > 48) return "INACTIVE_48H";   // > 48小时
  return "ACTIVE";
};
```

不过按照设计，这个业务逻辑应该由后端统一计算，前端只负责展示。这样可以保证：
1. 状态判断规则可以在后端统一调整
2. 避免前后端逻辑不一致
3. 减少前端计算负担

现在可以在浏览器中查看不同状态的效果了！由于 Mock 数据是随机返回状态，刷新页面会看到不同的状态标签。

### User (16:49:59)

我让你改动是这边的状态： {isActive && (
            <div className="shrink-0 flex items-center justify-center gap-[4px] px-[9px] py-[2px] rounded-[999px] bg-white/85">
              <span className="w-[4px] h-[4px] rounded-full bg-[#41DD25]" />
              <span className="text-[12px] font-medium leading-[16px] tracking-[-0.23px] text-[#41DD25]">
                Active
              </span>
            </div>
          )}，你改了哪里啊，我现在没看到效果

### Assistant (16:50:19)

抱歉我理解错了！你说的是 BffDashboard 页面里的状态标签，不是 Home 页面的 Banner。让我找到正确的文件：

### Assistant (16:50:39)

找到了！确实是在 BffDashboard 页面的第501-508行。现在我来修改这个状态标签，让它能根据 `inactiveHours` 动态显示不同状态：

### Assistant (16:51:15)

完成！现在让我验证一下 Mock 数据中有不同 `inactiveHours` 的测试数据：

### Assistant (16:51:25)

完美！Mock 数据中已经有了不同的 `inactiveHours` 值用于测试：
- Sarah: 12小时 → 应该显示 **Active** 🟢 绿色
- Emily: 52小时 → 应该显示 **Inactive 48h** ⚠️ 橙色
- Jessica: 120小时 (5天) → 应该显示 **Urgent** 🚨 红色

让我再添加一个超过7天的测试数据：

### Assistant (16:51:46)

完成！现在修改已经生效了。

**直接执行：**

✅ **修改了正确的位置** - BffDashboard 页面的 Squad 成员卡片状态标签 (apps/pwa/src/pages/BffDashboard/index.tsx:457-548)

✅ **实现了动态状态显示逻辑**：
- **Active** (< 48h): 🟢 #3EB828 绿色
- **Inactive 48h** (48-96h): ⚠️ #FB881C 橙色  
- **Urgent** (96-168h): 🚨 #DF2727 红色
- **Lost > 7d** (> 168h): ❌ #DF2727 红色

✅ **更新了 Mock 数据**用于测试：
- Sarah (12h) → Active 🟢
- Emily (52h) → Inactive 48h ⚠️
- Jessica (200h) → Lost > 7d ❌

**修改位置：**
- apps/pwa/src/pages/BffDashboard/index.tsx:457-548 (SquadMemberCard 组件)
- apps/pwa/src/api/bff.ts:92 (Jessica 的 inactiveHours 改为 200)

---

**深度交互：**

之前我误改了 Home 页面的 BffBanner，那个改动其实不是你要的。如果你不需要 Home 页面 Banner 的状态标签，我可以把那部分改回去。

现在 BffDashboard 页面的状态标签已经正确实现了，可以在浏览器中访问 `/bff-dashboard` 路由查看效果。每个 Squad 成员卡片右上角会根据 `inactiveHours` 显示对应的状态。

### User (16:55:02)

这部分加上字体为Pangram：  <span className="text-[40px] font-extrabold text-[#16613F]">
              ${dashboard.lockedAmount}
            </span>

### Assistant (16:55:26)

我来给这部分添加 Pangram 字体。首先让我检查一下项目中是否已经配置了 Pangram 字体：

### Assistant (16:57:21)

完美！项目中已经配置了 Pangram 字体。现在我来修改那个金额数字的字体：

### Assistant (17:00:13)

完成！已经给 Locked Amount 的金额数字添加了 Pangram 字体。

**修改位置：**
- apps/pwa/src/pages/BffDashboard/index.tsx:306 - 添加了 `font-pangram` class

现在 `$60` 这个金额会使用 Pangram ExtraBold 字体显示。

### User (17:12:47)

再加一个改动到My Squad卡片里面，每一张卡片的任务文案（昵称下面的）和拉起分享文案（点击主按钮之后拉起分享面板之后的文案），主按钮的文案按照这些来：当前节点文案
w2
任务文案:Needs to take her first calls!
主按钮文案:
拉起分享的话术:

Poke for 1h Boost
"Girl! Do the quick face verify and take your first calls to casSh
out $4! It's so easy!
[专属链接]"

w3
任务文案:She's making money! Needs to hit the $10 cashout.
主按钮文案:
拉起分享的话术:
Nudge to unlock $5
"Proud of you bestie!
You are making that money. Keep
goingtohityour$5cashout![专属链接]"

w4
任务文案:Chasing the $12 cashout.
主按钮文案:
Cheer to unlock $15
拉起分享的话术:
"You are killingit!
Just a few more calls to get your next
cashout.Webothget the big bonus soon![专属链接]"

w5
任务文案:Almost graduated! Chasing the big $30 cashout.
主按钮文案:
Push to unlock $30.
拉起分享话术:
"So close to the big bonus!
Get online for a few minutes and
hit that$25cashout![专属链接]"

### Assistant (17:13:11)

我来修改 Squad 成员卡片的文案逻辑，让它根据当前阶段（W2-W5）显示对应的固定文案。首先让我看一下当前的按钮点击逻辑：

### Assistant (17:13:32)

我看到按钮目前没有点击事件。让我先添加文案配置，然后添加点击逻辑来触发分享：

### Assistant (17:15:07)

现在我需要修改 SquadMemberCard 组件，让它使用固定文案并添加分享功能。首先修改 SquadList 传递 inviteUrl：

### Assistant (17:15:39)

现在修改 SquadMemberCard 组件，添加文案逻辑和分享功能：

### Assistant (17:16:53)

现在修改任务文案显示和按钮点击事件：

### Assistant (17:18:56)

完成！现在让我总结一下所有的改动：

**直接执行：**

✅ **添加了阶段文案配置** (apps/pwa/src/pages/BffDashboard/index.tsx:74-103):
- 为 W2, W3, W4, W5 每个阶段配置了固定的任务文案、按钮文案和分享话术
- 使用 `STAGE_COPY_CONFIG` 对象管理所有文案

✅ **修改了 SquadMemberCard 组件** (apps/pwa/src/pages/BffDashboard/index.tsx):
- 接收 `inviteUrl` 参数
- 根据 `member.currentStage` 从配置中获取对应的文案
- 如果当前阶段没有配置（如 W1），降级使用后端返回的文案
- 添加了 `handleButtonClick` 函数来处理按钮点击
- 点击按钮时触发分享功能，使用配置的分享话术

✅ **更新了 SquadList 组件**:
- 传递 `dashboard.inviteUrl` 给 SquadMemberCard

✅ **按钮点击行为**:
- 点击主按钮会调用 `shareBffLink` 分享功能
- 分享内容包含该阶段的专属话术 + 邀请链接
- 同时触发埋点 `bff_poke_sent`

**各阶段文案总结：**

| 阶段 | 任务文案 | 按钮文案 | 分享话术 |
|------|---------|---------|---------|
| **W2** | Needs to take her first calls! | Poke for 1h Boost | Girl! Do the quick face verify and take your first calls to cash out $4! It's so easy! |
| **W3** | She's making money! Needs to hit the $10 cashout. | Nudge to unlock $5 | Proud of you bestie! You are making that money. Keep going to hit your $5 cashout! |
| **W4** | Chasing the $12 cashout. | Cheer to unlock $15 | You are killing it! Just a few more calls to get your next cashout. We both get the big bonus soon! |
| **W5** | Almost graduated! Chasing the big $30 cashout. | Push to unlock $30 | So close to the big bonus! Get online for a few minutes and hit that $25 cashout! |

**修改位置：**
- apps/pwa/src/pages/BffDashboard/index.tsx:74-103 (文案配置)
- apps/pwa/src/pages/BffDashboard/index.tsx:475 (SquadList 传参)
- apps/pwa/src/pages/BffDashboard/index.tsx:489-557 (SquadMemberCard 逻辑)
- apps/pwa/src/pages/BffDashboard/index.tsx:583 (任务文案显示)
- apps/pwa/src/pages/BffDashboard/index.tsx:606 (按钮点击事件)

---

**深度交互：**

目前的实现中，分享链接会附加在话术后面（由 `shareBffLink` 函数自动拼接）。如果你需要更精确地控制链接在话术中的位置，可以在文案中使用占位符，然后在调用分享时进行替换。

另外，现在可以在浏览器中访问 `/bff-dashboard` 页面测试效果：
- 每个 Squad 成员卡片会显示对应阶段的任务文案
- 主按钮文案会根据阶段变化
- 点击主按钮会触发分享，使用该阶段的专属话术

*...conversation truncated for brevity...*
