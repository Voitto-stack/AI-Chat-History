---
title: IMManager
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: IMManager.ts
---

# IMManager

```ts
import type { ChatSDK, Conversation, Message } from "@tencentcloud/chat";
import type TencentCloudChat from "@tencentcloud/chat/index.es.js";
// eslint-disable-next-line no-restricted-imports -- 非 React 组件，需要直接访问 store
import { useUserStore } from "@/stores/userStore";
import { getAvatarUrl } from "@/utils/userUtil";
import { MessageType, CustomDescription } from "@/types/chatMessage";

// SDK 动态加载（仅在实际使用时加载）
let _TencentCloudChat: typeof TencentCloudChat | null = null;
let _sdkLoadPromise: Promise<void> | null = null;

/**
 * 延迟加载 IM SDK（仅在首次调用时加载）
 * 预期加载时间: 强网 <300ms, 弱网 <1s
 */
async function ensureIMSDKLoaded(): Promise<void> {
  if (_TencentCloudChat) return;

  if (!_sdkLoadPromise) {
    _sdkLoadPromise = import("@tencentcloud/chat/index.es.js")
      .then((module) => {
        _TencentCloudChat = module.default;
        console.log("[IMManager] IM SDK loaded successfully");
      })
      .catch((error) => {
        console.error("[IMManager] Failed to load IM SDK:", error);
        _sdkLoadPromise = null; // 重置以便重试
        throw error;
      });
  }

  await _sdkLoadPromise;
}

const TAG = "IMManager";
const TIM_SDK_APP_ID = 1600002475; // TIM SDK AppID

// CustomDescription → MessageType 映射（用于自动生成离线推送信息）
const descriptionMessageTypeMap: Partial<Record<CustomDescription, MessageType>> = {
  [CustomDescription.Gift]: MessageType.Gift,
  [CustomDescription.Giphy]: MessageType.Giphy,
  [CustomDescription.Tips]: MessageType.Tips,
  [CustomDescription.RequestSelfie]: MessageType.RequestSelfie,
  [CustomDescription.RequestContact]: MessageType.RequestContact,
  [CustomDescription.Contact]: MessageType.Contact,
  [CustomDescription.InsExchangeRequestMessage]: MessageType.InsExchangeRequestMessage,
  [CustomDescription.InsExchangeSystemMessage]: MessageType.InsExchangeSystemMessage,
  [CustomDescription.InsExchangeSendMessage]: MessageType.InsExchangeSendMessage,
  [CustomDescription.AVCall]: MessageType.AVCall,
};

// 会话扩展数据（存储在 TIM 云端，通过 setConversationCustomData 同步）
export interface ConversationCustomData {
  peerSendCount?: number; // 对方发送消息数
}

// 消息接收监听器接口
export interface OnReceiveMsg {
  onMessage(message: Message): void;
}

type OnConversationUpdate = (event: { data: Conversation[] }) => void;
type OnNetStateChange = (isConnected: boolean) => void;

/**
 * IMManager - 腾讯即时通讯管理类
 * 单例模式，管理 TIM SDK 的初始化、登录、消息收发等功能
 * 优化：IM SDK 改为动态加载，减少首屏 712KB
 */
class IMManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ChatSDK: any = null; // TIM SDK 实例（动态类型）
  private onReceiveMsgList: OnReceiveMsg[] = []; // 消息接收监听器列表
  private onConversationUpdateList: OnConversationUpdate[] = []; // 会话更新监听器列表
  private onNetStateChangeList: OnNetStateChange[] = []; // 网络状态变化监听器列表
  private onReadyListeners: (() => void)[] = []; // SDK 就绪监听器列表
  private isReady = false; // SDK 是否就绪
  private isLoggedIn = false; // 是否已登录
  private isNetConnected = true; // 网络是否连接

  // 初始化 TIM SDK（只调用一次）
  public async initSdk() {
    if (this.ChatSDK) return;

    // 🔥 动态加载 SDK（首次调用时才下载）
    await ensureIMSDKLoaded();

    console.log(TAG, "初始化 TIM SDK");
    this.ChatSDK = _TencentCloudChat!.create({ SDKAppID: TIM_SDK_APP_ID });
    this.ChatSDK.setLogLevel(import.meta.env.MODE === "production" ? 1 : 0);

    // 核心事件
    this.ChatSDK.on(_TencentCloudChat!.EVENT.SDK_READY, this.onSdkReady.bind(this));
    this.ChatSDK.on(_TencentCloudChat!.EVENT.MESSAGE_RECEIVED, this.onMessageReceived.bind(this));
    this.ChatSDK.on(_TencentCloudChat!.EVENT.CONVERSATION_LIST_UPDATED, this.onConversationUpdated.bind(this));

    // 连接状态事件
    this.ChatSDK.on(_TencentCloudChat!.EVENT.SDK_NOT_READY, this.onSdkNotReady.bind(this));
    this.ChatSDK.on(_TencentCloudChat!.EVENT.KICKED_OUT, this.onKickedOut.bind(this));
    this.ChatSDK.on(_TencentCloudChat!.EVENT.NET_STATE_CHANGE, this.onNetStateChange.bind(this));
    this.ChatSDK.on(_TencentCloudChat!.EVENT.ERROR, this.onError.bind(this));
  }

  /**
   * 登录 TIM
   * @param userId 用户 ID
   * @param userSig 用户签名
   * @returns 是否登录成功
   */
  public async timLogin(userId: string, userSig: string): Promise<boolean> {
    if (!this.ChatSDK) {
      console.error(TAG, "SDK 未初始化，无法登录");
      return false;
    }
    if (this.isLoggedIn) return true;
    try {
      console.log(TAG, `正在登录 TIM，用户 ID: ${userId}`);
      await this.ChatSDK.login({ userID: userId, userSig });
      this.isLoggedIn = true;
      console.log(TAG, "✅ 登录成功");
      return true;
    } catch (error) {
      console.error(TAG, "❌ 登录失败:", error);
      return false;
    }
  }

  /**
   * 等待 SDK 就绪
   * @param timeout 超时时间（毫秒），默认 10000ms
   * @returns Promise<boolean>，SDK 就绪返回 true，超时返回 false
   */
  public waitForReady(timeout = 10000): Promise<boolean> {
    if (this.isReady) return Promise.resolve(true);
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        console.warn("IMManager: waitForReady 超时");
        resolve(false);
      }, timeout);

      this.onReadyListeners.push(() => {
        clearTimeout(timer);
        resolve(true);
      });
    });
  }

  // 检查 SDK 是否就绪
  public checkReady(): boolean {
    return this.isReady && this.isLoggedIn && this.isNetConnected;
  }

  // 登出 TIM
  public async logout() {
    if (!this.ChatSDK) return;
    // 重置状态
    this.isReady = false;
    this.isLoggedIn = false;
    try {
      await this.ChatSDK.logout();
    } catch {
      // ignore
    }
  }

  public get Chat(): ChatSDK | null {
    return this.ChatSDK;
  }

  public get ready(): boolean {
    return this.isReady && this.isLoggedIn && this.isNetConnected;
  }

  // 获取 IM 网络连接状态（供在线状态上报使用）
  public getIsNetConnected(): boolean {
    return this.isNetConnected;
  }

  public registerNetStateChangeListener(listener: OnNetStateChange) {
    this.onNetStateChangeList.push(listener);
  }

  public unregisterNetStateChangeListener(listener: OnNetStateChange) {
    this.removeFromList(this.onNetStateChangeList, listener);
  }

  public registerReceiveMsgListener(listener: OnReceiveMsg) {
    this.onReceiveMsgList.push(listener);
  }

  public unregisterReceiveMsgListener(listener: OnReceiveMsg) {
    this.removeFromList(this.onReceiveMsgList, listener);
  }

  public registerConversationUpdateListener(listener: OnConversationUpdate) {
    this.onConversationUpdateList.push(listener);
  }

  public unregisterConversationUpdateListener(listener: OnConversationUpdate) {
    this.removeFromList(this.onConversationUpdateList, listener);
  }

  // 注册 SDK 就绪监听器（已就绪则立即触发）
  public onReady(cb: () => void) {
    if (this.isReady) {
      cb();
      return;
    }
    this.onReadyListeners.push(cb);
  }

  // 取消注册 SDK 就绪监听器
  public offReady(cb: () => void) {
    this.removeFromList(this.onReadyListeners, cb);
  }

  // 解析会话扩展数据（从 conversation.customData 字段）
  public parseConversationCustomData(customData: string): ConversationCustomData {
    try {
      return customData ? (JSON.parse(customData) as ConversationCustomData) : {};
    } catch {
      return {};
    }
  }

  // 标记礼物消息动画已渲染
  public async markGiftRendered(message: Message): Promise<boolean> {
    if (!this.ChatSDK || !this.ready) return false;
    try {
      let cloudData: Record<string, unknown> = {};
      if (message.cloudCustomData) {
        try {
          cloudData = JSON.parse(message.cloudCustomData);
        } catch {
          // ignore
        }
      }
      // 设置 PWA.hasRendered = true
      cloudData.PWA = { ...((cloudData.PWA as Record<string, unknown>) || {}), hasRendered: true };
      message.cloudCustomData = JSON.stringify(cloudData);
      await this.ChatSDK.modifyMessage(message);
      return true;
    } catch {
      return false;
    }
  }

  // 标记对方已发送过消息（写入 TIM 云端，跨设备同步）
  public markPeerSent(convId: string) {
    if (!this.ChatSDK) return;
    this.ChatSDK.setConversationCustomData({
      conversationIDList: [convId],
      customData: JSON.stringify({ peerSendCount: 1 } satisfies ConversationCustomData),
    }).catch(() => {});
  }

  // 获取单条会话信息
  public async getConversation(conversationId: string): Promise<Conversation | undefined> {
    if (!this.ChatSDK) return;
    try {
      const response = await this.ChatSDK.getConversationProfile(conversationId);
      return response.data?.conversation;
    } catch {
      return undefined;
    }
  }

  // 获取会话列表
  public async getConversationList(): Promise<Conversation[]> {
    if (!this.ChatSDK || !this.checkReady()) return [];
    try {
      const response = await this.ChatSDK.getConversationList();
      return response.data?.conversationList ?? [];
    } catch {
      return [];
    }
  }

  // 设置消息已读
  public async setMessageRead(conversationId: string) {
    if (!this.ChatSDK) return;
    try {
      await this.ChatSDK.setMessageRead({ conversationID: conversationId });
    } catch {
      // ignore
    }
  }

  /**
   * 获取历史消息列表（分页）
   * @param conversationId 会话 ID
   * @param _count 每页条数（TIM SDK 不支持自定义，保留参数保持接口兼容）
   * @param nextReqMessageID 分页游标（首次传空字符串）
   */
  public async getMessageList(
    conversationId: string,
    _count = 20, // eslint-disable-line @typescript-eslint/no-unused-vars
    nextReqMessageID = "",
  ): Promise<{ messages: Message[]; nextReqMessageID: string; isCompleted: boolean }> {
    if (!this.ChatSDK) return { messages: [], nextReqMessageID: "", isCompleted: true };
    try {
      const response = await this.ChatSDK.getMessageList({
        conversationID: conversationId,
        nextReqMessageID: nextReqMessageID || undefined,
      });
      return {
        messages: response.data.messageList || [],
        nextReqMessageID: response.data.nextReqMessageID || "",
        isCompleted: response.data.isCompleted ?? true,
      };
    } catch {
      return { messages: [], nextReqMessageID: "", isCompleted: true };
    }
  }

  // 创建离线推送信息（对方不在线时会收到推送通知）
  public createOfflinePushInfo(messageType: MessageType, data?: string): object {
    const selfUser = useUserStore.getState().userInfo;
    if (!selfUser) return {};

    const avatarUrl = getAvatarUrl(selfUser);

    const pushInfoExt = {
      group: "chat",
      userId: selfUser.userId?.toString() ?? "",
      image: avatarUrl,
      isDH: false,
    };

    let desc = "";
    switch (messageType) {
      case MessageType.Text:
        desc = `${selfUser.username}: ${data ?? ""}`;
        break;
      case MessageType.Image:
        desc = "Picture";
        break;
      case MessageType.Giphy:
        desc = "GIF";
        break;
      case MessageType.Tips:
        try {
          desc = JSON.parse(data ?? "{}").receiveMessage ?? "[Tips]";
        } catch {
          desc = "[Tips]";
        }
        break;
      case MessageType.Gift:
        desc = "[Gift]";
        break;
      case MessageType.RequestSelfie:
        desc = "[Request Selfie]";
        break;
      case MessageType.RequestContact:
        desc = "[Request Contact]";
        break;
      case MessageType.Contact:
        desc = "[Contact]";
        break;
      case MessageType.InsExchangeRequestMessage:
        desc = "She has send you her contact information.🎉";
        break;
      case MessageType.InsExchangeSystemMessage:
        desc = `Exchange failed😢.Received ${data} coins refund.`;
        break;
      case MessageType.InsExchangeSendMessage:
        desc = "She has exchanged her contact information.🎉";
        break;
      case MessageType.AVCall:
        desc = `📲 missed ${data === "audio" ? "voice" : "video"} call from ${selfUser.username}`;
        break;
      default:
        desc = "[Unknown]";
        break;
    }

    return {
      description: desc,
      extension: JSON.stringify(pushInfoExt),
      androidInfo: {
        HuaWeiImage: avatarUrl,
        HonorImage: avatarUrl,
        GoogleImage: avatarUrl,
      },
    };
  }

  // 发送文本消息
  public async sendTextMessage(conversationId: string, text: string): Promise<Message | null> {
    if (!this.ChatSDK) return null;
    try {
      const toUserId = conversationId.replace(/^C2C/, "");
      const message = this.ChatSDK.createTextMessage({
        to: toUserId,
        conversationType: _TencentCloudChat!.TYPES.CONV_C2C,
        payload: { text },
      });
      const offlinePushInfo = this.createOfflinePushInfo(MessageType.Text, text);
      const response = await this.ChatSDK.sendMessage(message, { offlinePushInfo });
      return response.data.message;
    } catch {
      return null;
    }
  }

  /**
   * 发送自定义消息
   * @param conversationId 会话 ID
   * @param description 消息描述（用于标识消息类型）
   * @param data 消息数据（JSON 字符串）
   * @param cloudCustomData 云端自定义数据（JSON 字符串）
   */
  public async sendCustomMessage(
    conversationId: string,
    description: string,
    data: string,
    cloudCustomData = "",
  ): Promise<Message | null> {
    if (!this.ChatSDK) return null;
    try {
      const toUserId = conversationId.replace(/^C2C/, "");
      const message = this.ChatSDK.createCustomMessage({
        to: toUserId,
        conversationType: _TencentCloudChat!.TYPES.CONV_C2C,
        payload: { data, description, extension: "" },
        cloudCustomData,
      });
      // 根据 description 自动生成离线推送信息
      const messageType = descriptionMessageTypeMap[description as CustomDescription];
      const options =
        messageType != null ? { offlinePushInfo: this.createOfflinePushInfo(messageType, data) } : undefined;
      const response = await this.ChatSDK.sendMessage(message, options);
      return response.data.message;
    } catch {
      return null;
    }
  }

  private onSdkReady() {
    console.log(TAG, "✅ SDK_READY 事件触发");
    this.isReady = true;
    this.isNetConnected = true;
    this.onReadyListeners.forEach((cb) => cb());
    this.onReadyListeners = [];
  }

  private onSdkNotReady() {
    console.warn(TAG, "⚠️ SDK_NOT_READY 事件触发（连接断开）");
    this.isReady = false;
  }

  private onKickedOut(event: { data: { type: string } }) {
    console.error(TAG, "❌ 被踢下线:", event.data.type);
    this.isReady = false;
    this.isLoggedIn = false;
    // type 类型：
    // _TencentCloudChat!.TYPES.KICKED_OUT_MULT_ACCOUNT - 多端登录被踢
    // _TencentCloudChat!.TYPES.KICKED_OUT_MULT_DEVICE - 多设备登录被踢
    // _TencentCloudChat!.TYPES.KICKED_OUT_USERSIG_EXPIRED - UserSig 过期
  }

  private onNetStateChange(event: { data: { state: string } }) {
    const state = event.data.state;
    const isConnected = state === _TencentCloudChat!.TYPES.NET_STATE_CONNECTED;
    const isDisconnected = state === _TencentCloudChat!.TYPES.NET_STATE_DISCONNECTED;

    console.log(TAG, "🌐 NET_STATE_CHANGE 事件:", {
      state,
      isConnected,
      isDisconnected,
      之前状态: this.isNetConnected ? "已连接" : "未连接",
      当前isReady: this.isReady,
      当前isLoggedIn: this.isLoggedIn,
    });

    this.isNetConnected = isConnected;
    // 通知网络状态变化监听器
    this.onNetStateChangeList.forEach((cb) => cb(isConnected));

    if (isDisconnected) {
      this.isReady = false;
    } else if (isConnected && this.isLoggedIn) {
      this.isReady = true;
      this.onReadyListeners.forEach((cb) => cb());
      this.onReadyListeners = [];
    }
  }

  private onError(event: { data: unknown }) {
    console.error(TAG, "❌ SDK 错误:", event.data);
  }

  private onMessageReceived(event: { data: Message[] }) {
    event.data.forEach((msg) => {
      if (!msg.flow || msg.flow === "in") {
        this.markPeerSent(msg.conversationID);
      }
      this.onReceiveMsgList.forEach((listener) => listener.onMessage(msg));
    });
  }

  private onConversationUpdated(event: { data: Conversation[] }) {
    this.onConversationUpdateList.forEach((listener) => listener(event));
  }

  private removeFromList<T>(list: T[], item: T) {
    const index = list.indexOf(item);
    if (index !== -1) list.splice(index, 1);
  }
}

export default new IMManager();

```
