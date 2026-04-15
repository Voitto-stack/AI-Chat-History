---
title: bot_recommend_api.d
date: 2026-04-15T17:04:48+08:00
source: import
language: ts
original: bot_recommend_api.d.ts
---

# bot_recommend_api.d

```ts
import { MessageFns } from "../../baseType";
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
    code?: BotRecommendServiceCommonCode | undefined;
    message?: string | undefined;
}
export interface GetDiscoverRecBotsRequest {
    category?: string | undefined;
}
export interface GetDiscoverRecBotsResponse {
    bots?: BotDetail[] | undefined;
    result?: BotRecommendServiceResult | undefined;
    requestId?: string | undefined;
}
export interface GetDiscoverRecBotsAdminRequest {
    category?: string | undefined;
    userId?: number | undefined;
    lang?: UserLocale | undefined;
}
export interface GetDiscoverRecBotsAdminResponse {
    bots?: BotDetail[] | undefined;
    result?: BotRecommendServiceResult | undefined;
    requestId?: string | undefined;
}
export interface GetRelatedRecBotsRequest {
    botId?: string | undefined;
    category?: string | undefined;
    botName?: string | undefined;
    botIp?: string | undefined;
}
export interface GetRelatedRecBotsResponse {
    bots?: BotDetail[] | undefined;
    result?: BotRecommendServiceResult | undefined;
    requestId?: string | undefined;
}
export declare const BotRecommendServiceResult: MessageFns<BotRecommendServiceResult, "BotRecommendServiceProto.BotRecommendServiceResult">;
export declare const GetDiscoverRecBotsRequest: MessageFns<GetDiscoverRecBotsRequest, "BotRecommendServiceProto.GetDiscoverRecBotsRequest">;
export declare const GetDiscoverRecBotsResponse: MessageFns<GetDiscoverRecBotsResponse, "BotRecommendServiceProto.GetDiscoverRecBotsResponse">;
export declare const GetDiscoverRecBotsAdminRequest: MessageFns<GetDiscoverRecBotsAdminRequest, "BotRecommendServiceProto.GetDiscoverRecBotsAdminRequest">;
export declare const GetDiscoverRecBotsAdminResponse: MessageFns<GetDiscoverRecBotsAdminResponse, "BotRecommendServiceProto.GetDiscoverRecBotsAdminResponse">;
export declare const GetRelatedRecBotsRequest: MessageFns<GetRelatedRecBotsRequest, "BotRecommendServiceProto.GetRelatedRecBotsRequest">;
export declare const GetRelatedRecBotsResponse: MessageFns<GetRelatedRecBotsResponse, "BotRecommendServiceProto.GetRelatedRecBotsResponse">;
//# sourceMappingURL=bot_recommend_api.d.ts.map
```
