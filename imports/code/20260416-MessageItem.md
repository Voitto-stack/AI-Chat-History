---
title: MessageItem
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: MessageItem.tsx
---

# MessageItem

```tsx
import { memo, PropsWithChildren, useState, ReactNode } from "react";
import { UserInfo } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import {
  TimMessage,
  TextMessage,
  ImageMessage,
  GiphyMessage,
  TipsMessage,
  GreetingMessage,
  GiftMessage,
  AVCallMessage,
  InsExchangeRequestMessage,
  InsExchangeSendMessage,
  MessageType,
} from "@/types/chatMessage";
import { InsRequestBubble, InsFollowBubble } from "./InsExchangeBubble";
import { getAvatarUrl, CustomAvatarType } from "@/utils/userUtil";
import { getTimeStamp } from "@/utils/chatUtils";
import { formatDuration } from "@/utils/timeFormat";
import Avatar from "@/components/Avatar";
import ImagePreview from "@/components/ImagePreview";
import icAudioEnd from "@/assets/images/record/ic_record_voice_call.svg";
import icVideocam from "@/assets/images/record/ic_record_video_call.svg";

interface MessageItemProps {
  message: TimMessage;
  peerUserInfo: UserInfo | null;
  showTime: boolean;
  onGiftSendMore?: () => void;
}

const TimeStamp = memo<{ timestamp: number }>(({ timestamp }) => (
  <span className="mb-3 self-center text-xs text-white">{getTimeStamp(timestamp * 1000)}</span>
));

const SelfContainer = memo<PropsWithChildren<{ showTime: boolean; timestamp: number; status?: string }>>(
  ({ children, showTime, timestamp, status }) => (
    <div className="mt-4 flex flex-col items-end font-[Pangram]">
      {showTime && <TimeStamp timestamp={timestamp} />}
      {children}
      {(status === "fail" || status === "blocked") && (
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="text-xs text-[#c72014]">Message not sent</span>
          <div className="size-4 rounded-full bg-[#c72014] text-center text-[10px] leading-4 text-white">!</div>
        </div>
      )}
    </div>
  ),
);

const OtherContainer = memo<PropsWithChildren<{ showTime: boolean; timestamp: number; peerUserInfo: UserInfo | null }>>(
  ({ children, showTime, timestamp, peerUserInfo }) => (
    <div className="mt-4 flex flex-col font-[Pangram]">
      {showTime && <TimeStamp timestamp={timestamp} />}
      <div className="flex gap-2.5">
        <Avatar src={getAvatarUrl(peerUserInfo, CustomAvatarType.Min)} className="size-10" />
        {children}
      </div>
    </div>
  ),
);

const CenterBubble = memo<{ text: string; showTime: boolean; timestamp: number }>(({ text, showTime, timestamp }) => (
  <div className="mt-4 flex flex-col items-center font-[Pangram]">
    {showTime && <TimeStamp timestamp={timestamp} />}
    <span className="text-sm text-white/70">{text}</span>
  </div>
));

const TextBubble = memo<{ text: string; isSelf: boolean }>(({ text, isSelf }) => (
  <div
    className={`max-w-[213px] min-h-10 px-2.5 py-2.5 text-[17px] text-white break-words select-text ${
      isSelf ? "rounded-xl bg-brand leading-5 tracking-[-0.23px]" : "rounded-lg bg-black/25"
    }`}
  >
    {text}
  </div>
));

const ImageBubble = memo<{ url: string; isSelf: boolean; onClick: () => void }>(({ url, isSelf, onClick }) => (
  <img
    src={url}
    alt=""
    className={`h-[130px] w-[170px] cursor-pointer rounded-xl border-[0.5px] border-gray-200 object-contain ${!isSelf ? "bg-black/25" : ""}`}
    onClick={onClick}
  />
));

const GiphyBubble = memo<{ url: string; onClick: () => void }>(({ url, onClick }) => (
  <img
    src={url}
    alt=""
    className="size-40 cursor-pointer rounded-xl border-[0.5px] border-gray-200 object-contain"
    onClick={onClick}
  />
));

const GiftBubble = memo<{ giftName: string; imageUrl: string; isSelf: boolean; onSendMore?: () => void }>(
  ({ giftName, imageUrl, isSelf, onSendMore }) =>
    isSelf ? (
      <div className="mb-5 flex h-[106px] w-[220px] items-center rounded-lg bg-white px-3 py-2">
        <img src={imageUrl} alt="" className="size-[90px] shrink-0 object-contain" />
        <div className="ml-4 flex flex-1 flex-col items-start justify-center">
          <span className="text-xs text-black/60">Sent you</span>
          <span className="my-2 text-[15px] text-black">"{giftName.charAt(0).toUpperCase() + giftName.slice(1)}"</span>
          <button className="mt-2.5 h-7 w-[91px] rounded bg-brand text-[15px] text-white" onClick={onSendMore}>
            Send more
          </button>
        </div>
      </div>
    ) : (
      <div
        className="flex h-[75px] w-[180px] items-center rounded-lg border-[0.5px] border-[#6bc4ff33] px-2 py-0.5"
        style={{ backgroundImage: "linear-gradient(to bottom, #a8dcff, #ddf2ff)" }}
      >
        <span className="flex-1 text-sm font-bold text-black">{giftName} x1</span>
        <img src={imageUrl} alt="" className="size-[70px] object-contain" />
      </div>
    ),
);

const AVCallBubble = memo<{
  type: "audio" | "video";
  status: "missed" | "declined" | "completed" | "cancelled";
  duration: number;
  isSelf: boolean;
}>(({ type, status, duration, isSelf }) => {
  const statusText =
    status === "missed"
      ? isSelf
        ? "No answer"
        : "Missed"
      : status === "completed"
        ? formatDuration(duration)
        : status === "declined"
          ? "Declined"
          : "Cancelled";
  const icon = <img src={type === "video" ? icVideocam : icAudioEnd} alt="" className="size-6 p-0.5" />;

  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-white ${isSelf ? "bg-brand" : "bg-black/25"}`}
    >
      {isSelf ? (
        <>
          <span>{statusText}</span>
          {icon}
        </>
      ) : (
        <>
          {icon}
          <span>{statusText}</span>
        </>
      )}
    </div>
  );
});

