const protobufPackage = "common";
var CommonCode = /* @__PURE__ */ ((CommonCode2) => {
  CommonCode2[CommonCode2["SUCCESS"] = 0] = "SUCCESS";
  CommonCode2[CommonCode2["AUTH_FAILED"] = 97] = "AUTH_FAILED";
  CommonCode2[CommonCode2["FAIL_PARAMETER_ERROR"] = 98] = "FAIL_PARAMETER_ERROR";
  CommonCode2[CommonCode2["FAIL_UNKNOWN"] = 99] = "FAIL_UNKNOWN";
  CommonCode2[CommonCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return CommonCode2;
})(CommonCode || {});
function commonCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "SUCCESS":
      return 0 /* SUCCESS */;
    case 97:
    case "AUTH_FAILED":
      return 97 /* AUTH_FAILED */;
    case 98:
    case "FAIL_PARAMETER_ERROR":
      return 98 /* FAIL_PARAMETER_ERROR */;
    case 99:
    case "FAIL_UNKNOWN":
      return 99 /* FAIL_UNKNOWN */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function commonCodeToJSON(object) {
  switch (object) {
    case 0 /* SUCCESS */:
      return "SUCCESS";
    case 97 /* AUTH_FAILED */:
      return "AUTH_FAILED";
    case 98 /* FAIL_PARAMETER_ERROR */:
      return "FAIL_PARAMETER_ERROR";
    case 99 /* FAIL_UNKNOWN */:
      return "FAIL_UNKNOWN";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var AvatarType = /* @__PURE__ */ ((AvatarType2) => {
  AvatarType2[AvatarType2["SELF"] = 0] = "SELF";
  AvatarType2[AvatarType2["RPM"] = 1] = "RPM";
  AvatarType2[AvatarType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return AvatarType2;
})(AvatarType || {});
function avatarTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "SELF":
      return 0 /* SELF */;
    case 1:
    case "RPM":
      return 1 /* RPM */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function avatarTypeToJSON(object) {
  switch (object) {
    case 0 /* SELF */:
      return "SELF";
    case 1 /* RPM */:
      return "RPM";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
var ModerationContentType = /* @__PURE__ */ ((ModerationContentType2) => {
  ModerationContentType2[ModerationContentType2["POST"] = 0] = "POST";
  ModerationContentType2[ModerationContentType2["COMMENT"] = 1] = "COMMENT";
  ModerationContentType2[ModerationContentType2["CUSTOM_AVATAR"] = 2] = "CUSTOM_AVATAR";
  ModerationContentType2[ModerationContentType2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return ModerationContentType2;
})(ModerationContentType || {});
function moderationContentTypeFromJSON(object) {
  switch (object) {
    case 0:
    case "POST":
      return 0 /* POST */;
    case 1:
    case "COMMENT":
      return 1 /* COMMENT */;
    case 2:
    case "CUSTOM_AVATAR":
      return 2 /* CUSTOM_AVATAR */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function moderationContentTypeToJSON(object) {
  switch (object) {
    case 0 /* POST */:
      return "POST";
    case 1 /* COMMENT */:
      return "COMMENT";
    case 2 /* CUSTOM_AVATAR */:
      return "CUSTOM_AVATAR";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
export {
  AvatarType,
  CommonCode,
  ModerationContentType,
  avatarTypeFromJSON,
  avatarTypeToJSON,
  commonCodeFromJSON,
  commonCodeToJSON,
  moderationContentTypeFromJSON,
  moderationContentTypeToJSON,
  protobufPackage
};
