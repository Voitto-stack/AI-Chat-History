---
title: BffW2RewardModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: BffW2RewardModal.tsx
---

# BffW2RewardModal

```tsx
/**
 * BFF W2 阶段专属奖励弹窗
 * 用于第二阶段提现成功后，引导用户分享邀请链接
 */

import Lottie from "lottie-react";
import { useBffShare } from "@/hooks/useBffShare";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

// 导入动画资源
import handSuccessNoCoin from "@/assets/animation/cashout_success_no_coin.json";

interface BffW2RewardModalProps {
  amount: number;
  onClose?: () => void;
}

export const BffW2RewardModal: React.FC<BffW2RewardModalProps> = ({ amount, onClose }) => {
  const { handleShare } = useBffShare();

  const handleShareClick = async () => {
    bpTrack(EventName.bff_modal_share);
    await handleShare();
  };

  const handleSkipClick = () => {
    bpTrack(EventName.bff_modal_skip);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* 黑色遮罩层 */}
      <div className="absolute inset-0 bg-black/70 z-10" onClick={() => onClose?.()} />

      {/* 白色卡片 */}
      <div className="absolute inset-0 flex items-end justify-center z-30" onClick={() => onClose?.()}>
        <div
          className="w-full max-w-[390px] mx-4 mb-7 bg-white rounded-[24px] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 内容区 */}
          <div className="flex flex-col items-center px-[19px] pt-8 pb-6 gap-5">
            {/* 文案区域 */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="flex flex-col items-center gap-2 text-center w-full">
                {/* Emoji */}
                <div className="text-[48px] leading-[48px]">🎉</div>

                {/* 标题 - Pangram ExtraBold */}
                <p className="font-['Pangram'] font-black text-[32px] leading-[38px] text-black">
                  First ${amount.toFixed(0)} just landed!
                </p>

                {/* 副标题 - Saans TRIAL Regular */}
                <p className="font-['Saans_TRIAL'] text-[15px] leading-5 tracking-[-0.23px] text-[rgba(60,60,67,0.6)]">
                  Invite a friend to join the team. You'll get a 1-Hour Traffic Boost when she passes training!
                </p>
              </div>
            </div>

            {/* 按钮区域 */}
            <div className="flex flex-col items-center gap-3 w-full">
              {/* 主按钮 - Saans TRIAL Medium */}
              <button
                onClick={handleShareClick}
                className="w-full px-[10px] py-[15px] bg-[#47aeef] rounded-full text-white font-['Saans_TRIAL'] font-medium text-base leading-[21px] tracking-[-0.23px]"
              >
                Share with Friends
              </button>

              {/* 次要操作 - Saans TRIAL Regular */}
              <button
                onClick={handleSkipClick}
                className="font-['Saans_TRIAL'] text-[15px] leading-5 tracking-[-0.23px] text-[rgba(60,60,67,0.6)] text-center w-full"
              >
                Maybe later
              </button>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="h-[34px] relative w-full">
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[144px] h-[5px] bg-black rounded-[100px]" />
          </div>
        </div>
      </div>

      {/* 庆祝动画层 - 在卡片上方 */}
      <div className="absolute inset-0 flex items-start justify-center pt-[15vh] pointer-events-none z-40">
        <Lottie animationData={handSuccessNoCoin} className="w-full max-w-[500px]" loop={false} autoplay={true} />
      </div>
    </div>
  );
};

```
