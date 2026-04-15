---
title: chat_match.d
date: 2026-04-15T17:04:48+08:00
source: import
language: ts
original: chat_match.d.ts
---

# chat_match.d

```ts
import { MessageFns } from "../../baseType";
import { UserInfo } from "../archat_api/user_api";
export declare const protobufPackage = "Match";
export declare enum appOnlineStatus {
    UNKNOWN = 0,
    ONLINE_ACTIVE = 1,
    ONLINE_INACTIVE = 2,
    UNRECOGNIZED = -1
}
export declare function appOnlineStatusFromJSON(object: any): appOnlineStatus;
export declare function appOnlineStatusToJSON(object: appOnlineStatus): string;
/** 结果码 */
export declare enum SyncChatResultCode {
    SYNC_CHAT_SUCCESS = 0,
    SYNC_CHAT_FAILED = 10,
    UNRECOGNIZED = -1
}
export declare function syncChatResultCodeFromJSON(object: any): SyncChatResultCode;
export declare function syncChatResultCodeToJSON(object: SyncChatResultCode): string;
/** 匹配的filter类型 */
export declare enum MatchFilterType {
    MATCH_FILTER_TYPE_DEFAULT = 0,
    MATCH_FILTER_TYPE_FEMALE = 1,
    MATCH_FILTER_TYPE_MALE = 2,
    MATCH_FILTER_TYPE_EVERYONE = 3,
    UNRECOGNIZED = -1
}
export declare function matchFilterTypeFromJSON(object: any): MatchFilterType;
export declare function matchFilterTypeToJSON(object: MatchFilterType): string;
export declare enum matchPlayerType {
    MATCH_PLAYER_TYPE_REAL_MAN = 0,
    MATCH_PLAYER_TYPE_REAL_DIGITAL_HUMAN = 1,
    UNRECOGNIZED = -1
}
export declare function matchPlayerTypeFromJSON(object: any): matchPlayerType;
export declare function matchPlayerTypeToJSON(object: matchPlayerType): string;
export declare enum StartMatchResultCode {
    MATCH_SUCCESS = 0,
    MATCH_FAILED = 10,
    UNRECOGNIZED = -1
}
export declare function startMatchResultCodeFromJSON(object: any): StartMatchResultCode;
export declare function startMatchResultCodeToJSON(object: StartMatchResultCode): string;
export declare enum CancelMatchResultCode {
    CANCEL_MATCH_SUCCESS = 0,
    CANCEL_MATCH_FAILED = 10,
    UNRECOGNIZED = -1
}
export declare function cancelMatchResultCodeFromJSON(object: any): CancelMatchResultCode;
export declare function cancelMatchResultCodeToJSON(object: CancelMatchResultCode): string;
export declare enum FilterTypeErrorCode {
    UPDATE_FILTER_TYPE_SUCCESS = 0,
    UPDATE_FILTER_TYPE_FAILED = 10,
    UNRECOGNIZED = -1
}
export declare function filterTypeErrorCodeFromJSON(object: any): FilterTypeErrorCode;
export declare function filterTypeErrorCodeToJSON(object: FilterTypeErrorCode): string;
export declare enum BoostResultCode {
    BOOST_SUCCESS = 0,
    /** BOOST_FAILED - 预留其他理由 */
    BOOST_FAILED = 10,
    UNRECOGNIZED = -1
}
export declare function boostResultCodeFromJSON(object: any): BoostResultCode;
export declare function boostResultCodeToJSON(object: BoostResultCode): string;
export declare enum tcpCommonCode {
    TCP_COMMON_CODE_SUCCESS = 0,
    TCP_COMMON_CODE_FAILED = 100,
    UNRECOGNIZED = -1
}
export declare function tcpCommonCodeFromJSON(object: any): tcpCommonCode;
export declare function tcpCommonCodeToJSON(object: tcpCommonCode): string;
/** 恋爱铃 */
export declare enum LoveRingType {
    /** LOVE_RING_TYPE_DEFAULT - 默认状态 */
    LOVE_RING_TYPE_DEFAULT = 0,
    /** LOVE_RING_TYPE_START - 开始 120s */
    LOVE_RING_TYPE_START = 1,
    /** LOVE_RING_TYPE_EXIT - 退出通话 120s */
    LOVE_RING_TYPE_EXIT = 2,
    /** LOVE_RING_TYPE_END - 未能成功进入通话 180s */
    LOVE_RING_TYPE_END = 3,
    /** LOVE_RING_TYPE_MATCH_HOME - 用户登录成功后进入到Match首页 */
    LOVE_RING_TYPE_MATCH_HOME = 4,
    /** LOVE_RING_TYPE_CANCEL - 恋爱铃弹出显示后，用户点击“Cancel”按钮 */
    LOVE_RING_TYPE_CANCEL = 5,
    /** LOVE_RING_TYPE_CLOSE - 恋爱铃弹出显示后，用户点击关闭按钮 */
    LOVE_RING_TYPE_CLOSE = 6,
    /** LOVE_RING_TYPE_AUTO_DISMISS - 恋爱铃弹出显示后，用户无操作恋爱铃弹框自动消失 */
    LOVE_RING_TYPE_AUTO_DISMISS = 7,
    /** LOVE_RING_TYPE_ACCEPT_REJECTED - 恋爱铃弹出显示后，用户点击“Accept”，电话被拒绝 */
    LOVE_RING_TYPE_ACCEPT_REJECTED = 8,
    /** LOVE_RING_TYPE_ACCEPT_INSUFFICIENT_BALANCE - 恋爱铃弹出显示后，用户点击“Accept”，余额不足 */
    LOVE_RING_TYPE_ACCEPT_INSUFFICIENT_BALANCE = 9,
    /** LOVE_RING_TYPE_ACCEPT_NO_ANSWER - 恋爱铃弹出显示后，用户点击“Accept”，电话未接通，用户主动挂断 */
    LOVE_RING_TYPE_ACCEPT_NO_ANSWER = 10,
    /** LOVE_RING_TYPE_ACCEPT_NOT_CONNECTED - 恋爱铃弹出显示后，用户点击“Accept”，电话未连接成功，退出通话 */
    LOVE_RING_TYPE_ACCEPT_NOT_CONNECTED = 11,
    /** LOVE_RING_TYPE_ACCEPT_CONNECTED_EXIT - 恋爱铃弹出显示后，用户点击“Accept”，电话连接成功，从视频电话中退出后 */
    LOVE_RING_TYPE_ACCEPT_CONNECTED_EXIT = 12,
    /** LOVE_RING_TYPE_EXIT_VIDEO_CALL - 用户从任意视频电话中退出 */
    LOVE_RING_TYPE_EXIT_VIDEO_CALL = 13,
    /** LOVE_RING_TYPE_DISPLAY_FAILED - 恋爱铃展示失败 */
    LOVE_RING_TYPE_DISPLAY_FAILED = 14,
    UNRECOGNIZED = -1
}
export declare function loveRingTypeFromJSON(object: any): LoveRingType;
export declare function loveRingTypeToJSON(object: LoveRingType): string;
export declare enum ChatActionType {
    CHAT_ACTION_TYPE_DEFAULT = 0,
    /** CHAT_ACTION_TYPE_ENTER - 进入聊天 */
    CHAT_ACTION_TYPE_ENTER = 1,
    /** CHAT_ACTION_TYPE_EXIT - 退出聊天 */
    CHAT_ACTION_TYPE_EXIT = 2,
    UNRECOGNIZED = -1
}
export declare function chatActionTypeFromJSON(object: any): ChatActionType;
export declare function chatActionTypeToJSON(object: ChatActionType): string;
export declare enum TimCustomMessageType {
    TIM_CUSTOM_MESSAGE_TYPE_DEFAULT = 0,
    /** TIM_CUSTOM_MESSAGE_TYPE_VIDEO_CALL_TOOL_TIPS - 主动聊天，tool tips */
    TIM_CUSTOM_MESSAGE_TYPE_VIDEO_CALL_TOOL_TIPS = 1,
    /** TIM_CUSTOM_MESSAGE_TYPE_EXCHANGE_PHONE_NUMBER_TIPS - 交换联系方式，系统提醒 */
    TIM_CUSTOM_MESSAGE_TYPE_EXCHANGE_PHONE_NUMBER_TIPS = 2,
    UNRECOGNIZED = -1
}
export declare function timCustomMessageTypeFromJSON(object: any): TimCustomMessageType;
export declare function timCustomMessageTypeToJSON(object: TimCustomMessageType): string;
export declare enum DisplayType {
    UNKNOWN_TYPE = 0,
    SUCCESS = 1,
    FAIL = 2,
    UNRECOGNIZED = -1
}
export declare function displayTypeFromJSON(object: any): DisplayType;
export declare function displayTypeToJSON(object: DisplayType): string;
/** 这两个是心跳包 */
export interface C2SHeartBeat {
    index?: number | undefined;
    status?: appOnlineStatus | undefined;
}
export interface S2CHeartBeat {
    index?: number | undefined;
}
/** 统计发过文字聊天的消息，需要上报 */
export interface C2SSyncChat {
    /** 当前聊天的 对方id */
    playerId?: number | undefined;
}
export interface S2CSyncChat {
    result?: SyncChatResultCode | undefined;
}
/** 开始匹配 */
export interface C2SStartMatch {
    /** client pass seqNum */
    seqNum?: number | undefined;
    /** 匹配类型，旧版本 */
    filterType?: MatchFilterType | undefined;
    /**
     * 临时用的flag
     * 有值就是新客户端，支持ai匹配
     * 空值就是旧端，不支持ai匹配
     */
    clientVer?: string | undefined;
}
export interface S2CStartMatch {
    result?: StartMatchResultCode | undefined;
    /** 如果匹配失败 则该id 传0 */
    matchPlayerId?: number | undefined;
    /** client pass seqNum */
    seqNum?: number | undefined;
    isOnline?: boolean | undefined;
    /**  */
    matchPlayerType?: matchPlayerType | undefined;
    /** 如果是bot的话，本次带botid下去 */
    botId?: string | undefined;
}
export interface C2SCancelMatch {
}
export interface S2CCancelMatch {
    result?: CancelMatchResultCode | undefined;
}
/** 设置匹配过滤的配置，每次变更的时候调用 */
export interface C2SSetMatchFilterType {
    filterType?: MatchFilterType | undefined;
}
export interface S2CSetMatchFilterType {
    result?: FilterTypeErrorCode | undefined;
}
/**
 * 获取上次设置的匹配类型
 * 检测本地没有 cache的时候，获取一次
 * 其他情况以本地为准
 */
export interface C2SGetMatchFilterType {
}
export interface S2CGetMatchFilterType {
    filterType?: MatchFilterType | undefined;
}
/** 将用户添加进boost */
export interface C2SAddToBoost {
}
/** 添加boost 回包 */
export interface S2CAddToBoost {
    result?: BoostResultCode | undefined;
}
/** 服务端推送boost匹配 */
export interface S2CBoostMatch {
    matchPlayerId?: number | undefined;
}
/** 将用户添加进Vip boost */
export interface C2SAddToVipBoost {
}
/** 添加Vip boost 回包 */
export interface S2CAddToVipBoost {
    result?: BoostResultCode | undefined;
}
/** 服务端推送vip boost匹配 */
export interface S2CVipBoostMatch {
    matchPlayerId?: number | undefined;
}
/** 开始一个延迟的恋爱铃 任务 */
export interface C2SStartLoveRing {
    /** 任务类型 对应不同的策略跟次数 */
    loveRingType?: LoveRingType | undefined;
}
export interface S2CStartLoveRing {
    /** 通用的 返回码 */
    code?: tcpCommonCode | undefined;
}
export interface S2CLoveRingPush {
    /** 任务推送的用户信息 */
    user?: UserInfo | undefined;
}
/** 主动match，这个协议只是为了客户端调试用，每次发一个该请求，则会推送一个 */
export interface C2SMatchCardPush {
}
/** 主动match的push，协议 */
export interface S2CMatchCardPush {
    /** 任务推送的用户信息 */
    user?: UserInfo | undefined;
}
export interface C2SChatAction {
    chatActionType?: ChatActionType | undefined;
    /** 对方的id */
    userId?: number | undefined;
}
export interface S2CChatAction {
    /** 通用的 返回码 */
    code?: tcpCommonCode | undefined;
}
/** 通知客户端 现在正在typing的人 */
export interface S2CIsTyping {
    /** 对方的id, 表示正在输入 */
    fromUserId?: number | undefined;
    /** 展示时间，单位:秒(>0) 若=0则立即停止typing 若=-1则忽略此字段 */
    delay?: number | undefined;
}
/** 通知客户端 现在正在viewProfile的人 */
export interface S2CIsViewingProfile {
    /** 对方的id，表示正在查看 */
    fromUserId?: number | undefined;
    /** 展示时间，单位:秒(>0) 若=0则立即停止typing 若=-1则忽略此字段 */
    delay?: number | undefined;
}
/** 恋爱铃展示上报 */
export interface C2SReportLoveRing {
    /** SUCCESS  FAIL */
    displayType?: DisplayType | undefined;
    /** 对方的id */
    userId?: number | undefined;
}
export interface S2CReportLoveRing {
    /** 通用的 返回码 */
    code?: tcpCommonCode | undefined;
}
/** 上报展示的用户id */
export interface C2SReportVideoMatch {
    /** 对方的id */
    targetUserId?: number | undefined;
}
export interface S2CReportVideoMatch {
    /** 通用的 返回码 */
    code?: tcpCommonCode | undefined;
}
export interface S2CCancelVideoMatch {
    /** 对方的id，客户端通过该id与当前展示的用户进行比较，如果是当前用户，则取消展示 */
    targetUserId?: number | undefined;
}
export interface UserAvatarViolationNotify {
    violation?: boolean | undefined;
    reason?: string | undefined;
}
export interface UserAvatarReviewNotify {
    startTime?: number | undefined;
}
export declare const C2SHeartBeat: MessageFns<C2SHeartBeat, "Match.C2S_HeartBeat">;
export declare const S2CHeartBeat: MessageFns<S2CHeartBeat, "Match.S2C_HeartBeat">;
export declare const C2SSyncChat: MessageFns<C2SSyncChat, "Match.C2S_SyncChat">;
export declare const S2CSyncChat: MessageFns<S2CSyncChat, "Match.S2C_SyncChat">;
export declare const C2SStartMatch: MessageFns<C2SStartMatch, "Match.C2S_StartMatch">;
export declare const S2CStartMatch: MessageFns<S2CStartMatch, "Match.S2C_StartMatch">;
export declare const C2SCancelMatch: MessageFns<C2SCancelMatch, "Match.C2S_CancelMatch">;
export declare const S2CCancelMatch: MessageFns<S2CCancelMatch, "Match.S2C_CancelMatch">;
export declare const C2SSetMatchFilterType: MessageFns<C2SSetMatchFilterType, "Match.C2S_SetMatchFilterType">;
export declare const S2CSetMatchFilterType: MessageFns<S2CSetMatchFilterType, "Match.S2C_SetMatchFilterType">;
export declare const C2SGetMatchFilterType: MessageFns<C2SGetMatchFilterType, "Match.C2S_GetMatchFilterType">;
export declare const S2CGetMatchFilterType: MessageFns<S2CGetMatchFilterType, "Match.S2C_GetMatchFilterType">;
export declare const C2SAddToBoost: MessageFns<C2SAddToBoost, "Match.C2S_AddToBoost">;
export declare const S2CAddToBoost: MessageFns<S2CAddToBoost, "Match.S2C_AddToBoost">;
export declare const S2CBoostMatch: MessageFns<S2CBoostMatch, "Match.S2C_BoostMatch">;
export declare const C2SAddToVipBoost: MessageFns<C2SAddToVipBoost, "Match.C2S_AddToVipBoost">;
export declare const S2CAddToVipBoost: MessageFns<S2CAddToVipBoost, "Match.S2C_AddToVipBoost">;
export declare const S2CVipBoostMatch: MessageFns<S2CVipBoostMatch, "Match.S2C_VipBoostMatch">;
export declare const C2SStartLoveRing: MessageFns<C2SStartLoveRing, "Match.C2S_StartLoveRing">;
export declare const S2CStartLoveRing: MessageFns<S2CStartLoveRing, "Match.S2C_StartLoveRing">;
export declare const S2CLoveRingPush: MessageFns<S2CLoveRingPush, "Match.S2C_LoveRingPush">;
export declare const C2SMatchCardPush: MessageFns<C2SMatchCardPush, "Match.C2S_MatchCardPush">;
export declare const S2CMatchCardPush: MessageFns<S2CMatchCardPush, "Match.S2C_MatchCardPush">;
export declare const C2SChatAction: MessageFns<C2SChatAction, "Match.C2S_ChatAction">;
export declare const S2CChatAction: MessageFns<S2CChatAction, "Match.S2C_ChatAction">;
export declare const S2CIsTyping: MessageFns<S2CIsTyping, "Match.S2C_IsTyping">;
export declare const S2CIsViewingProfile: MessageFns<S2CIsViewingProfile, "Match.S2C_IsViewingProfile">;
export declare const C2SReportLoveRing: MessageFns<C2SReportLoveRing, "Match.C2S_ReportLoveRing">;
export declare const S2CReportLoveRing: MessageFns<S2CReportLoveRing, "Match.S2C_ReportLoveRing">;
export declare const C2SReportVideoMatch: MessageFns<C2SReportVideoMatch, "Match.C2S_ReportVideoMatch">;
export declare const S2CReportVideoMatch: MessageFns<S2CReportVideoMatch, "Match.S2C_ReportVideoMatch">;
export declare const S2CCancelVideoMatch: MessageFns<S2CCancelVideoMatch, "Match.S2C_CancelVideoMatch">;
export declare const UserAvatarViolationNotify: MessageFns<UserAvatarViolationNotify, "Match.UserAvatarViolationNotify">;
export declare const UserAvatarReviewNotify: MessageFns<UserAvatarReviewNotify, "Match.UserAvatarReviewNotify">;
//# sourceMappingURL=chat_match.d.ts.map
```
