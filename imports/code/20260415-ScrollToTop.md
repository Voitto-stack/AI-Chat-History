---
title: ScrollToTop
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: ScrollToTop.tsx
---

# ScrollToTop

```tsx
import { useState, useEffect, useCallback, RefObject } from "react";

interface ScrollToTopProps {
  scrollRef: RefObject<HTMLElement | null>;
  threshold?: number;
}

export default function ScrollToTop({ scrollRef, threshold = 300 }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setVisible(el.scrollTop > threshold);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [scrollRef, threshold]);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [scrollRef]);

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-4 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-lg border border-gray-100 animate-fade-in press-feedback"
    >
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

```
