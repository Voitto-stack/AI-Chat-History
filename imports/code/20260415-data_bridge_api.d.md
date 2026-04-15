---
title: data_bridge_api.d
date: 2026-04-15T17:04:48+08:00
source: import
language: ts
original: data_bridge_api.d.ts
---

# data_bridge_api.d

```ts
import { MessageFns } from "../../baseType";
export declare const protobufPackage = "DataBridgeServiceProto";
export declare enum DataBridgeServiceCommonCode {
    DataBridgeServiceCommonCodeNone = 0,
    Success = 1,
    Failed = 99,
    Failed_Invalid_Params = 2,
    UNRECOGNIZED = -1
}
export declare function dataBridgeServiceCommonCodeFromJSON(object: any): DataBridgeServiceCommonCode;
export declare function dataBridgeServiceCommonCodeToJSON(object: DataBridgeServiceCommonCode): string;
export declare enum BehaviorType {
    /** UNKNOWN - 用于未知或未指定的行为 */
    UNKNOWN = 0,
    /** EXPOSURE - 曝光 */
    EXPOSURE = 1,
    /** CLICK - 点击 */
    CLICK = 2,
    /** START_CHAT - 开始聊天 */
    START_CHAT = 3,
    /** SEND_MESSAGE_TO_BOT - 向机器人发送消息 */
    SEND_MESSAGE_TO_BOT = 4,
    /** STAY - 停留 */
    STAY = 5,
    /** REFRESH - 刷新 */
    REFRESH = 6,
    /** RESTART_CHAT - 重新开始聊天 */
    RESTART_CHAT = 7,
    /** REGENERATE_MESSAGE - 重新生成消息 */
    REGENERATE_MESSAGE = 8,
    /** CREATE_BOT - 创建机器人 */
    CREATE_BOT = 9,
    /** SEARCH - 搜索 */
    SEARCH = 10,
    UNRECOGNIZED = -1
}
export declare function behaviorTypeFromJSON(object: any): BehaviorType;
export declare function behaviorTypeToJSON(object: BehaviorType): string;
export declare enum Platform {
    PLATFORM_APP = 0,
    UNRECOGNIZED = -1
}
export declare function platformFromJSON(object: any): Platform;
export declare function platformToJSON(object: Platform): string;
export declare enum OS {
    OS_UNKNOWN = 0,
    OS_IOS = 1,
    OS_ANDROID = 2,
    UNRECOGNIZED = -1
}
export declare function oSFromJSON(object: any): OS;
export declare function oSToJSON(object: OS): string;
export declare enum SCM {
    SCM_UNKNOWN = 0,
    SCM_BYTEDANCE = 1,
    SCM_PRESENCE = 2,
    UNRECOGNIZED = -1
}
export declare function sCMFromJSON(object: any): SCM;
export declare function sCMToJSON(object: SCM): string;
export declare enum ReportUserAction {
    REPORT_USER_ACTION_UNKNOWN = 0,
    REPORT_USER_ACTION_SHOW = 1,
    REPORT_USER_ACTION_CALL = 2,
    UNRECOGNIZED = -1
}
export declare function reportUserActionFromJSON(object: any): ReportUserAction;
export declare function reportUserActionToJSON(object: ReportUserAction): string;
export declare enum CallType {
    AUDIO = 0,
    VIDEO = 1,
    UNRECOGNIZED = -1
}
export declare function callTypeFromJSON(object: any): CallType;
export declare function callTypeToJSON(object: CallType): string;
export declare enum CallEvent {
    CALL_BEGIN = 0,
    CALL_END = 1,
    UNRECOGNIZED = -1
}
export declare function callEventFromJSON(object: any): CallEvent;
export declare function callEventToJSON(object: CallEvent): string;
export interface UploadUserBehaviorRequest {
    userBehaviors?: UserBehavior[] | undefined;
}
export interface UploadUserBehaviorResponse {
    code?: DataBridgeServiceCommonCode | undefined;
    message?: string | undefined;
}
export interface UserBehavior {
    /** 行为发生时间戳，以秒为单位的unix timestamp */
    bhvTime?: number | undefined;
    /** 行为名 */
    bhvType?: BehaviorType | undefined;
    /** 文档ID */
    docId?: string | undefined;
    /** 来自哪家推荐 如Bytedance, Presence */
    scm?: SCM | undefined;
    /** A$##$B$##$C$##$D A:业务， B:页面， C:页面区块， D:区块内点位 */
    spm?: string | undefined;
    /** 用户id */
    userId?: string | undefined;
    /** bot作者id */
    authorId?: string | undefined;
    /** 详情页母bot id */
    parentDocId?: string | undefined;
    /** 搜索query */
    query?: string | undefined;
    /** 每次请求唯一ID */
    requestId?: string | undefined;
    /** 时长 stay行为下，回传停留时长（单位为秒） */
    stayTime?: number | undefined;
    /** 来源类型 */
    sourceType?: string[] | undefined;
    /** 视频时长 */
    videoDuration?: number | undefined;
    /** 视频播放时长 */
    videoPlayTime?: number | undefined;
    /** 用户发生行为的商圈 */
    area?: string | undefined;
    /** 用户发生行为的城市 */
    city?: string | undefined;
    /** App版本 */
    clientVersion?: string | undefined;
    /** 设备型号 如（Samsung SM-S918U1） */
    deviceModel?: string | undefined;
    /** 网络类型, wifi/4G/5G */
    network?: string | undefined;
    /** iOS/Android */
    os?: OS | undefined;
    /** 操作系统版本 */
    osVersion?: string | undefined;
    /** 平台，我们只有App */
    platform?: Platform | undefined;
    /** 跟踪ID */
    traceId?: string | undefined;
    /** 传输数据 */
    transData?: string | undefined;
    /** ipv4 */
    ipv4?: string | undefined;
    /** ipv6 */
    ipv6?: string | undefined;
    dislikeType?: string | undefined;
    dislikeValue?: string | undefined;
    /** 轮次 */
    round?: number | undefined;
    /** 刷新次数 */
    refreshCnt?: number | undefined;
    /** 重新生成消息次数 */
    regenerateCnt?: number | undefined;
    /** 设备ID */
    deviceId?: string | undefined;
}
/** statCardShow */
export interface StatCardShowRequest {
    cardUserIds?: number[] | undefined;
}
export interface StatCardShowResponse {
    code?: DataBridgeServiceCommonCode | undefined;
    message?: string | undefined;
}
/** reportUserAction */
export interface ReportUserActionRequest {
    userIds?: number[] | undefined;
    action?: ReportUserAction | undefined;
}
export interface ReportUserActionResponse {
    code?: DataBridgeServiceCommonCode | undefined;
    message?: string | undefined;
}
/** firebasePush */
export interface FireBasePushRequest {
    userId?: number | undefined;
    /** firebase的通用字段 */
    notification?: Notification | undefined;
    /** firebase的通用字段 */
    data?: FireBaseData[] | undefined;
    /** web端 */
    badge?: string | undefined;
    /** web端 */
    icon?: string | undefined;
}
export interface FireBaseData {
    key?: string | undefined;
    value?: string | undefined;
}
export interface Notification {
    title?: string | undefined;
    body?: string | undefined;
}
export interface FireBasePushResponse {
    code?: DataBridgeServiceCommonCode | undefined;
    message?: string | undefined;
}
/** createCloudRecording */
export interface CreateCloudRecordingRequest {
    /**
     * StorageParams: {
     * CloudVod: {
     * TencentVod: {
     * ExpireTime: 0,
     * UserDefineRecordId: customPrefix,  // 客户端传递
     * },
     * },
     * },
     * UserSig: "", // 这个服务端会覆盖
     * UserId: "", // 这个服务端会覆盖
     * RecordParams: {
     * MaxIdleTime: 60,
     * StreamType: 0,
     * RecordMode: 2,
     * },
     * RoomIdType: 1,
     * MixTranscodeParams: {
     * VideoParams: {
     * Width: 360,
     * BitRate: 500000,
     * Fps: 15,
     * Height: 640,
     * Gop: 10,
     * },
     * },
     * MixLayoutParams: {
     * MixLayoutMode: 3,
     * },
     * SdkAppId: SDK_APP_ID, // 这个服务端会覆盖
     * RoomId: roomId,  // 客户端传递
     * };
     */
    request?: string | undefined;
}
export interface CreateCloudRecordingResponse {
    code?: DataBridgeServiceCommonCode | undefined;
    message?: string | undefined;
    taskId?: string | undefined;
    requestId?: string | undefined;
}
/** deleteCloudRecording */
export interface DeleteCloudRecordingRequest {
    taskId?: string | undefined;
    requestId?: string | undefined;
}
export interface DeleteCloudRecordingResponse {
    code?: DataBridgeServiceCommonCode | undefined;
    message?: string | undefined;
    taskId?: string | undefined;
    requestId?: string | undefined;
}
export interface ReportCallEventRequest {
    roomId?: string | undefined;
    callerId?: number | undefined;
    calleeId?: number | undefined;
    /** 当前通话的由谁来支付，传0表示免费 */
    payUserId?: number | undefined;
    callType?: CallType | undefined;
    callEvent?: CallEvent | undefined;
    /** 当前剩余的免费通话时间（单位：s） */
    freeCallDuration?: number | undefined;
}
export interface ReportCallEventResponse {
    code?: DataBridgeServiceCommonCode | undefined;
    message?: string | undefined;
}
export interface StartAITranscriptionRequest {
    /** 房间id */
    roomId?: string | undefined;
    /** TRTC房间号的类型，0代表数字房间号，1代表字符串房间号。不填默认是数字房间号。 */
    roomIdType?: number | undefined;
}
export interface StartAITranscriptionResponse {
    code?: DataBridgeServiceCommonCode | undefined;
    message?: string | undefined;
    /** 用于唯一标识转录任务。 */
    taskId?: string | undefined;
}
export interface StopAITranscriptionRequest {
    /** 转录任务的id */
    taskId?: string | undefined;
}
export interface StopAITranscriptionResponse {
    code?: DataBridgeServiceCommonCode | undefined;
}
/** 上报会话来源 */
export interface ReportConversationSourceRequest {
    peerUserId?: number | undefined;
    sourceType?: string | undefined;
}
export interface ReportConversationSourceResponse {
    code?: DataBridgeServiceCommonCode | undefined;
    message?: string | undefined;
}
/** 批量查询会话来源 */
export interface QueryConversationSourceRequest {
    userIds?: number[] | undefined;
    fromUserId?: number | undefined;
}
export interface QueryConversationSourceResponse {
    code?: DataBridgeServiceCommonCode | undefined;
    message?: string | undefined;
    sources?: ConversationSource[] | undefined;
}
export interface ConversationSource {
    userId?: number | undefined;
    sourceType?: string | undefined;
}
export declare const UploadUserBehaviorRequest: MessageFns<UploadUserBehaviorRequest, "DataBridgeServiceProto.UploadUserBehaviorRequest">;
export declare const UploadUserBehaviorResponse: MessageFns<UploadUserBehaviorResponse, "DataBridgeServiceProto.UploadUserBehaviorResponse">;
export declare const UserBehavior: MessageFns<UserBehavior, "DataBridgeServiceProto.UserBehavior">;
export declare const StatCardShowRequest: MessageFns<StatCardShowRequest, "DataBridgeServiceProto.StatCardShowRequest">;
export declare const StatCardShowResponse: MessageFns<StatCardShowResponse, "DataBridgeServiceProto.StatCardShowResponse">;
export declare const ReportUserActionRequest: MessageFns<ReportUserActionRequest, "DataBridgeServiceProto.ReportUserActionRequest">;
export declare const ReportUserActionResponse: MessageFns<ReportUserActionResponse, "DataBridgeServiceProto.ReportUserActionResponse">;
export declare const FireBasePushRequest: MessageFns<FireBasePushRequest, "DataBridgeServiceProto.FireBasePushRequest">;
export declare const FireBaseData: MessageFns<FireBaseData, "DataBridgeServiceProto.FireBaseData">;
export declare const Notification: MessageFns<Notification, "DataBridgeServiceProto.Notification">;
export declare const FireBasePushResponse: MessageFns<FireBasePushResponse, "DataBridgeServiceProto.FireBasePushResponse">;
export declare const CreateCloudRecordingRequest: MessageFns<CreateCloudRecordingRequest, "DataBridgeServiceProto.CreateCloudRecordingRequest">;
export declare const CreateCloudRecordingResponse: MessageFns<CreateCloudRecordingResponse, "DataBridgeServiceProto.CreateCloudRecordingResponse">;
export declare const DeleteCloudRecordingRequest: MessageFns<DeleteCloudRecordingRequest, "DataBridgeServiceProto.DeleteCloudRecordingRequest">;
export declare const DeleteCloudRecordingResponse: MessageFns<DeleteCloudRecordingResponse, "DataBridgeServiceProto.DeleteCloudRecordingResponse">;
export declare const ReportCallEventRequest: MessageFns<ReportCallEventRequest, "DataBridgeServiceProto.ReportCallEventRequest">;
export declare const ReportCallEventResponse: MessageFns<ReportCallEventResponse, "DataBridgeServiceProto.ReportCallEventResponse">;
export declare const StartAITranscriptionRequest: MessageFns<StartAITranscriptionRequest, "DataBridgeServiceProto.StartAITranscriptionRequest">;
export declare const StartAITranscriptionResponse: MessageFns<StartAITranscriptionResponse, "DataBridgeServiceProto.StartAITranscriptionResponse">;
export declare const StopAITranscriptionRequest: MessageFns<StopAITranscriptionRequest, "DataBridgeServiceProto.StopAITranscriptionRequest">;
export declare const StopAITranscriptionResponse: MessageFns<StopAITranscriptionResponse, "DataBridgeServiceProto.StopAITranscriptionResponse">;
export declare const ReportConversationSourceRequest: MessageFns<ReportConversationSourceRequest, "DataBridgeServiceProto.ReportConversationSourceRequest">;
export declare const ReportConversationSourceResponse: MessageFns<ReportConversationSourceResponse, "DataBridgeServiceProto.ReportConversationSourceResponse">;
export declare const QueryConversationSourceRequest: MessageFns<QueryConversationSourceRequest, "DataBridgeServiceProto.QueryConversationSourceRequest">;
export declare const QueryConversationSourceResponse: MessageFns<QueryConversationSourceResponse, "DataBridgeServiceProto.QueryConversationSourceResponse">;
export declare const ConversationSource: MessageFns<ConversationSource, "DataBridgeServiceProto.ConversationSource">;
//# sourceMappingURL=data_bridge_api.d.ts.map
```
