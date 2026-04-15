---
title: EmptyView
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: EmptyView.tsx
---

# EmptyView

```tsx
import icEmptyData from "@/assets/images/common/ic_empty_data.webp";

interface EmptyViewProps {
  emptyIcon?: string;
  emptyText?: string;
  className?: string;
}

export default function EmptyView({
  emptyIcon = icEmptyData,
  emptyText = "Nothing here yet",
  className = "",
}: EmptyViewProps) {
  return (
    <div className={`flex flex-col items-center justify-center animate-fade-in ${className}`}>
      <img src={emptyIcon} alt="empty" className="w-[124px] h-[124px] animate-[float_3s_ease-in-out_infinite]" />
      {emptyText ? (
        <p
          className="mt-2 text-sm text-[#9ca3af] animate-fade-in"
          style={{ animationDelay: "200ms", animationFillMode: "both" }}
        >
          {emptyText}
        </p>
      ) : null}
    </div>
  );
}

```
