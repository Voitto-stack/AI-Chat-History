---
title: MockCallView
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: MockCallView.tsx
---

# MockCallView

```tsx
/**
 * MockCallView - Mock 视频通话视图
 */

import { useEffect, useRef, useState } from "react";
import { ConnectingHint } from "@/components/ConnectingHint";
import { NoFaceOverlay } from "@/components/NoFaceOverlay";
import { CallUserInfoView } from "@/components/CallUserInfoView";
import { CallType } from "@/types/call";
import mockCallManager from "@/utils/mockCallManager";
import videoRecorder from "@/utils/mockVideoRecord";
import { getAvatarUrl } from "@/utils/userUtil";
import { useUser } from "@/hooks/useUser";

interface MockCallViewProps {
  /** 远端 mock 视频 URL */
  mockVideoUrl: string;
}

/** mock 视频最大播放时长（毫秒） */
const MOCK_VIDEO_MAX_DURATION = 35000;

const MockCallView = ({ mockVideoUrl }: MockCallViewProps) => {
  // rerender-use-ref-transient-values: 使用 ref 存储本地摄像头流和 DOM 元素
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const maxDurationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showLocalAvatar, setShowLocalAvatar] = useState(true);

  const remoteUserInfo = mockCallManager.connectSession?.remoteUserInfo;
  const { userInfo } = useUser();

  /** 开启本地摄像头，就绪后触发 beginMockCall */
  useEffect(() => {
    const startLocalCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        });
        localStreamRef.current = stream;

        // 启动视频录制
        videoRecorder.start(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          // 等待 video 真正开始播放后再触发 beginMockCall，确保 DOM 和流都就绪
          localVideoRef.current.onplaying = () => {
            mockCallManager.beginMockCall();
            // 检测首帧防止黑屏
            detectLocalVideoFrame(localVideoRef.current!, () => setShowLocalAvatar(false));
          };
        }
      } catch (error) {
        console.error("MockCallView", "Failed to start local camera:", error);
      }
    };

    const localVideoEl = localVideoRef.current;
    startLocalCamera();

    // 清理：组件卸载时关闭摄像头和录制
    return () => {
      if (localVideoEl) {
        localVideoEl.onplaying = null;
      }
      if (maxDurationTimerRef.current) {
        clearTimeout(maxDurationTimerRef.current);
        maxDurationTimerRef.current = null;
      }
      videoRecorder.stop();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-black">
      {/* 本地视频 - 上半部分 */}
      <div className="relative w-full h-1/2">
        <video
          id="mock-local-video"
          ref={localVideoRef}
          className="w-full h-full object-cover -scale-x-100"
          autoPlay
          playsInline
          muted
        />
        {showLocalAvatar && userInfo && (
          <img className="absolute inset-0 w-full h-full object-cover" src={getAvatarUrl(userInfo)} alt="" />
        )}
        {/* NoFace 遮盖层：只覆盖 local video 区域（mock 不展示 NoVoice） */}
        <NoFaceOverlay />
        <div className="absolute left-3 bottom-6 flex flex-col bg-black/30 rounded-2xl p-3 pointer-events-none">
          <p className="m-0 text-yellow-300">To stay eligible for video calls:</p>
          <p className="m-0 text-white">1. Keep your face visible</p>
          <p className="m-0 text-white">2. Make sure your voice is heard</p>
        </div>
      </div>

      {/* 远程 mock 视频 - 下半部分 */}
      <div className="relative w-full h-1/2 bg-gray-900">
        {!videoLoaded && remoteUserInfo && (
          <CallUserInfoView
            avatar={getAvatarUrl(remoteUserInfo)}
            username={remoteUserInfo.username}
            age={remoteUserInfo.age}
            isConnecting={true}
          />
        )}
        <video
          id="mock-remote-video"
          ref={remoteVideoRef}
          className="w-full h-full object-cover"
          src={mockVideoUrl}
          autoPlay
          playsInline
          controls={false}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='black'/%3E%3C/svg%3E"
          x5-video-player-type="h5"
          x5-playsinline="true"
          webkit-playsinline="true"
          onPlay={() => {
            setVideoLoaded(true);
            maxDurationTimerRef.current = setTimeout(() => {
              if (remoteVideoRef.current) {
                remoteVideoRef.current.pause();
              }
              mockCallManager.endMockCall();
            }, MOCK_VIDEO_MAX_DURATION);
          }}
          onEnded={() => {
            if (maxDurationTimerRef.current) {
              clearTimeout(maxDurationTimerRef.current);
              maxDurationTimerRef.current = null;
            }
            mockCallManager.endMockCall();
          }}
        />
      </div>

      {/* 底部提示信息 */}
      <div className="absolute bottom-6 left-3 flex flex-col">
        <ConnectingHint callType={CallType.MOCK_CALL} />
      </div>
    </div>
  );
};

export default MockCallView;

/** 检测视频首帧是否有实际画面（非黑屏），有内容时调用 onVisible */
function detectLocalVideoFrame(videoEl: HTMLVideoElement, onVisible: () => void, timeout = 5000) {
  const start = Date.now();

  const check = () => {
    if (Date.now() - start > timeout) {
      onVisible();
      return;
    }
    if (videoEl.videoWidth === 0) {
      requestAnimationFrame(check);
      return;
    }
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
          onVisible();
          return;
        }
      }
    } catch {
      onVisible();
      return;
    }
    requestAnimationFrame(check);
  };

  if ("requestVideoFrameCallback" in videoEl) {
    videoEl.requestVideoFrameCallback(check);
  } else {
    requestAnimationFrame(check);
  }
}

```
