---
title: WeeklyEarningsSummary
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: WeeklyEarningsSummary.tsx
---

# WeeklyEarningsSummary

```tsx
import type { WeeklyIncomeData } from "./types";
import { getCallDurationMin } from "./utils";

interface Props {
  data: WeeklyIncomeData;
  selectedDay: number;
}

export default function WeeklyEarningsSummary({ data, selectedDay }: Props) {
  const isDaySelected = selectedDay >= 0;
  const dayData = isDaySelected ? data.dailyIncomeDataMap.get(selectedDay) : null;

  const weeklyEarnings = isDaySelected ? (dayData?.earned ?? 0) : data.totalEarned;
  const videoEarnings = isDaySelected
    ? (dayData?.videoEarnings ?? 0) + (dayData?.voiceEarnings ?? 0)
    : data.videoEarnings + data.voiceEarnings;

  const freeMinutes = isDaySelected
    ? getCallDurationMin(dayData?.freeVideoCallDurationTotal ?? 0)
    : getCallDurationMin(data.freeVideoCallDurationTotal);
  const paidMinutes = isDaySelected
    ? getCallDurationMin((dayData?.videoCallDurationTotal ?? 0) - (dayData?.freeVideoCallDurationTotal ?? 0))
    : getCallDurationMin(data.videoCallDurationTotal - data.freeVideoCallDurationTotal);

  const summaryItems = [
    { value: `$${weeklyEarnings.toFixed(2)}`, label: "Weekly Earnings", color: "#0066FF" },
    { value: `$${videoEarnings.toFixed(2)}`, label: "Video Earnings", color: "#FF3B30" },
  ];

  return (
    <div className="mt-2.5 pt-3.5 border-t border-[#f0f0f0]">
      <div className="flex mb-2.5">
        {summaryItems.map((item) => (
          <div key={item.label} className="flex-1 text-center">
            <div className="text-base font-bold" style={{ color: item.color }}>
              {item.value}
            </div>
            <div className="text-xs text-[#A2AFCA]">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between px-1.5 text-xs font-light text-[#A2AFCA]">
        <span>
          Video Call for Free:<span className="text-[#FF3B30] font-medium">{freeMinutes}min</span>
        </span>
        <span>
          Video Call for Paid:<span className="text-[#FF3B30] font-medium">{Math.max(0, paidMinutes)}min</span>
        </span>
      </div>
    </div>
  );
}

```
