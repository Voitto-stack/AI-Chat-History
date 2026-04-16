import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import {
  createPostResultFromJSON,
  createPostResultToJSON,
  PostPicture,
  PostPictureInQuery,
  postServiceCommonCodeFromJSON,
  postServiceCommonCodeToJSON
} from "./post_api";
import { UserInfo } from "./user_api";
const protobufPackage = "PostServiceStoryProto";
function createBaseStory() {
  return {
    id: 0,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0,
    fromUser: void 0,
    toUser: void 0,
    fromUserId: 0,
    toUserId: 0,
    pictures: [],
    title: "",
    content: "",
    isBless: false,
    blessCount: 0
  };
}
const Story = {
  $type: "PostServiceStoryProto.Story",
  encode(message, writer = new BinaryWriter()) {
    if (message.id !== void 0 && message.id !== 0) {
      writer.uint32(8).int64(message.id);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      writer.uint32(16).int64(message.createdAt);
    }
    if (message.updatedAt !== void 0 && message.updatedAt !== 0) {
      writer.uint32(24).int64(message.updatedAt);
    }
    if (message.deletedAt !== void 0 && message.deletedAt !== 0) {
      writer.uint32(32).int64(message.deletedAt);
    }
    if (message.fromUser !== void 0) {
      UserInfo.encode(message.fromUser, writer.uint32(42).fork()).join();
    }
    if (message.toUser !== void 0) {
      UserInfo.encode(message.toUser, writer.uint32(50).fork()).join();
    }
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      writer.uint32(56).int32(message.fromUserId);
    }
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      writer.uint32(64).int32(message.toUserId);
    }
    if (message.pictures !== void 0 && message.pictures.length !== 0) {
      for (const v of message.pictures) {
        PostPictureInQuery.encode(v, writer.uint32(74).fork()).join();
      }
    }
    if (message.title !== void 0 && message.title !== "") {
      writer.uint32(82).string(message.title);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(90).string(message.content);
    }
    if (message.isBless !== void 0 && message.isBless !== false) {
      writer.uint32(96).bool(message.isBless);
    }
    if (message.blessCount !== void 0 && message.blessCount !== 0) {
      writer.uint32(104).int32(message.blessCount);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStory();
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
          if (tag !== 16) {
            break;
          }
          message.createdAt = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.updatedAt = longToNumber(reader.int64());
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.deletedAt = longToNumber(reader.int64());
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.fromUser = UserInfo.decode(reader, reader.uint32());
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          message.toUser = UserInfo.decode(reader, reader.uint32());
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.fromUserId = reader.int32();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }
          message.toUserId = reader.int32();
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }
          const el = PostPictureInQuery.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.pictures.push(el);
          }
          continue;
        }
        case 10: {
          if (tag !== 82) {
            break;
          }
          message.title = reader.string();
          continue;
        }
        case 11: {
          if (tag !== 90) {
            break;
          }
          message.content = reader.string();
          continue;
        }
        case 12: {
          if (tag !== 96) {
            break;
          }
          message.isBless = reader.bool();
          continue;
        }
        case 13: {
          if (tag !== 104) {
            break;
          }
          message.blessCount = reader.int32();
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
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : isSet(object.created_at) ? globalThis.Number(object.created_at) : 0,
      updatedAt: isSet(object.updatedAt) ? globalThis.Number(object.updatedAt) : isSet(object.updated_at) ? globalThis.Number(object.updated_at) : 0,
      deletedAt: isSet(object.deletedAt) ? globalThis.Number(object.deletedAt) : isSet(object.deleted_at) ? globalThis.Number(object.deleted_at) : 0,
      fromUser: isSet(object.fromUser) ? UserInfo.fromJSON(object.fromUser) : isSet(object.from_user) ? UserInfo.fromJSON(object.from_user) : void 0,
      toUser: isSet(object.toUser) ? UserInfo.fromJSON(object.toUser) : isSet(object.to_user) ? UserInfo.fromJSON(object.to_user) : void 0,
      fromUserId: isSet(object.fromUserId) ? globalThis.Number(object.fromUserId) : isSet(object.from_user_id) ? globalThis.Number(object.from_user_id) : 0,
      toUserId: isSet(object.toUserId) ? globalThis.Number(object.toUserId) : isSet(object.to_user_id) ? globalThis.Number(object.to_user_id) : 0,
      pictures: globalThis.Array.isArray(object?.pictures) ? object.pictures.map((e) => PostPictureInQuery.fromJSON(e)) : [],
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      isBless: isSet(object.isBless) ? globalThis.Boolean(object.isBless) : isSet(object.is_bless) ? globalThis.Boolean(object.is_bless) : false,
      blessCount: isSet(object.blessCount) ? globalThis.Number(object.blessCount) : isSet(object.bless_count) ? globalThis.Number(object.bless_count) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.id !== void 0 && message.id !== 0) {
      obj.id = Math.round(message.id);
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
    if (message.fromUser !== void 0) {
      obj.fromUser = UserInfo.toJSON(message.fromUser);
    }
    if (message.toUser !== void 0) {
      obj.toUser = UserInfo.toJSON(message.toUser);
    }
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      obj.fromUserId = Math.round(message.fromUserId);
    }
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      obj.toUserId = Math.round(message.toUserId);
    }
    if (message.pictures?.length) {
      obj.pictures = message.pictures.map((e) => PostPictureInQuery.toJSON(e));
    }
    if (message.title !== void 0 && message.title !== "") {
      obj.title = message.title;
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    if (message.isBless !== void 0 && message.isBless !== false) {
      obj.isBless = message.isBless;
    }
    if (message.blessCount !== void 0 && message.blessCount !== 0) {
      obj.blessCount = Math.round(message.blessCount);
    }
    return obj;
  },
  create(base) {
    return Story.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseStory();
    message.id = object.id ?? 0;
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.deletedAt = object.deletedAt ?? 0;
    message.fromUser = object.fromUser !== void 0 && object.fromUser !== null ? UserInfo.fromPartial(object.fromUser) : void 0;
    message.toUser = object.toUser !== void 0 && object.toUser !== null ? UserInfo.fromPartial(object.toUser) : void 0;
    message.fromUserId = object.fromUserId ?? 0;
    message.toUserId = object.toUserId ?? 0;
    message.pictures = object.pictures?.map((e) => PostPictureInQuery.fromPartial(e)) || [];
    message.title = object.title ?? "";
    message.content = object.content ?? "";
    message.isBless = object.isBless ?? false;
    message.blessCount = object.blessCount ?? 0;
    return message;
  }
};
function createBaseStoryBless() {
  return { id: 0, storyId: 0, createdAt: 0, updatedAt: 0, deletedAt: 0, userId: 0, user: void 0, content: "" };
}
const StoryBless = {
  $type: "PostServiceStoryProto.StoryBless",
  encode(message, writer = new BinaryWriter()) {
    if (message.id !== void 0 && message.id !== 0) {
      writer.uint32(8).int64(message.id);
    }
    if (message.storyId !== void 0 && message.storyId !== 0) {
      writer.uint32(16).int64(message.storyId);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      writer.uint32(24).int64(message.createdAt);
    }
    if (message.updatedAt !== void 0 && message.updatedAt !== 0) {
      writer.uint32(32).int64(message.updatedAt);
    }
    if (message.deletedAt !== void 0 && message.deletedAt !== 0) {
      writer.uint32(40).int64(message.deletedAt);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(48).int32(message.userId);
    }
    if (message.user !== void 0) {
      UserInfo.encode(message.user, writer.uint32(58).fork()).join();
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(66).string(message.content);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseStoryBless();
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
          if (tag !== 16) {
            break;
          }
          message.storyId = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.createdAt = longToNumber(reader.int64());
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.updatedAt = longToNumber(reader.int64());
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.deletedAt = longToNumber(reader.int64());
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.userId = reader.int32();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }
          message.user = UserInfo.decode(reader, reader.uint32());
          continue;
        }
        case 8: {
          if (tag !== 66) {
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
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      storyId: isSet(object.storyId) ? globalThis.Number(object.storyId) : isSet(object.story_id) ? globalThis.Number(object.story_id) : 0,
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : isSet(object.created_at) ? globalThis.Number(object.created_at) : 0,
      updatedAt: isSet(object.updatedAt) ? globalThis.Number(object.updatedAt) : isSet(object.updated_at) ? globalThis.Number(object.updated_at) : 0,
      deletedAt: isSet(object.deletedAt) ? globalThis.Number(object.deletedAt) : isSet(object.deleted_at) ? globalThis.Number(object.deleted_at) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      user: isSet(object.user) ? UserInfo.fromJSON(object.user) : void 0,
      content: isSet(object.content) ? globalThis.String(object.content) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.id !== void 0 && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.storyId !== void 0 && message.storyId !== 0) {
      obj.storyId = Math.round(message.storyId);
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
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.user !== void 0) {
      obj.user = UserInfo.toJSON(message.user);
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    return obj;
  },
  create(base) {
    return StoryBless.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseStoryBless();
    message.id = object.id ?? 0;
    message.storyId = object.storyId ?? 0;
    message.createdAt = object.createdAt ?? 0;
    message.updatedAt = object.updatedAt ?? 0;
    message.deletedAt = object.deletedAt ?? 0;
    message.userId = object.userId ?? 0;
    message.user = object.user !== void 0 && object.user !== null ? UserInfo.fromPartial(object.user) : void 0;
    message.content = object.content ?? "";
    return message;
  }
};
function createBaseAdminCreateStoryRequest() {
  return { fromUserId: 0, toUserId: 0, title: "", content: "", createdAt: 0, pictures: [], picturesInQuery: [] };
}
const AdminCreateStoryRequest = {
  $type: "PostServiceStoryProto.AdminCreateStoryRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      writer.uint32(8).int32(message.fromUserId);
    }
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      writer.uint32(16).int32(message.toUserId);
    }
    if (message.title !== void 0 && message.title !== "") {
      writer.uint32(26).string(message.title);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(34).string(message.content);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      writer.uint32(40).int64(message.createdAt);
    }
    if (message.pictures !== void 0 && message.pictures.length !== 0) {
      for (const v of message.pictures) {
        PostPicture.encode(v, writer.uint32(50).fork()).join();
      }
    }
    if (message.picturesInQuery !== void 0 && message.picturesInQuery.length !== 0) {
      for (const v of message.picturesInQuery) {
        PostPictureInQuery.encode(v, writer.uint32(58).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminCreateStoryRequest();
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
          message.toUserId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.title = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.content = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.createdAt = longToNumber(reader.int64());
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }
          const el = PostPicture.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.pictures.push(el);
          }
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }
          const el = PostPictureInQuery.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.picturesInQuery.push(el);
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
      fromUserId: isSet(object.fromUserId) ? globalThis.Number(object.fromUserId) : isSet(object.from_user_id) ? globalThis.Number(object.from_user_id) : 0,
      toUserId: isSet(object.toUserId) ? globalThis.Number(object.toUserId) : isSet(object.to_user_id) ? globalThis.Number(object.to_user_id) : 0,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : isSet(object.created_at) ? globalThis.Number(object.created_at) : 0,
      pictures: globalThis.Array.isArray(object?.pictures) ? object.pictures.map((e) => PostPicture.fromJSON(e)) : [],
      picturesInQuery: globalThis.Array.isArray(object?.picturesInQuery) ? object.picturesInQuery.map((e) => PostPictureInQuery.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      obj.fromUserId = Math.round(message.fromUserId);
    }
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      obj.toUserId = Math.round(message.toUserId);
    }
    if (message.title !== void 0 && message.title !== "") {
      obj.title = message.title;
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    if (message.pictures?.length) {
      obj.pictures = message.pictures.map((e) => PostPicture.toJSON(e));
    }
    if (message.picturesInQuery?.length) {
      obj.picturesInQuery = message.picturesInQuery.map((e) => PostPictureInQuery.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return AdminCreateStoryRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminCreateStoryRequest();
    message.fromUserId = object.fromUserId ?? 0;
    message.toUserId = object.toUserId ?? 0;
    message.title = object.title ?? "";
    message.content = object.content ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.pictures = object.pictures?.map((e) => PostPicture.fromPartial(e)) || [];
    message.picturesInQuery = object.picturesInQuery?.map((e) => PostPictureInQuery.fromPartial(e)) || [];
    return message;
  }
};
function createBaseAdminCreateStoryResponse() {
  return { code: 0, message: "", story: void 0 };
}
const AdminCreateStoryResponse = {
  $type: "PostServiceStoryProto.AdminCreateStoryResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.story !== void 0) {
      Story.encode(message.story, writer.uint32(26).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminCreateStoryResponse();
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
          message.story = Story.decode(reader, reader.uint32());
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
      code: isSet(object.code) ? createPostResultFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      story: isSet(object.story) ? Story.fromJSON(object.story) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = createPostResultToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.story !== void 0) {
      obj.story = Story.toJSON(message.story);
    }
    return obj;
  },
  create(base) {
    return AdminCreateStoryResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminCreateStoryResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.story = object.story !== void 0 && object.story !== null ? Story.fromPartial(object.story) : void 0;
    return message;
  }
};
function createBaseAdminEditStoryRequest() {
  return {
    storyId: 0,
    fromUserId: 0,
    toUserId: 0,
    title: "",
    content: "",
    createdAt: 0,
    pictures: [],
    picturesInQuery: []
  };
}
const AdminEditStoryRequest = {
  $type: "PostServiceStoryProto.AdminEditStoryRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.storyId !== void 0 && message.storyId !== 0) {
      writer.uint32(8).int64(message.storyId);
    }
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      writer.uint32(16).int32(message.fromUserId);
    }
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      writer.uint32(24).int32(message.toUserId);
    }
    if (message.title !== void 0 && message.title !== "") {
      writer.uint32(34).string(message.title);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(42).string(message.content);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      writer.uint32(48).int64(message.createdAt);
    }
    if (message.pictures !== void 0 && message.pictures.length !== 0) {
      for (const v of message.pictures) {
        PostPicture.encode(v, writer.uint32(58).fork()).join();
      }
    }
    if (message.picturesInQuery !== void 0 && message.picturesInQuery.length !== 0) {
      for (const v of message.picturesInQuery) {
        PostPictureInQuery.encode(v, writer.uint32(66).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminEditStoryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.storyId = longToNumber(reader.int64());
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
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.title = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }
          message.content = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.createdAt = longToNumber(reader.int64());
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }
          const el = PostPicture.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.pictures.push(el);
          }
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }
          const el = PostPictureInQuery.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.picturesInQuery.push(el);
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
      storyId: isSet(object.storyId) ? globalThis.Number(object.storyId) : isSet(object.story_id) ? globalThis.Number(object.story_id) : 0,
      fromUserId: isSet(object.fromUserId) ? globalThis.Number(object.fromUserId) : isSet(object.from_user_id) ? globalThis.Number(object.from_user_id) : 0,
      toUserId: isSet(object.toUserId) ? globalThis.Number(object.toUserId) : isSet(object.to_user_id) ? globalThis.Number(object.to_user_id) : 0,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : isSet(object.created_at) ? globalThis.Number(object.created_at) : 0,
      pictures: globalThis.Array.isArray(object?.pictures) ? object.pictures.map((e) => PostPicture.fromJSON(e)) : [],
      picturesInQuery: globalThis.Array.isArray(object?.picturesInQuery) ? object.picturesInQuery.map((e) => PostPictureInQuery.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.storyId !== void 0 && message.storyId !== 0) {
      obj.storyId = Math.round(message.storyId);
    }
    if (message.fromUserId !== void 0 && message.fromUserId !== 0) {
      obj.fromUserId = Math.round(message.fromUserId);
    }
    if (message.toUserId !== void 0 && message.toUserId !== 0) {
      obj.toUserId = Math.round(message.toUserId);
    }
    if (message.title !== void 0 && message.title !== "") {
      obj.title = message.title;
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    if (message.pictures?.length) {
      obj.pictures = message.pictures.map((e) => PostPicture.toJSON(e));
    }
    if (message.picturesInQuery?.length) {
      obj.picturesInQuery = message.picturesInQuery.map((e) => PostPictureInQuery.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return AdminEditStoryRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminEditStoryRequest();
    message.storyId = object.storyId ?? 0;
    message.fromUserId = object.fromUserId ?? 0;
    message.toUserId = object.toUserId ?? 0;
    message.title = object.title ?? "";
    message.content = object.content ?? "";
    message.createdAt = object.createdAt ?? 0;
    message.pictures = object.pictures?.map((e) => PostPicture.fromPartial(e)) || [];
    message.picturesInQuery = object.picturesInQuery?.map((e) => PostPictureInQuery.fromPartial(e)) || [];
    return message;
  }
};
function createBaseAdminEditStoryResponse() {
  return { code: 0, message: "", story: void 0 };
}
const AdminEditStoryResponse = {
  $type: "PostServiceStoryProto.AdminEditStoryResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.story !== void 0) {
      Story.encode(message.story, writer.uint32(26).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminEditStoryResponse();
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
          message.story = Story.decode(reader, reader.uint32());
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
      code: isSet(object.code) ? createPostResultFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      story: isSet(object.story) ? Story.fromJSON(object.story) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = createPostResultToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.story !== void 0) {
      obj.story = Story.toJSON(message.story);
    }
    return obj;
  },
  create(base) {
    return AdminEditStoryResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminEditStoryResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.story = object.story !== void 0 && object.story !== null ? Story.fromPartial(object.story) : void 0;
    return message;
  }
};
function createBaseAdminDeleteStoryRequest() {
  return { storyIds: [] };
}
const AdminDeleteStoryRequest = {
  $type: "PostServiceStoryProto.AdminDeleteStoryRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.storyIds !== void 0 && message.storyIds.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.storyIds) {
        writer.int64(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminDeleteStoryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag === 8) {
            message.storyIds.push(longToNumber(reader.int64()));
            continue;
          }
          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.storyIds.push(longToNumber(reader.int64()));
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
      storyIds: globalThis.Array.isArray(object?.storyIds) ? object.storyIds.map((e) => globalThis.Number(e)) : globalThis.Array.isArray(object?.story_ids) ? object.story_ids.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.storyIds?.length) {
      obj.storyIds = message.storyIds.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return AdminDeleteStoryRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminDeleteStoryRequest();
    message.storyIds = object.storyIds?.map((e) => e) || [];
    return message;
  }
};
function createBaseAdminDeleteStoryResponse() {
  return { code: 0, message: "" };
}
const AdminDeleteStoryResponse = {
  $type: "PostServiceStoryProto.AdminDeleteStoryResponse",
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
    const message = createBaseAdminDeleteStoryResponse();
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return AdminDeleteStoryResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminDeleteStoryResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseAdminGetStoryListRequest() {
  return { offset: 0, limit: 0 };
}
const AdminGetStoryListRequest = {
  $type: "PostServiceStoryProto.AdminGetStoryListRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.offset !== void 0 && message.offset !== 0) {
      writer.uint32(8).int64(message.offset);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      writer.uint32(16).int64(message.limit);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGetStoryListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.offset = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.limit = longToNumber(reader.int64());
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
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.offset !== void 0 && message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    return obj;
  },
  create(base) {
    return AdminGetStoryListRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminGetStoryListRequest();
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    return message;
  }
};
function createBaseAdminGetStoryListResponse() {
  return { code: 0, message: "", storyList: [], nextOffset: 0 };
}
const AdminGetStoryListResponse = {
  $type: "PostServiceStoryProto.AdminGetStoryListResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.storyList !== void 0 && message.storyList.length !== 0) {
      for (const v of message.storyList) {
        Story.encode(v, writer.uint32(26).fork()).join();
      }
    }
    if (message.nextOffset !== void 0 && message.nextOffset !== 0) {
      writer.uint32(32).int64(message.nextOffset);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGetStoryListResponse();
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
          const el = Story.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.storyList.push(el);
          }
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.nextOffset = longToNumber(reader.int64());
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      storyList: globalThis.Array.isArray(object?.storyList) ? object.storyList.map((e) => Story.fromJSON(e)) : globalThis.Array.isArray(object?.story_list) ? object.story_list.map((e) => Story.fromJSON(e)) : [],
      nextOffset: isSet(object.nextOffset) ? globalThis.Number(object.nextOffset) : isSet(object.next_offset) ? globalThis.Number(object.next_offset) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.storyList?.length) {
      obj.storyList = message.storyList.map((e) => Story.toJSON(e));
    }
    if (message.nextOffset !== void 0 && message.nextOffset !== 0) {
      obj.nextOffset = Math.round(message.nextOffset);
    }
    return obj;
  },
  create(base) {
    return AdminGetStoryListResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminGetStoryListResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.storyList = object.storyList?.map((e) => Story.fromPartial(e)) || [];
    message.nextOffset = object.nextOffset ?? 0;
    return message;
  }
};
function createBaseGetStoryFeedRequest() {
  return { limit: 0, offset: 0 };
}
const GetStoryFeedRequest = {
  $type: "PostServiceStoryProto.GetStoryFeedRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.limit !== void 0 && message.limit !== 0) {
      writer.uint32(8).int64(message.limit);
    }
    if (message.offset !== void 0 && message.offset !== 0) {
      writer.uint32(16).int64(message.offset);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetStoryFeedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.limit = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.offset = longToNumber(reader.int64());
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
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.limit !== void 0 && message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.offset !== void 0 && message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },
  create(base) {
    return GetStoryFeedRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetStoryFeedRequest();
    message.limit = object.limit ?? 0;
    message.offset = object.offset ?? 0;
    return message;
  }
};
function createBaseGetStoryFeedResponse() {
  return { code: 0, message: "", storyList: [], nextOffset: 0 };
}
const GetStoryFeedResponse = {
  $type: "PostServiceStoryProto.GetStoryFeedResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.storyList !== void 0 && message.storyList.length !== 0) {
      for (const v of message.storyList) {
        Story.encode(v, writer.uint32(26).fork()).join();
      }
    }
    if (message.nextOffset !== void 0 && message.nextOffset !== 0) {
      writer.uint32(32).int64(message.nextOffset);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetStoryFeedResponse();
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
          const el = Story.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.storyList.push(el);
          }
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.nextOffset = longToNumber(reader.int64());
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      storyList: globalThis.Array.isArray(object?.storyList) ? object.storyList.map((e) => Story.fromJSON(e)) : globalThis.Array.isArray(object?.story_list) ? object.story_list.map((e) => Story.fromJSON(e)) : [],
      nextOffset: isSet(object.nextOffset) ? globalThis.Number(object.nextOffset) : isSet(object.next_offset) ? globalThis.Number(object.next_offset) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.storyList?.length) {
      obj.storyList = message.storyList.map((e) => Story.toJSON(e));
    }
    if (message.nextOffset !== void 0 && message.nextOffset !== 0) {
      obj.nextOffset = Math.round(message.nextOffset);
    }
    return obj;
  },
  create(base) {
    return GetStoryFeedResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetStoryFeedResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.storyList = object.storyList?.map((e) => Story.fromPartial(e)) || [];
    message.nextOffset = object.nextOffset ?? 0;
    return message;
  }
};
function createBaseGetStoryBannerRequest() {
  return {};
}
const GetStoryBannerRequest = {
  $type: "PostServiceStoryProto.GetStoryBannerRequest",
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetStoryBannerRequest();
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
    return GetStoryBannerRequest.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseGetStoryBannerRequest();
    return message;
  }
};
function createBaseGetStoryBannerResponse() {
  return { code: 0, message: "", storyList: [] };
}
const GetStoryBannerResponse = {
  $type: "PostServiceStoryProto.GetStoryBannerResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.storyList !== void 0 && message.storyList.length !== 0) {
      for (const v of message.storyList) {
        Story.encode(v, writer.uint32(26).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetStoryBannerResponse();
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
          const el = Story.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.storyList.push(el);
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      storyList: globalThis.Array.isArray(object?.storyList) ? object.storyList.map((e) => Story.fromJSON(e)) : globalThis.Array.isArray(object?.story_list) ? object.story_list.map((e) => Story.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.storyList?.length) {
      obj.storyList = message.storyList.map((e) => Story.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return GetStoryBannerResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetStoryBannerResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.storyList = object.storyList?.map((e) => Story.fromPartial(e)) || [];
    return message;
  }
};
function createBaseGetStoryByIdRequest() {
  return { storyId: 0 };
}
const GetStoryByIdRequest = {
  $type: "PostServiceStoryProto.GetStoryByIdRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.storyId !== void 0 && message.storyId !== 0) {
      writer.uint32(8).int64(message.storyId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetStoryByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.storyId = longToNumber(reader.int64());
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
      storyId: isSet(object.storyId) ? globalThis.Number(object.storyId) : isSet(object.story_id) ? globalThis.Number(object.story_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.storyId !== void 0 && message.storyId !== 0) {
      obj.storyId = Math.round(message.storyId);
    }
    return obj;
  },
  create(base) {
    return GetStoryByIdRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetStoryByIdRequest();
    message.storyId = object.storyId ?? 0;
    return message;
  }
};
function createBaseGetStoryByIdResponse() {
  return { code: 0, message: "", story: void 0 };
}
const GetStoryByIdResponse = {
  $type: "PostServiceStoryProto.GetStoryByIdResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.story !== void 0) {
      Story.encode(message.story, writer.uint32(26).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetStoryByIdResponse();
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
          message.story = Story.decode(reader, reader.uint32());
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      story: isSet(object.story) ? Story.fromJSON(object.story) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.story !== void 0) {
      obj.story = Story.toJSON(message.story);
    }
    return obj;
  },
  create(base) {
    return GetStoryByIdResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetStoryByIdResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.story = object.story !== void 0 && object.story !== null ? Story.fromPartial(object.story) : void 0;
    return message;
  }
};
function createBaseGetMyStoryFeedRequest() {
  return { limit: 0, offset: 0 };
}
const GetMyStoryFeedRequest = {
  $type: "PostServiceStoryProto.GetMyStoryFeedRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.limit !== void 0 && message.limit !== 0) {
      writer.uint32(8).int64(message.limit);
    }
    if (message.offset !== void 0 && message.offset !== 0) {
      writer.uint32(16).int64(message.offset);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetMyStoryFeedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.limit = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.offset = longToNumber(reader.int64());
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
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.limit !== void 0 && message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.offset !== void 0 && message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },
  create(base) {
    return GetMyStoryFeedRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetMyStoryFeedRequest();
    message.limit = object.limit ?? 0;
    message.offset = object.offset ?? 0;
    return message;
  }
};
function createBaseGetMyStoryFeedResponse() {
  return { code: 0, message: "", storyList: [], nextOffset: 0 };
}
const GetMyStoryFeedResponse = {
  $type: "PostServiceStoryProto.GetMyStoryFeedResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.storyList !== void 0 && message.storyList.length !== 0) {
      for (const v of message.storyList) {
        Story.encode(v, writer.uint32(26).fork()).join();
      }
    }
    if (message.nextOffset !== void 0 && message.nextOffset !== 0) {
      writer.uint32(32).int64(message.nextOffset);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetMyStoryFeedResponse();
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
          const el = Story.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.storyList.push(el);
          }
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.nextOffset = longToNumber(reader.int64());
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      storyList: globalThis.Array.isArray(object?.storyList) ? object.storyList.map((e) => Story.fromJSON(e)) : globalThis.Array.isArray(object?.story_list) ? object.story_list.map((e) => Story.fromJSON(e)) : [],
      nextOffset: isSet(object.nextOffset) ? globalThis.Number(object.nextOffset) : isSet(object.next_offset) ? globalThis.Number(object.next_offset) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.storyList?.length) {
      obj.storyList = message.storyList.map((e) => Story.toJSON(e));
    }
    if (message.nextOffset !== void 0 && message.nextOffset !== 0) {
      obj.nextOffset = Math.round(message.nextOffset);
    }
    return obj;
  },
  create(base) {
    return GetMyStoryFeedResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetMyStoryFeedResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.storyList = object.storyList?.map((e) => Story.fromPartial(e)) || [];
    message.nextOffset = object.nextOffset ?? 0;
    return message;
  }
};
function createBaseGetRandStoryBlessTextRequest() {
  return {};
}
const GetRandStoryBlessTextRequest = {
  $type: "PostServiceStoryProto.GetRandStoryBlessTextRequest",
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetRandStoryBlessTextRequest();
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
    return GetRandStoryBlessTextRequest.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseGetRandStoryBlessTextRequest();
    return message;
  }
};
function createBaseGetRandStoryBlessTextResponse() {
  return { code: 0, message: "", content: "" };
}
const GetRandStoryBlessTextResponse = {
  $type: "PostServiceStoryProto.GetRandStoryBlessTextResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetRandStoryBlessTextResponse();
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    return obj;
  },
  create(base) {
    return GetRandStoryBlessTextResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetRandStoryBlessTextResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.content = object.content ?? "";
    return message;
  }
};
function createBaseCreateStoryBlessRequest() {
  return { storyId: 0, content: "" };
}
const CreateStoryBlessRequest = {
  $type: "PostServiceStoryProto.CreateStoryBlessRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.storyId !== void 0 && message.storyId !== 0) {
      writer.uint32(8).int64(message.storyId);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateStoryBlessRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.storyId = longToNumber(reader.int64());
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
      storyId: isSet(object.storyId) ? globalThis.Number(object.storyId) : isSet(object.story_id) ? globalThis.Number(object.story_id) : 0,
      content: isSet(object.content) ? globalThis.String(object.content) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.storyId !== void 0 && message.storyId !== 0) {
      obj.storyId = Math.round(message.storyId);
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    return obj;
  },
  create(base) {
    return CreateStoryBlessRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateStoryBlessRequest();
    message.storyId = object.storyId ?? 0;
    message.content = object.content ?? "";
    return message;
  }
};
function createBaseCreateStoryBlessResponse() {
  return { code: 0, message: "", storyBlessId: 0, storyBless: void 0 };
}
const CreateStoryBlessResponse = {
  $type: "PostServiceStoryProto.CreateStoryBlessResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.storyBlessId !== void 0 && message.storyBlessId !== 0) {
      writer.uint32(24).int64(message.storyBlessId);
    }
    if (message.storyBless !== void 0) {
      StoryBless.encode(message.storyBless, writer.uint32(34).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreateStoryBlessResponse();
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
          if (tag !== 24) {
            break;
          }
          message.storyBlessId = longToNumber(reader.int64());
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.storyBless = StoryBless.decode(reader, reader.uint32());
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      storyBlessId: isSet(object.storyBlessId) ? globalThis.Number(object.storyBlessId) : isSet(object.story_bless_id) ? globalThis.Number(object.story_bless_id) : 0,
      storyBless: isSet(object.storyBless) ? StoryBless.fromJSON(object.storyBless) : isSet(object.story_bless) ? StoryBless.fromJSON(object.story_bless) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.storyBlessId !== void 0 && message.storyBlessId !== 0) {
      obj.storyBlessId = Math.round(message.storyBlessId);
    }
    if (message.storyBless !== void 0) {
      obj.storyBless = StoryBless.toJSON(message.storyBless);
    }
    return obj;
  },
  create(base) {
    return CreateStoryBlessResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreateStoryBlessResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.storyBlessId = object.storyBlessId ?? 0;
    message.storyBless = object.storyBless !== void 0 && object.storyBless !== null ? StoryBless.fromPartial(object.storyBless) : void 0;
    return message;
  }
};
function createBaseGetStoryBlessFeedRequest() {
  return { storyId: 0, offset: 0, limit: 0 };
}
const GetStoryBlessFeedRequest = {
  $type: "PostServiceStoryProto.GetStoryBlessFeedRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.storyId !== void 0 && message.storyId !== 0) {
      writer.uint32(8).int64(message.storyId);
    }
    if (message.offset !== void 0 && message.offset !== 0) {
      writer.uint32(16).int64(message.offset);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      writer.uint32(24).int64(message.limit);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetStoryBlessFeedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.storyId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.offset = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.limit = longToNumber(reader.int64());
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
      storyId: isSet(object.storyId) ? globalThis.Number(object.storyId) : isSet(object.story_id) ? globalThis.Number(object.story_id) : 0,
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.storyId !== void 0 && message.storyId !== 0) {
      obj.storyId = Math.round(message.storyId);
    }
    if (message.offset !== void 0 && message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    return obj;
  },
  create(base) {
    return GetStoryBlessFeedRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetStoryBlessFeedRequest();
    message.storyId = object.storyId ?? 0;
    message.offset = object.offset ?? 0;
    message.limit = object.limit ?? 0;
    return message;
  }
};
function createBaseGetStoryBlessFeedResponse() {
  return { code: 0, message: "", storyBlessList: [], hasMore: false, storyBlessCount: 0, nextOffset: 0 };
}
const GetStoryBlessFeedResponse = {
  $type: "PostServiceStoryProto.GetStoryBlessFeedResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.storyBlessList !== void 0 && message.storyBlessList.length !== 0) {
      for (const v of message.storyBlessList) {
        StoryBless.encode(v, writer.uint32(26).fork()).join();
      }
    }
    if (message.hasMore !== void 0 && message.hasMore !== false) {
      writer.uint32(32).bool(message.hasMore);
    }
    if (message.storyBlessCount !== void 0 && message.storyBlessCount !== 0) {
      writer.uint32(40).int64(message.storyBlessCount);
    }
    if (message.nextOffset !== void 0 && message.nextOffset !== 0) {
      writer.uint32(48).int64(message.nextOffset);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetStoryBlessFeedResponse();
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
          const el = StoryBless.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.storyBlessList.push(el);
          }
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.hasMore = reader.bool();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.storyBlessCount = longToNumber(reader.int64());
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.nextOffset = longToNumber(reader.int64());
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      storyBlessList: globalThis.Array.isArray(object?.storyBlessList) ? object.storyBlessList.map((e) => StoryBless.fromJSON(e)) : globalThis.Array.isArray(object?.story_bless_list) ? object.story_bless_list.map((e) => StoryBless.fromJSON(e)) : [],
      hasMore: isSet(object.hasMore) ? globalThis.Boolean(object.hasMore) : isSet(object.has_more) ? globalThis.Boolean(object.has_more) : false,
      storyBlessCount: isSet(object.storyBlessCount) ? globalThis.Number(object.storyBlessCount) : isSet(object.story_bless_count) ? globalThis.Number(object.story_bless_count) : 0,
      nextOffset: isSet(object.nextOffset) ? globalThis.Number(object.nextOffset) : isSet(object.next_offset) ? globalThis.Number(object.next_offset) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.storyBlessList?.length) {
      obj.storyBlessList = message.storyBlessList.map((e) => StoryBless.toJSON(e));
    }
    if (message.hasMore !== void 0 && message.hasMore !== false) {
      obj.hasMore = message.hasMore;
    }
    if (message.storyBlessCount !== void 0 && message.storyBlessCount !== 0) {
      obj.storyBlessCount = Math.round(message.storyBlessCount);
    }
    if (message.nextOffset !== void 0 && message.nextOffset !== 0) {
      obj.nextOffset = Math.round(message.nextOffset);
    }
    return obj;
  },
  create(base) {
    return GetStoryBlessFeedResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetStoryBlessFeedResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.storyBlessList = object.storyBlessList?.map((e) => StoryBless.fromPartial(e)) || [];
    message.hasMore = object.hasMore ?? false;
    message.storyBlessCount = object.storyBlessCount ?? 0;
    message.nextOffset = object.nextOffset ?? 0;
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
  AdminCreateStoryRequest,
  AdminCreateStoryResponse,
  AdminDeleteStoryRequest,
  AdminDeleteStoryResponse,
  AdminEditStoryRequest,
  AdminEditStoryResponse,
  AdminGetStoryListRequest,
  AdminGetStoryListResponse,
  CreateStoryBlessRequest,
  CreateStoryBlessResponse,
  GetMyStoryFeedRequest,
  GetMyStoryFeedResponse,
  GetRandStoryBlessTextRequest,
  GetRandStoryBlessTextResponse,
  GetStoryBannerRequest,
  GetStoryBannerResponse,
  GetStoryBlessFeedRequest,
  GetStoryBlessFeedResponse,
  GetStoryByIdRequest,
  GetStoryByIdResponse,
  GetStoryFeedRequest,
  GetStoryFeedResponse,
  Story,
  StoryBless,
  protobufPackage
};
