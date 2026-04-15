---
title: useTaskAutoCompletion
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: useTaskAutoCompletion.ts
---

# useTaskAutoCompletion

```ts
/**
 * 任务自动完成监听器 Hook
 * 统一管理所有自动完成任务的监听逻辑
 *
 * 包含：
 * 1. Cashout 任务监听：监听收益和通话时长，自动完成相关任务
 * 2. Google 登录任务监听：监听 Google 登录成功事件，自动完成关联任务
 * 3. 阶段自动更新：监听阶段完成情况，自动更新阶段并显示提现弹窗
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
import { showCashoutModal } from "@/components/showCashoutModal";
import { reportPwaWithdrawPhase } from "@/http/cashoutApi";

export function useTaskAutoCompletion() {
  const { finishTask } = useTask();
  const { tasks, getTask } = useTaskStore();
  const { cash } = useUserStore();
  const { videoCallTotalSeconds, currentTaskStage, withdrawList } = useCashoutStore();
  const { willCashoutStage, getStageProgress, finishCurrentTaskStage } = useCashout();
  const callState = useCallStore((s) => s.callState);

  // 记录上一次的 readyForCashout 状态，用于检测边缘变化（false → true）
  const prevReadyForCashoutRef = useRef(false);

  // 标记是否已完成初始化（防止页面加载时，如果已经满足条件也会误触发弹窗）
  const isInitializedRef = useRef(false);

  // 通话中满足提现条件时，暂存弹窗参数，等通话结束后再弹出
  const pendingCashoutRef = useRef<{ amount: string } | null>(null);

  // 获取当前阶段的任务状态（只监听当前阶段的任务，而不是所有任务）
  const currentStageTasks = useMemo(() => {
    const taskIds = stageTaskIdsMap[currentTaskStage] || [];
    return taskIds.map((taskId) => ({
      taskId,
      status: tasks.get(taskId)?.status,
    }));
  }, [currentTaskStage, tasks]);

  // ==================== 1. Cashout 任务监听 ====================

  // 收益任务配置
  // 只有最后阶段（StageSeven）循环时才需要 withdrawCount，前面阶段不会超出首轮
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
        // 检查当前阶段及之前未完成阶段的收益任务（防止阶段推进后遗漏之前的收益任务）
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

  // ==================== 2. Google 登录任务监听 ====================

  useEffect(() => {
    if (tasks.size === 0) return;
    const handleGoogleAuthSuccess = () => {
      finishTask(TaskId.LinkGoogleAccount);
    };

    eventBus.on(EventNames.GOOGLE_AUTH_SUCCESS, handleGoogleAuthSuccess);

    return () => {
      eventBus.off(EventNames.GOOGLE_AUTH_SUCCESS, handleGoogleAuthSuccess);
    };
  }, [tasks, finishTask]);

  // ==================== 3. 阶段自动更新监听 ====================

  // 判断当前是否在通话中（包含来电、接听、连接等非空闲状态）
  const isInCall = callState !== CallState.Idle;

  // 弹出提现弹窗（如果在通话中则暂存，等通话结束后弹出）
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
    // 获取 currentTaskStage 的完成情况
    const currentStageProgress = getStageProgress(currentTaskStage);
    const currentReady = currentStageProgress.readyForCashout;

    // 检测边缘变化：从 false → true（只在条件从不满足变为满足时触发）
    const shouldTrigger = currentReady && !prevReadyForCashoutRef.current;

    // 更新上一次的状态
    prevReadyForCashoutRef.current = currentReady;

    // 第一次初始化时的处理
    const isFirstInit = !isInitializedRef.current;
    if (isFirstInit) {
      isInitializedRef.current = true;
      // willCashoutStage 仍在第一阶段 = 用户还没提现过，检查第一阶段是否已满足条件
      if (willCashoutStage === CashoutStage.StageOne) {
        const stageOneProgress = getStageProgress(CashoutStage.StageOne);
        if (stageOneProgress.readyForCashout) {
          triggerCashoutModal(stageOneProgress.stageAmount.toFixed(2), "StageOne init");
          // 如果 currentTaskStage 还在第一阶段，推进到下一阶段
          if (currentTaskStage === CashoutStage.StageOne) {
            finishCurrentTaskStage();
            reportPwaWithdrawPhase(getStageIndex(currentTaskStage) + 1);
          }
          return;
        }
        return;
      }
      // 非第一阶段：不提前返回，fall through 到正常的触发逻辑
      // 修复：APK 首次打开时，如果当前阶段任务已全部完成（如 InstallApk 自动完成），
      // 提现弹窗仍然可以正常触发，不会被 init guard 吞掉
    }

    if (!shouldTrigger) {
      return;
    }

    // 弹窗应显示最前面还没提现的阶段（willCashoutStage），而不是当前任务阶段
    const willCashoutProgress = getStageProgress(willCashoutStage);

    // 启动提现流程（通话中会延迟到通话结束后弹出）
    triggerCashoutModal(willCashoutProgress.stageAmount.toFixed(2), "stage complete");

    // 更新 currentTaskStage 到下一阶段
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

  // 阶段变化时，重置 readyForCashout 状态和初始化标记（允许新阶段重新触发）
  useEffect(() => {
    prevReadyForCashoutRef.current = false;
    isInitializedRef.current = false;
  }, [currentTaskStage]);
}

```
