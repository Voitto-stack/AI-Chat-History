---
title: getallmylinks
date: 2026-04-14T21:03:47+08:00
source: import
language: html
original: getallmylinks.html
---

# getallmylinks

```html
<!doctype html>
<html lang="en" style="background-color: #f8fcff">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#F8FCFF" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://app.sitin.ai; font-src 'self'; connect-src 'self' https://app.sitin.ai; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
    />
    <title>Get Your Reward!</title>

    <!-- 预加载关键资源 -->
    <link rel="preload" as="image" href="/activity-images/getallmylinks/bg_adhome.webp" />
    <link rel="preload" as="image" href="/activity-images/getallmylinks/bg_spinning_light.svg" />
    <link rel="preload" as="image" href="/activity-images/getallmylinks/ic_bundle_color_cash.webp" />

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

    <link rel="stylesheet" href="./getallmylinks.css" />
  </head>

  <body>
    <div class="container">
      <!-- 背景图片 -->
      <img
        src="/activity-images/getallmylinks/bg_ad_cash_paypal.webp"
        alt="Background"
        class="bg-image"
        loading="eager"
      />
      <!-- 弹窗遮罩层 -->
      <div class="modal-overlay" id="modalOverlay">
        <!-- 旋转光效背景 -->
        <img
          src="/activity-images/getallmylinks/bg_spinning_light.svg"
          alt="Light"
          class="rotating-light"
          loading="eager"
        />
        <!-- 弹窗头部圆圈 -->
        <div class="modal-head"></div>

        <!-- 弹窗图标 -->
        <img
          src="/activity-images/getallmylinks/ic_bundle_color_cash.webp"
          alt="Cash Icon"
          class="modal-icon"
          loading="eager"
        />

        <!-- 弹窗内容 -->
        <div class="modal-content">
          <h1 class="modal-title">Congrats!</h1>
          <p class="modal-description">You got a new user reward!</p>

          <!-- 金额框 -->
          <div class="amount-box">
            <div class="amount" id="amount">189.69</div>

            <!-- 进度条 -->
            <div class="progress-container">
              <div class="progress-bar"></div>
            </div>
          </div>

          <!-- 领取按钮 -->
          <button class="claim-btn" id="claimBtn">Claim now</button>
        </div>

        <!-- 关闭按钮 -->
        <img
          src="/activity-images/getallmylinks/ic_cashout_close.svg"
          alt="Close"
          class="close-btn"
          id="closeBtn"
          loading="eager"
        />

        <!-- 装饰性手势 -->
        <div class="hand-decoration" id="handDecoration">
          <img width="90" height="90" src="https://app.sitin.ai/assets/image/aeded9f6559a1681e0fdf7a464f7e049.webp" />
        </div>
      </div>

      <!-- PayPal 成功页（默认隐藏） -->
      <img
        src="/activity-images/getallmylinks/bg_ad_cash_paypal.webp"
        alt="PayPal Success"
        class="paypal-success hidden"
        id="paypalSuccess"
        loading="lazy"
      />
    </div>

    <script type="module" src="./getallmylinks.js"></script>
  </body>
</html>

```
