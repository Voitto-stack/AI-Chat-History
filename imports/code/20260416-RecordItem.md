---
title: RecordItem
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: RecordItem.tsx
---

# RecordItem

```tsx
import {
  getIcon,
  isCallType,
  isCentsType,
  formatAmount,
  formatAmountInCents,
  getCallDurationMin,
  formatDuration,
} from "./utils";
import Collapsible from "@/components/Collapsible";
import UserAvatar from "./UserAvatar";
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

  let displayText: string = label || item.type;
  let timeText: string | null = null; // 左侧显示的时长/数量
  let durationText: string | null = null; // 右侧显示的精确时长（仅非 compact）
  // 获取用户ID（从第一个订单中）
  const userId = isCall && item.orders && item.orders.length > 0 ? item.orders[0].maleUserId : undefined;

  if (isCall) {
    if (item.duration) {
      timeText = `${getCallDurationMin(item.duration)}min`;
      // compact 模式不显示 durationText
      if (!compact) {
        durationText = formatDuration(item.duration);
      }
    }
  } else if (item.type === ("Texting Earnings" as RecordItemType["type"])) {
    displayText = label || "Texting Earnings";
    if (item.count) timeText = `${item.count} Messages`;
  } else if (
    item.type === ("Send Gifts" as RecordItemType["type"]) ||
    item.type === ("Receive Gifts" as RecordItemType["type"])
  ) {
    if (item.count) timeText = `${item.count} gifts`;
  } else if (item.duration !== undefined && item.duration !== 0) {
    // 非通话类型，直接显示分钟数
    timeText = `${item.duration}min`;
  }

  const amountDisplay = isCents ? formatAmountInCents(item.amount) : formatAmount(item.amount);
  // compact 模式：固定颜色 #012269，非 compact 模式：根据正负显示绿色/红色
  const amountColor = compact ? "var(--color-brand-dark)" : item.amount >= 0 ? "#00aa03" : "#FF0004";

  const freeAmount = item.orders?.reduce((sum, o) => sum + (parseFloat(o.freeAmount || "0") || 0), 0) ?? 0;
  const paidAmount = item.amount - freeAmount;

  const freeCallDuration = item.orders?.reduce((sum, o) => sum + (o.freeCallDuration ?? 0), 0) ?? 0;
  const totalCallDuration = item.duration ?? 0;
  const paidCallDuration = totalCallDuration - freeCallDuration;

  return (
    <div className={compact ? "" : "border-b border-black/5 last:border-b-0"}>
      <div
        className={`flex items-center justify-between relative ${compact ? "py-1" : "py-3 px-4 cursor-pointer"}`}
        onClick={() => !compact && isCall && onToggleExpand?.(item.id)}
      >
        <div className="flex items-center gap-2">
          {icon && <img src={icon} alt="" className="w-4 h-4" />}
          <span className="text-sm font-medium text-brand-dark">{displayText}</span>
          {timeText && <span className="text-xs text-brand-dark/60">{timeText}</span>}
        </div>
        <div className="flex items-center gap-2">
          {durationText && <span className="text-xs text-brand-dark/60">{durationText}</span>}
          {userId && <UserAvatar userId={userId} />}
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
                  <span className="text-sm font-medium text-brand-dark">Free Call</span>
                  <span className="text-xs text-brand-dark/60">{getCallDurationMin(freeCallDuration)}min</span>
                </div>
                <div className="flex items-center gap-2">
                  {userId && <UserAvatar userId={userId} />}
                  <span className="text-sm font-medium text-brand-dark">{formatAmount(freeAmount)}</span>
                </div>
              </div>
            )}
            {paidCallDuration > 0 && (
              <div className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center gap-2">
                  {icon && <img src={icon} alt="" className="w-4 h-4" />}
                  <span className="text-sm font-medium text-brand-dark">Paid Call</span>
                  <span className="text-xs text-brand-dark/60">{getCallDurationMin(paidCallDuration)}min</span>
                </div>
                <div className="flex items-center gap-2">
                  {userId && <UserAvatar userId={userId} />}
                  <span className="text-sm font-medium text-[#00aa03]">{formatAmount(paidAmount)}</span>
                </div>
              </div>
            )}
          </div>
        </Collapsible>
      )}
    </div>
  );
}

```
