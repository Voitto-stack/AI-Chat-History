---
date: 2026-04-21T15:27:40+08:00
source: clipboard
chars: 2665
---

import { Module, forwardRef } from '@nestjs/common';

import { ActionRegistry } from './action-registry';
import { ContextBuilder } from './context-builder';
import { AichatService } from './aichat.service';
import { ActionLogService } from './action-log.service';
import { ACTION_HANDLERS } from './action-handler.interface';

// Handlers — 被 V2 session-builder 使用
import { FollowBackHandler } from './handlers/follow-back.handler';
import { ReplyDMHandler } from './handlers/reply-dm.handler';
import { AcceptMsgReqHandler } from './handlers/accept-msg-req.handler';
// Handlers — V2 新增
import { ViewStoryHandler } from './handlers/view-story.handler';
import { LikeHandler } from './handlers/like.handler';
import { CommentHandler } from './handlers/comment.handler';
import { PublishPostHandler } from './handlers/publish-post.handler';
import { PublishStoryHandler } from './handlers/publish-story.handler';
import { ViewProfileHandler } from './handlers/view-profile.handler';
import { BrowseFeedHandler } from './handlers/browse-feed.handler';
import { CheckInboxHandler } from './handlers/check-inbox.handler';
import { CheckNotificationsHandler } from './handlers/check-notifications.handler';
import { SendDMHandler } from './handlers/send-dm.handler';

// Interceptors
import {
  InterceptorChain,
  DeviceOnlineInterceptor,
  RateLimitInterceptor,
  CooldownInterceptor,
  EngagementGateInterceptor,
} from './interceptors';

import { ScriptModule } from '../script/script.module';
import { StrategyModule } from '../strategy/strategy.module';
import { GatewayModule } from '../gateway/gateway.module';

/** 所有 Handler 类（新增 handler 只需在此追加） */
const HANDLER_CLASSES = [
  FollowBackHandler, ReplyDMHandler, AcceptMsgReqHandler,
  ViewStoryHandler, LikeHandler, CommentHandler,
  PublishPostHandler, PublishStoryHandler, ViewProfileHandler,
  BrowseFeedHandler, CheckInboxHandler, CheckNotificationsHandler,
  SendDMHandler,
];

@Module({
  imports: [ScriptModule, forwardRef(() => StrategyModule), forwardRef(() => GatewayModule)],
  providers: [
    ActionRegistry,
    ContextBuilder,
    AichatService,
    ActionLogService,

    // Handler DI：注入所有 handler 到 ACTION_HANDLERS token
    ...HANDLER_CLASSES,
    {
      provide: ACTION_HANDLERS,
      useFactory: (...handlers: any[]) => handlers,
      inject: HANDLER_CLASSES,
    },

    // 拦截器
    DeviceOnlineInterceptor,
    RateLimitInterceptor,
    CooldownInterceptor,
    EngagementGateInterceptor,
    InterceptorChain,
  ],
  exports: [AichatService, ActionLogService, ActionRegistry, ContextBuilder],
})
export class ActionModule {}

