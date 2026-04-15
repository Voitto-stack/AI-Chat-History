---
title: ChatNextUnreadButton
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: ChatNextUnreadButton.tsx
---

# ChatNextUnreadButton

```tsx
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useChatList from "@/hooks/chatList";

interface ChatNextUnreadButtonProps {
  conversationId: string;
}

/**
 * ChatNextUnreadButton - Next unread 按钮
 * 显示在聊天详情页，点击跳转到下一个未读会话
 */
const ChatNextUnreadButton = memo<ChatNextUnreadButtonProps>(({ conversationId }) => {
  const navigate = useNavigate();
  const { chatList } = useChatList();

  // 过滤出有未读消息的会话（排除当前会话）
  const unreadList = chatList.filter((conv) => conv.unreadCount > 0 && conv.conversationID !== conversationId);

  const handleClick = useCallback(() => {
    if (unreadList.length === 0) return;

    // 找到当前会话在未读列表中的位置，跳转到下一个
    const currentIndex = unreadList.findIndex((conv) => conv.conversationID === conversationId);
    const nextConv = currentIndex === unreadList.length - 1 ? unreadList[0] : unreadList[currentIndex + 1];

    if (nextConv) {
      navigate("/chat-detail", {
        state: { conversationId: nextConv.conversationID },
        replace: true,
      });
    }
  }, [unreadList, conversationId, navigate]);

  // 没有未读消息时不显示按钮
  if (unreadList.length === 0) return null;

  return (
    <div className="absolute bottom-3 right-4">
      <button
        type="button"
        className="relative flex items-center rounded-[20px] border-none bg-[#f2f2f2] px-[10px] py-2 text-[15px] font-normal leading-5 tracking-[-0.23px] text-black"
        onClick={handleClick}
      >
        Next unread
        <span className="absolute right-[2px] top-0 h-2 w-2 rounded-full border border-[#434152] bg-[#ff3b30]" />
      </button>
    </div>
  );
});

export default ChatNextUnreadButton;

```
