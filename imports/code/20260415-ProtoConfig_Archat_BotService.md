---
title: ProtoConfig_Archat_BotService
date: 2026-04-15T17:04:47+08:00
source: import
language: json
original: ProtoConfig_Archat_BotService.json
---

# ProtoConfig_Archat_BotService

```json
{
  "startId": 16000,
  "desc": "proto协议配置:id默认遵守从startId开始，上行消息Id = 下行消息Id + 1, 必要上行消息",
  "protos": [
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotTags",
      "class_name": "GetBotTagsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4094
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotTags",
      "class_name": "GetBotTagsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4095
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/sendMessageFromBot",
      "class_name": "SendMessageFromBotRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4096
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/sendMessageFromBot",
      "class_name": "SendMessageFromBotResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4097
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/uploadBotExcel",
      "class_name": "UploadBotExcelRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4098
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/uploadBotExcel",
      "class_name": "UploadBotExcelResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4099
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/uploadBotCover",
      "class_name": "UploadBotCoverRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4100
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/uploadBotCover",
      "class_name": "UploadBotCoverResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4101
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getTempEmailMessage",
      "class_name": "GetTempEmailMessageRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4104
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getTempEmailMessage",
      "class_name": "GetTempEmailMessageResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4105
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/getBotInfosAdmin",
      "class_name": "GetBotInfosRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4106
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/getBotInfosAdmin",
      "class_name": "GetBotInfosResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4107
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/getBotTagsAdmin",
      "class_name": "GetBotTagsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4108
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/getBotTagsAdmin",
      "class_name": "GetBotTagsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4109
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/updateCaiAccountState",
      "class_name": "UpdateCaiAccountStateRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4110
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/updateCaiAccountState",
      "class_name": "UpdateCaiAccountStateResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4111
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotDetail",
      "class_name": "GetBotDetailRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4148
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotDetail",
      "class_name": "GetBotDetailResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4149
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getRelatedBots",
      "class_name": "GetRelatedBotsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4150
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getRelatedBots",
      "class_name": "GetRelatedBotsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4151
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotsByCreator",
      "class_name": "GetBotsByCreatorRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4152
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotsByCreator",
      "class_name": "GetBotsByCreatorResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4153
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotsByTag",
      "class_name": "GetBotsByTagRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4154
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotsByTag",
      "class_name": "GetBotsByTagResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4155
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/editBot",
      "class_name": "EditBotRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4156
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/editBot",
      "class_name": "EditBotResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4157
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/deleteBot",
      "class_name": "DeleteBotRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4158
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/deleteBot",
      "class_name": "DeleteBotResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4159
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotDetailByUserIds",
      "class_name": "GetBotDetailByUserIdsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4160
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotDetailByUserIds",
      "class_name": "GetBotDetailByUserIdsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4161
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/searchBotsV2",
      "class_name": "SearchBotsV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4162
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/searchBotsV2",
      "class_name": "SearchBotsV2Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4163
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getNewEmail",
      "class_name": "GetNewEmailRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4164
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getNewEmail",
      "class_name": "GetNewEmailResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4165
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/addRegisteredCaiAccount",
      "class_name": "AddRegisteredCaiAccountRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4166
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/addRegisteredCaiAccount",
      "class_name": "AddRegisteredCaiAccountResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4167
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getCaiAccountInfoByThirdPartyLoginV2",
      "class_name": "GetCaiAccountInfoByThirdPartyLoginV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4168
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getCaiAccountInfoByThirdPartyLoginV2",
      "class_name": "GetCaiAccountInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4169
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/countBotConversation",
      "class_name": "CountBotConversationRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4170
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/countBotConversation",
      "class_name": "CountBotConversationResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4171
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/countBotMsgReceived",
      "class_name": "CountBotMsgReceivedRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4172
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/countBotMsgReceived",
      "class_name": "CountBotMsgReceivedResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4173
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getNameForCAI",
      "class_name": "GetNameForCAIRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4176
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getNameForCAI",
      "class_name": "GetNameForCAIResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4177
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getLLMRouting",
      "class_name": "GetLLMRoutingRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4182
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getLLMRouting",
      "class_name": "GetLLMRoutingResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4183
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/setLLMRoutingConfig",
      "class_name": "SetLLMRoutingConfigRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4184
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/setLLMRoutingConfig",
      "class_name": "SetLLMRoutingConfigResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4185
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/getBotsByTagAdmin",
      "class_name": "GetBotsByTagAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4186
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/getBotsByTagAdmin",
      "class_name": "GetBotsByTagResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4187
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/getBotDetailAdmin",
      "class_name": "GetBotDetailAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4188
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/getBotDetailAdmin",
      "class_name": "GetBotDetailResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4189
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/deleteAndGetNewCaiAccount",
      "class_name": "DeleteAndGetNewCaiAccountRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4190
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/deleteAndGetNewCaiAccount",
      "class_name": "DeleteAndGetNewCaiAccountResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4191
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getExecutablePackageInfo",
      "class_name": "GetExecutablePackageInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4192
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getExecutablePackageInfo",
      "class_name": "GetExecutablePackageInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4193
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/setExecutablePackageInfoAdmin",
      "class_name": "SetExecutablePackageInfoAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4194
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/setExecutablePackageInfoAdmin",
      "class_name": "SetExecutablePackageInfoAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4195
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getAthenaConfig",
      "class_name": "GetAthenaConfigRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4196
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getAthenaConfig",
      "class_name": "GetAthenaConfigResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4197
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getPopularSearch",
      "class_name": "GetPopularSearchRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16000
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getPopularSearch",
      "class_name": "GetPopularSearchResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16001
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getLeaderBoard",
      "class_name": "GetLeaderBoardRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16002
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getLeaderBoard",
      "class_name": "GetLeaderBoardResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16003
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotsByTagGuest",
      "class_name": "GetBotsByTagGuestRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16004
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotsByTagGuest",
      "class_name": "GetBotsByTagGuestResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16005
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/createBot",
      "class_name": "CreateBotRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16006
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/createBot",
      "class_name": "CreateBotResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16007
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getNewEmailV2",
      "class_name": "GetNewEmailV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16008
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getNewEmailV2",
      "class_name": "GetNewEmailV2Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16009
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getTempEmailMessageV2",
      "class_name": "GetTempEmailMessageV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16010
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getTempEmailMessageV2",
      "class_name": "GetTempEmailMessageV2Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16011
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getCaiAccountInfoByThirdPartyLoginV3",
      "class_name": "GetCaiAccountInfoByThirdPartyLoginV3Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16012
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getCaiAccountInfoByThirdPartyLoginV3",
      "class_name": "GetCaiAccountInfoByThirdPartyLoginV3Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16013
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/deleteAndGetNewCaiAccountV2",
      "class_name": "DeleteAndGetNewCaiAccountRequestV2",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16014
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/deleteAndGetNewCaiAccountV2",
      "class_name": "DeleteAndGetNewCaiAccountResponseV2",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16015
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/updateCaiAccountStateV2",
      "class_name": "UpdateCaiAccountStateV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16016
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/updateCaiAccountStateV2",
      "class_name": "UpdateCaiAccountStateV2Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16017
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/editBotAdmin",
      "class_name": "EditBotAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16018
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/editBotAdmin",
      "class_name": "EditBotAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16019
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/deleteCaiAccount",
      "class_name": "DeleteCaiAccountRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16020
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/deleteCaiAccount",
      "class_name": "DeleteCaiAccountResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16021
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getCaiAccount",
      "class_name": "GetCaiAccountRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16022
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getCaiAccount",
      "class_name": "GetCaiAccountResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16023
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/getAllExecutablePackageInfo",
      "class_name": "GetExecutablePackageInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16024
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/getAllExecutablePackageInfo",
      "class_name": "GetExecutablePackageInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16025
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotIntro",
      "class_name": "GetBotIntroRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16026
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotIntro",
      "class_name": "GetBotIntroResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16027
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotRating",
      "class_name": "GetBotRatingRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16028
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotRating",
      "class_name": "GetBotRatingResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16029
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/createBotRating",
      "class_name": "CreateBotRatingRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16030
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/createBotRating",
      "class_name": "CreateBotRatingResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16031
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotRatingByUser",
      "class_name": "GetBotRatingByUserRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16032
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getBotRatingByUser",
      "class_name": "GetBotRatingByUserResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16033
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/createUserComment",
      "class_name": "CreateUserCommentRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16034
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/createUserComment",
      "class_name": "CreateUserCommentResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16035
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getUserComments",
      "class_name": "GetUserCommentsRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16036
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getUserComments",
      "class_name": "GetUserCommentsResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16037
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getReplyComments",
      "class_name": "GetReplyCommentsRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16038
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getReplyComments",
      "class_name": "GetReplyCommentsResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16039
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getTopComment",
      "class_name": "GetTopCommentRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16040
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/getTopComment",
      "class_name": "GetTopCommentResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16041
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/updateUserComment",
      "class_name": "UpdateUserCommentRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16042
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/updateUserComment",
      "class_name": "UpdateUserCommentResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16043
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/reportComment",
      "class_name": "ReportCommentRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16044
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/reportComment",
      "class_name": "ReportCommentResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16045
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/setInReviewVersion",
      "class_name": "SetInReviewVersionRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16048
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "Admin",
      "url": "/botApi/setInReviewVersion",
      "class_name": "SetInReviewVersionResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16049
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/updateCaiAccount",
      "class_name": "UpdateCaiAccountRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16050
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/updateCaiAccount",
      "class_name": "UpdateCaiAccountResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16051
    },
    {
      "desc": "上行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/createFakeBot",
      "class_name": "CreateFakeBotRequest",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16052
    },
    {
      "desc": "下行消息",
      "service": "bot_service",
      "type": "App",
      "url": "/botApi/createFakeBot",
      "class_name": "CreateFakeBotResponse",
      "client_package": "BotServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 16053
    },
    {
        "desc": "上行消息",
        "service": "bot_service",
        "type": "Admin",
        "url": "/botApi/adminCreateBotForDigitalHuman",
        "class_name": "AdminCreateBotForDigitalHumanRequest",
        "client_package": "BotServiceApi",
        "server_package": "com.pserver.proto.archat",
        "id": 16054
      },
      {
        "desc": "下行消息",
        "service": "bot_service",
        "type": "Admin",
        "url": "/botApi/adminCreateBotForDigitalHuman",
        "class_name": "AdminCreateBotForDigitalHumanResponse",
        "client_package": "BotServiceApi",
        "server_package": "com.pserver.proto.archat",
        "id": 16055
      },
      {
        "desc": "上行消息",
        "service": "bot_service",
        "type": "App",
        "url": "/botApi/sendTIMMsgFromSMS",
        "class_name": "SendTIMMsgFromSMSRequest",
        "client_package": "UserServiceApi",
        "server_package": "com.pserver.proto.archat",
        "id": 16056
      },
      {
        "desc": "下行消息",
        "service": "bot_service",
        "type": "App",
        "url": "/botApi/sendTIMMsgFromSMS",
        "class_name": "SendTIMMsgFromSMSResponse",
        "client_package": "UserServiceApi",
        "server_package": "com.pserver.proto.archat",
        "id": 16057
      },
      {
        "desc": "上行消息",
        "service": "bot_service",
        "type": "App",
        "url": "/botApi/uploadChatSound",
        "class_name": "UploadChatSoundRequest",
        "client_package": "UserServiceApi",
        "server_package": "com.pserver.proto.archat",
        "id": 16058
      },
      {
        "desc": "下行消息",
        "service": "bot_service",
        "type": "App",
        "url": "/botApi/uploadChatSound",
        "class_name": "UploadChatSoundResponse",
        "client_package": "UserServiceApi",
        "server_package": "com.pserver.proto.archat",
        "id": 16059
      }
  ]
}

```
