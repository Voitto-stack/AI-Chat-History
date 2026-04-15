---
title: offline_task_api.d
date: 2026-04-15T17:04:48+08:00
source: import
language: ts
original: offline_task_api.d.ts
---

# offline_task_api.d

```ts
import { MessageFns } from "../../baseType";
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
export declare const AdminFaceScoreGenerateRequest: MessageFns<AdminFaceScoreGenerateRequest, "AdminFaceScoreGenerateRequest">;
export declare const AdminFaceScoreGenerateResponse: MessageFns<AdminFaceScoreGenerateResponse, "AdminFaceScoreGenerateResponse">;
export declare const AdminGenerateUserSlideQueueRequest: MessageFns<AdminGenerateUserSlideQueueRequest, "AdminGenerateUserSlideQueueRequest">;
export declare const AdminGenerateUserSlideQueueResponse: MessageFns<AdminGenerateUserSlideQueueResponse, "AdminGenerateUserSlideQueueResponse">;
export declare const AdminSyncUserProfileToTimRequest: MessageFns<AdminSyncUserProfileToTimRequest, "AdminSyncUserProfileToTimRequest">;
export declare const AdminSyncUserProfileToTimResponse: MessageFns<AdminSyncUserProfileToTimResponse, "AdminSyncUserProfileToTimResponse">;
export declare const AdminAddTimedEntitlementRequest: MessageFns<AdminAddTimedEntitlementRequest, "AdminAddTimedEntitlementRequest">;
export declare const AdminAddTimedEntitlementResponse: MessageFns<AdminAddTimedEntitlementResponse, "AdminAddTimedEntitlementResponse">;
export declare const AdminTriggerScanGCUserAndDeliverGiftRequest: MessageFns<AdminTriggerScanGCUserAndDeliverGiftRequest, "AdminTriggerScanGCUserAndDeliverGiftRequest">;
export declare const AdminTriggerScanGCUserAndDeliverGiftResponse: MessageFns<AdminTriggerScanGCUserAndDeliverGiftResponse, "AdminTriggerScanGCUserAndDeliverGiftResponse">;
export declare const AdminGeneratePwaScoreRequest: MessageFns<AdminGeneratePwaScoreRequest, "AdminGeneratePwaScoreRequest">;
export declare const AdminGeneratePwaScoreResponse: MessageFns<AdminGeneratePwaScoreResponse, "AdminGeneratePwaScoreResponse">;
export declare const AdminGeneratePwaEmojiAvatarRequest: MessageFns<AdminGeneratePwaEmojiAvatarRequest, "AdminGeneratePwaEmojiAvatarRequest">;
export declare const AdminGeneratePwaEmojiAvatarResponse: MessageFns<AdminGeneratePwaEmojiAvatarResponse, "AdminGeneratePwaEmojiAvatarResponse">;
export declare const AdminInsertMsgVectorRequest: MessageFns<AdminInsertMsgVectorRequest, "AdminInsertMsgVectorRequest">;
export declare const AdminInsertMsgVectorResponse: MessageFns<AdminInsertMsgVectorResponse, "AdminInsertMsgVectorResponse">;
export declare const AdminQuerySimilarMsgRequest: MessageFns<AdminQuerySimilarMsgRequest, "AdminQuerySimilarMsgRequest">;
export declare const AdminQuerySimilarMsgResponse: MessageFns<AdminQuerySimilarMsgResponse, "AdminQuerySimilarMsgResponse">;
export declare const MsgVector: MessageFns<MsgVector, "MsgVector">;
export declare const AdminRefreshGatewayUserBanListRequest: MessageFns<AdminRefreshGatewayUserBanListRequest, "AdminRefreshGatewayUserBanListRequest">;
export declare const AdminRefreshGatewayUserBanListResponse: MessageFns<AdminRefreshGatewayUserBanListResponse, "AdminRefreshGatewayUserBanListResponse">;
export declare const AdminQuerySimilarMsgReceivedRequest: MessageFns<AdminQuerySimilarMsgReceivedRequest, "AdminQuerySimilarMsgReceivedRequest">;
export declare const AdminQuerySimilarMsgReceivedResponse: MessageFns<AdminQuerySimilarMsgReceivedResponse, "AdminQuerySimilarMsgReceivedResponse">;
//# sourceMappingURL=offline_task_api.d.ts.map
```
