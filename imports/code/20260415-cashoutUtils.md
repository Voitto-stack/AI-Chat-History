---
title: cashoutUtils
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: cashoutUtils.ts
---

# cashoutUtils

```ts
// 提现相关工具函数

import { CashoutStage, cashoutStagesList, stageTaskLimitMap } from "@/types/cashout";
import { getUserCallOrderTotalEarn, getUserInsTotalEarn } from "@/http/cashoutApi";

export { formatAmount } from "./format";

/**
 * 检查视频通话时长是否达标
 * @param totalSeconds 总通话秒数
 * @param requiredMinutes 要求的分钟数
 */
export function checkVideoTimeMet(totalSeconds: number, requiredMinutes: number): boolean {
  const requiredSeconds = requiredMinutes * 60;
  return Number.isFinite(totalSeconds) && totalSeconds >= requiredSeconds;
}

// 获取阶段索引
export function getStageIndex(stage: CashoutStage): number {
  return cashoutStagesList.indexOf(stage);
}

// 进入下一阶段
export function getNextStage(currentStage: CashoutStage): CashoutStage | null {
  const currentIndex = cashoutStagesList.indexOf(currentStage);
  if (currentIndex !== -1 && currentIndex < cashoutStagesList.length - 1) {
    return cashoutStagesList[currentIndex + 1];
  }
  return null;
}

/**
 * 检查收益是否达标（视频通话收益）
 * 仅检查视频通话收益，用于 SecondEarn
 */
export async function checkVideoEarnDone(targetStage: CashoutStage): Promise<boolean> {
  try {
    const videoEarn = await getUserCallOrderTotalEarn();
    const targetLimit = stageTaskLimitMap[targetStage]?.earn ?? 0;
    return videoEarn >= targetLimit;
  } catch (error) {
    console.error("Failed to check video earn:", error);
    return false;
  }
}

/**
 * 检查总收益是否达标（视频 + ins 收益）
 * 用于 ThirdEarn 及之后的阶段
 *
 * 累计门槛 = 目标阶段及之前所有阶段的 earn 之和
 * 阶段数可变，超出后会循环，循环部分使用最后一个阶段的 earn 值累加
 * 例（假设共 N 阶段）：
 *   第 N+1 次提现 = 前 N 阶段累计 + 最后阶段 earn × 1
 *   第 N+2 次提现 = 前 N 阶段累计 + 最后阶段 earn × 2
 *
 * @param targetStage 目标阶段
 * @param withdrawCount 已完成的提现次数（用于循环阶段累加，仅最后阶段需传入）
 */
export async function checkTotalEarnDone(targetStage: CashoutStage, withdrawCount: number = 0): Promise<boolean> {
  try {
    const [videoEarn, insEarn] = await Promise.all([getUserCallOrderTotalEarn(), getUserInsTotalEarn()]);
    const totalEarn = videoEarn + insEarn;

    const stageLength = cashoutStagesList.length;

    // 1. 计算目标阶段及之前所有阶段的累计门槛（首轮）
    const targetIndex = cashoutStagesList.indexOf(targetStage);
    const requiredStages = cashoutStagesList.slice(0, targetIndex + 1);
    const firstCycleTotal = requiredStages.reduce((sum, stage) => {
      return sum + (stageTaskLimitMap[stage]?.earn ?? 0);
    }, 0);

    // 2. 如果提现次数超过阶段数，说明已进入循环，累加超出部分
    let extraCycleTotal = 0;
    if (withdrawCount >= stageLength) {
      const lastStageEarn = stageTaskLimitMap[cashoutStagesList[stageLength - 1]]?.earn ?? 0;
      const extraCount = withdrawCount - stageLength + 1;
      extraCycleTotal = lastStageEarn * extraCount;
    }
    console.log(
      "[checkTotalEarnDone] totalEarn:",
      totalEarn,
      "firstCycleTotal:",
      firstCycleTotal,
      "extraCycleTotal:",
      extraCycleTotal,
      "firstCycleTotal+extraCycleTotal:",
      firstCycleTotal + extraCycleTotal,
    );

    return totalEarn >= firstCycleTotal + extraCycleTotal;
  } catch (error) {
    console.error("Failed to check total earn:", error);
    return false;
  }
}

```
