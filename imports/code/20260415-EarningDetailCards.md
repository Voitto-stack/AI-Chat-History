---
title: EarningDetailCards
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: EarningDetailCards.tsx
---

# EarningDetailCards

```tsx
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RecordItemComponent from "./RecordItem";
import Collapsible from "@/components/Collapsible";
import { isCallType } from "./utils";
import { useEarningDetail } from "@/hooks/useEarningDetail";
import Skeleton from "@/components/Skeleton";
import Spinner from "@/components/Spinner";
import { getUserInfos } from "@/http/userApi";
import { useEarningUser } from "@/hooks/useEarningUser";
import type { RecordItem, RecordType } from "./types";

type GroupedRecord = RecordItem & { freeAmount: string };

const dailyTotal = (records: Record<string, GroupedRecord>): string =>
  Object.values(records)
    .reduce((sum, r) => sum + r.amount, 0)
    .toFixed(2);

export default function EarningDetailCards() {
  const { records, loading, hasMore, loadMore } = useEarningDetail();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { setUserInfoBatch } = useEarningUser();

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  // 批量预加载用户信息
  useEffect(() => {
    // 收集所有需要显示头像的 userId（去重）
    const userIds = new Set<number>();
    records.forEach((record) => {
      if (isCallType(record.type) && record.orders) {
        record.orders.forEach((order) => {
          if (order.maleUserId) {
            userIds.add(order.maleUserId);
          }
        });
      }
    });

    // 批量预加载用户信息
    if (userIds.size > 0) {
      getUserInfos(Array.from(userIds))
        .then((response) => {
          if (response.userInfos) {
            setUserInfoBatch(response.userInfos);
          }
        })
        .catch((error) => {
          console.error("Failed to prefetch user info:", error);
          // 预加载失败不影响功能，UserAvatar 会降级到单独请求
        });
    }
  }, [records, setUserInfoBatch]);

  const toggleExpand = useCallback((key: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  const recordsByDate = useMemo(() => {
    const grouped: Record<string, Record<string, GroupedRecord>> = {};
    records.forEach((item) => {
      const { date, type, amount, count, duration } = item;
      if (!date || !type) return;
      if (!grouped[date]) grouped[date] = {};
      if (!grouped[date][type]) {
        grouped[date][type] = {
          id: `${date}_${type}`,
          type,
          date,
          duration: 0,
          count: 0,
          amount: 0,
          freeAmount: "0",
        };
      }
      const g = grouped[date][type];
      g.amount += amount;
      g.count = (g.count ?? 0) + (count ?? 0);
      g.duration = (g.duration ?? 0) + (duration ?? 0);

      item.orders?.forEach((order) => {
        const orderFree = parseFloat(order.freeAmount || "0") || 0;
        const currentFree = parseFloat(g.freeAmount || "0") || 0;
        g.freeAmount = (currentFree + orderFree).toString();
      });
    });
    return grouped;
  }, [records]);

  const handleDateClick = (date: string) => {
    navigate(`/records?date=${encodeURIComponent(date)}`);
  };

  // 首次加载态
  if (loading && records.length === 0) {
    return (
      <div>
        <h2 className="text-base font-semibold text-brand-dark mb-2.5 ml-[22px]">Earnings Detail</h2>
        <div className="px-4">
          <Skeleton.RecordList count={3} />
        </div>
      </div>
    );
  }

  // 空态
  if (!loading && records.length === 0) {
    return (
      <div>
        <h2 className="text-base font-semibold text-brand-dark mb-2.5 ml-[22px]">Earnings Detail</h2>
        <div className="mx-4 mt-3 p-4 rounded-xl bg-surface text-center text-sm text-[#A2AFCA]">
          No earnings records
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-base font-semibold text-brand-dark mb-2.5 ml-[22px]">Earnings Detail</h2>
      {Object.keys(recordsByDate)
        .sort((a, b) => b.localeCompare(a))
        .map((date) => {
          const dayRecords = recordsByDate[date];
          return (
            <div
              key={date}
              className="mx-4 mt-3 p-4 rounded-xl bg-white cursor-pointer"
              onClick={() => handleDateClick(date)}
            >
              <div className="flex justify-between items-center pb-2.5 mb-2.5 border-b border-dashed border-[#e0e0e0]">
                <span className="text-xs font-bold text-brand-dark">{date}</span>
                <span className="text-xs font-medium text-brand-dark">${dailyTotal(dayRecords)}</span>
              </div>
              {Object.entries(dayRecords)
                .filter(([, item]) => !(item.type === ("Other" as RecordType) && item.amount <= 0))
                .map(([type, item]) => {
                  const itemKey = `${date}_${type}`;
                  const isCall = isCallType(item.type);
                  const isExpanded = expandedItems.has(itemKey);
                  const freeAmount = parseFloat(item.freeAmount || "0") || 0;
                  const paidAmount = (item.amount || 0) - freeAmount;

                  const arrow = isCall ? (
                    <span
                      className="text-xs text-gray-400 ml-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(itemKey);
                      }}
                    >
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  ) : undefined;

                  return (
                    <div key={itemKey}>
                      <RecordItemComponent item={item} compact expandArrow={arrow} label={item.type} />
                      {isCall && (
                        <Collapsible open={isExpanded}>
                          <div className="pl-4 bg-black/[0.02]">
                            {freeAmount > 0 && (
                              <RecordItemComponent
                                item={{
                                  ...item,
                                  id: `${itemKey}_free`,
                                  type: item.type,
                                  amount: freeAmount,
                                  duration: undefined,
                                  count: undefined,
                                }}
                                label="Free Call"
                                compact
                              />
                            )}
                            <RecordItemComponent
                              item={{
                                ...item,
                                id: `${itemKey}_paid`,
                                type: item.type,
                                amount: paidAmount,
                                duration: undefined,
                                count: undefined,
                              }}
                              label="Paid Call"
                              compact
                            />
                          </div>
                        </Collapsible>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}

      {/* 加载更多哨兵 */}
      <div ref={sentinelRef} className="h-px" />

      {loading && (
        <div className="flex justify-center py-4">
          <Spinner size={20} />
        </div>
      )}

      {!hasMore && records.length > 0 && <p className="text-center text-xs text-gray-300 py-4">No more records</p>}
    </div>
  );
}

```
