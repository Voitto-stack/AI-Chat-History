---
title: showApkDownloadModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: showApkDownloadModal.tsx
---

# showApkDownloadModal

```tsx
import { useCallback, useEffect, useState } from "react";
import { downloadApk } from "@/utils/downloadUtils";
import { copyLoginInfoToClipboard } from "@/utils/openApk";
import { isApp } from "@/utils/bridge";
import { DragHandle } from "./DragHandle";
import Button from "./Button";
import { useModal } from "@/hooks/useModal";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";
import guideImage1 from "@/assets/images/task_detail/ic_install_apk_guide_1.webp";
import guideImage2 from "@/assets/images/task_detail/ic_install_apk_guide_2.webp";
import guideImage3 from "@/assets/images/task_detail/ic_install_apk_guide_3.webp";
import guideImage4 from "@/assets/images/task_detail/ic_install_apk_guide_4.webp";
import guideImage5 from "@/assets/images/task_detail/ic_install_apk_guide_5.webp";
import todoDownloadWarning from "@/assets/images/task_detail/todo_download_warning.webp";
import todoInstallSystem from "@/assets/images/task_detail/todo_install_system.webp";

const MODAL_ID = "apk-download-modal";

interface ApkDownloadModalProps {
  onClose: () => void;
  from: string;
}

// 引导步骤
const GUIDE_STEPS = [
  {
    image: guideImage1,
    title: "Pull down the notification bar to check if GraceChat.apk is downloading.",
  },
  {
    image: guideImage2,
    title: "When it says Download complete, tap it to start installing.",
  },
  {
    image: guideImage3,
    title: "Tap Install on the prompt screen.",
  },
  {
    image: guideImage4,
    title: "If Google Play Protect appears, tap Accept.",
  },
  {
    image: guideImage5,
    title: "Once installed, tap Open to launch GraceLive.",
  },
];

// eslint-disable-next-line react-refresh/only-export-components
function ApkDownloadModalContent({ onClose, from }: ApkDownloadModalProps) {
  const [showGuide, setShowGuide] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // 埋点：APK 安装弹窗展示
  useEffect(() => {
    bpTrack(EventName.pwa_apk_install_show, { from });
    bpTrack(EventName.pwa_earnings_apk_installation_mission_brief_page_show, { from });
    // 广告埋点：下载 APK 弹窗显示
    bpTrack(EventName.pwa_conv_download_apk_pop_show);
    bpTrack(EventName.ad_pwa_conv_download_apk_pop_show);
    // 最终 APK 弹窗显示
    bpTrack(EventName.pwa_conv_final_apk_pop_show);

    return () => {
      // 弹窗关闭时埋点
      bpTrack(EventName.pwa_conv_final_apk_pop_close);
    };
  }, []);

  const handleClick = useCallback(() => {
    setShowGuide(true);
    // 埋点：APK 安装按钮点击
    bpTrack(EventName.pwa_apk_install_click, { from });
    bpTrack(EventName.pwa_earnings_apk_installation_install_button_clicked, {
      apk_install_task_status: "not_installed",
    });
    // 广告埋点：下载 APK 弹窗按钮点击
    bpTrack(EventName.pwa_conv_download_apk_pop_clickButton);
    bpTrack(EventName.ad_pwa_conv_download_apk_pop_clickButton);
    // 最终 APK 下载点击
    bpTrack(EventName.pwa_conv_final_apk_download_click);

    // 下载前将登录信息复制到剪贴板，APK 启动时自动读取
    copyLoginInfoToClipboard();
    const downloadUrl = import.meta.env.VITE_APK_DOWNLOAD_URL || "";

    if (downloadUrl) {
      downloadApk(downloadUrl, "GraceChat.apk");
    }
  }, []);

  // 自动轮播
  useEffect(() => {
    if (!showGuide) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % GUIDE_STEPS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showGuide]);

  return (
    <div
      data-bottom-sheet
      className={`w-full rounded-t-[10px] overflow-hidden ${showGuide ? "bg-white" : "bg-[#EFF8FF] flex flex-col"}`}
      style={{
        ...(showGuide ? { maxHeight: "94vh" } : { minHeight: "94vh" }),
      }}
    >
      <DragHandle onClose={onClose} />
      {showGuide ? (
        // 引导界面
        <div className="flex flex-col px-4 pb-3 bg-white">
          {/* 步骤标题 */}
          <div className="flex items-baseline self-stretch h-[58px] py-2 gap-3">
            <span className="inline-flex flex-shrink-0 items-center justify-center w-[18px] h-[18px] rounded-full bg-black text-[#F2F2F7] text-xs font-medium">
              {currentStep + 1}
            </span>
            <span className="text-black text-sm font-medium leading-[20px]">{GUIDE_STEPS[currentStep].title}</span>
          </div>

          {/* 轮播图容器 */}
          <div className="mt-3 rounded-[10px]">
            <img
              src={GUIDE_STEPS[currentStep].image}
              alt={`Step ${currentStep + 1}`}
              className="w-full max-h-[60vh] object-contain rounded-[10px]"
            />
          </div>

          {/* 指示器 */}
          <div className="flex justify-center gap-1 mt-4">
            {GUIDE_STEPS.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentStep ? "bg-brand" : "bg-[rgba(60,60,67,0.3)]"
                }`}
              />
            ))}
          </div>

          {/* 底部按钮 */}
          <Button onClick={handleClick} className="self-center mt-6 mb-3 w-[240px]">
            Claim Reward
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-5 py-2 bg-[#EFF8FF]">
            {/* 任务头部 */}
            <div className="flex items-center">
              <img src="/apkLogo192.png" alt="App Icon" className="w-[55px] h-[55px] rounded-full" />
              <div className="flex flex-col items-start ml-3 gap-1">
                <span className="text-[rgba(1,34,105,0.5)] text-xs font-semibold">Task</span>
                <span className="text-brand text-sm font-semibold">Install GraceChat App</span>
                <span className="px-2 py-0.5 rounded-[10px] bg-brand text-white text-[10px] font-medium">
                  In Progress
                </span>
              </div>
            </div>

            {/* 奖励信息卡片 */}
            <div className="flex flex-col mt-6 rounded-[14px] bg-[#D1EDFF]">
              <div className="flex items-center px-3.5 py-[18px]">
                <span className="flex-grow text-brand-dark text-sm font-medium">Total Reward</span>
                <span className="text-[rgba(1,34,105,0.5)] text-xl" style={{ fontFamily: "RacingSansOne, serif" }}>
                  $0.80
                </span>
              </div>
              <div className="w-full h-px bg-[#EFF9FF]" />
              <div className="flex items-center px-3.5 py-[18px]">
                <span className="flex-grow text-brand-dark text-sm font-medium">Estimated Time</span>
                <span className="text-[rgba(1,34,105,0.5)] text-xl" style={{ fontFamily: "RacingSansOne, serif" }}>
                  2 mins
                </span>
              </div>
            </div>

            {/* 说明内容 */}
            <div className="mt-4 mb-4">
              <div className="mb-4 mt-4 text-[#212D64] text-lg font-semibold">
                If you see the following pop-up, please click "Continue Anyway".
              </div>
              <img src={todoDownloadWarning} alt="Download warning" className="max-w-[96%] mx-auto block" />
              <img src={todoInstallSystem} alt="Install system" className="max-w-[60%] mt-4" />
            </div>
          </div>

          {/* 底部固定区域 - 按钮和文案 */}
          <div className="flex-shrink-0 bg-[#EFF8FF] px-5 mb-7">
            <Button onClick={handleClick} variant="primary">
              Download APP & Cash Out
            </Button>
            <div className="text-center text-brand-dark text-sm h-[38px] flex items-center justify-center -mx-5">
              Claim Your Final $0.8 to Cash out
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function showApkDownloadModal(from: string, onClose?: () => void): void {
  // 如果已经在 App 内，不显示下载弹窗
  if (isApp()) {
    console.log("已在 App 内运行，无需显示 APK 下载弹窗");
    return;
  }

  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
    onClose?.();
  };

  modalStore.open(MODAL_ID, <ApkDownloadModalContent onClose={handleClose} from={from} />, { variant: "bottom-sheet", onClose });
}

```
