---
title: DragHandle
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: DragHandle.tsx
---

# DragHandle

```tsx
import { useCallback, useRef } from "react";

interface DragHandleProps {
  onClose: () => void; // 关闭
  backgroundColor?: string; // 背景颜色类名
}

/**
 * 可拖拽关闭组件
 * 用于底部弹窗等需要下拉关闭的场景
 */
export function DragHandle({ onClose, backgroundColor = "bg-white" }: DragHandleProps) {
  const startYRef = useRef<number>(0); // 记录开始时的 Y 坐标
  const currentYRef = useRef<number>(0); // 记录当前拖动的距离
  const isDraggingRef = useRef<boolean>(false); // 标记是否正在拖动
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    currentYRef.current = 0;
    isDraggingRef.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const deltaY = e.touches[0].clientY - startYRef.current;
    // 只允许向下拖动
    if (deltaY > 0) {
      currentYRef.current = deltaY;
      // 找到父容器并应用变换
      const target = containerRef.current.closest("[data-bottom-sheet]") as HTMLElement;
      if (target) {
        target.style.transform = `translateY(${deltaY}px)`;
        target.style.transition = "none";
      }
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDraggingRef.current || !containerRef.current) return;

    isDraggingRef.current = false;
    const deltaY = currentYRef.current;
    const threshold = 100; // 关闭阈值（px）

    const target = containerRef.current.closest("[data-bottom-sheet]") as HTMLElement;
    if (target) {
      target.style.transition = "transform 300ms ease-out";

      if (deltaY > threshold) {
        target.style.transform = "translateY(100%)"; // 拖动距离超过阈值，关闭弹窗
        setTimeout(() => {
          onClose();
        }, 300);
      } else {
        target.style.transform = "translateY(0)"; // 未达到阈值，回弹
      }
    }

    currentYRef.current = 0;
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center min-h-[44px] ${backgroundColor} before:content-[''] before:w-9 before:h-1 before:rounded-full before:bg-gray-300`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: "grab", touchAction: "none" }}
    />
  );
}

```
