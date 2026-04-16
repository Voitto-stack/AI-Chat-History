---
title: showInsModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: showInsModal.tsx
---

# showInsModal

```tsx
import { useCallback, useEffect, useState } from "react";
import { DragHandle } from "./DragHandle";
import Button from "./Button";
import { isApp, openInsWebView } from "@/utils/bridge";
import { showApkDownloadModal } from "./showApkDownloadModal";
import { useIns } from "@/hooks/useIns";
import { useModal } from "@/hooks/useModal";
import { useTask } from "@/hooks/useTask";
import { useTaskStore } from "@/stores/taskStore";
import { TaskId } from "@/types/task";
import icLogoIns from "@/assets/images/ins/ic_logo_ins.webp";
import icLogoInsRect from "@/assets/images/ins/ic_logo_ins_rect.webp";
import bgInsLogin from "@/assets/images/ins/bg_ins_login.webp";
import bgInsAuth from "@/assets/images/ins/bg_ins_auth.webp";
import aiAvatarWorkPlaceholder from "@/assets/images/ai_avatar_work_placeholder.webp";
import icClose from "@/assets/images/common/ic_close.svg";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

const MODAL_ID = "ins-modal";

interface InsModalProps {
  onClose: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
function InsModalContent({ onClose }: InsModalProps) {
  const { insState, resetInsState } = useIns();
  const { finishTask, isTaskFinished } = useTask();
  const [showSuccessView, setShowSuccessView] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"instructions" | "conditions">("instructions");

  useEffect(() => {
    setShowSuccessView(insState);
  }, [insState]);

  const handlePrimaryAction = useCallback(() => {
    // 埋点：Instagram 任务页面步骤1点击
    bpTrack(EventName.pwa_earning_ins_task_page_one_click, { current_ins_task_step: 1 });
    // 埋点：Instagram 授权任务状态 - 开始登录
    bpTrack(EventName.pwa_ins_authorize_task_status, {
      status: "login_instagram_clicked",
      current_ins_task_step: 1,
    });
    // 埋点：Instagram 授权权限
    bpTrack(EventName.pwa_perm_ig_authorization);
    openInsWebView();
  }, []);

  const handleComplete = useCallback(async () => {
    try {
      // 埋点：Instagram 任务页面步骤2点击
      bpTrack(EventName.pwa_earning_ins_task_page_two_click, { current_ins_task_step: 2 });
      // 埋点：Instagram 授权任务状态 - 授权自动驾驶
      bpTrack(EventName.pwa_ins_authorize_task_status, {
        status: "authorize_autopilot_clicked",
        current_ins_task_step: 2,
      });

      // 如果任务已完成，说明是换绑场景，不需要再次完成任务
      if (!isTaskFinished(TaskId.BindInsAccount)) {
        await finishTask(TaskId.BindInsAccount);
        // 埋点：Instagram 奖励
        const insRewardAmount = parseFloat(useTaskStore.getState().getTask(TaskId.BindInsAccount)?.reward ?? "0") || 0;
        bpTrack(EventName.pwa_instagram_reward, {
          task_id: TaskId.BindInsAccount,
          instagram_reward_type: "bind_task",
          ins_reward_amount: insRewardAmount,
        });
      }
      // 重置授权状态
      resetInsState();
      // 关闭弹窗
      onClose();
    } catch (error) {
      console.error("Failed to complete Instagram task:", error);
    }
  }, [onClose, finishTask, isTaskFinished, resetInsState]);

  // 显示完成界面
  const renderSuccessView = () => {
    const avatarSrc = aiAvatarWorkPlaceholder;

    return (
      <div
        data-bottom-sheet
        className="w-full bg-white rounded-t-[20px] overflow-hidden"
        style={{
          height: "522px",
        }}
      >
        <div className="relative flex flex-col items-center pt-5 px-3.5 pb-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-3.5 w-6 h-6 rounded-full border-none cursor-pointer flex items-center justify-center"
            style={{ background: "#f2f2f7" }}
            aria-label="Close"
          >
            <img src={icClose} alt="Close" className="w-3 h-3" />
          </button>

          <h2
            className="text-[#000] font-medium text-[22px] leading-[28px]"
            style={{ fontFamily: "TTFellows, sans-serif" }}
          >
            Authorize Autopilot
          </h2>
          <p
            className="mt-2 text-[rgba(60,60,67,0.6)] text-[15px] leading-5"
            style={{ fontFamily: "Pangram, sans-serif" }}
          >
            Start earning from Instagram follows
          </p>
        </div>

        <div
          className="flex flex-col items-center justify-center mx-9 mt-[18px] pt-5 px-5 pb-0 rounded-[20px]"
          style={{ background: "#f3f3f3" }}
        >
          <div
            className="p-3 pb-0 rounded-t-[12px] w-full"
            style={{ background: "linear-gradient(89deg, #fffdf8 0.7%, #f5eaff 53.15%, #e8f6ff 99.67%)" }}
          >
            <div className="flex items-center w-full max-w-[298px] gap-2">
              <img src={icLogoInsRect} alt="Instagram" className="w-4 h-4 rounded-[6px]" />
              <span className="text-[#000] font-semibold text-[14px]" style={{ fontFamily: "Pangram, sans-serif" }}>
                IG Assistant
              </span>
            </div>

            <div
              className="flex items-end justify-between w-full h-8 mt-2.5 px-2 rounded-t-[6px] overflow-visible"
              style={{ background: "#9da4b7", backdropFilter: "blur(8px)" }}
            >
              <span
                className="text-white font-medium text-[12.669px] leading-[14.252px] self-center"
                style={{ fontFamily: "Pangram", letterSpacing: "-0.182px" }}
              >
                AI is performing task
              </span>
              <img
                src={avatarSrc}
                alt="avatar"
                className="flex-shrink-0"
                style={{
                  width: "47.508px",
                  height: "47.508px",
                  aspectRatio: "1/1",
                }}
              />
            </div>

            <img src={bgInsAuth} alt="Instagram showcase" className="w-full h-[190px] object-cover" />
          </div>
        </div>

        <div className="mt-10 px-3.5">
          <Button onClick={handleComplete}>Authorize Autopilot</Button>
        </div>
      </div>
    );
  };

  // 默认视图 - 显示任务说明
  const renderDefaultView = () => {
    return (
      <div
        data-bottom-sheet
        className="w-full bg-white rounded-t-[20px] overflow-hidden flex flex-col"
        style={{
          maxHeight: "90vh",
        }}
      >
        <DragHandle onClose={onClose} backgroundColor="bg-white" />
        <div className="flex-1 overflow-hidden px-4 py-2 flex flex-col">
          <div className="flex items-start gap-3 mb-4 flex-shrink-0">
            <img src={icLogoIns} alt="Instagram" className="w-[60px] h-[60px] rounded-full flex-shrink-0" />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[#8E8E93] text-[11px] font-semibold uppercase tracking-wide">Task</span>
              <span className="text-[#1C3F7C] text-[15px] font-semibold leading-tight mt-1">
                Login To Instagram And Authorize Autopilot
              </span>
              <span className="inline-block mt-2 px-2.5 py-1 rounded-md bg-brand text-white text-[11px] font-semibold self-start">
                In Progress
              </span>
            </div>
          </div>

          <div className="rounded-[16px] bg-[#D4E9F7] overflow-hidden mb-4 flex-shrink-0">
            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="text-[#1C3F7C] text-[15px] font-semibold">Total Rewards</span>
              <span className="text-[#1C3F7C] text-[20px] font-bold">$3.00</span>
            </div>
            <div className="h-[1px] bg-white/40" />
            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="text-[#1C3F7C] text-[15px] font-semibold">Estiamted Time</span>
              <span className="text-[#1C3F7C] text-[20px] font-bold">30 secs</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-12 border-b border-[#E5E5EA] flex-shrink-0">
            <button
              onClick={() => setActiveTab("instructions")}
              className={`pb-2.5 text-[15px] font-semibold transition-colors border-b-2 ${
                activeTab === "instructions" ? "text-brand border-brand" : "text-[#8E8E93] border-transparent"
              }`}
            >
              Instructions
            </button>
            <button
              onClick={() => setActiveTab("conditions")}
              className={`pb-2.5 text-[15px] font-semibold transition-colors border-b-2 ${
                activeTab === "conditions" ? "text-brand border-brand" : "text-[#8E8E93] border-transparent"
              }`}
            >
              Conditions
            </button>
          </div>

          <div className="flex-1 overflow-y-auto mt-5 mb-4">
            {activeTab === "instructions" ? (
              <div className="rounded-[16px] bg-white">
                <img src={bgInsLogin} alt="Instagram Login" className="w-full object-contain" />
              </div>
            ) : (
              <div className="h-full space-y-3.5 px-1">
                {[
                  "No Offline Meetings: All interactions must remain within the service. Any attempt to exchange personal information (addresses, social media, etc.) or arrange offline meetings is strictly prohibited.",
                  "Respectful Language: Users must use polite and respectful language at all times. Profanity, insults, or discriminatory remarks of any kind are not allowed.",
                  "Professionalism: Keep the tone warm, friendly, and professional. Personal boundaries should always be respected.",
                  "Confidentiality: Conversations must remain private. Participants should not record, share, or disclose any part of their interactions.",
                ].map((text, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#000000] text-white text-[11px] flex items-center justify-center font-semibold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-[#000000] text-[14px] leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="flex-shrink-0 px-4 pb-6 pt-3 bg-white">
          <Button onClick={handlePrimaryAction} className="shadow-[0_4px_12px_rgba(71,174,239,0.4)]">
            Login Instagram
          </Button>
        </div>
      </div>
    );
  };

  return <>{showSuccessView && insState ? renderSuccessView() : renderDefaultView()}</>;
}

/**
 * 显示 Instagram 授权弹窗
 * @param onClose 关闭回调
 */
export function showInsModal(onClose?: () => void): void {
  // 如果不是 APK 环境，直接显示 APK 下载弹窗
  if (!isApp()) {
    showApkDownloadModal("ins_modal");
    onClose?.();
    return;
  }

  const modalStore = useModal.getState();

  const handleClose = () => {
    modalStore.close(MODAL_ID);
    onClose?.();
  };

  modalStore.open(MODAL_ID, <InsModalContent onClose={handleClose} />, { variant: "bottom-sheet", onClose });
}

```
