---
title: CashoutProcessingModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: CashoutProcessingModal.tsx
---

# CashoutProcessingModal

```tsx
/**
 * 提现处理中弹窗组件
 * 显示提现进度动画并调用提现 API
 */

import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import ProgressBar from "@/components/ProgressBar";
import { useCashoutStore } from "@/stores/cashoutStore";
import { useCashout } from "@/hooks/useCashout";
import { bpTrack } from "@/tracking/api/byteplus";
import { EventName } from "@/tracking/events";
import { useUser } from "@/hooks/useUser";
import { CashoutStage, USPaypalAccountType } from "@/types/cashout";
import { normalMediumWithdraw } from "@/http/cashoutApi";
import { checkLocationPermission } from "@/utils/permissions";
import { getGeocodeInfo } from "@/utils/locationUtils";
import { UserServiceCommonCode } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import { toast } from "@/utils/toast";
import { STORAGE_KEYS } from "@/constants/storageKeys";
import { formatNumber } from "@/utils/format";

// 导入资源
import aniLoading from "@/assets/animation/ani_loading_cash_processing.json";
import paypalIcon from "@/assets/images/cash/icon_paypal_chash_ani_process2.webp";
import notifyBg from "@/assets/images/cash/view-paypay-notify.webp";

export interface CashoutProcessingModalProps {
  amount: string;
  onSuccess?: () => void;
  onFailed?: (reason?: string, shouldShowAppeal?: boolean) => void;
}

const STEPS = [
  "We are processing the payment.",
  "PayPal has accepted our payment order.",
  "GraceChat is making a payment.",
  "Your payment has been processed.",
];

export const CashoutProcessingModal = ({ amount, onSuccess, onFailed }: CashoutProcessingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0); // 当前步骤：0, 1, 2, 3
  const [showNotification, setShowNotification] = useState(false);
  const hasExecuted = useRef(false); // 防止重复执行提现接口
  const gpsCountryCodeRef = useRef<string | undefined>(undefined); // 存储GPS位置
  const { willCashoutStage } = useCashoutStore();
  const { finishWillCashoutStage } = useCashout();
  const { userInfo, paypalAccount } = useUser();

  const aniTime = 300; // 每次进度条变化的动画时间
  const progressValue = currentStep * 33; // 根据步骤计算进度：0, 33, 66, 99

  // 组件挂载时立即请求位置权限，避免动画中途才弹授权导致用户困惑
  useEffect(() => {
    const requestGpsLocation = async () => {
      try {
        const permissionResult = await checkLocationPermission();
        if (permissionResult.status === "granted" && permissionResult.latitude && permissionResult.longitude) {
          const geocodeInfo = await getGeocodeInfo(permissionResult.latitude, permissionResult.longitude);
          gpsCountryCodeRef.current = geocodeInfo.country_code;
        }
      } catch (error) {
        console.error("Failed to get GPS location:", error);
      }
    };
    requestGpsLocation();
  }, []);

  // 调用提现接口
  const onCashout = async () => {
    // 防止重复执行
    if (hasExecuted.current) return;
    hasExecuted.current = true;
    try {
      // 检查 PayPal 账户
      if (!paypalAccount) {
        const errorMsg = "PayPal account not found. Please bind your account first.";
        toast.error(errorMsg);
        // PayPal未绑定是前置检查失败，不显示申诉弹窗
        onFailed?.(errorMsg, false);
        return;
      }
      // 获取 GPS 国家代码
      const country_code = gpsCountryCodeRef.current;
      // 计算提现参数
      let allowPayment = false;
      let isLbsAmerica = false;
      let usPaypalAccountType = USPaypalAccountType.US_PAYPAL_UNKNOWN;

      // 获取 PayPal 账户类型
      const paypalCountryIsUS = localStorage.getItem(STORAGE_KEYS.PAYPAL_COUNTRY_IS_US);
      if (paypalCountryIsUS === "true") {
        usPaypalAccountType = USPaypalAccountType.US_PAYPAL_ACCOUNT;
      } else if (paypalCountryIsUS === "false") {
        usPaypalAccountType = USPaypalAccountType.NON_US_PAYPAL_ACCOUNT;
      }
      // 判断 GPS 是否在美国
      if (country_code === "us") {
        isLbsAmerica = true;
      }
      // 判断是否允许打款 GPS 在美国 + 语言 en-US
      const locale = navigator.language;
      if (country_code === "us" && locale === "en-US") {
        allowPayment = true;
      }

      // 埋点：提现审核申请
      bpTrack(EventName.pwa_withdraw_audit_apply, {
        // 新参数（更详细的上下文）
        amount: formatNumber(Number(amount), 2),
        paypal_account: paypalAccount,
        allow_payment: allowPayment,
        is_lbs_america: isLbsAmerica,
        us_paypal_account_type: usPaypalAccountType,
        will_cashout_stage: willCashoutStage,
        // 旧参数（用于数据连续性）
        withdraw_amount: formatNumber(Number(amount), 2), // 与amount保持一致
      });

      // 调用提现接口
      const formattedAmount = formatNumber(Number(amount), 2);
      const response = await normalMediumWithdraw({
        amount: formattedAmount,
        allowPayment,
        isLbsAmerica,
        usPaypalAccountType,
      });

      if (
        response.code === UserServiceCommonCode.Success ||
        response.code === UserServiceCommonCode.UserServiceCommonCodeNone
      ) {
        // 埋点：提现审核成功
        bpTrack(EventName.pwa_withdraw_audit_success, {
          amount: formattedAmount,
          paypal_account: paypalAccount,
          will_cashout_stage: willCashoutStage,
        });

        // 提现成功，更新 willCashoutStage 到下一阶段
        await finishWillCashoutStage();

        // 埋点：提现成功
        bpTrack(EventName.bff_cash_out_referral_bonus_result, {
          result: true,
          amount: Number(amount),
        });

        setShowNotification(true);
        setTimeout(() => {
          onSuccess?.();
        }, 5000);
      } else {
        const errorMsg = response.message || "Cash out failed!";
        toast.error(errorMsg);

        // 埋点1：提现审核失败（详细参数，用于审核流程分析）
        bpTrack(EventName.pwa_withdraw_audit_failed, {
          amount: formattedAmount,
          paypal_account: paypalAccount,
          error_code: response.code,
          error_message: response.message || "Unknown error",
        });

        // 埋点2：BFF 提现结果失败（用于 BFF 转化率统计）
        bpTrack(EventName.bff_cash_out_referral_bonus_result, {
          result: false,
          amount: Number(amount),
          reason: "paypal",
        });

        // API返回失败，显示申诉弹窗
        onFailed?.(errorMsg, true);
      }
    } catch (error) {
      console.error("Cash out error:", error);
      const errorMsg = error instanceof Error ? error.message : "Cash out failed!";
      toast.error(errorMsg);

      // 埋点1：提现审核失败（异常）
      bpTrack(EventName.pwa_withdraw_audit_failed, {
        amount: formatNumber(Number(amount), 2),
        paypal_account: paypalAccount,
        error_code: -1,
        error_message: error instanceof Error ? error.message : "Unknown error",
      });

      // 埋点2：BFF 提现异常（用于 BFF 异常率统计）
      bpTrack(EventName.bff_cash_out_referral_bonus_result, {
        result: false,
        amount: Number(amount),
        reason: "unknown",
      });

      // 网络或未知异常，显示申诉弹窗
      onFailed?.(errorMsg, true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-[calc(90%)] max-h-[90%] overflow-y-auto rounded-[24px] bg-white p-[24px] gap-[12px]">
        {/* PayPal 图标 */}
        <img src={paypalIcon} alt="PayPal" className="w-[48px] h-[48px]" />
        {/* 标题 */}
        <h2 className="text-black font-[600] text-lg leading-[22px] tracking-[-0.23px]">Payment in process</h2>
        {/* 金额和 PayPal 账号 */}
        <div className="flex flex-col justify-center w-full min-h-[98px] p-4 mt-4 rounded-[14px] bg-[#f9f9f9] gap-1">
          <p className="text-black font-[800] text-[34px] leading-normal text-center">${amount}</p>
          <p className="text-black font-normal text-[15px] leading-5 tracking-[-0.23px] text-center truncate">
            {paypalAccount}
          </p>
        </div>
        {/* 进度步骤 */}
        <div className="relative flex mt-4">
          {/* 垂直进度条 */}
          <div className="absolute top-[6px] left-[9px] h-[calc(100%-40px)] w-[2px]">
            <ProgressBar
              progress={progressValue}
              direction="vertical"
              backgroundColor="#DEDEDE"
              fillColor="#35D193"
              animationDuration={aniTime}
            />
          </div>
          {/* 步骤列表 */}
          <div className="flex flex-col gap-[24px]">
            {STEPS.map((step, index) => (
              <div key={index} className="flex items-start gap-2">
                {/* 步骤图标 */}
                <div className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-[#f2f2f7] flex-shrink-0">
                  {index < currentStep ? (
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill="#35D193" />
                      <path
                        d="M5.5 10l3 3 6-6"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : index === currentStep ? (
                    <Lottie
                      animationData={aniLoading}
                      className="w-5 h-5 mt-[2px]"
                      loop={false}
                      autoplay={true}
                      onComplete={async () => {
                        // 最后一个步骤完成，调用提现接口
                        if (index === STEPS.length - 1) {
                          onCashout();
                          return;
                        }
                        // 其他步骤，继续下一步
                        setCurrentStep((prev) => prev + 1);
                      }}
                    />
                  ) : (
                    <span className="text-black font-[600] text-xs leading-5">{index + 1}</span>
                  )}
                </div>
                <p className="flex-1 h-10 text-black font-normal text-[15px] leading-5 tracking-[-0.23px]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 成功通知 */}
      {showNotification && (
        <div
          className="absolute top-[4%] left-[4%] w-[92%] h-[100px] rounded-2xl bg-white shadow-lg animate-slide-down bg-cover bg-center flex items-end pl-14 pb-2"
          style={{ backgroundImage: `url(${notifyBg})` }}
        >
          <p className="text-[rgba(60,60,67,0.6)] font-normal text-[13px] leading-[18px] tracking-[-0.23px]">
            {willCashoutStage === CashoutStage.StageOne || willCashoutStage === CashoutStage.StageTwo
              ? `${userInfo?.username || "User"}, you received $${amount} USD. Please check your PayPal account.`
              : "We have completed the payment operation and are waiting for PayPal to process it."}
          </p>
        </div>
      )}
    </>
  );
};

```
