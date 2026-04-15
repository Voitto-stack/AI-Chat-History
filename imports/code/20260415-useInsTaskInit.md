---
title: useInsTaskInit
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: useInsTaskInit.ts
---

# useInsTaskInit

```ts
/**
 * useInsTaskInit - INS 交换核心逻辑
 * 管理 IM 消息监听、自动发起交换、处理收到的请求、对方接受后自动关注
 */

import { useCallback, useRef } from "react";
import { isApp, startInsRobotWebView, requestFloatingPermission, checkInsPageAbnormal } from "@/utils/bridge";
import type { InsRobotUserInfo } from "@/utils/bridge";
import { insExchangeQueue } from "@/utils/insExchangeQueue";
import {
  getPwaFollowedUser,
  listUserInsExchangeOrder,
  finishAndFollowInsExchangeOrder,
  getInsExchangeConditionInfo,
  initInsExchangeOrder,
  getClientConfig,
} from "@/http/insApi";
import { getUserInfo } from "@/http/userApi";
import { UserType } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";
import { useSendMessage } from "@/hooks/useSendMessage";
import { useInsExchangeStore, type InsExchangePendingMessage } from "@/stores/insExchangeStore";
import { useUserStore } from "@/stores/userStore";
import { CallState } from "@/types/call";
import { getCallStoreState } from "@/hooks/useCall";
import { useModal } from "@/hooks/useModal";
import { showInsExchangeModalAsync, isInsExchangeModalOpen } from "@/components/InsExchangeModal";
import { showInsAuthPermissionModalAsync } from "@/components/InsAuthPermissionModal";
import { showRewardModalAsync } from "@/components/showRewardModal";
import { showInsModal } from "@/components/showInsModal";
import { UserCloudStorage, UserCloudKey } from "@/services/userCloudStorage";
import { useModalStore } from "@/stores/modalStore";
import { OFFLINE_EARNINGS_MODAL_ID } from "@/components/OfflineEarningsModal";
import { bpTrack } from "@/tracking";
import { EventName } from "@/tracking/events";
import IMManager, { type OnReceiveMsg } from "@/services/IMManager";
import {
  createChatMessage,
  CustomDescription,
  InsExchangeRequestMessage,
  InsExchangeSendMessage,
} from "@/types/chatMessage";

const INS_ROBOT_FIRST_OPEN_KEY = "InsRobotFirstOpen" as unknown as UserCloudKey;

/** 通话中或有高优弹窗时不弹 INS 弹窗 */
function canShowInsModal(): boolean {
  const callState = getCallStoreState().callState;
  if (callState && callState !== CallState.Idle) return false;
  const { modals } = useModal.getState();
  return !modals.some((m) => ["receive-call", "exit-call", "mock-call"].includes(m.id));
}

/** 等待指定弹窗关闭（如果当前正在显示），避免弹窗叠加 */
function waitForModalClose(modalId: string): Promise<void> {
  const { modals } = useModalStore.getState();
  if (!modals.some((m) => m.id === modalId)) return Promise.resolve();

  return new Promise((resolve) => {
    const unsub = useModalStore.subscribe((state) => {
      if (!state.modals.some((m) => m.id === modalId)) {
        unsub();
        resolve();
      }
    });
  });
}

function convIdToUserId(convId: string): number {
  return parseInt(convId.replace(/^C2C/, ""), 10) || 0;
}

export function useInsTaskInit() {
  const listenerRef = useRef<OnReceiveMsg | null>(null);
  const inPeerRound = useRef<Map<string, boolean>>(new Map()); // 对方发过消息，等我方回复
  const exchangedUsers = useRef<Set<number>>(new Set()); // 已发过交换请求的用户，避免重复调接口
  const { sendCustomMessage, sendGiftMessage } = useSendMessage();

  // ---- 全局 IM 消息监听 ----

  const registerGlobalListener = useCallback(() => {
    if (listenerRef.current) return;
    const listener: OnReceiveMsg = {
      onMessage: (rawMsg) => {
        const convId = rawMsg.conversationID;
        const isIncoming = !rawMsg.flow || rawMsg.flow === "in";

        // peerChatRound 追踪：对方发 → 我回 → round++ → 自动发起交换
        if (isIncoming) {
          inPeerRound.current.set(convId, true);
        } else if (inPeerRound.current.get(convId)) {
          inPeerRound.current.set(convId, false);
          const uid = convIdToUserId(convId);
          if (uid > 0) initiateInsExchange(uid);
        }

        if (rawMsg.type !== "TIMCustomElem") return;
        const desc = rawMsg.payload?.description ?? "";

        // 收到互关请求 → 弹 InsExchangeModal
        if (desc === CustomDescription.InsExchangeRequestMessage && isIncoming) {
          const chatMsg = createChatMessage(rawMsg);
          if (chatMsg instanceof InsExchangeRequestMessage) {
            const p = chatMsg.payloadData;
            handleInsExchangeMessage({
              orderId: p.orderId ?? 0,
              peerUserId: convIdToUserId(convId),
              insAccount: p.insAccount || "",
              insAvatar: p.insAvatar || "",
              expireTimestamp: p.expireTimestamp ?? 0,
              pwafollowReward: String(p.pwafollowReward ?? "3"),
              messageId: rawMsg.ID,
            });
          }
        }

        // 对方接受了我的请求 → 自动关注
        if (desc === CustomDescription.InsExchangeSendMessage && isIncoming) {
          const chatMsg = createChatMessage(rawMsg);
          if (chatMsg instanceof InsExchangeSendMessage && chatMsg.payloadData.orderId) {
            handlePeerAccepted(chatMsg.payloadData.orderId, convIdToUserId(convId));
          }
        }
      },
    };
    IMManager.registerReceiveMsgListener(listener);
    listenerRef.current = listener;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- 启动初始化 ----

  const initInsFollowedUsers = useCallback(async () => {
    if (!isApp()) return;
    const response = await getPwaFollowedUser();
    if (!response?.followedUserinfo?.length) return;
    useInsExchangeStore.getState().setFollowedUsers(response.followedUserinfo);
    const isFirstTime = await checkFirstTimeRobot();
    for (const u of response.followedUserinfo) {
      if (!u.userInfo?.userId || !u.userInfo?.insId) continue;
      await startRobot(
        {
          orderId: 0,
          peerUserId: u.userInfo.userId,
          insAccount: u.userInfo.insId || "",
          insAvatar: u.userInfo.insAvatar || "",
          expireTimestamp: 0,
          pwafollowReward: u.earnedAmount || "0",
        },
        isFirstTime,
      );
    }
  }, []);

  const checkPendingOrders = useCallback(async () => {
    if (!isApp()) return;
    const response = await listUserInsExchangeOrder();
    if (!response?.orders?.length) return;

    const msgs: InsExchangePendingMessage[] = response.orders
      .filter((item) => item.order?.id && item.order?.maleUserId)
      .map((item) => ({
        orderId: item.order!.id!,
        peerUserId: item.order!.maleUserId!,
        insAccount: item.maleUserInfo?.insId || "",
        insAvatar: item.maleUserInfo?.insAvatar || "",
        peerNickname: item.maleUserInfo?.nickname || "",
        peerAvatar: item.maleUserInfo?.avatarUrl || "",
        expireTimestamp: (item.order!.expireAt ?? 0) * 1000,
        pwafollowReward: "3",
      }));

    if (msgs.length > 0) {
      useInsExchangeStore.getState().addMessages(msgs);
      // 延迟 3s，等待挂机收益弹窗关闭后再弹 INS 交换请求弹窗，避免弹窗叠加
      setTimeout(async () => {
        await waitForModalClose(OFFLINE_EARNINGS_MODAL_ID);
        if (canShowInsModal() && !isInsExchangeModalOpen()) showInsExchangeModal();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- 流程 A: 自动发起交换（peerChatRound++ 触发） ----

  const initiateInsExchange = useCallback(
    async (targetUserId: number) => {
      return insExchangeQueue.add(async () => {
        // 已发过交换请求的用户，直接跳过
        if (exchangedUsers.current.has(targetUserId)) return;

        // 0. 检查目标用户是否为真人（非真人不触发交换，避免无效接口调用）
        const targetUserInfoResp = await getUserInfo(targetUserId);
        if (targetUserInfoResp?.userType !== UserType.User) return;

        // 1. 检查是否满足交换条件（双方都已绑定INS账号等）
        const conditionInfo = await getInsExchangeConditionInfo(targetUserId);
        if (!conditionInfo?.allow) return;

        // 2. 创建订单
        const orderResponse = await initInsExchangeOrder(targetUserId);
        if (!orderResponse) return;

        // 3. 发送 INS 交换请求消息（主导，必须先成功）
        const userInfo = useUserStore.getState().userInfo;
        const payloadData = {
          orderId: orderResponse.orderId ?? 0,
          insAvatar: userInfo?.insAvatar || "",
          insAccount: userInfo?.insId || "",
          expireTimestamp: Date.now() + 24 * 60 * 60 * 1000,
          pwafollowReward: orderResponse.pwaFollowReward || "3",
          orderStatus: "unpaid",
        };
        await sendCustomMessage(targetUserId, CustomDescription.InsExchangeRequestMessage, JSON.stringify(payloadData));
        // 埋点：Instagram 交换请求发送 - 主动发起（旧埋点名称，用于数据连续性）
        bpTrack(EventName.pwa_instagram_request_message_initiative, {
          target_user_id: targetUserId,
          order_id: orderResponse.orderId ?? 0,
          requested_amount: parseFloat(orderResponse.pwaFollowReward ?? "0"),
        });
        // 标记已发过交换请求（内存 + 云存储持久化）
        exchangedUsers.current.add(targetUserId);
        saveExchangedUsers(exchangedUsers.current);

        // 4. INS 消息发送成功后再发礼物（如果远端配置中 ins_exchange_gift 有数量）
        const configStr = await getClientConfig();
        if (configStr) {
          try {
            const config = JSON.parse(configStr);
            const giftConfig = config.ins_exchange_gift;
            if (giftConfig?.count && giftConfig.count > 0 && giftConfig.gift?.gift_id) {
              const giftImageUrl = giftConfig.gift.gift_image_url ?? "";
              const giftPrice = parseFloat(giftConfig.gift.gift_cost_dollar ?? "0");
              for (let i = 0; i < giftConfig.count; i++) {
                await sendGiftMessage(giftConfig.gift.gift_id, targetUserId, giftImageUrl, giftPrice);
              }
            }
          } catch {
            // 礼物发送失败不影响交换流程
          }
        }
      });
    },
    [sendCustomMessage, sendGiftMessage],
  );

  // ---- 流程 B: 收到交换请求 ----

  const showInsExchangeModal = useCallback(async () => {
    await showInsExchangeModalAsync(handleAcceptExchange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInsExchangeMessage = useCallback(
    (msg: InsExchangePendingMessage) => {
      useInsExchangeStore.getState().addMessage(msg);
      // 埋点：Instagram 交换请求接收 - 被动接收（旧埋点名称，用于数据连续性）
      bpTrack(EventName.pwa_instagram_request_message_passive, {
        from_user_id: msg.peerUserId,
        order_id: msg.orderId,
        target_user_id: msg.peerUserId,
        current_status: "valid",
        requested_amount: parseFloat(msg.pwafollowReward || "0"),
      });
      if (canShowInsModal() && !isInsExchangeModalOpen()) showInsExchangeModal();
    },
    [showInsExchangeModal],
  );

  const handleAcceptExchange = useCallback(async (messages: InsExchangePendingMessage[]) => {
    const store = useInsExchangeStore.getState();
    store.resetEarnings();
    store.resetProcessed();

    const isFirstTime = await checkFirstTimeRobot();
    if (isFirstTime) {
      await showInsAuthPermissionModalAsync(() => requestFloatingPermission());
    }

    for (const msg of messages) {
      await insExchangeQueue.add(async () => {
        const response = await finishAndFollowInsExchangeOrder(msg.orderId, msg.peerUserId);
        if (!response) {
          useInsExchangeStore.getState().incrementProcessed();
          return;
        }
        const earned = parseFloat(response.earnedAmount ?? "0");
        if (earned > 0) useInsExchangeStore.getState().addEarnings(earned);
        await startRobot(msg, isFirstTime);
        useInsExchangeStore.getState().removeMessage(msg.orderId);
        useInsExchangeStore.getState().incrementProcessed();
      });
    }

    const totalEarnings = useInsExchangeStore.getState().earnings;
    if (totalEarnings > 0)
      await showRewardModalAsync(useUserStore.getState().cash ?? 0, totalEarnings, { source: "task" });
    store.resetEarnings();
    store.resetProcessed();
  }, []);

  // ---- 流程 C: 对方接受后自动关注 ----

  const handlePeerAccepted = useCallback(async (orderId: number, peerUserId: number) => {
    await insExchangeQueue.add(async () => {
      const response = await finishAndFollowInsExchangeOrder(orderId, peerUserId);
      if (!response) return;
      const isFirstTime = await checkFirstTimeRobot();
      await startRobot(
        { orderId, peerUserId, insAccount: "", insAvatar: "", expireTimestamp: 0, pwafollowReward: "" },
        isFirstTime,
      );
    });
  }, []);

  // ---- INS 页面异常检测 ----

  const checkInsAbnormal = useCallback(async () => {
    if (!isApp()) return;
    const userInfo = useUserStore.getState().userInfo;
    if (!userInfo?.insId) return; // 未绑定 INS 账号则跳过

    // 24h 节流（支持 debug 模式 5 分钟）
    const lastShown = await UserCloudStorage.getValue(UserCloudKey.InsModalLastShown);
    if (lastShown) {
      const thresholdMs = localStorage.getItem("short_modal_check") === "1" ? 5 * 60 * 1000 : 24 * 60 * 60 * 1000;
      if (Date.now() - new Date(lastShown).getTime() < thresholdMs) return;
    }

    const result = await checkInsPageAbnormal("leohalm");
    if (result.code !== 0 || result.type <= 0) return;

    await UserCloudStorage.setValue(UserCloudKey.InsModalLastShown, new Date().toISOString());
    showInsModal();
  }, []);

  // ---- 生命周期：由 useUserInit 在 TIM 登录后调用 ----

  /** TIM 登录成功后调用，注册监听 + 拉取初始数据 */
  const init = useCallback(() => {
    registerGlobalListener();
    loadExchangedUsers().then((users) => {
      for (const uid of users) exchangedUsers.current.add(uid);
    });
    Promise.allSettled([initInsFollowedUsers(), checkPendingOrders(), checkInsAbnormal()]);
  }, [registerGlobalListener, initInsFollowedUsers, checkPendingOrders, checkInsAbnormal]);

  /** 用户切换/登出时调用，注销监听 + 清空状态 */
  const cleanup = useCallback(() => {
    if (listenerRef.current) {
      IMManager.unregisterReceiveMsgListener(listenerRef.current);
      listenerRef.current = null;
    }
    inPeerRound.current.clear();
    exchangedUsers.current.clear();
  }, []);

  return { init, cleanup, initiateInsExchange, handlePeerAccepted, handleInsExchangeMessage };
}

// ---- 工具函数 ----

async function loadExchangedUsers(): Promise<number[]> {
  try {
    const raw = await UserCloudStorage.getValue(UserCloudKey.InsExchangedUsers);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

function saveExchangedUsers(users: Set<number>): void {
  UserCloudStorage.setValue(UserCloudKey.InsExchangedUsers, JSON.stringify([...users])).catch(() => {});
}

async function checkFirstTimeRobot(): Promise<boolean> {
  try {
    return (await UserCloudStorage.getValue(INS_ROBOT_FIRST_OPEN_KEY)) !== "1";
  } catch {
    return true;
  }
}

async function startRobot(msg: InsExchangePendingMessage, isFirstTime: boolean) {
  if (!isApp()) return;
  const userInfo = useUserStore.getState().userInfo;
  const userInfoItem: InsRobotUserInfo = {
    userId: msg.peerUserId.toString(),
    insId: msg.insAccount,
    insAvatar: msg.insAvatar,
    orderId: msg.orderId.toString(),
    earnedAmount: msg.pwafollowReward,
  };
  await startInsRobotWebView({
    userId: userInfo?.userId?.toString() || "",
    mode: isFirstTime ? "full" : "mini",
    aiImage: userInfo?.emojiAvatarWork || "",
    aiMiniImage: userInfo?.emojiAvatar || "",
    userInfoList: [userInfoItem],
  });
  if (isFirstTime) {
    try {
      await UserCloudStorage.setValue(INS_ROBOT_FIRST_OPEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }
}

```
