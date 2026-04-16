---
title: NavigationBar
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: NavigationBar.tsx
---

# NavigationBar

```tsx
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { goBack } from "@/utils/navigation";

interface NavigationBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightSlot?: ReactNode;
  leftIcon?: "back" | "close";
  sticky?: boolean;
  variant?: "light" | "dark";
  onTitleClick?: () => void;
}

export default function NavigationBar({
  title,
  showBack = true,
  onBack,
  rightSlot,
  leftIcon = "back",
  sticky = true,
  variant = "light",
  onTitleClick,
}: NavigationBarProps) {
  const navigate = useNavigate();
  const isDark = variant === "dark";

  const handleBack = () => (onBack ? onBack() : goBack(navigate));
  const titleClass = isDark ? "text-white" : "text-brand-dark";
  const iconClass = isDark ? "text-white" : "text-gray-600 active:text-gray-900 active:bg-black/5";

  return (
    <div
      className={`${sticky ? "sticky top-0 z-50" : ""} flex items-center px-4 pt-[calc(var(--sat,0px)+12px)] pb-3 bg-transparent`}
    >
      <div className="w-10 shrink-0">
        {showBack && (
          <button
            onClick={handleBack}
            className={`flex size-10 -ml-2 items-center justify-center rounded-full transition-all duration-150 active:scale-[0.9] ${iconClass}`}
            aria-label="Go back"
          >
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {leftIcon === "close" ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              )}
            </svg>
          </button>
        )}
      </div>

      <h1
        className={`flex-1 truncate text-center text-[15px] font-medium font-[Pangram] ${titleClass}`}
        onClick={onTitleClick}
      >
        {title || ""}
      </h1>

      <div className="w-10 shrink-0 flex justify-end">{rightSlot}</div>
    </div>
  );
}

```
