---
title: ProtoConfig_Dic
date: 2026-04-15T17:04:47+08:00
source: import
language: json
original: ProtoConfig_Dic.json
---

# ProtoConfig_Dic

```json
{
  "startId": 0,
  "desc": "proto协议配置:Id从StartId开始依次+1",
  "protos": [
    {
      "desc": "这个Id就是0,上行消息C2S - Client-to-Server,每一个上行消息对应一个下行消息",
      "class_name": "C2S_CreateRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 0
    },
    {
      "desc": "这个Id就是0,上行消息C2S - Client-to-Server,每一个上行消息对应一个下行消息",
      "class_name": "S2C_CreateRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 1
    },
    {
      "desc": "进入房间",
      "class_name": "C2S_EnterRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 2
    },
    {
      "desc": "进入房间",
      "class_name": "S2C_EnterRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 3
    },
    {
      "desc": "进入房间 广播消息",
      "class_name": "S2C_BroadCastEnterRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 4
    },
    {
      "desc": "同步房间",
      "class_name": "C2S_SyncMessage",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 5
    },
    {
      "desc": "同步房间",
      "class_name": "S2C_SyncMessage",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 6
    },
    {
      "desc": "同步房间-广播消息",
      "class_name": "S2C_BroadCastSyncMessage",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 7
    },
    {
      "desc": "离开房间的消息",
      "class_name": "C2S_LeaveRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 8
    },
    {
      "desc": "离开房间的消息",
      "class_name": "S2C_LeaveRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 9
    },
    {
      "desc": "广播-用户离开房间的消息",
      "class_name": "S2C_BroadCastLeaveRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 10
    },
    {
      "desc": "广播-当前游戏状态",
      "class_name": "S2C_BroadCastGameStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 11
    },
    {
      "desc": "坐下椅子",
      "class_name": "C2S_SitSeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 12
    },
    {
      "desc": "坐下椅子",
      "class_name": "S2C_SitSeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 13
    },
    {
      "desc": "离开椅子",
      "class_name": "C2S_LeaveSeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 14
    },
    {
      "desc": "离开椅子",
      "class_name": "S2C_LeaveSeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 15
    },
    {
      "desc": "广播-椅子状态",
      "class_name": "S2C_BroadCastSeatStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 16
    },
    {
      "desc": "开始游戏",
      "class_name": "C2S_StartGame",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 17
    },
    {
      "desc": "开始游戏",
      "class_name": "S2C_StartGame",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 18
    },
    {
      "desc": "广播-游戏已准备",
      "class_name": "S2C_BroadCastGameReady",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 19
    },
    {
      "desc": "玩家选牌",
      "class_name": "C2S_SelectCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 20
    },
    {
      "desc": "玩家选牌",
      "class_name": "S2C_SelectCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 21
    },
    {
      "desc": "广播-玩家选牌",
      "class_name": "S2C_BroadCastPlayerSelectCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 22
    },
    {
      "desc": "裁判开牌",
      "class_name": "C2S_CzarOpenCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 23
    },
    {
      "desc": "裁判开牌",
      "class_name": "S2C_CzarOpenCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 24
    },
    {
      "desc": "广播-裁判开牌",
      "class_name": "S2C_BroadCastOpenCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 25
    },
    {
      "desc": "裁判裁定赢家",
      "class_name": "C2S_CzarSelectWinCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 26
    },
    {
      "desc": "裁判裁定赢家",
      "class_name": "S2C_CzarSelectWinCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 27
    },
    {
      "desc": "广播-裁判裁定赢家",
      "class_name": "S2C_BroadcastCzarWinCard",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 28
    },
    {
      "desc": "同步-用户bs信息",
      "class_name": "C2S_SyncBlendShape",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 29
    },
    {
      "desc": "同步-用户bs信息",
      "class_name": "S2C_SyncBlendShape",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 30
    },
    {
      "desc": "同步-广播用户bs信息",
      "class_name": "S2C_BroadcastSyncBlendShape",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 31
    },
    {
      "desc": "同步-广播头部旋转信息",
      "class_name": "C2S_SyncHeadStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 32
    },
    {
      "desc": "同步-广播头部旋转信息",
      "class_name": "S2C_SyncHeadStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 33
    },
    {
      "desc": "同步-广播头部旋转信息",
      "class_name": "S2C_BroadcastSyncHeadStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 34
    },
    {
      "desc": "心跳消息",
      "class_name": "C2S_HeartBeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "gateway",
      "id": 35
    },
    {
      "desc": "心跳消息",
      "class_name": "S2C_HeartBeat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "gateway",
      "id": 36
    },
    {
      "desc": "沙发消息",
      "class_name": "C2S_SitSofa",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 37
    },
    {
      "desc": "沙发消息",
      "class_name": "S2C_SitSofa",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 38
    },
    {
      "desc": "沙发消息",
      "class_name": "C2S_LeaveSofa",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 39
    },
    {
      "desc": "沙发消息",
      "class_name": "S2C_LeaveSofa",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 40
    },
    {
      "desc": "沙发消息",
      "class_name": "S2C_BroadCastSofaStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 41
    },
    {
      "desc": "声音消息",
      "class_name": "C2S_VoiceInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 42
    },
    {
      "desc": "声音消息",
      "class_name": "S2C_VoiceInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 43
    },
    {
      "desc": "声音消息",
      "class_name": "S2C_BroadcastVoiceInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 44
    },
    {
      "desc": "强制下一轮消息",
      "class_name": "C2S_ForceNextRound",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 45
    },
    {
      "desc": "强制下一轮消息",
      "class_name": "S2C_ForceNextRound",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 46
    },
    {
      "desc": "强制下一轮消息",
      "class_name": "S2C_BroadcastForceNextRound",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 47
    },
    {
      "desc": "同步-肩膀信息",
      "class_name": "C2S_SyncShoulder",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 48
    },
    {
      "desc": "同步-肩膀信息",
      "class_name": "S2C_SyncShoulder",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 49
    },
    {
      "desc": "同步-肩膀信息",
      "class_name": "S2C_BroadcastShoulder",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 50
    },
    {
      "desc": "同步-手部信息",
      "class_name": "C2S_SyncHand",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 51
    },
    {
      "desc": "同步-手部信息",
      "class_name": "S2C_SyncHand",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 52
    },
    {
      "desc": "同步-手部信息",
      "class_name": "S2C_BroadcastHand",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 53
    },
    {
      "desc": "同步-Avatar",
      "class_name": "C2S_ChangeAvatar",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 54
    },
    {
      "desc": "同步-Avatar",
      "class_name": "S2C_ChangeAvatar",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 55
    },
    {
      "desc": "同步-Avatar",
      "class_name": "S2C_BroadCastChangeAvatar",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 56
    },
    {
      "desc": "声网",
      "class_name": "C2S_AgoraToken",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "agora",
      "id": 57
    },
    {
      "desc": "声网",
      "class_name": "S2C_AgoraToken",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "agora",
      "id": 58
    },
    {
      "desc": "踢人",
      "class_name": "C2S_KickOut",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 59
    },
    {
      "desc": "踢人",
      "class_name": "S2C_KickOut",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 60
    },
    {
      "desc": "踢人",
      "class_name": "S2C_ForceKickOut",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 61
    },
    {
      "desc": "Encounter",
      "class_name": "C2S_FakeStartEncounter",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 62
    },
    {
      "desc": "Encounter",
      "class_name": "C2S_StartEncounter",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 63
    },
    {
      "desc": "Encounter",
      "class_name": "S2C_StartEncounter",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 64
    },
    {
      "desc": "Encounter",
      "class_name": "C2S_ReAnchor",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 65
    },
    {
      "desc": "Encounter",
      "class_name": "S2C_ReAnchor",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 66
    },
    {
      "desc": "Follow",
      "class_name": "C2S_FollowNotify",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 67
    },
    {
      "desc": "Follow",
      "class_name": "S2C_FollowNotify",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 68
    },
    {
      "desc": "Follow",
      "class_name": "S2C_BroadcastFollowNotify",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 69
    },
    {
      "desc": "MMOStatus",
      "class_name": "C2S_ChangeMMOStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 70
    },
    {
      "desc": "MMOStatus",
      "class_name": "S2C_BroadCastMMOStatus",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 71
    },
    {
      "desc": "EncounterStat",
      "class_name": "C2S_StatEncounter",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "stat",
      "id": 72
    },
    {
      "desc": "EncounterStat",
      "class_name": "S2C_StatEncounter",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "stat",
      "id": 73
    },
    {
      "desc": "EncounterStat",
      "class_name": "C2S_StatEncounterMeta",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 74
    },
    {
      "desc": "EncounterStat",
      "class_name": "S2C_StatEncounterMeta",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 75
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_SyncChat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch",
      "id": 76
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_SyncChat",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch",
      "id": 77
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_StartMatch",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch",
      "id": 78
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_StartMatch",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch",
      "id": 79
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_CancelMatch",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch",
      "id": 80
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_CancelMatch",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch",
      "id": 81
    },
    {
      "desc": "InviteRoomInfo",
      "class_name": "C2S_InviteJoinRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite",
      "id": 82
    },
    {
      "desc": "InviteRoomInfo",
      "class_name": "S2C_InviteJoinRoom",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite",
      "id": 83
    },
    {
      "desc": "InviteRoomInfo",
      "class_name": "C2S_InviteRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite",
      "id": 84
    },
    {
      "desc": "InviteRoomInfo",
      "class_name": "S2C_InviteRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite",
      "id": 85
    },
    {
      "desc": "InviteRoomInfo",
      "class_name": "C2S_NormalRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite",
      "id": 86
    },
    {
      "desc": "InviteRoomInfo",
      "class_name": "S2C_NormalRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "invite",
      "id": 87
    },
    {
      "desc": "UpdateRoomInfo",
      "class_name": "C2S_UpdateRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 88
    },
    {
      "desc": "UpdateRoomInfo",
      "class_name": "S2C_UpdateRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 89
    },
    {
      "desc": "UpdateRoomInfo",
      "class_name": "S2C_BroadcastUpdateRoomInfo",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 90
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_SetMatchFilterType",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch",
      "id": 91
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_SetMatchFilterType",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch",
      "id": 92
    },
    {
      "desc": "InstantMatch",
      "class_name": "C2S_GetMatchFilterType",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch",
      "id": 93
    },
    {
      "desc": "InstantMatch",
      "class_name": "S2C_GetMatchFilterType",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "chatmatch",
      "id": 94
    },
    {
      "desc": "3DVideoConfig",
      "class_name": "C2S_Set3DVideoConfig",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 95
    },
    {
      "desc": "3DVideoConfig",
      "class_name": "S2C_Set3DVideoConfig",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 96
    },
    {
      "desc": "3DVideoConfig",
      "class_name": "S2C_Broadcast3DVideoConfig",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 97
    },
    {
      "desc": "3DVideoConfig",
      "class_name": "C2S_Get3DVideoConfig",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 98
    },
    {
      "desc": "3DVideoConfig",
      "class_name": "S2C_Get3DVideoConfig",
      "client_package": "Room",
      "server_package": "com.pserver.proto.tcp",
      "server_type": "room",
      "id": 99
    }
  ]
}
```
