---
title: NumberRoll
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: NumberRoll.tsx
---

# NumberRoll

```tsx
import { useEffect, useState, memo, CSSProperties } from "react";

export interface NumberRollProps {
  value: number;
  className?: string;
  style?: CSSProperties;
  prefix?: string;
  suffix?: string;
}

const formatNumber = (num: number): string => num.toFixed(2);

export const NumberRoll = memo<NumberRollProps>(({ value, className, style, prefix = "$", suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [animatingFromValue, setAnimatingFromValue] = useState(value);

  useEffect(() => {
    setDisplayValue((prev) => {
      if (formatNumber(value) !== formatNumber(prev)) {
        setAnimatingFromValue(prev);
        setShouldAnimate(true);
      }
      return prev;
    });
    const timer = setTimeout(() => setDisplayValue(value), 50);
    return () => clearTimeout(timer);
  }, [value]);

  const fromDigits = formatNumber(animatingFromValue).split("");

  const renderDigit = (digit: string, index: number, size: number) => {
    const delay = (size - index - 1) * 0.1;
    const isAnimatingDigit = digit !== "." && shouldAnimate;

    return (
      <span key={`${index}-${digit}`} className="inline-grid overflow-hidden [&>*]:col-start-1 [&>*]:row-start-1">
        {isAnimatingDigit ? (
          <>
            <span
              style={{ animation: `slide-up-out 0.3s ease-in-out ${delay}s forwards` }}
              onAnimationEnd={() => {
                if (index === 0) setShouldAnimate(false);
              }}
            >
              {fromDigits[index]}
            </span>
            <span
              style={{ transform: "translateY(100%)", animation: `slide-up-in 0.3s ease-in-out ${delay}s forwards` }}
            >
              {digit}
            </span>
          </>
        ) : (
          <span>{formatNumber(displayValue)[index]}</span>
        )}
      </span>
    );
  };

  return (
    <div className={`flex ${className || ""}`} style={style}>
      <span>{prefix}</span>
      {formatNumber(value)
        .split("")
        .map((digit, index, arr) => renderDigit(digit, index, arr.length))}
      <span>{suffix}</span>
    </div>
  );
});

NumberRoll.displayName = "NumberRoll";

```
