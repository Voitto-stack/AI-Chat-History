---
title: FinalWarningModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: FinalWarningModal.tsx
---

# FinalWarningModal

```tsx
import { useModal } from "@/hooks/useModal";

/**
 * FinalWarningModal - 最终警告弹窗
 * 第3次违规时显示，提示账号将被暂停3分钟
 * 迁移自 react-haven FinalWarningModal.tsx
 */

const MODAL_ID = "final-warning-modal";

interface FinalWarningModalProps {
  type?: "decline" | "shortCall";
  endText?: () => React.ReactNode;
  onAnswer: () => void;
  onDecline: () => void;
}

export const FinalWarningModalContent: React.FC<FinalWarningModalProps> = ({ type, endText, onAnswer, onDecline }) => {
  return (
    <div className="relative w-[340px] overflow-hidden rounded-[18px] bg-white text-center shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      {/* 红色警告区域 */}
      <div className="rounded-t-[18px] bg-[#ff3b30] px-4 py-4">
        <div className="mx-auto mb-4 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white text-[40px] font-black text-[#ff3b30]">
          !
        </div>
        <div className="text-sm font-normal text-white">
          Final Warning
          <br />
          This is your 3rd violation (Decline or Short Call). Proceeding will pause your account for 3 mins.
        </div>
        {/* 违规阶梯 */}
        <div className="mt-[18px] rounded-xl">
          <div className="flex items-center justify-between px-0 pt-3 pb-4">
            <div className="flex flex-1 flex-col items-center">
              <div className="flex h-[50px] w-[72px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white/80 pt-[5px] text-[15px] font-bold leading-[18px] text-[#ff3b30]">
                <span className="text-xs font-normal">Violation</span>
                1st
              </div>
            </div>
            <div className="mb-7 text-[#afafaf]">......</div>
            <div className="flex flex-1 flex-col items-center">
              <div className="flex h-[50px] w-[72px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white/80 pt-[5px] text-[15px] font-bold leading-[18px] text-[#ff3b30]">
                <span className="text-xs font-normal">Violation</span>
                2nd
              </div>
            </div>
            <div className="mb-7 text-[#afafaf]">......</div>
            <div className="flex flex-1 flex-col items-center">
              <div className="flex h-[50px] w-[72px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white pt-[5px] text-[15px] font-bold leading-[18px] text-[#ff3b30]">
                <span className="text-xs font-normal">Violation</span>
                3rd
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 按钮区域 */}
      <div className="p-4">
        <button
          className={`mt-2 w-full rounded-full border-none px-0 py-3.5 text-base font-medium text-white active:opacity-80 ${
            type === "shortCall" ? "bg-[#47aeef]" : "bg-[#34c759]"
          }`}
          onClick={onAnswer}
        >
          {type === "shortCall" ? "Stay Online" : "Answer & Stay Online"}
        </button>
        <button
          className="mt-2 w-full rounded-full border-none bg-[#f2f2f7] px-0 py-3.5 text-base font-medium text-[rgba(60,60,67,0.6)] active:opacity-80"
          onClick={onDecline}
        >
          {endText ? endText() : "Accept Suspension (3min)"}
        </button>
      </div>
    </div>
  );
};

// ==================== 导出函数 ====================

export interface ShowFinalWarningModalParams {
  type?: "decline" | "shortCall";
  endText?: () => React.ReactNode;
  onAnswer: () => void;
  onDecline: () => void;
}

export const showFinalWarningModal = (params: ShowFinalWarningModalParams): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(
    MODAL_ID,
    <FinalWarningModalContent
      {...params}
      onAnswer={() => {
        handleClose();
        params.onAnswer();
      }}
      onDecline={() => {
        handleClose();
        params.onDecline();
      }}
    />,
    { variant: "center" },
  );
};

export const closeFinalWarningModal = (): void => {
  useModal.getState().close(MODAL_ID);
};

```
