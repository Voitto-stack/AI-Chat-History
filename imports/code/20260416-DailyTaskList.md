---
title: DailyTaskList
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: DailyTaskList.tsx
---

# DailyTaskList

```tsx
/**
 * Daily任务列表组件
 * 样式还原自react-haven项目
 */

import { FC, useMemo } from "react";
import { useTask } from "@/hooks/useTask";
import { TaskId, ITask, TaskStatus } from "@/types/task";
import { formatReward, formatTime } from "@/utils/format";

// 导入图片资源
import icArrow from "@/assets/images/earnings/ic_daily_task_arrow.svg";
import icClock1 from "@/assets/images/earnings/ic_daily_task_cost_time_1.webp";
import icClock2 from "@/assets/images/earnings/ic_daily_task_cost_time_2.webp";
import icTaskLogo from "@/assets/images/earnings/ic_daily_task_logo.svg";

// Daily 任务配置
const DAILY_TASKS = [{ id: TaskId.PostPhoto, title: "Post my pictures of the day" }] as const;

/** 获取任务标题 */
const getTaskTitle = (task: ITask) => DAILY_TASKS.find((t) => t.id === task.id)?.title ?? "";

interface DailyTaskCardProps {
  task: ITask;
  onClick: (taskId: TaskId) => void;
}

// 样式常量
const TEXT_SECONDARY = "text-[#3c3c4399]";
const TEXT_SIZE_15 = "text-[15px]";

const DailyTaskCard: FC<DailyTaskCardProps> = ({ task, onClick }) => {
  const reward = formatReward(task.reward);
  const time = formatTime(task.reminMins || task.estimatedTime / 60);
  const title = getTaskTitle(task);

  return (
    <div
      className="flex items-center w-full px-4 py-[14px] overflow-hidden rounded-[20px] bg-[#f2f2f7] cursor-pointer press-feedback"
      onClick={() => onClick(task.id)}
    >
      {/* 左侧绿色奖励框 */}
      <div className="flex items-center justify-center flex-shrink-0 w-[71px] h-[66px] rounded-[12px] bg-success">
        <div className="text-[24px] font-black text-white" style={{ fontFamily: "TTFellows" }}>
          ${reward}
        </div>
      </div>

      {/* 中间内容 */}
      <div className="flex-1 flex flex-col justify-center gap-1.5 ml-3" style={{ fontFamily: "Pangram" }}>
        <span className={`${TEXT_SIZE_15} font-bold text-black`}>{title}</span>

        {/* "Once per day" */}
        <div className="flex items-center gap-1">
          <img src={icClock1} alt="clock" className="w-4 h-4 rounded-full" />
          <span className={`${TEXT_SIZE_15} font-normal ${TEXT_SECONDARY} leading-[17px]`}>Once per day</span>
        </div>

        {/* 时间 */}
        <div className="flex items-center gap-1">
          <img src={icClock2} alt="clock" className="w-4 h-4 rounded-full" />
          <span className={`${TEXT_SIZE_15} font-normal ${TEXT_SECONDARY} leading-[17px]`}>{time}</span>
        </div>
      </div>

      {/* 右侧箭头 */}
      <img src={icArrow} alt="arrow" className="w-6 h-6 flex-shrink-0" />
    </div>
  );
};

export const DailyTaskList = () => {
  const { tasks, handleTaskAction } = useTask();

  // 过滤未完成的任务
  const displayTasks = useMemo(
    () =>
      DAILY_TASKS.map((config) => tasks.get(config.id)).filter(
        (task): task is ITask => task !== undefined && task.status !== TaskStatus.finish,
      ),
    [tasks],
  );

  if (displayTasks.length === 0) return null;

  return (
    <div className="pb-4">
      {/* 标题 */}
      <div className="flex items-center gap-2 pb-3">
        <img src={icTaskLogo} alt="task" className="w-5 h-5" />
        <span className="text-[16px] font-semibold">Daily Task</span>
      </div>

      {/* 任务卡片列表 */}
      <div className="space-y-3">
        {displayTasks.map((task) => (
          <DailyTaskCard key={task.id} task={task} onClick={handleTaskAction} />
        ))}
      </div>
    </div>
  );
};

```
