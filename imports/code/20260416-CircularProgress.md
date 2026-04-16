---
title: CircularProgress
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: CircularProgress.tsx
---

# CircularProgress

```tsx
import React from "react";

/**
 * 圆形进度条组件
 * 使用 Tailwind CSS + CSS conic-gradient + mask 实现，性能优异
 * 遵循 Vercel React 最佳实践
 */

export interface CircularProgressProps {
  /** 进度百分比 (0-100) */
  progress: number;
  /** 容器尺寸 */
  size?: number;
  /** 线条宽度 */
  strokeWidth?: number;
  /** 背景颜色 */
  bgColor?: string;
  /** 进度条颜色 */
  progressColor?: string;
  /** 起始角度（度数，0度为12点钟方向） */
  startAngle?: number;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * CircularProgress 组件
 *
 * 使用 Tailwind CSS + CSS conic-gradient 和 mask 技术实现圆形进度条
 * 相比 SVG 方案，CSS 方案在某些场景下渲染更流畅
 *
 * @example
 * ```tsx
 * <CircularProgress
 *   progress={75}
 *   size={104}
 *   strokeWidth={4}
 *   progressColor="#FF3B30"
 *   startAngle={45}
 * />
 * ```
 */
const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 104,
  strokeWidth = 4,
  bgColor = "transparent",
  progressColor = "#FF3B30",
  startAngle = 0,
  style,
}) => {
  return (
    <div
      className="relative rounded-full"
      style={{
        width: size,
        height: size,
        background: bgColor,
        ...style,
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          transform: `rotate(${startAngle}deg)`,
          background: `conic-gradient(
                        ${progressColor} 0% ${progress}%,
                        transparent ${progress}% 100%
                    )`,
          mask: `radial-gradient(
                        circle,
                        transparent calc(50% - ${strokeWidth}px),
                        black calc(50% - ${strokeWidth}px) calc(50% + ${strokeWidth}px),
                        transparent calc(50% + ${strokeWidth}px)
                    )`,
          WebkitMask: `radial-gradient(
                        circle,
                        transparent calc(50% - ${strokeWidth}px),
                        black calc(50% - ${strokeWidth}px) calc(50% + ${strokeWidth}px),
                        transparent calc(50% + ${strokeWidth}px)
                    )`,
        }}
      />
    </div>
  );
};

// rendering-hoist-jsx: 使用 React.memo 优化性能
// 只在 props 变化时重新渲染
export default React.memo(CircularProgress);

```
