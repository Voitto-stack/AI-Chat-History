---
title: callUtils
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: callUtils.ts
---

# callUtils

```ts
import { toast } from "@/utils/toast";
import { checkCameraPermission, checkMicrophonePermission } from "@/utils/permissions";
import { updatePwaType } from "@/http/api";
import { STORAGE_KEYS } from "../constants/storageKeys";

type PermissionStatus = "granted" | "denied" | "unavailable";

/**
 * 处理直播业务权限检查 (优化版 - 并行请求权限)
 * @param checkCamera 是否检查摄像头权限
 * @param checkMicrophone 是否检查麦克风权限
 * @returns {Promise<boolean>} true: 权限通过, false: 权限被拒绝或不可用
 */
export async function checkCameraAndMicPermission({ checkCamera = true, checkMicrophone = true }): Promise<boolean> {
  // 🚀 应用 Vercel 最佳实践: async-parallel - 并行请求权限
  const requests: Promise<{ type: "camera" | "microphone"; status: PermissionStatus }>[] = [];

  if (checkCamera) {
    requests.push(checkCameraPermission().then((status) => ({ type: "camera" as const, status })));
  }

  if (checkMicrophone) {
    requests.push(checkMicrophonePermission().then((status) => ({ type: "microphone" as const, status })));
  }

  // 如果没有需要检查的权限，直接返回 true
  if (requests.length === 0) {
    return true;
  }

  // 并行等待所有权限请求完成
  const results = await Promise.all(requests);

  // 检查结果，优先显示第一个失败的权限
  for (const { type, status } of results) {
    if (status === "denied") {
      const msg =
        type === "camera"
          ? "You have disabled camera access, please allow the current application to use the camera."
          : "You have disabled microphone access, please allow the current application to use the microphone.";

      toast.error(msg);
      return false;
    }

    if (status === "unavailable") {
      const msg =
        type === "camera"
          ? "Your device does not have a camera available."
          : "Your device does not have a microphone available.";

      toast.error(msg);
      return false;
    }
  }

  return true;
}

export function unicodeToChinese(str: string): string {
  return str.replace(/\\u[\dA-Fa-f]{4}/g, (match) => String.fromCharCode(parseInt(match.replace("\\u", ""), 16)));
}

export async function delay(tick: number) {
  return new Promise((resolve) => setTimeout(resolve, tick));
}

/**
 * 使用原生 JS 将时间转换为美西时间
 * @param {number|string|Date} timestamp - 时间戳，不传则默认当前时间
 * @returns {string} 格式化后的时间字符串 (例如: 2026.02.25 04:29:18)
 */
export function formatInTimeZone(timestamp = Date.now()) {
  const date = new Date(timestamp);

  // 配置时区和时间格式参数
  const options = {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23", // 确保使用 24 小时制 (00-23)
  };

  // 使用 formatToParts 可以精准获取年月日时分秒，避免不同语言环境带来的标点符号差异
  const formatter = new Intl.DateTimeFormat("en-US", options as Intl.DateTimeFormatOptions);
  const parts = formatter.formatToParts(date);

  // 提取对应的时间片段
  const getPart = (type) => parts.find((part) => part.type === type).value;

  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  const hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");

  // 按照你的要求拼接成 yyyy.MM.dd HH:mm:ss
  return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
}

/**
 * 通话记录与降级服务
 * 统一入口：processCallRecord({ rejected, duration, hasFaceRate, source })
 */

// ==================== 常量 ====================

const ALERT_HISTORY_DURATION = 15; // 通话时长阈值（秒）
const ALERT_HISTORY_COUNT = 3; // 检查最近N条记录
const ALERT_HISTORY_FACE_RATE = 0.5; // 露脸率阈值

// ==================== 类型 ====================

interface CallRecordItem {
  rejected: boolean;
  duration: number;
  hasFaceRate: number;
  time: number;
  dateKey: string;
}

interface ProcessCallRecordParams {
  rejected: boolean;
  duration: number;
  hasFaceRate: number;
  source: string;
}

// ==================== 工具函数 ====================

function getTodayKey(timestamp: number): string {
  const d = new Date(timestamp);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ==================== 存储操作 ====================

function getCallHistory(): CallRecordItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CALL_HISTORY) || "[]");
  } catch {
    return [];
  }
}

function setCallHistory(history: CallRecordItem[]): void {
  localStorage.setItem(STORAGE_KEYS.CALL_HISTORY, JSON.stringify(history));
}

function clearAllCallRecord(): void {
  localStorage.removeItem(STORAGE_KEYS.CALL_HISTORY);
}

// ==================== 内部方法 ====================

/**
 * 保存一条通话记录
 * - 同一天的记录会累积，不同天会清空
 * - 最多保留 3 条
 */
function saveCallRecord(rejected: boolean, duration: number, hasFaceRate: number): void {
  const dateKey = getTodayKey(Date.now());
  let history = getCallHistory();

  if (history.length > 0 && history[history.length - 1].dateKey !== dateKey) {
    history = [];
  }

  history.push({ rejected, duration, hasFaceRate, time: Date.now(), dateKey });

  if (history.length > ALERT_HISTORY_COUNT) return;

  setCallHistory(history);
}

/**
 * 检查最近 3 条记录是否全部违规
 * 违规条件（满足任一）：rejected === true || duration < 15s || hasFaceRate < 0.5
 */
function shouldDegrade(): boolean {
  const history = getCallHistory();
  if (history.length < ALERT_HISTORY_COUNT) return false;

  const count = history
    .slice(-ALERT_HISTORY_COUNT)
    .filter(
      (item) => item.rejected || item.duration < ALERT_HISTORY_DURATION || item.hasFaceRate < ALERT_HISTORY_FACE_RATE,
    ).length;

  return count === ALERT_HISTORY_COUNT;
}

/** 保存记录 + 检查降级 */
async function saveAndCheckDegrade(
  rejected: boolean,
  duration: number,
  hasFaceRate: number,
  source: string,
): Promise<void> {
  saveCallRecord(rejected, duration, hasFaceRate);

  if (shouldDegrade()) {
    console.log(`触发降级，来源: ${source}`);
    try {
      await updatePwaType(false);
    } catch (error) {
      console.error("降级接口调用失败:", error);
    }
  }
}

/**
 * 统一处理通话记录收集与降级判定
 *
 * @param rejected - 是否为拒接/未接听场景
 * @param duration - 通话时长（秒），拒接场景传 0
 * @param hasFaceRate - 露脸率（0-1），拒接场景传 0
 * @param source - 来源标识，用于日志追踪
 *
 * 处理逻辑：
 * 1. rejected=true → 直接记录一条违规
 * 2. rejected=false（通话结束）→ 根据时长和露脸率判断：
 *    - 长通话(>15s) + 露脸率正常(≥0.5) → 清除历史（好的通话）
 *    - 长通话(>15s) + 露脸率低(<0.5)   → 清除历史 + 记录1次
 *    - 短通话(<15s) + 露脸率低(<0.5)   → 记录2次（双重违规）
 *    - 短通话(<15s) + 露脸率正常(≥0.5) → 记录1次
 *    - 其他                              → 不记录
 *
 * 每次记录后检查：最近3条全部违规 → 调用 updatePwaType 降级为"文字小利女"
 */
export async function processCallRecord({
  rejected,
  duration,
  hasFaceRate,
  source,
}: ProcessCallRecordParams): Promise<void> {
  console.log("processCallRecord", { rejected, duration, hasFaceRate, source });

  // 拒接/未接听场景：直接记录一条违规
  if (rejected) {
    await saveAndCheckDegrade(true, duration, hasFaceRate, source);
    return;
  }

  // 通话结束场景：根据时长和露脸率判断
  const isShortCall = duration < ALERT_HISTORY_DURATION;
  const isLowFaceRate = hasFaceRate < ALERT_HISTORY_FACE_RATE;

  // 长通话：先清除历史违规记录
  if (!isShortCall) {
    clearAllCallRecord();
    // 露脸率低仍记录一次
    if (isLowFaceRate) {
      console.log("长通话但露脸率低，记录违规");
      await saveAndCheckDegrade(false, duration, hasFaceRate, `${source}_low_face_rate`);
    }
    return;
  }

  // 短通话 + 低露脸率 = 双重违规
  if (isShortCall && isLowFaceRate) {
    console.log("双重违规：通话时长短 + 露脸率低");
    await saveAndCheckDegrade(false, duration, ALERT_HISTORY_FACE_RATE + 0.1, `${source}_short_duration`);
    await saveAndCheckDegrade(false, ALERT_HISTORY_DURATION + 1, hasFaceRate, `${source}_low_face_rate`);
    return;
  }

  // 单一违规
  if (isShortCall || isLowFaceRate) {
    console.log("单一违规", { isShortCall, isLowFaceRate });
    await saveAndCheckDegrade(false, duration, hasFaceRate, source);
    return;
  }

  console.log("无违规，不记录");
}

```
