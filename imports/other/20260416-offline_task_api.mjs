import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
const protobufPackage = "";
function createBaseAdminFaceScoreGenerateRequest() {
  return { appName: 0, caiUserType: 0, gender: 0, userIds: [] };
}
const AdminFaceScoreGenerateRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.appName !== void 0 && message.appName !== 0) {
      writer.uint32(8).int32(message.appName);
    }
    if (message.caiUserType !== void 0 && message.caiUserType !== 0) {
      writer.uint32(16).int32(message.caiUserType);
    }
    if (message.gender !== void 0 && message.gender !== 0) {
      writer.uint32(24).int32(message.gender);
    }
    if (message.userIds !== void 0 && message.userIds.length !== 0) {
      writer.uint32(34).fork();
      for (const v of message.userIds) {
        writer.int32(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminFaceScoreGenerateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.appName = reader.int32();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.caiUserType = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.gender = reader.int32();
          continue;
        }
        case 4: {
          if (tag === 32) {
            message.userIds.push(reader.int32());
            continue;
          }
          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.userIds.push(reader.int32());
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
      appName: isSet(object.appName) ? globalThis.Number(object.appName) : isSet(object.app_name) ? globalThis.Number(object.app_name) : 0,
      caiUserType: isSet(object.caiUserType) ? globalThis.Number(object.caiUserType) : isSet(object.cai_user_type) ? globalThis.Number(object.cai_user_type) : 0,
      gender: isSet(object.gender) ? globalThis.Number(object.gender) : 0,
      userIds: globalThis.Array.isArray(object?.userIds) ? object.userIds.map((e) => globalThis.Number(e)) : globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.appName !== void 0 && message.appName !== 0) {
      obj.appName = Math.round(message.appName);
    }
    if (message.caiUserType !== void 0 && message.caiUserType !== 0) {
      obj.caiUserType = Math.round(message.caiUserType);
    }
    if (message.gender !== void 0 && message.gender !== 0) {
      obj.gender = Math.round(message.gender);
    }
    if (message.userIds?.length) {
      obj.userIds = message.userIds.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return AdminFaceScoreGenerateRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminFaceScoreGenerateRequest();
    message.appName = object.appName ?? 0;
    message.caiUserType = object.caiUserType ?? 0;
    message.gender = object.gender ?? 0;
    message.userIds = object.userIds?.map((e) => e) || [];
    return message;
  }
};
function createBaseAdminFaceScoreGenerateResponse() {
  return { success: false, errorMessage: "" };
}
const AdminFaceScoreGenerateResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.success !== void 0 && message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminFaceScoreGenerateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.errorMessage = reader.string();
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
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.success !== void 0 && message.success !== false) {
      obj.success = message.success;
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    return obj;
  },
  create(base) {
    return AdminFaceScoreGenerateResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminFaceScoreGenerateResponse();
    message.success = object.success ?? false;
    message.errorMessage = object.errorMessage ?? "";
    return message;
  }
};
function createBaseAdminGenerateUserSlideQueueRequest() {
  return { refresh: false };
}
const AdminGenerateUserSlideQueueRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.refresh !== void 0 && message.refresh !== false) {
      writer.uint32(8).bool(message.refresh);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGenerateUserSlideQueueRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.refresh = reader.bool();
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
    return { refresh: isSet(object.refresh) ? globalThis.Boolean(object.refresh) : false };
  },
  toJSON(message) {
    const obj = {};
    if (message.refresh !== void 0 && message.refresh !== false) {
      obj.refresh = message.refresh;
    }
    return obj;
  },
  create(base) {
    return AdminGenerateUserSlideQueueRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminGenerateUserSlideQueueRequest();
    message.refresh = object.refresh ?? false;
    return message;
  }
};
function createBaseAdminGenerateUserSlideQueueResponse() {
  return { success: false, errorMessage: "" };
}
const AdminGenerateUserSlideQueueResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.success !== void 0 && message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGenerateUserSlideQueueResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.errorMessage = reader.string();
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
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.success !== void 0 && message.success !== false) {
      obj.success = message.success;
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    return obj;
  },
  create(base) {
    return AdminGenerateUserSlideQueueResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminGenerateUserSlideQueueResponse();
    message.success = object.success ?? false;
    message.errorMessage = object.errorMessage ?? "";
    return message;
  }
};
function createBaseAdminSyncUserProfileToTimRequest() {
  return { userIds: [] };
}
const AdminSyncUserProfileToTimRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.userIds !== void 0 && message.userIds.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.userIds) {
        writer.int32(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminSyncUserProfileToTimRequest();
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
      userIds: globalThis.Array.isArray(object?.userIds) ? object.userIds.map((e) => globalThis.Number(e)) : globalThis.Array.isArray(object?.user_ids) ? object.user_ids.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userIds?.length) {
      obj.userIds = message.userIds.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return AdminSyncUserProfileToTimRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminSyncUserProfileToTimRequest();
    message.userIds = object.userIds?.map((e) => e) || [];
    return message;
  }
};
function createBaseAdminSyncUserProfileToTimResponse() {
  return { success: false, errorMessage: "" };
}
const AdminSyncUserProfileToTimResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.success !== void 0 && message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminSyncUserProfileToTimResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.errorMessage = reader.string();
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
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.success !== void 0 && message.success !== false) {
      obj.success = message.success;
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    return obj;
  },
  create(base) {
    return AdminSyncUserProfileToTimResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminSyncUserProfileToTimResponse();
    message.success = object.success ?? false;
    message.errorMessage = object.errorMessage ?? "";
    return message;
  }
};
function createBaseAdminAddTimedEntitlementRequest() {
  return { userId: 0, chatTimes: 0, videoCallTimes: 0, expiredAt: 0 };
}
const AdminAddTimedEntitlementRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.chatTimes !== void 0 && message.chatTimes !== 0) {
      writer.uint32(16).int32(message.chatTimes);
    }
    if (message.videoCallTimes !== void 0 && message.videoCallTimes !== 0) {
      writer.uint32(24).int32(message.videoCallTimes);
    }
    if (message.expiredAt !== void 0 && message.expiredAt !== 0) {
      writer.uint32(32).int64(message.expiredAt);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminAddTimedEntitlementRequest();
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
          message.chatTimes = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.videoCallTimes = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.expiredAt = longToNumber(reader.int64());
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
      chatTimes: isSet(object.chatTimes) ? globalThis.Number(object.chatTimes) : 0,
      videoCallTimes: isSet(object.videoCallTimes) ? globalThis.Number(object.videoCallTimes) : 0,
      expiredAt: isSet(object.expiredAt) ? globalThis.Number(object.expiredAt) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.chatTimes !== void 0 && message.chatTimes !== 0) {
      obj.chatTimes = Math.round(message.chatTimes);
    }
    if (message.videoCallTimes !== void 0 && message.videoCallTimes !== 0) {
      obj.videoCallTimes = Math.round(message.videoCallTimes);
    }
    if (message.expiredAt !== void 0 && message.expiredAt !== 0) {
      obj.expiredAt = Math.round(message.expiredAt);
    }
    return obj;
  },
  create(base) {
    return AdminAddTimedEntitlementRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminAddTimedEntitlementRequest();
    message.userId = object.userId ?? 0;
    message.chatTimes = object.chatTimes ?? 0;
    message.videoCallTimes = object.videoCallTimes ?? 0;
    message.expiredAt = object.expiredAt ?? 0;
    return message;
  }
};
function createBaseAdminAddTimedEntitlementResponse() {
  return { success: false, errorMessage: "" };
}
const AdminAddTimedEntitlementResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.success !== void 0 && message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminAddTimedEntitlementResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.errorMessage = reader.string();
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
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.success !== void 0 && message.success !== false) {
      obj.success = message.success;
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    return obj;
  },
  create(base) {
    return AdminAddTimedEntitlementResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminAddTimedEntitlementResponse();
    message.success = object.success ?? false;
    message.errorMessage = object.errorMessage ?? "";
    return message;
  }
};
function createBaseAdminTriggerScanGCUserAndDeliverGiftRequest() {
  return {};
}
const AdminTriggerScanGCUserAndDeliverGiftRequest = {
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminTriggerScanGCUserAndDeliverGiftRequest();
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
    return AdminTriggerScanGCUserAndDeliverGiftRequest.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseAdminTriggerScanGCUserAndDeliverGiftRequest();
    return message;
  }
};
function createBaseAdminTriggerScanGCUserAndDeliverGiftResponse() {
  return { success: false, errorMessage: "" };
}
const AdminTriggerScanGCUserAndDeliverGiftResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.success !== void 0 && message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminTriggerScanGCUserAndDeliverGiftResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.errorMessage = reader.string();
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
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.success !== void 0 && message.success !== false) {
      obj.success = message.success;
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    return obj;
  },
  create(base) {
    return AdminTriggerScanGCUserAndDeliverGiftResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminTriggerScanGCUserAndDeliverGiftResponse();
    message.success = object.success ?? false;
    message.errorMessage = object.errorMessage ?? "";
    return message;
  }
};
function createBaseAdminGeneratePwaScoreRequest() {
  return {};
}
const AdminGeneratePwaScoreRequest = {
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGeneratePwaScoreRequest();
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
    return AdminGeneratePwaScoreRequest.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseAdminGeneratePwaScoreRequest();
    return message;
  }
};
function createBaseAdminGeneratePwaScoreResponse() {
  return { success: false, errorMessage: "" };
}
const AdminGeneratePwaScoreResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.success !== void 0 && message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGeneratePwaScoreResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.errorMessage = reader.string();
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
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.success !== void 0 && message.success !== false) {
      obj.success = message.success;
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    return obj;
  },
  create(base) {
    return AdminGeneratePwaScoreResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminGeneratePwaScoreResponse();
    message.success = object.success ?? false;
    message.errorMessage = object.errorMessage ?? "";
    return message;
  }
};
function createBaseAdminGeneratePwaEmojiAvatarRequest() {
  return {};
}
const AdminGeneratePwaEmojiAvatarRequest = {
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGeneratePwaEmojiAvatarRequest();
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
    return AdminGeneratePwaEmojiAvatarRequest.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseAdminGeneratePwaEmojiAvatarRequest();
    return message;
  }
};
function createBaseAdminGeneratePwaEmojiAvatarResponse() {
  return { success: false, errorMessage: "" };
}
const AdminGeneratePwaEmojiAvatarResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.success !== void 0 && message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGeneratePwaEmojiAvatarResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.errorMessage = reader.string();
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
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.success !== void 0 && message.success !== false) {
      obj.success = message.success;
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    return obj;
  },
  create(base) {
    return AdminGeneratePwaEmojiAvatarResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminGeneratePwaEmojiAvatarResponse();
    message.success = object.success ?? false;
    message.errorMessage = object.errorMessage ?? "";
    return message;
  }
};
function createBaseAdminInsertMsgVectorRequest() {
  return { msg: [] };
}
const AdminInsertMsgVectorRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.msg !== void 0 && message.msg.length !== 0) {
      for (const v of message.msg) {
        writer.uint32(10).string(v);
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminInsertMsgVectorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = reader.string();
          if (el !== void 0) {
            message.msg.push(el);
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
    return { msg: globalThis.Array.isArray(object?.msg) ? object.msg.map((e) => globalThis.String(e)) : [] };
  },
  toJSON(message) {
    const obj = {};
    if (message.msg?.length) {
      obj.msg = message.msg;
    }
    return obj;
  },
  create(base) {
    return AdminInsertMsgVectorRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminInsertMsgVectorRequest();
    message.msg = object.msg?.map((e) => e) || [];
    return message;
  }
};
function createBaseAdminInsertMsgVectorResponse() {
  return { success: false, errorMessage: "" };
}
const AdminInsertMsgVectorResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.success !== void 0 && message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminInsertMsgVectorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.errorMessage = reader.string();
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
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.success !== void 0 && message.success !== false) {
      obj.success = message.success;
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    return obj;
  },
  create(base) {
    return AdminInsertMsgVectorResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminInsertMsgVectorResponse();
    message.success = object.success ?? false;
    message.errorMessage = object.errorMessage ?? "";
    return message;
  }
};
function createBaseAdminQuerySimilarMsgRequest() {
  return { queryText: "", fromUserId: 0, toUserId: 0 };
}
const AdminQuerySimilarMsgRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.queryText !== void 0 && message.queryText !== "") {
      writer.uint32(10).string(message.queryText);
    }
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      writer.uint32(16).int32(message.fromUserId);
    }
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      writer.uint32(24).int32(message.toUserId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminQuerySimilarMsgRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.queryText = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.fromUserId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.toUserId = reader.int32();
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
      queryText: isSet(object.queryText) ? globalThis.String(object.queryText) : isSet(object.query_text) ? globalThis.String(object.query_text) : "",
      fromUserId: isSet(object.fromUserId) ? globalThis.Number(object.fromUserId) : isSet(object.from_user_id) ? globalThis.Number(object.from_user_id) : 0,
      toUserId: isSet(object.toUserId) ? globalThis.Number(object.toUserId) : isSet(object.to_user_id) ? globalThis.Number(object.to_user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.queryText !== void 0 && message.queryText !== "") {
      obj.queryText = message.queryText;
    }
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      obj.fromUserId = Math.round(message.fromUserId);
    }
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      obj.toUserId = Math.round(message.toUserId);
    }
    return obj;
  },
  create(base) {
    return AdminQuerySimilarMsgRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminQuerySimilarMsgRequest();
    message.queryText = object.queryText ?? "";
    message.fromUserId = object.fromUserId ?? 0;
    message.toUserId = object.toUserId ?? 0;
    return message;
  }
};
function createBaseAdminQuerySimilarMsgResponse() {
  return { success: false, errorMessage: "", msgVector: void 0, extendMsgs: [] };
}
const AdminQuerySimilarMsgResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.success !== void 0 && message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    if (message.msgVector !== void 0) {
      MsgVector.encode(message.msgVector, writer.uint32(26).fork()).join();
    }
    if (message.extendMsgs !== void 0 && message.extendMsgs.length !== 0) {
      for (const v of message.extendMsgs) {
        writer.uint32(34).string(v);
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminQuerySimilarMsgResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.errorMessage = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.msgVector = MsgVector.decode(reader, reader.uint32());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          const el = reader.string();
          if (el !== void 0) {
            message.extendMsgs.push(el);
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
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : "",
      msgVector: isSet(object.msgVector) ? MsgVector.fromJSON(object.msgVector) : isSet(object.msg_vector) ? MsgVector.fromJSON(object.msg_vector) : void 0,
      extendMsgs: globalThis.Array.isArray(object?.extendMsgs) ? object.extendMsgs.map((e) => globalThis.String(e)) : globalThis.Array.isArray(object?.extend_msgs) ? object.extend_msgs.map((e) => globalThis.String(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.success !== void 0 && message.success !== false) {
      obj.success = message.success;
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    if (message.msgVector !== void 0) {
      obj.msgVector = MsgVector.toJSON(message.msgVector);
    }
    if (message.extendMsgs?.length) {
      obj.extendMsgs = message.extendMsgs;
    }
    return obj;
  },
  create(base) {
    return AdminQuerySimilarMsgResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminQuerySimilarMsgResponse();
    message.success = object.success ?? false;
    message.errorMessage = object.errorMessage ?? "";
    message.msgVector = object.msgVector !== void 0 && object.msgVector !== null ? MsgVector.fromPartial(object.msgVector) : void 0;
    message.extendMsgs = object.extendMsgs?.map((e) => e) || [];
    return message;
  }
};
function createBaseMsgVector() {
  return { msg: "", similarity: 0, costMs: 0, userId: 0 };
}
const MsgVector = {
  encode(message, writer = new BinaryWriter()) {
    if (message.msg !== void 0 && message.msg !== "") {
      writer.uint32(10).string(message.msg);
    }
    if (message.similarity !== void 0 && message.similarity !== 0) {
      writer.uint32(21).float(message.similarity);
    }
    if (message.costMs !== void 0 && message.costMs !== 0) {
      writer.uint32(24).int64(message.costMs);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(32).int32(message.userId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseMsgVector();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.msg = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 21) {
            break;
          }
          message.similarity = reader.float();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.costMs = longToNumber(reader.int64());
          continue;
        }
        case 4: {
          if (tag !== 32) {
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
      msg: isSet(object.msg) ? globalThis.String(object.msg) : "",
      similarity: isSet(object.similarity) ? globalThis.Number(object.similarity) : 0,
      costMs: isSet(object.costMs) ? globalThis.Number(object.costMs) : isSet(object.cost_ms) ? globalThis.Number(object.cost_ms) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.msg !== void 0 && message.msg !== "") {
      obj.msg = message.msg;
    }
    if (message.similarity !== void 0 && message.similarity !== 0) {
      obj.similarity = message.similarity;
    }
    if (message.costMs !== void 0 && message.costMs !== 0) {
      obj.costMs = Math.round(message.costMs);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    return obj;
  },
  create(base) {
    return MsgVector.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseMsgVector();
    message.msg = object.msg ?? "";
    message.similarity = object.similarity ?? 0;
    message.costMs = object.costMs ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  }
};
function createBaseAdminRefreshGatewayUserBanListRequest() {
  return {};
}
const AdminRefreshGatewayUserBanListRequest = {
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminRefreshGatewayUserBanListRequest();
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
    return AdminRefreshGatewayUserBanListRequest.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseAdminRefreshGatewayUserBanListRequest();
    return message;
  }
};
function createBaseAdminRefreshGatewayUserBanListResponse() {
  return { success: false, errorMessage: "" };
}
const AdminRefreshGatewayUserBanListResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.success !== void 0 && message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminRefreshGatewayUserBanListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.errorMessage = reader.string();
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
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.success !== void 0 && message.success !== false) {
      obj.success = message.success;
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    return obj;
  },
  create(base) {
    return AdminRefreshGatewayUserBanListResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminRefreshGatewayUserBanListResponse();
    message.success = object.success ?? false;
    message.errorMessage = object.errorMessage ?? "";
    return message;
  }
};
function createBaseAdminQuerySimilarMsgReceivedRequest() {
  return { queryText: "", toUserId: 0, excludeFromUserId: 0 };
}
const AdminQuerySimilarMsgReceivedRequest = {
  encode(message, writer = new BinaryWriter()) {
    if (message.queryText !== void 0 && message.queryText !== "") {
      writer.uint32(10).string(message.queryText);
    }
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      writer.uint32(16).int32(message.toUserId);
    }
    if (message.excludeFromUserId !== void 0 && message.excludeFromUserId !== 0) {
      writer.uint32(24).int32(message.excludeFromUserId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminQuerySimilarMsgReceivedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.queryText = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.toUserId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.excludeFromUserId = reader.int32();
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
      queryText: isSet(object.queryText) ? globalThis.String(object.queryText) : isSet(object.query_text) ? globalThis.String(object.query_text) : "",
      toUserId: isSet(object.toUserId) ? globalThis.Number(object.toUserId) : isSet(object.to_user_id) ? globalThis.Number(object.to_user_id) : 0,
      excludeFromUserId: isSet(object.excludeFromUserId) ? globalThis.Number(object.excludeFromUserId) : isSet(object.exclude_from_user_id) ? globalThis.Number(object.exclude_from_user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.queryText !== void 0 && message.queryText !== "") {
      obj.queryText = message.queryText;
    }
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      obj.toUserId = Math.round(message.toUserId);
    }
    if (message.excludeFromUserId !== void 0 && message.excludeFromUserId !== 0) {
      obj.excludeFromUserId = Math.round(message.excludeFromUserId);
    }
    return obj;
  },
  create(base) {
    return AdminQuerySimilarMsgReceivedRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminQuerySimilarMsgReceivedRequest();
    message.queryText = object.queryText ?? "";
    message.toUserId = object.toUserId ?? 0;
    message.excludeFromUserId = object.excludeFromUserId ?? 0;
    return message;
  }
};
function createBaseAdminQuerySimilarMsgReceivedResponse() {
  return { success: false, errorMessage: "", similarMsgs: [] };
}
const AdminQuerySimilarMsgReceivedResponse = {
  encode(message, writer = new BinaryWriter()) {
    if (message.success !== void 0 && message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      writer.uint32(18).string(message.errorMessage);
    }
    if (message.similarMsgs !== void 0 && message.similarMsgs.length !== 0) {
      for (const v of message.similarMsgs) {
        MsgVector.encode(v, writer.uint32(26).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminQuerySimilarMsgReceivedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.success = reader.bool();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.errorMessage = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          const el = MsgVector.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.similarMsgs.push(el);
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
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : "",
      similarMsgs: globalThis.Array.isArray(object?.similarMsgs) ? object.similarMsgs.map((e) => MsgVector.fromJSON(e)) : globalThis.Array.isArray(object?.similar_msgs) ? object.similar_msgs.map((e) => MsgVector.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.success !== void 0 && message.success !== false) {
      obj.success = message.success;
    }
    if (message.errorMessage !== void 0 && message.errorMessage !== "") {
      obj.errorMessage = message.errorMessage;
    }
    if (message.similarMsgs?.length) {
      obj.similarMsgs = message.similarMsgs.map((e) => MsgVector.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return AdminQuerySimilarMsgReceivedResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminQuerySimilarMsgReceivedResponse();
    message.success = object.success ?? false;
    message.errorMessage = object.errorMessage ?? "";
    message.similarMsgs = object.similarMsgs?.map((e) => MsgVector.fromPartial(e)) || [];
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
  AdminAddTimedEntitlementRequest,
  AdminAddTimedEntitlementResponse,
  AdminFaceScoreGenerateRequest,
  AdminFaceScoreGenerateResponse,
  AdminGeneratePwaEmojiAvatarRequest,
  AdminGeneratePwaEmojiAvatarResponse,
  AdminGeneratePwaScoreRequest,
  AdminGeneratePwaScoreResponse,
  AdminGenerateUserSlideQueueRequest,
  AdminGenerateUserSlideQueueResponse,
  AdminInsertMsgVectorRequest,
  AdminInsertMsgVectorResponse,
  AdminQuerySimilarMsgReceivedRequest,
  AdminQuerySimilarMsgReceivedResponse,
  AdminQuerySimilarMsgRequest,
  AdminQuerySimilarMsgResponse,
  AdminRefreshGatewayUserBanListRequest,
  AdminRefreshGatewayUserBanListResponse,
  AdminSyncUserProfileToTimRequest,
  AdminSyncUserProfileToTimResponse,
  AdminTriggerScanGCUserAndDeliverGiftRequest,
  AdminTriggerScanGCUserAndDeliverGiftResponse,
  MsgVector,
  protobufPackage
};
