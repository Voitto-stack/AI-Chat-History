const protobufPackage = "ServiceCommonCode";
var ServiceCode = /* @__PURE__ */ ((ServiceCode2) => {
  ServiceCode2[ServiceCode2["SUCCESS"] = 0] = "SUCCESS";
  ServiceCode2[ServiceCode2["UNKNOWN"] = 1] = "UNKNOWN";
  ServiceCode2[ServiceCode2["USER_NOT_FOUND"] = 100] = "USER_NOT_FOUND";
  ServiceCode2[ServiceCode2["USER_DB_ERROR"] = 101] = "USER_DB_ERROR";
  ServiceCode2[ServiceCode2["USER_FETCH_ERROR"] = 102] = "USER_FETCH_ERROR";
  ServiceCode2[ServiceCode2["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
  return ServiceCode2;
})(ServiceCode || {});
function serviceCodeFromJSON(object) {
  switch (object) {
    case 0:
    case "SUCCESS":
      return 0 /* SUCCESS */;
    case 1:
    case "UNKNOWN":
      return 1 /* UNKNOWN */;
    case 100:
    case "USER_NOT_FOUND":
      return 100 /* USER_NOT_FOUND */;
    case 101:
    case "USER_DB_ERROR":
      return 101 /* USER_DB_ERROR */;
    case 102:
    case "USER_FETCH_ERROR":
      return 102 /* USER_FETCH_ERROR */;
    case -1:
    case "UNRECOGNIZED":
    default:
      return -1 /* UNRECOGNIZED */;
  }
}
function serviceCodeToJSON(object) {
  switch (object) {
    case 0 /* SUCCESS */:
      return "SUCCESS";
    case 1 /* UNKNOWN */:
      return "UNKNOWN";
    case 100 /* USER_NOT_FOUND */:
      return "USER_NOT_FOUND";
    case 101 /* USER_DB_ERROR */:
      return "USER_DB_ERROR";
    case 102 /* USER_FETCH_ERROR */:
      return "USER_FETCH_ERROR";
    case -1 /* UNRECOGNIZED */:
    default:
      return "UNRECOGNIZED";
  }
}
export {
  ServiceCode,
  protobufPackage,
  serviceCodeFromJSON,
  serviceCodeToJSON
};
