---
title: ProtoConfig_Archat_OfflineTaskService
date: 2026-04-15T17:04:47+08:00
source: import
language: json
original: ProtoConfig_Archat_OfflineTaskService.json
---

# ProtoConfig_Archat_OfflineTaskService

```json
{
  "startId": 20000,
  "desc": "proto协议配置:id默认遵守从startId开始，上行消息Id = 下行消息Id + 1, 必要上行消息",
  "protos": [
    {
      "desc": "上行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminFaceScoreGenerate",
      "class_name": "AdminFaceScoreGenerateRequest",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20000
    },
    {
      "desc": "下行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminFaceScoreGenerate",
      "class_name": "AdminFaceScoreGenerateResponse",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20001
    },
    {
      "desc": "上行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminGenerateUserSlideQueue",
      "class_name": "AdminGenerateUserSlideQueueRequest",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20002
    },
    {
      "desc": "下行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminGenerateUserSlideQueue",
      "class_name": "AdminGenerateUserSlideQueueResponse",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20003
    },
    {
      "desc": "上行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminSyncUserProfileToTim",
      "class_name": "AdminSyncUserProfileToTimRequest",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20004
    },
    {
      "desc": "下行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminSyncUserProfileToTim",
      "class_name": "AdminSyncUserProfileToTimResponse",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20005
    },
    {
      "desc": "上行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/debugAddUserTimedEntitlement",
      "class_name": "AdminAddTimedEntitlementRequest",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20006
    },
    {
      "desc": "下行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/debugAddUserTimedEntitlement",
      "class_name": "AdminAddTimedEntitlementResponse",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20007
    },
    {
      "desc": "上行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminTriggerScanGCUserAndDeliverGift",
      "class_name": "AdminTriggerScanGCUserAndDeliverGiftRequest",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20008
    },
    {
      "desc": "下行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminTriggerScanGCUserAndDeliverGift",
      "class_name": "AdminTriggerScanGCUserAndDeliverGiftResponse",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20009
    },
    {
      "desc": "上行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminGeneratePwaScore",
      "class_name": "AdminGeneratePwaScoreRequest",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20010
    },
    {
      "desc": "下行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminGeneratePwaScore",
      "class_name": "AdminGeneratePwaScoreResponse",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20011
    },
    {
      "desc": "上行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminGeneratePwaEmojiAvatar",
      "class_name": "AdminGeneratePwaEmojiAvatarRequest",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20012
    },
    {
      "desc": "下行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminGeneratePwaEmojiAvatar",
      "class_name": "AdminGeneratePwaEmojiAvatarResponse",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20013
    },
    {
      "desc": "上行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminInsertMsgVector",
      "class_name": "AdminInsertMsgVectorRequest",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20014
    },
    {
      "desc": "下行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminInsertMsgVector",
      "class_name": "AdminInsertMsgVectorResponse",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20015
    },
    {
      "desc": "上行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminQuerySimilarMsg",
      "class_name": "AdminQuerySimilarMsgRequest",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20016
    },
    {
      "desc": "下行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminQuerySimilarMsg",
      "class_name": "AdminQuerySimilarMsgResponse",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20017
    },
    {
      "desc": "上行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminRefreshGatewayUserBanList",
      "class_name": "AdminRefreshGatewayUserBanListRequest",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20018
    },
    {
      "desc": "下行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminRefreshGatewayUserBanList",
      "class_name": "AdminRefreshGatewayUserBanListResponse",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20019
    },
    {
      "desc": "上行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminQuerySimilarReceivedMsg",
      "class_name": "AdminQuerySimilarMsgReceivedRequest",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20020
    },
    {
      "desc": "下行消息",
      "service": "offline_task_service",
      "type": "Admin",
      "url": "/offlineTaskApi/adminQuerySimilarReceivedMsg",
      "class_name": "AdminQuerySimilarMsgReceivedResponse",
      "client_package": "OfflineTaskServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 20021
    }
  ]
}

```
