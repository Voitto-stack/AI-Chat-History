---
title: PullToRefresh
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: PullToRefresh.tsx
---

# PullToRefresh

```tsx
import { useRef, useState, useEffect, type ReactNode } from "react";
import Spinner from "./Spinner";

interface PullToRefreshProps {
  children: (refreshKey: number) => ReactNode;
  threshold?: number;
}

const INDICATOR_HEIGHT = 48;

/**
 * 全局下拉刷新组件
 * 兼容 H5 浏览器和 APK WebView 环境
 */
export default function PullToRefresh({ children, threshold = 68 }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const pullingRef = useRef(false);

  // 禁用浏览器/WebView 原生下拉刷新
  useEffect(() => {
    document.documentElement.style.overscrollBehaviorY = "contain";
    return () => {
      document.documentElement.style.overscrollBehaviorY = "";
    };
  }, []);

  const isAtTop = () => {
    // 从触摸点向上查找可滚动容器，检查是否都在顶部
    const el = containerRef.current;
    if (!el) return true;
    const scrollableEls = el.querySelectorAll("[class*='overflow-y-auto'], [class*='overflow-auto']");
    for (const s of scrollableEls) {
      if (s.scrollTop > 0) return false;
    }
    return window.scrollY === 0;
  };

  // 用原生事件绑定，才能调用 preventDefault 阻止浏览器默认下拉行为
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      if (refreshing) return;
      if (isAtTop()) {
        startYRef.current = e.touches[0].clientY;
        pullingRef.current = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!pullingRef.current || refreshing) return;
      const deltaY = e.touches[0].clientY - startYRef.current;
      if (deltaY > 0) {
        // 阻止浏览器原生滚动/下拉刷新
        e.preventDefault();
        const distance = Math.min(deltaY * 0.45, 130);
        setPullDistance(distance);
      } else {
        pullingRef.current = false;
        setPullDistance(0);
      }
    };

    const onTouchEnd = () => {
      if (!pullingRef.current) return;
      pullingRef.current = false;

      // 通过 state 获取最新 pullDistance
      setPullDistance((current) => {
        if (current >= threshold) {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshKey((k) => k + 1);
            setRefreshing(false);
            setPullDistance(0);
          }, 400);
          return INDICATOR_HEIGHT;
        }
        return 0;
      });
    };

    // passive: false 才能在 touchmove 里 preventDefault
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [refreshing, threshold]);

  return (
    <div ref={containerRef} className="h-full relative overflow-hidden" style={{ overscrollBehaviorY: "contain" }}>
      {/* 下拉指示器 */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{
          top: 0,
          height: `${INDICATOR_HEIGHT}px`,
          opacity: Math.min(pullDistance / (threshold * 0.5), 1),
        }}
      >
        <Spinner size={22} />
      </div>

      {/* 内容区 - 整体下移 */}
      <div
        className="h-full overflow-y-auto will-change-transform"
        style={{
          transform: `translate3d(0,${pullDistance}px,0)`,
          transition: pullingRef.current ? "none" : "transform 0.3s cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        {children(refreshKey)}
      </div>
    </div>
  );
}

```
