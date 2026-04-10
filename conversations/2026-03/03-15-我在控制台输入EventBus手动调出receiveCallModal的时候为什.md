---
title: 我在控制台输入EventBus手动调出receiveCallModal的时候为什
date: 2026-03-15T18:22:21+08:00
session_id: 816f27cb-a16b-4823-a5d5-e1642367ca78
project: /Users/presence79/Desktop/WORK/react-haven
source: claude-code-capture
messages: 13
---

# 我在控制台输入EventBus手动调出receiveCallModal的时候为什

### User (18:22:21)

我在控制台输入EventBus手动调出receiveCallModal的时候为什么报错：installHook.js:1 [ReceiveCallModal: callState ===visible] aaa Idle Error Component Stack
    at ReceiveCallModal (ReceiveCallModal.tsx:33:63)
    at AVCallProvider (AVCallContext.tsx:193:63)
    at ChatManProvider (ChatManProvider.tsx:47:70)
    at TRTCContextProvider (TRTCContext.tsx:17:68)
    at LiveProvider (LiveProvider.tsx:81:67)
    at InsProvider (InsProvider.tsx:26:66)
    at CameraRecordProvider (CameraRecordContext.tsx:10:40)
    at FirebaseTokenProvider (FirebaseTokenProvider.tsx:23:82)
    at CashRewardModalProvider (CashRewardModalProvider.tsx:19:72)
    at App.tsx:96:13
    at App (App.tsx:117:16)
    at ChatBotServerProvider (ChatBotServerContext.tsx:18:76)
    at RecommendReplyGlobalProvider (RecommendReplyGlobalContext.tsx:58:77)
    at OnlineStateProvider (OnlineStateProvider.tsx:37:74)
    at EarnCashModalProvider (EarnCashModalProvider.tsx:46:76)
    at UserInfoProvider (UserInfoProvider.tsx:18:71)
    at ProfileTaskProvider (ProfileTaskProvider.tsx:60:74)
    at CashProvider (CashProvider.tsx:40:67)
    at FaceIdProvider (FaceIdProvider.tsx:40:69)
    at RemoteConfigProvider (RemoteConfigContext.tsx:17:69)
    at AuthProvider (AuthContext.tsx:17:67)
    at AppVisibilityProvider (AppVisibilityContext.tsx:19:70)
    at GlobalBusinessContextProvider (GlobalBusinessContext.tsx:38:78)
    at KeyboardChangedContextProvider (KeyboardChangedProvider.tsx:16:79)
    at GlobalLoadingContextProvider (GlobalLoadingContext.tsx:18:77)
    at index.tsx:54:13


### Assistant (18:22:25)

I need to investigate the error you're encountering when manually triggering the receiveCallModal via EventBus. Let me first look at the ReceiveCallModal component and understand what's happening at line 33.

### Assistant (18:23:08)

我看到问题了。在 `ReceiveCallModal.tsx` 的第 125 行，你在 `useEffect` 的清理函数（cleanup function）中使用了 `logger.error` 来打印 `callState`。

问题是：**在 React 的 cleanup function 中访问 `callState` 时，由于闭包的原因，`callState` 可能是 `undefined` 或者是旧的值**。

从错误信息来看：
```
[ReceiveCallModal: callState ===visible] aaa Idle Error Component Stack
```

这说明当组件卸载或 `visible`/`userId` 变化时，cleanup function 执行了，但此时 `callState` 的值是 `Idle`，这触发了某个错误。

让我检查一下 `useAVCall` hook 的实现，看看 `callState` 在什么情况下会是 `Idle`：

### Assistant (18:23:21)

我找到问题了！

从错误堆栈和代码分析来看，问题出在 `ReceiveCallModal` 组件的第 43 行：

```typescript
const { callState, isTestCall } = useAVCall();
```

当你通过 EventBus 手动触发 `receiveCallModal` 时，如果此时 `AVCallContext` 的 `callState` 是 `Idle`（空闲状态），而组件期望的是 `Incoming`（来电）状态，就会导致逻辑错误。

