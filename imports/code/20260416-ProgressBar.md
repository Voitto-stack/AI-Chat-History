---
title: ProgressBar
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: ProgressBar.tsx
---

# ProgressBar

```tsx
import { useEffect, useState } from "react";

export interface ProgressBarProps {
  progress: number; // 进度百分比 (0-100)
  direction?: "horizontal" | "vertical"; // 方向，默认横向
  fillColor?: string; // 填充颜色 (CSS 颜色值)
  backgroundColor?: string; // 背景颜色 (CSS 颜色值)
  animationDuration?: number; // 动画时间 (毫秒)
  className?: string; // 外层容器类名
}

export default function ProgressBar({
  progress,
  direction = "horizontal",
  fillColor = "#34C759",
  backgroundColor = "#D1D5DB",
  animationDuration = 300,
  className = "",
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));
  const [value, setValue] = useState(0);
  const isVertical = direction === "vertical";

  useEffect(() => {
    const raf = requestAnimationFrame(() => setValue(clamped));
    return () => cancelAnimationFrame(raf);
  }, [clamped]);

  const scale = value / 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`rounded-full overflow-hidden ${isVertical ? "h-full" : "w-full h-3"} ${className}`}
      style={{ backgroundColor }}
    >
      <div
        className="rounded-full"
        style={{
          backgroundColor: fillColor,
          width: isVertical ? "100%" : "100%",
          height: isVertical ? "100%" : "100%",
          transform: isVertical ? `scaleY(${scale})` : `scaleX(${scale})`,
          transformOrigin: isVertical ? "top" : "left",
          transition: `transform ${animationDuration}ms ease-out`,
        }}
      />
    </div>
  );
}

```
