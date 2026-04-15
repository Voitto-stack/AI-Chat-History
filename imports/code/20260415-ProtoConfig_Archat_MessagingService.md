---
title: ProtoConfig_Archat_MessagingService
date: 2026-04-15T17:04:47+08:00
source: import
language: json
original: ProtoConfig_Archat_MessagingService.json
---

# ProtoConfig_Archat_MessagingService

```json
{
  "startId": 7000,
  "desc": "proto协议配置:id默认遵守从startId开始，上行消息Id = 下行消息Id + 1, 必要上行消息",
  "protos": [
    {
      "desc": "上行消息",
      "service": "messaging_service",
      "type": "Inner",
      "url": "/messagingApi/sendNotificationMessage",
      "class_name": "SendNotificationMessageRequest",
      "client_package": "MessagingServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 7000
    },
    {
      "desc": "下行消息",
      "service": "messaging_service",
      "type": "Inner",
      "url": "/messagingApi/sendNotificationMessage",
      "class_name": "SendNotificationMessageResponse",
      "client_package": "MessagingServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 7001
    },
    {
      "desc": "上行消息",
      "service": "messaging_service",
      "type": "App",
      "url": "/messagingApi/uploadNormalImage",
      "class_name": "UploadNormalImageRequest",
      "client_package": "MessagingServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 7002
    },
    {
      "desc": "下行消息",
      "service": "messaging_service",
      "type": "App",
      "url": "/messagingApi/uploadNormalImage",
      "class_name": "UploadNormalImageResponse",
      "client_package": "MessagingServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 7003
    },
    {
      "desc": "上行消息",
      "service": "messaging_service",
      "type": "App",
      "url": "/messagingApi/verifyUserFlag",
      "class_name": "VerifyUserFlagRequest",
      "client_package": "MessagingServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 7004
    },
    {
      "desc": "下行消息",
      "service": "messaging_service",
      "type": "App",
      "url": "/messagingApi/verifyUserFlag",
      "class_name": "VerifyUserFlagResponse",
      "client_package": "MessagingServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 7005
    },
    {
      "desc": "上行消息",
      "service": "messaging_service",
      "type": "App",
      "url": "/messagingApi/getUserFlag",
      "class_name": "GetUserFlagRequest",
      "client_package": "MessagingServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 7006
    },
    {
      "desc": "下行消息",
      "service": "messaging_service",
      "type": "App",
      "url": "/messagingApi/getUserFlag",
      "class_name": "GetUserFlagResponse",
      "client_package": "MessagingServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 7007
    }
  ]
}
```
