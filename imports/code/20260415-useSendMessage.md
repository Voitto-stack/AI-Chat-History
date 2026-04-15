---
title: useSendMessage
date: 2026-04-15T17:04:51+08:00
source: import
language: ts
original: useSendMessage.ts
---

# useSendMessage

```ts
/**
 * useSendMessage - 通用 IM 消息发送 Hook
 * 用于在任何地方发送自定义消息，不依赖具体的对话 ID
 */

import { useCallback } from "react";
import type { Message } from "@tencentcloud/chat";
import IMManager from "@/services/IMManager";
import { sendGift } from "@/http/chatApi";
import { CustomDescription } from "@/types/chatMessage";
import { UserServiceCommonCode } from "@sitin/api-proto/gen/archat_api/user_api";

interface GiftMessagePayloadData {
  giftName: string;
  imageUrl: string;
  animationUrl: string;
  price: number;
}

function extractFileName(url: string): string {
  const match = url.match(/\/([^/]+)\.[^/.]+$/);
  return match ? match[1] : "gift";
}

export function useSendMessage() {
  // 发送自定义消息
  const sendCustomMessage = useCallback(
    async (toUserId: number, description: string, data: string): Promise<Message | null> => {
      try {
        const conversationId = `C2C${toUserId}`;
        const message = await IMManager.sendCustomMessage(conversationId, description, data);
        return message;
      } catch {
        return null;
      }
    },
    [],
  );

  // 发送礼物消息（包含扣钱和发送 IM）
  const sendGiftMessage = useCallback(
    async (giftId: string, toUserId: number, giftImageUrl: string, priceDollar: number): Promise<Message | null> => {
      try {
        // 先扣钱
        const resp = await sendGift(giftId, toUserId);
        if (resp.code !== UserServiceCommonCode.Success) return null;

        // 再发 IM 消息
        const message = await sendCustomMessage(
          toUserId,
          CustomDescription.Gift,
          JSON.stringify({
            giftName: extractFileName(giftImageUrl),
            imageUrl: giftImageUrl,
            animationUrl: giftImageUrl,
            price: Math.round(priceDollar * 100),
          } satisfies GiftMessagePayloadData),
        );
        return message;
      } catch {
        return null;
      }
    },
    [sendCustomMessage],
  );

  return { sendCustomMessage, sendGiftMessage };
}

```
