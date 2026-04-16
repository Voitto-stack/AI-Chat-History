import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { UserInfo } from "../archat_api/user_api";
const protobufPackage = "Match";
var appOnlineStatus = /* @__PURE__ */ ((appOnlineStatus2) => {
  appOnlineStatus2[appOnlineStatus2["UNKNOWN"] = 0] = "UNKNOWN";
  appOnlineStatus2[appOnlineStatus2["ONLINE_ACTIVE"] = 1] = "ONLINE_ACTIVE";
  appOnlineStatus2[appOnlineStatus2["ONLINE_INACTIVE"] = 2] = "ONLINE_INACTIVE";
  appOnlineStatus2[appOnlineStatus2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return appOnlineStatus2;
})(appOnlineStatus || {});
function appOnlineStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return 0 /* UNKNOWN */;
    case 1:
    case "ONLINE_ACTIVE":
      return 1 /* ONLINE_ACTIVE */;
    case 2:
    case "ONLINE_INACTIVE":
      return 2 /* ONLINE_INACTIVE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function appOnlineStatusToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN */:
      return "UNKNOWN";
    case 1 /* ONLINE_ACTIVE */:
      return "ONLINE_ACTIVE";
    case 2 /* ONLINE_INACTIVE */:
      return "ONLINE_INACTIVE";
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
var matchPlayerType = /* @__PURE__ */ ((matchPlayerType2) => {
  matchPlayerType2[matchPlayerType2["MATCH_PLAYER_TYPE_REAL_MAN"] = 0] = "MATCH_PLAYER_TYPE_REAL_MAN";
  matchPlayerType2[matchPlayerType2["MATCH_PLAYER_TYPE_REAL_DIGITAL_HUMAN"] = 1] = "MATCH_PLAYER_TYPE_REAL_DIGITAL_HUMAN";
  matchPlayerType2[matchPlayerType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return matchPlayerType2;
})(matchPlayerType || {});
function matchPlayerTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "MATCH_PLAYER_TYPE_REAL_MAN":
      return 0 /* MATCH_PLAYER_TYPE_REAL_MAN */;
    case 1:
    case "MATCH_PLAYER_TYPE_REAL_DIGITAL_HUMAN":
      return 1 /* MATCH_PLAYER_TYPE_REAL_DIGITAL_HUMAN */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function matchPlayerTypeToJSON(object) {
  switch (object) {
    case 0 /* MATCH_PLAYER_TYPE_REAL_MAN */:
      return "MATCH_PLAYER_TYPE_REAL_MAN";
    case 1 /* MATCH_PLAYER_TYPE_REAL_DIGITAL_HUMAN */:
      return "MATCH_PLAYER_TYPE_REAL_DIGITAL_HUMAN";
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
var BoostResultCode = /* @__PURE__ */ ((BoostResultCode2) => {
  BoostResultCode2[BoostResultCode2["BOOST_SUCCESS"] = 0] = "BOOST_SUCCESS";
  BoostResultCode2[BoostResultCode2["BOOST_FAILED"] = 10] = "BOOST_FAILED";
  BoostResultCode2[BoostResultCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return BoostResultCode2;
})(BoostResultCode || {});
function boostResultCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "BOOST_SUCCESS":
      return 0 /* BOOST_SUCCESS */;
    case 10:
    case "BOOST_FAILED":
      return 10 /* BOOST_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function boostResultCodeToJSON(object) {
  switch (object) {
    case 0 /* BOOST_SUCCESS */:
      return "BOOST_SUCCESS";
    case 10 /* BOOST_FAILED */:
      return "BOOST_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var tcpCommonCode = /* @__PURE__ */ ((tcpCommonCode2) => {
  tcpCommonCode2[tcpCommonCode2["TCP_COMMON_CODE_SUCCESS"] = 0] = "TCP_COMMON_CODE_SUCCESS";
  tcpCommonCode2[tcpCommonCode2["TCP_COMMON_CODE_FAILED"] = 100] = "TCP_COMMON_CODE_FAILED";
  tcpCommonCode2[tcpCommonCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return tcpCommonCode2;
})(tcpCommonCode || {});
function tcpCommonCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "TCP_COMMON_CODE_SUCCESS":
      return 0 /* TCP_COMMON_CODE_SUCCESS */;
    case 100:
    case "TCP_COMMON_CODE_FAILED":
      return 100 /* TCP_COMMON_CODE_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function tcpCommonCodeToJSON(object) {
  switch (object) {
    case 0 /* TCP_COMMON_CODE_SUCCESS */:
      return "TCP_COMMON_CODE_SUCCESS";
    case 100 /* TCP_COMMON_CODE_FAILED */:
      return "TCP_COMMON_CODE_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var LoveRingType = /* @__PURE__ */ ((LoveRingType2) => {
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_DEFAULT"] = 0] = "LOVE_RING_TYPE_DEFAULT";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_START"] = 1] = "LOVE_RING_TYPE_START";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_EXIT"] = 2] = "LOVE_RING_TYPE_EXIT";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_END"] = 3] = "LOVE_RING_TYPE_END";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_MATCH_HOME"] = 4] = "LOVE_RING_TYPE_MATCH_HOME";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_CANCEL"] = 5] = "LOVE_RING_TYPE_CANCEL";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_CLOSE"] = 6] = "LOVE_RING_TYPE_CLOSE";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_AUTO_DISMISS"] = 7] = "LOVE_RING_TYPE_AUTO_DISMISS";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_ACCEPT_REJECTED"] = 8] = "LOVE_RING_TYPE_ACCEPT_REJECTED";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_ACCEPT_INSUFFICIENT_BALANCE"] = 9] = "LOVE_RING_TYPE_ACCEPT_INSUFFICIENT_BALANCE";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_ACCEPT_NO_ANSWER"] = 10] = "LOVE_RING_TYPE_ACCEPT_NO_ANSWER";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_ACCEPT_NOT_CONNECTED"] = 11] = "LOVE_RING_TYPE_ACCEPT_NOT_CONNECTED";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_ACCEPT_CONNECTED_EXIT"] = 12] = "LOVE_RING_TYPE_ACCEPT_CONNECTED_EXIT";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_EXIT_VIDEO_CALL"] = 13] = "LOVE_RING_TYPE_EXIT_VIDEO_CALL";
  LoveRingType2[LoveRingType2["LOVE_RING_TYPE_DISPLAY_FAILED"] = 14] = "LOVE_RING_TYPE_DISPLAY_FAILED";
  LoveRingType2[LoveRingType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return LoveRingType2;
})(LoveRingType || {});
function loveRingTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "LOVE_RING_TYPE_DEFAULT":
      return 0 /* LOVE_RING_TYPE_DEFAULT */;
    case 1:
    case "LOVE_RING_TYPE_START":
      return 1 /* LOVE_RING_TYPE_START */;
    case 2:
    case "LOVE_RING_TYPE_EXIT":
      return 2 /* LOVE_RING_TYPE_EXIT */;
    case 3:
    case "LOVE_RING_TYPE_END":
      return 3 /* LOVE_RING_TYPE_END */;
    case 4:
    case "LOVE_RING_TYPE_MATCH_HOME":
      return 4 /* LOVE_RING_TYPE_MATCH_HOME */;
    case 5:
    case "LOVE_RING_TYPE_CANCEL":
      return 5 /* LOVE_RING_TYPE_CANCEL */;
    case 6:
    case "LOVE_RING_TYPE_CLOSE":
      return 6 /* LOVE_RING_TYPE_CLOSE */;
    case 7:
    case "LOVE_RING_TYPE_AUTO_DISMISS":
      return 7 /* LOVE_RING_TYPE_AUTO_DISMISS */;
    case 8:
    case "LOVE_RING_TYPE_ACCEPT_REJECTED":
      return 8 /* LOVE_RING_TYPE_ACCEPT_REJECTED */;
    case 9:
    case "LOVE_RING_TYPE_ACCEPT_INSUFFICIENT_BALANCE":
      return 9 /* LOVE_RING_TYPE_ACCEPT_INSUFFICIENT_BALANCE */;
    case 10:
    case "LOVE_RING_TYPE_ACCEPT_NO_ANSWER":
      return 10 /* LOVE_RING_TYPE_ACCEPT_NO_ANSWER */;
    case 11:
    case "LOVE_RING_TYPE_ACCEPT_NOT_CONNECTED":
      return 11 /* LOVE_RING_TYPE_ACCEPT_NOT_CONNECTED */;
    case 12:
    case "LOVE_RING_TYPE_ACCEPT_CONNECTED_EXIT":
      return 12 /* LOVE_RING_TYPE_ACCEPT_CONNECTED_EXIT */;
    case 13:
    case "LOVE_RING_TYPE_EXIT_VIDEO_CALL":
      return 13 /* LOVE_RING_TYPE_EXIT_VIDEO_CALL */;
    case 14:
    case "LOVE_RING_TYPE_DISPLAY_FAILED":
      return 14 /* LOVE_RING_TYPE_DISPLAY_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function loveRingTypeToJSON(object) {
  switch (object) {
    case 0 /* LOVE_RING_TYPE_DEFAULT */:
      return "LOVE_RING_TYPE_DEFAULT";
    case 1 /* LOVE_RING_TYPE_START */:
      return "LOVE_RING_TYPE_START";
    case 2 /* LOVE_RING_TYPE_EXIT */:
      return "LOVE_RING_TYPE_EXIT";
    case 3 /* LOVE_RING_TYPE_END */:
      return "LOVE_RING_TYPE_END";
    case 4 /* LOVE_RING_TYPE_MATCH_HOME */:
      return "LOVE_RING_TYPE_MATCH_HOME";
    case 5 /* LOVE_RING_TYPE_CANCEL */:
      return "LOVE_RING_TYPE_CANCEL";
    case 6 /* LOVE_RING_TYPE_CLOSE */:
      return "LOVE_RING_TYPE_CLOSE";
    case 7 /* LOVE_RING_TYPE_AUTO_DISMISS */:
      return "LOVE_RING_TYPE_AUTO_DISMISS";
    case 8 /* LOVE_RING_TYPE_ACCEPT_REJECTED */:
      return "LOVE_RING_TYPE_ACCEPT_REJECTED";
    case 9 /* LOVE_RING_TYPE_ACCEPT_INSUFFICIENT_BALANCE */:
      return "LOVE_RING_TYPE_ACCEPT_INSUFFICIENT_BALANCE";
    case 10 /* LOVE_RING_TYPE_ACCEPT_NO_ANSWER */:
      return "LOVE_RING_TYPE_ACCEPT_NO_ANSWER";
    case 11 /* LOVE_RING_TYPE_ACCEPT_NOT_CONNECTED */:
      return "LOVE_RING_TYPE_ACCEPT_NOT_CONNECTED";
    case 12 /* LOVE_RING_TYPE_ACCEPT_CONNECTED_EXIT */:
      return "LOVE_RING_TYPE_ACCEPT_CONNECTED_EXIT";
    case 13 /* LOVE_RING_TYPE_EXIT_VIDEO_CALL */:
      return "LOVE_RING_TYPE_EXIT_VIDEO_CALL";
    case 14 /* LOVE_RING_TYPE_DISPLAY_FAILED */:
      return "LOVE_RING_TYPE_DISPLAY_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var ChatActionType = /* @__PURE__ */ ((ChatActionType2) => {
  ChatActionType2[ChatActionType2["CHAT_ACTION_TYPE_DEFAULT"] = 0] = "CHAT_ACTION_TYPE_DEFAULT";
  ChatActionType2[ChatActionType2["CHAT_ACTION_TYPE_ENTER"] = 1] = "CHAT_ACTION_TYPE_ENTER";
  ChatActionType2[ChatActionType2["CHAT_ACTION_TYPE_EXIT"] = 2] = "CHAT_ACTION_TYPE_EXIT";
  ChatActionType2[ChatActionType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return ChatActionType2;
})(ChatActionType || {});
function chatActionTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "CHAT_ACTION_TYPE_DEFAULT":
      return 0 /* CHAT_ACTION_TYPE_DEFAULT */;
    case 1:
    case "CHAT_ACTION_TYPE_ENTER":
      return 1 /* CHAT_ACTION_TYPE_ENTER */;
    case 2:
    case "CHAT_ACTION_TYPE_EXIT":
      return 2 /* CHAT_ACTION_TYPE_EXIT */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function chatActionTypeToJSON(object) {
  switch (object) {
    case 0 /* CHAT_ACTION_TYPE_DEFAULT */:
      return "CHAT_ACTION_TYPE_DEFAULT";
    case 1 /* CHAT_ACTION_TYPE_ENTER */:
      return "CHAT_ACTION_TYPE_ENTER";
    case 2 /* CHAT_ACTION_TYPE_EXIT */:
      return "CHAT_ACTION_TYPE_EXIT";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var TimCustomMessageType = /* @__PURE__ */ ((TimCustomMessageType2) => {
  TimCustomMessageType2[TimCustomMessageType2["TIM_CUSTOM_MESSAGE_TYPE_DEFAULT"] = 0] = "TIM_CUSTOM_MESSAGE_TYPE_DEFAULT";
  TimCustomMessageType2[TimCustomMessageType2["TIM_CUSTOM_MESSAGE_TYPE_VIDEO_CALL_TOOL_TIPS"] = 1] = "TIM_CUSTOM_MESSAGE_TYPE_VIDEO_CALL_TOOL_TIPS";
  TimCustomMessageType2[TimCustomMessageType2["TIM_CUSTOM_MESSAGE_TYPE_EXCHANGE_PHONE_NUMBER_TIPS"] = 2] = "TIM_CUSTOM_MESSAGE_TYPE_EXCHANGE_PHONE_NUMBER_TIPS";
  TimCustomMessageType2[TimCustomMessageType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return TimCustomMessageType2;
})(TimCustomMessageType || {});
function timCustomMessageTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "TIM_CUSTOM_MESSAGE_TYPE_DEFAULT":
      return 0 /* TIM_CUSTOM_MESSAGE_TYPE_DEFAULT */;
    case 1:
    case "TIM_CUSTOM_MESSAGE_TYPE_VIDEO_CALL_TOOL_TIPS":
      return 1 /* TIM_CUSTOM_MESSAGE_TYPE_VIDEO_CALL_TOOL_TIPS */;
    case 2:
    case "TIM_CUSTOM_MESSAGE_TYPE_EXCHANGE_PHONE_NUMBER_TIPS":
      return 2 /* TIM_CUSTOM_MESSAGE_TYPE_EXCHANGE_PHONE_NUMBER_TIPS */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function timCustomMessageTypeToJSON(object) {
  switch (object) {
    case 0 /* TIM_CUSTOM_MESSAGE_TYPE_DEFAULT */:
      return "TIM_CUSTOM_MESSAGE_TYPE_DEFAULT";
    case 1 /* TIM_CUSTOM_MESSAGE_TYPE_VIDEO_CALL_TOOL_TIPS */:
      return "TIM_CUSTOM_MESSAGE_TYPE_VIDEO_CALL_TOOL_TIPS";
    case 2 /* TIM_CUSTOM_MESSAGE_TYPE_EXCHANGE_PHONE_NUMBER_TIPS */:
      return "TIM_CUSTOM_MESSAGE_TYPE_EXCHANGE_PHONE_NUMBER_TIPS";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var TimCustomMessageVideoTipsType = /* @__PURE__ */ ((TimCustomMessageVideoTipsType2) => {
  TimCustomMessageVideoTipsType2[TimCustomMessageVideoTipsType2["TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_MESSAGE"] = 0] = "TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_MESSAGE";
  TimCustomMessageVideoTipsType2[TimCustomMessageVideoTipsType2["TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_INTENT"] = 1] = "TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_INTENT";
  TimCustomMessageVideoTipsType2[TimCustomMessageVideoTipsType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return TimCustomMessageVideoTipsType2;
})(TimCustomMessageVideoTipsType || {});
function timCustomMessageVideoTipsTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_MESSAGE":
      return 0 /* TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_MESSAGE */;
    case 1:
    case "TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_INTENT":
      return 1 /* TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_INTENT */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function timCustomMessageVideoTipsTypeToJSON(object) {
  switch (object) {
    case 0 /* TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_MESSAGE */:
      return "TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_MESSAGE";
    case 1 /* TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_INTENT */:
      return "TIM_CUSTOM_MESSAGE_VIDEO_TIPS_TYPE_INTENT";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var DisplayType = /* @__PURE__ */ ((DisplayType2) => {
  DisplayType2[DisplayType2["UNKNOWN_TYPE"] = 0] = "UNKNOWN_TYPE";
  DisplayType2[DisplayType2["SUCCESS"] = 1] = "SUCCESS";
  DisplayType2[DisplayType2["FAIL"] = 2] = "FAIL";
  DisplayType2[DisplayType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return DisplayType2;
})(DisplayType || {});
function displayTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN_TYPE":
      return 0 /* UNKNOWN_TYPE */;
    case 1:
    case "SUCCESS":
      return 1 /* SUCCESS */;
    case 2:
    case "FAIL":
      return 2 /* FAIL */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function displayTypeToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN_TYPE */:
      return "UNKNOWN_TYPE";
    case 1 /* SUCCESS */:
      return "SUCCESS";
    case 2 /* FAIL */:
      return "FAIL";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var UserEvent = /* @__PURE__ */ ((UserEvent2) => {
  UserEvent2[UserEvent2["USER_EVENT_UNKNOWN"] = 0] = "USER_EVENT_UNKNOWN";
  UserEvent2[UserEvent2["USER_EVENT_DH_PWA_SWIPE_CARD_EXPOSURE"] = 1] = "USER_EVENT_DH_PWA_SWIPE_CARD_EXPOSURE";
  UserEvent2[UserEvent2["USER_EVENT_DH_PWA_SWIPE_CARD_LEFT"] = 2] = "USER_EVENT_DH_PWA_SWIPE_CARD_LEFT";
  UserEvent2[UserEvent2["USER_EVENT_DH_PWA_SWIPE_CARD_RIGHT"] = 3] = "USER_EVENT_DH_PWA_SWIPE_CARD_RIGHT";
  UserEvent2[UserEvent2["USER_EVENT_PWA_VIDEO_MATCH_EXPOSURE"] = 4] = "USER_EVENT_PWA_VIDEO_MATCH_EXPOSURE";
  UserEvent2[UserEvent2["USER_EVENT_PWA_VIDEO_MATCH_CLICKED"] = 5] = "USER_EVENT_PWA_VIDEO_MATCH_CLICKED";
  UserEvent2[UserEvent2["USER_EVENT_PWA_VIDEO_MATCH_CALL_CONNECTED"] = 6] = "USER_EVENT_PWA_VIDEO_MATCH_CALL_CONNECTED";
  UserEvent2[UserEvent2["USER_EVENT_PWA_LOVE_BELL_EXPOSURE"] = 7] = "USER_EVENT_PWA_LOVE_BELL_EXPOSURE";
  UserEvent2[UserEvent2["USER_EVENT_PWA_LOVE_BELL_CLICKED"] = 8] = "USER_EVENT_PWA_LOVE_BELL_CLICKED";
  UserEvent2[UserEvent2["USER_EVENT_PWA_LOVE_BELL_CALL_CONNECTED"] = 9] = "USER_EVENT_PWA_LOVE_BELL_CALL_CONNECTED";
  UserEvent2[UserEvent2["USER_EVENT_PWA_TIPS_EXPOSURE"] = 10] = "USER_EVENT_PWA_TIPS_EXPOSURE";
  UserEvent2[UserEvent2["USER_EVENT_PWA_TIPS_CLICKED"] = 11] = "USER_EVENT_PWA_TIPS_CLICKED";
  UserEvent2[UserEvent2["USER_EVENT_PWA_TIPS_CALL_CONNECTED"] = 12] = "USER_EVENT_PWA_TIPS_CALL_CONNECTED";
  UserEvent2[UserEvent2["USER_EVENT_PWA_LOVE_BELL_CALL_REJECT"] = 13] = "USER_EVENT_PWA_LOVE_BELL_CALL_REJECT";
  UserEvent2[UserEvent2["USER_EVENT_PWA_VIDEO_MATCH_DELETE"] = 14] = "USER_EVENT_PWA_VIDEO_MATCH_DELETE";
  UserEvent2[UserEvent2["USER_EVENT_STATUS_BACKEND"] = 15] = "USER_EVENT_STATUS_BACKEND";
  UserEvent2[UserEvent2["USER_EVENT_STATUS_VIDEOING"] = 16] = "USER_EVENT_STATUS_VIDEOING";
  UserEvent2[UserEvent2["USER_EVENT_STATUS_PWA_LEAVE_MSG_TAB"] = 17] = "USER_EVENT_STATUS_PWA_LEAVE_MSG_TAB";
  UserEvent2[UserEvent2["USER_EVENT_PWA_FULL_VIDEO_MATCH_EXPOSURE"] = 18] = "USER_EVENT_PWA_FULL_VIDEO_MATCH_EXPOSURE";
  UserEvent2[UserEvent2["USER_EVENT_PWA_PITY_RANDOM"] = 19] = "USER_EVENT_PWA_PITY_RANDOM";
  UserEvent2[UserEvent2["USER_EVENT_PWA_PITY_RANDOM_REPLY"] = 20] = "USER_EVENT_PWA_PITY_RANDOM_REPLY";
  UserEvent2[UserEvent2["USER_EVENT_PWA_HUNTER"] = 21] = "USER_EVENT_PWA_HUNTER";
  UserEvent2[UserEvent2["USER_EVENT_PWA_HUNTER_REPLY"] = 22] = "USER_EVENT_PWA_HUNTER_REPLY";
  UserEvent2[UserEvent2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return UserEvent2;
})(UserEvent || {});
function userEventFromJSON(object) {
  switch (object) {
    case 0:
    case "USER_EVENT_UNKNOWN":
      return 0 /* USER_EVENT_UNKNOWN */;
    case 1:
    case "USER_EVENT_DH_PWA_SWIPE_CARD_EXPOSURE":
      return 1 /* USER_EVENT_DH_PWA_SWIPE_CARD_EXPOSURE */;
    case 2:
    case "USER_EVENT_DH_PWA_SWIPE_CARD_LEFT":
      return 2 /* USER_EVENT_DH_PWA_SWIPE_CARD_LEFT */;
    case 3:
    case "USER_EVENT_DH_PWA_SWIPE_CARD_RIGHT":
      return 3 /* USER_EVENT_DH_PWA_SWIPE_CARD_RIGHT */;
    case 4:
    case "USER_EVENT_PWA_VIDEO_MATCH_EXPOSURE":
      return 4 /* USER_EVENT_PWA_VIDEO_MATCH_EXPOSURE */;
    case 5:
    case "USER_EVENT_PWA_VIDEO_MATCH_CLICKED":
      return 5 /* USER_EVENT_PWA_VIDEO_MATCH_CLICKED */;
    case 6:
    case "USER_EVENT_PWA_VIDEO_MATCH_CALL_CONNECTED":
      return 6 /* USER_EVENT_PWA_VIDEO_MATCH_CALL_CONNECTED */;
    case 7:
    case "USER_EVENT_PWA_LOVE_BELL_EXPOSURE":
      return 7 /* USER_EVENT_PWA_LOVE_BELL_EXPOSURE */;
    case 8:
    case "USER_EVENT_PWA_LOVE_BELL_CLICKED":
      return 8 /* USER_EVENT_PWA_LOVE_BELL_CLICKED */;
    case 9:
    case "USER_EVENT_PWA_LOVE_BELL_CALL_CONNECTED":
      return 9 /* USER_EVENT_PWA_LOVE_BELL_CALL_CONNECTED */;
    case 10:
    case "USER_EVENT_PWA_TIPS_EXPOSURE":
      return 10 /* USER_EVENT_PWA_TIPS_EXPOSURE */;
    case 11:
    case "USER_EVENT_PWA_TIPS_CLICKED":
      return 11 /* USER_EVENT_PWA_TIPS_CLICKED */;
    case 12:
    case "USER_EVENT_PWA_TIPS_CALL_CONNECTED":
      return 12 /* USER_EVENT_PWA_TIPS_CALL_CONNECTED */;
    case 13:
    case "USER_EVENT_PWA_LOVE_BELL_CALL_REJECT":
      return 13 /* USER_EVENT_PWA_LOVE_BELL_CALL_REJECT */;
    case 14:
    case "USER_EVENT_PWA_VIDEO_MATCH_DELETE":
      return 14 /* USER_EVENT_PWA_VIDEO_MATCH_DELETE */;
    case 15:
    case "USER_EVENT_STATUS_BACKEND":
      return 15 /* USER_EVENT_STATUS_BACKEND */;
    case 16:
    case "USER_EVENT_STATUS_VIDEOING":
      return 16 /* USER_EVENT_STATUS_VIDEOING */;
    case 17:
    case "USER_EVENT_STATUS_PWA_LEAVE_MSG_TAB":
      return 17 /* USER_EVENT_STATUS_PWA_LEAVE_MSG_TAB */;
    case 18:
    case "USER_EVENT_PWA_FULL_VIDEO_MATCH_EXPOSURE":
      return 18 /* USER_EVENT_PWA_FULL_VIDEO_MATCH_EXPOSURE */;
    case 19:
    case "USER_EVENT_PWA_PITY_RANDOM":
      return 19 /* USER_EVENT_PWA_PITY_RANDOM */;
    case 20:
    case "USER_EVENT_PWA_PITY_RANDOM_REPLY":
      return 20 /* USER_EVENT_PWA_PITY_RANDOM_REPLY */;
    case 21:
    case "USER_EVENT_PWA_HUNTER":
      return 21 /* USER_EVENT_PWA_HUNTER */;
    case 22:
    case "USER_EVENT_PWA_HUNTER_REPLY":
      return 22 /* USER_EVENT_PWA_HUNTER_REPLY */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function userEventToJSON(object) {
  switch (object) {
    case 0 /* USER_EVENT_UNKNOWN */:
      return "USER_EVENT_UNKNOWN";
    case 1 /* USER_EVENT_DH_PWA_SWIPE_CARD_EXPOSURE */:
      return "USER_EVENT_DH_PWA_SWIPE_CARD_EXPOSURE";
    case 2 /* USER_EVENT_DH_PWA_SWIPE_CARD_LEFT */:
      return "USER_EVENT_DH_PWA_SWIPE_CARD_LEFT";
    case 3 /* USER_EVENT_DH_PWA_SWIPE_CARD_RIGHT */:
      return "USER_EVENT_DH_PWA_SWIPE_CARD_RIGHT";
    case 4 /* USER_EVENT_PWA_VIDEO_MATCH_EXPOSURE */:
      return "USER_EVENT_PWA_VIDEO_MATCH_EXPOSURE";
    case 5 /* USER_EVENT_PWA_VIDEO_MATCH_CLICKED */:
      return "USER_EVENT_PWA_VIDEO_MATCH_CLICKED";
    case 6 /* USER_EVENT_PWA_VIDEO_MATCH_CALL_CONNECTED */:
      return "USER_EVENT_PWA_VIDEO_MATCH_CALL_CONNECTED";
    case 7 /* USER_EVENT_PWA_LOVE_BELL_EXPOSURE */:
      return "USER_EVENT_PWA_LOVE_BELL_EXPOSURE";
    case 8 /* USER_EVENT_PWA_LOVE_BELL_CLICKED */:
      return "USER_EVENT_PWA_LOVE_BELL_CLICKED";
    case 9 /* USER_EVENT_PWA_LOVE_BELL_CALL_CONNECTED */:
      return "USER_EVENT_PWA_LOVE_BELL_CALL_CONNECTED";
    case 10 /* USER_EVENT_PWA_TIPS_EXPOSURE */:
      return "USER_EVENT_PWA_TIPS_EXPOSURE";
    case 11 /* USER_EVENT_PWA_TIPS_CLICKED */:
      return "USER_EVENT_PWA_TIPS_CLICKED";
    case 12 /* USER_EVENT_PWA_TIPS_CALL_CONNECTED */:
      return "USER_EVENT_PWA_TIPS_CALL_CONNECTED";
    case 13 /* USER_EVENT_PWA_LOVE_BELL_CALL_REJECT */:
      return "USER_EVENT_PWA_LOVE_BELL_CALL_REJECT";
    case 14 /* USER_EVENT_PWA_VIDEO_MATCH_DELETE */:
      return "USER_EVENT_PWA_VIDEO_MATCH_DELETE";
    case 15 /* USER_EVENT_STATUS_BACKEND */:
      return "USER_EVENT_STATUS_BACKEND";
    case 16 /* USER_EVENT_STATUS_VIDEOING */:
      return "USER_EVENT_STATUS_VIDEOING";
    case 17 /* USER_EVENT_STATUS_PWA_LEAVE_MSG_TAB */:
      return "USER_EVENT_STATUS_PWA_LEAVE_MSG_TAB";
    case 18 /* USER_EVENT_PWA_FULL_VIDEO_MATCH_EXPOSURE */:
      return "USER_EVENT_PWA_FULL_VIDEO_MATCH_EXPOSURE";
    case 19 /* USER_EVENT_PWA_PITY_RANDOM */:
      return "USER_EVENT_PWA_PITY_RANDOM";
    case 20 /* USER_EVENT_PWA_PITY_RANDOM_REPLY */:
      return "USER_EVENT_PWA_PITY_RANDOM_REPLY";
    case 21 /* USER_EVENT_PWA_HUNTER */:
      return "USER_EVENT_PWA_HUNTER";
    case 22 /* USER_EVENT_PWA_HUNTER_REPLY */:
      return "USER_EVENT_PWA_HUNTER_REPLY";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseC2SHeartBeat() {
  return { index: 0, status: 0, isCalling: false };
}
const C2SHeartBeat = {
  $type: "Match.C2SHeartBeat",
  encode(message, writer = new BinaryWriter()) {
    if (message.index !== void 0 && message.index !== 0) {
      writer.uint32(8).int32(message.index);
    }
    if (message.status !== void 0 && message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.isCalling !== void 0 && message.isCalling !== false) {
      writer.uint32(24).bool(message.isCalling);
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
          message.isCalling = reader.bool();
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
      index: isSet(object.index) ? globalThis.Number(object.index) : 0,
      status: isSet(object.status) ? appOnlineStatusFromJSON(object.status) : 0,
      isCalling: isSet(object.isCalling) ? globalThis.Boolean(object.isCalling) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.index !== void 0 && message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.status !== void 0 && message.status !== 0) {
      obj.status = appOnlineStatusToJSON(message.status);
    }
    if (message.isCalling !== void 0 && message.isCalling !== false) {
      obj.isCalling = message.isCalling;
    }
    return obj;
  },
  create(base) {
    return C2SHeartBeat.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SHeartBeat();
    message.index = object.index ?? 0;
    message.status = object.status ?? 0;
    message.isCalling = object.isCalling ?? false;
    return message;
  }
};
function createBaseS2CHeartBeat() {
  return { index: 0 };
}
const S2CHeartBeat = {
  $type: "Match.S2CHeartBeat",
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
function createBaseC2SSyncChat() {
  return { playerId: 0 };
}
const C2SSyncChat = {
  $type: "Match.C2SSyncChat",
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
  $type: "Match.S2CSyncChat",
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
  return { seqNum: 0, filterType: 0, clientVer: "" };
}
const C2SStartMatch = {
  $type: "Match.C2SStartMatch",
  encode(message, writer = new BinaryWriter()) {
    if (message.seqNum !== void 0 && message.seqNum !== 0) {
      writer.uint32(8).int32(message.seqNum);
    }
    if (message.filterType !== void 0 && message.filterType !== 0) {
      writer.uint32(16).int32(message.filterType);
    }
    if (message.clientVer !== void 0 && message.clientVer !== "") {
      writer.uint32(26).string(message.clientVer);
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
          if (tag !== 8) {
            break;
          }
          message.seqNum = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.filterType = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.clientVer = reader.string();
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
      seqNum: isSet(object.seqNum) ? globalThis.Number(object.seqNum) : 0,
      filterType: isSet(object.filterType) ? matchFilterTypeFromJSON(object.filterType) : 0,
      clientVer: isSet(object.clientVer) ? globalThis.String(object.clientVer) : isSet(object.client_ver) ? globalThis.String(object.client_ver) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.seqNum !== void 0 && message.seqNum !== 0) {
      obj.seqNum = Math.round(message.seqNum);
    }
    if (message.filterType !== void 0 && message.filterType !== 0) {
      obj.filterType = matchFilterTypeToJSON(message.filterType);
    }
    if (message.clientVer !== void 0 && message.clientVer !== "") {
      obj.clientVer = message.clientVer;
    }
    return obj;
  },
  create(base) {
    return C2SStartMatch.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SStartMatch();
    message.seqNum = object.seqNum ?? 0;
    message.filterType = object.filterType ?? 0;
    message.clientVer = object.clientVer ?? "";
    return message;
  }
};
function createBaseS2CStartMatch() {
  return { result: 0, matchPlayerId: 0, seqNum: 0, isOnline: false, matchPlayerType: 0, botId: "" };
}
const S2CStartMatch = {
  $type: "Match.S2CStartMatch",
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
    if (message.matchPlayerType !== void 0 && message.matchPlayerType !== 0) {
      writer.uint32(40).int32(message.matchPlayerType);
    }
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(50).string(message.botId);
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
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.matchPlayerType = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.botId = reader.string();
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
      isOnline: isSet(object.isOnline) ? globalThis.Boolean(object.isOnline) : false,
      matchPlayerType: isSet(object.matchPlayerType) ? matchPlayerTypeFromJSON(object.matchPlayerType) : 0,
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : ""
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
    if (message.matchPlayerType !== void 0 && message.matchPlayerType !== 0) {
      obj.matchPlayerType = matchPlayerTypeToJSON(message.matchPlayerType);
    }
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
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
    message.matchPlayerType = object.matchPlayerType ?? 0;
    message.botId = object.botId ?? "";
    return message;
  }
};
function createBaseC2SCancelMatch() {
  return {};
}
const C2SCancelMatch = {
  $type: "Match.C2SCancelMatch",
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
  $type: "Match.S2CCancelMatch",
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
function createBaseC2SSetMatchFilterType() {
  return { filterType: 0 };
}
const C2SSetMatchFilterType = {
  $type: "Match.C2SSetMatchFilterType",
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
  $type: "Match.S2CSetMatchFilterType",
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
  $type: "Match.C2SGetMatchFilterType",
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
  $type: "Match.S2CGetMatchFilterType",
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
function createBaseC2SAddToBoost() {
  return {};
}
const C2SAddToBoost = {
  $type: "Match.C2SAddToBoost",
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SAddToBoost();
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
    return C2SAddToBoost.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseC2SAddToBoost();
    return message;
  }
};
function createBaseS2CAddToBoost() {
  return { result: 0 };
}
const S2CAddToBoost = {
  $type: "Match.S2CAddToBoost",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CAddToBoost();
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
    return { result: isSet(object.result) ? boostResultCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = boostResultCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CAddToBoost.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CAddToBoost();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CBoostMatch() {
  return { matchPlayerId: 0 };
}
const S2CBoostMatch = {
  $type: "Match.S2CBoostMatch",
  encode(message, writer = new BinaryWriter()) {
    if (message.matchPlayerId !== void 0 && message.matchPlayerId !== 0) {
      writer.uint32(8).int32(message.matchPlayerId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CBoostMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.matchPlayerId = reader.int32();
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
    return { matchPlayerId: isSet(object.matchPlayerId) ? globalThis.Number(object.matchPlayerId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.matchPlayerId !== void 0 && message.matchPlayerId !== 0) {
      obj.matchPlayerId = Math.round(message.matchPlayerId);
    }
    return obj;
  },
  create(base) {
    return S2CBoostMatch.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CBoostMatch();
    message.matchPlayerId = object.matchPlayerId ?? 0;
    return message;
  }
};
function createBaseC2SAddToVipBoost() {
  return {};
}
const C2SAddToVipBoost = {
  $type: "Match.C2SAddToVipBoost",
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SAddToVipBoost();
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
    return C2SAddToVipBoost.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseC2SAddToVipBoost();
    return message;
  }
};
function createBaseS2CAddToVipBoost() {
  return { result: 0 };
}
const S2CAddToVipBoost = {
  $type: "Match.S2CAddToVipBoost",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CAddToVipBoost();
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
    return { result: isSet(object.result) ? boostResultCodeFromJSON(object.result) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.result !== void 0 && message.result !== 0) {
      obj.result = boostResultCodeToJSON(message.result);
    }
    return obj;
  },
  create(base) {
    return S2CAddToVipBoost.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CAddToVipBoost();
    message.result = object.result ?? 0;
    return message;
  }
};
function createBaseS2CVipBoostMatch() {
  return { matchPlayerId: 0 };
}
const S2CVipBoostMatch = {
  $type: "Match.S2CVipBoostMatch",
  encode(message, writer = new BinaryWriter()) {
    if (message.matchPlayerId !== void 0 && message.matchPlayerId !== 0) {
      writer.uint32(8).int32(message.matchPlayerId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CVipBoostMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.matchPlayerId = reader.int32();
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
    return { matchPlayerId: isSet(object.matchPlayerId) ? globalThis.Number(object.matchPlayerId) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.matchPlayerId !== void 0 && message.matchPlayerId !== 0) {
      obj.matchPlayerId = Math.round(message.matchPlayerId);
    }
    return obj;
  },
  create(base) {
    return S2CVipBoostMatch.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CVipBoostMatch();
    message.matchPlayerId = object.matchPlayerId ?? 0;
    return message;
  }
};
function createBaseC2SStartLoveRing() {
  return { loveRingType: 0 };
}
const C2SStartLoveRing = {
  $type: "Match.C2SStartLoveRing",
  encode(message, writer = new BinaryWriter()) {
    if (message.loveRingType !== void 0 && message.loveRingType !== 0) {
      writer.uint32(8).int32(message.loveRingType);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SStartLoveRing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.loveRingType = reader.int32();
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
    return { loveRingType: isSet(object.loveRingType) ? loveRingTypeFromJSON(object.loveRingType) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.loveRingType !== void 0 && message.loveRingType !== 0) {
      obj.loveRingType = loveRingTypeToJSON(message.loveRingType);
    }
    return obj;
  },
  create(base) {
    return C2SStartLoveRing.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SStartLoveRing();
    message.loveRingType = object.loveRingType ?? 0;
    return message;
  }
};
function createBaseS2CStartLoveRing() {
  return { code: 0 };
}
const S2CStartLoveRing = {
  $type: "Match.S2CStartLoveRing",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CStartLoveRing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.code = reader.int32();
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
    return { code: isSet(object.code) ? tcpCommonCodeFromJSON(object.code) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = tcpCommonCodeToJSON(message.code);
    }
    return obj;
  },
  create(base) {
    return S2CStartLoveRing.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CStartLoveRing();
    message.code = object.code ?? 0;
    return message;
  }
};
function createBaseS2CLoveRingPush() {
  return { user: void 0 };
}
const S2CLoveRingPush = {
  $type: "Match.S2CLoveRingPush",
  encode(message, writer = new BinaryWriter()) {
    if (message.user !== void 0) {
      UserInfo.encode(message.user, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CLoveRingPush();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.user = UserInfo.decode(reader, reader.uint32());
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
    return { user: isSet(object.user) ? UserInfo.fromJSON(object.user) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.user !== void 0) {
      obj.user = UserInfo.toJSON(message.user);
    }
    return obj;
  },
  create(base) {
    return S2CLoveRingPush.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CLoveRingPush();
    message.user = object.user !== void 0 && object.user !== null ? UserInfo.fromPartial(object.user) : void 0;
    return message;
  }
};
function createBaseC2SMatchCardPush() {
  return {};
}
const C2SMatchCardPush = {
  $type: "Match.C2SMatchCardPush",
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SMatchCardPush();
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
    return C2SMatchCardPush.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseC2SMatchCardPush();
    return message;
  }
};
function createBaseS2CMatchCardPush() {
  return { user: void 0 };
}
const S2CMatchCardPush = {
  $type: "Match.S2CMatchCardPush",
  encode(message, writer = new BinaryWriter()) {
    if (message.user !== void 0) {
      UserInfo.encode(message.user, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CMatchCardPush();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.user = UserInfo.decode(reader, reader.uint32());
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
    return { user: isSet(object.user) ? UserInfo.fromJSON(object.user) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.user !== void 0) {
      obj.user = UserInfo.toJSON(message.user);
    }
    return obj;
  },
  create(base) {
    return S2CMatchCardPush.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CMatchCardPush();
    message.user = object.user !== void 0 && object.user !== null ? UserInfo.fromPartial(object.user) : void 0;
    return message;
  }
};
function createBaseC2SChatAction() {
  return { chatActionType: 0, userId: 0 };
}
const C2SChatAction = {
  $type: "Match.C2SChatAction",
  encode(message, writer = new BinaryWriter()) {
    if (message.chatActionType !== void 0 && message.chatActionType !== 0) {
      writer.uint32(8).int32(message.chatActionType);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(16).int32(message.userId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SChatAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.chatActionType = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.userId = reader.int32();
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
      chatActionType: isSet(object.chatActionType) ? chatActionTypeFromJSON(object.chatActionType) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.chatActionType !== void 0 && message.chatActionType !== 0) {
      obj.chatActionType = chatActionTypeToJSON(message.chatActionType);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    return obj;
  },
  create(base) {
    return C2SChatAction.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SChatAction();
    message.chatActionType = object.chatActionType ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  }
};
function createBaseS2CChatAction() {
  return { code: 0 };
}
const S2CChatAction = {
  $type: "Match.S2CChatAction",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CChatAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.code = reader.int32();
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
    return { code: isSet(object.code) ? tcpCommonCodeFromJSON(object.code) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = tcpCommonCodeToJSON(message.code);
    }
    return obj;
  },
  create(base) {
    return S2CChatAction.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CChatAction();
    message.code = object.code ?? 0;
    return message;
  }
};
function createBaseS2CIsTyping() {
  return { fromUserId: 0, delay: 0 };
}
const S2CIsTyping = {
  $type: "Match.S2CIsTyping",
  encode(message, writer = new BinaryWriter()) {
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      writer.uint32(8).int32(message.fromUserId);
    }
    if (message.delay !== void 0 && message.delay !== 0) {
      writer.uint32(16).int32(message.delay);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CIsTyping();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.fromUserId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.delay = reader.int32();
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
      fromUserId: isSet(object.fromUserId) ? globalThis.Number(object.fromUserId) : 0,
      delay: isSet(object.delay) ? globalThis.Number(object.delay) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      obj.fromUserId = Math.round(message.fromUserId);
    }
    if (message.delay !== void 0 && message.delay !== 0) {
      obj.delay = Math.round(message.delay);
    }
    return obj;
  },
  create(base) {
    return S2CIsTyping.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CIsTyping();
    message.fromUserId = object.fromUserId ?? 0;
    message.delay = object.delay ?? 0;
    return message;
  }
};
function createBaseS2CIsViewingProfile() {
  return { fromUserId: 0, delay: 0 };
}
const S2CIsViewingProfile = {
  $type: "Match.S2CIsViewingProfile",
  encode(message, writer = new BinaryWriter()) {
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      writer.uint32(8).int32(message.fromUserId);
    }
    if (message.delay !== void 0 && message.delay !== 0) {
      writer.uint32(16).int32(message.delay);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CIsViewingProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.fromUserId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.delay = reader.int32();
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
      fromUserId: isSet(object.fromUserId) ? globalThis.Number(object.fromUserId) : 0,
      delay: isSet(object.delay) ? globalThis.Number(object.delay) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      obj.fromUserId = Math.round(message.fromUserId);
    }
    if (message.delay !== void 0 && message.delay !== 0) {
      obj.delay = Math.round(message.delay);
    }
    return obj;
  },
  create(base) {
    return S2CIsViewingProfile.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CIsViewingProfile();
    message.fromUserId = object.fromUserId ?? 0;
    message.delay = object.delay ?? 0;
    return message;
  }
};
function createBaseC2SReportLoveRing() {
  return { displayType: 0, userId: 0 };
}
const C2SReportLoveRing = {
  $type: "Match.C2SReportLoveRing",
  encode(message, writer = new BinaryWriter()) {
    if (message.displayType !== void 0 && message.displayType !== 0) {
      writer.uint32(8).int32(message.displayType);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(16).int32(message.userId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SReportLoveRing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.displayType = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.userId = reader.int32();
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
      displayType: isSet(object.displayType) ? displayTypeFromJSON(object.displayType) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.displayType !== void 0 && message.displayType !== 0) {
      obj.displayType = displayTypeToJSON(message.displayType);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    return obj;
  },
  create(base) {
    return C2SReportLoveRing.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SReportLoveRing();
    message.displayType = object.displayType ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  }
};
function createBaseS2CReportLoveRing() {
  return { code: 0 };
}
const S2CReportLoveRing = {
  $type: "Match.S2CReportLoveRing",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CReportLoveRing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.code = reader.int32();
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
    return { code: isSet(object.code) ? tcpCommonCodeFromJSON(object.code) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = tcpCommonCodeToJSON(message.code);
    }
    return obj;
  },
  create(base) {
    return S2CReportLoveRing.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CReportLoveRing();
    message.code = object.code ?? 0;
    return message;
  }
};
function createBaseC2SReportVideoMatch() {
  return { targetUserId: 0 };
}
const C2SReportVideoMatch = {
  $type: "Match.C2SReportVideoMatch",
  encode(message, writer = new BinaryWriter()) {
    if (message.targetUserId !== void 0 && message.targetUserId !== 0) {
      writer.uint32(8).int32(message.targetUserId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SReportVideoMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.targetUserId = reader.int32();
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
      targetUserId: isSet(object.targetUserId) ? globalThis.Number(object.targetUserId) : isSet(object.target_user_id) ? globalThis.Number(object.target_user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.targetUserId !== void 0 && message.targetUserId !== 0) {
      obj.targetUserId = Math.round(message.targetUserId);
    }
    return obj;
  },
  create(base) {
    return C2SReportVideoMatch.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SReportVideoMatch();
    message.targetUserId = object.targetUserId ?? 0;
    return message;
  }
};
function createBaseS2CReportVideoMatch() {
  return { code: 0 };
}
const S2CReportVideoMatch = {
  $type: "Match.S2CReportVideoMatch",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CReportVideoMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.code = reader.int32();
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
    return { code: isSet(object.code) ? tcpCommonCodeFromJSON(object.code) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = tcpCommonCodeToJSON(message.code);
    }
    return obj;
  },
  create(base) {
    return S2CReportVideoMatch.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CReportVideoMatch();
    message.code = object.code ?? 0;
    return message;
  }
};
function createBaseS2CCancelVideoMatch() {
  return { targetUserId: 0 };
}
const S2CCancelVideoMatch = {
  $type: "Match.S2CCancelVideoMatch",
  encode(message, writer = new BinaryWriter()) {
    if (message.targetUserId !== void 0 && message.targetUserId !== 0) {
      writer.uint32(8).int32(message.targetUserId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CCancelVideoMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.targetUserId = reader.int32();
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
      targetUserId: isSet(object.targetUserId) ? globalThis.Number(object.targetUserId) : isSet(object.target_user_id) ? globalThis.Number(object.target_user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.targetUserId !== void 0 && message.targetUserId !== 0) {
      obj.targetUserId = Math.round(message.targetUserId);
    }
    return obj;
  },
  create(base) {
    return S2CCancelVideoMatch.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CCancelVideoMatch();
    message.targetUserId = object.targetUserId ?? 0;
    return message;
  }
};
function createBaseS2CCancelLoveRing() {
  return { targetUserId: 0 };
}
const S2CCancelLoveRing = {
  $type: "Match.S2CCancelLoveRing",
  encode(message, writer = new BinaryWriter()) {
    if (message.targetUserId !== void 0 && message.targetUserId !== 0) {
      writer.uint32(8).int32(message.targetUserId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CCancelLoveRing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.targetUserId = reader.int32();
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
      targetUserId: isSet(object.targetUserId) ? globalThis.Number(object.targetUserId) : isSet(object.target_user_id) ? globalThis.Number(object.target_user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.targetUserId !== void 0 && message.targetUserId !== 0) {
      obj.targetUserId = Math.round(message.targetUserId);
    }
    return obj;
  },
  create(base) {
    return S2CCancelLoveRing.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CCancelLoveRing();
    message.targetUserId = object.targetUserId ?? 0;
    return message;
  }
};
function createBaseUserAvatarViolationNotify() {
  return { violation: false, reason: "" };
}
const UserAvatarViolationNotify = {
  $type: "Match.UserAvatarViolationNotify",
  encode(message, writer = new BinaryWriter()) {
    if (message.violation !== void 0 && message.violation !== false) {
      writer.uint32(16).bool(message.violation);
    }
    if (message.reason !== void 0 && message.reason !== "") {
      writer.uint32(10).string(message.reason);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUserAvatarViolationNotify();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.violation = reader.bool();
          continue;
        }
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.reason = reader.string();
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
      violation: isSet(object.violation) ? globalThis.Boolean(object.violation) : false,
      reason: isSet(object.reason) ? globalThis.String(object.reason) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.violation !== void 0 && message.violation !== false) {
      obj.violation = message.violation;
    }
    if (message.reason !== void 0 && message.reason !== "") {
      obj.reason = message.reason;
    }
    return obj;
  },
  create(base) {
    return UserAvatarViolationNotify.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUserAvatarViolationNotify();
    message.violation = object.violation ?? false;
    message.reason = object.reason ?? "";
    return message;
  }
};
function createBaseUserAvatarReviewNotify() {
  return { startTime: 0 };
}
const UserAvatarReviewNotify = {
  $type: "Match.UserAvatarReviewNotify",
  encode(message, writer = new BinaryWriter()) {
    if (message.startTime !== void 0 && message.startTime !== 0) {
      writer.uint32(8).int64(message.startTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUserAvatarReviewNotify();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
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
      startTime: isSet(object.startTime) ? globalThis.Number(object.startTime) : isSet(object.start_time) ? globalThis.Number(object.start_time) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.startTime !== void 0 && message.startTime !== 0) {
      obj.startTime = Math.round(message.startTime);
    }
    return obj;
  },
  create(base) {
    return UserAvatarReviewNotify.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUserAvatarReviewNotify();
    message.startTime = object.startTime ?? 0;
    return message;
  }
};
function createBaseS2CPwaVideoRecall() {
  return { femaleUser: void 0 };
}
const S2CPwaVideoRecall = {
  $type: "Match.S2CPwaVideoRecall",
  encode(message, writer = new BinaryWriter()) {
    if (message.femaleUser !== void 0) {
      UserInfo.encode(message.femaleUser, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CPwaVideoRecall();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.femaleUser = UserInfo.decode(reader, reader.uint32());
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
      femaleUser: isSet(object.femaleUser) ? UserInfo.fromJSON(object.femaleUser) : isSet(object.female_user) ? UserInfo.fromJSON(object.female_user) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.femaleUser !== void 0) {
      obj.femaleUser = UserInfo.toJSON(message.femaleUser);
    }
    return obj;
  },
  create(base) {
    return S2CPwaVideoRecall.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CPwaVideoRecall();
    message.femaleUser = object.femaleUser !== void 0 && object.femaleUser !== null ? UserInfo.fromPartial(object.femaleUser) : void 0;
    return message;
  }
};
function createBaseS2CSearchSimulatedUserCallPwa() {
  return { femaleUser: void 0, maleUser: void 0 };
}
const S2CSearchSimulatedUserCallPwa = {
  $type: "Match.S2CSearchSimulatedUserCallPwa",
  encode(message, writer = new BinaryWriter()) {
    if (message.femaleUser !== void 0) {
      UserInfo.encode(message.femaleUser, writer.uint32(10).fork()).join();
    }
    if (message.maleUser !== void 0) {
      UserInfo.encode(message.maleUser, writer.uint32(18).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSearchSimulatedUserCallPwa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.femaleUser = UserInfo.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.maleUser = UserInfo.decode(reader, reader.uint32());
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
      femaleUser: isSet(object.femaleUser) ? UserInfo.fromJSON(object.femaleUser) : isSet(object.female_user) ? UserInfo.fromJSON(object.female_user) : void 0,
      maleUser: isSet(object.maleUser) ? UserInfo.fromJSON(object.maleUser) : isSet(object.male_user) ? UserInfo.fromJSON(object.male_user) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.femaleUser !== void 0) {
      obj.femaleUser = UserInfo.toJSON(message.femaleUser);
    }
    if (message.maleUser !== void 0) {
      obj.maleUser = UserInfo.toJSON(message.maleUser);
    }
    return obj;
  },
  create(base) {
    return S2CSearchSimulatedUserCallPwa.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSearchSimulatedUserCallPwa();
    message.femaleUser = object.femaleUser !== void 0 && object.femaleUser !== null ? UserInfo.fromPartial(object.femaleUser) : void 0;
    message.maleUser = object.maleUser !== void 0 && object.maleUser !== null ? UserInfo.fromPartial(object.maleUser) : void 0;
    return message;
  }
};
function createBaseS2CSearchRealUserCallPwa() {
  return { maleUserId: 0, femaleUser: void 0 };
}
const S2CSearchRealUserCallPwa = {
  $type: "Match.S2CSearchRealUserCallPwa",
  encode(message, writer = new BinaryWriter()) {
    if (message.maleUserId !== void 0 && message.maleUserId !== 0) {
      writer.uint32(8).int32(message.maleUserId);
    }
    if (message.femaleUser !== void 0) {
      UserInfo.encode(message.femaleUser, writer.uint32(18).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSearchRealUserCallPwa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.maleUserId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.femaleUser = UserInfo.decode(reader, reader.uint32());
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
      maleUserId: isSet(object.maleUserId) ? globalThis.Number(object.maleUserId) : isSet(object.male_user_id) ? globalThis.Number(object.male_user_id) : 0,
      femaleUser: isSet(object.femaleUser) ? UserInfo.fromJSON(object.femaleUser) : isSet(object.female_user) ? UserInfo.fromJSON(object.female_user) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.maleUserId !== void 0 && message.maleUserId !== 0) {
      obj.maleUserId = Math.round(message.maleUserId);
    }
    if (message.femaleUser !== void 0) {
      obj.femaleUser = UserInfo.toJSON(message.femaleUser);
    }
    return obj;
  },
  create(base) {
    return S2CSearchRealUserCallPwa.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSearchRealUserCallPwa();
    message.maleUserId = object.maleUserId ?? 0;
    message.femaleUser = object.femaleUser !== void 0 && object.femaleUser !== null ? UserInfo.fromPartial(object.femaleUser) : void 0;
    return message;
  }
};
function createBaseS2CSearchCancel() {
  return { maleUserId: 0, femaleUserId: [] };
}
const S2CSearchCancel = {
  $type: "Match.S2CSearchCancel",
  encode(message, writer = new BinaryWriter()) {
    if (message.maleUserId !== void 0 && message.maleUserId !== 0) {
      writer.uint32(8).int32(message.maleUserId);
    }
    if (message.femaleUserId !== void 0 && message.femaleUserId.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.femaleUserId) {
        writer.int32(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CSearchCancel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.maleUserId = reader.int32();
          continue;
        }
        case 2: {
          if (tag === 16) {
            message.femaleUserId.push(reader.int32());
            continue;
          }
          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.femaleUserId.push(reader.int32());
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
      maleUserId: isSet(object.maleUserId) ? globalThis.Number(object.maleUserId) : isSet(object.male_user_id) ? globalThis.Number(object.male_user_id) : 0,
      femaleUserId: globalThis.Array.isArray(object?.femaleUserId) ? object.femaleUserId.map((e) => globalThis.Number(e)) : globalThis.Array.isArray(object?.female_user_id) ? object.female_user_id.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.maleUserId !== void 0 && message.maleUserId !== 0) {
      obj.maleUserId = Math.round(message.maleUserId);
    }
    if (message.femaleUserId?.length) {
      obj.femaleUserId = message.femaleUserId.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return S2CSearchCancel.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CSearchCancel();
    message.maleUserId = object.maleUserId ?? 0;
    message.femaleUserId = object.femaleUserId?.map((e) => e) || [];
    return message;
  }
};
function createBaseS2CFullScreenVideoPush() {
  return { user: void 0 };
}
const S2CFullScreenVideoPush = {
  $type: "Match.S2CFullScreenVideoPush",
  encode(message, writer = new BinaryWriter()) {
    if (message.user !== void 0) {
      UserInfo.encode(message.user, writer.uint32(10).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CFullScreenVideoPush();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.user = UserInfo.decode(reader, reader.uint32());
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
    return { user: isSet(object.user) ? UserInfo.fromJSON(object.user) : void 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.user !== void 0) {
      obj.user = UserInfo.toJSON(message.user);
    }
    return obj;
  },
  create(base) {
    return S2CFullScreenVideoPush.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CFullScreenVideoPush();
    message.user = object.user !== void 0 && object.user !== null ? UserInfo.fromPartial(object.user) : void 0;
    return message;
  }
};
function createBaseS2CCancelFullScreenVideoPush() {
  return { targetUserId: 0 };
}
const S2CCancelFullScreenVideoPush = {
  $type: "Match.S2CCancelFullScreenVideoPush",
  encode(message, writer = new BinaryWriter()) {
    if (message.targetUserId !== void 0 && message.targetUserId !== 0) {
      writer.uint32(8).int32(message.targetUserId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CCancelFullScreenVideoPush();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.targetUserId = reader.int32();
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
      targetUserId: isSet(object.targetUserId) ? globalThis.Number(object.targetUserId) : isSet(object.target_user_id) ? globalThis.Number(object.target_user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.targetUserId !== void 0 && message.targetUserId !== 0) {
      obj.targetUserId = Math.round(message.targetUserId);
    }
    return obj;
  },
  create(base) {
    return S2CCancelFullScreenVideoPush.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CCancelFullScreenVideoPush();
    message.targetUserId = object.targetUserId ?? 0;
    return message;
  }
};
function createBaseC2SReportUserEvent() {
  return { userId: 0, targetUserId: 0, eventType: 0, timestamp: 0 };
}
const C2SReportUserEvent = {
  $type: "Match.C2SReportUserEvent",
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.targetUserId !== void 0 && message.targetUserId !== 0) {
      writer.uint32(16).int32(message.targetUserId);
    }
    if (message.eventType !== void 0 && message.eventType !== 0) {
      writer.uint32(24).int32(message.eventType);
    }
    if (message.timestamp !== void 0 && message.timestamp !== 0) {
      writer.uint32(32).int64(message.timestamp);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SReportUserEvent();
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
          message.targetUserId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.eventType = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.timestamp = longToNumber(reader.int64());
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
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      targetUserId: isSet(object.targetUserId) ? globalThis.Number(object.targetUserId) : isSet(object.target_user_id) ? globalThis.Number(object.target_user_id) : 0,
      eventType: isSet(object.eventType) ? userEventFromJSON(object.eventType) : isSet(object.event_type) ? userEventFromJSON(object.event_type) : 0,
      timestamp: isSet(object.timestamp) ? globalThis.Number(object.timestamp) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.targetUserId !== void 0 && message.targetUserId !== 0) {
      obj.targetUserId = Math.round(message.targetUserId);
    }
    if (message.eventType !== void 0 && message.eventType !== 0) {
      obj.eventType = userEventToJSON(message.eventType);
    }
    if (message.timestamp !== void 0 && message.timestamp !== 0) {
      obj.timestamp = Math.round(message.timestamp);
    }
    return obj;
  },
  create(base) {
    return C2SReportUserEvent.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SReportUserEvent();
    message.userId = object.userId ?? 0;
    message.targetUserId = object.targetUserId ?? 0;
    message.eventType = object.eventType ?? 0;
    message.timestamp = object.timestamp ?? 0;
    return message;
  }
};
function createBaseS2CReportUserEvent() {
  return { code: 0 };
}
const S2CReportUserEvent = {
  $type: "Match.S2CReportUserEvent",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CReportUserEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.code = reader.int32();
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
    return { code: isSet(object.code) ? tcpCommonCodeFromJSON(object.code) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = tcpCommonCodeToJSON(message.code);
    }
    return obj;
  },
  create(base) {
    return S2CReportUserEvent.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CReportUserEvent();
    message.code = object.code ?? 0;
    return message;
  }
};
function createBaseS2CCancelPwaVideoRecall() {
  return { maleUserId: 0, femaleUserId: 0 };
}
const S2CCancelPwaVideoRecall = {
  $type: "Match.S2CCancelPwaVideoRecall",
  encode(message, writer = new BinaryWriter()) {
    if (message.maleUserId !== void 0 && message.maleUserId !== 0) {
      writer.uint32(8).int32(message.maleUserId);
    }
    if (message.femaleUserId !== void 0 && message.femaleUserId !== 0) {
      writer.uint32(16).int32(message.femaleUserId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CCancelPwaVideoRecall();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.maleUserId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.femaleUserId = reader.int32();
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
      maleUserId: isSet(object.maleUserId) ? globalThis.Number(object.maleUserId) : isSet(object.male_user_id) ? globalThis.Number(object.male_user_id) : 0,
      femaleUserId: isSet(object.femaleUserId) ? globalThis.Number(object.femaleUserId) : isSet(object.female_user_id) ? globalThis.Number(object.female_user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.maleUserId !== void 0 && message.maleUserId !== 0) {
      obj.maleUserId = Math.round(message.maleUserId);
    }
    if (message.femaleUserId !== void 0 && message.femaleUserId !== 0) {
      obj.femaleUserId = Math.round(message.femaleUserId);
    }
    return obj;
  },
  create(base) {
    return S2CCancelPwaVideoRecall.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CCancelPwaVideoRecall();
    message.maleUserId = object.maleUserId ?? 0;
    message.femaleUserId = object.femaleUserId ?? 0;
    return message;
  }
};
function createBaseC2SReportPwaVideoRecall() {
  return { userId: 0 };
}
const C2SReportPwaVideoRecall = {
  $type: "Match.C2SReportPwaVideoRecall",
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SReportPwaVideoRecall();
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
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    return obj;
  },
  create(base) {
    return C2SReportPwaVideoRecall.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SReportPwaVideoRecall();
    message.userId = object.userId ?? 0;
    return message;
  }
};
function createBaseS2CReportPwaVideoRecall() {
  return { code: 0 };
}
const S2CReportPwaVideoRecall = {
  $type: "Match.S2CReportPwaVideoRecall",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CReportPwaVideoRecall();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.code = reader.int32();
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
    return { code: isSet(object.code) ? tcpCommonCodeFromJSON(object.code) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = tcpCommonCodeToJSON(message.code);
    }
    return obj;
  },
  create(base) {
    return S2CReportPwaVideoRecall.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CReportPwaVideoRecall();
    message.code = object.code ?? 0;
    return message;
  }
};
function createBaseS2CCashUpdate() {
  return { cash: "", updateTime: 0, reason: "" };
}
const S2CCashUpdate = {
  $type: "Match.S2CCashUpdate",
  encode(message, writer = new BinaryWriter()) {
    if (message.cash !== void 0 && message.cash !== "") {
      writer.uint32(10).string(message.cash);
    }
    if (message.updateTime !== void 0 && message.updateTime !== 0) {
      writer.uint32(16).int64(message.updateTime);
    }
    if (message.reason !== void 0 && message.reason !== "") {
      writer.uint32(26).string(message.reason);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CCashUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.cash = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.updateTime = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.reason = reader.string();
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
      cash: isSet(object.cash) ? globalThis.String(object.cash) : "",
      updateTime: isSet(object.updateTime) ? globalThis.Number(object.updateTime) : isSet(object.update_time) ? globalThis.Number(object.update_time) : 0,
      reason: isSet(object.reason) ? globalThis.String(object.reason) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.cash !== void 0 && message.cash !== "") {
      obj.cash = message.cash;
    }
    if (message.updateTime !== void 0 && message.updateTime !== 0) {
      obj.updateTime = Math.round(message.updateTime);
    }
    if (message.reason !== void 0 && message.reason !== "") {
      obj.reason = message.reason;
    }
    return obj;
  },
  create(base) {
    return S2CCashUpdate.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CCashUpdate();
    message.cash = object.cash ?? "";
    message.updateTime = object.updateTime ?? 0;
    message.reason = object.reason ?? "";
    return message;
  }
};
function createBaseS2CMaleUserInfoUpdate() {
  return { userId: 0, user: void 0, updateTime: 0 };
}
const S2CMaleUserInfoUpdate = {
  $type: "Match.S2CMaleUserInfoUpdate",
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.user !== void 0) {
      UserInfo.encode(message.user, writer.uint32(18).fork()).join();
    }
    if (message.updateTime !== void 0 && message.updateTime !== 0) {
      writer.uint32(24).int64(message.updateTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CMaleUserInfoUpdate();
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
          message.user = UserInfo.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.updateTime = longToNumber(reader.int64());
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
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      user: isSet(object.user) ? UserInfo.fromJSON(object.user) : void 0,
      updateTime: isSet(object.updateTime) ? globalThis.Number(object.updateTime) : isSet(object.update_time) ? globalThis.Number(object.update_time) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.user !== void 0) {
      obj.user = UserInfo.toJSON(message.user);
    }
    if (message.updateTime !== void 0 && message.updateTime !== 0) {
      obj.updateTime = Math.round(message.updateTime);
    }
    return obj;
  },
  create(base) {
    return S2CMaleUserInfoUpdate.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CMaleUserInfoUpdate();
    message.userId = object.userId ?? 0;
    message.user = object.user !== void 0 && object.user !== null ? UserInfo.fromPartial(object.user) : void 0;
    message.updateTime = object.updateTime ?? 0;
    return message;
  }
};
function createBaseS2CUserInfoUpdate() {
  return { userId: 0, user: void 0, updateTime: 0 };
}
const S2CUserInfoUpdate = {
  $type: "Match.S2CUserInfoUpdate",
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.user !== void 0) {
      UserInfo.encode(message.user, writer.uint32(18).fork()).join();
    }
    if (message.updateTime !== void 0 && message.updateTime !== 0) {
      writer.uint32(24).int64(message.updateTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CUserInfoUpdate();
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
          message.user = UserInfo.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.updateTime = longToNumber(reader.int64());
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
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      user: isSet(object.user) ? UserInfo.fromJSON(object.user) : void 0,
      updateTime: isSet(object.updateTime) ? globalThis.Number(object.updateTime) : isSet(object.update_time) ? globalThis.Number(object.update_time) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.user !== void 0) {
      obj.user = UserInfo.toJSON(message.user);
    }
    if (message.updateTime !== void 0 && message.updateTime !== 0) {
      obj.updateTime = Math.round(message.updateTime);
    }
    return obj;
  },
  create(base) {
    return S2CUserInfoUpdate.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CUserInfoUpdate();
    message.userId = object.userId ?? 0;
    message.user = object.user !== void 0 && object.user !== null ? UserInfo.fromPartial(object.user) : void 0;
    message.updateTime = object.updateTime ?? 0;
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
  BoostResultCode,
  C2SAddToBoost,
  C2SAddToVipBoost,
  C2SCancelMatch,
  C2SChatAction,
  C2SGetMatchFilterType,
  C2SHeartBeat,
  C2SMatchCardPush,
  C2SReportLoveRing,
  C2SReportPwaVideoRecall,
  C2SReportUserEvent,
  C2SReportVideoMatch,
  C2SSetMatchFilterType,
  C2SStartLoveRing,
  C2SStartMatch,
  C2SSyncChat,
  CancelMatchResultCode,
  ChatActionType,
  DisplayType,
  FilterTypeErrorCode,
  LoveRingType,
  MatchFilterType,
  S2CAddToBoost,
  S2CAddToVipBoost,
  S2CBoostMatch,
  S2CCancelFullScreenVideoPush,
  S2CCancelLoveRing,
  S2CCancelMatch,
  S2CCancelPwaVideoRecall,
  S2CCancelVideoMatch,
  S2CCashUpdate,
  S2CChatAction,
  S2CFullScreenVideoPush,
  S2CGetMatchFilterType,
  S2CHeartBeat,
  S2CIsTyping,
  S2CIsViewingProfile,
  S2CLoveRingPush,
  S2CMaleUserInfoUpdate,
  S2CMatchCardPush,
  S2CPwaVideoRecall,
  S2CReportLoveRing,
  S2CReportPwaVideoRecall,
  S2CReportUserEvent,
  S2CReportVideoMatch,
  S2CSearchCancel,
  S2CSearchRealUserCallPwa,
  S2CSearchSimulatedUserCallPwa,
  S2CSetMatchFilterType,
  S2CStartLoveRing,
  S2CStartMatch,
  S2CSyncChat,
  S2CUserInfoUpdate,
  S2CVipBoostMatch,
  StartMatchResultCode,
  SyncChatResultCode,
  TimCustomMessageType,
  TimCustomMessageVideoTipsType,
  UserAvatarReviewNotify,
  UserAvatarViolationNotify,
  UserEvent,
  appOnlineStatus,
  appOnlineStatusFromJSON,
  appOnlineStatusToJSON,
  boostResultCodeFromJSON,
  boostResultCodeToJSON,
  cancelMatchResultCodeFromJSON,
  cancelMatchResultCodeToJSON,
  chatActionTypeFromJSON,
  chatActionTypeToJSON,
  displayTypeFromJSON,
  displayTypeToJSON,
  filterTypeErrorCodeFromJSON,
  filterTypeErrorCodeToJSON,
  loveRingTypeFromJSON,
  loveRingTypeToJSON,
  matchFilterTypeFromJSON,
  matchFilterTypeToJSON,
  matchPlayerType,
  matchPlayerTypeFromJSON,
  matchPlayerTypeToJSON,
  protobufPackage,
  startMatchResultCodeFromJSON,
  startMatchResultCodeToJSON,
  syncChatResultCodeFromJSON,
  syncChatResultCodeToJSON,
  tcpCommonCode,
  tcpCommonCodeFromJSON,
  tcpCommonCodeToJSON,
  timCustomMessageTypeFromJSON,
  timCustomMessageTypeToJSON,
  timCustomMessageVideoTipsTypeFromJSON,
  timCustomMessageVideoTipsTypeToJSON,
  userEventFromJSON,
  userEventToJSON
};
