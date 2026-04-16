import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
const protobufPackage = "RoomServiceProto";
function createBasePingRequest() {
  return { key1: "", key2: 0 };
}
const PingRequest = {
  $type: "RoomServiceProto.PingRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.key1 !== void 0 && message.key1 !== "") {
      writer.uint32(10).string(message.key1);
    }
    if (message.key2 !== void 0 && message.key2 !== 0) {
      writer.uint32(16).int32(message.key2);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.key1 = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.key2 = reader.int32();
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
      key1: isSet(object.key1) ? globalThis.String(object.key1) : "",
      key2: isSet(object.key2) ? globalThis.Number(object.key2) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.key1 !== void 0 && message.key1 !== "") {
      obj.key1 = message.key1;
    }
    if (message.key2 !== void 0 && message.key2 !== 0) {
      obj.key2 = Math.round(message.key2);
    }
    return obj;
  },
  create(base) {
    return PingRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePingRequest();
    message.key1 = object.key1 ?? "";
    message.key2 = object.key2 ?? 0;
    return message;
  }
};
function createBasePingResponse() {
  return { key1: "", key2: 0 };
}
const PingResponse = {
  $type: "RoomServiceProto.PingResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.key1 !== void 0 && message.key1 !== "") {
      writer.uint32(10).string(message.key1);
    }
    if (message.key2 !== void 0 && message.key2 !== 0) {
      writer.uint32(16).int32(message.key2);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.key1 = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.key2 = reader.int32();
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
      key1: isSet(object.key1) ? globalThis.String(object.key1) : "",
      key2: isSet(object.key2) ? globalThis.Number(object.key2) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.key1 !== void 0 && message.key1 !== "") {
      obj.key1 = message.key1;
    }
    if (message.key2 !== void 0 && message.key2 !== 0) {
      obj.key2 = Math.round(message.key2);
    }
    return obj;
  },
  create(base) {
    return PingResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePingResponse();
    message.key1 = object.key1 ?? "";
    message.key2 = object.key2 ?? 0;
    return message;
  }
};
function createBaseTest() {
  return {};
}
const Test = {
  $type: "RoomServiceProto.Test",
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseTest();
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
    return Test.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseTest();
    return message;
  }
};
function isSet(value) {
  return value !== null && value !== void 0;
}
export {
  PingRequest,
  PingResponse,
  Test,
  protobufPackage
};
