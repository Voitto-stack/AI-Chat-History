---
date: 2026-04-21T15:27:54+08:00
source: clipboard
chars: 1451
---

import { Module, forwardRef } from '@nestjs/common';
import { DeviceGateway } from './device.gateway';
import { DeviceCommandService } from './device-command.service';
import { DeviceRegistryService } from './device-registry.service';
import { HeartbeatService } from './heartbeat.service';
import { RateLimiterService } from './rate-limiter.service';
import { ObservabilityService } from './observability.service';
import { DeviceAllocatorService } from './device-allocator.service';
import { MinervaWsClientService } from './minerva-ws-client.service';
import { FeishuAlertService } from './feishu-alert.service';
import { GatewayController } from './gateway.controller';
import { StrategyModule } from '../strategy/strategy.module';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { ExecutionModule } from '../execution/execution.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => StrategyModule), forwardRef(() => SchedulerModule), forwardRef(() => ExecutionModule), AuthModule],
  controllers: [GatewayController],
  providers: [
    DeviceGateway,
    DeviceCommandService,
    DeviceRegistryService,
    HeartbeatService,
    RateLimiterService,
    ObservabilityService,
    DeviceAllocatorService,
    MinervaWsClientService,
    FeishuAlertService,
  ],
  exports: [DeviceCommandService, DeviceRegistryService, DeviceAllocatorService],
})
export class GatewayModule {}

