---
title: deployment
date: 2026-04-15T17:04:51+08:00
source: import
language: yaml
original: deployment.yaml
---

# deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: minerva-server
  labels:
    app: minerva-server
    app.kubernetes.io/name: minerva-server
    app.kubernetes.io/part-of: minerva-service
spec:
  replicas: 1
  selector:
    matchLabels:
      app: minerva-server
  template:
    metadata:
      labels:
        app: minerva-server
        app.kubernetes.io/name: minerva-server
        app.kubernetes.io/part-of: minerva-service
    spec:
      containers:
        - name: minerva-server
          image: us-east1-docker.pkg.dev/heyhru-server/frontend-service/minerva-server:latest-dev
          imagePullPolicy: Always
          ports:
            - name: http
              containerPort: 3000
              protocol: TCP
          env:
            - name: PORT
              value: "3000"
            - name: HOSTNAME
              value: "0.0.0.0"
          envFrom:
            - configMapRef:
                name: minerva-server-config
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /health
              port: http
            initialDelaySeconds: 10
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 2
      restartPolicy: Always

```
