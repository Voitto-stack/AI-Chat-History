---
title: config-patch
date: 2026-04-15T17:04:51+08:00
source: import
language: yaml
original: config-patch.yaml
---

# config-patch

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: minerva-server-config
data:
  # 开发环境特定配置
  NODE_ENV: "development"
  LOG_LEVEL: "debug"

  # Database
  DATABASE_URL: "postgresql://postgres:-Ai5PN.Ak6*8|6Yo@10.51.1.3:5432/archat?schema=public"

  # JWT
  JWT_SECRET: "test-jFhkZoAWMoI6UFWO"
  JWT_EXPIRES_IN: "7d"

  # OSS
  OSS_ACCESS_KEY_ID: "LTAI5tFZdGYUtim2votMpun6"
  OSS_ACCESS_KEY_SECRET: "AxBJPzYJWPS6VTSPAIXaQZnlgh7bMH"
  OSS_BUCKET: "sitin-ai-web"
  OSS_ENDPOINT: "oss-us-west-1.aliyuncs.com"
  OSS_REGION: "oss-us-west-1"
  OSS_CDN_HOST: "https://app.sitin.ai"

  # Feishu OAuth
  FEISHU_CLIENT_ID: "cli_a9f2cbc9aa795cc5"
  FEISHU_CLIENT_SECRET: "waSPzES2OEIOYMWJnW95e0QkuF5V0KSe"
  FEISHU_REDIRECT_URI: "https://admin-dev.sitin.ai/auth/feishu/callback"
  FEISHU_STATE_SECRET: "6vq7cjL+yKoVxfexFte4TSZcImwa9hcJaqSGlj95nD4="
  FEISHU_DEFAULT_ROLE: "Viewer"

```
