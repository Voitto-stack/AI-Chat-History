---
title: BindPaypalModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: BindPaypalModal.tsx
---

# BindPaypalModal

```tsx
/**
 * 绑定 PayPal 弹窗组件（邮箱版本 - 纯内容组件）
 * 用于第一、二阶段的简单邮箱绑定
 *
 * 使用方式：
 * 1. 独立使用：调用 showBindPaypalModal()
 * 2. 在其他流程中：直接渲染此组件
 */

import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { toast } from "@/utils/toast";
import { validateEmail } from "@/utils/validate";
import NavigationBar from "@/components/NavigationBar";
import Button from "@/components/Button";
import icPaypal from "@/assets/images/cash/icon_paypal_cashoutani.svg";

export interface BindPaypalModalProps {
  amount: string;
  onBack?: () => void;
  onSubmit?: (email: string) => Promise<void>;
}

const BIND_PAYPAL_MODAL_ID = "bind-paypal-modal";

export const BindPaypalModal = ({ amount, onBack, onSubmit }: BindPaypalModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const validateResult = validateEmail(email);
    if (!validateResult.valid) {
      toast.error(validateResult.message);
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit?.(email);
    } catch {
      toast.error("Failed to bind PayPal account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-dvh bg-white">
      <NavigationBar title="Cash Out" onBack={onBack} sticky={false} showBorder={false} />
      {/* 内容区域 - 可滚动，键盘弹起时按钮可见 */}
      <div className="flex-1 flex flex-col overflow-y-auto px-6 pt-6 pb-6">
        {/* 顶部蓝色区域 - PayPal 图标和金额 */}
        <div className="flex flex-col items-center justify-center w-full h-[140px] shrink-0 rounded-[10px] bg-[#47aeef]">
          <img src={icPaypal} alt="PayPal" />
          <div className="text-white font-[800] text-[30px] leading-normal">${amount}</div>
        </div>
        <h3 className="mt-[40px] text-black font-semibold text-xl leading-none">Enter Your PayPal Email Account</h3>

        <p className="mt-4 text-[rgba(60,60,67,0.6)] font-normal text-[15px] leading-5 tracking-[-0.23px]">
          Please make sure the PayPal email is correct.
        </p>

        <input
          type="email"
          placeholder="Enter your PayPal email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[58px] mt-5 px-4 py-[11px] border border-[#e5e5ea] rounded-[10px] bg-[#f2f2f7] text-black font-normal text-[15px] leading-[29px] outline-none disabled:opacity-50"
          disabled={isLoading}
        />

        <div className="flex-grow min-h-[30px]" />

        <div className="w-full shrink-0">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Binding..." : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * 独立显示绑定 PayPal 弹窗
 * 使用 fullscreen 模式
 *
 * @param amount - 提现金额（用于显示）
 * @param onSubmit - 绑定成功回调，返回 Promise<void>，成功后自动关闭弹窗
 * @param onBack - 返回按钮回调（可选）
 */
// eslint-disable-next-line react-refresh/only-export-components
export function showBindPaypalModal(params: {
  amount: string;
  onSubmit?: (email: string) => Promise<void>;
  onBack?: () => void;
}): void {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(BIND_PAYPAL_MODAL_ID);
  };

  const handleBack = () => {
    handleClose();
    params.onBack?.();
  };

  const handleSubmit = async (email: string) => {
    await params.onSubmit?.(email);
    handleClose();
  };

  modalStore.open(
    BIND_PAYPAL_MODAL_ID,
    <BindPaypalModal amount={params.amount} onBack={handleBack} onSubmit={handleSubmit} />,
    { variant: "fullscreen" },
  );
}

/**
 * 关闭绑定 PayPal 弹窗
 */
// eslint-disable-next-line react-refresh/only-export-components
export function closeBindPaypalModal(): void {
  const modalStore = useModal.getState();
  modalStore.close(BIND_PAYPAL_MODAL_ID);
}

```
