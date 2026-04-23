---
date: 2026-04-23T16:37:36+08:00
source: clipboard
chars: 2406
---

[INFO] 🚀 Step 3: Running post-build scripts...
[INFO] Environment: development
[INFO] Target app: app-social-proxy-server
[INFO] 🟢 Development environment detected
[INFO] 📦 Running post-build for 'app-social-proxy-server'...
[INFO] 📝 Script: packages/app-social-proxy-server/scripts/post-build.dev.js
[INFO] 🔑 使用 GCP 服务账号密钥激活认证...
Activated service account credentials for: [930888897368-compute@developer.gserviceaccount.com]
WARNING: Your config file at [/var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_next/.docker/config.json] contains these credential helper entries:

{
  "credHelpers": {
    "us-east1-docker.pkg.dev": "gcloud"
  }
}
Adding credentials for: us-east1-docker.pkg.dev
gcloud credential helpers already registered correctly.
[SUCCESS] ✅ GCP 认证完成
[INFO] ========================================
[INFO] 🚀 Social-Proxy-Server Build & Deploy (Dev → K8s)
[INFO] ========================================

[INFO] 📦 Step 1: 检查构建产物...
[ERROR] ========================================
[ERROR] ❌ Build & Deploy Failed!
[ERROR] ========================================
[ERROR] Dist 目录不存在: /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_next/packages/app-social-proxy-server/build
请先运行 npm run build
Error: Dist 目录不存在: /var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_next/packages/app-social-proxy-server/build
请先运行 npm run build
    at main (/var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_next/packages/app-social-proxy-server/scripts/post-build.dev.js:52:13)
    at Object.<anonymous> (/var/lib/jenkins/.jenkins/workspace/frontend_dev_sitin_next/packages/app-social-proxy-server/scripts/post-build.dev.js:109:1)
    at Module._compile (node:internal/modules/cjs/loader:1529:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1613:10)
    at Module.load (node:internal/modules/cjs/loader:1275:32)
    at Module._load (node:internal/modules/cjs/loader:1096:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:164:12)
    at node:internal/main/run_main_module:28:49
[ERROR] ========================================
[ERROR] 失败耗时: 0m 27s
[INFO] ✅ 飞书通知发送成功
[ERROR] Post-build script failed for 'app-social-proxy-server'
Build step 'Execute shell' marked build as failure
Finished: FAILURE
