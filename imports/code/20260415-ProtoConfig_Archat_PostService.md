---
title: ProtoConfig_Archat_PostService
date: 2026-04-15T17:04:47+08:00
source: import
language: json
original: ProtoConfig_Archat_PostService.json
---

# ProtoConfig_Archat_PostService

```json
{
  "startId": 19000,
  "desc": "proto协议配置:id默认遵守从startId开始，上行消息Id = 下行消息Id + 1, 必要上行消息",
  "protos": [
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/createPostComment",
      "class_name": "CreatePostCommentRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19000
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/createPostComment",
      "class_name": "CreatePostCommentResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19001
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/likePost",
      "class_name": "LikePostRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19002
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/likePost",
      "class_name": "LikePostResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19003
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/unlikePost",
      "class_name": "UnlikePostRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19004
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/unlikePost",
      "class_name": "UnlikePostResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19005
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/createPost",
      "class_name": "CreatePostRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19006
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/createPost",
      "class_name": "CreatePostResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19007
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/deletePost",
      "class_name": "DeletePostRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19008
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/deletePost",
      "class_name": "DeletePostResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19009
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getPostsByIds",
      "class_name": "GetPostsByIdsRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19010
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getPostsByIds",
      "class_name": "GetPostsByIdsResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19011
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getPostsByUserId",
      "class_name": "GetPostsByUserIdRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19012
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getPostsByUserId",
      "class_name": "GetPostsByUserIdResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19013
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminBanPosts",
      "class_name": "AdminBanPostsRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19014
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminBanPosts",
      "class_name": "AdminBanPostsResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19015
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminUnBanPosts",
      "class_name": "AdminUnBanPostsRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19016
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminUnBanPosts",
      "class_name": "AdminUnBanPostsResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19017
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminGetPosts",
      "class_name": "AdminGetPostsRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19018
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminGetPosts",
      "class_name": "AdminGetPostsResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19019
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getPostComments",
      "class_name": "GetPostCommentsRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19020
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getPostComments",
      "class_name": "GetPostCommentsResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19021
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getReplyPostComments",
      "class_name": "GetReplyPostCommentsRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19022
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getReplyPostComments",
      "class_name": "GetReplyPostCommentsResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19023
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/updatePostComment",
      "class_name": "UpdatePostCommentRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19024
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/updatePostComment",
      "class_name": "UpdatePostCommentResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19025
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/deletePostComment",
      "class_name": "DeletePostCommentRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19026
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/deletePostComment",
      "class_name": "DeletePostCommentResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19027
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminCreatePost",
      "class_name": "AdminCreatePostRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19028
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminCreatePost",
      "class_name": "AdminCreatePostResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19029
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminEditPost",
      "class_name": "AdminEditPostRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19030
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminEditPost",
      "class_name": "AdminEditPostResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19031
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminDigitalHumanLikePost",
      "class_name": "AdminDigitalHumanLikePostRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19032
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminDigitalHumanLikePost",
      "class_name": "AdminDigitalHumanLikePostResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19033
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminCreatePostComment",
      "class_name": "AdminCreatePostCommentRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19034
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminCreatePostComment",
      "class_name": "AdminCreatePostCommentResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19035
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getPostFeed",
      "class_name": "GetPostFeedRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19036
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getPostFeed",
      "class_name": "GetPostFeedResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19037
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminAdjustPostScore",
      "class_name": "AdminAdjustPostScoreRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19038
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminAdjustPostScore",
      "class_name": "AdminAdjustPostScoreResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19039
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/reportPost",
      "class_name": "ReportPostRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19040
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/reportPost",
      "class_name": "ReportPostResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19041
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminResetPostScore",
      "class_name": "AdminResetPostScoreRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19042
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminResetPostScore",
      "class_name": "AdminResetPostScoreResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19043
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminGetAllOverwritePostScore",
      "class_name": "AdminGetAllOverwritePostScoreRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19044
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminGetAllOverwritePostScore",
      "class_name": "AdminGetAllOverwritePostScoreResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19045
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getPostDetail",
      "class_name": "GetPostDetailRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19046
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/getPostDetail",
      "class_name": "GetPostDetailResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19047
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminDeletePost",
      "class_name": "AdminDeletePostRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19048
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminDeletePost",
      "class_name": "AdminDeletePostResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19049
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/devBanPost",
      "class_name": "DevBanPostRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19050
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/devBanPost",
      "class_name": "DevBanPostResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19051
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminGetPostsByUserId",
      "class_name": "GetPostsByUserIdRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19052
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/postApi/adminGetPostsByUserId",
      "class_name": "GetPostsByUserIdResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19053
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/storyApi/adminCreateStory",
      "class_name": "AdminCreateStoryRequest",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19054
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/storyApi/adminCreateStory",
      "class_name": "AdminCreateStoryResponse",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19055
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/storyApi/adminEditStory",
      "class_name": "AdminEditStoryRequest",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19056
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/storyApi/adminEditStory",
      "class_name": "AdminEditStoryResponse",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19057
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/storyApi/adminDeleteStory",
      "class_name": "AdminDeleteStoryRequest",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19058
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/storyApi/adminDeleteStory",
      "class_name": "AdminDeleteStoryResponse",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19059
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/storyApi/adminGetStoryList",
      "class_name": "AdminGetStoryListRequest",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19060
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "Admin",
      "url": "/storyApi/adminGetStoryList",
      "class_name": "AdminGetStoryListResponse",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19061
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getStoryFeed",
      "class_name": "GetStoryFeedRequest",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19062
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getStoryFeed",
      "class_name": "GetStoryFeedResponse",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19063
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getStoryBanner",
      "class_name": "GetStoryBannerRequest",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19064
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getStoryBanner",
      "class_name": "GetStoryBannerResponse",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19065
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getStoryById",
      "class_name": "GetStoryByIdRequest",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19066
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getStoryById",
      "class_name": "GetStoryByIdResponse",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19067
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getMyStoryFeed",
      "class_name": "GetMyStoryFeedRequest",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19068
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getMyStoryFeed",
      "class_name": "GetMyStoryFeedResponse",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19069
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getRandStoryBlessText",
      "class_name": "GetRandStoryBlessTextRequest",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19070
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getRandStoryBlessText",
      "class_name": "GetRandStoryBlessTextResponse",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19071
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/createStoryBless",
      "class_name": "CreateStoryBlessRequest",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19072
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/createStoryBless",
      "class_name": "CreateStoryBlessResponse",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19073
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getStoryBlessFeed",
      "class_name": "GetStoryBlessFeedRequest",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19074
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/storyApi/getStoryBlessFeed",
      "class_name": "GetStoryBlessFeedResponse",
      "client_package": "PostServiceApi.Story",
      "server_package": "com.pserver.proto.archat",
      "id": 19075
    },
    {
      "desc": "上行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/postSuggestedContent",
      "class_name": "PostSuggestedContentRequest",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19076
    },
    {
      "desc": "下行消息",
      "service": "post_service",
      "type": "App",
      "url": "/postApi/postSuggestedContent",
      "class_name": "PostSuggestedContentResponse",
      "client_package": "PostServiceApi",
      "server_package": "com.pserver.proto.archat",
      "id": 19077
    }
  ]
}

```
