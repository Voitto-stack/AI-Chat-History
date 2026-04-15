---
title: EarlyEndDialog
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: EarlyEndDialog.tsx
---

# EarlyEndDialog

```tsx
import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { toast } from "@/utils/toast";

/**
 * EarlyEndDialog - 提前结束通话警告弹窗
 * 通话不足15秒时主动挂断，首次/第2次违规显示
 */

const MODAL_ID = "early-end-dialog-modal";

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

interface EarlyEndDialogContentProps {
  rejectedCount: number;
  countdownTime: number;
  countdownFinish: boolean;
  onContinue: () => void;
  onEndCall: () => void;
  onCountdownFinish: () => void;
}

export const EarlyEndDialogContent: React.FC<EarlyEndDialogContentProps> = ({
  rejectedCount,
  countdownTime,
  countdownFinish,
  onContinue,
  onEndCall,
  onCountdownFinish,
}) => {
  const desc =
    rejectedCount === 0
      ? "Ending calls under 15s counts as a Decline. You will lose earnings."
      : "Ending calls under 15s counts as a Decline. Declining calls frequently lowers your recommendation ranking.";

  return (
    <div className="flex w-[300px] flex-col items-center gap-5 rounded-[20px] bg-[#f8fcff] px-4 py-5">
      <div className="flex w-full flex-col items-center gap-2 p-2">
        <div className="w-full text-center text-[18px] font-medium leading-[1.22em] tracking-[-0.23px] text-black">
          Too Early to End!
        </div>
        <div className="w-[252px] text-center text-[15px] font-normal leading-[1.33em] tracking-[-0.23px] text-[rgba(60,60,67,0.6)]">
          {desc}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <button
          className="flex w-[260px] items-center justify-center rounded-full border-none bg-[#47aeef] px-4 py-4 text-[14px] font-medium leading-[1.14em] text-white transition-opacity active:opacity-80"
          onClick={onContinue}
        >
          Continue Call
        </button>
        <button
          className="flex w-[260px] items-center justify-center rounded-full border-none bg-[#f2f2f7] px-4 py-4 text-[14px] font-medium leading-[1.14em] text-[rgba(60,60,67,0.6)] transition-opacity active:opacity-80"
          onClick={() => {
            if (countdownFinish) {
              onEndCall();
            } else {
              toast.info("Cannot Be End Right Now. Try It Later.");
            }
          }}
        >
          End & Get Penalty
          {countdownTime > 0 && <CountdownText time={countdownTime} onFinish={onCountdownFinish} />}
        </button>
      </div>
    </div>
  );
};

// ==================== 导出函数 ====================

export interface ShowEarlyEndDialogParams {
  rejectedCount: number;
  countdownTime: number;
  onContinue: () => void;
  onEndCall: () => void;
}

export const showEarlyEndDialog = (params: ShowEarlyEndDialogParams): void => {
  const modalStore = useModal.getState();
  let countdownFinish = params.countdownTime <= 0;

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(
    MODAL_ID,
    <EarlyEndDialogContent
      rejectedCount={params.rejectedCount}
      countdownTime={params.countdownTime}
      countdownFinish={countdownFinish}
      onContinue={() => {
        handleClose();
        params.onContinue();
      }}
      onEndCall={() => {
        handleClose();
        params.onEndCall();
      }}
      onCountdownFinish={() => {
        countdownFinish = true;
      }}
    />,
    { variant: "center" },
  );
};

export const closeEarlyEndDialog = (): void => {
  useModal.getState().close(MODAL_ID);
};

```
