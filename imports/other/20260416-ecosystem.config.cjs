module.exports = {
  apps: [
    {
      name: "dms-server",
      cwd: "/home/dev/.nvm/versions/node/v24.14.1/lib/node_modules/@heyhru/app-dms-server",
      script: "./dist/bootstrap.js",
      instances: "max",
      autorestart: true,
      max_restarts: 10,
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        JWT_SECRET: "e15a8245565cfbb9c789c9ad9b6accbd1d0016bc744a7649f9aa38fa94fe2ac2",
        ENCRYPTION_KEY: "895bef67fa0471d34c93d6744b4e94cf",
        LOG_DIR: "/var/log/dms-server",
        DATABASE_URL: "postgresql://postgres:yhpJ8tWsRWGwvgk%40@10.226.0.30:5432/dms",
        DATABASE_SSL: "true",
        DATABASE_POOL_MIN: "2",
        DATABASE_POOL_MAX: "30",
        DATABASE_IDLE_TIMEOUT: "10000",
        OTEL_EXPORTER_OTLP_ENDPOINT: "http://10.142.0.28:4317",
        REDIS_URL: "redis://:ef172446-9c37-4421-8344-1f187dec9ddb@10.226.1.21:6379/0",
      },
    },
  ],
};
