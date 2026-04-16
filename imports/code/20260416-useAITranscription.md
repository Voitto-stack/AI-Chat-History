---
title: useAITranscription
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useAITranscription.ts
---

# useAITranscription

```ts
/**
 * AI 语音转文字 Hook
 * AI Transcription Hook for Voice-to-Text
 *
 * 应用的 Vercel React Best Practices:
 * - rerender-functional-setstate: 使用 useCallback 创建稳定的函数引用
 * - js-early-exit: 早期返回优化
 * - async-defer-await: 延迟 await 到真正需要的地方
 * - rerender-use-ref-transient-values: 使用 ref 存储瞬态值
 */

import { useCallback, useRef, useState } from "react";
import {
  StartAITranscriptionRequest,
  StartAITranscriptionResponse,
  StopAITranscriptionRequest,
  StopAITranscriptionResponse,
} from "@heyhru/business-pwa-proto/gen/archat_api/data_bridge_api";
import httpClient from "@/http/httpClient";

const TAG = "useAITranscription";

/**
 * Hook 返回值接口
 */
export interface UseAITranscriptionReturn {
  /** 当前任务 ID */
  voiceTaskId: string;
  /** 是否正在转录 */
  isTranscribing: boolean;
  /** 启动 AI 转录 */
  start: (roomId: string) => Promise<boolean>;
  /** 停止 AI 转录 */
  stop: () => Promise<void>;
}

/**
 * AI 语音转文字 Hook 后端上传腾讯云
 */
export function useAITranscription(): UseAITranscriptionReturn {
  // rerender-use-ref-transient-values: 使用 ref 存储瞬态值，避免不必要的重渲染
  const voiceTaskIdRef = useRef<string>("");

  // 使用 state 存储需要触发 UI 更新的值
  const [voiceTaskId, setVoiceTaskId] = useState<string>("");
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);

  /**
   * rerender-functional-setstate: 使用 useCallback 创建稳定的函数引用
   * 启动 AI 语音转文字服务
   *
   * @param roomId - 房间 ID
   * @returns 是否成功启动
   */
  const start = useCallback(async (roomId: string): Promise<boolean> => {
    // js-early-exit: 如果已经在转录中，直接返回
    if (voiceTaskIdRef.current) {
      console.log(TAG, "Transcription already running, taskId:", voiceTaskIdRef.current);
      return false;
    }

    // js-early-exit: 如果没有提供 roomId，直接返回
    if (!roomId) {
      console.warn(TAG, "Room ID is required to start transcription");
      return false;
    }

    try {
      console.log(TAG, "Starting AI transcription for room:", roomId);

      // async-defer-await: 延迟 await 到真正需要的地方
      const dataPromise = await httpClient.requestPost2(
        StartAITranscriptionRequest,
        { roomId, roomIdType: 0 },
        StartAITranscriptionResponse,
      );

      // 先设置转录中状态
      setIsTranscribing(true);

      // 等待请求结果
      const data = await dataPromise;

      // js-early-exit: 如果请求失败，直接返回
      if (data.code !== 1) {
        console.warn(TAG, "Failed to start AI transcription, code:", data.code);
        setIsTranscribing(false);
        return false;
      }

      // 更新任务 ID
      const taskId = data.taskId || "";
      voiceTaskIdRef.current = taskId;
      setVoiceTaskId(taskId);

      console.log(TAG, "AI transcription started, taskId:", taskId);
      return true;
    } catch (err) {
      console.error(TAG, "Error starting AI transcription:", err);
      setIsTranscribing(false);
      return false;
    }
  }, []);

  /**
   * 停止 AI 语音转文字服务
   */
  const stop = useCallback(async (): Promise<void> => {
    // js-early-exit: 如果没有活跃的任务，直接返回
    if (!voiceTaskIdRef.current) {
      console.log(TAG, "No active voice task to stop");
      return;
    }

    const taskId = voiceTaskIdRef.current;

    try {
      console.log(TAG, "Stopping AI transcription, taskId:", taskId);

      // async-defer-await: 延迟 await 到真正需要的地方
      const stopPromise = await httpClient.requestPost2(
        StopAITranscriptionRequest,
        { taskId },
        StopAITranscriptionResponse,
      );

      // 先重置状态（乐观更新）
      voiceTaskIdRef.current = "";
      setVoiceTaskId("");
      setIsTranscribing(false);

      // 等待请求完成
      await stopPromise;

      console.log(TAG, "AI transcription stopped successfully");
    } catch (err) {
      console.error(TAG, "Error stopping AI transcription:", err);
      // 即使出错也保持状态重置，避免状态不一致
    }
  }, []);

  return {
    voiceTaskId,
    isTranscribing,
    start,
    stop,
  };
}

```
