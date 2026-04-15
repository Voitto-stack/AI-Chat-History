---
title: PaymentInfoModal
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: PaymentInfoModal.tsx
---

# PaymentInfoModal

```tsx
/**
 * 支付方式信息弹窗组件
 * 用于显示不同支付方式的解锁提示
 */

import { ReactNode, useMemo, useEffect } from "react";
import ModalContainer from "@/components/ModalContainer";
import Button from "@/components/Button";
import iconAmazonTip from "@/assets/images/cash_v2/icon_amazon_tip.webp";
import iconBankTip from "@/assets/images/cash_v2/icon_bank_tip.webp";
import iconVisaTip from "@/assets/images/cash_v2/icon_visa_tip.webp";
import iconWarning from "@/assets/images/cash_v2/icon_warning.webp";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

export interface PaymentInfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAction?: () => void;
  title?: string;
  content?: ReactNode;
  actionText?: string;
  cashoutValue?: number;
  isBindPaypal?: boolean;
  source?: string;
  taskStage?: number | string;
}

// 图标映射配置
const ICON_MAP: Record<string, string> = {
  amazon: iconAmazonTip,
  bank: iconBankTip,
  visa: iconVisaTip,
};

export function PaymentInfoModal({
  isVisible,
  onClose,
  onAction,
  title = "Title",
  content = "Your current balance is only eligible\nfor PayPal cashout.\nReach $100 to unlock Virtual VISA",
  actionText = "Get",
  cashoutValue,
  isBindPaypal,
  source = "cashout_page",
  taskStage,
}: PaymentInfoModalProps) {
  // 根据标题选择图标
  const iconSrc = useMemo(() => {
    const lowerTitle = title.toLowerCase();
    const matchedKey = Object.keys(ICON_MAP).find((key) => lowerTitle.includes(key));
    return matchedKey ? ICON_MAP[matchedKey] : iconWarning;
  }, [title]);

  // 埋点：Popover 显示
  useEffect(() => {
    if (isVisible) {
      bpTrack(EventName.pwa_cashout_popover_show, {
        payment_method: title,
        cashout_value: cashoutValue,
        is_bind_paypal: isBindPaypal,
        source,
        task_stage: taskStage,
      });
    }
  }, [isVisible, title, cashoutValue, isBindPaypal, source, taskStage]);

  const handleActionClick = () => {
    // 埋点：Popover 按钮点击
    bpTrack(EventName.pwa_cashout_popover_click, {
      payment_method: title,
      action_text: actionText,
      cashout_value: cashoutValue,
      is_bind_paypal: isBindPaypal,
      source,
      task_stage: taskStage,
    });
    onAction?.();
  };

  return (
    <ModalContainer open={isVisible} onClose={onClose} variant="bottom-sheet">
      <div className="flex flex-col items-center w-full px-[23px] pt-[31px] pb-8 bg-white rounded-t-[32px] text-center gap-3">
        <img src={iconSrc} alt="icon" className="w-[50px] h-[50px] mb-[15px]" />

        <h2 className="text-black font-bold text-[19px] leading-6 font-[Pangram] tracking-[-0.23px]">{title}</h2>

        <p className="text-black font-normal text-[15px] leading-6 font-[Pangram] whitespace-pre-line">{content}</p>

        <Button variant="primary" onClick={handleActionClick}>
          {actionText}
        </Button>

        <span
          className="text-[rgba(60,60,67,0.3)] font-normal text-[15px] leading-6 font-[Pangram] tracking-[-0.23px] cursor-pointer"
          onClick={onClose}
        >
          Not now
        </span>
      </div>
    </ModalContainer>
  );
}

```
