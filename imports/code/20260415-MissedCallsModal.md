---
title: MissedCallsModal
date: 2026-04-15T17:05:30+08:00
source: import
language: tsx
original: MissedCallsModal.tsx
---

# MissedCallsModal

```tsx
/**
 * MissedCallsModal - 单张未接来电回拨卡片
 * 显示用户信息、聊天历史和回拨按钮
 */

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { UserInfo, UserServiceCommonCode } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import imManager from "@/services/IMManager";
import { createChatMessage, MessageType, TextMessage, AVCallMessage, TimMessage } from "@/types/chatMessage";
import { getAvatarUrl, DEFAULT_AVATAR } from "@/utils/userUtil";
import { applyVideoCall } from "@/http/api";
import { bpTrack } from "@/tracking/api/byteplus";
import { EventName } from "@/tracking/events";
import { formatDuration, formatUnixToHHMM, normalizeTimestamp, formatDateToAMPM } from "@/utils/timeFormat";
import { useCall } from "@/hooks/useCall";
import { formatNumber } from "@/utils/format";

/** 时间戳间隔阈值（秒），超过则显示时间分隔 */
const TIME_GAP_THRESHOLD = 1800;

/** 格式化未接来电时间（业务专用） */
function formatMissedCallTime(timestamp?: number): string {
  if (!timestamp) return "";
  const date = new Date(normalizeTimestamp(timestamp));
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const ampm = formatDateToAMPM(date);
  const time = ampm.replace(":", ".");
  return `Missed call on ${month} ${day} at ${time}`;
}

/** 获取 AVCall 消息的文本描述 */
function getAVCallText(msg: TimMessage): string {
  if (!(msg instanceof AVCallMessage)) return "";
  const payload = msg.payloadData;
  if (!payload) return "";
  const status = payload.status || payload.callStatus;
  switch (status) {
    case "cancelled":
      return "Canceled";
    case "declined":
      return "Declined";
    case "busy":
      return "Busy";
    case "duration":
    default:
      return formatDuration(payload.duration || 0);
  }
}

interface MissedCallsModalProps {
  /** 未接来电用户信息 */
  missedCall: UserInfo;
  /** 回拨回调 */
  onCallBack?: () => void;
  /** 关闭回调 */
  onClose?: () => void;
}

export const MissedCallsModal: FC<MissedCallsModalProps> = ({ missedCall, onCallBack, onClose }) => {
  const [messages, setMessages] = useState<TimMessage[]>([]);
  const { releasePrice } = useCall();
  const videoHourlyRate = formatNumber(releasePrice * 60);

  const avatarUrl = useMemo(() => getAvatarUrl(missedCall), [missedCall]);
  const missedCallTime = useMemo(() => formatMissedCallTime(missedCall.callPwaTime), [missedCall.callPwaTime]);

  // 加载聊天历史
  useEffect(() => {
    const conversationId = `C2C${missedCall.userId}`;
    imManager
      .getMessageList(conversationId)
      .then(({ messages: rawMessages }) => {
        if (rawMessages.length === 0) return;
        const filtered: TimMessage[] = [];
        for (const msg of rawMessages) {
          const chatMsg = createChatMessage(msg);
          if (chatMsg.type !== MessageType.Text && chatMsg.type !== MessageType.AVCall) continue;
          if (!chatMsg.belongsToChatMsg) continue;
          if (chatMsg.type === MessageType.Text && chatMsg instanceof TextMessage && chatMsg.text === "") continue;
          filtered.push(chatMsg);
        }
        setMessages(filtered);
      })
      .catch((e) => console.error("[MissedCallsModal] fetch history failed:", e));
  }, [missedCall.userId]);

  // rerender-use-callback: 稳定回拨按钮回调
  const handleCallBack = useCallback(async () => {
    console.log("[MissedCallsModal] handleCallBack clicked");
    onCallBack?.();
    bpTrack(EventName.pwa_fake_call_back_popup_callback_click, { user_id: missedCall.userId });

    try {
      const response = await applyVideoCall(missedCall.userId ?? 0);
      const result = response.code === UserServiceCommonCode.Success ? "true" : "false";
      bpTrack(EventName.pwa_fake_call_back_result, { result });
    } catch {
      bpTrack(EventName.pwa_fake_call_back_result, { result: "error" });
    }
  }, [missedCall.userId, onCallBack]);

  const handleClose = useCallback(() => {
    bpTrack(EventName.pwa_fake_call_back_popup_dislike_click, {
      user_id: missedCall.userId,
      maleUserId: missedCall.userId,
    });
    bpTrack(EventName.pwa_fake_call_back_result, { result: "false" });
    onClose?.();
  }, [onClose, missedCall.userId]);

  return (
    // 固定尺寸卡片：330x530，与骨架屏一致
    <div className="relative flex flex-col w-[330px] h-[530px] rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden px-3 pt-3.5 pb-[68px]">
      {/* 关闭按钮 - 阻止事件冒泡，防止触发父容器的拖拽手势 */}
      {onClose && (
        <button
          onClick={handleClose}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          className="absolute top-3.5 right-3.5 z-[100] flex items-center justify-center w-6 h-6 rounded-full bg-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-[background-color,transform] duration-200 active:scale-[0.96] hover:bg-black/10"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* 标题 */}
      <div className="shrink-0 mb-4 pt-[11px] text-center">
        <h2 className="m-0 text-[21px] font-bold leading-[22px] text-black">Missed calls</h2>
      </div>

      {/* 内容区域 */}
      <div className="flex flex-1 flex-col min-h-0 overflow-hidden">
        {/* 卡片容器：联系人 + 聊天区域 */}
        <div className="flex flex-1 flex-col min-h-0 mb-4 rounded-xl bg-[#eee] overflow-hidden">
          {/* 联系人信息区域 */}
          <div className="flex shrink-0 items-center gap-2.5 p-3 bg-[#f5f5f5]">
            <div className="relative w-[37px] h-[37px] shrink-0">
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                }}
              />
              <div className="absolute right-0 bottom-0 z-[1] w-2 h-2 rounded-full bg-[#34c759] border border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-semibold leading-5 text-black truncate">{missedCall.username || ""}</div>
              <div className="text-[13px] leading-[18px] text-[#ff3b30]">{missedCallTime}</div>
            </div>
          </div>

          {/* 聊天消息区域 */}
          <div className="relative flex-1 min-h-0 overflow-hidden">
            {/* 毛玻璃背景 */}
            <div
              className="absolute inset-0 z-[1] bg-cover bg-center pointer-events-none"
              style={{
                backgroundImage: `url(${avatarUrl})`,
                filter: "blur(30px)",
              }}
            />
            {/* 消息列表 */}
            <div className="absolute inset-0 z-[3] flex flex-col p-3 overflow-y-auto bg-[rgba(0,5,35,0.33)]">
              {messages.map((message, index) => {
                const isMe = message.isMe();
                const isAVCall = message.type === MessageType.AVCall;
                const isText = message.type === MessageType.Text;
                const messageText = isText && message instanceof TextMessage ? message.text : "";

                // 时间戳显示：首条或间隔 >=30 分钟
                let showTime = index === 0;
                if (!showTime && index > 0) {
                  const delta = Math.abs(message.timestamp - messages[index - 1].timestamp);
                  showTime = delta >= TIME_GAP_THRESHOLD;
                }

                return (
                  <div key={message.id} className="flex flex-col">
                    {showTime && (
                      <div className="mb-2.5 text-center text-[10px] leading-[13px] text-white">
                        {formatUnixToHHMM(message.timestamp)}
                      </div>
                    )}
                    <div className={`flex mb-3 gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                      {/* 接收方头像 */}
                      {!isMe && (
                        <div className="shrink-0">
                          <img
                            src={avatarUrl}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                            }}
                          />
                        </div>
                      )}
                      <div className="flex flex-col min-w-0 max-w-[75%]">
                        {isText && (
                          <div
                            className={`p-2 rounded-[7px] text-sm leading-4 break-words ${
                              isMe ? "bg-[#47aeef] text-white self-end" : "bg-white text-black self-start"
                            }`}
                          >
                            {messageText}
                          </div>
                        )}
                        {isAVCall && (
                          <div
                            className={`inline-flex items-center gap-1 p-2 rounded-[7px] text-sm ${
                              isMe ? "bg-[#47aeef] text-white self-end" : "bg-white text-black self-start"
                            }`}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className={isMe ? "brightness-0 invert" : ""}
                            >
                              <path
                                d="M5.33 1.33h1.2c.23 0 .41.16.46.38l.53 2.67c.04.19-.04.39-.2.5L6 5.84a8.65 8.65 0 004.16 4.16l.96-1.37c.12-.16.31-.24.5-.2l2.67.53c.22.05.38.23.38.46v1.2a1.33 1.33 0 01-1.34 1.33A10.67 10.67 0 012.67 2.67 1.33 1.33 0 014 1.33h1.33z"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-sm leading-none">{getAVCallText(message)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call Back 按钮 */}
        <button
          className="relative z-10 shrink-0 w-full h-[50px] mb-4 rounded-[25px] bg-brand text-white font-semibold border-none hover:bg-[#3aa8e6] active:bg-[#2e8bc0]"
          onClick={handleCallBack}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          Call back {videoHourlyRate}$/h
        </button>
      </div>

      {/* 底部警告信息 - 绝对定位贴底，pointer-events-none 避免遮挡按钮点击 */}
      <div className="absolute bottom-0 left-0 w-full px-[22px] py-[15px] bg-[#f0f9ff] text-[12px] leading-4 text-center text-[#3c3c4399] pointer-events-none">
        Warning: Auto-reply is hidden. Contacts won't know calls are declined.
      </div>
    </div>
  );
};

```
