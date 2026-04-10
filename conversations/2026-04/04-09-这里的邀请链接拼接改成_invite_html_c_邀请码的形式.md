---
title: 这里的邀请链接拼接改成/invite.html?c=邀请码的形式
date: 2026-04-09T15:40:48+08:00
session_id: 2e6a4c9f-532d-4f73-a0ab-4d3975868dc8
project: /Users/presence79/Desktop/WORK/sitin-monorepo-dev
source: claude-code-capture
messages: 17
---

# 这里的邀请链接拼接改成/invite.html?c=邀请码的形式

### User (15:40:48)

这里的邀请链接拼接改成/invite.html?c=邀请码的形式

### Assistant (15:40:58)

我来帮你修改邀请链接的拼接方式。首先让我查看完整的文件内容和相关代码。

### Assistant (15:41:12)

现在我需要找到邀请码（referral code）从哪里获取。让我查看 overview 数据结构和相关的 store：

### Assistant (15:41:36)

我看到 `BffOverview` 中没有邀请码字段，但在 `BffDashboard` 中有 `inviteUrl`。让我检查用户的信息：

### Assistant (15:42:04)

让我查看 UserInfo 的类型定义：

### Assistant (15:42:22)

找到了！`UserInfo` 中有 `invitationCode` 字段（3725行），这就是邀请码。现在修改 `useBffShare.ts` 来使用这个邀请码：

### Assistant (15:42:30)

让我重新查看文件内容：

### Assistant (15:51:46)

Request timed out

### User (15:51:46)

继续

### Assistant (15:51:56)

让我检查其他可能需要修改邀请链接的地方：

### Assistant (15:52:16)

看到 `BffDashboard` 页面使用了 `dashboard.inviteUrl`，这个是从后端接口返回的。让我检查一下 Dashboard 页面的完整逻辑：

### Assistant (15:52:23)

我看到 `BffDashboard` 页面直接使用后端返回的 `dashboard.inviteUrl`。让我检查后端返回的数据格式：

### Assistant (15:52:30)

现在我明白了。`BffDashboard` 页面使用的是后端返回的 `inviteUrl`，这个是在 API 层面处理的。但从 mock 数据来看，后端返回的格式是旧格式（第43行）。

让我检查其他使用场景，以及是否还有其他地方需要调整：

### Assistant (15:52:39)

让我查看 `BffEntryCard` 组件：

### Assistant (15:52:47)

发现 `BffEntryCard` 中也有硬编码的链接（第72行）。这里也需要修改。让我修复这个问题：

### Assistant (15:52:55)

让我查看文件开头：

### Assistant (15:54:20)

现在修改 `handleCtaClick` 函数，使用邀请码：

### Assistant (15:54:50)

现在修改 `handleCtaClick` 函数使用邀请码：

### Assistant (15:55:16)

好的，现在让我检查 BffDashboard 页面中 SquadCard 的分享逻辑，看看是否也需要修改：

### Assistant (15:55:24)

继续查看分享逻辑：

### Assistant (15:55:34)

我看到 `SquadMemberCard` 组件使用的是从父组件传入的 `inviteUrl`（第594行），这个 URL 来自 `dashboard.inviteUrl`，是后端返回的。这部分不需要在前端修改，应该由后端处理。

现在让我总结一下已完成的修改，并检查是否还有遗漏：

### Assistant (15:55:48)

完成！我已经成功修改了邀请链接的拼接方式。现在让我创建一个简单的总结：

## 修改总结

已将 BFF 邀请链接格式从 `/invite.html` 改为 `/invite.html?c=邀请码`。

### 修改的文件：

1. **useBffShare.ts:9-16** - 通用分享 Hook
   - 从 `userInfo.invitationCode` 获取邀请码
   - 拼接格式：`/invite.html?c=${inviteCode}`

2. **BffEntryCard/index.tsx:10,22,69-77** - Earnings 页面入口卡片
   - 添加 `useUser` hook
   - 在分享时使用邀请码拼接链接

