---
title: chatUtils
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: chatUtils.ts
---

# chatUtils

```ts
import { format, isToday, isYesterday, isThisWeek, isThisYear, formatDistance, isSameDay } from "date-fns";
import type { Locale } from "date-fns";
import { enGB, zhCN, ja, ko } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

const LOCALE_MAP: Record<string, Locale> = {
  "zh-CN": zhCN,
  "en-US": enGB,
  "ja-JP": ja,
  "ko-KR": ko,
};

/**
 * 获取时间戳的显示文本
 * @param time 时间戳（毫秒）
 * @param language 语言代码
 * @returns 格式化后的时间字符串
 *
 * 格式规则：
 * - 今年之前：显示年月日 (e.g., "2023 Jan 15")
 * - 今天：显示时间 (e.g., "10:30")
 * - 昨天：显示相对时间 (e.g., "1 day ago")
 * - 本周内：显示星期几 (e.g., "Monday")
 * - 今年内：显示月日 (e.g., "Jan 15")
 */
export const getTimeStamp = (time: number, language = "en-US"): string => {
  if (!time) return "";

  const locale = LOCALE_MAP[language] ?? enGB;

  if (!isThisYear(time)) return format(time, "yyyy MMM dd", { locale });
  if (isToday(time)) return format(time, "p", { locale });
  if (isYesterday(time)) return formatDistance(time, new Date(), { locale });
  if (isThisWeek(time)) return format(time, "eeee", { locale });
  return format(time, "MMM dd", { locale });
};

/**
 * 判断时间戳是否与当前时间在美西时区的同一天
 * @param timestamp 要比较的时间戳（毫秒）
 * @returns 如果是同一天返回 true，否则返回 false
 */
export function isSameDayInPacificTime(timestamp: number): boolean {
  const timeZone = "America/Los_Angeles";
  const nowInPST = toZonedTime(new Date(), timeZone);
  const dateInPST = toZonedTime(new Date(timestamp), timeZone);
  return isSameDay(nowInPST, dateInPST);
}

/**
 * 从数组中随机获取一个元素
 * @param array 数组
 * @returns 随机元素，如果数组为空则返回 null
 */
export function getRandomElement<T>(array: T[]): T | null {
  if (array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
}

// 从会话 ID 提取用户 ID，例如 "C2C12345" => 12345
export function convToUid(conversationId: string): number {
  return parseInt(conversationId.replace(/^C2C/, ""), 10);
}

```
