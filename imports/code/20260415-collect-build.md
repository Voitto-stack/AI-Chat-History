---
title: collect-build
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: collect-build.js
---

# collect-build

```js
const fs = require('fs');
const path = require('path');

console.log('🚀 开始收集构建产物...');

// 项目根目录
const projectRoot = process.cwd();
const appsDir = path.join(projectRoot, 'apps');
const rootBuildDir = path.join(projectRoot, 'build');

// 递归复制目录的辅助函数
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  源路径不存在: ${src}`);
    return false;
  }

  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    // 创建目标目录
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    // 读取目录内容并递归复制
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    // 复制文件
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }

  return true;
}

// 清理并创建根目录的 build 文件夹
if (fs.existsSync(rootBuildDir)) {
  console.log('🗑️  清理旧的根目录 build 文件夹...');
  fs.rmSync(rootBuildDir, { recursive: true, force: true });
}
fs.mkdirSync(rootBuildDir, { recursive: true });

// 检查 apps 目录是否存在
if (!fs.existsSync(appsDir)) {
  console.error('❌ apps 目录不存在');
  process.exit(1);
}

// 获取所有 app
const apps = fs.readdirSync(appsDir).filter((item) => {
  const itemPath = path.join(appsDir, item);
  return fs.statSync(itemPath).isDirectory();
});

console.log(`📦 找到 ${apps.length} 个应用: ${apps.join(', ')}`);
console.log('');

let successCount = 0;
let failCount = 0;

// 遍历每个 app，复制其 build 产物
for (const appName of apps) {
  const appPath = path.join(appsDir, appName);
  const appBuildPath = path.join(appPath, 'build');
  const destPath = path.join(rootBuildDir, appName);

  console.log(`📁 处理应用: ${appName}`);
  
  if (!fs.existsSync(appBuildPath)) {
    console.warn(`   ⚠️  未找到构建产物: ${appBuildPath}`);
    console.warn(`   ℹ️  跳过 ${appName}\n`);
    failCount++;
    continue;
  }

  console.log(`   📂 源路径: ${path.relative(projectRoot, appBuildPath)}`);
  console.log(`   📂 目标路径: ${path.relative(projectRoot, destPath)}`);

  const success = copyRecursive(appBuildPath, destPath);
  
  if (success) {
    // 获取文件大小
    const getSize = (dirPath) => {
      let size = 0;
      const items = fs.readdirSync(dirPath);
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
          size += getSize(itemPath);
        } else {
          size += stats.size;
        }
      }
      return size;
    };

    const sizeMB = (getSize(destPath) / 1024 / 1024).toFixed(2);
    console.log(`   ✅ 复制成功 (${sizeMB} MB)\n`);
    successCount++;
  } else {
    console.log(`   ❌ 复制失败\n`);
    failCount++;
  }
}

console.log('='.repeat(50));
console.log('📊 统计信息:');
console.log(`   ✅ 成功: ${successCount} 个应用`);
console.log(`   ❌ 失败/跳过: ${failCount} 个应用`);
console.log(`   📁 输出目录: ${path.relative(projectRoot, rootBuildDir)}`);
console.log('='.repeat(50));

if (successCount > 0) {
  console.log('');
  console.log('🎉 构建产物收集完成！');
  console.log('');
  console.log('📁 目录结构:');
  console.log(`   ${path.relative(projectRoot, rootBuildDir)}/`);
  
  const buildApps = fs.readdirSync(rootBuildDir);
  buildApps.forEach((appName, index) => {
    const isLast = index === buildApps.length - 1;
    const prefix = isLast ? '   └── ' : '   ├── ';
    console.log(`${prefix}${appName}/`);
  });
} else {
  console.log('');
  console.log('⚠️  没有成功收集任何构建产物');
  process.exit(1);
}

```
