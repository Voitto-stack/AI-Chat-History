---
title: DeclineDialogModal
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: DeclineDialogModal.tsx
---

# DeclineDialogModal

```tsx
import { useModal } from "@/hooks/useModal";
import { useCall } from "@/hooks/useCall";
import { formatNumber } from "@/utils/format";

/**
 * DeclineDialogModal - 拒绝通话挽留弹窗
 *
 * 两种状态：
 * - rejectedCount === 0: "Give up {releasePrice * 60}$/h?"
 * - rejectedCount === 1: "Again? Your rank is dropping"
 */

const MODAL_ID = "decline-dialog-modal";

interface DeclineDialogModalProps {
  rejectedCount: number;
  onAccept: () => void;
  onDecline: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
const DeclineDialogModalContent: React.FC<DeclineDialogModalProps> = ({ rejectedCount, onAccept, onDecline }) => {
  const { releasePrice } = useCall();
  const hourlyRate = formatNumber(releasePrice * 60);

  return (
    <div className="flex w-[300px] flex-col items-center gap-5 rounded-[20px] bg-[#f8fcff] px-4 py-5">
      <div className="flex w-full flex-col items-center gap-2 p-2">
        <div className="w-full text-center text-[18px] font-medium leading-[1.22em] tracking-[-0.23px] text-black">
          {rejectedCount === 0 ? `Decline $${hourlyRate}/hour?` : "Declining frequently lowers your rank"}
        </div>
        <div className="w-[252px] text-center text-[15px] font-normal leading-[1.33em] tracking-[-0.23px] text-[rgba(60,60,67,0.6)]">
          {rejectedCount === 0
            ? "Declining this call will pause your video earnings, and you'll miss out on other potential revenue. Don't let this money slip away!"
            : "Declining calls frequently lowers your recommendation ranking. Answer to stay visible!"}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2.5">
        <button
          className="flex w-[260px] items-center justify-center gap-[5px] rounded-full border-none bg-[#34c759] px-4 py-4 text-[14px] font-medium leading-[1.14em] text-white transition-opacity active:opacity-80"
          onClick={onAccept}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.0417 9.91667C11.2917 9.91667 10.5583 9.80417 9.86667 9.59583C9.66667 9.53333 9.45 9.575 9.28333 9.73333L8.15833 11.1333C6.2 10.1833 3.86667 7.91667 2.86667 5.89167L4.25 4.72917C4.40833 4.55833 4.44167 4.34167 4.38333 4.14167C4.17083 3.44583 4.05833 2.7125 4.05833 1.9625C4.05833 1.56667 3.74167 1.25 3.34583 1.25H1.49167C1.09583 1.25 0.75 1.59583 0.75 1.99167C0.75 7.94583 5.55 12.75 11.5 12.75C11.8833 12.75 12.2292 12.4042 12.2292 12.0083V10.1667C12.2417 9.77083 11.925 9.45417 11.5292 9.45417L12.0417 9.91667Z"
              fill="currentColor"
            />
          </svg>
          {rejectedCount === 0 ? "Answer Call" : "Answer Call"}
        </button>
        <button
          className="flex w-[260px] items-center justify-center rounded-full border-none bg-[#f2f2f7] px-4 py-4 text-[14px] font-medium leading-[1.14em] text-[rgba(60,60,67,0.6)] transition-opacity active:opacity-80"
          onClick={onDecline}
        >
          {rejectedCount === 0 ? "Decline" : "Decline"}
        </button>
      </div>
    </div>
  );
};

export interface ShowDeclineDialogModalParams {
  rejectedCount: number;
  onAccept: () => void;
  onDecline: () => void;
}

export const showDeclineDialogModal = (params: ShowDeclineDialogModalParams): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(
    MODAL_ID,
    <DeclineDialogModalContent
      rejectedCount={params.rejectedCount}
      onAccept={() => {
        handleClose();
        params.onAccept();
      }}
      onDecline={() => {
        handleClose();
        params.onDecline();
      }}
    />,
    { variant: "center" },
  );
};

export const closeDeclineDialogModal = (): void => {
  useModal.getState().close(MODAL_ID);
};

```
