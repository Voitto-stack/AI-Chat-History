---
title: pre-deploy
date: 2026-04-15T17:04:49+08:00
source: import
language: js
original: pre-deploy.js
---

# pre-deploy

```js
const fs = require("fs");
const path = require("path");

// 获取项目根目录
const projectRoot = process.cwd();
const deployPackageDir = path.join(projectRoot, "build");

console.log("🚀 开始整理部署包...");

// 递归复制目录的辅助函数
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  源路径不存在: ${src}`);
    return;
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
}

// 清理并创建 build 目录
if (fs.existsSync(deployPackageDir)) {
  console.log("🗑️  清理旧的 build 目录...");
  fs.rmSync(deployPackageDir, { recursive: true, force: true });
}
fs.mkdirSync(deployPackageDir, { recursive: true });

// 1. 复制 .next/standalone/node_modules 到 build/node_modules
const standaloneNodeModules = path.join(
  projectRoot,
  ".next",
  "standalone",
  "node_modules"
);
if (fs.existsSync(standaloneNodeModules)) {
  console.log("📦 复制 standalone 根目录的 node_modules...");
  const destNodeModules = path.join(deployPackageDir, "node_modules");
  copyRecursive(standaloneNodeModules, destNodeModules);
  console.log("✅ node_modules 复制完成");
} else {
  console.warn("⚠️  找不到 .next/standalone/node_modules 目录");
}

// 1.1 强制复制最外层 node_modules 中的特定包
const rootNodeModules = path.join(projectRoot, "..", "..", "node_modules");
const requiredPackages = [
  "mime-db",
  "scheduler",
  // "minimatch",
  // "brace-expansion",
];
console.log("📦 强制复制根目录的特定 node_modules 包...");
let copiedCount = 0;
for (const pkg of requiredPackages) {
  const srcPkg = path.join(rootNodeModules, pkg);
  const destPkg = path.join(deployPackageDir, "node_modules", pkg);

  if (fs.existsSync(srcPkg)) {
    // 如果目标已存在，先删除
    if (fs.existsSync(destPkg)) {
      fs.rmSync(destPkg, { recursive: true, force: true });
    }
    copyRecursive(srcPkg, destPkg);
    console.log(`   ✅ ${pkg} 复制完成`);
    copiedCount++;
  } else {
    console.warn(`   ⚠️  找不到包: ${pkg}`);
  }
}
console.log(`✅ 强制复制了 ${copiedCount}/${requiredPackages.length} 个特定包`);

// 2. 复制 .next/standalone/apps/cashier 里的内容到 deploy_package 根目录（排除 node_modules）
const standaloneCashierDir = path.join(
  projectRoot,
  ".next",
  "standalone",
  "apps",
  "cashier"
);
if (fs.existsSync(standaloneCashierDir)) {
  console.log(
    "📦 复制 standalone/apps/cashier 文件到根目录（排除 node_modules）..."
  );

  // 复制 apps/cashier 目录下的内容到 deploy_package 根目录，但排除 node_modules
  const entries = fs.readdirSync(standaloneCashierDir);
  for (const entry of entries) {
    // 跳过 node_modules 目录
    if (entry === "node_modules") {
      console.log("   ⏭️  跳过 apps/cashier/node_modules（不需要复制）");
      continue;
    }

    const srcPath = path.join(standaloneCashierDir, entry);
    const destPath = path.join(deployPackageDir, entry);
    copyRecursive(srcPath, destPath);
  }
  console.log("✅ standalone 文件复制完成");
} else {
  console.error(
    "❌ 找不到 .next/standalone/apps/cashier 目录，请确保已运行 next build"
  );
  process.exit(1);
}

// 3. 复制 .next/static 到 deploy_package/.next/static
const staticDir = path.join(projectRoot, ".next", "static");
const destStaticDir = path.join(deployPackageDir, ".next", "static");
if (fs.existsSync(staticDir)) {
  console.log("📦 复制 static 文件...");
  copyRecursive(staticDir, destStaticDir);
  console.log("✅ static 文件复制完成");
} else {
  console.warn("⚠️  找不到 .next/static 目录");
}

// 4. 复制 public 文件夹到 deploy_package/public
const publicDir = path.join(projectRoot, "public");
const destPublicDir = path.join(deployPackageDir, "public");
if (fs.existsSync(publicDir)) {
  console.log("📦 复制 public 文件...");
  copyRecursive(publicDir, destPublicDir);
  console.log("✅ public 文件复制完成");
} else {
  console.warn("⚠️  找不到 public 目录");
}

console.log("");
console.log("🎉 部署包整理完成！");
console.log(`📁 部署包位置: ${deployPackageDir}`);
```
