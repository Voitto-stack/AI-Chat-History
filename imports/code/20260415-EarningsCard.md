---
title: EarningsCard
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: EarningsCard.tsx
---

# EarningsCard

```tsx
import icLiveMoney from "@/assets/images/live/ic_live_money.webp";
import { useCash } from "@/hooks/useCash";

interface EarningsCardProps {
  onClick: () => void;
}

const EarningsCard = ({ onClick }: EarningsCardProps) => {
  const { cash } = useCash();

  return (
    <div
      className="absolute top-0 left-1/2 z-[3] flex w-[calc(100%-28px)] -translate-x-1/2 flex-row items-center rounded-xl border border-white/10 mt-8 bg-[linear-gradient(92.66deg,rgba(0,0,0,0.5)_-4.21%,rgba(0,0,0,0.2)_97.52%)]"
      onClick={onClick}
    >
      <img src={icLiveMoney} className="ml-5 mt-[12.5px] mb-[12.5px] h-[60px] w-[60px]" />
      <div className="ml-5 mr-5 h-[54px] w-px bg-white/[0.08]" />
      <div className="flex flex-col">
        <span className="w-fit rounded-xl bg-white/10 px-2 py-1 text-center text-[10px] font-semibold leading-[11.93px] tracking-normal text-white/80">
          Earnings
        </span>
        <span
          className="mt-1.5 text-[28px] font-normal leading-[35.28px] tracking-normal text-white"
          style={{ fontFamily: "RacingSansOne" }}
        >
          ${cash.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default EarningsCard;

```
