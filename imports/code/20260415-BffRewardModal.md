---
title: BffRewardModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: BffRewardModal.tsx
---

# BffRewardModal

```tsx
/**
 * BFF 通用奖励弹窗
 * 用于 W3 及之后的所有提现成功阶段，引导用户分享邀请链接
 */

import { useBffShare } from "@/hooks/useBffShare";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";
import Lottie from "lottie-react";
import handSuccessNoCoin from "@/assets/animation/cashout_success_no_coin.json";

// 导入顶部渐变背景图片
import bgW3Header from "@/assets/images/bff/bg_w3_header.png";

interface BffRewardModalProps {
  amount: number;
  onClose?: () => void;
}

export const BffRewardModal: React.FC<BffRewardModalProps> = ({ amount, onClose }) => {
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
      {/* 黑色模糊遮罩层 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[6.5px]" onClick={() => onClose?.()} />

      {/* 弹窗内容 */}
      <div className="absolute inset-0 flex items-end justify-center" onClick={() => onClose?.()}>
        <div
          className="w-full max-w-[390px] bg-white rounded-tl-[16px] rounded-tr-[16px] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 顶部渐变背景区域 */}
          <div className="relative h-[196px] overflow-hidden">
            {/* 背景图片 */}
            <img src={bgW3Header} alt="" className="absolute inset-0 w-full h-full object-cover" />

            {/* 金额显示 - Pangram ExtraBold */}
            <p className="absolute left-1/2 top-[calc(50%-48px)] -translate-x-1/2 font-['Pangram'] font-black text-[75px] leading-[58px] text-white whitespace-nowrap">
              ${amount.toFixed(0)}
            </p>
          </div>

          {/* 白色内容区域 */}
          <div className="flex flex-col items-center px-[19px] pt-2 pb-6 gap-5">
            {/* 文案和头像区域 */}
            <div className="flex flex-col items-center gap-4 w-full px-4 py-3.5 rounded-[11px]">
              <div className="flex flex-col items-center gap-2 text-center w-full">
                {/* 标题 - Pangram ExtraBold */}
                <p className="font-['Pangram'] font-black text-[32px] leading-[38px] text-black">
                  Earn $60 for every friend you invite.
                </p>

                {/* 副标题 - Saans TRIAL Regular */}
                <p className="font-['Saans_TRIAL'] text-[15px] leading-5 tracking-[-0.23px] text-[rgba(60,60,67,0.6)]">
                  Help us grow the network and receive a premium bonus for every successful onboarding.
                </p>
              </div>
            </div>

            {/* 按钮区域 */}
            <div className="flex flex-col items-center gap-3 w-full">
              {/* 主按钮 - 黑色背景 - Saans TRIAL Medium */}
              <button
                onClick={handleShareClick}
                className="w-full px-[10px] py-[15px] bg-black rounded-full text-white font-['Saans_TRIAL'] font-medium text-base leading-[21px] tracking-[-0.23px]"
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
