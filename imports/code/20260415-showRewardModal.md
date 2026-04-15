---
title: showRewardModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: showRewardModal.tsx
---

# showRewardModal

```tsx
import { useEffect, useMemo, useState } from "react";
import { NumberRoll } from "@/components/NumberRoll";
import { AnimatedModalContainer } from "@/components/AnimatedModalContainer";
import { useModal } from "@/hooks/useModal";
import bgEarnCashContent from "@/assets/images/cash/bg_earn_cash_content.webp";
import imgEarnCash from "@/assets/images/cash/img_earn_cash.webp";
import icCashoutClose from "@/assets/images/cash/ic_cashout_close.svg";

const MODAL_ID = "reward-modal";

interface RewardModalProps {
  originBalance: number;
  earned: number;
  onClose: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
function RewardModalContent({ originBalance, earned, onClose }: RewardModalProps) {
  const [newBalance, setNewBalance] = useState(originBalance);

  const earnedText = useMemo(() => earned.toFixed(2), [earned]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewBalance(originBalance + earned);
    }, 500);
    return () => clearTimeout(timer);
  }, [originBalance, earned]);

  return (
    <AnimatedModalContainer onClose={onClose}>
      <div
        className="flex flex-col items-center"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          animation: "scaleUp 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        }}
      >
        {/* 奖励卡片 */}
        <div
          className="flex flex-col items-center w-[310px] h-[309px] bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${bgEarnCashContent})` }}
        >
          {/* 头部区域 */}
          <div className="flex self-start">
            <div className="flex flex-col mt-[30px] ml-8">
              <h2 className="m-0 text-[#012269] font-extrabold text-2xl leading-7 tracking-wider">CONGRATS</h2>
              <p className="m-0 text-[#0122697f] font-semibold text-[15px] leading-[18px]">
                You Got Paid <span className="text-[#FF9000]">${earnedText}</span>
              </p>
            </div>
            <img className="w-[110px] h-[110px] -mt-5" src={imgEarnCash} alt="cash" />
          </div>

          {/* 余额信息卡片 */}
          <div className="flex w-[84%] h-[85px] mt-[22px] px-3 py-3 rounded-xl bg-[#ffffff99]">
            <div className="flex-1 flex flex-col items-center justify-center gap-1">
              <NumberRoll
                value={newBalance}
                className="text-[#012269] font-normal text-[28px] leading-[35px]"
                style={{ fontFamily: "RacingSansOne, serif" }}
              />
              <span className="px-2 py-1 rounded-xl bg-[#cfeaff] text-[#012269] font-semibold text-[10px] leading-3">
                New Balance
              </span>
            </div>

            <div className="w-px h-[54px] bg-[#cfeaff] mx-2 self-center" />
            <div className="flex-1 flex flex-col items-center justify-center gap-1">
              <span
                className="text-[#ff9000] font-normal text-[28px] leading-[35px]"
                style={{ fontFamily: "RacingSansOne, serif" }}
              >
                ${earnedText}
              </span>
              <span className="px-2 py-1 rounded-xl bg-[#ffedc7] text-[#ff9000] font-semibold text-[10px] leading-3">
                Earning
              </span>
            </div>
          </div>

          {/* 按钮 */}
          <button
            className="w-[79.4%] h-14 mt-auto mb-[33px] px-4 py-4 rounded-[32px] border-none text-[#012269] font-medium text-[15px] leading-[18px] cursor-pointer"
            style={{ background: "linear-gradient(0deg, #ffd82a 0%, #ffd82a 100%), rgba(167, 55, 255, 0.07)" }}
            onClick={onClose}
            type="button"
          >
            Continue Earning
          </button>
        </div>

        {/* 关闭按钮 */}
        <button
          className="mt-5 cursor-pointer border-none bg-transparent p-0"
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          <img src={icCashoutClose} alt="close" />
        </button>
      </div>
    </AnimatedModalContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function showRewardModal(originBalance: number, earned: number): void {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(
    MODAL_ID,
    <RewardModalContent originBalance={originBalance} earned={earned} onClose={handleClose} />,
    { variant: "fullscreen" },
  );
}

/**
 * 显示奖励弹窗（Promise 版本，关闭后 resolve）
 */
// eslint-disable-next-line react-refresh/only-export-components
export function showRewardModalAsync(originBalance: number, earned: number): Promise<void> {
  return new Promise((resolve) => {
    const modalStore = useModal.getState();

    const handleClose = () => {
      modalStore.close(MODAL_ID);
    };

    modalStore.open(
      MODAL_ID,
      <RewardModalContent originBalance={originBalance} earned={earned} onClose={handleClose} />,
      { variant: "fullscreen", onClose: resolve },
    );
  });
}

```
