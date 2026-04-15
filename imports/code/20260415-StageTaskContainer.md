---
title: StageTaskContainer
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: StageTaskContainer.tsx
---

# StageTaskContainer

```tsx
// 阶段任务容器组件

import { useCashout } from "@/hooks/useCashout";
import { useUser } from "@/hooks/useUser";
import { CashoutStage } from "@/types/cashout";
import { toast } from "@/utils/toast";
import { formatNumber } from "@/utils/format";
import { TaskItem } from "./TaskItem";
import Button from "@/components/Button";

import { showCashoutModal } from "@/components/showCashoutModal";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

interface StageTaskContainerProps {
  stage: CashoutStage;
}

export function StageTaskContainer({ stage }: StageTaskContainerProps) {
  const { cash } = useUser();
  const { getStageProgress, getStageTasks, willCashoutStage } = useCashout();

  const { stageAmount, readyForCashout } = getStageProgress(stage);
  const taskItems = getStageTasks(stage);

  // 必须按顺序提现：只有当前阶段等于 willCashoutStage 时才允许提现
  const isCurrentCashoutStage = stage === willCashoutStage;
  const canCashout = readyForCashout && isCurrentCashoutStage;

  const displayedAmount = Math.min(cash, stageAmount);

  const handleCashout = () => {
    if (!isCurrentCashoutStage) {
      toast.info("Please cash out the previous stage first");
      return;
    }
    if (!readyForCashout) {
      toast.info("Complete all tasks to cash out");
      return;
    }

    // 显示提现弹窗，跳过 REMINDER 步骤（cashout 页手动点击不需要弹提现确认弹窗）

    // 埋点：提现按钮点击
    bpTrack(EventName.pwa_conv_cash_out_clickButton, {
      stage_amount: stageAmount,
      current_cash: cash ?? 0,
      ready_for_cashout: readyForCashout,
    });
    bpTrack(EventName.pwa_cashout_button_click, {
      stage_amount: stageAmount,
      source: "cashout_page",
    });
    bpTrack(EventName.pwa_cashout_click, {
      stage_amount: stageAmount,
      current_cash: cash ?? 0,
    });

    // 显示提现弹窗
    showCashoutModal({
      amount: stageAmount.toFixed(2),
      skipReminder: true,
      onConfirm: () => {
        console.log("[StageTaskContainer] Cashout flow completed");
      },
    });
  };

  return (
    <div className="flex flex-col mt-4 mx-4 p-4 rounded-[20px] bg-white">
      <div className="flex items-end gap-[6px] text-[18px] font-medium font-[TTFellows] text-[rgba(60,60,67,0.6)]">
        <span className="text-black text-[29px] font-bold">${formatNumber(displayedAmount)}</span>
        <span className="pb-[6px]">/</span>
        <span className="pb-1">${formatNumber(stageAmount)}</span>
      </div>

      {/* <div className="mt-3">
        <ProgressBar
          progress={progressPercent * 100}
          fillColor="#34c759"
          backgroundColor="#eff8ff"
          className="h-[10px]"
        />
      </div> */}

      <div className="flex flex-col w-full mt-6 gap-3">
        {taskItems.map((task) => (
          <TaskItem key={task.taskId} task={task} />
        ))}
      </div>

      <Button onClick={handleCashout} disabled={!canCashout} className="mt-6 text-sm font-[Pangram]">
        Cash Out
      </Button>
    </div>
  );
}

```
