---
title: chatMessage
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: chatMessage.ts
---

# chatMessage

```ts
import TencentCloudChat, { Message } from "@tencentcloud/chat";
// eslint-disable-next-line no-restricted-imports -- 类型定义文件无法使用 hooks，需要直接访问 store
import { useUserStore } from "@/stores/userStore";

// 消息类型枚举
export enum MessageType {
  Text,
  Image,
  Giphy,
  Tips,
  Status,
  Greeting,
  RequestSelfie,
  RequestContact,
  Contact,
  RequestAudioVideo,
  AppRating,
  Gift,
  AVCall,
  FirstGuide,
  Autopilot,
  ChatOrderInit,
  ChatOrderReview,
  ChatOrderReplySMS,
  CallOrder,
  IncreaseChatRound,
  SimulatedCall,
  InvisibleTxt,
  TTSMessage,
  TimCallMessage,
  InsExchangeRequestMessage,
  InsExchangeSystemMessage,
  InsExchangeSendMessage,
  Unknown,
}

// 自定义消息 description 枚举（与 react-haven 保持一致）
export enum CustomDescription {
  Giphy = "Giphy",
  Tips = "Tips",
  Status = "Status",
  Greeting = "Greeting",
  RequestSelfie = "RequestSelfie",
  RequestContact = "RequestContact",
  Contact = "Contact",
  RequestAudioVideo = "RequestAudioVideo",
  AppRating = "AppRating",
  Gift = "Gift",
  AVCall = "phone_call_message",
  PwaTips = "PwaTips",
  FirstGuide = "FirstGuide",
  Autopilot = "autopilot",
  ChatOrderInit = "chat-order-init-status",
  ChatOrderReview = "chat-order-review",
  ChatOrderReplySMS = "chat-order-reply-sms",
  CallOrder = "CallOrder",
  IncreaseChatRound = "IncreaseChatRound",
  SimulatedCall = "SimulatedCall",
  TTSMessage = "TTSMessage",
  InsExchangeRequestMessage = "insExchangeRequest",
  InsExchangeSystemMessage = "insExchangeSystem",
  InsExchangeSendMessage = "insExchangeSend",
  InvisibleTxt = "InvisibleTxt",
}

// 消息基类
interface BaseMessage {
  // 内部使用
  type: MessageType;
  timestamp: number; // Unix 秒
  id: string;
  belongsToChatMsg: boolean; // 是否属于聊天消息，要展示在聊天列表中
}

/** TIM 消息包装类，提供统一的消息访问接口 */
export class TimMessage implements BaseMessage {
  id: string;
  timestamp: number;
  type: MessageType = MessageType.Unknown;
  belongsToChatMsg: boolean = true; // 默认显示

  constructor(public raw: Message) {
    this.id = raw.ID;
    this.timestamp = raw.time;
  }

  /** 判断消息是否是自己发送的 */
  isMe(): boolean {
    if (this.raw.flow) return this.raw.flow === "out";
    const userId = useUserStore.getState().userInfo?.userId;
    return parseInt(this.raw.from ?? "0", 10) === userId;
  }

  /** 解析 payload.data 为 JSON 对象 */
  getPayloadData<T>(): T {
    try {
      return JSON.parse(this.raw.payload?.data ?? "{}") as T;
    } catch {
      return {} as T;
    }
  }

  /** 获取 cloudCustomData */
  getCloudCustomData<T>(): T | null {
    try {
      return this.raw.cloudCustomData ? JSON.parse(this.raw.cloudCustomData) : null;
    } catch {
      return null;
    }
  }

  /** 检查礼物是否已渲染 */
  isGiftRendered(): boolean {
    const cloudData = this.getCloudCustomData<{ PWA?: { hasRendered?: boolean } }>();
    return cloudData?.PWA?.hasRendered === true;
  }

  /** 获取消息预览文本（用于会话列表） */
  content(): string {
    return "[Message]";
  }
}

// 具体消息类型
export class TextMessage extends TimMessage {
  // 文本消息
  type = MessageType.Text;
  belongsToChatMsg = true;

  get text(): string {
    return this.raw.payload?.text ?? "";
  }

  content(): string {
    return this.text;
  }
}

export class ImageMessage extends TimMessage {
  // 图片消息
  type = MessageType.Image;
  belongsToChatMsg = true;

  get imageUrl(): string {
    const imageInfoArray = this.raw.payload?.imageInfoArray;
    if (!imageInfoArray || imageInfoArray.length === 0) return "";
    // 优先取大图，其次原图，最后缩略图
    const large = imageInfoArray.find((i: { type: number }) => i.type === 2);
    if (large) return large.url;
    const original = imageInfoArray.find((i: { type: number }) => i.type === 0);
    if (original) return original.url;
    const thumb = imageInfoArray.find((i: { type: number }) => i.type === 1);
    return thumb?.url ?? "";
  }

  content(): string {
    return "[image]";
  }
}

interface GiphyPayloadData {
  // Giphy payload，内部使用
  url?: string;
}

export class GiphyMessage extends TimMessage {
  // Giphy 消息
  type = MessageType.Giphy;
  belongsToChatMsg = true;

  get giphyUrl(): string {
    const data = this.getPayloadData<GiphyPayloadData>();
    return data.url ?? "";
  }

  content(): string {
    return "[GIF]";
  }
}

interface TipsPayloadData {
  // Tips payload，内部使用
  sendMessage?: string;
  receiveMessage?: string;
  identifier?: string;
}

export class TipsMessage extends TimMessage {
  // Tips 消息
  type = MessageType.Tips;
  declare belongsToChatMsg: boolean;

  constructor(raw: Message) {
    super(raw);
    const data = this.getPayloadData<TipsPayloadData>();
    // 没有填文案就不展示在聊天列表中
    this.belongsToChatMsg = !!(
      (this.isMe() && data.sendMessage && data.sendMessage !== "") ||
      (!this.isMe() && data.receiveMessage && data.receiveMessage !== "")
    );
  }

  get tipsText(): string {
    const data = this.getPayloadData<TipsPayloadData>();
    return this.isMe() ? (data.sendMessage ?? "") : (data.receiveMessage ?? "");
  }

  content(): string {
    return this.tipsText;
  }
}

interface GreetingPayloadData {
  // Greeting payload，内部使用
  text?: string;
}

export class GreetingMessage extends TimMessage {
  // Greeting 消息
  type = MessageType.Greeting;
  belongsToChatMsg = true;

  get greetingText(): string {
    const data = this.getPayloadData<GreetingPayloadData>();
    return data.text ?? "";
  }

  content(): string {
    return this.greetingText;
  }
}

export interface GiftMessagePayloadData {
  // Gift payload
  giftName: string;
  imageUrl: string;
  animationUrl: string;
  price: number; // 美分
}

export class GiftMessage extends TimMessage {
  // Gift 消息
  type = MessageType.Gift;
  belongsToChatMsg = true;

  get payloadData(): GiftMessagePayloadData {
    return this.getPayloadData<GiftMessagePayloadData>();
  }

  content(): string {
    const giftName = this.payloadData.giftName;
    return giftName ? `[${giftName}]` : "[Gift]";
  }
}

interface AVCallPayloadData {
  // AVCall payload，内部使用
  type: "audio" | "video";
  status: "duration" | "cancelled" | "declined" | "busy";
  duration: number;
  // 兼容旧格式：有些消息使用 callStatus 而不是 status
  callStatus?: "duration" | "cancelled" | "declined" | "busy";
}

export class AVCallMessage extends TimMessage {
  // 音视频通话消息
  type = MessageType.AVCall;
  belongsToChatMsg = true;

  get payloadData(): AVCallPayloadData {
    return this.getPayloadData<AVCallPayloadData>();
  }

  content(): string {
    const data = this.payloadData;
    const callType = data.type === "video" ? "Video" : "Voice";
    return `[${callType} Call]`;
  }
}

interface RequestSelfiePayloadData {
  // RequestSelfie payload
  hasHandled?: boolean; // 是否已处理
}

export class RequestSelfieMessage extends TimMessage {
  type = MessageType.RequestSelfie;
  belongsToChatMsg = true;

  get payloadData(): RequestSelfiePayloadData {
    return this.getPayloadData<RequestSelfiePayloadData>();
  }

  content(): string {
    return "[Selfie Request]";
  }
}

interface RequestContactPayloadData {
  // RequestContact payload
  hasHandled?: boolean; // 是否已处理
  type?: number; // 1: 请求, 2: 接受, 3: 拒绝
}

export class RequestContactMessage extends TimMessage {
  type = MessageType.RequestContact;
  belongsToChatMsg = true;

  get payloadData(): RequestContactPayloadData {
    return this.getPayloadData<RequestContactPayloadData>();
  }

  content(): string {
    return "[Phone Number Request]";
  }
}

interface ContactPayloadData {
  // Contact payload
  myPhoneNumber?: string; // 我的电话号码
  targetPhoneNumber?: string; // 对方的电话号码
}

export class ContactMessage extends TimMessage {
  type = MessageType.Contact;
  belongsToChatMsg = true;

  get payloadData(): ContactPayloadData {
    return this.getPayloadData<ContactPayloadData>();
  }

  content(): string {
    return "[Phone Number Exchanged]";
  }
}

interface RequestAudioVideoPayloadData {
  // RequestAudioVideo payload
  shouldHide?: boolean; // 是否隐藏
}

export class RequestAudioVideoCardMessage extends TimMessage {
  type = MessageType.RequestAudioVideo;
  belongsToChatMsg = true;

  get payloadData(): RequestAudioVideoPayloadData {
    return this.getPayloadData<RequestAudioVideoPayloadData>();
  }

  content(): string {
    return "[Video Call Invitation]";
  }
}

interface AppRatingPayloadData {
  // AppRating payload
  rating?: number; // 评分 1-5
  hasSubmit?: boolean; // 是否已提交
}

export class AppRatingMessage extends TimMessage {
  type = MessageType.AppRating;
  belongsToChatMsg = true;

  get payloadData(): AppRatingPayloadData {
    return this.getPayloadData<AppRatingPayloadData>();
  }

  content(): string {
    return "[Rate Chat Experience]";
  }
}

interface InsExchangePayloadData {
  // InsExchange payload
  orderId?: number; // 订单 ID
  orderStatus?: string; // 订单状态
  localPwaStatus?: "countdown" | "agreed" | "refused" | "expired"; // 本地状态
  expireTimestamp?: number; // 过期时间戳
  pwafollowReward?: number; // 奖励金额
  insAccount?: string; // Instagram 账号
  insAvatar?: string; // Instagram 头像
}

export class InsExchangeRequestMessage extends TimMessage {
  type = MessageType.InsExchangeRequestMessage;
  belongsToChatMsg = true;

  get payloadData(): InsExchangePayloadData {
    return this.getPayloadData<InsExchangePayloadData>();
  }

  content(): string {
    return "[Instagram Exchange]";
  }
}

interface InsExchangeSendPayloadData {
  // InsExchangeSend payload
  orderId?: number; // 订单 ID
  localPwaStatus?: "unfollowed" | "followed"; // 本地状态
  pwafollowReward?: number; // 奖励金额
  insAccount?: string; // Instagram 账号
  insAvatar?: string; // Instagram 头像
}

export class InsExchangeSendMessage extends TimMessage {
  type = MessageType.InsExchangeSendMessage;
  belongsToChatMsg = true;

  get payloadData(): InsExchangeSendPayloadData {
    return this.getPayloadData<InsExchangeSendPayloadData>();
  }

  content(): string {
    return "[Instagram Exchange]";
  }
}

// 控制消息（不显示在聊天列表中，内部使用）
class StatusMessage extends TimMessage {
  // 不显示
  type = MessageType.Status;
  belongsToChatMsg = false;
}

class FirstGuideMessage extends TimMessage {
  // 不显示
  type = MessageType.FirstGuide;
  belongsToChatMsg = false;
}

class AutopilotMessage extends TimMessage {
  // 不显示
  type = MessageType.Autopilot;
  belongsToChatMsg = false;
}

class ChatOrderInitMessage extends TimMessage {
  // 不显示
  type = MessageType.ChatOrderInit;
  belongsToChatMsg = false;
}

class ChatOrderReviewMessage extends TimMessage {
  // 不显示
  type = MessageType.ChatOrderReview;
  belongsToChatMsg = false;
}

class ChatOrderReplySMSMessage extends TimMessage {
  // 不显示
  type = MessageType.ChatOrderReplySMS;
  belongsToChatMsg = false;
}

class CallOrderMessage extends TimMessage {
  // 不显示
  type = MessageType.CallOrder;
  belongsToChatMsg = false;
}

class IncreaseChatRoundMessage extends TimMessage {
  // 不显示
  type = MessageType.IncreaseChatRound;
  belongsToChatMsg = false;
}

class SimulatedCallMessage extends TimMessage {
  // 不显示
  type = MessageType.SimulatedCall;
  belongsToChatMsg = false;
}

class InvisibleTxtMessage extends TimMessage {
  // 不显示
  type = MessageType.InvisibleTxt;
  belongsToChatMsg = false;
}

class TTSMessageClass extends TimMessage {
  // 不显示
  type = MessageType.TTSMessage;
  belongsToChatMsg = false;
}

class TimCallMessageClass extends TimMessage {
  // 不显示
  type = MessageType.TimCallMessage;
  belongsToChatMsg = false;
}

class InsExchangeSystemMessage extends TimMessage {
  // 不显示
  type = MessageType.InsExchangeSystemMessage;
  belongsToChatMsg = false;
}

class UnknownMessage extends TimMessage {
  // 未知消息：开发环境显示，生产环境不显示
  type = MessageType.Unknown;
  belongsToChatMsg = import.meta.env.MODE !== "production";

  content(): string {
    // 在会话列表中显示空串，避免显示 [Unknown Message]
    return "";
  }
}

// 消息工厂函数
export function createChatMessage(message: Message): TimMessage {
  // 根据 TIM Message 创建对应的消息类型
  if (message.type === TencentCloudChat.TYPES.MSG_TEXT) {
    // 文本消息
    return new TextMessage(message);
  }
  if (message.type === TencentCloudChat.TYPES.MSG_IMAGE) {
    // 图片消息
    return new ImageMessage(message);
  }
  if (message.type === TencentCloudChat.TYPES.MSG_CUSTOM) {
    // 自定义消息
    const desc = message.payload?.description ?? "";
    switch (desc) {
      case CustomDescription.Giphy:
        return new GiphyMessage(message);
      case CustomDescription.Tips:
      case CustomDescription.PwaTips:
        return new TipsMessage(message);
      case CustomDescription.Status:
        return new StatusMessage(message);
      case CustomDescription.Greeting:
        return new GreetingMessage(message);
      case CustomDescription.RequestSelfie:
        return new RequestSelfieMessage(message);
      case CustomDescription.RequestContact:
        return new RequestContactMessage(message);
      case CustomDescription.Contact:
        return new ContactMessage(message);
      case CustomDescription.RequestAudioVideo:
        return new RequestAudioVideoCardMessage(message);
      case CustomDescription.AppRating:
        return new AppRatingMessage(message);
      case CustomDescription.Gift:
        return new GiftMessage(message);
      case CustomDescription.AVCall:
        return new AVCallMessage(message);
      case CustomDescription.FirstGuide:
        return new FirstGuideMessage(message);
      case CustomDescription.Autopilot:
        return new AutopilotMessage(message);
      case CustomDescription.ChatOrderInit:
        return new ChatOrderInitMessage(message);
      case CustomDescription.ChatOrderReview:
        return new ChatOrderReviewMessage(message);
      case CustomDescription.ChatOrderReplySMS:
        return new ChatOrderReplySMSMessage(message);
      case CustomDescription.CallOrder:
        return new CallOrderMessage(message);
      case CustomDescription.IncreaseChatRound:
        return new IncreaseChatRoundMessage(message);
      case CustomDescription.SimulatedCall:
        return new SimulatedCallMessage(message);
      case CustomDescription.InvisibleTxt:
        return new InvisibleTxtMessage(message);
      case CustomDescription.TTSMessage:
        return new TTSMessageClass(message);
      case CustomDescription.InsExchangeRequestMessage:
        return new InsExchangeRequestMessage(message);
      case CustomDescription.InsExchangeSystemMessage:
        return new InsExchangeSystemMessage(message);
      case CustomDescription.InsExchangeSendMessage:
        return new InsExchangeSendMessage(message);
      default:
        // 检查是否是 TRTC 音视频消息（没有 description）
        if (!desc && message.payload?.data) {
          try {
            const data = JSON.parse(message.payload.data);
            if (data.businessID) {
              return new TimCallMessageClass(message);
            }
          } catch {
            // ignore
          }
        }
        return new UnknownMessage(message);
    }
  }
  return new UnknownMessage(message);
}

```