**根本原因：**

1. 你通过 EventBus 手动触发显示 `ReceiveCallModal`
2. 但此时 `AVCallContext` 中的 `callState` 仍然是 `Idle`（没有真实的来电）
3. 组件在 cleanup 函数中打印了 `callState` 的值（第 125 行），显示为 `Idle`
4. 这个状态不匹配导致了错误

**解决方案：**

你需要在手动触发 `receiveCallModal` 之前，确保 `AVCallContext` 的状态也被正确设置。让我检查一下 EventBus 是如何触发这个 modal 的：

### Assistant (18:23:58)

现在我明白问题了。让我总结一下：

**问题原因：**

当你在控制台手动通过 EventBus 触发 `receiveCallModal` 时，报错是因为：

1. `ReceiveCallModal` 组件通过 `useAVCall()` hook 获取 `callState` 和 `isTestCall`
2. 如果你只是手动设置 `showIncomingModal = true`，但没有真实的来电流程，`callState` 会保持在 `Idle` 状态
3. 组件内部的逻辑期望在有来电时 `callState` 应该是 `Incoming` 或其他非 `Idle` 状态
4. 当组件卸载时，cleanup 函数（第 125 行）打印了 `callState` 的值，显示为 `Idle`，这暴露了状态不匹配的问题

**解决方案：**

如果你想在控制台手动测试 `ReceiveCallModal`，你需要：

1. **方案一（推荐）：** 使用现有的测试视频功能
   - 触发 `EventBusEvents.trigger_test_video` 事件，这会正确设置所有必要的状态

2. **方案二：** 手动设置完整的状态
   - 不仅要设置 `showIncomingModal = true`
   - 还要设置 `callState = AVCallState.Incoming`
   - 设置 `remoteUserId`
   - 等等其他必要的状态

你能告诉我你在控制台具体输入了什么命令来触发这个 modal 吗？这样我可以给你更准确的解决方案。

### User (18:24:35)

我在控制台输入了EventBus.emit('test_video_invited', {
    remoteUserId: '123',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    userInfo: { userId: 123, username: 'TestUser', avatarUrl: '' },
    price: 1.5,  // ← 改成 1.0 测试实验价格
    roomId: '0',
    orderId: 'test-order-123',
    source: 'SecondTask',
    videoId: 'test-video-123',
    trackConfig: { call_source: 'SecondTask' }
  })

### Assistant (18:24:40)

好的，我明白了。你通过 `EventBus.emit('test_video_invited', ...)` 触发测试视频，但遇到了错误。

让我检查一下 `test_video_invited` 事件的监听器是如何处理的：

### Assistant (18:25:11)

好的，我现在理解了整个流程。让我分析一下你遇到的问题：

**问题分析：**

从代码来看，`invitedTestCall` 函数在第 1443 行会正确设置 `setCallState(AVCallState.Incoming)`，所以理论上 `callState` 不应该是 `Idle`。

但是你看到的错误日志显示 `callState` 是 `Idle`，这说明：

1. **可能的原因1：** 在 `ReceiveCallModal` 组件卸载时，`callState` 已经被重置回 `Idle` 了
2. **可能的原因2：** 组件的 cleanup 函数（第 125 行）中访问的 `callState` 是闭包捕获的旧值

让我检查一下 `ReceiveCallModal` 中 `useEffect` 的依赖：

### Assistant (18:25:21)

我找到问题了！

**核心问题：**

在 `ReceiveCallModal.tsx` 的第 66-129 行的 `useEffect` 中：

```typescript
useEffect(() => {
  // ... 各种初始化逻辑
  
  return () => {
    setUserInfo(undefined);
    clearTimeout(timer);
    clearInterval(interval);
    logger.error("ReceiveCallModal: callState ===visible", `aaa ${callState}`); // 第 125 行
    cleanupCamera();
  };
}, [visible, userId]); // 依赖项只有 visible 和 userId
```

