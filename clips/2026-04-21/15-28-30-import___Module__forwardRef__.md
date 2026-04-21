---
date: 2026-04-21T15:28:30+08:00
source: clipboard
chars: 550
---

import { Module, forwardRef } from '@nestjs/common';
import { KafkaConsumerService } from './kafka-consumer.service';
import { KafkaProducerService } from './kafka-producer.service';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { StrategyModule } from '../strategy/strategy.module';

@Module({
  imports: [forwardRef(() => SchedulerModule), forwardRef(() => StrategyModule)],
  providers: [KafkaConsumerService, KafkaProducerService],
  exports: [KafkaConsumerService, KafkaProducerService],
})
export class KafkaModule {}

