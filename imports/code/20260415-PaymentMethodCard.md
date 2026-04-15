---
title: PaymentMethodCard
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: PaymentMethodCard.tsx
---

# PaymentMethodCard

```tsx
import { useState, useCallback, useMemo } from "react";
import { PaymentMethod, CashOutStatus } from "@/types/cashout";
import { useUser } from "@/hooks/useUser";
import { PaymentInfoModal } from "@/components/PaymentInfoModal";
import { showCashoutModal } from "@/components/showCashoutModal";

interface PaymentMethodCardProps {
  item: {
    method: PaymentMethod;
    image: string;
    name: string;
  };
}

// 支付方式配置映射
const PAYMENT_METHOD_CONFIG = {
  [PaymentMethod.Visa]: {
    title: "Virtual VISA",
    getContent: (hasPaypal: boolean) =>
      hasPaypal
        ? "Your current balance is only eligible\nfor PayPal cashout.\nReach $100 to unlock Virtual VISA"
        : "Your current balance is only eligible\nfor PayPal.\nReach $100 to unlock Virtual VISA",
  },
  [PaymentMethod.Amazon]: {
    title: "Amazon Giftcard",
    getContent: (hasPaypal: boolean) =>
      hasPaypal
        ? "Your current balance is only eligible\nfor PayPal cashout.\nReach $100 to unlock Amazon"
        : "Your current balance is only eligible\nfor PayPal.\nReach $100 to unlock Amazon",
  },
  [PaymentMethod.Bank]: {
    title: "Bank Transfer",
    getContent: (hasPaypal: boolean) =>
      hasPaypal
        ? "Your current balance is only eligible \nfor PayPal. \nReach $20 to unlock ACH Transfer"
        : "Your current balance is only eligible \nfor PayPal. \nReach $20 to unlock ACH Transfer",
  },
} as const;

export function PaymentMethodCard({ item }: PaymentMethodCardProps) {
  const { paypalAccount } = useUser();
  const linked = item.method === PaymentMethod.PayPal && !!paypalAccount;

  const [modalConfig, setModalConfig] = useState<{
    title: string;
    content: string;
  } | null>(null);

  // 显示绑定 PayPal 弹窗
  const showBindPaypalModal = useCallback(() => {
    showCashoutModal({
      initialStatus: CashOutStatus.BIND_PAYPAL,
      amount: "--",
      onClose: () => setModalConfig(null),
    });
  }, []);

  const onClick = useCallback(() => {
    switch (item.method) {
      case PaymentMethod.PayPal:
        if (!paypalAccount) {
          showBindPaypalModal();
        }
        break;

      case PaymentMethod.Visa:
      case PaymentMethod.Amazon:
      case PaymentMethod.Bank: {
        const config = PAYMENT_METHOD_CONFIG[item.method];
        setModalConfig({
          title: config.title,
          content: config.getContent(!!paypalAccount),
        });
        break;
      }
    }
  }, [item.method, paypalAccount, showBindPaypalModal]);

  const modalProps = useMemo(
    () => ({
      isVisible: !!modalConfig,
      title: modalConfig?.title,
      content: modalConfig?.content,
      actionText: "Switch to PayPal",
      onClose: () => setModalConfig(null),
      onAction: paypalAccount ? () => setModalConfig(null) : showBindPaypalModal,
    }),
    [modalConfig, paypalAccount, showBindPaypalModal],
  );

  return (
    <>
      <div className="relative flex flex-col gap-[7px] w-full cursor-pointer" onClick={onClick}>
        <img className="w-full aspect-[174/77]" src={item.image} alt={item.name} />
        <span className="text-black text-xs font-[Pangram]">{item.name}</span>
        {linked && (
          <span className="absolute top-0 right-0 h-[19px] leading-[19px] px-[10px] rounded-bl-[6px] bg-white/5 text-white text-[11px] font-[Pangram]">
            linked
          </span>
        )}
      </div>

      <PaymentInfoModal {...modalProps} />
    </>
  );
}

```
