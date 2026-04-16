---
title: CHANGELOG
date: 2026-04-16T21:03:22+08:00
source: import
original: CHANGELOG.md
---

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.13.0](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.12.3...@heyhru/app-dms-server@0.13.0) (2026-04-16)

### Features

- **server-plugin-rate-limit:** add rate limiting plugin and integrate in DMS server ([dfff753](https://github.com/presence-io/sitin-next/commit/dfff7533b9bcce59cdbb114318959f8c8d8da253))

## [0.12.3](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.12.2...@heyhru/app-dms-server@0.12.3) (2026-04-15)

**Note:** Version bump only for package @heyhru/app-dms-server

## [0.12.2](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.12.1...@heyhru/app-dms-server@0.12.2) (2026-04-15)

### Bug Fixes

- **app-dms-server:** move module.register() to bootstrap for correct path resolution ([0cac781](https://github.com/presence-io/sitin-next/commit/0cac781d1f3d900d454e0726b55024ec59c0e760))

## [0.12.1](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.12.0...@heyhru/app-dms-server@0.12.1) (2026-04-15)

### Bug Fixes

- **server-plugin-otel:** use module.register() instead of --experimental-loader ([2a24f40](https://github.com/presence-io/sitin-next/commit/2a24f40059b5e8551051d419f2960aeadb2990a5))

# [0.12.0](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.11.4...@heyhru/app-dms-server@0.12.0) (2026-04-15)

### Features

- **app-dms-server,app-dms-web:** distinguish DDL from DML in SQL category ([466abd7](https://github.com/presence-io/sitin-next/commit/466abd77796f9c56e330eae539abec3930c9f3f7))

## [0.11.4](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.11.3...@heyhru/app-dms-server@0.11.4) (2026-04-15)

### Bug Fixes

- **app-dms-server:** add ESM loader hook for ioredis OTel instrumentation ([a470feb](https://github.com/presence-io/sitin-next/commit/a470feb7fd18fa68f2ebce13131a5c15ef2a87c6))
- **app-dms-server:** fallback to keyword detection when SQL parser fails ([5c5147a](https://github.com/presence-io/sitin-next/commit/5c5147ad2d335cad3f4ad690d3e52d490fe7a3f7))
- **app-dms-server:** only fallback to keyword detection for known DDL keywords ([a661aaf](https://github.com/presence-io/sitin-next/commit/a661aaf26becbd2a4a1d0a5d65ae4f76b3c32fbe))

## [0.11.3](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.11.2...@heyhru/app-dms-server@0.11.3) (2026-04-15)

### Bug Fixes

- **business-dms-approval:** store db_name in approvals to fix wrong database on execute ([419383f](https://github.com/presence-io/sitin-next/commit/419383fc7f805d112bc8ad3e354c1108ee2478b7))

## [0.11.2](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.11.1...@heyhru/app-dms-server@0.11.2) (2026-04-15)

**Note:** Version bump only for package @heyhru/app-dms-server

## [0.11.1](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.11.0...@heyhru/app-dms-server@0.11.1) (2026-04-15)

### Bug Fixes

- **app-dms-server:** restore bootstrap entry point lost during pwa branch merge ([a845828](https://github.com/presence-io/sitin-next/commit/a845828a2d111b2df85ab3c1f5ff9842fedda78a))

# [0.11.0](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.10.1...@heyhru/app-dms-server@0.11.0) (2026-04-15)

### Bug Fixes

- **app-dms-server:** inline otel.ts into bundle instead of separate entry ([3a4af04](https://github.com/presence-io/sitin-next/commit/3a4af04abc8e9b851e7afbe4342790f5ac094cac))

### Features

- **server-plugin-redis:** add Redis cache for saved SQLs ([cbc118c](https://github.com/presence-io/sitin-next/commit/cbc118c7072839b69f48bd5f18890e8613c80471))

## [0.10.1](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.10.0...@heyhru/app-dms-server@0.10.1) (2026-04-14)

### Bug Fixes

- **app-dms-server:** strip trailing semicolon before appending LIMIT/OFFSET ([70b4696](https://github.com/presence-io/sitin-next/commit/70b4696ab32f148b20d1e0a1b46354b58231a4b4))

# [0.10.0](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.9.9...@heyhru/app-dms-server@0.10.0) (2026-04-14)

### Bug Fixes

- **app-dms-server:** support PostgreSQL cast syntax (::type) in SQL parser ([211721b](https://github.com/presence-io/sitin-next/commit/211721b851c52c88b168bf2c55ecf7eab8e9af70))

### Features

- **business-dms-datasource:** restrict data source access by role and allow DML on test sources ([233dcd3](https://github.com/presence-io/sitin-next/commit/233dcd3252f373f84f1a43fa08282367d9208314))

## [0.9.9](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.9.8...@heyhru/app-dms-server@0.9.9) (2026-04-14)

### Bug Fixes

- **app-dms-server:** surface SQL parse errors instead of silently falling back to dml ([cc370f2](https://github.com/presence-io/sitin-next/commit/cc370f2d87e5594063fe8024fb875647a0fb5f2e))

## [0.9.8](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.9.7...@heyhru/app-dms-server@0.9.8) (2026-04-13)

**Note:** Version bump only for package @heyhru/app-dms-server

## [0.9.7](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.9.6...@heyhru/app-dms-server@0.9.7) (2026-04-13)

### Bug Fixes

- **app-dms-server:** add bootstrap ([f01ff73](https://github.com/presence-io/sitin-next/commit/f01ff732277117ff1d32cc503572bd93d9827bc6))
- **app-dms-server:** use bootstrap pattern to ensure pg is patched by OTel ([e3de6ea](https://github.com/presence-io/sitin-next/commit/e3de6ea079d4fe9d48284fb31c5261c1c292b6cd))

## [0.9.6](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.9.5...@heyhru/app-dms-server@0.9.6) (2026-04-13)

### Bug Fixes

- **app-dms-server:** import otel ([07f861f](https://github.com/presence-io/sitin-next/commit/07f861f3cd7120c5711de0bdc81b6d431926f1c6))

## [0.9.5](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.9.4...@heyhru/app-dms-server@0.9.5) (2026-04-13)

### Bug Fixes

- **app-dms-server:** inline otel.ts into bundle instead of separate entry ([cc05755](https://github.com/presence-io/sitin-next/commit/cc05755ab42371271ca6d3452af7223c836e1d7a))

## [0.9.4](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.9.3...@heyhru/app-dms-server@0.9.4) (2026-04-13)

### Bug Fixes

- **app-dms-server:** use register() for ESM loader hook instead of --experimental-loader ([83ee5e1](https://github.com/presence-io/sitin-next/commit/83ee5e1c78843239685bbdd0f4618014236444b6))

## [0.9.3](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.9.2...@heyhru/app-dms-server@0.9.3) (2026-04-13)

### Bug Fixes

- **server-plugin-otel:** add HttpInstrumentation and ESM loader hook for pg spans ([849f7eb](https://github.com/presence-io/sitin-next/commit/849f7eb6cba383a61bfdcd9e5ce5522c23a9f0f5))

## [0.9.2](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.9.1...@heyhru/app-dms-server@0.9.2) (2026-04-12)

### Bug Fixes

- **app-dms-server:** remove config.ts dependency from otel.ts to avoid early throw ([4a0a3ac](https://github.com/presence-io/sitin-next/commit/4a0a3acb4a375990d089c98db4bd132a042213eb))

## [0.9.1](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.9.0...@heyhru/app-dms-server@0.9.1) (2026-04-11)

### Bug Fixes

- **app-dms-server:** load OTel via --import flag to fix pg instrumentation ([51c1981](https://github.com/presence-io/sitin-next/commit/51c1981d256f182cc7995128f7ca28921fb1a1fb))

# [0.9.0](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.8.0...@heyhru/app-dms-server@0.9.0) (2026-04-11)

### Features

- **server-plugin-otel:** add OpenTelemetry SDK plugin with Fastify/pg/mysql2 instrumentation ([bf1ffa2](https://github.com/presence-io/sitin-next/commit/bf1ffa2ae4bc144a168a50aee443fa9e5b95776e))

# [0.8.0](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.7.0...@heyhru/app-dms-server@0.8.0) (2026-04-11)

### Features

- **app-dms-server,app-dms-web:** implement server-side SQL result pagination ([b625ac5](https://github.com/presence-io/sitin-next/commit/b625ac583172e8d02452fc05872a04d1fbe33b76))

# [0.7.0](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.6.0...@heyhru/app-dms-server@0.7.0) (2026-04-11)

### Features

- **server-plugin-metrics:** add db pool active/waiting gauges ([f7267cc](https://github.com/presence-io/sitin-next/commit/f7267cc4d618f99b7940abff81a0799f9674019e))
- **server-plugin-metrics:** add Prometheus metrics plugin ([491148b](https://github.com/presence-io/sitin-next/commit/491148b5526e59dbbadbca750438b39cfa4ba4f7))

# [0.6.0](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.5.4...@heyhru/app-dms-server@0.6.0) (2026-04-10)

**Note:** Version bump only for package @heyhru/app-dms-server

## [0.5.4](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.5.3...@heyhru/app-dms-server@0.5.4) (2026-04-10)

### Bug Fixes

- **app-dms-server:** fix pino-roll default import and add pino submodule + summary ([9e49b35](https://github.com/presence-io/sitin-next/commit/9e49b358e7e543044e33434b0c619ce9d41107b4))
- **app-dms-server:** upgrade pino-roll from ^1.0.0 to ^4.0.0 ([dbb4afe](https://github.com/presence-io/sitin-next/commit/dbb4afed66dfed7d180b5caeb3029e0851a2bdbd))

## [0.5.3](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.5.2...@heyhru/app-dms-server@0.5.3) (2026-04-10)

### Bug Fixes

- **app-dms-server:** externalize all dependencies to prevent CJS bundling issue ([aabc075](https://github.com/presence-io/sitin-next/commit/aabc075d82a2a9bcd08177e942013f11d691edfe))
- **common-util-logger:** add streams support to createLogger via pino.multistream ([cfe81c7](https://github.com/presence-io/sitin-next/commit/cfe81c7caf0aa61d7f62c2da9ac519d68a5958d5))

## [0.5.2](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.5.1...@heyhru/app-dms-server@0.5.2) (2026-04-10)

### Bug Fixes

- **app-dms-server:** externalize pino-roll to prevent CJS bundling issue ([a421fc1](https://github.com/presence-io/sitin-next/commit/a421fc179053b750caceb38c429d963c539b003d))

## [0.5.1](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.5.0...@heyhru/app-dms-server@0.5.1) (2026-04-10)

### Bug Fixes

- **app-dms-server:** use default import for pino-roll CJS module ([7a59f95](https://github.com/presence-io/sitin-next/commit/7a59f95db31aefafb0be464132a18ae403c49190))

# [0.5.0](https://github.com/presence-io/sitin-next/compare/@heyhru/app-dms-server@0.1.1...@heyhru/app-dms-server@0.5.0) (2026-04-10)

### Features

- **app-dms-server:** add pino-roll file logging with multistream ([d156485](https://github.com/presence-io/sitin-next/commit/d156485e4dcb1860df3542e208e4c8312ef3f16d))

## 0.4.1 (2026-04-10)

### Bug Fixes

- **app-dms-server:** add saved-sqls routes to auth permissions ([5a63d0e](https://github.com/presence-io/sitin-next/commit/5a63d0ebcee2b12ce67f930b98211695eeae7a14))

# 0.4.0 (2026-04-10)

### Features

- **business-dms-approval:** extract approval domain logic into standalone package ([6bb51e7](https://github.com/presence-io/sitin-next/commit/6bb51e715844fce5814ad74eb24d8492003a614a))
- **business-dms-audit:** extract audit domain logic into standalone package ([1c5e03b](https://github.com/presence-io/sitin-next/commit/1c5e03b2385c1e895190fafa36ff4e7bd409b633))
- **business-dms-datasource:** extract datasource domain logic into standalone package ([d802c6b](https://github.com/presence-io/sitin-next/commit/d802c6b9b59a70ec7c77e31a4e15043bfea04277))
- **business-dms-saved-sql:** add saved SQL feature ([ac2296b](https://github.com/presence-io/sitin-next/commit/ac2296b2f9619723860cc59985dc1b3733676a06))

## 0.3.7 (2026-04-09)

### Bug Fixes

- **app-dms-server:** exclude cloudsqladmin from pg database list ([26dd1b2](https://github.com/presence-io/sitin-next/commit/26dd1b2dd112103713ec1bb8aa40c156a1c7506d))

## 0.3.4 (2026-04-09)

### Bug Fixes

- **app-dms-server,app-dms-web:** fix approval execute retry and stale UI ([9b191ab](https://github.com/presence-io/sitin-next/commit/9b191ab1f4eaf3555e7a1025dd2d2d1534bca524))
- **app-dms-server,app-dms-web:** viewer role and UI fixes ([48fe5d2](https://github.com/presence-io/sitin-next/commit/48fe5d21220a5a5553fed5dd6c8bedee661722a7))

## 0.3.3 (2026-04-09)

### Bug Fixes

- **app-dms-server:** await queryAuditLogs in logList to return actual data ([37271b9](https://github.com/presence-io/sitin-next/commit/37271b9a108efdde0f94a00b8076200cda901351))

## 0.3.2 (2026-04-09)

### Bug Fixes

- **app-dms-server:** silence /health route request logs ([a2ecefc](https://github.com/presence-io/sitin-next/commit/a2ecefc5cc5685772de3720eef2e90bb79664891))

## 0.3.1 (2026-04-09)

### Bug Fixes

- **app-dms-server:** use valid UUID format for admin seed data ([230902f](https://github.com/presence-io/sitin-next/commit/230902f13ac9bd200567183aa21143797b47b26d))

# 0.3.0 (2026-04-09)

### Features

- **server-plugin-pg,app-dms-server:** add SSL and connection pool config for app metadata DB ([0b72c6e](https://github.com/presence-io/sitin-next/commit/0b72c6efd6edd4a607ef48f0e42c9855ff39a6ab))

# 0.2.0 (2026-04-09)

### Features

- extract business-dms-user package from app-dms-server ([6671f62](https://github.com/presence-io/sitin-next/commit/6671f62c9e7b277bc7dae64d41013843ef52a916))

## 0.1.9 (2026-04-09)

## 0.1.8 (2026-04-08)

## 0.1.7 (2026-04-08)

## 0.1.6 (2026-04-08)

## 0.1.5 (2026-04-08)

### Bug Fixes

- **dms-server:** convert boolean params to integers in SQLite adapter ([5e2f99a](https://github.com/presence-io/sitin-next/commit/5e2f99a4cdef2d46f0fba1e3ccd591086ed2fedb))

## 0.1.4 (2026-04-08)

### Bug Fixes

- **dms-server:** add migration to add ssl column to existing data_sources table ([5c2bc51](https://github.com/presence-io/sitin-next/commit/5c2bc51e7f148d732a1d24466288cfd44da64485))

## 0.1.3 (2026-04-08)

### Bug Fixes

- **dms-server:** add missing index on audit_logs.data_source_id ([b45a2f9](https://github.com/presence-io/sitin-next/commit/b45a2f9c849c3f62016d7c17b25b5f0b9dde4bdc))

### Features

- **dms-server:** add PostgreSQL support for DMS metadata database ([0a227fe](https://github.com/presence-io/sitin-next/commit/0a227fe2a2b5f01e852562dc3cecee973bb0ac19))
- **dms:** add SSL support for data source connections and remove SQLite migration script ([bfc5080](https://github.com/presence-io/sitin-next/commit/bfc5080f81784adc96c32faaa2173c5318d86da7))

## 0.1.2 (2026-04-08)

### Features

- switch auth from cookie to Bearer token and add Expo network layer ([f9d56ea](https://github.com/presence-io/sitin-next/commit/f9d56ea4f6ddc73e759ad5adefd9f2429a4d4813))
- translate all DMS UI text from English to Chinese ([7593562](https://github.com/presence-io/sitin-next/commit/7593562b6d7a5c6b57ebae8e1312c741840ae653))

## [0.4.1](https://github.com/presence-io/sitin-next/compare/v0.4.0...v0.4.1) (2026-04-10)

### Bug Fixes

- **app-dms-server:** add saved-sqls routes to auth permissions ([5a63d0e](https://github.com/presence-io/sitin-next/commit/5a63d0ebcee2b12ce67f930b98211695eeae7a14))

# [0.4.0](https://github.com/presence-io/sitin-next/compare/v0.3.7...v0.4.0) (2026-04-10)

### Features

- **business-dms-approval:** extract approval domain logic into standalone package ([6bb51e7](https://github.com/presence-io/sitin-next/commit/6bb51e715844fce5814ad74eb24d8492003a614a))
- **business-dms-audit:** extract audit domain logic into standalone package ([1c5e03b](https://github.com/presence-io/sitin-next/commit/1c5e03b2385c1e895190fafa36ff4e7bd409b633))
- **business-dms-datasource:** extract datasource domain logic into standalone package ([d802c6b](https://github.com/presence-io/sitin-next/commit/d802c6b9b59a70ec7c77e31a4e15043bfea04277))
- **business-dms-saved-sql:** add saved SQL feature ([ac2296b](https://github.com/presence-io/sitin-next/commit/ac2296b2f9619723860cc59985dc1b3733676a06))

## [0.3.7](https://github.com/presence-io/sitin-next/compare/v0.3.6...v0.3.7) (2026-04-09)

### Bug Fixes

- **app-dms-server:** exclude cloudsqladmin from pg database list ([26dd1b2](https://github.com/presence-io/sitin-next/commit/26dd1b2dd112103713ec1bb8aa40c156a1c7506d))

## [0.3.4](https://github.com/presence-io/sitin-next/compare/v0.3.3...v0.3.4) (2026-04-09)

### Bug Fixes

- **app-dms-server,app-dms-web:** fix approval execute retry and stale UI ([9b191ab](https://github.com/presence-io/sitin-next/commit/9b191ab1f4eaf3555e7a1025dd2d2d1534bca524))
- **app-dms-server,app-dms-web:** viewer role and UI fixes ([48fe5d2](https://github.com/presence-io/sitin-next/commit/48fe5d21220a5a5553fed5dd6c8bedee661722a7))

## [0.3.3](https://github.com/presence-io/sitin-next/compare/v0.3.2...v0.3.3) (2026-04-09)

### Bug Fixes

- **app-dms-server:** await queryAuditLogs in logList to return actual data ([37271b9](https://github.com/presence-io/sitin-next/commit/37271b9a108efdde0f94a00b8076200cda901351))

## [0.3.2](https://github.com/presence-io/sitin-next/compare/v0.3.1...v0.3.2) (2026-04-09)

### Bug Fixes

- **app-dms-server:** silence /health route request logs ([a2ecefc](https://github.com/presence-io/sitin-next/commit/a2ecefc5cc5685772de3720eef2e90bb79664891))

## [0.3.1](https://github.com/presence-io/sitin-next/compare/v0.3.0...v0.3.1) (2026-04-09)

### Bug Fixes

- **app-dms-server:** use valid UUID format for admin seed data ([230902f](https://github.com/presence-io/sitin-next/commit/230902f13ac9bd200567183aa21143797b47b26d))

# [0.3.0](https://github.com/presence-io/sitin-next/compare/v0.2.0...v0.3.0) (2026-04-09)

### Features

- **server-plugin-pg,app-dms-server:** add SSL and connection pool config for app metadata DB ([0b72c6e](https://github.com/presence-io/sitin-next/commit/0b72c6efd6edd4a607ef48f0e42c9855ff39a6ab))

# [0.2.0](https://github.com/presence-io/sitin-next/compare/v0.1.9...v0.2.0) (2026-04-09)

### Features

- extract business-dms-user package from app-dms-server ([6671f62](https://github.com/presence-io/sitin-next/commit/6671f62c9e7b277bc7dae64d41013843ef52a916))

## [0.1.9](https://github.com/presence-io/sitin-next/compare/v0.1.8...v0.1.9) (2026-04-09)

**Note:** Version bump only for package @heyhru/app-dms-server

## [0.1.8](https://github.com/presence-io/sitin-next/compare/v0.1.7...v0.1.8) (2026-04-08)

**Note:** Version bump only for package @heyhru/app-dms-server

## [0.1.7](https://github.com/presence-io/sitin-next/compare/v0.1.6...v0.1.7) (2026-04-08)

**Note:** Version bump only for package @heyhru/app-dms-server

## [0.1.6](https://github.com/presence-io/sitin-next/compare/v0.1.5...v0.1.6) (2026-04-08)

**Note:** Version bump only for package @heyhru/app-dms-server

## [0.1.5](https://github.com/presence-io/sitin-next/compare/v0.1.4...v0.1.5) (2026-04-08)

### Bug Fixes

- **dms-server:** convert boolean params to integers in SQLite adapter ([5e2f99a](https://github.com/presence-io/sitin-next/commit/5e2f99a4cdef2d46f0fba1e3ccd591086ed2fedb))

## [0.1.4](https://github.com/presence-io/sitin-next/compare/v0.1.3...v0.1.4) (2026-04-08)

### Bug Fixes

- **dms-server:** add migration to add ssl column to existing data_sources table ([5c2bc51](https://github.com/presence-io/sitin-next/commit/5c2bc51e7f148d732a1d24466288cfd44da64485))

## [0.1.3](https://github.com/presence-io/sitin-next/compare/v0.1.2...v0.1.3) (2026-04-08)

### Bug Fixes

- **dms-server:** add missing index on audit_logs.data_source_id ([b45a2f9](https://github.com/presence-io/sitin-next/commit/b45a2f9c849c3f62016d7c17b25b5f0b9dde4bdc))

### Features

- **dms-server:** add PostgreSQL support for DMS metadata database ([0a227fe](https://github.com/presence-io/sitin-next/commit/0a227fe2a2b5f01e852562dc3cecee973bb0ac19))
- **dms:** add SSL support for data source connections and remove SQLite migration script ([bfc5080](https://github.com/presence-io/sitin-next/commit/bfc5080f81784adc96c32faaa2173c5318d86da7))

## 0.1.2 (2026-04-08)

### Bug Fixes

- add explicit type annotations to resolve noImplicitAny errors ([ff93baa](https://github.com/presence-io/sitin-next/commit/ff93baabb2344bc17f03805213da55ccbc579413))
- align permission keys with actual RPC-style routes ([dc51b30](https://github.com/presence-io/sitin-next/commit/dc51b305eacdb0c54a952c74c5a0e670bd12f2ec))
- correct default admin password hash in seed migration ([77be14e](https://github.com/presence-io/sitin-next/commit/77be14ebfcb127cb3df060d1353f2e2e967eb80d))
- listen on 0.0.0.0 to accept non-localhost connections ([87c2ac9](https://github.com/presence-io/sitin-next/commit/87c2ac96a3d5ab58b76c9835667ae3f295992b7e))
- make data_sources.database nullable and remove unused node_args ([ea1304b](https://github.com/presence-io/sitin-next/commit/ea1304b5784e3790295c9bf489589f23aeff87b3))
- remove migration 005 and make database nullable in original schema ([7be5468](https://github.com/presence-io/sitin-next/commit/7be54686ac17af05115db225448f73c96d80ba35))
- replace bcrypt seed hash with scrypt format in 001_users.sql ([5ae147f](https://github.com/presence-io/sitin-next/commit/5ae147f18ee9a552cd97d75b8ae7622e0feefb57))
- update server to use @vino-js/core API correctly ([0a81603](https://github.com/presence-io/sitin-next/commit/0a816031040e2a62b2aec6781c923949748a1272))
- use default import for node-sql-parser in ESM ([bb268ad](https://github.com/presence-io/sitin-next/commit/bb268ade0f5ba45b015f183b09a5029b6fbe8432))

### Features

- add architecture linting with eslint-plugin-boundaries and madge ([c7ddb73](https://github.com/presence-io/sitin-next/commit/c7ddb73c49ef105e8f9e2a98131d08e80853b97e))
- add change password functionality with auto-logout ([58db683](https://github.com/presence-io/sitin-next/commit/58db683186fff06ed68eb1c19cc6a4ce775c12bc))
- add CORS wildcard support to dms-server ([de0642c](https://github.com/presence-io/sitin-next/commit/de0642cf3f27b77c3174c94bd131f1c21ecc99c6))
- add GET /health endpoint and update design docs ([4f2e258](https://github.com/presence-io/sitin-next/commit/4f2e2581c7d9693751d4b77b6f96e09e7f5717db))
- add server:dev script and fix eslint-disable placement in models ([03b7b29](https://github.com/presence-io/sitin-next/commit/03b7b299131dd597d7bff6556bd482a64f31c1e3))
- add structured logging to app-dms-server ([2b3da5b](https://github.com/presence-io/sitin-next/commit/2b3da5befb4a0e7e389ae84a300521310550b731))
- add table browser sidebar and state persistence to SQL Editor ([d8e075a](https://github.com/presence-io/sitin-next/commit/d8e075a6f906ae29458dd0f2d07f0f6a7a2c2014))
- **app-dms:** add edit functionality for Users and DataSources ([3c71068](https://github.com/presence-io/sitin-next/commit/3c710685f8a96a0e770e4a1165a610773881d953))
- extract SQLite utility into @sitin/server-util-sqlite package ([5d5f7f0](https://github.com/presence-io/sitin-next/commit/5d5f7f09178318d1ff8cace77bc5800fd5de18eb))
- scaffold app-dms-server with all business modules ([317e56f](https://github.com/presence-io/sitin-next/commit/317e56ffdc54517268409a3b636a032ccab1ac39))
- switch auth from cookie to Bearer token and add Expo network layer ([f9d56ea](https://github.com/presence-io/sitin-next/commit/f9d56ea4f6ddc73e759ad5adefd9f2429a4d4813))
- translate all DMS UI text from English to Chinese ([7593562](https://github.com/presence-io/sitin-next/commit/7593562b6d7a5c6b57ebae8e1312c741840ae653))
- update vino.js ([0eb7a7c](https://github.com/presence-io/sitin-next/commit/0eb7a7c52ac2fc6d4133c025b8b7bc3e12e76544))
- upgrade @vino-js/core to 0.0.8 and use native cors: true ([8ff0278](https://github.com/presence-io/sitin-next/commit/8ff02785d11682333da325fb4aedccbd6ff0f504))

# @heyhru/app-dms-server

## 0.1.1

### Patch Changes

- Fix migration 005 causing SQLite foreign key corruption

## 0.1.0

### Minor Changes

- Add table browser sidebar and state persistence to SQL Editor

## 0.0.5

### Patch Changes

- Make data_sources.database nullable and fix permission keys

## 0.0.4

### Patch Changes

- Fix permission keys to match actual RPC-style routes

## 0.0.3

### Patch Changes

- Listen on 0.0.0.0 to accept connections from all network interfaces

## 0.0.2

### Patch Changes

- Add change password with auto-logout and GET /health endpoint

## 0.0.1

### Patch Changes

- Initial release
- Updated dependencies
  - @heyhru/common-util-logger@0.0.1
  - @heyhru/server-util-crypto@0.0.1
  - @heyhru/server-util-jwt@0.0.1
  - @heyhru/server-util-sqlite@0.0.1
  - @heyhru/server-util-mysql@0.0.1
  - @heyhru/server-util-pg@0.0.1

