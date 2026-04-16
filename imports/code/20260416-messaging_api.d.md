---
title: messaging_api.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: messaging_api.d.ts
---

# messaging_api.d

```ts
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
export declare const protobufPackage = "MessagingServiceProto";
export declare enum NotificationMessageDesc {
    NOTIFICATION_UNSPECIFIED = 0,
    NOTIFICATION_ADMIN_MOVE_TO_K_SERVER = 1,
    NOTIFICATION_ADMIN_MOVE_TO_NORMAL_SERVER = 2,
    NOTIFICATION_ADMIN_MOVE_TO_BANNED = 3,
    NOTIFICATION_USER_INVITE_TO_ROOM = 4,
    NOTIFICATION_USER_FOLLOW_YOU = 5,
    NOTIFICATION_USER_UNFOLLOW_YOU = 6,
    NOTIFICATION_USER_BLOCK_YOU = 7,
    NOTIFICATION_USER_UNBLOCK_YOU = 8,
    NOTIFICATION_USER_LIKE_YOUR_POST = 9,
    NOTIFICATION_USER_COMMENT_YOUR_POST = 10,
    NOTIFICATION_USER_COMMENT_YOUR_COMMENT = 11,
    NOTIFICATION_USER_REPLY_OTHER_COMMENT = 12,
    NOTIFICATION_USER_SUCCESSFUL_INVITATION = 13,
    NOTIFICATION_AI_AVATAR_GENERATED = 14,
    NOTIFICATION_AI_AVATAR_AUTO_REPLACED = 15,
    UNRECOGNIZED = -1
}
export declare function notificationMessageDescFromJSON(object: any): NotificationMessageDesc;
export declare function notificationMessageDescToJSON(object: NotificationMessageDesc): string;
export declare enum MessageServiceCommonCode {
    MESSAEG_UNKNOWN = 0,
    MESSAGE_SUCCESS = 1,
    MESSAGE_FAILED = 99,
    UNRECOGNIZED = -1
}
export declare function messageServiceCommonCodeFromJSON(object: any): MessageServiceCommonCode;
export declare function messageServiceCommonCodeToJSON(object: MessageServiceCommonCode): string;
export declare enum FcmPushType {
    FCM_TYPE_UNKNOWN = 0,
    FCM_TYPE_USER_MATCH = 1,
    FCM_TYPE_LIKE_ME = 2,
    FCM_TYPE_OFFLINE_HOUR_MESSAGE = 3,
    FCM_TYPE_WITHDRAWAL_COMPLETE = 4,
    FCM_TYPE_DEMO_SCRIPT = 5,
    FCM_TYPE_USER_NEW_MATCH = 6,
    FCM_TYPE_POST_COMMON = 7,
    FCM_TYPE_POST_LIKE = 8,
    FCM_TYPE_PAYMENT = 9,
    FCM_TYPE_PAYMENT_FAIL = 10,
    UNRECOGNIZED = -1
}
export declare function fcmPushTypeFromJSON(object: any): FcmPushType;
export declare function fcmPushTypeToJSON(object: FcmPushType): string;
export declare enum UserFlag {
    USER_FLAG_UNKNOWN = 0,
    /** USER_FLAG_PHONE_VERIFIED - 手机号已经校验 */
    USER_FLAG_PHONE_VERIFIED = 1,
    UNRECOGNIZED = -1
}
export declare function userFlagFromJSON(object: any): UserFlag;
export declare function userFlagToJSON(object: UserFlag): string;
export interface SendNotificationMessageRequest {
    $type?: string | undefined;
    toUserId?: string | undefined;
    messageDesc?: NotificationMessageDesc | undefined;
    messageData?: string | undefined;
    msgLifeTime?: number | undefined;
}
export interface SendNotificationMessageResponse {
    $type?: string | undefined;
    isSuccessful?: boolean | undefined;
}
/** uploadNormalImage */
export interface UploadNormalImageRequest {
    $type?: string | undefined;
    file?: Uint8Array | undefined;
    /** wav,mp3 and ... */
    fileType?: string | undefined;
}
export interface UploadNormalImageResponse {
    $type?: string | undefined;
    code?: MessageServiceCommonCode | undefined;
    imageUrl?: string | undefined;
}
/** verifyUserFlag - 短信校验成功后 上报主要是userId */
export interface VerifyUserFlagRequest {
    $type?: string | undefined;
    userId?: number | undefined;
    /** 校验用户的某个行为标准 */
    flag?: UserFlag | undefined;
    /** 其他补充信息，eg：如果手机号校验位置，则此处放手机号码 */
    extraInfo?: string | undefined;
}
export interface VerifyUserFlagResponse {
    $type?: string | undefined;
    code?: MessageServiceCommonCode | undefined;
    message?: string | undefined;
}
/** getUserFlag 应用内查询自己的，所以不需要带参数 */
export interface GetUserFlagRequest {
    $type?: string | undefined;
    flag?: UserFlag | undefined;
}
export interface GetUserFlagResponse {
    $type?: string | undefined;
    code?: MessageServiceCommonCode | undefined;
    isVerified?: boolean | undefined;
}
export declare const SendNotificationMessageRequest: MessageFns<SendNotificationMessageRequest>;
export declare const SendNotificationMessageResponse: MessageFns<SendNotificationMessageResponse>;
export declare const UploadNormalImageRequest: MessageFns<UploadNormalImageRequest>;
export declare const UploadNormalImageResponse: MessageFns<UploadNormalImageResponse>;
export declare const VerifyUserFlagRequest: MessageFns<VerifyUserFlagRequest>;
export declare const VerifyUserFlagResponse: MessageFns<VerifyUserFlagResponse>;
export declare const GetUserFlagRequest: MessageFns<GetUserFlagRequest>;
export declare const GetUserFlagResponse: MessageFns<GetUserFlagResponse>;
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
//# sourceMappingURL=messaging_api.d.ts.map
```
