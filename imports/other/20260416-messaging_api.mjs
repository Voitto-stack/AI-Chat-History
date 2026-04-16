import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
const protobufPackage = "MessagingServiceProto";
var NotificationMessageDesc = /* @__PURE__ */ ((NotificationMessageDesc2) => {
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_UNSPECIFIED"] = 0] = "NOTIFICATION_UNSPECIFIED";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_ADMIN_MOVE_TO_K_SERVER"] = 1] = "NOTIFICATION_ADMIN_MOVE_TO_K_SERVER";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_ADMIN_MOVE_TO_NORMAL_SERVER"] = 2] = "NOTIFICATION_ADMIN_MOVE_TO_NORMAL_SERVER";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_ADMIN_MOVE_TO_BANNED"] = 3] = "NOTIFICATION_ADMIN_MOVE_TO_BANNED";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_USER_INVITE_TO_ROOM"] = 4] = "NOTIFICATION_USER_INVITE_TO_ROOM";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_USER_FOLLOW_YOU"] = 5] = "NOTIFICATION_USER_FOLLOW_YOU";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_USER_UNFOLLOW_YOU"] = 6] = "NOTIFICATION_USER_UNFOLLOW_YOU";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_USER_BLOCK_YOU"] = 7] = "NOTIFICATION_USER_BLOCK_YOU";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_USER_UNBLOCK_YOU"] = 8] = "NOTIFICATION_USER_UNBLOCK_YOU";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_USER_LIKE_YOUR_POST"] = 9] = "NOTIFICATION_USER_LIKE_YOUR_POST";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_USER_COMMENT_YOUR_POST"] = 10] = "NOTIFICATION_USER_COMMENT_YOUR_POST";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_USER_COMMENT_YOUR_COMMENT"] = 11] = "NOTIFICATION_USER_COMMENT_YOUR_COMMENT";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_USER_REPLY_OTHER_COMMENT"] = 12] = "NOTIFICATION_USER_REPLY_OTHER_COMMENT";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_USER_SUCCESSFUL_INVITATION"] = 13] = "NOTIFICATION_USER_SUCCESSFUL_INVITATION";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_AI_AVATAR_GENERATED"] = 14] = "NOTIFICATION_AI_AVATAR_GENERATED";
  NotificationMessageDesc2[NotificationMessageDesc2["NOTIFICATION_AI_AVATAR_AUTO_REPLACED"] = 15] = "NOTIFICATION_AI_AVATAR_AUTO_REPLACED";
  NotificationMessageDesc2[NotificationMessageDesc2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return NotificationMessageDesc2;
})(NotificationMessageDesc || {});
function notificationMessageDescFromJSON(object) {
  switch (object) {
    case 0:
    case "NOTIFICATION_UNSPECIFIED":
      return 0 /* NOTIFICATION_UNSPECIFIED */;
    case 1:
    case "NOTIFICATION_ADMIN_MOVE_TO_K_SERVER":
      return 1 /* NOTIFICATION_ADMIN_MOVE_TO_K_SERVER */;
    case 2:
    case "NOTIFICATION_ADMIN_MOVE_TO_NORMAL_SERVER":
      return 2 /* NOTIFICATION_ADMIN_MOVE_TO_NORMAL_SERVER */;
    case 3:
    case "NOTIFICATION_ADMIN_MOVE_TO_BANNED":
      return 3 /* NOTIFICATION_ADMIN_MOVE_TO_BANNED */;
    case 4:
    case "NOTIFICATION_USER_INVITE_TO_ROOM":
      return 4 /* NOTIFICATION_USER_INVITE_TO_ROOM */;
    case 5:
    case "NOTIFICATION_USER_FOLLOW_YOU":
      return 5 /* NOTIFICATION_USER_FOLLOW_YOU */;
    case 6:
    case "NOTIFICATION_USER_UNFOLLOW_YOU":
      return 6 /* NOTIFICATION_USER_UNFOLLOW_YOU */;
    case 7:
    case "NOTIFICATION_USER_BLOCK_YOU":
      return 7 /* NOTIFICATION_USER_BLOCK_YOU */;
    case 8:
    case "NOTIFICATION_USER_UNBLOCK_YOU":
      return 8 /* NOTIFICATION_USER_UNBLOCK_YOU */;
    case 9:
    case "NOTIFICATION_USER_LIKE_YOUR_POST":
      return 9 /* NOTIFICATION_USER_LIKE_YOUR_POST */;
    case 10:
    case "NOTIFICATION_USER_COMMENT_YOUR_POST":
      return 10 /* NOTIFICATION_USER_COMMENT_YOUR_POST */;
    case 11:
    case "NOTIFICATION_USER_COMMENT_YOUR_COMMENT":
      return 11 /* NOTIFICATION_USER_COMMENT_YOUR_COMMENT */;
    case 12:
    case "NOTIFICATION_USER_REPLY_OTHER_COMMENT":
      return 12 /* NOTIFICATION_USER_REPLY_OTHER_COMMENT */;
    case 13:
    case "NOTIFICATION_USER_SUCCESSFUL_INVITATION":
      return 13 /* NOTIFICATION_USER_SUCCESSFUL_INVITATION */;
    case 14:
    case "NOTIFICATION_AI_AVATAR_GENERATED":
      return 14 /* NOTIFICATION_AI_AVATAR_GENERATED */;
    case 15:
    case "NOTIFICATION_AI_AVATAR_AUTO_REPLACED":
      return 15 /* NOTIFICATION_AI_AVATAR_AUTO_REPLACED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function notificationMessageDescToJSON(object) {
  switch (object) {
    case 0 /* NOTIFICATION_UNSPECIFIED */:
      return "NOTIFICATION_UNSPECIFIED";
    case 1 /* NOTIFICATION_ADMIN_MOVE_TO_K_SERVER */:
      return "NOTIFICATION_ADMIN_MOVE_TO_K_SERVER";
    case 2 /* NOTIFICATION_ADMIN_MOVE_TO_NORMAL_SERVER */:
      return "NOTIFICATION_ADMIN_MOVE_TO_NORMAL_SERVER";
    case 3 /* NOTIFICATION_ADMIN_MOVE_TO_BANNED */:
      return "NOTIFICATION_ADMIN_MOVE_TO_BANNED";
    case 4 /* NOTIFICATION_USER_INVITE_TO_ROOM */:
      return "NOTIFICATION_USER_INVITE_TO_ROOM";
    case 5 /* NOTIFICATION_USER_FOLLOW_YOU */:
      return "NOTIFICATION_USER_FOLLOW_YOU";
    case 6 /* NOTIFICATION_USER_UNFOLLOW_YOU */:
      return "NOTIFICATION_USER_UNFOLLOW_YOU";
    case 7 /* NOTIFICATION_USER_BLOCK_YOU */:
      return "NOTIFICATION_USER_BLOCK_YOU";
    case 8 /* NOTIFICATION_USER_UNBLOCK_YOU */:
      return "NOTIFICATION_USER_UNBLOCK_YOU";
    case 9 /* NOTIFICATION_USER_LIKE_YOUR_POST */:
      return "NOTIFICATION_USER_LIKE_YOUR_POST";
    case 10 /* NOTIFICATION_USER_COMMENT_YOUR_POST */:
      return "NOTIFICATION_USER_COMMENT_YOUR_POST";
    case 11 /* NOTIFICATION_USER_COMMENT_YOUR_COMMENT */:
      return "NOTIFICATION_USER_COMMENT_YOUR_COMMENT";
    case 12 /* NOTIFICATION_USER_REPLY_OTHER_COMMENT */:
      return "NOTIFICATION_USER_REPLY_OTHER_COMMENT";
    case 13 /* NOTIFICATION_USER_SUCCESSFUL_INVITATION */:
      return "NOTIFICATION_USER_SUCCESSFUL_INVITATION";
    case 14 /* NOTIFICATION_AI_AVATAR_GENERATED */:
      return "NOTIFICATION_AI_AVATAR_GENERATED";
    case 15 /* NOTIFICATION_AI_AVATAR_AUTO_REPLACED */:
      return "NOTIFICATION_AI_AVATAR_AUTO_REPLACED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var MessageServiceCommonCode = /* @__PURE__ */ ((MessageServiceCommonCode2) => {
  MessageServiceCommonCode2[MessageServiceCommonCode2["MESSAEG_UNKNOWN"] = 0] = "MESSAEG_UNKNOWN";
  MessageServiceCommonCode2[MessageServiceCommonCode2["MESSAGE_SUCCESS"] = 1] = "MESSAGE_SUCCESS";
  MessageServiceCommonCode2[MessageServiceCommonCode2["MESSAGE_FAILED"] = 99] = "MESSAGE_FAILED";
  MessageServiceCommonCode2[MessageServiceCommonCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return MessageServiceCommonCode2;
})(MessageServiceCommonCode || {});
function messageServiceCommonCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "MESSAEG_UNKNOWN":
      return 0 /* MESSAEG_UNKNOWN */;
    case 1:
    case "MESSAGE_SUCCESS":
      return 1 /* MESSAGE_SUCCESS */;
    case 99:
    case "MESSAGE_FAILED":
      return 99 /* MESSAGE_FAILED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function messageServiceCommonCodeToJSON(object) {
  switch (object) {
    case 0 /* MESSAEG_UNKNOWN */:
      return "MESSAEG_UNKNOWN";
    case 1 /* MESSAGE_SUCCESS */:
      return "MESSAGE_SUCCESS";
    case 99 /* MESSAGE_FAILED */:
      return "MESSAGE_FAILED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var FcmPushType = /* @__PURE__ */ ((FcmPushType2) => {
  FcmPushType2[FcmPushType2["FCM_TYPE_UNKNOWN"] = 0] = "FCM_TYPE_UNKNOWN";
  FcmPushType2[FcmPushType2["FCM_TYPE_USER_MATCH"] = 1] = "FCM_TYPE_USER_MATCH";
  FcmPushType2[FcmPushType2["FCM_TYPE_LIKE_ME"] = 2] = "FCM_TYPE_LIKE_ME";
  FcmPushType2[FcmPushType2["FCM_TYPE_OFFLINE_HOUR_MESSAGE"] = 3] = "FCM_TYPE_OFFLINE_HOUR_MESSAGE";
  FcmPushType2[FcmPushType2["FCM_TYPE_WITHDRAWAL_COMPLETE"] = 4] = "FCM_TYPE_WITHDRAWAL_COMPLETE";
  FcmPushType2[FcmPushType2["FCM_TYPE_DEMO_SCRIPT"] = 5] = "FCM_TYPE_DEMO_SCRIPT";
  FcmPushType2[FcmPushType2["FCM_TYPE_USER_NEW_MATCH"] = 6] = "FCM_TYPE_USER_NEW_MATCH";
  FcmPushType2[FcmPushType2["FCM_TYPE_POST_COMMON"] = 7] = "FCM_TYPE_POST_COMMON";
  FcmPushType2[FcmPushType2["FCM_TYPE_POST_LIKE"] = 8] = "FCM_TYPE_POST_LIKE";
  FcmPushType2[FcmPushType2["FCM_TYPE_PAYMENT"] = 9] = "FCM_TYPE_PAYMENT";
  FcmPushType2[FcmPushType2["FCM_TYPE_PAYMENT_FAIL"] = 10] = "FCM_TYPE_PAYMENT_FAIL";
  FcmPushType2[FcmPushType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return FcmPushType2;
})(FcmPushType || {});
function fcmPushTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "FCM_TYPE_UNKNOWN":
      return 0 /* FCM_TYPE_UNKNOWN */;
    case 1:
    case "FCM_TYPE_USER_MATCH":
      return 1 /* FCM_TYPE_USER_MATCH */;
    case 2:
    case "FCM_TYPE_LIKE_ME":
      return 2 /* FCM_TYPE_LIKE_ME */;
    case 3:
    case "FCM_TYPE_OFFLINE_HOUR_MESSAGE":
      return 3 /* FCM_TYPE_OFFLINE_HOUR_MESSAGE */;
    case 4:
    case "FCM_TYPE_WITHDRAWAL_COMPLETE":
      return 4 /* FCM_TYPE_WITHDRAWAL_COMPLETE */;
    case 5:
    case "FCM_TYPE_DEMO_SCRIPT":
      return 5 /* FCM_TYPE_DEMO_SCRIPT */;
    case 6:
    case "FCM_TYPE_USER_NEW_MATCH":
      return 6 /* FCM_TYPE_USER_NEW_MATCH */;
    case 7:
    case "FCM_TYPE_POST_COMMON":
      return 7 /* FCM_TYPE_POST_COMMON */;
    case 8:
    case "FCM_TYPE_POST_LIKE":
      return 8 /* FCM_TYPE_POST_LIKE */;
    case 9:
    case "FCM_TYPE_PAYMENT":
      return 9 /* FCM_TYPE_PAYMENT */;
    case 10:
    case "FCM_TYPE_PAYMENT_FAIL":
      return 10 /* FCM_TYPE_PAYMENT_FAIL */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function fcmPushTypeToJSON(object) {
  switch (object) {
    case 0 /* FCM_TYPE_UNKNOWN */:
      return "FCM_TYPE_UNKNOWN";
    case 1 /* FCM_TYPE_USER_MATCH */:
      return "FCM_TYPE_USER_MATCH";
    case 2 /* FCM_TYPE_LIKE_ME */:
      return "FCM_TYPE_LIKE_ME";
    case 3 /* FCM_TYPE_OFFLINE_HOUR_MESSAGE */:
      return "FCM_TYPE_OFFLINE_HOUR_MESSAGE";
    case 4 /* FCM_TYPE_WITHDRAWAL_COMPLETE */:
      return "FCM_TYPE_WITHDRAWAL_COMPLETE";
    case 5 /* FCM_TYPE_DEMO_SCRIPT */:
      return "FCM_TYPE_DEMO_SCRIPT";
    case 6 /* FCM_TYPE_USER_NEW_MATCH */:
      return "FCM_TYPE_USER_NEW_MATCH";
    case 7 /* FCM_TYPE_POST_COMMON */:
      return "FCM_TYPE_POST_COMMON";
    case 8 /* FCM_TYPE_POST_LIKE */:
      return "FCM_TYPE_POST_LIKE";
    case 9 /* FCM_TYPE_PAYMENT */:
      return "FCM_TYPE_PAYMENT";
    case 10 /* FCM_TYPE_PAYMENT_FAIL */:
      return "FCM_TYPE_PAYMENT_FAIL";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var UserFlag = /* @__PURE__ */ ((UserFlag2) => {
  UserFlag2[UserFlag2["USER_FLAG_UNKNOWN"] = 0] = "USER_FLAG_UNKNOWN";
  UserFlag2[UserFlag2["USER_FLAG_PHONE_VERIFIED"] = 1] = "USER_FLAG_PHONE_VERIFIED";
  UserFlag2[UserFlag2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return UserFlag2;
})(UserFlag || {});
function userFlagFromJSON(object) {
  switch (object) {
    case 0:
    case "USER_FLAG_UNKNOWN":
      return 0 /* USER_FLAG_UNKNOWN */;
    case 1:
    case "USER_FLAG_PHONE_VERIFIED":
      return 1 /* USER_FLAG_PHONE_VERIFIED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function userFlagToJSON(object) {
  switch (object) {
    case 0 /* USER_FLAG_UNKNOWN */:
      return "USER_FLAG_UNKNOWN";
    case 1 /* USER_FLAG_PHONE_VERIFIED */:
      return "USER_FLAG_PHONE_VERIFIED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBaseSendNotificationMessageRequest() {
  return { toUserId: "", messageDesc: 0, messageData: "", msgLifeTime: 0 };
}
const SendNotificationMessageRequest = {
  $type: "MessagingServiceProto.SendNotificationMessageRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.toUserId !== void 0 && message.toUserId !== "") {
      writer.uint32(10).string(message.toUserId);
    }
    if (message.messageDesc !== void 0 && message.messageDesc !== 0) {
      writer.uint32(16).int32(message.messageDesc);
    }
    if (message.messageData !== void 0 && message.messageData !== "") {
      writer.uint32(26).string(message.messageData);
    }
    if (message.msgLifeTime !== void 0 && message.msgLifeTime !== 0) {
      writer.uint32(32).int32(message.msgLifeTime);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSendNotificationMessageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.toUserId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.messageDesc = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.messageData = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.msgLifeTime = reader.int32();
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
      toUserId: isSet(object.toUserId) ? globalThis.String(object.toUserId) : isSet(object.to_user_id) ? globalThis.String(object.to_user_id) : "",
      messageDesc: isSet(object.messageDesc) ? notificationMessageDescFromJSON(object.messageDesc) : isSet(object.message_desc) ? notificationMessageDescFromJSON(object.message_desc) : 0,
      messageData: isSet(object.messageData) ? globalThis.String(object.messageData) : isSet(object.message_data) ? globalThis.String(object.message_data) : "",
      msgLifeTime: isSet(object.msgLifeTime) ? globalThis.Number(object.msgLifeTime) : isSet(object.msg_life_time) ? globalThis.Number(object.msg_life_time) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.toUserId !== void 0 && message.toUserId !== "") {
      obj.toUserId = message.toUserId;
    }
    if (message.messageDesc !== void 0 && message.messageDesc !== 0) {
      obj.messageDesc = notificationMessageDescToJSON(message.messageDesc);
    }
    if (message.messageData !== void 0 && message.messageData !== "") {
      obj.messageData = message.messageData;
    }
    if (message.msgLifeTime !== void 0 && message.msgLifeTime !== 0) {
      obj.msgLifeTime = Math.round(message.msgLifeTime);
    }
    return obj;
  },
  create(base) {
    return SendNotificationMessageRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseSendNotificationMessageRequest();
    message.toUserId = object.toUserId ?? "";
    message.messageDesc = object.messageDesc ?? 0;
    message.messageData = object.messageData ?? "";
    message.msgLifeTime = object.msgLifeTime ?? 0;
    return message;
  }
};
function createBaseSendNotificationMessageResponse() {
  return { isSuccessful: false };
}
const SendNotificationMessageResponse = {
  $type: "MessagingServiceProto.SendNotificationMessageResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.isSuccessful !== void 0 && message.isSuccessful !== false) {
      writer.uint32(8).bool(message.isSuccessful);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseSendNotificationMessageResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.isSuccessful = reader.bool();
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
      isSuccessful: isSet(object.isSuccessful) ? globalThis.Boolean(object.isSuccessful) : isSet(object.is_successful) ? globalThis.Boolean(object.is_successful) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.isSuccessful !== void 0 && message.isSuccessful !== false) {
      obj.isSuccessful = message.isSuccessful;
    }
    return obj;
  },
  create(base) {
    return SendNotificationMessageResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseSendNotificationMessageResponse();
    message.isSuccessful = object.isSuccessful ?? false;
    return message;
  }
};
function createBaseUploadNormalImageRequest() {
  return { file: new Uint8Array(0), fileType: "" };
}
const UploadNormalImageRequest = {
  $type: "MessagingServiceProto.UploadNormalImageRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.file !== void 0 && message.file.length !== 0) {
      writer.uint32(10).bytes(message.file);
    }
    if (message.fileType !== void 0 && message.fileType !== "") {
      writer.uint32(18).string(message.fileType);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUploadNormalImageRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.file = reader.bytes();
          continue;
        }
        case 2: {
          if (tag !== 18) {
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
      file: isSet(object.file) ? bytesFromBase64(object.file) : new Uint8Array(0),
      fileType: isSet(object.fileType) ? globalThis.String(object.fileType) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.file !== void 0 && message.file.length !== 0) {
      obj.file = base64FromBytes(message.file);
    }
    if (message.fileType !== void 0 && message.fileType !== "") {
      obj.fileType = message.fileType;
    }
    return obj;
  },
  create(base) {
    return UploadNormalImageRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUploadNormalImageRequest();
    message.file = object.file ?? new Uint8Array(0);
    message.fileType = object.fileType ?? "";
    return message;
  }
};
function createBaseUploadNormalImageResponse() {
  return { code: 0, imageUrl: "" };
}
const UploadNormalImageResponse = {
  $type: "MessagingServiceProto.UploadNormalImageResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.imageUrl !== void 0 && message.imageUrl !== "") {
      writer.uint32(18).string(message.imageUrl);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUploadNormalImageResponse();
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
          message.imageUrl = reader.string();
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
      code: isSet(object.code) ? messageServiceCommonCodeFromJSON(object.code) : 0,
      imageUrl: isSet(object.imageUrl) ? globalThis.String(object.imageUrl) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = messageServiceCommonCodeToJSON(message.code);
    }
    if (message.imageUrl !== void 0 && message.imageUrl !== "") {
      obj.imageUrl = message.imageUrl;
    }
    return obj;
  },
  create(base) {
    return UploadNormalImageResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUploadNormalImageResponse();
    message.code = object.code ?? 0;
    message.imageUrl = object.imageUrl ?? "";
    return message;
  }
};
function createBaseVerifyUserFlagRequest() {
  return { userId: 0, flag: 0, extraInfo: "" };
}
const VerifyUserFlagRequest = {
  $type: "MessagingServiceProto.VerifyUserFlagRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.flag !== void 0 && message.flag !== 0) {
      writer.uint32(16).int32(message.flag);
    }
    if (message.extraInfo !== void 0 && message.extraInfo !== "") {
      writer.uint32(26).string(message.extraInfo);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseVerifyUserFlagRequest();
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
          message.flag = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.extraInfo = reader.string();
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
      flag: isSet(object.flag) ? userFlagFromJSON(object.flag) : 0,
      extraInfo: isSet(object.extraInfo) ? globalThis.String(object.extraInfo) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.flag !== void 0 && message.flag !== 0) {
      obj.flag = userFlagToJSON(message.flag);
    }
    if (message.extraInfo !== void 0 && message.extraInfo !== "") {
      obj.extraInfo = message.extraInfo;
    }
    return obj;
  },
  create(base) {
    return VerifyUserFlagRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseVerifyUserFlagRequest();
    message.userId = object.userId ?? 0;
    message.flag = object.flag ?? 0;
    message.extraInfo = object.extraInfo ?? "";
    return message;
  }
};
function createBaseVerifyUserFlagResponse() {
  return { code: 0, message: "" };
}
const VerifyUserFlagResponse = {
  $type: "MessagingServiceProto.VerifyUserFlagResponse",
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
    const message = createBaseVerifyUserFlagResponse();
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
      code: isSet(object.code) ? messageServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = messageServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return VerifyUserFlagResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseVerifyUserFlagResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetUserFlagRequest() {
  return { flag: 0 };
}
const GetUserFlagRequest = {
  $type: "MessagingServiceProto.GetUserFlagRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.flag !== void 0 && message.flag !== 0) {
      writer.uint32(8).int32(message.flag);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetUserFlagRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.flag = reader.int32();
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
    return { flag: isSet(object.flag) ? userFlagFromJSON(object.flag) : 0 };
  },
  toJSON(message) {
    const obj = {};
    if (message.flag !== void 0 && message.flag !== 0) {
      obj.flag = userFlagToJSON(message.flag);
    }
    return obj;
  },
  create(base) {
    return GetUserFlagRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetUserFlagRequest();
    message.flag = object.flag ?? 0;
    return message;
  }
};
function createBaseGetUserFlagResponse() {
  return { code: 0, isVerified: false };
}
const GetUserFlagResponse = {
  $type: "MessagingServiceProto.GetUserFlagResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.isVerified !== void 0 && message.isVerified !== false) {
      writer.uint32(16).bool(message.isVerified);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetUserFlagResponse();
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
          if (tag !== 16) {
            break;
          }
          message.isVerified = reader.bool();
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
      code: isSet(object.code) ? messageServiceCommonCodeFromJSON(object.code) : 0,
      isVerified: isSet(object.isVerified) ? globalThis.Boolean(object.isVerified) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = messageServiceCommonCodeToJSON(message.code);
    }
    if (message.isVerified !== void 0 && message.isVerified !== false) {
      obj.isVerified = message.isVerified;
    }
    return obj;
  },
  create(base) {
    return GetUserFlagResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetUserFlagResponse();
    message.code = object.code ?? 0;
    message.isVerified = object.isVerified ?? false;
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
function isSet(value) {
  return value !== null && value !== void 0;
}
export {
  FcmPushType,
  GetUserFlagRequest,
  GetUserFlagResponse,
  MessageServiceCommonCode,
  NotificationMessageDesc,
  SendNotificationMessageRequest,
  SendNotificationMessageResponse,
  UploadNormalImageRequest,
  UploadNormalImageResponse,
  UserFlag,
  VerifyUserFlagRequest,
  VerifyUserFlagResponse,
  fcmPushTypeFromJSON,
  fcmPushTypeToJSON,
  messageServiceCommonCodeFromJSON,
  messageServiceCommonCodeToJSON,
  notificationMessageDescFromJSON,
  notificationMessageDescToJSON,
  protobufPackage,
  userFlagFromJSON,
  userFlagToJSON
};
