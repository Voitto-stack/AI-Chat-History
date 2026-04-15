---
title: installToClaim
date: 2026-04-15T17:05:29+08:00
source: import
language: html
original: installToClaim.html
---

# installToClaim

```html
<!doctype html>
<html lang="zh-CN" style="background-color: #eff8ff">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#eff8ff" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://app-dev1012.gracechat.com https://*.gracechat.com; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
    />
    <title>Install to Earn - GraceChat</title>

    <!-- 预加载关键资源 -->
    <link rel="preload" as="image" href="/activity-images/install-to-claim/install-to-claim.webp" />
    <link rel="preload" as="image" href="/activity-images/install-to-claim/icon-earnings.webp" />
    <link rel="preload" as="image" href="/activity-images/install-to-claim/ic_first_guide_finger.svg" />
    <link rel="preload" as="image" href="/logo192.png" />
    <link rel="stylesheet" href="./installToClaim.css" />

    <!-- 预连接外部页面 -->
    <link rel="preconnect" href="https://app.gracechat.com" crossorigin />

    <!-- PWA Manifest -->
    <link rel="manifest" href="/manifest.webmanifest" />

    <!-- 埋点和渠道 JS - 统一从 src/tracking 加载 -->
    <script type="module">
      import * as tracking from "/src/tracking/activity.ts";

      // 挂载到 window（保持向后兼容）
      window.adTrack = tracking.adTrack;
      window.setOriginalChannel = tracking.setOriginalChannel;
      window.setAdChannel = tracking.setAdChannel;
      window.getAdChannel = tracking.getAdChannel;
      window.getTtclid = tracking.getTtclid;
      window.setTtclid = tracking.setTtclid;
      window.getFbclid = tracking.getFbclid;
      window.setFbclid = tracking.setFbclid;

      // BytePlus 追踪函数
      window.bytePlusTrack = (eventName, params) => {
        tracking.BytePlusManager.getInstance().trackEvent(eventName, params);
      };

      console.log("✅ Tracking loaded from src/tracking/activity.ts");
    </script>
  </head>

  <body>
    <div class="install-to-claim-container">
      <!-- CTA 标题 -->
      <div class="install-to-claim-cta">
        The fastest way to<br />
        earn money
      </div>

      <!-- 指导图片 -->
      <img
        class="install-to-claim-instruction-image"
        src="/activity-images/install-to-claim/install-to-claim.webp"
        alt="安装说明"
        loading="eager"
        id="instructionImg"
      />

      <!-- 信息卡片 -->
      <div class="install-to-claim-card">
        <img
          class="install-to-claim-icon"
          src="/activity-images/install-to-claim/icon-earnings.webp"
          alt="收益"
          loading="eager"
        />
        <span class="install-to-claim-stats-text">
          We process over <span class="install-to-claim-stats-yellow">$100,000+</span> cashouts every day.
        </span>
      </div>

      <!-- 安装按钮 -->
      <div class="install-btn-container breath-animation" id="installBtn">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" id="progressFill">
            <div class="shimmer"></div>
          </div>
        </div>
        <span class="install-btn-text" id="installText">Install</span>
      </div>

      <!-- 手势指示 -->
      <img
        class="install-to-claim-hand"
        src="/activity-images/install-to-claim/ic_first_guide_finger.svg"
        alt="点击这里"
        loading="eager"
      />
    </div>

    <script type="module" src="./installToClaim.js"></script>
  </body>
</html>

```
