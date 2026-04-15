---
title: useApkPrompt
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: useApkPrompt.ts
---

# useApkPrompt

```ts
/**
 * APK 弹窗提示 Hook
 *
 * 4.1: SecondEarn 任务完成后自动弹 APK 下载弹窗（只弹一次）
 * 4.2: StageTwo 全部完成后（currentTaskStage >= StageThree），每天弹一次
 */

import { useEffect } from "react";
import { isApp } from "@/utils/bridge";
import { showApkDownloadModal } from "@/components/showApkDownloadModal";
import { useCashoutStore } from "@/stores/cashoutStore";
import { cashoutStagesList } from "@/types/cashout";
import { STORAGE_KEYS } from "@/constants/storageKeys";

export function useApkPrompt() {
  useEffect(() => {
    if (isApp()) return;

    const { currentTaskStage } = useCashoutStore.getState();
    const stageIndex = cashoutStagesList.indexOf(currentTaskStage);

    // StageTwo 已完成 = currentTaskStage >= StageThree (index >= 2)
    if (stageIndex < 2) return;

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const lastDate = localStorage.getItem(STORAGE_KEYS.APK_PROMPT_DAILY_LAST_DATE);
    if (lastDate === today) return;

    localStorage.setItem(STORAGE_KEYS.APK_PROMPT_DAILY_LAST_DATE, today);
    showApkDownloadModal();
  }, []);
}

```
