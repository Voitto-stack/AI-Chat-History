---
date: 2026-04-22T14:19:02+08:00
source: clipboard
chars: 7288
---

name: Merge to release/test

on:
  push:
    branches:
      - 'feature/**'

jobs:
  merge:
    name: Merge ${{ github.ref_name }} → release/test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Configure Git
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"

      - name: Merge into release/test
        id: merge
        run: |
          SOURCE_BRANCH="${{ github.ref_name }}"
          TARGET_BRANCH="release/test"

          git checkout $TARGET_BRANCH
          git merge --no-ff origin/$SOURCE_BRANCH \
            -m "chore: merge $SOURCE_BRANCH into $TARGET_BRANCH [auto]"
          git push origin $TARGET_BRANCH

          echo "status=success" >> $GITHUB_OUTPUT

      - name: Detect changed apps
        id: detect
        run: |
          # 允许部署的 app 白名单
          ALLOWED_APPS="minerva-server minerva social-proxy-server pwa cashier"

          # 获取本次推送变更的文件
          if [ "${{ github.event.before }}" = "0000000000000000000000000000000000000000" ]; then
            CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD)
          else
            CHANGED_FILES=$(git diff --name-only ${{ github.event.before }} ${{ github.sha }})
          fi
          echo "Changed files:"
          echo "$CHANGED_FILES"

          # 从变更文件中提取涉及的 app（必须在白名单中）
          DEPLOY_APPS=""
          for APP in $ALLOWED_APPS; do
            if echo "$CHANGED_FILES" | grep -q "^apps/${APP}/"; then
              DEPLOY_APPS="${DEPLOY_APPS} ${APP}"
            fi
          done
          DEPLOY_APPS=$(echo "$DEPLOY_APPS" | xargs)

          echo "Apps to deploy: ${DEPLOY_APPS:-none}"
          echo "apps=$DEPLOY_APPS" >> $GITHUB_OUTPUT

      - name: Trigger Jenkins deployment
        if: steps.merge.outputs.status == 'success' && steps.detect.outputs.apps != ''
        env:
          JENKINS_URL: https://jenkins.sitin.ai
          JENKINS_USER: shangbin
          JENKINS_TOKEN: ${{ secrets.JENKINS_TOKEN }}
          JOB_NAME: frontend_dev_sitin_webapp
        run: |
          set -e
          COOKIE_JAR="/tmp/jenkins-cookies.txt"

          # Step 1: 获取 crumb（使用 cookie jar 维持会话）
          echo "::group::Fetch Jenkins crumb"
          HTTP_CODE=$(curl -s -o /tmp/crumb.json -w "%{http_code}" \
            -c "$COOKIE_JAR" \
            --user "${JENKINS_USER}:${JENKINS_TOKEN}" \
            "${JENKINS_URL}/crumbIssuer/api/json")
          echo "Crumb API HTTP status: $HTTP_CODE"

          CRUMB=""
          CRUMB_FIELD=""
          if [ "$HTTP_CODE" = "200" ]; then
            CRUMB=$(jq -r '.crumb' /tmp/crumb.json)
            CRUMB_FIELD=$(jq -r '.crumbRequestField' /tmp/crumb.json)
            if [ -n "$CRUMB" ] && [ "$CRUMB" != "null" ]; then
              echo "Crumb obtained successfully"
            else
              CRUMB=""
            fi
          else
            echo "::warning::Crumb fetch returned HTTP $HTTP_CODE, proceeding without crumb (API token auth)"
          fi
          echo "::endgroup::"

          # Step 2: 逐个触发 Jenkins 构建（仅部署本次变更涉及的 app）
          IFS=' ' read -ra APPS <<< "${{ steps.detect.outputs.apps }}"
          for APP in "${APPS[@]}"; do
            echo "::group::Trigger Jenkins build for $APP"
            CURL_ARGS=(
              -s -o /tmp/jenkins-build.txt -w "%{http_code}"
              -b "$COOKIE_JAR"
              -X POST "${JENKINS_URL}/job/${JOB_NAME}/buildWithParameters"
              --user "${JENKINS_USER}:${JENKINS_TOKEN}"
              --data-urlencode "GIT_BRANCH=origin/release/test"
              --data-urlencode "Environment=development"
              --data-urlencode "Apps=${APP}"
              --data-urlencode "ABTest=VersionA"
              --data-urlencode "noCache=true"
            )
            if [ -n "$CRUMB" ]; then
              CURL_ARGS+=(-H "${CRUMB_FIELD}: ${CRUMB}")
            fi
            BUILD_HTTP=$(curl "${CURL_ARGS[@]}")
            echo "Build trigger HTTP status: $BUILD_HTTP"

            if [ "$BUILD_HTTP" -lt 200 ] || [ "$BUILD_HTTP" -ge 400 ]; then
              echo "::error::Jenkins build trigger failed for $APP with HTTP $BUILD_HTTP"
              cat /tmp/jenkins-build.txt | head -50
              exit 1
            fi
            echo "Jenkins build triggered successfully for $APP (HTTP $BUILD_HTTP)"
            echo "::endgroup::"
          done

      - name: Notify Feishu on success
        if: steps.merge.outputs.status == 'success'
        env:
          FEISHU_WEBHOOK_URL: ${{ secrets.FEISHU_WEBHOOK_URL }}
          SOURCE_BRANCH: ${{ github.ref_name }}
          ACTOR: ${{ github.actor }}
          COMMIT_MSG: ${{ github.event.head_commit.message }}
          COMMIT_SHA: ${{ github.sha }}
          COMMIT_URL: ${{ github.server_url }}/${{ github.repository }}/commit/${{ github.sha }}
        run: |
          PAYLOAD=$(jq -n \
            --arg branch "$SOURCE_BRANCH" \
            --arg actor "$ACTOR" \
            --arg msg "$COMMIT_MSG" \
            --arg sha "${COMMIT_SHA:0:7}" \
            --arg url "$COMMIT_URL" \
            '{
              msg_type: "interactive",
              card: {
                schema: "2.0",
                body: {
                  elements: [{
                    tag: "markdown",
                    content: ("**✅ 自动合并成功**\n\n**来源分支**：`" + $branch + "`\n**目标分支**：`release/test`\n**触发人**：" + $actor + "\n**提交信息**：" + $msg + "\n**提交链接**：[" + $sha + "](" + $url + ")")
                  }]
                }
              }
            }')
          CLEAN_URL=$(echo "$FEISHU_WEBHOOK_URL" | tr -d '[:space:]')
          curl -X POST "$CLEAN_URL" \
            -H "Content-Type: application/json" \
            -d "$PAYLOAD"

      - name: Notify Feishu on failure
        if: failure()
        env:
          FEISHU_WEBHOOK_URL: ${{ secrets.FEISHU_WEBHOOK_URL }}
          SOURCE_BRANCH: ${{ github.ref_name }}
          ACTOR: ${{ github.actor }}
          RUN_URL: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
        run: |
          PAYLOAD=$(jq -n \
            --arg branch "$SOURCE_BRANCH" \
            --arg actor "$ACTOR" \
            --arg url "$RUN_URL" \
            '{
              msg_type: "interactive",
              card: {
                schema: "2.0",
                body: {
                  elements: [{
                    tag: "markdown",
                    content: ("**❌ 自动合并失败**\n\n**来源分支**：`" + $branch + "`\n**目标分支**：`release/test`\n**触发人**：" + $actor + "\n**可能原因**：存在冲突，需手动处理\n**查看详情**：[点击查看 Actions 日志](" + $url + ")")
                  }]
                }
              }
            }')
          CLEAN_URL=$(echo "$FEISHU_WEBHOOK_URL" | tr -d '[:space:]')
          curl -X POST "$CLEAN_URL" \
            -H "Content-Type: application/json" \
            -d "$PAYLOAD"

