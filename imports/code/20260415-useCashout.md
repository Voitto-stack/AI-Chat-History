---
title: useCashout
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useCashout.ts
---

# useCashout

```ts
/**
 * 提现相关的 Hooks
 */

import { useCallback } from "react";
import { useCashoutStore } from "@/stores/cashoutStore";
import { useTaskStore } from "@/stores/taskStore";
import { useUserStore } from "@/stores/userStore";
import {
  CashoutStage,
  cashoutStagesList,
  stageTaskIdsMap,
  stageAmountMap,
  stageTaskLimitMap,
  LAST_CASHOUT_STAGE,
  USPaypalAccountType,
} from "@/types/cashout";
import { TaskStatus } from "@/types/task";
import { checkVideoTimeMet, getNextStage } from "@/utils/cashoutUtils";
import { queryUserWithdrawTasks, convertWithdrawInfo } from "@/http/api";
import { UserCloudStorage, UserCloudKey } from "@/services/userCloudStorage";
import { getUserCountryCode } from "@/utils/locationUtils";
import { STORAGE_KEYS } from "@/constants/storageKeys";

// 从云端加载数据到 store
async function loadFromCloud() {
  const { setCurrentTaskStage, setWillCashoutStage, setVideoCallTotalSeconds } = useCashoutStore.getState();

  const values = await UserCloudStorage.getValues([
    UserCloudKey.CashoutStage,
    UserCloudKey.CashoutSuccessStage,
    UserCloudKey.VideoCallTime,
  ]);

  if (!values) return;

  // 加载当前任务阶段
  const currentTaskStageValue = values[UserCloudKey.CashoutStage];
  if (currentTaskStageValue) {
    const validStage = cashoutStagesList.includes(currentTaskStageValue as CashoutStage)
      ? (currentTaskStageValue as CashoutStage)
      : LAST_CASHOUT_STAGE;
    setCurrentTaskStage(validStage);
  }

  // 加载将要提现的阶段
  const willCashoutStageValue = values[UserCloudKey.CashoutSuccessStage];
  if (willCashoutStageValue) {
    const validStage = cashoutStagesList.includes(willCashoutStageValue as CashoutStage)
      ? (willCashoutStageValue as CashoutStage)
      : LAST_CASHOUT_STAGE;

    console.log("validStage", validStage);
    setWillCashoutStage(validStage);
  }

  // 加载视频通话时长
  const videoCallTimeValue = values[UserCloudKey.VideoCallTime];
  if (videoCallTimeValue !== undefined && videoCallTimeValue !== null) {
    const seconds = Number(videoCallTimeValue);
    if (!isNaN(seconds)) {
      setVideoCallTotalSeconds(seconds);
    }
  }
}

/**
 * 提现初始化 - 从云端加载数据
 */
export async function initializeCashout() {
  try {
    await loadFromCloud();
    console.log("[useCashout] Initialized from cloud");
  } catch (error) {
    console.error("[useCashout] Failed to initialize:", error);
  }
}

/**
 * 计算提现参数（GPS定位 + PayPal账户类型）
 */
export async function calculateCashoutParams(willCashoutStage: CashoutStage) {
  let allowPayment = false;
  let isLbsAmerica = false;
  let usPaypalAccountType = USPaypalAccountType.US_PAYPAL_UNKNOWN;

  // 调试模式：跳过验证
  const disableValidation = localStorage.getItem(STORAGE_KEYS.DEBUG_DISABLE_VALIDATION) === "1";
  if (disableValidation) {
    allowPayment = true;
    isLbsAmerica = true;
    usPaypalAccountType = USPaypalAccountType.US_PAYPAL_ACCOUNT;
    return { allowPayment, isLbsAmerica, usPaypalAccountType };
  }

  // 获取 PayPal 账户类型
  const paypalCountryIsUS = localStorage.getItem(STORAGE_KEYS.PAYPAL_COUNTRY_IS_US);
  if (paypalCountryIsUS === "true") {
    usPaypalAccountType = USPaypalAccountType.US_PAYPAL_ACCOUNT;
  } else if (paypalCountryIsUS === "false") {
    usPaypalAccountType = USPaypalAccountType.NON_US_PAYPAL_ACCOUNT;
  }

  // 获取 GPS 位置
  try {
    const country_code = await getUserCountryCode();

    if (!country_code) {
      console.error("Failed to get country code");
      return { allowPayment, isLbsAmerica, usPaypalAccountType };
    }

    // isLbsAmerica: GPS 在美国
    if (country_code === "us") {
      isLbsAmerica = true;
    }

    // allowPayment: GPS在美国 + 语言en-US （或提现阶段 >= 5）
    const stageIndex = cashoutStagesList.indexOf(willCashoutStage);
    if (stageIndex >= 4) {
      // StageFive 及以后，直接通过
      allowPayment = true;
    } else {
      // 前期阶段：严格验证
      const locale = navigator.language;
      if (country_code === "us" && locale === "en-US") {
        allowPayment = true;
      }
    }
  } catch (error) {
    console.error("Failed to get location:", error);
  }

  return { allowPayment, isLbsAmerica, usPaypalAccountType };
}

/**
 * 提现核心 Hook
 */
export function useCashout() {
  const {
    currentTaskStage,
    willCashoutStage,
    withdrawList,
    videoCallTotalSeconds,
    setCurrentTaskStage: storeSetCurrentTaskStage,
    setWillCashoutStage: storeSetWillCashoutStage,
    setWithdrawList,
    setVideoCallTotalSeconds: storeSetVideoCallTotalSeconds,
  } = useCashoutStore();

  const { tasks } = useTaskStore();
  const { cash } = useUserStore();

  // 设置当前任务阶段（同步到云端）
  const setCurrentTaskStage = useCallback(
    async (stage: CashoutStage) => {
      const validStage = cashoutStagesList.includes(stage) ? stage : LAST_CASHOUT_STAGE;
      storeSetCurrentTaskStage(validStage);

      try {
        await UserCloudStorage.setValue(UserCloudKey.CashoutStage, validStage);
      } catch (error) {
        console.error("[useCashout] Failed to sync currentTaskStage:", error);
      }
    },
    [storeSetCurrentTaskStage],
  );

  // 设置将要提现的阶段（同步到云端）
  const setWillCashoutStage = useCallback(
    async (stage: CashoutStage) => {
      const validStage = cashoutStagesList.includes(stage) ? stage : LAST_CASHOUT_STAGE;
      storeSetWillCashoutStage(validStage);

      try {
        await UserCloudStorage.setValue(UserCloudKey.CashoutSuccessStage, validStage);
      } catch (error) {
        console.error("[useCashout] Failed to sync willCashoutStage:", error);
      }
    },
    [storeSetWillCashoutStage],
  );

  // 更新视频通话时长（同步到云端）
  const updateVideoCallTime = useCallback(
    async (seconds: number) => {
      const newTotal = videoCallTotalSeconds + seconds;
      storeSetVideoCallTotalSeconds(newTotal);

      try {
        await UserCloudStorage.setValue(UserCloudKey.VideoCallTime, String(newTotal));
      } catch (error) {
        console.error("[useCashout] Failed to sync videoCallTime:", error);
      }
    },
    [videoCallTotalSeconds, storeSetVideoCallTotalSeconds],
  );

  // 重置视频通话时长（同步到云端）
  const resetVideoCallTime = useCallback(async () => {
    storeSetVideoCallTotalSeconds(0);

    try {
      await UserCloudStorage.setValue(UserCloudKey.VideoCallTime, "0");
    } catch (error) {
      console.error("[useCashout] Failed to reset videoCallTime:", error);
    }
  }, [storeSetVideoCallTotalSeconds]);

  // 完成当前任务阶段
  const finishCurrentTaskStage = useCallback(async () => {
    const nextStage = getNextStage(currentTaskStage);
    if (nextStage) {
      await setCurrentTaskStage(nextStage);
      await resetVideoCallTime();
    }
  }, [currentTaskStage, setCurrentTaskStage, resetVideoCallTime]);

  // 完成将要提现的阶段
  const finishWillCashoutStage = useCallback(async () => {
    const nextStage = getNextStage(willCashoutStage);
    if (nextStage) {
      await setWillCashoutStage(nextStage);
    }
  }, [willCashoutStage, setWillCashoutStage]);

  // 获取提现记录列表
  const fetchWithdrawList = useCallback(async () => {
    try {
      const response = await queryUserWithdrawTasks();
      if (response.userWithdrawInfos) {
        const list = response.userWithdrawInfos.map(convertWithdrawInfo);
        setWithdrawList(list);
      }
    } catch (error) {
      console.error("Failed to fetch withdraw list:", error);
    }
  }, [setWithdrawList]);

  // 获取阶段进度信息
  const getStageProgress = useCallback(
    (stage: CashoutStage) => {
      const taskIds = stageTaskIdsMap[stage] || [];
      const stageAmount = stageAmountMap[stage] || 0;
      const stageLimit = stageTaskLimitMap[stage];

      // 检查所有任务是否完成
      const allTasksCompleted = taskIds.every((taskId) => {
        const task = tasks.get(taskId);
        return task && task.status === TaskStatus.finish;
      });

      // 检查视频通话时长是否达标（双重验证）
      const videoTimeMet = !stageLimit.duration || checkVideoTimeMet(videoCallTotalSeconds, stageLimit.duration);

      // 检查余额是否足够提现
      const balanceSufficient = cash >= stageAmount;

      // 是否准备好提现
      // 1. 所有任务完成（包括收益任务和时长任务）
      // 2. 视频时长达标（双重验证，防御性编程）
      // 3. 余额足够提现
      // 注意：收益检查已经包含在任务完成状态中，不需要单独验证
      const readyForCashout = allTasksCompleted && videoTimeMet && balanceSufficient;

      return {
        taskIds,
        stageAmount,
        allTasksCompleted,
        videoTimeMet,
        balanceSufficient,
        readyForCashout,
      };
    },
    [tasks, cash, videoCallTotalSeconds],
  );

  // 获取阶段任务列表
  const getStageTasks = useCallback(
    (stage: CashoutStage) => {
      const taskIds = stageTaskIdsMap[stage] || [];
      return taskIds.map((taskId) => {
        const task = tasks.get(taskId);
        return {
          taskId,
          completed: task?.status === TaskStatus.finish,
        };
      });
    },
    [tasks],
  );

  return {
    // 状态
    currentTaskStage,
    willCashoutStage,
    withdrawList,
    videoCallTotalSeconds,

    // 操作
    setCurrentTaskStage,
    setWillCashoutStage,
    finishCurrentTaskStage,
    finishWillCashoutStage,
    updateVideoCallTime,
    resetVideoCallTime,
    fetchWithdrawList,

    // 查询
    getStageProgress,
    getStageTasks,
  };
}

```
