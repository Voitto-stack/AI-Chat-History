---
title: CashoutSuccessModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: CashoutSuccessModal.tsx
---

# CashoutSuccessModal

```tsx
/**
 * 提现成功弹窗组件
 */

import Lottie from "lottie-react";
import { NumberRoll } from "@/components/NumberRoll";

// 导入动画资源
import handSuccess from "@/assets/animation/cashout_success.json";

// 导入图片资源
import icCashoutBackground from "@/assets/images/cash/ic_cashout_background.webp";

export interface CashoutSuccessModalProps {
  amount: number;
  onClose?: () => void;
}

export const CashoutSuccessModal: React.FC<CashoutSuccessModalProps> = ({ amount, onClose }) => {
  return (
    <div
      className="flex flex-col items-center w-full h-full overflow-hidden bg-center bg-cover bg-no-repeat py-25 text-white text-center"
      style={{ backgroundImage: `url(${icCashoutBackground})` }}
    >
      {/* 庆祝动画 */}
      <Lottie animationData={handSuccess} className="w-full" loop={true} autoplay={true} onComplete={() => {}} />

      <div className="w-[77vw] flex-1 flex flex-col items-center">
        {/* 金额展示 */}
        <NumberRoll
          className="-mt-[220px] font-black text-[84px]"
          style={{ transform: "skewX(-12deg)" }}
          value={amount}
        />
        {/* 标题 */}
        <h2 className="mt-[35px] font-black text-[32px] leading-[1.2]">
          Cash Out <br />
          Successful
        </h2>
        {/* 描述 */}
        <p className="mt-[15px] font-normal text-[15px] leading-[1.5] whitespace-pre-line opacity-90">
          You should see money in your PayPalaccount within 15 minutes.
        </p>
      </div>

      {/* 底部按钮 */}
      <button
        className="w-[90vw] h-[60px] bg-white text-[#47aeef] font-[590] text-base border-none rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] cursor-pointer"
        onClick={onClose}
      >
        Keep Earning
      </button>
    </div>
  );
};

```
