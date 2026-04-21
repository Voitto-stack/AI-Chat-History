---
date: 2026-04-21T15:28:08+08:00
source: clipboard
chars: 1092
---

import { Module, forwardRef } from '@nestjs/common';
import { ExecutionService } from './execution.service';
import { ExecutionQueueService } from './execution-queue.service';
import { ExecutionLogService } from './execution-log.service';
import { CircuitBreakerService } from './circuit-breaker.service';
import { PrismaService } from '../prisma.service';
import { StrategyModule } from '../strategy/strategy.module';
import { StrategyV2Module } from '../strategy-v2/strategy-v2.module';
import { ActionModule } from '../action/action.module';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [
    forwardRef(() => StrategyModule),  // provides REDIS_CLIENT
    forwardRef(() => StrategyV2Module), // provides IGMessageLogService
    forwardRef(() => ActionModule),
    forwardRef(() => GatewayModule),
  ],
  providers: [
    PrismaService,
    ExecutionService,
    ExecutionQueueService,
    ExecutionLogService,
    CircuitBreakerService,
  ],
  exports: [ExecutionService, CircuitBreakerService, ExecutionLogService],
})
export class ExecutionModule {}