### 未修改的部分：

- **BffDashboard** 页面直接使用后端返回的 `dashboard.inviteUrl`，由后端控制链接格式

邀请码来自 `UserInfo.invitationCode` 字段（proto 定义），所有需要前端拼接邀请链接的地方都已更新。

### User (15:57:43)

这个地方的邀请链接也改成那样的

### Assistant (15:57:57)

让我查看 BffDashboard 页面中 `inviteUrl` 的使用情况：

### Assistant (15:58:05)

我看到这里显示的是 `dashboard.inviteUrl`。让我查看整个 BffDashboard 组件，看看如何构建自己的邀请链接：

### Assistant (15:58:13)

现在我需要修改 BffDashboard 组件，让它不使用后端返回的 `dashboard.inviteUrl`，而是在前端根据 `userInfo.invitationCode` 来构建链接。让我添加 `useUser` hook 并修改相关逻辑：

### Assistant (15:58:37)

现在我需要修改几个地方来使用邀请码构建邀请链接：

### Assistant (15:59:28)

继续修改其他使用 `dashboard.inviteUrl` 的地方：

### Assistant (15:59:37)

现在修改 `handleShare` 和 `handleCopyLink` 方法：

### Assistant (16:00:08)

让我继续读取文件并修改显示链接的地方：

### Assistant (16:00:17)

现在修改显示链接的地方（第254行）：

### Assistant (16:00:30)

现在需要修改 SquadList 组件，将新的 inviteUrl 传递下去：

### Assistant (16:00:37)

让我修改第206行，将 inviteUrl 传递给 SquadList：

### Assistant (16:00:50)

让我读取 SquadList 组件的定义并修改：

### Assistant (16:00:58)

修改 SquadList 组件的参数和传递：

### Assistant (16:01:54)

让我查看所有修改是否完成：

### Assistant (16:02:03)

完美！让我查看所有修改的总结：

### Assistant (16:02:16)

完美！所有修改都已完成。让我总结一下：

## ✅ 修改完成

已成功将所有 BFF 邀请链接改为 `/invite.html?c=邀请码` 格式。

### 修改的文件：

1. **useBffShare.ts** (8行变更)
   - 添加 `useUser` hook 获取 `userInfo`
   - 从 `userInfo.invitationCode` 构建邀请链接

2. **BffEntryCard/index.tsx** (26行变更)
   - 添加 `useUser` hook
   - 在 `handleCtaClick` 中构建邀请链接

3. **BffDashboard/index.tsx** (23行变更)
   - 添加 `useUser` hook
   - 在组件顶部构建 `inviteUrl` 变量
   - 修改 `handleShare` 使用新的 `inviteUrl`
   - 修改 `handleCopyLink` 使用新的 `inviteUrl`
   - 修改显示链接的 UI 使用新的 `inviteUrl`
   - 修改 `SquadList` 组件接收并传递 `inviteUrl` 参数

### 链接格式：

- **旧格式**: `/invite.html` 或 `/bff-landing`
- **新格式**: `/invite.html?c={邀请码}`

邀请码来自 `UserInfo.invitationCode` 字段，所有需要前端拼接邀请链接的地方都已统一更新。

### User (16:02:31)

现在overview接口看起来通了[BFF API] getOverview response: {
  "code": 1,
  "message": "",
  "lockedAmountCents": 0,
  "availableAmountCents": 0,
  "deliveredAmountCents": 0,
  "entryStatus": "NO_INVITE",
  "activeInviteCount": 0,
  "totalInviteCount": 0,
  "hasUnconsumedEvent": false
}

### Assistant (16:02:52)

好的，看到接口通了！现在需要检查一下后端返回的字段格式和前端期望的是否匹配。让我查看 API 层的转换逻辑：

### Assistant (16:03:01)

看到接口直接返回了 proto 响应。让我检查一下 proto 定义的响应类型和前端使用的类型之间的映射关系：

### Assistant (16:03:11)

