---
title: InsAuthPermissionModal
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: InsAuthPermissionModal.tsx
---

# InsAuthPermissionModal

```tsx
/* eslint-disable react-refresh/only-export-components */
/**
 * InsAuthPermissionModal - 悬浮窗权限弹窗
 * 首次使用 INS 机器人时弹出，24h 节流
 */

import { FC, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { useUserStore } from "@/stores/userStore";
import { getCachedAvatar } from "@/utils/avatarCache";
import aiAvatarPlaceholder from "@/assets/images/common/ai_avatar_placeholder.webp";
import insAuthPermissionImg from "@/assets/images/ins/ins_auth_permission.webp";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

const MODAL_ID = "ins-auth-permission-modal";
const THROTTLE_KEY = "ins_permission_last_shown";
const THROTTLE_MS = 24 * 60 * 60 * 1000; // 24h

interface Props {
  avatar?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Content: FC<Props> = ({ avatar, onClose, onConfirm }) => {
  // 埋点：AFK 系统请求弹窗显示
  useEffect(() => {
    bpTrack(EventName.pwa_afk_sys_request_pop_up_show);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <div className="w-[350px]">
      {/* 上方：头像 + 气泡 */}
      <div className="flex items-center justify-between h-[100px] px-2.5">
        <div className="w-[100px] h-[100px] overflow-hidden shrink-0">
          <img
            src={avatar || aiAvatarPlaceholder}
            alt=""
            className="w-[98px] h-[120px]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = aiAvatarPlaceholder;
            }}
          />
        </div>
        <div className="shrink-0 w-[230px] h-16 px-3.5 py-4 rounded-[20px] bg-brand text-white text-[13px]">
          Enable this feature to let your AI assistant help you earn.
        </div>
      </div>

      {/* 下方：白色卡片 */}
      <div className="flex flex-col p-5 gap-[18px] rounded-[30px] bg-white">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="m-0 text-xl font-bold text-black">Allow System Access</h2>
          <p className="m-0 text-[15px] text-[rgba(60,60,67,0.6)]">
            Go to Settings &gt; GraceLive and enable system access.
          </p>
        </div>
        <img src={insAuthPermissionImg} alt="" className="w-full h-[180px] object-contain" />
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            className="w-full py-2.5 rounded-full bg-brand border-none text-white font-bold text-[17px] cursor-pointer"
            onClick={() => {
              // 埋点：AFK 系统请求弹窗点击
              bpTrack(EventName.pwa_afk_sys_request_pop_up_click, {
                action: "go_and_enable",
              });
              onClose();
              onConfirm();
            }}
          >
            Open Settings
          </button>
          <p className="m-0 px-3 text-xs text-[rgba(60,60,67,0.6)] text-center">
            Enable access in settings, then return to the app to boost your earnings!
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export function showInsAuthPermissionModalAsync(onConfirm: () => void): Promise<void> {
  const lastShown = localStorage.getItem(THROTTLE_KEY);
  if (lastShown && Date.now() - parseInt(lastShown, 10) < THROTTLE_MS) return Promise.resolve(); // 24h 节流

  localStorage.setItem(THROTTLE_KEY, Date.now().toString());
  const avatar = getCachedAvatar(useUserStore.getState()?.userInfo?.emojiAvatar);

  return new Promise((resolve) => {
    const modalStore = useModal.getState();
    const handleClose = () => modalStore.close(MODAL_ID);
    modalStore.open(MODAL_ID, <Content avatar={avatar} onClose={handleClose} onConfirm={onConfirm} />, {
      variant: "center",
      onClose: resolve,
    });
  });
}

```
