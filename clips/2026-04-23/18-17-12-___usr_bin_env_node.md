---
date: 2026-04-23T18:17:12+08:00
source: clipboard
chars: 3955
---

#!/usr/bin/env node

/**
 * Minerva-Server Post-Build & Deploy Script (Development)
 * 功能：构建 Docker 镜像 → 推送到 GCP Artifact Registry → 部署到 GKE 开发环境
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
const ENV = "dev";
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
    log("info", `🚀 Minerva-Server Build & Deploy (Dev → K8s)`);
    log("info", "========================================");
    console.log("");

    // Step 1: 检查构建产物
    log("info", "📦 Step 1: 检查构建产物...");
    if (!fs.existsSync(BUILD_DIR)) {
      throw new Error(
        `Build 目录不存在: ${BUILD_DIR}\n请先运行 npm run build`,
      );
    }
    log("success", `✅ Build 目录验证通过: ${BUILD_DIR}`);
    const buildFiles = fs.readdirSync(BUILD_DIR, { recursive: true });
    log("info", `📁 构建产物 (${buildFiles.length} 个文件):`);
    buildFiles.forEach((f) => log("info", `  ${f}`));
    console.log("");

    // Step 2: 构建 Docker 镜像
    log("info", "🔨 Step 2: 构建 Docker 镜像...");
    const localImageTag = `${APP_NAME}:${VERSION}`;
    exec("pwd");
    const buildCmd = `docker build --build-arg APP_ENV=development -t ${localImageTag} -f ./packages/app-minerva-server/Dockerfile .`;

    // 需要在项目根目录执行
    process.chdir(PROJECT_ROOT);
    exec(buildCmd);
    log("success", `✅ 镜像构建完成: ${localImageTag}`);
    console.log("");

    // Step 3: 标记并推送镜像
    log("info", "🏷️  Step 3: 标记并推送镜像...");
    const remoteImageTag = `${REGISTRY}/${APP_NAME}:${VERSION}`;
    const latestImageTag = `${REGISTRY}/${APP_NAME}:latest-dev`;

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
      environment: "K8s 测试环境",
      projectName: "Minerva-Server Dev",
    });
  } catch (error) {
    await handleDeployError({
      startTime: START_TIME,
      error: error,
      environment: "K8s 测试环境",
      projectName: "Minerva-Server Dev",
    });
  }
}

// 执行主函数
main();

