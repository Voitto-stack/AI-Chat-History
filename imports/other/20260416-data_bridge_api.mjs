import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
const protobufPackage = "DataBridgeServiceProto";
var DataBridgeServiceCommonCode = /* @__PURE__ */ ((DataBridgeServiceCommonCode2) => {
  DataBridgeServiceCommonCode2[DataBridgeServiceCommonCode2["DataBridgeServiceCommonCodeNone"] = 0] = "DataBridgeServiceCommonCodeNone";
  DataBridgeServiceCommonCode2[DataBridgeServiceCommonCode2["Success"] = 1] = "Success";
  DataBridgeServiceCommonCode2[DataBridgeServiceCommonCode2["Failed"] = 99] = "Failed";
  DataBridgeServiceCommonCode2[DataBridgeServiceCommonCode2["Failed_Invalid_Params"] = 2] = "Failed_Invalid_Params";
  DataBridgeServiceCommonCode2[DataBridgeServiceCommonCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return DataBridgeServiceCommonCode2;
})(DataBridgeServiceCommonCode || {});
function dataBridgeServiceCommonCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "DataBridgeServiceCommonCodeNone":
      return 0 /* DataBridgeServiceCommonCodeNone */;
    case 1:
    case "Success":
      return 1 /* Success */;
    case 99:
    case "Failed":
      return 99 /* Failed */;
    case 2:
    case "Failed_Invalid_Params":
      return 2 /* Failed_Invalid_Params */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function dataBridgeServiceCommonCodeToJSON(object) {
  switch (object) {
    case 0 /* DataBridgeServiceCommonCodeNone */:
      return "DataBridgeServiceCommonCodeNone";
    case 1 /* Success */:
      return "Success";
    case 99 /* Failed */:
      return "Failed";
    case 2 /* Failed_Invalid_Params */:
      return "Failed_Invalid_Params";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var BehaviorType = /* @__PURE__ */ ((BehaviorType2) => {
  BehaviorType2[BehaviorType2["UNKNOWN"] = 0] = "UNKNOWN";
  BehaviorType2[BehaviorType2["EXPOSURE"] = 1] = "EXPOSURE";
  BehaviorType2[BehaviorType2["CLICK"] = 2] = "CLICK";
  BehaviorType2[BehaviorType2["START_CHAT"] = 3] = "START_CHAT";
  BehaviorType2[BehaviorType2["SEND_MESSAGE_TO_BOT"] = 4] = "SEND_MESSAGE_TO_BOT";
  BehaviorType2[BehaviorType2["STAY"] = 5] = "STAY";
  BehaviorType2[BehaviorType2["REFRESH"] = 6] = "REFRESH";
  BehaviorType2[BehaviorType2["RESTART_CHAT"] = 7] = "RESTART_CHAT";
  BehaviorType2[BehaviorType2["REGENERATE_MESSAGE"] = 8] = "REGENERATE_MESSAGE";
  BehaviorType2[BehaviorType2["CREATE_BOT"] = 9] = "CREATE_BOT";
  BehaviorType2[BehaviorType2["SEARCH"] = 10] = "SEARCH";
  BehaviorType2[BehaviorType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return BehaviorType2;
})(BehaviorType || {});
function behaviorTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return 0 /* UNKNOWN */;
    case 1:
    case "EXPOSURE":
      return 1 /* EXPOSURE */;
    case 2:
    case "CLICK":
      return 2 /* CLICK */;
    case 3:
    case "START_CHAT":
      return 3 /* START_CHAT */;
    case 4:
    case "SEND_MESSAGE_TO_BOT":
      return 4 /* SEND_MESSAGE_TO_BOT */;
    case 5:
    case "STAY":
      return 5 /* STAY */;
    case 6:
    case "REFRESH":
      return 6 /* REFRESH */;
    case 7:
    case "RESTART_CHAT":
      return 7 /* RESTART_CHAT */;
    case 8:
    case "REGENERATE_MESSAGE":
      return 8 /* REGENERATE_MESSAGE */;
    case 9:
    case "CREATE_BOT":
      return 9 /* CREATE_BOT */;
    case 10:
    case "SEARCH":
      return 10 /* SEARCH */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function behaviorTypeToJSON(object) {
  switch (object) {
    case 0 /* UNKNOWN */:
      return "UNKNOWN";
    case 1 /* EXPOSURE */:
      return "EXPOSURE";
    case 2 /* CLICK */:
      return "CLICK";
    case 3 /* START_CHAT */:
      return "START_CHAT";
    case 4 /* SEND_MESSAGE_TO_BOT */:
      return "SEND_MESSAGE_TO_BOT";
    case 5 /* STAY */:
      return "STAY";
    case 6 /* REFRESH */:
      return "REFRESH";
    case 7 /* RESTART_CHAT */:
      return "RESTART_CHAT";
    case 8 /* REGENERATE_MESSAGE */:
      return "REGENERATE_MESSAGE";
    case 9 /* CREATE_BOT */:
      return "CREATE_BOT";
    case 10 /* SEARCH */:
      return "SEARCH";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var Platform = /* @__PURE__ */ ((Platform2) => {
  Platform2[Platform2["PLATFORM_APP"] = 0] = "PLATFORM_APP";
  Platform2[Platform2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return Platform2;
})(Platform || {});
function platformFromJSON(object) {
  switch (object) {
    case 0:
    case "PLATFORM_APP":
      return 0 /* PLATFORM_APP */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function platformToJSON(object) {
  switch (object) {
    case 0 /* PLATFORM_APP */:
      return "PLATFORM_APP";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var OS = /* @__PURE__ */ ((OS2) => {
  OS2[OS2["OS_UNKNOWN"] = 0] = "OS_UNKNOWN";
  OS2[OS2["OS_IOS"] = 1] = "OS_IOS";
  OS2[OS2["OS_ANDROID"] = 2] = "OS_ANDROID";
  OS2[OS2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return OS2;
})(OS || {});
function oSFromJSON(object) {
  switch (object) {
    case 0:
    case "OS_UNKNOWN":
      return 0 /* OS_UNKNOWN */;
    case 1:
    case "OS_IOS":
      return 1 /* OS_IOS */;
    case 2:
    case "OS_ANDROID":
      return 2 /* OS_ANDROID */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function oSToJSON(object) {
  switch (object) {
    case 0 /* OS_UNKNOWN */:
      return "OS_UNKNOWN";
    case 1 /* OS_IOS */:
      return "OS_IOS";
    case 2 /* OS_ANDROID */:
      return "OS_ANDROID";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var SCM = /* @__PURE__ */ ((SCM2) => {
  SCM2[SCM2["SCM_UNKNOWN"] = 0] = "SCM_UNKNOWN";
  SCM2[SCM2["SCM_BYTEDANCE"] = 1] = "SCM_BYTEDANCE";
  SCM2[SCM2["SCM_PRESENCE"] = 2] = "SCM_PRESENCE";
  SCM2[SCM2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return SCM2;
})(SCM || {});
function sCMFromJSON(object) {
  switch (object) {
    case 0:
    case "SCM_UNKNOWN":
      return 0 /* SCM_UNKNOWN */;
    case 1:
    case "SCM_BYTEDANCE":
      return 1 /* SCM_BYTEDANCE */;
    case 2:
    case "SCM_PRESENCE":
      return 2 /* SCM_PRESENCE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function sCMToJSON(object) {
  switch (object) {
    case 0 /* SCM_UNKNOWN */:
      return "SCM_UNKNOWN";
    case 1 /* SCM_BYTEDANCE */:
      return "SCM_BYTEDANCE";
    case 2 /* SCM_PRESENCE */:
      return "SCM_PRESENCE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var ReportUserAction = /* @__PURE__ */ ((ReportUserAction2) => {
  ReportUserAction2[ReportUserAction2["REPORT_USER_ACTION_UNKNOWN"] = 0] = "REPORT_USER_ACTION_UNKNOWN";
  ReportUserAction2[ReportUserAction2["REPORT_USER_ACTION_SHOW"] = 1] = "REPORT_USER_ACTION_SHOW";
  ReportUserAction2[ReportUserAction2["REPORT_USER_ACTION_CALL"] = 2] = "REPORT_USER_ACTION_CALL";
  ReportUserAction2[ReportUserAction2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return ReportUserAction2;
})(ReportUserAction || {});
function reportUserActionFromJSON(object) {
  switch (object) {
    case 0:
    case "REPORT_USER_ACTION_UNKNOWN":
      return 0 /* REPORT_USER_ACTION_UNKNOWN */;
    case 1:
    case "REPORT_USER_ACTION_SHOW":
      return 1 /* REPORT_USER_ACTION_SHOW */;
    case 2:
    case "REPORT_USER_ACTION_CALL":
      return 2 /* REPORT_USER_ACTION_CALL */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function reportUserActionToJSON(object) {
  switch (object) {
    case 0 /* REPORT_USER_ACTION_UNKNOWN */:
      return "REPORT_USER_ACTION_UNKNOWN";
    case 1 /* REPORT_USER_ACTION_SHOW */:
      return "REPORT_USER_ACTION_SHOW";
    case 2 /* REPORT_USER_ACTION_CALL */:
      return "REPORT_USER_ACTION_CALL";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var CallType = /* @__PURE__ */ ((CallType2) => {
  CallType2[CallType2["AUDIO"] = 0] = "AUDIO";
  CallType2[CallType2["VIDEO"] = 1] = "VIDEO";
  CallType2[CallType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return CallType2;
})(CallType || {});
function callTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "AUDIO":
      return 0 /* AUDIO */;
    case 1:
    case "VIDEO":
      return 1 /* VIDEO */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function callTypeToJSON(object) {
  switch (object) {
    case 0 /* AUDIO */:
      return "AUDIO";
    case 1 /* VIDEO */:
      return "VIDEO";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var CallEvent = /* @__PURE__ */ ((CallEvent2) => {
  CallEvent2[CallEvent2["CALL_BEGIN"] = 0] = "CALL_BEGIN";
  CallEvent2[CallEvent2["CALL_END"] = 1] = "CALL_END";
  CallEvent2[CallEvent2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return CallEvent2;
})(CallEvent || {});
function callEventFromJSON(object) {
  switch (object) {
    case 0:
    case "CALL_BEGIN":
      return 0 /* CALL_BEGIN */;
    case 1:
    case "CALL_END":
      return 1 /* CALL_END */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function callEventToJSON(object) {
  switch (object) {
    case 0 /* CALL_BEGIN */:
      return "CALL_BEGIN";
    case 1 /* CALL_END */:
      return "CALL_END";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseUploadUserBehaviorRequest() {
  return { userBehaviors: [] };
}
const UploadUserBehaviorRequest = {
  $type: "DataBridgeServiceProto.UploadUserBehaviorRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.userBehaviors !== void 0 && message.userBehaviors.length !== 0) {
      for (const v of message.userBehaviors) {
        UserBehavior.encode(v, writer.uint32(10).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUploadUserBehaviorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = UserBehavior.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.userBehaviors.push(el);
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
      userBehaviors: globalThis.Array.isArray(object?.userBehaviors) ? object.userBehaviors.map((e) => UserBehavior.fromJSON(e)) : globalThis.Array.isArray(object?.user_behaviors) ? object.user_behaviors.map((e) => UserBehavior.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userBehaviors?.length) {
      obj.userBehaviors = message.userBehaviors.map((e) => UserBehavior.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return UploadUserBehaviorRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUploadUserBehaviorRequest();
    message.userBehaviors = object.userBehaviors?.map((e) => UserBehavior.fromPartial(e)) || [];
    return message;
  }
};
function createBaseUploadUserBehaviorResponse() {
  return { code: 0, message: "" };
}
const UploadUserBehaviorResponse = {
  $type: "DataBridgeServiceProto.UploadUserBehaviorResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUploadUserBehaviorResponse();
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
      code: isSet(object.code) ? dataBridgeServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = dataBridgeServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return UploadUserBehaviorResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUploadUserBehaviorResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseUserBehavior() {
  return {
    bhvTime: 0,
    bhvType: 0,
    docId: "",
    scm: 0,
    spm: "",
    userId: "",
    authorId: "",
    parentDocId: "",
    query: "",
    requestId: "",
    stayTime: 0,
    sourceType: [],
    videoDuration: 0,
    videoPlayTime: 0,
    area: "",
    city: "",
    clientVersion: "",
    deviceModel: "",
    network: "",
    os: 0,
    osVersion: "",
    platform: 0,
    traceId: "",
    transData: "",
    ipv4: "",
    ipv6: "",
    dislikeType: "",
    dislikeValue: "",
    round: 0,
    refreshCnt: 0,
    regenerateCnt: 0,
    deviceId: ""
  };
}
const UserBehavior = {
  $type: "DataBridgeServiceProto.UserBehavior",
  encode(message, writer = new BinaryWriter()) {
    if (message.bhvTime !== void 0 && message.bhvTime !== 0) {
      writer.uint32(8).int64(message.bhvTime);
    }
    if (message.bhvType !== void 0 && message.bhvType !== 0) {
      writer.uint32(16).int32(message.bhvType);
    }
    if (message.docId !== void 0 && message.docId !== "") {
      writer.uint32(26).string(message.docId);
    }
    if (message.scm !== void 0 && message.scm !== 0) {
      writer.uint32(32).int32(message.scm);
    }
    if (message.spm !== void 0 && message.spm !== "") {
      writer.uint32(42).string(message.spm);
    }
    if (message.userId !== void 0 && message.userId !== "") {
      writer.uint32(50).string(message.userId);
    }
    if (message.authorId !== void 0 && message.authorId !== "") {
      writer.uint32(58).string(message.authorId);
    }
    if (message.parentDocId !== void 0 && message.parentDocId !== "") {
      writer.uint32(66).string(message.parentDocId);
    }
    if (message.query !== void 0 && message.query !== "") {
      writer.uint32(74).string(message.query);
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      writer.uint32(82).string(message.requestId);
    }
    if (message.stayTime !== void 0 && message.stayTime !== 0) {
      writer.uint32(88).int32(message.stayTime);
    }
    if (message.sourceType !== void 0 && message.sourceType.length !== 0) {
      for (const v of message.sourceType) {
        writer.uint32(98).string(v);
      }
    }
    if (message.videoDuration !== void 0 && message.videoDuration !== 0) {
      writer.uint32(104).int32(message.videoDuration);
    }
    if (message.videoPlayTime !== void 0 && message.videoPlayTime !== 0) {
      writer.uint32(112).int32(message.videoPlayTime);
    }
    if (message.area !== void 0 && message.area !== "") {
      writer.uint32(122).string(message.area);
    }
    if (message.city !== void 0 && message.city !== "") {
      writer.uint32(130).string(message.city);
    }
    if (message.clientVersion !== void 0 && message.clientVersion !== "") {
      writer.uint32(138).string(message.clientVersion);
    }
    if (message.deviceModel !== void 0 && message.deviceModel !== "") {
      writer.uint32(146).string(message.deviceModel);
    }
    if (message.network !== void 0 && message.network !== "") {
      writer.uint32(154).string(message.network);
    }
    if (message.os !== void 0 && message.os !== 0) {
      writer.uint32(160).int32(message.os);
    }
    if (message.osVersion !== void 0 && message.osVersion !== "") {
      writer.uint32(170).string(message.osVersion);
    }
    if (message.platform !== void 0 && message.platform !== 0) {
      writer.uint32(176).int32(message.platform);
    }
    if (message.traceId !== void 0 && message.traceId !== "") {
      writer.uint32(186).string(message.traceId);
    }
    if (message.transData !== void 0 && message.transData !== "") {
      writer.uint32(194).string(message.transData);
    }
    if (message.ipv4 !== void 0 && message.ipv4 !== "") {
      writer.uint32(202).string(message.ipv4);
    }
    if (message.ipv6 !== void 0 && message.ipv6 !== "") {
      writer.uint32(210).string(message.ipv6);
    }
    if (message.dislikeType !== void 0 && message.dislikeType !== "") {
      writer.uint32(218).string(message.dislikeType);
    }
    if (message.dislikeValue !== void 0 && message.dislikeValue !== "") {
      writer.uint32(226).string(message.dislikeValue);
    }
    if (message.round !== void 0 && message.round !== 0) {
      writer.uint32(232).int32(message.round);
    }
    if (message.refreshCnt !== void 0 && message.refreshCnt !== 0) {
      writer.uint32(240).int32(message.refreshCnt);
    }
    if (message.regenerateCnt !== void 0 && message.regenerateCnt !== 0) {
      writer.uint32(248).int32(message.regenerateCnt);
    }
    if (message.deviceId !== void 0 && message.deviceId !== "") {
      writer.uint32(258).string(message.deviceId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUserBehavior();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.bhvTime = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.bhvType = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.docId = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.scm = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.spm = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.userId = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }
          message.authorId = reader.string();
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }
          message.parentDocId = reader.string();
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }
          message.query = reader.string();
          continue;
        }
        case 10: {
          if (tag !== 82) {
            break;
          }
          message.requestId = reader.string();
          continue;
        }
        case 11: {
          if (tag !== 88) {
            break;
          }
          message.stayTime = reader.int32();
          continue;
        }
        case 12: {
          if (tag !== 98) {
            break;
          }
          const el = reader.string();
          if (el !== void 0) {
            message.sourceType.push(el);
          }
          continue;
        }
        case 13: {
          if (tag !== 104) {
            break;
          }
          message.videoDuration = reader.int32();
          continue;
        }
        case 14: {
          if (tag !== 112) {
            break;
          }
          message.videoPlayTime = reader.int32();
          continue;
        }
        case 15: {
          if (tag !== 122) {
            break;
          }
          message.area = reader.string();
          continue;
        }
        case 16: {
          if (tag !== 130) {
            break;
          }
          message.city = reader.string();
          continue;
        }
        case 17: {
          if (tag !== 138) {
            break;
          }
          message.clientVersion = reader.string();
          continue;
        }
        case 18: {
          if (tag !== 146) {
            break;
          }
          message.deviceModel = reader.string();
          continue;
        }
        case 19: {
          if (tag !== 154) {
            break;
          }
          message.network = reader.string();
          continue;
        }
        case 20: {
          if (tag !== 160) {
            break;
          }
          message.os = reader.int32();
          continue;
        }
        case 21: {
          if (tag !== 170) {
            break;
          }
          message.osVersion = reader.string();
          continue;
        }
        case 22: {
          if (tag !== 176) {
            break;
          }
          message.platform = reader.int32();
          continue;
        }
        case 23: {
          if (tag !== 186) {
            break;
          }
          message.traceId = reader.string();
          continue;
        }
        case 24: {
          if (tag !== 194) {
            break;
          }
          message.transData = reader.string();
          continue;
        }
        case 25: {
          if (tag !== 202) {
            break;
          }
          message.ipv4 = reader.string();
          continue;
        }
        case 26: {
          if (tag !== 210) {
            break;
          }
          message.ipv6 = reader.string();
          continue;
        }
        case 27: {
          if (tag !== 218) {
            break;
          }
          message.dislikeType = reader.string();
          continue;
        }
        case 28: {
          if (tag !== 226) {
            break;
          }
          message.dislikeValue = reader.string();
          continue;
        }
        case 29: {
          if (tag !== 232) {
            break;
          }
          message.round = reader.int32();
          continue;
        }
        case 30: {
          if (tag !== 240) {
            break;
          }
          message.refreshCnt = reader.int32();
          continue;
        }
        case 31: {
          if (tag !== 248) {
            break;
          }
          message.regenerateCnt = reader.int32();
          continue;
        }
        case 32: {
          if (tag !== 258) {
            break;
          }
          message.deviceId = reader.string();
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
      bhvTime: isSet(object.bhvTime) ? globalThis.Number(object.bhvTime) : isSet(object.bhv_time) ? globalThis.Number(object.bhv_time) : 0,
      bhvType: isSet(object.bhvType) ? behaviorTypeFromJSON(object.bhvType) : isSet(object.bhv_type) ? behaviorTypeFromJSON(object.bhv_type) : 0,
      docId: isSet(object.docId) ? globalThis.String(object.docId) : isSet(object.doc_id) ? globalThis.String(object.doc_id) : "",
      scm: isSet(object.scm) ? sCMFromJSON(object.scm) : 0,
      spm: isSet(object.spm) ? globalThis.String(object.spm) : "",
      userId: isSet(object.userId) ? globalThis.String(object.userId) : isSet(object.user_id) ? globalThis.String(object.user_id) : "",
      authorId: isSet(object.authorId) ? globalThis.String(object.authorId) : isSet(object.author_id) ? globalThis.String(object.author_id) : "",
      parentDocId: isSet(object.parentDocId) ? globalThis.String(object.parentDocId) : isSet(object.parent_doc_id) ? globalThis.String(object.parent_doc_id) : "",
      query: isSet(object.query) ? globalThis.String(object.query) : "",
      requestId: isSet(object.requestId) ? globalThis.String(object.requestId) : isSet(object.request_id) ? globalThis.String(object.request_id) : "",
      stayTime: isSet(object.stayTime) ? globalThis.Number(object.stayTime) : isSet(object.stay_time) ? globalThis.Number(object.stay_time) : 0,
      sourceType: globalThis.Array.isArray(object?.sourceType) ? object.sourceType.map((e) => globalThis.String(e)) : globalThis.Array.isArray(object?.source_type) ? object.source_type.map((e) => globalThis.String(e)) : [],
      videoDuration: isSet(object.videoDuration) ? globalThis.Number(object.videoDuration) : isSet(object.video_duration) ? globalThis.Number(object.video_duration) : 0,
      videoPlayTime: isSet(object.videoPlayTime) ? globalThis.Number(object.videoPlayTime) : isSet(object.video_play_time) ? globalThis.Number(object.video_play_time) : 0,
      area: isSet(object.area) ? globalThis.String(object.area) : "",
      city: isSet(object.city) ? globalThis.String(object.city) : "",
      clientVersion: isSet(object.clientVersion) ? globalThis.String(object.clientVersion) : isSet(object.client_version) ? globalThis.String(object.client_version) : "",
      deviceModel: isSet(object.deviceModel) ? globalThis.String(object.deviceModel) : isSet(object.device_model) ? globalThis.String(object.device_model) : "",
      network: isSet(object.network) ? globalThis.String(object.network) : "",
      os: isSet(object.os) ? oSFromJSON(object.os) : 0,
      osVersion: isSet(object.osVersion) ? globalThis.String(object.osVersion) : isSet(object.os_version) ? globalThis.String(object.os_version) : "",
      platform: isSet(object.platform) ? platformFromJSON(object.platform) : 0,
      traceId: isSet(object.traceId) ? globalThis.String(object.traceId) : isSet(object.trace_id) ? globalThis.String(object.trace_id) : "",
      transData: isSet(object.transData) ? globalThis.String(object.transData) : isSet(object.trans_data) ? globalThis.String(object.trans_data) : "",
      ipv4: isSet(object.ipv4) ? globalThis.String(object.ipv4) : "",
      ipv6: isSet(object.ipv6) ? globalThis.String(object.ipv6) : "",
      dislikeType: isSet(object.dislikeType) ? globalThis.String(object.dislikeType) : isSet(object.dislike_type) ? globalThis.String(object.dislike_type) : "",
      dislikeValue: isSet(object.dislikeValue) ? globalThis.String(object.dislikeValue) : isSet(object.dislike_value) ? globalThis.String(object.dislike_value) : "",
      round: isSet(object.round) ? globalThis.Number(object.round) : 0,
      refreshCnt: isSet(object.refreshCnt) ? globalThis.Number(object.refreshCnt) : isSet(object.refresh_cnt) ? globalThis.Number(object.refresh_cnt) : 0,
      regenerateCnt: isSet(object.regenerateCnt) ? globalThis.Number(object.regenerateCnt) : isSet(object.regenerate_cnt) ? globalThis.Number(object.regenerate_cnt) : 0,
      deviceId: isSet(object.deviceId) ? globalThis.String(object.deviceId) : isSet(object.device_id) ? globalThis.String(object.device_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.bhvTime !== void 0 && message.bhvTime !== 0) {
      obj.bhvTime = Math.round(message.bhvTime);
    }
    if (message.bhvType !== void 0 && message.bhvType !== 0) {
      obj.bhvType = behaviorTypeToJSON(message.bhvType);
    }
    if (message.docId !== void 0 && message.docId !== "") {
      obj.docId = message.docId;
    }
    if (message.scm !== void 0 && message.scm !== 0) {
      obj.scm = sCMToJSON(message.scm);
    }
    if (message.spm !== void 0 && message.spm !== "") {
      obj.spm = message.spm;
    }
    if (message.userId !== void 0 && message.userId !== "") {
      obj.userId = message.userId;
    }
    if (message.authorId !== void 0 && message.authorId !== "") {
      obj.authorId = message.authorId;
    }
    if (message.parentDocId !== void 0 && message.parentDocId !== "") {
      obj.parentDocId = message.parentDocId;
    }
    if (message.query !== void 0 && message.query !== "") {
      obj.query = message.query;
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      obj.requestId = message.requestId;
    }
    if (message.stayTime !== void 0 && message.stayTime !== 0) {
      obj.stayTime = Math.round(message.stayTime);
    }
    if (message.sourceType?.length) {
      obj.sourceType = message.sourceType;
    }
    if (message.videoDuration !== void 0 && message.videoDuration !== 0) {
      obj.videoDuration = Math.round(message.videoDuration);
    }
    if (message.videoPlayTime !== void 0 && message.videoPlayTime !== 0) {
      obj.videoPlayTime = Math.round(message.videoPlayTime);
    }
    if (message.area !== void 0 && message.area !== "") {
      obj.area = message.area;
    }
    if (message.city !== void 0 && message.city !== "") {
      obj.city = message.city;
    }
    if (message.clientVersion !== void 0 && message.clientVersion !== "") {
      obj.clientVersion = message.clientVersion;
    }
    if (message.deviceModel !== void 0 && message.deviceModel !== "") {
      obj.deviceModel = message.deviceModel;
    }
    if (message.network !== void 0 && message.network !== "") {
      obj.network = message.network;
    }
    if (message.os !== void 0 && message.os !== 0) {
      obj.os = oSToJSON(message.os);
    }
    if (message.osVersion !== void 0 && message.osVersion !== "") {
      obj.osVersion = message.osVersion;
    }
    if (message.platform !== void 0 && message.platform !== 0) {
      obj.platform = platformToJSON(message.platform);
    }
    if (message.traceId !== void 0 && message.traceId !== "") {
      obj.traceId = message.traceId;
    }
    if (message.transData !== void 0 && message.transData !== "") {
      obj.transData = message.transData;
    }
    if (message.ipv4 !== void 0 && message.ipv4 !== "") {
      obj.ipv4 = message.ipv4;
    }
    if (message.ipv6 !== void 0 && message.ipv6 !== "") {
      obj.ipv6 = message.ipv6;
    }
    if (message.dislikeType !== void 0 && message.dislikeType !== "") {
      obj.dislikeType = message.dislikeType;
    }
    if (message.dislikeValue !== void 0 && message.dislikeValue !== "") {
      obj.dislikeValue = message.dislikeValue;
    }
    if (message.round !== void 0 && message.round !== 0) {
      obj.round = Math.round(message.round);
    }
    if (message.refreshCnt !== void 0 && message.refreshCnt !== 0) {
      obj.refreshCnt = Math.round(message.refreshCnt);
    }
    if (message.regenerateCnt !== void 0 && message.regenerateCnt !== 0) {
      obj.regenerateCnt = Math.round(message.regenerateCnt);
    }
    if (message.deviceId !== void 0 && message.deviceId !== "") {
      obj.deviceId = message.deviceId;
    }
    return obj;
  },
  create(base) {
    return UserBehavior.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUserBehavior();
    message.bhvTime = object.bhvTime ?? 0;
    message.bhvType = object.bhvType ?? 0;
    message.docId = object.docId ?? "";
    message.scm = object.scm ?? 0;
    message.spm = object.spm ?? "";
    message.userId = object.userId ?? "";
    message.authorId = object.authorId ?? "";
    message.parentDocId = object.parentDocId ?? "";
    message.query = object.query ?? "";
    message.requestId = object.requestId ?? "";
    message.stayTime = object.stayTime ?? 0;
    message.sourceType = object.sourceType?.map((e) => e) || [];
    message.videoDuration = object.videoDuration ?? 0;
    message.videoPlayTime = object.videoPlayTime ?? 0;
    message.area = object.area ?? "";
    message.city = object.city ?? "";
    message.clientVersion = object.clientVersion ?? "";
    message.deviceModel = object.deviceModel ?? "";
    message.network = object.network ?? "";
    message.os = object.os ?? 0;
    message.osVersion = object.osVersion ?? "";
    message.platform = object.platform ?? 0;
    message.traceId = object.traceId ?? "";
    message.transData = object.transData ?? "";
    message.ipv4 = object.ipv4 ?? "";
    message.ipv6 = object.ipv6 ?? "";
    message.dislikeType = object.dislikeType ?? "";
    message.dislikeValue = object.dislikeValue ?? "";
    message.round = object.round ?? 0;
    message.refreshCnt = object.refreshCnt ?? 0;
    message.regenerateCnt = object.regenerateCnt ?? 0;
    message.deviceId = object.deviceId ?? "";
    return message;
  }
};
function createBaseStatCardShowRequest() {
  return { cardUserIds: [] };
}
const StatCardShowRequest = {
  $type: "DataBridgeServiceProto.StatCardShowRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.cardUserIds !== void 0 && message.cardUserIds.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.cardUserIds) {
        writer.int32(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStatCardShowRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag === 8) {
            message.cardUserIds.push(reader.int32());
            continue;
          }
          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.cardUserIds.push(reader.int32());
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
      cardUserIds: globalThis.Array.isArray(object?.cardUserIds) ? object.cardUserIds.map((e) => globalThis.Number(e)) : globalThis.Array.isArray(object?.card_user_ids) ? object.card_user_ids.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.cardUserIds?.length) {
      obj.cardUserIds = message.cardUserIds.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return StatCardShowRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseStatCardShowRequest();
    message.cardUserIds = object.cardUserIds?.map((e) => e) || [];
    return message;
  }
};
function createBaseStatCardShowResponse() {
  return { code: 0, message: "" };
}
const StatCardShowResponse = {
  $type: "DataBridgeServiceProto.StatCardShowResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStatCardShowResponse();
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
      code: isSet(object.code) ? dataBridgeServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = dataBridgeServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return StatCardShowResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseStatCardShowResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseReportUserActionRequest() {
  return { userIds: [], action: 0 };
}
const ReportUserActionRequest = {
  $type: "DataBridgeServiceProto.ReportUserActionRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.userIds !== void 0 && message.userIds.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.userIds) {
        writer.int32(v);
      }
      writer.join();
    }
    if (message.action !== void 0 && message.action !== 0) {
      writer.uint32(16).int32(message.action);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseReportUserActionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag === 8) {
            message.userIds.push(reader.int32());
            continue;
          }
          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.userIds.push(reader.int32());
            }
            continue;
          }
          break;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.action = reader.int32();
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
      userIds: globalThis.Array.isArray(object?.userIds) ? object.userIds.map((e) => globalThis.Number(e)) : [],
      action: isSet(object.action) ? reportUserActionFromJSON(object.action) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userIds?.length) {
      obj.userIds = message.userIds.map((e) => Math.round(e));
    }
    if (message.action !== void 0 && message.action !== 0) {
      obj.action = reportUserActionToJSON(message.action);
    }
    return obj;
  },
  create(base) {
    return ReportUserActionRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseReportUserActionRequest();
    message.userIds = object.userIds?.map((e) => e) || [];
    message.action = object.action ?? 0;
    return message;
  }
};
function createBaseReportUserActionResponse() {
  return { code: 0, message: "" };
}
const ReportUserActionResponse = {
  $type: "DataBridgeServiceProto.ReportUserActionResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseReportUserActionResponse();
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
      code: isSet(object.code) ? dataBridgeServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = dataBridgeServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return ReportUserActionResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseReportUserActionResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseFireBasePushRequest() {
  return { userId: 0, notification: void 0, data: [], badge: "", icon: "" };
}
const FireBasePushRequest = {
  $type: "DataBridgeServiceProto.FireBasePushRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.notification !== void 0) {
      Notification.encode(message.notification, writer.uint32(18).fork()).join();
    }
    if (message.data !== void 0 && message.data.length !== 0) {
      for (const v of message.data) {
        FireBaseData.encode(v, writer.uint32(26).fork()).join();
      }
    }
    if (message.badge !== void 0 && message.badge !== "") {
      writer.uint32(34).string(message.badge);
    }
    if (message.icon !== void 0 && message.icon !== "") {
      writer.uint32(42).string(message.icon);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseFireBasePushRequest();
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
          message.notification = Notification.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          const el = FireBaseData.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.data.push(el);
          }
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.badge = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.icon = reader.string();
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
      notification: isSet(object.notification) ? Notification.fromJSON(object.notification) : void 0,
      data: globalThis.Array.isArray(object?.data) ? object.data.map((e) => FireBaseData.fromJSON(e)) : [],
      badge: isSet(object.badge) ? globalThis.String(object.badge) : "",
      icon: isSet(object.icon) ? globalThis.String(object.icon) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.notification !== void 0) {
      obj.notification = Notification.toJSON(message.notification);
    }
    if (message.data?.length) {
      obj.data = message.data.map((e) => FireBaseData.toJSON(e));
    }
    if (message.badge !== void 0 && message.badge !== "") {
      obj.badge = message.badge;
    }
    if (message.icon !== void 0 && message.icon !== "") {
      obj.icon = message.icon;
    }
    return obj;
  },
  create(base) {
    return FireBasePushRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseFireBasePushRequest();
    message.userId = object.userId ?? 0;
    message.notification = object.notification !== void 0 && object.notification !== null ? Notification.fromPartial(object.notification) : void 0;
    message.data = object.data?.map((e) => FireBaseData.fromPartial(e)) || [];
    message.badge = object.badge ?? "";
    message.icon = object.icon ?? "";
    return message;
  }
};
function createBaseFireBaseData() {
  return { key: "", value: "" };
}
const FireBaseData = {
  $type: "DataBridgeServiceProto.FireBaseData",
  encode(message, writer = new BinaryWriter()) {
    if (message.key !== void 0 && message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== void 0 && message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseFireBaseData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.key = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.value = reader.string();
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
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.key !== void 0 && message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== void 0 && message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },
  create(base) {
    return FireBaseData.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseFireBaseData();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  }
};
function createBaseNotification() {
  return { title: "", body: "" };
}
const Notification = {
  $type: "DataBridgeServiceProto.Notification",
  encode(message, writer = new BinaryWriter()) {
    if (message.title !== void 0 && message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.body !== void 0 && message.body !== "") {
      writer.uint32(18).string(message.body);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseNotification();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.title = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.body = reader.string();
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
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      body: isSet(object.body) ? globalThis.String(object.body) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.title !== void 0 && message.title !== "") {
      obj.title = message.title;
    }
    if (message.body !== void 0 && message.body !== "") {
      obj.body = message.body;
    }
    return obj;
  },
  create(base) {
    return Notification.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseNotification();
    message.title = object.title ?? "";
    message.body = object.body ?? "";
    return message;
  }
};
function createBaseFireBasePushResponse() {
  return { code: 0, message: "" };
}
const FireBasePushResponse = {
  $type: "DataBridgeServiceProto.FireBasePushResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseFireBasePushResponse();
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
      code: isSet(object.code) ? dataBridgeServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = dataBridgeServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return FireBasePushResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseFireBasePushResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseCreateCloudRecordingRequest() {
  return { request: "" };
}
const CreateCloudRecordingRequest = {
  $type: "DataBridgeServiceProto.CreateCloudRecordingRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.request !== void 0 && message.request !== "") {
      writer.uint32(10).string(message.request);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateCloudRecordingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.request = reader.string();
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
    return { request: isSet(object.request) ? globalThis.String(object.request) : "" };
  },
  toJSON(message) {
    const obj = {};
    if (message.request !== void 0 && message.request !== "") {
      obj.request = message.request;
    }
    return obj;
  },
  create(base) {
    return CreateCloudRecordingRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateCloudRecordingRequest();
    message.request = object.request ?? "";
    return message;
  }
};
function createBaseCreateCloudRecordingResponse() {
  return { code: 0, message: "", taskId: "", requestId: "" };
}
const CreateCloudRecordingResponse = {
  $type: "DataBridgeServiceProto.CreateCloudRecordingResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.taskId !== void 0 && message.taskId !== "") {
      writer.uint32(26).string(message.taskId);
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      writer.uint32(34).string(message.requestId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateCloudRecordingResponse();
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
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.message = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.taskId = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.requestId = reader.string();
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
      code: isSet(object.code) ? dataBridgeServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      taskId: isSet(object.taskId) ? globalThis.String(object.taskId) : "",
      requestId: isSet(object.requestId) ? globalThis.String(object.requestId) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = dataBridgeServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.taskId !== void 0 && message.taskId !== "") {
      obj.taskId = message.taskId;
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      obj.requestId = message.requestId;
    }
    return obj;
  },
  create(base) {
    return CreateCloudRecordingResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateCloudRecordingResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.taskId = object.taskId ?? "";
    message.requestId = object.requestId ?? "";
    return message;
  }
};
function createBaseDeleteCloudRecordingRequest() {
  return { taskId: "", requestId: "" };
}
const DeleteCloudRecordingRequest = {
  $type: "DataBridgeServiceProto.DeleteCloudRecordingRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.taskId !== void 0 && message.taskId !== "") {
      writer.uint32(10).string(message.taskId);
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      writer.uint32(18).string(message.requestId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDeleteCloudRecordingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.taskId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.requestId = reader.string();
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
      taskId: isSet(object.taskId) ? globalThis.String(object.taskId) : "",
      requestId: isSet(object.requestId) ? globalThis.String(object.requestId) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.taskId !== void 0 && message.taskId !== "") {
      obj.taskId = message.taskId;
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      obj.requestId = message.requestId;
    }
    return obj;
  },
  create(base) {
    return DeleteCloudRecordingRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseDeleteCloudRecordingRequest();
    message.taskId = object.taskId ?? "";
    message.requestId = object.requestId ?? "";
    return message;
  }
};
function createBaseDeleteCloudRecordingResponse() {
  return { code: 0, message: "", taskId: "", requestId: "" };
}
const DeleteCloudRecordingResponse = {
  $type: "DataBridgeServiceProto.DeleteCloudRecordingResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.taskId !== void 0 && message.taskId !== "") {
      writer.uint32(26).string(message.taskId);
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      writer.uint32(34).string(message.requestId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDeleteCloudRecordingResponse();
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
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.message = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.taskId = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.requestId = reader.string();
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
      code: isSet(object.code) ? dataBridgeServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      taskId: isSet(object.taskId) ? globalThis.String(object.taskId) : "",
      requestId: isSet(object.requestId) ? globalThis.String(object.requestId) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = dataBridgeServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.taskId !== void 0 && message.taskId !== "") {
      obj.taskId = message.taskId;
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      obj.requestId = message.requestId;
    }
    return obj;
  },
  create(base) {
    return DeleteCloudRecordingResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseDeleteCloudRecordingResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.taskId = object.taskId ?? "";
    message.requestId = object.requestId ?? "";
    return message;
  }
};
function createBaseReportCallEventRequest() {
  return { roomId: "", callerId: 0, calleeId: 0, payUserId: 0, callType: 0, callEvent: 0, freeCallDuration: 0 };
}
const ReportCallEventRequest = {
  $type: "DataBridgeServiceProto.ReportCallEventRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomId !== void 0 && message.roomId !== "") {
      writer.uint32(10).string(message.roomId);
    }
    if (message.callerId !== void 0 && message.callerId !== 0) {
      writer.uint32(16).int32(message.callerId);
    }
    if (message.calleeId !== void 0 && message.calleeId !== 0) {
      writer.uint32(24).int32(message.calleeId);
    }
    if (message.payUserId !== void 0 && message.payUserId !== 0) {
      writer.uint32(32).int32(message.payUserId);
    }
    if (message.callType !== void 0 && message.callType !== 0) {
      writer.uint32(40).int32(message.callType);
    }
    if (message.callEvent !== void 0 && message.callEvent !== 0) {
      writer.uint32(48).int32(message.callEvent);
    }
    if (message.freeCallDuration !== void 0 && message.freeCallDuration !== 0) {
      writer.uint32(56).int32(message.freeCallDuration);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseReportCallEventRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.roomId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.callerId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.calleeId = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.payUserId = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.callType = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.callEvent = reader.int32();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.freeCallDuration = reader.int32();
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
      roomId: isSet(object.roomId) ? globalThis.String(object.roomId) : isSet(object.room_id) ? globalThis.String(object.room_id) : "",
      callerId: isSet(object.callerId) ? globalThis.Number(object.callerId) : isSet(object.caller_id) ? globalThis.Number(object.caller_id) : 0,
      calleeId: isSet(object.calleeId) ? globalThis.Number(object.calleeId) : isSet(object.callee_id) ? globalThis.Number(object.callee_id) : 0,
      payUserId: isSet(object.payUserId) ? globalThis.Number(object.payUserId) : isSet(object.pay_user_id) ? globalThis.Number(object.pay_user_id) : 0,
      callType: isSet(object.callType) ? callTypeFromJSON(object.callType) : isSet(object.call_type) ? callTypeFromJSON(object.call_type) : 0,
      callEvent: isSet(object.callEvent) ? callEventFromJSON(object.callEvent) : isSet(object.call_event) ? callEventFromJSON(object.call_event) : 0,
      freeCallDuration: isSet(object.freeCallDuration) ? globalThis.Number(object.freeCallDuration) : isSet(object.free_call_duration) ? globalThis.Number(object.free_call_duration) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomId !== void 0 && message.roomId !== "") {
      obj.roomId = message.roomId;
    }
    if (message.callerId !== void 0 && message.callerId !== 0) {
      obj.callerId = Math.round(message.callerId);
    }
    if (message.calleeId !== void 0 && message.calleeId !== 0) {
      obj.calleeId = Math.round(message.calleeId);
    }
    if (message.payUserId !== void 0 && message.payUserId !== 0) {
      obj.payUserId = Math.round(message.payUserId);
    }
    if (message.callType !== void 0 && message.callType !== 0) {
      obj.callType = callTypeToJSON(message.callType);
    }
    if (message.callEvent !== void 0 && message.callEvent !== 0) {
      obj.callEvent = callEventToJSON(message.callEvent);
    }
    if (message.freeCallDuration !== void 0 && message.freeCallDuration !== 0) {
      obj.freeCallDuration = Math.round(message.freeCallDuration);
    }
    return obj;
  },
  create(base) {
    return ReportCallEventRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseReportCallEventRequest();
    message.roomId = object.roomId ?? "";
    message.callerId = object.callerId ?? 0;
    message.calleeId = object.calleeId ?? 0;
    message.payUserId = object.payUserId ?? 0;
    message.callType = object.callType ?? 0;
    message.callEvent = object.callEvent ?? 0;
    message.freeCallDuration = object.freeCallDuration ?? 0;
    return message;
  }
};
function createBaseReportCallEventResponse() {
  return { code: 0, message: "" };
}
const ReportCallEventResponse = {
  $type: "DataBridgeServiceProto.ReportCallEventResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseReportCallEventResponse();
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
      code: isSet(object.code) ? dataBridgeServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = dataBridgeServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return ReportCallEventResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseReportCallEventResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseStartAITranscriptionRequest() {
  return { roomId: "", roomIdType: 0 };
}
const StartAITranscriptionRequest = {
  $type: "DataBridgeServiceProto.StartAITranscriptionRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.roomId !== void 0 && message.roomId !== "") {
      writer.uint32(10).string(message.roomId);
    }
    if (message.roomIdType !== void 0 && message.roomIdType !== 0) {
      writer.uint32(16).int32(message.roomIdType);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStartAITranscriptionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.roomId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.roomIdType = reader.int32();
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
      roomId: isSet(object.roomId) ? globalThis.String(object.roomId) : isSet(object.room_id) ? globalThis.String(object.room_id) : "",
      roomIdType: isSet(object.roomIdType) ? globalThis.Number(object.roomIdType) : isSet(object.room_id_type) ? globalThis.Number(object.room_id_type) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.roomId !== void 0 && message.roomId !== "") {
      obj.roomId = message.roomId;
    }
    if (message.roomIdType !== void 0 && message.roomIdType !== 0) {
      obj.roomIdType = Math.round(message.roomIdType);
    }
    return obj;
  },
  create(base) {
    return StartAITranscriptionRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseStartAITranscriptionRequest();
    message.roomId = object.roomId ?? "";
    message.roomIdType = object.roomIdType ?? 0;
    return message;
  }
};
function createBaseStartAITranscriptionResponse() {
  return { code: 0, message: "", taskId: "" };
}
const StartAITranscriptionResponse = {
  $type: "DataBridgeServiceProto.StartAITranscriptionResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.taskId !== void 0 && message.taskId !== "") {
      writer.uint32(26).string(message.taskId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStartAITranscriptionResponse();
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
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.message = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.taskId = reader.string();
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
      code: isSet(object.code) ? dataBridgeServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      taskId: isSet(object.taskId) ? globalThis.String(object.taskId) : isSet(object.task_id) ? globalThis.String(object.task_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = dataBridgeServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.taskId !== void 0 && message.taskId !== "") {
      obj.taskId = message.taskId;
    }
    return obj;
  },
  create(base) {
    return StartAITranscriptionResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseStartAITranscriptionResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.taskId = object.taskId ?? "";
    return message;
  }
};
function createBaseStopAITranscriptionRequest() {
  return { taskId: "" };
}
const StopAITranscriptionRequest = {
  $type: "DataBridgeServiceProto.StopAITranscriptionRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.taskId !== void 0 && message.taskId !== "") {
      writer.uint32(10).string(message.taskId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStopAITranscriptionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.taskId = reader.string();
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
      taskId: isSet(object.taskId) ? globalThis.String(object.taskId) : isSet(object.task_id) ? globalThis.String(object.task_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.taskId !== void 0 && message.taskId !== "") {
      obj.taskId = message.taskId;
    }
    return obj;
  },
  create(base) {
    return StopAITranscriptionRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseStopAITranscriptionRequest();
    message.taskId = object.taskId ?? "";
    return message;
  }
};
function createBaseStopAITranscriptionResponse() {
  return { code: 0 };
}
const StopAITranscriptionResponse = {
  $type: "DataBridgeServiceProto.StopAITranscriptionResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStopAITranscriptionResponse();
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
    return { code: isSet(object.code) ? dataBridgeServiceCommonCodeFromJSON(object.code) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = dataBridgeServiceCommonCodeToJSON(message.code);
    }
    return obj;
  },
  create(base) {
    return StopAITranscriptionResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseStopAITranscriptionResponse();
    message.code = object.code ?? 0;
    return message;
  }
};
function createBaseReportConversationSourceRequest() {
  return { peerUserId: 0, sourceType: "" };
}
const ReportConversationSourceRequest = {
  $type: "DataBridgeServiceProto.ReportConversationSourceRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.peerUserId !== void 0 && message.peerUserId !== 0) {
      writer.uint32(8).int32(message.peerUserId);
    }
    if (message.sourceType !== void 0 && message.sourceType !== "") {
      writer.uint32(18).string(message.sourceType);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseReportConversationSourceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.peerUserId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.sourceType = reader.string();
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
      peerUserId: isSet(object.peerUserId) ? globalThis.Number(object.peerUserId) : isSet(object.peer_user_id) ? globalThis.Number(object.peer_user_id) : 0,
      sourceType: isSet(object.sourceType) ? globalThis.String(object.sourceType) : isSet(object.source_type) ? globalThis.String(object.source_type) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.peerUserId !== void 0 && message.peerUserId !== 0) {
      obj.peerUserId = Math.round(message.peerUserId);
    }
    if (message.sourceType !== void 0 && message.sourceType !== "") {
      obj.sourceType = message.sourceType;
    }
    return obj;
  },
  create(base) {
    return ReportConversationSourceRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseReportConversationSourceRequest();
    message.peerUserId = object.peerUserId ?? 0;
    message.sourceType = object.sourceType ?? "";
    return message;
  }
};
function createBaseReportConversationSourceResponse() {
  return { code: 0, message: "" };
}
const ReportConversationSourceResponse = {
  $type: "DataBridgeServiceProto.ReportConversationSourceResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseReportConversationSourceResponse();
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
      code: isSet(object.code) ? dataBridgeServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = dataBridgeServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return ReportConversationSourceResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseReportConversationSourceResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseQueryConversationSourceRequest() {
  return { userIds: [], fromUserId: 0 };
}
const QueryConversationSourceRequest = {
  $type: "DataBridgeServiceProto.QueryConversationSourceRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.userIds !== void 0 && message.userIds.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.userIds) {
        writer.int32(v);
      }
      writer.join();
    }
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      writer.uint32(16).int32(message.fromUserId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseQueryConversationSourceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag === 8) {
            message.userIds.push(reader.int32());
            continue;
          }
          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.userIds.push(reader.int32());
            }
            continue;
          }
          break;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.fromUserId = reader.int32();
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
      userIds: globalThis.Array.isArray(object?.userIds) ? object.userIds.map((e) => globalThis.Number(e)) : globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e) => globalThis.Number(e)) : [],
      fromUserId: isSet(object.fromUserId) ? globalThis.Number(object.fromUserId) : isSet(object.from_user_id) ? globalThis.Number(object.from_user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userIds?.length) {
      obj.userIds = message.userIds.map((e) => Math.round(e));
    }
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      obj.fromUserId = Math.round(message.fromUserId);
    }
    return obj;
  },
  create(base) {
    return QueryConversationSourceRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseQueryConversationSourceRequest();
    message.userIds = object.userIds?.map((e) => e) || [];
    message.fromUserId = object.fromUserId ?? 0;
    return message;
  }
};
function createBaseQueryConversationSourceResponse() {
  return { code: 0, message: "", sources: [] };
}
const QueryConversationSourceResponse = {
  $type: "DataBridgeServiceProto.QueryConversationSourceResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.sources !== void 0 && message.sources.length !== 0) {
      for (const v of message.sources) {
        ConversationSource.encode(v, writer.uint32(26).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseQueryConversationSourceResponse();
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
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.message = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          const el = ConversationSource.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.sources.push(el);
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
      code: isSet(object.code) ? dataBridgeServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      sources: globalThis.Array.isArray(object?.sources) ? object.sources.map((e) => ConversationSource.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = dataBridgeServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.sources?.length) {
      obj.sources = message.sources.map((e) => ConversationSource.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return QueryConversationSourceResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseQueryConversationSourceResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.sources = object.sources?.map((e) => ConversationSource.fromPartial(e)) || [];
    return message;
  }
};
function createBaseConversationSource() {
  return { userId: 0, sourceType: "" };
}
const ConversationSource = {
  $type: "DataBridgeServiceProto.ConversationSource",
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.sourceType !== void 0 && message.sourceType !== "") {
      writer.uint32(18).string(message.sourceType);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseConversationSource();
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
          message.sourceType = reader.string();
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
      sourceType: isSet(object.sourceType) ? globalThis.String(object.sourceType) : isSet(object.source_type) ? globalThis.String(object.source_type) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.sourceType !== void 0 && message.sourceType !== "") {
      obj.sourceType = message.sourceType;
    }
    return obj;
  },
  create(base) {
    return ConversationSource.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseConversationSource();
    message.userId = object.userId ?? 0;
    message.sourceType = object.sourceType ?? "";
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
  BehaviorType,
  CallEvent,
  CallType,
  ConversationSource,
  CreateCloudRecordingRequest,
  CreateCloudRecordingResponse,
  DataBridgeServiceCommonCode,
  DeleteCloudRecordingRequest,
  DeleteCloudRecordingResponse,
  FireBaseData,
  FireBasePushRequest,
  FireBasePushResponse,
  Notification,
  OS,
  Platform,
  QueryConversationSourceRequest,
  QueryConversationSourceResponse,
  ReportCallEventRequest,
  ReportCallEventResponse,
  ReportConversationSourceRequest,
  ReportConversationSourceResponse,
  ReportUserAction,
  ReportUserActionRequest,
  ReportUserActionResponse,
  SCM,
  StartAITranscriptionRequest,
  StartAITranscriptionResponse,
  StatCardShowRequest,
  StatCardShowResponse,
  StopAITranscriptionRequest,
  StopAITranscriptionResponse,
  UploadUserBehaviorRequest,
  UploadUserBehaviorResponse,
  UserBehavior,
  behaviorTypeFromJSON,
  behaviorTypeToJSON,
  callEventFromJSON,
  callEventToJSON,
  callTypeFromJSON,
  callTypeToJSON,
  dataBridgeServiceCommonCodeFromJSON,
  dataBridgeServiceCommonCodeToJSON,
  oSFromJSON,
  oSToJSON,
  platformFromJSON,
  platformToJSON,
  protobufPackage,
  reportUserActionFromJSON,
  reportUserActionToJSON,
  sCMFromJSON,
  sCMToJSON
};
