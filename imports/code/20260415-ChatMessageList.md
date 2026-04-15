---
title: ChatMessageList
date: 2026-04-15T17:04:51+08:00
source: import
language: tsx
original: ChatMessageList.tsx
---

# ChatMessageList

```tsx
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef } from "react";
import { UserInfo } from "@sitin/api-proto/gen/archat_api/user_api";
import { TimMessage } from "@/types/chatMessage";
import { getAvatarUrl, CustomAvatarType } from "@/utils/userUtil";
import Avatar from "@/components/Avatar";
import MessageItem from "./MessageItem";
import ChatTopCard from "./ChatTopCard";

const TIME_THRESHOLD_SECONDS = 1800; // 超过 30 分钟显示时间戳
const LOAD_MORE_THRESHOLD = 50; // 滚动到顶部多少像素内触发加载更多
const AUTO_SCROLL_THRESHOLD = 200; // 距离底部多少像素内自动滚动

export interface ChatMessageListHandler {
  scrollToBottom: () => void;
}

interface ChatMessageListProps {
  messages: TimMessage[]; // 消息列表（旧消息在前，新消息在后）
  peerUserInfo: UserInfo | null; // 对方用户信息
  selfUserInfo: UserInfo | null; // 自己的用户信息
  isTyping: boolean; // 对方是否正在输入
  hasMore: boolean; // 是否还有更多历史消息
  isLoadingMore: boolean; // 是否正在加载更多
  onLoadMore: () => void; // 触发加载更多
  onGiftSendMore?: () => void; // 点击礼物 "Send more" 按钮的回调
}

/**
 * ChatMessageList - 聊天消息列表
 */
const ChatMessageList = memo(
  forwardRef<ChatMessageListHandler, ChatMessageListProps>(
    ({ messages, peerUserInfo, selfUserInfo, isTyping, hasMore, isLoadingMore, onLoadMore, onGiftSendMore }, ref) => {
      const containerRef = useRef<HTMLDivElement>(null);
      const hasScrolledRef = useRef(false);
      const prevScrollHeightRef = useRef(0);
      const prevScrollTopRef = useRef(0);
      const prevMsgCountRef = useRef(0);
      const isLoadingMoreRef = useRef(false);
      // 用 ref 跟踪 props，避免 scroll handler 闭包中读到过期值
      const hasMoreRef = useRef(hasMore);
      const isLoadingMorePropRef = useRef(isLoadingMore);
      hasMoreRef.current = hasMore;
      isLoadingMorePropRef.current = isLoadingMore;

      // 滚动到底部的通用方法
      const scrollToBottom = useCallback(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, []);

      // 暴露 scrollToBottom 给父组件
      useImperativeHandle(ref, () => ({ scrollToBottom }), [scrollToBottom]);

      // 键盘弹起时自动滚动到底部，确保最新消息可见
      useEffect(() => {
        const vv = window.visualViewport;
        if (!vv) return;
        let prevHeight = vv.height;
        const handleResize = () => {
          const currentHeight = vv.height;
          // 视口高度变小说明键盘弹起
          if (currentHeight < prevHeight) {
            scrollToBottom();
          }
          prevHeight = currentHeight;
        };
        vv.addEventListener("resize", handleResize);
        return () => vv.removeEventListener("resize", handleResize);
      }, [scrollToBottom]);

      // 首次加载完成后滚动到底部，并自动加载填满屏幕
      useEffect(() => {
        const container = containerRef.current;
        if (!container || messages.length === 0) return;

        const isScrollable = container.scrollHeight > container.clientHeight;

        // 如果没有填满且还有更多消息，则自动加载
        if (!isScrollable && hasMore && !isLoadingMore && !hasScrolledRef.current) {
          onLoadMore();
          return;
        }

        // 首次进入或自动加载完成后滚动到底部
        if (!hasScrolledRef.current && (isScrollable || !hasMore)) {
          scrollToBottom();
          hasScrolledRef.current = true;
        }
      }, [messages.length, hasMore, isLoadingMore, onLoadMore, scrollToBottom]);

      // 加载更多后保持滚动位置（useLayoutEffect 在 DOM 更新后、浏览器绘制前执行，避免闪跳）
      useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const currentCount = messages.length;
        const prevCount = prevMsgCountRef.current;
        if (currentCount <= prevCount) {
          prevMsgCountRef.current = currentCount;
          return;
        }
        // 加载更多后保持滚动位置
        if (isLoadingMoreRef.current) {
          const heightDiff = container.scrollHeight - prevScrollHeightRef.current;
          container.scrollTop = prevScrollTopRef.current + heightDiff;
          isLoadingMoreRef.current = false;
        }
        // 新消息到来，如果在底部附近则滚动到底部
        else if (hasScrolledRef.current) {
          const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
          if (distanceFromBottom < AUTO_SCROLL_THRESHOLD) {
            scrollToBottom();
          }
        }
        prevMsgCountRef.current = currentCount;
      }, [messages.length, scrollToBottom]);

      // 处理滚动事件，检测是否滚动到顶部
      const handleScroll = useCallback(() => {
        const container = containerRef.current;
        // 通过 ref 读取最新值，避免闭包捕获过期的 props
        if (!container || !hasMoreRef.current || isLoadingMorePropRef.current) return;

        if (container.scrollTop < LOAD_MORE_THRESHOLD) {
          prevScrollHeightRef.current = container.scrollHeight;
          prevScrollTopRef.current = container.scrollTop;
          isLoadingMoreRef.current = true;
          onLoadMore();
        }
      }, [onLoadMore]);

      // 过滤出可见消息（belongsToChatMsg = true）
      const visibleMessages = messages.filter((msg) => msg.belongsToChatMsg);

      // 决定某条消息是否显示时间戳
      const shouldShowTime = useCallback(
        (index: number): boolean => {
          if (index === 0) return true;
          const curr = visibleMessages[index];
          const prev = visibleMessages[index - 1];
          return curr.timestamp - prev.timestamp >= TIME_THRESHOLD_SECONDS;
        },
        [visibleMessages],
      );

      return (
        <div
          ref={containerRef}
          className="flex h-full flex-col overflow-y-auto overscroll-none px-[10px]"
          style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          onScroll={handleScroll}
        >
          {/* 没有更多消息时显示顶部卡片（官方号不显示） */}
          {!hasMore && !peerUserInfo?.isOfficial && (
            <div className="mt-3 px-[6px]">
              <ChatTopCard peerUserInfo={peerUserInfo} selfUserInfo={selfUserInfo} />
            </div>
          )}

          {/* 消息列表 */}
          {visibleMessages.map((message, index) => (
            <MessageItem
              key={message.id}
              message={message}
              peerUserInfo={peerUserInfo}
              showTime={shouldShowTime(index)}
              onGiftSendMore={onGiftSendMore}
            />
          ))}

          {/* 打字中气泡 */}
          {isTyping && <TypingBubble peerUserInfo={peerUserInfo} />}
          {/* 底部间距（为 Next unread 按钮留出空间） */}
          <div className="h-16 shrink-0" />
        </div>
      );
    },
  ),
);

// 打字中气泡组件
const TypingBubble = memo<{ peerUserInfo: UserInfo | null }>(({ peerUserInfo }) => {
  const avatarUrl = getAvatarUrl(peerUserInfo, CustomAvatarType.Min);
  return (
    <div className="mt-4 flex items-center gap-[10px]">
      <Avatar src={avatarUrl} alt="typing" className="h-10 w-10" />
      <div className="flex items-center gap-1 rounded-lg bg-[rgba(0,0,0,0.27)] px-4 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:300ms]" />
      </div>
    </div>
  );
});

export default ChatMessageList;

```
