---
title: CommonUpTip
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: CommonUpTip.tsx
---

# CommonUpTip

```tsx
import { useEffect, useState } from "react";
import icTipUpWhite from "@/assets/images/common/ic_tip_up_white.svg";
import icWarningOrangeSmall from "@/assets/images/common/ic_warning_orange_small.svg";

interface CommonUpTipProps {
  targetRect: DOMRect | undefined;
  content: string;
  marginTop?: number;
  marginLeft?: number;
}

const BG_HEIGHT = 62;
const BG_WIDTH = 270;

const CommonUpTip = ({ targetRect, content, marginTop, marginLeft }: CommonUpTipProps) => {
  const [tipStyle, setTipStyle] = useState<React.CSSProperties>({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(targetRect !== undefined && content !== "");
  }, [targetRect, content]);

  useEffect(() => {
    if (!targetRect) return;
    setTipStyle({
      position: "absolute",
      left: `${targetRect.left + targetRect.width / 2 - BG_WIDTH / 2 - (marginLeft ?? 0)}px`,
      top: `${targetRect.top - BG_HEIGHT - (marginTop ?? 0)}px`,
    });
  }, [targetRect, marginLeft, marginTop]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none z-[1000]" style={tipStyle}>
      <div className="relative h-[62px] w-[270px]">
        <img src={icTipUpWhite} className="absolute top-0 left-0 h-full w-full" alt="" />
        <div className="absolute top-0 left-0 flex h-[54px] w-full items-center px-[13px] py-[10px]">
          <img src={icWarningOrangeSmall} className="mr-[10px] h-6 w-6" alt="" />
          <span className="flex-1 text-sm font-normal leading-none text-black" style={{ fontFamily: "Pangram" }}>
            {content}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommonUpTip;

```
