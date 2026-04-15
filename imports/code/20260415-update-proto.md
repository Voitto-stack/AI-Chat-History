---
title: update-proto
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: update-proto.js
---

# update-proto

```js
#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

/**
 * 更新 proto submodule
 * 用法: pnpm update-proto [branch]
 */

const branch = process.argv[2] || "release/online";

console.log("🔄 更新 proto submodule...\n");

const commands = [
  {
    cmd: "git",
    args: [
      "submodule",
      "update",
      "--init",
      "--recursive",
      "packages/api-proto/proto",
    ],
    desc: "初始化 submodule",
  },
  {
    cmd: "git",
    args: ["-C", "packages/api-proto/proto", "fetch", "origin"],
    desc: "拉取最新代码",
  },
  {
    cmd: "git",
    args: ["-C", "packages/api-proto/proto", "checkout", branch],
    desc: `切换到 ${branch} 分支`,
  },
  {
    cmd: "git",
    args: ["-C", "packages/api-proto/proto", "pull", "origin", branch],
    desc: `拉取 ${branch} 分支最新代码`,
  },
  {
    cmd: "npm",
    args: ["run", "generate:proto"],
    desc: "生成 gen 文件",
  },
];

async function runCommand(cmd, args, desc) {
  console.log(`📌 ${desc}...`);

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: "inherit",
      cwd: path.join(__dirname, ".."),
    });

    child.on("error", (error) => {
      console.error(`❌ 执行失败: ${error.message}`);
      reject(error);
    });

    child.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`命令退出码: ${code}`));
      } else {
        console.log(`✅ ${desc} 完成\n`);
        resolve();
      }
    });
  });
}

async function updateProto() {
  try {
    for (const command of commands) {
      await runCommand(command.cmd, command.args, command.desc);
    }

    console.log("🎉 Proto submodule 更新完成！");
    console.log("\n💡 提示: 如果需要提交更改，请运行:");
    console.log("   git add packages/api-proto/proto");
    console.log('   git commit -m "chore: update proto submodule"');
  } catch (error) {
    console.error("\n❌ 更新失败:", error.message);
    process.exit(1);
  }
}

updateProto();

```
