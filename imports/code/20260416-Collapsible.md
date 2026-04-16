---
title: Collapsible
date: 2026-04-16T11:07:55+08:00
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
