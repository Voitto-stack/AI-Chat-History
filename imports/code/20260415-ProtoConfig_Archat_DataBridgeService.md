---
title: ProtoConfig_Archat_DataBridgeService
date: 2026-04-15T17:04:47+08:00
source: import
language: json
original: ProtoConfig_Archat_DataBridgeService.json
---

# ProtoConfig_Archat_DataBridgeService

```json
{
  "startId": 17000,
  "desc": "proto协议配置:id默认遵守从startId开始，上行消息Id = 下行消息Id + 1, 必要上行消息",
  "protos": [
    {
      "desc": "上行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/uploadUserBehavior",
      "class_name": "UploadUserBehaviorRequest",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17000
    },
    {
      "desc": "下行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/uploadUserBehavior",
      "class_name": "UploadUserBehaviorResponse",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17001
    },
    {
      "desc": "上行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/statCardShow",
      "class_name": "StatCardShowRequest",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17002
    },
    {
      "desc": "下行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/statCardShow",
      "class_name": "StatCardShowResponse",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17003
    },
    {
      "desc": "上行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/reportUserAction",
      "class_name": "ReportUserActionRequest",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17004
    },
    {
      "desc": "下行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/reportUserAction",
      "class_name": "ReportUserActionResponse",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17005
    },
    {
      "desc": "上行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/firebasePush",
      "class_name": "FireBasePushRequest",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17006
    },
    {
      "desc": "下行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/firebasePush",
      "class_name": "FireBasePushResponse",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17007
    },
    {
      "desc": "上行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/createCloudRecording",
      "class_name": "CreateCloudRecordingRequest",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17008
    },
    {
      "desc": "下行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/createCloudRecording",
      "class_name": "CreateCloudRecordingResponse",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17009
    },
    {
      "desc": "上行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/deleteCloudRecording",
      "class_name": "DeleteCloudRecordingRequest",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17010
    },
    {
      "desc": "下行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/deleteCloudRecording",
      "class_name": "DeleteCloudRecordingResponse",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17011
    },
    {
      "desc": "上行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/reportCallEvent",
      "class_name": "ReportCallEventRequest",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17012
    },
    {
      "desc": "下行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/reportCallEvent",
      "class_name": "ReportCallEventResponse",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17013
    },
    {
      "desc": "上行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/startAITranscription",
      "class_name": "StartAITranscriptionRequest",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17014
    },
    {
      "desc": "下行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/startAITranscription",
      "class_name": "StartAITranscriptionResponse",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17015
    },
    {
      "desc": "上行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/stopAITranscription",
      "class_name": "StopAITranscriptionRequest",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17016
    },
    {
      "desc": "下行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/stopAITranscription",
      "class_name": "StopAITranscriptionResponse",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17017
    },
    {
      "desc": "上行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/reportConversationSource",
      "class_name": "ReportConversationSourceRequest",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17018
    },
    {
      "desc": "下行消息",
      "service": "data_bridge_service",
      "type": "App",
      "url": "/dataBridgeApi/reportConversationSource",
      "class_name": "ReportConversationSourceResponse",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17019
    },
    {
      "desc": "上行消息",
      "service": "data_bridge_service",
      "type": "Admin",
      "url": "/dataBridgeApi/queryConversationSource",
      "class_name": "QueryConversationSourceRequest",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17020
    },
    {
      "desc": "下行消息",
      "service": "data_bridge_service",
      "type": "Admin",
      "url": "/dataBridgeApi/queryConversationSource",
      "class_name": "QueryConversationSourceResponse",
      "client_package": "DataBridgeServiceAPI",
      "server_package": "com.pserver.proto.archat",
      "id": 17021
    }
  ]
}

```
