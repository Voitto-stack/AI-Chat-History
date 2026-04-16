---
title: FormErrorMessage
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: FormErrorMessage.tsx
---

# FormErrorMessage

```tsx
import type { ReactNode } from "react";

interface FormErrorMessageProps {
  message: string;
  className?: string;
  textClassName?: string;
  icon?: ReactNode;
}

export default function FormErrorMessage({ message, className = "", textClassName = "", icon }: FormErrorMessageProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {icon || (
        <svg className="w-3 h-3 text-[#ff0101] shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <span className={`ml-1.5 text-[#ff0101] text-xs font-medium ${textClassName}`}>{message}</span>
    </div>
  );
}

```