**问题所在：**

1. 这个 `useEffect` 的依赖数组是 `[visible, userId]`，**没有包含 `callState`**
2. 这意味着 cleanup 函数中的 `callState` 是**闭包捕获的初始值**
3. 当组件首次渲染时，如果 `callState` 是 `Idle`，那么 cleanup 函数中的 `callState` 永远都是 `Idle`
4. 即使后来 `callState` 变成了 `Incoming`，cleanup 函数中看到的仍然是旧的 `Idle` 值

**解决方案：**

有两个选择：

1. **移除这行调试日志**（推荐）- 因为它只是用来调试的，而且在 cleanup 函数中访问闭包变量容易产生误导
2. **将 `callState` 添加到依赖数组** - 但这会导致每次 `callState` 变化时都重新执行整个 effect，可能不是你想要的

让我帮你移除这行调试日志：

### User (18:26:15)

[Request interrupted by user for tool use]

### User (18:34:29)

这个报错是什么原因，怎么排查：installHook.js:1 [Utils] Vibration stopped Error Component Stack
    at NoFaceOverlay (NoFaceOverlay.tsx:14:23)
    at div (<anonymous>)
    at div (<anonymous>)
    at CallTestVideoView (CallTestVideoView.tsx:31:3)
    at div (<anonymous>)
    at CallTestPageInner (CallTestPage.tsx:35:20)
    at LiveChatRoomContextProvider (LiveChatRoomContext.tsx:38:82)
    at DeepgramAIAgentContextProvider (DeepgramAIAgentContext.tsx:41:97)
    at CallTestPage (<anonymous>)
    at BeautyProvider (BeautyContext.tsx:66:69)
    at OfflineEarningsProvider (OfflineEarningsContext.tsx:34:72)
    at AutoCallContextProvider (AutoCallContext.tsx:37:72)
    at DHRecommendProvider (DHRecommendContext.tsx:51:68)
    at MicrophoneContextProvider (MicrophoneContext.tsx:113:89)
    at InactivityRedirectProvider (InactivityRedirectProvider.tsx:17:89)
    at InGameTaskModalProvider (InGameTaskModalProvider.tsx:21:72)
    at CallOrderProvider (CallOrderContext.tsx:23:72)
    at GameProvider (GameProvider.tsx:59:61)
    at CashOutAnimModalProvider (CashOutAnimModalProvider.tsx:76:73)
    at AVCallProvider (AVCallContext.tsx:193:63)
    at ChatManProvider (ChatManProvider.tsx:47:70)
    at TRTCContextProvider (TRTCContext.tsx:17:68)
    at LiveProvider (LiveProvider.tsx:81:67)
    at InsProvider (InsProvider.tsx:26:66)
    at CameraRecordProvider (CameraRecordContext.tsx:10:40)
    at FirebaseTokenProvider (FirebaseTokenProvider.tsx:23:82)
    at CashRewardModalProvider (CashRewardModalProvider.tsx:19:72)
    at App.tsx:96:13
    at App (App.tsx:117:16)
    at ChatBotServerProvider (ChatBotServerContext.tsx:18:76)
    at RecommendReplyGlobalProvider (RecommendReplyGlobalContext.tsx:58:77)
    at OnlineStateProvider (OnlineStateProvider.tsx:37:74)
    at EarnCashModalProvider (EarnCashModalProvider.tsx:46:76)
    at UserInfoProvider (UserInfoProvider.tsx:18:71)
    at ProfileTaskProvider (ProfileTaskProvider.tsx:60:74)
    at CashProvider (CashProvider.tsx:40:67)
    at FaceIdProvider (FaceIdProvider.tsx:40:69)
    at RemoteConfigProvider (RemoteConfigContext.tsx:17:69)
    at AuthProvider (AuthContext.tsx:17:67)
    at AppVisibilityProvider (AppVisibilityContext.tsx:19:70)
    at GlobalBusinessContextProvider (GlobalBusinessContext.tsx:38:78)
    at KeyboardChangedContextProvider (KeyboardChangedProvider.tsx:16:79)
    at GlobalLoadingContextProvider (GlobalLoadingContext.tsx:18:77)
    at index.tsx:54:13

