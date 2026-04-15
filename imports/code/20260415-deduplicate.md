---
title: deduplicate
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: deduplicate.js
---

# deduplicate

```js
const fs = require("fs");
const path = require("path");

// 获取命令行参数数组
const args = process.argv;
let genPath = "../gen";
if (args.length > 1) {
  genPath = args[2];
}

const directoryPath = genPath; // 替换为您生成的 TypeScript 文件所在的目录路径

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // 检查文件是否包含 'function bytesFromBase64' 或 'type Builtin ='
  if (
    !content.includes("function bytesFromBase64") &&
    !content.includes("type Builtin =")
  ) {
    // 如果两者都不包含，则不做任何操作，直接返回
    console.log(`No changes needed for file: ${filePath}`);
    return;
  }

  // 处理文件内容
  if (content.includes("function bytesFromBase64")) {
    // 如果包含，删除该行及之后的所有内容
    const index = content.indexOf("function bytesFromBase64");
    content = content.slice(0, index);
  } else {
    // 如果包含 'type Builtin ='，删除该行及之后的所有内容
    const builtinTypeIndex = content.indexOf("type Builtin =");
    if (builtinTypeIndex !== -1) {
      content = content.slice(0, builtinTypeIndex);
    }
  }

  // 计算相对路径深度：从文件所在目录到 packages/api-proto/ 的相对路径
  const fileDir = path.dirname(filePath);
  const genDir = path.resolve(genPath);
  const apiProtoDir = path.resolve(path.join(genDir, ".."));
  const relativePath = path.relative(fileDir, apiProtoDir);
  const relativeImportPath = relativePath
    ? relativePath.replace(/\\/g, "/") + "/baseType"
    : "./baseType";

  // 查找 "/* eslint-disable */" 的位置
  const eslintDisableIndex = content.indexOf("/* eslint-disable */");
  if (eslintDisableIndex !== -1) {
    // 在 "/* eslint-disable */" 的下一行插入导入语句
    const importStatement = `import { DeepPartial, Exact, MessageFns, bytesFromBase64, base64FromBytes, longToNumber, isObject, isSet } from "${relativeImportPath}";\n`;
    const insertIndex = content.indexOf("\n", eslintDisableIndex) + 1;
    content =
      content.slice(0, insertIndex) +
      importStatement +
      content.slice(insertIndex);
  } else {
    // 添加 base.ts 的导入
    content = `import { DeepPartial, Exact, MessageFns, bytesFromBase64, base64FromBytes, longToNumber, isObject, isSet } from "${relativeImportPath}";\n${content}`;
  }

  fs.writeFileSync(filePath, content);
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);

    if (fs.statSync(fullPath).isDirectory()) {
      // 如果是文件夹，递归读取子文件夹
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      // 如果是文件，添加到文件数组中
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

getAllFiles(directoryPath).forEach((file) => {
  if (path.extname(file) === ".ts") {
    console.log(`Processing file: ${file}`);
    processFile(file);
  }
});

console.log("Post-generation processing completed.");

```
