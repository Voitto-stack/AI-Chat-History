---
title: useEarningDetail
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useEarningDetail.ts
---

# useEarningDetail

```ts
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { getPwaUserBalanceChangeHistory, listCallOrderByRange } from "@/http/earningApi";
import { tzStartOfDay, tzDateKey } from "@/utils/timezone";
import { buildRecordItem, isCallChangeType } from "../pages/Earning/utils";
import { useEarningDetailStore } from "@/stores/earningDetailStore";
import type { RecordItem } from "../pages/Earning/types";
import type { CallOrderInfo } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";

const MAX_DAYS = 60;
const MS_PER_DAY = 86_400_000;
/** 每次展示的天数 */
const PAGE_SIZE_DAYS = 20;

export interface UseEarningDetailReturn {
  /** 当前可见的 records（前端分页裁剪后） */
  records: RecordItem[];
  /** 首次无缓存时的加载态 */
  loading: boolean;
  /** 是否还有更多天数可展示 */
  hasMore: boolean;
  /** 展示下一页（多 20 天） */
  loadMore: () => void;
}

/**
 * 收益详情数据 hook。
 * - 一次性请求 60 天全量数据，存入 zustand store
 * - 再次进页面优先展示 store 缓存，同时后台刷新
 * - 展示层按天数做前端分页（每次 20 天）
 */
export function useEarningDetail(): UseEarningDetailReturn {
  const { records: cachedRecords, setRecords: setCachedRecords } = useEarningDetailStore();
  const [allRecords, setAllRecords] = useState<RecordItem[]>(cachedRecords);
  const [loading, setLoading] = useState(cachedRecords.length === 0);
  const [visibleDays, setVisibleDays] = useState(PAGE_SIZE_DAYS);
  const fetchedRef = useRef(false);

  // 从全量 records 中提取所有日期（降序）
  const sortedDates = useMemo(() => {
    const dateSet = new Set<string>();
    for (const r of allRecords) {
      if (r.date) dateSet.add(r.date);
    }
    return [...dateSet].sort((a, b) => b.localeCompare(a));
  }, [allRecords]);

  // 当前可见的日期集合
  const visibleDateSet = useMemo(() => new Set(sortedDates.slice(0, visibleDays)), [sortedDates, visibleDays]);

  // 裁剪后的 records
  const records = useMemo(
    () => allRecords.filter((r) => r.date && visibleDateSet.has(r.date)),
    [allRecords, visibleDateSet],
  );

  const hasMore = visibleDays < sortedDates.length;

  const loadMore = useCallback(() => {
    setVisibleDays((prev) => prev + PAGE_SIZE_DAYS);
  }, []);

  const fetchAll = useCallback(async () => {
    const tomorrowStartMs = tzStartOfDay(Date.now()) + MS_PER_DAY;
    const oldestMs = tomorrowStartMs - MAX_DAYS * MS_PER_DAY;
    const startSec = Math.floor(oldestMs / 1000);
    const endSec = Math.floor(tomorrowStartMs / 1000) - 1;

    try {
      const [historyRes, ordersRes] = await Promise.all([
        getPwaUserBalanceChangeHistory(startSec, endSec),
        listCallOrderByRange(startSec, endSec),
      ]);

      const histories = historyRes?.histories ?? [];
      const orders = ordersRes?.orders ?? [];

      const ordersByDate = new Map<string, CallOrderInfo[]>();
      for (const order of orders) {
        if (!order.createAt) continue;
        const key = tzDateKey(order.createAt * 1000);
        const list = ordersByDate.get(key) ?? [];
        list.push(order);
        ordersByDate.set(key, list);
      }

      const items: RecordItem[] = [];
      // 用 Set 追踪已匹配的 order，避免同一 order 被多条 history 重复匹配
      const usedOrderIds = new Set<number>();

      for (const h of histories) {
        const changeTimeSec = h.changeTime ?? 0;
        if (changeTimeSec === 0) continue;
        const dateKey = tzDateKey(changeTimeSec * 1000);
        const changeType = h.type ?? 0;
        const isCall = isCallChangeType(changeType);

        let matchedOrders: CallOrderInfo[] = [];
        if (isCall) {
          const dayOrders = ordersByDate.get(dateKey) ?? [];
          // 按 createAt 与 changeTime 的时间差找最近的未匹配 order
          let bestOrder: CallOrderInfo | null = null;
          let bestDiff = Infinity;
          for (const o of dayOrders) {
            if (o.id != null && usedOrderIds.has(o.id)) continue;
            const diff = Math.abs((o.createAt ?? 0) - changeTimeSec);
            if (diff < bestDiff) {
              bestDiff = diff;
              bestOrder = o;
            }
          }
          if (bestOrder) {
            if (bestOrder.id != null) usedOrderIds.add(bestOrder.id);
            matchedOrders = [bestOrder];
          }
        }

        items.push(buildRecordItem(h, matchedOrders, dateKey));
      }

      setAllRecords(items);
      setCachedRecords(items);
    } catch (err) {
      console.error("Failed to fetch earning detail:", err);
    } finally {
      setLoading(false);
    }
  }, [setCachedRecords]);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchAll();
  }, [fetchAll]);

  return { records, loading, hasMore, loadMore };
}

```
