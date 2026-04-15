---
title: NoVoiceOverlay
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: NoVoiceOverlay.tsx
---

# NoVoiceOverlay

```tsx
import { FC } from "react";
import { useCall } from "@/hooks/useCall";

/**
 * NoVoice 遮盖组件
 * 用于提示用户在视频通话中发出声音
 *
 * 使用方式：放置在本地视频容器内部，作为其子元素
 * 注意：mock 视频通话中不展示此组件
 */
export const NoVoiceOverlay: FC = () => {
  // rerender-derived-state: 直接订阅布尔值
  const { noVoiceVisible } = useCall();

  if (!noVoiceVisible) return null;

  return (
    <div className="absolute inset-0 z-[5] flex items-center justify-center bg-black/[0.77]">
      <div className="flex flex-col items-center w-[313px] max-w-[90%] px-[15px] py-4 gap-2 rounded-[14px]">
        {/* 音频图标 */}
        <div className="flex items-center justify-center w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="9" y="2" width="6" height="12" rx="3" stroke="white" strokeWidth="1.5" />
            <path
              d="M5 11C5 14.866 8.134 18 12 18C15.866 18 19 14.866 19 11"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line x1="12" y1="18" x2="12" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="9" y1="22" x2="15" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="4" y1="20" x2="20" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <h3
          className="m-0 text-white text-center font-bold text-[18px] leading-[1.2] tracking-[-0.23px]"
          style={{ fontFamily: "'Pangram', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          No voice detected
        </h3>

        <p
          className="m-0 text-white/80 text-center text-[15px] leading-[1.33] tracking-[-0.23px]"
          style={{ fontFamily: "'Pangram', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          Don't be shy, say something to activate earnings.
        </p>
      </div>
    </div>
  );
};

```
