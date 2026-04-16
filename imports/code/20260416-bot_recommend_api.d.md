---
title: bot_recommend_api.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: bot_recommend_api.d.ts
---

# bot_recommend_api.d

```ts
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { BotDetail, UserLocale } from "./user_api";
export declare const protobufPackage = "BotRecommendServiceProto";
export declare enum BotRecommendServiceCommonCode {
    None = 0,
    Success = 1,
    Failed = 99,
    UNRECOGNIZED = -1
}
export declare function botRecommendServiceCommonCodeFromJSON(object: any): BotRecommendServiceCommonCode;
export declare function botRecommendServiceCommonCodeToJSON(object: BotRecommendServiceCommonCode): string;
export interface BotRecommendServiceResult {
    $type?: string | undefined;
    code?: BotRecommendServiceCommonCode | undefined;
    message?: string | undefined;
}
export interface GetDiscoverRecBotsRequest {
    $type?: string | undefined;
    category?: string | undefined;
}
export interface GetDiscoverRecBotsResponse {
    $type?: string | undefined;
    bots?: BotDetail[] | undefined;
    result?: BotRecommendServiceResult | undefined;
    requestId?: string | undefined;
}
export interface GetDiscoverRecBotsAdminRequest {
    $type?: string | undefined;
    category?: string | undefined;
    userId?: number | undefined;
    lang?: UserLocale | undefined;
}
export interface GetDiscoverRecBotsAdminResponse {
    $type?: string | undefined;
    bots?: BotDetail[] | undefined;
    result?: BotRecommendServiceResult | undefined;
    requestId?: string | undefined;
}
export interface GetRelatedRecBotsRequest {
    $type?: string | undefined;
    botId?: string | undefined;
    category?: string | undefined;
    botName?: string | undefined;
    botIp?: string | undefined;
}
export interface GetRelatedRecBotsResponse {
    $type?: string | undefined;
    bots?: BotDetail[] | undefined;
    result?: BotRecommendServiceResult | undefined;
    requestId?: string | undefined;
}
export declare const BotRecommendServiceResult: MessageFns<BotRecommendServiceResult>;
export declare const GetDiscoverRecBotsRequest: MessageFns<GetDiscoverRecBotsRequest>;
export declare const GetDiscoverRecBotsResponse: MessageFns<GetDiscoverRecBotsResponse>;
export declare const GetDiscoverRecBotsAdminRequest: MessageFns<GetDiscoverRecBotsAdminRequest>;
export declare const GetDiscoverRecBotsAdminResponse: MessageFns<GetDiscoverRecBotsAdminResponse>;
export declare const GetRelatedRecBotsRequest: MessageFns<GetRelatedRecBotsRequest>;
export declare const GetRelatedRecBotsResponse: MessageFns<GetRelatedRecBotsResponse>;
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
//# sourceMappingURL=bot_recommend_api.d.ts.map
```
