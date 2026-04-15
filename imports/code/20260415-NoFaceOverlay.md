---
title: NoFaceOverlay
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: NoFaceOverlay.tsx
---

# NoFaceOverlay

```tsx
import { FC } from "react";
import { useCall } from "@/hooks/useCall";

/**
 * NoFace 遮盖组件
 * 用于提示用户在视频通话中露脸
 *
 * 使用方式：放置在本地视频容器内部，作为其子元素
 */
export const NoFaceOverlay: FC = () => {
  const { noFaceVisible } = useCall();

  if (!noFaceVisible) return null;

  return (
    <div className="absolute inset-0 z-[5] flex items-center justify-center bg-black/[0.77]">
      <div className="flex flex-col items-center w-[313px] max-w-[90%] px-[15px] py-[17px] gap-2 rounded-[14px]">
        {/* 人脸图标 */}
        <div className="flex items-center justify-center w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
            <circle cx="9" cy="10" r="1.2" fill="white" />
            <circle cx="15" cy="10" r="1.2" fill="white" />
            <path
              d="M8.5 15.5C9.5 16.5 10.5 17 12 17C13.5 17 14.5 16.5 15.5 15.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line x1="4" y1="20" x2="20" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <h3
          className="self-stretch m-0 text-white text-center font-bold text-[18px] leading-[1.2] tracking-[-0.23px]"
          style={{ fontFamily: "'Pangram', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          No Face Detected
        </h3>

        <div
          className="flex items-center justify-center px-[14px] py-[6px] gap-1 rounded-full bg-black/[0.39] text-[#ff3b30] text-[15px] leading-[1.33] tracking-[-0.23px]"
          style={{ fontFamily: "'Pangram', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
          ⚠️ Earnings Paused
        </div>
      </div>
    </div>
  );
};

```
