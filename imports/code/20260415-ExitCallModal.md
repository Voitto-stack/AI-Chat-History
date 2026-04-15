---
title: ExitCallModal
date: 2026-04-15T17:04:50+08:00
source: import
language: tsx
original: ExitCallModal.tsx
---

# ExitCallModal

```tsx
import { useCallback, useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useCash } from "@/hooks/useCash";
import { toast } from "@/utils/toast";
import { EarningFailedModalContent } from "./EarningFailedModal";
import { CallTooShortRetentionContent } from "./CallTooShortModal";
import { ViolationLimitModalContent } from "./ViolationLimitModal";
import { FinalWarningModalContent } from "./FinalWarningModal";
import { EarlyEndDialogContent } from "./EarlyEndDialog";
import { ConfirmEndCallContent } from "./ConfirmEndCallModal";
import { STORAGE_KEYS } from "../constants/storageKeys";

/**
 * ExitCallModal - 退出通话确认弹窗
 * 迁移自 react-haven ExitCallModal.tsx / AVCallPage.tsx
 *
 * 展示模式（按优先级）：
 * 1. !isUserHangup → NoEarnings（对方挂断 + 通话 < 30s）
 * 2. isShowLimitModal → 违规限制（二次确认，从 is15Hint/is30Hint 中坚持挂断进入）
 * 3. is30Hint → 通话中挽留（28s < 通话 < 30s）
 * 4. is15Hint → 违规警告（通话 ≤ 28s，3级子状态）
 * 5. 默认 → 确认挂断（通话 ≥ 30s）
 */

const MODAL_ID = "exit-call-modal";

/** 倒计时文本 */
const CountdownText: React.FC<{
  time: number;
  onFinish?: () => void;
}> = ({ time, onFinish }) => {
  const [remainTime, setRemainTime] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (remainTime <= 0) {
      onFinish?.();
    }
  }, [remainTime, onFinish]);

  if (remainTime <= 0) return null;
  return <span>{` · ${remainTime}s`}</span>;
};

// ==================== 主组件 ====================

interface ExitCallModalProps {
  isUserHangup: boolean;
  is30Hint: boolean;
  is15Hint?: boolean;
  callTypeLabel: string;
  countdownTime: number;
  onEndCall: () => void;
  onContinue: () => void;
  onClose: () => void;
}

const ExitCallModalContent: React.FC<ExitCallModalProps> = ({
  isUserHangup,
  is30Hint,
  is15Hint,
  callTypeLabel,
  countdownTime,
  onEndCall,
  onContinue,
  onClose,
}) => {
  const [countdownFinish, setCountdownFinish] = useState(countdownTime <= 0);
  const [isShowLimitModal, setIsShowLimitModal] = useState(false);
  const { cash } = useCash();

  /** 带倒计时检查的结束通话 → 进入二次确认 */
  const handleCloseTimeModal = useCallback(() => {
    if (countdownFinish) {
      setIsShowLimitModal(true);
    } else {
      toast.info("Cannot Be End Right Now. Try It Later.");
    }
  }, [countdownFinish]);

  const getRejectedCount = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CALL_HISTORY) || "[]").length;
    } catch {
      return 0;
    }
  };

  const getLimitRejectedCount = () => {
    try {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALL_HISTORY) || "[]");
      return Math.min(
        history.filter((item: { duration: number; rejected: boolean }) => item.duration <= 30 || item.rejected).length +
          1,
        3,
      );
    } catch {
      return 1;
    }
  };

  // 1. 非主动挂断 → 无收益提示
  if (!isUserHangup) {
    return <EarningFailedModalContent showClose onClose={onClose} />;
  }

  // 2. 违规限制弹窗（二次确认，从 is15Hint/is30Hint 中坚持挂断后进入）
  if (isShowLimitModal) {
    const rejectedCount = getLimitRejectedCount();
    return (
      <ViolationLimitModalContent
        rejectedCount={rejectedCount}
        warning={`You have ${Math.max(0, 3 - rejectedCount)} call violation${Math.max(0, 3 - rejectedCount) !== 1 ? "s" : ""} left.`}
        secondary="After that, your earnings will reset to zero!"
        earningOneVoice={`$${cash.toFixed(2)}`}
        earningOneVoiceDes=""
        earningTwoVoice="Fine"
        earningTwoVoiceDes="-$2"
        earningThreeVoice="Reset to"
        earningThreeVoiceDes="$0"
        timesTip="Call Rejected"
        answerText="Continue call"
        closeText="I Confirm To Forfeit My Accumulated Earnings."
        onAnswer={onContinue}
        onClose={onContinue}
        onForfeit={onEndCall}
      />
    );
  }

  // 3. 30秒挽留
  if (is30Hint) {
    return (
      <CallTooShortRetentionContent
        countdownFinish={countdownFinish}
        onEndCall={handleCloseTimeModal}
        onContinue={onContinue}
      />
    );
  }

  // 4. 15秒违规警告
  if (is15Hint) {
    const rejectedCount = getRejectedCount();

    if (rejectedCount >= 2) {
      return (
        <FinalWarningModalContent
          type="shortCall"
          onAnswer={onContinue}
          onDecline={handleCloseTimeModal}
          endText={() => (
            <>
              Accept Suspension (3min)
              {countdownTime > 0 && <CountdownText time={countdownTime} onFinish={() => setCountdownFinish(true)} />}
            </>
          )}
        />
      );
    }

    return (
      <EarlyEndDialogContent
        rejectedCount={rejectedCount}
        countdownTime={countdownTime}
        countdownFinish={countdownFinish}
        onContinue={onContinue}
        onEndCall={handleCloseTimeModal}
        onCountdownFinish={() => setCountdownFinish(true)}
      />
    );
  }

  // 5. 默认确认挂断
  return (
    <ConfirmEndCallContent
      callTypeLabel={callTypeLabel}
      countdownTime={countdownTime}
      onEndCall={onEndCall}
      onContinue={onContinue}
    />
  );
};

// ==================== 导出函数 ====================

export interface ShowExitCallModalParams {
  isUserHangup: boolean;
  is30Hint: boolean;
  is15Hint?: boolean;
  callTypeLabel: string;
  countdownTime: number;
  onEndCall: () => void;
  onContinue: () => void;
}

/**
 * 显示退出通话弹窗
 * 内部管理 isShowLimitModal 状态切换
 */
export const showExitCallModal = (params: ShowExitCallModalParams): void => {
  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
  };

  modalStore.open(
    MODAL_ID,
    <ExitCallModalContent
      {...params}
      onClose={handleClose}
      onEndCall={() => {
        handleClose();
        params.onEndCall();
      }}
      onContinue={() => {
        handleClose();
        params.onContinue();
      }}
    />,
    { variant: "center" },
  );
};

/**
 * 显示退出通话弹窗（Promise 版本）
 * resolve: "end" | "continue"
 */
export const showExitCallModalAsync = (
  params: Omit<ShowExitCallModalParams, "onEndCall" | "onContinue">,
): Promise<"end" | "continue"> => {
  return new Promise((resolve) => {
    const modalStore = useModal.getState();

    const handleClose = () => {
      modalStore.close(MODAL_ID);
    };

    modalStore.open(
      MODAL_ID,
      <ExitCallModalContent
        {...params}
        onClose={() => {
          handleClose();
          resolve("continue");
        }}
        onEndCall={() => {
          handleClose();
          resolve("end");
        }}
        onContinue={() => {
          handleClose();
          resolve("continue");
        }}
      />,
      { variant: "center" },
    );
  });
};

/**
 * 关闭退出通话弹窗
 */
export const closeExitCallModal = (): void => {
  useModal.getState().close(MODAL_ID);
};

```
