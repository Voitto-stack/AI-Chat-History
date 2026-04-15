---
title: docker-compose.prod
date: 2026-04-15T17:04:51+08:00
source: import
language: yml
original: docker-compose.prod.yml
---

# docker-compose.prod

```yml
version: "3.8"

services:
  minerva:
    image: ${REGISTRY:-us-east1-docker.pkg.dev/heyhru-server/frontend-service}/minerva-server:${IMAGE_TAG:-latest-prod}
    container_name: minerva-server-prod
    restart: unless-stopped
    env_file:
      - .env.production
    ports:
      - "3001:3000"
    volumes:
      - ./logs:/app/logs
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

```
