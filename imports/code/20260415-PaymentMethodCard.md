---
title: PaymentMethodCard
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: PaymentMethodCard.tsx
---

# PaymentMethodCard

```tsx
import { useState, useCallback, useMemo } from "react";
import { PaymentMethod, CashOutStatus } from "@/types/cashout";
import { useUser } from "@/hooks/useUser";
import { useCashoutStore } from "@/stores/cashoutStore";
import { PaymentInfoModal } from "@/components/PaymentInfoModal";
import { showCashoutModal } from "@/components/showCashoutModal";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

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
  const { paypalAccount, cash } = useUser();
  const { willCashoutStage } = useCashoutStore();
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
    // 埋点：支付方式点击（统一）
    bpTrack(EventName.pwa_cashout_method_click, {
      type: item.method,
    });

    // 埋点：支付方式点击（具体）
    switch (item.method) {
      case PaymentMethod.PayPal:
        bpTrack(EventName.pwa_conv_entry_paypal_click, {
          has_paypal_account: !!paypalAccount,
          type: item.method,
        });
        if (!paypalAccount) {
          showBindPaypalModal();
        } else {
          // 埋点：方式结果 - PayPal 已绑定，可以直接提现
          bpTrack(EventName.pwa_cashout_method_result, {
            type: item.method,
            result: "success",
            message: "PayPal linked",
          });
        }
        break;

      case PaymentMethod.Visa:
        bpTrack(EventName.pwa_conv_entry_visa_click, {
          has_paypal_account: !!paypalAccount,
        });
        {
          const config = PAYMENT_METHOD_CONFIG[item.method];
          setModalConfig({
            title: config.title,
            content: config.getContent(!!paypalAccount),
          });
          // 埋点：方式结果 - Visa 被锁定
          bpTrack(EventName.pwa_cashout_method_result, {
            type: item.method,
            result: "locked",
            message: "Reach $100 to unlock",
          });
          // 埋点：Toast 显示（锁定提示）
          bpTrack(EventName.pwa_cashout_method_toast, {
            type: item.method,
            message: config.title,
          });
        }
        break;

      case PaymentMethod.Amazon:
        bpTrack(EventName.pwa_conv_entry_amazon_click, {
          has_paypal_account: !!paypalAccount,
        });
        {
          const config = PAYMENT_METHOD_CONFIG[item.method];
          setModalConfig({
            title: config.title,
            content: config.getContent(!!paypalAccount),
          });
          // 埋点：方式结果 - Amazon 被锁定
          bpTrack(EventName.pwa_cashout_method_result, {
            type: item.method,
            result: "locked",
            message: "Reach $100 to unlock",
          });
          // 埋点：Toast 显示（锁定提示）
          bpTrack(EventName.pwa_cashout_method_toast, {
            type: item.method,
            message: config.title,
          });
        }
        break;

      case PaymentMethod.Bank:
        bpTrack(EventName.pwa_conv_entry_bank_click, {
          has_paypal_account: !!paypalAccount,
        });
        {
          const config = PAYMENT_METHOD_CONFIG[item.method];
          setModalConfig({
            title: config.title,
            content: config.getContent(!!paypalAccount),
          });
          // 埋点：方式结果 - Bank 被锁定
          bpTrack(EventName.pwa_cashout_method_result, {
            type: item.method,
            result: "locked",
            message: "Reach $20 to unlock",
          });
          // 埋点：Toast 显示（锁定提示）
          bpTrack(EventName.pwa_cashout_method_toast, {
            type: item.method,
            message: config.title,
          });
        }
        break;
    }
  }, [item.method, paypalAccount, showBindPaypalModal, linked]);

  const modalProps = useMemo(
    () => ({
      isVisible: !!modalConfig,
      title: modalConfig?.title,
      content: modalConfig?.content,
      actionText: "Switch to PayPal",
      onClose: () => setModalConfig(null),
      onAction: paypalAccount ? () => setModalConfig(null) : showBindPaypalModal,
      cashoutValue: cash ?? 0,
      isBindPaypal: !!paypalAccount,
      source: "cashout_page",
      taskStage: willCashoutStage,
    }),
    [modalConfig, paypalAccount, showBindPaypalModal, cash, willCashoutStage],
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
