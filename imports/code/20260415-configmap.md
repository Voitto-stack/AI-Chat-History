---
title: configmap
date: 2026-04-15T17:04:51+08:00
source: import
language: yaml
original: configmap.yaml
---

# configmap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: minerva-server-config
  labels:
    app: minerva-server
    app.kubernetes.io/name: minerva-server
    app.kubernetes.io/part-of: minerva-service
data:
  # 基础配置 - 通用环境变量
  # 注意：敏感信息应该放在 Secret 中，或在 overlay 中覆盖
  LOG_LEVEL: "info"

```
