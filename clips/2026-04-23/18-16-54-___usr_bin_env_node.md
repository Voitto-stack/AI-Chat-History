---
date: 2026-04-23T18:16:54+08:00
source: clipboard
chars: 3885
---

#!/usr/bin/env node

/**
 * Cashier Post-Build & Deploy Script (Production)
 * 功能：构建 Docker 镜像 → 推送到 GCP → 部署到生产环境
 */

const fs = require("fs");
const path = require("path");
const { log, exec, updateK8sConfig } = require("../../../scripts/tools");
const {
  handleDeploySuccess,
  handleDeployError,
} = require("../../../scripts/lark-bot");

// =============================
// 配置
// =============================
const PROJECT_ID = "heyhru-server";
const REGION = "us-east1";
const ZONE = "us-east1-b";
const REGISTRY = `${REGION}-docker.pkg.dev/${PROJECT_ID}/frontend-service`;

const APP_NAME = "minerva-server";
const ENV = "prod";
const VERSION = process.env.IMAGE_TAG || `${ENV}-${Date.now()}`;

// 使用 __dirname 获取脚本所在目录，然后计算项目根目录
// __dirname: packages/app-minerva-server/scripts
const SCRIPT_DIR = __dirname;
const APP_DIR = path.resolve(SCRIPT_DIR, ".."); // packages/app-minerva-server
const PROJECT_ROOT = path.resolve(APP_DIR, "../.."); // 项目根目录

const BUILD_DIR = path.join(APP_DIR, "build");

const START_TIME = Number(process.env.BUILD_START_TIME) || Date.now();

// =============================
// 主函数
// =============================

async function main() {
  try {
    log("info", "========================================");
    log("info", `🚀 Minerva-Server Build & Deploy (Production)`);
    log("info", "========================================");
    console.log("");

    // Step 1: 检查构建产物 ================================================================================
    log("info", "📦 Step 1: 检查构建产物...");
    if (!fs.existsSync(BUILD_DIR)) {
      throw new Error(
        `Build 目录不存在: ${BUILD_DIR}\n请先运行 npm run build`,
      );
    }
    log("success", `✅ Build 目录验证通过: ${BUILD_DIR}`);
    console.log("");

    // Step 2: 构建 Docker 镜像
    log("info", "🔨 Step 2: 构建 Docker 镜像...");
    const localImageTag = `${APP_NAME}:${VERSION}`;
    exec("pwd");
    const buildCmd = `docker build --build-arg APP_ENV=production -t ${localImageTag} -f ./packages/app-minerva-server/Dockerfile .`;

    // 需要在项目根目录执行
    process.chdir(PROJECT_ROOT);
    exec(buildCmd);
    log("success", `✅ 镜像构建完成: ${localImageTag}`);
    console.log("");

    // Step 3: 标记并推送镜像
    log("info", "🏷️  Step 3: 标记并推送镜像...");
    const remoteImageTag = `${REGISTRY}/${APP_NAME}:${VERSION}`;
    const latestImageTag = `${REGISTRY}/${APP_NAME}:latest-prod`;

    exec(`docker tag ${localImageTag} ${remoteImageTag}`);
    exec(`docker tag ${localImageTag} ${latestImageTag}`);

    log("info", "📤 推送镜像到 GCP Artifact Registry...");
    exec(`docker push ${remoteImageTag}`);
    exec(`docker push ${latestImageTag}`);
    log("success", `✅ 镜像推送完成`);
    console.log("");

    // Step 4: 更新 dora-k8s-config image tag → ArgoCD 自动部署
    updateK8sConfig({ appName: APP_NAME, imageTag: VERSION, env: ENV });
    // Step 4: 部署由 ArgoCD GitOps 管理（dora-k8s-config）
    // Jenkins 会自动更新 dora-k8s-config 中的 image tag，ArgoCD 自动 sync
    log("info", "📋 镜像已推送，部署由 ArgoCD 管理");
    log("info", `镜像: ${remoteImageTag}`);
    console.log("");

    // 部署成功
    await handleDeploySuccess({
      startTime: START_TIME,
      imageTag: remoteImageTag,
      environment: "生产环境",
      projectName: "Minerva-Server Prod",
    });
  } catch (error) {
    log("error", `❌ Minerva-Server 部署失败: ${error.message}`);
    await handleDeployError({
      startTime: START_TIME,
      error: error,
      environment: "生产环境",
      projectName: "Minerva-Server Prod",
    });
    throw error;
  }
}

// 执行主函数
main();
