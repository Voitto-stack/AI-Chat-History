---
title: ReceiveCallModal
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: ReceiveCallModal.tsx
---

# ReceiveCallModal

```tsx
import React, { useEffect, useRef, useState, useCallback, useMemo, Fragment } from "react";
import Lottie from "lottie-react";
import receiveCallAnimation from "../assets/animation/call/receive_call_vite.json";
import IcDeclineCall from "@/assets/images/call/ic_decline_call.webp";
import IcDeclineCallCan from "@/assets/images/call/ic_decline_call_can.webp";
import IcEeceiveCallCoin from "@/assets/images/call/ic_receive_call_coin.webp";
import CircularProgress from "./CircularProgress";
import { getAvatarUrl } from "@/utils/userUtil";
import { useCall } from "@/hooks/useCall";
import { showFinalWarningModal } from "./FinalWarningModal";
import { showViolationLimitModal } from "./ViolationLimitModal";
import { showDeclineDialogModal } from "./DeclineDialogModal";
import { useCash } from "@/hooks/useCash";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

/**
 * 来电接听弹窗组件
 * 遵循 Vercel React 最佳实践，带视频背景和交互动画
 */

interface ReceiveCallModalProps {
  /** 通话类型 */
  callType?: "video" | "audio";
  /** 每分钟收益 */
  price?: number;
  /** 接听回调 */
  onAccept: () => void;
  /** 拒绝回调 */
  onDecline: () => void;
  /** 关闭弹窗回调 */
  onClose: () => void;
}

// rendering-hoist-jsx: 提取静态样式对象到组件外部
const titleStyle = { fontFamily: "Pangram, -apple-system, sans-serif" };
const subtitleStyle = { fontFamily: "Pangram, -apple-system, sans-serif" };

export const ReceiveCallModalContent = ({
  callType = "video",
  price,
  onAccept,
  onDecline,
  onClose,
}: ReceiveCallModalProps) => {
  // State
  const [declineDisabled, setDeclineDisabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const { remoteUserInfo, releasePrice } = useCall();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { cash } = useCash();

  // 计算有效价格
  const effectivePrice = price ?? releasePrice;

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // rerender-functional-setstate: 使用 useCallback 稳定回调
  const cleanupCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream | null;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  }, []);

  // rerender-derived-state: 派生状态，避免不必要的重新计算
  const remoteUserName = useMemo(() => remoteUserInfo?.username, [remoteUserInfo]);
  const remoteUserAvatar = useMemo(() => getAvatarUrl(remoteUserInfo), [remoteUserInfo]);

  const handleAccept = useCallback(() => {
    // 埋点：全屏通话弹窗点击-接受（旧埋点名称，用于数据连续性）
    bpTrack(EventName.pwa_call_fullscreen_popup_click, {
      result: "accept",
    });

    cleanupCamera();
    onAccept();
    onClose();
  }, [onAccept, cleanupCamera, onClose]);

  const handleDecline = useCallback(() => {
    if (!declineDisabled) {
      // 埋点：全屏通话弹窗点击-拒绝（旧埋点名称，用于数据连续性）
      bpTrack(EventName.pwa_call_fullscreen_popup_click, {
        result: "reject",
      });

      const history = JSON.parse(localStorage.getItem(STORAGE_KEYS.CALL_HISTORY) || "[]");
      const count = Math.min(history.length, 3);

      /** 从任意弹窗中选择接听 */
      const onAnswer = () => {
        cleanupCamera();
        onAccept();
        onClose();
      };

      /** 最终确认拒绝 → 执行拒绝 */
      const onReject = () => {
        cleanupCamera();
        onDecline();
        onClose();
      };

      /** 从 DeclineDialog/FinalWarning 坚持拒绝 → 进入 RejectCallLimit */
      const showRejectLimit = () => {
        showViolationLimitModal(
          {
            rejectedCount: count,
            maxReject: 3,
            warning: `You have ${Math.max(0, 3 - count)} call violation${Math.max(0, 3 - count) !== 1 ? "s" : ""} left.`,
            secondary: "After that, your earnings will reset to zero!",
            earningOneVoice: `$${cash.toFixed(2)}`,
            earningOneVoiceDes: "",
            earningTwoVoice: "Fine",
            earningTwoVoiceDes: "-$2",
            earningThreeVoice: "Reset to",
            earningThreeVoiceDes: "$0",
            timesTip: "Call Rejected",
            answerText: "Answer & Stay Online",
            closeText: "I Confirm To Forfeit My Accumulated Earnings.",
          },
          onAnswer,
          onReject,
        );
      };

      if (count >= 2) {
        // 第3次+ → FinalWarningModal
        showFinalWarningModal({
          type: "decline",
          onAnswer,
          onDecline: showRejectLimit,
        });
      } else {
        // 首次/第2次 → DeclineDialogModal
        showDeclineDialogModal({
          rejectedCount: count,
          onAccept: onAnswer,
          onDecline: showRejectLimit,
        });
      }
    }
  }, [declineDisabled, cleanupCamera, onAccept, onDecline, onClose, cash]);

  // Effects
  useEffect(() => {
    // 埋点：接收到通话请求
    bpTrack(EventName.pwa_receive_call_request, {
      call_type: callType,
      price_per_minute: effectivePrice,
      remote_user_id: remoteUserInfo?.userId,
    });

    // 埋点：全屏通话弹窗展示（旧埋点名称，用于数据连续性）
    bpTrack(EventName.pwa_call_fullscreen_popup_show);

    // 获取摄像头
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          // setIsVideoLoaded(true);
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
      });

    // 5秒后允许拒绝
    const disableTimer = setTimeout(() => {
      setDeclineDisabled(false);
    }, 5000);

    // 进度条动画 - 每5ms增加0.1%，5秒达到100%
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.1;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 5);

    // 清理函数
    return () => {
      clearTimeout(disableTimer);
      clearInterval(progressInterval);
      cleanupCamera();
    };
  }, [cleanupCamera]);

  // rerender-derived-state-no-effect: 在渲染期间派生状态
  const totalEarnings = useMemo(() => {
    const result = effectivePrice * 60;
    return Number.isInteger(result) ? result.toString() : result.toFixed(1);
  }, [effectivePrice]);

  // rendering-hoist-jsx: 提取 Lottie 样式到常量
  const lottieStyle = useMemo(
    () => ({
      width: 74,
      height: 74,
      position: "absolute" as const,
      zIndex: 1,
    }),
    [],
  );

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-[1000]">
      {/* 视频背景 */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover -z-20 -scale-x-100"
        style={{ filter: "blur(10px)" }}
        onLoadedData={handleVideoLoaded}
      />

      {isVideoLoaded && !!Object.keys(remoteUserInfo).length && (
        <Fragment>
          {/* 半透明遮罩 */}
          <div className="absolute inset-0 bg-black/50 -z-10" />

          {/* 内容容器 */}
          <div className="relative w-full h-full flex flex-col items-center">
            {/* 头像区域 */}
            <div className="flex flex-col items-center" style={{ marginTop: "35%" }}>
              {remoteUserAvatar ? (
                <img src={remoteUserAvatar} alt={remoteUserName} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-500 flex items-center justify-center">
                  <span className="text-white text-2xl font-semibold">{remoteUserName}</span>
                </div>
              )}

              {/* 用户名 */}
              <h2 className="mt-4 text-white text-[25px] font-medium leading-normal" style={titleStyle}>
                {remoteUserName}
              </h2>

              {/* 状态文字 */}
              <p
                className="text-white/66 text-[13px] font-normal leading-[18px] tracking-[-0.23px] text-center"
                style={subtitleStyle}
              >
                {callType} calling...
              </p>
            </div>

            {/* 收益显示 */}
            <div className="flex items-center justify-center gap-2 mt-16" style={titleStyle}>
              <span className="text-[#FF9500] text-2xl font-extrabold leading-7">Earnings: ${totalEarnings}</span>
              <img src={IcEeceiveCallCoin} alt="coin" width={24} height={24} />
            </div>

            {/* 提示文字 */}
            <p
              className="mt-2 text-white text-[13px] font-normal leading-[18px] tracking-[-0.23px] text-center"
              style={subtitleStyle}
            >
              You got an invitation for a paid video call.
            </p>
            <p
              className="text-white text-[13px] font-normal leading-[18px] tracking-[-0.23px] text-center"
              style={subtitleStyle}
            >
              Your Safety is our Priority
            </p>

            {/* 操作按钮区域 - 固定在底部 */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-between px-[56px] pr-[35px]">
              {/* Decline 按钮 */}
              <button
                onClick={handleDecline}
                disabled={declineDisabled}
                className="flex flex-col items-center gap-2 disabled:opacity-50"
              >
                <div className="relative w-[100px] h-[100px] flex items-center justify-center">
                  {/* 进度条 */}
                  {declineDisabled && (
                    <div className="absolute inset-0 flex items-center justify-center z-[2]">
                      <CircularProgress
                        progress={progress}
                        size={104}
                        strokeWidth={4}
                        bgColor="transparent"
                        progressColor="#FF3B30"
                        startAngle={45}
                      />
                    </div>
                  )}

                  {/* 按钮图片 */}
                  <img
                    src={declineDisabled ? IcDeclineCall : IcDeclineCallCan}
                    alt="Decline"
                    className="absolute w-[74px] h-[74px] z-[20]"
                  />
                </div>
                <span className="text-white text-xs">Decline</span>
              </button>

              {/* Accept 按钮 */}
              <button onClick={handleAccept} className="flex flex-col items-center gap-2">
                <div className="relative w-[100px] h-[100px] flex items-center justify-center">
                  {/* Lottie 动画 */}
                  <Lottie animationData={receiveCallAnimation} loop={true} autoPlay={true} style={lottieStyle} />
                </div>
                <span className="text-white text-xs">Accept & Earn ${totalEarnings}/h</span>
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

```
