---
title: SkipTaskButton
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: SkipTaskButton.tsx
---

# SkipTaskButton

```tsx
import { useNavigate } from "react-router-dom";

interface SkipTaskButtonProps {
  to: string;
  replace?: boolean;
}

export default function SkipTaskButton({ to, replace = false }: SkipTaskButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() =>
        navigate(to, {
          replace,
          state: { taskMode: true },
        })
      }
      className="px-1 py-1 text-[12px] font-medium capitalize text-[rgba(1,34,105,0.5)]"
    >
      Skip
    </button>
  );
}

```
