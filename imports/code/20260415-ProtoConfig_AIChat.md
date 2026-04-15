---
title: ProtoConfig_AIChat
date: 2026-04-15T17:04:47+08:00
source: import
language: json
original: ProtoConfig_AIChat.json
---

# ProtoConfig_AIChat

```json
{
  "startId": 60001,
  "desc": "proto协议配置:Id从StartId开始依次+1",
  "protos": [
    {
      "desc": "心跳消息",
      "class_name": "C2S_HeartBeat",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "gateway",
      "id": 60001
    },
    {
      "desc": "心跳消息",
      "class_name": "S2C_HeartBeat",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "gateway",
      "id": 60002
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_SyncChat",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60003
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_SyncChat",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60004
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_StartMatch",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60005
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_StartMatch",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60006
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_CancelMatch",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60007
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_CancelMatch",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60008
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_SetMatchFilterType",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60009
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_SetMatchFilterType",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60010
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_GetMatchFilterType",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60011
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_GetMatchFilterType",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60012
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_AddToBoost",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60013
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_AddToBoost",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60014
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_BoostMatch",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60015
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_AddToVipBoost",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60016
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_AddToVipBoost",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60017
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_VipBoostMatch",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60018
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_StartLoveRing",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60019
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_StartLoveRing",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60020
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_LoveRingPush",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60021
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_ChatAction",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60022
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_ChatAction",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60023
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_MatchCardPush",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60024
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_MatchCardPush",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60025
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_IsTyping",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60026
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_ReportLoveRing",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60027
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_ReportLoveRing",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60028
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_IsViewingProfile",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60029
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_ReportVideoMatch",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60030
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_ReportVideoMatch",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60031
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_CancelVideoMatch",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60032
    },
    {
      "desc": "UserAvatarViolationNotify",
      "class_name": "UserAvatarViolationNotify",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60033
    },
    {
      "desc": "UserAvatarReviewNotify",
      "class_name": "UserAvatarReviewNotify",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60034
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_SearchCancel",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60035
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_PwaVideoRecall",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60036
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_SearchSimulatedUserCallPwa",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60037
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_SearchRealUserCallPwa",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60038
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_FullScreenVideoPush",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60039
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_CancelFullScreenVideoPush",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60040
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_ReportUserEvent",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60041
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_ReportUserEvent",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60042
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_CancelLoveRing",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60043
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_CancelPwaVideoRecall",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60044
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_ReportPwaVideoRecall",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60045
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_ReportPwaVideoRecall",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "chatmatch",
      "id": 60046
    },
    {
      "desc": "UserCashUpdateNotify",
      "class_name": "S2C_CashUpdate",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "gateway",
      "id": 6047
    },
    {
      "desc": "MaleUserInfoUpdateNotify",
      "class_name": "S2C_MaleUserInfoUpdate",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "gateway",
      "id": 6048
    },
    {
      "desc": "UserInfoUpdateNotify",
      "class_name": "S2C_UserInfoUpdate",
      "client_package": "AiChat",
      "server_package": "com.pserver.proto.aichat",
      "server_type": "gateway",
      "id": 6049
    }
  ]
}

```
