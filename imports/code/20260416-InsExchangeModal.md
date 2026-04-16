---
title: InsExchangeModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: InsExchangeModal.tsx
---

# InsExchangeModal

```tsx
/* eslint-disable react-refresh/only-export-components */
/** InsExchangeModal - INS 交换请求弹窗 */

import { FC, useCallback, useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { useInsExchangeStore, type InsExchangePendingMessage } from "@/stores/insExchangeStore";
import { useUserStore } from "@/stores/userStore";
import Avatar from "@/components/Avatar";
import { getCachedAvatar } from "@/utils/avatarCache";
import aiAvatarPlaceholder from "@/assets/images/common/ai_avatar_placeholder.webp";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

const MODAL_ID = "ins-exchange-modal";
const EARNINGS_PER_USER = 3;

interface Props {
  onClose: () => void;
  onAccept: (messages: InsExchangePendingMessage[]) => Promise<void>;
}

const InsExchangeModalContent: FC<Props> = ({ onClose, onAccept }) => {
  const pendingMessages = useInsExchangeStore((s) => s.pendingMessages);
  const rawAvatar = useUserStore((s) => s.userInfo?.emojiAvatar);
  const aiAvatar = getCachedAvatar(rawAvatar) || aiAvatarPlaceholder;
  const [claimingIds, setClaimingIds] = useState<Set<number>>(new Set());
  const [acceptAllLoading, setAcceptAllLoading] = useState(false);

  // 埋点：Instagram 请求弹窗显示
  useEffect(() => {
    bpTrack(EventName.pwa_ins_request_pop_up_show, {
      request_count: pendingMessages.length,
    });
  }, [pendingMessages.length]);

  const handleClaim = useCallback(
    async (msg: InsExchangePendingMessage) => {
      if (claimingIds.has(msg.orderId)) return;
      // 埋点：Instagram 请求弹窗点击 - 单个接受
      bpTrack(EventName.pwa_ins_request_pop_up_click, {
        action: "accept_single",
        order_id: msg.orderId,
        ins_account: msg.insAccount,
      });
      setClaimingIds((prev) => new Set(prev).add(msg.orderId));
      try {
        await onAccept([msg]);
      } finally {
        setClaimingIds((prev) => {
          const next = new Set(prev);
          next.delete(msg.orderId);
          return next;
        });
      }
    },
    [claimingIds, onAccept],
  );

  const handleAcceptAll = useCallback(async () => {
    if (acceptAllLoading) return;
    // 埋点：Instagram 请求弹窗点击 - 全部接受
    bpTrack(EventName.pwa_ins_request_pop_up_click, {
      action: "accept_all",
      request_count: pendingMessages.length,
      total_earnings: pendingMessages.length * EARNINGS_PER_USER,
    });
    setAcceptAllLoading(true);
    try {
      await onAccept([...pendingMessages]);
    } finally {
      setAcceptAllLoading(false);
    }
  }, [acceptAllLoading, onAccept, pendingMessages]);

  if (pendingMessages.length === 0) {
    onClose();
    return null;
  }

  const totalEarn = pendingMessages.length * EARNINGS_PER_USER;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70">
      <div className="relative flex flex-col items-center w-[350px] max-h-[60vh] rounded-[30px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] animate-[slideIn_0.3s_ease-out]">
        {/* AI 头像，-z-1 让白色背景遮住下半身 */}
        <img
          src={aiAvatar}
          alt=""
          className="absolute -top-[110px] left-1/2 -translate-x-1/2 w-[136px] h-[136px] object-cover -z-1"
          onError={(e) => {
            (e.target as HTMLImageElement).src = aiAvatarPlaceholder;
          }}
        />

        <div className="relative z-2 flex flex-col items-center w-full min-h-0 flex-1 px-4 pt-6 pb-5 gap-[18px]">
          <h2 className="m-0 text-[17px] font-bold text-black text-center">Instagram Requests</h2>

          {/* 用户列表 */}
          <div className="flex flex-col flex-1 w-full overflow-y-auto">
            {pendingMessages.map((msg, i) => (
              <div
                key={msg.orderId}
                className="flex shrink-0 items-center justify-between w-full py-2.5 gap-2 animate-[fadeInUp_0.3s_ease-out_both]"
                style={{ animationDelay: `${0.1 + i * 0.05}s` }}
              >
                <div className="flex flex-1 items-center gap-[9px]">
                  <Avatar src={msg.peerAvatar || msg.insAvatar} className="w-[54px] h-[54px]" gradientBorder />
                  <span className="text-[15px] font-normal text-black tracking-tight">
                    {msg.peerNickname || msg.insAccount}
                  </span>
                </div>
                <button
                  className="flex items-center gap-1 px-3 py-2 rounded-full bg-[#e7f6ff] border-none cursor-pointer disabled:opacity-60"
                  disabled={claimingIds.has(msg.orderId)}
                  onClick={() => handleClaim(msg)}
                >
                  <span className="text-[#009cff] font-semibold text-[13px]">Accept</span>
                  <span className="w-[2px] h-[2px] rounded-full bg-[#009cff]" />
                  <span className="text-[#009cff] font-semibold text-[13px]">(+${EARNINGS_PER_USER})</span>
                </button>
              </div>
            ))}
          </div>

          {/* 全部接受 */}
          <button
            className="flex items-center justify-center w-full py-2.5 gap-1 rounded-full bg-brand border-none cursor-pointer shrink-0"
            disabled={acceptAllLoading}
            onClick={handleAcceptAll}
          >
            <span className="text-white font-bold text-[15px]">
              {acceptAllLoading ? "Loading..." : pendingMessages.length > 1 ? "Accept all to earn" : "Accept to earn"}
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-[#f9fcff]" />
            <span className="text-white font-bold text-[15px]">${totalEarn.toFixed(2)}</span>
          </button>
        </div>

        {/* 关闭按钮 */}
        <button
          className="absolute z-3 top-4 right-4 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#f2f2f7] border-none cursor-pointer hover:bg-[#e5e5ea]"
          onClick={onClose}
        >
          <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
            <path d="M1 1L6 6M6 1L1 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export function showInsExchangeModalAsync(
  onAccept: (messages: InsExchangePendingMessage[]) => Promise<void>,
): Promise<void> {
  return new Promise((resolve) => {
    const modalStore = useModal.getState();
    const handleClose = () => modalStore.close(MODAL_ID);
    modalStore.open(MODAL_ID, <InsExchangeModalContent onClose={handleClose} onAccept={onAccept} />, {
      variant: "center",
      onClose: resolve,
    });
  });
}

export function closeInsExchangeModal() {
  useModal.getState().close(MODAL_ID);
}

export function isInsExchangeModalOpen() {
  return useModal.getState().modals.some((m) => m.id === MODAL_ID);
}

```
