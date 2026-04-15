---
title: Countdown
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: Countdown.tsx
---

# Countdown

```tsx
import { useEffect, useRef, useState } from "react";

interface CountdownProps {
  initialCount: number;
  onFinish: () => void;
  isFullScreen: boolean;
}

const Countdown = ({ initialCount, onFinish, isFullScreen }: CountdownProps) => {
  const [count, setCount] = useState(initialCount);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [animKey, setAnimKey] = useState(0);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  // 播放倒计时音效
  useEffect(() => {
    if (count > 0) {
      audioRef.current = new Audio("/voice/count_down_second.mp3");
      audioRef.current.play().catch(() => {});
    }
  }, [count]);

  useEffect(() => {
    if (count === 0) {
      // 播放结束音效
      const endAudio = new Audio("/voice/count_down_end.mp3");
      endAudio.play().catch(() => {});

      setVisible(false);
      timerRef.current = setTimeout(() => {
        onFinishRef.current();
      }, 1500);
      return;
    }

    timerRef.current = setTimeout(() => {
      setCount((c) => c - 1);
      setAnimKey((k) => k + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [count]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="inset-0 z-[9999] flex items-center justify-center"
      style={{
        position: isFullScreen ? "fixed" : "absolute",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <span
        key={animKey}
        className="text-white animate-countdown"
        style={{
          fontSize: "20vw",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        }}
      >
        {count}
      </span>
    </div>
  );
};

export default Countdown;

```
