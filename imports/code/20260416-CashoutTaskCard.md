---
title: CashoutTaskCard
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: CashoutTaskCard.tsx
---

# CashoutTaskCard

```tsx
/**
 * Cashout 任务卡片组件
 */

import { FC, useEffect, useRef } from "react";
import { TaskId, ITask, TaskStatus } from "@/types/task";
import icCheckboxNormal from "@/assets/images/task/ic_checkbox_normal.svg";
import icCheckboxChecked from "@/assets/images/task/ic_checkbox_check_disable.svg";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

interface CashoutTaskCardProps {
  task: ITask;
  title: string;
  buttonText: "Claim" | "Go";
  onClick: (taskId: TaskId) => void;
  disabled?: boolean;
  animationDelay?: number;
}

export const CashoutTaskCard: FC<CashoutTaskCardProps> = ({
  task,
  title,
  buttonText,
  onClick,
  disabled = false,
  animationDelay = 0,
}) => {
  const isFinished = task.status === TaskStatus.finish;
  const isInactive = isFinished || disabled;
  const cardRef = useRef<HTMLDivElement>(null);

  // 埋点：任务卡片显示（UV: 5,722）
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bpTrack(EventName.pwa_home_cash_task_show, {
            task_id: task.id,
            task_status: task.status,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    const ref = cardRef.current;
    if (ref) observer.observe(ref);
    return () => observer.disconnect();
  }, [task.id, task.status]);

  const handleClick = () => {
    if (!isInactive) {
      // 埋点：任务卡片点击（UV: 2,856）
      bpTrack(EventName.pwa_home_cash_task_click, {
        task_id: task.id,
        button_text: buttonText,
      });
      onClick(task.id);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`flex items-center gap-1.5 w-full h-[67px] px-3 rounded-[18px] animate-list-item-in ${
        isFinished ? "bg-[#f0fdf8]" : disabled ? "bg-white/70" : "bg-white press-feedback cursor-pointer"
      }`}
      style={{
        animationDelay: `${animationDelay}ms`,
        ...(!isInactive
          ? { boxShadow: "inset 3px 0 0 var(--color-brand)" }
          : isFinished
            ? { boxShadow: "inset 3px 0 0 var(--color-success)" }
            : undefined),
      }}
      onClick={handleClick}
    >
      {/* 左侧复选框 */}
      <img src={isFinished ? icCheckboxChecked : icCheckboxNormal} alt="" className="w-4 h-4" />

      {/* 中间任务标题 */}
      <span
        className={`font-bold text-[15px] leading-[100%] tracking-[0px] flex-1 font-[Pangram] ${
          isFinished ? "text-black/25 line-through decoration-success" : "text-black"
        }`}
      >
        {title}
      </span>

      {/* 右侧按钮 */}
      <span
        className={`w-14 h-[27px] px-[9px] py-1.5 rounded-[36px] text-white font-bold text-[14px] leading-[100%] tracking-[0px] text-center flex items-center justify-center transition-opacity ${
          isFinished
            ? "bg-success opacity-60"
            : disabled
              ? "bg-brand opacity-40 cursor-not-allowed"
              : "bg-brand cursor-pointer cashout-task-item-btn"
        }`}
      >
        {isFinished ? "Done" : buttonText}
      </span>
    </div>
  );
};

```
