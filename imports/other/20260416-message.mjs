const protobufPackage = "hello";
var MessageGlobalTypes = /* @__PURE__ */ ((MessageGlobalTypes2) => {
  MessageGlobalTypes2[MessageGlobalTypes2["TYPE_HEARTBEAT"] = 0] = "TYPE_HEARTBEAT";
  MessageGlobalTypes2[MessageGlobalTypes2["TYPE_AUTH"] = 1] = "TYPE_AUTH";
  MessageGlobalTypes2[MessageGlobalTypes2["TYPE_CLIENT"] = 2] = "TYPE_CLIENT";
  MessageGlobalTypes2[MessageGlobalTypes2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return MessageGlobalTypes2;
})(MessageGlobalTypes || {});
function messageGlobalTypesFromJSON(object) {
  switch (object) {
    case 0:
    case "TYPE_HEARTBEAT":
      return 0 /* TYPE_HEARTBEAT */;
    case 1:
    case "TYPE_AUTH":
      return 1 /* TYPE_AUTH */;
    case 2:
    case "TYPE_CLIENT":
      return 2 /* TYPE_CLIENT */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function messageGlobalTypesToJSON(object) {
  switch (object) {
    case 0 /* TYPE_HEARTBEAT */:
      return "TYPE_HEARTBEAT";
    case 1 /* TYPE_AUTH */:
      return "TYPE_AUTH";
    case 2 /* TYPE_CLIENT */:
      return "TYPE_CLIENT";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var ProtoGlobalIds = /* @__PURE__ */ ((ProtoGlobalIds2) => {
  ProtoGlobalIds2[ProtoGlobalIds2["AUTH_MESSAGE"] = 0] = "AUTH_MESSAGE";
  ProtoGlobalIds2[ProtoGlobalIds2["BROCASET_MESSAGE"] = 2] = "BROCASET_MESSAGE";
  ProtoGlobalIds2[ProtoGlobalIds2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return ProtoGlobalIds2;
})(ProtoGlobalIds || {});
function protoGlobalIdsFromJSON(object) {
  switch (object) {
    case 0:
    case "AUTH_MESSAGE":
      return 0 /* AUTH_MESSAGE */;
    case 2:
    case "BROCASET_MESSAGE":
      return 2 /* BROCASET_MESSAGE */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function protoGlobalIdsToJSON(object) {
  switch (object) {
    case 0 /* AUTH_MESSAGE */:
      return "AUTH_MESSAGE";
    case 2 /* BROCASET_MESSAGE */:
      return "BROCASET_MESSAGE";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
export {
  MessageGlobalTypes,
  ProtoGlobalIds,
  messageGlobalTypesFromJSON,
  messageGlobalTypesToJSON,
  protoGlobalIdsFromJSON,
  protoGlobalIdsToJSON,
  protobufPackage
};
