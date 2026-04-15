---
title: agora_callback.d
date: 2026-04-15T17:04:48+08:00
source: import
language: ts
original: agora_callback.d.ts
---

# agora_callback.d

```ts
import { MessageFns } from "../../baseType";
export declare const protobufPackage = "AgoraCallbackServiceProto";
/** 融合 CDN 消息类型 */
export declare enum FCDNSEventType {
    FCDNSEventTypeNone = 0,
    PublishStart = 1,
    PublishEnd = 2,
    NewStandardSnapshotFile = 102,
    NewStandardRecordFile = 101,
    UNRECOGNIZED = -1
}
export declare function fCDNSEventTypeFromJSON(object: any): FCDNSEventType;
export declare function fCDNSEventTypeToJSON(object: FCDNSEventType): string;
/** 互动直播消息类型 */
export declare enum ILSEventType {
    ILSEventTypeNone = 0,
    BroadcasterLeaveChannel = 104,
    UNRECOGNIZED = -1
}
export declare function iLSEventTypeFromJSON(object: any): ILSEventType;
export declare function iLSEventTypeToJSON(object: ILSEventType): string;
export declare enum ProductType {
    ProductTypeNone = 0,
    /** InteractiveLiveStreaming - 互动直播 */
    InteractiveLiveStreaming = 1,
    /** FusionCDNStreaming - 融合 CDN */
    FusionCDNStreaming = 7,
    UNRECOGNIZED = -1
}
export declare function productTypeFromJSON(object: any): ProductType;
export declare function productTypeToJSON(object: ProductType): string;
export interface StreamInfo {
    env?: string | undefined;
    encounterId?: string | undefined;
}
export declare const StreamInfo: MessageFns<StreamInfo, "AgoraCallbackServiceProto.StreamInfo">;
//# sourceMappingURL=agora_callback.d.ts.map
```
