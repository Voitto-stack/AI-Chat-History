import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
const protobufPackage = "PostServiceProto";
var PostServiceCommonCode = /* @__PURE__ */ ((PostServiceCommonCode2) => {
  PostServiceCommonCode2[PostServiceCommonCode2["PostServiceCommonCodeNone"] = 0] = "PostServiceCommonCodeNone";
  PostServiceCommonCode2[PostServiceCommonCode2["Success"] = 1] = "Success";
  PostServiceCommonCode2[PostServiceCommonCode2["Reject"] = 2] = "Reject";
  PostServiceCommonCode2[PostServiceCommonCode2["Failed"] = 99] = "Failed";
  PostServiceCommonCode2[PostServiceCommonCode2["ERROR_BAN_WORDS"] = 100] = "ERROR_BAN_WORDS";
  PostServiceCommonCode2[PostServiceCommonCode2["ERROR_CONFLICT"] = 101] = "ERROR_CONFLICT";
  PostServiceCommonCode2[PostServiceCommonCode2["ERROR_NOT_FOUND"] = 102] = "ERROR_NOT_FOUND";
  PostServiceCommonCode2[PostServiceCommonCode2["ERROR_ALREADY_LIKED"] = 103] = "ERROR_ALREADY_LIKED";
  PostServiceCommonCode2[PostServiceCommonCode2["ERROR_NOT_LIKED"] = 104] = "ERROR_NOT_LIKED";
  PostServiceCommonCode2[PostServiceCommonCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return PostServiceCommonCode2;
})(PostServiceCommonCode || {});
function postServiceCommonCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "PostServiceCommonCodeNone":
      return 0 /* PostServiceCommonCodeNone */;
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
    case "ERROR_BAN_WORDS":
      return 100 /* ERROR_BAN_WORDS */;
    case 101:
    case "ERROR_CONFLICT":
      return 101 /* ERROR_CONFLICT */;
    case 102:
    case "ERROR_NOT_FOUND":
      return 102 /* ERROR_NOT_FOUND */;
    case 103:
    case "ERROR_ALREADY_LIKED":
      return 103 /* ERROR_ALREADY_LIKED */;
    case 104:
    case "ERROR_NOT_LIKED":
      return 104 /* ERROR_NOT_LIKED */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function postServiceCommonCodeToJSON(object) {
  switch (object) {
    case 0 /* PostServiceCommonCodeNone */:
      return "PostServiceCommonCodeNone";
    case 1 /* Success */:
      return "Success";
    case 2 /* Reject */:
      return "Reject";
    case 99 /* Failed */:
      return "Failed";
    case 100 /* ERROR_BAN_WORDS */:
      return "ERROR_BAN_WORDS";
    case 101 /* ERROR_CONFLICT */:
      return "ERROR_CONFLICT";
    case 102 /* ERROR_NOT_FOUND */:
      return "ERROR_NOT_FOUND";
    case 103 /* ERROR_ALREADY_LIKED */:
      return "ERROR_ALREADY_LIKED";
    case 104 /* ERROR_NOT_LIKED */:
      return "ERROR_NOT_LIKED";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var PostCommentType = /* @__PURE__ */ ((PostCommentType2) => {
  PostCommentType2[PostCommentType2["comment"] = 0] = "comment";
  PostCommentType2[PostCommentType2["reply"] = 1] = "reply";
  PostCommentType2[PostCommentType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return PostCommentType2;
})(PostCommentType || {});
function postCommentTypeFromJSON(object) {
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
function postCommentTypeToJSON(object) {
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
var PostCommentStatus = /* @__PURE__ */ ((PostCommentStatus2) => {
  PostCommentStatus2[PostCommentStatus2["valid"] = 0] = "valid";
  PostCommentStatus2[PostCommentStatus2["banned"] = 1] = "banned";
  PostCommentStatus2[PostCommentStatus2["deleted"] = 2] = "deleted";
  PostCommentStatus2[PostCommentStatus2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return PostCommentStatus2;
})(PostCommentStatus || {});
function postCommentStatusFromJSON(object) {
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
function postCommentStatusToJSON(object) {
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
var PostUserLocale = /* @__PURE__ */ ((PostUserLocale2) => {
  PostUserLocale2[PostUserLocale2["en"] = 0] = "en";
  PostUserLocale2[PostUserLocale2["es"] = 1] = "es";
  PostUserLocale2[PostUserLocale2["de"] = 2] = "de";
  PostUserLocale2[PostUserLocale2["id"] = 3] = "id";
  PostUserLocale2[PostUserLocale2["fil"] = 4] = "fil";
  PostUserLocale2[PostUserLocale2["it"] = 5] = "it";
  PostUserLocale2[PostUserLocale2["fr"] = 6] = "fr";
  PostUserLocale2[PostUserLocale2["pt"] = 7] = "pt";
  PostUserLocale2[PostUserLocale2["in"] = 8] = "in";
  PostUserLocale2[PostUserLocale2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return PostUserLocale2;
})(PostUserLocale || {});
function postUserLocaleFromJSON(object) {
  switch (object) {
    case 0:
    case "en":
      return 0 /* en */;
    case 1:
    case "es":
      return 1 /* es */;
    case 2:
    case "de":
      return 2 /* de */;
    case 3:
    case "id":
      return 3 /* id */;
    case 4:
    case "fil":
      return 4 /* fil */;
    case 5:
    case "it":
      return 5 /* it */;
    case 6:
    case "fr":
      return 6 /* fr */;
    case 7:
    case "pt":
      return 7 /* pt */;
    case 8:
    case "in":
      return 8 /* in */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function postUserLocaleToJSON(object) {
  switch (object) {
    case 0 /* en */:
      return "en";
    case 1 /* es */:
      return "es";
    case 2 /* de */:
      return "de";
    case 3 /* id */:
      return "id";
    case 4 /* fil */:
      return "fil";
    case 5 /* it */:
      return "it";
    case 6 /* fr */:
      return "fr";
    case 7 /* pt */:
      return "pt";
    case 8 /* in */:
      return "in";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var PostOperation = /* @__PURE__ */ ((PostOperation2) => {
  PostOperation2[PostOperation2["PostOperationNone"] = 0] = "PostOperationNone";
  PostOperation2[PostOperation2["PostLike"] = 1] = "PostLike";
  PostOperation2[PostOperation2["CommentLike"] = 2] = "CommentLike";
  PostOperation2[PostOperation2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return PostOperation2;
})(PostOperation || {});
function postOperationFromJSON(object) {
  switch (object) {
    case 0:
    case "PostOperationNone":
      return 0 /* PostOperationNone */;
    case 1:
    case "PostLike":
      return 1 /* PostLike */;
    case 2:
    case "CommentLike":
      return 2 /* CommentLike */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function postOperationToJSON(object) {
  switch (object) {
    case 0 /* PostOperationNone */:
      return "PostOperationNone";
    case 1 /* PostLike */:
      return "PostLike";
    case 2 /* CommentLike */:
      return "CommentLike";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var SortType = /* @__PURE__ */ ((SortType2) => {
  SortType2[SortType2["DEFAULT_SORT"] = 0] = "DEFAULT_SORT";
  SortType2[SortType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return SortType2;
})(SortType || {});
function sortTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "DEFAULT_SORT":
      return 0 /* DEFAULT_SORT */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function sortTypeToJSON(object) {
  switch (object) {
    case 0 /* DEFAULT_SORT */:
      return "DEFAULT_SORT";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var LikeCountType = /* @__PURE__ */ ((LikeCountType2) => {
  LikeCountType2[LikeCountType2["MALE"] = 0] = "MALE";
  LikeCountType2[LikeCountType2["FEMALE"] = 1] = "FEMALE";
  LikeCountType2[LikeCountType2["NONBINARY"] = 2] = "NONBINARY";
  LikeCountType2[LikeCountType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return LikeCountType2;
})(LikeCountType || {});
function likeCountTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "MALE":
      return 0 /* MALE */;
    case 1:
    case "FEMALE":
      return 1 /* FEMALE */;
    case 2:
    case "NONBINARY":
      return 2 /* NONBINARY */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function likeCountTypeToJSON(object) {
  switch (object) {
    case 0 /* MALE */:
      return "MALE";
    case 1 /* FEMALE */:
      return "FEMALE";
    case 2 /* NONBINARY */:
      return "NONBINARY";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var State = /* @__PURE__ */ ((State2) => {
  State2[State2["NORMAL"] = 0] = "NORMAL";
  State2[State2["BANNED"] = 1] = "BANNED";
  State2[State2["SUSPICIOUS"] = 2] = "SUSPICIOUS";
  State2[State2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return State2;
})(State || {});
function stateFromJSON(object) {
  switch (object) {
    case 0:
    case "NORMAL":
      return 0 /* NORMAL */;
    case 1:
    case "BANNED":
      return 1 /* BANNED */;
    case 2:
    case "SUSPICIOUS":
      return 2 /* SUSPICIOUS */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function stateToJSON(object) {
  switch (object) {
    case 0 /* NORMAL */:
      return "NORMAL";
    case 1 /* BANNED */:
      return "BANNED";
    case 2 /* SUSPICIOUS */:
      return "SUSPICIOUS";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var CreatePostResult = /* @__PURE__ */ ((CreatePostResult2) => {
  CreatePostResult2[CreatePostResult2["CreatePostResultCodeNone"] = 0] = "CreatePostResultCodeNone";
  CreatePostResult2[CreatePostResult2["SuccessResult"] = 1] = "SuccessResult";
  CreatePostResult2[CreatePostResult2["RepeatedInProgress"] = 2] = "RepeatedInProgress";
  CreatePostResult2[CreatePostResult2["RepeatedSuccess"] = 3] = "RepeatedSuccess";
  CreatePostResult2[CreatePostResult2["FileTypeNotSupported"] = 11] = "FileTypeNotSupported";
  CreatePostResult2[CreatePostResult2["FileSizeNotSupported"] = 12] = "FileSizeNotSupported";
  CreatePostResult2[CreatePostResult2["FileUploadFail"] = 13] = "FileUploadFail";
  CreatePostResult2[CreatePostResult2["ParameterError"] = 14] = "ParameterError";
  CreatePostResult2[CreatePostResult2["PostContentNotSafe"] = 20] = "PostContentNotSafe";
  CreatePostResult2[CreatePostResult2["PostUnknownError"] = 99] = "PostUnknownError";
  CreatePostResult2[CreatePostResult2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return CreatePostResult2;
})(CreatePostResult || {});
function createPostResultFromJSON(object) {
  switch (object) {
    case 0:
    case "CreatePostResultCodeNone":
      return 0 /* CreatePostResultCodeNone */;
    case 1:
    case "SuccessResult":
      return 1 /* SuccessResult */;
    case 2:
    case "RepeatedInProgress":
      return 2 /* RepeatedInProgress */;
    case 3:
    case "RepeatedSuccess":
      return 3 /* RepeatedSuccess */;
    case 11:
    case "FileTypeNotSupported":
      return 11 /* FileTypeNotSupported */;
    case 12:
    case "FileSizeNotSupported":
      return 12 /* FileSizeNotSupported */;
    case 13:
    case "FileUploadFail":
      return 13 /* FileUploadFail */;
    case 14:
    case "ParameterError":
      return 14 /* ParameterError */;
    case 20:
    case "PostContentNotSafe":
      return 20 /* PostContentNotSafe */;
    case 99:
    case "PostUnknownError":
      return 99 /* PostUnknownError */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function createPostResultToJSON(object) {
  switch (object) {
    case 0 /* CreatePostResultCodeNone */:
      return "CreatePostResultCodeNone";
    case 1 /* SuccessResult */:
      return "SuccessResult";
    case 2 /* RepeatedInProgress */:
      return "RepeatedInProgress";
    case 3 /* RepeatedSuccess */:
      return "RepeatedSuccess";
    case 11 /* FileTypeNotSupported */:
      return "FileTypeNotSupported";
    case 12 /* FileSizeNotSupported */:
      return "FileSizeNotSupported";
    case 13 /* FileUploadFail */:
      return "FileUploadFail";
    case 14 /* ParameterError */:
      return "ParameterError";
    case 20 /* PostContentNotSafe */:
      return "PostContentNotSafe";
    case 99 /* PostUnknownError */:
      return "PostUnknownError";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var PostReportReason = /* @__PURE__ */ ((PostReportReason2) => {
  PostReportReason2[PostReportReason2["harassment"] = 0] = "harassment";
  PostReportReason2[PostReportReason2["sexual"] = 1] = "sexual";
  PostReportReason2[PostReportReason2["violence"] = 2] = "violence";
  PostReportReason2[PostReportReason2["illegal"] = 3] = "illegal";
  PostReportReason2[PostReportReason2["underage"] = 4] = "underage";
  PostReportReason2[PostReportReason2["spam"] = 5] = "spam";
  PostReportReason2[PostReportReason2["other"] = 6] = "other";
  PostReportReason2[PostReportReason2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return PostReportReason2;
})(PostReportReason || {});
function postReportReasonFromJSON(object) {
  switch (object) {
    case 0:
    case "harassment":
      return 0 /* harassment */;
    case 1:
    case "sexual":
      return 1 /* sexual */;
    case 2:
    case "violence":
      return 2 /* violence */;
    case 3:
    case "illegal":
      return 3 /* illegal */;
    case 4:
    case "underage":
      return 4 /* underage */;
    case 5:
    case "spam":
      return 5 /* spam */;
    case 6:
    case "other":
      return 6 /* other */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function postReportReasonToJSON(object) {
  switch (object) {
    case 0 /* harassment */:
      return "harassment";
    case 1 /* sexual */:
      return "sexual";
    case 2 /* violence */:
      return "violence";
    case 3 /* illegal */:
      return "illegal";
    case 4 /* underage */:
      return "underage";
    case 5 /* spam */:
      return "spam";
    case 6 /* other */:
      return "other";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
function createBasePostComment() {
  return {
    id: 0,
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
    Lang: 0,
    PostId: 0,
    Nickname: "",
    customAvatarUrl: "",
    beautifiedAvatarUrl: ""
  };
}
const PostComment = {
  $type: "PostServiceProto.PostComment",
  encode(message, writer = new BinaryWriter()) {
    if (message.id !== void 0 && message.id !== 0) {
      writer.uint32(8).int64(message.id);
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
      PostComment.encode(message.parentComment, writer.uint32(130).fork()).join();
    }
    if (message.repliedComment !== void 0) {
      PostComment.encode(message.repliedComment, writer.uint32(138).fork()).join();
    }
    if (message.Lang !== void 0 && message.Lang !== 0) {
      writer.uint32(144).int32(message.Lang);
    }
    if (message.PostId !== void 0 && message.PostId !== 0) {
      writer.uint32(152).int64(message.PostId);
    }
    if (message.Nickname !== void 0 && message.Nickname !== "") {
      writer.uint32(162).string(message.Nickname);
    }
    if (message.customAvatarUrl !== void 0 && message.customAvatarUrl !== "") {
      writer.uint32(170).string(message.customAvatarUrl);
    }
    if (message.beautifiedAvatarUrl !== void 0 && message.beautifiedAvatarUrl !== "") {
      writer.uint32(178).string(message.beautifiedAvatarUrl);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePostComment();
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
          message.parentComment = PostComment.decode(reader, reader.uint32());
          continue;
        }
        case 17: {
          if (tag !== 138) {
            break;
          }
          message.repliedComment = PostComment.decode(reader, reader.uint32());
          continue;
        }
        case 18: {
          if (tag !== 144) {
            break;
          }
          message.Lang = reader.int32();
          continue;
        }
        case 19: {
          if (tag !== 152) {
            break;
          }
          message.PostId = longToNumber(reader.int64());
          continue;
        }
        case 20: {
          if (tag !== 162) {
            break;
          }
          message.Nickname = reader.string();
          continue;
        }
        case 21: {
          if (tag !== 170) {
            break;
          }
          message.customAvatarUrl = reader.string();
          continue;
        }
        case 22: {
          if (tag !== 178) {
            break;
          }
          message.beautifiedAvatarUrl = reader.string();
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
      parentId: isSet(object.parentId) ? globalThis.Number(object.parentId) : isSet(object.parent_id) ? globalThis.Number(object.parent_id) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      type: isSet(object.type) ? postCommentTypeFromJSON(object.type) : 0,
      replyCount: isSet(object.replyCount) ? globalThis.Number(object.replyCount) : isSet(object.reply_count) ? globalThis.Number(object.reply_count) : 0,
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      status: isSet(object.status) ? postCommentStatusFromJSON(object.status) : 0,
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : isSet(object.created_at) ? globalThis.Number(object.created_at) : 0,
      updatedAt: isSet(object.updatedAt) ? globalThis.Number(object.updatedAt) : isSet(object.updated_at) ? globalThis.Number(object.updated_at) : 0,
      deletedAt: isSet(object.deletedAt) ? globalThis.Number(object.deletedAt) : isSet(object.deleted_at) ? globalThis.Number(object.deleted_at) : 0,
      avatarUrl: isSet(object.avatarUrl) ? globalThis.String(object.avatarUrl) : isSet(object.avatar_url) ? globalThis.String(object.avatar_url) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      size: isSet(object.size) ? globalThis.Number(object.size) : 0,
      repliedId: isSet(object.repliedId) ? globalThis.Number(object.repliedId) : isSet(object.replied_id) ? globalThis.Number(object.replied_id) : 0,
      parentComment: isSet(object.parentComment) ? PostComment.fromJSON(object.parentComment) : isSet(object.parent_comment) ? PostComment.fromJSON(object.parent_comment) : void 0,
      repliedComment: isSet(object.repliedComment) ? PostComment.fromJSON(object.repliedComment) : isSet(object.replied_comment) ? PostComment.fromJSON(object.replied_comment) : void 0,
      Lang: isSet(object.Lang) ? postUserLocaleFromJSON(object.Lang) : 0,
      PostId: isSet(object.PostId) ? globalThis.Number(object.PostId) : isSet(object.Post_id) ? globalThis.Number(object.Post_id) : 0,
      Nickname: isSet(object.Nickname) ? globalThis.String(object.Nickname) : "",
      customAvatarUrl: isSet(object.customAvatarUrl) ? globalThis.String(object.customAvatarUrl) : isSet(object.custom_avatar_url) ? globalThis.String(object.custom_avatar_url) : "",
      beautifiedAvatarUrl: isSet(object.beautifiedAvatarUrl) ? globalThis.String(object.beautifiedAvatarUrl) : isSet(object.beautified_avatar_url) ? globalThis.String(object.beautified_avatar_url) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.id !== void 0 && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.parentId !== void 0 && message.parentId !== 0) {
      obj.parentId = Math.round(message.parentId);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.type !== void 0 && message.type !== 0) {
      obj.type = postCommentTypeToJSON(message.type);
    }
    if (message.replyCount !== void 0 && message.replyCount !== 0) {
      obj.replyCount = Math.round(message.replyCount);
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    if (message.status !== void 0 && message.status !== 0) {
      obj.status = postCommentStatusToJSON(message.status);
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
      obj.parentComment = PostComment.toJSON(message.parentComment);
    }
    if (message.repliedComment !== void 0) {
      obj.repliedComment = PostComment.toJSON(message.repliedComment);
    }
    if (message.Lang !== void 0 && message.Lang !== 0) {
      obj.Lang = postUserLocaleToJSON(message.Lang);
    }
    if (message.PostId !== void 0 && message.PostId !== 0) {
      obj.PostId = Math.round(message.PostId);
    }
    if (message.Nickname !== void 0 && message.Nickname !== "") {
      obj.Nickname = message.Nickname;
    }
    if (message.customAvatarUrl !== void 0 && message.customAvatarUrl !== "") {
      obj.customAvatarUrl = message.customAvatarUrl;
    }
    if (message.beautifiedAvatarUrl !== void 0 && message.beautifiedAvatarUrl !== "") {
      obj.beautifiedAvatarUrl = message.beautifiedAvatarUrl;
    }
    return obj;
  },
  create(base) {
    return PostComment.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePostComment();
    message.id = object.id ?? 0;
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
    message.parentComment = object.parentComment !== void 0 && object.parentComment !== null ? PostComment.fromPartial(object.parentComment) : void 0;
    message.repliedComment = object.repliedComment !== void 0 && object.repliedComment !== null ? PostComment.fromPartial(object.repliedComment) : void 0;
    message.Lang = object.Lang ?? 0;
    message.PostId = object.PostId ?? 0;
    message.Nickname = object.Nickname ?? "";
    message.customAvatarUrl = object.customAvatarUrl ?? "";
    message.beautifiedAvatarUrl = object.beautifiedAvatarUrl ?? "";
    return message;
  }
};
function createBaseCreatePostCommentRequest() {
  return { postId: 0, parentId: 0, replyId: 0, content: "", type: 0, fakeUserId: 0, fakeDelayTimeSec: 0 };
}
const CreatePostCommentRequest = {
  $type: "PostServiceProto.CreatePostCommentRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.parentId !== void 0 && message.parentId !== 0) {
      writer.uint32(16).int64(message.parentId);
    }
    if (message.replyId !== void 0 && message.replyId !== 0) {
      writer.uint32(24).int64(message.replyId);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(34).string(message.content);
    }
    if (message.type !== void 0 && message.type !== 0) {
      writer.uint32(40).int32(message.type);
    }
    if (message.fakeUserId !== void 0 && message.fakeUserId !== 0) {
      writer.uint32(48).int32(message.fakeUserId);
    }
    if (message.fakeDelayTimeSec !== void 0 && message.fakeDelayTimeSec !== 0) {
      writer.uint32(56).int32(message.fakeDelayTimeSec);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreatePostCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.parentId = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.replyId = longToNumber(reader.int64());
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
          message.type = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.fakeUserId = reader.int32();
          continue;
        }
        case 7: {
          if (tag !== 56) {
            break;
          }
          message.fakeDelayTimeSec = reader.int32();
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      parentId: isSet(object.parentId) ? globalThis.Number(object.parentId) : isSet(object.parent_id) ? globalThis.Number(object.parent_id) : 0,
      replyId: isSet(object.replyId) ? globalThis.Number(object.replyId) : isSet(object.reply_id) ? globalThis.Number(object.reply_id) : 0,
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      type: isSet(object.type) ? postCommentTypeFromJSON(object.type) : 0,
      fakeUserId: isSet(object.fakeUserId) ? globalThis.Number(object.fakeUserId) : isSet(object.fake_user_id) ? globalThis.Number(object.fake_user_id) : 0,
      fakeDelayTimeSec: isSet(object.fakeDelayTimeSec) ? globalThis.Number(object.fakeDelayTimeSec) : isSet(object.fake_delay_time_sec) ? globalThis.Number(object.fake_delay_time_sec) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
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
    if (message.type !== void 0 && message.type !== 0) {
      obj.type = postCommentTypeToJSON(message.type);
    }
    if (message.fakeUserId !== void 0 && message.fakeUserId !== 0) {
      obj.fakeUserId = Math.round(message.fakeUserId);
    }
    if (message.fakeDelayTimeSec !== void 0 && message.fakeDelayTimeSec !== 0) {
      obj.fakeDelayTimeSec = Math.round(message.fakeDelayTimeSec);
    }
    return obj;
  },
  create(base) {
    return CreatePostCommentRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreatePostCommentRequest();
    message.postId = object.postId ?? 0;
    message.parentId = object.parentId ?? 0;
    message.replyId = object.replyId ?? 0;
    message.content = object.content ?? "";
    message.type = object.type ?? 0;
    message.fakeUserId = object.fakeUserId ?? 0;
    message.fakeDelayTimeSec = object.fakeDelayTimeSec ?? 0;
    return message;
  }
};
function createBaseCreatePostCommentResponse() {
  return { code: 0, comment: void 0, message: "" };
}
const CreatePostCommentResponse = {
  $type: "PostServiceProto.CreatePostCommentResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.comment !== void 0) {
      PostComment.encode(message.comment, writer.uint32(18).fork()).join();
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreatePostCommentResponse();
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
          message.comment = PostComment.decode(reader, reader.uint32());
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      comment: isSet(object.comment) ? PostComment.fromJSON(object.comment) : void 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.comment !== void 0) {
      obj.comment = PostComment.toJSON(message.comment);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return CreatePostCommentResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreatePostCommentResponse();
    message.code = object.code ?? 0;
    message.comment = object.comment !== void 0 && object.comment !== null ? PostComment.fromPartial(object.comment) : void 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetPostCommentsRequest() {
  return { postId: 0, commentIdOffset: 0, limit: 0 };
}
const GetPostCommentsRequest = {
  $type: "PostServiceProto.GetPostCommentsRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
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
    const message = createBaseGetPostCommentsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      commentIdOffset: isSet(object.commentIdOffset) ? globalThis.Number(object.commentIdOffset) : isSet(object.comment_id_offset) ? globalThis.Number(object.comment_id_offset) : 0,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
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
    return GetPostCommentsRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetPostCommentsRequest();
    message.postId = object.postId ?? 0;
    message.commentIdOffset = object.commentIdOffset ?? 0;
    message.limit = object.limit ?? 0;
    return message;
  }
};
function createBaseGetPostCommentsResponse() {
  return { code: 0, comments: [], hasMore: false, commentCount: 0, message: "" };
}
const GetPostCommentsResponse = {
  $type: "PostServiceProto.GetPostCommentsResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.comments !== void 0 && message.comments.length !== 0) {
      for (const v of message.comments) {
        PostComment.encode(v, writer.uint32(18).fork()).join();
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
    const message = createBaseGetPostCommentsResponse();
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
          const el = PostComment.decode(reader, reader.uint32());
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      comments: globalThis.Array.isArray(object?.comments) ? object.comments.map((e) => PostComment.fromJSON(e)) : [],
      hasMore: isSet(object.hasMore) ? globalThis.Boolean(object.hasMore) : isSet(object.has_more) ? globalThis.Boolean(object.has_more) : false,
      commentCount: isSet(object.commentCount) ? globalThis.Number(object.commentCount) : isSet(object.comment_count) ? globalThis.Number(object.comment_count) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.comments?.length) {
      obj.comments = message.comments.map((e) => PostComment.toJSON(e));
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
    return GetPostCommentsResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetPostCommentsResponse();
    message.code = object.code ?? 0;
    message.comments = object.comments?.map((e) => PostComment.fromPartial(e)) || [];
    message.hasMore = object.hasMore ?? false;
    message.commentCount = object.commentCount ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetReplyPostCommentsRequest() {
  return { postId: 0, commentId: 0, commentIdOffset: 0, limit: 0 };
}
const GetReplyPostCommentsRequest = {
  $type: "PostServiceProto.GetReplyPostCommentsRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.commentId !== void 0 && message.commentId !== 0) {
      writer.uint32(16).int64(message.commentId);
    }
    if (message.commentIdOffset !== void 0 && message.commentIdOffset !== 0) {
      writer.uint32(24).int64(message.commentIdOffset);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      writer.uint32(32).int32(message.limit);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetReplyPostCommentsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.commentId = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.commentIdOffset = longToNumber(reader.int64());
          continue;
        }
        case 4: {
          if (tag !== 32) {
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      commentId: isSet(object.commentId) ? globalThis.Number(object.commentId) : isSet(object.comment_id) ? globalThis.Number(object.comment_id) : 0,
      commentIdOffset: isSet(object.commentIdOffset) ? globalThis.Number(object.commentIdOffset) : isSet(object.comment_id_offset) ? globalThis.Number(object.comment_id_offset) : 0,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
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
    return GetReplyPostCommentsRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetReplyPostCommentsRequest();
    message.postId = object.postId ?? 0;
    message.commentId = object.commentId ?? 0;
    message.commentIdOffset = object.commentIdOffset ?? 0;
    message.limit = object.limit ?? 0;
    return message;
  }
};
function createBaseGetReplyPostCommentsResponse() {
  return { code: 0, comments: [], hasMore: false, commentCount: 0, message: "" };
}
const GetReplyPostCommentsResponse = {
  $type: "PostServiceProto.GetReplyPostCommentsResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.comments !== void 0 && message.comments.length !== 0) {
      for (const v of message.comments) {
        PostComment.encode(v, writer.uint32(18).fork()).join();
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
    const message = createBaseGetReplyPostCommentsResponse();
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
          const el = PostComment.decode(reader, reader.uint32());
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      comments: globalThis.Array.isArray(object?.comments) ? object.comments.map((e) => PostComment.fromJSON(e)) : [],
      hasMore: isSet(object.hasMore) ? globalThis.Boolean(object.hasMore) : isSet(object.has_more) ? globalThis.Boolean(object.has_more) : false,
      commentCount: isSet(object.commentCount) ? globalThis.Number(object.commentCount) : isSet(object.comment_count) ? globalThis.Number(object.comment_count) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.comments?.length) {
      obj.comments = message.comments.map((e) => PostComment.toJSON(e));
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
    return GetReplyPostCommentsResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetReplyPostCommentsResponse();
    message.code = object.code ?? 0;
    message.comments = object.comments?.map((e) => PostComment.fromPartial(e)) || [];
    message.hasMore = object.hasMore ?? false;
    message.commentCount = object.commentCount ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseUpdatePostCommentRequest() {
  return { postId: 0, commentId: 0, content: "" };
}
const UpdatePostCommentRequest = {
  $type: "PostServiceProto.UpdatePostCommentRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.commentId !== void 0 && message.commentId !== 0) {
      writer.uint32(16).int64(message.commentId);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUpdatePostCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.commentId = longToNumber(reader.int64());
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      commentId: isSet(object.commentId) ? globalThis.Number(object.commentId) : isSet(object.comment_id) ? globalThis.Number(object.comment_id) : 0,
      content: isSet(object.content) ? globalThis.String(object.content) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    if (message.commentId !== void 0 && message.commentId !== 0) {
      obj.commentId = Math.round(message.commentId);
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    return obj;
  },
  create(base) {
    return UpdatePostCommentRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUpdatePostCommentRequest();
    message.postId = object.postId ?? 0;
    message.commentId = object.commentId ?? 0;
    message.content = object.content ?? "";
    return message;
  }
};
function createBaseUpdatePostCommentResponse() {
  return { code: 0, comment: void 0, message: "" };
}
const UpdatePostCommentResponse = {
  $type: "PostServiceProto.UpdatePostCommentResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.comment !== void 0) {
      PostComment.encode(message.comment, writer.uint32(18).fork()).join();
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUpdatePostCommentResponse();
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
          message.comment = PostComment.decode(reader, reader.uint32());
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
      code: isSet(object.code) ? postServiceCommonCodeFromJSON(object.code) : 0,
      comment: isSet(object.comment) ? PostComment.fromJSON(object.comment) : void 0,
      message: isSet(object.message) ? globalThis.String(object.message) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.comment !== void 0) {
      obj.comment = PostComment.toJSON(message.comment);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
  create(base) {
    return UpdatePostCommentResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUpdatePostCommentResponse();
    message.code = object.code ?? 0;
    message.comment = object.comment !== void 0 && object.comment !== null ? PostComment.fromPartial(object.comment) : void 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseDeletePostCommentRequest() {
  return { postId: 0, commentId: 0, fakeUserId: 0 };
}
const DeletePostCommentRequest = {
  $type: "PostServiceProto.DeletePostCommentRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.commentId !== void 0 && message.commentId !== 0) {
      writer.uint32(16).int64(message.commentId);
    }
    if (message.fakeUserId !== void 0 && message.fakeUserId !== 0) {
      writer.uint32(24).int32(message.fakeUserId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDeletePostCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.commentId = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.fakeUserId = reader.int32();
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      commentId: isSet(object.commentId) ? globalThis.Number(object.commentId) : isSet(object.comment_id) ? globalThis.Number(object.comment_id) : 0,
      fakeUserId: isSet(object.fakeUserId) ? globalThis.Number(object.fakeUserId) : isSet(object.fake_user_id) ? globalThis.Number(object.fake_user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    if (message.commentId !== void 0 && message.commentId !== 0) {
      obj.commentId = Math.round(message.commentId);
    }
    if (message.fakeUserId !== void 0 && message.fakeUserId !== 0) {
      obj.fakeUserId = Math.round(message.fakeUserId);
    }
    return obj;
  },
  create(base) {
    return DeletePostCommentRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseDeletePostCommentRequest();
    message.postId = object.postId ?? 0;
    message.commentId = object.commentId ?? 0;
    message.fakeUserId = object.fakeUserId ?? 0;
    return message;
  }
};
function createBaseDeletePostCommentResponse() {
  return { code: 0, message: "" };
}
const DeletePostCommentResponse = {
  $type: "PostServiceProto.DeletePostCommentResponse",
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
    const message = createBaseDeletePostCommentResponse();
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
    return DeletePostCommentResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseDeletePostCommentResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseLikePostRequest() {
  return { postId: 0, fakeUserId: 0, fakeDelayTimeSec: 0 };
}
const LikePostRequest = {
  $type: "PostServiceProto.LikePostRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.fakeUserId !== void 0 && message.fakeUserId !== 0) {
      writer.uint32(16).int32(message.fakeUserId);
    }
    if (message.fakeDelayTimeSec !== void 0 && message.fakeDelayTimeSec !== 0) {
      writer.uint32(24).int32(message.fakeDelayTimeSec);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLikePostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.fakeUserId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.fakeDelayTimeSec = reader.int32();
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      fakeUserId: isSet(object.fakeUserId) ? globalThis.Number(object.fakeUserId) : isSet(object.fake_user_id) ? globalThis.Number(object.fake_user_id) : 0,
      fakeDelayTimeSec: isSet(object.fakeDelayTimeSec) ? globalThis.Number(object.fakeDelayTimeSec) : isSet(object.fake_delay_time_sec) ? globalThis.Number(object.fake_delay_time_sec) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    if (message.fakeUserId !== void 0 && message.fakeUserId !== 0) {
      obj.fakeUserId = Math.round(message.fakeUserId);
    }
    if (message.fakeDelayTimeSec !== void 0 && message.fakeDelayTimeSec !== 0) {
      obj.fakeDelayTimeSec = Math.round(message.fakeDelayTimeSec);
    }
    return obj;
  },
  create(base) {
    return LikePostRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseLikePostRequest();
    message.postId = object.postId ?? 0;
    message.fakeUserId = object.fakeUserId ?? 0;
    message.fakeDelayTimeSec = object.fakeDelayTimeSec ?? 0;
    return message;
  }
};
function createBaseLikePostResponse() {
  return { code: 0, message: "", likeCount: 0 };
}
const LikePostResponse = {
  $type: "PostServiceProto.LikePostResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.likeCount !== void 0 && message.likeCount !== 0) {
      writer.uint32(24).int32(message.likeCount);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseLikePostResponse();
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
          message.likeCount = reader.int32();
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
      likeCount: isSet(object.likeCount) ? globalThis.Number(object.likeCount) : isSet(object.like_count) ? globalThis.Number(object.like_count) : 0
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
    if (message.likeCount !== void 0 && message.likeCount !== 0) {
      obj.likeCount = Math.round(message.likeCount);
    }
    return obj;
  },
  create(base) {
    return LikePostResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseLikePostResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.likeCount = object.likeCount ?? 0;
    return message;
  }
};
function createBaseUnlikePostRequest() {
  return { postId: 0, fakeUserId: 0, fakeDelayTimeSec: 0 };
}
const UnlikePostRequest = {
  $type: "PostServiceProto.UnlikePostRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.fakeUserId !== void 0 && message.fakeUserId !== 0) {
      writer.uint32(16).int32(message.fakeUserId);
    }
    if (message.fakeDelayTimeSec !== void 0 && message.fakeDelayTimeSec !== 0) {
      writer.uint32(24).int32(message.fakeDelayTimeSec);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUnlikePostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.fakeUserId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.fakeDelayTimeSec = reader.int32();
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      fakeUserId: isSet(object.fakeUserId) ? globalThis.Number(object.fakeUserId) : isSet(object.fake_user_id) ? globalThis.Number(object.fake_user_id) : 0,
      fakeDelayTimeSec: isSet(object.fakeDelayTimeSec) ? globalThis.Number(object.fakeDelayTimeSec) : isSet(object.fake_delay_time_sec) ? globalThis.Number(object.fake_delay_time_sec) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    if (message.fakeUserId !== void 0 && message.fakeUserId !== 0) {
      obj.fakeUserId = Math.round(message.fakeUserId);
    }
    if (message.fakeDelayTimeSec !== void 0 && message.fakeDelayTimeSec !== 0) {
      obj.fakeDelayTimeSec = Math.round(message.fakeDelayTimeSec);
    }
    return obj;
  },
  create(base) {
    return UnlikePostRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUnlikePostRequest();
    message.postId = object.postId ?? 0;
    message.fakeUserId = object.fakeUserId ?? 0;
    message.fakeDelayTimeSec = object.fakeDelayTimeSec ?? 0;
    return message;
  }
};
function createBaseUnlikePostResponse() {
  return { code: 0, message: "", likeCount: 0 };
}
const UnlikePostResponse = {
  $type: "PostServiceProto.UnlikePostResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.likeCount !== void 0 && message.likeCount !== 0) {
      writer.uint32(24).int32(message.likeCount);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseUnlikePostResponse();
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
          message.likeCount = reader.int32();
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
      likeCount: isSet(object.likeCount) ? globalThis.Number(object.likeCount) : isSet(object.like_count) ? globalThis.Number(object.like_count) : 0
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
    if (message.likeCount !== void 0 && message.likeCount !== 0) {
      obj.likeCount = Math.round(message.likeCount);
    }
    return obj;
  },
  create(base) {
    return UnlikePostResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseUnlikePostResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.likeCount = object.likeCount ?? 0;
    return message;
  }
};
function createBasePost() {
  return {
    id: 0,
    authorId: 0,
    likeCount: 0,
    pictures: [],
    content: "",
    isLiked: false,
    authorAvatar: "",
    authorName: "",
    score: 0,
    isPinned: false,
    commentCount: 0,
    bannedAt: 0,
    deletedAt: 0,
    createdAt: 0,
    partialBannedAt: 0,
    userId: 0,
    isDigitalHuman: false,
    botId: ""
  };
}
const Post = {
  $type: "PostServiceProto.Post",
  encode(message, writer = new BinaryWriter()) {
    if (message.id !== void 0 && message.id !== 0) {
      writer.uint32(8).int64(message.id);
    }
    if (message.authorId !== void 0 && message.authorId !== 0) {
      writer.uint32(16).int32(message.authorId);
    }
    if (message.likeCount !== void 0 && message.likeCount !== 0) {
      writer.uint32(24).int32(message.likeCount);
    }
    if (message.pictures !== void 0 && message.pictures.length !== 0) {
      for (const v of message.pictures) {
        PostPictureInQuery.encode(v, writer.uint32(34).fork()).join();
      }
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(42).string(message.content);
    }
    if (message.isLiked !== void 0 && message.isLiked !== false) {
      writer.uint32(48).bool(message.isLiked);
    }
    if (message.authorAvatar !== void 0 && message.authorAvatar !== "") {
      writer.uint32(58).string(message.authorAvatar);
    }
    if (message.authorName !== void 0 && message.authorName !== "") {
      writer.uint32(66).string(message.authorName);
    }
    if (message.score !== void 0 && message.score !== 0) {
      writer.uint32(73).double(message.score);
    }
    if (message.isPinned !== void 0 && message.isPinned !== false) {
      writer.uint32(80).bool(message.isPinned);
    }
    if (message.commentCount !== void 0 && message.commentCount !== 0) {
      writer.uint32(88).int32(message.commentCount);
    }
    if (message.bannedAt !== void 0 && message.bannedAt !== 0) {
      writer.uint32(96).int64(message.bannedAt);
    }
    if (message.deletedAt !== void 0 && message.deletedAt !== 0) {
      writer.uint32(104).int64(message.deletedAt);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      writer.uint32(112).int64(message.createdAt);
    }
    if (message.partialBannedAt !== void 0 && message.partialBannedAt !== 0) {
      writer.uint32(120).int64(message.partialBannedAt);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(128).int32(message.userId);
    }
    if (message.isDigitalHuman !== void 0 && message.isDigitalHuman !== false) {
      writer.uint32(136).bool(message.isDigitalHuman);
    }
    if (message.botId !== void 0 && message.botId !== "") {
      writer.uint32(146).string(message.botId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePost();
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
          message.authorId = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.likeCount = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          const el = PostPictureInQuery.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.pictures.push(el);
          }
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
          message.isLiked = reader.bool();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }
          message.authorAvatar = reader.string();
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }
          message.authorName = reader.string();
          continue;
        }
        case 9: {
          if (tag !== 73) {
            break;
          }
          message.score = reader.double();
          continue;
        }
        case 10: {
          if (tag !== 80) {
            break;
          }
          message.isPinned = reader.bool();
          continue;
        }
        case 11: {
          if (tag !== 88) {
            break;
          }
          message.commentCount = reader.int32();
          continue;
        }
        case 12: {
          if (tag !== 96) {
            break;
          }
          message.bannedAt = longToNumber(reader.int64());
          continue;
        }
        case 13: {
          if (tag !== 104) {
            break;
          }
          message.deletedAt = longToNumber(reader.int64());
          continue;
        }
        case 14: {
          if (tag !== 112) {
            break;
          }
          message.createdAt = longToNumber(reader.int64());
          continue;
        }
        case 15: {
          if (tag !== 120) {
            break;
          }
          message.partialBannedAt = longToNumber(reader.int64());
          continue;
        }
        case 16: {
          if (tag !== 128) {
            break;
          }
          message.userId = reader.int32();
          continue;
        }
        case 17: {
          if (tag !== 136) {
            break;
          }
          message.isDigitalHuman = reader.bool();
          continue;
        }
        case 18: {
          if (tag !== 146) {
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
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      authorId: isSet(object.authorId) ? globalThis.Number(object.authorId) : isSet(object.author_id) ? globalThis.Number(object.author_id) : 0,
      likeCount: isSet(object.likeCount) ? globalThis.Number(object.likeCount) : isSet(object.like_count) ? globalThis.Number(object.like_count) : 0,
      pictures: globalThis.Array.isArray(object?.pictures) ? object.pictures.map((e) => PostPictureInQuery.fromJSON(e)) : [],
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      isLiked: isSet(object.isLiked) ? globalThis.Boolean(object.isLiked) : isSet(object.is_liked) ? globalThis.Boolean(object.is_liked) : false,
      authorAvatar: isSet(object.authorAvatar) ? globalThis.String(object.authorAvatar) : isSet(object.author_avatar) ? globalThis.String(object.author_avatar) : "",
      authorName: isSet(object.authorName) ? globalThis.String(object.authorName) : isSet(object.author_name) ? globalThis.String(object.author_name) : "",
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
      isPinned: isSet(object.isPinned) ? globalThis.Boolean(object.isPinned) : isSet(object.is_pinned) ? globalThis.Boolean(object.is_pinned) : false,
      commentCount: isSet(object.commentCount) ? globalThis.Number(object.commentCount) : isSet(object.comment_count) ? globalThis.Number(object.comment_count) : 0,
      bannedAt: isSet(object.bannedAt) ? globalThis.Number(object.bannedAt) : isSet(object.banned_at) ? globalThis.Number(object.banned_at) : 0,
      deletedAt: isSet(object.deletedAt) ? globalThis.Number(object.deletedAt) : isSet(object.deleted_at) ? globalThis.Number(object.deleted_at) : 0,
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : isSet(object.created_at) ? globalThis.Number(object.created_at) : 0,
      partialBannedAt: isSet(object.partialBannedAt) ? globalThis.Number(object.partialBannedAt) : isSet(object.partial_banned_at) ? globalThis.Number(object.partial_banned_at) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      isDigitalHuman: isSet(object.isDigitalHuman) ? globalThis.Boolean(object.isDigitalHuman) : isSet(object.is_digital_human) ? globalThis.Boolean(object.is_digital_human) : false,
      botId: isSet(object.botId) ? globalThis.String(object.botId) : isSet(object.bot_id) ? globalThis.String(object.bot_id) : ""
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.id !== void 0 && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.authorId !== void 0 && message.authorId !== 0) {
      obj.authorId = Math.round(message.authorId);
    }
    if (message.likeCount !== void 0 && message.likeCount !== 0) {
      obj.likeCount = Math.round(message.likeCount);
    }
    if (message.pictures?.length) {
      obj.pictures = message.pictures.map((e) => PostPictureInQuery.toJSON(e));
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    if (message.isLiked !== void 0 && message.isLiked !== false) {
      obj.isLiked = message.isLiked;
    }
    if (message.authorAvatar !== void 0 && message.authorAvatar !== "") {
      obj.authorAvatar = message.authorAvatar;
    }
    if (message.authorName !== void 0 && message.authorName !== "") {
      obj.authorName = message.authorName;
    }
    if (message.score !== void 0 && message.score !== 0) {
      obj.score = message.score;
    }
    if (message.isPinned !== void 0 && message.isPinned !== false) {
      obj.isPinned = message.isPinned;
    }
    if (message.commentCount !== void 0 && message.commentCount !== 0) {
      obj.commentCount = Math.round(message.commentCount);
    }
    if (message.bannedAt !== void 0 && message.bannedAt !== 0) {
      obj.bannedAt = Math.round(message.bannedAt);
    }
    if (message.deletedAt !== void 0 && message.deletedAt !== 0) {
      obj.deletedAt = Math.round(message.deletedAt);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    if (message.partialBannedAt !== void 0 && message.partialBannedAt !== 0) {
      obj.partialBannedAt = Math.round(message.partialBannedAt);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.isDigitalHuman !== void 0 && message.isDigitalHuman !== false) {
      obj.isDigitalHuman = message.isDigitalHuman;
    }
    if (message.botId !== void 0 && message.botId !== "") {
      obj.botId = message.botId;
    }
    return obj;
  },
  create(base) {
    return Post.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePost();
    message.id = object.id ?? 0;
    message.authorId = object.authorId ?? 0;
    message.likeCount = object.likeCount ?? 0;
    message.pictures = object.pictures?.map((e) => PostPictureInQuery.fromPartial(e)) || [];
    message.content = object.content ?? "";
    message.isLiked = object.isLiked ?? false;
    message.authorAvatar = object.authorAvatar ?? "";
    message.authorName = object.authorName ?? "";
    message.score = object.score ?? 0;
    message.isPinned = object.isPinned ?? false;
    message.commentCount = object.commentCount ?? 0;
    message.bannedAt = object.bannedAt ?? 0;
    message.deletedAt = object.deletedAt ?? 0;
    message.createdAt = object.createdAt ?? 0;
    message.partialBannedAt = object.partialBannedAt ?? 0;
    message.userId = object.userId ?? 0;
    message.isDigitalHuman = object.isDigitalHuman ?? false;
    message.botId = object.botId ?? "";
    return message;
  }
};
function createBaseCreatePostRequest() {
  return { clientToken: "", content: "", pictures: [], isPrivate: false };
}
const CreatePostRequest = {
  $type: "PostServiceProto.CreatePostRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.clientToken !== void 0 && message.clientToken !== "") {
      writer.uint32(10).string(message.clientToken);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    if (message.pictures !== void 0 && message.pictures.length !== 0) {
      for (const v of message.pictures) {
        PostPicture.encode(v, writer.uint32(26).fork()).join();
      }
    }
    if (message.isPrivate !== void 0 && message.isPrivate !== false) {
      writer.uint32(32).bool(message.isPrivate);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreatePostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.clientToken = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.content = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          const el = PostPicture.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.pictures.push(el);
          }
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.isPrivate = reader.bool();
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
      clientToken: isSet(object.clientToken) ? globalThis.String(object.clientToken) : isSet(object.client_token) ? globalThis.String(object.client_token) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      pictures: globalThis.Array.isArray(object?.pictures) ? object.pictures.map((e) => PostPicture.fromJSON(e)) : [],
      isPrivate: isSet(object.isPrivate) ? globalThis.Boolean(object.isPrivate) : false
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.clientToken !== void 0 && message.clientToken !== "") {
      obj.clientToken = message.clientToken;
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    if (message.pictures?.length) {
      obj.pictures = message.pictures.map((e) => PostPicture.toJSON(e));
    }
    if (message.isPrivate !== void 0 && message.isPrivate !== false) {
      obj.isPrivate = message.isPrivate;
    }
    return obj;
  },
  create(base) {
    return CreatePostRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreatePostRequest();
    message.clientToken = object.clientToken ?? "";
    message.content = object.content ?? "";
    message.pictures = object.pictures?.map((e) => PostPicture.fromPartial(e)) || [];
    message.isPrivate = object.isPrivate ?? false;
    return message;
  }
};
function createBasePostPicture() {
  return { name: "", file: new Uint8Array(0) };
}
const PostPicture = {
  $type: "PostServiceProto.PostPicture",
  encode(message, writer = new BinaryWriter()) {
    if (message.name !== void 0 && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.file !== void 0 && message.file.length !== 0) {
      writer.uint32(18).bytes(message.file);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePostPicture();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.name = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.file = reader.bytes();
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
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      file: isSet(object.file) ? bytesFromBase64(object.file) : new Uint8Array(0)
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.name !== void 0 && message.name !== "") {
      obj.name = message.name;
    }
    if (message.file !== void 0 && message.file.length !== 0) {
      obj.file = base64FromBytes(message.file);
    }
    return obj;
  },
  create(base) {
    return PostPicture.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePostPicture();
    message.name = object.name ?? "";
    message.file = object.file ?? new Uint8Array(0);
    return message;
  }
};
function createBaseCreatePostResponse() {
  return { code: 0, postId: 0, message: "", Post: void 0 };
}
const CreatePostResponse = {
  $type: "PostServiceProto.CreatePostResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(16).int64(message.postId);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    if (message.Post !== void 0) {
      Post.encode(message.Post, writer.uint32(34).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseCreatePostResponse();
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
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.message = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.Post = Post.decode(reader, reader.uint32());
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
      Post: isSet(object.Post) ? Post.fromJSON(object.Post) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = createPostResultToJSON(message.code);
    }
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    if (message.message !== void 0 && message.message !== "") {
      obj.message = message.message;
    }
    if (message.Post !== void 0) {
      obj.Post = Post.toJSON(message.Post);
    }
    return obj;
  },
  create(base) {
    return CreatePostResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseCreatePostResponse();
    message.code = object.code ?? 0;
    message.postId = object.postId ?? 0;
    message.message = object.message ?? "";
    message.Post = object.Post !== void 0 && object.Post !== null ? Post.fromPartial(object.Post) : void 0;
    return message;
  }
};
function createBasePostPictureInQuery() {
  return {
    url: "",
    width: 0,
    height: 0,
    minUrl: "",
    minWidth: 0,
    minHeight: 0,
    midUrl: "",
    midWidth: 0,
    midHeight: 0,
    state: 0
  };
}
const PostPictureInQuery = {
  $type: "PostServiceProto.PostPictureInQuery",
  encode(message, writer = new BinaryWriter()) {
    if (message.url !== void 0 && message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.width !== void 0 && message.width !== 0) {
      writer.uint32(16).int32(message.width);
    }
    if (message.height !== void 0 && message.height !== 0) {
      writer.uint32(24).int32(message.height);
    }
    if (message.minUrl !== void 0 && message.minUrl !== "") {
      writer.uint32(34).string(message.minUrl);
    }
    if (message.minWidth !== void 0 && message.minWidth !== 0) {
      writer.uint32(40).int32(message.minWidth);
    }
    if (message.minHeight !== void 0 && message.minHeight !== 0) {
      writer.uint32(48).int32(message.minHeight);
    }
    if (message.midUrl !== void 0 && message.midUrl !== "") {
      writer.uint32(58).string(message.midUrl);
    }
    if (message.midWidth !== void 0 && message.midWidth !== 0) {
      writer.uint32(64).int32(message.midWidth);
    }
    if (message.midHeight !== void 0 && message.midHeight !== 0) {
      writer.uint32(72).int32(message.midHeight);
    }
    if (message.state !== void 0 && message.state !== 0) {
      writer.uint32(160).int32(message.state);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePostPictureInQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.url = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.width = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.height = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }
          message.minUrl = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.minWidth = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
            break;
          }
          message.minHeight = reader.int32();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }
          message.midUrl = reader.string();
          continue;
        }
        case 8: {
          if (tag !== 64) {
            break;
          }
          message.midWidth = reader.int32();
          continue;
        }
        case 9: {
          if (tag !== 72) {
            break;
          }
          message.midHeight = reader.int32();
          continue;
        }
        case 20: {
          if (tag !== 160) {
            break;
          }
          message.state = reader.int32();
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
      url: isSet(object.url) ? globalThis.String(object.url) : "",
      width: isSet(object.width) ? globalThis.Number(object.width) : 0,
      height: isSet(object.height) ? globalThis.Number(object.height) : 0,
      minUrl: isSet(object.minUrl) ? globalThis.String(object.minUrl) : "",
      minWidth: isSet(object.minWidth) ? globalThis.Number(object.minWidth) : isSet(object.min_width) ? globalThis.Number(object.min_width) : 0,
      minHeight: isSet(object.minHeight) ? globalThis.Number(object.minHeight) : isSet(object.min_height) ? globalThis.Number(object.min_height) : 0,
      midUrl: isSet(object.midUrl) ? globalThis.String(object.midUrl) : isSet(object.mid_url) ? globalThis.String(object.mid_url) : "",
      midWidth: isSet(object.midWidth) ? globalThis.Number(object.midWidth) : isSet(object.mid_width) ? globalThis.Number(object.mid_width) : 0,
      midHeight: isSet(object.midHeight) ? globalThis.Number(object.midHeight) : isSet(object.mid_height) ? globalThis.Number(object.mid_height) : 0,
      state: isSet(object.state) ? stateFromJSON(object.state) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.url !== void 0 && message.url !== "") {
      obj.url = message.url;
    }
    if (message.width !== void 0 && message.width !== 0) {
      obj.width = Math.round(message.width);
    }
    if (message.height !== void 0 && message.height !== 0) {
      obj.height = Math.round(message.height);
    }
    if (message.minUrl !== void 0 && message.minUrl !== "") {
      obj.minUrl = message.minUrl;
    }
    if (message.minWidth !== void 0 && message.minWidth !== 0) {
      obj.minWidth = Math.round(message.minWidth);
    }
    if (message.minHeight !== void 0 && message.minHeight !== 0) {
      obj.minHeight = Math.round(message.minHeight);
    }
    if (message.midUrl !== void 0 && message.midUrl !== "") {
      obj.midUrl = message.midUrl;
    }
    if (message.midWidth !== void 0 && message.midWidth !== 0) {
      obj.midWidth = Math.round(message.midWidth);
    }
    if (message.midHeight !== void 0 && message.midHeight !== 0) {
      obj.midHeight = Math.round(message.midHeight);
    }
    if (message.state !== void 0 && message.state !== 0) {
      obj.state = stateToJSON(message.state);
    }
    return obj;
  },
  create(base) {
    return PostPictureInQuery.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePostPictureInQuery();
    message.url = object.url ?? "";
    message.width = object.width ?? 0;
    message.height = object.height ?? 0;
    message.minUrl = object.minUrl ?? "";
    message.minWidth = object.minWidth ?? 0;
    message.minHeight = object.minHeight ?? 0;
    message.midUrl = object.midUrl ?? "";
    message.midWidth = object.midWidth ?? 0;
    message.midHeight = object.midHeight ?? 0;
    message.state = object.state ?? 0;
    return message;
  }
};
function createBaseDeletePostRequest() {
  return { postId: 0 };
}
const DeletePostRequest = {
  $type: "PostServiceProto.DeletePostRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDeletePostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    return obj;
  },
  create(base) {
    return DeletePostRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseDeletePostRequest();
    message.postId = object.postId ?? 0;
    return message;
  }
};
function createBaseDeletePostResponse() {
  return { code: 0, message: "" };
}
const DeletePostResponse = {
  $type: "PostServiceProto.DeletePostResponse",
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
    const message = createBaseDeletePostResponse();
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
    return DeletePostResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseDeletePostResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseGetPostsByIdsRequest() {
  return { postIds: [] };
}
const GetPostsByIdsRequest = {
  $type: "PostServiceProto.GetPostsByIdsRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postIds !== void 0 && message.postIds.length !== 0) {
      writer.uint32(10).fork();
      for (const v of message.postIds) {
        writer.int64(v);
      }
      writer.join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetPostsByIdsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag === 8) {
            message.postIds.push(longToNumber(reader.int64()));
            continue;
          }
          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.postIds.push(longToNumber(reader.int64()));
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
      postIds: globalThis.Array.isArray(object?.postIds) ? object.postIds.map((e) => globalThis.Number(e)) : globalThis.Array.isArray(object?.post_ids) ? object.post_ids.map((e) => globalThis.Number(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postIds?.length) {
      obj.postIds = message.postIds.map((e) => Math.round(e));
    }
    return obj;
  },
  create(base) {
    return GetPostsByIdsRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetPostsByIdsRequest();
    message.postIds = object.postIds?.map((e) => e) || [];
    return message;
  }
};
function createBaseGetPostsByIdsResponse() {
  return { code: 0, message: "", post: [] };
}
const GetPostsByIdsResponse = {
  $type: "PostServiceProto.GetPostsByIdsResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.post !== void 0 && message.post.length !== 0) {
      for (const v of message.post) {
        Post.encode(v, writer.uint32(26).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetPostsByIdsResponse();
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
          const el = Post.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.post.push(el);
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
      post: globalThis.Array.isArray(object?.post) ? object.post.map((e) => Post.fromJSON(e)) : []
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
    if (message.post?.length) {
      obj.post = message.post.map((e) => Post.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return GetPostsByIdsResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetPostsByIdsResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.post = object.post?.map((e) => Post.fromPartial(e)) || [];
    return message;
  }
};
function createBaseGetPostsByUserIdRequest() {
  return { userId: 0, cursor: 0, limit: 0 };
}
const GetPostsByUserIdRequest = {
  $type: "PostServiceProto.GetPostsByUserIdRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(8).int32(message.userId);
    }
    if (message.cursor !== void 0 && message.cursor !== 0) {
      writer.uint32(16).int64(message.cursor);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      writer.uint32(24).int32(message.limit);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetPostsByUserIdRequest();
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
          message.cursor = longToNumber(reader.int64());
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
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      cursor: isSet(object.cursor) ? globalThis.Number(object.cursor) : 0,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.cursor !== void 0 && message.cursor !== 0) {
      obj.cursor = Math.round(message.cursor);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    return obj;
  },
  create(base) {
    return GetPostsByUserIdRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetPostsByUserIdRequest();
    message.userId = object.userId ?? 0;
    message.cursor = object.cursor ?? 0;
    message.limit = object.limit ?? 0;
    return message;
  }
};
function createBaseGetPostsByUserIdResponse() {
  return { code: 0, message: "", posts: [], nextCursor: 0 };
}
const GetPostsByUserIdResponse = {
  $type: "PostServiceProto.GetPostsByUserIdResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.posts !== void 0 && message.posts.length !== 0) {
      for (const v of message.posts) {
        Post.encode(v, writer.uint32(26).fork()).join();
      }
    }
    if (message.nextCursor !== void 0 && message.nextCursor !== 0) {
      writer.uint32(32).int64(message.nextCursor);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetPostsByUserIdResponse();
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
          const el = Post.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.posts.push(el);
          }
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.nextCursor = longToNumber(reader.int64());
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
      posts: globalThis.Array.isArray(object?.posts) ? object.posts.map((e) => Post.fromJSON(e)) : [],
      nextCursor: isSet(object.nextCursor) ? globalThis.Number(object.nextCursor) : isSet(object.next_cursor) ? globalThis.Number(object.next_cursor) : 0
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
    if (message.posts?.length) {
      obj.posts = message.posts.map((e) => Post.toJSON(e));
    }
    if (message.nextCursor !== void 0 && message.nextCursor !== 0) {
      obj.nextCursor = Math.round(message.nextCursor);
    }
    return obj;
  },
  create(base) {
    return GetPostsByUserIdResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetPostsByUserIdResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.posts = object.posts?.map((e) => Post.fromPartial(e)) || [];
    message.nextCursor = object.nextCursor ?? 0;
    return message;
  }
};
function createBaseDevBanPostRequest() {
  return { postId: 0 };
}
const DevBanPostRequest = {
  $type: "PostServiceProto.DevBanPostRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseDevBanPostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    return obj;
  },
  create(base) {
    return DevBanPostRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseDevBanPostRequest();
    message.postId = object.postId ?? 0;
    return message;
  }
};
function createBaseDevBanPostResponse() {
  return { code: 0, message: "" };
}
const DevBanPostResponse = {
  $type: "PostServiceProto.DevBanPostResponse",
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
    const message = createBaseDevBanPostResponse();
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
    return DevBanPostResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseDevBanPostResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseAdminBanPostsRequest() {
  return { postIds: [] };
}
const AdminBanPostsRequest = {
  $type: "PostServiceProto.AdminBanPostsRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postIds !== void 0 && message.postIds.length !== 0) {
      for (const v of message.postIds) {
        writer.uint32(10).string(v);
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminBanPostsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = reader.string();
          if (el !== void 0) {
            message.postIds.push(el);
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
      postIds: globalThis.Array.isArray(object?.postIds) ? object.postIds.map((e) => globalThis.String(e)) : globalThis.Array.isArray(object?.post_ids) ? object.post_ids.map((e) => globalThis.String(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postIds?.length) {
      obj.postIds = message.postIds;
    }
    return obj;
  },
  create(base) {
    return AdminBanPostsRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminBanPostsRequest();
    message.postIds = object.postIds?.map((e) => e) || [];
    return message;
  }
};
function createBaseAdminBanPostsResponse() {
  return { code: 0, message: "" };
}
const AdminBanPostsResponse = {
  $type: "PostServiceProto.AdminBanPostsResponse",
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
    const message = createBaseAdminBanPostsResponse();
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
    return AdminBanPostsResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminBanPostsResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseAdminUnBanPostsRequest() {
  return { postIds: [] };
}
const AdminUnBanPostsRequest = {
  $type: "PostServiceProto.AdminUnBanPostsRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postIds !== void 0 && message.postIds.length !== 0) {
      for (const v of message.postIds) {
        writer.uint32(10).string(v);
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminUnBanPostsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = reader.string();
          if (el !== void 0) {
            message.postIds.push(el);
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
      postIds: globalThis.Array.isArray(object?.postIds) ? object.postIds.map((e) => globalThis.String(e)) : globalThis.Array.isArray(object?.post_ids) ? object.post_ids.map((e) => globalThis.String(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postIds?.length) {
      obj.postIds = message.postIds;
    }
    return obj;
  },
  create(base) {
    return AdminUnBanPostsRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminUnBanPostsRequest();
    message.postIds = object.postIds?.map((e) => e) || [];
    return message;
  }
};
function createBaseAdminUnBanPostsResponse() {
  return { code: 0, message: "" };
}
const AdminUnBanPostsResponse = {
  $type: "PostServiceProto.AdminUnBanPostsResponse",
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
    const message = createBaseAdminUnBanPostsResponse();
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
    return AdminUnBanPostsResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminUnBanPostsResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseAdminGetPostsRequest() {
  return { cursor: 0, limit: 0, userId: 0, gender: 0, appName: 0 };
}
const AdminGetPostsRequest = {
  $type: "PostServiceProto.AdminGetPostsRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.cursor !== void 0 && message.cursor !== 0) {
      writer.uint32(8).int64(message.cursor);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      writer.uint32(16).int32(message.limit);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(24).int32(message.userId);
    }
    if (message.gender !== void 0 && message.gender !== 0) {
      writer.uint32(32).int32(message.gender);
    }
    if (message.appName !== void 0 && message.appName !== 0) {
      writer.uint32(40).int32(message.appName);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGetPostsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.cursor = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.limit = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.userId = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.gender = reader.int32();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }
          message.appName = reader.int32();
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
      cursor: isSet(object.cursor) ? globalThis.Number(object.cursor) : 0,
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      gender: isSet(object.gender) ? globalThis.Number(object.gender) : 0,
      appName: isSet(object.appName) ? globalThis.Number(object.appName) : isSet(object.app_name) ? globalThis.Number(object.app_name) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.cursor !== void 0 && message.cursor !== 0) {
      obj.cursor = Math.round(message.cursor);
    }
    if (message.limit !== void 0 && message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.gender !== void 0 && message.gender !== 0) {
      obj.gender = Math.round(message.gender);
    }
    if (message.appName !== void 0 && message.appName !== 0) {
      obj.appName = Math.round(message.appName);
    }
    return obj;
  },
  create(base) {
    return AdminGetPostsRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminGetPostsRequest();
    message.cursor = object.cursor ?? 0;
    message.limit = object.limit ?? 0;
    message.userId = object.userId ?? 0;
    message.gender = object.gender ?? 0;
    message.appName = object.appName ?? 0;
    return message;
  }
};
function createBaseAdminGetPostsResponse() {
  return { code: 0, message: "", posts: [], nextCursor: 0 };
}
const AdminGetPostsResponse = {
  $type: "PostServiceProto.AdminGetPostsResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.posts !== void 0 && message.posts.length !== 0) {
      for (const v of message.posts) {
        Post.encode(v, writer.uint32(26).fork()).join();
      }
    }
    if (message.nextCursor !== void 0 && message.nextCursor !== 0) {
      writer.uint32(32).int64(message.nextCursor);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGetPostsResponse();
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
          const el = Post.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.posts.push(el);
          }
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.nextCursor = longToNumber(reader.int64());
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
      posts: globalThis.Array.isArray(object?.posts) ? object.posts.map((e) => Post.fromJSON(e)) : [],
      nextCursor: isSet(object.nextCursor) ? globalThis.Number(object.nextCursor) : isSet(object.next_cursor) ? globalThis.Number(object.next_cursor) : 0
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
    if (message.posts?.length) {
      obj.posts = message.posts.map((e) => Post.toJSON(e));
    }
    if (message.nextCursor !== void 0 && message.nextCursor !== 0) {
      obj.nextCursor = Math.round(message.nextCursor);
    }
    return obj;
  },
  create(base) {
    return AdminGetPostsResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminGetPostsResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.posts = object.posts?.map((e) => Post.fromPartial(e)) || [];
    message.nextCursor = object.nextCursor ?? 0;
    return message;
  }
};
function createBaseReportPostRequest() {
  return { postId: 0, reasons: [], description: "", authorId: 0 };
}
const ReportPostRequest = {
  $type: "PostServiceProto.ReportPostRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.reasons !== void 0 && message.reasons.length !== 0) {
      writer.uint32(18).fork();
      for (const v of message.reasons) {
        writer.int32(v);
      }
      writer.join();
    }
    if (message.description !== void 0 && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.authorId !== void 0 && message.authorId !== 0) {
      writer.uint32(32).int32(message.authorId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseReportPostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag === 16) {
            message.reasons.push(reader.int32());
            continue;
          }
          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.reasons.push(reader.int32());
            }
            continue;
          }
          break;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          message.description = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }
          message.authorId = reader.int32();
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      reasons: globalThis.Array.isArray(object?.reasons) ? object.reasons.map((e) => postReportReasonFromJSON(e)) : [],
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      authorId: isSet(object.authorId) ? globalThis.Number(object.authorId) : isSet(object.author_id) ? globalThis.Number(object.author_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    if (message.reasons?.length) {
      obj.reasons = message.reasons.map((e) => postReportReasonToJSON(e));
    }
    if (message.description !== void 0 && message.description !== "") {
      obj.description = message.description;
    }
    if (message.authorId !== void 0 && message.authorId !== 0) {
      obj.authorId = Math.round(message.authorId);
    }
    return obj;
  },
  create(base) {
    return ReportPostRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseReportPostRequest();
    message.postId = object.postId ?? 0;
    message.reasons = object.reasons?.map((e) => e) || [];
    message.description = object.description ?? "";
    message.authorId = object.authorId ?? 0;
    return message;
  }
};
function createBaseReportPostResponse() {
  return { code: 0, message: "" };
}
const ReportPostResponse = {
  $type: "PostServiceProto.ReportPostResponse",
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
    const message = createBaseReportPostResponse();
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
    return ReportPostResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseReportPostResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseAdminAdjustPostScoreRequest() {
  return { postId: 0, score: 0 };
}
const AdminAdjustPostScoreRequest = {
  $type: "PostServiceProto.AdminAdjustPostScoreRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.score !== void 0 && message.score !== 0) {
      writer.uint32(16).int32(message.score);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminAdjustPostScoreRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.score = reader.int32();
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      score: isSet(object.score) ? globalThis.Number(object.score) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    if (message.score !== void 0 && message.score !== 0) {
      obj.score = Math.round(message.score);
    }
    return obj;
  },
  create(base) {
    return AdminAdjustPostScoreRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminAdjustPostScoreRequest();
    message.postId = object.postId ?? 0;
    message.score = object.score ?? 0;
    return message;
  }
};
function createBaseAdminAdjustPostScoreResponse() {
  return { code: 0, message: "" };
}
const AdminAdjustPostScoreResponse = {
  $type: "PostServiceProto.AdminAdjustPostScoreResponse",
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
    const message = createBaseAdminAdjustPostScoreResponse();
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
    return AdminAdjustPostScoreResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminAdjustPostScoreResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBaseAdminResetPostScoreRequest() {
  return { postId: 0 };
}
const AdminResetPostScoreRequest = {
  $type: "PostServiceProto.AdminResetPostScoreRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminResetPostScoreRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    return obj;
  },
  create(base) {
    return AdminResetPostScoreRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminResetPostScoreRequest();
    message.postId = object.postId ?? 0;
    return message;
  }
};
function createBaseAdminResetPostScoreResponse() {
  return { code: 0, message: "" };
}
const AdminResetPostScoreResponse = {
  $type: "PostServiceProto.AdminResetPostScoreResponse",
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
    const message = createBaseAdminResetPostScoreResponse();
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
    return AdminResetPostScoreResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminResetPostScoreResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBasePostIdAndScore() {
  return { postId: 0, score: 0 };
}
const PostIdAndScore = {
  $type: "PostServiceProto.PostIdAndScore",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.score !== void 0 && message.score !== 0) {
      writer.uint32(21).float(message.score);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePostIdAndScore();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 21) {
            break;
          }
          message.score = reader.float();
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      score: isSet(object.score) ? globalThis.Number(object.score) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    if (message.score !== void 0 && message.score !== 0) {
      obj.score = message.score;
    }
    return obj;
  },
  create(base) {
    return PostIdAndScore.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePostIdAndScore();
    message.postId = object.postId ?? 0;
    message.score = object.score ?? 0;
    return message;
  }
};
function createBaseAdminGetAllOverwritePostScoreRequest() {
  return {};
}
const AdminGetAllOverwritePostScoreRequest = {
  $type: "PostServiceProto.AdminGetAllOverwritePostScoreRequest",
  encode(_, writer = new BinaryWriter()) {
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGetAllOverwritePostScoreRequest();
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
    return AdminGetAllOverwritePostScoreRequest.fromPartial(base ?? {});
  },
  fromPartial(_) {
    const message = createBaseAdminGetAllOverwritePostScoreRequest();
    return message;
  }
};
function createBaseAdminGetAllOverwritePostScoreResponse() {
  return { code: 0, message: "", scores: [] };
}
const AdminGetAllOverwritePostScoreResponse = {
  $type: "PostServiceProto.AdminGetAllOverwritePostScoreResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.scores !== void 0 && message.scores.length !== 0) {
      for (const v of message.scores) {
        PostIdAndScore.encode(v, writer.uint32(26).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminGetAllOverwritePostScoreResponse();
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
          const el = PostIdAndScore.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.scores.push(el);
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
      scores: globalThis.Array.isArray(object?.scores) ? object.scores.map((e) => PostIdAndScore.fromJSON(e)) : []
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
    if (message.scores?.length) {
      obj.scores = message.scores.map((e) => PostIdAndScore.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return AdminGetAllOverwritePostScoreResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminGetAllOverwritePostScoreResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.scores = object.scores?.map((e) => PostIdAndScore.fromPartial(e)) || [];
    return message;
  }
};
function createBaseAdminCreatePostRequest() {
  return { clientToken: "", content: "", pictures: [], userId: 0, createdAt: 0, picturesInQuery: [] };
}
const AdminCreatePostRequest = {
  $type: "PostServiceProto.AdminCreatePostRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.clientToken !== void 0 && message.clientToken !== "") {
      writer.uint32(10).string(message.clientToken);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    if (message.pictures !== void 0 && message.pictures.length !== 0) {
      for (const v of message.pictures) {
        PostPicture.encode(v, writer.uint32(26).fork()).join();
      }
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(32).int32(message.userId);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      writer.uint32(40).int64(message.createdAt);
    }
    if (message.picturesInQuery !== void 0 && message.picturesInQuery.length !== 0) {
      for (const v of message.picturesInQuery) {
        PostPictureInQuery.encode(v, writer.uint32(50).fork()).join();
      }
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminCreatePostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          message.clientToken = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.content = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          const el = PostPicture.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.pictures.push(el);
          }
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
          message.createdAt = longToNumber(reader.int64());
          continue;
        }
        case 6: {
          if (tag !== 50) {
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
      clientToken: isSet(object.clientToken) ? globalThis.String(object.clientToken) : isSet(object.client_token) ? globalThis.String(object.client_token) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      pictures: globalThis.Array.isArray(object?.pictures) ? object.pictures.map((e) => PostPicture.fromJSON(e)) : [],
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : isSet(object.created_at) ? globalThis.Number(object.created_at) : 0,
      picturesInQuery: globalThis.Array.isArray(object?.picturesInQuery) ? object.picturesInQuery.map((e) => PostPictureInQuery.fromJSON(e)) : []
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.clientToken !== void 0 && message.clientToken !== "") {
      obj.clientToken = message.clientToken;
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    if (message.pictures?.length) {
      obj.pictures = message.pictures.map((e) => PostPicture.toJSON(e));
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    if (message.picturesInQuery?.length) {
      obj.picturesInQuery = message.picturesInQuery.map((e) => PostPictureInQuery.toJSON(e));
    }
    return obj;
  },
  create(base) {
    return AdminCreatePostRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminCreatePostRequest();
    message.clientToken = object.clientToken ?? "";
    message.content = object.content ?? "";
    message.pictures = object.pictures?.map((e) => PostPicture.fromPartial(e)) || [];
    message.userId = object.userId ?? 0;
    message.createdAt = object.createdAt ?? 0;
    message.picturesInQuery = object.picturesInQuery?.map((e) => PostPictureInQuery.fromPartial(e)) || [];
    return message;
  }
};
function createBaseAdminCreatePostResponse() {
  return { code: 0, message: "", post: void 0 };
}
const AdminCreatePostResponse = {
  $type: "PostServiceProto.AdminCreatePostResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.post !== void 0) {
      Post.encode(message.post, writer.uint32(26).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminCreatePostResponse();
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
          message.post = Post.decode(reader, reader.uint32());
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
      post: isSet(object.post) ? Post.fromJSON(object.post) : void 0
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
    if (message.post !== void 0) {
      obj.post = Post.toJSON(message.post);
    }
    return obj;
  },
  create(base) {
    return AdminCreatePostResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminCreatePostResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.post = object.post !== void 0 && object.post !== null ? Post.fromPartial(object.post) : void 0;
    return message;
  }
};
function createBaseAdminEditPostRequest() {
  return { postId: 0, content: "", pictures: [], userId: 0, createdAt: 0 };
}
const AdminEditPostRequest = {
  $type: "PostServiceProto.AdminEditPostRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    if (message.pictures !== void 0 && message.pictures.length !== 0) {
      for (const v of message.pictures) {
        PostPicture.encode(v, writer.uint32(26).fork()).join();
      }
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(32).int32(message.userId);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      writer.uint32(40).int64(message.createdAt);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminEditPostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }
          message.content = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }
          const el = PostPicture.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.pictures.push(el);
          }
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
          message.createdAt = longToNumber(reader.int64());
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      pictures: globalThis.Array.isArray(object?.pictures) ? object.pictures.map((e) => PostPicture.fromJSON(e)) : [],
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0,
      createdAt: isSet(object.createdAt) ? globalThis.Number(object.createdAt) : isSet(object.created_at) ? globalThis.Number(object.created_at) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    if (message.content !== void 0 && message.content !== "") {
      obj.content = message.content;
    }
    if (message.pictures?.length) {
      obj.pictures = message.pictures.map((e) => PostPicture.toJSON(e));
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    if (message.createdAt !== void 0 && message.createdAt !== 0) {
      obj.createdAt = Math.round(message.createdAt);
    }
    return obj;
  },
  create(base) {
    return AdminEditPostRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminEditPostRequest();
    message.postId = object.postId ?? 0;
    message.content = object.content ?? "";
    message.pictures = object.pictures?.map((e) => PostPicture.fromPartial(e)) || [];
    message.userId = object.userId ?? 0;
    message.createdAt = object.createdAt ?? 0;
    return message;
  }
};
function createBaseAdminEditPostResponse() {
  return { code: 0, message: "", post: void 0 };
}
const AdminEditPostResponse = {
  $type: "PostServiceProto.AdminEditPostResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.post !== void 0) {
      Post.encode(message.post, writer.uint32(26).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminEditPostResponse();
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
          message.post = Post.decode(reader, reader.uint32());
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
      post: isSet(object.post) ? Post.fromJSON(object.post) : void 0
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
    if (message.post !== void 0) {
      obj.post = Post.toJSON(message.post);
    }
    return obj;
  },
  create(base) {
    return AdminEditPostResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminEditPostResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.post = object.post !== void 0 && object.post !== null ? Post.fromPartial(object.post) : void 0;
    return message;
  }
};
function createBaseAdminDigitalHumanLikePostRequest() {
  return { postId: 0, userId: 0 };
}
const AdminDigitalHumanLikePostRequest = {
  $type: "PostServiceProto.AdminDigitalHumanLikePostRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(16).int32(message.userId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminDigitalHumanLikePostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    return obj;
  },
  create(base) {
    return AdminDigitalHumanLikePostRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminDigitalHumanLikePostRequest();
    message.postId = object.postId ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  }
};
function createBaseAdminDigitalHumanLikePostResponse() {
  return { code: 0, message: "", likeCount: 0 };
}
const AdminDigitalHumanLikePostResponse = {
  $type: "PostServiceProto.AdminDigitalHumanLikePostResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.likeCount !== void 0 && message.likeCount !== 0) {
      writer.uint32(24).int32(message.likeCount);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminDigitalHumanLikePostResponse();
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
          message.likeCount = reader.int32();
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
      likeCount: isSet(object.likeCount) ? globalThis.Number(object.likeCount) : isSet(object.like_count) ? globalThis.Number(object.like_count) : 0
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
    if (message.likeCount !== void 0 && message.likeCount !== 0) {
      obj.likeCount = Math.round(message.likeCount);
    }
    return obj;
  },
  create(base) {
    return AdminDigitalHumanLikePostResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminDigitalHumanLikePostResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.likeCount = object.likeCount ?? 0;
    return message;
  }
};
function createBaseAdminCreatePostCommentRequest() {
  return { postId: 0, parentId: 0, replyId: 0, content: "", type: 0, userId: 0 };
}
const AdminCreatePostCommentRequest = {
  $type: "PostServiceProto.AdminCreatePostCommentRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    if (message.parentId !== void 0 && message.parentId !== 0) {
      writer.uint32(16).int64(message.parentId);
    }
    if (message.replyId !== void 0 && message.replyId !== 0) {
      writer.uint32(24).int64(message.replyId);
    }
    if (message.content !== void 0 && message.content !== "") {
      writer.uint32(34).string(message.content);
    }
    if (message.type !== void 0 && message.type !== 0) {
      writer.uint32(40).int32(message.type);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      writer.uint32(48).int32(message.userId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminCreatePostCommentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.parentId = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }
          message.replyId = longToNumber(reader.int64());
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
          message.type = reader.int32();
          continue;
        }
        case 6: {
          if (tag !== 48) {
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0,
      parentId: isSet(object.parentId) ? globalThis.Number(object.parentId) : isSet(object.parent_id) ? globalThis.Number(object.parent_id) : 0,
      replyId: isSet(object.replyId) ? globalThis.Number(object.replyId) : isSet(object.reply_id) ? globalThis.Number(object.reply_id) : 0,
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      type: isSet(object.type) ? postCommentTypeFromJSON(object.type) : 0,
      userId: isSet(object.userId) ? globalThis.Number(object.userId) : isSet(object.user_id) ? globalThis.Number(object.user_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
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
    if (message.type !== void 0 && message.type !== 0) {
      obj.type = postCommentTypeToJSON(message.type);
    }
    if (message.userId !== void 0 && message.userId !== 0) {
      obj.userId = Math.round(message.userId);
    }
    return obj;
  },
  create(base) {
    return AdminCreatePostCommentRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminCreatePostCommentRequest();
    message.postId = object.postId ?? 0;
    message.parentId = object.parentId ?? 0;
    message.replyId = object.replyId ?? 0;
    message.content = object.content ?? "";
    message.type = object.type ?? 0;
    message.userId = object.userId ?? 0;
    return message;
  }
};
function createBaseAdminCreatePostCommentResponse() {
  return { code: 0, comment: void 0 };
}
const AdminCreatePostCommentResponse = {
  $type: "PostServiceProto.AdminCreatePostCommentResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.comment !== void 0) {
      PostComment.encode(message.comment, writer.uint32(18).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminCreatePostCommentResponse();
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
          message.comment = PostComment.decode(reader, reader.uint32());
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
      comment: isSet(object.comment) ? PostComment.fromJSON(object.comment) : void 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.code !== void 0 && message.code !== 0) {
      obj.code = postServiceCommonCodeToJSON(message.code);
    }
    if (message.comment !== void 0) {
      obj.comment = PostComment.toJSON(message.comment);
    }
    return obj;
  },
  create(base) {
    return AdminCreatePostCommentResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminCreatePostCommentResponse();
    message.code = object.code ?? 0;
    message.comment = object.comment !== void 0 && object.comment !== null ? PostComment.fromPartial(object.comment) : void 0;
    return message;
  }
};
function createBaseGetPostFeedRequest() {
  return { limit: 0, offset: 0 };
}
const GetPostFeedRequest = {
  $type: "PostServiceProto.GetPostFeedRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.limit !== void 0 && message.limit !== 0) {
      writer.uint32(8).int32(message.limit);
    }
    if (message.offset !== void 0 && message.offset !== 0) {
      writer.uint32(16).int64(message.offset);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetPostFeedRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.limit = reader.int32();
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
    return GetPostFeedRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetPostFeedRequest();
    message.limit = object.limit ?? 0;
    message.offset = object.offset ?? 0;
    return message;
  }
};
function createBaseGetPostFeedResponse() {
  return { code: 0, message: "", posts: [], nextOffset: 0 };
}
const GetPostFeedResponse = {
  $type: "PostServiceProto.GetPostFeedResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.posts !== void 0 && message.posts.length !== 0) {
      for (const v of message.posts) {
        Post.encode(v, writer.uint32(26).fork()).join();
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
    const message = createBaseGetPostFeedResponse();
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
          const el = Post.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.posts.push(el);
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
      posts: globalThis.Array.isArray(object?.posts) ? object.posts.map((e) => Post.fromJSON(e)) : [],
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
    if (message.posts?.length) {
      obj.posts = message.posts.map((e) => Post.toJSON(e));
    }
    if (message.nextOffset !== void 0 && message.nextOffset !== 0) {
      obj.nextOffset = Math.round(message.nextOffset);
    }
    return obj;
  },
  create(base) {
    return GetPostFeedResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetPostFeedResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.posts = object.posts?.map((e) => Post.fromPartial(e)) || [];
    message.nextOffset = object.nextOffset ?? 0;
    return message;
  }
};
function createBaseGetPostDetailRequest() {
  return { postId: 0 };
}
const GetPostDetailRequest = {
  $type: "PostServiceProto.GetPostDetailRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetPostDetailRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    return obj;
  },
  create(base) {
    return GetPostDetailRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetPostDetailRequest();
    message.postId = object.postId ?? 0;
    return message;
  }
};
function createBaseGetPostDetailResponse() {
  return { code: 0, message: "", post: void 0 };
}
const GetPostDetailResponse = {
  $type: "PostServiceProto.GetPostDetailResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.post !== void 0) {
      Post.encode(message.post, writer.uint32(26).fork()).join();
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseGetPostDetailResponse();
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
          message.post = Post.decode(reader, reader.uint32());
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
      post: isSet(object.post) ? Post.fromJSON(object.post) : void 0
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
    if (message.post !== void 0) {
      obj.post = Post.toJSON(message.post);
    }
    return obj;
  },
  create(base) {
    return GetPostDetailResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseGetPostDetailResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.post = object.post !== void 0 && object.post !== null ? Post.fromPartial(object.post) : void 0;
    return message;
  }
};
function createBaseAdminDeletePostRequest() {
  return { postId: 0 };
}
const AdminDeletePostRequest = {
  $type: "PostServiceProto.AdminDeletePostRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.postId !== void 0 && message.postId !== 0) {
      writer.uint32(8).int64(message.postId);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBaseAdminDeletePostRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }
          message.postId = longToNumber(reader.int64());
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
      postId: isSet(object.postId) ? globalThis.Number(object.postId) : isSet(object.post_id) ? globalThis.Number(object.post_id) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.postId !== void 0 && message.postId !== 0) {
      obj.postId = Math.round(message.postId);
    }
    return obj;
  },
  create(base) {
    return AdminDeletePostRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminDeletePostRequest();
    message.postId = object.postId ?? 0;
    return message;
  }
};
function createBaseAdminDeletePostResponse() {
  return { code: 0, message: "" };
}
const AdminDeletePostResponse = {
  $type: "PostServiceProto.AdminDeletePostResponse",
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
    const message = createBaseAdminDeletePostResponse();
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
    return AdminDeletePostResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBaseAdminDeletePostResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    return message;
  }
};
function createBasePostSuggestedContentRequest() {
  return { pictures: [], timezoneOffsetMinutes: 0 };
}
const PostSuggestedContentRequest = {
  $type: "PostServiceProto.PostSuggestedContentRequest",
  encode(message, writer = new BinaryWriter()) {
    if (message.pictures !== void 0 && message.pictures.length !== 0) {
      for (const v of message.pictures) {
        PostPicture.encode(v, writer.uint32(10).fork()).join();
      }
    }
    if (message.timezoneOffsetMinutes !== void 0 && message.timezoneOffsetMinutes !== 0) {
      writer.uint32(16).int64(message.timezoneOffsetMinutes);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePostSuggestedContentRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }
          const el = PostPicture.decode(reader, reader.uint32());
          if (el !== void 0) {
            message.pictures.push(el);
          }
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }
          message.timezoneOffsetMinutes = longToNumber(reader.int64());
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
      pictures: globalThis.Array.isArray(object?.pictures) ? object.pictures.map((e) => PostPicture.fromJSON(e)) : [],
      timezoneOffsetMinutes: isSet(object.timezoneOffsetMinutes) ? globalThis.Number(object.timezoneOffsetMinutes) : isSet(object.timezone_offset_minutes) ? globalThis.Number(object.timezone_offset_minutes) : 0
    };
  },
  toJSON(message) {
    const obj = {};
    if (message.pictures?.length) {
      obj.pictures = message.pictures.map((e) => PostPicture.toJSON(e));
    }
    if (message.timezoneOffsetMinutes !== void 0 && message.timezoneOffsetMinutes !== 0) {
      obj.timezoneOffsetMinutes = Math.round(message.timezoneOffsetMinutes);
    }
    return obj;
  },
  create(base) {
    return PostSuggestedContentRequest.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePostSuggestedContentRequest();
    message.pictures = object.pictures?.map((e) => PostPicture.fromPartial(e)) || [];
    message.timezoneOffsetMinutes = object.timezoneOffsetMinutes ?? 0;
    return message;
  }
};
function createBasePostSuggestedContentResponse() {
  return { code: 0, message: "", suggestedContent: "" };
}
const PostSuggestedContentResponse = {
  $type: "PostServiceProto.PostSuggestedContentResponse",
  encode(message, writer = new BinaryWriter()) {
    if (message.code !== void 0 && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== void 0 && message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    if (message.suggestedContent !== void 0 && message.suggestedContent !== "") {
      writer.uint32(26).string(message.suggestedContent);
    }
    return writer;
  },
  decode(input, length) {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    const end = length === void 0 ? reader.len : reader.pos + length;
    const message = createBasePostSuggestedContentResponse();
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
          message.suggestedContent = reader.string();
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
      suggestedContent: isSet(object.suggestedContent) ? globalThis.String(object.suggestedContent) : isSet(object.suggested_content) ? globalThis.String(object.suggested_content) : ""
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
    if (message.suggestedContent !== void 0 && message.suggestedContent !== "") {
      obj.suggestedContent = message.suggestedContent;
    }
    return obj;
  },
  create(base) {
    return PostSuggestedContentResponse.fromPartial(base ?? {});
  },
  fromPartial(object) {
    const message = createBasePostSuggestedContentResponse();
    message.code = object.code ?? 0;
    message.message = object.message ?? "";
    message.suggestedContent = object.suggestedContent ?? "";
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
function isSet(value) {
  return value !== null && value !== void 0;
}
export {
  AdminAdjustPostScoreRequest,
  AdminAdjustPostScoreResponse,
  AdminBanPostsRequest,
  AdminBanPostsResponse,
  AdminCreatePostCommentRequest,
  AdminCreatePostCommentResponse,
  AdminCreatePostRequest,
  AdminCreatePostResponse,
  AdminDeletePostRequest,
  AdminDeletePostResponse,
  AdminDigitalHumanLikePostRequest,
  AdminDigitalHumanLikePostResponse,
  AdminEditPostRequest,
  AdminEditPostResponse,
  AdminGetAllOverwritePostScoreRequest,
  AdminGetAllOverwritePostScoreResponse,
  AdminGetPostsRequest,
  AdminGetPostsResponse,
  AdminResetPostScoreRequest,
  AdminResetPostScoreResponse,
  AdminUnBanPostsRequest,
  AdminUnBanPostsResponse,
  CreatePostCommentRequest,
  CreatePostCommentResponse,
  CreatePostRequest,
  CreatePostResponse,
  CreatePostResult,
  DeletePostCommentRequest,
  DeletePostCommentResponse,
  DeletePostRequest,
  DeletePostResponse,
  DevBanPostRequest,
  DevBanPostResponse,
  GetPostCommentsRequest,
  GetPostCommentsResponse,
  GetPostDetailRequest,
  GetPostDetailResponse,
  GetPostFeedRequest,
  GetPostFeedResponse,
  GetPostsByIdsRequest,
  GetPostsByIdsResponse,
  GetPostsByUserIdRequest,
  GetPostsByUserIdResponse,
  GetReplyPostCommentsRequest,
  GetReplyPostCommentsResponse,
  LikeCountType,
  LikePostRequest,
  LikePostResponse,
  Post,
  PostComment,
  PostCommentStatus,
  PostCommentType,
  PostIdAndScore,
  PostOperation,
  PostPicture,
  PostPictureInQuery,
  PostReportReason,
  PostServiceCommonCode,
  PostSuggestedContentRequest,
  PostSuggestedContentResponse,
  PostUserLocale,
  ReportPostRequest,
  ReportPostResponse,
  SortType,
  State,
  UnlikePostRequest,
  UnlikePostResponse,
  UpdatePostCommentRequest,
  UpdatePostCommentResponse,
  createPostResultFromJSON,
  createPostResultToJSON,
  likeCountTypeFromJSON,
  likeCountTypeToJSON,
  postCommentStatusFromJSON,
  postCommentStatusToJSON,
  postCommentTypeFromJSON,
  postCommentTypeToJSON,
  postOperationFromJSON,
  postOperationToJSON,
  postReportReasonFromJSON,
  postReportReasonToJSON,
  postServiceCommonCodeFromJSON,
  postServiceCommonCodeToJSON,
  postUserLocaleFromJSON,
  postUserLocaleToJSON,
  protobufPackage,
  sortTypeFromJSON,
  sortTypeToJSON,
  stateFromJSON,
  stateToJSON
};
