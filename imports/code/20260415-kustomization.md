---
title: kustomization
date: 2026-04-15T17:04:51+08:00
source: import
language: yaml
original: kustomization.yaml
---

# kustomization

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

# 基础资源
resources:
  - deployment.yaml
  - service.yaml
  - configmap.yaml

# 通用标签
commonLabels:
  app.kubernetes.io/managed-by: kustomize
  app.kubernetes.io/component: backend

# 镜像配置（overlay 可覆盖）
images:
  - name: us-east1-docker.pkg.dev/heyhru-server/frontend-service/minerva-server
    newTag: latest-dev

```
