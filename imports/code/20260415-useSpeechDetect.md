---
title: useSpeechDetect
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useSpeechDetect.ts
---

# useSpeechDetect

```ts
/**
 * 语音检测 Hook
 * 通过麦克风音频流检测用户是否说过话
 *
 * 使用 AudioContext + AnalyserNode 分析音频频率数据，
 * 当音量超过阈值时判定为"说话"。
 */

import { useCallback, useRef } from "react";

const TAG = "useSpeechDetect";

/** 音量阈值：频率数据平均值超过此值判定为说话 */
const VOLUME_THRESHOLD = 30;

/** 检测间隔（毫秒） */
const DETECT_INTERVAL = 500;

interface UseSpeechDetectReturn {
  /** 开始语音检测（获取麦克风并分析音频） */
  start: () => Promise<void>;
  /** 停止语音检测并释放资源 */
  stop: () => void;
  /** 获取用户是否说过话 */
  getHasSpoken: () => boolean;
}

export const useSpeechDetect = (): UseSpeechDetectReturn => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const hasSpokenRef = useRef(false);

  /**
   * 开始语音检测
   */
  const start = useCallback(async () => {
    console.log(TAG, "Starting speech detection...");
    // 防止重复启动
    if (audioContextRef.current) {
      console.warn(TAG, "Already started");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      hasSpokenRef.current = false;

      // 定时检测音量
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let detectCount = 0;
      timerRef.current = window.setInterval(() => {
        if (!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, v) => sum + v, 0) / dataArray.length;
        const max = Math.max(...dataArray);
        detectCount++;

        // 每 10 次（约 5 秒）输出一次采样日志
        if (detectCount % 10 === 1) {
          console.log(TAG, `[sample #${detectCount}] avg=${average.toFixed(1)}, max=${max}, threshold=${VOLUME_THRESHOLD}, hasSpoken=${hasSpokenRef.current}, audioState=${audioContext.state}`);
        }

        if (average > VOLUME_THRESHOLD) {
          if (!hasSpokenRef.current) {
            console.log(TAG, `Speech detected! avg=${average.toFixed(1)}, max=${max}, at sample #${detectCount}`);
          }
          hasSpokenRef.current = true;
        }
      }, DETECT_INTERVAL);

      console.log(TAG, "Speech detection started");
    } catch (error) {
      console.error(TAG, "Failed to start speech detection:", error);
    }
  }, []);

  /**
   * 停止语音检测并释放资源
   */
  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    console.log(TAG, "Speech detection stopped, hasSpoken:", hasSpokenRef.current);
  }, []);

  /**
   * 获取用户是否说过话
   */
  const getHasSpoken = useCallback(() => {
    return hasSpokenRef.current;
  }, []);

  return { start, stop, getHasSpoken };
};

export default useSpeechDetect;

```
