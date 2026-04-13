---
title: VideoCall视频URL查询修复
date: 2026-04-13 16:20:00
model: claude-opus-4-5-20250414
messages: 12
---

# VideoCall视频URL查询修复

### User (16:05:00)
对比新老项目的transactions页面，为什么新项目的用户有很多视频没法播放，老项目同样的用户就有视频。用户ID：2100045775

### Assistant (16:20:00)
**根因**：`video-call-details.ts` 中 MOCK_VIDEO 类型的视频录像从 `pwa_user_video` 表查询（按 `order_id`），但该表实际存储的是用户上传的测试视频，不是通话录像。

**数据库验证结果**：
- `pwa_user_video` 表中该用户完全没有记录（0条）
- `user_room_record` 表中有4条记录，2条有 `media_url`（对应2个 VIDEO_CALL 订单）
- 所有类型的通话录像（VIDEO_CALL + MOCK_VIDEO）都存在 `user_room_record.media_url`

**修复**：
- `video-call-details.ts`：统一所有类型（VIDEO_CALL + MOCK_VIDEO）都从 `user_room_record` 查 `media_url`，移除对 `pwa_user_video` 的依赖
- `transactions.ts`：去掉 `loadMockVideos` 回调，只保留 `loadRoomRecords`

**文件变更**：
- `apps/minerva-server/src/routes/transactions/video-call-details.ts`
- `apps/minerva-server/src/routes/transactions/transactions.ts`

**注意**：部分 MOCK_VIDEO 订单本身没有录像（`user_room_record` 中无对应记录），这是正常的——不是所有模拟通话都会保存录像。
