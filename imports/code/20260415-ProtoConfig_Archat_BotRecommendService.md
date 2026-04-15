---
title: ProtoConfig_Archat_BotRecommendService
date: 2026-04-15T17:04:47+08:00
source: import
language: json
original: ProtoConfig_Archat_BotRecommendService.json
---

# ProtoConfig_Archat_BotRecommendService

```json
{
  "startId": 18000,
  "desc": "proto协议配置:id默认遵守从startId开始，上行消息Id = 下行消息Id + 1, 必要上行消息",
  "protos": [
    {
      "desc": "上行消息",
      "service": "bot_recommend_service",
      "type": "App",
      "url": "/botRecommendApi/getDiscoverRecBots",
      "class_name": "GetDiscoverRecBotsRequest",
      "client_package": "BotRecommendServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 18000
    },
    {
      "desc": "下行消息",
      "service": "bot_recommend_service",
      "type": "App",
      "url": "/botRecommendApi/getDiscoverRecBots",
      "class_name": "GetDiscoverRecBotsResponse",
      "client_package": "BotRecommendServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 18001
    },
    {
      "desc": "上行消息",
      "service": "bot_recommend_service",
      "type": "App",
      "url": "/botRecommendApi/getRelatedRecBots",
      "class_name": "GetRelatedRecBotsRequest",
      "client_package": "BotRecommendServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 18002
    },
    {
      "desc": "下行消息",
      "service": "bot_recommend_service",
      "type": "App",
      "url": "/botRecommendApi/getRelatedRecBots",
      "class_name": "GetRelatedRecBotsResponse",
      "client_package": "BotRecommendServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 18003
    },
    {
      "desc": "上行消息",
      "service": "bot_recommend_service",
      "type": "Admin",
      "url": "/botRecommendApi/getDiscoverRecBotsAdmin",
      "class_name": "GetDiscoverRecBotsAdminRequest",
      "client_package": "BotRecommendServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 18004
    },
    {
      "desc": "下行消息",
      "service": "bot_recommend_service",
      "type": "Admin",
      "url": "/botRecommendApi/getDiscoverRecBotsAdmin",
      "class_name": "GetDiscoverRecBotsAdminResponse",
      "client_package": "BotRecommendServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 18005
    }
  ]
}

```
