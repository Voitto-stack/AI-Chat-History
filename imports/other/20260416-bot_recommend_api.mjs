import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { BotDetail, userLocaleFromJSON, userLocaleToJSON } from "./user_api";
const protobufPackage = "BotRecommendServiceProto";
var BotRecommendServiceCommonCode = /* @__PURE__ */ ((BotRecommendServiceCommonCode2) => {
  BotRecommendServiceCommonCode2[BotRecommendServiceCommonCode2["None"] = 0] = "None";
  BotRecommendServiceCommonCode2[BotRecommendServiceCommonCode2["Success"] = 1] = "Success";
  BotRecommendServiceCommonCode2[BotRecommendServiceCommonCode2["Failed"] = 99] = "Failed";
  BotRecommendServiceCommonCode2[BotRecommendServiceCommonCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return BotRecommendServiceCommonCode2;
})(BotRecommendServiceCommonCode || {});
function botRecommendServiceCommonCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "None":
      return 0 /* None */;
    case 1:
    case "Success":
      return 1 /* Success */;
    case 99:
    case "Failed":
      return 99 /* Failed */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function botRecommendServiceCommonCodeToJSON(object) {
  switch (object) {
    case 0 /* None */:
      return "None";
    case 1 /* Success */:
      return "Success";
    case 99 /* Failed */:
      return "Failed";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseBotRecommendServiceResult() {
  return { code: 0, message: "" };
}
const BotRecommendServiceResult = {
  $type: "BotRecommendServiceProto.BotRecommendServiceResult",
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
    const message = createBaseBotRecommendServiceResult();
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
      code: isSet(object.code) ? botRecommendServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = botRecommendServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return BotRecommendServiceResult.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseBotRecommendServiceResult();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetDiscoverRecBotsRequest() {
  return { category: "" };
}
const GetDiscoverRecBotsRequest = {
  $type: "BotRecommendServiceProto.GetDiscoverRecBotsRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.category !== void 0 && message.category !== "") {
      writer.uint32(10).string(message.category);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetDiscoverRecBotsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.category = reader.string();
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
    return { category: isSet(object.category) ? globalThis.String(object.category) : "" };
  },
  toJSON(message) {
    const obj = {};
    if (message.category !== void 0 && message.category !== "") {
      obj.category = message.category;
    }
    return obj;
  },
  create(base) {
    return GetDiscoverRecBotsRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetDiscoverRecBotsRequest();
    message.category = object.category ?? "";
    return message;
  }
};
function createBaseGetDiscoverRecBotsResponse() {
  return { bots: [], result: void 0, requestId: "" };
}
const GetDiscoverRecBotsResponse = {
  $type: "BotRecommendServiceProto.GetDiscoverRecBotsResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.bots !== void 0 && message.bots.length !== 0) {
      for (const v of message.bots) {
        BotDetail.encode(v, writer.uint32(10).fork()).join();
      }
    }
    if (message.result !== void 0) {
      BotRecommendServiceResult.encode(message.result, writer.uint32(18).fork()).join();
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      writer.uint32(26).string(message.requestId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetDiscoverRecBotsResponse();
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
          message.result = BotRecommendServiceResult.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      result: isSet(object.result) ? BotRecommendServiceResult.fromJSON(object.result) : void 0,
      requestId: isSet(object.requestId) ? globalThis.String(object.requestId) : isSet(object.request_id) ? globalThis.String(object.request_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.bots?.length) {
      obj.bots = message.bots.map((e) => BotDetail.toJSON(e));
    }
    if (message.result !== void 0) {
      obj.result = BotRecommendServiceResult.toJSON(message.result);
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      obj.requestId = message.requestId;
    }
    return obj;
  },
  create(base) {
    return GetDiscoverRecBotsResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetDiscoverRecBotsResponse();
    message.bots = object.bots?.map((e) => BotDetail.fromPartial(e)) || [];
    message.result = object.result !== void 0 && object.result !== null ? BotRecommendServiceResult.fromPartial(object.result) : void 0;
    message.requestId = object.requestId ?? "";
    return message;
  }
};
function createBaseGetDiscoverRecBotsAdminRequest() {
  return { category: "", userId: 0, lang: 0 };
}
const GetDiscoverRecBotsAdminRequest = {
  $type: "BotRecommendServiceProto.GetDiscoverRecBotsAdminRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.category !== void 0 && message.category !== "") {
      writer.uint32(10).string(message.category);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(16).int32(message.userId);
    }
    if (message.lang !== void 0 && message.lang !== 0) {
      writer.uint32(24).int32(message.lang);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetDiscoverRecBotsAdminRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.category = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.userId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.lang = reader.int32();
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
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      lang: isSet(object.lang) ? userLocaleFromJSON(object.lang) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.category !== void 0 && message.category !== "") {
      obj.category = message.category;
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.lang !== void 0 && message.lang !== 0) {
      obj.lang = userLocaleToJSON(message.lang);
    }
    return obj;
  },
  create(base) {
    return GetDiscoverRecBotsAdminRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetDiscoverRecBotsAdminRequest();
    message.category = object.category ?? "";
    message.userId = object.userId ?? 0;
    message.lang = object.lang ?? 0;
    return message;
  }
};
function createBaseGetDiscoverRecBotsAdminResponse() {
  return { bots: [], result: void 0, requestId: "" };
}
const GetDiscoverRecBotsAdminResponse = {
  $type: "BotRecommendServiceProto.GetDiscoverRecBotsAdminResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.bots !== void 0 && message.bots.length !== 0) {
      for (const v of message.bots) {
        BotDetail.encode(v, writer.uint32(10).fork()).join();
      }
    }
    if (message.result !== void 0) {
      BotRecommendServiceResult.encode(message.result, writer.uint32(18).fork()).join();
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      writer.uint32(26).string(message.requestId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetDiscoverRecBotsAdminResponse();
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
          message.result = BotRecommendServiceResult.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      result: isSet(object.result) ? BotRecommendServiceResult.fromJSON(object.result) : void 0,
      requestId: isSet(object.requestId) ? globalThis.String(object.requestId) : isSet(object.request_id) ? globalThis.String(object.request_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.bots?.length) {
      obj.bots = message.bots.map((e) => BotDetail.toJSON(e));
    }
    if (message.result !== void 0) {
      obj.result = BotRecommendServiceResult.toJSON(message.result);
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      obj.requestId = message.requestId;
    }
    return obj;
  },
  create(base) {
    return GetDiscoverRecBotsAdminResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetDiscoverRecBotsAdminResponse();
    message.bots = object.bots?.map((e) => BotDetail.fromPartial(e)) || [];
    message.result = object.result !== void 0 && object.result !== null ? BotRecommendServiceResult.fromPartial(object.result) : void 0;
    message.requestId = object.requestId ?? "";
    return message;
  }
};
function createBaseGetRelatedRecBotsRequest() {
  return { botId: "", category: "", botName: "", botIp: "" };
}
const GetRelatedRecBotsRequest = {
  $type: "BotRecommendServiceProto.GetRelatedRecBotsRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(10).string(message.botId);
    }
    if (message.category !== void 0 && message.category !== "") {
      writer.uint32(18).string(message.category);
    }
    if (message.botName !== void 0 && message.botName !== "") {
      writer.uint32(26).string(message.botName);
    }
    if (message.botIp !== void 0 && message.botIp !== "") {
      writer.uint32(34).string(message.botIp);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetRelatedRecBotsRequest();
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
          if (tag !== 18) {
            break;
          }
          message.category = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.botName = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.botIp = reader.string();
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
      category: isSet(object.category) ? globalThis.String(object.category) : "",
      botName: isSet(object.botName) ? globalThis.String(object.botName) : isSet(object.bot_name) ? globalThis.String(object.bot_name) : "",
      botIp: isSet(object.botIp) ? globalThis.String(object.botIp) : isSet(object.bot_ip) ? globalThis.String(object.bot_ip) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    if (message.category !== void 0 && message.category !== "") {
      obj.category = message.category;
    }
    if (message.botName !== void 0 && message.botName !== "") {
      obj.botName = message.botName;
    }
    if (message.botIp !== void 0 && message.botIp !== "") {
      obj.botIp = message.botIp;
    }
    return obj;
  },
  create(base) {
    return GetRelatedRecBotsRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetRelatedRecBotsRequest();
    message.botId = object.botId ?? "";
    message.category = object.category ?? "";
    message.botName = object.botName ?? "";
    message.botIp = object.botIp ?? "";
    return message;
  }
};
function createBaseGetRelatedRecBotsResponse() {
  return { bots: [], result: void 0, requestId: "" };
}
const GetRelatedRecBotsResponse = {
  $type: "BotRecommendServiceProto.GetRelatedRecBotsResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.bots !== void 0 && message.bots.length !== 0) {
      for (const v of message.bots) {
        BotDetail.encode(v, writer.uint32(10).fork()).join();
      }
    }
    if (message.result !== void 0) {
      BotRecommendServiceResult.encode(message.result, writer.uint32(18).fork()).join();
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      writer.uint32(26).string(message.requestId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetRelatedRecBotsResponse();
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
          message.result = BotRecommendServiceResult.decode(reader, reader.uint32());
          continue;
        }
        case 3: {
          if (tag !== 26) {
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
      result: isSet(object.result) ? BotRecommendServiceResult.fromJSON(object.result) : void 0,
      requestId: isSet(object.requestId) ? globalThis.String(object.requestId) : isSet(object.request_id) ? globalThis.String(object.request_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.bots?.length) {
      obj.bots = message.bots.map((e) => BotDetail.toJSON(e));
    }
    if (message.result !== void 0) {
      obj.result = BotRecommendServiceResult.toJSON(message.result);
    }
    if (message.requestId !== void 0 && message.requestId !== "") {
      obj.requestId = message.requestId;
    }
    return obj;
  },
  create(base) {
    return GetRelatedRecBotsResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetRelatedRecBotsResponse();
    message.bots = object.bots?.map((e) => BotDetail.fromPartial(e)) || [];
    message.result = object.result !== void 0 && object.result !== null ? BotRecommendServiceResult.fromPartial(object.result) : void 0;
    message.requestId = object.requestId ?? "";
    return message;
  }
};
function isSet(value) {
  return value !== null && value !== void 0;
}
export {
  BotRecommendServiceCommonCode,
  BotRecommendServiceResult,
  GetDiscoverRecBotsAdminRequest,
  GetDiscoverRecBotsAdminResponse,
  GetDiscoverRecBotsRequest,
  GetDiscoverRecBotsResponse,
  GetRelatedRecBotsRequest,
  GetRelatedRecBotsResponse,
  botRecommendServiceCommonCodeFromJSON,
  botRecommendServiceCommonCodeToJSON,
  protobufPackage
};
