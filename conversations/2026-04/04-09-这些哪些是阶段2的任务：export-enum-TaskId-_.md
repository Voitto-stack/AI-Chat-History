---
title: 这些哪些是阶段2的任务：export enum TaskId {
date: 2026-04-09T19:41:57+08:00
session_id: 7fd12ada-3979-4a28-907e-4ed7b9110bf5
project: /Users/presence79/Desktop/WORK/sitin-monorepo-dev
source: claude-code-capture
messages: 1
---

# 这些哪些是阶段2的任务：export enum TaskId {

### User (19:41:57)

这些哪些是阶段2的任务：export enum TaskId {
  // 基础任务
  Register = 101,
  CameraPermission = 102,
  MicrophonePermission = 103,
  FirstVideoCall = 104,
  LocationPermission = 105,
  SendVoiceMessage = 106,
  NotificationPermission = 107,
  CompleteProfile = 108,
  VerifyPhoneNumber = 109,
  BindInsAccount = 110,
  PostPhoto = 111,
  InstallApk = 112,
  FaceVerify = 118,
  NotificationPermissionApk = 119,
  FirstPost = 132,
  LinkGoogleAccount = 133,

  // 游戏任务
  PlayFirstGame = 120,
  WinSomeGame2 = 121,
  WinSomeGame3 = 128,
  WinSomeGame4 = 130,

  // 消息任务
  ReplyFirstMessage = 122,
  ReplySomeMessage3 = 123,
  ReplySomeMessage4 = 129,

  // 语音消息任务
  RecordFirstVoiceMessage = 124,
  RecordSecondVoiceMessage = 125,
  RecordThirdVoiceMessage = 126,
  RecordForthVoiceMessage = 127,

  // 视频通话任务
  Video3Calls = 113,
  Video10Calls = 114,
  Video60Calls = 115,
  Video180Calls = 116,
  Video300Calls = 117,

  // 内容发布
  PostVideo = 131,

  // 收益任务
  SecondEarn = 200001,
  ThirdEarn = 200002,
  FourthEarn = 200003,
  FifthEarn = 200004,
  SixthEarn = 200005,
  SeventhEarn = 200006,

  // 通话时长任务
  FourthVideoDuration = 200010,
  FifthVideoDuration = 200011,
  SixthVideoDuration = 200012,
  SeventhVideoDuration = 200013,
}

### Assistant (19:43:30)

我需要查看项目中的相关代码来确定哪些是"阶段2"的任务。让我先搜索任务阶段相关的代码。

### Assistant (19:44:01)

根据项目代码 `apps/pwa/src/types/cashout.ts:60-74` 中的 `stageTaskIdsMap` 定义，**阶段2 (StageTwo)** 包含以下任务：

```typescript
[CashoutStage.StageTwo]: [
  TaskId.CameraPermission,      // 102
  TaskId.MicrophonePermission,  // 103
  TaskId.SecondEarn,           // 200001
  TaskId.FaceVerify,           // 118
  TaskId.InstallApk,           // 112
]
```

即：
- **CameraPermission** (102) - 相机权限
- **MicrophonePermission** (103) - 麦克风权限  
- **SecondEarn** (200001) - 第二笔收益
- **FaceVerify** (118) - 人脸验证
- **InstallApk** (112) - 安装 APK

---

## 深度交互

从 `stageTaskLimitMap` 可以看到阶段2的解锁条件是 `{ earn: 2.1 }`（收益 $2.1），完成后可提现 $4.0。

这个设计体现了一个合理的新手引导路径：
- **阶段1** 只需注册 (Register)
- **阶段2** 引导用户授权权限 + 完成基础验证，为视频通话功能做准备

如果你在设计新的阶段任务，建议：
1. 保持任务数量在 3-5 个之间（阶段2有5个）
2. 任务之间有逻辑依赖关系（如：先授权权限 → 再人脸验证 → 最后安装完整客户端）
3. 考虑使用 `TaskId.NotificationPermissionApk (119)` 作为 APK 安装后的后续任务

