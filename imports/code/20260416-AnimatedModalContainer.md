---
title: AnimatedModalContainer
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: AnimatedModalContainer.tsx
---

# AnimatedModalContainer

```tsx
/**
 * 动画弹窗容器组件 - 公共动画逻辑和样式
 * 用于奖励弹窗、提现弹窗等需要旋转光效的场景
 */

import { useEffect, useRef, ReactNode } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import bgEarnCash from "@/assets/images/cash/bg_earn_cash.webp";
import bgEarnCashLight from "@/assets/images/cash/bg_earn_cash_light.webp";
import topAni from "@/assets/animation/cashout-ani-top.json";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

interface AnimatedModalContainerProps {
  children: ReactNode;
  onClose?: () => void;
  audioPath?: string;
}

export function AnimatedModalContainer({
  children,
  onClose,
  audioPath = "/voice/task_finished.mp3",
}: AnimatedModalContainerProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    // 埋点：动画弹窗显示
    bpTrack(EventName.pwa_cashout_animeflow_show);

    // 播放音效
    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play().catch((e) => console.error("Audio play failed:", e));
    }

    // 震动反馈
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    // 播放顶部飞钱动画
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, [audioPath]);

  return (
    <div
      className="relative w-full h-full bg-gradient-to-b from-[rgba(0,84,187,0.8)] to-[rgba(0,39,130,0.8)]"
      onClick={onClose}
    >
      {/* 背景图片层 */}
      <img className="absolute inset-0 w-full h-full object-cover animate-[fade-in_500ms]" src={bgEarnCash} alt="bg" />

      {/* 旋转光效*/}
      <img
        className="absolute top-1/2 left-1/2 w-full h-full object-cover pointer-events-none opacity-0"
        style={{
          transform: "translate(-50%, -50%) scale(2.5)",
          animation: "fade-in 500ms forwards, light-rotate 10s linear infinite 500ms",
        }}
        src={bgEarnCashLight}
        alt="light"
      />
      {/* 内容区域 */}
      <div className="relative h-full flex flex-col items-center justify-center pointer-events-none">
        {/* 内容区域 */}
        <div className="relative pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          {/* 顶部飞钱动画（绝对定位，不占布局空间） */}
          <Lottie
            animationData={topAni}
            className="absolute left-1/2 -translate-x-1/2 bottom-full w-full h-[120px] mb-[-40px] z-0"
            loop={false}
            lottieRef={lottieRef}
            autoplay={false}
            onComplete={() => {}}
          />
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

```
