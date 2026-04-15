---
title: generateProtoIdMapping
date: 2026-04-15T17:04:47+08:00
source: import
language: js
original: generateProtoIdMapping.js
---

# generateProtoIdMapping

```js
const fs = require("fs");
const path = require("path");

function mapClassNameToId(jsonData) {
  const mapping = new Map();
  jsonData.protos.forEach((proto) => {
    if (proto.type !== "Admin") {
      mapping.set(proto.class_name, proto.id);
    }
  });
  return mapping;
}

function writeMappingToFile(mapping, outputPath) {
  
  fs.writeFileSync(outputPath, JSON.stringify(Object.fromEntries(mapping), null, 2));
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);

    console.log(`file: ${file}`);
    if (fs.statSync(fullPath).isDirectory() && (file.includes("ai_tcp") || file.includes("archat_api"))) {
      // 如果是文件夹，递归读取子文件夹
      getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith(".json")) {
      // 如果是文件，添加到文件数组中
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

const directoryPath = path.join(__dirname, "../../packages/api-proto/proto");
const outputPath = path.join(__dirname, "../../packages/api-proto/gen/protoIdMapping.json");

function generateMapFile() {
  const combinedMapping = new Map();

  getAllFiles(directoryPath).forEach((file) => {
    if (path.extname(file) === ".json") {
        const data = fs.readFileSync(file, "utf8");
        const jsonData = JSON.parse(data);
        const mapping = mapClassNameToId(jsonData);
  
        
        for (const [key, value] of mapping) {
          if (!value) {
            continue;
          }
          if (combinedMapping.has(key)) {
            if (mapping.get(key) < combinedMapping.get(key)) {
              console.log("less");
              continue;
            }
          }
          combinedMapping.set(key, value);
        }
    }
  });
  
  writeMappingToFile(combinedMapping, outputPath);
}

generateMapFile();

console.log("Combined mapping written to", outputPath);

```
