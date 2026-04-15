---
title: ChatFooter
date: 2026-04-15T17:05:31+08:00
source: import
language: tsx
original: ChatFooter.tsx
---

# ChatFooter

```tsx
import { memo, useCallback, useState } from "react";
import iconChatGift from "@/assets/images/chat/icon_chat_gift.svg";
import iconSendChatDetail from "@/assets/images/chat/icon_send_chat_detail.webp";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

interface ChatFooterProps {
  onSend: (text: string) => void; // 发送文本消息回调
  onGift: () => void; // 打开礼物选择器
  peerUserId?: number; // 对方用户ID（用于埋点）
  isRealUser?: boolean; // 对方是否真人（用于埋点）
  totalEarningValue?: number; // 用户总收益（用于埋点）
}

/**
 * ChatFooter - 聊天底部输入区域
 * 包含文本输入框、发送按钮、礼物按钮
 */
const ChatFooter = memo<ChatFooterProps>(({ onSend, onGift, peerUserId, isRealUser, totalEarningValue }) => {
  const [inputText, setInputText] = useState("");

  const handleSend = useCallback(() => {
    const text = inputText.trim();
    if (!text) return;
    // 埋点：发送消息
    bpTrack(EventName.pwa_chat_send_message, {
      message_content: text,
      message_length: text.length,
      reply_type: "text",
      target_user_id: peerUserId,
      target_user_type: isRealUser ? "real" : "dh",
      total_earning_value: totalEarningValue ?? 0,
    });
    onSend(text);
    setInputText("");
  }, [inputText, onSend, peerUserId, isRealUser, totalEarningValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  return (
    <div className="flex shrink-0 items-center bg-white p-2 pb-[max(8px,env(safe-area-inset-bottom))]">
      <div className="flex h-[50px] min-w-0 flex-1 items-center gap-3 overflow-hidden rounded-[999px] bg-[#f2f2f7] px-4">
        <input
          className="min-w-0 flex-1 bg-transparent text-[15px] font-[Pangram] text-[#000] outline-none placeholder:text-[rgba(60,60,67,0.3)]"
          placeholder="Start typing"
          autoComplete="off"
          inputMode="text"
          enterKeyHint="send"
          value={inputText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="shrink-0 border-none bg-transparent p-0"
          onClick={inputText ? handleSend : onGift}
          aria-label={inputText ? "Send" : "Gift"}
        >
          <img
            src={inputText ? iconSendChatDetail : iconChatGift}
            alt={inputText ? "send" : "gift"}
            className={inputText ? "h-8 w-8" : "h-6 w-6"}
          />
        </button>
      </div>
    </div>
  );
});

export default ChatFooter;

```
