---
title: useMockCallScheduler
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useMockCallScheduler.ts
---

# useMockCallScheduler

```ts
/**
 * Mock 视频任务调度 Hook
 * 负责根据提现阶段自动调度 mock 视频任务
 */

import { useCallback, useRef, useEffect } from "react";
import { eventBus, EventNames } from "@/utils/eventBus";
import { useCashout } from "@/hooks/useCashout";
import { checkVideoEarnDone } from "@/utils/cashoutUtils";
import { CashoutStage } from "@/types/cashout";
import mockCallManager from "@/utils/mockCallManager";
import { MockCallType } from "@/types/call";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

// ==================== 常量定义 ====================

// 定时器延迟配置（单位：毫秒）
export const TASK_DELAYS = {
  STAGE_TWO_MIN: 30000, // 第二阶段最小延迟：30秒
  STAGE_TWO_MAX: 90000, // 第二阶段最大延迟：90秒
  STAGE_THREE_IDLE: 3 * 60 * 1000, // 第三阶段空闲时间：3分钟
  CASHOUT_SUCCESS_TRIGGER: 1000, // 提现成功后触发延迟：1秒
} as const;

// 第二阶段完成要求
export const STAGE_TWO_REQUIREMENTS = {
  VIDEO_COUNT: 2, // 需要完成的视频数量
  TARGET_EARN: 2.1, // 目标收益（美元）
} as const;

// 第三阶段起始索引（StageThree 及以后）
const STAGE_THREE_INDEX = 2;

// ==================== 纯工具函数 ====================

/**
 * 生成随机延迟时间
 * @param min 最小延迟（毫秒）
 * @param max 最大延迟（毫秒）
 */
function randomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 判断阶段是否为第三阶段及以后
 */
function isStageThreePlus(stage: CashoutStage): boolean {
  const stages = Object.values(CashoutStage);
  return stages.indexOf(stage) >= STAGE_THREE_INDEX;
}

// ==================== Hook ====================

/**
 * Mock 视频任务调度 Hook
 */
export function useMockCallScheduler() {
  const { willCashoutStage } = useCashout();
  const isInitRef = useRef(false);
  // advanced-event-handler-refs: 用 ref 保持最新阶段值，供命令式回调读取
  const stageRef = useRef(willCashoutStage);
  stageRef.current = willCashoutStage;

  // rerender-use-ref-transient-values: 定时器引用
  const taskTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  /** 清除所有定时器 */
  const clearAllTimers = useCallback(() => {
    if (taskTimerRef.current) {
      clearTimeout(taskTimerRef.current);
      taskTimerRef.current = null;
    }
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  /**
   * 检查第二阶段任务是否完成
   * 条件：完成 2 个 mock 视频 + 收益达到 $2.1
   */
  const checkStageTwo = useCallback(async (): Promise<boolean> => {
    const count = Number(localStorage.getItem(STORAGE_KEYS.STAGE_TWO_MOCK_COUNT) || "0");
    if (count < STAGE_TWO_REQUIREMENTS.VIDEO_COUNT) return false;
    console.log("[MockTaskScheduler]", "checkStageTwo", await checkVideoEarnDone(CashoutStage.StageTwo));
    return await checkVideoEarnDone(CashoutStage.StageTwo);
  }, []);

  /** 启动下一个任务（通过 stageRef 读取最新阶段） */
  const startNextTask = useCallback(async () => {
    const stage = stageRef.current;
    const stageTwo = stage === CashoutStage.StageTwo;
    const stageThreePlusNow = isStageThreePlus(stage);

    // 启动新任务前 先清除上次的定时器（包括已经执行完 和 被中断的）
    clearAllTimers();

    console.log("[MockTaskScheduler] Starting next task", {
      willCashoutStage: stage,
      isStageTwo: stageTwo,
      isStageThreePlus: stageThreePlusNow,
    });

    // js-early-exit: 暂停时提前返回
    if (localStorage.getItem(STORAGE_KEYS.MOCK_TASK_PAUSED) === "true") {
      console.log("[MockTaskScheduler] Task is paused, skip");
      return;
    }

    // ==================== 第二阶段逻辑 ====================
    if (stageTwo) {
      // 快速本地判断：已完成则不再调度
      if (localStorage.getItem(STORAGE_KEYS.STAGE_TWO_MOCK_CALL_TASK_COMPLETED) === "true") {
        localStorage.setItem(STORAGE_KEYS.MOCK_TASK_RUNNING, "false");
        console.log("[MockTaskScheduler] Stage Two already completed (local flag), skip");
        return;
      }

      const isFinished = await checkStageTwo();
      if (isFinished) {
        localStorage.setItem(STORAGE_KEYS.MOCK_TASK_RUNNING, "false");
        localStorage.setItem(STORAGE_KEYS.STAGE_TWO_MOCK_CALL_TASK_COMPLETED, "true");
        console.log("[MockTaskScheduler] Stage Two completed");
        // handleTaskAction(TaskId.InstallApk);
        return;
      }

      const count = Number(localStorage.getItem(STORAGE_KEYS.STAGE_TWO_MOCK_COUNT) || "0");
      if (count >= STAGE_TWO_REQUIREMENTS.VIDEO_COUNT) {
        localStorage.setItem(STORAGE_KEYS.MOCK_TASK_RUNNING, "false");
        console.log("[MockTaskScheduler] Two videos completed, waiting for earn target");
        return;
      }

      // 二阶段：第一个视频 1.5，第二个 0.6
      const stagePrice = count === 0 ? 1.5 : 0.6;

      localStorage.setItem(STORAGE_KEYS.MOCK_TASK_RUNNING, "true");
      const delay = randomDelay(TASK_DELAYS.STAGE_TWO_MIN, TASK_DELAYS.STAGE_TWO_MAX);
      console.log(`[MockTaskScheduler] Stage Two: Scheduling in ${delay}ms, price: ${stagePrice}`);

      taskTimerRef.current = setTimeout(() => {
        mockCallManager.startMockCall(MockCallType.Normal, stagePrice);
      }, delay);
      return;
    }

    // ==================== 第三阶段及以后逻辑 ====================
    if (stageThreePlusNow) {
      localStorage.setItem(STORAGE_KEYS.MOCK_TASK_RUNNING, "false");

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }

      console.log("[MockTaskScheduler] Stage Three+: Starting 3-minute idle timer");
      idleTimerRef.current = setTimeout(() => {
        console.log("[MockTaskScheduler] Stage Three+: Idle timeout, triggering mock call");
        // 埋点：mock补贴任务触发
        bpTrack(EventName.pwa_mock_subsidy_trigger, {
          reason: "idle_timeout",
          duration: "3min",
          price_per_min: 0.6,
        });
        mockCallManager.startMockCall(MockCallType.Normal, 0.6);
      }, TASK_DELAYS.STAGE_THREE_IDLE);
    }
  }, [checkStageTwo, clearAllTimers]);

  /** 初始化任务（通过 stageRef 读取最新阶段） */
  const initTask = useCallback(async () => {
    if (isInitRef.current) {
      console.warn("[MockTaskScheduler] initTask called multiple times, ignoring");
      return;
    }
    isInitRef.current = true;

    const stage = stageRef.current;
    console.log("[MockTaskScheduler] Initializing task", { willCashoutStage: stage });

    clearAllTimers();

    const taskRunning = localStorage.getItem(STORAGE_KEYS.MOCK_TASK_RUNNING);

    // 第二阶段初始化
    if (stage === CashoutStage.StageTwo) {
      if (localStorage.getItem(STORAGE_KEYS.STAGE_TWO_MOCK_CALL_TASK_COMPLETED) === "true") {
        console.log("[MockTaskScheduler] Stage Two already completed, skip init");
        return;
      }

      const isFinished = await checkStageTwo();

      if (isFinished) {
        localStorage.setItem(STORAGE_KEYS.STAGE_TWO_MOCK_CALL_TASK_COMPLETED, "true");
        console.log("[MockTaskScheduler] Stage Two completed at init, skip");
        return;
      }

      if (taskRunning === "true" || !isFinished) {
        console.log("[MockTaskScheduler] Stage Two: Starting task");
        startNextTask();
      }
      return;
    }

    // 第三阶段及以后初始化
    if (isStageThreePlus(stage)) {
      console.log("[MockTaskScheduler] Stage Three+: Starting task");
      startNextTask();
    }
  }, [clearAllTimers, checkStageTwo, startNextTask]);

  /** 暂停任务 */
  const pauseTask = useCallback(() => {
    console.log("[MockTaskScheduler] Pausing task");
    localStorage.setItem(STORAGE_KEYS.MOCK_TASK_PAUSED, "true");
    clearAllTimers();
  }, [clearAllTimers]);

  /** 恢复任务 */
  const resumeTask = useCallback(async () => {
    console.log("[MockTaskScheduler] Resuming task");
    localStorage.removeItem(STORAGE_KEYS.MOCK_TASK_PAUSED);
    await startNextTask();
  }, [startNextTask]);

  // ==================== 事件监听 ====================

  // advanced-event-handler-refs: 一次性注册，通过 ref 访问最新回调和阶段
  useEffect(() => {
    /** 提现第二阶段成功事件处理 */
    const handleCashoutSuccess = () => {
      const stage = stageRef.current;
      console.log("[MockTaskScheduler] Cashout success event received", {
        isStageTwo: stage === CashoutStage.StageTwo,
        isStageThreePlus: isStageThreePlus(stage),
      });

      // 第二阶段：立即触发第一次 mock（Guide 模式，先展示引导）
      if (stage === CashoutStage.StageTwo) {
        setTimeout(() => {
          mockCallManager.startMockCall(MockCallType.Guide, 1.5);
        }, TASK_DELAYS.CASHOUT_SUCCESS_TRIGGER);
      }
    };

    /** Mock 视频有效完成 */
    const handleMockCallPassed = () => {
      console.log("[MockTaskScheduler] Mock video completed (qualified)");
      if (stageRef.current === CashoutStage.StageTwo) {
        const currentCount = Number(localStorage.getItem(STORAGE_KEYS.STAGE_TWO_MOCK_COUNT) || "0");
        localStorage.setItem(STORAGE_KEYS.STAGE_TWO_MOCK_COUNT, String(currentCount + 1));
        console.log("[MockTaskScheduler] Stage Two count incremented to:", currentCount + 1);
      }
    };

    /** Mock 视频处理完毕或被取消 → 调度下一个任务 */
    const handleMockProcessed = () => {
      console.log("[MockTaskScheduler] Mock video processed or canceled, scheduling next task");
      startNextTask();
    };

    eventBus.on(EventNames.CASHOUT_SUCCESS, handleCashoutSuccess);
    eventBus.on(EventNames.MOCK_CALL_PROCESSED, handleMockProcessed);
    eventBus.on(EventNames.MOCK_CALL_CANCELED, handleMockProcessed);
    eventBus.on(EventNames.MOCK_CALL_PASSED, handleMockCallPassed);

    return () => {
      eventBus.off(EventNames.CASHOUT_SUCCESS, handleCashoutSuccess);
      eventBus.off(EventNames.MOCK_CALL_PROCESSED, handleMockProcessed);
      eventBus.off(EventNames.MOCK_CALL_CANCELED, handleMockProcessed);
      eventBus.off(EventNames.MOCK_CALL_PASSED, handleMockCallPassed);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 组件卸载时清除定时器
  useEffect(() => clearAllTimers, [clearAllTimers]);

  return {
    initTask,
    startNextTask,
    pauseTask,
    resumeTask,
    checkStageTwo,
  };
}

```
