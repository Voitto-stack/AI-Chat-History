---
title: timeFormat
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: timeFormat.ts
---

# timeFormat

```ts
/**
 * 时间格式化工具
 * Time formatting utilities
 */

/**
 * 将时间戳标准化为毫秒
 * 自动识别秒级（<1e12）和毫秒级时间戳
 * @param timestamp - 时间戳（秒或毫秒）
 * @returns 毫秒级时间戳
 *
 * @example
 * normalizeTimestamp(1711180200)    // 1711180200000（秒→毫秒）
 * normalizeTimestamp(1711180200000) // 1711180200000（毫秒不变）
 */
export function normalizeTimestamp(timestamp: number): number {
  return timestamp < 1e12 ? timestamp * 1000 : timestamp;
}

/**
 * 将秒数格式化为 HH:MM:SS 格式
 * @param seconds - 总秒数
 * @returns 格式化后的时间字符串 (HH:MM:SS)
 *
 * @example
 * formatSecondsToHHMMSS(3661) // "01:01:01"
 * formatSecondsToHHMMSS(125) // "00:02:05"
 * formatSecondsToHHMMSS(45) // "00:00:45"
 */
export function formatSecondsToHHMMSS(seconds: number): string {
  // js-early-exit: 处理边界情况
  if (seconds < 0) return "00:00:00";
  if (!Number.isFinite(seconds)) return "00:00:00";

  // js-cache-property-access: 缓存 Math.floor 调用
  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * 将秒数格式化为 MM:SS 格式
 * @param seconds - 总秒数
 * @returns 格式化后的时间字符串 (MM:SS)
 *
 * @example
 * formatSecondsToMMSS(125) // "02:05"
 * formatSecondsToMMSS(45) // "00:45"
 */
export function formatSecondsToMMSS(seconds: number): string {
  // js-early-exit: 处理边界情况
  if (seconds < 0) return "00:00";
  if (!Number.isFinite(seconds)) return "00:00";

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * 将毫秒时间戳格式化为可读的日期时间字符串
 * @param timestamp - 毫秒时间戳
 * @returns 格式化后的日期时间字符串
 *
 * @example
 * formatTimestamp(1704067200000) // "2024-01-01 00:00:00"
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const time = formatDateToHHMMSS(date);

  return `${year}-${month}-${day} ${time}`;
}

/**
 * 获取当前时间的 HH:MM:SS 格式
 * @returns 当前时间字符串
 */
export function getCurrentTimeHHMMSS(): string {
  return formatDateToHHMMSS(new Date());
}

/**
 * 将 Date 对象格式化为 HH:MM:SS（24 小时制）
 * @param date - Date 对象
 * @returns 格式化后的时间字符串 (e.g. "14:30:05")
 */
export function formatDateToHHMMSS(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

/**
 * 格式化时长显示 xxh xxmin xxs
 * @param seconds - 总秒数
 * @returns 格式化后的时长字符串 xxh xxmin xxs
 */
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 ? `${minutes}min ${remainingSeconds}s` : `${minutes}min`;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let result = `${hours}h`;
  if (minutes > 0) result += ` ${minutes}min`;
  if (remainingSeconds > 0) result += ` ${remainingSeconds}s`;
  return result;
};

/**
 * 将 Date 对象格式化为 12 小时制 AM/PM 格式
 * @param date - Date 对象
 * @returns 格式化后的时间字符串 (e.g. "2:30 PM")
 *
 * @example
 * formatDateToAMPM(new Date("2024-01-01T14:30:00")) // "2:30 PM"
 */
export function formatDateToAMPM(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

/**
 * 获取当前时间 xx:xx AM/PM 格式
 * @returns 当前时间字符串 xx:xx AM/PM
 */
export const getCurrentTime = () => {
  return formatDateToAMPM(new Date());
};

/**
 * 将 Unix 秒时间戳格式化为 HH:MM（24 小时制）
 * @param timestampInSeconds - Unix 时间戳（秒）
 * @returns 格式化后的时间字符串 (e.g. "14:30")
 *
 * @example
 * formatUnixToHHMM(1711180200) // "14:30"
 */
export function formatUnixToHHMM(timestampInSeconds: number): string {
  const d = new Date(timestampInSeconds * 1000);
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

```
