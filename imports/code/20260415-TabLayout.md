---
title: TabLayout
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: TabLayout.tsx
---

# TabLayout

```tsx
import { ReactNode, Suspense, useRef } from "react";
import { useLocation } from "react-router-dom";
import TabBar from "./TabBar";

interface TabConfig {
  path: string;
  element: ReactNode;
  fallback: ReactNode;
}

interface TabLayoutProps {
  tabs: TabConfig[];
}

/**
 * Keep-alive Tab 布局：所有 tab 页同时渲染，非当前 tab 用 display:none 隐藏。
 * 切换 tab 时组件不卸载，图片/状态保持不变。
 * 未访问过的 tab 延迟挂载（首次切到时才渲染）。
 */
export default function TabLayout({ tabs }: TabLayoutProps) {
  const { pathname } = useLocation();
  const visitedRef = useRef(new Set<string>());

  // 标记当前 tab 已访问
  visitedRef.current.add(pathname);

  return (
    <div className="flex flex-col bg-gray-50 h-full">
      <div className="flex-1 overflow-hidden relative">
        {tabs.map(({ path, element, fallback }) => {
          const isActive = pathname === path;
          const visited = visitedRef.current.has(path);

          // 未访问过的 tab 不渲染（节省首屏资源）
          if (!visited) return null;

          return (
            <div key={path} className="h-full w-full" style={{ display: isActive ? "block" : "none" }}>
              <Suspense fallback={fallback}>{element}</Suspense>
            </div>
          );
        })}
      </div>
      <TabBar />
    </div>
  );
}

```
