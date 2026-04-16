---
title: offline_task_api.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: offline_task_api.d.ts
---

# offline_task_api.d

```ts
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
export declare const protobufPackage = "";
/** 生成指定用户颜值分 */
export interface AdminFaceScoreGenerateRequest {
    appName?: number | undefined;
    caiUserType?: number | undefined;
    gender?: number | undefined;
    userIds?: number[] | undefined;
}
export interface AdminFaceScoreGenerateResponse {
    success?: boolean | undefined;
    errorMessage?: string | undefined;
}
export interface AdminGenerateUserSlideQueueRequest {
    refresh?: boolean | undefined;
}
export interface AdminGenerateUserSlideQueueResponse {
    success?: boolean | undefined;
    errorMessage?: string | undefined;
}
export interface AdminSyncUserProfileToTimRequest {
    /** 可以指定要同步的用户，不指定的话就同步所有用户 */
    userIds?: number[] | undefined;
}
export interface AdminSyncUserProfileToTimResponse {
    success?: boolean | undefined;
    errorMessage?: string | undefined;
}
export interface AdminAddTimedEntitlementRequest {
    userId?: number | undefined;
    chatTimes?: number | undefined;
    /** 单位（min） */
    videoCallTimes?: number | undefined;
    /** 单位（ms） */
    expiredAt?: number | undefined;
}
export interface AdminAddTimedEntitlementResponse {
    success?: boolean | undefined;
    errorMessage?: string | undefined;
}
export interface AdminTriggerScanGCUserAndDeliverGiftRequest {
}
export interface AdminTriggerScanGCUserAndDeliverGiftResponse {
    success?: boolean | undefined;
    errorMessage?: string | undefined;
}
/** 生成pwa视频等级分 */
export interface AdminGeneratePwaScoreRequest {
}
export interface AdminGeneratePwaScoreResponse {
    success?: boolean | undefined;
    errorMessage?: string | undefined;
}
/** 生成pwa emoji头像 */
export interface AdminGeneratePwaEmojiAvatarRequest {
}
export interface AdminGeneratePwaEmojiAvatarResponse {
    success?: boolean | undefined;
    errorMessage?: string | undefined;
}
export interface AdminInsertMsgVectorRequest {
    msg?: string[] | undefined;
}
export interface AdminInsertMsgVectorResponse {
    success?: boolean | undefined;
    errorMessage?: string | undefined;
}
export interface AdminQuerySimilarMsgRequest {
    queryText?: string | undefined;
    fromUserId?: number | undefined;
    toUserId?: number | undefined;
}
export interface AdminQuerySimilarMsgResponse {
    success?: boolean | undefined;
    errorMessage?: string | undefined;
    msgVector?: MsgVector | undefined;
    extendMsgs?: string[] | undefined;
}
export interface MsgVector {
    msg?: string | undefined;
    similarity?: number | undefined;
    costMs?: number | undefined;
    userId?: number | undefined;
}
export interface AdminRefreshGatewayUserBanListRequest {
}
export interface AdminRefreshGatewayUserBanListResponse {
    success?: boolean | undefined;
    errorMessage?: string | undefined;
}
export interface AdminQuerySimilarMsgReceivedRequest {
    queryText?: string | undefined;
    toUserId?: number | undefined;
    excludeFromUserId?: number | undefined;
}
export interface AdminQuerySimilarMsgReceivedResponse {
    success?: boolean | undefined;
    errorMessage?: string | undefined;
    similarMsgs?: MsgVector[] | undefined;
}
export declare const AdminFaceScoreGenerateRequest: MessageFns<AdminFaceScoreGenerateRequest>;
export declare const AdminFaceScoreGenerateResponse: MessageFns<AdminFaceScoreGenerateResponse>;
export declare const AdminGenerateUserSlideQueueRequest: MessageFns<AdminGenerateUserSlideQueueRequest>;
export declare const AdminGenerateUserSlideQueueResponse: MessageFns<AdminGenerateUserSlideQueueResponse>;
export declare const AdminSyncUserProfileToTimRequest: MessageFns<AdminSyncUserProfileToTimRequest>;
export declare const AdminSyncUserProfileToTimResponse: MessageFns<AdminSyncUserProfileToTimResponse>;
export declare const AdminAddTimedEntitlementRequest: MessageFns<AdminAddTimedEntitlementRequest>;
export declare const AdminAddTimedEntitlementResponse: MessageFns<AdminAddTimedEntitlementResponse>;
export declare const AdminTriggerScanGCUserAndDeliverGiftRequest: MessageFns<AdminTriggerScanGCUserAndDeliverGiftRequest>;
export declare const AdminTriggerScanGCUserAndDeliverGiftResponse: MessageFns<AdminTriggerScanGCUserAndDeliverGiftResponse>;
export declare const AdminGeneratePwaScoreRequest: MessageFns<AdminGeneratePwaScoreRequest>;
export declare const AdminGeneratePwaScoreResponse: MessageFns<AdminGeneratePwaScoreResponse>;
export declare const AdminGeneratePwaEmojiAvatarRequest: MessageFns<AdminGeneratePwaEmojiAvatarRequest>;
export declare const AdminGeneratePwaEmojiAvatarResponse: MessageFns<AdminGeneratePwaEmojiAvatarResponse>;
export declare const AdminInsertMsgVectorRequest: MessageFns<AdminInsertMsgVectorRequest>;
export declare const AdminInsertMsgVectorResponse: MessageFns<AdminInsertMsgVectorResponse>;
export declare const AdminQuerySimilarMsgRequest: MessageFns<AdminQuerySimilarMsgRequest>;
export declare const AdminQuerySimilarMsgResponse: MessageFns<AdminQuerySimilarMsgResponse>;
export declare const MsgVector: MessageFns<MsgVector>;
export declare const AdminRefreshGatewayUserBanListRequest: MessageFns<AdminRefreshGatewayUserBanListRequest>;
export declare const AdminRefreshGatewayUserBanListResponse: MessageFns<AdminRefreshGatewayUserBanListResponse>;
export declare const AdminQuerySimilarMsgReceivedRequest: MessageFns<AdminQuerySimilarMsgReceivedRequest>;
export declare const AdminQuerySimilarMsgReceivedResponse: MessageFns<AdminQuerySimilarMsgReceivedResponse>;
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export interface MessageFns<T> {
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    fromJSON(object: any): T;
    toJSON(message: T): unknown;
    create(base?: DeepPartial<T>): T;
    fromPartial(object: DeepPartial<T>): T;
}
export {};
//# sourceMappingURL=offline_task_api.d.ts.map
```
