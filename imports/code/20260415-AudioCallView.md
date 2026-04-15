---
title: AudioCallView
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: AudioCallView.tsx
---

# AudioCallView

```tsx
import { useUser } from "@/hooks/useUser";
import { useCall } from "@/hooks/useCall";
import { getAvatarUrl, CustomAvatarType } from "@/utils/userUtil";
import { ConnectingHint } from "@/components/ConnectingHint";
import webCallManager from "@/utils/webCallManager";
import IcAvatarPlaceholder from "@/assets/images/ic_avatar_placeholder.webp";
import { useRef } from "react";

/**
 * AudioCallView - 音频通话视图
 *
 * 应用 Vercel 最佳实践:
 * - rendering-conditional-render: 使用三元运算符而不是 &&
 * - rerender-use-ref-transient-values: 频繁更新的值使用 ref
 * - rerender-defer-reads: 使用 ref 避免不必要的重渲染
 */

const AudioCallView = () => {
  const { userInfo } = useUser();
  const { remoteUserInfo } = useCall();
  const callType = webCallManager.connectSession?.callType;
  const localVideoRef = useRef<HTMLDivElement>(null);

  // 获取头像 URL
  const localAvatar = getAvatarUrl(userInfo, CustomAvatarType.Mid);
  const remoteAvatar = getAvatarUrl(remoteUserInfo, CustomAvatarType.Mid);

  return (
    <div className="flex flex-col w-full h-full bg-black">
      {/* 本地视频/头像 - 上半部分 */}
      <div className="relative w-full h-1/2">
        {/* 本地视频容器（用于可能的视频预览） */}
        <div id="local-video" ref={localVideoRef} className="w-full h-full" />

        {/* 头像覆盖层（在没有视频时显示） */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={localAvatar || IcAvatarPlaceholder}
            alt={userInfo?.username || "You"}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 对方头像 - 下半部分 */}
      <div
        className="relative w-full h-1/2 flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(180deg, #1a2332 0%, #0f1419 100%)",
        }}
      >
        {/* PAID Call 标签 */}
        <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/60 text-white text-sm font-medium">
          PAID Call
        </div>

        {/* 对方头像 */}
        <div className="flex flex-col items-center mt-8">
          <div className="relative">
            <img
              src={remoteAvatar || IcAvatarPlaceholder}
              alt={remoteUserInfo?.username || "User"}
              className="w-40 h-40 rounded-full object-cover shadow-2xl"
            />
          </div>

          {/* 用户名和年龄 */}
          <p
            className="mt-6 text-white text-2xl font-normal"
            style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif" }}
          >
            {remoteUserInfo?.username || "User"}, {remoteUserInfo?.age || "24"}
          </p>
        </div>

        {/* 连接提示 - 底部 */}
        <div className="absolute bottom-6 left-3 flex flex-col">
          <ConnectingHint callType={callType} />
        </div>
      </div>
    </div>
  );
};

export default AudioCallView;

```
