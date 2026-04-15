---
title: ConfirmEndCallModal
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: ConfirmEndCallModal.tsx
---

# ConfirmEndCallModal

```tsx
import { useCallback, useState } from "react";
import { useModal } from "@/hooks/useModal";

/**
 * ConfirmEndCallModal - 确认结束通话弹窗
 * 默认挂断确认，带倒计时
 */

const MODAL_ID = "confirm-end-call-modal";

/** 倒计时文本 */
const CountdownText: React.FC<{
  time: number;
  onFinish?: () => void;
}> = ({ time, onFinish }) => {
  const [remainTime, setRemainTime] = useState(time);

  useState(() => {
    const interval = setInterval(() => {
      setRemainTime((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(interval);
          onFinish?.();
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  if (remainTime <= 0) return null;
  return <span>{` · ${remainTime}s`}</span>;
};

interface ConfirmEndCallContentProps {
  callTypeLabel: string;
  countdownTime: number;
  onEndCall: () => void;
  onContinue: () => void;
}

export const ConfirmEndCallContent: React.FC<ConfirmEndCallContentProps> = ({
  callTypeLabel,
  countdownTime,
  onEndCall,
  onContinue,
}) => {
  const [countdownFinish, setCountdownFinish] = useState(countdownTime <= 0);

  const handleEndCall = useCallback(() => {
    if (countdownFinish) {
      onEndCall();
    }
  }, [countdownFinish, onEndCall]);

  return (
    <div className="w-[318px] overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      <div className="mx-6 mt-6 mb-3 text-center text-[22px] font-bold text-brand-dark">
        End this {callTypeLabel} call?
      </div>
      <div className="mx-5 mt-4 mb-5 flex flex-col gap-2.5">
        <div
          className={`cursor-pointer rounded-full px-4 py-4 text-center text-[14px] font-medium ${
            countdownFinish ? "bg-[#edf1f3] text-[#496091] active:opacity-80" : "bg-[#f5f5f5] text-[#999]"
          }`}
          onClick={handleEndCall}
        >
          End Call
          {countdownTime > 0 && <CountdownText time={countdownTime} onFinish={() => setCountdownFinish(true)} />}
        </div>
        <div
          className="cursor-pointer rounded-full bg-[#6bc4ff] px-4 py-4 text-center text-[14px] font-medium text-brand-dark active:opacity-80"
          onClick={onContinue}
        >
          Stay on Call
        </div>
        <span className="text-center text-[10px] font-normal text-[rgba(60,60,67,0.6)]">Keep earning $1/Min</span>
      </div>
    </div>
  );
};

// ==================== 导出函数 ====================

export interface ShowConfirmEndCallParams {
  callTypeLabel: string;
  countdownTime: number;
  onEndCall: () => void;
  onContinue: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const showConfirmEndCallModal = (params: ShowConfirmEndCallParams): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(
    MODAL_ID,
    <ConfirmEndCallContent
      callTypeLabel={params.callTypeLabel}
      countdownTime={params.countdownTime}
      onEndCall={() => {
        handleClose();
        params.onEndCall();
      }}
      onContinue={() => {
        handleClose();
        params.onContinue();
      }}
    />,
    { variant: "center" },
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const closeConfirmEndCallModal = (): void => {
  useModal.getState().close(MODAL_ID);
};

```
