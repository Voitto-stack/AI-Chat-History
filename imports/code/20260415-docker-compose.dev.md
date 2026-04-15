---
title: docker-compose.dev
date: 2026-04-15T17:04:51+08:00
source: import
language: yml
original: docker-compose.dev.yml
---

# docker-compose.dev

```yml
services:
  minerva:
    image: ${REGISTRY:-us-east1-docker.pkg.dev/heyhru-server/frontend-service}/minerva-server:${IMAGE_TAG:-latest-dev}
    container_name: minerva-server-dev
    restart: unless-stopped
    env_file:
      - path: .env.development
        required: false
    ports:
      - "3001:3000"
    # volumes:
    #   - ./logs:/app/logs
    environment:
      - NODE_ENV=development
      - PORT=3000
      - HOSTNAME=0.0.0.0
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

```
