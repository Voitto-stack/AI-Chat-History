---
title: GiftAnimation
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: GiftAnimation.tsx
---

# GiftAnimation

```tsx
import { memo, useState, useEffect, forwardRef, useImperativeHandle, useRef, useCallback } from "react";

export interface GiftAnimationHandler {
  showGift(imageUrl: string): void;
}

const ANIMATION_DELAY = 300;

const GiftAnimation = memo(
  forwardRef<GiftAnimationHandler>((_, ref) => {
    const showGiftListRef = useRef<string[]>([]);
    const [showCount, setShowCount] = useState(0);
    const [currentGift, setCurrentGift] = useState<string>();

    const onAnimFinish = useCallback(() => {
      showGiftListRef.current.shift();
      setCurrentGift(undefined);
      setShowCount((prev) => prev + 1);
    }, []);

    useImperativeHandle(ref, () => ({
      showGift(imageUrl: string) {
        showGiftListRef.current.push(imageUrl);
        setShowCount((prev) => prev + 1);
      },
    }));

    useEffect(() => {
      if (!currentGift && showGiftListRef.current.length > 0) {
        setTimeout(() => setCurrentGift(showGiftListRef.current[0]), ANIMATION_DELAY);
      }
    }, [showCount, currentGift]);

    if (showGiftListRef.current.length === 0) return null;

    return (
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        {currentGift && (
          <img
            src={currentGift}
            alt=""
            className="size-[200px] animate-gift-zoom object-contain"
            onAnimationEnd={onAnimFinish}
          />
        )}
      </div>
    );
  }),
);

export default GiftAnimation;

```
