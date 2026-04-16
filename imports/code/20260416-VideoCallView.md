---
title: VideoCallView
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: VideoCallView.tsx
---

# VideoCallView

```tsx
import { useEffect, useRef, useState } from "react";
import { CircleTimer } from "@/components/CircleTimer";
import { ConnectingHint } from "@/components/ConnectingHint";
import { NoFaceOverlay } from "@/components/NoFaceOverlay";
import { NoVoiceOverlay } from "@/components/NoVoiceOverlay";
import { CallUserInfoView } from "@/components/CallUserInfoView";
import { useCallStore } from "@/stores/callStore";
import { CallState } from "@/types/call";
import { getAvatarUrl } from "@/utils/userUtil";
import webCallManager from "@/utils/webCallManager";
import { useUser } from "@/hooks/useUser";

/**
 * AVCallView - 视频/语音通话视图
 *
 * 应用 Vercel 最佳实践:
 * - rendering-conditional-render: 使用三元运算符而不是 &&
 * - rerender-use-ref-transient-values: 频繁更新的值使用 ref
 * - rerender-defer-reads: 使用 ref 避免不必要的重渲染
 */

const VideoCallView = () => {
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);
  const callState = useCallStore((s) => s.callState);
  const remoteUserInfo = useCallStore((s) => s.remoteUserInfo);
  const { userInfo } = useUser();
  const [showLocalAvatar, setShowLocalAvatar] = useState(true);

  const callType = webCallManager.connectSession?.callType;
  const isConnecting = callState !== CallState.Connected;

  // 检测本地视频首帧，防止黑屏
  useEffect(() => {
    if (!showLocalAvatar) return;
    let cancelled = false;

    const checkInterval = setInterval(() => {
      if (cancelled) return;
      const videoEl = localVideoRef.current?.querySelector("video") as HTMLVideoElement | null;
      const canvasEl = localVideoRef.current?.querySelector("canvas") as HTMLCanvasElement | null;

      // canvas 元素有内容即可
      if (canvasEl && canvasEl.width > 0 && canvasEl.height > 0) {
        setShowLocalAvatar(false);
        return;
      }

      if (!videoEl || videoEl.videoWidth === 0) return;

      // 检查视频帧是否有实际画面（非黑屏）
      try {
        const c = document.createElement("canvas");
        c.width = 4;
        c.height = 4;
        const ctx = c.getContext("2d");
        if (ctx) {
          ctx.drawImage(videoEl, 0, 0, 4, 4);
          const data = ctx.getImageData(0, 0, 4, 4).data;
          let brightness = 0;
          for (let i = 0; i < data.length; i += 4) {
            brightness += data[i] + data[i + 1] + data[i + 2];
          }
          if (brightness / (data.length / 4) / 3 > 0) {
            setShowLocalAvatar(false);
          }
        }
      } catch {
        setShowLocalAvatar(false);
      }
    }, 300);

    // 超时兜底：5 秒后强制隐藏
    const timeout = setTimeout(() => {
      if (!cancelled) setShowLocalAvatar(false);
    }, 5000);

    return () => {
      cancelled = true;
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [showLocalAvatar]);

  return (
    <div className="flex flex-col w-full h-full bg-black">
      {/* 本地视频 - 上半部分 */}
      <div className="relative w-full h-1/2">
        <div id="local-video" ref={localVideoRef} className="w-full h-full" />
        {showLocalAvatar && userInfo && (
          <img className="absolute inset-0 w-full h-full object-cover" src={getAvatarUrl(userInfo)} alt="" />
        )}
        {/* NoVoice 遮盖层：只覆盖 local video 区域 */}
        <NoVoiceOverlay />
        {/* NoFace 遮盖层：只覆盖 local video 区域 */}
        <NoFaceOverlay />
        <CircleTimer />
      </div>

      {/* 远程视频 - 下半部分 */}
      <div className="relative w-full h-1/2 bg-gray-900">
        <div id="remote-video" ref={remoteVideoRef} className="w-full h-full" />
        {isConnecting && (
          <CallUserInfoView
            avatar={getAvatarUrl(remoteUserInfo)}
            username={remoteUserInfo?.username}
            age={remoteUserInfo?.age}
            isConnecting
          />
        )}
      </div>
      <div className="absolute bottom-6 left-3 flex flex-col">
        {/* 从live 页跳过来是自动接起的，所以需要展示*/}
        <ConnectingHint callType={callType} />
      </div>
    </div>
  );
};

export default VideoCallView;

```
