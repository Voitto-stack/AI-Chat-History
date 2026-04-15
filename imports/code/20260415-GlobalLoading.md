---
title: GlobalLoading
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: GlobalLoading.tsx
---

# GlobalLoading

```tsx
import { useLoading } from "@/hooks/useLoading";
import Spinner from "./Spinner";

export function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
      <Spinner size={48} color="#69c0ff" />
    </div>
  );
}

export default function GlobalLoadingGuard() {
  const isLoading = useLoading((state) => state.isLoading);
  if (!isLoading) return null;

  return <GlobalLoading />;
}

```
