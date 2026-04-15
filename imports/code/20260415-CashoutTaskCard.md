---
title: CashoutTaskCard
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: CashoutTaskCard.tsx
---

# CashoutTaskCard

```tsx
/**
 * Cashout 任务卡片组件
 */

import { FC } from "react";
import { TaskId, ITask, TaskStatus } from "@/types/task";
import icCheckboxNormal from "@/assets/images/task/ic_checkbox_normal.svg";
import icCheckboxChecked from "@/assets/images/task/ic_checkbox_check_disable.svg";

interface CashoutTaskCardProps {
  task: ITask;
  title: string;
  buttonText: "Claim" | "Go";
  onClick: (taskId: TaskId) => void;
  disabled?: boolean;
}

export const CashoutTaskCard: FC<CashoutTaskCardProps> = ({ task, title, buttonText, onClick, disabled = false }) => {
  const isFinished = task.status === TaskStatus.finish;
  const isInactive = isFinished || disabled;

  const handleClick = () => {
    if (!isInactive) {
      onClick(task.id);
    }
  };

  return (
    <div
      className={`flex items-center gap-1.5 w-full h-[67px] px-3 rounded-[18px] bg-white ${
        isInactive ? "cursor-default" : "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {/* 左侧复选框 */}
      <img src={isFinished ? icCheckboxChecked : icCheckboxNormal} alt="" className="w-4 h-4" />

      {/* 中间任务标题 */}
      <span
        className={`text-black font-bold text-[15px] leading-[100%] tracking-[0px] flex-1 ${
          isFinished ? "opacity-20" : "opacity-100"
        }`}
      >
        {title}
      </span>

      {/* 右侧按钮 */}
      <span
        className={`w-14 h-[27px] px-[9px] py-1.5 rounded-[36px] bg-[#44bfff] text-white font-bold text-[14px] leading-[100%] tracking-[0px] text-center flex items-center justify-center ${
          isInactive ? "opacity-50" : "opacity-100"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${!isInactive ? "cashout-task-item-btn" : ""}`}
      >
        {isFinished ? "Done" : buttonText}
      </span>
    </div>
  );
};

```
