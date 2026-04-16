---
title: CashoutReminderModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: CashoutReminderModal.tsx
---

# CashoutReminderModal

```tsx
/**
 * 提现提醒弹窗组件（通用版）
 */

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { NumberRoll } from "@/components/NumberRoll";
import { useCashoutStore } from "@/stores/cashoutStore";
import { CashoutStage } from "@/types/cashout";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

// 导入动画资源
import handAni from "@/assets/animation/cashout-ani-hand.json";

// 导入图片资源
import icCashoutClose from "@/assets/images/cash/ic_cashout_close.svg";
import icBundleColorCash from "@/assets/images/ic_bundle_color_cash.webp";

export interface CashoutReminderModalProps {
  amount: number;
  title?: string;
  description?: string;
  buttonText?: string;
  onConfirm?: () => void;
  progress?: number;
  onClose?: () => void;
}

export const CashoutReminderModal = ({
  amount,
  title = "Ready to Cash Out!",
  description = "Cash out unlocked! 🎉 One final step to claim your cash!",
  buttonText = "Cash out",
  onConfirm,
  progress,
  onClose,
}: CashoutReminderModalProps) => {
  const { willCashoutStage } = useCashoutStore();
  const [value, setValue] = useState(0);
  const amountRef = useRef(amount);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    // 埋点：提现准备弹窗展示
    bpTrack(EventName.pwa_conv_cash_ready_pop_show);

    setTimeout(() => {
      setValue(amountRef.current);
      setProgressValue(progress ?? 50);
    }, 100);

    return () => {
      setValue(0);
    };
  }, [amount, progress]);

  return (
    <div className="relative flex flex-col items-center">
      {/* 顶部装饰组 */}
      <div className="absolute -top-10 flex items-center justify-center w-20 h-20 rounded-full bg-white">
        <img className="w-[60px] h-[60px]" src={icBundleColorCash} alt="coin" />
      </div>

      {/* 内容卡片 */}
      <div className="flex flex-col w-[82%] bg-white rounded-3xl p-9 gap-4 ">
        <p className="text-center text-black font-semibold text-2xl">{title}</p>
        <p className="text-center text-[rgba(60,60,67,0.6)] font-normal text-[15px] leading-[22px]">{description}</p>

        {/* 金额显示区 */}
        <div className="flex flex-col items-center justify-center gap-4 w-full p-6 bg-[#f2f2f7] rounded-xl">
          <NumberRoll value={value} className="text-warning font-black text-[44px]" />
          <ProgressBar progress={progressValue} backgroundColor="white" />
        </div>

        <div className="relative mt-[30px]">
          <Button
            onClick={() => {
              // 埋点：提现准备弹窗点击按钮
              bpTrack(EventName.pwa_conv_cash_ready_pop_clickButton);
              onConfirm?.();
            }}
          >
            {buttonText}
          </Button>
          {/* 手部动画 */}
          <Lottie
            animationData={handAni}
            className="absolute top-0 right-0 w-[90px] h-[90px] cursor-pointer pointer-events-none"
            loop={true}
            autoplay={true}
          />
        </div>
      </div>

      {/* 关闭按钮 - 第一阶段不允许关闭 */}
      {willCashoutStage !== CashoutStage.StageOne && (
        <img src={icCashoutClose} className="mt-8 cursor-pointer" onClick={onClose} alt="close" />
      )}
    </div>
  );
};

```
