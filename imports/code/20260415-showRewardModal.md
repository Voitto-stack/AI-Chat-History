---
title: showRewardModal
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: showRewardModal.tsx
---

# showRewardModal

```tsx
import { useMemo, useState, useEffect } from "react";
import { NumberRoll } from "@/components/NumberRoll";
import { AnimatedModalContainer } from "@/components/AnimatedModalContainer";
import { useModal } from "@/hooks/useModal";
import bgEarnCashContent from "@/assets/images/cash/bg_earn_cash_content.webp";
import imgEarnCash from "@/assets/images/cash/img_earn_cash.webp";
import icCashoutClose from "@/assets/images/cash/ic_cashout_close.svg";
import Button from "@/components/Button";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

const MODAL_ID = "reward-modal";

interface RewardModalProps {
  originBalance: number;
  earned: number;
  onClose: () => void;
  trackContext?: {
    target_user_id?: string;
    target_user_type?: string;
    source?: string;
  };
}

// eslint-disable-next-line react-refresh/only-export-components
function RewardModalContent({ originBalance, earned, onClose, trackContext }: RewardModalProps) {
  const [newBalance, setNewBalance] = useState(originBalance);

  const earnedText = useMemo(() => earned.toFixed(2), [earned]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNewBalance(originBalance + earned);
    }, 500);
    return () => clearTimeout(timer);
  }, [originBalance, earned]);

  // 埋点：等待奖励弹窗显示
  useEffect(() => {
    bpTrack(EventName.pwa_waiting_reward_show, {
      earned: earned,
      origin_balance: originBalance,
      earning_value: earned,
      total_earning_value: originBalance + earned,
      ...(trackContext?.target_user_id && { target_user_id: trackContext.target_user_id }),
      ...(trackContext?.target_user_type && { target_user_type: trackContext.target_user_type }),
      ...(trackContext?.source && { source: trackContext.source }),
    });
    bpTrack(EventName.pwa_ai_onboarding_reward_toast, { reward_money: earned });
  }, [earned, originBalance, trackContext]);

  return (
    <AnimatedModalContainer onClose={onClose}>
      <div
        className="flex flex-col items-center"
        style={{
          fontFamily: "Pangram",
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
              <h2 className="m-0 text-brand-dark font-extrabold text-2xl leading-7 tracking-wider">CONGRATS</h2>
              <p className="m-0 text-brand-dark/50 font-semibold text-[15px] leading-[18px]">
                You Got Paid <span className="text-[#FF9000]">${earnedText}</span>
              </p>
            </div>
            <img className="w-[110px] h-[110px] -mt-5" src={imgEarnCash} alt="cash" />
          </div>

          {/* 内容区 */}
          <div className="flex flex-col items-center w-[84%] my-[22px] flex-1 gap-6">
            {/* 余额信息卡片 */}
            <div className="flex w-full h-[85px] p-3 rounded-xl bg-[#ffffff99]">
              <div className="flex-1 flex flex-col items-center justify-center gap-1">
                <NumberRoll
                  value={newBalance}
                  className="text-brand-dark font-normal text-[28px] leading-[35px]"
                  style={{ fontFamily: "RacingSansOne, serif" }}
                />
                <span className="px-2 py-1 rounded-xl bg-[#cfeaff] text-brand-dark font-semibold text-[10px] leading-3">
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
            <Button
              onClick={() => {
                // 埋点：等待奖励弹窗 - 继续赚钱点击
                bpTrack(EventName.pwa_waiting_reward_click, {
                  action: "continue_earning",
                  earned: earned,
                  earning_value: earned,
                  total_earning_value: originBalance + earned,
                  ...(trackContext?.target_user_id && { target_user_id: trackContext.target_user_id }),
                  ...(trackContext?.target_user_type && { target_user_type: trackContext.target_user_type }),
                  ...(trackContext?.source && { source: trackContext.source }),
                });
                bpTrack(EventName.pwa_reward_claim, { earned: earned });
                onClose();
              }}
            >
              Continue Earning
            </Button>
          </div>
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
export function showRewardModal(
  originBalance: number,
  earned: number,
  trackContext?: RewardModalProps["trackContext"],
): void {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(
    MODAL_ID,
    <RewardModalContent
      originBalance={originBalance}
      earned={earned}
      onClose={handleClose}
      trackContext={trackContext}
    />,
    { variant: "fullscreen" },
  );
}

/**
 * 显示奖励弹窗（Promise 版本，关闭后 resolve）
 */
// eslint-disable-next-line react-refresh/only-export-components
export function showRewardModalAsync(
  originBalance: number,
  earned: number,
  trackContext?: RewardModalProps["trackContext"],
): Promise<void> {
  return new Promise((resolve) => {
    const modalStore = useModal.getState();

    const handleClose = () => {
      modalStore.close(MODAL_ID);
    };

    modalStore.open(
      MODAL_ID,
      <RewardModalContent
        originBalance={originBalance}
        earned={earned}
        onClose={handleClose}
        trackContext={trackContext}
      />,
      { variant: "fullscreen", onClose: resolve },
    );
  });
}

```
