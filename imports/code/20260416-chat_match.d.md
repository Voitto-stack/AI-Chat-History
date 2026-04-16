---
title: chat_match.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: chat_match.d.ts
---

# chat_match.d

```ts
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
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
export declare enum TimCustomMessageVideoTipsType {
    /** TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_MESSAGE - 分message【消息】、intention【视频意图】两种类型 触发类型 */
    TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_MESSAGE = 0,
    /** TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_INTENT - 视频意图触发 */
    TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_INTENT = 1,
    UNRECOGNIZED = -1
}
export declare function timCustomMessageVideoTipsTypeFromJSON(object: any): TimCustomMessageVideoTipsType;
export declare function timCustomMessageVideoTipsTypeToJSON(object: TimCustomMessageVideoTipsType): string;
export declare enum DisplayType {
    UNKNOWN_TYPE = 0,
    SUCCESS = 1,
    FAIL = 2,
    UNRECOGNIZED = -1
}
export declare function displayTypeFromJSON(object: any): DisplayType;
export declare function displayTypeToJSON(object: DisplayType): string;
export declare enum UserEvent {
    USER_EVENT_UNKNOWN = 0,
    /** USER_EVENT_DH_PWA_SWIPE_CARD_EXPOSURE - DH&PWA滑卡曝光 */
    USER_EVENT_DH_PWA_SWIPE_CARD_EXPOSURE = 1,
    /** USER_EVENT_DH_PWA_SWIPE_CARD_LEFT - DH&PWA滑卡曝光被左滑 */
    USER_EVENT_DH_PWA_SWIPE_CARD_LEFT = 2,
    /** USER_EVENT_DH_PWA_SWIPE_CARD_RIGHT - DH&PWA滑卡曝光被右滑 */
    USER_EVENT_DH_PWA_SWIPE_CARD_RIGHT = 3,
    /** USER_EVENT_PWA_VIDEO_MATCH_EXPOSURE - PWA视频匹配曝光 */
    USER_EVENT_PWA_VIDEO_MATCH_EXPOSURE = 4,
    /** USER_EVENT_PWA_VIDEO_MATCH_CLICKED - PWA视频匹配被点击 */
    USER_EVENT_PWA_VIDEO_MATCH_CLICKED = 5,
    /** USER_EVENT_PWA_VIDEO_MATCH_CALL_CONNECTED - PWA视频匹配接通电话 */
    USER_EVENT_PWA_VIDEO_MATCH_CALL_CONNECTED = 6,
    /** USER_EVENT_PWA_LOVE_BELL_EXPOSURE - PWA恋爱铃曝光 */
    USER_EVENT_PWA_LOVE_BELL_EXPOSURE = 7,
    /** USER_EVENT_PWA_LOVE_BELL_CLICKED - PWA恋爱铃被点击 */
    USER_EVENT_PWA_LOVE_BELL_CLICKED = 8,
    /** USER_EVENT_PWA_LOVE_BELL_CALL_CONNECTED - PWA恋爱铃接通电话 */
    USER_EVENT_PWA_LOVE_BELL_CALL_CONNECTED = 9,
    /** USER_EVENT_PWA_TIPS_EXPOSURE - PWA tips曝光次数 */
    USER_EVENT_PWA_TIPS_EXPOSURE = 10,
    /** USER_EVENT_PWA_TIPS_CLICKED - PWA tips被点击 */
    USER_EVENT_PWA_TIPS_CLICKED = 11,
    /** USER_EVENT_PWA_TIPS_CALL_CONNECTED - PWA tips接通电话 */
    USER_EVENT_PWA_TIPS_CALL_CONNECTED = 12,
    /** USER_EVENT_PWA_LOVE_BELL_CALL_REJECT - PWA恋爱铃拒绝 */
    USER_EVENT_PWA_LOVE_BELL_CALL_REJECT = 13,
    /** USER_EVENT_PWA_VIDEO_MATCH_DELETE - PWA视频匹配-用户删除视频匹配 */
    USER_EVENT_PWA_VIDEO_MATCH_DELETE = 14,
    /** USER_EVENT_STATUS_BACKEND - 用户状态变更为后台 */
    USER_EVENT_STATUS_BACKEND = 15,
    /** USER_EVENT_STATUS_VIDEOING - 用户状态变更为视频ing */
    USER_EVENT_STATUS_VIDEOING = 16,
    /** USER_EVENT_STATUS_PWA_LEAVE_MSG_TAB - 用户离开message tab */
    USER_EVENT_STATUS_PWA_LEAVE_MSG_TAB = 17,
    /** USER_EVENT_PWA_FULL_VIDEO_MATCH_EXPOSURE - PWA全屏视频匹配曝光 */
    USER_EVENT_PWA_FULL_VIDEO_MATCH_EXPOSURE = 18,
    /** USER_EVENT_PWA_PITY_RANDOM - PWA老击穿 */
    USER_EVENT_PWA_PITY_RANDOM = 19,
    /** USER_EVENT_PWA_PITY_RANDOM_REPLY - PWA老击穿回复 */
    USER_EVENT_PWA_PITY_RANDOM_REPLY = 20,
    /** USER_EVENT_PWA_HUNTER - PWA新击穿 */
    USER_EVENT_PWA_HUNTER = 21,
    /** USER_EVENT_PWA_HUNTER_REPLY - PWA新击穿回复 */
    USER_EVENT_PWA_HUNTER_REPLY = 22,
    UNRECOGNIZED = -1
}
export declare function userEventFromJSON(object: any): UserEvent;
export declare function userEventToJSON(object: UserEvent): string;
/** 这两个是心跳包 */
export interface C2SHeartBeat {
    $type?: string | undefined;
    index?: number | undefined;
    status?: appOnlineStatus | undefined;
    isCalling?: boolean | undefined;
}
export interface S2CHeartBeat {
    $type?: string | undefined;
    index?: number | undefined;
}
/** 统计发过文字聊天的消息，需要上报 */
export interface C2SSyncChat {
    $type?: string | undefined;
    /** 当前聊天的 对方id */
    playerId?: number | undefined;
}
export interface S2CSyncChat {
    $type?: string | undefined;
    result?: SyncChatResultCode | undefined;
}
/** 开始匹配 */
export interface C2SStartMatch {
    $type?: string | undefined;
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
    $type?: string | undefined;
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
    $type?: string | undefined;
}
export interface S2CCancelMatch {
    $type?: string | undefined;
    result?: CancelMatchResultCode | undefined;
}
/** 设置匹配过滤的配置，每次变更的时候调用 */
export interface C2SSetMatchFilterType {
    $type?: string | undefined;
    filterType?: MatchFilterType | undefined;
}
export interface S2CSetMatchFilterType {
    $type?: string | undefined;
    result?: FilterTypeErrorCode | undefined;
}
/**
 * 获取上次设置的匹配类型
 * 检测本地没有 cache的时候，获取一次
 * 其他情况以本地为准
 */
export interface C2SGetMatchFilterType {
    $type?: string | undefined;
}
export interface S2CGetMatchFilterType {
    $type?: string | undefined;
    filterType?: MatchFilterType | undefined;
}
/** 将用户添加进boost */
export interface C2SAddToBoost {
    $type?: string | undefined;
}
/** 添加boost 回包 */
export interface S2CAddToBoost {
    $type?: string | undefined;
    result?: BoostResultCode | undefined;
}
/** 服务端推送boost匹配 */
export interface S2CBoostMatch {
    $type?: string | undefined;
    matchPlayerId?: number | undefined;
}
/** 将用户添加进Vip boost */
export interface C2SAddToVipBoost {
    $type?: string | undefined;
}
/** 添加Vip boost 回包 */
export interface S2CAddToVipBoost {
    $type?: string | undefined;
    result?: BoostResultCode | undefined;
}
/** 服务端推送vip boost匹配 */
export interface S2CVipBoostMatch {
    $type?: string | undefined;
    matchPlayerId?: number | undefined;
}
/** 开始一个延迟的恋爱铃 任务 */
export interface C2SStartLoveRing {
    $type?: string | undefined;
    /** 任务类型 对应不同的策略跟次数 */
    loveRingType?: LoveRingType | undefined;
}
export interface S2CStartLoveRing {
    $type?: string | undefined;
    /** 通用的 返回码 */
    code?: tcpCommonCode | undefined;
}
export interface S2CLoveRingPush {
    $type?: string | undefined;
    /** 任务推送的用户信息 */
    user?: UserInfo | undefined;
}
/** 主动match，这个协议只是为了客户端调试用，每次发一个该请求，则会推送一个 */
export interface C2SMatchCardPush {
    $type?: string | undefined;
}
/** 主动match的push，协议 */
export interface S2CMatchCardPush {
    $type?: string | undefined;
    /** 任务推送的用户信息 */
    user?: UserInfo | undefined;
}
export interface C2SChatAction {
    $type?: string | undefined;
    chatActionType?: ChatActionType | undefined;
    /** 对方的id */
    userId?: number | undefined;
}
export interface S2CChatAction {
    $type?: string | undefined;
    /** 通用的 返回码 */
    code?: tcpCommonCode | undefined;
}
/** 通知客户端 现在正在typing的人 */
export interface S2CIsTyping {
    $type?: string | undefined;
    /** 对方的id, 表示正在输入 */
    fromUserId?: number | undefined;
    /** 展示时间，单位:秒(>0) 若=0则立即停止typing 若=-1则忽略此字段 */
    delay?: number | undefined;
}
/** 通知客户端 现在正在viewProfile的人 */
export interface S2CIsViewingProfile {
    $type?: string | undefined;
    /** 对方的id，表示正在查看 */
    fromUserId?: number | undefined;
    /** 展示时间，单位:秒(>0) 若=0则立即停止typing 若=-1则忽略此字段 */
    delay?: number | undefined;
}
/** 恋爱铃展示上报 */
export interface C2SReportLoveRing {
    $type?: string | undefined;
    /** SUCCESS  FAIL */
    displayType?: DisplayType | undefined;
    /** 对方的id */
    userId?: number | undefined;
}
export interface S2CReportLoveRing {
    $type?: string | undefined;
    /** 通用的 返回码 */
    code?: tcpCommonCode | undefined;
}
/** 上报展示的用户id */
export interface C2SReportVideoMatch {
    $type?: string | undefined;
    /** 对方的id */
    targetUserId?: number | undefined;
}
export interface S2CReportVideoMatch {
    $type?: string | undefined;
    /** 通用的 返回码 */
    code?: tcpCommonCode | undefined;
}
export interface S2CCancelVideoMatch {
    $type?: string | undefined;
    /** 对方的id，客户端通过该id与当前展示的用户进行比较，如果是当前用户，则取消展示 */
    targetUserId?: number | undefined;
}
export interface S2CCancelLoveRing {
    $type?: string | undefined;
    /** 对方的id，客户端通过该id与当前展示的用户进行比较，如果是当前用户，则取消展示 */
    targetUserId?: number | undefined;
}
export interface UserAvatarViolationNotify {
    $type?: string | undefined;
    violation?: boolean | undefined;
    reason?: string | undefined;
}
export interface UserAvatarReviewNotify {
    $type?: string | undefined;
    startTime?: number | undefined;
}
/** 通知用户PWA等待回播电话 */
export interface S2CPwaVideoRecall {
    $type?: string | undefined;
    /** 任务推送的用户信息 */
    femaleUser?: UserInfo | undefined;
}
/** 用户向pwa发起假打 */
export interface S2CSearchSimulatedUserCallPwa {
    $type?: string | undefined;
    /** pwa */
    femaleUser?: UserInfo | undefined;
    /** 用户信息 */
    maleUser?: UserInfo | undefined;
}
/** 通知用户向pwa发起真打 */
export interface S2CSearchRealUserCallPwa {
    $type?: string | undefined;
    /** 用户id */
    maleUserId?: number | undefined;
    /** pwa信息 */
    femaleUser?: UserInfo | undefined;
}
/** 通知客户端取消search */
export interface S2CSearchCancel {
    $type?: string | undefined;
    /** 用户id */
    maleUserId?: number | undefined;
    /** pwa id列表 如果为空，则表示没有pwa推送取消search */
    femaleUserId?: number[] | undefined;
}
export interface S2CFullScreenVideoPush {
    $type?: string | undefined;
    /** 任务推送的用户信息 */
    user?: UserInfo | undefined;
}
export interface S2CCancelFullScreenVideoPush {
    $type?: string | undefined;
    /** 对方的id，客户端通过该id与当前展示的用户进行比较，如果是当前用户，则取消展示 */
    targetUserId?: number | undefined;
}
export interface C2SReportUserEvent {
    $type?: string | undefined;
    /** 上报事件的用户ID（当前用户） */
    userId?: number | undefined;
    /** 目标用户ID（匹配的另一方） */
    targetUserId?: number | undefined;
    /** 事件类型 */
    eventType?: UserEvent | undefined;
    /** 事件发生时间戳（毫秒） */
    timestamp?: number | undefined;
}
export interface S2CReportUserEvent {
    $type?: string | undefined;
    /** 通用的 返回码 */
    code?: tcpCommonCode | undefined;
}
export interface S2CCancelPwaVideoRecall {
    $type?: string | undefined;
    /** 男性用户id */
    maleUserId?: number | undefined;
    /** 女性用户id */
    femaleUserId?: number | undefined;
}
export interface C2SReportPwaVideoRecall {
    $type?: string | undefined;
    /** 对方的id */
    userId?: number | undefined;
}
export interface S2CReportPwaVideoRecall {
    $type?: string | undefined;
    /** 通用的 返回码 */
    code?: tcpCommonCode | undefined;
}
/** 前端新架构 - 用户余额变动通知（S2C推送） */
export interface S2CCashUpdate {
    $type?: string | undefined;
    /** 最新余额（必填） */
    cash?: string | undefined;
    /** 更新时间戳（可选，Unix时间戳，毫秒） */
    updateTime?: number | undefined;
    /** 余额变更原因（可选，如："匹配消费"、"充值"、"退款"等） */
    reason?: string | undefined;
}
/** 前端新架构 - 男用户信息更改通知 */
export interface S2CMaleUserInfoUpdate {
    $type?: string | undefined;
    userId?: number | undefined;
    user?: UserInfo | undefined;
    updateTime?: number | undefined;
}
/** 前端新架构 - 当前用户信息更改通知 */
export interface S2CUserInfoUpdate {
    $type?: string | undefined;
    userId?: number | undefined;
    user?: UserInfo | undefined;
    updateTime?: number | undefined;
}
export declare const C2SHeartBeat: MessageFns<C2SHeartBeat>;
export declare const S2CHeartBeat: MessageFns<S2CHeartBeat>;
export declare const C2SSyncChat: MessageFns<C2SSyncChat>;
export declare const S2CSyncChat: MessageFns<S2CSyncChat>;
export declare const C2SStartMatch: MessageFns<C2SStartMatch>;
export declare const S2CStartMatch: MessageFns<S2CStartMatch>;
export declare const C2SCancelMatch: MessageFns<C2SCancelMatch>;
export declare const S2CCancelMatch: MessageFns<S2CCancelMatch>;
export declare const C2SSetMatchFilterType: MessageFns<C2SSetMatchFilterType>;
export declare const S2CSetMatchFilterType: MessageFns<S2CSetMatchFilterType>;
export declare const C2SGetMatchFilterType: MessageFns<C2SGetMatchFilterType>;
export declare const S2CGetMatchFilterType: MessageFns<S2CGetMatchFilterType>;
export declare const C2SAddToBoost: MessageFns<C2SAddToBoost>;
export declare const S2CAddToBoost: MessageFns<S2CAddToBoost>;
export declare const S2CBoostMatch: MessageFns<S2CBoostMatch>;
export declare const C2SAddToVipBoost: MessageFns<C2SAddToVipBoost>;
export declare const S2CAddToVipBoost: MessageFns<S2CAddToVipBoost>;
export declare const S2CVipBoostMatch: MessageFns<S2CVipBoostMatch>;
export declare const C2SStartLoveRing: MessageFns<C2SStartLoveRing>;
export declare const S2CStartLoveRing: MessageFns<S2CStartLoveRing>;
export declare const S2CLoveRingPush: MessageFns<S2CLoveRingPush>;
export declare const C2SMatchCardPush: MessageFns<C2SMatchCardPush>;
export declare const S2CMatchCardPush: MessageFns<S2CMatchCardPush>;
export declare const C2SChatAction: MessageFns<C2SChatAction>;
export declare const S2CChatAction: MessageFns<S2CChatAction>;
export declare const S2CIsTyping: MessageFns<S2CIsTyping>;
export declare const S2CIsViewingProfile: MessageFns<S2CIsViewingProfile>;
export declare const C2SReportLoveRing: MessageFns<C2SReportLoveRing>;
export declare const S2CReportLoveRing: MessageFns<S2CReportLoveRing>;
export declare const C2SReportVideoMatch: MessageFns<C2SReportVideoMatch>;
export declare const S2CReportVideoMatch: MessageFns<S2CReportVideoMatch>;
export declare const S2CCancelVideoMatch: MessageFns<S2CCancelVideoMatch>;
export declare const S2CCancelLoveRing: MessageFns<S2CCancelLoveRing>;
export declare const UserAvatarViolationNotify: MessageFns<UserAvatarViolationNotify>;
export declare const UserAvatarReviewNotify: MessageFns<UserAvatarReviewNotify>;
export declare const S2CPwaVideoRecall: MessageFns<S2CPwaVideoRecall>;
export declare const S2CSearchSimulatedUserCallPwa: MessageFns<S2CSearchSimulatedUserCallPwa>;
export declare const S2CSearchRealUserCallPwa: MessageFns<S2CSearchRealUserCallPwa>;
export declare const S2CSearchCancel: MessageFns<S2CSearchCancel>;
export declare const S2CFullScreenVideoPush: MessageFns<S2CFullScreenVideoPush>;
export declare const S2CCancelFullScreenVideoPush: MessageFns<S2CCancelFullScreenVideoPush>;
export declare const C2SReportUserEvent: MessageFns<C2SReportUserEvent>;
export declare const S2CReportUserEvent: MessageFns<S2CReportUserEvent>;
export declare const S2CCancelPwaVideoRecall: MessageFns<S2CCancelPwaVideoRecall>;
export declare const C2SReportPwaVideoRecall: MessageFns<C2SReportPwaVideoRecall>;
export declare const S2CReportPwaVideoRecall: MessageFns<S2CReportPwaVideoRecall>;
export declare const S2CCashUpdate: MessageFns<S2CCashUpdate>;
export declare const S2CMaleUserInfoUpdate: MessageFns<S2CMaleUserInfoUpdate>;
export declare const S2CUserInfoUpdate: MessageFns<S2CUserInfoUpdate>;
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export interface MessageFns<T> {
    readonly $type: string;
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    fromJSON(object: any): T;
    toJSON(message: T): unknown;
    create(base?: DeepPartial<T>): T;
    fromPartial(object: DeepPartial<T>): T;
}
export {};
//# sourceMappingURL=chat_match.d.ts.map
```
