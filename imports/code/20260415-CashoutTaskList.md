---
title: CashoutTaskList
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: CashoutTaskList.tsx
---

# CashoutTaskList

```tsx
/**
 * Cashout 任务列表组件
 * 显示提现任务清单
 */

import { FC, useMemo, useState, useLayoutEffect, useCallback } from "react";
import { useTask } from "@/hooks/useTask";
import { useCashout } from "@/hooks/useCashout";
import { TaskId, ITask, TaskStatus } from "@/types/task";
import { CashoutStage, stageAmountMap, stageTaskIdsMap } from "@/types/cashout";
import { CashoutTaskCard } from "./CashoutTaskCard";
import Skeleton from "@/components/Skeleton";
import bgInitialTask from "@/assets/images/task/bg_initial_task.webp";
import bgTipTriangle from "@/assets/images/task/bg_tip_triangle.svg";

// 任务配置
const TASK_CONFIG: Partial<Record<TaskId, { title: string; buttonText: "Claim" | "Go" }>> = {
  // StageOne
  [TaskId.Register]: { title: "On boarding 0.5$", buttonText: "Claim" },

  // StageTwo
  [TaskId.CameraPermission]: { title: "Allow Camera Access on apk", buttonText: "Claim" },
  [TaskId.MicrophonePermission]: { title: "Allow Microphone Access on apk", buttonText: "Claim" },
  [TaskId.SecondEarn]: { title: "Earn $2.1 from video calls", buttonText: "Go" },
  [TaskId.FaceVerify]: { title: "Verify your avatar $0.9", buttonText: "Claim" },
  [TaskId.InstallApk]: { title: "Install Apk $1", buttonText: "Claim" },

  // StageThree
  [TaskId.ThirdEarn]: { title: "Earn at least 7$ from video calls or exchange lG order", buttonText: "Go" },
  [TaskId.BindInsAccount]: { title: "Authorize Instagram 3 $", buttonText: "Go" },
  [TaskId.LocationPermission]: { title: "Authorize Location Access", buttonText: "Claim" },

  // StageFour
  [TaskId.FourthEarn]: { title: "Earn at least 10$ from video calls or exchange lG order", buttonText: "Go" },
  [TaskId.FourthVideoDuration]: { title: "At least video calls 2min", buttonText: "Go" },

  // StageFive
  [TaskId.FifthEarn]: { title: "Earn at least 20$ from video calls or exchange lG order", buttonText: "Go" },
  [TaskId.FifthVideoDuration]: { title: "At least video calls 5min", buttonText: "Go" },

  // StageSix
  [TaskId.SixthEarn]: { title: "Earn at least 40$ from video calls or exchange lG order", buttonText: "Go" },
  [TaskId.SixthVideoDuration]: { title: "At least video calls 10min", buttonText: "Go" },

  // StageSeven
  [TaskId.SeventhEarn]: { title: "Earn at least 45$ from video calls or exchange lG order", buttonText: "Go" },
  [TaskId.SeventhVideoDuration]: { title: "At least video calls 10min", buttonText: "Go" },
};

export const CashoutTaskList: FC = () => {
  const { tasks, handleTaskAction } = useTask();
  const { currentTaskStage } = useCashout();
  const [tipTop, setTipTop] = useState<number | undefined>(undefined);
  const [tipRight, setTipRight] = useState<number | undefined>(undefined);
  const [showTip, setShowTip] = useState<boolean>(false);

  // 获取当前阶段的目标金额
  const targetAmount = stageAmountMap[currentTaskStage];

  // 过滤并映射任务
  const displayTasks = useMemo(() => {
    const currentStageTaskIds = stageTaskIdsMap[currentTaskStage] || [];
    return currentStageTaskIds.reduce(
      (acc, taskId) => {
        const task = tasks.get(taskId);
        if (task) {
          const config = TASK_CONFIG[taskId];
          acc.push({
            task,
            title: config?.title || `Task ${taskId}`,
            buttonText: config?.buttonText || "Claim",
          });
        }
        return acc;
      },
      [] as Array<{ task: ITask; title: string; buttonText: "Claim" | "Go" }>,
    );
  }, [tasks, currentTaskStage]);

  // 包装 handleTaskAction，点击任务时隐藏提示
  const handleTaskClick = useCallback(
    (taskId: TaskId) => {
      setTipTop(undefined);
      return handleTaskAction(taskId);
    },
    [handleTaskAction],
  );

  // 计算提示位置
  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      // 找到第一个未完成任务的按钮
      const uncheckBtn = document.querySelector(".cashout-task-item-btn") as HTMLElement;

      if (uncheckBtn) {
        const top = uncheckBtn.offsetTop + uncheckBtn.offsetHeight + 10;
        const btnRect = uncheckBtn.getBoundingClientRect();

        // 获取父容器，计算相对于父容器的 right 值
        const parentElement = uncheckBtn.closest(".relative") as HTMLElement;
        const parentRect = parentElement.getBoundingClientRect();
        const right = parentRect.right - btnRect.right;

        setTipRight(right);
        setTipTop(top);
        setShowTip(true);
      } else {
        setShowTip(false);
      }
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [tasks, displayTasks]);

  return (
    <div
      className="relative flex flex-col mb-[14px] p-[29px_16px_19px_16px] rounded-[20px] bg-cover bg-no-repeat font-[Pangram]"
      style={{
        backgroundImage: `url(${bgInitialTask})`,
      }}
    >
      {/* 标题 */}
      <h2 className="m-0 text-white font-black text-[30px] leading-[28px] font-[Pangram]">
        {currentTaskStage === CashoutStage.StageOne ? "Welcome Checklist" : "Earn your next cashout"}
      </h2>

      {/* 描述 */}
      <p className="mt-[9px] mb-0 text-white font-normal text-[15px] leading-[20px] font-[Pangram]">
        {currentTaskStage === CashoutStage.StageOne ? "Complete tasks to get" : "First cash out"}
        <span className="text-[#f7fe20] font-normal text-[15px] leading-[20px]">${targetAmount.toFixed(2)}</span> in a
        few minutes
      </p>

      {/* 任务列表 */}
      <div className="flex flex-col mt-[18px] gap-2">
        {displayTasks.length === 0
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-1.5 w-full h-[67px] px-3 rounded-[18px] bg-white">
                <Skeleton.Circle size={16} />
                <Skeleton.Line width="55%" />
                <Skeleton.Box width={56} height={27} rounded="rounded-[36px]" />
              </div>
            ))
          : displayTasks.map((item) => {
              // InstallApk 任务在 StageTwo 且 SecondEarn 未完成时禁用
              const isDisabled =
                currentTaskStage === CashoutStage.StageTwo &&
                item.task.id === TaskId.InstallApk &&
                displayTasks.find((t) => t.task.id === TaskId.SecondEarn)?.task.status !== TaskStatus.finish;

              return (
                <CashoutTaskCard
                  key={item.task.id}
                  task={item.task}
                  title={item.title}
                  buttonText={item.buttonText}
                  onClick={handleTaskClick}
                  disabled={isDisabled}
                />
              );
            })}
      </div>

      {/* 气泡提示 */}
      {showTip && tipTop !== undefined && <CashoutTaskTip top={tipTop} right={tipRight} />}
    </div>
  );
};

// 气泡提示组件
const CashoutTaskTip: FC<{ top: number; right?: number }> = ({ top, right }) => {
  return (
    <div
      className="flex absolute flex-col justify-center"
      style={{
        top: `${top}px`,
        right: right !== undefined ? `${right}px` : undefined,
        animation: "floatingTip 1.5s ease-in-out infinite",
      }}
    >
      <img src={bgTipTriangle} alt="" className="self-end w-[11px] h-[8px] mr-[20px] -mb-[1px]" />
      <span className="p-[10px_8px] rounded-[8px] bg-[#ffaf4c] text-white font-normal text-[14px] leading-[20px] font-[SF_Pro]">
        Click here to claim your cash
      </span>
      <style>
        {`
          @keyframes floatingTip {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
          }
        `}
      </style>
    </div>
  );
};

```
