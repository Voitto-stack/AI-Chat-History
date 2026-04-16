#!/usr/bin/env node

/**
 * PWA Production Build & Deploy Script
 * 功能：根据 ABTest 环境变量选择对应配置 → 部署到 GCS
 *
 * 环境变量：
 *   - ABTest: VersionA (默认) | VersionB | Union
 *   - BUILD_NUMBER: 构建编号
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { log, exec } = require("../../../scripts/tools");
const { handleDeploySuccess, handleDeployError } = require("../../../scripts/lark-bot");

// =============================
// 配置
// =============================
const BUILD_NUMBER = process.env.BUILD_NUMBER || Date.now().toString();
const AB_TEST = process.env.ABTest || "VersionA";

const SCRIPT_DIR = __dirname;
const APP_ROOT = path.resolve(SCRIPT_DIR, ".."); // apps/pwa
const MONOREPO_ROOT = path.resolve(APP_ROOT, "../.."); // monorepo 根目录
const START_TIME = Date.now();

// 生产环境 ABTest 配置映射
const AB_CONFIG = {
  VersionA: {
    hostName: "app.gracechat.com",
    bucketName: "archat-apk",
  },
  VersionB: {
    hostName: "app-b.gracechat.com",
    bucketName: "app-b-gracechat-com",
  },
  Union: {
    hostName: "app-v-club.gracechat.com",
    bucketName: "app-v-club-gracechat-com",
  },
};

const config = AB_CONFIG[AB_TEST];
if (!config) {
  console.error(`[ERROR] 未知的 ABTest 值: ${AB_TEST}，可选: VersionA, VersionB, Union`);
  process.exit(1);
}

const { hostName: HOST_NAME, bucketName: BUCKET_NAME } = config;
const BUILD_DIR = "packages/app-pwa/dist";

/**
 * 检查 gcloud 是否安装
 */
function checkGcloud() {
  try {
    execSync("gcloud --version", { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 上传所有文件到 GCS 并设置正确的 Cache-Control 和 Content-Encoding
 * 策略：
 *  1. 先用 cp -r 批量上传（快）
 *  2. 再用 objects update 批量更新 metadata（一条命令打所有头）
 * @param {string} buildDir 本地构建目录
 * @param {string} bucketName GCS bucket 名称
 */
function uploadFiles(buildDir, bucketName) {
  const bucket = `gs://${bucketName}`;

  // Step A: 批量上传所有文件（保持速度）
  log("info", "  批量上传所有文件...");
  execSync(`gcloud storage cp -r "${buildDir}/"* ${bucket}/`, { stdio: "inherit" });

  // Step B: 为 .gz 文件批量设置 Content-Encoding: gzip
  // GCS 不能自动识别 .gz 是预压缩内容，必须手动标记
  log("info", "  设置 .gz 文件的 Content-Encoding: gzip...");
  execSync(
    `gcloud storage objects update "${bucket}/**/*.gz" --content-encoding=gzip 2>/dev/null || true`,
    { stdio: "inherit", shell: true }
  );

  // Step C: 为 .br 文件批量设置 Content-Encoding: br
  log("info", "  设置 .br 文件的 Content-Encoding: br...");
  execSync(
    `gcloud storage objects update "${bucket}/**/*.br" --content-encoding=br 2>/dev/null || true`,
    { stdio: "inherit", shell: true }
  );

  // Step D: 带 hash 的静态资源设置长期缓存（assets/ 下所有文件）
  log("info", "  设置 assets/ 静态资源长期缓存 (max-age=31536000)...");
  execSync(
    `gcloud storage objects update "${bucket}/assets/**" --cache-control="public, max-age=31536000, immutable" 2>/dev/null || true`,
    { stdio: "inherit", shell: true }
  );

  // Step E: index.html 设置不缓存（确保用户始终拿到最新版本）
  log("info", "  设置 index.html no-cache...");
  execSync(
    `gcloud storage objects update "${bucket}/index.html" --cache-control="no-cache, no-store, must-revalidate"`,
    { stdio: "inherit" }
  );

  // Step F: activity/*.html 也设置不缓存
  execSync(
    `gcloud storage objects update "${bucket}/activity/*.html" --cache-control="no-cache, no-store, must-revalidate" 2>/dev/null || true`,
    { stdio: "inherit", shell: true }
  );

  // Step G: service worker 不缓存（否则 SW 更新会失效）
  execSync(
    `gcloud storage objects update "${bucket}/service-worker.js" --cache-control="no-cache, no-store, must-revalidate" 2>/dev/null || true`,
    { stdio: "inherit", shell: true }
  );
}

// =============================
// 主函数
// =============================

async function main() {
  try {
    log("info", "========================================");
    log("info", `PWA Build & Deploy (Production)`);
    log("info", `ABTest: ${AB_TEST}`);
    log("info", "========================================");
    log("info", `Shell parent path: ${SCRIPT_DIR}`);
    log("info", `Current path: ${APP_ROOT}`);
    console.log("");

    // Step 1: 检查构建产物
    log("info", "📦 Step 1: 检查构建产物...");
    const buildDir = path.join(MONOREPO_ROOT, BUILD_DIR);
    if (!fs.existsSync(buildDir)) {
      throw new Error(`Build 目录不存在: ${buildDir}\n请先运行 pnpm build`);
    }
    log("success", `✅ Build 目录验证通过: ${buildDir}`);
    console.log("");

    // Step 2: 删除 source map 文件
    log("info", "Step 2: 删除 source map 文件...");
    try {
      execSync(`find ${buildDir} -name "*.js.map" -type f -delete`, {
        stdio: "inherit",
      });
      log("success", "source map 文件已清理");
    } catch (e) {
      log("warn", "清理 source map 文件时出错，继续部署...");
    }
    console.log("");

    // Step 3: 部署到 GCS
    log("info", "Step 3: 部署文件到 GCS...");
    log("info", `Bucket: gs://${BUCKET_NAME}/`);
    log("info", `Build 目录: ${buildDir}`);

    if (!checkGcloud()) {
      throw new Error("gcloud CLI 未安装，请先安装: https://cloud.google.com/sdk/docs/install");
    }

    uploadFiles(buildDir, BUCKET_NAME);
    log("success", "主文件部署完成");

    // 部署 .well-known 目录（如果存在）
    const wellKnownDir = path.join(buildDir, ".well-known");
    if (fs.existsSync(wellKnownDir)) {
      exec(`gcloud storage cp -r ${wellKnownDir} gs://${BUCKET_NAME}/`, {
        cwd: APP_ROOT,
      });
      log("success", ".well-known 目录部署完成");
    }

    // 部署成功
    await handleDeploySuccess({
      startTime: START_TIME,
      hostName: HOST_NAME,
      bucketName: BUCKET_NAME,
      buildNumber: BUILD_NUMBER,
      projectName: `PWA Prod (${AB_TEST})`,
      environment: "生产环境",
    });
  } catch (error) {
    await handleDeployError({
      startTime: START_TIME,
      error: error,
      projectName: `PWA Prod (${AB_TEST})`,
      environment: "生产环境",
    });
  }
}

main();
