---
title: BadgeView
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: BadgeView.tsx
---

# BadgeView

```tsx
import { FC } from "react";

interface BadgeProps {
  unreadCount: number; // 未读数量
  className?: string; // 额外的类名
  size?: "sm" | "md"; // sm: tab 角标，md（默认）: 头像角标
}

/**
 * BadgeView - 未读消息角标组件
 * 显示未读消息数量，超过 99 显示 99+
 */
export const BadgeView: FC<BadgeProps> = ({ unreadCount, className, size = "md" }) => {
  if (!unreadCount) {
    return null;
  }

  const sizeClass =
    size === "sm" ? "min-w-[16px] h-[16px] text-[10px] px-[3px]" : "min-w-[20px] px-1.5 py-0.5 text-[11px]";

  return (
    <span
      className={[
        "flex items-center justify-center rounded-full bg-red-500 font-semibold text-white",
        sizeClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {unreadCount > 99 ? "99+" : unreadCount}
    </span>
  );
};

```
