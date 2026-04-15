---
title: WeeklyEarningsChart
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: WeeklyEarningsChart.tsx
---

# WeeklyEarningsChart

```tsx
import { useEffect, useRef, useCallback } from "react";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { WeeklyIncomeData } from "./types";

echarts.use([BarChart, GridComponent, TooltipComponent, CanvasRenderer]);

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const BAR_COLOR = "#6BC4FF";
const BAR_ACTIVE_COLOR = "#2888FF";
/** 横滑判定阈值（px） */
const SWIPE_THRESHOLD = 50;

interface Props {
  list: WeeklyIncomeData[];
  currentIndex: number;
  onSelectDay: (day: number) => void;
  onResetDay: () => void;
  /** 左右滑动切换周：-1 上一周，+1 下一周 */
  onSwipeWeek?: (delta: number) => void;
}

export default function WeeklyEarningsChart({ list, currentIndex, onSelectDay, onResetDay, onSwipeWeek }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const activeDayRef = useRef(-1);

  // 滑动手势状态
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const swiping = useRef(false);

  const weekData = list[currentIndex];

  const getDailyValues = useCallback(() => {
    if (!weekData) return new Array(7).fill(0);
    return DAYS.map((_, i) => weekData.dailyIncomeDataMap.get(i)?.earned ?? 0);
  }, [weekData]);

  const getMaxY = useCallback((values: number[]) => {
    const max = Math.max(...values);
    if (max <= 0) return { max: 80, interval: 20 };
    const rounded = Math.ceil(max / 10) * 10 + 10;
    return { max: rounded, interval: Math.ceil(rounded / 4) };
  }, []);

  const buildOption = useCallback(
    (activeDay: number) => {
      const values = getDailyValues();
      const { max, interval } = getMaxY(values);

      return {
        grid: { left: 0, right: 0, bottom: 0, top: 30, containLabel: true },
        xAxis: {
          type: "category" as const,
          data: DAYS,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { color: "#A2AFCA", fontSize: 10 },
        },
        yAxis: {
          type: "value" as const,
          max,
          interval,
          axisLabel: {
            color: "#A2AFCA",
            fontSize: 10,
            formatter: (v: number) => `$${v}`,
          },
          splitLine: {
            lineStyle: { type: "dotted" as const, color: "#A2AFCA" },
          },
        },
        series: [
          {
            type: "bar" as const,
            barWidth: 24,
            itemStyle: {
              borderRadius: [6, 6, 6, 6],
              color: (params: { dataIndex: number }) => (params.dataIndex === activeDay ? BAR_ACTIVE_COLOR : BAR_COLOR),
            },
            label: {
              show: true,
              position: "top" as const,
              fontSize: 12,
              color: "#012269",
              fontFamily: "Pangram, sans-serif",
              formatter: (params: { value: number }) => `$${params.value.toFixed(2)}`,
            },
            data: values,
          },
        ],
      };
    },
    [getDailyValues, getMaxY],
  );

  useEffect(() => {
    if (!chartRef.current) return;
    const instance = echarts.init(chartRef.current);
    chartInstance.current = instance;

    instance.on("click", (params: { dataIndex?: number }) => {
      if (params.dataIndex === undefined) return;
      if (activeDayRef.current === params.dataIndex) {
        activeDayRef.current = -1;
        onResetDay();
      } else {
        activeDayRef.current = params.dataIndex;
        onSelectDay(params.dataIndex);
      }
      instance.setOption(buildOption(activeDayRef.current));
    });

    const handleResize = () => instance.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      instance.dispose();
      chartInstance.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!chartInstance.current) return;
    activeDayRef.current = -1;
    chartInstance.current.setOption(buildOption(-1), true);
  }, [currentIndex, buildOption]);

  // ==================== 左右滑动切换周 ====================

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    swiping.current = true;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!swiping.current) return;
      swiping.current = false;

      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;

      // 只在水平滑动幅度大于阈值且大于垂直滑动时触发，避免与上下滚动冲突
      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

      // 向左滑 → 下一周（index + 1），向右滑 → 上一周（index - 1）
      onSwipeWeek?.(dx < 0 ? 1 : -1);
    },
    [onSwipeWeek],
  );

  return (
    <div
      ref={chartRef}
      className="w-full"
      style={{ height: 189 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    />
  );
}

```
