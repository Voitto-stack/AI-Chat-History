---
title: ViolationLimitModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: ViolationLimitModal.tsx
---

# ViolationLimitModal

```tsx
import { useCallback } from "react";
import { useModal } from "@/hooks/useModal";
import type { PopupTextConfig } from "@/hooks/useVoiceModeration";

/**
 * ViolationLimitModal - 违规限制弹窗
 * 通话中检测到语音违规时显示，展示违规次数和收益惩罚
 */

const MODAL_ID = "violation-limit-modal";

// 违规次数上限
const MAX_VIOLATION_COUNT = 3;

// rendering-hoist-jsx: 静态违规阶梯数据
const VIOLATION_STEPS = [
  { label: "1st Violation", earningKey: "one" as const },
  { label: "2nd Violation", earningKey: "two" as const },
  { label: "3rd Violation", earningKey: "three" as const },
];

interface ViolationLimitModalProps {
  rejectedCount: number; // 当前违规次数
  warning: string; // 警告标题
  secondary: string; // 副标题描述
  earningOneVoice: string; // 第一次违规收益
  earningOneVoiceDes: string; // 第一次违规收益描述
  earningTwoVoice: string; // 第二次违规收益
  earningTwoVoiceDes: string; // 第二次违规收益描述
  earningThreeVoice: string; // 第三次违规收益
  earningThreeVoiceDes: string; // 第三次违规收益描述
  timesTip: string; // 违规计数提示
  answerText?: string; // 确认按钮文本
  closeText: string; // 关闭按钮文本
  onAnswer?: () => void; // 确认回调
  onClose: () => void; // 关闭回调（确认按钮也会调用）
  onForfeit?: () => void; // 放弃按钮独立回调（不传则 fallback 到 onClose）
}

/**
 * EarningCard - 收益阶梯卡片
 */
interface EarningCardProps {
  earning: string; // 收益值
  earningDes: string; // 收益描述
  label: string; // 违规标签
  isStruck: boolean; // 是否已达到该违规次数（划线）
  isFirst: boolean; // 是否为第一阶梯（蓝色）
}

const EarningCard: React.FC<EarningCardProps> = ({ earning, earningDes, label, isStruck, isFirst }) => {
  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <div
        className={`flex w-[72px] shrink-0 flex-col items-center justify-center rounded-[10px] bg-white pb-1 pt-[5px] text-[15px] font-bold leading-[18px] ${
          isFirst ? "text-[#4391fd]" : "text-[#ff3b30]"
        }`}
        style={{ height: 50 }}
      >
        <span className="text-xs font-normal">{earning}</span>
        {earningDes}
      </div>
      <div className="mt-1 text-[13px] text-[#999]">
        <span className={isStruck ? "line-through" : ""}>{label}</span>
      </div>
    </div>
  );
};

/**
 * ViolationLimitModalContent - 违规限制弹窗内容
 */
export const ViolationLimitModalContent: React.FC<ViolationLimitModalProps> = ({
  rejectedCount,
  warning,
  secondary,
  earningOneVoice,
  earningOneVoiceDes,
  earningTwoVoice,
  earningTwoVoiceDes,
  earningThreeVoice,
  earningThreeVoiceDes,
  timesTip,
  answerText = "I will behave and chat better",
  closeText,
  onAnswer,
  onClose,
  onForfeit,
}) => {
  // rerender-use-callback: 稳定确认按钮回调
  const handleAnswer = useCallback(() => {
    onAnswer?.();
    onClose();
  }, [onAnswer, onClose]);

  // rendering-hoist-jsx: 收益数据映射
  const earnings = {
    one: { voice: earningOneVoice, des: earningOneVoiceDes },
    two: { voice: earningTwoVoice, des: earningTwoVoiceDes },
    three: { voice: earningThreeVoice, des: earningThreeVoiceDes },
  };

  return (
    <div className="relative w-[340px] overflow-hidden rounded-[18px] bg-white text-center shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      {/* 红色警告区域 */}
      <div className="rounded-t-[18px] bg-[#ff3b30] px-4 py-4">
        {/* 感叹号图标 */}
        <div className="mx-auto mb-4 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white text-[40px] font-black text-[#ff3b30]">
          !
        </div>
        <div className="text-sm font-bold text-white">{warning}</div>
        <p className="mt-3.5 text-sm font-normal text-white">{secondary}</p>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        {/* 收益阶梯 */}
        <div className="rounded-xl bg-[#f2f2f7]">
          <div className="flex items-center justify-between px-0 pb-4 pt-3">
            {VIOLATION_STEPS.map((step, index) => {
              const earning = earnings[step.earningKey];
              return (
                <div key={step.label} className="flex items-center">
                  {index > 0 && <span className="mb-7 text-[#afafaf]">......</span>}
                  <EarningCard
                    earning={earning.voice}
                    earningDes={earning.des}
                    label={step.label}
                    isStruck={rejectedCount >= index + 1}
                    isFirst={index === 0}
                  />
                </div>
              );
            })}
          </div>

          {/* 违规计数 */}
          <div className="mb-[18px] pb-3 text-xs text-[rgba(60,60,67,0.6)]">
            {timesTip}{" "}
            <span className="font-bold text-[#ff3b30]">
              {rejectedCount}/{MAX_VIOLATION_COUNT}
            </span>
          </div>
        </div>

        {/* 确认按钮 */}
        {answerText ? (
          <button
            className="mt-2 w-full rounded-full border-none bg-[#47aeef] px-0 py-3.5 text-lg font-medium text-white"
            onClick={handleAnswer}
          >
            {answerText}
          </button>
        ) : null}

        {/* 关闭按钮 */}
        <button
          className="mt-2 w-full rounded-full border-none bg-[#f2f2f7] px-0 py-3.5 text-xs font-medium text-[rgba(60,60,67,0.6)]"
          onClick={onForfeit ?? onClose}
        >
          {closeText}
        </button>
      </div>
    </div>
  );
};

/**
 * 显示违规限制弹窗
 *
 * @param params 违规弹窗配置（由 useVoiceModeration 的 onVoiceViolation 回调传入）
 * @param onAnswer 确认回调
 */
export const showViolationLimitModal = (
  params: PopupTextConfig & { warning?: string },
  onAnswer?: () => void,
  onForfeit?: () => void,
): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
    onForfeit?.();
  };

  modalStore.open(
    MODAL_ID,
    <ViolationLimitModalContent
      rejectedCount={params.rejectedCount}
      warning={params.warning ?? ""}
      secondary={params.secondary}
      earningOneVoice={params.earningOneVoice}
      earningOneVoiceDes={params.earningOneVoiceDes}
      earningTwoVoice={params.earningTwoVoice}
      earningTwoVoiceDes={params.earningTwoVoiceDes}
      earningThreeVoice={params.earningThreeVoice}
      earningThreeVoiceDes={params.earningThreeVoiceDes}
      timesTip={params.timesTip}
      answerText={params.answerText}
      closeText={params.closeText}
      onAnswer={onAnswer}
      onClose={handleClose}
    />,
    { variant: "center" },
  );
};

/**
 * 关闭违规限制弹窗
 */
export const closeViolationLimitModal = (): void => {
  const modalStore = useModal.getState();
  modalStore.close(MODAL_ID);
};

```
