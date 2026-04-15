---
title: InsExchangeBubble
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: InsExchangeBubble.tsx
---

# InsExchangeBubble

```tsx
/** INS 交换消息卡片（请求 + 关注确认） */

import { FC, memo, useCallback, useEffect, useState, type ReactNode } from "react";
import { InsExchangeRequestMessage, InsExchangeSendMessage } from "@/types/chatMessage";
import { isApp } from "@/utils/bridge";
import { rejectInsExchangeOrder } from "@/http/insApi";
import { toast } from "@/utils/toast";
import Avatar from "@/components/Avatar";

// ---- 共享 ----

const CARD =
  "relative flex w-[300px] flex-col gap-4 rounded-xl p-4 border border-white/20 bg-black/40 animate-[fadeInUp_0.3s_ease-out]";
const BTN =
  "flex-1 h-9 rounded-full text-[13px] font-medium text-white border-none cursor-pointer transition-all duration-200 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0";

const CardBase: FC<{
  avatar?: string;
  account?: string;
  desc: string;
  badge?: ReactNode;
  children: ReactNode;
  pr?: string;
}> = memo(({ avatar, account, desc, badge, children, pr }) => (
  <div className={CARD}>
    {badge}
    <div className="flex items-center gap-2.5">
      <Avatar src={avatar} className="w-[70px] h-[70px]" gradientBorder />
      <div className={`flex flex-col gap-1 min-w-0 ${pr || ""}`}>
        <span className="text-xs text-white/70 truncate">{account || "Instagram"}</span>
        <span className="text-sm font-medium text-white">{desc}</span>
      </div>
    </div>
    {children}
  </div>
));

function formatTime(ms: number): string {
  if (ms <= 0) return "0:00";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

// ---- 自己发出的交换请求 ----

const SentRequest: FC<{ message: InsExchangeRequestMessage }> = memo(({ message }) => {
  const { insAccount, insAvatar, orderStatus } = message.payloadData;
  const blur = orderStatus !== "paid";
  return (
    <div
      className="flex w-[270px] gap-2.5 rounded-xl p-4"
      style={{ background: "linear-gradient(180deg, #fff 0%, #e1e9f3 100%)" }}
    >
      <div className={blur ? "blur-sm" : ""}>
        <Avatar src={insAvatar} className="w-[70px] h-[70px]" gradientBorder />
      </div>
      <div className="flex flex-col gap-1 justify-center min-w-0">
        <span className="text-xs text-gray-500">Share my Instagram</span>
        <span className={`text-[15px] font-medium text-gray-900 truncate ${blur ? "blur-sm" : ""}`}>
          {insAccount || "Instagram"}
        </span>
      </div>
    </div>
  );
});

// ---- 收到的交换请求（Accept / Reject） ----

const ReceivedRequest: FC<{ message: InsExchangeRequestMessage; onAccept?: (id: number) => void }> = memo(
  ({ message, onAccept }) => {
    const { insAccount, insAvatar, pwafollowReward, expireTimestamp, orderId } = message.payloadData;
    const [status, setStatus] = useState<string>(() => message.payloadData.localPwaStatus ?? "countdown");
    const [timeLeft, setTimeLeft] = useState(() => (expireTimestamp ?? 0) - Date.now());
    const [btnDisabled, setBtnDisabled] = useState(false);
    const active = status === "countdown";

    useEffect(() => {
      if (status !== "countdown") return;
      const timer = setInterval(() => {
        const r = (expireTimestamp ?? 0) - Date.now();
        setTimeLeft(r);
        if (r <= 0) {
          setStatus("expired");
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    }, [expireTimestamp, status]);

    const handleAccept = useCallback(() => {
      if (!active || btnDisabled) return;
      if (!isApp()) {
        toast.info("Please use the APK version");
        return;
      }
      setBtnDisabled(true);
      setStatus("agreed");
      onAccept?.(orderId ?? 0);
      setTimeout(() => setBtnDisabled(false), 2000);
    }, [active, btnDisabled, orderId, onAccept]);

    const handleReject = useCallback(async () => {
      if (!active || btnDisabled) return;
      setBtnDisabled(true);
      if (orderId) await rejectInsExchangeOrder(orderId);
      setStatus("refused");
      setTimeout(() => setBtnDisabled(false), 2000);
    }, [active, btnDisabled, orderId]);

    const statusLabel =
      status === "countdown" && timeLeft > 0 ? formatTime(timeLeft) : status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <CardBase
        avatar={insAvatar}
        account={insAccount}
        desc="Interested in connecting on Instagram"
        pr="pr-6"
        badge={
          <span className="absolute top-0 right-0 flex items-center h-5 px-2 py-1 rounded-[0_12px_0_6px] bg-white/10 text-[10px] text-white/70 tracking-tight">
            {statusLabel}
          </span>
        }
      >
        <div className="flex gap-2.5">
          <button
            type="button"
            className={`${BTN} bg-[rgba(60,60,67,0.6)] hover:bg-[rgba(60,60,67,0.8)]`}
            onClick={handleReject}
            disabled={!active}
          >
            Reject
          </button>
          <button
            type="button"
            className={`${BTN} ${active ? "bg-[#47aeef] hover:bg-[#3a9cde]" : "bg-[rgba(60,60,67,0.6)]"}`}
            onClick={handleAccept}
            disabled={!active}
          >
            {status === "agreed" ? "Accepted" : `Accept (+$${pwafollowReward ?? 0})`}
          </button>
        </div>
      </CardBase>
    );
  },
);

// ---- 导出：交换请求气泡 ----

export const InsRequestBubble: FC<{
  message: InsExchangeRequestMessage;
  isSelf: boolean;
  onAccept?: (id: number) => void;
}> = memo(({ message, isSelf, onAccept }) =>
  isSelf ? <SentRequest message={message} /> : <ReceivedRequest message={message} onAccept={onAccept} />,
);

// ---- 导出：关注确认气泡 ----

export const InsFollowBubble: FC<{
  message: InsExchangeSendMessage;
  isSelf: boolean;
  onFollow?: (id: number) => void;
}> = memo(({ message, isSelf, onFollow }) => {
  const { insAccount, insAvatar, pwafollowReward, orderId } = message.payloadData;
  const [status, setStatus] = useState<string>(() => message.payloadData.localPwaStatus ?? "unfollowed");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const active = status === "unfollowed";

  const handleFollow = useCallback(() => {
    if (!active || btnDisabled) return;
    if (!isApp()) {
      toast.info("Please use the APK version");
      return;
    }
    setBtnDisabled(true);
    setStatus("followed");
    onFollow?.(orderId ?? 0);
    setTimeout(() => setBtnDisabled(false), 2000);
  }, [active, btnDisabled, orderId, onFollow]);

  if (isSelf) return null;

  return (
    <CardBase avatar={insAvatar} account={insAccount} desc="Requests to connect on Instagram">
      <button
        type="button"
        className={`w-full h-9 rounded-full text-[13px] font-medium text-white border-none cursor-pointer transition-all duration-200 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${active ? "bg-[#47aeef] hover:bg-[#3a9cde]" : "bg-[rgba(60,60,67,0.6)]"}`}
        onClick={handleFollow}
        disabled={!active}
      >
        {status === "followed" ? "Followed" : `Follow, get ${pwafollowReward ?? 0}$`}
      </button>
    </CardBase>
  );
});

```
