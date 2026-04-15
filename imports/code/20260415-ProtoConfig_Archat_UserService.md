---
title: ProtoConfig_Archat_UserService
date: 2026-04-15T17:04:47+08:00
source: import
language: json
original: ProtoConfig_Archat_UserService.json
---

# ProtoConfig_Archat_UserService

```json
{
  "startId": 4000,
  "desc": "proto协议配置:id默认遵守从startId开始，上行消息Id = 下行消息Id + 1, 必要上行消息",
  "protos": [
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/loginUser",
      "class_name": "LoginUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4000
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/loginUser",
      "class_name": "LoginUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4001
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkUsernameAvailability",
      "class_name": "CheckUsernameAvailabilityRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4002
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkUsernameAvailability",
      "class_name": "CheckUsernameAvailabilityResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4003
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createUser",
      "class_name": "CreateUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4004
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createUser",
      "class_name": "CreateUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4005
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/updateAvatar",
      "class_name": "UpdateAvatarRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4006
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/updateAvatar",
      "class_name": "UpdateAvatarResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4007
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deleteUser",
      "class_name": "DeleteUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4008
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deleteUser",
      "class_name": "DeleteUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4009
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "url": "/userApi/follow",
      "type": "App",
      "class_name": "FollowUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4010
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/follow",
      "class_name": "FollowUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4011
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/unfollow",
      "class_name": "UnfollowUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4012
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/unfollow",
      "class_name": "UnfollowUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4013
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFollowings",
      "class_name": "GetUserFollowingsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4014
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFollowings",
      "class_name": "GetUserFollowingsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4015
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFollowers",
      "class_name": "GetUserFollowersRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4016
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFollowers",
      "class_name": "GetUserFollowersResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4017
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getOtherUserRelationshipInfo",
      "class_name": "GetOtherUserRelationshipInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4018
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getOtherUserRelationshipInfo",
      "class_name": "GetOtherUserRelationshipInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4019
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/block",
      "class_name": "BlockUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4022
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/block",
      "class_name": "BlockUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4023
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/report",
      "class_name": "ReportUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4024
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/report",
      "class_name": "ReportUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4025
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getUserViolationInfo",
      "class_name": "GetUserViolationInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4026
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getUserViolationInfo",
      "class_name": "GetUserViolationInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4027
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/setUserRegulationStatus",
      "class_name": "SetUserRegulationStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4028
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/setUserRegulationStatus",
      "class_name": "SetUserRegulationStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4029
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetUserFullInfo",
      "class_name": "AdminGetUserFullInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4030
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetUserFullInfo",
      "class_name": "AdminGetUserFullInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4031
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFriends",
      "class_name": "GetUserFriendsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4032
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFriends",
      "class_name": "GetUserFriendsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4033
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/unblock",
      "class_name": "UnblockUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4034
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/unblock",
      "class_name": "UnblockUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4035
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getNewUserCounts",
      "class_name": "GetNewUserCountsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4036
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getNewUserCounts",
      "class_name": "GetNewUserCountsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4037
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadPhoto",
      "class_name": "UploadPhotoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4038
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadPhoto",
      "class_name": "UploadPhotoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4039
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getPhotos",
      "class_name": "GetPhotosRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4040
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getPhotos",
      "class_name": "GetPhotosResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4041
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getAllRelationships",
      "class_name": "GetAllRelationshipsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4042
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getAllRelationships",
      "class_name": "GetAllRelationshipsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4043
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserBasicInfos",
      "class_name": "GetUserBasicInfosRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4044
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserBasicInfos",
      "class_name": "GetUserBasicInfosResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4045
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/searchUsername",
      "class_name": "SearchUsernameRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4046
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/searchUsername",
      "class_name": "SearchUsernameResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4047
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getAdminStatistics",
      "class_name": "GetAdminStatisticsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4048
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getAdminStatistics",
      "class_name": "GetAdminStatisticsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4049
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/setAdminLabels",
      "class_name": "SetAdminLabelsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4052
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/setAdminLabels",
      "class_name": "SetAdminLabelsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4053
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/interestTagApi/getInterestTabs",
      "class_name": "GetInterestTabsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4054
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/interestTagApi/getInterestTabs",
      "class_name": "GetInterestTabsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4055
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserProfilePageInfo",
      "class_name": "GetUserProfilePageInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4060
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserProfilePageInfo",
      "class_name": "GetUserProfilePageInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4061
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/editProfilePageBio",
      "class_name": "EditProfilePageBioRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4062
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/editProfilePageBio",
      "class_name": "EditProfilePageBioResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4063
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getDAUInfo",
      "class_name": "GetDAUInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4064
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getDAUInfo",
      "class_name": "GetDAUInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4065
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/setDAURangeAdmin",
      "class_name": "SetDAURangeAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4066
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/setDAURangeAdmin",
      "class_name": "SetDAURangeAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4067
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getDailyActiveUserIdsAdmin",
      "class_name": "GetDailyActiveUserIdsAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4068
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getDailyActiveUserIdsAdmin",
      "class_name": "GetDailyActiveUserIdsAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4069
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/editProfile",
      "class_name": "EditProfileRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4070
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/editProfile",
      "class_name": "EditProfileResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4071
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFriendMatchCardInfo",
      "class_name": "GetFriendMatchCardInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4072
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFriendMatchCardInfo",
      "class_name": "GetFriendMatchCardInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4073
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserInfo",
      "class_name": "GetUserInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4074
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserInfo",
      "class_name": "GetUserInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4075
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createUserInKServer",
      "class_name": "CreateUserInKServerRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4076
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createUserInKServer",
      "class_name": "CreateUserInKServerResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4077
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFriendMatchCardInfoV2",
      "class_name": "GetFriendMatchCardInfoV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4078
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFriendMatchCardInfoV2",
      "class_name": "GetFriendMatchCardInfoV2Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4079
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/GetPagedUserReports",
      "class_name": "AdminGetPagedUserReportsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4080
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/GetPagedUserReports",
      "class_name": "AdminGetPagedUserReportsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4081
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getReleaseTime",
      "class_name": "GetReleaseTimeRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4082
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getReleaseTime",
      "class_name": "GetReleaseTimeResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4083
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/buildUserRelationshipCacheAdmin",
      "class_name": "BuildUserRelationshipAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4084
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/buildUserRelationshipCacheAdmin",
      "class_name": "BuildUserRelationshipAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4085
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/UpdateProfileImage",
      "class_name": "UpdateProfileImageRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4086
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/UpdateProfileImage",
      "class_name": "UpdateProfileImageResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4087
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/refreshToken",
      "class_name": "RefreshTokenRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4088
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/refreshToken",
      "class_name": "RefreshTokenResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4089
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getRewardTokenBalance",
      "class_name": "GetRewardTokenBalanceRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4118
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getRewardTokenBalance",
      "class_name": "GetRewardTokenBalanceResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4119
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getReferralCode",
      "class_name": "GetReferralCodeRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4120
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getReferralCode",
      "class_name": "GetReferralCodeResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4121
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductRewardToken",
      "class_name": "DeductRewardTokenRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4122
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductRewardToken",
      "class_name": "DeductRewardTokenResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4123
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyReferralCode",
      "class_name": "VerifyReferralCodeRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4124
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyReferralCode",
      "class_name": "VerifyReferralCodeResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4125
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkIfUserRedeemed",
      "class_name": "CheckIfUserRedeemedRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4126
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkIfUserRedeemed",
      "class_name": "CheckIfUserRedeemedResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4127
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSuccessfulInvitation",
      "class_name": "GetSuccessfulInvitationRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4128
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSuccessfulInvitation",
      "class_name": "GetSuccessfulInvitationResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4129
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getAppShareRecord",
      "class_name": "GetAppShareRecordRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4130
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getAppShareRecord",
      "class_name": "GetAppShareRecordResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4131
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/addAppShareRecord",
      "class_name": "AddAppShareRecordRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4132
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/addAppShareRecord",
      "class_name": "AddAppShareRecordRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4133
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getWatchAdsCount",
      "class_name": "GetWatchAdsCountRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4134
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getWatchAdsCount",
      "class_name": "GetWatchAdsCountResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4135
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/addWatchAds",
      "class_name": "AddWatchAdsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4136
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/addWatchAds",
      "class_name": "AddWatchAdsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4137
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkUpgrade",
      "class_name": "CheckUpgradeRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4138
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkUpgrade",
      "class_name": "CheckUpgradeResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4139
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getAppVersionsAdmin",
      "class_name": "GetAppVersionsAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4140
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getAppVersionsAdmin",
      "class_name": "GetAppVersionsAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4141
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/addAppVersionAdmin",
      "class_name": "AddAppVersionAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4142
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/addAppVersionAdmin",
      "class_name": "AddAppVersionAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4143
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/modifyAppVersionAdmin",
      "class_name": "ModifyAppVersionAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4144
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/modifyAppVersionAdmin",
      "class_name": "ModifyAppVersionAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4145
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/loginAdmin",
      "class_name": "LoginAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4178
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/loginAdmin",
      "class_name": "LoginAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4179
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/authorizeAdmin",
      "class_name": "AuthorizeAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4180
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/authorizeAdmin",
      "class_name": "AuthorizeAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4181
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fastLogin",
      "class_name": "FastLoginRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4198
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fastLogin",
      "class_name": "FastLoginResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4199
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadUserInfo",
      "class_name": "UploadUserInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4200
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadUserInfo",
      "class_name": "UploadUserInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4201
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/deleteUserAdmin",
      "class_name": "DeleteUserAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4202
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/deleteUserAdmin",
      "class_name": "DeleteUserAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4203
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/setUserLocale",
      "class_name": "SetUserLocaleRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4216
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/setUserLocale",
      "class_name": "SetUserLocaleResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4217
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportSusBehavior",
      "class_name": "ReportSusBehaviorRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4218
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportSusBehavior",
      "class_name": "ReportSusBehaviorResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4219
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getReviewVersion",
      "class_name": "GetReviewVersionRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4220
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getReviewVersion",
      "class_name": "GetReviewVersionResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4221
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getMatchingScore",
      "class_name": "GetMatchingScoreRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4222
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getMatchingScore",
      "class_name": "GetMatchingScoreResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4223
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getHumanChatEligibility",
      "class_name": "GetHumanChatEligibilityRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4224
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getHumanChatEligibility",
      "class_name": "GetHumanChatEligibilityResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4225
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportHumanChatUser",
      "class_name": "ReportHumanChatUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4226
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportHumanChatUser",
      "class_name": "ReportHumanChatUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4227
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getHumanChatReportHistoriesAdmin",
      "class_name": "GetHumanChatReportHistoryAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4228
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getHumanChatReportHistoriesAdmin",
      "class_name": "GetHumanChatReportHistoryAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4229
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/blockHumanChatUser",
      "class_name": "BlockHumanChatUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4230
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/blockHumanChatUser",
      "class_name": "BlockHumanChatUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4231
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/unblockHumanChatUser",
      "class_name": "UnblockHumanChatUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4232
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/unblockHumanChatUser",
      "class_name": "UnblockHumanChatUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4233
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getHumanChatUserBlockList",
      "class_name": "GetHumanChatUserBlockListRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4234
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getHumanChatUserBlockList",
      "class_name": "GetHumanChatUserBlockListResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4235
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getHumanChatFriendMatchCardInfo",
      "class_name": "GetHumanChatFriendMatchCardInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4236
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getHumanChatFriendMatchCardInfo",
      "class_name": "GetHumanChatFriendMatchCardInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4237
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserAvatars",
      "class_name": "GetUserAvatarsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4238
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserAvatars",
      "class_name": "GetUserAvatarsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4239
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetUserInfos",
      "class_name": "AdminGetUserInfosRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4240
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetUserInfos",
      "class_name": "AdminGetUserInfosResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4241
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminCreateDigitalHuman",
      "class_name": "AdminCreateDigitalHumanRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4242
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminCreateDigitalHuman",
      "class_name": "AdminCreateDigitalHumanResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4243
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminEditDigitalHuman",
      "class_name": "AdminEditDigitalHumanRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4244
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminEditDigitalHuman",
      "class_name": "AdminEditDigitalHumanResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4245
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminDeleteDigitalHuman",
      "class_name": "AdminDeleteDigitalHumanRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4246
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminDeleteDigitalHuman",
      "class_name": "AdminDeleteDigitalHumanResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4247
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetDigitalHumans",
      "class_name": "AdminGetDigitalHumansRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4248
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetDigitalHumans",
      "class_name": "AdminGetDigitalHumansResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4249
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetInterestTabs",
      "class_name": "AdminGetInterestTabsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4250
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetInterestTabs",
      "class_name": "AdminGetInterestTabsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4251
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getDigitalHumans",
      "class_name": "GetDigitalHumansRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4252
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getDigitalHumans",
      "class_name": "GetDigitalHumansResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4253
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/addInitChatHistory",
      "class_name": "AddInitChatHistoryRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4254
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/addInitChatHistory",
      "class_name": "AddInitChatHistoryResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4255
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyIOS",
      "class_name": "VerifyIOSRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4256
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyIOS",
      "class_name": "VerifyIOSResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4257
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserSubscription",
      "class_name": "GetUserSubscriptionRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4258
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserSubscription",
      "class_name": "GetUserSubscriptionResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4259
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSubscriptions",
      "class_name": "GetSubscriptionsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4260
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSubscriptions",
      "class_name": "GetSubscriptionsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4261
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductMsgCount",
      "class_name": "DeductMsgCountRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4262
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductMsgCount",
      "class_name": "DeductMsgCountResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4263
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductMatchCount",
      "class_name": "DeductMatchCountRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4264
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductMatchCount",
      "class_name": "DeductMatchCountResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4265
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/updateUserSource",
      "class_name": "UpdateUserSourceRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4266
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/updateUserSource",
      "class_name": "UpdateUserSourceResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4267
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/editUserLocation",
      "class_name": "EditUserLocationRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4268
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/editUserLocation",
      "class_name": "EditUserLocationResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4269
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductCount",
      "class_name": "DeductCountRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4270
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductCount",
      "class_name": "DeductCountResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4271
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminSetDHSubscription",
      "class_name": "AdminSetDHSubscriptionRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4272
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminSetDHSubscription",
      "class_name": "AdminSetDHSubscriptionResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4273
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/likeUser",
      "class_name": "LikeUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4274
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/likeUser",
      "class_name": "LikeUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4275
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getHumanChatFriendMatchCardInfos",
      "class_name": "GetHumanChatFriendMatchCardInfosRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4276
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getHumanChatFriendMatchCardInfos",
      "class_name": "GetHumanChatFriendMatchCardInfosResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4277
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getMatchFeeds",
      "class_name": "GetMatchFeedsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4280
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getMatchFeeds",
      "class_name": "GetMatchFeedsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4281
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserInfos",
      "class_name": "GetUserInfosRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4282
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserInfos",
      "class_name": "GetUserInfosResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4283
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserProfilePageInfoV2",
      "class_name": "GetUserProfilePageInfoV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4284
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserProfilePageInfoV2",
      "class_name": "GetUserProfilePageInfoV2Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4285
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserBasicInfosV2",
      "class_name": "GetUserBasicInfosV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4286
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserBasicInfosV2",
      "class_name": "GetUserBasicInfosV2Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4287
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getDhPhoneNumber",
      "class_name": "GetDhPhoneNumberRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4288
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getDhPhoneNumber",
      "class_name": "GetDhPhoneNumberResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4289
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSMSContext",
      "class_name": "GetSMSContextRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4290
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSMSContext",
      "class_name": "GetSMSContextResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4291
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetActionCountsInRange",
      "class_name": "AdminGetActionCountsInRangeRequest",
      "client_package": "UserServiceAdminApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4292
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetActionCountsInRange",
      "class_name": "AdminGetActionCountsInRangeResponse",
      "client_package": "UserServiceAdminApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4293
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetActionUserListInRange",
      "class_name": "AdminGetActionUserListInRangeRequest",
      "client_package": "UserServiceAdminApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4294
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetActionUserListInRange",
      "class_name": "AdminGetActionUserListInRangeResponse",
      "client_package": "UserServiceAdminApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4295
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getLikeMeFeeds",
      "class_name": "GetLikeMeFeedsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4296
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getLikeMeFeeds",
      "class_name": "GetLikeMeFeedsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4297
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadNewMatch",
      "class_name": "UploadNewMatchRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4298
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadNewMatch",
      "class_name": "UploadNewMatchResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4299
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadFcmToken",
      "class_name": "UploadFcmTokenRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4300
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadFcmToken",
      "class_name": "UploadFcmTokenResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4301
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createDelayMessageWithPush",
      "class_name": "CreateDelayMessageWithPushRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4302
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createDelayMessageWithPush",
      "class_name": "CreateDelayMessageWithPushResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4303
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/cancelDelayMessageWithPush",
      "class_name": "CancelDelayMessageWithPushRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4304
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/cancelDelayMessageWithPush",
      "class_name": "CancelDelayMessageWithPushResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4305
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fakeFireBasePush",
      "class_name": "FakeFireBasePushRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4306
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fakeFireBasePush",
      "class_name": "FakeFireBasePushResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4307
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getClientConfig",
      "class_name": "GetClientConfigRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4308
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getClientConfig",
      "class_name": "GetClientConfigResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4309
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/updateUserSusBot",
      "class_name": "UpdateUserSusBotRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4310
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/updateUserSusBot",
      "class_name": "UpdateUserSusBotResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4311
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyAndroid",
      "class_name": "VerifyAndroidRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4312
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyAndroid",
      "class_name": "VerifyAndroidResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4313
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getRealManFeeds",
      "class_name": "GetRealManFeedsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4314
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getRealManFeeds",
      "class_name": "GetRealManFeedsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4315
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetUserBasicInfosV2",
      "class_name": "GetUserBasicInfosV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4316
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetUserBasicInfosV2",
      "class_name": "GetUserBasicInfosV2Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4317
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetSuspiciousUserList",
      "class_name": "AdminGetSuspiciousUserListRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4318
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetSuspiciousUserList",
      "class_name": "AdminGetSuspiciousUserListResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4319
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getClientUserStatus",
      "class_name": "GetClientUserStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4320
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getClientUserStatus",
      "class_name": "GetClientUserStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4321
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/updateClientUserStatus",
      "class_name": "UpdateClientUserStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4322
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/updateClientUserStatus",
      "class_name": "UpdateClientUserStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4323
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getUserIdsWithPhoneNumber",
      "class_name": "GetUserIdsWithPhoneNumberRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4324
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getUserIdsWithPhoneNumber",
      "class_name": "GetUserIdsWithPhoneNumberResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4325
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/storeUserMutualEvaluation",
      "class_name": "StoreUserMutualEvaluationRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4326
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/storeUserMutualEvaluation",
      "class_name": "StoreUserMutualEvaluationResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4327
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryUserMutualEvaluation",
      "class_name": "QueryUserMutualEvaluationRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4328
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryUserMutualEvaluation",
      "class_name": "QueryUserMutualEvaluationResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4329
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryUserTransactionHistory",
      "class_name": "QueryUserTransactionHistoryRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4330
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryUserTransactionHistory",
      "class_name": "QueryUserTransactionHistoryResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4331
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/userCheckIn",
      "class_name": "UserCheckInRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4332
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/userCheckIn",
      "class_name": "UserCheckInResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4333
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCheckInInfo",
      "class_name": "GetUserCheckInInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4334
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCheckInInfo",
      "class_name": "GetUserCheckInInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4335
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/registerUserPaypalId",
      "class_name": "RegisterUserPaypalIdRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4336
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/registerUserPaypalId",
      "class_name": "RegisterUserPaypalIdResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4337
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/statChatRound",
      "class_name": "StatChatRoundRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4338
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/statChatRound",
      "class_name": "StatChatRoundResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4339
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCoinInfo",
      "class_name": "GetUserCoinInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4340
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCoinInfo",
      "class_name": "GetUserCoinInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4341
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/buyCoin",
      "class_name": "BuyCoinRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4342
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/buyCoin",
      "class_name": "BuyCoinResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4343
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getCoinProductInfos",
      "class_name": "GetCoinProductInfosRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4344
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getCoinProductInfos",
      "class_name": "GetCoinProductInfosResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4345
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/onboardingCashout",
      "class_name": "OnboardingCashoutRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4346
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/onboardingCashout",
      "class_name": "OnboardingCashoutResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4347
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/onboardingPhoneVerified",
      "class_name": "OnboardingPhoneVerifiedRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4348
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/onboardingPhoneVerified",
      "class_name": "OnboardingPhoneVerifiedResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4349
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryOnboardingTaskStatus",
      "class_name": "QueryOnboardingTaskStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4352
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryOnboardingTaskStatus",
      "class_name": "QueryOnboardingTaskStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4353
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getGiftsInfo",
      "class_name": "GetGiftsInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4354
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getGiftsInfo",
      "class_name": "GetGiftsInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4355
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/sendGift",
      "class_name": "SendGiftRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4356
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/sendGift",
      "class_name": "SendGiftResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4357
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSendGiftHistory",
      "class_name": "GetSendGiftHistoryRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4358
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSendGiftHistory",
      "class_name": "GetSendGiftHistoryResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4359
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/turnOnAutoPilot",
      "class_name": "TurnOnAutoPilotRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4360
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/turnOnAutoPilot",
      "class_name": "TurnOnAutoPilotResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4361
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/onboardingInitTask",
      "class_name": "OnboardingInitTaskRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4362
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/onboardingInitTask",
      "class_name": "OnboardingInitTaskResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4363
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/onboardingBindPaypalId",
      "class_name": "OnboardingBindPaypalIdRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4364
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/onboardingBindPaypalId",
      "class_name": "OnboardingBindPaypalIdResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4365
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserMisc",
      "class_name": "QueryUserMiscRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4370
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserMisc",
      "class_name": "QueryUserMiscResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4371
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserIntimacy",
      "class_name": "GetUserIntimacyRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4372
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserIntimacy",
      "class_name": "GetUserIntimacyResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4373
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryAutoPilotStatus",
      "class_name": "QueryAutoPilotStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4374
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryAutoPilotStatus",
      "class_name": "QueryAutoPilotStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4375
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCoinChangeHistory",
      "class_name": "GetUserCoinChangeHistoryRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4376
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCoinChangeHistory",
      "class_name": "GetUserCoinChangeHistoryResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4377
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserLevelConfig",
      "class_name": "GetUserLevelConfigRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4378
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserLevelConfig",
      "class_name": "GetUserLevelConfigResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4379
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminApproveUserWithdraw",
      "class_name": "AdminApproveUserWithdrawRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4380
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminApproveUserWithdraw",
      "class_name": "AdminApproveUserWithdrawResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4381
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminListPendingUserWithdraw",
      "class_name": "AdminListPendingUserWithdrawRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4382
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminListPendingUserWithdraw",
      "class_name": "AdminListPendingUserWithdrawResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4383
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminRejectUserWithdraw",
      "class_name": "AdminRejectUserWithdrawRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4384
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminRejectUserWithdraw",
      "class_name": "AdminRejectUserWithdrawResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4385
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createChatOrder",
      "class_name": "CreateChatOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4386
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createChatOrder",
      "class_name": "CreateChatOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4387
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/chatOrderAccept",
      "class_name": "ChatOrderAcceptRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4388
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/chatOrderAccept",
      "class_name": "ChatOrderAcceptResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4389
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/chatOrderEnd",
      "class_name": "ChatOrderEndRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4390
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/chatOrderEnd",
      "class_name": "ChatOrderEndResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4391
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listChatOrder",
      "class_name": "ListChatOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4392
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listChatOrder",
      "class_name": "ListChatOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4393
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listChatOrderWithUser",
      "class_name": "ListChatOrderWithUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4394
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listChatOrderWithUser",
      "class_name": "ListChatOrderWithUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4395
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/initChatOrder",
      "class_name": "InitChatOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4396
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/initChatOrder",
      "class_name": "InitChatOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4397
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/chatOrderClaim",
      "class_name": "ChatOrderClaimRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4398
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/chatOrderClaim",
      "class_name": "ChatOrderClaimResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4399
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserBalance",
      "class_name": "QueryUserBalanceRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4400
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserBalance",
      "class_name": "QueryUserBalanceResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4401
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPWAFeeds",
      "class_name": "GetPWAFeedsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4402
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPWAFeeds",
      "class_name": "GetPWAFeedsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4403
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetUserWithdrawDetail",
      "class_name": "AdminGetUserWithdrawDetailRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4404
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetUserWithdrawDetail",
      "class_name": "AdminGetUserWithdrawDetailResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4405
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryChatOrder",
      "class_name": "QueryChatOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4406
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryChatOrder",
      "class_name": "QueryChatOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4407
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserPaypalInfo",
      "class_name": "QueryUserPaypalInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4408
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserPaypalInfo",
      "class_name": "QueryUserPaypalInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4409
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserWithdrawTasks",
      "class_name": "QueryUserWithdrawTasksRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4410
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserWithdrawTasks",
      "class_name": "QueryUserWithdrawTasksResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4411
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/storeUserMisc",
      "class_name": "StoreUserMiscRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4412
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/storeUserMisc",
      "class_name": "StoreUserMiscResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4413
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/sendCustomizedFirebaseNotification",
      "class_name": "SendCustomizedFirebaseNotificationRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4414
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/sendCustomizedFirebaseNotification",
      "class_name": "SendCustomizedFirebaseNotificationResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4415
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/normalMediumWithdraw",
      "class_name": "NormalMediumWithdrawRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4416
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/normalMediumWithdraw",
      "class_name": "NormalMediumWithdrawResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4417
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/initUserTutorialTask",
      "class_name": "InitUserTutorialTaskRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4418
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/initUserTutorialTask",
      "class_name": "InitUserTutorialTaskResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4419
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserTutorialTask",
      "class_name": "QueryUserTutorialTaskRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4420
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserTutorialTask",
      "class_name": "QueryUserTutorialTaskResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4421
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/finishUserTutorialTaskOne",
      "class_name": "FinishUserTutorialTaskOneRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4422
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/finishUserTutorialTaskOne",
      "class_name": "FinishUserTutorialTaskOneResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4423
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/claimUserTutorialTask",
      "class_name": "ClaimUserTutorialTaskRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4424
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/claimUserTutorialTask",
      "class_name": "ClaimUserTutorialTaskResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4425
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadUserTutorialTaskRecentPics",
      "class_name": "UploadUserTutorialTaskRecentPicsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4426
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadUserTutorialTaskRecentPics",
      "class_name": "UploadUserTutorialTaskRecentPicsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4427
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserTutorialTaskRecentPosts",
      "class_name": "QueryUserTutorialTaskRecentPostsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4428
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserTutorialTaskRecentPosts",
      "class_name": "QueryUserTutorialTaskRecentPostsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4429
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserByPhone",
      "class_name": "QueryUserByPhoneRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4430
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUserByPhone",
      "class_name": "QueryUserByPhoneResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4431
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUsersPrompts",
      "class_name": "GetUsersPromptsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4432
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUsersPrompts",
      "class_name": "GetUsersPromptsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4433
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/finishOnboardingV2",
      "class_name": "FinishOnboardingV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4434
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/finishOnboardingV2",
      "class_name": "FinishOnboardingV2Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4435
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listAllCommonTask",
      "class_name": "ListAllCommonTaskRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4436
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listAllCommonTask",
      "class_name": "ListAllCommonTaskResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4437
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/changeUserOnlineStatus",
      "class_name": "ChangeUserOnlineStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4438
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/changeUserOnlineStatus",
      "class_name": "ChangeUserOnlineStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4439
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserOnlineStatus",
      "class_name": "GetUserOnlineStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4440
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserOnlineStatus",
      "class_name": "GetUserOnlineStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4441
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/finishUserCommonTask",
      "class_name": "FinishUserCommonTaskRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4442
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/finishUserCommonTask",
      "class_name": "FinishUserCommonTaskResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4443
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listUserCommonTask",
      "class_name": "ListUserCommonTaskRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4444
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listUserCommonTask",
      "class_name": "ListUserCommonTaskResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4445
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/onboardingCashoutV2",
      "class_name": "OnboardingCashoutV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4446
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/onboardingCashoutV2",
      "class_name": "OnboardingCashoutV2Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4447
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductCoinMsg",
      "class_name": "DeductCoinMsgRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4448
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductCoinMsg",
      "class_name": "DeductCoinMsgResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4449
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createCallOrder",
      "class_name": "CreateCallOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4450
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createCallOrder",
      "class_name": "CreateCallOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4451
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/markMissCall",
      "class_name": "MarkMissCallRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4452
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/markMissCall",
      "class_name": "MarkMissCallResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4453
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/finishCallOrder",
      "class_name": "FinishCallOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4454
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/finishCallOrder",
      "class_name": "FinishCallOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4455
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listMissCallOrder",
      "class_name": "ListMissCallOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4456
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listMissCallOrder",
      "class_name": "ListMissCallOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4457
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listCallOrder",
      "class_name": "ListCallOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4458
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listCallOrder",
      "class_name": "ListCallOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4459
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listTextEarning",
      "class_name": "ListTextEarningRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4460
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listTextEarning",
      "class_name": "ListTextEarningResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4461
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/markCallBack",
      "class_name": "MarkCallBackRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4462
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/markCallBack",
      "class_name": "MarkCallBackResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4463
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/bindPaypalId",
      "class_name": "BindPaypalIdRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4464
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/bindPaypalId",
      "class_name": "BindPaypalIdResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4465
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getAllMessageTypeCostCoin",
      "class_name": "GetAllMessageTypeCostCoinRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4466
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getAllMessageTypeCostCoin",
      "class_name": "GetAllMessageTypeCostCoinResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4467
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getEntitlementStatus",
      "class_name": "GetEntitlementStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4468
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getEntitlementStatus",
      "class_name": "GetEntitlementStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4469
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/claimEntitlement",
      "class_name": "ClaimEntitlementRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4470
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/claimEntitlement",
      "class_name": "ClaimEntitlementResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4471
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryVoiceGreeting",
      "class_name": "QueryVoiceGreetingRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4472
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryVoiceGreeting",
      "class_name": "QueryVoiceGreetingResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4473
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadVoiceGreeting",
      "class_name": "UploadVoiceGreetingRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4474
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadVoiceGreeting",
      "class_name": "UploadVoiceGreetingResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4475
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSubscriptionsV2",
      "class_name": "GetSubscriptionsV2Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4476
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSubscriptionsV2",
      "class_name": "GetSubscriptionsV2Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4477
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getChangePhoneNumberHistory",
      "class_name": "GetChangePhoneNumberHistoryRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4478
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getChangePhoneNumberHistory",
      "class_name": "GetChangePhoneNumberHistoryResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4479
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/increaseBalanceForLiveStream",
      "class_name": "IncreaseBalanceForLiveStreamRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4480
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/increaseBalanceForLiveStream",
      "class_name": "IncreaseBalanceForLiveStreamResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4481
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/adminDeletePaypalId",
      "class_name": "AdminDeletePaypalIdRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4482
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/adminDeletePaypalId",
      "class_name": "AdminDeletePaypalIdResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4483
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/clearEntitlement",
      "class_name": "ClearEntitlementRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4484
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/clearEntitlement",
      "class_name": "ClearEntitlementResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4485
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPwaUserBalanceChangeHistory",
      "class_name": "GetPwaUserBalanceChangeHistoryRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4486
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPwaUserBalanceChangeHistory",
      "class_name": "GetPwaUserBalanceChangeHistoryResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4487
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getServerTime",
      "class_name": "GetServerTimeRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4488
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getServerTime",
      "class_name": "GetServerTimeResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4489
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listCallOrderByRange",
      "class_name": "ListCallOrderByRangeRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4490
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listCallOrderByRange",
      "class_name": "ListCallOrderByRangeResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4491
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getGraceChatManFeeds",
      "class_name": "GetGraceChatManFeedsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4492
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getGraceChatManFeeds",
      "class_name": "GetGraceChatManFeedsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4493
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCanCall",
      "class_name": "GetUserCanCallRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4494
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCanCall",
      "class_name": "GetUserCanCallResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4495
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fakeUser",
      "class_name": "FkUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4496
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fakeUser",
      "class_name": "FkUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4497
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getTodayLiveUser",
      "class_name": "GetTodayLiveUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4498
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getTodayLiveUser",
      "class_name": "GetTodayLiveUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4499
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyPWAInvitationCode",
      "class_name": "VerifyPWAInvitationCodeRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4500
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyPWAInvitationCode",
      "class_name": "VerifyPWAInvitationCodeResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4501
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/listCallOrderByRangeAdmin",
      "class_name": "ListCallOrderByRangeAdminRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4502
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/listCallOrderByRangeAdmin",
      "class_name": "ListCallOrderByRangeAdminResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4503
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaSendGift",
      "class_name": "PWASendGiftRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4504
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaSendGift",
      "class_name": "PWASendGiftResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4505
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaTextEarn",
      "class_name": "PWAATextEarnRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4506
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaTextEarn",
      "class_name": "PWAATextEarnResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4507
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaWaitingEarn",
      "class_name": "PWAWaitingEarnRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4508
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaWaitingEarn",
      "class_name": "PWAWaitingEarnResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4509
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportVisitor",
      "class_name": "ReportVisitorRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4510
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportVisitor",
      "class_name": "ReportVisitorResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4511
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getVisitorList",
      "class_name": "GetVisitorListRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4512
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getVisitorList",
      "class_name": "GetVisitorListResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4513
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getNewVisitorCount",
      "class_name": "GetNewVisitorCountRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4514
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getNewVisitorCount",
      "class_name": "GetNewVisitorCountResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4515
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getNewUserVideoMatchFeed",
      "class_name": "GetNewUserVideoMatchFeedRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4516
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getNewUserVideoMatchFeed",
      "class_name": "GetNewUserVideoMatchFeedResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4517
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/likeUserProfile",
      "class_name": "LikeUserProfileRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4518
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/likeUserProfile",
      "class_name": "LikeUserProfileResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4519
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/unlikeUserProfile",
      "class_name": "UnlikeUserProfileRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4520
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/unlikeUserProfile",
      "class_name": "UnlikeUserProfileResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4521
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserProfileLikeData",
      "class_name": "GetUserProfileLikeDataRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4522
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserProfileLikeData",
      "class_name": "GetUserProfileLikeDataResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4523
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/gameSpin",
      "class_name": "GameSpinRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4524
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/gameSpin",
      "class_name": "GameSpinResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4525
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/claimSpinNotEnoughReward",
      "class_name": "ClaimSpinNotEnoughRewardRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4526
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/claimSpinNotEnoughReward",
      "class_name": "ClaimSpinNotEnoughRewardResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4527
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCallOrderTotalEarn",
      "class_name": "GetUserCallOrderTotalEarnRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4528
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCallOrderTotalEarn",
      "class_name": "GetUserCallOrderTotalEarnResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4529
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/scratchGameResult",
      "class_name": "ScratchGameResultRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4530
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/scratchGameResult",
      "class_name": "ScratchGameResultResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4531
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/scratchGameClaimReward",
      "class_name": "ScratchGameClaimRewardRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4532
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/scratchGameClaimReward",
      "class_name": "ScratchGameClaimRewardResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4533
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserVisitorSubscriptionPackage",
      "class_name": "GetUserVisitorSubscriptionPackageRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4536
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserVisitorSubscriptionPackage",
      "class_name": "GetUserVisitorSubscriptionPackageResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4537
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSubscriptionsV3",
      "class_name": "GetSubscriptionsV3Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4538
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getSubscriptionsV3",
      "class_name": "GetSubscriptionsV3Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4539
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyVisitorSubscription",
      "class_name": "VerifyVisitorSubscriptionRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4540
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyVisitorSubscription",
      "class_name": "VerifyVisitorSubscriptionResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4541
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadUserVideo",
      "class_name": "UploadUserVideoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4542
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadUserVideo",
      "class_name": "UploadUserVideoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4543
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminPWATestVideo",
      "class_name": "AdminPWATestVideoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4544
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminPWATestVideo",
      "class_name": "AdminPWATestVideoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4545
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getMaleUserBalance",
      "class_name": "GetMaleUserBalanceRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4546
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getMaleUserBalance",
      "class_name": "GetMaleUserBalanceResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4547
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetClubUserList",
      "class_name": "AdminGetClubUserListRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4548
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetClubUserList",
      "class_name": "AdminGetClubUserListResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4549
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyPWAUserTestVideo",
      "class_name": "VerifyPWAUserTestVideoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4550
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/verifyPWAUserTestVideo",
      "class_name": "VerifyPWAUserTestVideoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4551
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getMatchFeedsV3",
      "class_name": "GetMatchFeedsV3Request",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4552
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getMatchFeedsV3",
      "class_name": "GetMatchFeedsV3Response",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4553
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/swipeCard",
      "class_name": "SwipeCardRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4554
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/swipeCard",
      "class_name": "SwipeCardResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4555
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadAnchorVideo",
      "class_name": "UploadAnchorVideoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4556
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadAnchorVideo",
      "class_name": "UploadAnchorVideoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4557
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getAnchorVideoStatus",
      "class_name": "GetAnchorVideoStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4558
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getAnchorVideoStatus",
      "class_name": "GetAnchorVideoStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4559
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getAdminAnchorVideo",
      "class_name": "GetAdminAnchorVideoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4560
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getAdminAnchorVideo",
      "class_name": "GetAdminAnchorVideoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4561
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/auditAdminAnchorVideo",
      "class_name": "AuditAdminAnchorVideoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4562
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/auditAdminAnchorVideo",
      "class_name": "AuditAdminAnchorVideoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4563
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getAdminClub",
      "class_name": "GetAdminClubRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4564
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getAdminClub",
      "class_name": "GetAdminClubResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4565
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/addAdminClub",
      "class_name": "AddAdminClubRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4566
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/addAdminClub",
      "class_name": "AddAdminClubResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4567
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportExposure",
      "class_name": "ReportExposureRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4568
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportExposure",
      "class_name": "ReportExposureResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4569
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fakeVerifyIOS",
      "class_name": "FakeVerifyIOSRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4570
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fakeVerifyIOS",
      "class_name": "FakeVerifyIOSResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4571
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fakeBuyCoin",
      "class_name": "FakeBuyCoinRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4572
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fakeBuyCoin",
      "class_name": "FakeBuyCoinResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4573
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getMatchLikedList",
      "class_name": "GetMatchLikedListRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4574
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getMatchLikedList",
      "class_name": "GetMatchLikedListResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4575
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/markMatchLikedRead",
      "class_name": "MarkMatchLikedReadRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4576
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/markMatchLikedRead",
      "class_name": "MarkMatchLikedReadResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4577
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUnreadLikedList",
      "class_name": "GetUnreadLikedListRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4578
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUnreadLikedList",
      "class_name": "GetUnreadLikedListResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4579
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportMatch",
      "class_name": "ReportMatchRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4580
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportMatch",
      "class_name": "ReportMatchResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4581
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetPwaActionUserListInRange",
      "class_name": "AdminGetPwaActionUserListInRangeRequest",
      "client_package": "UserServiceAdminApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4582
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetPwaActionUserListInRange",
      "class_name": "AdminGetPwaActionUserListInRangeResponse",
      "client_package": "UserServiceAdminApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4583
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/userStreakCheckIn",
      "class_name": "StreakCheckinRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4584
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/userStreakCheckIn",
      "class_name": "StreakCheckinResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4585
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserStreakCheckInInfo",
      "class_name": "GetStreakStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4586
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserStreakCheckInInfo",
      "class_name": "GetStreakStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4587
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getRecommendUsersForVideoCall",
      "class_name": "GetRecommendUsersForVideoCallRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4588
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getRecommendUsersForVideoCall",
      "class_name": "GetRecommendUsersForVideoCallResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4589
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getTestVideo",
      "class_name": "GetTestVideoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4590
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getTestVideo",
      "class_name": "GetTestVideoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4591
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getVideoCallSwitch",
      "class_name": "GetVideoCallSwitchRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4592
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getVideoCallSwitch",
      "class_name": "GetVideoCallSwitchResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4593
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/setVideoCallSwitch",
      "class_name": "SetVideoCallSwitchRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4594
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/setVideoCallSwitch",
      "class_name": "SetVideoCallSwitchResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4595
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/manualLike",
      "class_name": "ManualLikeRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4596
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/manualLike",
      "class_name": "ManualLikeResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4597
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserLikeData",
      "class_name": "GetUserLikeDataRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4598
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserLikeData",
      "class_name": "GetUserLikeDataResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4599
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getGooglePlayProducts",
      "class_name": "GetGooglePlayProductsRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4600
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getGooglePlayProducts",
      "class_name": "GetGooglePlayProductsResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4601
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/generateThreePWAMsg",
      "class_name": "GenerateThreePWAMsgRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4602
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/generateThreePWAMsg",
      "class_name": "GenerateThreePWAMsgResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4603
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/sendUserPwaMsg",
      "class_name": "SendUserPwaMsgRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4604
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/sendUserPwaMsg",
      "class_name": "SendUserPwaMsgResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4605
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaEarnDeduction",
      "class_name": "PwaEarnDeductionRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4606
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaEarnDeduction",
      "class_name": "PwaEarnDeductionResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4607
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/submitVideoCallTranscript",
      "class_name": "SubmitVideoCallTranscriptRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4608
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/submitVideoCallTranscript",
      "class_name": "SubmitVideoCallTranscriptResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4609
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetVideoCallTranscriptByMessageId",
      "class_name": "AdminGetVideoCallTranscriptByMessageIdRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4610
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetVideoCallTranscriptByMessageId",
      "class_name": "AdminGetVideoCallTranscriptByMessageIdResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4611
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fakeVerifyVisitorSubscription",
      "class_name": "FakeVerifyVisitorSubscriptionRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4612
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/fakeVerifyVisitorSubscription",
      "class_name": "FakeVerifyVisitorSubscriptionResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4613
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getStaticConfig",
      "class_name": "GetStaticConfigRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4614
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getStaticConfig",
      "class_name": "GetStaticConfigResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4615
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getRetainUserGift",
      "class_name": "GetRetainUserGiftRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4616
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getRetainUserGift",
      "class_name": "GetRetainUserGiftResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4617
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryGiftUsage",
      "class_name": "QueryGiftUsageRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4618
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryGiftUsage",
      "class_name": "QueryGiftUsageResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4619
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetUserOnlineStatus",
      "class_name": "AdminGetUserOnlineStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4620
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminGetUserOnlineStatus",
      "class_name": "AdminGetUserOnlineStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4621
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserIntimacyBatch",
      "class_name": "GetUserIntimacyBatchRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4622
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserIntimacyBatch",
      "class_name": "GetUserIntimacyBatchResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4623
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getCycleEntitlementInfo",
      "class_name": "GetCycleEntitlementInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4624
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getCycleEntitlementInfo",
      "class_name": "GetCycleEntitlementInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4625
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductCycleEntitlementCount",
      "class_name": "DeductCycleEntitlementCountRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4626
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deductCycleEntitlementCount",
      "class_name": "DeductCycleEntitlementCountResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4627
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/addCycleEntitlementCount",
      "class_name": "AddCycleEntitlementCountRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4628
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/addCycleEntitlementCount",
      "class_name": "AddCycleEntitlementCountResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4629
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getBoostTimeInfo",
      "class_name": "GetBoostTimeInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4630
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getBoostTimeInfo",
      "class_name": "GetBoostTimeInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4631
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/incrementTipsVideoCallCount",
      "class_name": "TipsVideoCallRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4632
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/incrementTipsVideoCallCount",
      "class_name": "TipsVideoCallResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4633
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaInsTextEarn",
      "class_name": "PWAINSTextEarnRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4636
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaInsTextEarn",
      "class_name": "PWAINSTextEarnResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4637
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/firstExchangeINSContact",
      "class_name": "FirstExchangeINSContactRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4638
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/firstExchangeINSContact",
      "class_name": "FirstExchangeINSContactResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4639
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/saveUserInsId",
      "class_name": "SaveUserInsIdRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4640
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/saveUserInsId",
      "class_name": "SaveUserInsIdResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4641
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/payInsExchangeOrder",
      "class_name": "PayInsExchangeOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4642
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/payInsExchangeOrder",
      "class_name": "PayInsExchangeOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4643
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createAndPayInsExchangeOrder",
      "class_name": "CreateAndPayInsExchangeOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4644
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createAndPayInsExchangeOrder",
      "class_name": "CreateAndPayInsExchangeOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4645
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getInsExchangeGiftInfo",
      "class_name": "GetInsExchangeGiftInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4646
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getInsExchangeGiftInfo",
      "class_name": "GetInsExchangeGiftInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4647
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkInsExchangeCondition",
      "class_name": "CheckInsExchangeConditionRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4648
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkInsExchangeCondition",
      "class_name": "CheckInsExchangeConditionResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4649
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/finishAndFollowInsExchangeOrder",
      "class_name": "FinishAndFollowInsExchangeOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4650
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/finishAndFollowInsExchangeOrder",
      "class_name": "FinishAndFollowInsExchangeOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4651
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listUserInsExchangeOrder",
      "class_name": "ListUserInsExchangeOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4652
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/listUserInsExchangeOrder",
      "class_name": "ListUserInsExchangeOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4653
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/generateInsMessage",
      "class_name": "GenerateInsMessageRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4654
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/generateInsMessage",
      "class_name": "GenerateInsMessageResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4655
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/saveInsChatHistory",
      "class_name": "SaveInsChatHistoryRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4656
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/saveInsChatHistory",
      "class_name": "SaveInsChatHistoryResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4657
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/rejectInsExchangeOrder",
      "class_name": "RejectInsExchangeOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4658
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/rejectInsExchangeOrder",
      "class_name": "RejectInsExchangeOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4659
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getInsExchangeConditionInfo",
      "class_name": "GetInsExchangeConditionInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4660
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getInsExchangeConditionInfo",
      "class_name": "GetInsExchangeConditionInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4661
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/initInsExchangeOrder",
      "class_name": "InitInsExchangeOrderRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4662
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/initInsExchangeOrder",
      "class_name": "InitInsExchangeOrderResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4663
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryPreIncrBalance",
      "class_name": "QueryPreIncrBalanceRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4664
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryPreIncrBalance",
      "class_name": "QueryPreIncrBalanceResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4665
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/confirmPreIncrBalance",
      "class_name": "ConfirmPreIncrBalanceRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4666
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/confirmPreIncrBalance",
      "class_name": "ConfirmPreIncrBalanceResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4667
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserInsTotalEarn",
      "class_name": "GetUserInsTotalEarnRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4668
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserInsTotalEarn",
      "class_name": "GetUserInsTotalEarnResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4669
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaInsFollowEarn",
      "class_name": "PWAINSFollowEarnRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4670
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaInsFollowEarn",
      "class_name": "PWAINSFollowEarnResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4671
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getInsChatHistory",
      "class_name": "GetInsChatHistoryRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4672
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getInsChatHistory",
      "class_name": "GetInsChatHistoryResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4673
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPwaFollowedUser",
      "class_name": "GetPwaFollowedUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4674
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPwaFollowedUser",
      "class_name": "GetPwaFollowedUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4675
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPwaInsExchangeOrderReward",
      "class_name": "GetPwaInsExchangeOrderRewardRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4676
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPwaInsExchangeOrderReward",
      "class_name": "GetPwaInsExchangeOrderRewardResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4677
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getLikeVisitorTaskInfo",
      "class_name": "GetLikeVisitorTaskInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4678
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getLikeVisitorTaskInfo",
      "class_name": "GetLikeVisitorTaskInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4679
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportColdStart",
      "class_name": "ReportColdStartRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4680
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportColdStart",
      "class_name": "ReportColdStartResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4681
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminQueryCallData",
      "class_name": "CallDataQueryRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4682
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminQueryCallData",
      "class_name": "CallDataQueryResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4683
    },
    {
      "desc": "上行消息 - 开始演示脚本",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/demoScript/start",
      "class_name": "StartDemoScriptRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4684
    },
    {
      "desc": "下行消息 - 开始演示脚本",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/demoScript/start",
      "class_name": "StartDemoScriptResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4685
    },
    {
      "desc": "上行消息 - 查询演示脚本状态",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/demoScript/status",
      "class_name": "GetDemoScriptStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4686
    },
    {
      "desc": "下行消息 - 查询演示脚本状态",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/demoScript/status",
      "class_name": "GetDemoScriptStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4687
    },
    {
      "desc": "上行消息 - 查询演示脚本状态",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/demoScript/update",
      "class_name": "UpdateDemoScriptRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4688
    },
    {
      "desc": "下行消息 - 查询演示脚本状态",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/demoScript/update",
      "class_name": "UpdateDemoScriptResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4689
    },
    {
      "desc": "上行消息 - 校验指定用户是否有免费通话时长",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkUserFreeCallDuration",
      "class_name": "CheckUserFreeCallDurationRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4690
    },
    {
      "desc": "下行消息 - 校验指定用户是否有免费通话时长",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkUserFreeCallDuration",
      "class_name": "CheckUserFreeCallDurationResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4691
    },
    {
      "desc": "上行消息 - 上报通话截屏检测结果",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadScreenshotDetect",
      "class_name": "UploadScreenshotDetectRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4692
    },
    {
      "desc": "下行消息 - 上报通话截屏检测结果",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadScreenshotDetect",
      "class_name": "UploadScreenshotDetectResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4693
    },
    {
      "desc": "上行消息 - 上报通话截屏检测结果",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminSearchScreenshotDetect",
      "class_name": "AdminSearchScreenshotDetectRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4694
    },
    {
      "desc": "下行消息 - 上报通话截屏检测结果",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminSearchScreenshotDetect",
      "class_name": "AdminSearchScreenshotDetectResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4695
    },
    {
      "desc": "上行消息 - 查询用户见的距离",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/userDistance",
      "class_name": "UserDistanceRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4696
    },
    {
      "desc": "下行消息 - 查询演示脚本状态",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/userDistance",
      "class_name": "UserDistanceResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4697
    },
    {
      "desc": "上行消息 - 发起截图检测",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/screenshotDetect",
      "class_name": "ScreenshotDetectRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4698
    },
    {
      "desc": "下行消息 - 发起截图检测",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/screenshotDetect",
      "class_name": "ScreenshotDetectResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4699
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deleteMatch",
      "class_name": "DeleteMatchRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4706
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/deleteMatch",
      "class_name": "DeleteMatchResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4707
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/ABtestConfig",
      "class_name": "ABtestConfigRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4708
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/ABtestConfig",
      "class_name": "ABtestConfigResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4709
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/matchList",
      "class_name": "MatchListRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4710
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/matchList",
      "class_name": "MatchListResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4711
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/inactiveMatchGift",
      "class_name": "InactiveMatchGiftRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4712
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/inactiveMatchGift",
      "class_name": "InactiveMatchGiftResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4713
    },
    {
      "desc": "上行消息 - 视频排队申请",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/videoCallQueueApply",
      "class_name": "VideoCallQueueApplyRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4720
    },
    {
      "desc": "下行消息 - 视频排队申请",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/videoCallQueueApply",
      "class_name": "VideoCallQueueApplyResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4721
    },
    {
      "desc": "上行消息 - PWA获取新的回拨用户",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaLoadVideoCall",
      "class_name": "PwaLoadVideoCallRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4722
    },
    {
      "desc": "下行消息 - PWA获取新的回拨用户",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaLoadVideoCall",
      "class_name": "PwaLoadVideoCallResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4723
    },
    {
      "desc": "上行消息 - PWA申请视频回拨",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaApplyVideoCall",
      "class_name": "PwaApplyVideoCallRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4724
    },
    {
      "desc": "下行消息 - PWA申请视频回拨",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaApplyVideoCall",
      "class_name": "PwaApplyVideoCallResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4725
    },
    {
      "desc": "上行消息 - PWA队列移除用户",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaQueueRemoveUser",
      "class_name": "PwaQueueRemoveUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4726
    },
    {
      "desc": "下行消息 - PWA队列移除用户",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaQueueRemoveUser",
      "class_name": "PwaQueueRemoveUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4727
    },
    {
      "desc": "上行消息 -search列表",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/searchList",
      "class_name": "UserSearchListRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4730
    },
    {
      "desc": "下行消息 - Search列表",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/searchList",
      "class_name": "UserSearchListResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4731
    },
    {
      "desc": "上行消息 - search",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/search",
      "class_name": "UserSearchRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4732
    },
    {
      "desc": "下行消息 - search",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/search",
      "class_name": "UserSearchResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4733
    },
    {
      "desc": "上行消息 -pwa确认匹配",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaConfirmMatch",
      "class_name": "PwaConfirmMatchRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4734
    },
    {
      "desc": "下行消息 -pwa确认匹配",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaConfirmMatch",
      "class_name": "PwaConfirmMatchResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4735
    },
    {
      "desc": "下行消息 -search取消",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/searchCancel",
      "class_name": "SearchCancelRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4738
    },
    {
      "desc": "下行消息 - search取消",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/searchCancel",
      "class_name": "SearchCancelResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4739
    },
    {
      "desc": "上行消息 - 查询是否被女士拉黑",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getBlockedStatusInfo",
      "class_name": "GetBlockedStatusInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4750
    },
    {
      "desc": "下行消息 - 查询是否被女士拉黑",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getBlockedStatusInfo",
      "class_name": "GetBlockedStatusInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4751
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/matchUnlock",
      "class_name": "MatchUnlockRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4752
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/matchUnlock",
      "class_name": "MatchUnlockResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4753
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getPwaPaidVideoCallList",
      "class_name": "QueryPwaPaidCallListRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4754
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/getPwaPaidVideoCallList",
      "class_name": "QueryPwaPaidCallListResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4755
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createUnifiedPaymentOrder",
      "class_name": "CreatePaymentRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4756
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/createUnifiedPaymentOrder",
      "class_name": "CreatePaymentResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4757
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminCleanUserSubscription",
      "class_name": "AdminCleanUserSubscriptionRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4758
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adminCleanUserSubscription",
      "class_name": "AdminCleanUserSubscriptionResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4759
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadAppsflyerInfo",
      "class_name": "UploadAppsflyerInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4760
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/uploadAppsflyerInfo",
      "class_name": "UploadAppsflyerInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4761
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUnifiedPaymentOrderStatus",
      "class_name": "QueryPaymentOrderStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4762
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/queryUnifiedPaymentOrderStatus",
      "class_name": "QueryPaymentOrderStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4763
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportPwaWithdrawPhase",
      "class_name": "ReportPwaWithdrawPhaseRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4766
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportPwaWithdrawPhase",
      "class_name": "ReportPwaWithdrawPhaseResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4767
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaChangeDispatchStatus",
      "class_name": "PwaChangeDispatchStatusRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4768
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/pwaChangeDispatchStatus",
      "class_name": "PwaChangeDispatchStatusResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4769
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getThirdPartyLoginOldUser",
      "class_name": "GetThirdPartyLoginOldUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4770
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getThirdPartyLoginOldUser",
      "class_name": "GetThirdPartyLoginOldUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4771
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryPwaDailyData",
      "class_name": "QueryPwaDailyDataRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4772
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryPwaDailyData",
      "class_name": "QueryPwaDailyDataResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4773
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/sumUserRevenue",
      "class_name": "SumAdminUserRevenueRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4774
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/sumUserRevenue",
      "class_name": "SumAdminUserRevenueResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4775
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryPwaRscore",
      "class_name": "QueryPwaRscoreRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4776
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryPwaRscore",
      "class_name": "QueryPwaRscoreResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4777
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportPwaVideo",
      "class_name": "ReportPwaVideoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4778
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportPwaVideo",
      "class_name": "ReportPwaVideoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4779
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/faceScore",
      "class_name": "FaceScoreRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4780
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/faceScore",
      "class_name": "FaceScoreResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4781
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/userInfo",
      "class_name": "UserInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4782
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/userInfo",
      "class_name": "UserInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4783
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportCoinOffer",
      "class_name": "ReportCoinOfferRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4784
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportCoinOffer",
      "class_name": "ReportCoinOfferResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4785
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryUserExpendInfo",
      "class_name": "QueryUserExpendInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4786
    },

    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryUserExpendInfo",
      "class_name": "QueryUserExpendInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4787
    },

    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportMockVideo",
      "class_name": "ReportMockVideoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4788
    },

    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/reportMockVideo",
      "class_name": "ReportMockVideoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4789
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCallOrderRank",
      "class_name": "GetUserCallOrderRankRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4790
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getUserCallOrderRank",
      "class_name": "getUserCallOrderRankResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4791
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryPwaVideoInfo",
      "class_name": "QueryPwaVideoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4792
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryPwaVideoInfo",
      "class_name": "QueryPwaVideoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4793
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/punishmentPwa",
      "class_name": "PunishmentPwaRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4794
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/punishmentPwa",
      "class_name": "PunishmentPwaResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4795
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryTopUser",
      "class_name": "QueryTopUserRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4796
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryTopUser",
      "class_name": "QueryTopUserResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4797
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/normalMediumWithdrawCheck",
      "class_name": "NormalMediumWithdrawCheckRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4798
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/normalMediumWithdrawCheck",
      "class_name": "NormalMediumWithdrawCheckResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4799
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adjustTraffic",
      "class_name": "AdjustTrafficRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4800
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/adjustTraffic",
      "class_name": "AdjustTrafficResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4801
    },

    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryOperationLog",
      "class_name": "QueryPwaDataOperationLogRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4802
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryOperationLog",
      "class_name": "QueryPwaDataOperationLogResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4803
    },

    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPostPictures",
      "class_name": "GetPostPicturesRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4804
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPostPictures",
      "class_name": "GetPostPicturesResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4805
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPayPalUserInfo",
      "class_name": "GetPaypalUserInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4808
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getPayPalUserInfo",
      "class_name": "GetPaypalUserInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4809
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryPunishmentMessage",
      "class_name": "QueryPunishmentRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4806
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "Admin",
      "url": "/userApi/queryPunishmentMessage",
      "class_name": "QueryPunishmentResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4807
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFaceIdToken",
      "class_name": "GetFaceIdTokenRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4810
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getFaceIdToken",
      "class_name": "GetFaceIdTokenResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4811
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkFaceIdResult",
      "class_name": "CheckFaceIdResultRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4812
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/checkFaceIdResult",
      "class_name": "CheckFaceIdResultResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4813
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getCallOrderPrice",
      "class_name": "GetCallOrderPriceRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4814
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/userApi/getCallOrderPrice",
      "class_name": "GetCallOrderPriceResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4815
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/bffApi/getLandingInfo",
      "class_name": "BffGetLandingInfoRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4900
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/bffApi/getLandingInfo",
      "class_name": "BffGetLandingInfoResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4901
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/bffApi/getOverview",
      "class_name": "BffGetOverviewRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4904
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/bffApi/getOverview",
      "class_name": "BffGetOverviewResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4905
    },
    {
      "desc": "上行消息",
      "service": "user_service",
      "type": "App",
      "url": "/bffApi/getDashboard",
      "class_name": "BffGetDashboardRequest",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4906
    },
    {
      "desc": "下行消息",
      "service": "user_service",
      "type": "App",
      "url": "/bffApi/getDashboard",
      "class_name": "BffGetDashboardResponse",
      "client_package": "UserServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 4907
    }
  ]
}

```
