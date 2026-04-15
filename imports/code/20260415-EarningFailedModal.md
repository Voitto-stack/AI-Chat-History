---
title: EarningFailedModal
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: EarningFailedModal.tsx
---

# EarningFailedModal

```tsx
/* eslint-disable react-refresh/only-export-components */
import { useModal } from "@/hooks/useModal";

/**
 * EarningFailedModal - 无收益弹窗
 * 通话未达标时显示
 */

const MODAL_ID = "earning-failed-modal";

interface EarningFailedModalContentProps {
  content?: string;
  showClose?: boolean;
  onClose: () => void;
}

export const EarningFailedModalContent: React.FC<EarningFailedModalContentProps> = ({
  content,
  showClose,
  onClose,
}) => {
  return (
    <div className="relative w-[318px] overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      {showClose && (
        <button
          className="absolute top-3 right-[18px] border-none bg-transparent p-1 text-xl text-[#999] active:opacity-60"
          onClick={onClose}
        >
          ✕
        </button>
      )}
      <div
        className={`mx-6 ${showClose ? "mt-[42px]" : "mt-6"} mb-3 text-center text-[22px] font-bold text-brand-dark`}
      >
        No Earnings This Time
      </div>
      <div className="mx-6 mt-1.5 text-center text-[15px] font-normal text-brand-dark/70">
        {content || "Just Chat for over 30 seconds next time to qualify for rewards!"}
      </div>
      <div className="mx-6 mt-6 mb-6">
        <div
          className="w-full cursor-pointer rounded-full bg-[#238bff] px-4 py-4 text-center text-[15px] font-medium text-white active:opacity-80"
          onClick={onClose}
        >
          Got it
        </div>
      </div>
    </div>
  );
};

/**
 * 显示无收益弹窗
 * @param content 自定义提示文案
 */
export const showEarningFailedModal = (content?: string): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(MODAL_ID, <EarningFailedModalContent content={content} onClose={handleClose} />, {
    variant: "center",
  });
};

/**
 * 显示无收益弹窗（Promise 版本，关闭后 resolve）
 * @param content 自定义提示文案
 */
export const showEarningFailedModalAsync = (content?: string): Promise<void> => {
  return new Promise((resolve) => {
    const modalStore = useModal.getState();

    const handleClose = () => {
      modalStore.close(MODAL_ID);
    };

    modalStore.open(MODAL_ID, <EarningFailedModalContent content={content} onClose={handleClose} />, {
      variant: "center",
      onClose: resolve,
    });
  });
};

export const closeEarningFailedModal = () => {
  useModal.getState().close(MODAL_ID);
};

```
