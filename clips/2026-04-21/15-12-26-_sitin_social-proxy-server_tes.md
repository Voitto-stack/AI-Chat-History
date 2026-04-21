---
date: 2026-04-21T15:12:26+08:00
source: clipboard
chars: 96062
---

@sitin/social-proxy-server:test:     > 139 |     const result = await this.redis.eval(
@sitin/social-proxy-server:test:           |                                     ^
@sitin/social-proxy-server:test:       140 |       DayPlanService.RECORD_LUA,
@sitin/social-proxy-server:test:       141 |       1,        // numkeys
@sitin/social-proxy-server:test:       142 |       key,      // KEYS[1]
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at DayPlanService.recordAction (src/strategy/day-plan.service.ts:139:37)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/strategy/__tests__/day-plan.service.spec.ts:95:28)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:  FAIL  src/strategy/__tests__/engagement-decay.service.spec.ts (11.554 s)
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
@sitin/social-proxy-server:test: [Nest] 5523  - 04/21/2026, 3:12:08 PM   ERROR [ScriptService] Failed to broadcast after rollback: Cannot read properties of undefined (reading 'map')
@sitin/social-proxy-server:test: [Nest] 5523  - 04/21/2026, 3:12:08 PM     LOG [ScriptService] Broadcasting UPDATE_SCRIPTS for platform=undefined, reason=VERSION_UPGRADE
@sitin/social-proxy-server:test: [Nest] 5523  - 04/21/2026, 3:12:08 PM    WARN [ScriptService] runScript: creatorId=creator1, scriptId=script1 (no mapping, using scriptId as action)
@sitin/social-proxy-server:test: (node:5523) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test:  FAIL  src/script/__tests__/script.service.spec.ts (12.267 s)
@sitin/social-proxy-server:test:   ● ScriptService › getManifest › returns manifest with activated scripts
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(received).toEqual(expected) // deep equality
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     - Expected  - 1
@sitin/social-proxy-server:test:     + Received  + 2
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       Array [
@sitin/social-proxy-server:test:         Object {
@sitin/social-proxy-server:test:           "actionType": "REPLY_DM",
@sitin/social-proxy-server:test:           "md5": "abc",
@sitin/social-proxy-server:test:           "name": "bridge.js",
@sitin/social-proxy-server:test:     +     "platform": undefined,
@sitin/social-proxy-server:test:           "size": 512,
@sitin/social-proxy-server:test:           "url": "https://cdn/bridge.js",
@sitin/social-proxy-server:test:     -     "version": "1.0.0",
@sitin/social-proxy-server:test:     +     "version": NaN,
@sitin/social-proxy-server:test:         },
@sitin/social-proxy-server:test:       ]
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       64 |       const result = await service.getManifest('INSTAGRAM');
@sitin/social-proxy-server:test:       65 |
@sitin/social-proxy-server:test:     > 66 |       expect(result.scripts).toEqual([
@sitin/social-proxy-server:test:          |                              ^
@sitin/social-proxy-server:test:       67 |         { name: 'bridge.js', actionType: 'REPLY_DM', version: '1.0.0', md5: 'abc', url: 'https://cdn/bridge.js', size: 512 },
@sitin/social-proxy-server:test:       68 |       ]);
@sitin/social-proxy-server:test:       69 |     });
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.service.spec.ts:66:30)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptService › listScripts › returns paginated script list
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(received).toBe(expected) // Object.is equality
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Expected: "2.0.0"
@sitin/social-proxy-server:test:     Received: NaN
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       102 |       expect(result.total).toBe(1);
@sitin/social-proxy-server:test:       103 |       expect(result.items[0].name).toBe('bridge.js');
@sitin/social-proxy-server:test:     > 104 |       expect(result.items[0].activeVersion).toBe('2.0.0');
@sitin/social-proxy-server:test:           |                                             ^
@sitin/social-proxy-server:test:       105 |       expect(result.items[0].versionCount).toBe(2);
@sitin/social-proxy-server:test:       106 |     });
@sitin/social-proxy-server:test:       107 |
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.service.spec.ts:104:45)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptService › activate › activates a version and updates script pointer
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: Cannot read properties of undefined (reading 'platform')
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       251 |
@sitin/social-proxy-server:test:       252 |     // 自动广播通知在线设备更新脚本
@sitin/social-proxy-server:test:     > 253 |     this.broadcastScriptUpdate(script!.platform, 'VERSION_UPGRADE').catch((e) =>
@sitin/social-proxy-server:test:           |                                        ^
@sitin/social-proxy-server:test:       254 |       this.logger.error(`Failed to broadcast after activate: ${e.message}`),
@sitin/social-proxy-server:test:       255 |     );
@sitin/social-proxy-server:test:       256 |
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at ScriptService.activate (src/script/script.service.ts:253:40)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.service.spec.ts:223:22)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptService › runScript › delegates to device gateway
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(jest.fn()).toHaveBeenCalledWith(...expected)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     - Expected
@sitin/social-proxy-server:test:     + Received
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       "creator1",
@sitin/social-proxy-server:test:     - "run_script",
@sitin/social-proxy-server:test:     + "script1",
@sitin/social-proxy-server:test:       Object {
@sitin/social-proxy-server:test:         "key": "val",
@sitin/social-proxy-server:test:     -   "scriptId": "script1",
@sitin/social-proxy-server:test:       },
@sitin/social-proxy-server:test:       30000,
@sitin/social-proxy-server:test:       undefined,
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Number of calls: 1
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       306 |       await service.runScript('creator1', 'script1', { key: 'val' });
@sitin/social-proxy-server:test:       307 |
@sitin/social-proxy-server:test:     > 308 |       expect(gateway.execute).toHaveBeenCalledWith(
@sitin/social-proxy-server:test:           |                               ^
@sitin/social-proxy-server:test:       309 |         'creator1', 'run_script', { scriptId: 'script1', key: 'val' }, 30_000, undefined,
@sitin/social-proxy-server:test:       310 |       );
@sitin/social-proxy-server:test:       311 |     });
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.service.spec.ts:308:31)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test: (node:5524) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM   ERROR [SchedulerService] [normal] Strategy failed: creator=C001 error=Strategy timeout
@sitin/social-proxy-server:test:  FAIL  src/script/__tests__/script.controller.spec.ts (12.642 s)
@sitin/social-proxy-server:test:   ● ScriptController › getManifest › returns manifest for a platform
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.-proxy-server:test: 
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › list › passes parsed query to service
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › getVersions › returns versions when script exists
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › getVersions › throws 404 when script not found
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › upload › saves version info from JSON body
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › upload › throws 409 when version exists
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › activate › activates version
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › activate › throws 404 when not found
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › rollback › rolls back successfully
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › rollback › throws 404 when script not found
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › rollback › throws 400 when no active version
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › archive › archives script
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › archive › throws 404 when not found
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › runScript › delegates to service
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● ScriptController › runScript › throws 400 when missing scriptId
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Nest can't resolve dependencies of the GatewayAuthGuard (?). Please make sure that the argument GatewayJwtService at index [0] is available in the RootTestModule module.
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Potential solutions:
@sitin/social-proxy-server:test:     - Is RootTestModule a valid NestJS module?
@sitin/social-proxy-server:test:     - If GatewayJwtService is a provider, is it part of the current RootTestModule?
@sitin/social-proxy-server:test:     - If GatewayJwtService is exported from a separate @Module, is that module imported within RootTestModule?
@sitin/social-proxy-server:test:       @Module({
@sitin/social-proxy-server:test:         imports: [ /* the Module containing GatewayJwtService */ ]
@sitin/social-proxy-server:test:       })
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       20 |     };
@sitin/social-proxy-server:test:       21 |
@sitin/social-proxy-server:test:     > 22 |     const module: TestingModule = await Test.createTestingModule({
@sitin/social-proxy-server:test:          |                                   ^
@sitin/social-proxy-server:test:       23 |       controllers: [ScriptController],
@sitin/social-proxy-server:test:       24 |       providers: [{ provide: ScriptService, useValue: mockService }],
@sitin/social-proxy-server:test:       25 |     }).compile();
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at TestingInjector.lookupComponentInParentModules (../../node_modules/@nestjs/core/injector/injector.js:290:19)
@sitin/social-proxy-server:test:       at TestingInjector.resolveComponentWrapper (../../node_modules/@nestjs/testing/testing-injector.js:19:45)
@sitin/social-proxy-server:test:       at resolveParam (../../node_modules/@nestjs/core/injector/injector.js:140:38)
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInjector.resolveConstructorParams (../../node_modules/@nestjs/core/injector/injector.js:169:27)
@sitin/social-proxy-server:test:       at TestingInjector.loadInstance (../../node_modules/@nestjs/core/injector/injector.js:75:13)
@sitin/social-proxy-server:test:       at TestingInjector.loadInjectable (../../node_modules/@nestjs/core/injector/injector.js:99:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:80:13
@sitin/social-proxy-server:test:           at async Promise.all (index 0)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfInjectables (../../node_modules/@nestjs/core/injector/instance-loader.js:79:9)
@sitin/social-proxy-server:test:       at ../../node_modules/@nestjs/core/injector/instance-loader.js:41:13
@sitin/social-proxy-server:test:           at async Promise.all (index 1)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstances (../../node_modules/@nestjs/core/injector/instance-loader.js:39:9)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/core/injector/instance-loader.js:22:13)
@sitin/social-proxy-server:test:       at TestingInstanceLoader.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-instance-loader.js:9:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.createInstancesOfDependencies (../../node_modules/@nestjs/testing/testing-module.builder.js:118:9)
@sitin/social-proxy-server:test:       at TestingModuleBuilder.compile (../../node_modules/@nestjs/testing/testing-module.builder.js:74:9)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/script/__tests__/script.controller.spec.ts:22:35)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM   ERROR [SchedulerService] [urgent] Strategy failed: eventId=ac4119a9-f259-4f0b-b0c0-03f96d0b71f9 creator=C001 error=Transient errorial-proxy-server:test: 
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM   DEBUG [SchedulerService] [normal] Processing 1 due creators
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [normal] Session generated: sessionId=sess_1776755529006 behaviors=1 creator=C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [normal] Session submitted: sessionId=sess_1776755529006 creator=C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [urgent] Processing event=IG_DM_RECEIVED eventId=447b599f-46b9-420c-bff6-54fadaae6a03 creator=C001 user=U001-proxy-server:test: 
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [urgent] Session generated: sessionId=sess_1776755529024 behaviors=1 triggerEventId=447b599f-46b9-420c-bff6-54fadaae6a03 creator=C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [urgent] Session submitted: sessionId=sess_1776755529024 creator=C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM   DEBUG [SchedulerService] [normal] Processing 1 due creators
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [urgent] Processing event=CE_EXCHANGED eventId=943cba35-02fd-41db-93ff-5a698fa66a4a creator=URGENT_C user=U001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [urgent] Session generated: sessionId=sess_1776755529039 behaviors=1 triggerEventId=943cba35-02fd-41db-93ff-5a698fa66a4a creator=URGENT_C
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [urgent] Session submitted: sessionId=sess_1776755529039 creator=URGENT_C
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM   DEBUG [SchedulerService] [normal] Processing 1 due creators
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [normal] Session generated: sessionId=sess_1776755529039 behaviors=1 creator=NORMAL_C
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [normal] Session submitted: sessionId=sess_1776755529039 creator=NORMAL_C
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [urgent] Processing event=DEVICE_ONLINE eventId=52918510-8e75-4b75-9dff-d2935702c1ee creator=C001 user=
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [urgent] Session generated: sessionId=sess_1776755529041 behaviors=1 triggerEventId=52918510-8e75-4b75-9dff-d2935702c1ee creator=C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [urgent] Session submitted: sessionId=sess_1776755529041 creator=C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [urgent] Processing event=CE_EXCHANGED eventId=ac4119a9-f259-4f0b-b0c0-03f96d0b71f9 creator=C001 user=U001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock stopped: C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock stopped: C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock woken: C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Conflict detected: C001, 120000ms until normal trigger — rescheduling
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] Recovering scheduler state...
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] Recovered 1 rhythm clocks
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] Recovering scheduler state...
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] Recovered 0 rhythm clocks
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] Recovering scheduler state...
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] Recovered 3 rhythm clocks
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] Scheduler stopped
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [EventListenerService] CE event: creator=C001, user=U001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [EventListenerService] CE event: creator=C001, user=U001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [EventListenerService] CE event: creator=C001, user=U001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [EventListenerService] CE event: creator=C001, user=U001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [EventListenerService] CE event: creator=C001, user=U001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock created: C001, interval=14400000ms, next=2026-04-21T16:00:00.000Z
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM   DEBUG [EventListenerService] Perception result: C001, 3 events
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM   DEBUG [EventListenerService] Skipping DEVICE_ONLINE for unregistered creator: C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM   DEBUG [SchedulerService] [normal] Processing 1 due creators
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [normal] Session generated: sessionId=sess_1776755529230 behaviors=0 creator=C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [RhythmClockService] Rhythm clock stopped: C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] Clock stopped for C001: 11 consecutive empty sessions
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM   DEBUG [SchedulerService] [normal] Processing 1 due creators
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [normal] Session generated: sessionId=sess_1776755529233 behaviors=1 creator=C001
@sitin/social-proxy-server:test: [Nest] 5527  - 04/21/2026, 3:12:09 PM     LOG [SchedulerService] [normal] Session submitted: sessionId=sess_1776755529233 creator=C001
@sitin/social-proxy-server:test: (node:5527) Warning: `--localstorage-file` was provided without a valid path
@sitin/social-proxy-server:test: (Use `node --trace-warnings ...` to show where the warning was created)
@sitin/social-proxy-server:test:  FAIL  src/scheduler/__tests__/scheduler-e2e.spec.ts (12.929 s)
@sitin/social-proxy-server:test:   ● Scheduler E2E › Urgent queue priority › DEVICE_ONLINE urgent event triggers onDeviceReconnect
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(jest.fn()).toHaveBeenCalledWith(...expected)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Expected: "C001"
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Number of calls: 0
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       333 |       await (scheduler as any).processUrgentQueue.call(scheduler, Date.now());
@sitin/social-proxy-server:test:       334 |
@sitin/social-proxy-server:test:     > 335 |       expect(executionStub.onDeviceReconnect).toHaveBeenCalledWith(creatorId);
@sitin/social-proxy-server:test:           |                                               ^
@sitin/social-proxy-server:test:       336 |     });
@sitin/social-proxy-server:test:       337 |
@sitin/social-proxy-server:test:       338 |     it('urgent event re-enqueued when strategy fails', async () => {
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/scheduler/__tests__/scheduler-e2e.spec.ts:335:47)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● Scheduler E2E › Urgent queue priority › urgent event re-enqueued when strategy fails
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(received).toBe(expected) // Object.is equality
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Expected: true
@sitin/social-proxy-server:test:     Received: false
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       355 |       // Event should have been re-enqueued
@sitin/social-proxy-server:test:       356 |       const hasUrgent = await dualQueue.hasUrgent(creatorId);
@sitin/social-proxy-server:test:     > 357 |       expect(hasUrgent).toBe(true);
@sitin/social-proxy-server:test:           |                         ^
@sitin/social-proxy-server:test:       358 |     });
@sitin/social-proxy-server:test:       359 |
@sitin/social-proxy-server:test:       360 |     it('paused creator in urgent queue is skipped', async () => {
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/scheduler/__tests__/scheduler-e2e.spec.ts:357:25)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● Scheduler E2E › EventListenerService: event ingestion › onIGEvent writes IG event to pending list
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: Cannot read properties of undefined (reading 'log')
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       224 |
@sitin/social-proxy-server:test:       225 |     // 持久化 inbound 行为到行为表（所有事件类型）
@sitin/social-proxy-server:test:     > 226 |     this.igEventLog.log({
@sitin/social-proxy-server:test:           |                     ^
@sitin/social-proxy-server:test:       227 |       creatorId,
@sitin/social-proxy-server:test:       228 |       userId,
@sitin/social-proxy-server:test:       229 |       direction: 'inbound',
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EventListenerService.onIGEvent (src/scheduler/event-listener.service.ts:226:21)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/scheduler/__tests__/scheduler-e2e.spec.ts:772:7)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● Scheduler E2E › EventListenerService: event ingestion › onIGEvent deduplicates by igMessageId
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     TypeError: Cannot read properties of undefined (reading 'log')
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       224 |
@sitin/social-proxy-server:test:       225 |     // 持久化 inbound 行为到行为表（所有事件类型）
@sitin/social-proxy-server:test:     > 226 |     this.igEventLog.log({
@sitin/social-proxy-server:test:           |                     ^
@sitin/social-proxy-server:test:       227 |       creatorId,
@sitin/social-proxy-server:test:       228 |       userId,
@sitin/social-proxy-server:test:       229 |       direction: 'inbound',
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at EventListenerService.onIGEvent (src/scheduler/event-listener.service.ts:226:21)
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/scheduler/__tests__/scheduler-e2e.spec.ts:788:7)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:   ● Scheduler E2E › EventListenerService: event ingestion › onDeviceOnline enqueues DEVICE_ONLINE urgent event
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     expect(received).toBe(expected) // Object.is equality
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:     Expected: true
@sitin/social-proxy-server:test:     Received: false
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       827 |       await eventListener.onDeviceOnline('C001', config);
@sitin/social-proxy-server:test:       828 |
@sitin/social-proxy-server:test:     > 829 |       expect(await dualQueue.hasUrgent('C001')).toBe(true);
@sitin/social-proxy-server:test:           |                                                 ^
@sitin/social-proxy-server:test:       830 |
@sitin/social-proxy-server:test:       831 |       const entry = await dualQueue.dequeueUrgent('C001');
@sitin/social-proxy-server:test:       832 |       expect(entry!.event.type).toBe('DEVICE_ONLINE');
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test:       at Object.<anonymous> (src/scheduler/__tests__/scheduler-e2e.spec.ts:829:49)
@sitin/social-proxy-server:test: 
@sitin/social-proxy-server:test: A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
Test Suites: 16 failed, 2 passed, 18 total
@sitin/social-proxy-server:test: Tests:       49 failed, 225 passed, 274 total
@sitin/social-proxy-server:test: Snapshots:   0 total
@sitin/social-proxy-server:test: Time:        14.528 s, estimated 18 s
@sitin/social-proxy-server:test: Ran all test suites.
@sitin/social-proxy-server:test:  ELIFECYCLE  Test failed. See above for more details.
 ERROR  @sitin/social-proxy-server#test: command (/Users/presence79/Desktop/WORK/sitin-next/packages/app-social-proxy-server) /Users/presence79/Library/pnpm/.tools/pnpm/10.33.0/bin/pnpm run test exited (1)

 Tasks:    40 successful, 41 total
Cached:    40 cached, 41 total
  Time:    16.242s 
Failed:    @sitin/social-proxy-server#test

 ERROR  run failed: command  exited (1)
 ELIFECYCLE  Test failed. See above for more details.
husky - pre-commit script failed (code 1)
➜  sitin-next git:(feature/migrate-minerva-from-monorepo) ✗ 
