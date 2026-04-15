---
title: VideoGuide
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: VideoGuide.tsx
---

# VideoGuide

```tsx
/**
 * VideoGuide - 视频通话规则引导弹窗
 * 两步引导：第一步介绍收益，第二步介绍违规规则
 */

import { FC, useState } from "react";
import { useModal } from "@/hooks/useModal";

// 引导图片资源
import icTitle1 from "@/assets/images/classify/ic_title1.webp";
import icTitle2 from "@/assets/images/classify/ic_title2.webp";
import icTip1 from "@/assets/images/classify/ic_tip1.webp";
import icTip2 from "@/assets/images/classify/ic_tip2.webp";
import icTip3 from "@/assets/images/classify/ic_tip3.webp";
import icDollar from "@/assets/images/classify/ic_dollar.webp";
import icDollar2 from "@/assets/images/classify/ic_dollar2.webp";
import icNo from "@/assets/images/classify/ic_no.webp";

const MODAL_ID = "video-guide-modal";

interface VideoGuideProps {
  onClose: () => void; // 关闭回调（引导完成后触发）
}

const VideoGuideContent: FC<VideoGuideProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step === 0) {
      setStep(1);
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
      data-disable-auto-redirect="true"
    >
      {/* 渐变背景弹窗 */}
      <div className="relative flex w-[330px] flex-col items-center gap-2.5 rounded-[28px] bg-gradient-to-br from-[#71c7ea] via-[#3d70f2] to-[#bffaee] px-2 pb-2 pt-5">
        {/* 标题图片 */}
        <div className="flex justify-center">
          <img
            src={step === 0 ? icTitle1 : icTitle2}
            className="h-[30px] w-[150px] object-contain"
            alt="title"
          />
        </div>

        {/* 半透明内容区 */}
        <div className="flex w-full flex-col items-center rounded-2xl bg-white/70 px-6 pb-4 pt-0.5">
          <p className="mb-4 text-center text-[15px] font-semibold leading-[22px] text-[#3c3c43]">
            {step === 0 ? (
              <>
                Earn money through video calls easily cash out
                <span className="font-semibold text-[#4e9448]"> $100</span>
              </>
            ) : (
              "Video will be disabled for the following violations"
            )}
          </p>

          {step === 0 ? (
            <div className="relative h-[230px] w-[240px]">
              <img src={icTip1} className="mx-auto block h-[230px] w-[120px]" alt="tip" />
              <img
                src={icDollar}
                className="absolute bottom-[27%] right-[30px] z-[2] h-[50px] w-[50px]"
                alt="dollar"
              />
              <div className="absolute bottom-[40%] z-[2] inline-flex h-[27px] w-[86px] items-center justify-center rounded bg-black/70 px-2 py-1">
                <img src={icDollar2} className="mr-1 h-[19px] w-[25px]" alt="dollar" />
                <span className="text-center text-[15px] font-semibold italic text-[#8cd370]">+$100</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center gap-[15px]">
              {/* No face */}
              <div className="relative h-[230px] w-[120px]">
                <img src={icTip2} className="h-[230px] w-[120px] rounded-[13px]" alt="rule1" />
                <div className="absolute inset-x-0 bottom-0 h-[128px] rounded-b-[13px] bg-gradient-to-t from-black to-transparent" />
                <div className="absolute inset-x-0 bottom-[10%] z-[2] flex items-center justify-center gap-2">
                  <img src={icNo} className="h-4 w-4 shrink-0" alt="no" />
                  <span className="text-center text-[15px] font-normal text-white/[0.98]">No face</span>
                </div>
              </div>
              {/* No sound */}
              <div className="relative h-[230px] w-[120px]">
                <img src={icTip3} className="h-[230px] w-[120px] rounded-[13px]" alt="rule2" />
                <div className="absolute inset-x-0 bottom-0 h-[128px] rounded-b-[13px] bg-gradient-to-t from-black to-transparent" />
                <div className="absolute inset-x-0 bottom-[10%] z-[2] flex items-center justify-center gap-2">
                  <img src={icNo} className="h-4 w-4 shrink-0" alt="no" />
                  <span className="text-center text-[15px] font-normal text-white/[0.98]">No sound</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部悬浮按钮 */}
        <button
          className="absolute -bottom-[70px] left-1/2 z-[100] w-full -translate-x-1/2 rounded-full bg-[#47aeef] px-2 pb-4 pt-5 text-base font-bold text-white active:opacity-80"
          onClick={handleNext}
        >
          {step === 0 ? "Next" : "Got it"}
        </button>
      </div>
    </div>
  );
};

/**
 * 显示视频引导弹窗
 * @param onFinish 引导完成后的回调
 */
export const showVideoGuide = (onFinish?: () => void): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
    onFinish?.();
  };

  modalStore.open(MODAL_ID, <VideoGuideContent onClose={handleClose} />, {
    variant: "fullscreen",
  });
};

/**
 * 关闭视频引导弹窗
 */
export const closeVideoGuide = (): void => {
  useModal.getState().close(MODAL_ID);
};

```