const MessageItem = memo<MessageItemProps>(({ message, peerUserInfo, showTime, onGiftSendMore }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { timestamp, type } = message;
  const isSelf = message.isMe();
  const status = message.raw.status;

  // 居中显示的消息类型
  if (type === MessageType.Tips) {
    return <CenterBubble text={(message as TipsMessage).tipsText} showTime={showTime} timestamp={timestamp} />;
  }
  if (type === MessageType.Greeting) {
    return <CenterBubble text={(message as GreetingMessage).greetingText} showTime={showTime} timestamp={timestamp} />;
  }
  if (
    type === MessageType.RequestSelfie ||
    type === MessageType.RequestContact ||
    type === MessageType.Contact ||
    type === MessageType.RequestAudioVideo ||
    type === MessageType.AppRating
  ) {
    return <CenterBubble text={`[${MessageType[type]}]`} showTime={showTime} timestamp={timestamp} />;
  }
  // INS 交换请求消息 - 使用专用气泡组件
  if (type === MessageType.InsExchangeRequestMessage) {
    const bubble = <InsRequestBubble message={message as InsExchangeRequestMessage} isSelf={isSelf} />;
    return isSelf ? (
      <SelfContainer showTime={showTime} timestamp={timestamp} status={status}>
        {bubble}
      </SelfContainer>
    ) : (
      <OtherContainer showTime={showTime} timestamp={timestamp} peerUserInfo={peerUserInfo}>
        {bubble}
      </OtherContainer>
    );
  }
  // INS 关注确认消息 - 使用专用气泡组件
  if (type === MessageType.InsExchangeSendMessage) {
    const bubble = <InsFollowBubble message={message as InsExchangeSendMessage} isSelf={isSelf} />;
    return isSelf ? (
      <SelfContainer showTime={showTime} timestamp={timestamp} status={status}>
        {bubble}
      </SelfContainer>
    ) : (
      <OtherContainer showTime={showTime} timestamp={timestamp} peerUserInfo={peerUserInfo}>
        {bubble}
      </OtherContainer>
    );
  }
  if (type === MessageType.Unknown) {
    return import.meta.env.MODE !== "production" ? (
      <CenterBubble text="[Unknown Message]" showTime={showTime} timestamp={timestamp} />
    ) : null;
  }

  // 获取消息气泡内容
  const renderBubble = (): ReactNode => {
    switch (type) {
      case MessageType.Text:
        return <TextBubble text={(message as TextMessage).text} isSelf={isSelf} />;

      case MessageType.Image:
        return (
          <ImageBubble
            url={(message as ImageMessage).imageUrl}
            isSelf={isSelf}
            onClick={() => setPreviewImage((message as ImageMessage).imageUrl)}
          />
        );

      case MessageType.Giphy:
        return (
          <GiphyBubble
            url={(message as GiphyMessage).giphyUrl}
            onClick={() => setPreviewImage((message as GiphyMessage).giphyUrl)}
          />
        );

      case MessageType.Gift: {
        const { giftName, imageUrl } = (message as GiftMessage).payloadData;
        return <GiftBubble giftName={giftName} imageUrl={imageUrl} isSelf={isSelf} onSendMore={onGiftSendMore} />;
      }

      case MessageType.AVCall: {
        const {
          type: callType,
          status: callStatus,
          duration,
          callStatus: legacyStatus,
        } = (message as AVCallMessage).payloadData;
        const actualStatus = callStatus || legacyStatus || "cancelled";
        const bubbleStatus: "missed" | "declined" | "completed" | "cancelled" =
          actualStatus === "duration"
            ? "completed"
            : actualStatus === "busy"
              ? "declined"
              : (actualStatus as "missed" | "declined" | "cancelled");
        return <AVCallBubble type={callType} status={bubbleStatus} duration={duration ?? 0} isSelf={isSelf} />;
      }

      default:
        return null;
    }
  };

  const bubble = renderBubble();
  if (!bubble) return null;

  const content = isSelf ? (
    <SelfContainer showTime={showTime} timestamp={timestamp} status={status}>
      {bubble}
    </SelfContainer>
  ) : (
    <OtherContainer showTime={showTime} timestamp={timestamp} peerUserInfo={peerUserInfo}>
      {bubble}
    </OtherContainer>
  );

  return (
    <>
      {content}
      <ImagePreview
        images={previewImage ? [previewImage] : []}
        open={!!previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </>
  );
});

export default MessageItem;

```
