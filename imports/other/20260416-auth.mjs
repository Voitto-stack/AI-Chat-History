import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
const protobufPackage = "Auth";
var AuthErrorCode = /* @__PURE__ */ ((AuthErrorCode2) => {
  AuthErrorCode2[AuthErrorCode2["AUTH_SUCCESS"] = 0] = "AUTH_SUCCESS";
  AuthErrorCode2[AuthErrorCode2["AUTH_FAILED"] = 1] = "AUTH_FAILED";
  AuthErrorCode2[AuthErrorCode2["AUTH_FAILED_NO_USER"] = 2] = "AUTH_FAILED_NO_USER";
  AuthErrorCode2[AuthErrorCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return AuthErrorCode2;
})(AuthErrorCode || {});
function authErrorCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "AUTH_SUCCESS":
      return 0 /* AUTH_SUCCESS */;
    case 1:
    case "AUTH_FAILED":
      return 1 /* AUTH_FAILED */;
    case 2:
    case "AUTH_FAILED_NO_USER":
      return 2 /* AUTH_FAILED_NO_USER */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function authErrorCodeToJSON(object) {
  switch (object) {
    case 0 /* AUTH_SUCCESS */:
      return "AUTH_SUCCESS";
    case 1 /* AUTH_FAILED */:
      return "AUTH_FAILED";
    case 2 /* AUTH_FAILED_NO_USER */:
      return "AUTH_FAILED_NO_USER";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseC2SAuth() {
  return { playerId: 0, token: "" };
}
const C2SAuth = {
  $type: "Auth.C2SAuth",
  encode(message, writer = new BinaryWriter()) {
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(8).int32(message.playerId);
    }
    if (message.token !== void 0 && message.token !== "") {
      writer.uint32(18).string(message.token);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseC2SAuth();
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
          message.token = reader.string();
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
      token: isSet(object.token) ? globalThis.String(object.token) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.playerId !== void 0 && message.playerId !== 0) {
      obj.playerId = Math.round(message.playerId);
    }
    if (message.token !== void 0 && message.token !== "") {
      obj.token = message.token;
    }
    return obj;
  },
  create(base) {
    return C2SAuth.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseC2SAuth();
    message.playerId = object.playerId ?? 0;
    message.token = object.token ?? "";
    return message;
  }
};
function createBaseS2CAuth() {
  return { result: 0, playerId: 0, token: "" };
}
const S2CAuth = {
  $type: "Auth.S2CAuth",
  encode(message, writer = new BinaryWriter()) {
    if (message.result !== void 0 && message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    if (message.playerId !== void 0 && message.playerId !== 0) {
      writer.uint32(16).int32(message.playerId);
    }
    if (message.token !== void 0 && message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseS2CAuth();
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
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.token = reader.string();
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
      playerId: isSet(object.playerId) ? globalThis.Number(object.playerId) : 0,
      token: isSet(object.token) ? globalThis.String(object.token) : ""
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
    if (message.token !== void 0 && message.token !== "") {
      obj.token = message.token;
    }
    return obj;
  },
  create(base) {
    return S2CAuth.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseS2CAuth();
    message.result = object.result ?? 0;
    message.playerId = object.playerId ?? 0;
    message.token = object.token ?? "";
    return message;
  }
};
function isSet(value) {
  return value !== null && value !== void 0;
}
export {
  AuthErrorCode,
  C2SAuth,
  S2CAuth,
  authErrorCodeFromJSON,
  authErrorCodeToJSON,
  protobufPackage
};
