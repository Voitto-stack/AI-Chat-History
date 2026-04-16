---
title: CashoutFailedModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: CashoutFailedModal.tsx
---

# CashoutFailedModal

```tsx
/**
 * 提现失败弹窗组件
 * 显示提现失败信息，并提供申诉按钮
 *
 * 设计风格参考：PayPalBindResultModal
 */

import { openEmailClient } from "@/utils/bridge";
import { bpTrack } from "@/tracking/api/byteplus";
import { EventName } from "@/tracking/events";
import icPaypal from "@/assets/images/cash/icon_paypal_chash_ani_process2.webp";

export interface CashoutFailedModalProps {
  amount?: string;
  reason?: string;
  onClose?: () => void;
}

export const CashoutFailedModal: React.FC<CashoutFailedModalProps> = ({ amount, reason, onClose }) => {
  const handleContactSupport = () => {
    // 埋点：提交申诉
    bpTrack(EventName.bff_appeal_submit, {
      amount: amount || "0",
      reason: reason || "unknown",
      appeal_type: "cashout_failed",
    });

    const subject = "Cash Out Failed - Need Help";
    const body = `Hi Support Team,

My cash out request failed. Here are the details:
- Amount: $${amount || "N/A"}
- Issue: ${reason || "Cash out failed"}

Please help me resolve this issue.

Thank you!`;

    openEmailClient("pwacontact@gracechat.com", subject, body);
  };

  return (
    <div className="relative w-[342px] flex flex-col items-center bg-white rounded-[20px] p-6 gap-3 shadow-lg">
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-[#8E8E93] hover:text-black transition-colors"
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 1L13 13M1 13L13 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* PayPal 图标 */}
      <div className="flex justify-center w-auto mt-2">
        <img className="w-16 h-16" src={icPaypal} alt="PayPal" />
      </div>

      {/* 标题 */}
      <h3 className="text-center text-black font-semibold text-[17px] leading-[22px] tracking-[-0.41px]">
        Payment in process
      </h3>

      {/* 说明 */}
      <p className="text-center text-[rgba(60,60,67,0.6)] text-[13px] leading-[18px] tracking-[-0.08px] font-normal px-2">
        {reason ||
          "Your PayPal account could not be verified. Please contact support for further assistance with your payment."}
      </p>

      {/* 金额显示 - 带灰色背景 */}
      <div className="flex items-center justify-center w-[302px] h-[78px] bg-[#F5F5F5] rounded-[14px] mt-2 pt-[18px] pr-[105px] pb-[17px] pl-[106px]">
        <p className="text-black font-semibold text-[34px] leading-[41px] tracking-[0.37px]">${amount || "0.00"}</p>
      </div>

      {/* Contact Support 按钮 */}
      <button
        onClick={handleContactSupport}
        className="w-[302px] h-[51px] bg-[#47AEEF] hover:bg-[#3A9DD9] active:bg-[#2E8BC2] text-white font-semibold text-[17px] leading-[22px] tracking-[-0.41px] rounded-full py-[15px] px-[10px] transition-colors mt-2"
      >
        Contact Support
      </button>
    </div>
  );
};

```
