---
title: OnboardingTaskList
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: OnboardingTaskList.tsx
---

# OnboardingTaskList

```tsx
/**
 * Onboarding任务列表组件
 */

import { FC, useMemo } from "react";
import { useTask } from "@/hooks/useTask";
import { TaskId, ITask, TaskStatus } from "@/types/task";
import { formatReward, formatTime } from "@/utils/format";

// 导入图片资源
import icArrow from "@/assets/images/earnings/ic_onboarding_task_arrow.svg";
import icClock from "@/assets/images/earnings/ic_onboarding_task_cost_time.svg";
import icTaskLogo from "@/assets/images/earnings/ic_onboarding_task_logo.svg";
import dollarBgYellow from "@/assets/images/earnings/ic_task_dollar_bg_yellow.svg";
import dollarBgPink from "@/assets/images/earnings/ic_task_dollar_bg_pink.svg";
import dollarBgPurple from "@/assets/images/earnings/ic_task_dollar_bg_purple.svg";
import dollarBgBlue from "@/assets/images/earnings/ic_task_dollar_bg_blue.svg";

// 任务主题配置（按索引顺序：黄色、粉色、紫色、蓝色）
const TASK_THEMES = [
  { color: "bg-[#FFCF01]", dollarBg: dollarBgYellow },
  { color: "bg-[#FF85C8]", dollarBg: dollarBgPink },
  { color: "bg-[#B77EFF]", dollarBg: dollarBgPurple },
  { color: "bg-[#65bfff]", dollarBg: dollarBgBlue },
] as const;

// Onboarding 任务配置
const ONBOARDING_TASKS = [
  { id: TaskId.BindInsAccount, title: "Authorize Instagram" },
  { id: TaskId.CompleteProfile, title: "Complete Profile" },
  { id: TaskId.RecordFirstVoiceMessage, title: "Scenario 1 Record A Voice Greeting" },
  { id: TaskId.NotificationPermission, title: "Enable Notifications" },
  { id: TaskId.RecordSecondVoiceMessage, title: "Scenario 2 Record A Voice Greeting" },
  { id: TaskId.RecordThirdVoiceMessage, title: "Scenario 3 Record A Voice Greeting" },
  { id: TaskId.RecordForthVoiceMessage, title: "Scenario 4 Record A Voice Greeting" },
] as const;

/** 获取任务主题（颜色和背景图） */
const getTaskTheme = (index: number) => TASK_THEMES[index] ?? TASK_THEMES[3];

/** 获取任务标题 */
const getTaskTitle = (task: ITask) => ONBOARDING_TASKS.find((t) => t.id === task.id)?.title ?? "";

interface TaskCardProps {
  task: ITask;
  index: number;
  onClick: (taskId: TaskId) => void;
}

const OnboardingTaskCard: FC<TaskCardProps> = ({ task, index, onClick }) => {
  const theme = getTaskTheme(index);
  const title = getTaskTitle(task);
  const time = formatTime(task.reminMins || task.estimatedTime / 60);
  const reward = formatReward(task.reward);

  return (
    <div
      className={`relative overflow-hidden rounded-[20px] px-4 py-4 cursor-pointer ${theme.color}`}
      onClick={() => onClick(task.id)}
    >
      {/* 美元符号背景图 */}
      <img src={theme.dollarBg} alt="" className="absolute w-[50%] h-full left-[30%]" />

      <div className="relative flex items-center gap-2">
        {/* 左侧金额框 */}
        <div className="bg-white rounded-[12px] w-[100px] h-[60px] flex items-center justify-center shadow-md flex-shrink-0 overflow-hidden">
          <div className="text-[28px] font-black" style={{ fontFamily: "TTFellows" }}>
            ${reward}
          </div>
        </div>

        {/* 中间内容 */}
        <div className="flex-1 flex flex-col justify-center gap-0.5 text-white" style={{ fontFamily: "Pangram" }}>
          <span className="text-[15px] font-bold">{title}</span>
          <div className="flex items-center gap-1">
            <img src={icClock} alt="clock" className="w-4 h-4" />
            <span className="text-[17px] font-normal tracking-tight">{time}</span>
          </div>
        </div>

        {/* 右侧箭头 */}
        <img src={icArrow} alt="arrow" className="w-[22px] h-[22px]" />
      </div>
    </div>
  );
};

export const OnboardingTaskList = () => {
  const { tasks, handleTaskAction } = useTask();

  // 过滤未完成的任务
  const displayTasks = useMemo(
    () =>
      ONBOARDING_TASKS.map((config) => tasks.get(config.id)).filter((task): task is ITask => {
        if (!task || task.status === TaskStatus.finish) return false;
        return true;
      }),
    [tasks],
  );

  if (displayTasks.length === 0) return null;

  return (
    <div className="pb-4">
      {/* 标题 */}
      <div className="flex items-center gap-2 pb-3">
        <img src={icTaskLogo} alt="task" className="w-5 h-5" />
        <span className="text-[16px] font-semibold">Task</span>
      </div>

      {/* 任务卡片列表 */}
      <div className="space-y-3">
        {displayTasks.map((task, index) => (
          <OnboardingTaskCard key={task.id} task={task} index={index} onClick={handleTaskAction} />
        ))}
      </div>
    </div>
  );
};

```
