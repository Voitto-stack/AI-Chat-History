#!/usr/bin/env node

/**
 * Static Pages Build Script
 * 将静态页面目录复制到 build/ 产物目录
 */
const fs = require("fs");
const path = require("path");

const APP_ROOT = path.resolve(__dirname, "..");
const BUILD_DIR = path.join(APP_ROOT, "build");

// 需要复制的静态页面目录
const STATIC_DIRS = ["doraPage"];

console.log("[INFO] Building static pages...");

// 清理并创建 build 目录
if (fs.existsSync(BUILD_DIR)) {
  fs.rmSync(BUILD_DIR, { recursive: true, force: true });
}
fs.mkdirSync(BUILD_DIR, { recursive: true });

// 递归复制目录
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`[WARN] 源路径不存在: ${src}`);
    return;
  }

  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

for (const dir of STATIC_DIRS) {
  const src = path.join(APP_ROOT, dir);
  const dest = path.join(BUILD_DIR, dir);
  copyRecursive(src, dest);
  console.log(`[SUCCESS] ${dir} → build/${dir}`);
}

console.log("[SUCCESS] Static pages build complete!");
