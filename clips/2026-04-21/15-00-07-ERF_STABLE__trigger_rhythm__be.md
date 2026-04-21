---
date: 2026-04-21T15:00:07+08:00
source: clipboard
chars: 52940
---

ERF_STABLE, trigger=rhythm, behaviors=14
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_7a402f17aa3e494ea91ae35b2f5b2974, creator=C001, trigger=rhythm, behaviors=10
@sitin/social-proxy-server:test: (node:98291) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test:  FAIL  src/__tests__/v2-concurrency.spec.ts (16.67 s)
@sitin/social-proxy-server:test:   ● V2 Concurrency Tests › Circuit breaker under concurrent failure reports › concurrent circuit breaker checks for different creators are independentoxy-server:test: 
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(received).toBeGreaterThanOrEqual(expected)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Expected: >= 1
@sitin/social-proxy-server:test:     Received:    0
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       324 |       const stateC002 = await cb.getState('C002');
@sitin/social-proxy-server:test:       325 |
@sitin/social-proxy-server:test:     > 326 |       expect(stateC001.level).toBeGreaterThanOrEqual(1);
@sitin/social-proxy-server:test:           |                               ^
@sitin/social-proxy-server:test:       327 |       // C002 had no errors so should remain at level 0
@sitin/social-proxy-server:test:       328 |       expect(stateC002.level).toBe(0);
@sitin/social-proxy-server:test:       329 |     });
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-concurrency.spec.ts:326:31)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_cafdad3f8ee04a8291f7e771cc59cf41, creator=C001, trigger=rhythm, behaviors=10
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_79f11cdfe0bf47b589cbc9da7a2c1645, creator=C001, trigger=rhythm, behaviors=10
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_b844567f63654a68aaef91869b1e1b22, creator=C001, trigger=rhythm, behaviors=10
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_26c605b5f63e4cfaabdc6e523410311b, creator=C001, trigger=rhythm, behaviors=11
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_2d6e9b55f1c54f5f982695df2f2942d0, creator=C001, trigger=rhythm, behaviors=9 
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_9860140ed3804808899ef6e59d5e78b3, creator=C001, trigger=rhythm, behaviors=9 
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_f1b049d6f1b647e6b34481f9bff073f0, creator=C001, trigger=rhythm, behaviors=8
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_ce582751e1e7466898f37a7efba029b7, creator=C001, trigger=rhythm, behaviors=9
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_8d0d39491a0b42dea7955da1e3be16d7, creator=C001, trigger=rhythm, behaviors=9
@sitin/social-proxy-server:test: (node:98290) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test:  FAIL  src/execution/__tests__/execution-e2e.spec.ts (16.702 s)
@sitin/social-proxy-server:test:   ● Execution Engine E2E › Circuit breaker: failure → level transitions › Level 0 → Level 1 after 3 consecutive failures
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(received).toBe(expected) // Object.is equality
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Expected: 1
@sitin/social-proxy-server:test:     Received: 0
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       154 |       const state = await circuitBreaker.onError(creatorId, 'NETWORK_ERROR', cbConfig);
@sitin/social-proxy-server:test:       155 |
@sitin/social-proxy-server:test:     > 156 |       expect(state.level).toBe(1);
@sitin/social-proxy-server:test:           |                           ^
@sitin/social-proxy-server:test:       157 |       expect(state.consecutiveFailures).toBe(3);
@sitin/social-proxy-server:test:       158 |       expect(await circuitBreaker.isPaused(creatorId)).toBe(false);
@sitin/social-proxy-server:test:       159 |     });
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/execution/__tests__/execution-e2e.spec.ts:156:27)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● Execution Engine E2E › Circuit breaker: failure → level transitions › Level 0 → Level 2 after 5 consecutive failures (pauses scheduling)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(received).toBe(expected) // Object.is equality
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Expected: 2
@sitin/social-proxy-server:test:     Received: 0
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       168 |       const state = await circuitBreaker.onError(creatorId, 'SCRIPT_ERROR', cbConfig);
@sitin/social-proxy-server:test:       169 |
@sitin/social-proxy-server:test:     > 170 |       expect(state.level).toBe(2);
@sitin/social-proxy-server:test:           |                           ^
@sitin/social-proxy-server:test:       171 |       expect(state.pauseUntil).toBeGreaterThan(Date.now());
@sitin/social-proxy-server:test:       172 |       expect(await circuitBreaker.isPaused(creatorId)).toBe(true);
@sitin/social-proxy-server:test:       173 |     });
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/execution/__tests__/execution-e2e.spec.ts:170:27)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● Execution Engine E2E › Circuit breaker: failure → level transitions › onSuccess resets consecutiveFailures and recovers Level 1 → Level 0
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(received).toBe(expected) // Object.is equality
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Expected: 1
@sitin/social-proxy-server:test:     Received: 0
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       206 |         await circuitBreaker.onError(creatorId, 'ERR', cbConfig);
@sitin/social-proxy-server:test:       207 |       }
@sitin/social-proxy-server:test:     > 208 |       expect((await circuitBreaker.getState(creatorId)).level).toBe(1);
@sitin/social-proxy-server:test:           |                                                                ^
@sitin/social-proxy-server:test:       209 |
@sitin/social-proxy-server:test:       210 |       await circuitBreaker.onSuccess(creatorId);
@sitin/social-proxy-server:test:       211 |
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/execution/__tests__/execution-e2e.spec.ts:208:64)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● Execution Engine E2E › Execution flow simulation › consecutive failures → circuit breaker escalates during execution
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(received).toBe(expected) // Object.is equality
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Expected: true
@sitin/social-proxy-server:test:     Received: false
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       454 |       }
@sitin/social-proxy-server:test:       455 |
@sitin/social-proxy-server:test:     > 456 |       expect(await circuitBreaker.isPaused(creatorId)).toBe(true);
@sitin/social-proxy-server:test:           |                                                        ^
@sitin/social-proxy-server:test:       457 |       expect(await execQueue.length(creatorId)).toBe(0);
@sitin/social-proxy-server:test:       458 |     });
@sitin/social-proxy-server:test:       459 |
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/execution/__tests__/execution-e2e.spec.ts:456:56)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test: (node:98300) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test:  FAIL  src/strategy/__tests__/engagement-decay.service.spec.ts (16.827 s)
@sitin/social-proxy-server:test:   ● EngagementDecayService › updateScore persists and returns correct state
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/engagement-decay.service.spec.ts:25:33)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● EngagementDecayService › updateScore clamps to [0, 1]
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/engagement-decay.service.spec.ts:35:32)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● EngagementDecayService › score boundaries map to correct levels
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/engagement-decay.service.spec.ts:58:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● EngagementDecayService › onActionResult success adds 0.1
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/engagement-decay.service.spec.ts:64:19)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● EngagementDecayService › onActionResult failure subtracts 0.05
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/engagement-decay.service.spec.ts:72:19)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● EngagementDecayService › onActionResult does not go below 0
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/engagement-decay.service.spec.ts:79:19)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● EngagementDecayService › resetOnSignal resets to ACTIVE 1.0
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/engagement-decay.service.spec.ts:86:19)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● EngagementDecayService › decaySingle applies 0.9 factor
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/engagement-decay.service.spec.ts:93:19)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● EngagementDecayService › decayAll processes all engagement keys
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/engagement-decay.service.spec.ts:100:19)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_e80cc0d9b83c430d9ce47c31174b00d7, creator=C001, trigger=rhythm, behaviors=9 
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_e09b309efb1d49409e394db0ce540bc2, creator=C001, trigger=rhythm, behaviors=9 
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C_ACTIVE, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_046bd70dce1c43e0bb50f0b286ce6b1d, creator=C_ACTIVE, trigger=rhythm, behaviors=6
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C_WARM, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_22547345b4634d9caa6b71de88aececa, creator=C_WARM, trigger=rhythm, behaviors=4
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C_COOL, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_da0f03102e2d4ae691f0518dc3d8cee4, creator=C_COOL, trigger=rhythm, behaviors=3
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_b35eeb8ac6e0450e92a07d893d0ed5c4, creator=C001, trigger=rhythm, behaviors=6
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=urgent_event
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_5768a0d5f4ad4e349378262c32f49221, creator=C001, trigger=urgent_event, behaviors=2
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_a187dda30a1f48f385e1039f1d25c33f, creator=C001, trigger=rhythm, behaviors=3
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=urgent_event
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_ac6e194ee9474a2e800b0e3f3f3de173, creator=C001, trigger=urgent_event, behaviors=2
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_3b313354b0bf45c1aacdf07da0aec312, creator=C001, trigger=rhythm, behaviors=10
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C_LIKES_LIMIT, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [SessionBuilderService] IG limit reached for LIKE: 100/100, removing behavior
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_716aa846e94141749f9fb07a5564f72a, creator=C_LIKES_LIMIT, trigger=rhythm, behaviors=4
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C_COMMENTS_LIMIT, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [SessionBuilderService] IG limit reached for COMMENT: 30/30, removing behavior
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_2f4ded0065df4e0195d6cadd27c1de7b, creator=C_COMMENTS_LIMIT, trigger=rhythm, behaviors=4
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C_NO_USERS, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_8d47e32e233448ca814d686d2851fefb, creator=C_NO_USERS, trigger=rhythm, behaviors=2
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_d5b93a22812340a9986815d7c4c4d3f9, creator=C001, trigger=rhythm, behaviors=9
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_ed89757f4fad44cc905714e83209ea74, creator=C001, trigger=rhythm, behaviors=8
@sitin/social-proxy-server:test: [Nest] 98299  - 04/21/2026, 2:59:44 PM     LOG [DayPlanService] Generated DayPlan for creator1:user1 [ACTIVE] → 6 actions
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_101ebecf841a48258a39da4045f1d953, creator=C001, trigger=rhythm, behaviors=6
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM   DEBUG [StrategyV2Service] Generating session for C001, trigger=rhythm
@sitin/social-proxy-server:test: [Nest] 98286  - 04/21/2026, 2:59:44 PM     LOG [StrategyV2Service] Session generated: sess_b7b2bcf30862420e847c41cc5d810517, creator=C001, trigger=rhythm, behaviors=6
@sitin/social-proxy-server:test: [Nest] 98299  - 04/21/2026, 2:59:44 PM     LOG [DayPlanService] Generated DayPlan for creator1:user1 [ACTIVE] → 6 actions
@sitin/social-proxy-server:test: [Nest] 98299  - 04/21/2026, 2:59:44 PM     LOG [DayPlanService] Generated DayPlan for creator1:user1 [ACTIVE] → 6 actions
@sitin/social-proxy-server:test: [Nest] 98299  - 04/21/2026, 2:59:44 PM     LOG [DayPlanService] Generated DayPlan for creator1:user1 [ACTIVE] → 6 actions
@sitin/social-proxy-server:test: [Nest] 98299  - 04/21/2026, 2:59:44 PM     LOG [DayPlanService] Generated DayPlan for creator1:user1 [ACTIVE] → 6 actions
@sitin/social-proxy-server:test: (node:98286) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test:  FAIL  src/strategy-v2/__tests__/strategy-v2-e2e.spec.ts (16.901 s)
@sitin/social-proxy-server:test:   ● StrategyV2 E2E — Business Logic › Cold start — new creator, first CE event › generates session with FOLLOW_BACK + ACCEPT_MSG_REQ + VIEW_PROFILE for CE_EXCHANGEDt: 
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(received).toContain(expected) // indexOf
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Expected value: "ACCEPT_MSG_REQ"
@sitin/social-proxy-server:test:     Received array: ["FOLLOW_BACK", "SEND_DM"]
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       123 |       const actionTypes = session.behaviors.map((b) => b.actionType);
@sitin/social-proxy-server:test:       124 |       expect(actionTypes).toContain('FOLLOW_BACK');
@sitin/social-proxy-server:test:     > 125 |       expect(actionTypes).toContain('ACCEPT_MSG_REQ');
@sitin/social-proxy-server:test:           |                           ^
@sitin/social-proxy-server:test:       126 |       expect(actionTypes).toContain('VIEW_PROFILE');
@sitin/social-proxy-server:test:       127 |     });
@sitin/social-proxy-server:test:       128 |
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy-v2/__tests__/strategy-v2-e2e.spec.ts:125:27)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test: (node:98299) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test:  FAIL  src/strategy/__tests__/day-plan.service.spec.ts (16.896 s)
@sitin/social-proxy-server:test:   ● DayPlanService › SILENT state generates no actions
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/day-plan.service.spec.ts:49:29)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● DayPlanService › DORMANT state only allows FOLLOW_BACK
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/day-plan.service.spec.ts:57:29)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● DayPlanService › COOL state limits Layer 1 to 2, no Layer 2
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/day-plan.service.spec.ts:68:29)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● DayPlanService › WARM state limits Layer 2 to 2
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       113 |     const key = redisKey(creatorId, userId);
@sitin/social-proxy-server:test:       114 |
@sitin/social-proxy-server:test:     > 115 |     const [scoreStr, level, countStr] = (await this.redis.eval(
@sitin/social-proxy-server:test:           |                                                           ^
@sitin/social-proxy-server:test:       116 |       EngagementDecayService.UPDATE_SCORE_LUA,
@sitin/social-proxy-server:test:       117 |       1, key,
@sitin/social-proxy-server:test:       118 |       String(clamped), now,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EngagementDecayService.updateScore (src/strategy/engagement-decay.service.ts:115:59)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/day-plan.service.spec.ts:80:29)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● DayPlanService › frequency limit prevents duplicate actions
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: this.redis.eval is not a function
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       137 |   async recordAction(creatorId: string, userId: string, actionType: ActionType): Promise<boolean> {
@sitin/social-proxy-server:test:       138 |     const key = `${FREQ_KEY_PREFIX}:${creatorId}:${userId}:${actionType}`;
@sitin/social-proxy-server:test:     > 139 |     const result = await this.redis.eval(
@sitin/social-proxy-server:test:           |                                     ^
@sitin/social-proxy-server:test:       140 |       DayPlanService.RECORD_LUA,
@sitin/social-proxy-server:test:       141 |       1,        // numkeys
@sitin/social-proxy-server:test:       142 |       key,      // KEYS[1]
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at DayPlanService.recordAction (src/strategy/day-plan.service.ts:139:37)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/day-plan.service.spec.ts:95:28)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:  FAIL  src/strategy/__tests__/strategy.service.spec.ts
@sitin/social-proxy-server:test:   ● Test suite failed to run
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Cannot find module '../strategy.service' from 'src/strategy/__tests__/strategy.service.spec.ts'
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       3 | import { DayPlanService } from '../day-plan.service';
@sitin/social-proxy-server:test:       4 | import { RevenueLoopService } from '../revenue-loop.service';
@sitin/social-proxy-server:test:     > 5 | import { StrategyService } from '../strategy.service';
@sitin/social-proxy-server:test:         | ^
@sitin/social-proxy-server:test:       6 | import type { CEExchangedEvent } from '../strategy.types';
@sitin/social-proxy-server:test:       7 |
@sitin/social-proxy-server:test:       8 | const makeEvent = (overrides?: Partial<CEExchangedEvent>): CEExchangedEvent => ({
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Resolver._throwModNotFoundError (../../node_modules/jest-resolve/build/index.js:863:11)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/strategy.service.spec.ts:5:1)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:  PASS  src/scheduler/__tests__/dual-queue.service.spec.ts
@sitin/social-proxy-server:test:  FAIL  src/strategy/__tests__/ce-event-e2e.spec.ts
@sitin/social-proxy-server:test:   ● Test suite failed to run
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Cannot find module '../strategy.service' from 'src/strategy/__tests__/ce-event-e2e.spec.ts'
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       16 | import { DayPlanService } from '../day-plan.service';
@sitin/social-proxy-server:test:       17 | import { RevenueLoopService } from '../revenue-loop.service';
@sitin/social-proxy-server:test:     > 18 | import { StrategyService } from '../strategy.service';
@sitin/social-proxy-server:test:          | ^
@sitin/social-proxy-server:test:       19 | import type { CEExchangedEvent, ActionCommand } from '../strategy.types';
@sitin/social-proxy-server:test:       20 |
@sitin/social-proxy-server:test:       21 | /** 模拟 Kafka ce.exchanged 事件 */
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Resolver._throwModNotFoundError (../../node_modules/jest-resolve/build/index.js:863:11)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/ce-event-e2e.spec.ts:18:1)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test: (node:98292) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test:  PASS  src/execution/__tests__/execution-queue.service.spec.ts
@sitin/social-proxy-server:test: [Nest] 98288  - 04/21/2026, 2:59:44 PM     LOG [ExecutionQueueService] Drained exec queue for C001
@sitin/social-proxy-server:test: [Nest] 98288  - 04/21/2026, 2:59:44 PM    WARN [ExecutionQueueService] Queue overflow for C001: current=0, adding=5, max=3
@sitin/social-proxy-server:test:  FAIL  src/scheduler/__tests__/scheduler-e2e.spec.ts
@sitin/social-proxy-server:test:   ● Test suite failed to run
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Cannot find module './generated/prisma' from 'src/prisma.service.ts'
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Require stack:
@sitin/social-proxy-server:test:       src/prisma.service.ts
@sitin/social-proxy-server:test:       src/execution/execution.service.ts
@sitin/social-proxy-server:test:       src/scheduler/scheduler.service.ts
@sitin/social-proxy-server:test:       src/scheduler/__tests__/scheduler-e2e.spec.ts
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       1 | import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
@sitin/social-proxy-server:test:     > 2 | import { PrismaClient } from './generated/prisma';
@sitin/social-proxy-server:test:         | ^
@sitin/social-proxy-server:test:       3 |
@sitin/social-proxy-server:test:       4 | @Injectable()
@sitin/social-proxy-server:test:       5 | export class PrismaService
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Resolver._throwModNotFoundError (../../node_modules/jest-resolve/build/index.js:863:11)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/prisma.service.ts:2:1)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/execution/execution.service.ts:6:1)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/scheduler/scheduler.service.ts:8:1)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/scheduler/__tests__/scheduler-e2e.spec.ts:19:1)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test: (node:98287) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test: (node:98289) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test:  FAIL  src/__tests__/v2-performance.spec.ts (17.086 s)
@sitin/social-proxy-server:test:   ● Console
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       Session gen (10 users): 1.83ms
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:171:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       Session gen (50 users): 2.28ms
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:177:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       Session gen (100 users): 2.37ms
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:183:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       Session gen (500 users): 48.62ms
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:189:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       10 users: 0.85ms, 100 users: 2.41ms, ratio: 2.83x
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:219:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       Stable gen: avg=1.08ms, max=1.84ms
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:245:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       StateReader (10 users): 0.59ms/read
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:276:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       StateReader (50 users): 1.36ms/read
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:282:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       StateReader (100 users): 1.81ms/read
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:288:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       Pipeline: 32.31ms, Naive (20 users): 0.16ms
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:329:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       enqueueUrgent: 0.067ms/op, 14969 ops/sec
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:357:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       dequeueUrgent: 0.020ms/op, 49322 ops/sec
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:384:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       enqueueNormal: 0.035ms/op, 28761 ops/sec
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:402:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       dequeueDue (50 items): 0.74ms total, 0.015ms/item
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:421:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       isPaused: 0.008ms/op, 131426 ops/sec
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:448:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       getState: 0.008ms/op, 128093 ops/sec
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:470:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       CB cycle: 0.049ms/cycle, 20269 cycles/sec
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:490:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       getBehaviorCap (10000x): 0.0020ms/op
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:508:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       execLog.record: 0.088ms/op, 11397 ops/sec
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:540:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       getDailyCount: 0.689ms/op, 1451 ops/sec
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:572:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       getDailyCounts: 0.900ms/op
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:604:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       record() at cap: 0.176ms/op
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:633:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       enqueue 250 behaviors: 5.32ms (0.021ms/b)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:667:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       dequeue 250 behaviors: 2.79ms (0.011ms/b)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:670:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     console.log
@sitin/social-proxy-server:test:       length() check: 0.004ms/op
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:695:15)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● V2 Performance Tests › Circuit breaker check latency › getBehaviorCap is O(1) and extremely fast
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(received).toBeLessThan(expected)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Expected: < 10
@sitin/social-proxy-server:test:     Received:   19.797063007950783
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       509 |
@sitin/social-proxy-server:test:       510 |       // Should be essentially free — 10k ops in < 10ms
@sitin/social-proxy-server:test:     > 511 |       expect(elapsed).toBeLessThan(10);
@sitin/social-proxy-server:test:           |                       ^
@sitin/social-proxy-server:test:       512 |     });
@sitin/social-proxy-server:test:       513 |   });
@sitin/social-proxy-server:test:       514 |
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/__tests__/v2-performance.spec.ts:511:23)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:  FAIL  src/script/__tests__/script.controller.spec.ts
@sitin/social-proxy-server:test:   ● Test suite failed to run
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Cannot find module './generated/prisma' from 'src/prisma.service.ts'
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Require stack:
@sitin/social-proxy-server:test:       src/prisma.service.ts
@sitin/social-proxy-server:test:       src/script/script.service.ts
@sitin/social-proxy-server:test:       src/script/script.controller.ts
@sitin/social-proxy-server:test:       src/script/__tests__/script.controller.spec.ts
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       1 | import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
@sitin/social-proxy-server:test:     > 2 | import { PrismaClient } from './generated/prisma';
@sitin/social-proxy-server:test:         | ^
@sitin/social-proxy-server:test:       3 |
@sitin/social-proxy-server:test:       4 | @Injectable()
@sitin/social-proxy-server:test:       5 | export class PrismaService
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Resolver._throwModNotFoundError (../../node_modules/jest-resolve/build/index.js:863:11)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/prisma.service.ts:2:1)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/script.service.ts:2:1)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/script.controller.ts:16:1)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:3:1)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test: (node:98297) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test: A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
Test Suites: 16 failed, 2 passed, 18 total
@sitin/social-proxy-server:test: Tests:       25 failed, 173 passed, 198 total
@sitin/social-proxy-server:test: Snapshots:   0 total
@sitin/social-proxy-server:test: Time:        19.18 s
@sitin/social-proxy-server:test: Ran all test suites.
@sitin/social-proxy-server:test:  ELIFECYCLE  Test failed. See above for more details.
 ERROR  @sitin/social-proxy-server#test: command (/Users/presence79/Desktop/WORK/sitin-next/packages/app-social-proxy-server) /Users/presence79/Library/pnpm/.tools/pnpm/10.33.0/bin/pnpm run test exited (1)

 Tasks:    40 successful, 41 total
Cached:    20 cached, 41 total
  Time:    24.874s 
Failed:    @sitin/social-proxy-server#test

 ERROR  run failed: command  exited (1)
 ELIFECYCLE  Test failed. See above for more details.
husky - pre-commit script failed (code 1)
➜  sitin-next git:(feature/migrate-minerva-from-monorepo) ✗ 
➜  sitin-next git:(feature/migrate-minerva-from-monorepo) ✗ 
