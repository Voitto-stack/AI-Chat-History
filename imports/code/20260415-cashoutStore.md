---
title: cashoutStore
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: cashoutStore.ts
---

# cashoutStore

```ts
/**
 * 提现状态管理
 * 使用 Zustand 管理提现数据（纯状态管理，不包含业务逻辑）
 */

import { create } from "zustand";
import { CashoutStage, WithdrawInfo, FIRST_CASHOUT_STAGE } from "@/types/cashout";

interface CashoutState {
  currentTaskStage: CashoutStage; // 当前任务阶段（正在进行的任务）
  willCashoutStage: CashoutStage; // 将要提现的阶段
  withdrawList: WithdrawInfo[]; // 提现记录列表
  videoCallTotalSeconds: number; // 视频通话累计时长（秒）

  // 状态更新方法（纯数据操作）
  setCurrentTaskStage: (stage: CashoutStage) => void;
  setWillCashoutStage: (stage: CashoutStage) => void;
  setWithdrawList: (list: WithdrawInfo[]) => void;
  setVideoCallTotalSeconds: (seconds: number) => void;
  reset: () => void;
}

const INITIAL_STATE = {
  currentTaskStage: FIRST_CASHOUT_STAGE,
  willCashoutStage: FIRST_CASHOUT_STAGE,
  withdrawList: [] as WithdrawInfo[],
  videoCallTotalSeconds: 0,
};

export const useCashoutStore = create<CashoutState>()((set) => ({
  ...INITIAL_STATE,

  setCurrentTaskStage: (stage) => {
    set({ currentTaskStage: stage });
  },

  setWillCashoutStage: (stage) => {
    set({ willCashoutStage: stage });
  },

  setWithdrawList: (list) => {
    set({ withdrawList: list });
  },

  setVideoCallTotalSeconds: (seconds) => {
    set({ videoCallTotalSeconds: seconds });
  },

  reset: () => set(INITIAL_STATE),
}));

```