### Assistant (18:34:33)

这个错误来自 `NoFaceOverlay.tsx:14:23`，错误信息是 `[Utils] Vibration stopped Error`。让我检查一下这个文件：

### Assistant (18:34:42)

现在让我检查 `stopVibration` 函数的实现：

### Assistant (18:34:58)

找到了！问题在 `Utils.ts` 的第 267 行：

```typescript
logger.error(TAG, "Vibration stopped");
```

**问题分析：**

这不是一个真正的错误，而是一个**误用了 `logger.error` 的日志记录**。开发者本意是记录"震动已停止"这个信息，但使用了 `logger.error` 而不是 `logger.log` 或 `logger.info`，导致在控制台中显示为错误。

**这个"错误"的影响：**

1. 它只是一个日志记录，不会影响程序的实际运行
2. 每次 `NoFaceOverlay` 组件的 `visible` 变为 `false` 时（即检测到人脸后），就会调用 `stopVibration()`，从而打印这条"错误"日志
3. 这是一个**误导性的日志级别使用**，应该改为 `logger.log` 或 `logger.info`

**解决方案：**

将 `logger.error` 改为 `logger.log`：

### User (18:35:15)

[Request interrupted by user for tool use]

### User (22:46:26)

这种eventBus到底怎么用的

### Assistant (22:46:33)

让我给你详细解释一下 EventBus 的使用方式：

### Assistant (22:46:53)

## EventBus 使用指南

EventBus 是基于 Node.js 的 `EventEmitter` 实现的全局事件总线，用于组件间通信。

### 基本用法

**1. 监听事件（订阅）**

```typescript
import eventBus, { EventBusEvents } from "@common/EventBus";

// 在组件或函数中监听事件
const handleTestVideoInvited = (data) => {
  console.log("收到测试视频邀请", data);
};

// 注册监听器
eventBus.on(EventBusEvents.test_video_invited, handleTestVideoInvited);

// 在组件卸载或清理时移除监听器（重要！）
eventBus.off(EventBusEvents.test_video_invited, handleTestVideoInvited);
```

**2. 触发事件（发布）**

```typescript
import eventBus, { EventBusEvents } from "@common/EventBus";

// 触发事件，可以传递数据
eventBus.emit(EventBusEvents.test_video_invited, {
  remoteUserId: '123',
  videoUrl: 'https://example.com/video.mp4',
  userInfo: { userId: 123, username: 'TestUser' },
  price: 1.5,
  roomId: '0',
  orderId: 'test-order-123',
  source: 'SecondTask',
  videoId: 'test-video-123',
  trackConfig: { call_source: 'SecondTask' }
});
```

### 在 React 组件中使用

```typescript
import { useEffect } from 'react';
import eventBus, { EventBusEvents } from "@common/EventBus";

function MyComponent() {
  useEffect(() => {
    // 定义事件处理函数
    const handleEvent = (data) => {
      console.log('事件触发', data);
    };
    
    // 注册监听
    eventBus.on(EventBusEvents.test_video_invited, handleEvent);
    
    // 清理函数：组件卸载时移除监听
    return () => {
      eventBus.off(EventBusEvents.test_video_invited, handleEvent);
    };
  }, []); // 空依赖数组，只在挂载/卸载时执行
  
  return <div>My Component</div>;
}
```

### 你的测试视频案例

从代码来看，`test_video_invited` 事件的完整流程：

**发送方（控制台测试）：**
```javascript
EventBus.emit('test_video_invited', {
  remoteUserId: '123',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  userInfo: { userId: 123, username: 'TestUser', avatarUrl: '' },
  price: 1.5,
  roomId: '0',

*...truncated...*

*...conversation truncated for brevity...*