我看到问题了。API 返回的是 `BffGetOverviewResponse` (proto 类型)，但前端组件期望的是 `BffOverview` (前端类型)。需要添加一个适配层来转换数据格式。让我检查 proto 的定义：

### Assistant (16:03:22)

现在我明白了！后端 proto 返回的字段和前端期望的不一样。需要在 API 层添加适配器来转换数据。让我修改 `getBffOverview` 函数：

### User (16:05:09)

This session is being continued from a previous conversation that ran out of context. The summary below covers the earlier portion of the conversation.

Summary:
1. Primary Request and Intent:
   - Change all BFF invite links from the old format to `/invite.html?c=邀请码` where the invite code comes from `userInfo.invitationCode`
   - Initially highlighted in `useBffShare.ts` lines 9-17
   - Extended to include `BffDashboard/index.tsx` line 248 and all related invite URL usage
   - Ensure the API response from backend is properly adapted to frontend types

2. Key Technical Concepts:
   - React hooks pattern (`useUser`, `useBffOverview`, `useBffDashboard`)
   - Zustand state management
   - Protocol Buffers (protobuf) API types
   - Type adaptation at API boundary
   - Cents to dollars conversion for monetary values
   - Component composition and prop drilling
   - UserInfo proto containing `invitationCode` field

3. Files and Code Sections:

   - `/Users/presence79/Desktop/WORK/sitin-monorepo-dev/apps/pwa/src/hooks/useBffShare.ts`
     - Modified to use invitation code for URL construction
     - Added `useUser` hook import
     - Changed from: `url: window.location.origin + BFF_LANDING_PATH`
     - Changed to: `url: ${window.location.origin}/invite.html?c=${inviteCode}`
     ```typescript
     export const useBffShare = () => {
       const { overview } = useBffOverview();
       const { userInfo } = useUser();

       const handleShare = async () => {
         const inviteCode = userInfo?.invitationCode || "";
         const inviteUrl = `${window.location.origin}/invite.html?c=${inviteCode}`;

         await shareBffLink({
           text: `Earn ${overview?.bannerRewardAmount ?? 60} for every friend you invite.`,
           url: inviteUrl,
         });
       };

       return { handleShare };
     };
     ```

   - `/Users/presence79/Desktop/WORK/sitin-monorepo-dev/apps/pwa/src/components/BffEntryCard/index.tsx`
     - Added `useUser` hook import and usage
     - Modified `handleCtaClick` to construct invite URL with code
     ```typescript
     const { userInfo } = useUser();
     
     const handleCtaClick = (e: React.MouseEvent) => {
       e.stopPropagation();
       if (overview.entryStatus === "NO_INVITE") {
         const inviteCode = userInfo?.invitationCode || "";
         const inviteUrl = `${window.location.origin}/invite.html?c=${inviteCode}`;

         shareBffLink({
           text: `Earn ${overview.bannerRewardAmount ?? 60} for every friend you invite.`,
           url: inviteUrl,
         });
       }
     };
     ```

   - `/Users/presence79/Desktop/WORK/sitin-monorepo-dev/apps/pwa/src/pages/BffDashboard/index.tsx`
     - Added `useUser` hook import
     - Created `inviteUrl` variable at component level
     - Modified `handleShare`, `handleCopyLink`, display text, and `SquadList` prop
     ```typescript
     const { userInfo } = useUser();
     const inviteUrl = `${window.location.origin}/invite.html?c=${userInfo?.invitationCode || ""}`;
     
     // Modified handleShare callback to use inviteUrl
     // Modified handleCopyLink callback to use inviteUrl
     // Modified display: {inviteUrl} instead of {dashboard.inviteUrl}
     // Modified SquadList: <SquadList dashboard={dashboard} inviteUrl={inviteUrl} />
     
     const SquadList = ({ dashboard, inviteUrl }: { dashboard: BffDashboardType; inviteUrl: string }) => (
       // Pass inviteUrl to SquadMemberCard instead of dashboard.inviteUrl
     );

*...truncated...*

*...conversation truncated for brevity...*
