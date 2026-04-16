---
title: bffCalculations
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: bffCalculations.ts
---

# bffCalculations

```ts
/**
 * BFF 计算和业务逻辑工具
 */

import type { BffStage, PokeButtonState, PokeButtonVisual } from "@/types/bff";

/**
 * 将后端 number 类型的阶段值转换为前端 BffStage 类型
 * @param stage 后端阶段值（1-5 或 6 表�� DONE）
 * @returns BffStage 类型字符串
 */
export const numberToBffStage = (stage: number | undefined): BffStage => {
  if (!stage) return "W1";

  const stageMap: Record<number, BffStage> = {
    1: "W1",
    2: "W2",
    3: "W3",
    4: "W4",
    5: "W5",
    6: "DONE",
  };

  return stageMap[stage] ?? "W1";
};

/**
 * 计算催单按钮状态
 * - 两个维度：冷却状态（24h） × 活跃状态（48h/96h/168h）
 */
export const calculatePokeButtonState = (inactiveHours: number, cooldownEndTime: number): PokeButtonState => {
  const now = Date.now();
  const isCoolingDown = now < cooldownEndTime;

  // 冷却检查
  if (isCoolingDown) {
    return {
      visual: "default",
      clickable: false,
      breathing: false,
      inactiveLabel: undefined,
    };
  }

  // 活跃状态分类
  let visual: PokeButtonVisual = "default";
  let inactiveLabel: string | undefined;

  if (inactiveHours >= 168) {
    // > 7 天：按钮消失
    visual = "hidden";
    inactiveLabel = "Inactive > 7 days";
  } else if (inactiveHours >= 96) {
    // > 96 小时：红色 + 呼吸灯
    visual = "red";
    inactiveLabel = `Inactive > ${inactiveHours}h`;
  } else if (inactiveHours >= 48) {
    // > 48 小时：黄色 + 呼吸灯
    visual = "yellow";
    inactiveLabel = `Inactive > ${inactiveHours}h`;
  }

  return {
    visual,
    clickable: visual !== "hidden",
    breathing: visual === "red" || visual === "yellow",
    inactiveLabel,
  };
};

/**
 * 根据 W 阶段计算奖励说明
 */
export const getStageRewardDescription = (stage: string) => {
  const rewardMap: Record<string, { aReward: string; bReward: string }> = {
    W1: { aReward: "$0 (Locked $60)", bReward: "Exclusive Landing Page Hint" },
    W2: { aReward: "1h Priority Traffic", bReward: "Process $4 Withdrawal" },
    W3: { aReward: "$5 Available", bReward: "+$5 Gift + Merge $10" },
    W4: { aReward: "$15 Available", bReward: "No Additional" },
    W5: { aReward: "$30 Available (Total $50)", bReward: "+$15 Gift + Merge $45" },
  };

  return rewardMap[stage] || { aReward: "Reward Pending", bReward: "Pending" };
};

/**
 * 计算下一个阶段
 */
export const getNextStage = (currentStage: string): string => {
  const stageSequence = ["W1", "W2", "W3", "W4", "W5"];
  const currentIndex = stageSequence.indexOf(currentStage);

  if (currentIndex === -1 || currentIndex === stageSequence.length - 1) {
    return "DONE";
  }

  return stageSequence[currentIndex + 1];
};

/**
 * 检查是否符合邀请条件
 * - 需要完成至少一次提现（StageTwo 后）
 */
export const canUserInvite = (cashoutStage: string | number): boolean => {
  const stage = typeof cashoutStage === "string" ? parseFloat(cashoutStage) : cashoutStage;
  return stage >= 4.0; // StageTwo = $4.0
};

/**
 * 格式化金额
 */
export const formatBffAmount = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

/**
 * 计算邀请进度百分比
 */
export const calculateInviteProgress = (currentStage: string): number => {
  const progressMap: Record<string, number> = {
    W1: 20,
    W2: 40,
    W3: 60,
    W4: 80,
    W5: 100,
    DONE: 100,
  };

  return progressMap[currentStage] || 0;
};

/**
 * 获取阶段提现金额
 */
export const getStageWithdrawalAmount = (stage: string): number => {
  const amountMap: Record<string, number> = {
    W1: 0,
    W2: 4,
    W3: 10,
    W4: 12,
    W5: 25,
  };

  return amountMap[stage] || 0;
};

/**
 * 获取 B 端被邀请者在该阶段的额外奖励
 */
export const getInviteeBonus = (stage: string): number => {
  const bonusMap: Record<string, number> = {
    W1: 0,
    W2: 0,
    W3: 5,
    W4: 0,
    W5: 15,
  };

  return bonusMap[stage] || 0;
};

/**
 * 计算累计邀请奖励（A 端）
 */
export const getTotalInviterReward = (maxStage: string): number => {
  const totalMap: Record<string, number> = {
    W1: 0,
    W2: 0,
    W3: 5,
    W4: 20,
    W5: 50,
  };

  return totalMap[maxStage] || 0;
};

```
