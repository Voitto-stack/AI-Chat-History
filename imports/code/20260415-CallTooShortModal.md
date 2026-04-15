---
title: CallTooShortModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: CallTooShortModal.tsx
---

# CallTooShortModal

```tsx
import { useModal } from "@/hooks/useModal";
import { toast } from "@/utils/toast";

/**
 * CallTooShortModal - 通话时间过短弹窗
 *
 * type="result"    → 通话结束后提示（单按钮）
 * type="retention" → 通话中挽留（双按钮 End Call / Keep earning）
 */

const MODAL_ID = "call-too-short-modal";

// ==================== result 类型（通话结束后） ====================

interface ResultProps {
  onClose: () => void;
}

const ResultContent: React.FC<ResultProps> = ({ onClose }) => (
  <div className="flex w-[340px] flex-col items-center rounded-[32px] bg-white p-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
    <div className="mb-5 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#ff3b30] text-[54px] font-bold text-white">
      !
    </div>
    <div className="mb-3 text-2xl font-bold tracking-[-0.5px] text-[#222]">Call too short</div>
    <div className="mb-8 text-base font-normal text-black">Your call ended in less than 30 seconds</div>
    <div className="mb-8 flex w-full items-center justify-center rounded-[14px] bg-[#f4faff] py-2.5">
      <span className="mr-1.5 text-lg" role="img" aria-label="bulb">
        💡
      </span>
      <span className="text-xs font-normal text-[#3b82f6]">Stay on the call longer to earn more!</span>
    </div>
    <button
      className="w-full rounded-full border-none bg-[#111] py-[18px] text-base font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors duration-200 active:bg-[#222]"
      onClick={onClose}
      type="button"
    >
      I'll make the next call better.
    </button>
  </div>
);

// ==================== retention 类型（通话中挽留） ====================

interface RetentionProps {
  countdownFinish: boolean;
  onEndCall: () => void;
  onContinue: () => void;
}

export const CallTooShortRetentionContent: React.FC<RetentionProps> = ({
  countdownFinish,
  onEndCall,
  onContinue,
}) => (
  <div className="relative w-[318px] rounded-2xl bg-white">
    <button
      className="absolute top-3 right-[18px] border-none bg-transparent p-1 text-xl text-[#999] active:opacity-60"
      onClick={onContinue}
    >
      ✕
    </button>
    <div className="mx-6 mt-[42px] mb-3 text-center text-[22px] font-bold text-[#012269]">Call Too Short!</div>
    <div className="mx-3 mt-1.5 text-center text-[15px] font-normal text-[#012269b2]">
      Stick around for 30 sec and it&apos;s yours! Wanna miss it?
    </div>
    <div className="mx-6 mt-[50px] mb-6 flex gap-2">
      <div className="flex-1">
        <div
          className="w-full cursor-pointer rounded-full bg-[#dae7f6] px-4 py-4 text-center text-[15px] font-medium text-[#012269] active:opacity-80"
          onClick={() => {
            if (countdownFinish) {
              onEndCall();
            } else {
              toast.info("Cannot Be End Right Now. Try It Later.");
            }
          }}
        >
          End Call
        </div>
      </div>
      <div className="flex-1">
        <div
          className="w-full cursor-pointer rounded-full bg-[#238bff] px-4 py-4 text-center text-[15px] font-medium text-white active:opacity-80"
          onClick={onContinue}
        >
          Keep earning
        </div>
      </div>
    </div>
  </div>
);

// ==================== 导出函数 ====================

export const showCallTooShortModal = (): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(MODAL_ID, <ResultContent onClose={handleClose} />, {
    variant: "center",
  });
};

export const showCallTooShortModalAsync = (): Promise<void> => {
  return new Promise((resolve) => {
    const modalStore = useModal.getState();

    const handleClose = () => {
      modalStore.close(MODAL_ID);
    };

    modalStore.open(MODAL_ID, <ResultContent onClose={handleClose} />, {
      variant: "center",
      onClose: resolve,
    });
  });
};

export interface ShowCallTooShortRetentionParams {
  countdownFinish: boolean;
  onEndCall: () => void;
  onContinue: () => void;
}

export const showCallTooShortRetention = (params: ShowCallTooShortRetentionParams): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(
    MODAL_ID,
    <CallTooShortRetentionContent
      countdownFinish={params.countdownFinish}
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

export const closeCallTooShortModal = () => {
  useModal.getState().close(MODAL_ID);
};

```
