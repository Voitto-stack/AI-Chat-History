import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import {
  BotAvatar,
  BotDetail,
  caiAccountStateFromJSON,
  caiAccountStateToJSON,
  clientTypeFromJSON,
  clientTypeToJSON,
  GetBotsByTagOffset,
  userLocaleFromJSON,
  userLocaleToJSON,
  userServiceCommonCodeFromJSON,
  userServiceCommonCodeToJSON,
  visibilityFromJSON,
  visibilityToJSON
} from "./user_api";
const protobufPackage = "";
var BotServiceCommonCode = /* @__PURE__ */ ((BotServiceCommonCode2) => {
  BotServiceCommonCode2[BotServiceCommonCode2["BotServiceCommonCodeNone"] = 0] = "BotServiceCommonCodeNone";
  BotServiceCommonCode2[BotServiceCommonCode2["Success"] = 1] = "Success";
  BotServiceCommonCode2[BotServiceCommonCode2["Reject"] = 2] = "Reject";
  BotServiceCommonCode2[BotServiceCommonCode2["Failed"] = 99] = "Failed";
  BotServiceCommonCode2[BotServiceCommonCode2["ERROR_MISSING_ID"] = 100] = "ERROR_MISSING_ID";
  BotServiceCommonCode2[BotServiceCommonCode2["ERROR_DUPLICATE"] = 101] = "ERROR_DUPLICATE";
  BotServiceCommonCode2[BotServiceCommonCode2["ERROR_UNKNOWN"] = 102] = "ERROR_UNKNOWN";
  BotServiceCommonCode2[BotServiceCommonCode2["ERROR_BAN_WORDS"] = 103] = "ERROR_BAN_WORDS";
  BotServiceCommonCode2[BotServiceCommonCode2["ERROR_BAN_WORDS_NLP"] = 104] = "ERROR_BAN_WORDS_NLP";
  BotServiceCommonCode2[BotServiceCommonCode2["ERROR_NOT_OWNER"] = 105] = "ERROR_NOT_OWNER";
  BotServiceCommonCode2[BotServiceCommonCode2["ERROR_BOT_NOT_FOUND"] = 106] = "ERROR_BOT_NOT_FOUND";
  BotServiceCommonCode2[BotServiceCommonCode2["ERROR_BAD_COMMENT"] = 107] = "ERROR_BAD_COMMENT";
  BotServiceCommonCode2[BotServiceCommonCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return BotServiceCommonCode2;
})(BotServiceCommonCode || {});
function botServiceCommonCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "BotServiceCommonCodeNone":
      return 0 /* BotServiceCommonCodeNone */;
    case 1:
    case "Success":
      return 1 /* Success */;
    case 2:
    case "Reject":
      return 2 /* Reject */;
    case 99:
    case "Failed":
      return 99 /* Failed */;
    case 100:
    case "ERROR_MISSING_ID":
      return 100 /* ERROR_MISSING_ID */;
    case 101:
    case "ERROR_DUPLICATE":
      return 101 /* ERROR_DUPLICATE */;
    case 102:
    case "ERROR_UNKNOWN":
      return 102 /* ERROR_UNKNOWN */;
    case 103:
    case "ERROR_BAN_WORDS":
      return 103 /* ERROR_BAN_WORDS */;
    case 104:
    case "ERROR_BAN_WORDS_NLP":
      return 104 /* ERROR_BAN_WORDS_NLP */;
    case 105:
    case "ERROR_NOT_OWNER":
      return 105 /* ERROR_NOT_OWNER */;
    case 106:
    case "ERROR_BOT_NOT_FOUND":
      return 106 /* ERROR_BOT_NOT_FOUND */;
    case 107:
    case "ERROR_BAD_COMMENT":
      return 107 /* ERROR_BAD_COMMENT */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function botServiceCommonCodeToJSON(object) {
  switch (object) {
    case 0 /* BotServiceCommonCodeNone */:
      return "BotServiceCommonCodeNone";
    case 1 /* Success */:
      return "Success";
    case 2 /* Reject */:
      return "Reject";
    case 99 /* Failed */:
      return "Failed";
    case 100 /* ERROR_MISSING_ID */:
      return "ERROR_MISSING_ID";
    case 101 /* ERROR_DUPLICATE */:
      return "ERROR_DUPLICATE";
    case 102 /* ERROR_UNKNOWN */:
      return "ERROR_UNKNOWN";
    case 103 /* ERROR_BAN_WORDS */:
      return "ERROR_BAN_WORDS";
    case 104 /* ERROR_BAN_WORDS_NLP */:
      return "ERROR_BAN_WORDS_NLP";
    case 105 /* ERROR_NOT_OWNER */:
      return "ERROR_NOT_OWNER";
    case 106 /* ERROR_BOT_NOT_FOUND */:
      return "ERROR_BOT_NOT_FOUND";
    case 107 /* ERROR_BAD_COMMENT */:
      return "ERROR_BAD_COMMENT";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var CommentType = /* @__PURE__ */ ((CommentType2) => {
  CommentType2[CommentType2["comment"] = 0] = "comment";
  CommentType2[CommentType2["reply"] = 1] = "reply";
  CommentType2[CommentType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return CommentType2;
})(CommentType || {});
function commentTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "comment":
      return 0 /* comment */;
    case 1:
    case "reply":
      return 1 /* reply */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function commentTypeToJSON(object) {
  switch (object) {
    case 0 /* comment */:
      return "comment";
    case 1 /* reply */:
      return "reply";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var CommentStatus = /* @__PURE__ */ ((CommentStatus2) => {
  CommentStatus2[CommentStatus2["valid"] = 0] = "valid";
  CommentStatus2[CommentStatus2["banned"] = 1] = "banned";
  CommentStatus2[CommentStatus2["deleted"] = 2] = "deleted";
  CommentStatus2[CommentStatus2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return CommentStatus2;
})(CommentStatus || {});
function commentStatusFromJSON(object) {
  switch (object) {
    case 0:
    case "valid":
      return 0 /* valid */;
    case 1:
    case "banned":
      return 1 /* banned */;
    case 2:
    case "deleted":
      return 2 /* deleted */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function commentStatusToJSON(object) {
  switch (object) {
    case 0 /* valid */:
      return "valid";
    case 1 /* banned */:
      return "banned";
    case 2 /* deleted */:
      return "deleted";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseEditBotRequest() {
  return {
    avatar: void 0,
    participantName: "",
    greeting: "",
    shortDescription: "",
    longDescription: "",
    advanced: "",
    visibility: 0,
    title: "",
    botId: ""
  };
}
const EditBotRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.avatar !== void 0) {
      BotAvatar.encode(message.avatar, writer.uint32(10).fork()).join();
    }
    if (message.participantName !== void 0 && message.participantName !== "") {
      writer.uint32(18).string(message.participantName);
    }
    if (message.greeting !== void 0 && message.greeting !== "") {
      writer.uint32(26).string(message.greeting);
    }
    if (message.shortDescription !== void 0 && message.shortDescription !== "") {
      writer.uint32(34).string(message.shortDescription);
    }
    if (message.longDescription !== void 0 && message.longDescription !== "") {
      writer.uint32(42).string(message.longDescription);
    }
    if (message.advanced !== void 0 && message.advanced !== "") {
      writer.uint32(50).string(message.advanced);
    }
    if (message.visibility !== void 0 && message.visibility !== 0) {
      writer.uint32(56).int32(message.visibility);
    }
    if (message.title !== void 0 && message.title !== "") {
      writer.uint32(66).string(message.title);
    }
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(74).string(message.botId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseEditBotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.avatar = BotAvatar.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.participantName = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.greeting = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.shortDescription = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.longDescription = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.advanced = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.visibility = reader.int32();
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }
          message.title = reader.string();
          continue;
        }
        case 9: {
          if (tag !== 74) {
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
      avatar: isSet(object.avatar) ? BotAvatar.fromJSON(object.avatar) : void 0,
      participantName: isSet(object.participantName) ? globalThis.String(object.participantName) : isSet(object.participant_name) ? globalThis.String(object.participant_name) : "",
      greeting: isSet(object.greeting) ? globalThis.String(object.greeting) : "",
      shortDescription: isSet(object.shortDescription) ? globalThis.String(object.shortDescription) : isSet(object.short_description) ? globalThis.String(object.short_description) : "",
      longDescription: isSet(object.longDescription) ? globalThis.String(object.longDescription) : isSet(object.long_description) ? globalThis.String(object.long_description) : "",
      advanced: isSet(object.advanced) ? globalThis.String(object.advanced) : "",
      visibility: isSet(object.visibility) ? visibilityFromJSON(object.visibility) : 0,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.avatar !== void 0) {
      obj.avatar = BotAvatar.toJSON(message.avatar);
    }
    if (message.participantName !== void 0 && message.participantName !== "") {
      obj.participantName = message.participantName;
    }
    if (message.greeting !== void 0 && message.greeting !== "") {
      obj.greeting = message.greeting;
    }
    if (message.shortDescription !== void 0 && message.shortDescription !== "") {
      obj.shortDescription = message.shortDescription;
    }
    if (message.longDescription !== void 0 && message.longDescription !== "") {
      obj.longDescription = message.longDescription;
    }
    if (message.advanced !== void 0 && message.advanced !== "") {
      obj.advanced = message.advanced;
    }
    if (message.visibility !== void 0 && message.visibility !== 0) {
      obj.visibility = visibilityToJSON(message.visibility);
    }
    if (message.title !== void 0 && message.title !== "") {
      obj.title = message.title;
    }
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    return obj;
  },
  create(base) {
    return EditBotRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseEditBotRequest();
    message.avatar = object.avatar !== void 0 && object.avatar !== null ? BotAvatar.fromPartial(object.avatar) : void 0;
    message.participantName = object.participantName ?? "";
    message.greeting = object.greeting ?? "";
    message.shortDescription = object.shortDescription ?? "";
    message.longDescription = object.longDescription ?? "";
    message.advanced = object.advanced ?? "";
    message.visibility = object.visibility ?? 0;
    message.title = object.title ?? "";
    message.botId = object.botId ?? "";
    return message;
  }
};
function createBaseEditBotResponse() {
  return { bot: void 0, code: 0, message: "" };
}
const EditBotResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.bot !== void 0) {
      BotDetail.encode(message.bot, writer.uint32(10).fork()).join();
    }
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(16).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseEditBotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.bot = BotDetail.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.code = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      bot: isSet(object.bot) ? BotDetail.fromJSON(object.bot) : void 0,
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.bot !== void 0) {
      obj.bot = BotDetail.toJSON(message.bot);
    }
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return EditBotResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseEditBotResponse();
    message.bot = object.bot !== void 0 && object.bot !== null ? BotDetail.fromPartial(object.bot) : void 0;
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseCreateBotRequest() {
  return {
    avatar: void 0,
    participantName: "",
    greeting: "",
    shortDescription: "",
    longDescription: "",
    advanced: "",
    visibility: 0,
    title: "",
    botId: ""
  };
}
const CreateBotRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.avatar !== void 0) {
      BotAvatar.encode(message.avatar, writer.uint32(10).fork()).join();
    }
    if (message.participantName !== void 0 && message.participantName !== "") {
      writer.uint32(18).string(message.participantName);
    }
    if (message.greeting !== void 0 && message.greeting !== "") {
      writer.uint32(26).string(message.greeting);
    }
    if (message.shortDescription !== void 0 && message.shortDescription !== "") {
      writer.uint32(34).string(message.shortDescription);
    }
    if (message.longDescription !== void 0 && message.longDescription !== "") {
      writer.uint32(42).string(message.longDescription);
    }
    if (message.advanced !== void 0 && message.advanced !== "") {
      writer.uint32(50).string(message.advanced);
    }
    if (message.visibility !== void 0 && message.visibility !== 0) {
      writer.uint32(56).int32(message.visibility);
    }
    if (message.title !== void 0 && message.title !== "") {
      writer.uint32(66).string(message.title);
    }
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(74).string(message.botId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateBotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.avatar = BotAvatar.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.participantName = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.greeting = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.shortDescription = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.longDescription = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.advanced = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.visibility = reader.int32();
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }
          message.title = reader.string();
          continue;
        }
        case 9: {
          if (tag !== 74) {
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
      avatar: isSet(object.avatar) ? BotAvatar.fromJSON(object.avatar) : void 0,
      participantName: isSet(object.participantName) ? globalThis.String(object.participantName) : isSet(object.participant_name) ? globalThis.String(object.participant_name) : "",
      greeting: isSet(object.greeting) ? globalThis.String(object.greeting) : "",
      shortDescription: isSet(object.shortDescription) ? globalThis.String(object.shortDescription) : isSet(object.short_description) ? globalThis.String(object.short_description) : "",
      longDescription: isSet(object.longDescription) ? globalThis.String(object.longDescription) : isSet(object.long_description) ? globalThis.String(object.long_description) : "",
      advanced: isSet(object.advanced) ? globalThis.String(object.advanced) : "",
      visibility: isSet(object.visibility) ? visibilityFromJSON(object.visibility) : 0,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.avatar !== void 0) {
      obj.avatar = BotAvatar.toJSON(message.avatar);
    }
    if (message.participantName !== void 0 && message.participantName !== "") {
      obj.participantName = message.participantName;
    }
    if (message.greeting !== void 0 && message.greeting !== "") {
      obj.greeting = message.greeting;
    }
    if (message.shortDescription !== void 0 && message.shortDescription !== "") {
      obj.shortDescription = message.shortDescription;
    }
    if (message.longDescription !== void 0 && message.longDescription !== "") {
      obj.longDescription = message.longDescription;
    }
    if (message.advanced !== void 0 && message.advanced !== "") {
      obj.advanced = message.advanced;
    }
    if (message.visibility !== void 0 && message.visibility !== 0) {
      obj.visibility = visibilityToJSON(message.visibility);
    }
    if (message.title !== void 0 && message.title !== "") {
      obj.title = message.title;
    }
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    return obj;
  },
  create(base) {
    return CreateBotRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateBotRequest();
    message.avatar = object.avatar !== void 0 && object.avatar !== null ? BotAvatar.fromPartial(object.avatar) : void 0;
    message.participantName = object.participantName ?? "";
    message.greeting = object.greeting ?? "";
    message.shortDescription = object.shortDescription ?? "";
    message.longDescription = object.longDescription ?? "";
    message.advanced = object.advanced ?? "";
    message.visibility = object.visibility ?? 0;
    message.title = object.title ?? "";
    message.botId = object.botId ?? "";
    return message;
  }
};
function createBaseCreateBotResponse() {
  return { bot: void 0, code: 0, message: "" };
}
const CreateBotResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.bot !== void 0) {
      BotDetail.encode(message.bot, writer.uint32(10).fork()).join();
    }
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(16).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateBotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.bot = BotDetail.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.code = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      bot: isSet(object.bot) ? BotDetail.fromJSON(object.bot) : void 0,
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.bot !== void 0) {
      obj.bot = BotDetail.toJSON(message.bot);
    }
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return CreateBotResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateBotResponse();
    message.bot = object.bot !== void 0 && object.bot !== null ? BotDetail.fromPartial(object.bot) : void 0;
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetBotIntroRequest() {
  return { botId: "" };
}
const GetBotIntroRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(10).string(message.botId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetBotIntroRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
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
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    return obj;
  },
  create(base) {
    return GetBotIntroRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetBotIntroRequest();
    message.botId = object.botId ?? "";
    return message;
  }
};
function createBaseGetBotIntroResponse() {
  return { commentCount: 0, rating: 0, introduction: "", code: 0, message: "" };
}
const GetBotIntroResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.commentCount !== void 0 && message.commentCount !== 0) {
      writer.uint32(8).int64(message.commentCount);
    }
    if (message.rating !== void 0 && message.rating !== 0) {
      writer.uint32(21).float(message.rating);
    }
    if (message.introduction !== void 0 && message.introduction !== "") {
      writer.uint32(26).string(message.introduction);
    }
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(32).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetBotIntroResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.commentCount = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 21) {
            break;
          }
          message.rating = reader.float();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.introduction = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.code = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 42) {
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
      commentCount: isSet(object.commentCount) ? globalThis.Number(object.commentCount) : isSet(object.comment_count) ? globalThis.Number(object.comment_count) : 0,
      rating: isSet(object.rating) ? globalThis.Number(object.rating) : 0,
      introduction: isSet(object.introduction) ? globalThis.String(object.introduction) : "",
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.commentCount !== void 0 && message.commentCount !== 0) {
      obj.commentCount = Math.round(message.commentCount);
    }
    if (message.rating !== void 0 && message.rating !== 0) {
      obj.rating = message.rating;
    }
    if (message.introduction !== void 0 && message.introduction !== "") {
      obj.introduction = message.introduction;
    }
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return GetBotIntroResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetBotIntroResponse();
    message.commentCount = object.commentCount ?? 0;
    message.rating = object.rating ?? 0;
    message.introduction = object.introduction ?? "";
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetBotRatingByUserRequest() {
  return { botId: "" };
}
const GetBotRatingByUserRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(10).string(message.botId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetBotRatingByUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
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
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    return obj;
  },
  create(base) {
    return GetBotRatingByUserRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetBotRatingByUserRequest();
    message.botId = object.botId ?? "";
    return message;
  }
};
function createBaseGetBotRatingByUserResponse() {
  return { rating: void 0, code: 0, message: "" };
}
const GetBotRatingByUserResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.rating !== void 0) {
      UserRating.encode(message.rating, writer.uint32(10).fork()).join();
    }
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(16).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetBotRatingByUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.rating = UserRating.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.code = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      rating: isSet(object.rating) ? UserRating.fromJSON(object.rating) : void 0,
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.rating !== void 0) {
      obj.rating = UserRating.toJSON(message.rating);
    }
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return GetBotRatingByUserResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetBotRatingByUserResponse();
    message.rating = object.rating !== void 0 && object.rating !== null ? UserRating.fromPartial(object.rating) : void 0;
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetBotRatingRequest() {
  return { botId: "" };
}
const GetBotRatingRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(10).string(message.botId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetBotRatingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
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
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    return obj;
  },
  create(base) {
    return GetBotRatingRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetBotRatingRequest();
    message.botId = object.botId ?? "";
    return message;
  }
};
function createBaseRatingDistribution() {
  return { botId: "", rating: 0, ratingDistribution: {} };
}
const RatingDistribution = {
  encode(message, writer = new BinaryWriter()) {
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(10).string(message.botId);
    }
    if (message.rating !== void 0 && message.rating !== 0) {
      writer.uint32(21).float(message.rating);
    }
    globalThis.Object.entries(message.ratingDistribution || {}).forEach(([key, value]) => {
      RatingDistribution_RatingDistributionEntry.encode({ key, value }, writer.uint32(26).fork()).join();
    });
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseRatingDistribution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.botId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 21) {
            break;
          }
          message.rating = reader.float();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          const entry3 = RatingDistribution_RatingDistributionEntry.decode(reader, reader.uint32());
          if (entry3.value !== void 0) {
            message.ratingDistribution[entry3.key] = entry3.value;
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
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : "",
      rating: isSet(object.rating) ? globalThis.Number(object.rating) : 0,
      ratingDistribution: isObject(object.ratingDistribution) ? globalThis.Object.entries(object.ratingDistribution).reduce(
        (acc, [key, value]) => {
          acc[globalThis.Number(key)] = globalThis.Number(value);
          return acc;
        },
        {}
      ) : isObject(object.rating_distribution) ? globalThis.Object.entries(object.rating_distribution).reduce(
        (acc, [key, value]) => {
          acc[globalThis.Number(key)] = globalThis.Number(value);
          return acc;
        },
        {}
      ) : {}
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    if (message.rating !== void 0 && message.rating !== 0) {
      obj.rating = message.rating;
    }
    if (message.ratingDistribution) {
      const entries = globalThis.Object.entries(message.ratingDistribution);
      if (entries.length > 0) {
        obj.ratingDistribution = {};
        entries.forEach(([k, v]) => {
          obj.ratingDistribution[k] = Math.round(v);
        });
      }
    }
    return obj;
  },
  create(base) {
    return RatingDistribution.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseRatingDistribution();
    message.botId = object.botId ?? "";
    message.rating = object.rating ?? 0;
    message.ratingDistribution = globalThis.Object.entries(object.ratingDistribution ?? {}).reduce((acc, [key, value]) => {
      if (value !== void 0) {
        acc[globalThis.Number(key)] = globalThis.Number(value);
      }
      return acc;
    }, {});
    return message;
  }
};
function createBaseRatingDistribution_RatingDistributionEntry() {
  return { key: 0, value: 0 };
}
const RatingDistribution_RatingDistributionEntry = {
  encode(message, writer = new BinaryWriter()) {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseRatingDistribution_RatingDistributionEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.key = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.value = longToNumber(reader.int64());
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
      key: isSet(object.key) ? globalThis.Number(object.key) : 0,
      value: isSet(object.value) ? globalThis.Number(object.value) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.key !== 0) {
      obj.key = Math.round(message.key);
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },
  create(base) {
    return RatingDistribution_RatingDistributionEntry.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseRatingDistribution_RatingDistributionEntry();
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  }
};
function createBaseGetBotRatingResponse() {
  return { ratingDistribution: void 0, code: 0, message: "" };
}
const GetBotRatingResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.ratingDistribution !== void 0) {
      RatingDistribution.encode(message.ratingDistribution, writer.uint32(10).fork()).join();
    }
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(16).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetBotRatingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.ratingDistribution = RatingDistribution.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.code = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      ratingDistribution: isSet(object.ratingDistribution) ? RatingDistribution.fromJSON(object.ratingDistribution) : isSet(object.rating_distribution) ? RatingDistribution.fromJSON(object.rating_distribution) : void 0,
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.ratingDistribution !== void 0) {
      obj.ratingDistribution = RatingDistribution.toJSON(message.ratingDistribution);
    }
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return GetBotRatingResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetBotRatingResponse();
    message.ratingDistribution = object.ratingDistribution !== void 0 && object.ratingDistribution !== null ? RatingDistribution.fromPartial(object.ratingDistribution) : void 0;
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseUserRating() {
  return { userId: 0, botId: "", rating: 0 };
}
const UserRating = {
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(18).string(message.botId);
    }
    if (message.rating !== void 0 && message.rating !== 0) {
      writer.uint32(29).float(message.rating);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUserRating();
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
          message.botId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 29) {
            break;
          }
          message.rating = reader.float();
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
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : "",
      rating: isSet(object.rating) ? globalThis.Number(object.rating) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    if (message.rating !== void 0 && message.rating !== 0) {
      obj.rating = message.rating;
    }
    return obj;
  },
  create(base) {
    return UserRating.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUserRating();
    message.userId = object.userId ?? 0;
    message.botId = object.botId ?? "";
    message.rating = object.rating ?? 0;
    return message;
  }
};
function createBaseCreateBotRatingRequest() {
  return { botId: "", rating: 0 };
}
const CreateBotRatingRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(10).string(message.botId);
    }
    if (message.rating !== void 0 && message.rating !== 0) {
      writer.uint32(21).float(message.rating);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateBotRatingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.botId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 21) {
            break;
          }
          message.rating = reader.float();
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
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : "",
      rating: isSet(object.rating) ? globalThis.Number(object.rating) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    if (message.rating !== void 0 && message.rating !== 0) {
      obj.rating = message.rating;
    }
    return obj;
  },
  create(base) {
    return CreateBotRatingRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateBotRatingRequest();
    message.botId = object.botId ?? "";
    message.rating = object.rating ?? 0;
    return message;
  }
};
function createBaseCreateBotRatingResponse() {
  return { rating: void 0, code: 0, message: "" };
}
const CreateBotRatingResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.rating !== void 0) {
      UserRating.encode(message.rating, writer.uint32(10).fork()).join();
    }
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(16).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateBotRatingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.rating = UserRating.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.code = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      rating: isSet(object.rating) ? UserRating.fromJSON(object.rating) : void 0,
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.rating !== void 0) {
      obj.rating = UserRating.toJSON(message.rating);
    }
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return CreateBotRatingResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateBotRatingResponse();
    message.rating = object.rating !== void 0 && object.rating !== null ? UserRating.fromPartial(object.rating) : void 0;
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseComment() {
  return {
    id: 0,
    botId: "",
    parentId: 0,
    userId: 0,
    type: 0,
    replyCount: 0,
    content: "",
    status: 0,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0,
    avatarUrl: "",
    username: "",
    size: 0,
    repliedId: 0,
    parentComment: void 0,
    repliedComment: void 0,
    lang: 0,
    postId: 0,
    nickname: ""
  };
}
const Comment = {
  encode(message, writer = new BinaryWriter()) {
    if (message.id !== void 0 && message.id !== 0) {
      writer.uint32(8).int64(message.id);
    }
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(18).string(message.botId);
    }
    if (message.parentId !== void 0 && message.parentId !== 0) {
      writer.uint32(24).int64(message.parentId);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(32).int32(message.userId);
    }
    if (message.type !== void 0 && message.type !== 0) {
      writer.uint32(40).int32(message.type);
    }
    if (message.replyCount !== void 0 && message.replyCount !== 0) {
      writer.uint32(48).int64(message.replyCount);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(58).string(message.content);
    }
    if (message.status !== void 0 && message.status !== 0) {
      writer.uint32(64).int32(message.status);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      writer.uint32(72).int64(message.createdAt);
    }
    if (message.updatedAt !== void 0 && message.updatedAt !== 0) {
      writer.uint32(80).int64(message.updatedAt);
    }
    if (message.deletedAt !== void 0 && message.deletedAt !== 0) {
      writer.uint32(88).int64(message.deletedAt);
    }
    if (message.avatarUrl !== void 0 && message.avatarUrl !== "") {
      writer.uint32(98).string(message.avatarUrl);
    }
    if (message.username !== void 0 && message.username !== "") {
      writer.uint32(106).string(message.username);
    }
    if (message.size !== void 0 && message.size !== 0) {
      writer.uint32(112).int32(message.size);
    }
    if (message.repliedId !== void 0 && message.repliedId !== 0) {
      writer.uint32(120).int64(message.repliedId);
    }
    if (message.parentComment !== void 0) {
      Comment.encode(message.parentComment, writer.uint32(130).fork()).join();
    }
    if (message.repliedComment !== void 0) {
      Comment.encode(message.repliedComment, writer.uint32(138).fork()).join();
    }
    if (message.lang !== void 0 && message.lang !== 0) {
      writer.uint32(144).int32(message.lang);
    }
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(152).int64(message.postId);
    }
    if (message.nickname !== void 0 && message.nickname !== "") {
      writer.uint32(162).string(message.nickname);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseComment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.id = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.botId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.parentId = longToNumber(reader.int64());
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.userId = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.type = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.replyCount = longToNumber(reader.int64());
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }
          message.content = reader.string();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }
          message.status = reader.int32();
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }
          message.createdAt = longToNumber(reader.int64());
          continue;
        }
        case 10: {
          if (tag !== 80) {
            break;
          }
          message.updatedAt = longToNumber(reader.int64());
          continue;
        }
        case 11: {
          if (tag !== 88) {
            break;
          }
          message.deletedAt = longToNumber(reader.int64());
          continue;
        }
        case 12: {
          if (tag !== 98) {
            break;
          }
          message.avatarUrl = reader.string();
          continue;
        }
        case 13: {
          if (tag !== 106) {
            break;
          }
          message.username = reader.string();
          continue;
        }
        case 14: {
          if (tag !== 112) {
            break;
          }
          message.size = reader.int32();
          continue;
        }
        case 15: {
          if (tag !== 120) {
            break;
          }
          message.repliedId = longToNumber(reader.int64());
          continue;
        }
        case 16: {
          if (tag !== 130) {
            break;
          }
          message.parentComment = Comment.decode(reader, reader.uint32());
          continue;
        }
        case 17: {
          if (tag !== 138) {
            break;
          }
          message.repliedComment = Comment.decode(reader, reader.uint32());
          continue;
        }
        case 18: {
          if (tag !== 144) {
            break;
          }
          message.lang = reader.int32();
          continue;
        }
        case 19: {
          if (tag !== 152) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 20: {
          if (tag !== 162) {
            break;
          }
          message.nickname = reader.string();
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
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : "",
      parentId: isSet(object.parentId) ? globalThis.Number(object.parentId) : isSet(object.parent_id) ? globalThis.Number(object.parent_id) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      type: isSet(object.type) ? commentTypeFromJSON(object.type) : 0,
      replyCount: isSet(object.replyCount) ? globalThis.Number(object.replyCount) : isSet(object.reply_count) ? globalThis.Number(object.reply_count) : 0,
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      status: isSet(object.status) ? commentStatusFromJSON(object.status) : 0,
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : isSet(object.created_at) ? globalThis.Number(object.created_at) : 0,
      updatedAt: isSet(object.updatedAt) ? globalThis.Number(object.updatedAt) : isSet(object.updated_at) ? globalThis.Number(object.updated_at) : 0,
      deletedAt: isSet(object.deletedAt) ? globalThis.Number(object.deletedAt) : isSet(object.deleted_at) ? globalThis.Number(object.deleted_at) : 0,
      avatarUrl: isSet(object.avatarUrl) ? globalThis.String(object.avatarUrl) : isSet(object.avatar_url) ? globalThis.String(object.avatar_url) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      size: isSet(object.size) ? globalThis.Number(object.size) : 0,
      repliedId: isSet(object.repliedId) ? globalThis.Number(object.repliedId) : isSet(object.replied_id) ? globalThis.Number(object.replied_id) : 0,
      parentComment: isSet(object.parentComment) ? Comment.fromJSON(object.parentComment) : isSet(object.parent_comment) ? Comment.fromJSON(object.parent_comment) : void 0,
      repliedComment: isSet(object.repliedComment) ? Comment.fromJSON(object.repliedComment) : isSet(object.replied_comment) ? Comment.fromJSON(object.replied_comment) : void 0,
      lang: isSet(object.lang) ? userLocaleFromJSON(object.lang) : 0,
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      nickname: isSet(object.nickname) ? globalThis.String(object.nickname) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.id !== void 0 && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    if (message.parentId !== void 0 && message.parentId !== 0) {
      obj.parentId = Math.round(message.parentId);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.type !== void 0 && message.type !== 0) {
      obj.type = commentTypeToJSON(message.type);
    }
    if (message.replyCount !== void 0 && message.replyCount !== 0) {
      obj.replyCount = Math.round(message.replyCount);
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    if (message.status !== void 0 && message.status !== 0) {
      obj.status = commentStatusToJSON(message.status);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    if (message.updatedAt !== void 0 && message.updatedAt !== 0) {
      obj.updatedAt = Math.round(message.updatedAt);
    }
    if (message.deletedAt !== void 0 && message.deletedAt !== 0) {
      obj.deletedAt = Math.round(message.deletedAt);
    }
    if (message.avatarUrl !== void 0 && message.avatarUrl !== "") {
      obj.avatarUrl = message.avatarUrl;
    }
    if (message.username !== void 0 && message.username !== "") {
      obj.username = message.username;
    }
    if (message.size !== void 0 && message.size !== 0) {
      obj.size = Math.round(message.size);
    }
    if (message.repliedId !== void 0 && message.repliedId !== 0) {
      obj.repliedId = Math.round(message.repliedId);
    }
    if (message.parentComment !== void 0) {
      obj.parentComment = Comment.toJSON(message.parentComment);
    }
    if (message.repliedComment !== void 0) {
      obj.repliedComment = Comment.toJSON(message.repliedComment);
    }
    if (message.lang !== void 0 && message.lang !== 0) {
      obj.lang = userLocaleToJSON(message.lang);
    }
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    if (message.nickname !== void 0 && message.nickname !== "") {
      obj.nickname = message.nickname;
    }
    return obj;
  },
  create(base) {
    return Comment.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseComment();
    message.id = object.id ?? 0;
    message.botId = object.botId ?? "";
    message.parentId = object.parentId ?? 0;
    message.userId = object.userId ?? 0;
    message.type = object.type ?? 0;
    message.replyCount = object.replyCount ?? 0;
    message.content = object.content ?? "";
    message.status = object.status ?? 0;
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.deletedAt = object.deletedAt ?? 0;
    message.avatarUrl = object.avatarUrl ?? "";
    message.username = object.username ?? "";
    message.size = object.size ?? 0;
    message.repliedId = object.repliedId ?? 0;
    message.parentComment = object.parentComment !== void 0 && object.parentComment !== null ? Comment.fromPartial(object.parentComment) : void 0;
    message.repliedComment = object.repliedComment !== void 0 && object.repliedComment !== null ? Comment.fromPartial(object.repliedComment) : void 0;
    message.lang = object.lang ?? 0;
    message.postId = object.postId ?? 0;
    message.nickname = object.nickname ?? "";
    return message;
  }
};
function createBaseCreateUserCommentRequest() {
  return { botId: "", type: 0, parentId: 0, replyId: 0, content: "" };
}
const CreateUserCommentRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(10).string(message.botId);
    }
    if (message.type !== void 0 && message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    if (message.parentId !== void 0 && message.parentId !== 0) {
      writer.uint32(24).int64(message.parentId);
    }
    if (message.replyId !== void 0 && message.replyId !== 0) {
      writer.uint32(32).int64(message.replyId);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(42).string(message.content);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateUserCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.botId = reader.string();
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
          if (tag !== 24) {
            break;
          }
          message.parentId = longToNumber(reader.int64());
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.replyId = longToNumber(reader.int64());
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.content = reader.string();
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
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : "",
      type: isSet(object.type) ? commentTypeFromJSON(object.type) : 0,
      parentId: isSet(object.parentId) ? globalThis.Number(object.parentId) : isSet(object.parent_id) ? globalThis.Number(object.parent_id) : 0,
      replyId: isSet(object.replyId) ? globalThis.Number(object.replyId) : isSet(object.reply_id) ? globalThis.Number(object.reply_id) : 0,
      content: isSet(object.content) ? globalThis.String(object.content) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    if (message.type !== void 0 && message.type !== 0) {
      obj.type = commentTypeToJSON(message.type);
    }
    if (message.parentId !== void 0 && message.parentId !== 0) {
      obj.parentId = Math.round(message.parentId);
    }
    if (message.replyId !== void 0 && message.replyId !== 0) {
      obj.replyId = Math.round(message.replyId);
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    return obj;
  },
  create(base) {
    return CreateUserCommentRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateUserCommentRequest();
    message.botId = object.botId ?? "";
    message.type = object.type ?? 0;
    message.parentId = object.parentId ?? 0;
    message.replyId = object.replyId ?? 0;
    message.content = object.content ?? "";
    return message;
  }
};
function createBaseCreateUserCommentResponse() {
  return { code: 0, comment: void 0, message: "" };
}
const CreateUserCommentResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.comment !== void 0) {
      Comment.encode(message.comment, writer.uint32(18).fork()).join();
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateUserCommentResponse();
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
          message.comment = Comment.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      comment: isSet(object.comment) ? Comment.fromJSON(object.comment) : void 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.comment !== void 0) {
      obj.comment = Comment.toJSON(message.comment);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return CreateUserCommentResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateUserCommentResponse();
    message.code = object.code ?? 0;
    message.comment = object.comment !== void 0 && object.comment !== null ? Comment.fromPartial(object.comment) : void 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetUserCommentsRequest() {
  return { botId: "", commentIdOffset: 0, limit: 0 };
}
const GetUserCommentsRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(10).string(message.botId);
    }
    if (message.commentIdOffset !== void 0 && message.commentIdOffset !== 0) {
      writer.uint32(16).int64(message.commentIdOffset);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      writer.uint32(24).int32(message.limit);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetUserCommentsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.botId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.commentIdOffset = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.limit = reader.int32();
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
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : "",
      commentIdOffset: isSet(object.commentIdOffset) ? globalThis.Number(object.commentIdOffset) : isSet(object.comment_id_offset) ? globalThis.Number(object.comment_id_offset) : 0,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    if (message.commentIdOffset !== void 0 && message.commentIdOffset !== 0) {
      obj.commentIdOffset = Math.round(message.commentIdOffset);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    return obj;
  },
  create(base) {
    return GetUserCommentsRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetUserCommentsRequest();
    message.botId = object.botId ?? "";
    message.commentIdOffset = object.commentIdOffset ?? 0;
    message.limit = object.limit ?? 0;
    return message;
  }
};
function createBaseGetUserCommentsResponse() {
  return { code: 0, comments: [], hasMore: false, commentCount: 0, message: "" };
}
const GetUserCommentsResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.comments !== void 0 && message.comments.length !== 0) {
      for (const v of message.comments) {
        Comment.encode(v, writer.uint32(18).fork()).join();
      }
    }
    if (message.hasMore !== void 0 && message.hasMore !== false) {
      writer.uint32(24).bool(message.hasMore);
    }
    if (message.commentCount !== void 0 && message.commentCount !== 0) {
      writer.uint32(32).int32(message.commentCount);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetUserCommentsResponse();
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
          const el = Comment.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.comments.push(el);
          }
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.hasMore = reader.bool();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.commentCount = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 42) {
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
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      comments: globalThis.Array.isArray(object?.comments) ? object.comments.map((e) => Comment.fromJSON(e)) : [],
      hasMore: isSet(object.hasMore) ? globalThis.Boolean(object.hasMore) : isSet(object.has_more) ? globalThis.Boolean(object.has_more) : false,
      commentCount: isSet(object.commentCount) ? globalThis.Number(object.commentCount) : isSet(object.comment_count) ? globalThis.Number(object.comment_count) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.comments?.length) {
      obj.comments = message.comments.map((e) => Comment.toJSON(e));
    }
    if (message.hasMore !== void 0 && message.hasMore !== false) {
      obj.hasMore = message.hasMore;
    }
    if (message.commentCount !== void 0 && message.commentCount !== 0) {
      obj.commentCount = Math.round(message.commentCount);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return GetUserCommentsResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetUserCommentsResponse();
    message.code = object.code ?? 0;
    message.comments = object.comments?.map((e) => Comment.fromPartial(e)) || [];
    message.hasMore = object.hasMore ?? false;
    message.commentCount = object.commentCount ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetReplyCommentsRequest() {
  return { commentId: 0, commentIdOffset: 0, limit: 0 };
}
const GetReplyCommentsRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.commentId !== void 0 && message.commentId !== 0) {
      writer.uint32(8).int64(message.commentId);
    }
    if (message.commentIdOffset !== void 0 && message.commentIdOffset !== 0) {
      writer.uint32(16).int64(message.commentIdOffset);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      writer.uint32(24).int32(message.limit);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetReplyCommentsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.commentId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.commentIdOffset = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.limit = reader.int32();
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
      commentId: isSet(object.commentId) ? globalThis.Number(object.commentId) : isSet(object.comment_id) ? globalThis.Number(object.comment_id) : 0,
      commentIdOffset: isSet(object.commentIdOffset) ? globalThis.Number(object.commentIdOffset) : isSet(object.comment_id_offset) ? globalThis.Number(object.comment_id_offset) : 0,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.commentId !== void 0 && message.commentId !== 0) {
      obj.commentId = Math.round(message.commentId);
    }
    if (message.commentIdOffset !== void 0 && message.commentIdOffset !== 0) {
      obj.commentIdOffset = Math.round(message.commentIdOffset);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    return obj;
  },
  create(base) {
    return GetReplyCommentsRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetReplyCommentsRequest();
    message.commentId = object.commentId ?? 0;
    message.commentIdOffset = object.commentIdOffset ?? 0;
    message.limit = object.limit ?? 0;
    return message;
  }
};
function createBaseGetReplyCommentsResponse() {
  return { code: 0, comments: [], hasMore: false, commentCount: 0, message: "" };
}
const GetReplyCommentsResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.comments !== void 0 && message.comments.length !== 0) {
      for (const v of message.comments) {
        Comment.encode(v, writer.uint32(18).fork()).join();
      }
    }
    if (message.hasMore !== void 0 && message.hasMore !== false) {
      writer.uint32(24).bool(message.hasMore);
    }
    if (message.commentCount !== void 0 && message.commentCount !== 0) {
      writer.uint32(32).int32(message.commentCount);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetReplyCommentsResponse();
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
          const el = Comment.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.comments.push(el);
          }
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.hasMore = reader.bool();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.commentCount = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 42) {
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
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      comments: globalThis.Array.isArray(object?.comments) ? object.comments.map((e) => Comment.fromJSON(e)) : [],
      hasMore: isSet(object.hasMore) ? globalThis.Boolean(object.hasMore) : isSet(object.has_more) ? globalThis.Boolean(object.has_more) : false,
      commentCount: isSet(object.commentCount) ? globalThis.Number(object.commentCount) : isSet(object.comment_count) ? globalThis.Number(object.comment_count) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.comments?.length) {
      obj.comments = message.comments.map((e) => Comment.toJSON(e));
    }
    if (message.hasMore !== void 0 && message.hasMore !== false) {
      obj.hasMore = message.hasMore;
    }
    if (message.commentCount !== void 0 && message.commentCount !== 0) {
      obj.commentCount = Math.round(message.commentCount);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return GetReplyCommentsResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetReplyCommentsResponse();
    message.code = object.code ?? 0;
    message.comments = object.comments?.map((e) => Comment.fromPartial(e)) || [];
    message.hasMore = object.hasMore ?? false;
    message.commentCount = object.commentCount ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetTopCommentRequest() {
  return { botId: "" };
}
const GetTopCommentRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(10).string(message.botId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetTopCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
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
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    return obj;
  },
  create(base) {
    return GetTopCommentRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetTopCommentRequest();
    message.botId = object.botId ?? "";
    return message;
  }
};
function createBaseGetTopCommentResponse() {
  return { code: 0, comment: void 0, message: "" };
}
const GetTopCommentResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.comment !== void 0) {
      Comment.encode(message.comment, writer.uint32(18).fork()).join();
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetTopCommentResponse();
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
          message.comment = Comment.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      comment: isSet(object.comment) ? Comment.fromJSON(object.comment) : void 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.comment !== void 0) {
      obj.comment = Comment.toJSON(message.comment);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return GetTopCommentResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetTopCommentResponse();
    message.code = object.code ?? 0;
    message.comment = object.comment !== void 0 && object.comment !== null ? Comment.fromPartial(object.comment) : void 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseUpdateUserCommentRequest() {
  return { commentId: 0, content: "" };
}
const UpdateUserCommentRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.commentId !== void 0 && message.commentId !== 0) {
      writer.uint32(8).int64(message.commentId);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.commentId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.content = reader.string();
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
      commentId: isSet(object.commentId) ? globalThis.Number(object.commentId) : isSet(object.comment_id) ? globalThis.Number(object.comment_id) : 0,
      content: isSet(object.content) ? globalThis.String(object.content) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.commentId !== void 0 && message.commentId !== 0) {
      obj.commentId = Math.round(message.commentId);
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    return obj;
  },
  create(base) {
    return UpdateUserCommentRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUpdateUserCommentRequest();
    message.commentId = object.commentId ?? 0;
    message.content = object.content ?? "";
    return message;
  }
};
function createBaseUpdateUserCommentResponse() {
  return { code: 0, comment: void 0, message: "" };
}
const UpdateUserCommentResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.comment !== void 0) {
      Comment.encode(message.comment, writer.uint32(18).fork()).join();
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUpdateUserCommentResponse();
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
          message.comment = Comment.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      comment: isSet(object.comment) ? Comment.fromJSON(object.comment) : void 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.comment !== void 0) {
      obj.comment = Comment.toJSON(message.comment);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return UpdateUserCommentResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUpdateUserCommentResponse();
    message.code = object.code ?? 0;
    message.comment = object.comment !== void 0 && object.comment !== null ? Comment.fromPartial(object.comment) : void 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseReportCommentRequest() {
  return { commentId: 0, reason: [] };
}
const ReportCommentRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.commentId !== void 0 && message.commentId !== 0) {
      writer.uint32(8).int64(message.commentId);
    }
    if (message.reason !== void 0 && message.reason.length !== 0) {
      for (const v of message.reason) {
        writer.uint32(18).string(v);
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseReportCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.commentId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          const el = reader.string();
          if (el !== void 0) {
            message.reason.push(el);
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
      commentId: isSet(object.commentId) ? globalThis.Number(object.commentId) : isSet(object.comment_id) ? globalThis.Number(object.comment_id) : 0,
      reason: globalThis.Array.isArray(object?.reason) ? object.reason.map((e) => globalThis.String(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.commentId !== void 0 && message.commentId !== 0) {
      obj.commentId = Math.round(message.commentId);
    }
    if (message.reason?.length) {
      obj.reason = message.reason;
    }
    return obj;
  },
  create(base) {
    return ReportCommentRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseReportCommentRequest();
    message.commentId = object.commentId ?? 0;
    message.reason = object.reason?.map((e) => e) || [];
    return message;
  }
};
function createBaseReportCommentResponse() {
  return { code: 0, message: "" };
}
const ReportCommentResponse = {
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
    const message = createBaseReportCommentResponse();
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
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return ReportCommentResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseReportCommentResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetXHTokenRequest() {
  return {};
}
const GetXHTokenRequest = {
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetXHTokenRequest();
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
    return GetXHTokenRequest.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseGetXHTokenRequest();
    return message;
  }
};
function createBaseGetXHTokenResponse() {
  return { code: 0, token: "", message: "" };
}
const GetXHTokenResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.token !== void 0 && message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetXHTokenResponse();
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
          message.token = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.token !== void 0 && message.token !== "") {
      obj.token = message.token;
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return GetXHTokenResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetXHTokenResponse();
    message.code = object.code ?? 0;
    message.token = object.token ?? "";
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseSetInReviewVersionRequest() {
  return { clientType: 0, version: "" };
}
const SetInReviewVersionRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.clientType !== void 0 && message.clientType !== 0) {
      writer.uint32(8).int32(message.clientType);
    }
    if (message.version !== void 0 && message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSetInReviewVersionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.clientType = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.version = reader.string();
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
      clientType: isSet(object.clientType) ? clientTypeFromJSON(object.clientType) : isSet(object.client_type) ? clientTypeFromJSON(object.client_type) : 0,
      version: isSet(object.version) ? globalThis.String(object.version) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.clientType !== void 0 && message.clientType !== 0) {
      obj.clientType = clientTypeToJSON(message.clientType);
    }
    if (message.version !== void 0 && message.version !== "") {
      obj.version = message.version;
    }
    return obj;
  },
  create(base) {
    return SetInReviewVersionRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseSetInReviewVersionRequest();
    message.clientType = object.clientType ?? 0;
    message.version = object.version ?? "";
    return message;
  }
};
function createBaseSetInReviewVersionResponse() {
  return { code: 0, message: "" };
}
const SetInReviewVersionResponse = {
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
    const message = createBaseSetInReviewVersionResponse();
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
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return SetInReviewVersionResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseSetInReviewVersionResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseUpdateCaiAccountRequest() {
  return { id: 0, state: 0, cookie: "", userAgent: "" };
}
const UpdateCaiAccountRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.id !== void 0 && message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.state !== void 0 && message.state !== 0) {
      writer.uint32(16).int32(message.state);
    }
    if (message.cookie !== void 0 && message.cookie !== "") {
      writer.uint32(26).string(message.cookie);
    }
    if (message.userAgent !== void 0 && message.userAgent !== "") {
      writer.uint32(34).string(message.userAgent);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUpdateCaiAccountRequest();
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
          message.state = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.cookie = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.userAgent = reader.string();
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
      state: isSet(object.state) ? caiAccountStateFromJSON(object.state) : 0,
      cookie: isSet(object.cookie) ? globalThis.String(object.cookie) : "",
      userAgent: isSet(object.userAgent) ? globalThis.String(object.userAgent) : isSet(object.user_agent) ? globalThis.String(object.user_agent) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.id !== void 0 && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.state !== void 0 && message.state !== 0) {
      obj.state = caiAccountStateToJSON(message.state);
    }
    if (message.cookie !== void 0 && message.cookie !== "") {
      obj.cookie = message.cookie;
    }
    if (message.userAgent !== void 0 && message.userAgent !== "") {
      obj.userAgent = message.userAgent;
    }
    return obj;
  },
  create(base) {
    return UpdateCaiAccountRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUpdateCaiAccountRequest();
    message.id = object.id ?? 0;
    message.state = object.state ?? 0;
    message.cookie = object.cookie ?? "";
    message.userAgent = object.userAgent ?? "";
    return message;
  }
};
function createBaseUpdateCaiAccountResponse() {
  return { code: 0, message: "" };
}
const UpdateCaiAccountResponse = {
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
    const message = createBaseUpdateCaiAccountResponse();
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
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return UpdateCaiAccountResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUpdateCaiAccountResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetBotsByTagAdminRequest() {
  return { userId: 0, offset: void 0, botTag: "", clientType: 0, appVersion: "" };
}
const GetBotsByTagAdminRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.offset !== void 0) {
      GetBotsByTagOffset.encode(message.offset, writer.uint32(18).fork()).join();
    }
    if (message.botTag !== void 0 && message.botTag !== "") {
      writer.uint32(26).string(message.botTag);
    }
    if (message.clientType !== void 0 && message.clientType !== 0) {
      writer.uint32(32).int32(message.clientType);
    }
    if (message.appVersion !== void 0 && message.appVersion !== "") {
      writer.uint32(42).string(message.appVersion);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetBotsByTagAdminRequest();
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
          message.offset = GetBotsByTagOffset.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.botTag = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.clientType = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.appVersion = reader.string();
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
      offset: isSet(object.offset) ? GetBotsByTagOffset.fromJSON(object.offset) : void 0,
      botTag: isSet(object.botTag) ? globalThis.String(object.botTag) : isSet(object.bot_tag) ? globalThis.String(object.bot_tag) : "",
      clientType: isSet(object.clientType) ? clientTypeFromJSON(object.clientType) : isSet(object.client_type) ? clientTypeFromJSON(object.client_type) : 0,
      appVersion: isSet(object.appVersion) ? globalThis.String(object.appVersion) : isSet(object.app_version) ? globalThis.String(object.app_version) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.offset !== void 0) {
      obj.offset = GetBotsByTagOffset.toJSON(message.offset);
    }
    if (message.botTag !== void 0 && message.botTag !== "") {
      obj.botTag = message.botTag;
    }
    if (message.clientType !== void 0 && message.clientType !== 0) {
      obj.clientType = clientTypeToJSON(message.clientType);
    }
    if (message.appVersion !== void 0 && message.appVersion !== "") {
      obj.appVersion = message.appVersion;
    }
    return obj;
  },
  create(base) {
    return GetBotsByTagAdminRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetBotsByTagAdminRequest();
    message.userId = object.userId ?? 0;
    message.offset = object.offset !== void 0 && object.offset !== null ? GetBotsByTagOffset.fromPartial(object.offset) : void 0;
    message.botTag = object.botTag ?? "";
    message.clientType = object.clientType ?? 0;
    message.appVersion = object.appVersion ?? "";
    return message;
  }
};
function createBaseGetBotsByTagResponse() {
  return { bots: [], nextOffset: void 0, total: 0, code: 0, message: "", requestId: "" };
}
const GetBotsByTagResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.bots !== void 0 && message.bots.length !== 0) {
      for (const v of message.bots) {
        BotDetail.encode(v, writer.uint32(10).fork()).join();
      }
    }
    if (message.nextOffset !== void 0) {
      GetBotsByTagOffset.encode(message.nextOffset, writer.uint32(18).fork()).join();
    }
    if (message.total !== void 0 && message.total !== 0) {
      writer.uint32(24).int32(message.total);
    }
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(32).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(42).string(message.message);
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      writer.uint32(50).string(message.requestId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetBotsByTagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = BotDetail.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.bots.push(el);
          }
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.nextOffset = GetBotsByTagOffset.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.total = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.code = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.message = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
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
      bots: globalThis.Array.isArray(object?.bots) ? object.bots.map((e) => BotDetail.fromJSON(e)) : [],
      nextOffset: isSet(object.nextOffset) ? GetBotsByTagOffset.fromJSON(object.nextOffset) : isSet(object.next_offset) ? GetBotsByTagOffset.fromJSON(object.next_offset) : void 0,
      total: isSet(object.total) ? globalThis.Number(object.total) : 0,
      code: isSet(object.code) ? userServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      requestId: isSet(object.requestId) ? globalThis.String(object.requestId) : isSet(object.request_id) ? globalThis.String(object.request_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.bots?.length) {
      obj.bots = message.bots.map((e) => BotDetail.toJSON(e));
    }
    if (message.nextOffset !== void 0) {
      obj.nextOffset = GetBotsByTagOffset.toJSON(message.nextOffset);
    }
    if (message.total !== void 0 && message.total !== 0) {
      obj.total = Math.round(message.total);
    }
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = userServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      obj.requestId = message.requestId;
    }
    return obj;
  },
  create(base) {
    return GetBotsByTagResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetBotsByTagResponse();
    message.bots = object.bots?.map((e) => BotDetail.fromPartial(e)) || [];
    message.nextOffset = object.nextOffset !== void 0 && object.nextOffset !== null ? GetBotsByTagOffset.fromPartial(object.nextOffset) : void 0;
    message.total = object.total ?? 0;
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.requestId = object.requestId ?? "";
    return message;
  }
};
function createBaseCreateFakeBotRequest() {
  return { participantName: "", botId: "", isFromRec: false };
}
const CreateFakeBotRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.participantName !== void 0 && message.participantName !== "") {
      writer.uint32(10).string(message.participantName);
    }
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(18).string(message.botId);
    }
    if (message.isFromRec !== void 0 && message.isFromRec !== false) {
      writer.uint32(24).bool(message.isFromRec);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateFakeBotRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.participantName = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.botId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.isFromRec = reader.bool();
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
      participantName: isSet(object.participantName) ? globalThis.String(object.participantName) : isSet(object.participant_name) ? globalThis.String(object.participant_name) : "",
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : "",
      isFromRec: isSet(object.isFromRec) ? globalThis.Boolean(object.isFromRec) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.participantName !== void 0 && message.participantName !== "") {
      obj.participantName = message.participantName;
    }
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    if (message.isFromRec !== void 0 && message.isFromRec !== false) {
      obj.isFromRec = message.isFromRec;
    }
    return obj;
  },
  create(base) {
    return CreateFakeBotRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateFakeBotRequest();
    message.participantName = object.participantName ?? "";
    message.botId = object.botId ?? "";
    message.isFromRec = object.isFromRec ?? false;
    return message;
  }
};
function createBaseCreateFakeBotResponse() {
  return { bot: void 0, code: 0, message: "" };
}
const CreateFakeBotResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.bot !== void 0) {
      BotDetail.encode(message.bot, writer.uint32(10).fork()).join();
    }
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(16).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateFakeBotResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.bot = BotDetail.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.code = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      bot: isSet(object.bot) ? BotDetail.fromJSON(object.bot) : void 0,
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.bot !== void 0) {
      obj.bot = BotDetail.toJSON(message.bot);
    }
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return CreateFakeBotResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateFakeBotResponse();
    message.bot = object.bot !== void 0 && object.bot !== null ? BotDetail.fromPartial(object.bot) : void 0;
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseAdminCreateBotForDigitalHumanRequest() {
  return {
    avatarUrl: "",
    participantName: "",
    greeting: "",
    shortDescription: "",
    longDescription: "",
    advanced: "",
    visibility: 0,
    title: "",
    botId: "",
    userId: 0
  };
}
const AdminCreateBotForDigitalHumanRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.avatarUrl !== void 0 && message.avatarUrl !== "") {
      writer.uint32(10).string(message.avatarUrl);
    }
    if (message.participantName !== void 0 && message.participantName !== "") {
      writer.uint32(18).string(message.participantName);
    }
    if (message.greeting !== void 0 && message.greeting !== "") {
      writer.uint32(26).string(message.greeting);
    }
    if (message.shortDescription !== void 0 && message.shortDescription !== "") {
      writer.uint32(34).string(message.shortDescription);
    }
    if (message.longDescription !== void 0 && message.longDescription !== "") {
      writer.uint32(42).string(message.longDescription);
    }
    if (message.advanced !== void 0 && message.advanced !== "") {
      writer.uint32(50).string(message.advanced);
    }
    if (message.visibility !== void 0 && message.visibility !== 0) {
      writer.uint32(56).int32(message.visibility);
    }
    if (message.title !== void 0 && message.title !== "") {
      writer.uint32(66).string(message.title);
    }
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(74).string(message.botId);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(80).int32(message.userId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminCreateBotForDigitalHumanRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.avatarUrl = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.participantName = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.greeting = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.shortDescription = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.longDescription = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.advanced = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.visibility = reader.int32();
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }
          message.title = reader.string();
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }
          message.botId = reader.string();
          continue;
        }
        case 10: {
          if (tag !== 80) {
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
      avatarUrl: isSet(object.avatarUrl) ? globalThis.String(object.avatarUrl) : isSet(object.avatar_url) ? globalThis.String(object.avatar_url) : "",
      participantName: isSet(object.participantName) ? globalThis.String(object.participantName) : isSet(object.participant_name) ? globalThis.String(object.participant_name) : "",
      greeting: isSet(object.greeting) ? globalThis.String(object.greeting) : "",
      shortDescription: isSet(object.shortDescription) ? globalThis.String(object.shortDescription) : isSet(object.short_description) ? globalThis.String(object.short_description) : "",
      longDescription: isSet(object.longDescription) ? globalThis.String(object.longDescription) : isSet(object.long_description) ? globalThis.String(object.long_description) : "",
      advanced: isSet(object.advanced) ? globalThis.String(object.advanced) : "",
      visibility: isSet(object.visibility) ? visibilityFromJSON(object.visibility) : 0,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : "",
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.avatarUrl !== void 0 && message.avatarUrl !== "") {
      obj.avatarUrl = message.avatarUrl;
    }
    if (message.participantName !== void 0 && message.participantName !== "") {
      obj.participantName = message.participantName;
    }
    if (message.greeting !== void 0 && message.greeting !== "") {
      obj.greeting = message.greeting;
    }
    if (message.shortDescription !== void 0 && message.shortDescription !== "") {
      obj.shortDescription = message.shortDescription;
    }
    if (message.longDescription !== void 0 && message.longDescription !== "") {
      obj.longDescription = message.longDescription;
    }
    if (message.advanced !== void 0 && message.advanced !== "") {
      obj.advanced = message.advanced;
    }
    if (message.visibility !== void 0 && message.visibility !== 0) {
      obj.visibility = visibilityToJSON(message.visibility);
    }
    if (message.title !== void 0 && message.title !== "") {
      obj.title = message.title;
    }
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    return obj;
  },
  create(base) {
    return AdminCreateBotForDigitalHumanRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminCreateBotForDigitalHumanRequest();
    message.avatarUrl = object.avatarUrl ?? "";
    message.participantName = object.participantName ?? "";
    message.greeting = object.greeting ?? "";
    message.shortDescription = object.shortDescription ?? "";
    message.longDescription = object.longDescription ?? "";
    message.advanced = object.advanced ?? "";
    message.visibility = object.visibility ?? 0;
    message.title = object.title ?? "";
    message.botId = object.botId ?? "";
    message.userId = object.userId ?? 0;
    return message;
  }
};
function createBaseAdminCreateBotForDigitalHumanResponse() {
  return { code: 0, message: "", bot: void 0 };
}
const AdminCreateBotForDigitalHumanResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.bot !== void 0) {
      BotDetail.encode(message.bot, writer.uint32(26).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminCreateBotForDigitalHumanResponse();
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
          message.bot = BotDetail.decode(reader, reader.uint32());
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
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      bot: isSet(object.bot) ? BotDetail.fromJSON(object.bot) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.bot !== void 0) {
      obj.bot = BotDetail.toJSON(message.bot);
    }
    return obj;
  },
  create(base) {
    return AdminCreateBotForDigitalHumanResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminCreateBotForDigitalHumanResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.bot = object.bot !== void 0 && object.bot !== null ? BotDetail.fromPartial(object.bot) : void 0;
    return message;
  }
};
function createBaseUploadChatSoundRequest() {
  return { toUserId: 0, file: new Uint8Array(0), fileType: "" };
}
const UploadChatSoundRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      writer.uint32(8).int32(message.toUserId);
    }
    if (message.file !== void 0 && message.file.length !== 0) {
      writer.uint32(18).bytes(message.file);
    }
    if (message.fileType !== void 0 && message.fileType !== "") {
      writer.uint32(26).string(message.fileType);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUploadChatSoundRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.toUserId = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.file = reader.bytes();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.fileType = reader.string();
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
      toUserId: isSet(object.toUserId) ? globalThis.Number(object.toUserId) : isSet(object.to_user_id) ? globalThis.Number(object.to_user_id) : 0,
      file: isSet(object.file) ? bytesFromBase64(object.file) : new Uint8Array(0),
      fileType: isSet(object.fileType) ? globalThis.String(object.fileType) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      obj.toUserId = Math.round(message.toUserId);
    }
    if (message.file !== void 0 && message.file.length !== 0) {
      obj.file = base64FromBytes(message.file);
    }
    if (message.fileType !== void 0 && message.fileType !== "") {
      obj.fileType = message.fileType;
    }
    return obj;
  },
  create(base) {
    return UploadChatSoundRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUploadChatSoundRequest();
    message.toUserId = object.toUserId ?? 0;
    message.file = object.file ?? new Uint8Array(0);
    message.fileType = object.fileType ?? "";
    return message;
  }
};
function createBaseUploadChatSoundResponse() {
  return { code: 0, message: "", url: "" };
}
const UploadChatSoundResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.url !== void 0 && message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUploadChatSoundResponse();
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
          message.url = reader.string();
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
      code: isSet(object.code) ? botServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      url: isSet(object.url) ? globalThis.String(object.url) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.url !== void 0 && message.url !== "") {
      obj.url = message.url;
    }
    return obj;
  },
  create(base) {
    return UploadChatSoundResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUploadChatSoundResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.url = object.url ?? "";
    return message;
  }
};
function bytesFromBase64(b64) {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}
function base64FromBytes(arr) {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}
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
function isObject(value) {
  return typeof value === "object" && value !== null;
}
function isSet(value) {
  return value !== null && value !== void 0;
}
export {
  AdminCreateBotForDigitalHumanRequest,
  AdminCreateBotForDigitalHumanResponse,
  BotServiceCommonCode,
  Comment,
  CommentStatus,
  CommentType,
  CreateBotRatingRequest,
  CreateBotRatingResponse,
  CreateBotRequest,
  CreateBotResponse,
  CreateFakeBotRequest,
  CreateFakeBotResponse,
  CreateUserCommentRequest,
  CreateUserCommentResponse,
  EditBotRequest,
  EditBotResponse,
  GetBotIntroRequest,
  GetBotIntroResponse,
  GetBotRatingByUserRequest,
  GetBotRatingByUserResponse,
  GetBotRatingRequest,
  GetBotRatingResponse,
  GetBotsByTagAdminRequest,
  GetBotsByTagResponse,
  GetReplyCommentsRequest,
  GetReplyCommentsResponse,
  GetTopCommentRequest,
  GetTopCommentResponse,
  GetUserCommentsRequest,
  GetUserCommentsResponse,
  GetXHTokenRequest,
  GetXHTokenResponse,
  RatingDistribution,
  RatingDistribution_RatingDistributionEntry,
  ReportCommentRequest,
  ReportCommentResponse,
  SetInReviewVersionRequest,
  SetInReviewVersionResponse,
  UpdateCaiAccountRequest,
  UpdateCaiAccountResponse,
  UpdateUserCommentRequest,
  UpdateUserCommentResponse,
  UploadChatSoundRequest,
  UploadChatSoundResponse,
  UserRating,
  botServiceCommonCodeFromJSON,
  botServiceCommonCodeToJSON,
  commentStatusFromJSON,
  commentStatusToJSON,
  commentTypeFromJSON,
  commentTypeToJSON,
  protobufPackage
};
