---
title: GoLiveModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: GoLiveModal.tsx
---

# GoLiveModal

```tsx
/* eslint-disable react-refresh/only-export-components */
import { useModal } from "@/hooks/useModal";

/**
 * GoLiveModal - Go Live 启用弹窗
 * 提示用户启用自动接听以更快获取订单
 * 迁移自 react-haven GoLiveModal.tsx
 */

const MODAL_ID = "go-live-modal";

interface GoLiveModalProps {
  onEnable: () => void;
  onClose: () => void;
}

const GoLiveModalContent: React.FC<GoLiveModalProps> = ({ onEnable, onClose }) => {
  const handleEnable = () => {
    onEnable();
    onClose();
  };

  return (
    <div className="flex w-full max-w-[314px] flex-col gap-[18px] rounded-[18px] bg-[#f8fcff] p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_3px_8px_rgba(0,0,0,0.15),0_3px_1px_rgba(0,0,0,0.06)]">
      <div className="flex w-full flex-col items-start gap-[18px] text-center">
        <p className="m-0 w-full text-lg font-medium capitalize leading-[22px] tracking-[-0.23px] text-black">
          Get Orders Faster
        </p>
        <p className="m-0 w-full text-[15px] font-normal leading-5 text-[rgba(60,60,67,0.6)]">
          Enable "go live" to auto-answer calls. We'll assign orders to you in under 1 min.
        </p>
      </div>
      <button
        className="flex h-[50px] w-full items-center justify-center rounded-full border-none bg-brand text-[15px] font-medium tracking-[0.1px] text-white shadow-[0_4px_12px_rgba(71,174,239,0.3)] active:scale-[0.98] active:opacity-80"
        onClick={handleEnable}
        type="button"
      >
        Enable "Go Live"
      </button>
    </div>
  );
};

// ==================== 导出函数 ====================

export const showGoLiveModal = ({ onEnable }: { onEnable: () => void }): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(MODAL_ID, <GoLiveModalContent onEnable={onEnable} onClose={handleClose} />, {
    variant: "center",
  });
};

export const closeGoLiveModal = (): void => {
  useModal.getState().close(MODAL_ID);
};

```
