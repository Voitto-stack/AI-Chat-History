---
title: post-build.prod
date: 2026-04-15T17:04:52+08:00
source: import
language: js
original: post-build.prod.js
---

# post-build.prod

```js
#!/usr/bin/env node

/**
 * Minerva Production Build & Deploy Script
 * 功能：构建项目 → 部署到 GCS
 */

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { log, exec } = require('../../../scripts/tools');
const {
  handleDeploySuccess,
  handleDeployError,
} = require('../../../scripts/lark-bot');

// =============================
// 配置
// =============================
const BUILD_NUMBER = process.env.BUILD_NUMBER || Date.now().toString();

// 使用 __dirname 获取脚本所在目录
const SCRIPT_DIR = __dirname;
const APP_ROOT = path.resolve(SCRIPT_DIR, '..'); // apps/minerva
const MONOREPO_ROOT = path.resolve(APP_ROOT, '../..'); // monorepo 根目录
// 优先使用 Jenkins 注入的构建开始时间（需在 Jenkinsfile 中设置 BUILD_START_TIME），回退到当前时间
const START_TIME = Number(process.env.BUILD_START_TIME) || Date.now();

// 生产环境配置
const HOST_NAME = 'admin-prod.sitin.ai';
const BUCKET_NAME = 'admin-prod-sitin-ai';
const BUILD_DIR = 'build/minerva'; // 指向 monorepo 根目录下的 build/minerva

/**
 * 检查 gcloud 是否安装
 */
function checkGcloud() {
  try {
    execSync('gcloud --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// =============================
// 主函数
// =============================

async function main() {
  try {
    log('info', '========================================');
    log('info', `Minerva Build & Deploy (Production)`);
    log('info', '========================================');
    log('info', `Shell parent path: ${SCRIPT_DIR}`);
    log('info', `Current path: ${APP_ROOT}`);
    console.log('');

    // Step 1: 检查构建产物
    log('info', '📦 Step 1: 检查构建产物...');
    if (!fs.existsSync(BUILD_DIR)) {
      throw new Error(`Build 目录不存在: ${BUILD_DIR}\n请先运行 pnpm build`);
    }
    log('success', `✅ Build 目录验证通过: ${BUILD_DIR}`);
    console.log('');

    // Step 2: 部署到 GCS
    log('info', 'Step 2: 部署文件到 GCS...');
    const buildDir = path.join(MONOREPO_ROOT, BUILD_DIR);
    log('info', `Bucket: gs://${BUCKET_NAME}/`);
    log('info', `Build 目录: ${buildDir}`);

    // 检查 gcloud 是否安装
    if (!checkGcloud()) {
      throw new Error(
        'gcloud CLI 未安装，请先安装: https://cloud.google.com/sdk/docs/install',
      );
    }
    // 部署主文件
    exec(`gcloud storage cp -r ${buildDir}/* gs://${BUCKET_NAME}/`, {
      cwd: APP_ROOT,
    });
    log('success', '主文件部署完成');

    // 部署成功
    handleDeploySuccess({
      startTime: START_TIME,
      hostName: HOST_NAME,
      bucketName: BUCKET_NAME,
      buildNumber: BUILD_NUMBER,
      projectName: 'Minerva Prod',
      environment: '生产环境',
    });
  } catch (error) {
    handleDeployError({
      startTime: START_TIME,
      error: error,
      projectName: 'Minerva Prod',
      environment: '生产环境',
    });
  }
}

// 执行主函数
main();

```
