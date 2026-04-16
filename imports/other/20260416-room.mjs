import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
const protobufPackage = "Room";
var RoomErrorCode = /* @__PURE__ */ ((RoomErrorCode2) => {
  RoomErrorCode2[RoomErrorCode2["SUCCESS"] = 0] = "SUCCESS";
  RoomErrorCode2[RoomErrorCode2["SUCCESS_ENCOUNTER_MISS"] = 1] = "SUCCESS_ENCOUNTER_MISS";
  RoomErrorCode2[RoomErrorCode2["SUCCESS_FRIEND_LEAVE"] = 2] = "SUCCESS_FRIEND_LEAVE";
  RoomErrorCode2[RoomErrorCode2["FAIL"] = 10] = "FAIL";
  RoomErrorCode2[RoomErrorCode2["FAIL_IN_BLACKLIST"] = 11] = "FAIL_IN_BLACKLIST";
  RoomErrorCode2[RoomErrorCode2["FAIL_MAX_PLAYER_LIMIT"] = 12] = "FAIL_MAX_PLAYER_LIMIT";
  RoomErrorCode2[RoomErrorCode2["FAIL_ROOM_NOT_EXIST"] = 13] = "FAIL_ROOM_NOT_EXIST";
  RoomErrorCode2[RoomErrorCode2["FAIL_FRIEND_OFFLINE"] = 14] = "FAIL_FRIEND_OFFLINE";
  RoomErrorCode2[RoomErrorCode2["FAIL_NO_PERMISSION"] = 15] = "FAIL_NO_PERMISSION";
  RoomErrorCode2[RoomErrorCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return RoomErrorCode2;
})(RoomErrorCode || {});
function roomErrorCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "SUCCESS":
      return 0 /* SUCCESS */;
    case 1:
    case "SUCCESS_ENCOUNTER_MISS":
      return 1 /* SUCCESS_ENCOUNTER_MISS */;
    case 2:
    case "SUCCESS_FRIEND_LEAVE":
      return 2 /* SUCCESS_FRIEND_LEAVE */;
    case 10:
    case "FAIL":
      return 10 /* FAIL */;
    case 11:
    case "FAIL_IN_BLACKLIST":
      return 11 /* FAIL_IN_BLACKLIST */;
    case 12:
    case "FAIL_MAX_PLAYER_LIMIT":
      return 12 /* FAIL_MAX_PLAYER_LIMIT */;
    case 13:
    case "FAIL_ROOM_NOT_EXIST":
      return 13 /* FAIL_ROOM_NOT_EXIST */;
    case 14:
    case "FAIL_FRIEND_OFFLINE":
      return 14 /* FAIL_FRIEND_OFFLINE */;
    case 15:
    case "FAIL_NO_PERMISSION":
      return 15 /* FAIL_NO_PERMISSION */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function roomErrorCodeToJSON(object) {
  switch (object) {
    case 0 /* SUCCESS */:
      return "SUCCESS";
    case 1 /* SUCCESS_ENCOUNTER_MISS */:
      return "SUCCESS_ENCOUNTER_MISS";
    case 2 /* SUCCESS_FRIEND_LEAVE */:
      return "SUCCESS_FRIEND_LEAVE";
    case 10 /* FAIL */:
      return "FAIL";
    case 11 /* FAIL_IN_BLACKLIST */:
      return "FAIL_IN_BLACKLIST";
    case 12 /* FAIL_MAX_PLAYER_LIMIT */:
      return "FAIL_MAX_PLAYER_LIMIT";
    case 13 /* FAIL_ROOM_NOT_EXIST */:
      return "FAIL_ROOM_NOT_EXIST";
    case 14 /* FAIL_FRIEND_OFFLINE */:
      return "FAIL_FRIEND_OFFLINE";
    case 15 /* FAIL_NO_PERMISSION */:
      return "FAIL_NO_PERMISSION";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var Platform = /* @__PURE__ */ ((Platform2) => {
  Platform2[Platform2["UNKNOWN"] = 0] = "UNKNOWN";
  Platform2[Platform2["IOS"] = 1] = "IOS";
  Platform2[Platform2["ANDROID"] = 2] = "ANDROID";
  Platform2[Platform2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return Platform2;
})(Platform || {});
function platformFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return 0 /* UNKNOWN */;
    case 1:
    case "IOS":
      return 1 /* IOS */;
    case 2:
    case "ANDROID":
      return 2 /* ANDROID */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function platformToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN */:
      return "UNKNOWN";
    case 1 /* IOS */:
      return "IOS";
    case 2 /* ANDROID */:
      return "ANDROID";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var EnterRoomErrorCode = /* @__PURE__ */ ((EnterRoomErrorCode2) => {
  EnterRoomErrorCode2[EnterRoomErrorCode2["ENTER_ROOM_SUCCESS"] = 0] = "ENTER_ROOM_SUCCESS";
  EnterRoomErrorCode2[EnterRoomErrorCode2["ENTER_ROOM_FAILED"] = 1] = "ENTER_ROOM_FAILED";
  EnterRoomErrorCode2[EnterRoomErrorCode2["ENTER_ROOM_FAILED_MAX_COUNT"] = 2] = "ENTER_ROOM_FAILED_MAX_COUNT";
  EnterRoomErrorCode2[EnterRoomErrorCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return EnterRoomErrorCode2;
})(EnterRoomErrorCode || {});
function enterRoomErrorCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "ENTER_ROOM_SUCCESS":
      return 0 /* ENTER_ROOM_SUCCESS */;
    case 1:
    case "ENTER_ROOM_FAILED":
      return 1 /* ENTER_ROOM_FAILED */;
    case 2:
    case "ENTER_ROOM_FAILED_MAX_COUNT":
      return 2 /* ENTER_ROOM_FAILED_MAX_COUNT */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function enterRoomErrorCodeToJSON(object) {
  switch (object) {
    case 0 /* ENTER_ROOM_SUCCESS */:
      return "ENTER_ROOM_SUCCESS";
    case 1 /* ENTER_ROOM_FAILED */:
      return "ENTER_ROOM_FAILED";
    case 2 /* ENTER_ROOM_FAILED_MAX_COUNT */:
      return "ENTER_ROOM_FAILED_MAX_COUNT";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var GameStatusId = /* @__PURE__ */ ((GameStatusId2) => {
  GameStatusId2[GameStatusId2["NOT_READY"] = 0] = "NOT_READY";
  GameStatusId2[GameStatusId2["READY_WAITING_START"] = 1] = "READY_WAITING_START";
  GameStatusId2[GameStatusId2["START_AND_INIT"] = 2] = "START_AND_INIT";
  GameStatusId2[GameStatusId2["PLAYER_SELECT_CARD"] = 3] = "PLAYER_SELECT_CARD";
  GameStatusId2[GameStatusId2["CZAR_SELECT_CARD"] = 4] = "CZAR_SELECT_CARD";
  GameStatusId2[GameStatusId2["WAITING_FOR_NEXT_ROUND"] = 5] = "WAITING_FOR_NEXT_ROUND";
  GameStatusId2[GameStatusId2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return GameStatusId2;
})(GameStatusId || {});
function gameStatusIdFromJSON(object) {
  switch (object) {
    case 0:
    case "NOT_READY":
      return 0 /* NOT_READY */;
    case 1:
    case "READY_WAITING_START":
      return 1 /* READY_WAITING_START */;
    case 2:
    case "START_AND_INIT":
      return 2 /* START_AND_INIT */;
    case 3:
    case "PLAYER_SELECT_CARD":
      return 3 /* PLAYER_SELECT_CARD */;
    case 4:
    case "CZAR_SELECT_CARD":
      return 4 /* CZAR_SELECT_CARD */;
    case 5:
    case "WAITING_FOR_NEXT_ROUND":
      return 5 /* WAITING_FOR_NEXT_ROUND */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function gameStatusIdToJSON(object) {
  switch (object) {
    case 0 /* NOT_READY */:
      return "NOT_READY";
    case 1 /* READY_WAITING_START */:
      return "READY_WAITING_START";
    case 2 /* START_AND_INIT */:
      return "START_AND_INIT";
    case 3 /* PLAYER_SELECT_CARD */:
      return "PLAYER_SELECT_CARD";
    case 4 /* CZAR_SELECT_CARD */:
      return "CZAR_SELECT_CARD";
    case 5 /* WAITING_FOR_NEXT_ROUND */:
      return "WAITING_FOR_NEXT_ROUND";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var SeatResultCode = /* @__PURE__ */ ((SeatResultCode2) => {
  SeatResultCode2[SeatResultCode2["SEAT_SUCCESS"] = 0] = "SEAT_SUCCESS";
  SeatResultCode2[SeatResultCode2["SEAT_FAIL"] = 1] = "SEAT_FAIL";
  SeatResultCode2[SeatResultCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return SeatResultCode2;
})(SeatResultCode || {});
function seatResultCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "SEAT_SUCCESS":
      return 0 /* SEAT_SUCCESS */;
    case 1:
    case "SEAT_FAIL":
      return 1 /* SEAT_FAIL */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function seatResultCodeToJSON(object) {
  switch (object) {
    case 0 /* SEAT_SUCCESS */:
      return "SEAT_SUCCESS";
    case 1 /* SEAT_FAIL */:
      return "SEAT_FAIL";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var SeatStatus = /* @__PURE__ */ ((SeatStatus2) => {
  SeatStatus2[SeatStatus2["FREE"] = 0] = "FREE";
  SeatStatus2[SeatStatus2["NOT_FREE"] = 1] = "NOT_FREE";
  SeatStatus2[SeatStatus2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return SeatStatus2;
})(SeatStatus || {});
function seatStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "FREE":
      return 0 /* FREE */;
    case 1:
    case "NOT_FREE":
      return 1 /* NOT_FREE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function seatStatusToJSON(object) {
  switch (object) {
    case 0 /* FREE */:
      return "FREE";
    case 1 /* NOT_FREE */:
      return "NOT_FREE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var Role = /* @__PURE__ */ ((Role2) => {
  Role2[Role2["CZAR"] = 0] = "CZAR";
  Role2[Role2["PLAYER"] = 1] = "PLAYER";
  Role2[Role2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return Role2;
})(Role || {});
function roleFromJSON(object) {
  switch (object) {
    case 0:
    case "CZAR":
      return 0 /* CZAR */;
    case 1:
    case "PLAYER":
      return 1 /* PLAYER */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function roleToJSON(object) {
  switch (object) {
    case 0 /* CZAR */:
      return "CZAR";
    case 1 /* PLAYER */:
      return "PLAYER";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var CardType = /* @__PURE__ */ ((CardType2) => {
  CardType2[CardType2["BLACK"] = 0] = "BLACK";
  CardType2[CardType2["WHITE"] = 1] = "WHITE";
  CardType2[CardType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return CardType2;
})(CardType || {});
function cardTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "BLACK":
      return 0 /* BLACK */;
    case 1:
    case "WHITE":
      return 1 /* WHITE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function cardTypeToJSON(object) {
  switch (object) {
    case 0 /* BLACK */:
      return "BLACK";
    case 1 /* WHITE */:
      return "WHITE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var SofaResultCode = /* @__PURE__ */ ((SofaResultCode2) => {
  SofaResultCode2[SofaResultCode2["SOFA_SUCCESS"] = 0] = "SOFA_SUCCESS";
  SofaResultCode2[SofaResultCode2["SOFA_FAIL"] = 1] = "SOFA_FAIL";
  SofaResultCode2[SofaResultCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return SofaResultCode2;
})(SofaResultCode || {});
function sofaResultCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "SOFA_SUCCESS":
      return 0 /* SOFA_SUCCESS */;
    case 1:
    case "SOFA_FAIL":
      return 1 /* SOFA_FAIL */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function sofaResultCodeToJSON(object) {
  switch (object) {
    case 0 /* SOFA_SUCCESS */:
      return "SOFA_SUCCESS";
    case 1 /* SOFA_FAIL */:
      return "SOFA_FAIL";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var SofaStatus = /* @__PURE__ */ ((SofaStatus2) => {
  SofaStatus2[SofaStatus2["SOFA_FREE"] = 0] = "SOFA_FREE";
  SofaStatus2[SofaStatus2["SOFA_NOT_FREE"] = 1] = "SOFA_NOT_FREE";
  SofaStatus2[SofaStatus2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return SofaStatus2;
})(SofaStatus || {});
function sofaStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "SOFA_FREE":
      return 0 /* SOFA_FREE */;
    case 1:
    case "SOFA_NOT_FREE":
      return 1 /* SOFA_NOT_FREE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function sofaStatusToJSON(object) {
  switch (object) {
    case 0 /* SOFA_FREE */:
      return "SOFA_FREE";
    case 1 /* SOFA_NOT_FREE */:
      return "SOFA_NOT_FREE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var VoiceErrorCode = /* @__PURE__ */ ((VoiceErrorCode2) => {
  VoiceErrorCode2[VoiceErrorCode2["VOICE_SUCCESS"] = 0] = "VOICE_SUCCESS";
  VoiceErrorCode2[VoiceErrorCode2["VOICE_FAILED"] = 1] = "VOICE_FAILED";
  VoiceErrorCode2[VoiceErrorCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return VoiceErrorCode2;
})(VoiceErrorCode || {});
function voiceErrorCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "VOICE_SUCCESS":
      return 0 /* VOICE_SUCCESS */;
    case 1:
    case "VOICE_FAILED":
      return 1 /* VOICE_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function voiceErrorCodeToJSON(object) {
  switch (object) {
    case 0 /* VOICE_SUCCESS */:
      return "VOICE_SUCCESS";
    case 1 /* VOICE_FAILED */:
      return "VOICE_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var ForceNextRoundResultCode = /* @__PURE__ */ ((ForceNextRoundResultCode2) => {
  ForceNextRoundResultCode2[ForceNextRoundResultCode2["NEXT_ROUND_SUCCESS"] = 0] = "NEXT_ROUND_SUCCESS";
  ForceNextRoundResultCode2[ForceNextRoundResultCode2["NEXT_ROUND_FAILED"] = 1] = "NEXT_ROUND_FAILED";
  ForceNextRoundResultCode2[ForceNextRoundResultCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return ForceNextRoundResultCode2;
})(ForceNextRoundResultCode || {});
function forceNextRoundResultCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "NEXT_ROUND_SUCCESS":
      return 0 /* NEXT_ROUND_SUCCESS */;
    case 1:
    case "NEXT_ROUND_FAILED":
      return 1 /* NEXT_ROUND_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function forceNextRoundResultCodeToJSON(object) {
  switch (object) {
    case 0 /* NEXT_ROUND_SUCCESS */:
      return "NEXT_ROUND_SUCCESS";
    case 1 /* NEXT_ROUND_FAILED */:
      return "NEXT_ROUND_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var CreateRoomErrorCode = /* @__PURE__ */ ((CreateRoomErrorCode2) => {
  CreateRoomErrorCode2[CreateRoomErrorCode2["CREATE_SUCCESS"] = 0] = "CREATE_SUCCESS";
  CreateRoomErrorCode2[CreateRoomErrorCode2["CREATE_FAILED"] = 1] = "CREATE_FAILED";
  CreateRoomErrorCode2[CreateRoomErrorCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return CreateRoomErrorCode2;
})(CreateRoomErrorCode || {});
function createRoomErrorCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "CREATE_SUCCESS":
      return 0 /* CREATE_SUCCESS */;
    case 1:
    case "CREATE_FAILED":
      return 1 /* CREATE_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function createRoomErrorCodeToJSON(object) {
  switch (object) {
    case 0 /* CREATE_SUCCESS */:
      return "CREATE_SUCCESS";
    case 1 /* CREATE_FAILED */:
      return "CREATE_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var RoomPermissiion = /* @__PURE__ */ ((RoomPermissiion2) => {
  RoomPermissiion2[RoomPermissiion2["PRIVATE"] = 0] = "PRIVATE";
  RoomPermissiion2[RoomPermissiion2["PUBLIC"] = 1] = "PUBLIC";
  RoomPermissiion2[RoomPermissiion2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return RoomPermissiion2;
})(RoomPermissiion || {});
function roomPermissiionFromJSON(object) {
  switch (object) {
    case 0:
    case "PRIVATE":
      return 0 /* PRIVATE */;
    case 1:
    case "PUBLIC":
      return 1 /* PUBLIC */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function roomPermissiionToJSON(object) {
  switch (object) {
    case 0 /* PRIVATE */:
      return "PRIVATE";
    case 1 /* PUBLIC */:
      return "PUBLIC";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var KickErrorCode = /* @__PURE__ */ ((KickErrorCode2) => {
  KickErrorCode2[KickErrorCode2["KICK_SUCCESS"] = 0] = "KICK_SUCCESS";
  KickErrorCode2[KickErrorCode2["KICK_FAILED"] = 1] = "KICK_FAILED";
  KickErrorCode2[KickErrorCode2["KICK_FAILED_PLAYER_NOT_EXISTS"] = 2] = "KICK_FAILED_PLAYER_NOT_EXISTS";
  KickErrorCode2[KickErrorCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return KickErrorCode2;
})(KickErrorCode || {});
function kickErrorCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "KICK_SUCCESS":
      return 0 /* KICK_SUCCESS */;
    case 1:
    case "KICK_FAILED":
      return 1 /* KICK_FAILED */;
    case 2:
    case "KICK_FAILED_PLAYER_NOT_EXISTS":
      return 2 /* KICK_FAILED_PLAYER_NOT_EXISTS */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function kickErrorCodeToJSON(object) {
  switch (object) {
    case 0 /* KICK_SUCCESS */:
      return "KICK_SUCCESS";
    case 1 /* KICK_FAILED */:
      return "KICK_FAILED";
    case 2 /* KICK_FAILED_PLAYER_NOT_EXISTS */:
      return "KICK_FAILED_PLAYER_NOT_EXISTS";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var ReAnchorErrorCode = /* @__PURE__ */ ((ReAnchorErrorCode2) => {
  ReAnchorErrorCode2[ReAnchorErrorCode2["REANCHOR_SUCCESS"] = 0] = "REANCHOR_SUCCESS";
  ReAnchorErrorCode2[ReAnchorErrorCode2["REANCHOR_FAILED"] = 1] = "REANCHOR_FAILED";
  ReAnchorErrorCode2[ReAnchorErrorCode2["REANCHOR_FAILED_ENCOUNTER_MISS"] = 2] = "REANCHOR_FAILED_ENCOUNTER_MISS";
  ReAnchorErrorCode2[ReAnchorErrorCode2["REANCHOR_FAILED_NO_OTHER_PLAYER"] = 3] = "REANCHOR_FAILED_NO_OTHER_PLAYER";
  ReAnchorErrorCode2[ReAnchorErrorCode2["REANCHOR_FAILED_NOT_ANCHOR"] = 4] = "REANCHOR_FAILED_NOT_ANCHOR";
  ReAnchorErrorCode2[ReAnchorErrorCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return ReAnchorErrorCode2;
})(ReAnchorErrorCode || {});
function reAnchorErrorCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "REANCHOR_SUCCESS":
      return 0 /* REANCHOR_SUCCESS */;
    case 1:
    case "REANCHOR_FAILED":
      return 1 /* REANCHOR_FAILED */;
    case 2:
    case "REANCHOR_FAILED_ENCOUNTER_MISS":
      return 2 /* REANCHOR_FAILED_ENCOUNTER_MISS */;
    case 3:
    case "REANCHOR_FAILED_NO_OTHER_PLAYER":
      return 3 /* REANCHOR_FAILED_NO_OTHER_PLAYER */;
    case 4:
    case "REANCHOR_FAILED_NOT_ANCHOR":
      return 4 /* REANCHOR_FAILED_NOT_ANCHOR */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function reAnchorErrorCodeToJSON(object) {
  switch (object) {
    case 0 /* REANCHOR_SUCCESS */:
      return "REANCHOR_SUCCESS";
    case 1 /* REANCHOR_FAILED */:
      return "REANCHOR_FAILED";
    case 2 /* REANCHOR_FAILED_ENCOUNTER_MISS */:
      return "REANCHOR_FAILED_ENCOUNTER_MISS";
    case 3 /* REANCHOR_FAILED_NO_OTHER_PLAYER */:
      return "REANCHOR_FAILED_NO_OTHER_PLAYER";
    case 4 /* REANCHOR_FAILED_NOT_ANCHOR */:
      return "REANCHOR_FAILED_NOT_ANCHOR";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var FollowNotifyResult = /* @__PURE__ */ ((FollowNotifyResult2) => {
  FollowNotifyResult2[FollowNotifyResult2["FOLLOW_SUCCESS"] = 0] = "FOLLOW_SUCCESS";
  FollowNotifyResult2[FollowNotifyResult2["FOLLOW_FAILED"] = 1] = "FOLLOW_FAILED";
  FollowNotifyResult2[FollowNotifyResult2["FOLLOW_FAILED_USER_NOT_IN_ROOM"] = 2] = "FOLLOW_FAILED_USER_NOT_IN_ROOM";
  FollowNotifyResult2[FollowNotifyResult2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return FollowNotifyResult2;
})(FollowNotifyResult || {});
function followNotifyResultFromJSON(object) {
  switch (object) {
    case 0:
    case "FOLLOW_SUCCESS":
      return 0 /* FOLLOW_SUCCESS */;
    case 1:
    case "FOLLOW_FAILED":
      return 1 /* FOLLOW_FAILED */;
    case 2:
    case "FOLLOW_FAILED_USER_NOT_IN_ROOM":
      return 2 /* FOLLOW_FAILED_USER_NOT_IN_ROOM */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function followNotifyResultToJSON(object) {
  switch (object) {
    case 0 /* FOLLOW_SUCCESS */:
      return "FOLLOW_SUCCESS";
    case 1 /* FOLLOW_FAILED */:
      return "FOLLOW_FAILED";
    case 2 /* FOLLOW_FAILED_USER_NOT_IN_ROOM */:
      return "FOLLOW_FAILED_USER_NOT_IN_ROOM";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var MMOStatus = /* @__PURE__ */ ((MMOStatus2) => {
  MMOStatus2[MMOStatus2["MMO_NORMAL"] = 0] = "MMO_NORMAL";
  MMOStatus2[MMOStatus2["MMO_UI"] = 1] = "MMO_UI";
  MMOStatus2[MMOStatus2["MMO_BACKGROUND"] = 2] = "MMO_BACKGROUND";
  MMOStatus2[MMOStatus2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return MMOStatus2;
})(MMOStatus || {});
function mMOStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "MMO_NORMAL":
      return 0 /* MMO_NORMAL */;
    case 1:
    case "MMO_UI":
      return 1 /* MMO_UI */;
    case 2:
    case "MMO_BACKGROUND":
      return 2 /* MMO_BACKGROUND */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function mMOStatusToJSON(object) {
  switch (object) {
    case 0 /* MMO_NORMAL */:
      return "MMO_NORMAL";
    case 1 /* MMO_UI */:
      return "MMO_UI";
    case 2 /* MMO_BACKGROUND */:
      return "MMO_BACKGROUND";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var StatEncounterErrorCode = /* @__PURE__ */ ((StatEncounterErrorCode2) => {
  StatEncounterErrorCode2[StatEncounterErrorCode2["STAT_ENCOUNTER_SUCCESS"] = 0] = "STAT_ENCOUNTER_SUCCESS";
  StatEncounterErrorCode2[StatEncounterErrorCode2["STAT_ENCOUNTER_FAILED"] = 1] = "STAT_ENCOUNTER_FAILED";
  StatEncounterErrorCode2[StatEncounterErrorCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return StatEncounterErrorCode2;
})(StatEncounterErrorCode || {});
function statEncounterErrorCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "STAT_ENCOUNTER_SUCCESS":
      return 0 /* STAT_ENCOUNTER_SUCCESS */;
    case 1:
    case "STAT_ENCOUNTER_FAILED":
      return 1 /* STAT_ENCOUNTER_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function statEncounterErrorCodeToJSON(object) {
  switch (object) {
    case 0 /* STAT_ENCOUNTER_SUCCESS */:
      return "STAT_ENCOUNTER_SUCCESS";
    case 1 /* STAT_ENCOUNTER_FAILED */:
      return "STAT_ENCOUNTER_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var StatType = /* @__PURE__ */ ((StatType2) => {
  StatType2[StatType2["STAT_DEFAULT"] = 0] = "STAT_DEFAULT";
  StatType2[StatType2["STAT_ENCOUNTER_WATCH"] = 1] = "STAT_ENCOUNTER_WATCH";
  StatType2[StatType2["STAT_ENCOUNTER_UNWATCH"] = 2] = "STAT_ENCOUNTER_UNWATCH";
  StatType2[StatType2["STAT_ENCOUNTER_SPEAK_TIME"] = 3] = "STAT_ENCOUNTER_SPEAK_TIME";
  StatType2[StatType2["STAT_ENCOUNTER_UNMUTE"] = 4] = "STAT_ENCOUNTER_UNMUTE";
  StatType2[StatType2["STAT_ENCOUNTER_FOLLOW"] = 5] = "STAT_ENCOUNTER_FOLLOW";
  StatType2[StatType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return StatType2;
})(StatType || {});
function statTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "STAT_DEFAULT":
      return 0 /* STAT_DEFAULT */;
    case 1:
    case "STAT_ENCOUNTER_WATCH":
      return 1 /* STAT_ENCOUNTER_WATCH */;
    case 2:
    case "STAT_ENCOUNTER_UNWATCH":
      return 2 /* STAT_ENCOUNTER_UNWATCH */;
    case 3:
    case "STAT_ENCOUNTER_SPEAK_TIME":
      return 3 /* STAT_ENCOUNTER_SPEAK_TIME */;
    case 4:
    case "STAT_ENCOUNTER_UNMUTE":
      return 4 /* STAT_ENCOUNTER_UNMUTE */;
    case 5:
    case "STAT_ENCOUNTER_FOLLOW":
      return 5 /* STAT_ENCOUNTER_FOLLOW */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function statTypeToJSON(object) {
  switch (object) {
    case 0 /* STAT_DEFAULT */:
      return "STAT_DEFAULT";
    case 1 /* STAT_ENCOUNTER_WATCH */:
      return "STAT_ENCOUNTER_WATCH";
    case 2 /* STAT_ENCOUNTER_UNWATCH */:
      return "STAT_ENCOUNTER_UNWATCH";
    case 3 /* STAT_ENCOUNTER_SPEAK_TIME */:
      return "STAT_ENCOUNTER_SPEAK_TIME";
    case 4 /* STAT_ENCOUNTER_UNMUTE */:
      return "STAT_ENCOUNTER_UNMUTE";
    case 5 /* STAT_ENCOUNTER_FOLLOW */:
      return "STAT_ENCOUNTER_FOLLOW";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var SyncChatResultCode = /* @__PURE__ */ ((SyncChatResultCode2) => {
  SyncChatResultCode2[SyncChatResultCode2["SYNC_CHAT_SUCCESS"] = 0] = "SYNC_CHAT_SUCCESS";
  SyncChatResultCode2[SyncChatResultCode2["SYNC_CHAT_FAILED"] = 10] = "SYNC_CHAT_FAILED";
  SyncChatResultCode2[SyncChatResultCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return SyncChatResultCode2;
})(SyncChatResultCode || {});
function syncChatResultCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "SYNC_CHAT_SUCCESS":
      return 0 /* SYNC_CHAT_SUCCESS */;
    case 10:
    case "SYNC_CHAT_FAILED":
      return 10 /* SYNC_CHAT_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function syncChatResultCodeToJSON(object) {
  switch (object) {
    case 0 /* SYNC_CHAT_SUCCESS */:
      return "SYNC_CHAT_SUCCESS";
    case 10 /* SYNC_CHAT_FAILED */:
      return "SYNC_CHAT_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var MatchFilterType = /* @__PURE__ */ ((MatchFilterType2) => {
  MatchFilterType2[MatchFilterType2["MATCH_FILTER_TYPE_DEFAULT"] = 0] = "MATCH_FILTER_TYPE_DEFAULT";
  MatchFilterType2[MatchFilterType2["MATCH_FILTER_TYPE_FEMALE"] = 1] = "MATCH_FILTER_TYPE_FEMALE";
  MatchFilterType2[MatchFilterType2["MATCH_FILTER_TYPE_MALE"] = 2] = "MATCH_FILTER_TYPE_MALE";
  MatchFilterType2[MatchFilterType2["MATCH_FILTER_TYPE_EVERYONE"] = 3] = "MATCH_FILTER_TYPE_EVERYONE";
  MatchFilterType2[MatchFilterType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return MatchFilterType2;
})(MatchFilterType || {});
function matchFilterTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "MATCH_FILTER_TYPE_DEFAULT":
      return 0 /* MATCH_FILTER_TYPE_DEFAULT */;
    case 1:
    case "MATCH_FILTER_TYPE_FEMALE":
      return 1 /* MATCH_FILTER_TYPE_FEMALE */;
    case 2:
    case "MATCH_FILTER_TYPE_MALE":
      return 2 /* MATCH_FILTER_TYPE_MALE */;
    case 3:
    case "MATCH_FILTER_TYPE_EVERYONE":
      return 3 /* MATCH_FILTER_TYPE_EVERYONE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function matchFilterTypeToJSON(object) {
  switch (object) {
    case 0 /* MATCH_FILTER_TYPE_DEFAULT */:
      return "MATCH_FILTER_TYPE_DEFAULT";
    case 1 /* MATCH_FILTER_TYPE_FEMALE */:
      return "MATCH_FILTER_TYPE_FEMALE";
    case 2 /* MATCH_FILTER_TYPE_MALE */:
      return "MATCH_FILTER_TYPE_MALE";
    case 3 /* MATCH_FILTER_TYPE_EVERYONE */:
      return "MATCH_FILTER_TYPE_EVERYONE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var StartMatchResultCode = /* @__PURE__ */ ((StartMatchResultCode2) => {
  StartMatchResultCode2[StartMatchResultCode2["MATCH_SUCCESS"] = 0] = "MATCH_SUCCESS";
  StartMatchResultCode2[StartMatchResultCode2["MATCH_FAILED"] = 10] = "MATCH_FAILED";
  StartMatchResultCode2[StartMatchResultCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return StartMatchResultCode2;
})(StartMatchResultCode || {});
function startMatchResultCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "MATCH_SUCCESS":
      return 0 /* MATCH_SUCCESS */;
    case 10:
    case "MATCH_FAILED":
      return 10 /* MATCH_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function startMatchResultCodeToJSON(object) {
  switch (object) {
    case 0 /* MATCH_SUCCESS */:
      return "MATCH_SUCCESS";
    case 10 /* MATCH_FAILED */:
      return "MATCH_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var CancelMatchResultCode = /* @__PURE__ */ ((CancelMatchResultCode2) => {
  CancelMatchResultCode2[CancelMatchResultCode2["CANCEL_MATCH_SUCCESS"] = 0] = "CANCEL_MATCH_SUCCESS";
  CancelMatchResultCode2[CancelMatchResultCode2["CANCEL_MATCH_FAILED"] = 10] = "CANCEL_MATCH_FAILED";
  CancelMatchResultCode2[CancelMatchResultCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return CancelMatchResultCode2;
})(CancelMatchResultCode || {});
function cancelMatchResultCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "CANCEL_MATCH_SUCCESS":
      return 0 /* CANCEL_MATCH_SUCCESS */;
    case 10:
    case "CANCEL_MATCH_FAILED":
      return 10 /* CANCEL_MATCH_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function cancelMatchResultCodeToJSON(object) {
  switch (object) {
    case 0 /* CANCEL_MATCH_SUCCESS */:
      return "CANCEL_MATCH_SUCCESS";
    case 10 /* CANCEL_MATCH_FAILED */:
      return "CANCEL_MATCH_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var InviteJoinRoomErrorCode = /* @__PURE__ */ ((InviteJoinRoomErrorCode2) => {
  InviteJoinRoomErrorCode2[InviteJoinRoomErrorCode2["INVITE_JOIN_ROOM_SUCCESS"] = 0] = "INVITE_JOIN_ROOM_SUCCESS";
  InviteJoinRoomErrorCode2[InviteJoinRoomErrorCode2["INVITE_JOIN_ROOM_FAILED"] = 10] = "INVITE_JOIN_ROOM_FAILED";
  InviteJoinRoomErrorCode2[InviteJoinRoomErrorCode2["INVITE_JOIN_ROOM_FAILED_RETRY"] = 11] = "INVITE_JOIN_ROOM_FAILED_RETRY";
  InviteJoinRoomErrorCode2[InviteJoinRoomErrorCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return InviteJoinRoomErrorCode2;
})(InviteJoinRoomErrorCode || {});
function inviteJoinRoomErrorCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "INVITE_JOIN_ROOM_SUCCESS":
      return 0 /* INVITE_JOIN_ROOM_SUCCESS */;
    case 10:
    case "INVITE_JOIN_ROOM_FAILED":
      return 10 /* INVITE_JOIN_ROOM_FAILED */;
    case 11:
    case "INVITE_JOIN_ROOM_FAILED_RETRY":
      return 11 /* INVITE_JOIN_ROOM_FAILED_RETRY */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function inviteJoinRoomErrorCodeToJSON(object) {
  switch (object) {
    case 0 /* INVITE_JOIN_ROOM_SUCCESS */:
      return "INVITE_JOIN_ROOM_SUCCESS";
    case 10 /* INVITE_JOIN_ROOM_FAILED */:
      return "INVITE_JOIN_ROOM_FAILED";
    case 11 /* INVITE_JOIN_ROOM_FAILED_RETRY */:
      return "INVITE_JOIN_ROOM_FAILED_RETRY";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var InviteRoomStatus = /* @__PURE__ */ ((InviteRoomStatus2) => {
  InviteRoomStatus2[InviteRoomStatus2["INVITE_ROOM_IN_ACTIVE"] = 0] = "INVITE_ROOM_IN_ACTIVE";
  InviteRoomStatus2[InviteRoomStatus2["INVITE_ROOM_ACTIVE"] = 1] = "INVITE_ROOM_ACTIVE";
  InviteRoomStatus2[InviteRoomStatus2["INVITE_ROOM_END"] = 2] = "INVITE_ROOM_END";
  InviteRoomStatus2[InviteRoomStatus2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return InviteRoomStatus2;
})(InviteRoomStatus || {});
function inviteRoomStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "INVITE_ROOM_IN_ACTIVE":
      return 0 /* INVITE_ROOM_IN_ACTIVE */;
    case 1:
    case "INVITE_ROOM_ACTIVE":
      return 1 /* INVITE_ROOM_ACTIVE */;
    case 2:
    case "INVITE_ROOM_END":
      return 2 /* INVITE_ROOM_END */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function inviteRoomStatusToJSON(object) {
  switch (object) {
    case 0 /* INVITE_ROOM_IN_ACTIVE */:
      return "INVITE_ROOM_IN_ACTIVE";
    case 1 /* INVITE_ROOM_ACTIVE */:
      return "INVITE_ROOM_ACTIVE";
    case 2 /* INVITE_ROOM_END */:
      return "INVITE_ROOM_END";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var UpdateRoomInfoErrorCode = /* @__PURE__ */ ((UpdateRoomInfoErrorCode2) => {
  UpdateRoomInfoErrorCode2[UpdateRoomInfoErrorCode2["UPDATE_ROOM_INFO_SUCCESS"] = 0] = "UPDATE_ROOM_INFO_SUCCESS";
  UpdateRoomInfoErrorCode2[UpdateRoomInfoErrorCode2["UPDATE_ROOM_INFO_FAILED"] = 10] = "UPDATE_ROOM_INFO_FAILED";
  UpdateRoomInfoErrorCode2[UpdateRoomInfoErrorCode2["UPDATE_ROOM_INFO_NOT_OWNER"] = 11] = "UPDATE_ROOM_INFO_NOT_OWNER";
  UpdateRoomInfoErrorCode2[UpdateRoomInfoErrorCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return UpdateRoomInfoErrorCode2;
})(UpdateRoomInfoErrorCode || {});
function updateRoomInfoErrorCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "UPDATE_ROOM_INFO_SUCCESS":
      return 0 /* UPDATE_ROOM_INFO_SUCCESS */;
    case 10:
    case "UPDATE_ROOM_INFO_FAILED":
      return 10 /* UPDATE_ROOM_INFO_FAILED */;
    case 11:
    case "UPDATE_ROOM_INFO_NOT_OWNER":
      return 11 /* UPDATE_ROOM_INFO_NOT_OWNER */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function updateRoomInfoErrorCodeToJSON(object) {
  switch (object) {
    case 0 /* UPDATE_ROOM_INFO_SUCCESS */:
      return "UPDATE_ROOM_INFO_SUCCESS";
    case 10 /* UPDATE_ROOM_INFO_FAILED */:
      return "UPDATE_ROOM_INFO_FAILED";
    case 11 /* UPDATE_ROOM_INFO_NOT_OWNER */:
      return "UPDATE_ROOM_INFO_NOT_OWNER";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var FilterTypeErrorCode = /* @__PURE__ */ ((FilterTypeErrorCode2) => {
  FilterTypeErrorCode2[FilterTypeErrorCode2["UPDATE_FILTER_TYPE_SUCCESS"] = 0] = "UPDATE_FILTER_TYPE_SUCCESS";
  FilterTypeErrorCode2[FilterTypeErrorCode2["UPDATE_FILTER_TYPE_FAILED"] = 10] = "UPDATE_FILTER_TYPE_FAILED";
  FilterTypeErrorCode2[FilterTypeErrorCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return FilterTypeErrorCode2;
})(FilterTypeErrorCode || {});
function filterTypeErrorCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "UPDATE_FILTER_TYPE_SUCCESS":
      return 0 /* UPDATE_FILTER_TYPE_SUCCESS */;
    case 10:
    case "UPDATE_FILTER_TYPE_FAILED":
      return 10 /* UPDATE_FILTER_TYPE_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function filterTypeErrorCodeToJSON(object) {
  switch (object) {
    case 0 /* UPDATE_FILTER_TYPE_SUCCESS */:
      return "UPDATE_FILTER_TYPE_SUCCESS";
    case 10 /* UPDATE_FILTER_TYPE_FAILED */:
      return "UPDATE_FILTER_TYPE_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseUserInfo() {
  return { userId: 0, userName: "", userGender: 0, avatarUrl: "", avatarId: "", mmoStatus: 0, firstAvatarId: "" };
}
const UserInfo = {
  $type: "Room.UserInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.userName !== void 0 && message.userName !== "") {
      writer.uint32(18).string(message.userName);
    }
    if (message.userGender !== void 0 && message.userGender !== 0) {
      writer.uint32(24).int32(message.userGender);
    }
    if (message.avatarUrl !== void 0 && message.avatarUrl !== "") {
      writer.uint32(34).string(message.avatarUrl);
    }
    if (message.avatarId !== void 0 && message.avatarId !== "") {
      writer.uint32(42).string(message.avatarId);
    }
    if (message.mmoStatus !== void 0 && message.mmoStatus !== 0) {
      writer.uint32(48).int32(message.mmoStatus);
    }
    if (message.firstAvatarId !== void 0 && message.firstAvatarId !== "") {
      writer.uint32(58).string(message.firstAvatarId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUserInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.userId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.userName = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.userGender = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.avatarUrl = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.avatarId = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.mmoStatus = reader.int32();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }
          message.firstAvatarId = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : 0,
      userName: isSet(object.userName) ? globalThis.String(object.userName) : "",
      userGender: isSet(object.userGender) ? globalThis.Number(object.userGender) : 0,
      avatarUrl: isSet(object.avatarUrl) ? globalThis.String(object.avatarUrl) : "",
      avatarId: isSet(object.avatarId) ? globalThis.String(object.avatarId) : isSet(object.avatar_id) ? globalThis.String(object.avatar_id) : "",
      mmoStatus: isSet(object.mmoStatus) ? mMOStatusFromJSON(object.mmoStatus) : 0,
      firstAvatarId: isSet(object.firstAvatarId) ? globalThis.String(object.firstAvatarId) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.userName !== void 0 && message.userName !== "") {
      obj.userName = message.userName;
    }
    if (message.userGender !== void 0 && message.userGender !== 0) {
      obj.userGender = Math.round(message.userGender);
    }
    if (message.avatarUrl !== void 0 && message.avatarUrl !== "") {
      obj.avatarUrl = message.avatarUrl;
    }
    if (message.avatarId !== void 0 && message.avatarId !== "") {
      obj.avatarId = message.avatarId;
    }
    if (message.mmoStatus !== void 0 && message.mmoStatus !== 0) {
      obj.mmoStatus = mMOStatusToJSON(message.mmoStatus);
    }
    if (message.firstAvatarId !== void 0 && message.firstAvatarId !== "") {
      obj.firstAvatarId = message.firstAvatarId;
    }
    return obj;
  },
  create(base) {
    return UserInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUserInfo();
    message.userId = object.userId ?? 0;
    message.userName = object.userName ?? "";
    message.userGender = object.userGender ?? 0;
    message.avatarUrl = object.avatarUrl ?? "";
    message.avatarId = object.avatarId ?? "";
    message.mmoStatus = object.mmoStatus ?? 0;
    message.firstAvatarId = object.firstAvatarId ?? "";
    return message;
  }
};
function createBaseUserStatus() {
  return { userId: 0, userPosX: 0, userPosY: 0, userPosZ: 0, userRotX: 0, userRotY: 0, userRotZ: 0 };
}
const UserStatus = {
  $type: "Room.UserStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.userPosX !== void 0 && message.userPosX !== 0) {
      writer.uint32(16).int32(message.userPosX);
    }
    if (message.userPosY !== void 0 && message.userPosY !== 0) {
      writer.uint32(24).int32(message.userPosY);
    }
    if (message.userPosZ !== void 0 && message.userPosZ !== 0) {
      writer.uint32(32).int32(message.userPosZ);
    }
    if (message.userRotX !== void 0 && message.userRotX !== 0) {
      writer.uint32(40).int32(message.userRotX);
    }
    if (message.userRotY !== void 0 && message.userRotY !== 0) {
      writer.uint32(48).int32(message.userRotY);
    }
    if (message.userRotZ !== void 0 && message.userRotZ !== 0) {
      writer.uint32(56).int32(message.userRotZ);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUserStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.userId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.userPosX = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.userPosY = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.userPosZ = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.userRotX = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.userRotY = reader.int32();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.userRotZ = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : 0,
      userPosX: isSet(object.userPosX) ? globalThis.Number(object.userPosX) : 0,
      userPosY: isSet(object.userPosY) ? globalThis.Number(object.userPosY) : 0,
      userPosZ: isSet(object.userPosZ) ? globalThis.Number(object.userPosZ) : 0,
      userRotX: isSet(object.userRotX) ? globalThis.Number(object.userRotX) : 0,
      userRotY: isSet(object.userRotY) ? globalThis.Number(object.userRotY) : 0,
      userRotZ: isSet(object.userRotZ) ? globalThis.Number(object.userRotZ) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.userPosX !== void 0 && message.userPosX !== 0) {
      obj.userPosX = Math.round(message.userPosX);
    }
    if (message.userPosY !== void 0 && message.userPosY !== 0) {
      obj.userPosY = Math.round(message.userPosY);
    }
    if (message.userPosZ !== void 0 && message.userPosZ !== 0) {
      obj.userPosZ = Math.round(message.userPosZ);
    }
    if (message.userRotX !== void 0 && message.userRotX !== 0) {
      obj.userRotX = Math.round(message.userRotX);
    }
    if (message.userRotY !== void 0 && message.userRotY !== 0) {
      obj.userRotY = Math.round(message.userRotY);
    }
    if (message.userRotZ !== void 0 && message.userRotZ !== 0) {
      obj.userRotZ = Math.round(message.userRotZ);
    }
    return obj;
  },
  create(base) {
    return UserStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUserStatus();
    message.userId = object.userId ?? 0;
    message.userPosX = object.userPosX ?? 0;
    message.userPosY = object.userPosY ?? 0;
    message.userPosZ = object.userPosZ ?? 0;
    message.userRotX = object.userRotX ?? 0;
    message.userRotY = object.userRotY ?? 0;
    message.userRotZ = object.userRotZ ?? 0;
    return message;
  }
};
function createBasePhoneInfo() {
  return { platform: 0 };
}
const PhoneInfo = {
  $type: "Room.PhoneInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.platform !== void 0 && message.platform !== 0) {
      writer.uint32(8).int32(message.platform);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePhoneInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.platform = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { platform: isSet(object.platform) ? platformFromJSON(object.platform) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.platform !== void 0 && message.platform !== 0) {
      obj.platform = platformToJSON(message.platform);
    }
    return obj;
  },
  create(base) {
    return PhoneInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePhoneInfo();
    message.platform = object.platform ?? 0;
    return message;
  }
};
function createBaseC2SEnterRoom() {
  return {
    playerId: 0,
    roomId: 0,
    user: void 0,
    userInfo: void 0,
    phoneInfo: void 0,
    encounterId: "",
    friendId: 0,
    inviteToken: 0
  };
}
const C2SEnterRoom = {
  $type: "Room.C2SEnterRoom",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    if (message.roomId !== void 0 && message.roomId !== 0) {
      writer.uint32(16).int32(message.roomId);
    }
    if (message.user !== void 0) {
      UserStatus.encode(message.user, writer.uint32(26).fork()).join();
    }
    if (message.userInfo !== void 0) {
      UserInfo.encode(message.userInfo, writer.uint32(34).fork()).join();
    }
    if (message.phoneInfo !== void 0) {
      PhoneInfo.encode(message.phoneInfo, writer.uint32(42).fork()).join();
    }
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      writer.uint32(50).string(message.encounterId);
    }
    if (message.friendId !== void 0 && message.friendId !== 0) {
      writer.uint32(56).int32(message.friendId);
    }
    if (message.inviteToken !== void 0 && message.inviteToken !== 0) {
      writer.uint32(64).int32(message.inviteToken);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SEnterRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.roomId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.user = UserStatus.decode(reader, reader.uint32());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.userInfo = UserInfo.decode(reader, reader.uint32());
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.phoneInfo = PhoneInfo.decode(reader, reader.uint32());
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.encounterId = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.friendId = reader.int32();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }
          message.inviteToken = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      roomId: isSet(object.roomId) ? globalThis.Number(object.roomId) : 0,
      user: isSet(object.user) ? UserStatus.fromJSON(object.user) : void 0,
      userInfo: isSet(object.userInfo) ? UserInfo.fromJSON(object.userInfo) : void 0,
      phoneInfo: isSet(object.phoneInfo) ? PhoneInfo.fromJSON(object.phoneInfo) : void 0,
      encounterId: isSet(object.encounterId) ? globalThis.String(object.encounterId) : "",
      friendId: isSet(object.friendId) ? globalThis.Number(object.friendId) : 0,
      inviteToken: isSet(object.inviteToken) ? globalThis.Number(object.inviteToken) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.roomId !== void 0 && message.roomId !== 0) {
      obj.roomId = Math.round(message.roomId);
    }
    if (message.user !== void 0) {
      obj.user = UserStatus.toJSON(message.user);
    }
    if (message.userInfo !== void 0) {
      obj.userInfo = UserInfo.toJSON(message.userInfo);
    }
    if (message.phoneInfo !== void 0) {
      obj.phoneInfo = PhoneInfo.toJSON(message.phoneInfo);
    }
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      obj.encounterId = message.encounterId;
    }
    if (message.friendId !== void 0 && message.friendId !== 0) {
      obj.friendId = Math.round(message.friendId);
    }
    if (message.inviteToken !== void 0 && message.inviteToken !== 0) {
      obj.inviteToken = Math.round(message.inviteToken);
    }
    return obj;
  },
  create(base) {
    return C2SEnterRoom.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SEnterRoom();
    message.playerId = object.playerId ?? 0;
    message.roomId = object.roomId ?? 0;
    message.user = object.user !== void 0 && object.user !== null ? UserStatus.fromPartial(object.user) : void 0;
    message.userInfo = object.userInfo !== void 0 && object.userInfo !== null ? UserInfo.fromPartial(object.userInfo) : void 0;
    message.phoneInfo = object.phoneInfo !== void 0 && object.phoneInfo !== null ? PhoneInfo.fromPartial(object.phoneInfo) : void 0;
    message.encounterId = object.encounterId ?? "";
    message.friendId = object.friendId ?? 0;
    message.inviteToken = object.inviteToken ?? 0;
    return message;
  }
};
function createBaseS2CEnterRoom() {
  return {
    result: 0,
    roomId: 0,
    userInfoList: [],
    userStatusList: [],
    seatList: [],
    sofaList: [],
    userShoulderList: [],
    roomInfo: void 0
  };
}
const S2CEnterRoom = {
  $type: "Room.S2CEnterRoom",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.roomId !== void 0 && message.roomId !== 0) {
      writer.uint32(16).int32(message.roomId);
    }
    if (message.userInfoList !== void 0 && message.userInfoList.length !== 0) {
      for (const v of message.userInfoList) {
        UserInfo.encode(v, writer.uint32(26).fork()).join();
      }
    }
    if (message.userStatusList !== void 0 && message.userStatusList.length !== 0) {
      for (const v of message.userStatusList) {
        UserStatus.encode(v, writer.uint32(34).fork()).join();
      }
    }
    if (message.seatList !== void 0 && message.seatList.length !== 0) {
      for (const v of message.seatList) {
        Seat.encode(v, writer.uint32(42).fork()).join();
      }
    }
    if (message.sofaList !== void 0 && message.sofaList.length !== 0) {
      for (const v of message.sofaList) {
        Sofa.encode(v, writer.uint32(50).fork()).join();
      }
    }
    if (message.userShoulderList !== void 0 && message.userShoulderList.length !== 0) {
      for (const v of message.userShoulderList) {
        UserStatus.encode(v, writer.uint32(58).fork()).join();
      }
    }
    if (message.roomInfo !== void 0) {
      RoomData.encode(message.roomInfo, writer.uint32(66).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CEnterRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.roomId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          const el = UserInfo.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.userInfoList.push(el);
          }
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          const el = UserStatus.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.userStatusList.push(el);
          }
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          const el = Seat.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.seatList.push(el);
          }
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          const el = Sofa.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.sofaList.push(el);
          }
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }
          const el = UserStatus.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.userShoulderList.push(el);
          }
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }
          message.roomInfo = RoomData.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? globalThis.Number(object.result) : 0,
      roomId: isSet(object.roomId) ? globalThis.Number(object.roomId) : 0,
      userInfoList: globalThis.Array.isArray(object?.userInfoList) ? object.userInfoList.map((e) => UserInfo.fromJSON(e)) : [],
      userStatusList: globalThis.Array.isArray(object?.userStatusList) ? object.userStatusList.map((e) => UserStatus.fromJSON(e)) : [],
      seatList: globalThis.Array.isArray(object?.seatList) ? object.seatList.map((e) => Seat.fromJSON(e)) : [],
      sofaList: globalThis.Array.isArray(object?.sofaList) ? object.sofaList.map((e) => Sofa.fromJSON(e)) : [],
      userShoulderList: globalThis.Array.isArray(object?.userShoulderList) ? object.userShoulderList.map((e) => UserStatus.fromJSON(e)) : [],
      roomInfo: isSet(object.roomInfo) ? RoomData.fromJSON(object.roomInfo) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = Math.round(message.result);
    }
    if (message.roomId !== void 0 && message.roomId !== 0) {
      obj.roomId = Math.round(message.roomId);
    }
    if (message.userInfoList?.length) {
      obj.userInfoList = message.userInfoList.map((e) => UserInfo.toJSON(e));
    }
    if (message.userStatusList?.length) {
      obj.userStatusList = message.userStatusList.map((e) => UserStatus.toJSON(e));
    }
    if (message.seatList?.length) {
      obj.seatList = message.seatList.map((e) => Seat.toJSON(e));
    }
    if (message.sofaList?.length) {
      obj.sofaList = message.sofaList.map((e) => Sofa.toJSON(e));
    }
    if (message.userShoulderList?.length) {
      obj.userShoulderList = message.userShoulderList.map((e) => UserStatus.toJSON(e));
    }
    if (message.roomInfo !== void 0) {
      obj.roomInfo = RoomData.toJSON(message.roomInfo);
    }
    return obj;
  },
  create(base) {
    return S2CEnterRoom.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CEnterRoom();
    message.result = object.result ?? 0;
    message.roomId = object.roomId ?? 0;
    message.userInfoList = object.userInfoList?.map((e) => UserInfo.fromPartial(e)) || [];
    message.userStatusList = object.userStatusList?.map((e) => UserStatus.fromPartial(e)) || [];
    message.seatList = object.seatList?.map((e) => Seat.fromPartial(e)) || [];
    message.sofaList = object.sofaList?.map((e) => Sofa.fromPartial(e)) || [];
    message.userShoulderList = object.userShoulderList?.map((e) => UserStatus.fromPartial(e)) || [];
    message.roomInfo = object.roomInfo !== void 0 && object.roomInfo !== null ? RoomData.fromPartial(object.roomInfo) : void 0;
    return message;
  }
};
function createBaseS2CBroadCastEnterRoom() {
  return { result: 0, roomId: 0, userInfo: void 0, userStatus: void 0 };
}
const S2CBroadCastEnterRoom = {
  $type: "Room.S2CBroadCastEnterRoom",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.roomId !== void 0 && message.roomId !== 0) {
      writer.uint32(16).int32(message.roomId);
    }
    if (message.userInfo !== void 0) {
      UserInfo.encode(message.userInfo, writer.uint32(26).fork()).join();
    }
    if (message.userStatus !== void 0) {
      UserStatus.encode(message.userStatus, writer.uint32(34).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadCastEnterRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.roomId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.userInfo = UserInfo.decode(reader, reader.uint32());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.userStatus = UserStatus.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? globalThis.Number(object.result) : 0,
      roomId: isSet(object.roomId) ? globalThis.Number(object.roomId) : 0,
      userInfo: isSet(object.userInfo) ? UserInfo.fromJSON(object.userInfo) : void 0,
      userStatus: isSet(object.userStatus) ? UserStatus.fromJSON(object.userStatus) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = Math.round(message.result);
    }
    if (message.roomId !== void 0 && message.roomId !== 0) {
      obj.roomId = Math.round(message.roomId);
    }
    if (message.userInfo !== void 0) {
      obj.userInfo = UserInfo.toJSON(message.userInfo);
    }
    if (message.userStatus !== void 0) {
      obj.userStatus = UserStatus.toJSON(message.userStatus);
    }
    return obj;
  },
  create(base) {
    return S2CBroadCastEnterRoom.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadCastEnterRoom();
    message.result = object.result ?? 0;
    message.roomId = object.roomId ?? 0;
    message.userInfo = object.userInfo !== void 0 && object.userInfo !== null ? UserInfo.fromPartial(object.userInfo) : void 0;
    message.userStatus = object.userStatus !== void 0 && object.userStatus !== null ? UserStatus.fromPartial(object.userStatus) : void 0;
    return message;
  }
};
function createBaseC2SLeaveRoom() {
  return { playerId: 0 };
}
const C2SLeaveRoom = {
  $type: "Room.C2SLeaveRoom",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SLeaveRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    return obj;
  },
  create(base) {
    return C2SLeaveRoom.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SLeaveRoom();
    message.playerId = object.playerId ?? 0;
    return message;
  }
};
function createBaseS2CLeaveRoom() {
  return { result: 0, playerId: 0 };
}
const S2CLeaveRoom = {
  $type: "Room.S2CLeaveRoom",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(16).int32(message.playerId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CLeaveRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? globalThis.Number(object.result) : 0,
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = Math.round(message.result);
    }
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    return obj;
  },
  create(base) {
    return S2CLeaveRoom.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CLeaveRoom();
    message.result = object.result ?? 0;
    message.playerId = object.playerId ?? 0;
    return message;
  }
};
function createBaseS2CBroadCastLeaveRoom() {
  return { playerId: 0, ownerId: 0 };
}
const S2CBroadCastLeaveRoom = {
  $type: "Room.S2CBroadCastLeaveRoom",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    if (message.ownerId !== void 0 && message.ownerId !== 0) {
      writer.uint32(16).int32(message.ownerId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadCastLeaveRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.ownerId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      ownerId: isSet(object.ownerId) ? globalThis.Number(object.ownerId) : isSet(object.owner_id) ? globalThis.Number(object.owner_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.ownerId !== void 0 && message.ownerId !== 0) {
      obj.ownerId = Math.round(message.ownerId);
    }
    return obj;
  },
  create(base) {
    return S2CBroadCastLeaveRoom.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadCastLeaveRoom();
    message.playerId = object.playerId ?? 0;
    message.ownerId = object.ownerId ?? 0;
    return message;
  }
};
function createBaseC2SSyncMessage() {
  return { roomId: 0, user: void 0 };
}
const C2SSyncMessage = {
  $type: "Room.C2SSyncMessage",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomId !== void 0 && message.roomId !== 0) {
      writer.uint32(8).int32(message.roomId);
    }
    if (message.user !== void 0) {
      UserStatus.encode(message.user, writer.uint32(18).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SSyncMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.roomId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.user = UserStatus.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      roomId: isSet(object.roomId) ? globalThis.Number(object.roomId) : 0,
      user: isSet(object.user) ? UserStatus.fromJSON(object.user) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomId !== void 0 && message.roomId !== 0) {
      obj.roomId = Math.round(message.roomId);
    }
    if (message.user !== void 0) {
      obj.user = UserStatus.toJSON(message.user);
    }
    return obj;
  },
  create(base) {
    return C2SSyncMessage.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SSyncMessage();
    message.roomId = object.roomId ?? 0;
    message.user = object.user !== void 0 && object.user !== null ? UserStatus.fromPartial(object.user) : void 0;
    return message;
  }
};
function createBaseS2CSyncMessage() {
  return { roomId: 0, playerId: 0, user: void 0 };
}
const S2CSyncMessage = {
  $type: "Room.S2CSyncMessage",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomId !== void 0 && message.roomId !== 0) {
      writer.uint32(8).int32(message.roomId);
    }
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(16).int32(message.playerId);
    }
    if (message.user !== void 0) {
      UserStatus.encode(message.user, writer.uint32(26).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSyncMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.roomId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.user = UserStatus.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      roomId: isSet(object.roomId) ? globalThis.Number(object.roomId) : 0,
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      user: isSet(object.user) ? UserStatus.fromJSON(object.user) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomId !== void 0 && message.roomId !== 0) {
      obj.roomId = Math.round(message.roomId);
    }
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.user !== void 0) {
      obj.user = UserStatus.toJSON(message.user);
    }
    return obj;
  },
  create(base) {
    return S2CSyncMessage.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSyncMessage();
    message.roomId = object.roomId ?? 0;
    message.playerId = object.playerId ?? 0;
    message.user = object.user !== void 0 && object.user !== null ? UserStatus.fromPartial(object.user) : void 0;
    return message;
  }
};
function createBaseS2CBroadCastSyncMessage() {
  return { users: [] };
}
const S2CBroadCastSyncMessage = {
  $type: "Room.S2CBroadCastSyncMessage",
  encode(message, writer = new BinaryWriter()) {
    if (message.users !== void 0 && message.users.length !== 0) {
      for (const v of message.users) {
        UserStatus.encode(v, writer.uint32(10).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadCastSyncMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = UserStatus.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.users.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e) => UserStatus.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => UserStatus.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CBroadCastSyncMessage.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadCastSyncMessage();
    message.users = object.users?.map((e) => UserStatus.fromPartial(e)) || [];
    return message;
  }
};
function createBaseGameStatus() {
  return { gameStatusId: 0, leftTime: 0, sendTime: 0 };
}
const GameStatus = {
  $type: "Room.GameStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.gameStatusId !== void 0 && message.gameStatusId !== 0) {
      writer.uint32(8).int32(message.gameStatusId);
    }
    if (message.leftTime !== void 0 && message.leftTime !== 0) {
      writer.uint32(16).int32(message.leftTime);
    }
    if (message.sendTime !== void 0 && message.sendTime !== 0) {
      writer.uint32(24).int32(message.sendTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGameStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.gameStatusId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.leftTime = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.sendTime = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      gameStatusId: isSet(object.gameStatusId) ? gameStatusIdFromJSON(object.gameStatusId) : 0,
      leftTime: isSet(object.leftTime) ? globalThis.Number(object.leftTime) : 0,
      sendTime: isSet(object.sendTime) ? globalThis.Number(object.sendTime) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.gameStatusId !== void 0 && message.gameStatusId !== 0) {
      obj.gameStatusId = gameStatusIdToJSON(message.gameStatusId);
    }
    if (message.leftTime !== void 0 && message.leftTime !== 0) {
      obj.leftTime = Math.round(message.leftTime);
    }
    if (message.sendTime !== void 0 && message.sendTime !== 0) {
      obj.sendTime = Math.round(message.sendTime);
    }
    return obj;
  },
  create(base) {
    return GameStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGameStatus();
    message.gameStatusId = object.gameStatusId ?? 0;
    message.leftTime = object.leftTime ?? 0;
    message.sendTime = object.sendTime ?? 0;
    return message;
  }
};
function createBaseS2CBroadCastGameStatus() {
  return { gameStatus: void 0 };
}
const S2CBroadCastGameStatus = {
  $type: "Room.S2CBroadCastGameStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.gameStatus !== void 0) {
      GameStatus.encode(message.gameStatus, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadCastGameStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.gameStatus = GameStatus.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { gameStatus: isSet(object.gameStatus) ? GameStatus.fromJSON(object.gameStatus) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.gameStatus !== void 0) {
      obj.gameStatus = GameStatus.toJSON(message.gameStatus);
    }
    return obj;
  },
  create(base) {
    return S2CBroadCastGameStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadCastGameStatus();
    message.gameStatus = object.gameStatus !== void 0 && object.gameStatus !== null ? GameStatus.fromPartial(object.gameStatus) : void 0;
    return message;
  }
};
function createBaseC2SSitSeat() {
  return { seatId: 0 };
}
const C2SSitSeat = {
  $type: "Room.C2SSitSeat",
  encode(message, writer = new BinaryWriter()) {
    if (message.seatId !== void 0 && message.seatId !== 0) {
      writer.uint32(8).int32(message.seatId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SSitSeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.seatId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { seatId: isSet(object.seatId) ? globalThis.Number(object.seatId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.seatId !== void 0 && message.seatId !== 0) {
      obj.seatId = Math.round(message.seatId);
    }
    return obj;
  },
  create(base) {
    return C2SSitSeat.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SSitSeat();
    message.seatId = object.seatId ?? 0;
    return message;
  }
};
function createBaseS2CSitSeat() {
  return { result: 0, gameStatus: void 0 };
}
const S2CSitSeat = {
  $type: "Room.S2CSitSeat",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.gameStatus !== void 0) {
      GameStatus.encode(message.gameStatus, writer.uint32(18).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSitSeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.gameStatus = GameStatus.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? seatResultCodeFromJSON(object.result) : 0,
      gameStatus: isSet(object.gameStatus) ? GameStatus.fromJSON(object.gameStatus) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = seatResultCodeToJSON(message.result);
    }
    if (message.gameStatus !== void 0) {
      obj.gameStatus = GameStatus.toJSON(message.gameStatus);
    }
    return obj;
  },
  create(base) {
    return S2CSitSeat.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSitSeat();
    message.result = object.result ?? 0;
    message.gameStatus = object.gameStatus !== void 0 && object.gameStatus !== null ? GameStatus.fromPartial(object.gameStatus) : void 0;
    return message;
  }
};
function createBaseC2SLeaveSeat() {
  return { seatId: 0 };
}
const C2SLeaveSeat = {
  $type: "Room.C2SLeaveSeat",
  encode(message, writer = new BinaryWriter()) {
    if (message.seatId !== void 0 && message.seatId !== 0) {
      writer.uint32(8).int32(message.seatId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SLeaveSeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.seatId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { seatId: isSet(object.seatId) ? globalThis.Number(object.seatId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.seatId !== void 0 && message.seatId !== 0) {
      obj.seatId = Math.round(message.seatId);
    }
    return obj;
  },
  create(base) {
    return C2SLeaveSeat.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SLeaveSeat();
    message.seatId = object.seatId ?? 0;
    return message;
  }
};
function createBaseS2CLeaveSeat() {
  return { result: 0 };
}
const S2CLeaveSeat = {
  $type: "Room.S2CLeaveSeat",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CLeaveSeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? seatResultCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = seatResultCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CLeaveSeat.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CLeaveSeat();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CBroadCastSeatStatus() {
  return { seatList: [] };
}
const S2CBroadCastSeatStatus = {
  $type: "Room.S2CBroadCastSeatStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.seatList !== void 0 && message.seatList.length !== 0) {
      for (const v of message.seatList) {
        Seat.encode(v, writer.uint32(10).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadCastSeatStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = Seat.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.seatList.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      seatList: globalThis.Array.isArray(object?.seatList) ? object.seatList.map((e) => Seat.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.seatList?.length) {
      obj.seatList = message.seatList.map((e) => Seat.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CBroadCastSeatStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadCastSeatStatus();
    message.seatList = object.seatList?.map((e) => Seat.fromPartial(e)) || [];
    return message;
  }
};
function createBaseSeat() {
  return { id: 0, status: 0, playerId: 0 };
}
const Seat = {
  $type: "Room.Seat",
  encode(message, writer = new BinaryWriter()) {
    if (message.id !== void 0 && message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.status !== void 0 && message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(24).int32(message.playerId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.id = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.status = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      status: isSet(object.status) ? seatStatusFromJSON(object.status) : 0,
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.id !== void 0 && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.status !== void 0 && message.status !== 0) {
      obj.status = seatStatusToJSON(message.status);
    }
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    return obj;
  },
  create(base) {
    return Seat.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseSeat();
    message.id = object.id ?? 0;
    message.status = object.status ?? 0;
    message.playerId = object.playerId ?? 0;
    return message;
  }
};
function createBaseC2SStartGame() {
  return { playerId: 0 };
}
const C2SStartGame = {
  $type: "Room.C2SStartGame",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SStartGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    return obj;
  },
  create(base) {
    return C2SStartGame.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SStartGame();
    message.playerId = object.playerId ?? 0;
    return message;
  }
};
function createBaseS2CStartGame() {
  return { result: 0 };
}
const S2CStartGame = {
  $type: "Room.S2CStartGame",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CStartGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? roomErrorCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = roomErrorCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CStartGame.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CStartGame();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CBroadCastGameReady() {
  return { role: 0, score: 0, blackCard: void 0, cardList: [], czarPlayerId: 0, playerStatList: [] };
}
const S2CBroadCastGameReady = {
  $type: "Room.S2CBroadCastGameReady",
  encode(message, writer = new BinaryWriter()) {
    if (message.role !== void 0 && message.role !== 0) {
      writer.uint32(8).int32(message.role);
    }
    if (message.score !== void 0 && message.score !== 0) {
      writer.uint32(16).int32(message.score);
    }
    if (message.blackCard !== void 0) {
      Card.encode(message.blackCard, writer.uint32(26).fork()).join();
    }
    if (message.cardList !== void 0 && message.cardList.length !== 0) {
      for (const v of message.cardList) {
        Card.encode(v, writer.uint32(34).fork()).join();
      }
    }
    if (message.czarPlayerId !== void 0 && message.czarPlayerId !== 0) {
      writer.uint32(40).int32(message.czarPlayerId);
    }
    if (message.playerStatList !== void 0 && message.playerStatList.length !== 0) {
      for (const v of message.playerStatList) {
        PlayerGameStat.encode(v, writer.uint32(50).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadCastGameReady();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.role = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.score = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.blackCard = Card.decode(reader, reader.uint32());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          const el = Card.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.cardList.push(el);
          }
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.czarPlayerId = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          const el = PlayerGameStat.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.playerStatList.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      role: isSet(object.role) ? roleFromJSON(object.role) : 0,
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
      blackCard: isSet(object.blackCard) ? Card.fromJSON(object.blackCard) : void 0,
      cardList: globalThis.Array.isArray(object?.cardList) ? object.cardList.map((e) => Card.fromJSON(e)) : [],
      czarPlayerId: isSet(object.czarPlayerId) ? globalThis.Number(object.czarPlayerId) : 0,
      playerStatList: globalThis.Array.isArray(object?.playerStatList) ? object.playerStatList.map((e) => PlayerGameStat.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.role !== void 0 && message.role !== 0) {
      obj.role = roleToJSON(message.role);
    }
    if (message.score !== void 0 && message.score !== 0) {
      obj.score = Math.round(message.score);
    }
    if (message.blackCard !== void 0) {
      obj.blackCard = Card.toJSON(message.blackCard);
    }
    if (message.cardList?.length) {
      obj.cardList = message.cardList.map((e) => Card.toJSON(e));
    }
    if (message.czarPlayerId !== void 0 && message.czarPlayerId !== 0) {
      obj.czarPlayerId = Math.round(message.czarPlayerId);
    }
    if (message.playerStatList?.length) {
      obj.playerStatList = message.playerStatList.map((e) => PlayerGameStat.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CBroadCastGameReady.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadCastGameReady();
    message.role = object.role ?? 0;
    message.score = object.score ?? 0;
    message.blackCard = object.blackCard !== void 0 && object.blackCard !== null ? Card.fromPartial(object.blackCard) : void 0;
    message.cardList = object.cardList?.map((e) => Card.fromPartial(e)) || [];
    message.czarPlayerId = object.czarPlayerId ?? 0;
    message.playerStatList = object.playerStatList?.map((e) => PlayerGameStat.fromPartial(e)) || [];
    return message;
  }
};
function createBasePlayerGameStat() {
  return { playerId: 0, score: 0 };
}
const PlayerGameStat = {
  $type: "Room.PlayerGameStat",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    if (message.score !== void 0 && message.score !== 0) {
      writer.uint32(16).int32(message.score);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePlayerGameStat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.score = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      score: isSet(object.score) ? globalThis.Number(object.score) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.score !== void 0 && message.score !== 0) {
      obj.score = Math.round(message.score);
    }
    return obj;
  },
  create(base) {
    return PlayerGameStat.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePlayerGameStat();
    message.playerId = object.playerId ?? 0;
    message.score = object.score ?? 0;
    return message;
  }
};
function createBaseC2SSelectCard() {
  return { cardId: 0 };
}
const C2SSelectCard = {
  $type: "Room.C2SSelectCard",
  encode(message, writer = new BinaryWriter()) {
    if (message.cardId !== void 0 && message.cardId !== 0) {
      writer.uint32(8).int32(message.cardId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SSelectCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.cardId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { cardId: isSet(object.cardId) ? globalThis.Number(object.cardId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.cardId !== void 0 && message.cardId !== 0) {
      obj.cardId = Math.round(message.cardId);
    }
    return obj;
  },
  create(base) {
    return C2SSelectCard.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SSelectCard();
    message.cardId = object.cardId ?? 0;
    return message;
  }
};
function createBaseS2CSelectCard() {
  return { result: 0, cardId: 0 };
}
const S2CSelectCard = {
  $type: "Room.S2CSelectCard",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.cardId !== void 0 && message.cardId !== 0) {
      writer.uint32(16).int32(message.cardId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSelectCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.cardId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? roomErrorCodeFromJSON(object.result) : 0,
      cardId: isSet(object.cardId) ? globalThis.Number(object.cardId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = roomErrorCodeToJSON(message.result);
    }
    if (message.cardId !== void 0 && message.cardId !== 0) {
      obj.cardId = Math.round(message.cardId);
    }
    return obj;
  },
  create(base) {
    return S2CSelectCard.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSelectCard();
    message.result = object.result ?? 0;
    message.cardId = object.cardId ?? 0;
    return message;
  }
};
function createBaseS2CBroadCastPlayerSelectCard() {
  return { card: [] };
}
const S2CBroadCastPlayerSelectCard = {
  $type: "Room.S2CBroadCastPlayerSelectCard",
  encode(message, writer = new BinaryWriter()) {
    if (message.card !== void 0 && message.card.length !== 0) {
      for (const v of message.card) {
        Card.encode(v, writer.uint32(18).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadCastPlayerSelectCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2: {
          if (tag !== 18) {
            break;
          }
          const el = Card.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.card.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { card: globalThis.Array.isArray(object?.card) ? object.card.map((e) => Card.fromJSON(e)) : [] };
  },
  toJSON(message) {
    const obj = {};
    if (message.card?.length) {
      obj.card = message.card.map((e) => Card.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CBroadCastPlayerSelectCard.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadCastPlayerSelectCard();
    message.card = object.card?.map((e) => Card.fromPartial(e)) || [];
    return message;
  }
};
function createBaseC2SCzarOpenCard() {
  return { cardId: 0 };
}
const C2SCzarOpenCard = {
  $type: "Room.C2SCzarOpenCard",
  encode(message, writer = new BinaryWriter()) {
    if (message.cardId !== void 0 && message.cardId !== 0) {
      writer.uint32(8).int32(message.cardId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SCzarOpenCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.cardId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { cardId: isSet(object.cardId) ? globalThis.Number(object.cardId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.cardId !== void 0 && message.cardId !== 0) {
      obj.cardId = Math.round(message.cardId);
    }
    return obj;
  },
  create(base) {
    return C2SCzarOpenCard.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SCzarOpenCard();
    message.cardId = object.cardId ?? 0;
    return message;
  }
};
function createBaseS2CCzarOpenCard() {
  return { result: 0, cardId: 0 };
}
const S2CCzarOpenCard = {
  $type: "Room.S2CCzarOpenCard",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.cardId !== void 0 && message.cardId !== 0) {
      writer.uint32(16).int32(message.cardId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CCzarOpenCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.cardId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? globalThis.Number(object.result) : 0,
      cardId: isSet(object.cardId) ? globalThis.Number(object.cardId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = Math.round(message.result);
    }
    if (message.cardId !== void 0 && message.cardId !== 0) {
      obj.cardId = Math.round(message.cardId);
    }
    return obj;
  },
  create(base) {
    return S2CCzarOpenCard.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CCzarOpenCard();
    message.result = object.result ?? 0;
    message.cardId = object.cardId ?? 0;
    return message;
  }
};
function createBaseS2CBroadCastOpenCard() {
  return { cardId: [] };
}
const S2CBroadCastOpenCard = {
  $type: "Room.S2CBroadCastOpenCard",
  encode(message, writer = new BinaryWriter()) {
    if (message.cardId !== void 0 && message.cardId.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.cardId) {
        writer.int32(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadCastOpenCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag === 8) {
            message.cardId.push(reader.int32());
            continue;
          }
          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.cardId.push(reader.int32());
            }
            continue;
          }
          break;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      cardId: globalThis.Array.isArray(object?.cardId) ? object.cardId.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.cardId?.length) {
      obj.cardId = message.cardId.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return S2CBroadCastOpenCard.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadCastOpenCard();
    message.cardId = object.cardId?.map((e) => e) || [];
    return message;
  }
};
function createBaseC2SCzarSelectWinCard() {
  return { cardId: 0 };
}
const C2SCzarSelectWinCard = {
  $type: "Room.C2SCzarSelectWinCard",
  encode(message, writer = new BinaryWriter()) {
    if (message.cardId !== void 0 && message.cardId !== 0) {
      writer.uint32(8).int32(message.cardId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SCzarSelectWinCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.cardId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { cardId: isSet(object.cardId) ? globalThis.Number(object.cardId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.cardId !== void 0 && message.cardId !== 0) {
      obj.cardId = Math.round(message.cardId);
    }
    return obj;
  },
  create(base) {
    return C2SCzarSelectWinCard.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SCzarSelectWinCard();
    message.cardId = object.cardId ?? 0;
    return message;
  }
};
function createBaseS2CCzarSelectWinCard() {
  return { result: 0, cardId: 0 };
}
const S2CCzarSelectWinCard = {
  $type: "Room.S2CCzarSelectWinCard",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.cardId !== void 0 && message.cardId !== 0) {
      writer.uint32(16).int32(message.cardId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CCzarSelectWinCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.cardId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? roomErrorCodeFromJSON(object.result) : 0,
      cardId: isSet(object.cardId) ? globalThis.Number(object.cardId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = roomErrorCodeToJSON(message.result);
    }
    if (message.cardId !== void 0 && message.cardId !== 0) {
      obj.cardId = Math.round(message.cardId);
    }
    return obj;
  },
  create(base) {
    return S2CCzarSelectWinCard.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CCzarSelectWinCard();
    message.result = object.result ?? 0;
    message.cardId = object.cardId ?? 0;
    return message;
  }
};
function createBaseS2CBroadcastCzarWinCard() {
  return { winCardId: 0, winPlayerId: 0, score: 0 };
}
const S2CBroadcastCzarWinCard = {
  $type: "Room.S2CBroadcastCzarWinCard",
  encode(message, writer = new BinaryWriter()) {
    if (message.winCardId !== void 0 && message.winCardId !== 0) {
      writer.uint32(8).int32(message.winCardId);
    }
    if (message.winPlayerId !== void 0 && message.winPlayerId !== 0) {
      writer.uint32(16).int32(message.winPlayerId);
    }
    if (message.score !== void 0 && message.score !== 0) {
      writer.uint32(24).int32(message.score);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadcastCzarWinCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.winCardId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.winPlayerId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.score = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      winCardId: isSet(object.winCardId) ? globalThis.Number(object.winCardId) : 0,
      winPlayerId: isSet(object.winPlayerId) ? globalThis.Number(object.winPlayerId) : 0,
      score: isSet(object.score) ? globalThis.Number(object.score) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.winCardId !== void 0 && message.winCardId !== 0) {
      obj.winCardId = Math.round(message.winCardId);
    }
    if (message.winPlayerId !== void 0 && message.winPlayerId !== 0) {
      obj.winPlayerId = Math.round(message.winPlayerId);
    }
    if (message.score !== void 0 && message.score !== 0) {
      obj.score = Math.round(message.score);
    }
    return obj;
  },
  create(base) {
    return S2CBroadcastCzarWinCard.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadcastCzarWinCard();
    message.winCardId = object.winCardId ?? 0;
    message.winPlayerId = object.winPlayerId ?? 0;
    message.score = object.score ?? 0;
    return message;
  }
};
function createBaseCard() {
  return { cardId: 0, type: 0, content: "", fromPlayerId: 0, isOpen: false };
}
const Card = {
  $type: "Room.Card",
  encode(message, writer = new BinaryWriter()) {
    if (message.cardId !== void 0 && message.cardId !== 0) {
      writer.uint32(8).int32(message.cardId);
    }
    if (message.type !== void 0 && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.fromPlayerId !== void 0 && message.fromPlayerId !== 0) {
      writer.uint32(32).int32(message.fromPlayerId);
    }
    if (message.isOpen !== void 0 && message.isOpen !== false) {
      writer.uint32(40).bool(message.isOpen);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.cardId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.type = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.content = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.fromPlayerId = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.isOpen = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      cardId: isSet(object.cardId) ? globalThis.Number(object.cardId) : 0,
      type: isSet(object.type) ? cardTypeFromJSON(object.type) : 0,
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      fromPlayerId: isSet(object.fromPlayerId) ? globalThis.Number(object.fromPlayerId) : 0,
      isOpen: isSet(object.isOpen) ? globalThis.Boolean(object.isOpen) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.cardId !== void 0 && message.cardId !== 0) {
      obj.cardId = Math.round(message.cardId);
    }
    if (message.type !== void 0 && message.type !== 0) {
      obj.type = cardTypeToJSON(message.type);
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    if (message.fromPlayerId !== void 0 && message.fromPlayerId !== 0) {
      obj.fromPlayerId = Math.round(message.fromPlayerId);
    }
    if (message.isOpen !== void 0 && message.isOpen !== false) {
      obj.isOpen = message.isOpen;
    }
    return obj;
  },
  create(base) {
    return Card.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCard();
    message.cardId = object.cardId ?? 0;
    message.type = object.type ?? 0;
    message.content = object.content ?? "";
    message.fromPlayerId = object.fromPlayerId ?? 0;
    message.isOpen = object.isOpen ?? false;
    return message;
  }
};
function createBaseC2SSyncBlendShape() {
  return { playerId: 0, bs: [] };
}
const C2SSyncBlendShape = {
  $type: "Room.C2SSyncBlendShape",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    if (message.bs !== void 0 && message.bs.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.bs) {
        writer.uint32(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SSyncBlendShape();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag === 16) {
            message.bs.push(reader.uint32());
            continue;
          }
          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.bs.push(reader.uint32());
            }
            continue;
          }
          break;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      bs: globalThis.Array.isArray(object?.bs) ? object.bs.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.bs?.length) {
      obj.bs = message.bs.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return C2SSyncBlendShape.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SSyncBlendShape();
    message.playerId = object.playerId ?? 0;
    message.bs = object.bs?.map((e) => e) || [];
    return message;
  }
};
function createBaseS2CSyncBlendShape() {
  return { result: 0, bs: [] };
}
const S2CSyncBlendShape = {
  $type: "Room.S2CSyncBlendShape",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.bs !== void 0 && message.bs.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.bs) {
        writer.uint32(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSyncBlendShape();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag === 16) {
            message.bs.push(reader.uint32());
            continue;
          }
          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.bs.push(reader.uint32());
            }
            continue;
          }
          break;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? roomErrorCodeFromJSON(object.result) : 0,
      bs: globalThis.Array.isArray(object?.bs) ? object.bs.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = roomErrorCodeToJSON(message.result);
    }
    if (message.bs?.length) {
      obj.bs = message.bs.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return S2CSyncBlendShape.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSyncBlendShape();
    message.result = object.result ?? 0;
    message.bs = object.bs?.map((e) => e) || [];
    return message;
  }
};
function createBaseS2CBroadcastSyncBlendShape() {
  return { users: [] };
}
const S2CBroadcastSyncBlendShape = {
  $type: "Room.S2CBroadcastSyncBlendShape",
  encode(message, writer = new BinaryWriter()) {
    if (message.users !== void 0 && message.users.length !== 0) {
      for (const v of message.users) {
        UserBlendShape.encode(v, writer.uint32(10).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadcastSyncBlendShape();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = UserBlendShape.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.users.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      users: globalThis.Array.isArray(object?.users) ? object.users.map((e) => UserBlendShape.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => UserBlendShape.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CBroadcastSyncBlendShape.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadcastSyncBlendShape();
    message.users = object.users?.map((e) => UserBlendShape.fromPartial(e)) || [];
    return message;
  }
};
function createBaseUserBlendShape() {
  return { playerId: 0, bs: [] };
}
const UserBlendShape = {
  $type: "Room.UserBlendShape",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    if (message.bs !== void 0 && message.bs.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.bs) {
        writer.uint32(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUserBlendShape();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag === 16) {
            message.bs.push(reader.uint32());
            continue;
          }
          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.bs.push(reader.uint32());
            }
            continue;
          }
          break;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      bs: globalThis.Array.isArray(object?.bs) ? object.bs.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.bs?.length) {
      obj.bs = message.bs.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return UserBlendShape.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUserBlendShape();
    message.playerId = object.playerId ?? 0;
    message.bs = object.bs?.map((e) => e) || [];
    return message;
  }
};
function createBaseHeadStatus() {
  return { playerId: 0, headRotX: 0, headRotY: 0, headRotZ: 0 };
}
const HeadStatus = {
  $type: "Room.HeadStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    if (message.headRotX !== void 0 && message.headRotX !== 0) {
      writer.uint32(16).int32(message.headRotX);
    }
    if (message.headRotY !== void 0 && message.headRotY !== 0) {
      writer.uint32(24).int32(message.headRotY);
    }
    if (message.headRotZ !== void 0 && message.headRotZ !== 0) {
      writer.uint32(32).int32(message.headRotZ);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseHeadStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.headRotX = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.headRotY = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.headRotZ = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      headRotX: isSet(object.headRotX) ? globalThis.Number(object.headRotX) : 0,
      headRotY: isSet(object.headRotY) ? globalThis.Number(object.headRotY) : 0,
      headRotZ: isSet(object.headRotZ) ? globalThis.Number(object.headRotZ) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.headRotX !== void 0 && message.headRotX !== 0) {
      obj.headRotX = Math.round(message.headRotX);
    }
    if (message.headRotY !== void 0 && message.headRotY !== 0) {
      obj.headRotY = Math.round(message.headRotY);
    }
    if (message.headRotZ !== void 0 && message.headRotZ !== 0) {
      obj.headRotZ = Math.round(message.headRotZ);
    }
    return obj;
  },
  create(base) {
    return HeadStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseHeadStatus();
    message.playerId = object.playerId ?? 0;
    message.headRotX = object.headRotX ?? 0;
    message.headRotY = object.headRotY ?? 0;
    message.headRotZ = object.headRotZ ?? 0;
    return message;
  }
};
function createBaseC2SSyncHeadStatus() {
  return { headStatus: void 0 };
}
const C2SSyncHeadStatus = {
  $type: "Room.C2SSyncHeadStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.headStatus !== void 0) {
      HeadStatus.encode(message.headStatus, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SSyncHeadStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.headStatus = HeadStatus.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { headStatus: isSet(object.headStatus) ? HeadStatus.fromJSON(object.headStatus) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.headStatus !== void 0) {
      obj.headStatus = HeadStatus.toJSON(message.headStatus);
    }
    return obj;
  },
  create(base) {
    return C2SSyncHeadStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SSyncHeadStatus();
    message.headStatus = object.headStatus !== void 0 && object.headStatus !== null ? HeadStatus.fromPartial(object.headStatus) : void 0;
    return message;
  }
};
function createBaseS2CSyncHeadStatus() {
  return { result: 0, headStatus: void 0 };
}
const S2CSyncHeadStatus = {
  $type: "Room.S2CSyncHeadStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.headStatus !== void 0) {
      HeadStatus.encode(message.headStatus, writer.uint32(18).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSyncHeadStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.headStatus = HeadStatus.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? roomErrorCodeFromJSON(object.result) : 0,
      headStatus: isSet(object.headStatus) ? HeadStatus.fromJSON(object.headStatus) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = roomErrorCodeToJSON(message.result);
    }
    if (message.headStatus !== void 0) {
      obj.headStatus = HeadStatus.toJSON(message.headStatus);
    }
    return obj;
  },
  create(base) {
    return S2CSyncHeadStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSyncHeadStatus();
    message.result = object.result ?? 0;
    message.headStatus = object.headStatus !== void 0 && object.headStatus !== null ? HeadStatus.fromPartial(object.headStatus) : void 0;
    return message;
  }
};
function createBaseS2CBroadcastSyncHeadStatus() {
  return { headStatus: [] };
}
const S2CBroadcastSyncHeadStatus = {
  $type: "Room.S2CBroadcastSyncHeadStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.headStatus !== void 0 && message.headStatus.length !== 0) {
      for (const v of message.headStatus) {
        HeadStatus.encode(v, writer.uint32(10).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadcastSyncHeadStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = HeadStatus.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.headStatus.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      headStatus: globalThis.Array.isArray(object?.headStatus) ? object.headStatus.map((e) => HeadStatus.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.headStatus?.length) {
      obj.headStatus = message.headStatus.map((e) => HeadStatus.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CBroadcastSyncHeadStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadcastSyncHeadStatus();
    message.headStatus = object.headStatus?.map((e) => HeadStatus.fromPartial(e)) || [];
    return message;
  }
};
function createBaseC2SHeartBeat() {
  return { index: 0 };
}
const C2SHeartBeat = {
  $type: "Room.C2SHeartBeat",
  encode(message, writer = new BinaryWriter()) {
    if (message.index !== void 0 && message.index !== 0) {
      writer.uint32(8).int32(message.index);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SHeartBeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.index = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { index: isSet(object.index) ? globalThis.Number(object.index) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.index !== void 0 && message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    return obj;
  },
  create(base) {
    return C2SHeartBeat.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SHeartBeat();
    message.index = object.index ?? 0;
    return message;
  }
};
function createBaseS2CHeartBeat() {
  return { index: 0 };
}
const S2CHeartBeat = {
  $type: "Room.S2CHeartBeat",
  encode(message, writer = new BinaryWriter()) {
    if (message.index !== void 0 && message.index !== 0) {
      writer.uint32(8).int32(message.index);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CHeartBeat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.index = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { index: isSet(object.index) ? globalThis.Number(object.index) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.index !== void 0 && message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    return obj;
  },
  create(base) {
    return S2CHeartBeat.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CHeartBeat();
    message.index = object.index ?? 0;
    return message;
  }
};
function createBaseC2SSitSofa() {
  return { sofaId: 0 };
}
const C2SSitSofa = {
  $type: "Room.C2SSitSofa",
  encode(message, writer = new BinaryWriter()) {
    if (message.sofaId !== void 0 && message.sofaId !== 0) {
      writer.uint32(8).int32(message.sofaId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SSitSofa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.sofaId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { sofaId: isSet(object.sofaId) ? globalThis.Number(object.sofaId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.sofaId !== void 0 && message.sofaId !== 0) {
      obj.sofaId = Math.round(message.sofaId);
    }
    return obj;
  },
  create(base) {
    return C2SSitSofa.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SSitSofa();
    message.sofaId = object.sofaId ?? 0;
    return message;
  }
};
function createBaseS2CSitSofa() {
  return { result: 0 };
}
const S2CSitSofa = {
  $type: "Room.S2CSitSofa",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSitSofa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? sofaResultCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = sofaResultCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CSitSofa.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSitSofa();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseC2SLeaveSofa() {
  return { sofaId: 0 };
}
const C2SLeaveSofa = {
  $type: "Room.C2SLeaveSofa",
  encode(message, writer = new BinaryWriter()) {
    if (message.sofaId !== void 0 && message.sofaId !== 0) {
      writer.uint32(8).int32(message.sofaId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SLeaveSofa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.sofaId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { sofaId: isSet(object.sofaId) ? globalThis.Number(object.sofaId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.sofaId !== void 0 && message.sofaId !== 0) {
      obj.sofaId = Math.round(message.sofaId);
    }
    return obj;
  },
  create(base) {
    return C2SLeaveSofa.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SLeaveSofa();
    message.sofaId = object.sofaId ?? 0;
    return message;
  }
};
function createBaseS2CLeaveSofa() {
  return { result: 0 };
}
const S2CLeaveSofa = {
  $type: "Room.S2CLeaveSofa",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CLeaveSofa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? sofaResultCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = sofaResultCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CLeaveSofa.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CLeaveSofa();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CBroadCastSofaStatus() {
  return { sofaList: [] };
}
const S2CBroadCastSofaStatus = {
  $type: "Room.S2CBroadCastSofaStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.sofaList !== void 0 && message.sofaList.length !== 0) {
      for (const v of message.sofaList) {
        Sofa.encode(v, writer.uint32(10).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadCastSofaStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = Sofa.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.sofaList.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      sofaList: globalThis.Array.isArray(object?.sofaList) ? object.sofaList.map((e) => Sofa.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.sofaList?.length) {
      obj.sofaList = message.sofaList.map((e) => Sofa.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CBroadCastSofaStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadCastSofaStatus();
    message.sofaList = object.sofaList?.map((e) => Sofa.fromPartial(e)) || [];
    return message;
  }
};
function createBaseSofa() {
  return { id: 0, status: 0, playerId: 0 };
}
const Sofa = {
  $type: "Room.Sofa",
  encode(message, writer = new BinaryWriter()) {
    if (message.id !== void 0 && message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.status !== void 0 && message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(24).int32(message.playerId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSofa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.id = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.status = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      status: isSet(object.status) ? sofaStatusFromJSON(object.status) : 0,
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.id !== void 0 && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.status !== void 0 && message.status !== 0) {
      obj.status = sofaStatusToJSON(message.status);
    }
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    return obj;
  },
  create(base) {
    return Sofa.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseSofa();
    message.id = object.id ?? 0;
    message.status = object.status ?? 0;
    message.playerId = object.playerId ?? 0;
    return message;
  }
};
function createBaseC2SVoiceInfo() {
  return { data: void 0 };
}
const C2SVoiceInfo = {
  $type: "Room.C2SVoiceInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.data !== void 0) {
      VoiceMsg.encode(message.data, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SVoiceInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.data = VoiceMsg.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { data: isSet(object.data) ? VoiceMsg.fromJSON(object.data) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.data !== void 0) {
      obj.data = VoiceMsg.toJSON(message.data);
    }
    return obj;
  },
  create(base) {
    return C2SVoiceInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SVoiceInfo();
    message.data = object.data !== void 0 && object.data !== null ? VoiceMsg.fromPartial(object.data) : void 0;
    return message;
  }
};
function createBaseS2CVoiceInfo() {
  return { result: 0 };
}
const S2CVoiceInfo = {
  $type: "Room.S2CVoiceInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CVoiceInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? voiceErrorCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = voiceErrorCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CVoiceInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CVoiceInfo();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CBroadcastVoiceInfo() {
  return { data: [] };
}
const S2CBroadcastVoiceInfo = {
  $type: "Room.S2CBroadcastVoiceInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.data !== void 0 && message.data.length !== 0) {
      for (const v of message.data) {
        VoiceMsg.encode(v, writer.uint32(10).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadcastVoiceInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = VoiceMsg.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.data.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { data: globalThis.Array.isArray(object?.data) ? object.data.map((e) => VoiceMsg.fromJSON(e)) : [] };
  },
  toJSON(message) {
    const obj = {};
    if (message.data?.length) {
      obj.data = message.data.map((e) => VoiceMsg.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CBroadcastVoiceInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadcastVoiceInfo();
    message.data = object.data?.map((e) => VoiceMsg.fromPartial(e)) || [];
    return message;
  }
};
function createBaseVoiceMsg() {
  return { uid: 0, volume: 0, vad: 0 };
}
const VoiceMsg = {
  $type: "Room.VoiceMsg",
  encode(message, writer = new BinaryWriter()) {
    if (message.uid !== void 0 && message.uid !== 0) {
      writer.uint32(8).int32(message.uid);
    }
    if (message.volume !== void 0 && message.volume !== 0) {
      writer.uint32(16).int32(message.volume);
    }
    if (message.vad !== void 0 && message.vad !== 0) {
      writer.uint32(24).int32(message.vad);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseVoiceMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.uid = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.volume = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.vad = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      uid: isSet(object.uid) ? globalThis.Number(object.uid) : 0,
      volume: isSet(object.volume) ? globalThis.Number(object.volume) : 0,
      vad: isSet(object.vad) ? globalThis.Number(object.vad) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.uid !== void 0 && message.uid !== 0) {
      obj.uid = Math.round(message.uid);
    }
    if (message.volume !== void 0 && message.volume !== 0) {
      obj.volume = Math.round(message.volume);
    }
    if (message.vad !== void 0 && message.vad !== 0) {
      obj.vad = Math.round(message.vad);
    }
    return obj;
  },
  create(base) {
    return VoiceMsg.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseVoiceMsg();
    message.uid = object.uid ?? 0;
    message.volume = object.volume ?? 0;
    message.vad = object.vad ?? 0;
    return message;
  }
};
function createBaseC2SForceNextRound() {
  return {};
}
const C2SForceNextRound = {
  $type: "Room.C2SForceNextRound",
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SForceNextRound();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(_) {
    return {};
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  create(base) {
    return C2SForceNextRound.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseC2SForceNextRound();
    return message;
  }
};
function createBaseS2CForceNextRound() {
  return { result: 0, agreePlayerCount: 0 };
}
const S2CForceNextRound = {
  $type: "Room.S2CForceNextRound",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.agreePlayerCount !== void 0 && message.agreePlayerCount !== 0) {
      writer.uint32(16).int32(message.agreePlayerCount);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CForceNextRound();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.agreePlayerCount = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? forceNextRoundResultCodeFromJSON(object.result) : 0,
      agreePlayerCount: isSet(object.agreePlayerCount) ? globalThis.Number(object.agreePlayerCount) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = forceNextRoundResultCodeToJSON(message.result);
    }
    if (message.agreePlayerCount !== void 0 && message.agreePlayerCount !== 0) {
      obj.agreePlayerCount = Math.round(message.agreePlayerCount);
    }
    return obj;
  },
  create(base) {
    return S2CForceNextRound.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CForceNextRound();
    message.result = object.result ?? 0;
    message.agreePlayerCount = object.agreePlayerCount ?? 0;
    return message;
  }
};
function createBaseS2CBroadcastForceNextRound() {
  return { agreePlayerCount: 0 };
}
const S2CBroadcastForceNextRound = {
  $type: "Room.S2CBroadcastForceNextRound",
  encode(message, writer = new BinaryWriter()) {
    if (message.agreePlayerCount !== void 0 && message.agreePlayerCount !== 0) {
      writer.uint32(8).int32(message.agreePlayerCount);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadcastForceNextRound();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.agreePlayerCount = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { agreePlayerCount: isSet(object.agreePlayerCount) ? globalThis.Number(object.agreePlayerCount) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.agreePlayerCount !== void 0 && message.agreePlayerCount !== 0) {
      obj.agreePlayerCount = Math.round(message.agreePlayerCount);
    }
    return obj;
  },
  create(base) {
    return S2CBroadcastForceNextRound.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadcastForceNextRound();
    message.agreePlayerCount = object.agreePlayerCount ?? 0;
    return message;
  }
};
function createBaseC2SSyncShoulder() {
  return { shoulderInfo: void 0 };
}
const C2SSyncShoulder = {
  $type: "Room.C2SSyncShoulder",
  encode(message, writer = new BinaryWriter()) {
    if (message.shoulderInfo !== void 0) {
      UserStatus.encode(message.shoulderInfo, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SSyncShoulder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.shoulderInfo = UserStatus.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { shoulderInfo: isSet(object.shoulderInfo) ? UserStatus.fromJSON(object.shoulderInfo) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.shoulderInfo !== void 0) {
      obj.shoulderInfo = UserStatus.toJSON(message.shoulderInfo);
    }
    return obj;
  },
  create(base) {
    return C2SSyncShoulder.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SSyncShoulder();
    message.shoulderInfo = object.shoulderInfo !== void 0 && object.shoulderInfo !== null ? UserStatus.fromPartial(object.shoulderInfo) : void 0;
    return message;
  }
};
function createBaseS2CSyncShoulder() {
  return { result: 0 };
}
const S2CSyncShoulder = {
  $type: "Room.S2CSyncShoulder",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSyncShoulder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? roomErrorCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = roomErrorCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CSyncShoulder.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSyncShoulder();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CBroadcastShoulder() {
  return { shoulderInfoLst: [] };
}
const S2CBroadcastShoulder = {
  $type: "Room.S2CBroadcastShoulder",
  encode(message, writer = new BinaryWriter()) {
    if (message.shoulderInfoLst !== void 0 && message.shoulderInfoLst.length !== 0) {
      for (const v of message.shoulderInfoLst) {
        UserStatus.encode(v, writer.uint32(10).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadcastShoulder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = UserStatus.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.shoulderInfoLst.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      shoulderInfoLst: globalThis.Array.isArray(object?.shoulderInfoLst) ? object.shoulderInfoLst.map((e) => UserStatus.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.shoulderInfoLst?.length) {
      obj.shoulderInfoLst = message.shoulderInfoLst.map((e) => UserStatus.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CBroadcastShoulder.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadcastShoulder();
    message.shoulderInfoLst = object.shoulderInfoLst?.map((e) => UserStatus.fromPartial(e)) || [];
    return message;
  }
};
function createBaseC2SSyncHand() {
  return { handInfo: void 0 };
}
const C2SSyncHand = {
  $type: "Room.C2SSyncHand",
  encode(message, writer = new BinaryWriter()) {
    if (message.handInfo !== void 0) {
      UserHandTrackingInfo.encode(message.handInfo, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SSyncHand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.handInfo = UserHandTrackingInfo.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { handInfo: isSet(object.handInfo) ? UserHandTrackingInfo.fromJSON(object.handInfo) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.handInfo !== void 0) {
      obj.handInfo = UserHandTrackingInfo.toJSON(message.handInfo);
    }
    return obj;
  },
  create(base) {
    return C2SSyncHand.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SSyncHand();
    message.handInfo = object.handInfo !== void 0 && object.handInfo !== null ? UserHandTrackingInfo.fromPartial(object.handInfo) : void 0;
    return message;
  }
};
function createBaseS2CSyncHand() {
  return { result: 0 };
}
const S2CSyncHand = {
  $type: "Room.S2CSyncHand",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSyncHand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? roomErrorCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = roomErrorCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CSyncHand.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSyncHand();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CBroadcastHand() {
  return { handInfoLst: [] };
}
const S2CBroadcastHand = {
  $type: "Room.S2CBroadcastHand",
  encode(message, writer = new BinaryWriter()) {
    if (message.handInfoLst !== void 0 && message.handInfoLst.length !== 0) {
      for (const v of message.handInfoLst) {
        UserHandTrackingInfo.encode(v, writer.uint32(10).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadcastHand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = UserHandTrackingInfo.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.handInfoLst.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      handInfoLst: globalThis.Array.isArray(object?.handInfoLst) ? object.handInfoLst.map((e) => UserHandTrackingInfo.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.handInfoLst?.length) {
      obj.handInfoLst = message.handInfoLst.map((e) => UserHandTrackingInfo.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CBroadcastHand.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadcastHand();
    message.handInfoLst = object.handInfoLst?.map((e) => UserHandTrackingInfo.fromPartial(e)) || [];
    return message;
  }
};
function createBaseUserHandTrackingInfo() {
  return {
    uid: 0,
    thumbFlexionAngle: 0,
    indexFlexionAngle: 0,
    middleFlexionAngle: 0,
    ringFlexionAngle: 0,
    littleFlexionAngle: 0,
    handWristPosX: 0,
    handWristPosY: 0,
    handWristPosZ: 0,
    handWristRotX: 0,
    handWristRotY: 0,
    handWristRotZ: 0,
    isRightHand: false,
    isHandInCamera: false
  };
}
const UserHandTrackingInfo = {
  $type: "Room.UserHandTrackingInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.uid !== void 0 && message.uid !== 0) {
      writer.uint32(8).int32(message.uid);
    }
    if (message.thumbFlexionAngle !== void 0 && message.thumbFlexionAngle !== 0) {
      writer.uint32(16).int32(message.thumbFlexionAngle);
    }
    if (message.indexFlexionAngle !== void 0 && message.indexFlexionAngle !== 0) {
      writer.uint32(24).int32(message.indexFlexionAngle);
    }
    if (message.middleFlexionAngle !== void 0 && message.middleFlexionAngle !== 0) {
      writer.uint32(32).int32(message.middleFlexionAngle);
    }
    if (message.ringFlexionAngle !== void 0 && message.ringFlexionAngle !== 0) {
      writer.uint32(40).int32(message.ringFlexionAngle);
    }
    if (message.littleFlexionAngle !== void 0 && message.littleFlexionAngle !== 0) {
      writer.uint32(48).int32(message.littleFlexionAngle);
    }
    if (message.handWristPosX !== void 0 && message.handWristPosX !== 0) {
      writer.uint32(56).int32(message.handWristPosX);
    }
    if (message.handWristPosY !== void 0 && message.handWristPosY !== 0) {
      writer.uint32(64).int32(message.handWristPosY);
    }
    if (message.handWristPosZ !== void 0 && message.handWristPosZ !== 0) {
      writer.uint32(72).int32(message.handWristPosZ);
    }
    if (message.handWristRotX !== void 0 && message.handWristRotX !== 0) {
      writer.uint32(80).int32(message.handWristRotX);
    }
    if (message.handWristRotY !== void 0 && message.handWristRotY !== 0) {
      writer.uint32(88).int32(message.handWristRotY);
    }
    if (message.handWristRotZ !== void 0 && message.handWristRotZ !== 0) {
      writer.uint32(96).int32(message.handWristRotZ);
    }
    if (message.isRightHand !== void 0 && message.isRightHand !== false) {
      writer.uint32(104).bool(message.isRightHand);
    }
    if (message.isHandInCamera !== void 0 && message.isHandInCamera !== false) {
      writer.uint32(112).bool(message.isHandInCamera);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUserHandTrackingInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.uid = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.thumbFlexionAngle = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.indexFlexionAngle = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.middleFlexionAngle = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.ringFlexionAngle = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.littleFlexionAngle = reader.int32();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.handWristPosX = reader.int32();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }
          message.handWristPosY = reader.int32();
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }
          message.handWristPosZ = reader.int32();
          continue;
        }
        case 10: {
          if (tag !== 80) {
            break;
          }
          message.handWristRotX = reader.int32();
          continue;
        }
        case 11: {
          if (tag !== 88) {
            break;
          }
          message.handWristRotY = reader.int32();
          continue;
        }
        case 12: {
          if (tag !== 96) {
            break;
          }
          message.handWristRotZ = reader.int32();
          continue;
        }
        case 13: {
          if (tag !== 104) {
            break;
          }
          message.isRightHand = reader.bool();
          continue;
        }
        case 14: {
          if (tag !== 112) {
            break;
          }
          message.isHandInCamera = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      uid: isSet(object.uid) ? globalThis.Number(object.uid) : 0,
      thumbFlexionAngle: isSet(object.thumbFlexionAngle) ? globalThis.Number(object.thumbFlexionAngle) : 0,
      indexFlexionAngle: isSet(object.indexFlexionAngle) ? globalThis.Number(object.indexFlexionAngle) : 0,
      middleFlexionAngle: isSet(object.middleFlexionAngle) ? globalThis.Number(object.middleFlexionAngle) : 0,
      ringFlexionAngle: isSet(object.ringFlexionAngle) ? globalThis.Number(object.ringFlexionAngle) : 0,
      littleFlexionAngle: isSet(object.littleFlexionAngle) ? globalThis.Number(object.littleFlexionAngle) : 0,
      handWristPosX: isSet(object.handWristPosX) ? globalThis.Number(object.handWristPosX) : 0,
      handWristPosY: isSet(object.handWristPosY) ? globalThis.Number(object.handWristPosY) : 0,
      handWristPosZ: isSet(object.handWristPosZ) ? globalThis.Number(object.handWristPosZ) : 0,
      handWristRotX: isSet(object.handWristRotX) ? globalThis.Number(object.handWristRotX) : 0,
      handWristRotY: isSet(object.handWristRotY) ? globalThis.Number(object.handWristRotY) : 0,
      handWristRotZ: isSet(object.handWristRotZ) ? globalThis.Number(object.handWristRotZ) : 0,
      isRightHand: isSet(object.isRightHand) ? globalThis.Boolean(object.isRightHand) : false,
      isHandInCamera: isSet(object.isHandInCamera) ? globalThis.Boolean(object.isHandInCamera) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.uid !== void 0 && message.uid !== 0) {
      obj.uid = Math.round(message.uid);
    }
    if (message.thumbFlexionAngle !== void 0 && message.thumbFlexionAngle !== 0) {
      obj.thumbFlexionAngle = Math.round(message.thumbFlexionAngle);
    }
    if (message.indexFlexionAngle !== void 0 && message.indexFlexionAngle !== 0) {
      obj.indexFlexionAngle = Math.round(message.indexFlexionAngle);
    }
    if (message.middleFlexionAngle !== void 0 && message.middleFlexionAngle !== 0) {
      obj.middleFlexionAngle = Math.round(message.middleFlexionAngle);
    }
    if (message.ringFlexionAngle !== void 0 && message.ringFlexionAngle !== 0) {
      obj.ringFlexionAngle = Math.round(message.ringFlexionAngle);
    }
    if (message.littleFlexionAngle !== void 0 && message.littleFlexionAngle !== 0) {
      obj.littleFlexionAngle = Math.round(message.littleFlexionAngle);
    }
    if (message.handWristPosX !== void 0 && message.handWristPosX !== 0) {
      obj.handWristPosX = Math.round(message.handWristPosX);
    }
    if (message.handWristPosY !== void 0 && message.handWristPosY !== 0) {
      obj.handWristPosY = Math.round(message.handWristPosY);
    }
    if (message.handWristPosZ !== void 0 && message.handWristPosZ !== 0) {
      obj.handWristPosZ = Math.round(message.handWristPosZ);
    }
    if (message.handWristRotX !== void 0 && message.handWristRotX !== 0) {
      obj.handWristRotX = Math.round(message.handWristRotX);
    }
    if (message.handWristRotY !== void 0 && message.handWristRotY !== 0) {
      obj.handWristRotY = Math.round(message.handWristRotY);
    }
    if (message.handWristRotZ !== void 0 && message.handWristRotZ !== 0) {
      obj.handWristRotZ = Math.round(message.handWristRotZ);
    }
    if (message.isRightHand !== void 0 && message.isRightHand !== false) {
      obj.isRightHand = message.isRightHand;
    }
    if (message.isHandInCamera !== void 0 && message.isHandInCamera !== false) {
      obj.isHandInCamera = message.isHandInCamera;
    }
    return obj;
  },
  create(base) {
    return UserHandTrackingInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUserHandTrackingInfo();
    message.uid = object.uid ?? 0;
    message.thumbFlexionAngle = object.thumbFlexionAngle ?? 0;
    message.indexFlexionAngle = object.indexFlexionAngle ?? 0;
    message.middleFlexionAngle = object.middleFlexionAngle ?? 0;
    message.ringFlexionAngle = object.ringFlexionAngle ?? 0;
    message.littleFlexionAngle = object.littleFlexionAngle ?? 0;
    message.handWristPosX = object.handWristPosX ?? 0;
    message.handWristPosY = object.handWristPosY ?? 0;
    message.handWristPosZ = object.handWristPosZ ?? 0;
    message.handWristRotX = object.handWristRotX ?? 0;
    message.handWristRotY = object.handWristRotY ?? 0;
    message.handWristRotZ = object.handWristRotZ ?? 0;
    message.isRightHand = object.isRightHand ?? false;
    message.isHandInCamera = object.isHandInCamera ?? false;
    return message;
  }
};
function createBaseC2SChangeAvatar() {
  return { playerId: 0, avatarId: "", avatarUrl: "" };
}
const C2SChangeAvatar = {
  $type: "Room.C2SChangeAvatar",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    if (message.avatarId !== void 0 && message.avatarId !== "") {
      writer.uint32(18).string(message.avatarId);
    }
    if (message.avatarUrl !== void 0 && message.avatarUrl !== "") {
      writer.uint32(26).string(message.avatarUrl);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SChangeAvatar();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.avatarId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.avatarUrl = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      avatarId: isSet(object.avatarId) ? globalThis.String(object.avatarId) : "",
      avatarUrl: isSet(object.avatarUrl) ? globalThis.String(object.avatarUrl) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.avatarId !== void 0 && message.avatarId !== "") {
      obj.avatarId = message.avatarId;
    }
    if (message.avatarUrl !== void 0 && message.avatarUrl !== "") {
      obj.avatarUrl = message.avatarUrl;
    }
    return obj;
  },
  create(base) {
    return C2SChangeAvatar.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SChangeAvatar();
    message.playerId = object.playerId ?? 0;
    message.avatarId = object.avatarId ?? "";
    message.avatarUrl = object.avatarUrl ?? "";
    return message;
  }
};
function createBaseS2CChangeAvatar() {
  return { result: 0 };
}
const S2CChangeAvatar = {
  $type: "Room.S2CChangeAvatar",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CChangeAvatar();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? roomErrorCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = roomErrorCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CChangeAvatar.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CChangeAvatar();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CBroadCastChangeAvatar() {
  return { playerId: 0, avatarId: "", avatarUrl: "" };
}
const S2CBroadCastChangeAvatar = {
  $type: "Room.S2CBroadCastChangeAvatar",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    if (message.avatarId !== void 0 && message.avatarId !== "") {
      writer.uint32(18).string(message.avatarId);
    }
    if (message.avatarUrl !== void 0 && message.avatarUrl !== "") {
      writer.uint32(26).string(message.avatarUrl);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadCastChangeAvatar();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.avatarId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.avatarUrl = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      avatarId: isSet(object.avatarId) ? globalThis.String(object.avatarId) : "",
      avatarUrl: isSet(object.avatarUrl) ? globalThis.String(object.avatarUrl) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.avatarId !== void 0 && message.avatarId !== "") {
      obj.avatarId = message.avatarId;
    }
    if (message.avatarUrl !== void 0 && message.avatarUrl !== "") {
      obj.avatarUrl = message.avatarUrl;
    }
    return obj;
  },
  create(base) {
    return S2CBroadCastChangeAvatar.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadCastChangeAvatar();
    message.playerId = object.playerId ?? 0;
    message.avatarId = object.avatarId ?? "";
    message.avatarUrl = object.avatarUrl ?? "";
    return message;
  }
};
function createBaseC2SAgoraToken() {
  return { role: 0, uid: 0, channelName: "" };
}
const C2SAgoraToken = {
  $type: "Room.C2SAgoraToken",
  encode(message, writer = new BinaryWriter()) {
    if (message.role !== void 0 && message.role !== 0) {
      writer.uint32(8).int32(message.role);
    }
    if (message.uid !== void 0 && message.uid !== 0) {
      writer.uint32(16).int32(message.uid);
    }
    if (message.channelName !== void 0 && message.channelName !== "") {
      writer.uint32(26).string(message.channelName);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SAgoraToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.role = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.uid = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.channelName = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      role: isSet(object.role) ? globalThis.Number(object.role) : 0,
      uid: isSet(object.uid) ? globalThis.Number(object.uid) : 0,
      channelName: isSet(object.channelName) ? globalThis.String(object.channelName) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.role !== void 0 && message.role !== 0) {
      obj.role = Math.round(message.role);
    }
    if (message.uid !== void 0 && message.uid !== 0) {
      obj.uid = Math.round(message.uid);
    }
    if (message.channelName !== void 0 && message.channelName !== "") {
      obj.channelName = message.channelName;
    }
    return obj;
  },
  create(base) {
    return C2SAgoraToken.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SAgoraToken();
    message.role = object.role ?? 0;
    message.uid = object.uid ?? 0;
    message.channelName = object.channelName ?? "";
    return message;
  }
};
function createBaseS2CAgoraToken() {
  return { token: "", message: "" };
}
const S2CAgoraToken = {
  $type: "Room.S2CAgoraToken",
  encode(message, writer = new BinaryWriter()) {
    if (message.token !== void 0 && message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CAgoraToken();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.token = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.message = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.token !== void 0 && message.token !== "") {
      obj.token = message.token;
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return S2CAgoraToken.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CAgoraToken();
    message.token = object.token ?? "";
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseC2SCreateRoom() {
  return { roomInfo: void 0 };
}
const C2SCreateRoom = {
  $type: "Room.C2SCreateRoom",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomInfo !== void 0) {
      RoomData.encode(message.roomInfo, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SCreateRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.roomInfo = RoomData.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { roomInfo: isSet(object.roomInfo) ? RoomData.fromJSON(object.roomInfo) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomInfo !== void 0) {
      obj.roomInfo = RoomData.toJSON(message.roomInfo);
    }
    return obj;
  },
  create(base) {
    return C2SCreateRoom.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SCreateRoom();
    message.roomInfo = object.roomInfo !== void 0 && object.roomInfo !== null ? RoomData.fromPartial(object.roomInfo) : void 0;
    return message;
  }
};
function createBaseS2CCreateRoom() {
  return { result: 0, roomId: 0 };
}
const S2CCreateRoom = {
  $type: "Room.S2CCreateRoom",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.roomId !== void 0 && message.roomId !== 0) {
      writer.uint32(16).int32(message.roomId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CCreateRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.roomId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? createRoomErrorCodeFromJSON(object.result) : 0,
      roomId: isSet(object.roomId) ? globalThis.Number(object.roomId) : isSet(object.room_id) ? globalThis.Number(object.room_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = createRoomErrorCodeToJSON(message.result);
    }
    if (message.roomId !== void 0 && message.roomId !== 0) {
      obj.roomId = Math.round(message.roomId);
    }
    return obj;
  },
  create(base) {
    return S2CCreateRoom.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CCreateRoom();
    message.result = object.result ?? 0;
    message.roomId = object.roomId ?? 0;
    return message;
  }
};
function createBaseRoomData() {
  return { roomId: 0, premadeId: "", maxUser: 0, roomTitle: "", ownerId: 0, permission: 0 };
}
const RoomData = {
  $type: "Room.RoomData",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomId !== void 0 && message.roomId !== 0) {
      writer.uint32(8).int32(message.roomId);
    }
    if (message.premadeId !== void 0 && message.premadeId !== "") {
      writer.uint32(18).string(message.premadeId);
    }
    if (message.maxUser !== void 0 && message.maxUser !== 0) {
      writer.uint32(24).int32(message.maxUser);
    }
    if (message.roomTitle !== void 0 && message.roomTitle !== "") {
      writer.uint32(34).string(message.roomTitle);
    }
    if (message.ownerId !== void 0 && message.ownerId !== 0) {
      writer.uint32(40).int32(message.ownerId);
    }
    if (message.permission !== void 0 && message.permission !== 0) {
      writer.uint32(48).int32(message.permission);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseRoomData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.roomId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.premadeId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.maxUser = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.roomTitle = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.ownerId = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.permission = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      roomId: isSet(object.roomId) ? globalThis.Number(object.roomId) : 0,
      premadeId: isSet(object.premadeId) ? globalThis.String(object.premadeId) : "",
      maxUser: isSet(object.maxUser) ? globalThis.Number(object.maxUser) : 0,
      roomTitle: isSet(object.roomTitle) ? globalThis.String(object.roomTitle) : "",
      ownerId: isSet(object.ownerId) ? globalThis.Number(object.ownerId) : 0,
      permission: isSet(object.permission) ? roomPermissiionFromJSON(object.permission) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomId !== void 0 && message.roomId !== 0) {
      obj.roomId = Math.round(message.roomId);
    }
    if (message.premadeId !== void 0 && message.premadeId !== "") {
      obj.premadeId = message.premadeId;
    }
    if (message.maxUser !== void 0 && message.maxUser !== 0) {
      obj.maxUser = Math.round(message.maxUser);
    }
    if (message.roomTitle !== void 0 && message.roomTitle !== "") {
      obj.roomTitle = message.roomTitle;
    }
    if (message.ownerId !== void 0 && message.ownerId !== 0) {
      obj.ownerId = Math.round(message.ownerId);
    }
    if (message.permission !== void 0 && message.permission !== 0) {
      obj.permission = roomPermissiionToJSON(message.permission);
    }
    return obj;
  },
  create(base) {
    return RoomData.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseRoomData();
    message.roomId = object.roomId ?? 0;
    message.premadeId = object.premadeId ?? "";
    message.maxUser = object.maxUser ?? 0;
    message.roomTitle = object.roomTitle ?? "";
    message.ownerId = object.ownerId ?? 0;
    message.permission = object.permission ?? 0;
    return message;
  }
};
function createBaseC2SKickOut() {
  return { kickPlayerId: 0, expireTime: 0 };
}
const C2SKickOut = {
  $type: "Room.C2SKickOut",
  encode(message, writer = new BinaryWriter()) {
    if (message.kickPlayerId !== void 0 && message.kickPlayerId !== 0) {
      writer.uint32(8).int32(message.kickPlayerId);
    }
    if (message.expireTime !== void 0 && message.expireTime !== 0) {
      writer.uint32(16).int32(message.expireTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SKickOut();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.kickPlayerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.expireTime = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      kickPlayerId: isSet(object.kickPlayerId) ? globalThis.Number(object.kickPlayerId) : 0,
      expireTime: isSet(object.expireTime) ? globalThis.Number(object.expireTime) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.kickPlayerId !== void 0 && message.kickPlayerId !== 0) {
      obj.kickPlayerId = Math.round(message.kickPlayerId);
    }
    if (message.expireTime !== void 0 && message.expireTime !== 0) {
      obj.expireTime = Math.round(message.expireTime);
    }
    return obj;
  },
  create(base) {
    return C2SKickOut.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SKickOut();
    message.kickPlayerId = object.kickPlayerId ?? 0;
    message.expireTime = object.expireTime ?? 0;
    return message;
  }
};
function createBaseS2CKickOut() {
  return { result: 0 };
}
const S2CKickOut = {
  $type: "Room.S2CKickOut",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CKickOut();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? kickErrorCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = kickErrorCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CKickOut.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CKickOut();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CForceKickOut() {
  return { ownerId: 0 };
}
const S2CForceKickOut = {
  $type: "Room.S2CForceKickOut",
  encode(message, writer = new BinaryWriter()) {
    if (message.ownerId !== void 0 && message.ownerId !== 0) {
      writer.uint32(8).int32(message.ownerId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CForceKickOut();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.ownerId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      ownerId: isSet(object.ownerId) ? globalThis.Number(object.ownerId) : isSet(object.owner_id) ? globalThis.Number(object.owner_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.ownerId !== void 0 && message.ownerId !== 0) {
      obj.ownerId = Math.round(message.ownerId);
    }
    return obj;
  },
  create(base) {
    return S2CForceKickOut.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CForceKickOut();
    message.ownerId = object.ownerId ?? 0;
    return message;
  }
};
function createBaseC2SFakeStartEncounter() {
  return { playerIds: [], anchorId: 0 };
}
const C2SFakeStartEncounter = {
  $type: "Room.C2SFakeStartEncounter",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerIds !== void 0 && message.playerIds.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.playerIds) {
        writer.int32(v);
      }
      writer.join();
    }
    if (message.anchorId !== void 0 && message.anchorId !== 0) {
      writer.uint32(16).int32(message.anchorId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SFakeStartEncounter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag === 8) {
            message.playerIds.push(reader.int32());
            continue;
          }
          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.playerIds.push(reader.int32());
            }
            continue;
          }
          break;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.anchorId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      playerIds: globalThis.Array.isArray(object?.playerIds) ? object.playerIds.map((e) => globalThis.Number(e)) : [],
      anchorId: isSet(object.anchorId) ? globalThis.Number(object.anchorId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerIds?.length) {
      obj.playerIds = message.playerIds.map((e) => Math.round(e));
    }
    if (message.anchorId !== void 0 && message.anchorId !== 0) {
      obj.anchorId = Math.round(message.anchorId);
    }
    return obj;
  },
  create(base) {
    return C2SFakeStartEncounter.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SFakeStartEncounter();
    message.playerIds = object.playerIds?.map((e) => e) || [];
    message.anchorId = object.anchorId ?? 0;
    return message;
  }
};
function createBaseS2CStartEncounter() {
  return { encounterInfo: void 0, isReAnchor: false, isUpdate: false, premadeId: "", startTime: 0 };
}
const S2CStartEncounter = {
  $type: "Room.S2CStartEncounter",
  encode(message, writer = new BinaryWriter()) {
    if (message.encounterInfo !== void 0) {
      EncounterEntity.encode(message.encounterInfo, writer.uint32(10).fork()).join();
    }
    if (message.isReAnchor !== void 0 && message.isReAnchor !== false) {
      writer.uint32(16).bool(message.isReAnchor);
    }
    if (message.isUpdate !== void 0 && message.isUpdate !== false) {
      writer.uint32(24).bool(message.isUpdate);
    }
    if (message.premadeId !== void 0 && message.premadeId !== "") {
      writer.uint32(34).string(message.premadeId);
    }
    if (message.startTime !== void 0 && message.startTime !== 0) {
      writer.uint32(40).int64(message.startTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CStartEncounter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.encounterInfo = EncounterEntity.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.isReAnchor = reader.bool();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.isUpdate = reader.bool();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.premadeId = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.startTime = longToNumber(reader.int64());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      encounterInfo: isSet(object.encounterInfo) ? EncounterEntity.fromJSON(object.encounterInfo) : void 0,
      isReAnchor: isSet(object.isReAnchor) ? globalThis.Boolean(object.isReAnchor) : false,
      isUpdate: isSet(object.isUpdate) ? globalThis.Boolean(object.isUpdate) : false,
      premadeId: isSet(object.premadeId) ? globalThis.String(object.premadeId) : "",
      startTime: isSet(object.startTime) ? globalThis.Number(object.startTime) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.encounterInfo !== void 0) {
      obj.encounterInfo = EncounterEntity.toJSON(message.encounterInfo);
    }
    if (message.isReAnchor !== void 0 && message.isReAnchor !== false) {
      obj.isReAnchor = message.isReAnchor;
    }
    if (message.isUpdate !== void 0 && message.isUpdate !== false) {
      obj.isUpdate = message.isUpdate;
    }
    if (message.premadeId !== void 0 && message.premadeId !== "") {
      obj.premadeId = message.premadeId;
    }
    if (message.startTime !== void 0 && message.startTime !== 0) {
      obj.startTime = Math.round(message.startTime);
    }
    return obj;
  },
  create(base) {
    return S2CStartEncounter.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CStartEncounter();
    message.encounterInfo = object.encounterInfo !== void 0 && object.encounterInfo !== null ? EncounterEntity.fromPartial(object.encounterInfo) : void 0;
    message.isReAnchor = object.isReAnchor ?? false;
    message.isUpdate = object.isUpdate ?? false;
    message.premadeId = object.premadeId ?? "";
    message.startTime = object.startTime ?? 0;
    return message;
  }
};
function createBaseC2SStartEncounter() {
  return { isSuccess: false };
}
const C2SStartEncounter = {
  $type: "Room.C2SStartEncounter",
  encode(message, writer = new BinaryWriter()) {
    if (message.isSuccess !== void 0 && message.isSuccess !== false) {
      writer.uint32(8).bool(message.isSuccess);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SStartEncounter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.isSuccess = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { isSuccess: isSet(object.isSuccess) ? globalThis.Boolean(object.isSuccess) : false };
  },
  toJSON(message) {
    const obj = {};
    if (message.isSuccess !== void 0 && message.isSuccess !== false) {
      obj.isSuccess = message.isSuccess;
    }
    return obj;
  },
  create(base) {
    return C2SStartEncounter.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SStartEncounter();
    message.isSuccess = object.isSuccess ?? false;
    return message;
  }
};
function createBaseC2SReAnchor() {
  return { encounterId: "" };
}
const C2SReAnchor = {
  $type: "Room.C2SReAnchor",
  encode(message, writer = new BinaryWriter()) {
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      writer.uint32(10).string(message.encounterId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SReAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.encounterId = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { encounterId: isSet(object.encounterId) ? globalThis.String(object.encounterId) : "" };
  },
  toJSON(message) {
    const obj = {};
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      obj.encounterId = message.encounterId;
    }
    return obj;
  },
  create(base) {
    return C2SReAnchor.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SReAnchor();
    message.encounterId = object.encounterId ?? "";
    return message;
  }
};
function createBaseS2CReAnchor() {
  return { result: 0 };
}
const S2CReAnchor = {
  $type: "Room.S2CReAnchor",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CReAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? reAnchorErrorCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = reAnchorErrorCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CReAnchor.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CReAnchor();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseEncounterEntity() {
  return { encounterId: "", players: [], encounterX: 0, encounterY: 0, encounterZ: 0 };
}
const EncounterEntity = {
  $type: "Room.EncounterEntity",
  encode(message, writer = new BinaryWriter()) {
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      writer.uint32(10).string(message.encounterId);
    }
    if (message.players !== void 0 && message.players.length !== 0) {
      for (const v of message.players) {
        EncounterUserInfo.encode(v, writer.uint32(18).fork()).join();
      }
    }
    if (message.encounterX !== void 0 && message.encounterX !== 0) {
      writer.uint32(24).int32(message.encounterX);
    }
    if (message.encounterY !== void 0 && message.encounterY !== 0) {
      writer.uint32(32).int32(message.encounterY);
    }
    if (message.encounterZ !== void 0 && message.encounterZ !== 0) {
      writer.uint32(40).int32(message.encounterZ);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseEncounterEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.encounterId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          const el = EncounterUserInfo.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.players.push(el);
          }
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.encounterX = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.encounterY = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.encounterZ = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      encounterId: isSet(object.encounterId) ? globalThis.String(object.encounterId) : "",
      players: globalThis.Array.isArray(object?.players) ? object.players.map((e) => EncounterUserInfo.fromJSON(e)) : [],
      encounterX: isSet(object.encounterX) ? globalThis.Number(object.encounterX) : 0,
      encounterY: isSet(object.encounterY) ? globalThis.Number(object.encounterY) : 0,
      encounterZ: isSet(object.encounterZ) ? globalThis.Number(object.encounterZ) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      obj.encounterId = message.encounterId;
    }
    if (message.players?.length) {
      obj.players = message.players.map((e) => EncounterUserInfo.toJSON(e));
    }
    if (message.encounterX !== void 0 && message.encounterX !== 0) {
      obj.encounterX = Math.round(message.encounterX);
    }
    if (message.encounterY !== void 0 && message.encounterY !== 0) {
      obj.encounterY = Math.round(message.encounterY);
    }
    if (message.encounterZ !== void 0 && message.encounterZ !== 0) {
      obj.encounterZ = Math.round(message.encounterZ);
    }
    return obj;
  },
  create(base) {
    return EncounterEntity.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseEncounterEntity();
    message.encounterId = object.encounterId ?? "";
    message.players = object.players?.map((e) => EncounterUserInfo.fromPartial(e)) || [];
    message.encounterX = object.encounterX ?? 0;
    message.encounterY = object.encounterY ?? 0;
    message.encounterZ = object.encounterZ ?? 0;
    return message;
  }
};
function createBaseEncounterUserInfo() {
  return { playerId: 0, enterRoomTime: 0 };
}
const EncounterUserInfo = {
  $type: "Room.EncounterUserInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    if (message.enterRoomTime !== void 0 && message.enterRoomTime !== 0) {
      writer.uint32(16).int64(message.enterRoomTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseEncounterUserInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.enterRoomTime = longToNumber(reader.int64());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      enterRoomTime: isSet(object.enterRoomTime) ? globalThis.Number(object.enterRoomTime) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.enterRoomTime !== void 0 && message.enterRoomTime !== 0) {
      obj.enterRoomTime = Math.round(message.enterRoomTime);
    }
    return obj;
  },
  create(base) {
    return EncounterUserInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseEncounterUserInfo();
    message.playerId = object.playerId ?? 0;
    message.enterRoomTime = object.enterRoomTime ?? 0;
    return message;
  }
};
function createBaseC2SFollowNotify() {
  return { toPlayerId: 0, followMsg: "" };
}
const C2SFollowNotify = {
  $type: "Room.C2SFollowNotify",
  encode(message, writer = new BinaryWriter()) {
    if (message.toPlayerId !== void 0 && message.toPlayerId !== 0) {
      writer.uint32(8).int32(message.toPlayerId);
    }
    if (message.followMsg !== void 0 && message.followMsg !== "") {
      writer.uint32(18).string(message.followMsg);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SFollowNotify();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.toPlayerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.followMsg = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      toPlayerId: isSet(object.toPlayerId) ? globalThis.Number(object.toPlayerId) : 0,
      followMsg: isSet(object.followMsg) ? globalThis.String(object.followMsg) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.toPlayerId !== void 0 && message.toPlayerId !== 0) {
      obj.toPlayerId = Math.round(message.toPlayerId);
    }
    if (message.followMsg !== void 0 && message.followMsg !== "") {
      obj.followMsg = message.followMsg;
    }
    return obj;
  },
  create(base) {
    return C2SFollowNotify.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SFollowNotify();
    message.toPlayerId = object.toPlayerId ?? 0;
    message.followMsg = object.followMsg ?? "";
    return message;
  }
};
function createBaseS2CFollowNotify() {
  return { result: 0 };
}
const S2CFollowNotify = {
  $type: "Room.S2CFollowNotify",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CFollowNotify();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? followNotifyResultFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = followNotifyResultToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CFollowNotify.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CFollowNotify();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CBroadcastFollowNotify() {
  return { fromPlayer: void 0, followMsg: "" };
}
const S2CBroadcastFollowNotify = {
  $type: "Room.S2CBroadcastFollowNotify",
  encode(message, writer = new BinaryWriter()) {
    if (message.fromPlayer !== void 0) {
      UserInfo.encode(message.fromPlayer, writer.uint32(10).fork()).join();
    }
    if (message.followMsg !== void 0 && message.followMsg !== "") {
      writer.uint32(18).string(message.followMsg);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadcastFollowNotify();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.fromPlayer = UserInfo.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.followMsg = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      fromPlayer: isSet(object.fromPlayer) ? UserInfo.fromJSON(object.fromPlayer) : void 0,
      followMsg: isSet(object.followMsg) ? globalThis.String(object.followMsg) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.fromPlayer !== void 0) {
      obj.fromPlayer = UserInfo.toJSON(message.fromPlayer);
    }
    if (message.followMsg !== void 0 && message.followMsg !== "") {
      obj.followMsg = message.followMsg;
    }
    return obj;
  },
  create(base) {
    return S2CBroadcastFollowNotify.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadcastFollowNotify();
    message.fromPlayer = object.fromPlayer !== void 0 && object.fromPlayer !== null ? UserInfo.fromPartial(object.fromPlayer) : void 0;
    message.followMsg = object.followMsg ?? "";
    return message;
  }
};
function createBaseC2SChangeMMOStatus() {
  return { mmoStatus: 0 };
}
const C2SChangeMMOStatus = {
  $type: "Room.C2SChangeMMOStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.mmoStatus !== void 0 && message.mmoStatus !== 0) {
      writer.uint32(8).int32(message.mmoStatus);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SChangeMMOStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.mmoStatus = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { mmoStatus: isSet(object.mmoStatus) ? mMOStatusFromJSON(object.mmoStatus) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.mmoStatus !== void 0 && message.mmoStatus !== 0) {
      obj.mmoStatus = mMOStatusToJSON(message.mmoStatus);
    }
    return obj;
  },
  create(base) {
    return C2SChangeMMOStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SChangeMMOStatus();
    message.mmoStatus = object.mmoStatus ?? 0;
    return message;
  }
};
function createBaseS2CBroadCastMMOStatus() {
  return { playerId: 0, mmoStatus: 0 };
}
const S2CBroadCastMMOStatus = {
  $type: "Room.S2CBroadCastMMOStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    if (message.mmoStatus !== void 0 && message.mmoStatus !== 0) {
      writer.uint32(16).int32(message.mmoStatus);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadCastMMOStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.mmoStatus = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      mmoStatus: isSet(object.mmoStatus) ? mMOStatusFromJSON(object.mmoStatus) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.mmoStatus !== void 0 && message.mmoStatus !== 0) {
      obj.mmoStatus = mMOStatusToJSON(message.mmoStatus);
    }
    return obj;
  },
  create(base) {
    return S2CBroadCastMMOStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadCastMMOStatus();
    message.playerId = object.playerId ?? 0;
    message.mmoStatus = object.mmoStatus ?? 0;
    return message;
  }
};
function createBaseC2SStatEncounter() {
  return { encounterId: "", actionType: 0, statValue: 0 };
}
const C2SStatEncounter = {
  $type: "Room.C2SStatEncounter",
  encode(message, writer = new BinaryWriter()) {
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      writer.uint32(10).string(message.encounterId);
    }
    if (message.actionType !== void 0 && message.actionType !== 0) {
      writer.uint32(16).int32(message.actionType);
    }
    if (message.statValue !== void 0 && message.statValue !== 0) {
      writer.uint32(24).int64(message.statValue);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SStatEncounter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.encounterId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.actionType = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.statValue = longToNumber(reader.int64());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      encounterId: isSet(object.encounterId) ? globalThis.String(object.encounterId) : "",
      actionType: isSet(object.actionType) ? statTypeFromJSON(object.actionType) : 0,
      statValue: isSet(object.statValue) ? globalThis.Number(object.statValue) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      obj.encounterId = message.encounterId;
    }
    if (message.actionType !== void 0 && message.actionType !== 0) {
      obj.actionType = statTypeToJSON(message.actionType);
    }
    if (message.statValue !== void 0 && message.statValue !== 0) {
      obj.statValue = Math.round(message.statValue);
    }
    return obj;
  },
  create(base) {
    return C2SStatEncounter.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SStatEncounter();
    message.encounterId = object.encounterId ?? "";
    message.actionType = object.actionType ?? 0;
    message.statValue = object.statValue ?? 0;
    return message;
  }
};
function createBaseS2CStatEncounter() {
  return { result: 0 };
}
const S2CStatEncounter = {
  $type: "Room.S2CStatEncounter",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CStatEncounter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? statEncounterErrorCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = statEncounterErrorCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CStatEncounter.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CStatEncounter();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CRoomWatching() {
  return { watchCount: 0, watcherLst: [] };
}
const S2CRoomWatching = {
  $type: "Room.S2CRoomWatching",
  encode(message, writer = new BinaryWriter()) {
    if (message.watchCount !== void 0 && message.watchCount !== 0) {
      writer.uint32(8).int32(message.watchCount);
    }
    if (message.watcherLst !== void 0 && message.watcherLst.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.watcherLst) {
        writer.int32(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CRoomWatching();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.watchCount = reader.int32();
          continue;
        }
        case 2: {
          if (tag === 16) {
            message.watcherLst.push(reader.int32());
            continue;
          }
          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.watcherLst.push(reader.int32());
            }
            continue;
          }
          break;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      watchCount: isSet(object.watchCount) ? globalThis.Number(object.watchCount) : 0,
      watcherLst: globalThis.Array.isArray(object?.watcherLst) ? object.watcherLst.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.watchCount !== void 0 && message.watchCount !== 0) {
      obj.watchCount = Math.round(message.watchCount);
    }
    if (message.watcherLst?.length) {
      obj.watcherLst = message.watcherLst.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return S2CRoomWatching.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CRoomWatching();
    message.watchCount = object.watchCount ?? 0;
    message.watcherLst = object.watcherLst?.map((e) => e) || [];
    return message;
  }
};
function createBaseC2SStatEncounterMeta() {
  return { encounterId: "", actionType: 0, statValue: 0 };
}
const C2SStatEncounterMeta = {
  $type: "Room.C2SStatEncounterMeta",
  encode(message, writer = new BinaryWriter()) {
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      writer.uint32(10).string(message.encounterId);
    }
    if (message.actionType !== void 0 && message.actionType !== 0) {
      writer.uint32(16).int32(message.actionType);
    }
    if (message.statValue !== void 0 && message.statValue !== 0) {
      writer.uint32(24).int64(message.statValue);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SStatEncounterMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.encounterId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.actionType = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.statValue = longToNumber(reader.int64());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      encounterId: isSet(object.encounterId) ? globalThis.String(object.encounterId) : "",
      actionType: isSet(object.actionType) ? statTypeFromJSON(object.actionType) : 0,
      statValue: isSet(object.statValue) ? globalThis.Number(object.statValue) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      obj.encounterId = message.encounterId;
    }
    if (message.actionType !== void 0 && message.actionType !== 0) {
      obj.actionType = statTypeToJSON(message.actionType);
    }
    if (message.statValue !== void 0 && message.statValue !== 0) {
      obj.statValue = Math.round(message.statValue);
    }
    return obj;
  },
  create(base) {
    return C2SStatEncounterMeta.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SStatEncounterMeta();
    message.encounterId = object.encounterId ?? "";
    message.actionType = object.actionType ?? 0;
    message.statValue = object.statValue ?? 0;
    return message;
  }
};
function createBaseS2CStatEncounterMeta() {
  return { result: 0 };
}
const S2CStatEncounterMeta = {
  $type: "Room.S2CStatEncounterMeta",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CStatEncounterMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? statEncounterErrorCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = statEncounterErrorCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CStatEncounterMeta.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CStatEncounterMeta();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseC2SSyncChat() {
  return { playerId: 0 };
}
const C2SSyncChat = {
  $type: "Room.C2SSyncChat",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SSyncChat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.playerId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    return obj;
  },
  create(base) {
    return C2SSyncChat.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SSyncChat();
    message.playerId = object.playerId ?? 0;
    return message;
  }
};
function createBaseS2CSyncChat() {
  return { result: 0 };
}
const S2CSyncChat = {
  $type: "Room.S2CSyncChat",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSyncChat();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? syncChatResultCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = syncChatResultCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CSyncChat.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSyncChat();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseC2SStartMatch() {
  return { blockPlayerIds: [], blockByIds: [], seqNum: 0, filterType: 0 };
}
const C2SStartMatch = {
  $type: "Room.C2SStartMatch",
  encode(message, writer = new BinaryWriter()) {
    if (message.blockPlayerIds !== void 0 && message.blockPlayerIds.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.blockPlayerIds) {
        writer.int32(v);
      }
      writer.join();
    }
    if (message.blockByIds !== void 0 && message.blockByIds.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.blockByIds) {
        writer.int32(v);
      }
      writer.join();
    }
    if (message.seqNum !== void 0 && message.seqNum !== 0) {
      writer.uint32(24).int32(message.seqNum);
    }
    if (message.filterType !== void 0 && message.filterType !== 0) {
      writer.uint32(32).int32(message.filterType);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SStartMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag === 8) {
            message.blockPlayerIds.push(reader.int32());
            continue;
          }
          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.blockPlayerIds.push(reader.int32());
            }
            continue;
          }
          break;
        }
        case 2: {
          if (tag === 16) {
            message.blockByIds.push(reader.int32());
            continue;
          }
          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.blockByIds.push(reader.int32());
            }
            continue;
          }
          break;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.seqNum = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.filterType = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      blockPlayerIds: globalThis.Array.isArray(object?.blockPlayerIds) ? object.blockPlayerIds.map((e) => globalThis.Number(e)) : [],
      blockByIds: globalThis.Array.isArray(object?.blockByIds) ? object.blockByIds.map((e) => globalThis.Number(e)) : [],
      seqNum: isSet(object.seqNum) ? globalThis.Number(object.seqNum) : 0,
      filterType: isSet(object.filterType) ? matchFilterTypeFromJSON(object.filterType) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.blockPlayerIds?.length) {
      obj.blockPlayerIds = message.blockPlayerIds.map((e) => Math.round(e));
    }
    if (message.blockByIds?.length) {
      obj.blockByIds = message.blockByIds.map((e) => Math.round(e));
    }
    if (message.seqNum !== void 0 && message.seqNum !== 0) {
      obj.seqNum = Math.round(message.seqNum);
    }
    if (message.filterType !== void 0 && message.filterType !== 0) {
      obj.filterType = matchFilterTypeToJSON(message.filterType);
    }
    return obj;
  },
  create(base) {
    return C2SStartMatch.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SStartMatch();
    message.blockPlayerIds = object.blockPlayerIds?.map((e) => e) || [];
    message.blockByIds = object.blockByIds?.map((e) => e) || [];
    message.seqNum = object.seqNum ?? 0;
    message.filterType = object.filterType ?? 0;
    return message;
  }
};
function createBaseS2CStartMatch() {
  return { result: 0, matchPlayerId: 0, seqNum: 0, isOnline: false };
}
const S2CStartMatch = {
  $type: "Room.S2CStartMatch",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.matchPlayerId !== void 0 && message.matchPlayerId !== 0) {
      writer.uint32(16).int32(message.matchPlayerId);
    }
    if (message.seqNum !== void 0 && message.seqNum !== 0) {
      writer.uint32(24).int32(message.seqNum);
    }
    if (message.isOnline !== void 0 && message.isOnline !== false) {
      writer.uint32(32).bool(message.isOnline);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CStartMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.matchPlayerId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.seqNum = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.isOnline = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? startMatchResultCodeFromJSON(object.result) : 0,
      matchPlayerId: isSet(object.matchPlayerId) ? globalThis.Number(object.matchPlayerId) : 0,
      seqNum: isSet(object.seqNum) ? globalThis.Number(object.seqNum) : 0,
      isOnline: isSet(object.isOnline) ? globalThis.Boolean(object.isOnline) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = startMatchResultCodeToJSON(message.result);
    }
    if (message.matchPlayerId !== void 0 && message.matchPlayerId !== 0) {
      obj.matchPlayerId = Math.round(message.matchPlayerId);
    }
    if (message.seqNum !== void 0 && message.seqNum !== 0) {
      obj.seqNum = Math.round(message.seqNum);
    }
    if (message.isOnline !== void 0 && message.isOnline !== false) {
      obj.isOnline = message.isOnline;
    }
    return obj;
  },
  create(base) {
    return S2CStartMatch.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CStartMatch();
    message.result = object.result ?? 0;
    message.matchPlayerId = object.matchPlayerId ?? 0;
    message.seqNum = object.seqNum ?? 0;
    message.isOnline = object.isOnline ?? false;
    return message;
  }
};
function createBaseC2SCancelMatch() {
  return {};
}
const C2SCancelMatch = {
  $type: "Room.C2SCancelMatch",
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SCancelMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(_) {
    return {};
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  create(base) {
    return C2SCancelMatch.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseC2SCancelMatch();
    return message;
  }
};
function createBaseS2CCancelMatch() {
  return { result: 0 };
}
const S2CCancelMatch = {
  $type: "Room.S2CCancelMatch",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CCancelMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? cancelMatchResultCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = cancelMatchResultCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CCancelMatch.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CCancelMatch();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseC2SInviteJoinRoom() {
  return { roomData: void 0, inviteCardId: "" };
}
const C2SInviteJoinRoom = {
  $type: "Room.C2SInviteJoinRoom",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomData !== void 0) {
      RoomData.encode(message.roomData, writer.uint32(10).fork()).join();
    }
    if (message.inviteCardId !== void 0 && message.inviteCardId !== "") {
      writer.uint32(18).string(message.inviteCardId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SInviteJoinRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.roomData = RoomData.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.inviteCardId = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      roomData: isSet(object.roomData) ? RoomData.fromJSON(object.roomData) : void 0,
      inviteCardId: isSet(object.inviteCardId) ? globalThis.String(object.inviteCardId) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomData !== void 0) {
      obj.roomData = RoomData.toJSON(message.roomData);
    }
    if (message.inviteCardId !== void 0 && message.inviteCardId !== "") {
      obj.inviteCardId = message.inviteCardId;
    }
    return obj;
  },
  create(base) {
    return C2SInviteJoinRoom.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SInviteJoinRoom();
    message.roomData = object.roomData !== void 0 && object.roomData !== null ? RoomData.fromPartial(object.roomData) : void 0;
    message.inviteCardId = object.inviteCardId ?? "";
    return message;
  }
};
function createBaseS2CInviteJoinRoom() {
  return { result: 0, inviteCardId: "", roomId: 0 };
}
const S2CInviteJoinRoom = {
  $type: "Room.S2CInviteJoinRoom",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.inviteCardId !== void 0 && message.inviteCardId !== "") {
      writer.uint32(18).string(message.inviteCardId);
    }
    if (message.roomId !== void 0 && message.roomId !== 0) {
      writer.uint32(24).int32(message.roomId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CInviteJoinRoom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.inviteCardId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.roomId = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      result: isSet(object.result) ? inviteJoinRoomErrorCodeFromJSON(object.result) : 0,
      inviteCardId: isSet(object.inviteCardId) ? globalThis.String(object.inviteCardId) : "",
      roomId: isSet(object.roomId) ? globalThis.Number(object.roomId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = inviteJoinRoomErrorCodeToJSON(message.result);
    }
    if (message.inviteCardId !== void 0 && message.inviteCardId !== "") {
      obj.inviteCardId = message.inviteCardId;
    }
    if (message.roomId !== void 0 && message.roomId !== 0) {
      obj.roomId = Math.round(message.roomId);
    }
    return obj;
  },
  create(base) {
    return S2CInviteJoinRoom.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CInviteJoinRoom();
    message.result = object.result ?? 0;
    message.inviteCardId = object.inviteCardId ?? "";
    message.roomId = object.roomId ?? 0;
    return message;
  }
};
function createBaseC2SInviteRoomInfo() {
  return { inviteCardIds: [] };
}
const C2SInviteRoomInfo = {
  $type: "Room.C2SInviteRoomInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.inviteCardIds !== void 0 && message.inviteCardIds.length !== 0) {
      for (const v of message.inviteCardIds) {
        writer.uint32(10).string(v);
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SInviteRoomInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = reader.string();
          if (el !== void 0) {
            message.inviteCardIds.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      inviteCardIds: globalThis.Array.isArray(object?.inviteCardIds) ? object.inviteCardIds.map((e) => globalThis.String(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.inviteCardIds?.length) {
      obj.inviteCardIds = message.inviteCardIds;
    }
    return obj;
  },
  create(base) {
    return C2SInviteRoomInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SInviteRoomInfo();
    message.inviteCardIds = object.inviteCardIds?.map((e) => e) || [];
    return message;
  }
};
function createBaseS2CInviteRoomInfo() {
  return { roomInfos: [] };
}
const S2CInviteRoomInfo = {
  $type: "Room.S2CInviteRoomInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomInfos !== void 0 && message.roomInfos.length !== 0) {
      for (const v of message.roomInfos) {
        InviteRoomInfo.encode(v, writer.uint32(10).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CInviteRoomInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = InviteRoomInfo.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.roomInfos.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      roomInfos: globalThis.Array.isArray(object?.roomInfos) ? object.roomInfos.map((e) => InviteRoomInfo.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomInfos?.length) {
      obj.roomInfos = message.roomInfos.map((e) => InviteRoomInfo.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CInviteRoomInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CInviteRoomInfo();
    message.roomInfos = object.roomInfos?.map((e) => InviteRoomInfo.fromPartial(e)) || [];
    return message;
  }
};
function createBaseInviteRoomInfo() {
  return { inviteCardId: "", roomStatus: 0 };
}
const InviteRoomInfo = {
  $type: "Room.InviteRoomInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.inviteCardId !== void 0 && message.inviteCardId !== "") {
      writer.uint32(10).string(message.inviteCardId);
    }
    if (message.roomStatus !== void 0 && message.roomStatus !== 0) {
      writer.uint32(16).int32(message.roomStatus);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseInviteRoomInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.inviteCardId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.roomStatus = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      inviteCardId: isSet(object.inviteCardId) ? globalThis.String(object.inviteCardId) : "",
      roomStatus: isSet(object.roomStatus) ? inviteRoomStatusFromJSON(object.roomStatus) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.inviteCardId !== void 0 && message.inviteCardId !== "") {
      obj.inviteCardId = message.inviteCardId;
    }
    if (message.roomStatus !== void 0 && message.roomStatus !== 0) {
      obj.roomStatus = inviteRoomStatusToJSON(message.roomStatus);
    }
    return obj;
  },
  create(base) {
    return InviteRoomInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseInviteRoomInfo();
    message.inviteCardId = object.inviteCardId ?? "";
    message.roomStatus = object.roomStatus ?? 0;
    return message;
  }
};
function createBaseC2SNormalRoomInfo() {
  return { roomIds: [] };
}
const C2SNormalRoomInfo = {
  $type: "Room.C2SNormalRoomInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomIds !== void 0 && message.roomIds.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.roomIds) {
        writer.int32(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SNormalRoomInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag === 8) {
            message.roomIds.push(reader.int32());
            continue;
          }
          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.roomIds.push(reader.int32());
            }
            continue;
          }
          break;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      roomIds: globalThis.Array.isArray(object?.roomIds) ? object.roomIds.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomIds?.length) {
      obj.roomIds = message.roomIds.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return C2SNormalRoomInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SNormalRoomInfo();
    message.roomIds = object.roomIds?.map((e) => e) || [];
    return message;
  }
};
function createBaseS2CNormalRoomInfo() {
  return { roomData: [] };
}
const S2CNormalRoomInfo = {
  $type: "Room.S2CNormalRoomInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomData !== void 0 && message.roomData.length !== 0) {
      for (const v of message.roomData) {
        NormalRoomStatus.encode(v, writer.uint32(10).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CNormalRoomInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = NormalRoomStatus.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.roomData.push(el);
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      roomData: globalThis.Array.isArray(object?.roomData) ? object.roomData.map((e) => NormalRoomStatus.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomData?.length) {
      obj.roomData = message.roomData.map((e) => NormalRoomStatus.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return S2CNormalRoomInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CNormalRoomInfo();
    message.roomData = object.roomData?.map((e) => NormalRoomStatus.fromPartial(e)) || [];
    return message;
  }
};
function createBaseNormalRoomStatus() {
  return { roomId: 0, isAlive: false };
}
const NormalRoomStatus = {
  $type: "Room.NormalRoomStatus",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomId !== void 0 && message.roomId !== 0) {
      writer.uint32(8).int32(message.roomId);
    }
    if (message.isAlive !== void 0 && message.isAlive !== false) {
      writer.uint32(16).bool(message.isAlive);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseNormalRoomStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.roomId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.isAlive = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      roomId: isSet(object.roomId) ? globalThis.Number(object.roomId) : 0,
      isAlive: isSet(object.isAlive) ? globalThis.Boolean(object.isAlive) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomId !== void 0 && message.roomId !== 0) {
      obj.roomId = Math.round(message.roomId);
    }
    if (message.isAlive !== void 0 && message.isAlive !== false) {
      obj.isAlive = message.isAlive;
    }
    return obj;
  },
  create(base) {
    return NormalRoomStatus.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseNormalRoomStatus();
    message.roomId = object.roomId ?? 0;
    message.isAlive = object.isAlive ?? false;
    return message;
  }
};
function createBaseC2SUpdateRoomInfo() {
  return { roomData: void 0 };
}
const C2SUpdateRoomInfo = {
  $type: "Room.C2SUpdateRoomInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomData !== void 0) {
      RoomData.encode(message.roomData, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SUpdateRoomInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.roomData = RoomData.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { roomData: isSet(object.roomData) ? RoomData.fromJSON(object.roomData) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomData !== void 0) {
      obj.roomData = RoomData.toJSON(message.roomData);
    }
    return obj;
  },
  create(base) {
    return C2SUpdateRoomInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SUpdateRoomInfo();
    message.roomData = object.roomData !== void 0 && object.roomData !== null ? RoomData.fromPartial(object.roomData) : void 0;
    return message;
  }
};
function createBaseS2CUpdateRoomInfo() {
  return { result: 0 };
}
const S2CUpdateRoomInfo = {
  $type: "Room.S2CUpdateRoomInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CUpdateRoomInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? updateRoomInfoErrorCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = updateRoomInfoErrorCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CUpdateRoomInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CUpdateRoomInfo();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CBroadcastUpdateRoomInfo() {
  return { roomData: void 0 };
}
const S2CBroadcastUpdateRoomInfo = {
  $type: "Room.S2CBroadcastUpdateRoomInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomData !== void 0) {
      RoomData.encode(message.roomData, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadcastUpdateRoomInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.roomData = RoomData.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { roomData: isSet(object.roomData) ? RoomData.fromJSON(object.roomData) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomData !== void 0) {
      obj.roomData = RoomData.toJSON(message.roomData);
    }
    return obj;
  },
  create(base) {
    return S2CBroadcastUpdateRoomInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadcastUpdateRoomInfo();
    message.roomData = object.roomData !== void 0 && object.roomData !== null ? RoomData.fromPartial(object.roomData) : void 0;
    return message;
  }
};
function createBaseC2SSetMatchFilterType() {
  return { filterType: 0 };
}
const C2SSetMatchFilterType = {
  $type: "Room.C2SSetMatchFilterType",
  encode(message, writer = new BinaryWriter()) {
    if (message.filterType !== void 0 && message.filterType !== 0) {
      writer.uint32(8).int32(message.filterType);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SSetMatchFilterType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.filterType = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { filterType: isSet(object.filterType) ? matchFilterTypeFromJSON(object.filterType) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.filterType !== void 0 && message.filterType !== 0) {
      obj.filterType = matchFilterTypeToJSON(message.filterType);
    }
    return obj;
  },
  create(base) {
    return C2SSetMatchFilterType.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SSetMatchFilterType();
    message.filterType = object.filterType ?? 0;
    return message;
  }
};
function createBaseS2CSetMatchFilterType() {
  return { result: 0 };
}
const S2CSetMatchFilterType = {
  $type: "Room.S2CSetMatchFilterType",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSetMatchFilterType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.result = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { result: isSet(object.result) ? filterTypeErrorCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = filterTypeErrorCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CSetMatchFilterType.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSetMatchFilterType();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseC2SGetMatchFilterType() {
  return {};
}
const C2SGetMatchFilterType = {
  $type: "Room.C2SGetMatchFilterType",
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SGetMatchFilterType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(_) {
    return {};
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  create(base) {
    return C2SGetMatchFilterType.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseC2SGetMatchFilterType();
    return message;
  }
};
function createBaseS2CGetMatchFilterType() {
  return { filterType: 0 };
}
const S2CGetMatchFilterType = {
  $type: "Room.S2CGetMatchFilterType",
  encode(message, writer = new BinaryWriter()) {
    if (message.filterType !== void 0 && message.filterType !== 0) {
      writer.uint32(8).int32(message.filterType);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CGetMatchFilterType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.filterType = reader.int32();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { filterType: isSet(object.filterType) ? matchFilterTypeFromJSON(object.filterType) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.filterType !== void 0 && message.filterType !== 0) {
      obj.filterType = matchFilterTypeToJSON(message.filterType);
    }
    return obj;
  },
  create(base) {
    return S2CGetMatchFilterType.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CGetMatchFilterType();
    message.filterType = object.filterType ?? 0;
    return message;
  }
};
function createBaseVideoConfig() {
  return { videoUrl: "", currentTime: 0, isPlay: false };
}
const VideoConfig = {
  $type: "Room.VideoConfig",
  encode(message, writer = new BinaryWriter()) {
    if (message.videoUrl !== void 0 && message.videoUrl !== "") {
      writer.uint32(10).string(message.videoUrl);
    }
    if (message.currentTime !== void 0 && message.currentTime !== 0) {
      writer.uint32(16).int32(message.currentTime);
    }
    if (message.isPlay !== void 0 && message.isPlay !== false) {
      writer.uint32(24).bool(message.isPlay);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseVideoConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.videoUrl = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.currentTime = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.isPlay = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return {
      videoUrl: isSet(object.videoUrl) ? globalThis.String(object.videoUrl) : "",
      currentTime: isSet(object.currentTime) ? globalThis.Number(object.currentTime) : 0,
      isPlay: isSet(object.isPlay) ? globalThis.Boolean(object.isPlay) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.videoUrl !== void 0 && message.videoUrl !== "") {
      obj.videoUrl = message.videoUrl;
    }
    if (message.currentTime !== void 0 && message.currentTime !== 0) {
      obj.currentTime = Math.round(message.currentTime);
    }
    if (message.isPlay !== void 0 && message.isPlay !== false) {
      obj.isPlay = message.isPlay;
    }
    return obj;
  },
  create(base) {
    return VideoConfig.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseVideoConfig();
    message.videoUrl = object.videoUrl ?? "";
    message.currentTime = object.currentTime ?? 0;
    message.isPlay = object.isPlay ?? false;
    return message;
  }
};
function createBaseC2SSet3DVideoConfig() {
  return { videoConfig: void 0 };
}
const C2SSet3DVideoConfig = {
  $type: "Room.C2SSet3DVideoConfig",
  encode(message, writer = new BinaryWriter()) {
    if (message.videoConfig !== void 0) {
      VideoConfig.encode(message.videoConfig, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SSet3DVideoConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.videoConfig = VideoConfig.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { videoConfig: isSet(object.videoConfig) ? VideoConfig.fromJSON(object.videoConfig) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.videoConfig !== void 0) {
      obj.videoConfig = VideoConfig.toJSON(message.videoConfig);
    }
    return obj;
  },
  create(base) {
    return C2SSet3DVideoConfig.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SSet3DVideoConfig();
    message.videoConfig = object.videoConfig !== void 0 && object.videoConfig !== null ? VideoConfig.fromPartial(object.videoConfig) : void 0;
    return message;
  }
};
function createBaseS2CSet3DVideoConfig() {
  return { isSuccess: false };
}
const S2CSet3DVideoConfig = {
  $type: "Room.S2CSet3DVideoConfig",
  encode(message, writer = new BinaryWriter()) {
    if (message.isSuccess !== void 0 && message.isSuccess !== false) {
      writer.uint32(8).bool(message.isSuccess);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSet3DVideoConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.isSuccess = reader.bool();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { isSuccess: isSet(object.isSuccess) ? globalThis.Boolean(object.isSuccess) : false };
  },
  toJSON(message) {
    const obj = {};
    if (message.isSuccess !== void 0 && message.isSuccess !== false) {
      obj.isSuccess = message.isSuccess;
    }
    return obj;
  },
  create(base) {
    return S2CSet3DVideoConfig.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSet3DVideoConfig();
    message.isSuccess = object.isSuccess ?? false;
    return message;
  }
};
function createBaseS2CBroadcast3DVideoConfig() {
  return { videoConfig: void 0 };
}
const S2CBroadcast3DVideoConfig = {
  $type: "Room.S2CBroadcast3DVideoConfig",
  encode(message, writer = new BinaryWriter()) {
    if (message.videoConfig !== void 0) {
      VideoConfig.encode(message.videoConfig, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBroadcast3DVideoConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.videoConfig = VideoConfig.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { videoConfig: isSet(object.videoConfig) ? VideoConfig.fromJSON(object.videoConfig) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.videoConfig !== void 0) {
      obj.videoConfig = VideoConfig.toJSON(message.videoConfig);
    }
    return obj;
  },
  create(base) {
    return S2CBroadcast3DVideoConfig.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBroadcast3DVideoConfig();
    message.videoConfig = object.videoConfig !== void 0 && object.videoConfig !== null ? VideoConfig.fromPartial(object.videoConfig) : void 0;
    return message;
  }
};
function createBaseC2SGet3DVideoConfig() {
  return {};
}
const C2SGet3DVideoConfig = {
  $type: "Room.C2SGet3DVideoConfig",
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SGet3DVideoConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(_) {
    return {};
  },
  toJSON(_) {
    const obj = {};
    return obj;
  },
  create(base) {
    return C2SGet3DVideoConfig.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseC2SGet3DVideoConfig();
    return message;
  }
};
function createBaseS2CGet3DVideoConfig() {
  return { videoConfig: void 0 };
}
const S2CGet3DVideoConfig = {
  $type: "Room.S2CGet3DVideoConfig",
  encode(message, writer = new BinaryWriter()) {
    if (message.videoConfig !== void 0) {
      VideoConfig.encode(message.videoConfig, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CGet3DVideoConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.videoConfig = VideoConfig.decode(reader, reader.uint32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
  fromJSON(object) {
    return { videoConfig: isSet(object.videoConfig) ? VideoConfig.fromJSON(object.videoConfig) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.videoConfig !== void 0) {
      obj.videoConfig = VideoConfig.toJSON(message.videoConfig);
    }
    return obj;
  },
  create(base) {
    return S2CGet3DVideoConfig.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CGet3DVideoConfig();
    message.videoConfig = object.videoConfig !== void 0 && object.videoConfig !== null ? VideoConfig.fromPartial(object.videoConfig) : void 0;
    return message;
  }
};
function longToNumber(int64) {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}
function isSet(value) {
  return value !== null && value !== void 0;
}
export {
  C2SAgoraToken,
  C2SCancelMatch,
  C2SChangeAvatar,
  C2SChangeMMOStatus,
  C2SCreateRoom,
  C2SCzarOpenCard,
  C2SCzarSelectWinCard,
  C2SEnterRoom,
  C2SFakeStartEncounter,
  C2SFollowNotify,
  C2SForceNextRound,
  C2SGet3DVideoConfig,
  C2SGetMatchFilterType,
  C2SHeartBeat,
  C2SInviteJoinRoom,
  C2SInviteRoomInfo,
  C2SKickOut,
  C2SLeaveRoom,
  C2SLeaveSeat,
  C2SLeaveSofa,
  C2SNormalRoomInfo,
  C2SReAnchor,
  C2SSelectCard,
  C2SSet3DVideoConfig,
  C2SSetMatchFilterType,
  C2SSitSeat,
  C2SSitSofa,
  C2SStartEncounter,
  C2SStartGame,
  C2SStartMatch,
  C2SStatEncounter,
  C2SStatEncounterMeta,
  C2SSyncBlendShape,
  C2SSyncChat,
  C2SSyncHand,
  C2SSyncHeadStatus,
  C2SSyncMessage,
  C2SSyncShoulder,
  C2SUpdateRoomInfo,
  C2SVoiceInfo,
  CancelMatchResultCode,
  Card,
  CardType,
  CreateRoomErrorCode,
  EncounterEntity,
  EncounterUserInfo,
  EnterRoomErrorCode,
  FilterTypeErrorCode,
  FollowNotifyResult,
  ForceNextRoundResultCode,
  GameStatus,
  GameStatusId,
  HeadStatus,
  InviteJoinRoomErrorCode,
  InviteRoomInfo,
  InviteRoomStatus,
  KickErrorCode,
  MMOStatus,
  MatchFilterType,
  NormalRoomStatus,
  PhoneInfo,
  Platform,
  PlayerGameStat,
  ReAnchorErrorCode,
  Role,
  RoomData,
  RoomErrorCode,
  RoomPermissiion,
  S2CAgoraToken,
  S2CBroadCastChangeAvatar,
  S2CBroadCastEnterRoom,
  S2CBroadCastGameReady,
  S2CBroadCastGameStatus,
  S2CBroadCastLeaveRoom,
  S2CBroadCastMMOStatus,
  S2CBroadCastOpenCard,
  S2CBroadCastPlayerSelectCard,
  S2CBroadCastSeatStatus,
  S2CBroadCastSofaStatus,
  S2CBroadCastSyncMessage,
  S2CBroadcast3DVideoConfig,
  S2CBroadcastCzarWinCard,
  S2CBroadcastFollowNotify,
  S2CBroadcastForceNextRound,
  S2CBroadcastHand,
  S2CBroadcastShoulder,
  S2CBroadcastSyncBlendShape,
  S2CBroadcastSyncHeadStatus,
  S2CBroadcastUpdateRoomInfo,
  S2CBroadcastVoiceInfo,
  S2CCancelMatch,
  S2CChangeAvatar,
  S2CCreateRoom,
  S2CCzarOpenCard,
  S2CCzarSelectWinCard,
  S2CEnterRoom,
  S2CFollowNotify,
  S2CForceKickOut,
  S2CForceNextRound,
  S2CGet3DVideoConfig,
  S2CGetMatchFilterType,
  S2CHeartBeat,
  S2CInviteJoinRoom,
  S2CInviteRoomInfo,
  S2CKickOut,
  S2CLeaveRoom,
  S2CLeaveSeat,
  S2CLeaveSofa,
  S2CNormalRoomInfo,
  S2CReAnchor,
  S2CRoomWatching,
  S2CSelectCard,
  S2CSet3DVideoConfig,
  S2CSetMatchFilterType,
  S2CSitSeat,
  S2CSitSofa,
  S2CStartEncounter,
  S2CStartGame,
  S2CStartMatch,
  S2CStatEncounter,
  S2CStatEncounterMeta,
  S2CSyncBlendShape,
  S2CSyncChat,
  S2CSyncHand,
  S2CSyncHeadStatus,
  S2CSyncMessage,
  S2CSyncShoulder,
  S2CUpdateRoomInfo,
  S2CVoiceInfo,
  Seat,
  SeatResultCode,
  SeatStatus,
  Sofa,
  SofaResultCode,
  SofaStatus,
  StartMatchResultCode,
  StatEncounterErrorCode,
  StatType,
  SyncChatResultCode,
  UpdateRoomInfoErrorCode,
  UserBlendShape,
  UserHandTrackingInfo,
  UserInfo,
  UserStatus,
  VideoConfig,
  VoiceErrorCode,
  VoiceMsg,
  cancelMatchResultCodeFromJSON,
  cancelMatchResultCodeToJSON,
  cardTypeFromJSON,
  cardTypeToJSON,
  createRoomErrorCodeFromJSON,
  createRoomErrorCodeToJSON,
  enterRoomErrorCodeFromJSON,
  enterRoomErrorCodeToJSON,
  filterTypeErrorCodeFromJSON,
  filterTypeErrorCodeToJSON,
  followNotifyResultFromJSON,
  followNotifyResultToJSON,
  forceNextRoundResultCodeFromJSON,
  forceNextRoundResultCodeToJSON,
  gameStatusIdFromJSON,
  gameStatusIdToJSON,
  inviteJoinRoomErrorCodeFromJSON,
  inviteJoinRoomErrorCodeToJSON,
  inviteRoomStatusFromJSON,
  inviteRoomStatusToJSON,
  kickErrorCodeFromJSON,
  kickErrorCodeToJSON,
  mMOStatusFromJSON,
  mMOStatusToJSON,
  matchFilterTypeFromJSON,
  matchFilterTypeToJSON,
  platformFromJSON,
  platformToJSON,
  protobufPackage,
  reAnchorErrorCodeFromJSON,
  reAnchorErrorCodeToJSON,
  roleFromJSON,
  roleToJSON,
  roomErrorCodeFromJSON,
  roomErrorCodeToJSON,
  roomPermissiionFromJSON,
  roomPermissiionToJSON,
  seatResultCodeFromJSON,
  seatResultCodeToJSON,
  seatStatusFromJSON,
  seatStatusToJSON,
  sofaResultCodeFromJSON,
  sofaResultCodeToJSON,
  sofaStatusFromJSON,
  sofaStatusToJSON,
  startMatchResultCodeFromJSON,
  startMatchResultCodeToJSON,
  statEncounterErrorCodeFromJSON,
  statEncounterErrorCodeToJSON,
  statTypeFromJSON,
  statTypeToJSON,
  syncChatResultCodeFromJSON,
  syncChatResultCodeToJSON,
  updateRoomInfoErrorCodeFromJSON,
  updateRoomInfoErrorCodeToJSON,
  voiceErrorCodeFromJSON,
  voiceErrorCodeToJSON
};
