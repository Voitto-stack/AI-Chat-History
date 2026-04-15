---
title: useEarningData
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: useEarningData.ts
---

# useEarningData

```ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { getPwaUserBalanceChangeHistory, listCallOrderByRange } from "@/http/earningApi";
import { tzStartOfDay, tzWeekday, tzDateKey, tzShortDate } from "@/utils/timezone";
import type { PwaUserBalanceChangeHistory, CallOrderInfo } from "@sitin/api-proto/gen/archat_api/user_api";
import type { WeeklyIncomeData, DailyIncomeData } from "../pages/Earning/types";
import { RecordType, EMPTY_BREAKDOWN } from "../pages/Earning/types";
import { CHANGE_TYPE_TO_RECORD_TYPE, isCallChangeType, buildRecordItem } from "../pages/Earning/utils";

// 周数和时间常量
const WEEKS_COUNT = 8;
const MS_PER_DAY = 86_400_000;

/** 收益分类字段名 */
const EARNING_FIELD_MAP: Partial<Record<RecordType, keyof DailyIncomeData>> = {
  [RecordType.Video_Call]: "videoEarnings",
  [RecordType.Voice_Call]: "voiceEarnings",
  [RecordType.Texting_Pot]: "otherEarnings",
  [RecordType.Receive_Gifts]: "giftEarnings",
  [RecordType.Gifts]: "giftEarnings",
  [RecordType.Live]: "liveEarnings",
  [RecordType.Task]: "taskEarnings",
  [RecordType.Waiting_Reward]: "waitingEarnings",
  [RecordType.Ins_Followers]: "insEarnings",
  [RecordType.Ins_Messages]: "insEarnings",
  [RecordType.Game]: "otherEarnings",
  [RecordType.Other]: "otherEarnings",
};

// 需要在周汇总中累加的分类字段
const EARNING_FIELDS = [
  "videoEarnings",
  "voiceEarnings",
  "giftEarnings",
  "liveEarnings",
  "taskEarnings",
  "waitingEarnings",
  "insEarnings",
  "otherEarnings",
] as const;

interface WeekRange {
  startSec: number; // unix 秒
  endSec: number;
  startMs: number; // 毫秒
  firstFormatted: string;
  lastFormatted: string;
}

/** 计算从当前周向前回溯 N 周的周日期范围（基于用户时区） */
function computeWeekRanges(weeksCount: number): WeekRange[] {
  const nowMs = Date.now();
  // 用户时区下今天的 00:00
  const todayStart = tzStartOfDay(nowMs);
  // 用户时区下今天是周几
  const todayWeekday = tzWeekday(todayStart);
  const thisWeekSundayMs = todayStart - todayWeekday * MS_PER_DAY;

  return Array.from({ length: weeksCount }, (_, i) => {
    const weeksAgo = weeksCount - 1 - i;
    const startMs = thisWeekSundayMs - weeksAgo * 7 * MS_PER_DAY;
    const endMs = startMs + 6 * MS_PER_DAY + (MS_PER_DAY - 1); // 周六 23:59:59.999

    return {
      startSec: Math.floor(startMs / 1000),
      endSec: Math.floor(endMs / 1000),
      startMs,
      firstFormatted: tzShortDate(startMs),
      lastFormatted: tzShortDate(startMs + 6 * MS_PER_DAY),
    };
  });
}

function createEmptyDailyIncome(dayOfWeek: number, dateMs: number): DailyIncomeData {
  return {
    dayOfWeek,
    date: dateMs,
    earned: 0,
    callDuration: 0,
    liveDuration: 0,
    callDurationTotal: 0,
    freeCallDurationTotal: 0,
    ...EMPTY_BREAKDOWN,
    records: [],
  };
}

/** 按日期索引通话订单，便于按天关联 */
function indexOrdersByDate(orders: CallOrderInfo[]): Map<string, CallOrderInfo[]> {
  const map = new Map<string, CallOrderInfo[]>();
  for (const order of orders) {
    if (!order.createAt) continue;
    const dateKey = tzDateKey(order.createAt * 1000);
    const list = map.get(dateKey) ?? [];
    list.push(order);
    map.set(dateKey, list);
  }
  return map;
}

/** 精确到两位小数 */
function round2(n: number): number {
  return Number(n.toFixed(2));
}

/** 根据 API 返回数据聚合一周的 WeeklyIncomeData */
function buildWeeklyData(
  range: WeekRange,
  histories: PwaUserBalanceChangeHistory[],
  orders: CallOrderInfo[],
  onlineTime: number,
): WeeklyIncomeData {
  const dailyMap = new Map<number, DailyIncomeData>();
  for (let day = 0; day < 7; day++) {
    dailyMap.set(day, createEmptyDailyIncome(day, range.startMs + day * MS_PER_DAY));
  }

  const ordersByDate = indexOrdersByDate(orders);
  // 用 Set 追踪已匹配的 order，避免同一 order 被多条 history 重复匹配
  const usedOrderIds = new Set<number>();

  for (const h of histories) {
    const changeTimeSec = h.changeTime ?? 0;
    if (changeTimeSec === 0) continue;

    const changeMs = changeTimeSec * 1000;
    const daily = dailyMap.get(tzWeekday(changeMs));
    if (!daily) continue;

    const amount = parseFloat(h.changeBalance ?? "0") || 0;
    const changeType = h.type ?? 0;
    const recordType = CHANGE_TYPE_TO_RECORD_TYPE[changeType] ?? RecordType.Other;
    const dateKey = tzDateKey(changeMs);

    daily.earned += amount;
    const field = EARNING_FIELD_MAP[recordType] ?? "otherEarnings";
    (daily[field] as number) += amount;

    const isCall = isCallChangeType(changeType);

    // 按 createAt 与 changeTime 的时间差找最近的未匹配 order
    let matchedOrders: CallOrderInfo[] = [];
    if (isCall) {
      const dayOrders = ordersByDate.get(dateKey) ?? [];
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

    const record = buildRecordItem(h, matchedOrders, dateKey);

    if (isCall && matchedOrders.length > 0) {
      const callDuration = matchedOrders[0].callDuration ?? 0;
      const freeDuration = matchedOrders[0].freeCallDuration ?? 0;
      daily.callDuration += callDuration;
      daily.callDurationTotal += callDuration;
      daily.freeCallDurationTotal += freeDuration;
    }

    daily.records.push(record);
  }

  // 汇总各日数据到周维度
  let totalEarned = 0;
  let callDurationTotal = 0;
  let freeCallDurationTotal = 0;
  const weekEarnings: Record<string, number> = {};
  for (const f of EARNING_FIELDS) weekEarnings[f] = 0;

  for (const [, daily] of dailyMap) {
    daily.earned = round2(daily.earned);
    for (const f of EARNING_FIELDS) {
      daily[f] = round2(daily[f] as number);
      weekEarnings[f] += daily[f] as number;
    }
    totalEarned += daily.earned;
    callDurationTotal += daily.callDurationTotal;
    freeCallDurationTotal += daily.freeCallDurationTotal;
  }

  for (const f of EARNING_FIELDS) weekEarnings[f] = round2(weekEarnings[f]);

  return {
    weekDate: range.startMs,
    onlineTime,
    totalEarned: round2(totalEarned),
    dailyIncomeDataMap: dailyMap,
    firstWeekDayFormatted: range.firstFormatted,
    lastWeekDayFormatted: range.lastFormatted,
    ...weekEarnings,
    callDurationTotal,
    freeCallDurationTotal,
  } as WeeklyIncomeData;
}

/** 创建一个空的 WeeklyIncomeData 占位 */
function createEmptyWeekly(range: WeekRange): WeeklyIncomeData {
  const emptyMap = new Map<number, DailyIncomeData>();
  for (let day = 0; day < 7; day++) {
    emptyMap.set(day, createEmptyDailyIncome(day, range.startMs + day * MS_PER_DAY));
  }
  return {
    weekDate: range.startMs,
    onlineTime: 0,
    totalEarned: 0,
    dailyIncomeDataMap: emptyMap,
    firstWeekDayFormatted: range.firstFormatted,
    lastWeekDayFormatted: range.lastFormatted,
    ...EMPTY_BREAKDOWN,
    callDurationTotal: 0,
    freeCallDurationTotal: 0,
  };
}

export interface UseEarningDataReturn {
  weekList: WeeklyIncomeData[];
  loading: boolean;
  refreshWeek: (weekIndex: number) => Promise<void>;
}

export function useEarningData(): UseEarningDataReturn {
  const weekRanges = useMemo(() => computeWeekRanges(WEEKS_COUNT), []);

  const [weekDataMap, setWeekDataMap] = useState<Map<number, WeeklyIncomeData>>(new Map());
  const [loading, setLoading] = useState(true);

  // 并行请求余额变动历史和通话订单
  const fetchWeekData = useCallback(
    async (weekIndex: number) => {
      const range = weekRanges[weekIndex];
      if (!range) return;

      try {
        const [historyRes, ordersRes] = await Promise.all([
          getPwaUserBalanceChangeHistory(range.startSec, range.endSec),
          listCallOrderByRange(range.startSec, range.endSec),
        ]);

        const weeklyData = buildWeeklyData(
          range,
          historyRes?.histories ?? [],
          ordersRes?.orders ?? [],
          historyRes?.onlineTime ?? 0,
        );

        setWeekDataMap((prev) => {
          const next = new Map(prev);
          next.set(weekIndex, weeklyData);
          return next;
        });
      } catch (err) {
        console.error(`Failed to fetch week ${weekIndex} data:`, err);
      }
    },
    [weekRanges],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadInitialData() {
      setLoading(true);
      try {
        await fetchWeekData(WEEKS_COUNT - 1);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadInitialData();
    return () => {
      cancelled = true;
    };
  }, [fetchWeekData]);

  const weekList = useMemo(() => {
    return weekRanges.map((range, i) => weekDataMap.get(i) ?? createEmptyWeekly(range));
  }, [weekRanges, weekDataMap]);

  const refreshWeek = useCallback(
    async (weekIndex: number) => {
      if (!weekDataMap.has(weekIndex)) {
        await fetchWeekData(weekIndex);
      }
    },
    [weekDataMap, fetchWeekData],
  );

  return { weekList, loading, refreshWeek };
}

```
