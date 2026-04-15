---
title: useMissCall
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: useMissCall.tsx
---

# useMissCall

```tsx
/**
 * 未接来电业务 Hook
 * 整合 store + 弹窗显示逻辑
 */

import { useCallback } from "react";
import { useMissCallStore } from "@/stores/missCallStore";
import { useModal } from "@/hooks/useModal";
import { bpTrack } from "@/tracking/api/byteplus";
import { EventName } from "@/tracking/events";
import { MissedCallsModalStack } from "@/components/MissedCallsModalStack";
import { showVideoMatchModal } from "@/components/VideoMatchModal";

// 回拨弹窗 Modal ID
const MISSED_CALLS_MODAL_ID = "missed-calls-modal";

export function useMissCall() {
  const { userTotal, userInfos, updateMissCall, reset } = useMissCallStore();

  /** 关闭回拨弹窗 */
  const closeMissedCallsModal = useCallback(() => {
    useModal.getState().close(MISSED_CALLS_MODAL_ID);
  }, []);

  /** 显示回拨弹窗 */
  const showMissedCallsModal = useCallback(() => {
    const { userInfos, userTotal } = useMissCallStore.getState();
    if (userTotal <= 0 || userInfos.length === 0) return;

    bpTrack(EventName.pwa_fake_call_back_popup_show);

    useModal.getState().open(
      MISSED_CALLS_MODAL_ID,
      <MissedCallsModalStack
        missedCalls={userInfos}
        totalCount={userTotal}
        onCallBack={() => {
          closeMissedCallsModal();
          showVideoMatchModal();
        }}
        onClose={closeMissedCallsModal}
      />,
      { variant: "fullscreen" },
    );
  }, [closeMissedCallsModal]);

  /**
   * 获取未接来电并弹窗
   * @param source 触发来源（用于调试）
   */
  const getMissedCall = useCallback(
    async (source: string) => {
      console.log("[useMissCall] getMissedCall triggered by:", source);
      const result = await updateMissCall();
      if (result.userTotal > 0 && result.userInfos.length > 0) {
        showMissedCallsModal();
      }
    },
    [updateMissCall, showMissedCallsModal],
  );

  return {
    userTotal,
    userInfos,
    updateMissCall,
    getMissedCall,
    showMissedCallsModal,
    closeMissedCallsModal,
    reset
  };
}

/** 在组件外部获取 missCall store 状态 */
export const getMissCallStoreState = () => useMissCallStore.getState();

```
