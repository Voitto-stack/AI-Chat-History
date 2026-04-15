---
title: jenkins-build
date: 2026-04-15T17:04:47+08:00
source: import
language: sh
original: jenkins-build.sh
---

# jenkins-build

```sh
#!/bin/bash

###############################################################################
# Jenkins Build Script - Simplified Version
# 简化的构建脚本：pnpm install + pnpm run build
###############################################################################

set -e  # 遇到错误立即退出

# 日志函数
log_info() {
    echo "[INFO] $1"
}

log_success() {
    echo "[SUCCESS] $1"
}

log_error() {
    echo "[ERROR] $1"
}



# 记录开始时间
START_TIME=$(date +%s)
# 导出毫秒级时间戳供 post-build 脚本使用（计算完整构建耗时）
export BUILD_START_TIME=$((START_TIME * 1000))
# 导出MasterOpenId
export MASTER_OPEN_ID="ou_b4166b00b0d014aa52e54a1f47503a4e"
# 导出构建人信息供 post-build 脚本使用（Jenkins Build User Vars Plugin 提供 BUILD_USER）
export BUILD_USER_NAME="${BUILD_USER:-${BUILD_USER_ID:-unknown}}"
BUILD_SUCCESS=false



# 错误处理函数
handle_error() {
    local exit_code=$?
    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))

    log_error "========================================"
    log_error "构建失败！"
    log_error "========================================"

    exit $exit_code
}

# 设置错误处理
trap 'handle_error' ERR

log_info "========================================"
log_info "Starting Jenkins Build"
log_info "========================================"
echo ""

# Step 1: 安装依赖
log_info "Step 1: Installing dependencies..."
pnpm install --frozen-lockfile || {
    log_error "Failed to install dependencies"
    exit 1
}
log_success "Dependencies installed successfully"
echo ""

# Step 2: 构建项目
log_info "Step 2: Building project..."
log_info "Environment==> $Environment"
log_info "noCache==> $noCache"

# 根据 Environment 变量决定构建脚本
BUILD_SCRIPT="build"
if [ "$Environment" = "development" ]; then
    BUILD_SCRIPT="build:dev"
    log_info "🟢 Using development build script: $BUILD_SCRIPT"
elif [ "$Environment" = "production" ]; then
    BUILD_SCRIPT="build:prod"
    log_info "🔴 Using production build script: $BUILD_SCRIPT"
else
    log_info "ℹ️  Using default build script: $BUILD_SCRIPT"
fi

# 检查 noCache 环境变量
if [ "$noCache" = "true" ]; then
    log_info "🔄 noCache enabled, cleaning build cache and rebuilding all packages..."
    log_info "Removing .next and .umi directories..."

    # 只在 apps 目录中清理构建缓存，避免影响 node_modules
    find apps -type d -name ".next" -prune -exec rm -rf {} + 2>/dev/null || true
    find apps -type d -name ".umi" -prune -exec rm -rf {} + 2>/dev/null || true

    log_success "Build cache cleaned successfully"
    pnpm -r run $BUILD_SCRIPT || {
        log_error "Build failed"
        exit 1
    }
else
    log_info "📦 Using cache, building with turbo..."
    pnpm run $BUILD_SCRIPT || {
        log_error "Build failed"
        exit 1
    }
fi

log_success "Build completed successfully"
echo ""

# Step 3: 执行应用的 post-build 脚本
log_info "🚀 Step 3: Running post-build scripts..."

# 从 Jenkins Environment 字段获取环境变量 (ENV)
# Jenkins 配置示例: Environment = "development" 或 "production"
log_info "Environment: $Environment"

# 从 Jenkins Apps 字段获取应用名称
# Jenkins 配置示例: Apps = "cashier" 或 "pwa"
if [ -n "$Apps" ]; then
    # $Apps 是单个应用名 (例如: Apps="cashier")
    APP_NAME=$Apps
    log_info "Target app from environment variable: $APP_NAME"
    
    # 检查应用目录是否存在
    if [ ! -d "apps/$APP_NAME" ]; then
        log_error "App directory not found: apps/$APP_NAME"
        exit 1
    fi
    
    # 根据环境选择对应的 post-build 脚本
    POST_BUILD_SCRIPT=""
    
    # 根据环境选择对应的 post-build 脚本
    case "$Environment" in
        dev|development)
            log_info "🟢 Development environment detected"
            if [ -f "apps/$APP_NAME/scripts/post-build.dev.cjs" ]; then
                POST_BUILD_SCRIPT="apps/$APP_NAME/scripts/post-build.dev.cjs"
            elif [ -f "apps/$APP_NAME/scripts/post-build.dev.js" ]; then
                POST_BUILD_SCRIPT="apps/$APP_NAME/scripts/post-build.dev.js"
            fi
            ;;
        prod|production)
            log_info "🔴 Production environment detected"
            if [ -f "apps/$APP_NAME/scripts/post-build.prod.cjs" ]; then
                POST_BUILD_SCRIPT="apps/$APP_NAME/scripts/post-build.prod.cjs"
            elif [ -f "apps/$APP_NAME/scripts/post-build.prod.js" ]; then
                POST_BUILD_SCRIPT="apps/$APP_NAME/scripts/post-build.prod.js"
            fi
            ;;
        *)
            log_info "ℹ️  No specific environment or default environment"
            ;;
    esac
    
    if [ -n "$POST_BUILD_SCRIPT" ]; then
        log_info "📦 Running post-build for '$APP_NAME'..."
        log_info "📝 Script: $POST_BUILD_SCRIPT"

        # GCP 服务账号认证（Freestyle Job 通过 Secret file 绑定注入 GCP_KEY）
        if [ -n "$GCP_KEY" ]; then
            log_info "🔑 使用 GCP 服务账号密钥激活认证..."
            export HOME="${WORKSPACE:-$HOME}"
            export KUBECONFIG="${HOME}/.kube/config"
            mkdir -p "${HOME}/.kube"
            gcloud auth activate-service-account --key-file="$GCP_KEY"
            gcloud auth configure-docker us-east1-docker.pkg.dev --quiet
            log_success "✅ GCP 认证完成"
        else
            log_info "ℹ️  未检测到 GCP_KEY，跳过 GCP 认证（Pipeline Job 由 Jenkinsfile 处理）"
        fi

        # 使用 node 执行 JavaScript 脚本
        node "$POST_BUILD_SCRIPT" || {
            log_error "Post-build script failed for '$APP_NAME'"
            exit 1
        }
        
        log_success "✅ Post-build completed for '$APP_NAME'"
    else
        log_info "ℹ️  No post-build script found for '$APP_NAME' (skipping)"
    fi
else
    # 未设置 $Apps，跳过 post-build
    log_info "ℹ️  No \$Apps specified, skipping post-build scripts"
fi
echo ""

# 计算总构建时间
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
MINUTES=$((DURATION / 60))
SECONDS=$((DURATION % 60))

# 完成
log_success "========================================"
log_success "🎉 Jenkins Build Completed! 🎉"
log_success "========================================"
log_info "⏱️  Total build time: ${MINUTES}m ${SECONDS}s"
log_success "========================================"

exit 0

```
