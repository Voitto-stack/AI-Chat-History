---
title: PayPalBindResultModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: PayPalBindResultModal.tsx
---

# PayPalBindResultModal

```tsx
/**
 * PayPal 绑定结果弹窗（纯内容组件）
 * 显示 PayPal OAuth 登录绑定的结果（成功或失败）
 *
 * 使用方式：
 * 1. 独立使用：调用 showPayPalBindResultModal()
 * 2. 在其他流程中：直接渲染此组件，需要配合 bottom-sheet 容器
 */

import { useModal } from "@/hooks/useModal";
import { openEmailClient } from "@/utils/bridge";
import Button from "@/components/Button";
import icPaypal from "@/assets/images/cash/icon_paypal_chash_ani_process2.webp";
import icSuccess from "@/assets/images/cash/icon_success_verify_paypal.svg";
import icFailMini from "@/assets/images/cash/icon_fail_verify_paypal_mini.webp";

export interface PayPalBindResultModalProps {
  success: boolean;
  onContinue?: () => void;
  onRetry?: () => void;
  onCancel?: () => void;
}

const PAYPAL_RESULT_MODAL_ID = "paypal-bind-result-modal";

/**
 * PayPal 绑定结果弹窗内容（纯组件）
 */
export const PayPalBindResultModal = ({ success, onContinue, onRetry, onCancel }: PayPalBindResultModalProps) => {
  const handleContactUs = () => {
    openEmailClient("pwacontact@gracechat.com", "Support Request", "Please describe your issue here");
  };

  return (
    <div className="w-full flex flex-col items-center bg-white rounded-t-3xl p-8 gap-2">
      {/* 图标 */}
      {success ? (
        <img className="w-[42px] h-[42px]" src={icSuccess} alt="Success" />
      ) : (
        <div className="relative flex justify-center w-auto">
          <img className="w-[46px] h-[46px]" src={icPaypal} alt="PayPal" />
          <img
            className="absolute w-4 h-4"
            style={{ right: "calc(50% - 27px)", bottom: "-3px" }}
            src={icFailMini}
            alt="Failed"
          />
        </div>
      )}

      {/* 标题 */}
      <h3 className="text-center text-black font-extrabold text-[21px] leading-normal">
        {success ? "Account upgrade complete!" : "Linked Failed"}
      </h3>

      {/* 说明 */}
      <p className="text-center text-[rgba(60,60,67,0.6)] text-[15px] leading-5 font-normal">
        {success ? "Large-amount cashout is now available." : "Large-amount cashout is not available."}
      </p>

      {/* 按钮 */}
      <div className="flex flex-col w-full gap-3 mt-4">
        {success ? (
          <Button onClick={onContinue}>Continue</Button>
        ) : (
          <>
            <Button onClick={onRetry}>Retry</Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="text" onClick={handleContactUs}>
              Contact us
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * 独立显示 PayPal 绑定结果弹窗
 * 使用 bottom-sheet 模式，从底部弹出
 */
// eslint-disable-next-line react-refresh/only-export-components
export function showPayPalBindResultModal(props: PayPalBindResultModalProps): void {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(PAYPAL_RESULT_MODAL_ID);
  };

  modalStore.open(
    PAYPAL_RESULT_MODAL_ID,
    <PayPalBindResultModal
      {...props}
      onContinue={() => {
        handleClose();
        props.onContinue?.();
      }}
      onRetry={() => {
        handleClose();
        props.onRetry?.();
      }}
      onCancel={() => {
        handleClose();
        props.onCancel?.();
      }}
    />,
    { variant: "bottom-sheet" },
  );
}

/**
 * 关闭 PayPal 绑定结果弹窗
 */
// eslint-disable-next-line react-refresh/only-export-components
export function closePayPalBindResultModal(): void {
  const modalStore = useModal.getState();
  modalStore.close(PAYPAL_RESULT_MODAL_ID);
}

```
