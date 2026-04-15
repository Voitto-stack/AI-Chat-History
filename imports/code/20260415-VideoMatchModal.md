---
title: VideoMatchModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: VideoMatchModal.tsx
---

# VideoMatchModal

```tsx
/**
 * VideoMatchModal - 视频匹配等待弹窗
 * 回拨成功后显示，展示 Lottie 动画（旋转环 + 星星背景 + 文字动画）
 * 15 秒后自动关闭
 */

import { FC, useEffect, useMemo, useRef } from "react";
import Lottie from "lottie-react";
import { useUser } from "@/hooks/useUser";
import { getAvatarUrl, DEFAULT_AVATAR } from "@/utils/userUtil";
import { useModal } from "@/hooks/useModal";
import RingAni from "@/assets/animation/video-match-ring/ani.json";
import BackgroundStarAni from "@/assets/animation/video-match-star.json";
import TextAni from "@/assets/animation/video-match-text.json";
import bgStar from "@/assets/images/bg_star.png";
import icCloseWhite from "@/assets/images/ic_close_white.png";

/** 弹窗 Modal ID */
const VIDEO_MATCH_MODAL_ID = "video-match-modal";
/** 自动关闭时间（ms） */
const AUTO_CLOSE_DELAY = 15000;

/**
 * VideoMatchModal 内容组件
 */
// eslint-disable-next-line react-refresh/only-export-components
const VideoMatchModalContent: FC = () => {
  const { userInfo } = useUser();
  const avatarUrl = useMemo(() => getAvatarUrl(userInfo), [userInfo]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 15s 自动关闭
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      closeVideoMatchModal();
    }, AUTO_CLOSE_DELAY);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgStar})`, backgroundSize: "100vw 100vh" }}
    >
      {/* 背景星星动画 */}
      <Lottie
        animationData={BackgroundStarAni}
        loop
        autoPlay
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 顶部栏：关闭按钮 + 标题 */}
      <div className="relative flex items-center p-4 pt-[calc(20px+var(--sat,0px))]">
        <button onClick={closeVideoMatchModal}>
          <img width={24} height={24} src={icCloseWhite} alt="close" />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 text-white font-medium text-base leading-[21px] tracking-[-0.23px]">
          video match
        </span>
      </div>

      {/* 中间内容：头像 + 环形动画 */}
      <div className="relative flex items-start justify-center w-full mt-[30%]">
        <img
          src={avatarUrl || DEFAULT_AVATAR}
          width={135}
          height={135}
          className="absolute top-1/2 -translate-y-1/2 z-[999] rounded-full overflow-hidden"
          alt="avatar"
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
          }}
        />
        <Lottie animationData={RingAni} loop autoPlay className="w-full h-full pointer-events-none" />
      </div>

      {/* 底部文字动画 */}
      <div className="absolute bottom-[20%] w-full h-[100px]">
        <Lottie animationData={TextAni} loop autoPlay className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>
    </div>
  );
};

/**
 * 显示视频匹配弹窗
 */
export function showVideoMatchModal() {
  useModal.getState().open(VIDEO_MATCH_MODAL_ID, <VideoMatchModalContent />, {
    variant: "fullscreen",
  });
}

/**
 * 关闭视频匹配弹窗
 */
export function closeVideoMatchModal() {
  useModal.getState().close(VIDEO_MATCH_MODAL_ID);
}

```
