---
title: useVoiceModeration
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useVoiceModeration.ts
---

# useVoiceModeration

```ts
/**
 * 语音内容审核 Hook
 * Voice Content Moderation Hook

 */

import { type RefObject, useCallback, useRef } from "react";
import { VideoCallTranscriptContent } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import { getCallStoreState } from "@/hooks/useCall";

const TAG = "useVoiceModeration";
const DETECTION_LOG = "🔍[CALL-DETECTION]";

// 分段静音检测阈值（毫秒）
const CALL_PHASE_THRESHOLD = 15000; // 15秒为通话前后期分界点
const NO_VOICE_TIMEOUT_EARLY = 5000; // 通话前15秒内：5秒无声触发 NoVoice 弹窗
const NO_VOICE_TIMEOUT_LATE = 15000; // 通话15秒后：15秒无声触发 NoVoice 弹窗
// 违规超时时间（毫秒）
const SILENT_TIMEOUT = 18000; // 18秒记录违规

// 违规次数上限（达到后禁用收益，超过后不再显示弹窗）
const MAX_VIOLATION_COUNT = 3;

// ==================== 类型定义 ====================

/**
 * 违规类型枚举
 */
export enum ViolationType {
  /** 18秒不说话 */
  VOICE_18 = 0,
  /** 声称是 AI/机器人 */
  NON_HUMAN_DISCLOSURE = 1,
  /** 金钱意图 */
  MONETIZATION_INTENT = 2,
  /** 其他违规 */
  OTHER = 3,
  /** 非法行为 */
  ILLEGAL = 4,
}

/**
 * 违规记录
 */
interface Violation {
  time: number;
  reason: ViolationType;
}

/**
 * 违规弹窗配置
 */
export interface PopupTextConfig {
  rejectedCount: number;
  maxReject: number;
  timesTip: string;
  closeText: string;
  earningOneVoice: string;
  earningOneVoiceDes: string;
  earningTwoVoice: string;
  earningTwoVoiceDes: string;
  earningThreeVoice: string;
  earningThreeVoiceDes: string;
  secondary: string;
  answerText: string;
  warning?: string;
}

/**
 * Hook 配置选项（仅包含事件回调）
 */
export interface UseVoiceModerationOptions {
  /** 违规回调 */
  onVoiceViolationToast?: (params: PopupTextConfig) => void;
  /** Native 违规上报事件 */
  nativeReportViolationEvent?: (options?: { showToast: boolean; useDetection: boolean; detectResult?: string }) => void;

  /** 共享违规计数 ref（与 useTupu 共享） */
  sharedViolationCountRef: RefObject<number>;

  /** 静音状态变化回调，true=静音（显示 NoVoice），false=有声音（隐藏 NoVoice） */
  onVoiceSilent?: (isSilent: boolean) => void;
}

/**
 * start 方法的参数（包含基础信息）
 */
export interface VoiceModerationStartParams {
  /** 目标用户 ID */
  remoteUserId: string;
  /** 房间 ID */
  roomId: number;
  /** 当前用户 ID */
  userId: string | number;
  /** 调用方（pwa 或 native） */
  caller?: string;

  fromUserId: string;

  text: string;

  isEnd: boolean;
}

/**
 * 审核上报数据
 */
export interface VoiceModerationOptions {
  roomId: number; // 房间 ID
  durationTime: string; // 通话时长（秒，保留两位小数）
  targetId: string | number; // 目标用户 ID
  whichMinute: number; // 当前第几分钟
  textHistory: VideoCallTranscriptContent[]; // 语音转文字历史
  startTime: number; // 开始时间戳
  endTime: number; // 结束时间戳
  toUserId: number; // 对方用户 ID
  fromUserId: number; // 当前用户 ID
  rejectedCount: number; // 违规次数
}

/**
 * Hook 返回值
 */
export interface UseVoiceModerationReturn {
  /** 启动审核 */
  start: (params: VoiceModerationStartParams) => void;
  /** 处理语音转文字 */
  handleTranscription: (fromUserId: string, text: string, isEnd: boolean) => void;
  /** 每分钟结束时调用 */
  onMinuteEnd: () => void;
  /** 停止审核 */
  stopModeration: () => void;
  /** 获取选项数据 */
  getOptions: () => VoiceModerationOptions;
}

// ==================== 工具函数 ====================

// js-hoist-regexp: 提取正则表达式到模块级别
const MONEY_PATTERNS = [
  /money|earn|paid|get paid|make cash|pay me|working here|paypal/i,
  /I'm here just to make some money/i,
  /I get paid for doing this/i,
  /Make money by (talking|texting) to people/i,
  /Doing this for the money/i,
  /This is a job.*money/i,
  /Earn money.*talking/i,
  /I earn money every time.*call me/i,
];

const AI_PATTERNS = [
  /AI|robot|scam|not me|auto replies|wasn't me/i,
  /AI replies for me/i,
  /Use AI generated messages/i,
  /That's AI texting/i,
  /Those messages weren't from me/i,
  /app's doing the auto-text/i,
  /I didn't type it/i,
  /That was AI chatting, not me/i,
  /replies are automatic/i,
];

/**
 * 获取违规提示信息
 * rendering-hoist-jsx: 提取静态数据
 */
export function getViolationTip(type: ViolationType): { warning: string } {
  switch (type) {
    case ViolationType.VOICE_18:
      return { warning: "Warning: You haven't spoken for too long." };
    case ViolationType.NON_HUMAN_DISCLOSURE:
      return { warning: "Warning: You cannot claim your chat content is Al-generated." };
    case ViolationType.MONETIZATION_INTENT:
      return { warning: "Warning:Don't claim you're just here for profit." };
    case ViolationType.ILLEGAL:
      return { warning: "Warning: Your recent chat contains illegal behavior." };
    default:
      return { warning: "Warning: Your recent chat contained prohibited content." };
  }
}

/**
 * 生成违规弹窗配置
 * rendering-hoist-jsx: 静态配置
 */
function generatePopupConfig(count: number): PopupTextConfig {
  return {
    rejectedCount: count,
    maxReject: MAX_VIOLATION_COUNT,
    timesTip: "Violation of this minute",
    closeText: "Ignore warnings, continue",
    earningOneVoice: "100%",
    earningOneVoiceDes: "Earnings",
    earningTwoVoice: "50%",
    earningTwoVoiceDes: "Earnings",
    earningThreeVoice: "0$",
    earningThreeVoiceDes: "Earnings",
    secondary:
      "If you continue to violate the regulations,you will be unable to obtain the standard earnings from this call.",
    answerText: "I will behave and chat better",
  };
}

// ==================== Hook 实现 ====================

export function useVoiceModeration(options: UseVoiceModerationOptions): UseVoiceModerationReturn {
  const { onVoiceViolationToast, nativeReportViolationEvent, sharedViolationCountRef, onVoiceSilent } = options;

  // ==================== Refs ====================
  // rerender-use-ref-transient-values: 使用 ref 存储频繁变化的值

  // 基础信息 refs（通过 start 方法设置）
  const remoteUserIdRef = useRef<string>("");
  const roomIdRef = useRef<number>(0);
  const userIdRef = useRef<string | number>("");
  const callerRef = useRef<string>("pwa");

  // 状态 refs
  const startTimeRef = useRef<number>(0);
  const callBeginTimeRef = useRef<number>(0); // 本轮通话实际开始时间（跨越多次 start() 调用）
  const lastRoomIdRef = useRef<number>(0); // 上次通话的 roomId，用于判断是否新通话
  const whichMinuteRef = useRef(1);
  const violationsRef = useRef<Violation[]>([]);
  const textHistoryRef = useRef<VideoCallTranscriptContent[]>([]);
  const disableEarningRef = useRef(false);
  const isStoppedRef = useRef(true);

  const nativeReportViolationEventRef = useRef(nativeReportViolationEvent);
  nativeReportViolationEventRef.current = nativeReportViolationEvent;

  // 定时器
  const noVoiceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const silentTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ==================== 辅助函数 ====================

  /**
   * 清除静音定时器
   */
  const clearSilentTimer = useCallback(() => {
    if (noVoiceTimerRef.current) {
      clearTimeout(noVoiceTimerRef.current);
      noVoiceTimerRef.current = null;
    }
    if (silentTimerRef.current) {
      clearTimeout(silentTimerRef.current);
      silentTimerRef.current = null;
    }
  }, []);

  /**
   * 获取选项数据（用于上报）
   */
  const getOptionsData = useCallback(() => {
    return {
      roomId: roomIdRef.current,
      durationTime: ((Date.now() - startTimeRef.current) / 1000).toFixed(2),
      targetId: userIdRef.current,
      whichMinute: whichMinuteRef.current,
      textHistory: textHistoryRef.current,
      startTime: startTimeRef.current,
      endTime: Date.now(),
      toUserId: Number(remoteUserIdRef.current),
      fromUserId: Number(userIdRef.current),
      rejectedCount: sharedViolationCountRef.current ?? 0,
    };
  }, [sharedViolationCountRef]);

  /**
   * 记录违规
   * rerender-functional-setstate: 使用稳定的回调
   */
  const recordViolation = useCallback(
    (reason: ViolationType, source: string) => {
      // js-early-exit: 早期返回
      if (isStoppedRef.current) {
        console.log(TAG, `${DETECTION_LOG} [违规记录] ⏭️ 已停止或已退出，跳过记录`);
        return;
      }

      const now = Date.now();
      violationsRef.current.push({ time: now, reason });

      // 更新违规计数（sharedViolationCountRef 由接口保证非空）
      sharedViolationCountRef.current = sharedViolationCountRef.current + 1;
      const totalViolationCount = sharedViolationCountRef.current;

      console.warn(
        TAG,
        `${DETECTION_LOG} [违规记录] ⚠️ 检测到违规: type=${reason}, source=${source}, count=${totalViolationCount}`,
      );

      // 判断是否禁用收益
      if (totalViolationCount >= MAX_VIOLATION_COUNT && !disableEarningRef.current) {
        disableEarningRef.current = true;
      }

      // 限制显示为最多 3 次
      const displayCount = Math.min(totalViolationCount, MAX_VIOLATION_COUNT);

      // js-early-exit: 超过上限不显示弹窗
      if (totalViolationCount > MAX_VIOLATION_COUNT) {
        return;
      }

      // 再次检查是否已停止
      if (isStoppedRef.current) {
        return;
      }

      const popupConfig = generatePopupConfig(displayCount);
      const warningTip = getViolationTip(reason);
      onVoiceViolationToast({ ...popupConfig, ...warningTip });
    },
    [onVoiceViolationToast, sharedViolationCountRef],
  );

  /**
   * 启动静音检测循环
   * 分段策略：通话前15秒内5秒触发，15秒后15秒触发
   */
  const startSilentLoop = useCallback(() => {
    clearSilentTimer();

    // 根据通话已进行时长动态选择 NoVoice 弹窗触发阈值
    const callElapsed = Date.now() - (callBeginTimeRef.current || startTimeRef.current);
    const noVoiceTimeout = callElapsed < CALL_PHASE_THRESHOLD ? NO_VOICE_TIMEOUT_EARLY : NO_VOICE_TIMEOUT_LATE;

    // 动态时长后显示 NoVoice 弹窗
    noVoiceTimerRef.current = setTimeout(() => {
      if (isStoppedRef.current) return;
      if (!getCallStoreState().noVoiceVisible) {
        onVoiceSilent(true);
        console.log(
          TAG,
          `${DETECTION_LOG} [静音检测] 显示 NoVoice 弹窗（通话已${Math.round(callElapsed / 1000)}s，阈值${noVoiceTimeout / 1000}s）`,
        );
      }
    }, noVoiceTimeout);

    // 18秒后记录违规
    silentTimerRef.current = setTimeout(() => {
      if (isStoppedRef.current) return;

      console.warn(TAG, `${DETECTION_LOG} [静音检测] ⚠️ 检测到 ${SILENT_TIMEOUT / 1000} 秒静音`);
      recordViolation(ViolationType.VOICE_18, "本地");

      // 递归继续监听
      startSilentLoop();
    }, SILENT_TIMEOUT);
  }, [clearSilentTimer, recordViolation, onVoiceSilent]);

  /**
   * 检查文本是否包含违规内容（本地正则检测）
   * js-early-exit: 早期返回
   */
  const checkTextViolation = useCallback(
    (text: string) => {
      // 检查金钱相关关键词
      for (const pattern of MONEY_PATTERNS) {
        if (pattern.test(text)) {
          console.warn(TAG, `${DETECTION_LOG} [文本检测] ⚠️ 检测到金钱意图违规: ${text}`);
          recordViolation(ViolationType.MONETIZATION_INTENT, "本地正则");
          return;
        }
      }

      // 检查 AI 相关关键词
      for (const pattern of AI_PATTERNS) {
        if (pattern.test(text)) {
          console.warn(TAG, `${DETECTION_LOG} [文本检测] ⚠️ 检测到 AI/机器人相关违规: ${text}`);
          recordViolation(ViolationType.NON_HUMAN_DISCLOSURE, "本地正则");
          return;
        }
      }
    },
    [recordViolation],
  );

  // ==================== 主要方法 ====================

  /**
   * 停止审核
   */
  const stopModeration = useCallback(() => {
    console.log(TAG, `${DETECTION_LOG} [停止审核] 停止所有检测`);

    // 设置停止标志
    isStoppedRef.current = true;

    // 清理定时器
    clearSilentTimer();

    // 隐藏 NoVoice 弹窗
    if (getCallStoreState().noVoiceVisible) {
      onVoiceSilent(false);
    }

    // 重置状态
    textHistoryRef.current = [];
    violationsRef.current = [];
    whichMinuteRef.current = 0;
    disableEarningRef.current = false;
  }, [clearSilentTimer, onVoiceSilent]);

  /**
   * 处理语音转文字
   */
  const handleTranscription = useCallback(
    (fromUserId: string, text: string, isEnd: boolean) => {
      // js-early-exit: 早期返回
      if (isStoppedRef.current) {
        console.log(TAG, `${DETECTION_LOG} [语音转文字] ⏭️ 管理器已停止，忽略转文字消息`);
        return;
      }

      console.log(TAG, `${DETECTION_LOG} [语音转文字] fromUserId=${fromUserId}, text="${text}", isEnd=${isEnd}`);

      const isSilent = !text || /^\s*$/.test(text);

      // 保存到历史记录
      if (isEnd) {
        const voice: VideoCallTranscriptContent = {
          userId: Number(fromUserId),
          parts: [{ text }],
        };
        textHistoryRef.current.push(voice);
        console.log(
          TAG,
          `${DETECTION_LOG} [语音转文字] 保存到历史记录, 当前历史数量: ${textHistoryRef.current.length}`,
        );
      }

      if (isSilent) {
        console.log(TAG, `${DETECTION_LOG} [语音转文字] ⚠️ 检测到静音`);
        // 静音时启动计时器
        if (!silentTimerRef.current) {
          startSilentLoop();
        }
      } else {
        // js-early-exit: 非目标用户的消息直接返回
        if (!isEnd || fromUserId !== remoteUserIdRef.current) {
          return;
        }

        console.log(TAG, `${DETECTION_LOG} [语音转文字] 收到目标用户消息: ${text}`);

        // 有说话内容时，隐藏 NoVoice 弹窗
        if (getCallStoreState().noVoiceVisible) {
          onVoiceSilent(false);
          console.log(TAG, `${DETECTION_LOG} [语音转文字] 检测到语音，隐藏 NoVoice 弹窗`);
        }

        // 清除旧的并重新开始倒计时
        clearSilentTimer();
        startSilentLoop();

        // 立即检查文本违规（本地正则检测）
        checkTextViolation(text);
      }
    },
    [checkTextViolation, clearSilentTimer, startSilentLoop, onVoiceSilent],
  );

  /**
   * 启动审核
   */
  const start = useCallback(
    (params: VoiceModerationStartParams) => {
      // js-early-exit: 如果已经在运行，先停止
      if (!isStoppedRef.current) {
        console.warn(TAG, `${DETECTION_LOG} [启动审核] 已有审核在运行，先停止旧的`);
        stopModeration();
      }

      console.log(TAG, `${DETECTION_LOG} [启动审核] 开始语音审核（本地正则检测模式）`);

      // 保存基础信息到 refs
      remoteUserIdRef.current = params.remoteUserId;
      roomIdRef.current = params.roomId;
      userIdRef.current = params.userId;
      callerRef.current = params.caller ?? "pwa";

      // 新通话（roomId 变化）时重置通话开始时间
      if (params.roomId !== lastRoomIdRef.current) {
        callBeginTimeRef.current = Date.now();
        lastRoomIdRef.current = params.roomId;
      }

      // 重置状态
      startTimeRef.current = Date.now();
      whichMinuteRef.current = 1;
      violationsRef.current = [];
      textHistoryRef.current = [];
      disableEarningRef.current = false;
      isStoppedRef.current = false;

      // 启动静音检测
      startSilentLoop();

      handleTranscription(params.fromUserId, params.text, params.isEnd);
    },
    [startSilentLoop, stopModeration, handleTranscription],
  );

  /**
   * 每分钟结束时调用
   */
  const onMinuteEnd = useCallback(() => {
    // js-early-exit: 早期返回
    if (isStoppedRef.current) {
      return;
    }

    console.log(TAG, `${DETECTION_LOG} [分钟结束] 第 ${whichMinuteRef.current} 分钟结束`);

    whichMinuteRef.current = whichMinuteRef.current + 1;

    // 重置状态
    violationsRef.current = [];
    disableEarningRef.current = false;

    // 重置 NoVoice 弹窗状态
    if (getCallStoreState().noVoiceVisible) {
      onVoiceSilent(false);
    }

    // 重启静音检测
    clearSilentTimer();
    startSilentLoop();
  }, [clearSilentTimer, startSilentLoop, onVoiceSilent]);

  /**
   * 获取选项数据
   */
  const getOptions = useCallback(() => {
    return getOptionsData();
  }, [getOptionsData]);

  // ==================== 返回 ====================

  return {
    start,
    handleTranscription,
    onMinuteEnd,
    stopModeration,
    getOptions,
  };
}

export default useVoiceModeration;

```
