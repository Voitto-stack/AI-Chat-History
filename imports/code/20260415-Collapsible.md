---
title: Collapsible
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: Collapsible.tsx
---

# Collapsible

```tsx
import { ReactNode } from "react";

interface CollapsibleProps {
  open: boolean;
  children: ReactNode;
  className?: string;
}

export default function Collapsible({ open, children, className = "" }: CollapsibleProps) {
  return (
    <div className={`collapsible ${className}`} data-open={open}>
      <div>{children}</div>
    </div>
  );
}

```
