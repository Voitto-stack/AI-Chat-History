---
title: CoinClaimButton
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: CoinClaimButton.tsx
---

# CoinClaimButton

```tsx
import { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useCoinClaim } from "@/hooks/useCoinClaim";
import { useUser } from "@/hooks/useUser";
import { NumberRoll } from "@/components/NumberRoll";
import awardAnimGeted from "@/assets/animations/chat-award-geted.json";
import icCoin from "@/assets/images/chat/ic_coin.webp";
import bgChatAward from "@/assets/images/chat/bg_chat_award.webp";
import chatAwardHand from "@/assets/images/chat/chat_award_hand.webp";

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * CoinClaimButton - 金币领取浮动按钮
 * type: 1-倒计时 2-展开收益 3-可领取 4-领取中 5-奖励展示 6-完成
 */
export default function CoinClaimButton() {
  const lottieGetedRef = useRef<LottieRefCurrentProps>(null);

  const { type, progress, handleClick, nextType } = useCoinClaim();
  const { cash } = useUser();

  // type=6 过渡帧显示 0，流转到 type=1 后显示真实余额，触发 NumberRoll 动画
  const displayCash = type === 6 ? 0 : Math.min(cash, 999.99);

  const remaining = Math.max(0, Math.ceil(60 * (1 - progress / 100)));
  const displayTime = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  // type=4 领取中：延迟播放多金币下落动画
  useEffect(() => {
    if (type === 4) {
      const timer = setTimeout(() => lottieGetedRef.current?.play(), 200);
      return () => clearTimeout(timer);
    }
    if (type !== 5) lottieGetedRef.current?.stop();
  }, [type]);

  return (
    <div className="absolute right-5 top-40 z-[888]">
      {/* 展开的今日收益 */}
      {type === 2 && (
        <div
          className="absolute right-9 z-[1] flex h-12 w-[115px] flex-col justify-center whitespace-nowrap bg-cover bg-center"
          style={{ backgroundImage: `url(${bgChatAward})` }}
        >
          <span className="ml-3 text-left text-[11px] text-white">Today's Earnings</span>
          <span
            className="mr-[17px] mt-[5px] flex items-center justify-end text-[11px] font-semibold text-[#ff9500]"
            style={{ fontFamily: "SF Pro" }}
          >
            <img src={icCoin} className="mr-0.5 h-3.5 w-3.5" alt="" />
            {`$${cash.toFixed(2)}`}
          </span>
        </div>
      )}

      {/* 主按钮 */}
      <div
        onClick={handleClick}
        className="relative grid h-12 w-12 cursor-pointer place-items-center"
        style={{ fontFamily: "TT Fellows Trial" }}
      >
        {/* SVG 圆形进度条 */}
        <svg
          className={`absolute inset-0 z-[1] h-12 w-12 ${type === 3 ? "origin-center animate-[heartbeat_0.9s_infinite]" : ""}`}
        >
          <circle
            className={`fill-[#fef7f1] ${type === 4 ? "origin-center animate-[flip-scale_0.4s_ease-in-out]" : ""}`}
            cx="24"
            cy="24"
            r={RADIUS}
          />
          <circle
            className="fill-none stroke-[#ffd79e] stroke-2"
            cx="24"
            cy="24"
            r={RADIUS}
            strokeLinecap="round"
            transform="rotate(-90 24 24)"
          />
          <circle
            className="fill-none stroke-[#ff9500] stroke-2"
            cx="24"
            cy="24"
            r={RADIUS}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 24 24)"
            style={{ transition: progress === 0 || progress === 100 ? "" : "stroke-dashoffset 1s linear" }}
          />
        </svg>

        {/* 内容区域 */}
        <div className="z-[2] flex flex-col items-center justify-center gap-1">
          {[1, 3].includes(type) && <img src={icCoin} className="h-4 w-4" alt="" />}
          {[1, 6].includes(type) && <NumberRoll className="text-[10px] font-bold text-[#ff9500]" value={displayCash} />}
          {type === 2 && <p className="text-[10px] font-bold text-[#ff9500]">{displayTime}</p>}
          {type === 3 && <p className="text-[8px] font-bold text-[#ff9500]">Claim</p>}
          {/* +1￠ 奖励文字 */}
          {type === 5 && (
            <p className="absolute inset-0 z-[2] flex items-center justify-center animate-[award-text-float-in_0.3s_ease-out_forwards] text-sm font-bold text-[#ff9500]">
              +1￠
            </p>
          )}
        </div>

        {/* Lottie 多金币下落 */}
        {[4, 5].includes(type) && (
          <Lottie
            animationData={awardAnimGeted}
            className="absolute inset-0 z-[3] h-12 w-12"
            loop={false}
            autoplay={false}
            lottieRef={lottieGetedRef}
            onComplete={nextType}
          />
        )}

        {/* 手势提示 */}
        {type === 3 && (
          <img
            src={chatAwardHand}
            className="absolute right-[6px] top-[39px] z-[999] h-[31px] w-[21px] animate-[float_0.9s_infinite]"
            alt=""
          />
        )}
      </div>
    </div>
  );
}

```
