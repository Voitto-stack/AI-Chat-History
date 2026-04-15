---
title: ProtoConfig
date: 2026-04-15T17:04:47+08:00
source: import
language: json
original: ProtoConfig.json
---

# ProtoConfig

```json
{
  "startId": 0,
  "desc":"proto协议配置:Id从StartId开始依次+1",
  "protos": [
    {
      "desc":"这个Id就是0,上行消息C2S - Client-to-Server,每一个上行消息对应一个下行消息",
      "class_name": "C2S_CreateRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"这个Id就是0,上行消息C2S - Client-to-Server,每一个上行消息对应一个下行消息",
      "class_name": "S2C_CreateRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"进入房间",
      "class_name": "C2S_EnterRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"进入房间",
      "class_name": "S2C_EnterRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"进入房间 广播消息",
      "class_name": "S2C_BroadCastEnterRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步房间",
      "class_name": "C2S_SyncMessage",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步房间",
      "class_name": "S2C_SyncMessage",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步房间-广播消息",
      "class_name": "S2C_BroadCastSyncMessage",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"离开房间的消息",
      "class_name": "C2S_LeaveRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"离开房间的消息",
      "class_name": "S2C_LeaveRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"广播-用户离开房间的消息",
      "class_name": "S2C_BroadCastLeaveRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"广播-当前游戏状态",
      "class_name": "S2C_BroadCastGameStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"坐下椅子",
      "class_name": "C2S_SitSeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"坐下椅子",
      "class_name": "S2C_SitSeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"离开椅子",
      "class_name": "C2S_LeaveSeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"离开椅子",
      "class_name": "S2C_LeaveSeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"广播-椅子状态",
      "class_name": "S2C_BroadCastSeatStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"开始游戏",
      "class_name": "C2S_StartGame",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"开始游戏",
      "class_name": "S2C_StartGame",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"广播-游戏已准备",
      "class_name": "S2C_BroadCastGameReady",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"玩家选牌",
      "class_name": "C2S_SelectCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"玩家选牌",
      "class_name": "S2C_SelectCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"广播-玩家选牌",
      "class_name": "S2C_BroadCastPlayerSelectCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"裁判开牌",
      "class_name": "C2S_CzarOpenCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"裁判开牌",
      "class_name": "S2C_CzarOpenCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"广播-裁判开牌",
      "class_name": "S2C_BroadCastOpenCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"裁判裁定赢家",
      "class_name": "C2S_CzarSelectWinCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"裁判裁定赢家",
      "class_name": "S2C_CzarSelectWinCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"广播-裁判裁定赢家",
      "class_name": "S2C_BroadcastCzarWinCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-用户bs信息",
      "class_name": "C2S_SyncBlendShape",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-用户bs信息",
      "class_name": "S2C_SyncBlendShape",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-广播用户bs信息",
      "class_name": "S2C_BroadcastSyncBlendShape",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-广播头部旋转信息",
      "class_name": "C2S_SyncHeadStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-广播头部旋转信息",
      "class_name": "S2C_SyncHeadStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-广播头部旋转信息",
      "class_name": "S2C_BroadcastSyncHeadStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"心跳消息",
      "class_name": "C2S_HeartBeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "gateway"
    },
    {
      "desc":"心跳消息",
      "class_name": "S2C_HeartBeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "gateway"
    },
    {
      "desc":"沙发消息",
      "class_name": "C2S_SitSofa",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"沙发消息",
      "class_name": "S2C_SitSofa",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"沙发消息",
      "class_name": "C2S_LeaveSofa",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"沙发消息",
      "class_name": "S2C_LeaveSofa",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"沙发消息",
      "class_name": "S2C_BroadCastSofaStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"声音消息",
      "class_name": "C2S_VoiceInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"声音消息",
      "class_name": "S2C_VoiceInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"声音消息",
      "class_name": "S2C_BroadcastVoiceInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"强制下一轮消息",
      "class_name": "C2S_ForceNextRound",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"强制下一轮消息",
      "class_name": "S2C_ForceNextRound",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"强制下一轮消息",
      "class_name": "S2C_BroadcastForceNextRound",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-肩膀信息",
      "class_name": "C2S_SyncShoulder",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-肩膀信息",
      "class_name": "S2C_SyncShoulder",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-肩膀信息",
      "class_name": "S2C_BroadcastShoulder",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-手部信息",
      "class_name": "C2S_SyncHand",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-手部信息",
      "class_name": "S2C_SyncHand",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-手部信息",
      "class_name": "S2C_BroadcastHand",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-Avatar",
      "class_name": "C2S_ChangeAvatar",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-Avatar",
      "class_name": "S2C_ChangeAvatar",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"同步-Avatar",
      "class_name": "S2C_BroadCastChangeAvatar",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"声网",
      "class_name": "C2S_AgoraToken",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "agora"
    },
    {
      "desc":"声网",
      "class_name": "S2C_AgoraToken",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "agora"
    },
    {
      "desc":"踢人",
      "class_name": "C2S_KickOut",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"踢人",
      "class_name": "S2C_KickOut",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"踢人",
      "class_name": "S2C_ForceKickOut",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"Encounter",
      "class_name": "C2S_FakeStartEncounter",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"Encounter",
      "class_name": "C2S_StartEncounter",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"Encounter",
      "class_name": "S2C_StartEncounter",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"Encounter",
      "class_name": "C2S_ReAnchor",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"Encounter",
      "class_name": "S2C_ReAnchor",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"Follow",
      "class_name": "C2S_FollowNotify",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"Follow",
      "class_name": "S2C_FollowNotify",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"Follow",
      "class_name": "S2C_BroadcastFollowNotify",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"MMOStatus",
      "class_name": "C2S_ChangeMMOStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"MMOStatus",
      "class_name": "S2C_BroadCastMMOStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"EncounterStat",
      "class_name": "C2S_StatEncounter",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "stat"
    },
    {
      "desc":"EncounterStat",
      "class_name": "S2C_StatEncounter",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "stat"
    },
    {
      "desc":"EncounterStat",
      "class_name": "C2S_StatEncounterMeta",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"EncounterStat",
      "class_name": "S2C_StatEncounterMeta",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"InstantMatch",
      "class_name": "C2S_SyncChat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch"
    },
    {
      "desc":"InstantMatch",
      "class_name": "S2C_SyncChat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch"
    },
    {
      "desc":"InstantMatch",
      "class_name": "C2S_StartMatch",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch"
    },
    {
      "desc":"InstantMatch",
      "class_name": "S2C_StartMatch",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch"
    },
    {
      "desc":"InstantMatch",
      "class_name": "C2S_CancelMatch",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch"
    },
    {
      "desc":"InstantMatch",
      "class_name": "S2C_CancelMatch",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch"
    },
    {
      "desc":"InviteRoomInfo",
      "class_name": "C2S_InviteJoinRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite"
    },
    {
      "desc":"InviteRoomInfo",
      "class_name": "S2C_InviteJoinRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite"
    },
    {
      "desc":"InviteRoomInfo",
      "class_name": "C2S_InviteRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite"
    },
    {
      "desc":"InviteRoomInfo",
      "class_name": "S2C_InviteRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite"
    },
    {
      "desc":"InviteRoomInfo",
      "class_name": "C2S_NormalRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite"
    },
    {
      "desc":"InviteRoomInfo",
      "class_name": "S2C_NormalRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite"
    },
    {
      "desc":"UpdateRoomInfo",
      "class_name": "C2S_UpdateRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"UpdateRoomInfo",
      "class_name": "S2C_UpdateRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"UpdateRoomInfo",
      "class_name": "S2C_BroadcastUpdateRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"InstantMatch",
      "class_name": "C2S_SetMatchFilterType",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch"
    },
    {
      "desc":"InstantMatch",
      "class_name": "S2C_SetMatchFilterType",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch"
    },
    {
      "desc":"InstantMatch",
      "class_name": "C2S_GetMatchFilterType",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch"
    },
    {
      "desc":"InstantMatch",
      "class_name": "S2C_GetMatchFilterType",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch"
    },
    {
      "desc":"3DVideoConfig",
      "class_name": "C2S_Set3DVideoConfig",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"3DVideoConfig",
      "class_name": "S2C_Set3DVideoConfig",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"3DVideoConfig",
      "class_name": "S2C_Broadcast3DVideoConfig",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"3DVideoConfig",
      "class_name": "C2S_Get3DVideoConfig",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    },
    {
      "desc":"3DVideoConfig",
      "class_name": "S2C_Get3DVideoConfig",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room"
    }
  ]
}

```
