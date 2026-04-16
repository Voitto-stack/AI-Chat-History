---
title: useChatDetail
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useChatDetail.ts
---

# useChatDetail

```ts
import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "@tencentcloud/chat";
import { UserInfo } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import IMManager, { OnReceiveMsg } from "@/services/IMManager";
import { getUserBasicInfos } from "@/http/chatApi";
import { createChatMessage, TimMessage, MessageType } from "@/types/chatMessage";
import { convToUid } from "@/utils/chatUtils";
import { useSendMessage } from "@/hooks/useSendMessage";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";

const PAGE_SIZE = 15; // TIM SDK 默认每页 15 条

// 消息去重并按时间排序（旧消息在前）
function dedupeAndSort(messages: TimMessage[]): TimMessage[] {
  const map = new Map<string, TimMessage>();
  for (const msg of messages) {
    if (!map.has(msg.id)) {
      map.set(msg.id, msg);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.timestamp - b.timestamp);
}

// 过滤消息：移除被屏蔽的消息和不应显示的消息
function filterMessages(messages: TimMessage[]): TimMessage[] {
  return messages.filter((msg) => {
    // 过滤掉被屏蔽的消息
    const cloudData = msg.getCloudCustomData<{ params?: { isBlocked?: boolean } }>();
    if (cloudData?.params?.isBlocked === true) {
      return false;
    }
    // 只保留应该显示在聊天列表中的消息
    return msg.belongsToChatMsg;
  });
}

export interface ChatDetailState {
  messages: TimMessage[];
  peerUserInfo: UserInfo | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  isTyping: boolean;
  unreadCount: number;
  sendText: (text: string) => Promise<boolean>;
  sendGiftMessage: (giftId: string, toUserId: number, giftImageUrl: string, priceDollar: number) => Promise<boolean>;
  loadMore: () => Promise<void>;
  scrollToBottomRef: React.MutableRefObject<(() => void) | null>;
}

/**
 * useChatDetail - 聊天详情页核心状态管理 Hook
 * @param conversationId TIM 会话 ID（如 "C2C12345"）
 * @param onShowGiftAnimation 显示礼物动画的回调（传递消息用于标记已渲染）
 */
export function useChatDetail(
  conversationId: string,
  onShowGiftAnimation?: (message: TimMessage) => void,
): ChatDetailState {
  const [messages, setMessages] = useState<TimMessage[]>([]);
  const [peerUserInfo, setPeerUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isTyping = false;
  const unreadCount = 0;

  const nextReqMessageIDRef = useRef("");
  const scrollToBottomRef = useRef<(() => void) | null>(null);
  const isInitializedRef = useRef(false);

  // 筛选未渲染的礼物消息，触发动画
  const triggerUnrenderedGifts = useCallback(
    (msgs: TimMessage[]) => {
      if (!onShowGiftAnimation) return;
      msgs
        .filter((msg) => msg.type === MessageType.Gift && !msg.isGiftRendered())
        .forEach((msg) => onShowGiftAnimation(msg));
    },
    [onShowGiftAnimation],
  );

  // 加载对方用户信息
  useEffect(() => {
    const uid = convToUid(conversationId);
    if (!uid) return;
    getUserBasicInfos([uid])
      .then((resp) => {
        const info = resp?.userBasicInfos?.[0];
        if (info) setPeerUserInfo(info);
      })
      .catch(() => {});
  }, [conversationId]);

  // 加载初始消息并处理未渲染的礼物
  const loadInitialMessages = useCallback(async () => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;
    setIsLoading(true);

    try {
      await IMManager.waitForReady(30000);

      const result = await IMManager.getMessageList(conversationId, PAGE_SIZE, "");
      nextReqMessageIDRef.current = result.nextReqMessageID;
      setHasMore(!result.isCompleted);

      const chatMessages = result.messages.map(createChatMessage);
      const filteredMessages = filterMessages(chatMessages);
      const sortedMessages = dedupeAndSort(filteredMessages);
      setMessages(sortedMessages);

      triggerUnrenderedGifts(sortedMessages);

      IMManager.setMessageRead(conversationId);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, [conversationId, triggerUnrenderedGifts]);

  useEffect(() => {
    isInitializedRef.current = false;
    setMessages([]);
    setHasMore(true);
    nextReqMessageIDRef.current = "";
    loadInitialMessages();
  }, [loadInitialMessages]);

  // 加载更多历史消息
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore || !IMManager.checkReady()) return;
    setIsLoadingMore(true);

    try {
      const result = await IMManager.getMessageList(conversationId, PAGE_SIZE, nextReqMessageIDRef.current);
      nextReqMessageIDRef.current = result.nextReqMessageID;
      setHasMore(!result.isCompleted);

      const newMessages = result.messages.map(createChatMessage);
      const filteredNewMessages = filterMessages(newMessages);
      setMessages((prev) => dedupeAndSort([...filteredNewMessages, ...prev]));

      // 筛选加载更多中未渲染的礼物消息，触发动画
      triggerUnrenderedGifts(newMessages);
    } finally {
      setIsLoadingMore(false);
    }
  }, [conversationId, hasMore, isLoadingMore, triggerUnrenderedGifts]);

  // 监听新消息
  useEffect(() => {
    const listener: OnReceiveMsg = {
      onMessage(message: Message) {
        if (message.conversationID !== conversationId) {
          return;
        }

        const chatMsg = createChatMessage(message);
        // 过滤消息
        if (filterMessages([chatMsg]).length === 0) {
          return;
        }
        setMessages((prev) => dedupeAndSort([...prev, chatMsg]));
        IMManager.setMessageRead(conversationId);

        // 埋点：收到消息
        bpTrack(EventName.pwa_chat_receive_message, {
          conversation_id: conversationId,
          message_type: chatMsg.type,
        });

        // 如果是礼物消息，触发动画
        if (chatMsg.type === MessageType.Gift && onShowGiftAnimation) {
          // 埋点：收到礼物
          bpTrack(EventName.pwa_chat_gift_receive, {
            conversation_id: conversationId,
          });
          onShowGiftAnimation(chatMsg);
        }
      },
    };
    IMManager.registerReceiveMsgListener(listener);
    return () => {
      IMManager.unregisterReceiveMsgListener(listener);
    };
  }, [conversationId, onShowGiftAnimation]);

  // 发送文本消息
  const sendText = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text.trim()) return false;
      const message = await IMManager.sendTextMessage(conversationId, text.trim());
      if (message) {
        const chatMsg = createChatMessage(message);
        setMessages((prev) => dedupeAndSort([...prev, chatMsg]));
        setTimeout(() => scrollToBottomRef.current?.(), 100);
        return true;
      }
      return false;
    },
    [conversationId],
  );

  // 发送礼物：调用通用方法扣费 + 发送 IM，然后处理 UI 更新（动画、滚动）
  const { sendGiftMessage: sendGiftMessageBase } = useSendMessage();

  const sendGiftMessage = useCallback(
    async (giftId: string, toUserId: number, giftImageUrl: string, priceDollar: number): Promise<boolean> => {
      // 先调用通用方法发送礼物（扣钱 + 发 IM）
      const message = await sendGiftMessageBase(giftId, toUserId, giftImageUrl, priceDollar);
      if (!message) return false;

      // 埋点：发送礼物
      bpTrack(EventName.pwa_chat_gift_send, {
        gift_id: giftId,
        to_user_id: toUserId,
        price_dollar: priceDollar,
      });

      // 将发送的礼物消息添加到消息列表
      const chatMsg = createChatMessage(message);
      setMessages((prev) => dedupeAndSort([...prev, chatMsg]));
      setTimeout(() => scrollToBottomRef.current?.(), 100);

      // 触发礼物动画
      if (chatMsg.type === MessageType.Gift && onShowGiftAnimation) {
        onShowGiftAnimation(chatMsg);
      }

      return true;
    },
    [sendGiftMessageBase, onShowGiftAnimation],
  );

  return {
    messages,
    peerUserInfo,
    isLoading,
    isLoadingMore,
    hasMore,
    isTyping,
    unreadCount,
    sendText,
    sendGiftMessage,
    loadMore,
    scrollToBottomRef,
  };
}

```
