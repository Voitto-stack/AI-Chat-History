import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
const protobufPackage = "AgoraCallbackServiceProto";
var FCDNSEventType = /* @__PURE__ */ ((FCDNSEventType2) => {
  FCDNSEventType2[FCDNSEventType2["FCDNSEventTypeNone"] = 0] = "FCDNSEventTypeNone";
  FCDNSEventType2[FCDNSEventType2["PublishStart"] = 1] = "PublishStart";
  FCDNSEventType2[FCDNSEventType2["PublishEnd"] = 2] = "PublishEnd";
  FCDNSEventType2[FCDNSEventType2["NewStandardSnapshotFile"] = 102] = "NewStandardSnapshotFile";
  FCDNSEventType2[FCDNSEventType2["NewStandardRecordFile"] = 101] = "NewStandardRecordFile";
  FCDNSEventType2[FCDNSEventType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return FCDNSEventType2;
})(FCDNSEventType || {});
function fCDNSEventTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "FCDNSEventTypeNone":
      return 0 /* FCDNSEventTypeNone */;
    case 1:
    case "PublishStart":
      return 1 /* PublishStart */;
    case 2:
    case "PublishEnd":
      return 2 /* PublishEnd */;
    case 102:
    case "NewStandardSnapshotFile":
      return 102 /* NewStandardSnapshotFile */;
    case 101:
    case "NewStandardRecordFile":
      return 101 /* NewStandardRecordFile */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function fCDNSEventTypeToJSON(object) {
  switch (object) {
    case 0 /* FCDNSEventTypeNone */:
      return "FCDNSEventTypeNone";
    case 1 /* PublishStart */:
      return "PublishStart";
    case 2 /* PublishEnd */:
      return "PublishEnd";
    case 102 /* NewStandardSnapshotFile */:
      return "NewStandardSnapshotFile";
    case 101 /* NewStandardRecordFile */:
      return "NewStandardRecordFile";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var ILSEventType = /* @__PURE__ */ ((ILSEventType2) => {
  ILSEventType2[ILSEventType2["ILSEventTypeNone"] = 0] = "ILSEventTypeNone";
  ILSEventType2[ILSEventType2["BroadcasterLeaveChannel"] = 104] = "BroadcasterLeaveChannel";
  ILSEventType2[ILSEventType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return ILSEventType2;
})(ILSEventType || {});
function iLSEventTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "ILSEventTypeNone":
      return 0 /* ILSEventTypeNone */;
    case 104:
    case "BroadcasterLeaveChannel":
      return 104 /* BroadcasterLeaveChannel */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function iLSEventTypeToJSON(object) {
  switch (object) {
    case 0 /* ILSEventTypeNone */:
      return "ILSEventTypeNone";
    case 104 /* BroadcasterLeaveChannel */:
      return "BroadcasterLeaveChannel";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var ProductType = /* @__PURE__ */ ((ProductType2) => {
  ProductType2[ProductType2["ProductTypeNone"] = 0] = "ProductTypeNone";
  ProductType2[ProductType2["InteractiveLiveStreaming"] = 1] = "InteractiveLiveStreaming";
  ProductType2[ProductType2["FusionCDNStreaming"] = 7] = "FusionCDNStreaming";
  ProductType2[ProductType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return ProductType2;
})(ProductType || {});
function productTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "ProductTypeNone":
      return 0 /* ProductTypeNone */;
    case 1:
    case "InteractiveLiveStreaming":
      return 1 /* InteractiveLiveStreaming */;
    case 7:
    case "FusionCDNStreaming":
      return 7 /* FusionCDNStreaming */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function productTypeToJSON(object) {
  switch (object) {
    case 0 /* ProductTypeNone */:
      return "ProductTypeNone";
    case 1 /* InteractiveLiveStreaming */:
      return "InteractiveLiveStreaming";
    case 7 /* FusionCDNStreaming */:
      return "FusionCDNStreaming";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseStreamInfo() {
  return { env: "", encounterId: "" };
}
const StreamInfo = {
  $type: "AgoraCallbackServiceProto.StreamInfo",
  encode(message, writer = new BinaryWriter()) {
    if (message.env !== void 0 && message.env !== "") {
      writer.uint32(10).string(message.env);
    }
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      writer.uint32(18).string(message.encounterId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStreamInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.env = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
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
    return {
      env: isSet(object.env) ? globalThis.String(object.env) : "",
      encounterId: isSet(object.encounterId) ? globalThis.String(object.encounterId) : isSet(object.encounter_id) ? globalThis.String(object.encounter_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.env !== void 0 && message.env !== "") {
      obj.env = message.env;
    }
    if (message.encounterId !== void 0 && message.encounterId !== "") {
      obj.encounterId = message.encounterId;
    }
    return obj;
  },
  create(base) {
    return StreamInfo.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseStreamInfo();
    message.env = object.env ?? "";
    message.encounterId = object.encounterId ?? "";
    return message;
  }
};
function isSet(value) {
  return value !== null && value !== void 0;
}
export {
  FCDNSEventType,
  ILSEventType,
  ProductType,
  StreamInfo,
  fCDNSEventTypeFromJSON,
  fCDNSEventTypeToJSON,
  iLSEventTypeFromJSON,
  iLSEventTypeToJSON,
  productTypeFromJSON,
  productTypeToJSON,
  protobufPackage
};
