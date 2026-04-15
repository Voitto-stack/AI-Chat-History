---
title: RecordItem
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: RecordItem.tsx
---

# RecordItem

```tsx
import { getIcon, isCallType, isCentsType, formatAmount, formatAmountInCents, formatDuration } from "./utils";
import { tzTimeHHMM } from "@/utils/timezone";
import Collapsible from "@/components/Collapsible";
import type { RecordItem as RecordItemType } from "./types";

interface Props {
  item: RecordItemType;
  /** compact 模式：EarningDetailCards 场景，无内置展开 */
  compact?: boolean;
  expandArrow?: React.ReactNode;
  label?: string;
  /** 非 compact 模式下的展开回调 */
  onToggleExpand?: (id: string) => void;
}

export default function RecordItem({ item, compact, expandArrow, label, onToggleExpand }: Props) {
  const icon = getIcon[item.type];
  const isCall = isCallType(item.type);
  const isCents = isCentsType(item.type);

  let displayText: string = label;
  let meta: string | null = null;
  let timeText: string | null = null;

  if (isCall) {
    if (item.duration) meta = `${formatDuration(item.duration)}min`;
    if (!compact && item.time) {
      timeText = tzTimeHHMM(item.time * 1000);
    }
  } else if (item.type === ("Texting Earnings" as RecordItemType["type"])) {
    displayText = "Texting Earnings";
    if (item.count) meta = `${item.count} Messages`;
  } else if (
    item.type === ("Send Gifts" as RecordItemType["type"]) ||
    item.type === ("Receive Gifts" as RecordItemType["type"])
  ) {
    if (item.count) meta = `${item.count} gifts`;
  }

  const amountDisplay = isCents ? formatAmountInCents(item.amount) : formatAmount(item.amount);
  const amountColor = item.amount >= 0 ? "#012269" : "#FF0004";

  const freeAmount = item.orders?.reduce((sum, o) => sum + (parseFloat(o.freeAmount || "0") || 0), 0) ?? 0;
  const paidAmount = item.amount - freeAmount;

  return (
    <div className={compact ? "" : "border-b border-black/5 last:border-b-0"}>
      <div
        className={`flex items-center justify-between relative ${compact ? "py-1" : "py-3 px-4 cursor-pointer"}`}
        onClick={() => !compact && isCall && onToggleExpand?.(item.id)}
      >
        <div className="flex items-center gap-2">
          {icon && <img src={icon} alt="" className="w-4 h-4" />}
          <span className="text-sm font-medium text-[#012269]">{displayText}</span>
          {meta && <span className="text-xs text-[#012269]/60">{meta}</span>}
        </div>
        <div className="flex items-center gap-2">
          {timeText && <span className="text-xs text-[#012269]/60">{timeText}</span>}
          <span className="text-sm font-medium" style={{ color: amountColor }}>
            {amountDisplay}
          </span>
          {compact ? expandArrow : isCall && <span className="text-xs text-gray-400">{item.expanded ? "▲" : "▼"}</span>}
        </div>
      </div>

      {!compact && isCall && (
        <Collapsible open={!!item.expanded}>
          <div className="pl-4 bg-black/[0.02]">
            {freeAmount > 0 && (
              <div className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center gap-2">
                  {icon && <img src={icon} alt="" className="w-4 h-4" />}
                  <span className="text-sm font-medium text-[#012269]">Free Call</span>
                  <span className="text-xs text-[#012269]/60">0min</span>
                </div>
                <span className="text-sm font-medium text-[#012269]">{formatAmount(freeAmount)}</span>
              </div>
            )}
            <div className="flex items-center justify-between py-3 px-4">
              <div className="flex items-center gap-2">
                {icon && <img src={icon} alt="" className="w-4 h-4" />}
                <span className="text-sm font-medium text-[#012269]">Paid Call</span>
                {item.duration && <span className="text-xs text-[#012269]/60">{formatDuration(item.duration)}min</span>}
              </div>
              <span className="text-sm font-medium text-[#012269]">{formatAmount(paidAmount)}</span>
            </div>
          </div>
        </Collapsible>
      )}
    </div>
  );
}

```
