---
title: showCashoutModal
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: showCashoutModal.tsx
---

# showCashoutModal

```tsx
/**
 * 提现弹窗 - 统一的提现流程管理器
 * 根据状态渲染不同的弹窗内容
 */

import { useEffect, useState, useCallback } from "react";
import { useModal } from "@/hooks/useModal";
import { AnimatedModalContainer } from "@/components/AnimatedModalContainer";
import { CashoutReminderModal } from "@/components/CashoutReminderModal";
import { CashoutSuccessModal } from "@/components/CashoutSuccessModal";
import { BindPaypalModal } from "@/components/BindPaypalModal";
import { PayPalBindResultModal } from "@/components/PayPalBindResultModal";
import { CashoutProcessingModal } from "@/components/CashoutProcessingModal";
import { CashOutStatus, CashoutStage } from "@/types/cashout";
import { useCashoutStore } from "@/stores/cashoutStore";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/stores/userStore";
import {
  getPayPalAuthStatus,
  PayPalAuthStatus,
  redirectToPayPalLogin,
  setPayPalAuthStatus,
  clearPayPalAuthStatus,
} from "@/utils/cashoutPaypal";
import { checkCameraPermission, checkMicrophonePermission } from "@/utils/permissions";
import { toast } from "@/utils/toast";
import { eventBus, EventNames } from "../utils/eventBus";
import Spinner from "@/components/Spinner";

import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

const CASHOUT_MODAL_ID = "cashout-modal";

// 提现弹窗配置
export interface CashoutModalConfig {
  initialStatus?: CashOutStatus;
  amount: string;
  progress?: number;
  /** 跳过 REMINDER 步骤，直接进入后续流程（用于 cashout 页手动点击提现） */
  skipReminder?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

// 主弹窗组件
// eslint-disable-next-line react-refresh/only-export-components
const CashOutAnimModal = ({
  initialStatus = CashOutStatus.REMINDER,
  amount = "",
  progress,
  skipReminder = false,
  onConfirm,
  onClose,
}: CashoutModalConfig) => {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [paypalAuthStatus, setPaypalAuthStatus] = useState<PayPalAuthStatus>(PayPalAuthStatus.None);
  const [isRedirectingToPayPal, setIsRedirectingToPayPal] = useState(false);
  const { willCashoutStage } = useCashoutStore();
  const { paypalAccount, fetchPaypalAccount, bindPaypal } = useUser();
  const { cash } = useUserStore();

  useEffect(() => {
    setCurrentStatus(initialStatus);
  }, [initialStatus]);

  // 弹窗打开时，若本地无 PayPal 信息则从后端同步（处理 H5 绑定后跳转 APK 的场景）
  useEffect(() => {
    if (!paypalAccount) {
      fetchPaypalAccount();
    }
  }, [paypalAccount, fetchPaypalAccount]);

  // 当进入 PAYPAL_BIND_RESULT 状态时，获取验证状态
  useEffect(() => {
    if (currentStatus === CashOutStatus.PAYPAL_BIND_RESULT) {
      getPayPalAuthStatus().then((status) => {
        setPaypalAuthStatus(status);

        // 埋点：PayPal OAuth 登录结果
        if (status === PayPalAuthStatus.Success) {
          bpTrack(EventName.pwa_checkout_paypal_login_success, {
            amount: amount,
          });
          bpTrack(EventName.pwa_paypal_login_success, {
            amount: amount,
            email: paypalAccount,
          });
        } else if (status === PayPalAuthStatus.Failed || status === PayPalAuthStatus.Error) {
          bpTrack(EventName.pwa_checkout_paypal_login_failure, {
            amount: amount,
            status: status,
          });
          bpTrack(EventName.pwa_cashout_paypal_fail, {
            amount: amount,
            error_type: status,
            email: paypalAccount,
          });
        }
      });
    }
  }, [currentStatus, amount, paypalAccount]);

  // 统一的关闭处理
  const handleClose = useCallback(() => {
    setCurrentStatus(CashOutStatus.NONE);
    onClose?.();
    if (willCashoutStage === CashoutStage.StageTwo) {
      eventBus.emit(EventNames.CASHOUT_SUCCESS);
    }
  }, [onClose, willCashoutStage]);

  // 流转到下一个状态
  const goToNextStatus = useCallback(async (): Promise<void> => {
    let nextStatus: CashOutStatus | null = null;
    console.log(
      "[goToNextStatus] currentStatus:",
      currentStatus,
      "paypalAccount:",
      paypalAccount,
      "willCashoutStage:",
      willCashoutStage,
      "storeValue:",
      useUserStore.getState().paypalAccount,
    );

    switch (currentStatus) {
      case CashOutStatus.REMINDER: {
        // 第二笔提现需要检查摄像头和麦克风权限
        if (willCashoutStage === CashoutStage.StageTwo) {
          const cameraStatus = await checkCameraPermission();
          const microphoneStatus = await checkMicrophonePermission();

          if (cameraStatus !== "granted" || microphoneStatus !== "granted") {
            const deniedPermissions = [];
            if (cameraStatus !== "granted") deniedPermissions.push("Camera");
            if (microphoneStatus !== "granted") deniedPermissions.push("Microphone");

            toast.error(`Please grant ${deniedPermissions.join(" and ")} permission to continue.`);
            return; // 阻止流转到下一状态
          }
        }

        // 未绑定 PayPal，先走邮箱绑定
        if (!paypalAccount) {
          nextStatus = CashOutStatus.BIND_PAYPAL;
        } else if (willCashoutStage === CashoutStage.StageOne || willCashoutStage === CashoutStage.StageTwo) {
          // 第一、二阶段，已绑定直接提现
          nextStatus = CashOutStatus.PROCESSING;
        } else {
          // 第三阶段及以后，已绑定走 OAuth 验证
          const authStatus = await getPayPalAuthStatus();
          if (
            authStatus === PayPalAuthStatus.Success ||
            authStatus === PayPalAuthStatus.Failed ||
            authStatus === PayPalAuthStatus.Error
          ) {
            nextStatus = CashOutStatus.PAYPAL_BIND_RESULT;
          } else if (authStatus === PayPalAuthStatus.Confirmed) {
            nextStatus = CashOutStatus.PROCESSING;
          } else {
            nextStatus = CashOutStatus.LINK_PAYPAL;
          }
        }
        break;
      }

      case CashOutStatus.BIND_PAYPAL:
        // 邮箱绑定成功后：Stage 1-2 → PROCESSING，Stage 3+ → LINK_PAYPAL（继续 OAuth 验证）
        if (willCashoutStage === CashoutStage.StageOne || willCashoutStage === CashoutStage.StageTwo) {
          nextStatus = CashOutStatus.PROCESSING;
        } else {
          nextStatus = CashOutStatus.LINK_PAYPAL;
        }
        break;

      case CashOutStatus.LINK_PAYPAL:
        // 跳转 OAuth 登录，不需要自动流转
        return;

      case CashOutStatus.PAYPAL_BIND_RESULT:
        // OAuth 结果确认后 → PROCESSING
        nextStatus = CashOutStatus.PROCESSING;
        break;

      case CashOutStatus.PROCESSING:
        // 处理成功后 → SUCCESS
        nextStatus = CashOutStatus.SUCCESS;
        break;

      case CashOutStatus.SUCCESS:
        // 成功后关闭
        nextStatus = CashOutStatus.NONE;
        break;

      default:
        return;
    }

    if (nextStatus) {
      setCurrentStatus(nextStatus);
    }
  }, [currentStatus, paypalAccount, willCashoutStage]);

  // skipReminder=true 时（cashout 页手动点击），自动跳过 REMINDER 步骤
  useEffect(() => {
    if (skipReminder && currentStatus === CashOutStatus.REMINDER) {
      goToNextStatus();
    }
  }, [skipReminder, currentStatus, goToNextStatus]);

  const renderContent = () => {
    switch (currentStatus) {
      case CashOutStatus.REMINDER:
        if (skipReminder) return null;
        return (
          <AnimatedModalContainer>
            <CashoutReminderModal
              amount={Number(amount)}
              onConfirm={async () => {
                await goToNextStatus();
              }}
              progress={progress}
              onClose={handleClose}
            />
          </AnimatedModalContainer>
        );

      case CashOutStatus.BIND_PAYPAL:
        return (
          <BindPaypalModal
            amount={amount}
            onBack={() => {
              setCurrentStatus(CashOutStatus.REMINDER);
            }}
            onSubmit={async (email: string) => {
              const success = await bindPaypal(email);
              if (!success) throw new Error("bind failed");
              await fetchPaypalAccount();
              await goToNextStatus();
            }}
          />
        );

      case CashOutStatus.PAYPAL_BIND_RESULT:
        return (
          <div className="relative flex items-end justify-center w-full h-full bg-black/50">
            <PayPalBindResultModal
              success={paypalAuthStatus === PayPalAuthStatus.Success}
              onContinue={async () => {
                await setPayPalAuthStatus(PayPalAuthStatus.Confirmed);
                await goToNextStatus();
              }}
              onRetry={async () => {
                await clearPayPalAuthStatus();
                setCurrentStatus(CashOutStatus.LINK_PAYPAL);
              }}
              onCancel={async () => {
                await clearPayPalAuthStatus();
                handleClose();
              }}
            />
          </div>
        );

      case CashOutStatus.LINK_PAYPAL:
        if (isRedirectingToPayPal) {
          return (
            <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-4 z-50">
              <Spinner size={48} />
              <p className="text-[15px] text-gray-500">Connecting to PayPal...</p>
            </div>
          );
        }
        return (
          <AnimatedModalContainer>
            <CashoutReminderModal
              amount={Number(amount)}
              title="Link PayPal"
              description="Now you qualify for more cashout. Login to PayPal now to enable larger transfers!"
              buttonText="Link PayPal"
              progress={progress}
              onConfirm={() => {
                setIsRedirectingToPayPal(true);

                // 埋点：PayPal 账户点击（Link PayPal 按钮）
                bpTrack(EventName.pwa_checkout_paypal_account_click, {
                  amount: amount,
                });
                redirectToPayPalLogin();
              }}
              onClose={handleClose}
            />
          </AnimatedModalContainer>
        );

      case CashOutStatus.PROCESSING:
        return (
          <div className="relative flex items-center justify-center w-full h-full bg-black/70">
            <CashoutProcessingModal
              amount={amount}
              onSuccess={async () => {
                const withdrawList = useCashoutStore.getState().withdrawList;
                const totalCashoutValue = withdrawList.reduce((sum, w) => sum + (w.amount || 0), 0) + Number(amount);
                // 埋点：提现结果 - 处理成功
                bpTrack(EventName.pwa_cashout_result, {
                  cashout_value: Number(amount),
                  result: "success",
                  source: "cashout_modal",
                  task_stage: willCashoutStage,
                  total_cashout_value: totalCashoutValue,
                  total_income: totalCashoutValue + (cash || 0),
                });
                // 处理成功，流转到下一个状态
                await goToNextStatus();
              }}
              onFailed={handleClose}
            />
          </div>
        );

      case CashOutStatus.SUCCESS:
        return (
          <CashoutSuccessModal
            amount={Number(amount)}
            onClose={() => {
              const withdrawList = useCashoutStore.getState().withdrawList;
              const totalCashoutValue = withdrawList.reduce((sum, w) => sum + (w.amount || 0), 0) + Number(amount);
              // 埋点：提现结果 - 最终成功
              bpTrack(EventName.pwa_cashout_result, {
                cashout_value: Number(amount),
                result: "success",
                source: "cashout_modal",
                task_stage: willCashoutStage,
                total_cashout_value: totalCashoutValue,
                total_income: totalCashoutValue + (cash || 0),
              });
              // 成功确认，关闭弹窗
              handleClose();
              onConfirm?.();
            }}
          />
        );

      default:
        return null;
    }
  };

  if (currentStatus === CashOutStatus.NONE) return null;

  return <>{renderContent()}</>;
};

// ==================== 工具函数 ====================

/**
 * 关闭提现弹窗
 */
// eslint-disable-next-line react-refresh/only-export-components
export function closeCashoutModal(): void {
  const modalStore = useModal.getState();
  modalStore.close(CASHOUT_MODAL_ID);
}

/**
 * 显示提现弹窗（统一入口）
 * 默认从 REMINDER 状态开始，进度 50%
 * @param config 弹窗配置
 */
// eslint-disable-next-line react-refresh/only-export-components
export function showCashoutModal(config: CashoutModalConfig): void {
  const modalStore = useModal.getState();

  // 设置默认值
  const finalConfig = {
    initialStatus: CashOutStatus.REMINDER,
    progress: 50,
    ...config,
  };

  const handleClose = () => {
    closeCashoutModal();
    finalConfig.onClose?.();
  };

  const handleConfirm = () => {
    if (finalConfig.initialStatus === CashOutStatus.NONE) {
      closeCashoutModal();
    }
    finalConfig.onConfirm?.();
  };

  modalStore.open(
    CASHOUT_MODAL_ID,
    <CashOutAnimModal
      initialStatus={finalConfig.initialStatus}
      amount={finalConfig.amount}
      progress={finalConfig.progress}
      skipReminder={finalConfig.skipReminder}
      onClose={handleClose}
      onConfirm={handleConfirm}
    />,
    { variant: "fullscreen" },
  );
}

```
