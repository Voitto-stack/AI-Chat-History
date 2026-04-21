---
date: 2026-04-21T15:28:19+08:00
source: clipboard
chars: 1126
---

import { Module, forwardRef } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { DualQueueService } from './dual-queue.service';
import { RhythmClockService } from './rhythm-clock.service';
import { EventListenerService } from './event-listener.service';
import { StrategyModule } from '../strategy/strategy.module';
import { StrategyV2Module } from '../strategy-v2/strategy-v2.module';
import { ExecutionModule } from '../execution/execution.module';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [
    forwardRef(() => StrategyModule),  // provides REDIS_CLIENT
    forwardRef(() => StrategyV2Module),
    forwardRef(() => ExecutionModule),
    forwardRef(() => KafkaModule),     // provides KafkaProducerService
  ],
  controllers: [SchedulerController],
  providers: [
    SchedulerService,
    DualQueueService,
    RhythmClockService,
    EventListenerService,
  ],
  exports: [SchedulerService, EventListenerService, RhythmClockService, DualQueueService],
})
export class SchedulerModule {}

