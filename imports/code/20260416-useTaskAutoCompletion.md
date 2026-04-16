---
title: useTaskAutoCompletion
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useTaskAutoCompletion.ts
---

# useTaskAutoCompletion

```ts
/**
 * 统一管理所有任务自动完成的监听逻辑：
 * 1. 收益/通话时长任务自动完成
 * 2. 阶段完成后自动弹出提现弹窗
 */

import { useEffect, useRef, useMemo, useCallback } from "react";
import { useTask } from "@/hooks/useTask";
import { useTaskStore } from "@/stores/taskStore";
import { useUserStore } from "@/stores/userStore";
import { useCashoutStore } from "@/stores/cashoutStore";
import { useCallStore } from "@/stores/callStore";
import { useCashout } from "@/hooks/useCashout";
import { TaskId, TaskStatus } from "@/types/task";
import { CallState } from "@/types/call";
import { CashoutStage, stageTaskIdsMap, stageTaskLimitMap } from "@/types/cashout";
import { checkVideoEarnDone, checkTotalEarnDone, getStageIndex } from "@/utils/cashoutUtils";
import { eventBus, EventNames } from "@/utils/eventBus";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";
import { showCashoutModal } from "@/components/showCashoutModal";
import { reportPwaWithdrawPhase } from "@/http/cashoutApi";

export function useTaskAutoCompletion() {
  const { finishTask } = useTask();
  const { tasks, getTask } = useTaskStore();
  const { cash } = useUserStore();
  const { videoCallTotalSeconds, currentTaskStage, withdrawList } = useCashoutStore();
  const { willCashoutStage, getStageProgress, finishCurrentTaskStage } = useCashout();
  const callState = useCallStore((s) => s.callState);

  // 上一次 readyForCashout 状态，用于检测 false → true 边缘变化
  const prevReadyForCashoutRef = useRef(false);

  // 初始化守卫：只在组件挂载后第一次数据加载时生效，之后常驻 true
  const isInitializedRef = useRef(false);

  // 通话中满足提现条件时暂存弹窗参数，通话结束后再弹
  const pendingCashoutRef = useRef<{ amount: string } | null>(null);

  // 当前阶段的任务列表（只监听当前阶段，变化时触发弹窗检测）
  const currentStageTasks = useMemo(() => {
    const taskIds = stageTaskIdsMap[currentTaskStage] || [];
    return taskIds.map((taskId) => ({
      taskId,
      status: tasks.get(taskId)?.status,
    }));
  }, [currentTaskStage, tasks]);

  // ==================== 1. 收益 / 通话时长任务自动完成 ====================

  // StageSeven 循环时需要 withdrawCount；其他阶段不超出首轮，无需传入
  const earnTaskConfig = useMemo(
    () => [
      {
        stage: CashoutStage.StageTwo,
        taskId: TaskId.SecondEarn,
        checkFn: () => checkVideoEarnDone(CashoutStage.StageTwo),
      },
      {
        stage: CashoutStage.StageThree,
        taskId: TaskId.ThirdEarn,
        checkFn: () => checkTotalEarnDone(CashoutStage.StageThree),
      },
      {
        stage: CashoutStage.StageFour,
        taskId: TaskId.FourthEarn,
        checkFn: () => checkTotalEarnDone(CashoutStage.StageFour),
      },
      {
        stage: CashoutStage.StageFive,
        taskId: TaskId.FifthEarn,
        checkFn: () => checkTotalEarnDone(CashoutStage.StageFive),
      },
      {
        stage: CashoutStage.StageSix,
        taskId: TaskId.SixthEarn,
        checkFn: () => checkTotalEarnDone(CashoutStage.StageSix),
      },
      {
        stage: CashoutStage.StageSeven,
        taskId: TaskId.SeventhEarn,
        checkFn: () => checkTotalEarnDone(CashoutStage.StageSeven, withdrawList.length),
      },
    ],
    [withdrawList.length],
  );

  // 监听余额变化，自动完成收益任务
  useEffect(() => {
    if (tasks.size === 0) return;

    const checkAndFinishEarnTasks = async () => {
      for (const { stage, taskId, checkFn } of earnTaskConfig) {
        // 检查当前阶段及之前未完成的收益任务，防止阶段推进后遗漏
        if (getStageIndex(stage) <= getStageIndex(currentTaskStage)) {
          const task = getTask(taskId);
          if (task && task.status !== TaskStatus.finish) {
            const earnOk = await checkFn();
            if (earnOk) {
              await finishTask(taskId);
            }
          }
        }
      }
    };

    checkAndFinishEarnTasks();
  }, [cash, currentTaskStage, tasks, getTask, finishTask, earnTaskConfig]);

  // 视频通话时长任务配置（从 stageTaskLimitMap 动态生成）
  const videoDurationTaskConfig = useMemo(() => {
    const taskMapping: Partial<Record<CashoutStage, TaskId>> = {
      [CashoutStage.StageFour]: TaskId.FourthVideoDuration,
      [CashoutStage.StageFive]: TaskId.FifthVideoDuration,
      [CashoutStage.StageSix]: TaskId.SixthVideoDuration,
      [CashoutStage.StageSeven]: TaskId.SeventhVideoDuration,
    };

    return Object.entries(stageTaskLimitMap)
      .filter(([, limit]) => limit.duration !== undefined)
      .map(([stage, limit]) => ({
        stage: stage as CashoutStage,
        taskId: taskMapping[stage as CashoutStage]!,
        requiredMinutes: limit.duration!,
      }));
  }, []);

  // 监听通话时长变化，自动完成通话时长任务
  useEffect(() => {
    if (videoCallTotalSeconds === 0 || tasks.size === 0) return;

    const checkAndFinishVideoDurationTasks = async () => {
      const videoMinutes = videoCallTotalSeconds / 60;

      for (const { stage, taskId, requiredMinutes } of videoDurationTaskConfig) {
        if (currentTaskStage === stage && videoMinutes >= requiredMinutes) {
          const task = getTask(taskId);
          if (task && task.status !== TaskStatus.finish) {
            await finishTask(taskId);
          }
        }
      }
    };

    checkAndFinishVideoDurationTasks();
  }, [videoCallTotalSeconds, currentTaskStage, tasks, getTask, finishTask, videoDurationTaskConfig]);

  // ==================== 2. 阶段完成后弹出提现弹窗 ====================

  const isInCall = callState !== CallState.Idle;

  // 通话中则暂存，通话结束后弹出
  const triggerCashoutModal = useCallback(
    (amount: string, logLabel: string) => {
      if (isInCall) {
        pendingCashoutRef.current = { amount };
        console.log(`[useTaskAutoCompletion] In call, deferring cashout modal (${logLabel})`);
        return;
      }
      pendingCashoutRef.current = null;
      showCashoutModal({
        amount,
        onConfirm: () => {
          console.log(`[useTaskAutoCompletion] Cashout flow finished (${logLabel})`);
        },
      });
    },
    [isInCall],
  );

  // 监听通话结束事件，弹出暂存的提现弹窗
  useEffect(() => {
    const handleCallEnd = () => {
      const pending = pendingCashoutRef.current;
      if (pending) {
        pendingCashoutRef.current = null;
        showCashoutModal({
          amount: pending.amount,
          onConfirm: () => {
            console.log("[useTaskAutoCompletion] Cashout flow finished (after call ended)");
          },
        });
      }
    };

    eventBus.on(EventNames.CALL_ENDED, handleCallEnd);
    eventBus.on(EventNames.NATIVE_CALL_END, handleCallEnd);
    eventBus.on(EventNames.MOCK_CALL_ENDED, handleCallEnd);

    return () => {
      eventBus.off(EventNames.CALL_ENDED, handleCallEnd);
      eventBus.off(EventNames.NATIVE_CALL_END, handleCallEnd);
      eventBus.off(EventNames.MOCK_CALL_ENDED, handleCallEnd);
    };
  }, []);

  // 监听当前阶段完成情况，自动更新阶段并显示提现弹窗
  useEffect(() => {
    const currentReady = getStageProgress(currentTaskStage).readyForCashout;

    // 只在 false → true 时触发
    const shouldTrigger = currentReady && !prevReadyForCashoutRef.current;
    prevReadyForCashoutRef.current = currentReady;

    // 初始化守卫：首次数据加载时运行一次
    const isFirstInit = !isInitializedRef.current;
    if (isFirstInit) {
      isInitializedRef.current = true;
      // 第一笔未提现：每次启动都弹，且不可关闭
      if (willCashoutStage === CashoutStage.StageOne) {
        const stageOneProgress = getStageProgress(CashoutStage.StageOne);
        if (stageOneProgress.readyForCashout) {
          bpTrack(EventName.pwa_onboarding_50_cents_earned_toast_show);
          triggerCashoutModal(stageOneProgress.stageAmount.toFixed(2), "StageOne init");
          if (currentTaskStage === CashoutStage.StageOne) {
            finishCurrentTaskStage();
            reportPwaWithdrawPhase(getStageIndex(currentTaskStage) + 1);
          }
          return;
        }
        return;
      }
      // 非第一笔：popup 触发时会调用 finishCurrentTaskStage() 推进 currentTaskStage
      // currentTaskStage > willCashoutStage → 上次已弹过，不重复弹
      // currentTaskStage === willCashoutStage → 未弹过（如任务刚完成就关了 app），允许弹
      if (getStageIndex(currentTaskStage) > getStageIndex(willCashoutStage)) {
        return;
      }
    }

    if (!shouldTrigger) {
      return;
    }

    // 弹窗显示最早未提现的阶段（willCashoutStage），而非当前任务阶段
    triggerCashoutModal(getStageProgress(willCashoutStage).stageAmount.toFixed(2), "stage complete");
    finishCurrentTaskStage();
    reportPwaWithdrawPhase(getStageIndex(currentTaskStage) + 1);
  }, [
    currentStageTasks,
    cash,
    currentTaskStage,
    willCashoutStage,
    getStageProgress,
    finishCurrentTaskStage,
    triggerCashoutModal,
  ]);

  // currentTaskStage 变化时重置，让新阶段能重新检测 false → true
  // isInitializedRef 不重置，init 守卫只在挂载后首次数据加载时生效
  useEffect(() => {
    prevReadyForCashoutRef.current = false;
  }, [currentTaskStage]);
}

```
