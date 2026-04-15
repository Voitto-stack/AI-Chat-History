---
title: generate_js
date: 2026-04-15T17:04:47+08:00
source: import
language: sh
original: generate_js.sh
---

# generate_js

```sh
#!/bin/bash

# 获取脚本所在目录
script_dir=$(dirname "${BASH_SOURCE[0]}")
workspace_dir="${script_dir}/../.."
SOURCE_FOLDER="${workspace_dir}/packages/api-proto/proto"
DEST_FOLDER="${workspace_dir}/packages/api-proto/gen"

echo "script_dir: ${script_dir}, workspace_dir: ${workspace_dir}"
mkdir -p "$DEST_FOLDER"

for file in $(find "$SOURCE_FOLDER" -name "*.proto"); do
  protoc --plugin=${workspace_dir}/node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_opt=useOptionals=all \
    --ts_proto_out="$DEST_FOLDER" \
    --proto_path="$SOURCE_FOLDER" \
    --ts_proto_opt=outputTypeAnnotations=static-only \
    "$file"
done

node ${script_dir}/deduplicate.js $DEST_FOLDER
node ${script_dir}/generateProtoIdMapping.js

```
